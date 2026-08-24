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
    'Education', 'Accessibility', 'Technology', 'Uncategorized',
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
must('Young Reader Version' in knowledge_page and 'Try It Yourself' in knowledge_page and 'Young Reader Quality Review' in knowledge_page,
     'Knowledge details must render parallel young-reader content, activities, and quality review')
must('Evidence Review' in knowledge_page and 'Editorial Rubric' in knowledge_page and 'Editorial Decision' in knowledge_page and 'Required Revisions' in knowledge_page,
     'Knowledge details must render evidence claims, rubric, decision, and revisions')
must('evidenceReview' in knowledge_page,
     'Knowledge normalization must preserve evidence_review data')
must('youngReader' in knowledge_page,
     'Knowledge normalization must preserve young_reader data')
must('blogDraft' in knowledge_page,
     'Knowledge normalization must preserve blog_draft data')
for section in {'Blog Draft', 'Draft Status', 'Key Ideas', 'Frequently Asked Questions', 'Check Your Understanding', 'Rights & Reuse', 'Publication Approval'}:
    must(section in knowledge_page, f'Knowledge details must render the Stage 2 section: {section}')
must('Draft reading grade' in knowledge_page,
     'Knowledge details must show the measured blog-draft reading grade')
must('renderCitedText' in knowledge_page,
     'Knowledge details must attach citations to each source-bearing sentence')
must('draftActivitiesHtml' not in knowledge_page,
     'Stage 2 blog drafts must not render learning activities reserved for Stage 3')
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
must('Young Reader' in workflows_page and 'activities are deferred to Stage 3' in workflows_page,
     'Saving Resources workflow must describe young-reader quality and defer activities to Stage 3')
must('Verified' in workflows_page and 'Viewpoint' in workflows_page and 'citations' in workflows_page and 'Revise' in workflows_page,
     'Saving Resources workflow must describe evidence labels, citations, and editorial decisions')
must('blog draft' in workflows_page and 'AI-generated' in workflows_page and 'rights review' in workflows_page and 'approval' in workflows_page,
     'Saving Resources workflow must describe Stage 2 drafting, rights, disclosure, and approval')
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
    young_reader = basic_economics.get('young_reader') or {}
    must(young_reader.get('verdict') in {'Ready', 'Adaptable', 'Not recommended'},
         'Basic Economics must include a valid young-reader suitability verdict')
    must(young_reader.get('target_grades') == '7–9',
         'Basic Economics young-reader target must be grades 7–9')
    must(bool(young_reader.get('summary')) and bool(young_reader.get('key_points')),
         'Basic Economics must include a parallel young-reader summary and key points')
    must(not young_reader.get('activities'),
         'Basic Economics learning activities must remain deferred to Stage 3')
    reading_grade = young_reader.get('reading_grade')
    must(isinstance(reading_grade, (int, float)) and 7 <= reading_grade <= 9,
         'Basic Economics young-reader reading grade must be measured between 7 and 9')
    must(bool(young_reader.get('quality_note')),
         'Basic Economics must explain its young-reader suitability decision')
    evidence_review = basic_economics.get('evidence_review') or {}
    claims = evidence_review.get('claims') or []
    must(bool(claims), 'Basic Economics must include checked evidence claims')
    for claim in claims:
        must(bool(claim.get('claim')) and claim.get('label') in {'Verified', 'Disputed', 'Viewpoint', 'Needs evidence'},
             'Every Basic Economics claim must have text and an approved evidence label')
        must(bool(claim.get('note')), 'Every Basic Economics claim must include an editorial note')
        citations = claim.get('citations') or []
        must(bool(citations), 'Every Basic Economics claim must include at least one citation')
        for citation in citations:
            must(bool(citation.get('title')) and bool(citation.get('publisher')) and str(citation.get('url', '')).startswith('https://'),
                 'Every evidence citation must include title, publisher, and an HTTPS URL')
    rubric = evidence_review.get('rubric') or {}
    for field in {'source_diversity', 'missing_context', 'bias_framing', 'reading_level', 'child_suitability', 'actionability'}:
        must(bool(rubric.get(field)), f'Basic Economics evidence rubric missing: {field}')
    decision = evidence_review.get('decision') or {}
    must(decision.get('status') in {'Ready', 'Revise', 'Do not publish'},
         'Basic Economics must include an approved editorial decision')
    must(bool(decision.get('reason')), 'Basic Economics editorial decision must include a reason')
    must(isinstance(decision.get('required_revisions'), list) and bool(decision.get('required_revisions')),
         'Basic Economics editorial decision must include actionable revisions')
    blog_draft = basic_economics.get('blog_draft') or {}
    must(blog_draft.get('state') == 'Approved',
         'Basic Economics reviewed blog draft must record its approved state separately from Knowledge status')
    must(bool(blog_draft.get('title')) and bool(blog_draft.get('introduction')),
         'Basic Economics blog draft must include a title and introduction')
    must(bool(blog_draft.get('introduction_citations')),
         'Basic Economics blog draft introduction must retain citations')
    draft_reading_grade = blog_draft.get('reading_grade')
    must(isinstance(draft_reading_grade, (int, float)) and 7 <= draft_reading_grade <= 9,
         'Basic Economics blog draft reading grade must be measured between 7 and 9')
    disclosure = blog_draft.get('disclosure', '')
    must('AI-generated and human-reviewed' in disclosure and 'Not yet published' in disclosure,
         'The approved draft must disclose AI generation, completed human review, and unpublished state')
    human_review = blog_draft.get('human_review') or {}
    must(human_review.get('status') == 'Approved' and human_review.get('reviewed_by') == 'Elli' and bool(human_review.get('reviewed_at')),
         'The approved blog draft must retain Elli’s human review record')
    publication = blog_draft.get('publication') or {}
    must(publication.get('human_approval_required') is True and publication.get('approved') is False,
         'External publication must remain blocked until Elli approves the draft')
    must(publication.get('external_status') == 'Blocked',
         'Unapproved blog drafts must have an explicit blocked external-publication state')
    sources = blog_draft.get('sources') or []
    must(any(source.get('role') == 'Original source' and source.get('url') == basic_economics.get('url') for source in sources),
         'Basic Economics blog draft must link clearly to its original video')
    source_ids = {source.get('id') for source in sources}
    must(all(source.get('title') and str(source.get('url', '')).startswith('https://') for source in sources),
         'Every blog draft source must include a title and HTTPS URL')
    must(all(source.get('role') == 'Original source' or source.get('evidence') for source in sources),
         'Every non-original blog draft source must retain a verbatim evidence quote')
    key_ideas = blog_draft.get('key_ideas') or []
    sections = blog_draft.get('sections') or []
    must(bool(key_ideas) and bool(sections),
         'Basic Economics blog draft must include key ideas and article sections')
    cited_blocks = key_ideas + [paragraph for section in sections for paragraph in (section.get('paragraphs') or [])]
    must(all(block.get('text') and block.get('citations') for block in cited_blocks),
         'Every key idea and article paragraph must keep citations attached')
    must(all(set(block.get('citations') or []).issubset(source_ids) for block in cited_blocks),
         'Blog draft citations must resolve to registered draft sources')
    must(all(len(block.get('citations') or []) <= 3 for block in cited_blocks),
         'No blog draft sentence block may cite more than three sources')
    friedman_section = next((section for section in sections if section.get('heading') == 'Friedman’s four ways to spend money'), {})
    friedman_text = [paragraph.get('text', '') for paragraph in friedman_section.get('paragraphs', [])]
    must(all(any(text.startswith(f'{number}) ') for text in friedman_text) for number in range(1, 5)),
         'Friedman’s four spending cases must use citation-safe numbered labels')
    faqs = blog_draft.get('faqs') or []
    self_check = blog_draft.get('self_check') or []
    must(bool(faqs) and bool(self_check),
         'Basic Economics blog draft must include FAQs and a self-check')
    must('activities' not in blog_draft,
         'Stage 2 blog drafts must leave learning activities to Stage 3')
    must(all(item.get('question') and item.get('answer') and item.get('citations') for item in faqs + self_check),
         'Every FAQ and self-check answer must retain citations')
    must(all(set(item.get('citations') or []).issubset(source_ids) for item in faqs + self_check),
         'FAQ and self-check citations must resolve to registered draft sources')
    rights = blog_draft.get('rights') or {}
    for field in {'use_context', 'source_license', 'attribution', 'quotation_limits', 'media_reuse', 'permission_needed', 'review_status'}:
        must(bool(rights.get(field)), f'Basic Economics rights record missing: {field}')
    must(rights.get('use_context') == 'Public; commercial use possible',
         'Rights review must use the conservative possible-commercial-use interpretation')
    must(blog_draft.get('direct_quote_word_count') == 0,
         'The pilot draft must use original wording and no direct quotations')
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
