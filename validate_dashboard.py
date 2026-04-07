#!/usr/bin/env python3
import json
import os
import re
import sys
from pathlib import Path

DASH = Path.home() / '.hermes' / 'dashboard'
ZSHRC = Path.home() / '.zshrc'

errors = []


def must(condition, message):
    if not condition:
        errors.append(message)


def read_text(path):
    try:
        return Path(path).read_text(encoding='utf-8')
    except Exception as e:
        errors.append(f'Cannot read {path}: {e}')
        return ''

publish_text = read_text(DASH / 'publish.sh')
refresh_text = read_text(DASH / 'refresh.sh')
update_tasks_text = read_text(DASH / 'update_tasks.sh')
commands_text = read_text(DASH / 'commands.json')
config_page = read_text(DASH / 'pages' / 'config.html')
checklist_text = read_text(DASH / 'dashboard_checklist.json')
zshrc_text = read_text(ZSHRC)

must((DASH / 'publish.sh').exists(), 'publish.sh is missing')
must((DASH / 'refresh.sh').exists(), 'refresh.sh is missing')
must((DASH / 'dashboard_checklist.json').exists(), 'dashboard_checklist.json is missing')
must((DASH / 'validate_dashboard.py').exists(), 'validate_dashboard.py is missing')

must('validate_dashboard.py' in publish_text, 'publish.sh must run validate_dashboard.py')
must('bash ~/.hermes/dashboard/publish.sh' in refresh_text, 'refresh.sh must point to publish.sh as canonical publish path')
must('bash ~/.hermes/dashboard/publish.sh' in update_tasks_text, 'update_tasks.sh must delegate to publish.sh')
must('alias dashboard-publish=' in zshrc_text, '.zshrc must expose dashboard-publish alias')
must('dashboard-publish' in commands_text, 'commands.json must include dashboard-publish')
internals_page = read_text(DASH / 'pages' / 'dashboard_internals.html')

must('dashboard_files:' in refresh_text, 'refresh.sh must export dashboard_files into data.js')
agent_map_page = read_text(DASH / 'pages' / 'agent_map.html')

must('dashboard_internals.html' in config_page, 'Config page must link to Dashboard Internals')
must('dashboard_files' in internals_page, 'Dashboard Internals page must read dashboard_files data')
must('Visual Flow Map' in internals_page or 'Visual map' in internals_page or 'flowmap' in internals_page, 'Dashboard Internals page must include the visual flow map section')
must('file-overlay' in internals_page, 'Dashboard Internals page must include clickable file modal overlay')
must('agent_map.html' in internals_page, 'Dashboard Internals page must link to the full visual agent map')
must('Big-picture view' in agent_map_page, 'Agent map page must include the big-picture visual overview')

try:
    commands = json.loads(commands_text)
    must(any(c.get('cmd') == 'dashboard-publish' for c in commands), 'commands.json dashboard-publish entry is malformed')
except Exception as e:
    errors.append(f'commands.json is invalid JSON: {e}')

try:
    checklist = json.loads(checklist_text)
    ids = {item.get('id') for item in checklist}
    for required in {'publish-canonical', 'validate-dashboard', 'commands-sync', 'file-visibility', 'publish-online'}:
        must(required in ids, f'dashboard_checklist.json missing required item: {required}')
except Exception as e:
    errors.append(f'dashboard_checklist.json is invalid JSON: {e}')

if errors:
    print('DASHBOARD VALIDATION FAILED')
    for err in errors:
        print(f'- {err}')
    sys.exit(1)

print('Dashboard validation passed')
