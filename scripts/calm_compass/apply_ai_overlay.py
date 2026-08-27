#!/usr/bin/env python3
import argparse
import json
import sys
from pathlib import Path
from typing import Any, Optional, Sequence

if __package__ in (None, ""):
    sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from scripts.calm_compass.pipeline import merge_ai_overlay, publish_snapshot


def parse_arguments(arguments: Optional[Sequence[str]] = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Validate and apply a Calm Compass AI overlay.")
    parser.add_argument("--deterministic", required=True, type=Path)
    parser.add_argument("--overlay", required=True, type=Path)
    parser.add_argument("--schema", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--history-dir", type=Path)
    parser.add_argument("--history-limit", type=int, default=7)
    return parser.parse_args(arguments)


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def main(arguments: Optional[Sequence[str]] = None) -> int:
    args = parse_arguments(arguments)
    try:
        deterministic = load_json(args.deterministic)
        overlay = load_json(args.overlay)
        if not isinstance(deterministic, dict):
            raise ValueError("deterministic snapshot must be a JSON object")
        if not isinstance(overlay, dict):
            raise ValueError("AI overlay must be a JSON object")
        snapshot = merge_ai_overlay(deterministic, overlay)
        publish_snapshot(
            snapshot,
            args.output,
            args.schema,
            history_dir=args.history_dir,
            history_limit=args.history_limit,
        )
    except (OSError, ValueError, json.JSONDecodeError) as error:
        print(f"error: {error}", flush=True)
        return 1
    print(args.output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
