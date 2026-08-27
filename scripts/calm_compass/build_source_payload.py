#!/usr/bin/env python3
import argparse
import json
import sys
from datetime import datetime
from pathlib import Path
from typing import Optional, Sequence

if __package__ in (None, ""):
    sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from scripts.calm_compass.collect import collect_sources


def parse_arguments(arguments: Optional[Sequence[str]] = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build a curated Calm Compass source payload.")
    parser.add_argument("--source-dir", required=True, type=Path)
    parser.add_argument("--vps-cron", required=True, type=Path)
    parser.add_argument("--mac-cron", required=True, type=Path)
    parser.add_argument("--now", required=True, help="ISO-8601 collection time")
    parser.add_argument("--output", required=True, type=Path)
    return parser.parse_args(arguments)


def main(arguments: Optional[Sequence[str]] = None) -> int:
    args = parse_arguments(arguments)
    try:
        now = datetime.fromisoformat(args.now.replace("Z", "+00:00"))
        if now.tzinfo is None:
            raise ValueError("--now must include a timezone")
        payload = collect_sources(args.source_dir, args.vps_cron, args.mac_cron, now).to_dict()
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    except (OSError, ValueError, json.JSONDecodeError) as error:
        print(f"error: {error}", flush=True)
        return 1
    print(args.output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
