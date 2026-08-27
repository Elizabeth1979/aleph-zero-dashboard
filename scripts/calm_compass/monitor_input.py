#!/usr/bin/env python3
import argparse
import json
from pathlib import Path
from typing import Any, Optional, Sequence


_VOLATILE_KEYS = {
    "checkedat",
    "generatedat",
    "last_run",
    "lastrun",
    "snapshotat",
    "sync_at",
    "syncedat",
    "updatedat",
    "updated_at",
    "healthcount",
    "health_count",
}


def parse_arguments(arguments: Optional[Sequence[str]] = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Create stable Calm Compass monitor input.")
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    return parser.parse_args(arguments)


def _stable(value: Any) -> Any:
    if isinstance(value, dict):
        return {
            key: _stable(nested)
            for key, nested in sorted(value.items())
            if key.replace("-", "").casefold() not in _VOLATILE_KEYS
        }
    if isinstance(value, list):
        items = [_stable(item) for item in value]
        return sorted(items, key=lambda item: json.dumps(item, sort_keys=True, separators=(",", ":")))
    return value


def main(arguments: Optional[Sequence[str]] = None) -> int:
    args = parse_arguments(arguments)
    try:
        source = json.loads(args.input.read_text(encoding="utf-8"))
        stable_output = json.dumps(_stable(source), ensure_ascii=False, sort_keys=True, separators=(",", ":")) + "\n"
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(stable_output, encoding="utf-8")
    except (OSError, ValueError, json.JSONDecodeError) as error:
        print(f"error: {error}", flush=True)
        return 1
    print(args.output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
