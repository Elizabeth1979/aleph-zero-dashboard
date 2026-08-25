import unittest

from scripts.calm_compass.engine import diff_snapshots


def snapshot(**overrides):
    value = {
        "generated_at": "2026-08-25T08:00:00+03:00",
        "tasks": [],
        "resources": [],
        "projects": [],
        "automations": [],
        "counts": {},
    }
    value.update(overrides)
    return value


class SnapshotChangeTests(unittest.TestCase):
    def test_reports_new_task(self):
        changes = diff_snapshots(snapshot(), snapshot(tasks=[{"id": "t1", "title": "New task", "status": "open"}]))
        self.assertEqual(changes[0]["kind"], "task_new")
        self.assertEqual(changes[0]["source_id"], "t1")

    def test_reports_completed_task(self):
        previous = snapshot(tasks=[{"id": "t1", "title": "Finish report", "status": "open"}])
        current = snapshot(tasks=[{"id": "t1", "title": "Finish report", "status": "completed"}])
        changes = diff_snapshots(previous, current)
        self.assertEqual([change["kind"] for change in changes], ["task_completed"])

    def test_reports_deadline_entering_due_soon(self):
        previous = snapshot(tasks=[{"id": "t1", "title": "Pay fee", "status": "open", "due_soon": False}])
        current = snapshot(tasks=[{"id": "t1", "title": "Pay fee", "status": "open", "due_soon": True}])
        changes = diff_snapshots(previous, current)
        self.assertEqual([change["kind"] for change in changes], ["deadline_due_soon"])

    def test_reports_new_resource(self):
        current = snapshot(resources=[{"id": "r1", "title": "Useful guide"}])
        self.assertEqual(diff_snapshots(snapshot(), current)[0]["kind"], "resource_new")

    def test_reports_project_unblock(self):
        previous = snapshot(projects=[{"id": "p1", "title": "Compass", "blocked": True}])
        current = snapshot(projects=[{"id": "p1", "title": "Compass", "blocked": False}])
        self.assertEqual(diff_snapshots(previous, current)[0]["kind"], "project_unblocked")

    def test_reports_automation_failure_and_recovery(self):
        healthy = snapshot(automations=[{"id": "cron1", "title": "Morning Brief", "status": "ok"}])
        failed = snapshot(automations=[{"id": "cron1", "title": "Morning Brief", "status": "error"}])
        self.assertEqual(diff_snapshots(healthy, failed)[0]["kind"], "automation_failed")
        self.assertEqual(diff_snapshots(failed, healthy)[0]["kind"], "automation_recovered")

    def test_omits_unchanged_counts_and_generated_timestamps(self):
        previous = snapshot(counts={"tasks": 3})
        current = snapshot(generated_at="2026-08-26T08:00:00+03:00", counts={"tasks": 99})
        self.assertEqual(diff_snapshots(previous, current), [])

    def test_bounds_results(self):
        current = snapshot(tasks=[{"id": str(i), "title": "Task " + str(i), "status": "open"} for i in range(30)])
        self.assertEqual(len(diff_snapshots(snapshot(), current)), 20)


if __name__ == "__main__":
    unittest.main()
