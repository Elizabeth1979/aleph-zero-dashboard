#!/bin/bash
# Refresh Hermes Dashboard with live data
HERMES="$HOME/.hermes"
DASH="$HERMES/dashboard"

# Read memory files
USER_MEM=$(cat "$HERMES/memories/USER.md" 2>/dev/null | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))")
AGENT_MEM=$(cat "$HERMES/memories/MEMORY.md" 2>/dev/null | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))")

# Memory usage stats
USER_CHARS=$(wc -c < "$HERMES/memories/USER.md" 2>/dev/null || echo 0)
USER_LIMIT=1375
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
print(json.dumps(jobs))
" 2>/dev/null || echo "[]")

# Get gateway status
GW_STATUS=$(hermes gateway status 2>&1)
if echo "$GW_STATUS" | grep -q "is running"; then
  GW_ONLINE="true"
  GW_PID=$(echo "$GW_STATUS" | grep -oP 'PID: \K\d+' || echo "?")
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
skills = []
base = '$HERMES/skills'
for skill_md in sorted(glob.glob(base + '/*/*/SKILL.md')):
    parts = skill_md.replace(base + '/', '').split('/')
    cat = parts[0]
    name = parts[1]
    with open(skill_md) as f:
        content = f.read()
    custom_list = json.load(open('$DASH/custom_skills.json')) if os.path.exists('$DASH/custom_skills.json') else []
    custom = (cat + '/' + name) in custom_list
    skills.append({'category': cat, 'name': name, 'path': cat + '/' + name, 'content': content, 'custom': custom})
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
STATUS_HTML="$STATUS_HTML<div class=\"config-item\"><span class=\"config-key\">Discord</span><span class=\"config-val\">Hermes agent #1264</span></div>"
STATUS_HTML="$STATUS_HTML<div class=\"config-item\"><span class=\"config-key\">Google</span><span class=\"config-val\">$([ -f "$HERMES/google_token.json" ] && echo "✓ Connected" || echo "✗ Not connected")</span></div>"

# Build config HTML
CONFIG_HTML="<div class=\"config-item\"><span class=\"config-key\">Model</span><span class=\"config-val\">${MODEL:-default}</span></div>"
CONFIG_HTML="$CONFIG_HTML<div class=\"config-item\"><span class=\"config-key\">Provider</span><span class=\"config-val\">${PROVIDER:-default}</span></div>"
CONFIG_HTML="$CONFIG_HTML<div class=\"config-item\"><span class=\"config-key\">Timezone</span><span class=\"config-val\">${TZ:-Asia/Jerusalem}</span></div>"

# Model assignments
SUMMARY_MODEL=$(grep "summary_model:" "$HERMES/config.yaml" 2>/dev/null | head -1 | awk '{print $2}')
DELEGATION_MODEL=$(grep -A1 "^delegation:" "$HERMES/config.yaml" 2>/dev/null | grep "model:" | awk '{print $2}')
VISION_MODEL=$(grep -A2 "vision:" "$HERMES/config.yaml" 2>/dev/null | grep "model:" | head -1 | awk '{print $2}' | tr -d "'")
CONFIG_HTML="$CONFIG_HTML<div class=\"config-item\"><span class=\"config-key\">Main Model</span><span class=\"config-val\">${MODEL:-default}</span></div>"
CONFIG_HTML="$CONFIG_HTML<div class=\"config-item\"><span class=\"config-key\">Delegation</span><span class=\"config-val\">${DELEGATION_MODEL:-default}</span></div>"
CONFIG_HTML="$CONFIG_HTML<div class=\"config-item\"><span class=\"config-key\">Summarization</span><span class=\"config-val\">${SUMMARY_MODEL:-default}</span></div>"
CONFIG_HTML="$CONFIG_HTML<div class=\"config-item\"><span class=\"config-key\">Auxiliary</span><span class=\"config-val\">${VISION_MODEL:-auto}</span></div>"
CONFIG_HTML="$CONFIG_HTML<div class=\"config-item\"><span class=\"config-key\">Memories Dir</span><span class=\"config-val\">~/.hermes/memories/</span></div>"
CONFIG_HTML="$CONFIG_HTML<div class=\"config-item\"><span class=\"config-key\">Config</span><span class=\"config-val\">~/.hermes/config.yaml</span></div>"

# Escape for JS
STATUS_JS=$(echo "$STATUS_HTML" | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))")
CONFIG_JS=$(echo "$CONFIG_HTML" | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))")
SKILLS_JS=$(echo "$SKILLS_HTML" | python3 -c "import sys,json; print(json.dumps(sys.stdin.read()))")

# Tasks
TASKS_DATA=$(cat "$DASH/tasks.json" 2>/dev/null || echo "[]")

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

# Quick commands
COMMANDS='[
  {"cmd":"dashboard","desc":"Refreshes all dashboard data and opens it in your browser"},
  {"cmd":"gw","desc":"Prints whether the Discord bot gateway is running or not"},
  {"cmd":"hermes chat","desc":"Start a conversation with me in the terminal"},
  {"cmd":"hermes status","desc":"Show status of all components (gateway, cron, etc)"},
  {"cmd":"hermes gateway restart","desc":"Restart the Discord bot if it stops responding"},
  {"cmd":"hermes cron list","desc":"List all scheduled cron jobs"},
  {"cmd":"hermes sessions","desc":"Browse past conversation sessions"},
  {"cmd":"cat ~/.hermes/dashboard/SYSTEM_SETTINGS.md","desc":"View all system/power/battery settings we configured"}
]'

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
  tasks: $TASKS_DATA
};
JSEOF

echo "Dashboard refreshed at $(date)"
