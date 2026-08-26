import copy
import json
import os
import tempfile
from pathlib import Path
from typing import Any, Dict, Optional, Set, Tuple

from jsonschema import FormatChecker, validate


Record = Dict[str, Any]
EvidenceKey = Tuple[str, str]
_FOCUS_KEYS = {"id", "title", "due", "timingReason", "effort", "why", "evidence"}
_SOURCE_FACT_KEYS = ("id", "due", "effort")


def _evidence_keys(value: Any) -> Set[EvidenceKey]:
    keys: Set[EvidenceKey] = set()
    if isinstance(value, dict):
        if {"source", "id", "reason"}.issubset(value):
            source = value.get("source")
            identifier = value.get("id")
            if isinstance(source, str) and isinstance(identifier, str):
                keys.add((source, identifier))
        for nested in value.values():
            keys.update(_evidence_keys(nested))
    elif isinstance(value, list):
        for nested in value:
            keys.update(_evidence_keys(nested))
    return keys


def _valid_overlay_focus(deterministic: Record, overlay: Any) -> bool:
    if not isinstance(overlay, dict) or set(overlay) != {"focus"}:
        return False
    focus = overlay.get("focus")
    baseline = deterministic.get("focus")
    if not isinstance(focus, dict) or not isinstance(baseline, dict):
        return False
    if set(focus) != _FOCUS_KEYS:
        return False
    if any(focus.get(key) != baseline.get(key) for key in _SOURCE_FACT_KEYS):
        return False
    for key in ("title", "why"):
        if not isinstance(focus.get(key), str) or not focus[key].strip():
            return False
    timing_reason = focus.get("timingReason")
    if timing_reason is not None and (
        not isinstance(timing_reason, str) or not timing_reason.strip()
    ):
        return False
    evidence = focus.get("evidence")
    if not isinstance(evidence, list) or not evidence:
        return False
    known_evidence = _evidence_keys(deterministic)
    for record in evidence:
        if not isinstance(record, dict) or set(record) != {"source", "id", "reason"}:
            return False
        if (record.get("source"), record.get("id")) not in known_evidence:
            return False
        if not isinstance(record.get("reason"), str) or not record["reason"].strip():
            return False
    return True


def merge_ai_overlay(
    deterministic: Record,
    overlay: Optional[Record],
    *,
    previous: Optional[Record] = None,
) -> Record:
    merged = copy.deepcopy(deterministic)
    merged["fallbackMode"] = "deterministic"

    if overlay is not None and _valid_overlay_focus(deterministic, overlay):
        merged["focus"] = copy.deepcopy(overlay["focus"])
        merged["fallbackMode"] = "ai"

    if (
        not merged.get("connections")
        and isinstance(previous, dict)
        and isinstance(previous.get("connections"), list)
        and previous["connections"]
    ):
        merged["connections"] = copy.deepcopy(previous["connections"])
        uncertainty = merged.setdefault("uncertainty", [])
        stale_note = {
            "source": "connections",
            "reason": "Retained from the previous valid snapshot.",
            "stale": True,
        }
        if stale_note not in uncertainty:
            uncertainty.append(stale_note)

    return merged


def _load_schema(schema_path: Path) -> Record:
    return json.loads(schema_path.read_text(encoding="utf-8"))


def _atomic_write_json(value: Record, target: Path) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary_name = tempfile.mkstemp(
        prefix=f".{target.name}.", suffix=".tmp", dir=target.parent
    )
    temporary = Path(temporary_name)
    try:
        with os.fdopen(descriptor, "w", encoding="utf-8") as handle:
            json.dump(value, handle, ensure_ascii=False, indent=2)
            handle.write("\n")
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(temporary, target)
        directory_descriptor = os.open(target.parent, os.O_RDONLY)
        try:
            os.fsync(directory_descriptor)
        finally:
            os.close(directory_descriptor)
    except BaseException:
        temporary.unlink(missing_ok=True)
        raise


def _history_name(snapshot: Record) -> str:
    generated_at = str(snapshot["generatedAt"])
    safe_timestamp = generated_at.replace(":", "-")
    return f"{safe_timestamp}.json"


def _write_bounded_history(
    snapshot: Record, history_dir: Path, history_limit: int
) -> None:
    history_dir.mkdir(parents=True, exist_ok=True)
    if history_limit <= 0:
        for path in history_dir.glob("*.json"):
            path.unlink()
        return
    _atomic_write_json(snapshot, history_dir / _history_name(snapshot))
    history_files = sorted(history_dir.glob("*.json"))
    for expired in history_files[:-history_limit]:
        expired.unlink()


def publish_snapshot(
    snapshot: Record,
    target: Path,
    schema_path: Path,
    *,
    history_dir: Optional[Path] = None,
    history_limit: int = 7,
) -> None:
    validate(snapshot, _load_schema(schema_path), format_checker=FormatChecker())
    _atomic_write_json(snapshot, target)
    if history_dir is not None:
        _write_bounded_history(snapshot, history_dir, history_limit)
