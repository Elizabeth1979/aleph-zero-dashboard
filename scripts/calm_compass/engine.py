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


def _index(records: Any) -> Dict[str, Record]:
    if not isinstance(records, list):
        return {}
    return {
        str(record.get("id")): record
        for record in records
        if isinstance(record, dict) and record.get("id") is not None
    }


def _change(kind: str, record: Record, summary: str, impact: str) -> Record:
    return {
        "kind": kind,
        "title": str(record.get("title", "")),
        "summary": summary,
        "source_id": str(record.get("id", "")),
        "impact": impact,
    }


def diff_snapshots(previous: Record, current: Record, limit: int = 20) -> List[Record]:
    changes: List[Record] = []
    previous_tasks = _index(previous.get("tasks"))
    current_tasks = _index(current.get("tasks"))
    for identifier, task in current_tasks.items():
        before = previous_tasks.get(identifier)
        if before is None:
            changes.append(_change("task_new", task, "New open task", "attention"))
            continue
        if before.get("status") != "completed" and task.get("status") == "completed":
            changes.append(_change("task_completed", task, "Task completed", "positive"))
        if before.get("due_soon") is not True and task.get("due_soon") is True:
            changes.append(
                _change("deadline_due_soon", task, "Deadline entered the due-soon window", "attention")
            )

    previous_resources = _index(previous.get("resources"))
    for identifier, resource in _index(current.get("resources")).items():
        if identifier not in previous_resources:
            changes.append(_change("resource_new", resource, "New saved resource", "informational"))

    previous_projects = _index(previous.get("projects"))
    for identifier, project in _index(current.get("projects")).items():
        before = previous_projects.get(identifier)
        if before is not None and before.get("blocked") is True and project.get("blocked") is False:
            changes.append(_change("project_unblocked", project, "Project is no longer blocked", "positive"))

    previous_automations = _index(previous.get("automations"))
    for identifier, automation in _index(current.get("automations")).items():
        before = previous_automations.get(identifier)
        if before is None:
            continue
        old_status = before.get("status")
        new_status = automation.get("status")
        if old_status != "error" and new_status == "error":
            changes.append(_change("automation_failed", automation, "Automation failed", "attention"))
        elif old_status == "error" and new_status == "ok":
            changes.append(_change("automation_recovered", automation, "Automation recovered", "positive"))

    return changes[: max(0, limit)]
