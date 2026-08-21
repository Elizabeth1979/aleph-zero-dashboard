# Dashboard New Features Plan

## Feature 1: Quick Actions (new section at top)
**What:** Row of action buttons between header and Action Items
**Buttons:**
- ⚡ Morning Brief → opens Discord, triggers morning brief
- 📧 Check Emails → opens Discord, sends "check my emails"  
- 🔄 Refresh Dashboard → triggers refresh.sh locally
- 📋 New Task → opens Discord, sends "add task"

**How:** Discord deep links (`https://discord.com/channels/SERVER/CHANNEL`) open Discord app. Since dashboard is static (GitHub Pages), can't call APIs directly. Buttons open Discord to the home channel with the command ready.

**Design:** Horizontal row of pill-shaped buttons with icons. Matches existing theme.

## Feature 2: Activity Feed (new card in Action Items)
**What:** "Recent Activity" card showing last 5-10 agent actions
**Data source:** refresh.sh reads recent session files + cron output
**Shows:**
- Timestamp + short description of what happened
- "2 min ago — Responded in #dashboard thread"
- "1 hr ago — Morning Brief delivered"
- "3 hrs ago — Updated tasks.json"

**How:** 
1. refresh.sh scans ~/.hermes/sessions/ for recent session metadata
2. Also reads cron output logs from ~/.hermes/cron/output/
3. Writes activity array into data.js
4. New card renders as a mini timeline

## Feature 3: Session Log (new page)
**What:** Full-page view of recent sessions with summaries
**Shows:** Session list with: channel, thread name, timestamp, message count, preview
**Data:** refresh.sh extracts from session JSONL files
**Page:** pages/sessions.html (already exists — enhance it)
