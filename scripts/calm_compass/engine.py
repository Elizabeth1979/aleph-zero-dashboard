from datetime import date, datetime
from typing import Any, Dict, Iterable, List, Optional, Tuple


Evidence = Dict[str, str]
Record = Dict[str, Any]


def _due_date(value: Any) -> Optional[date]:
    if not isinstance(value, str) or not value:
        return None
    try:
        if len(value) == 10:
            return date.fromisoformat(value)
        return datetime.fromisoformat(value.replace("Z", "+00:00")).date()
    except ValueError:
        return None


def _focus_score(candidate: Record, today: date) -> Tuple[int, date, str]:
    due = _due_date(candidate.get("due"))
    if due is not None and due < today:
        tier = 0
    elif due == today:
        tier = 1
    elif due is not None and 0 < (due - today).days <= 7:
        tier = 2
    elif candidate.get("urgent") is True:
        tier = 3
    else:
        tier = 4
    return tier, due or date.max, str(candidate.get("id", ""))


def _focus_reason(candidate: Record, today: date) -> Tuple[str, str]:
    due = _due_date(candidate.get("due"))
    if due is not None and due < today:
        return "Overdue", "high"
    if due == today:
        return "Due today", "high"
    if due is not None and 0 < (due - today).days <= 7:
        return "Due within 7 days", "high"
    if candidate.get("urgent") is True:
        return "Explicitly marked urgent", "high"
    return "Open task", "normal"


def rank_focus(candidates: Iterable[Record], now: datetime) -> Record:
    available = [item for item in candidates if item.get("actionable", True)]
    if not available:
        return {
            "id": "nothing-needs-attention",
            "title": "Nothing needs attention",
            "due": None,
            "effort": "quick",
            "why": "No open actionable work was found.",
            "priority": "normal",
            "evidence": [],
        }
    selected = min(available, key=lambda item: _focus_score(item, now.date()))
    reason, priority = _focus_reason(selected, now.date())
    source = str(selected.get("source", "tasks"))
    identifier = str(selected.get("id", ""))
    return {
        "id": identifier,
        "title": str(selected.get("title", "")),
        "due": selected.get("due"),
        "effort": str(selected.get("effort", "medium")),
        "why": reason,
        "priority": priority,
        "evidence": [{"source": source, "id": identifier, "reason": reason}],
    }


def choose_quick_win(candidates: Iterable[Record], focus_id: str) -> Optional[Record]:
    choices = [
        item
        for item in candidates
        if str(item.get("id")) != focus_id
        and item.get("actionable", True)
        and item.get("effort") == "quick"
    ]
    if not choices:
        return None
    selected = min(
        choices,
        key=lambda item: (
            item.get("urgent") is not True,
            _due_date(item.get("due")) or date.max,
            str(item.get("id", "")),
        ),
    )
    identifier = str(selected.get("id", ""))
    return {
        "id": identifier,
        "title": str(selected.get("title", "")),
        "due": selected.get("due"),
        "effort": "quick",
        "why": "Short actionable work",
        "evidence": [
            {
                "source": str(selected.get("source", "tasks")),
                "id": identifier,
                "reason": "Marked as quick actionable work",
            }
        ],
    }


def choose_continue(
    recent_activity: Iterable[Record], focus_id: str
) -> Optional[Record]:
    choices = [
        item
        for item in recent_activity
        if item.get("meaningful") is True
        and item.get("project_id")
        and str(item.get("id")) != focus_id
    ]
    if not choices:
        return None
    selected = max(
        choices,
        key=lambda item: (str(item.get("worked_at", "")), str(item.get("id", ""))),
    )
    identifier = str(selected.get("id", ""))
    return {
        "id": identifier,
        "project_id": str(selected.get("project_id")),
        "title": str(selected.get("title", "")),
        "worked_at": selected.get("worked_at"),
        "evidence": [
            {
                "source": "recent_activity",
                "id": identifier,
                "reason": "Most recent meaningful project work",
            }
        ],
    }
