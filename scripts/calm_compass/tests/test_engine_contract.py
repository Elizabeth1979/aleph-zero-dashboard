import json
import unittest
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

from jsonschema import FormatChecker, validate

from scripts.calm_compass.engine import (
    choose_continue,
    choose_quick_win,
    detect_anomalies,
    diff_snapshots,
    find_connections,
    rank_focus,
)


ROOT = Path(__file__).resolve().parents[3]
NOW = datetime(2026, 8, 25, 12, tzinfo=ZoneInfo("Asia/Jerusalem"))


class EngineContractTests(unittest.TestCase):
    def test_deterministic_outputs_fit_canonical_snapshot_schema(self):
        example = json.loads(
            (ROOT / "calm-compass/private/dashboard-snapshot.example.json").read_text(encoding="utf-8")
        )
        schema = json.loads(
            (ROOT / "calm-compass/schema/dashboard-snapshot.schema.json").read_text(encoding="utf-8")
        )
        candidates = [
            {"id": "focus", "title": "Focus", "due": "2026-08-25", "effort": "medium", "source": "tasks"},
            {"id": "quick", "title": "Quick", "due": None, "effort": "quick", "source": "tasks"},
        ]
        example["focus"] = rank_focus(candidates, NOW)
        example["quickWin"] = choose_quick_win(candidates, "focus")
        example["continueItem"] = choose_continue(
            [{"id": "activity", "project_id": "project", "title": "Continue project", "meaningful": True, "worked_at": "2026-08-25T09:00:00+03:00"}],
            "focus",
        )
        example["changes"] = diff_snapshots(
            {"tasks": []},
            {"tasks": [{"id": "new", "title": "New task", "status": "open"}]},
        )
        example["connections"] = find_connections(
            [{"id": "task", "title": "Task", "tags": ["compass"]}],
            [{"id": "resource", "title": "Resource", "tags": ["compass"]}],
            [],
        )
        example["anomalies"] = detect_anomalies(
            {
                "system": {
                    "vps_scheduler_active": True,
                    "mac_scheduler_active": True,
                    "sync_at": "2026-08-25T10:00:00+03:00",
                    "snapshot_at": "2026-08-25T10:00:00+03:00",
                }
            },
            NOW,
        )

        validate(example, schema, format_checker=FormatChecker())


if __name__ == "__main__":
    unittest.main()
