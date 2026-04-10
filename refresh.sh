#!/bin/bash
# Refresh Aleph Zero Dashboard with live data from elli-agent
AGENT="$HOME/elli-agent"
DASH="$HOME/aleph-zero-dashboard"
PYTHON="$AGENT/.venv/bin/python3.12"
BRIDGE="$AGENT/scripts/mempalace-bridge.py"

# Read tasks, projects, resources — filter out _instructions entries
TASKS=$(jq '[.[] | select(has("_instructions") | not)]' "$AGENT/data/tasks.json")
PROJECTS=$(jq '[.[] | select(has("_instructions") | not)]' "$AGENT/data/projects.json")
RESOURCES=$(jq '[.[] | select(has("_instructions") | not)]' "$AGENT/data/resources.json")

# Get memory status from MemPalace
MEMORY_STATUS=$("$PYTHON" "$BRIDGE" status '{}' 2>/dev/null || echo '{"total_drawers": 0, "wings": {}, "rooms": {}}')

# Get cron data
CRON_JOBS=$(cat "$AGENT/data/cron-jobs.json" 2>/dev/null || echo '[]')
CRON_STATE=$(cat "$AGENT/data/cron-state.json" 2>/dev/null || echo '{}')

# Skills (empty for now)
SKILLS='[]'

# Agent health
HEALTH=$(curl -s http://localhost:3141/health 2>/dev/null || echo '{"status":"offline"}')

# Write data.js
cat > "$DASH/data.js" << DATAEOF
window.__DASHBOARD_DATA__ = {
  tasks: $TASKS,
  projects: $PROJECTS,
  resources: $RESOURCES,
  memory: $MEMORY_STATUS,
  cron: {jobs: $CRON_JOBS, state: $CRON_STATE},
  skills: $SKILLS,
  agent: $HEALTH,
  generated: "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
};
DATAEOF

echo "Dashboard refreshed at $(date)"
