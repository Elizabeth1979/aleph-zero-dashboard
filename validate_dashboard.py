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
project_001_page = read_text(DASH / 'pages' / 'project-001.html')
project_001_data_text = read_text(DASH / 'project-001-insights.json')
knowledge_page = read_text(DASH / 'pages' / 'knowledge.html')
manifest_text = read_text(DASH / 'manifest.webmanifest')
service_worker_text = read_text(DASH / 'service-worker.js')
pwa_text = read_text(DASH / 'pwa.js')

must((DASH / 'publish.sh').exists(), 'publish.sh is missing')
must((DASH / 'pages' / 'knowledge.html').exists(), 'knowledge.html is missing')
index_text = read_text(DASH / 'index.html')
must('knowledge.html' in index_text, 'index.html must link to knowledge.html')
must((DASH / 'pages' / 'project-001.html').exists(), 'project-001.html is missing')
must((DASH / 'project-001-insights.json').exists(), 'project-001-insights.json is missing')
must('pages/project-001.html' in index_text, 'index.html must link to Project 001 Insights')
must("const visibleResources = resources.filter(r => r.title);" in knowledge_page,
     'Knowledge page must derive visible resources before its empty-state check')
must("if (!reports.length && !visibleResources.length)" in knowledge_page,
     'Knowledge page must not hide resources when reports are empty')
must("resources.forEach((r, i) =>" in knowledge_page,
     'Knowledge resource cards must preserve source indices for modal lookup')
must('project_001_insights:' in refresh_text, 'refresh.sh must export Project 001 insights into data.js')
must('project_001_insights' in project_001_page, 'Project 001 page must read project_001_insights from data.js')
must('<main' in project_001_page and 'skip-link' in project_001_page,
     'Project 001 page must include a main landmark and skip link')
must((DASH / 'refresh.sh').exists(), 'refresh.sh is missing')
must((DASH / 'dashboard_checklist.json').exists(), 'dashboard_checklist.json is missing')
must((DASH / 'validate_dashboard.py').exists(), 'validate_dashboard.py is missing')

# Android-installable Progressive Web App wiring.
must((DASH / 'manifest.webmanifest').exists(), 'manifest.webmanifest is missing')
must((DASH / 'service-worker.js').exists(), 'service-worker.js is missing')
must((DASH / 'pwa.js').exists(), 'pwa.js is missing')
must((DASH / 'icons' / 'icon-192.png').exists(), '192px PWA icon is missing')
must((DASH / 'icons' / 'icon-512.png').exists(), '512px PWA icon is missing')
must('rel="manifest" href="manifest.webmanifest"' in index_text,
     'index.html must link to the web app manifest')
must('src="pwa.js"' in index_text, 'index.html must load pwa.js')
must('serviceWorker.register' in pwa_text, 'pwa.js must register the service worker')
must('fetch(request)' in service_worker_text and 'caches.match(request)' in service_worker_text,
     'service-worker.js must use the network first with an offline cache fallback')

try:
    manifest = json.loads(manifest_text)
    must(manifest.get('display') == 'standalone', 'manifest display must be standalone')
    must(manifest.get('start_url') == './', 'manifest start_url must be ./ for GitHub Pages')
    must(manifest.get('scope') == './', 'manifest scope must be ./ for GitHub Pages')
    icon_sizes = {icon.get('sizes') for icon in manifest.get('icons', [])}
    must({'192x192', '512x512'} <= icon_sizes,
         'manifest must include 192x192 and 512x512 icons')
except Exception as e:
    errors.append(f'manifest.webmanifest is invalid JSON: {e}')

for html_path in [DASH / 'index.html', *sorted((DASH / 'pages').glob('*.html'))]:
    html = read_text(html_path)
    prefix = '' if html_path.parent == DASH else '../'
    must(f'rel="manifest" href="{prefix}manifest.webmanifest"' in html,
         f'{html_path.name} must link to the web app manifest')
    must(f'src="{prefix}pwa.js"' in html,
         f'{html_path.name} must register PWA support')
    must('name="theme-color" content="#0b0e11"' in html,
         f'{html_path.name} must set the Android theme color')

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
must('pages/agent_map.html' in index_text, 'index.html must link directly to the System Architecture page')
must('System Architecture' in agent_map_page, 'Agent map page must be titled System Architecture')
must('architecture-diagram' in agent_map_page, 'System Architecture page must include the architecture diagram')
must('User interfaces' in agent_map_page and 'Agent runtime' in agent_map_page and 'State and delivery' in agent_map_page,
     'System Architecture page must show interfaces, runtime, and state/delivery layers')

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

try:
    project_001_data = json.loads(project_001_data_text)
    insights = [item for item in project_001_data if item.get('title')]
    must(bool(insights), 'project-001-insights.json must contain at least one insight')
    for item in insights:
        must(bool(item.get('summary')), f"Project 001 insight is missing summary: {item.get('title', '?')}")
        must(bool(item.get('points')), f"Project 001 insight is missing points: {item.get('title', '?')}")
except Exception as e:
    errors.append(f'project-001-insights.json is invalid JSON: {e}')

if errors:
    print('DASHBOARD VALIDATION FAILED')
    for err in errors:
        print(f'- {err}')
    sys.exit(1)

print('Dashboard validation passed')
