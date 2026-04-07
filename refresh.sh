#!/bin/bash
# Refresh Hermes Dashboard with live data
# AGENT RULE: After ANY dashboard/backend change (cron/task/project/memory/skill/config), run:
#   bash ~/.hermes/dashboard/publish.sh
# This is the canonical publish path so Elli sees changes online right away.
# AGENT RULE: Always use the cleanest, DRY, best-practice approach. No shortcuts that add noise or repetition.
HERMES="$HOME/.hermes"
DASH="$HERMES/dashboard"

# Read memory files
USER_MEM=$(cat "$HERMES/memories/USER.md" 2>/dev/null | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))")
AGENT_MEM=$(cat "$HERMES/memories/MEMORY.md" 2>/dev/null | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))")

# Memory detail files
MEM_DISCORD=$(cat "$HERMES/memory/discord.md" 2>/dev/null | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))" 2>/dev/null || echo '""')
MEM_DASHBOARD=$(cat "$HERMES/memory/dashboard.md" 2>/dev/null | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))" 2>/dev/null || echo '""')
MEM_GOOGLE=$(cat "$HERMES/memory/google.md" 2>/dev/null | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))" 2>/dev/null || echo '""')
MEM_GITHUB=$(cat "$HERMES/memory/github.md" 2>/dev/null | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))" 2>/dev/null || echo '""')
MEM_BEHAVIOR=$(cat "$HERMES/memory/behavior.md" 2>/dev/null | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))" 2>/dev/null || echo '""')
MEM_ACCESSIBILITY=$(cat "$HERMES/memory/accessibility.md" 2>/dev/null | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))" 2>/dev/null || echo '""')
MEM_WEB_BEST_PRACTICES=$(cat "$HERMES/memory/web-best-practices.md" 2>/dev/null | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))" 2>/dev/null || echo '""')
MEM_LEARNINGS=$(cat "$HERMES/memory/learnings.md" 2>/dev/null | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))" 2>/dev/null || echo '""')

# Memory usage stats
USER_CHARS=$(wc -c < "$HERMES/memories/USER.md" 2>/dev/null || echo 0)
USER_LIMIT=1500
AGENT_CHARS=$(wc -c < "$HERMES/memories/MEMORY.md" 2>/dev/null || echo 0)
AGENT_LIMIT=2200
USER_PCT=$((USER_CHARS * 100 / USER_LIMIT))
AGENT_PCT=$((AGENT_CHARS * 100 / AGENT_LIMIT))

# Get cron jobs from jobs file
CRON_JOBS=$(python3 -c "
import json
with open('$HERMES/cron/jobs.json') as f:
    data = json.load(f)
jobs = data.get('jobs', data) if isinstance(data, dict) else data
# Normalize schedule field
for j in jobs:
    s = j.get('schedule', '')
    if isinstance(s, dict):
        j['schedule'] = s.get('display', s.get('expr', str(s)))
    r = j.get('repeat', {})
    if isinstance(r, dict):
        j['repeat_display'] = f\"ran {r.get('completed',0)}x\" if r.get('completed') else ''
    if not j.get('job_id'):
        j['job_id'] = j.get('id', '')
# Only include recurring jobs (repeat.times is None = forever)
jobs = [j for j in jobs if not j.get('repeat') or j['repeat'].get('times') is None]
print(json.dumps(jobs))
" 2>/dev/null || echo "[]")

# Get gateway status
GW_STATUS=$(hermes gateway status 2>&1)
if echo "$GW_STATUS" | grep -q "PID"; then
  GW_ONLINE="true"
  GW_PID=$(echo "$GW_STATUS" | grep -o '"PID" = [0-9]*' | grep -o '[0-9]*' || echo "?")
else
  GW_ONLINE="false"
  GW_PID=""
fi

# Get config basics
MODEL=$(grep "default:" "$HERMES/config.yaml" 2>/dev/null | head -1 | awk '{print $2}')
PROVIDER=$(grep "provider:" "$HERMES/config.yaml" 2>/dev/null | head -1 | awk '{print $2}')
TZ=$(grep "^timezone:" "$HERMES/config.yaml" 2>/dev/null | head -1 | awk '{$1=""; print $0}' | xargs)

# Get skills list and contents
SKILLS_DATA=$(python3 -c "
import json, os, glob, re

# Detect skills referenced in cron jobs
cron_skills = set()
try:
    with open('$HERMES/cron/jobs.json') as f:
        cron_data = json.load(f)
    for j in cron_data.get('jobs', []):
        if j.get('skill'): cron_skills.add(j['skill'])
        for s in (j.get('skills') or []): cron_skills.add(s)
except: pass

# Detect skills actually used in sessions (skill_view tool calls)
used_skills = set()
try:
    for session_path in glob.glob('$HERMES/sessions/*.jsonl'):
        for line in open(session_path):
            msg = json.loads(line)
            if msg.get('role') == 'assistant':
                for tc in msg.get('tool_calls', []):
                    if 'skill' in tc.get('function', {}).get('name', '').lower():
                        args = json.loads(tc['function'].get('arguments', '{}'))
                        name = args.get('name')
                        if name: used_skills.add(name)
except: pass

skills = []
base = '$HERMES/skills'
for skill_md in sorted(glob.glob(base + '/*/*/SKILL.md')):
    parts = skill_md.replace(base + '/', '').split('/')
    cat = parts[0]
    name = parts[1]
    with open(skill_md) as f:
        content = f.read()
    # Auto-detect custom skills from frontmatter (custom: true)
    custom = bool(re.search(r'^custom:\s*true', content, re.MULTILINE))
    # Mark as in_use if custom or referenced in cron jobs
    in_use = custom or name in cron_skills
    # Mark as used if actually loaded in a session
    used = name in used_skills
    skills.append({'category': cat, 'name': name, 'path': cat + '/' + name, 'content': content, 'custom': custom, 'in_use': in_use, 'used': used})
print(json.dumps(skills))
" 2>/dev/null || echo "[]")

# Still build HTML for backward compat
SKILLS_HTML=""
for skill_dir in "$HERMES"/skills/*/; do
  if [ -d "$skill_dir" ]; then
    cat_name=$(basename "$skill_dir")
    for sd in "$skill_dir"*/; do
      if [ -f "$sd/SKILL.md" ]; then
        sname=$(basename "$sd")
        SKILLS_HTML="$SKILLS_HTML<span class=\"tag\">$cat_name/$sname</span> "
      fi
    done
  fi
done

# Build status HTML
STATUS_HTML="<div class=\"config-item\"><span class=\"config-key\">Gateway</span><span class=\"config-val\"><span class=\"status-dot $([ "$GW_ONLINE" = "true" ] && echo "status-on" || echo "status-off")\"></span>$([ "$GW_ONLINE" = "true" ] && echo "Online (PID $GW_PID)" || echo "Offline")</span></div>"
STATUS_HTML="$STATUS_HTML<div class=\"config-item\"><span class=\"config-key\">Discord</span><span class=\"config-val\">$([ "$GW_ONLINE" = "true" ] && echo "✓ Online" || echo "Offline")</span></div>"
STATUS_HTML="$STATUS_HTML<div class=\"config-item\"><span class=\"config-key\">Google</span><span class=\"config-val\">$([ -f "$HERMES/google_token.json" ] && echo "✓ Connected" || echo "✗ Not connected")</span></div>"

# Build config HTML
CONFIG_HTML="<div class=\"config-item\"><span class=\"config-key\">Provider</span><span class=\"config-val\">${PROVIDER:-default}</span></div>"
CONFIG_HTML="$CONFIG_HTML<div class=\"config-item\"><span class=\"config-key\">Timezone</span><span class=\"config-val\">${TZ:-Asia/Jerusalem}</span></div>"

# Model assignments
SUMMARY_MODEL=$(grep "summary_model:" "$HERMES/config.yaml" 2>/dev/null | head -1 | awk '{print $2}')
DELEGATION_MODEL=$(grep -A1 "^delegation:" "$HERMES/config.yaml" 2>/dev/null | grep "model:" | awk '{print $2}')
VISION_MODEL=$(grep -A2 "vision:" "$HERMES/config.yaml" 2>/dev/null | grep "model:" | head -1 | awk '{print $2}' | tr -d "'")
FALLBACK_MODEL=$(python3 -c "
import yaml
with open('$HERMES/config.yaml') as f:
    cfg = yaml.safe_load(f)
providers = cfg.get('fallback_providers', [])
parts = [p.get('model', p.get('provider','?')) for p in providers]
print(' → '.join(parts))
" 2>/dev/null)
GOOGLE_MODEL=$(python3 -c "
import yaml, sys
with open('$HERMES/config.yaml') as f:
    cfg = yaml.safe_load(f)
for p in cfg.get('custom_providers', []):
    if p.get('name') == 'google':
        print('configured (' + p.get('base_url','').split('/')[2] + ')')
        break
" 2>/dev/null)
CONFIG_HTML="$CONFIG_HTML<div class=\"config-item\"><span class=\"config-key\">Main Model</span><span class=\"config-val\">${MODEL:-default}</span></div>"
CONFIG_HTML="$CONFIG_HTML<div class=\"config-item\"><span class=\"config-key\">Coding (Delegation)</span><span class=\"config-val\">${DELEGATION_MODEL:-default}</span></div>"
CONFIG_HTML="$CONFIG_HTML<div class=\"config-item\"><span class=\"config-key\">Summarization</span><span class=\"config-val\">${SUMMARY_MODEL:-default}</span></div>"
CONFIG_HTML="$CONFIG_HTML<div class=\"config-item\"><span class=\"config-key\">Auxiliary</span><span class=\"config-val\">${VISION_MODEL:-auto}</span></div>"
[ -n "$FALLBACK_MODEL" ] && CONFIG_HTML="$CONFIG_HTML<div class=\"config-item\"><span class=\"config-key\">Fallback</span><span class=\"config-val\">${FALLBACK_MODEL}</span></div>"
[ -n "$GOOGLE_MODEL" ] && CONFIG_HTML="$CONFIG_HTML<div class=\"config-item\"><span class=\"config-key\">Google/Gemini</span><span class=\"config-val\">${GOOGLE_MODEL}</span></div>"
CONFIG_HTML="$CONFIG_HTML<div class=\"config-item\"><span class=\"config-key\">Memories Dir</span><span class=\"config-val\">~/.hermes/memories/</span></div>"
CONFIG_HTML="$CONFIG_HTML<div class=\"config-item\"><span class=\"config-key\">Config</span><span class=\"config-val\">~/.hermes/config.yaml</span></div>"

# Escape for JS
STATUS_JS=$(echo "$STATUS_HTML" | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))")
CONFIG_JS=$(echo "$CONFIG_HTML" | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))")
SKILLS_JS=$(echo "$SKILLS_HTML" | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))")

# Tasks
TASKS_DATA=$(cat "$DASH/tasks.json" 2>/dev/null || echo "[]")

# Resources
RESOURCES_DATA=$(cat "$DASH/resources.json" 2>/dev/null || echo "[]")

# Projects
PROJECTS_DATA=$(cat "$DASH/projects.json" 2>/dev/null || echo "[]")

# Portfolio
PORTFOLIO_DATA=$(cat "$DASH/portfolio.json" 2>/dev/null || echo "[]")

# Capture rules
CAPTURE_RULES=$(cat "$DASH/capture_rules.json" 2>/dev/null || echo "{}")

# ChromaDB long-term memory
CHROMA_DATA=$("$HERMES/hermes-agent/venv/bin/python" -c "
import json, chromadb
client = chromadb.PersistentClient(path='$HERMES/chroma_data')
col = client.get_or_create_collection('hermes_memory')
count = col.count()
results = col.get(limit=100)
memories = []
for i, doc in enumerate(results.get('documents', [])):
    meta = results['metadatas'][i] or {} if results.get('metadatas') else {}
    memories.append({'id': results['ids'][i], 'text': doc, 'category': meta.get('category',''), 'timestamp': meta.get('timestamp','')})
print(json.dumps({'count': count, 'memories': memories}))
" 2>/dev/null || echo '{"count":0,"memories":[]}')

# === UNDER THE HOOD DATA ===

# SOUL.md
SOUL_MD=$(cat "$HERMES/SOUL.md" 2>/dev/null | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))")

# Discord channels
DISCORD_CHANNELS=$(python3 -c "
import json, os
f = '$HERMES/channel_directory.json'
if os.path.exists(f):
    with open(f) as fh:
        data = json.load(fh)
    channels = data.get('platforms', {}).get('discord', [])
    print(json.dumps(channels))
else:
    print('[]')
" 2>/dev/null || echo "[]")

# Discord threads
DISCORD_THREADS=$(cat "$HERMES/discord_threads.json" 2>/dev/null | python3 -c "import sys,json; print(json.dumps(json.load(sys.stdin)))" 2>/dev/null || echo "{}")

# Auth/credentials
AUTH_DATA=$(python3 -c "
import json, os
f = '$HERMES/auth.json'
if os.path.exists(f):
    with open(f) as fh:
        data = json.load(fh)
    pool = data.get('credential_pool', {})
    providers = []
    for name, creds in pool.items():
        providers.append({'name': name, 'count': len(creds), 'labels': [c.get('label','') for c in creds]})
    print(json.dumps(providers))
else:
    print('[]')
" 2>/dev/null || echo "[]")

# Google integration
GOOGLE_STATUS="none"
[ -f "$HERMES/google_token.json" ] && GOOGLE_STATUS="connected"
GOOGLE_APIS=$(python3 -c "
import json, os
f = '$HERMES/google_client_secret.json'
if os.path.exists(f):
    print('configured')
else:
    print('none')
" 2>/dev/null || echo "none")

# Gateway state
GATEWAY_STATE=$(cat "$HERMES/gateway_state.json" 2>/dev/null | python3 -c "
import sys, json
data = json.load(sys.stdin)
print(json.dumps({
    'pid': data.get('pid'),
    'state': data.get('gateway_state'),
    'exit_reason': data.get('exit_reason'),
    'updated_at': data.get('updated_at')
}))
" 2>/dev/null || echo '{"pid":null,"state":"unknown","exit_reason":null,"updated_at":null}')

# Session history
SESSION_COUNT=$(ls "$HERMES/sessions"/session_2*.json 2>/dev/null | wc -l | tr -d ' ')
RECENT_SESSIONS=$(python3 -c "
import json, glob, os
files = sorted(glob.glob('$HERMES/sessions/session_2*.json'), reverse=True)[:5]
sessions = []
for f in files:
    try:
        with open(f) as fh:
            data = json.load(fh)
        sessions.append({
            'file': os.path.basename(f),
            'title': data.get('title', data.get('name', os.path.basename(f))),
            'platform': data.get('platform', 'cli'),
            'created': data.get('created_at', data.get('started_at', ''))
        })
    except: pass
print(json.dumps(sessions))
" 2>/dev/null || echo "[]")

# System settings
SYSTEM_SETTINGS=$(cat "$DASH/SYSTEM_SETTINGS.md" 2>/dev/null | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))" 2>/dev/null || echo '""')

# Quick commands (read from file — no hardcoding)
COMMANDS=$(cat "$DASH/commands.json" 2>/dev/null || echo "[]")

# Dashboard repo files that should be visible on the dashboard
DASHBOARD_FILES=$(python3 -c "
import json, os
files = [
  ('publish.sh', 'Dashboard Publish Script', 'Canonical refresh + commit + push path.'),
  ('refresh.sh', 'Dashboard Refresh Script', 'Builds data.js from Hermes sources.'),
  ('update_tasks.sh', 'Task Update Script', 'Publishes dashboard after task changes.'),
  ('commands.json', 'Quick Commands', 'Commands shown in Config & Setup.'),
  ('dashboard_checklist.json', 'Dashboard Checklist', 'Loop-closing checklist for dashboard changes.'),
  ('validate_dashboard.py', 'Dashboard Validator', 'Checks that the dashboard loop is wired correctly.'),
  ('tasks.json', 'Dashboard Tasks', 'Task data shown on the dashboard.'),
  ('projects.json', 'Dashboard Projects', 'Project data shown on the dashboard.'),
  ('resources.json', 'Dashboard Resources', 'Saved links and resources shown on the dashboard.'),
  ('SYSTEM_SETTINGS.md', 'System Settings', 'Machine-level settings used by Hermes.'),
  ('PLAN.md', 'Dashboard Plan', 'Current dashboard plan and purpose.'),
  ('BEST-PRACTICES.md', 'Best Practices', 'Rules and best practices for dashboard code.')
]
out = []
base = os.path.expanduser('$DASH')
for rel, label, desc in files:
    path = os.path.join(base, rel)
    if not os.path.exists(path):
        continue
    with open(path, encoding='utf-8') as f:
        content = f.read()
    out.append({'file': rel, 'label': label, 'description': desc, 'content': content})
print(json.dumps(out))
" 2>/dev/null || echo "[]")

# Activity feed — merge recent sessions + cron outputs, sort, limit 10
ACTIVITY_DATA=$(python3 "$DASH/activity_data.py" "$HERMES" 2>/dev/null || echo "[]")

# Reports from vault (Reviews + Research)
python3 << 'PYEOF' > /tmp/hermes_reports.json
import json, os, re

def parse_file(path, f, file_type):
    with open(path, encoding='utf-8', errors='ignore') as fh:
        content = fh.read()
    title = f.replace('.md','')
    m = re.search(r'^#\s+(.+)', content, re.M)
    if m: title = m.group(1)
    date_m = re.search(r'(\d{4}-\d{2}-\d{2})', f)
    date = date_m.group(1) if date_m else ''
    lines = content.split('\n')
    preview = ''
    for l in lines:
        l = l.strip()
        if l and not l.startswith('#') and not l.startswith('---') and not l.startswith('**Date') and not l.startswith('|'):
            preview = l[:150]
            break
    result = {'file': f, 'title': title, 'date': date, 'content': content, 'preview': preview, 'type': file_type}
    if file_type == 'review':
        result['critical'] = len(re.findall(r'\U0001f534', content))
        result['medium'] = len(re.findall(r'\U0001f7e0', content))
        result['low'] = len(re.findall(r'\U0001f7e1', content))
    return result

reports = []
for folder, ftype in [
    ('~/Desktop/elli vault/Reviews', 'review'),
    ('~/Desktop/elli vault/A11y App Research', 'research'),
    ('~/Desktop/elli vault/Research', 'research'),
]:
    d = os.path.expanduser(folder)
    if os.path.isdir(d):
        for f in sorted(os.listdir(d), reverse=True):
            if f.endswith('.md'):
                try:
                    reports.append(parse_file(os.path.join(d, f), f, ftype))
                except Exception:
                    pass

reports.sort(key=lambda x: x['date'] or '0000', reverse=True)
print(json.dumps(reports))
PYEOF

# Write data file
# Raw config files (redact secrets)
CONFIG_RAW=$(cat "$HERMES/config.yaml" 2>/dev/null | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))")
ENV_RAW=$(cat "$HERMES/.env" 2>/dev/null | sed -E 's/(TOKEN|KEY|SECRET|PASSWORD)=.{4}(.*)$/\1=****\2/' | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))")

cat > "$DASH/data.js" << JSEOF
window.__DASHBOARD_DATA__ = {
  user_memory: $USER_MEM,
  agent_memory: $AGENT_MEM,
  user_chars: $USER_CHARS,
  user_limit: $USER_LIMIT,
  user_pct: $USER_PCT,
  agent_chars: $AGENT_CHARS,
  agent_limit: $AGENT_LIMIT,
  agent_pct: $AGENT_PCT,
  cron_jobs: $CRON_JOBS,
  status: $STATUS_JS,
  config: $CONFIG_JS,
  skills: $SKILLS_JS,
  config_raw: $CONFIG_RAW,
  env_raw: $ENV_RAW,
  skills_data: $SKILLS_DATA,
  chroma: $CHROMA_DATA,
  commands: $COMMANDS,
  dashboard_files: $DASHBOARD_FILES,
  tasks: $TASKS_DATA,
  resources: $RESOURCES_DATA,
  projects: $PROJECTS_DATA,
  portfolio: $PORTFOLIO_DATA,
  capture_rules: $CAPTURE_RULES,
  soul_md: $SOUL_MD,
  discord_channels: $DISCORD_CHANNELS,
  discord_threads: $DISCORD_THREADS,
  auth_data: $AUTH_DATA,
  google_status: "$GOOGLE_STATUS",
  google_apis: "$GOOGLE_APIS",
  gateway_state: $GATEWAY_STATE,
  session_count: $SESSION_COUNT,
  recent_sessions: $RECENT_SESSIONS,
  system_settings: $SYSTEM_SETTINGS,
  memory_files: {
    discord: $MEM_DISCORD,
    dashboard: $MEM_DASHBOARD,
    google: $MEM_GOOGLE,
    github: $MEM_GITHUB,
    behavior: $MEM_BEHAVIOR,
    accessibility: $MEM_ACCESSIBILITY,
    web_best_practices: $MEM_WEB_BEST_PRACTICES,
    learnings: $MEM_LEARNINGS
  },
  activity: $ACTIVITY_DATA,
  reports: $(cat /tmp/hermes_reports.json),
};
JSEOF

echo "Dashboard refreshed at $(date)"
