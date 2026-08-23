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
resources_data_text = read_text(DASH / 'resources.json')
knowledge_page = read_text(DASH / 'pages' / 'knowledge.html')
workflows_page = read_text(DASH / 'pages' / 'workflows.html')
manifest_text = read_text(DASH / 'manifest.webmanifest')
service_worker_text = read_text(DASH / 'service-worker.js')
pwa_text = read_text(DASH / 'pwa.js')

must((DASH / 'publish.sh').exists(), 'publish.sh is missing')
must((DASH / 'pages' / 'knowledge.html').exists(), 'knowledge.html is missing')
index_text = read_text(DASH / 'index.html')
must('knowledge.html' in index_text, 'index.html must link to knowledge.html')
must((DASH / 'pages' / 'project-001.html').exists(), 'project-001.html is missing')
must((DASH / 'project-001-insights.json').exists(), 'project-001-insights.json is missing')
must('pages/project-001.html' not in index_text,
     'index.html must not link to the separate Project 001 Insights page')

APPROVED_SUBJECTS = [
    'Economics', 'History', 'Self-Improvement', 'AI',
    'Intelligence & Security', 'Politics', 'Neuroscience',
    'Accessibility', 'Technology', 'Uncategorized',
]
for subject in APPROVED_SUBJECTS:
    must(subject in knowledge_page,
         f'Knowledge page must expose approved subject filter: {subject}')
must('project_001_insights' in knowledge_page,
     'Knowledge page must read Project 001 insights')
must(re.search(r'<button[^>]+aria-pressed=', knowledge_page) is not None,
     'Knowledge subject filters must use buttons with aria-pressed')
must('Blog material' in knowledge_page and 'To explore' in knowledge_page,
     'Knowledge page must expose All, Blog material, and To explore views')
must('sourceId' in knowledge_page and 'itemsBySourceId.get(card.dataset.sourceId)' in knowledge_page,
     'Knowledge items must preserve stable source identity for modal lookup')
must('...resources.map(resource =>' in knowledge_page,
     'Knowledge page must render resources independently of research reports')
must('min-height: 44px' in knowledge_page,
     'Knowledge filter buttons must have minimum 44px targets')
must('id="report-modal" aria-hidden="true" hidden' in knowledge_page,
     'Closed Knowledge modal must be removed from keyboard navigation')
must('.modal-overlay[hidden] { display: none; }' in knowledge_page,
     'Knowledge modal hidden state must override its flex display')
must('.modal-body { padding: var(--s5); overflow-y: auto;' not in knowledge_page,
     'Knowledge modal must not use nested scrolling')
must('const knowledgeItems = [...visibleReports, ...visibleResources, ...project001];' in index_text,
     'Knowledge home badge must count visible reports, resources, and Project 001 insights')
must('subjectCount' in index_text and 'subjects' in index_text,
     'Knowledge home preview must report item and subject counts')
must('inferKnowledgeSubject' in index_text,
     'Knowledge home subject coverage must classify metadata-less vault reports')
must('project-001-badge' not in index_text and 'project-001-preview' not in index_text,
     'Unused Project 001 home badge and preview code must be removed')
must('Dashboard → Knowledge' in workflows_page and 'subject' in workflows_page and 'tags' in workflows_page,
     'Saving Resources workflow must point to Knowledge and describe subject/tag classification')
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
    resources_data = json.loads(resources_data_text)
    resources = [item for item in resources_data if item.get('title')]
    must(bool(resources), 'resources.json must contain at least one visible resource')
    for item in resources:
        title = item.get('title', '?')
        must(item.get('subject') in APPROVED_SUBJECTS,
             f'Resource has missing or unapproved subject: {title}')
        must(isinstance(item.get('tags'), list),
             f'Resource tags must be a list: {title}')
        must(item.get('source_language') in {'en', 'he'},
             f'Resource has unsupported source_language: {title}')
    basic_economics = next((item for item in resources if item.get('id') == '10'), {})
    must(bool(basic_economics.get('source_title')),
         'Basic Economics must preserve its original Hebrew source title')
    must(bool(basic_economics.get('takeaway')) and bool(basic_economics.get('bias_note')) and bool(basic_economics.get('blog_angle')),
         'Basic Economics must include takeaway, bias note, and blog angle')
except Exception as e:
    errors.append(f'resources.json is invalid JSON: {e}')

try:
    project_001_data = json.loads(project_001_data_text)
    insights = [item for item in project_001_data if item.get('title')]
    must(bool(insights), 'project-001-insights.json must contain at least one insight')
    for item in insights:
        must(bool(item.get('summary')), f"Project 001 insight is missing summary: {item.get('title', '?')}")
        must(bool(item.get('points')), f"Project 001 insight is missing points: {item.get('title', '?')}")
        must(item.get('subject') in APPROVED_SUBJECTS,
             f"Project 001 insight has missing or unapproved subject: {item.get('title', '?')}")
        must(isinstance(item.get('tags'), list),
             f"Project 001 insight tags must be a list: {item.get('title', '?')}")
        must(item.get('source_language') in {'en', 'he'},
             f"Project 001 insight has unsupported source_language: {item.get('title', '?')}")
except Exception as e:
    errors.append(f'project-001-insights.json is invalid JSON: {e}')

if errors:
    print('DASHBOARD VALIDATION FAILED')
    for err in errors:
        print(f'- {err}')
    sys.exit(1)

print('Dashboard validation passed')
