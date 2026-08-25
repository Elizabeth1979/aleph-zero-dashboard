import copy
import unittest
from datetime import datetime
from zoneinfo import ZoneInfo

from scripts.calm_compass.engine import choose_continue, choose_quick_win, rank_focus


NOW = datetime(2026, 8, 25, 12, tzinfo=ZoneInfo("Asia/Jerusalem"))


def candidate(identifier, due=None, urgent=False, effort="medium"):
    return {
        "id": identifier,
        "title": identifier.replace("-", " ").title(),
        "due": due,
        "urgent": urgent,
        "effort": effort,
        "source": "tasks",
    }


class FocusRankingTests(unittest.TestCase):
    def test_overdue_outranks_due_today(self):
        result = rank_focus(
            [candidate("today", "2026-08-25"), candidate("overdue", "2026-08-24")],
            NOW,
        )
        self.assertEqual(result["id"], "overdue")

    def test_due_today_outranks_due_soon(self):
        result = rank_focus(
            [candidate("soon", "2026-08-28"), candidate("today", "2026-08-25")],
            NOW,
        )
        self.assertEqual(result["id"], "today")

    def test_due_soon_outranks_undated_urgent(self):
        result = rank_focus(
            [candidate("urgent", urgent=True), candidate("soon", "2026-08-28")],
            NOW,
        )
        self.assertEqual(result["id"], "soon")

    def test_future_due_date_does_not_create_urgency(self):
        result = rank_focus([candidate("future", "2026-10-30")], NOW)
        self.assertEqual(result["priority"], "normal")
        self.assertNotIn("urgent", result["why"].lower())

    def test_missing_due_date_remains_missing(self):
        result = rank_focus([candidate("undated", urgent=True)], NOW)
        self.assertIsNone(result["due"])

    def test_quick_win_selects_short_work_other_than_focus(self):
        original = [
            candidate("focus", effort="quick"),
            candidate("deep", effort="deep"),
            candidate("small", effort="quick"),
        ]
        result = choose_quick_win(original, "focus")
        self.assertEqual(result["id"], "small")

    def test_continue_selects_recent_meaningful_project_with_evidence(self):
        activity = [
            {"id": "old", "project_id": "alpha", "title": "Old", "meaningful": True, "worked_at": "2026-08-20T10:00:00+03:00"},
            {"id": "latest", "project_id": "beta", "title": "Resume beta", "meaningful": True, "worked_at": "2026-08-25T09:00:00+03:00"},
            {"id": "noise", "project_id": "gamma", "title": "Noise", "meaningful": False, "worked_at": "2026-08-25T11:00:00+03:00"},
        ]
        result = choose_continue(activity, focus_id="other")
        self.assertEqual(result["id"], "latest")
        self.assertEqual(result["evidence"], [{"source": "recent_activity", "id": "latest", "reason": "Most recent meaningful project work"}])

    def test_empty_inputs_return_calm_fallback(self):
        result = rank_focus([], NOW)
        self.assertEqual(result["title"], "Nothing needs attention")
        self.assertEqual(result["evidence"], [])

    def test_ranking_does_not_mutate_candidates(self):
        candidates = [candidate("today", "2026-08-25")]
        before = copy.deepcopy(candidates)
        rank_focus(candidates, NOW)
        self.assertEqual(candidates, before)


if __name__ == "__main__":
    unittest.main()
