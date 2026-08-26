import copy
import json
import os
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from jsonschema import ValidationError

from scripts.calm_compass.pipeline import (
    merge_ai_overlay,
    publish_snapshot,
)


ROOT = Path(__file__).resolve().parents[3]
FIXTURES = Path(__file__).parent / "fixtures"
SCHEMA = ROOT / "calm-compass/schema/dashboard-snapshot.schema.json"
EXAMPLE = ROOT / "calm-compass/private/dashboard-snapshot.example.json"


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


class OverlayMergeTests(unittest.TestCase):
    def setUp(self):
        self.deterministic = load_json(EXAMPLE)
        self.valid_overlay = load_json(FIXTURES / "ai-overlay-valid.json")

    def test_valid_overlay_replaces_wording_but_preserves_source_facts(self):
        merged = merge_ai_overlay(self.deterministic, self.valid_overlay)

        self.assertEqual("ai", merged["fallbackMode"])
        self.assertEqual("Review the contract first", merged["focus"]["title"])
        self.assertEqual(
            "This is the clearest blocker for the private dashboard.",
            merged["focus"]["why"],
        )
        for field in ("id", "due", "effort"):
            self.assertEqual(self.deterministic["focus"][field], merged["focus"][field])
        self.assertEqual(self.deterministic["focus"]["evidence"][0]["id"], merged["focus"]["evidence"][0]["id"])

    def test_invented_due_date_uses_deterministic_focus(self):
        overlay = copy.deepcopy(self.valid_overlay)
        overlay["focus"]["due"] = "2026-09-30"

        merged = merge_ai_overlay(self.deterministic, overlay)

        self.assertEqual("deterministic", merged["fallbackMode"])
        self.assertEqual(self.deterministic["focus"], merged["focus"])

    def test_unknown_evidence_id_uses_deterministic_focus(self):
        overlay = copy.deepcopy(self.valid_overlay)
        overlay["focus"]["evidence"][0]["id"] = "made-up-task"

        merged = merge_ai_overlay(self.deterministic, overlay)

        self.assertEqual("deterministic", merged["fallbackMode"])
        self.assertEqual(self.deterministic["focus"], merged["focus"])

    def test_invalid_overlay_fixture_uses_deterministic_focus(self):
        merged = merge_ai_overlay(
            self.deterministic,
            load_json(FIXTURES / "ai-overlay-invalid.json"),
        )

        self.assertEqual("deterministic", merged["fallbackMode"])
        self.assertEqual(self.deterministic["focus"], merged["focus"])

    def test_missing_overlay_uses_deterministic_focus(self):
        merged = merge_ai_overlay(self.deterministic, None)

        self.assertEqual("deterministic", merged["fallbackMode"])
        self.assertEqual(self.deterministic["focus"], merged["focus"])

    def test_previous_connections_are_retained_and_marked_stale(self):
        deterministic = copy.deepcopy(self.deterministic)
        deterministic["connections"] = []
        previous = copy.deepcopy(self.deterministic)

        merged = merge_ai_overlay(deterministic, None, previous=previous)

        self.assertEqual(previous["connections"], merged["connections"])
        self.assertIn(
            {"source": "connections", "reason": "Retained from the previous valid snapshot.", "stale": True},
            merged["uncertainty"],
        )


class SnapshotPublishingTests(unittest.TestCase):
    def setUp(self):
        self.snapshot = load_json(EXAMPLE)

    def test_snapshot_write_uses_atomic_replace_and_cleans_temp_file(self):
        with tempfile.TemporaryDirectory() as directory:
            target = Path(directory) / "dashboard-snapshot.json"
            target.write_text('{"old": true}\n', encoding="utf-8")
            real_replace = os.replace
            replacements = []

            def record_replace(source, destination):
                replacements.append((Path(source), Path(destination)))
                real_replace(source, destination)

            with patch("scripts.calm_compass.pipeline.os.replace", side_effect=record_replace):
                publish_snapshot(self.snapshot, target, SCHEMA)

            self.assertEqual(self.snapshot, load_json(target))
            self.assertEqual(target, replacements[-1][1])
            self.assertNotEqual(target, replacements[-1][0])
            self.assertEqual([], list(target.parent.glob(f".{target.name}.*.tmp")))

    def test_replace_failure_preserves_previous_snapshot(self):
        with tempfile.TemporaryDirectory() as directory:
            target = Path(directory) / "dashboard-snapshot.json"
            previous = '{"previous": "valid"}\n'
            target.write_text(previous, encoding="utf-8")

            with patch("scripts.calm_compass.pipeline.os.replace", side_effect=OSError("replace failed")):
                with self.assertRaisesRegex(OSError, "replace failed"):
                    publish_snapshot(self.snapshot, target, SCHEMA)

            self.assertEqual(previous, target.read_text(encoding="utf-8"))
            self.assertEqual([], list(target.parent.glob(f".{target.name}.*.tmp")))

    def test_final_schema_validation_failure_preserves_previous_snapshot(self):
        with tempfile.TemporaryDirectory() as directory:
            target = Path(directory) / "dashboard-snapshot.json"
            previous = copy.deepcopy(self.snapshot)
            target.write_text(json.dumps(previous), encoding="utf-8")
            invalid = copy.deepcopy(self.snapshot)
            invalid["email_body"] = "must never be written"

            with self.assertRaises(ValidationError):
                publish_snapshot(invalid, target, SCHEMA)

            self.assertEqual(previous, load_json(target))

    def test_history_is_bounded_to_newest_snapshots(self):
        with tempfile.TemporaryDirectory() as directory:
            target = Path(directory) / "dashboard-snapshot.json"
            history = Path(directory) / "history"
            generated = []
            for day in range(1, 6):
                snapshot = copy.deepcopy(self.snapshot)
                timestamp = f"2026-08-{day:02d}T06:30:00.000Z"
                snapshot["generatedAt"] = timestamp
                generated.append(timestamp)
                publish_snapshot(snapshot, target, SCHEMA, history_dir=history, history_limit=3)

            history_files = sorted(history.glob("*.json"))
            self.assertEqual(3, len(history_files))
            self.assertEqual(generated[-3:], [load_json(path)["generatedAt"] for path in history_files])


if __name__ == "__main__":
    unittest.main()
