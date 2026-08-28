import json
import tempfile
import unittest
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

from scripts.calm_compass.collect import collect_sources


FIXTURES = Path(__file__).parent / "fixtures"


class CollectSourcesTests(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.root = Path(self.temp_dir.name)
        for name in ("tasks.json", "emails.json"):
            (self.root / name).write_text(
                (FIXTURES / name).read_text(encoding="utf-8"), encoding="utf-8"
            )
        self.vps_cron = self.root / "vps-cron.json"
        self.mac_cron = self.root / "mac-cron.json"
        self.vps_cron.write_text(
            (FIXTURES / "vps-cron.json").read_text(encoding="utf-8"),
            encoding="utf-8",
        )
        self.mac_cron.write_text(
            (FIXTURES / "mac-cron.json").read_text(encoding="utf-8"),
            encoding="utf-8",
        )

    def tearDown(self):
        self.temp_dir.cleanup()

    def collect(self):
        return collect_sources(
            source_dir=self.root,
            vps_cron_path=self.vps_cron,
            mac_cron_path=self.mac_cron,
            now=datetime(2026, 8, 25, 12, tzinfo=ZoneInfo("Asia/Jerusalem")),
        )

    def test_excludes_instruction_entries(self):
        result = self.collect()
        self.assertEqual([task.id for task in result.tasks], ["task-1"])

    def test_missing_optional_files_are_stale_instead_of_crashing(self):
        result = self.collect()
        self.assertEqual(result.source_freshness["projects"].status, "stale")
        self.assertEqual(result.source_freshness["resources"].status, "stale")

    def test_tasks_keep_only_curated_fields(self):
        task = self.collect().tasks[0]
        self.assertEqual(
            task.to_dict(),
            {
                "id": "task-1",
                "title": "Reply to accountant",
                "due": "2026-08-26T00:30:00+03:00",
                "urgent": True,
                "description": "Send the requested document.",
                "tags": ["Company"],
            },
        )
        self.assertNotIn("private_note", task.to_dict())

    def test_email_summaries_discard_message_bodies(self):
        email = self.collect().emails[0]
        self.assertEqual(
            email.to_dict(),
            {
                "id": "mail-1",
                "sender": "Accountant",
                "action": "Reply with the annual statement",
                "deadline": "2026-08-27T10:00:00+03:00",
            },
        )
        self.assertNotIn("body", json.dumps(email.to_dict()))
        self.assertNotIn("bank details", json.dumps(email.to_dict()))

    def test_cron_uses_canonical_mac_store_and_only_reports_vps_pause_state(self):
        cron = self.collect().cron
        self.assertEqual([job.id for job in cron.jobs], ["morning-brief"])
        self.assertTrue(cron.mac_scheduler_active)
        self.assertTrue(cron.vps_mirror_paused)
        self.assertNotEqual(cron.jobs[0].id, "paused-vps-copy")

    def test_dates_normalize_to_asia_jerusalem(self):
        result = self.collect()
        self.assertEqual(result.tasks[0].due, "2026-08-26T00:30:00+03:00")
        self.assertEqual(result.emails[0].deadline, "2026-08-27T10:00:00+03:00")

    def test_parseable_non_list_source_is_marked_stale(self):
        (self.root / "tasks.json").write_text('{"tasks": []}', encoding="utf-8")
        result = self.collect()
        self.assertEqual(result.tasks, [])
        self.assertEqual(result.source_freshness["tasks"].status, "stale")
        self.assertEqual(result.source_freshness["tasks"].reason, "invalid_structure")

    def test_null_tags_and_cron_jobs_do_not_crash_collection(self):
        (self.root / "tasks.json").write_text(
            '[{"id": "t1", "task": "Safe task", "tags": null}]', encoding="utf-8"
        )
        self.vps_cron.write_text('{"scheduler_active": false, "jobs": null}', encoding="utf-8")
        self.mac_cron.write_text('{"scheduler_active": true, "jobs": null}', encoding="utf-8")
        result = self.collect()
        self.assertEqual(result.tasks[0].tags, [])
        self.assertEqual(result.cron.jobs, [])
        self.assertEqual(result.source_freshness["cron_vps"].reason, "invalid_structure")


if __name__ == "__main__":
    unittest.main()
