import unittest
from datetime import datetime
from zoneinfo import ZoneInfo

from scripts.calm_compass.engine import detect_anomalies


NOW = datetime(2026, 8, 25, 12, tzinfo=ZoneInfo("Asia/Jerusalem"))


def healthy_snapshot(**overrides):
    value = {
        "system": {
            "vps_scheduler_active": True,
            "mac_scheduler_active": False,
            "sync_at": "2026-08-25T10:00:00+03:00",
            "snapshot_at": "2026-08-25T10:00:00+03:00",
        },
        "automations": [],
        "reminders": [],
        "tasks": [],
        "commitments": [],
    }
    value.update(overrides)
    return value


class AnomalyDetectionTests(unittest.TestCase):
    def test_vps_active_and_mac_paused_is_healthy(self):
        self.assertEqual(detect_anomalies(healthy_snapshot(), NOW), [])

    def test_both_schedulers_enabled_is_an_ownership_anomaly(self):
        data = healthy_snapshot()
        data["system"]["mac_scheduler_active"] = True
        kinds = [item["kind"] for item in detect_anomalies(data, NOW)]
        self.assertIn("scheduler_ownership", kinds)

    def test_stale_sync_and_snapshot_are_anomalies(self):
        data = healthy_snapshot()
        data["system"]["sync_at"] = "2026-08-23T10:00:00+03:00"
        data["system"]["snapshot_at"] = "2026-08-23T10:00:00+03:00"
        kinds = [item["kind"] for item in detect_anomalies(data, NOW)]
        self.assertEqual(kinds, ["stale_sync", "stale_snapshot"])

    def test_historic_error_followed_by_success_is_healthy(self):
        data = healthy_snapshot(
            automations=[{
                "id": "cron1",
                "title": "Morning Brief",
                "last_status": "ok",
                "last_error_at": "2026-08-25T08:00:00+03:00",
                "last_success_at": "2026-08-25T09:00:00+03:00",
            }]
        )
        self.assertEqual(detect_anomalies(data, NOW), [])

    def test_duplicate_reminders_are_an_anomaly(self):
        data = healthy_snapshot(reminders=[
            {"id": "r1", "title": "Pay fee", "due": "2026-08-31"},
            {"id": "r2", "title": "  PAY   FEE ", "due": "2026-08-31"},
        ])
        self.assertIn("duplicate_reminder", [item["kind"] for item in detect_anomalies(data, NOW)])

    def test_more_than_three_urgent_tasks_is_overload(self):
        data = healthy_snapshot(tasks=[{"id": str(i), "title": "Task", "urgent": True} for i in range(4)])
        self.assertIn("urgent_overload", [item["kind"] for item in detect_anomalies(data, NOW)])

    def test_conflicting_dates_are_an_anomaly(self):
        data = healthy_snapshot(tasks=[{
            "id": "t1",
            "title": "Pay fee",
            "dates": ["2026-08-30", "2026-08-31"],
        }])
        self.assertIn("conflicting_dates", [item["kind"] for item in detect_anomalies(data, NOW)])

    def test_commitment_without_next_action_is_an_anomaly(self):
        data = healthy_snapshot(commitments=[{"id": "c1", "title": "Send proposal", "next_action": None}])
        self.assertIn("missing_next_action", [item["kind"] for item in detect_anomalies(data, NOW)])


if __name__ == "__main__":
    unittest.main()
