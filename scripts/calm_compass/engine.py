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


def _parse_datetime(value: Any) -> Optional[datetime]:
    if not isinstance(value, str) or not value:
        return None
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return None


def _anomaly(kind: str, title: str, summary: str, source_id: str) -> Record:
    return {
        "kind": kind,
        "title": title,
        "summary": summary,
        "source_id": source_id,
        "impact": "attention",
    }


def _normalized_text(value: Any) -> str:
    return " ".join(str(value or "").casefold().split())


def _record_list(value: Any) -> List[Record]:
    if not isinstance(value, list):
        return []
    return [item for item in value if isinstance(item, dict)]


def detect_anomalies(snapshot: Record, now: datetime) -> List[Record]:
    anomalies: List[Record] = []
    system_value = snapshot.get("system")
    system: Record = system_value if isinstance(system_value, dict) else {}
    if system.get("vps_scheduler_active") is True and system.get("mac_scheduler_active") is True:
        anomalies.append(
            _anomaly(
                "scheduler_ownership",
                "Scheduler ownership conflict",
                "VPS and Mac schedulers are both active",
                "scheduler",
            )
        )

    for field, kind, title in (
        ("sync_at", "stale_sync", "Synchronization is stale"),
        ("snapshot_at", "stale_snapshot", "Dashboard snapshot is stale"),
    ):
        timestamp = _parse_datetime(system.get(field))
        if timestamp is not None and (now - timestamp).total_seconds() > 24 * 60 * 60:
            anomalies.append(_anomaly(kind, title, "Last successful update is over 24 hours old", field))

    for automation in _record_list(snapshot.get("automations")):
        error_at = _parse_datetime(automation.get("last_error_at"))
        success_at = _parse_datetime(automation.get("last_success_at"))
        unresolved_error = automation.get("last_status") == "error" and (
            success_at is None or error_at is None or success_at <= error_at
        )
        if unresolved_error:
            anomalies.append(
                _anomaly(
                    "automation_failure",
                    str(automation.get("title", "Automation failed")),
                    "Latest automation result is an unresolved error",
                    str(automation.get("id", "")),
                )
            )

    reminders = _record_list(snapshot.get("reminders"))
    reminder_keys: Dict[Tuple[str, str], str] = {}
    for reminder in reminders:
        key = (_normalized_text(reminder.get("title")), str(reminder.get("due") or ""))
        if key in reminder_keys:
            anomalies.append(
                _anomaly(
                    "duplicate_reminder",
                    str(reminder.get("title", "Duplicate reminder")),
                    "Another reminder has the same title and due date",
                    str(reminder.get("id", "")),
                )
            )
        else:
            reminder_keys[key] = str(reminder.get("id", ""))

    tasks = _record_list(snapshot.get("tasks"))
    urgent_tasks = [item for item in tasks if item.get("urgent") is True]
    if len(urgent_tasks) > 3:
        anomalies.append(
            _anomaly(
                "urgent_overload",
                "Too many urgent tasks",
                str(len(urgent_tasks)) + " tasks are marked urgent",
                "tasks",
            )
        )
    for task in tasks:
        dates = task.get("dates") if isinstance(task.get("dates"), list) else []
        normalized_dates = {str(value) for value in dates if value}
        if len(normalized_dates) > 1:
            anomalies.append(
                _anomaly(
                    "conflicting_dates",
                    str(task.get("title", "Conflicting dates")),
                    "The same task has conflicting dates",
                    str(task.get("id", "")),
                )
            )

    for commitment in _record_list(snapshot.get("commitments")):
        if not _normalized_text(commitment.get("next_action")):
            anomalies.append(
                _anomaly(
                    "missing_next_action",
                    str(commitment.get("title", "Commitment needs a next action")),
                    "Open commitment has no next action",
                    str(commitment.get("id", "")),
                )
            )

    source_freshness = snapshot.get("source_freshness")
    freshness_records = source_freshness if isinstance(source_freshness, dict) else {}
    for source, freshness in freshness_records.items():
        if isinstance(freshness, dict) and freshness.get("reason") == "missing":
            anomalies.append(
                _anomaly(
                    "missing_source",
                    "Source file is missing",
                    "A configured source file could not be read",
                    str(source),
                )
            )
    return anomalies
