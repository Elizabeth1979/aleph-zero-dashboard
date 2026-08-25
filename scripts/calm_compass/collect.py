import json
from datetime import date, datetime
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple
from zoneinfo import ZoneInfo

from .models import (
    CollectedSources,
    CronJob,
    CronSummary,
    EmailSummary,
    Project,
    Resource,
    SourceFreshness,
    Task,
)

JERUSALEM = ZoneInfo("Asia/Jerusalem")


def _normalize_date(value: Any) -> Optional[str]:
    if not isinstance(value, str) or not value.strip():
        return None
    raw = value.strip()
    try:
        if len(raw) == 10:
            return date.fromisoformat(raw).isoformat()
        parsed = datetime.fromisoformat(raw.replace("Z", "+00:00"))
        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=JERUSALEM)
        return parsed.astimezone(JERUSALEM).isoformat()
    except ValueError:
        return None


def _read_json(path: Path) -> Tuple[Any, Optional[str]]:
    try:
        return json.loads(path.read_text(encoding="utf-8")), None
    except FileNotFoundError:
        return None, "missing"
    except (OSError, json.JSONDecodeError):
        return None, "invalid"


def _records(value: Any) -> List[Dict[str, Any]]:
    if not isinstance(value, list):
        return []
    return [item for item in value if isinstance(item, dict) and "_instructions" not in item]


def _string_list(value: Any) -> List[str]:
    if not isinstance(value, list):
        return []
    return [item for item in value if isinstance(item, str)]


def _freshness(error: Optional[str], now: datetime) -> SourceFreshness:
    return SourceFreshness(
        status="fresh" if error is None else "stale",
        checked_at=now.astimezone(JERUSALEM).isoformat(),
        reason=error,
    )


def collect_sources(
    source_dir: Path,
    vps_cron_path: Path,
    mac_cron_path: Path,
    now: datetime,
) -> CollectedSources:
    source_dir = Path(source_dir)
    loaded = {}
    freshness = {}
    for name in ("tasks", "emails", "projects", "resources"):
        value, error = _read_json(source_dir / (name + ".json"))
        if error is None and not isinstance(value, list):
            error = "invalid_structure"
        loaded[name] = _records(value)
        freshness[name] = _freshness(error, now)

    tasks = [
        Task(
            id=str(item.get("id", "")),
            title=str(item.get("title") or item.get("task") or ""),
            due=_normalize_date(item.get("due")),
            urgent=item.get("urgent") is True,
            description=item.get("description") if isinstance(item.get("description"), str) else None,
            tags=_string_list(item.get("tags")),
        )
        for item in loaded["tasks"]
        if item.get("id") is not None and (item.get("title") or item.get("task"))
    ]
    emails = [
        EmailSummary(
            id=str(item.get("id", "")),
            sender=str(item.get("sender", "")),
            action=str(item.get("action", "")),
            deadline=_normalize_date(item.get("deadline")),
        )
        for item in loaded["emails"]
        if item.get("id") is not None and item.get("action")
    ]
    projects = [
        Project(
            id=str(item.get("id", "")),
            title=str(item.get("name") or item.get("title") or ""),
            status=str(item.get("status", "unknown")),
            description=item.get("description") if isinstance(item.get("description"), str) else None,
            tags=_string_list(item.get("tags")),
        )
        for item in loaded["projects"]
        if item.get("id") is not None and (item.get("name") or item.get("title"))
    ]
    resources = [
        Resource(
            id=str(item.get("id", "")),
            title=str(item.get("title", "")),
            status=str(item.get("status", "unknown")),
            added=_normalize_date(item.get("added")),
            tags=_string_list(item.get("tags")),
        )
        for item in loaded["resources"]
        if item.get("id") is not None and item.get("title")
    ]

    vps_data, vps_error = _read_json(Path(vps_cron_path))
    mac_data, mac_error = _read_json(Path(mac_cron_path))
    if vps_error is None and (
        not isinstance(vps_data, dict) or not isinstance(vps_data.get("jobs"), list)
    ):
        vps_error = "invalid_structure"
    if mac_error is None and (
        not isinstance(mac_data, dict) or not isinstance(mac_data.get("jobs"), list)
    ):
        mac_error = "invalid_structure"
    vps_data = vps_data if isinstance(vps_data, dict) else {}
    mac_data = mac_data if isinstance(mac_data, dict) else {}
    vps_jobs = vps_data.get("jobs") if isinstance(vps_data.get("jobs"), list) else []
    mac_job_records = mac_data.get("jobs") if isinstance(mac_data.get("jobs"), list) else []
    jobs = [
        CronJob(
            id=str(item.get("id", "")),
            name=str(item.get("name", "")),
            enabled=item.get("enabled") is True,
            last_status=item.get("last_status") if isinstance(item.get("last_status"), str) else None,
            last_run=_normalize_date(item.get("last_run")),
        )
        for item in vps_jobs
        if isinstance(item, dict) and item.get("id") is not None
    ]
    mac_jobs = [item for item in mac_job_records if isinstance(item, dict)]
    cron = CronSummary(
        vps_scheduler_active=vps_data.get("scheduler_active") is True,
        mac_mirror_paused=mac_data.get("scheduler_active") is not True
        and not any(job.get("enabled") is True for job in mac_jobs),
        jobs=jobs,
    )
    freshness["cron_vps"] = _freshness(vps_error, now)
    freshness["cron_mac"] = _freshness(mac_error, now)

    return CollectedSources(tasks, emails, projects, resources, cron, freshness)
