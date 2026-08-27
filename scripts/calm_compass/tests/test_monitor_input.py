import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
SCRIPT = ROOT / "scripts/calm_compass/monitor_input.py"


def run(*args):
    return subprocess.run(
        [sys.executable, str(SCRIPT), *map(str, args)],
        cwd=ROOT,
        text=True,
        capture_output=True,
        check=False,
    )


class MonitorInputTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary.name)

    def tearDown(self):
        self.temporary.cleanup()

    def monitor(self, name, value):
        source = self.root / f"{name}.json"
        output = self.root / f"{name}.txt"
        source.write_text(json.dumps(value), encoding="utf-8")
        result = run("--input", source, "--output", output)
        self.assertEqual(0, result.returncode, result.stderr)
        self.assertEqual(str(output), result.stdout.strip())
        return output.read_text(encoding="utf-8")

    def test_equivalent_inputs_ignore_timestamps_and_record_order(self):
        first = {
            "generatedAt": "2026-08-25T06:30:00Z",
            "tasks": [
                {"id": "two", "title": "Second", "updatedAt": "2026-08-25T06:31:00Z"},
                {"id": "one", "title": "First", "updatedAt": "2026-08-25T06:30:00Z"},
            ],
        }
        equivalent = {
            "generatedAt": "2026-08-26T12:00:00Z",
            "tasks": [
                {"id": "one", "title": "First", "updatedAt": "2026-08-26T12:00:00Z"},
                {"id": "two", "title": "Second", "updatedAt": "2026-08-26T12:01:00Z"},
            ],
        }

        self.assertEqual(self.monitor("first", first), self.monitor("equivalent", equivalent))

    def test_task_addition_changes_stable_output(self):
        baseline = {"tasks": [{"id": "one", "title": "First"}]}
        changed = {"tasks": [{"id": "one", "title": "First"}, {"id": "two", "title": "Second"}]}

        self.assertNotEqual(self.monitor("baseline", baseline), self.monitor("changed", changed))


if __name__ == "__main__":
    unittest.main()
