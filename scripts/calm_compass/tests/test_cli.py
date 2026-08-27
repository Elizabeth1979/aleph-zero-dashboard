import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
FIXTURES = Path(__file__).parent / "fixtures"
SCHEMA = ROOT / "calm-compass/schema/dashboard-snapshot.schema.json"
EXAMPLE = ROOT / "calm-compass/private/dashboard-snapshot.example.json"
BUILD = ROOT / "scripts/calm_compass/build_source_payload.py"
APPLY = ROOT / "scripts/calm_compass/apply_ai_overlay.py"


def run(script, *args):
    return subprocess.run(
        [sys.executable, str(script), *map(str, args)],
        cwd=ROOT,
        text=True,
        capture_output=True,
        check=False,
    )


class CalmCompassCliTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary.name)
        self.sources = self.root / "sources"
        self.sources.mkdir()
        for name in ("tasks.json", "emails.json"):
            (self.sources / name).write_text((FIXTURES / name).read_text(), encoding="utf-8")
        self.vps_cron = self.root / "vps.json"
        self.mac_cron = self.root / "mac.json"
        self.vps_cron.write_text((FIXTURES / "vps-cron.json").read_text(), encoding="utf-8")
        self.mac_cron.write_text((FIXTURES / "mac-cron.json").read_text(), encoding="utf-8")

    def tearDown(self):
        self.temporary.cleanup()

    def test_build_source_payload_writes_curated_json_to_requested_path(self):
        output = self.root / "payload.json"

        result = run(
            BUILD,
            "--source-dir", self.sources,
            "--vps-cron", self.vps_cron,
            "--mac-cron", self.mac_cron,
            "--now", "2026-08-25T12:00:00+03:00",
            "--output", output,
        )

        self.assertEqual(0, result.returncode, result.stderr)
        self.assertEqual(str(output), result.stdout.strip())
        payload = json.loads(output.read_text())
        self.assertEqual("task-1", payload["tasks"][0]["id"])
        self.assertNotIn("private_note", json.dumps(payload))
        self.assertNotIn("bank details", json.dumps(payload))

    def test_apply_ai_overlay_publishes_valid_overlay_to_requested_path(self):
        deterministic = self.root / "deterministic.json"
        target = self.root / "snapshot.json"
        deterministic.write_text(EXAMPLE.read_text(), encoding="utf-8")

        result = run(
            APPLY,
            "--deterministic", deterministic,
            "--overlay", FIXTURES / "ai-overlay-valid.json",
            "--schema", SCHEMA,
            "--output", target,
        )

        self.assertEqual(0, result.returncode, result.stderr)
        self.assertEqual(str(target), result.stdout.strip())
        self.assertEqual("ai", json.loads(target.read_text())["fallbackMode"])

    def test_invalid_overlay_json_fails_without_modifying_current_snapshot(self):
        deterministic = self.root / "deterministic.json"
        overlay = self.root / "overlay.json"
        target = self.root / "snapshot.json"
        deterministic.write_text(EXAMPLE.read_text(), encoding="utf-8")
        overlay.write_text("{ definitely not json", encoding="utf-8")
        previous = '{"previous": true}\n'
        target.write_text(previous, encoding="utf-8")

        result = run(
            APPLY,
            "--deterministic", deterministic,
            "--overlay", overlay,
            "--schema", SCHEMA,
            "--output", target,
        )

        self.assertNotEqual(0, result.returncode)
        self.assertEqual(previous, target.read_text(encoding="utf-8"))


if __name__ == "__main__":
    unittest.main()
