# Hermes Dashboard — React Rewrite Plan

## Goal
Replace the current single HTML file dashboard with a proper React app (Vite + Tailwind).

## Current State
- `~/.hermes/dashboard/index.html` — single file, works but messy
- `~/.hermes/dashboard/theme.css` — CSS variables for colors/fonts/spacing
- `~/.hermes/dashboard/refresh.sh` — bash script that builds data.js from hermes files
- `~/.hermes/dashboard/data.js` — generated JS with all dashboard data
- `~/.hermes/dashboard/custom_skills.json` — list of user-created skills
- `~/.hermes/dashboard/logo.png` — custom logo (purple hands)

## Data Sources
- `~/.hermes/memories/USER.md` — user profile (1,375 char limit)
- `~/.hermes/memories/MEMORY.md` — agent notes (2,200 char limit)
- `~/.hermes/cron/jobs.json` — cron jobs (nested under "jobs" key)
- `~/.hermes/config.yaml` — main config (model under model.default, provider under model.provider)
- `~/.hermes/.env` — env vars (redact tokens/keys in display)
- `~/.hermes/skills/*/*/SKILL.md` — all skills

## Architecture
- Vite + React + Tailwind CSS
- Components: Header, StatusBar, MemoryCard (x2), CronJobs, Config, Skills
- Keep theme.css variables approach — import into Tailwind config
- Data: either keep refresh.sh → JSON approach, or build a tiny Express/Fastify API that reads files live
- Custom skills tracked via custom_skills.json

## Design Requirements (Elli's preferences)
- Dark theme, teal/sea color palette
- Minimum 14px font size everywhere
- Visual, simple, ADHD-friendly — clear sections, no clutter
- Show behind-the-scenes: prompts, memory, config files
- Custom skills get ★ badge
- Collapsible sections for long content (prompts, config files, skill content)
- Logo: logo.png (purple hands)

## Components
0. **Plans** — show all .md plan files from ~/.hermes/dashboard/ and other locations. Elli wants visibility into what's planned/in progress.
1. **Header** — logo + title + refresh button
2. **StatusBar** — gateway/discord/google connection dots
3. **MemoryCard** — usage bar + entries (reusable for USER.md and MEMORY.md)
4. **CronJobs** — job cards with collapsible prompts
5. **ConfigPanel** — key/value display + collapsible raw files
6. **SkillsGrid** — grouped by category, clickable pills, ★ for custom, detail viewer
