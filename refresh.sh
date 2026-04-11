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

# Skills — collect from vault's Claude skills
SKILLS_DIR="$HOME/elli-vault/.claude/skills"
SKILLS='['
first=true
if [ -d "$SKILLS_DIR" ]; then
  for skill_dir in "$SKILLS_DIR"/*/; do
    [ -d "$skill_dir" ] || continue
    skill_file=$(find "$skill_dir" -maxdepth 1 -name "*.md" | head -1)
    [ -f "$skill_file" ] || continue
    skill_name=$(basename "$skill_dir")
    # Extract category and description from frontmatter
    category=$(grep -m1 '^category:' "$skill_file" | cut -d: -f2- | sed 's/^ *//')
    [ -z "$category" ] && category="General"
    description=$(grep -m1 '^description:' "$skill_file" | cut -d: -f2- | sed 's/^ *//')
    # Read full content
    content=$(cat "$skill_file")
    # Build JSON entry
    if [ "$first" = true ]; then first=false; else SKILLS+=','; fi
    SKILLS+=$(jq -n \
      --arg name "$skill_name" \
      --arg category "$category" \
      --arg description "$description" \
      --arg content "$content" \
      '{name: $name, category: $category, description: $description, content: $content, custom: true}')
  done
fi
SKILLS+=']'

# Portfolio — fetch public repos from GitHub
PORTFOLIO=$(gh api users/Elizabeth1979/repos --paginate --jq '[.[] | select(.fork == false and .private == false) | {
  name: .name,
  description: .description,
  url: .html_url,
  updated: .updated_at,
  language: .language,
  topics: .topics,
  category: (
    if (.topics | index("accessibility")) or (.name | test("a11y|accessib|visua11y|screen-reader|wcag|sr-|alt-generation|^TTS$"; "i"))
    then "a11y"
    elif (.name | test("fun-building|kids-games|english-for-kids|family-travels|grandma-war"; "i"))
    then "personal"
    elif (.name | test("^Elizabeth1979$|^Elizabeth1979\\.github\\.io$|^e11i-garden$"; "i"))
    then "meta"
    else "tools"
    end
  )
}]' 2>/dev/null || echo '[]')

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
  portfolio: $PORTFOLIO,
  agent: $HEALTH,
  generated: "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
};
DATAEOF

# Cache-bust data.js references in HTML files
CACHE_V=$(date +%s)
sed -i '' "s/data\.js?v=[0-9]*/data.js?v=$CACHE_V/g; s/data\.js\"/data.js?v=$CACHE_V\"/g" "$DASH/index.html" "$DASH"/pages/*.html 2>/dev/null

echo "Dashboard refreshed at $(date)"
