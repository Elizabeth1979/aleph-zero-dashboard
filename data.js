window.__DASHBOARD_DATA__ = {
  tasks: [
  {
    "id": 2,
    "task": "Pay company annual fee",
    "added": "2026-04-03",
    "due": "2026-04-12",
    "tags": [
      "Private"
    ],
    "urgent": true,
    "scope": "private",
    "description": "Owes two years back. Payment site was down last time — try again."
  },
  {
    "id": 3,
    "task": "Buy flight tickets to visit sister in the US",
    "added": "2026-04-04",
    "tags": [
      "Private"
    ],
    "urgent": false,
    "scope": "private"
  },
  {
    "id": 5,
    "task": "Buy noise-reducing earbuds/headphones for misophonia",
    "added": "2026-04-04",
    "tags": [
      "Buy"
    ],
    "urgent": false
  },
  {
    "id": 25,
    "task": "Find a good doctor and switch",
    "added": "2026-04-05",
    "tags": [
      "Private"
    ],
    "urgent": true,
    "scope": "private"
  },
  {
    "id": 29,
    "task": "Move Slack into Knowledge Base",
    "added": "2026-04-05",
    "tags": [
      "Work"
    ],
    "urgent": false
  },
  {
    "id": 31,
    "task": "Prepare Q&A about accessibility",
    "added": "2026-04-05",
    "tags": [
      "Work"
    ],
    "urgent": false,
    "scope": "work",
    "description": "Questions and answers about accessibility for the knowledge base."
  },
  {
    "id": 32,
    "task": "Decide VPS migration architecture for Hermes",
    "added": "2026-04-06",
    "urgent": false,
    "tags": [
      "Work"
    ],
    "description": "Think through whether Hermes should move to the Hostinger VPS as the source of truth. Decide: (1) keep Mac vs VPS as the real storage for config.yaml, .env, memory, sessions, cron, and dashboard files; (2) privacy model for secrets, memory, and OAuth tokens on VPS; (3) whether dashboard stays local/private or is published in sanitized form only; (4) security hardening needed before going live: SSH keys only, firewall/UFW, fail2ban, dedicated hermes user, minimal exposed ports, backups; (5) migration plan from current Mac-hosted setup and what happens to OpenClaw. Continue tomorrow before making changes."
  },
  {
    "id": 34,
    "task": "Connect home agent to work dashboard",
    "added": "2026-04-08",
    "tags": [
      "Work"
    ],
    "urgent": false,
    "description": "Figure out what I want the agent to do when triggered from my work dashboard. Once clear, set up Tailscale so home and work computers can talk privately."
  },
  {
    "id": 35,
    "task": "Talk to boss about 2-week vacation Oct 24 – Nov 5",
    "added": "2026-04-08",
    "tags": [
      "Private"
    ],
    "urgent": true,
    "scope": "private",
    "description": "Ask for 2 weeks off Oct 24 (Thu) – Nov 5 (Thu). Found El Al tickets to LAX for the family — need approval before booking."
  },
  {
    "id": 33,
    "task": "Manual reviews",
    "added": "2026-04-06",
    "due": "2026-04-07",
    "tags": [
      "Work"
    ],
    "urgent": false
  }
],
  projects: [
  {
    "id": "a11y-mcp",
    "name": "A11y Expert MCP",
    "status": "in_progress",
    "description": "MCP server that gives AI coding assistants accessibility expertise. Reviews code, suggests fixes, provides WAI-ARIA patterns.",
    "started": "2026-04-04",
    "repo": "~/Projects/a11y-expert-mcp",
    "links": [
      {
        "label": "MCP repo",
        "url": "https://github.com/Elizabeth1979/a11y-expert-mcp"
      },
      {
        "label": "Knowledge base repo",
        "url": "https://github.com/Elizabeth1979/a11y-skills"
      }
    ],
    "notes_path": "Accessibility Projects/A11y Expert MCP/",
    "milestones": [],
    "features": [
      "4 MCP tools: review_code, get_pattern, list_patterns, check_contrast",
      "33 WAI-ARIA component patterns in knowledge base",
      "WCAG contrast ratio checker with AA/AAA pass/fail",
      "Code review with specific fix suggestions and ARIA references",
      "Published on GitHub as open-source",
      "MCP resources: pattern index + per-component detail (a11y://patterns)",
      "5 guided prompts: audit-component, make-accessible, check-form, wcag-checklist, aria-guide",
      "Prompts auto-inject relevant WAI-ARIA patterns as context"
    ],
    "tasks": [
      {
        "task": "Publish to PyPI",
        "difficulty": "medium",
        "impact": "high",
        "description": "Package and publish the A11y Expert MCP server to PyPI for easy install."
      },
      {
        "task": "Add component library research tool",
        "difficulty": "hard",
        "impact": "high",
        "description": "Tool to research and compare accessible component libraries."
      },
      {
        "task": "Remove check-form-accessibility prompt (audit-component with component_type=form does the same thing)",
        "difficulty": "easy",
        "impact": "low",
        "description": "Cleanup: remove redundant prompt."
      }
    ]
  },
  {
    "id": "a11y-app",
    "name": "A11y App",
    "status": "in_progress",
    "description": "Android accessibility app — helps users customize UI for their needs. High contrast, color schemes, AI-driven simplification.",
    "started": "2026-04-04",
    "links": [],
    "research": [
      "AI-Driven UI Customization Research.md"
    ],
    "notes_path": "A11y App Research/",
    "milestones": [],
    "features": [
      "Research phase — competitive analysis of 10+ Play Store apps",
      "Feature matrix comparing existing accessibility tools",
      "Product plan with MVP scope defined",
      "MCP product plan for AI-powered accessibility"
    ],
    "tasks": [
      {
        "task": "Fix high contrast mode — highlight card borders & non-text UI elements",
        "difficulty": "medium",
        "impact": "high"
      },
      {
        "task": "Add color scheme options — dark mode, light mode, custom user color picker",
        "difficulty": "medium",
        "impact": "high"
      },
      {
        "task": "Implement AI-driven UI customization (simple language, layout switching, chart captions, text simplification)",
        "difficulty": "hard",
        "impact": "high"
      }
    ]
  },
  {
    "id": "dashboard",
    "name": "Hermes Dashboard",
    "status": "in_progress",
    "description": "Bento-grid dashboard — tasks, memory, cron, skills, projects. Elli's single source of truth.",
    "started": "2026-04-03",
    "repo": "~/.hermes/dashboard",
    "links": [
      {
        "label": "Live site",
        "url": "https://elizabeth1979.github.io/hermes-dashboard/"
      }
    ],
    "milestones": [],
    "features": [
      "Bento-grid home with 12+ cards (tasks, memory, cron, skills, projects, etc.)",
      "A11y widget with 10 features (contrast, fonts, motion, reading guide, etc.)",
      "Rendered markdown in memory/user/soul pages with clickable file paths",
      "Project tracker with task tables, difficulty and impact ratings",
      "Auto-refreshing data.js from JSON sources",
      "GitHub Pages deployment with git push"
    ],
    "tasks": [
      {
        "task": "Add mobile breakpoints to all detail pages",
        "difficulty": "medium",
        "impact": "high"
      },
      {
        "task": "Add main landmarks, aria-hidden on icons, focus-visible styles",
        "difficulty": "easy",
        "impact": "medium"
      },
      {
        "task": "Security hardening — CSP, pin Lucide + SRI, Object.create(null)",
        "difficulty": "medium",
        "impact": "medium"
      },
      {
        "task": "A11y panel — custom font picker, color pickers for text/background/links",
        "difficulty": "hard",
        "impact": "medium"
      },
      {
        "task": "Consolidate 3 health check crons into 1",
        "difficulty": "easy",
        "impact": "low"
      }
    ]
  },
  {
    "id": "hermes-agent",
    "name": "Hermes Agent",
    "status": "in_progress",
    "description": "Improve Hermes and specialize it for Elli's workflow: less noise, better project state, clearer coding loops.",
    "started": "2026-04-07",
    "repo": "~/.hermes",
    "links": [],
    "notes_path": "",
    "milestones": [],
    "features": [
      "Active project to improve Hermes for Elli-specific workflows",
      "Separate work from status updates to reduce context waste",
      "Keep project state in small files like PLAN.md, TODO.md, and DECISIONS.md",
      "Use checkpoint-only updates: done, blocker, next, need input",
      "Reduce narration and progress spam during coding tasks",
      "Apply these ideas project by project instead of changing everything at once",
      "Dashboard now split into user-facing Config & Setup and separate Dashboard Internals with a visual flow map"
    ],
    "tasks": [
      {
        "task": "Separate work updates from status updates in responses",
        "difficulty": "easy",
        "impact": "high"
      },
      {
        "task": "Add PLAN.md / TODO.md / DECISIONS.md pattern for active coding projects",
        "difficulty": "medium",
        "impact": "high"
      },
      {
        "task": "Use checkpoint-only updates (done, blocker, next, need input)",
        "difficulty": "easy",
        "impact": "high"
      },
      {
        "task": "Reduce verbose progress narration during coding tasks",
        "difficulty": "easy",
        "impact": "high"
      },
      {
        "task": "Create a full visual agent map / repo map for Hermes (big-picture system overview)",
        "difficulty": "hard",
        "impact": "medium"
      }
    ]
  },
  {
    "id": "dashboard-rebuild",
    "name": "Dashboard Rebuild",
    "status": "in_progress",
    "description": "Rebuild the Hermes dashboard from scratch using React + a vetted accessible design system. Goal: component-based architecture so all pages share the same templates, header, layout — no more 24 separate HTML files.",
    "category": "infrastructure",
    "research": [
      "A11y Engineering Toolkit Research.md"
    ],
    "progress": 0,
    "features": [],
    "milestones": [],
    "tasks": [
      {
        "task": "Research phase: Research accessible design systems: Shopify Polaris, Radix UI, Adobe Spectrum, Carbon — compare a11y compliance, theming, React support",
        "difficulty": "easy",
        "impact": "high"
      },
      {
        "task": "Research phase: Research Storybook — evaluate if useful for this project scope",
        "difficulty": "easy",
        "impact": "low"
      },
      {
        "task": "Research phase: Decide: React + Vite (static, GitHub Pages) vs Next.js (needs Vercel/server)",
        "difficulty": "easy",
        "impact": "high"
      },
      {
        "task": "Research phase: Define teal/sea color palette as design tokens to map onto chosen system",
        "difficulty": "medium",
        "impact": "high"
      },
      {
        "task": "Research phase: Document current pages inventory: list all pages, their data sources, and component needs",
        "difficulty": "easy",
        "impact": "medium"
      },
      {
        "task": "Architecture & setup: Create separate dev branch or repo (e.g. hermes-dashboard-v2) — keep v1 in production",
        "difficulty": "easy",
        "impact": "high"
      },
      {
        "task": "Architecture & setup: Set up React + Vite project with chosen design system",
        "difficulty": "medium",
        "impact": "high"
      },
      {
        "task": "Architecture & setup: Define shared component library: PageLayout, Header, Card, StatusBadge, CodeBlock, Table",
        "difficulty": "medium",
        "impact": "high"
      },
      {
        "task": "Architecture & setup: Define routing structure (React Router or file-based)",
        "difficulty": "easy",
        "impact": "medium"
      },
      {
        "task": "Architecture & setup: Set up data layer: how data.js feeds React components (context, props, or store)",
        "difficulty": "hard",
        "impact": "high"
      },
      {
        "task": "Build core components: Build Header component (logo, status dots, restart button) — shared across all pages",
        "difficulty": "medium",
        "impact": "high"
      },
      {
        "task": "Build core components: Build PageLayout component (header + page title + body + footer)",
        "difficulty": "medium",
        "impact": "high"
      },
      {
        "task": "Build core components: Build Card component matching current bento grid cards",
        "difficulty": "medium",
        "impact": "medium"
      },
      {
        "task": "Build core components: Build RenderedMarkdown component (replaces renderMd() util)",
        "difficulty": "easy",
        "impact": "medium"
      },
      {
        "task": "Build core components: Build CodeBlock component (replaces raw-box)",
        "difficulty": "easy",
        "impact": "medium"
      },
      {
        "task": "Migrate pages: Migrate index.html (home/bento grid)",
        "difficulty": "hard",
        "impact": "high"
      },
      {
        "task": "Migrate pages: Migrate tasks.html",
        "difficulty": "medium",
        "impact": "medium"
      },
      {
        "task": "Migrate pages: Migrate projects.html",
        "difficulty": "medium",
        "impact": "medium"
      },
      {
        "task": "Migrate pages: Migrate cron.html",
        "difficulty": "medium",
        "impact": "medium"
      },
      {
        "task": "Migrate pages: Migrate all remaining pages (skills, memory, sessions, etc.)",
        "difficulty": "hard",
        "impact": "medium"
      },
      {
        "task": "QA & launch: Accessibility audit on rebuilt dashboard (axe, keyboard nav, contrast)",
        "difficulty": "medium",
        "impact": "high"
      },
      {
        "task": "QA & launch: Mobile responsiveness check on all pages",
        "difficulty": "easy",
        "impact": "high"
      },
      {
        "task": "QA & launch: Deploy v2 to GitHub Pages (separate URL or replace v1)",
        "difficulty": "medium",
        "impact": "high"
      },
      {
        "task": "QA & launch: Decommission v1 once v2 is stable",
        "difficulty": "easy",
        "impact": "medium"
      }
    ]
  },
  {
    "id": "a11y-toolkit",
    "name": "A11y Engineering Toolkit",
    "status": "in_progress",
    "description": "Modular accessibility toolkit for developers, QA, product designers, and AI agents. Includes MCP, embeddable UI tools, skills/commands, docs, prompts, and research assets. Starting with Hermes dashboard, then work use and Melio.",
    "started": "2026-04-07",
    "repo": "~/Projects/a11y-engineering-toolkit",
    "links": [
      {
        "label": "Toolkit page",
        "url": "https://elizabeth1979.github.io/a11y-engineering-toolkit/"
      },
      {
        "label": "GitHub repo",
        "url": "https://github.com/Elizabeth1979/a11y-engineering-toolkit"
      }
    ],
    "research": [
      "A11y Engineering Toolkit Research.md",
      "Generative UI Research.md",
      "AI-Driven UI Customization Research.md"
    ],
    "tasks": [
      {
        "task": "Research code annotations as a11y constraints — JSDoc tags, ESLint rules, CSS comments",
        "difficulty": "easy",
        "impact": "high"
      },
      {
        "task": "Add pa11y-ci alongside axe in GitHub Actions — runs HTMLCS + axe together, catches more issues",
        "difficulty": "medium",
        "impact": "high",
        "description": "Research finding: pa11y-ci runs both axe and HTMLCS engines. Catches things axe misses. Free and open source."
      },
      {
        "task": "Evaluate IBM Equal Access Checker as a third CI layer — 400+ rules, free, open source",
        "difficulty": "easy",
        "impact": "medium",
        "description": "Research finding: IBM Equal Access has broader rule coverage than axe. Worth evaluating as an audit-level check."
      },
      {
        "task": "Build AI-augmented PR suggestions — axe finds violation, LLM reads HTML context, suggests fix as PR comment",
        "difficulty": "hard",
        "impact": "high",
        "description": "Research finding: nobody has shipped this in production. Real gap. Architecture: axe violation → LLM reads surrounding HTML → suggests accessible name/fix → posts as PR comment. Estimated 2-3 day build."
      },
      {
        "task": "Define axe rule profiles: developer profile (skip contrast) and design-review profile (contrast + color only)",
        "difficulty": "easy",
        "impact": "high",
        "description": "Use axe tags (wcag2a, wcag2aa, best-practice) to create separate profiles. Developers shouldn't be blocked by contrast issues — that's a design concern."
      },
      {
        "task": "Define toolkit module list and install interface (npm, MCP, GitHub Action, CLI)",
        "difficulty": "medium",
        "impact": "high"
      },
      {
        "task": "Set up GitHub repo for a11y-engineering-toolkit",
        "difficulty": "easy",
        "impact": "high"
      },
      {
        "task": "Research Claude Code skills format, then build two focused skills for the toolkit: one for designers (visual, contrast, color, typography) and one for developers (keyboard, ARIA, screen reader, semantic HTML). Add to .claude/commands/ in toolkit repo.",
        "difficulty": "easy",
        "impact": "medium"
      },
      {
        "task": "Module: GitHub Actions workflow — run axe-core on every push, fail on WCAG AA violations",
        "difficulty": "medium",
        "impact": "high",
        "description": "Start with Hermes dashboard GitHub Pages URL as test target. Reusable workflow so Melio can adopt it."
      },
      {
        "task": "Module: GitHub Actions — add PR comment with a11y violation report",
        "difficulty": "medium",
        "impact": "high"
      },
      {
        "task": "Module: MCP server — integrate existing a11y-expert-mcp as toolkit module",
        "difficulty": "easy",
        "impact": "high"
      },
      {
        "task": "Module: CLI tool — run a11y audit from terminal on any URL",
        "difficulty": "medium",
        "impact": "medium"
      },
      {
        "task": "Module: AI agent prompts — reusable agent workflows for a11y review, ARIA fix, contrast check",
        "difficulty": "medium",
        "impact": "medium"
      },
      {
        "task": "Write README with module installation docs",
        "difficulty": "easy",
        "impact": "high"
      },
      {
        "task": "Test full pipeline on Hermes dashboard — prove it works end to end",
        "difficulty": "medium",
        "impact": "high"
      },
      {
        "task": "Adapt pipeline for Melio — document what changes for a React/enterprise codebase",
        "difficulty": "hard",
        "impact": "high"
      },
      {
        "task": "Module: A11y Audit Panel — extract a11y-tester.js from dashboard into a standalone embeddable script (drop-in for any webpage)",
        "difficulty": "medium",
        "impact": "high",
        "description": "Currently lives in the Hermes dashboard as a11y-tester.js. Package it so QA and developers can drop it into any site to run visual accessibility audits without installing anything."
      },
      {
        "task": "Module: A11y UX Widget — extract a11y-widget.js from dashboard into a standalone embeddable script (contrast, fonts, motion, reading guide, color picker)",
        "difficulty": "medium",
        "impact": "high",
        "description": "Currently lives in the Hermes dashboard as a11y-widget.js. Package it so product designers can demo live accessibility UX customization on any site."
      },
      {
        "task": "Write educational guide: how to use the toolkit to demo a11y improvements to product designers and QA",
        "difficulty": "easy",
        "impact": "high",
        "description": "Target audience: designers and QA at Melio. Show how each module works and what problems it solves visually."
      },
      {
        "task": "Create demo page showing all toolkit modules in action",
        "difficulty": "medium",
        "impact": "high",
        "description": "A single page that demos: audit panel, UX widget, CI results, MCP usage. For showing to Melio colleagues."
      },
      {
        "task": "Research Generative UI — understand how it works, existing implementations, accessibility angle",
        "difficulty": "easy",
        "impact": "high",
        "description": "Starting point: https://research.google/blog/generative-ui-a-rich-custom-visual-interactive-user-experience-for-any-prompt/ — Research saved to vault A11y App Research folder. Key questions: can it run on any site? Vercel AI SDK streamUI? Accessibility use case (user-directed UI regeneration)."
      },
      {
        "task": "Module: Generative UI — let users say 'show this differently' and regenerate the layout using AI",
        "difficulty": "hard",
        "impact": "high",
        "description": "AI-driven UI customization: user describes their preference and the interface adapts. Explore: Vercel AI SDK for own sites, browser extension approach for any site. Strong a11y use case — users with cognitive/visual needs can request simpler layouts, larger spacing, plain language."
      },
      {
        "task": "Integration: Local Home → Work bridge for A11y Toolkit — share the A11y Audit Panel and A11y UX Widget with the Work Dashboard using a one-way local toolkit folder",
        "difficulty": "medium",
        "impact": "high",
        "description": "Keep everything local. Home publishes toolkit code/assets only. Work imports and runs them locally. No automatic Work → Home sync."
      },
      {
        "task": "MVP: Create shared-toolkit folder structure + publish/import scripts for toolkit modules",
        "difficulty": "medium",
        "impact": "high",
        "description": "Create ~/shared-toolkit, manifest.json, publish-tool.sh, and import-tools.sh so the Work Dashboard can import toolkit modules safely."
      },
      {
        "task": "Verify end-to-end on Work Dashboard — import toolkit modules, run locally, and confirm no work results flow back home by default",
        "difficulty": "medium",
        "impact": "high",
        "description": "Use one real module first: the A11y Audit Panel or the A11y UX Widget. Confirm local-only execution and explicit export only."
      },
      {
        "task": "Define A11y Toolkit v1 module inventory — MCP, audit panel, UX widget, designer skill, developer skill, Android app research/docs",
        "difficulty": "easy",
        "impact": "high",
        "description": "Lock the actual scope of the toolkit before building the Home → Work bridge so we share the whole accessibility system, not just two UI modules."
      },
      {
        "task": "Make toolkit docs/resources/research pages shareable in the local Home → Work bridge",
        "difficulty": "easy",
        "impact": "high",
        "description": "Share research/docs/resources as modules too, not just code."
      },
      {
        "task": "Make toolkit skills shareable — designer and developer skill bundles for work use",
        "difficulty": "medium",
        "impact": "high",
        "description": "Package the accessibility skills/commands so they can be used in the work environment too."
      },
      {
        "task": "Include Melio Conversational UI MVP as a shareable accessibility module in the toolkit plan",
        "difficulty": "medium",
        "impact": "high",
        "description": "Treat Melio conversational UI work as part of the broader accessibility toolkit roadmap."
      }
    ],
    "features": [
      "A11y Audit Panel (a11y-tester.js) — visual in-page accessibility auditor with issue highlighting",
      "A11y UX Widget (a11y-widget.js) — floating customization panel: contrast, fonts, motion, reading guide, color blindness simulation",
      "Accessibility MCP foundation — a11y-expert-mcp as a core toolkit module",
      "Accessibility skills/commands for designers and developers",
      "Android accessibility app research as future toolkit input",
      "Accessibility portfolio inventory added to toolkit scope — portfolio-backed modules, docs, workflows, and research now mapped in the toolkit repo"
    ]
  },
  {
    "id": "melio-chat-mvp",
    "name": "Melio Conversational UI (MVP)",
    "status": "in_progress",
    "description": "Voice/chat interface on top of Melio's app — lets users ask in plain language: what's outstanding, pay this, add a bank account. Accessibility play: removes the need to navigate complex tables. No internal repo used — built on top of public-facing Melio API calls captured via DevTools.",
    "started": "2026-04-07",
    "repo": "",
    "links": [],
    "notes_path": "",
    "milestones": [],
    "features": [],
    "tasks": [
      {
        "task": "Research: Find and install Chrome DevTools MCP — enables agent to inspect network calls, DOM, console directly from browser",
        "difficulty": "easy",
        "impact": "high",
        "description": "Candidate: AgentDeskAI/browser-tools-mcp or similar. Search npm/GitHub, install, configure in Hermes config.yaml."
      },
      {
        "task": "Research: Check if Melio has a public API or developer docs",
        "difficulty": "easy",
        "impact": "high",
        "description": "Check melio.com/developers, app.melio.com network tab, and any public API docs. No internal repo."
      },
      {
        "task": "Research: Map Melio's key API endpoints via DevTools network tab",
        "difficulty": "easy",
        "impact": "high",
        "description": "Log into Melio, open DevTools Network tab, perform actions (view bills, initiate payment, add account), capture endpoint shapes. Document in vault."
      },
      {
        "task": "Research: Check Melio's ToS for automated access / scripting restrictions",
        "difficulty": "easy",
        "impact": "high",
        "description": "Quick read of melio.com/terms — flag anything that blocks local MVP use."
      },
      {
        "task": "Research: Check if Melio already has a conversational/chat feature — and what it can do",
        "difficulty": "easy",
        "impact": "medium",
        "description": "Is it a support bot or action-taking? What gaps does the MVP fill?"
      },
      {
        "task": "Build: MCP agent layer — tools wrapping Melio API calls (get_outstanding, pay_bill, add_bank_account, add_card)",
        "difficulty": "medium",
        "impact": "high",
        "description": "Python MCP server. Tools call Melio endpoints with user's session token. Use Claude Opus via delegate_task."
      },
      {
        "task": "Build: Simple chat UI — text input, plain language responses",
        "difficulty": "medium",
        "impact": "high",
        "description": "Next.js or plain HTML+JS. Connects to MCP agent. Runs locally first."
      },
      {
        "task": "Build: Add voice input — Web Speech API (browser STT, no extra cost)",
        "difficulty": "easy",
        "impact": "high",
        "description": "Press-to-talk button, transcript fed to the same chat handler. Works in Chrome."
      },
      {
        "task": "Demo: Record a Loom of the full flow — ask, pay, add account",
        "difficulty": "easy",
        "impact": "high",
        "description": "Show it running locally. Use real Melio account. Prepare 2-min demo script."
      },
      {
        "task": "Demo: Optional — deploy to Vercel for a shareable link",
        "difficulty": "easy",
        "impact": "medium",
        "description": "Next.js + Vercel, needs env var for session/auth. Only if Loom isn't enough."
      }
    ]
  },
  {
    "id": "fun-building",
    "name": "Fun Building",
    "status": "in_progress",
    "description": "A web-based house builder game for kids. Place rooms, add furniture, paint everything. Built by Elli + kid together, AI writes the code. Phase 1: static 3D builder with localStorage saves. Phase 2: NPCs, time/seasons, avatars, in-game coins.",
    "started": "2026-04-08",
    "repo": "~/fun-building",
    "links": [
      {
        "label": "GitHub repo",
        "url": "https://github.com/Elizabeth1979/fun-building"
      },
      {
        "label": "Live site",
        "url": "https://elizabeth1979.github.io/fun-building/"
      }
    ],
    "notes_path": "",
    "milestones": [],
    "features": [],
    "tasks": [
      {
        "task": "Phase 1 — Set up project: Vite + Three.js + GitHub Pages",
        "difficulty": "easy",
        "impact": "high",
        "description": "Scaffold the repo. Vite for build, Three.js for 3D rendering, deploy to GitHub Pages. No backend."
      },
      {
        "task": "Phase 1 — 3D room builder: drag to place and resize rooms",
        "difficulty": "hard",
        "impact": "high",
        "description": "Core mechanic. Click to add rooms, drag to resize, snap to grid. Three.js with raycasting for interaction."
      },
      {
        "task": "Phase 1 — Furniture library: drag and drop items into rooms",
        "difficulty": "medium",
        "impact": "high",
        "description": "Panel of furniture items. Drag into scene, place on floors. Start with simple box-style 3D models."
      },
      {
        "task": "Phase 1 — Build mode vs Play mode: free placement in build, gravity on play",
        "difficulty": "medium",
        "impact": "high",
        "description": "Two modes toggled by a Play button. Build mode: no physics, place objects anywhere including mid-air — full creative freedom. Play mode: gravity switches on, unsupported objects fall and settle realistically. Uses Three.js + a lightweight physics library (Rapier or Cannon.js). Switching back to Build mode freezes physics so you can keep editing."
      },
      {
        "task": "Phase 1 — Color picker: paint walls, floors, furniture, and exterior",
        "difficulty": "medium",
        "impact": "high",
        "description": "Click any surface to paint it. Custom color picker (not just presets). Interior + exterior walls separate."
      },
      {
        "task": "Phase 1 — Save and load: persist project to localStorage",
        "difficulty": "easy",
        "impact": "high",
        "description": "Serialize scene to JSON, save to localStorage. Load on return. Multiple save slots."
      },
      {
        "task": "Phase 1 — Secret god mode: hidden shortcut unlocks super admin powers for testing",
        "difficulty": "easy",
        "impact": "high",
        "description": "Hardcoded secret — a hidden keyboard shortcut or URL parameter (e.g. ?god=true) that unlocks super admin mode with no login needed. Shows a god mode indicator only visible to the super admin. Used for testing powers (fly, disappear, telekinesis) during Phase 1 and 2. Replaced by real Supabase role-based auth in Phase 3 — same powers, proper login."
      },
      {
        "task": "Phase 1 — Input abstraction layer: unified input system for all device types",
        "difficulty": "medium",
        "impact": "high",
        "description": "Build one input layer that translates all inputs into the same game commands. Game never checks 'is this a keyboard?' — it just receives 'move left', 'select', 'cancel'. Mouse + keyboard supported in Phase 1. Touch and gamepad plug in on top in Phase 2 with no rewiring needed."
      },
      {
        "task": "Phase 1 — Keyboard and mouse input: WASD/arrows for movement, click to interact",
        "difficulty": "easy",
        "impact": "high",
        "description": "Basic keyboard controls (WASD, arrows, hotkeys) and mouse (click, drag, scroll). Feeds into the input abstraction layer."
      },
      {
        "task": "Phase 1 — Camera controls: zoom in/out, pan, rotate around the house",
        "difficulty": "easy",
        "impact": "high",
        "description": "Three.js OrbitControls. Mouse scroll to zoom, drag to rotate, right-click to pan. Touch support for mobile too."
      },
      {
        "task": "Phase 1 — Share via link: encode scene as URL or export JSON file",
        "difficulty": "medium",
        "impact": "medium",
        "description": "View-only share link. Either URL-encoded state or download/upload JSON file. No backend needed."
      },
      {
        "task": "Phase 2 — Touch input: mobile and tablet support with tap, swipe, pinch-to-zoom",
        "difficulty": "medium",
        "impact": "high",
        "description": "Plug touch events into the input abstraction layer. Tap = click, swipe = move, pinch = zoom. UI buttons sized for fingers. Works on any phone or tablet browser."
      },
      {
        "task": "Phase 2 — Gamepad/joystick input: Web Gamepad API support",
        "difficulty": "medium",
        "impact": "medium",
        "description": "Browser Gamepad API — works in Chrome and Firefox. Left stick = move, buttons = actions. Plug into input abstraction layer. Works with most USB and Bluetooth controllers (Xbox, PlayStation, generic joysticks)."
      },
      {
        "task": "Phase 2 — Character gestures and emotes: flips, celebrations, dances",
        "difficulty": "medium",
        "impact": "high",
        "description": "Phase A: in-place animations first — character flips, dances, celebrates on the spot. Looks good, simpler to build. Phase B upgrade: add root motion so the whole body moves through 3D space — character launches, rotates in air, lands. Face follows body throughout. No rebuild needed, root motion is layered on top. Built with Three.js AnimationMixer. Start with 5-10 emotes, expandable as add-ons or purchasable with coins."
      },
      {
        "task": "Phase 2 — Simple NPC characters walking around",
        "difficulty": "hard",
        "impact": "medium",
        "description": "Basic animated characters with simple pathfinding inside the house. Not AI-driven, just scripted routines."
      },
      {
        "task": "Phase 2 — Graphics quality toggle: simple mode vs realistic mode",
        "difficulty": "medium",
        "impact": "high",
        "description": "One button or slider in settings. Simple mode: flat colors, no shadows, fast on any device. Realistic mode: dynamic shadows, better lighting, ambient occlusion, reflections. Three.js supports both — shadows and post-processing are just toggled on/off. Default is simple so the game runs well for everyone."
      },
      {
        "task": "Phase 2 — Day/night lighting cycle",
        "difficulty": "medium",
        "impact": "medium",
        "description": "Three.js directional light + ambient. Sky color + light intensity shift over in-game time."
      },
      {
        "task": "Phase 2 — Days of week and seasons",
        "difficulty": "easy",
        "impact": "medium",
        "description": "In-game calendar. Season changes ambient color + environment. Days shown in UI."
      },
      {
        "task": "Phase 2 — Game clock with pause, play, and speed controls",
        "difficulty": "medium",
        "impact": "medium",
        "description": "Player can pause, play, or skip time. Fast clock mode. Controls shown in HUD."
      },
      {
        "task": "Phase 2 — Avatar system: pick and assign characters to houses",
        "difficulty": "medium",
        "impact": "high",
        "description": "Kid can design avatar sets. Players pick from available avatars. Assign to household."
      },
      {
        "task": "Phase 2 — Visual aging: characters change appearance over in-game time",
        "difficulty": "hard",
        "impact": "high",
        "description": "Kids become adults visually. Multiple life stages. Tied to fast game clock."
      },
      {
        "task": "Phase 2 — In-game coin and token system",
        "difficulty": "medium",
        "impact": "medium",
        "description": "Earn coins by playing. Spend on avatars and furniture. No real money yet."
      },
      {
        "task": "Phase 2 — Avatar marketplace: buy avatars with in-game coins",
        "difficulty": "hard",
        "impact": "high",
        "description": "Kid-designed avatars listed in a shop. Players buy with coins. Eventually real money too."
      },
      {
        "task": "Phase 2 — 2D floor plan view alongside 3D",
        "difficulty": "hard",
        "impact": "medium",
        "description": "Toggle between top-down 2D plan and 3D walkthrough. Edits sync both views."
      },
      {
        "task": "Phase 2 — Add-on: Basic needs system (hunger, hygiene, bathroom, health)",
        "difficulty": "medium",
        "impact": "high",
        "description": "Characters have need bars: hunger, hygiene, bathroom, health. Bars drain over time. Player must fulfill them — eat food, shower, use bathroom, take medicine when sick. If ignored, character gets debuffs (stinky, weak, sick). Keeps players engaged and returning."
      },
      {
        "task": "Phase 2 — Add-on: Sickness and medicine system",
        "difficulty": "easy",
        "impact": "medium",
        "description": "Characters can get sick (low health + untreated needs). Need medicine items placed in the house (cabinet, pharmacy run). Ties into the needs system."
      },
      {
        "task": "Phase 2 — Add-on: Game modes (Hunger Games, Survival, Normal)",
        "difficulty": "medium",
        "impact": "high",
        "description": "Switchable modes on server creation. Normal: relaxed life sim. Survival: needs drain faster, sickness spreads. Hunger Games: last one standing, competitive. Mode is set per server, not per player."
      },
      {
        "task": "Phase 2 — Add-on: Age-appropriate content system — base game is always kid-safe",
        "difficulty": "easy",
        "impact": "high",
        "description": "Base game has zero violence, no weapons, safe for all ages by default. Content rating visible on every server. Super admin can enforce platform-wide content limits."
      },
      {
        "task": "Phase 3 — Firebase auth and cloud saves",
        "difficulty": "medium",
        "impact": "high",
        "description": "User accounts. Save projects to cloud. Friends can view each other's builds. Share link becomes persistent."
      },
      {
        "task": "Phase 3 — Super admin god mode: fly, disappear, telekinesis, and exclusive powers",
        "difficulty": "medium",
        "impact": "high",
        "description": "Super admin only. Powers nobody else has: fly (move freely through air, ignore gravity), disappear (invisible to other players, can still see and interact), telekinesis (pick up and move any object or character from a distance), plus room for more. Triggered via a hidden god mode panel only visible to the super admin account. Can be used in any server."
      },
      {
        "task": "Phase 2 — Location picker: choose any place on the planet as your starting world",
        "difficulty": "easy",
        "impact": "high",
        "description": "Search or browse a world map to pick a location — LA, New York, Antarctica, Tokyo, anywhere. The game uses that location's climate zone, terrain type, and architecture style to set the starting environment. No real map data yet, just themed generation."
      },
      {
        "task": "Phase 2 — Procedural city generator: auto-generate a city based on chosen location style",
        "difficulty": "hard",
        "impact": "high",
        "description": "Phase A: location-themed generation — desert city, arctic village, dense urban grid, tropical town. Game generates roads, blocks, and buildings in that style so players don't have to build from scratch. Phase B upgrade: pull real street layouts from OpenStreetMap so LA actually looks like LA. Phase A first, Phase B later. After generation, the world is fully editable — delete any building, road, or object, and add anything from the furniture/building library on top. The generated city is just a starting point, not locked."
      },
      {
        "task": "Phase 3 — Supabase: auth + cloud saves + real-time multiplayer via invite link",
        "difficulty": "medium",
        "impact": "high",
        "description": "Supabase replaces localStorage for saves. Each player has a simple account. Friends join the same world via an invite link — no public lobby, no strangers, just people you share the link with. Real-time presence so players see each other moving. Supabase has an MCP server so the agent can build and manage the database directly."
      },
      {
        "task": "Phase 3 — Friend invite system: share a link, friends join your world",
        "difficulty": "medium",
        "impact": "high",
        "description": "Generate a unique invite link per world. Anyone with the link can join and play together in real time. No public listing, no matchmaking, no strangers. Small group only — just the kid and his friends."
      }
    ]
  },
  {
    "id": "private-rag",
    "name": "Private RAG",
    "status": "planned",
    "description": "Personal private RAG system over Obsidian vault. Multilingual (Hebrew + English). Covers therapy transcripts, research, kids notes, and general knowledge.",
    "started": "2026-04-07",
    "milestones": [],
    "features": [],
    "tasks": [
      {
        "task": "Ingest pipeline — chunk + embed files from Obsidian vault",
        "difficulty": "medium",
        "impact": "high",
        "description": "Support .md, .txt, .pdf. Tag by category (therapy, research, kids, general)."
      },
      {
        "task": "Multilingual embeddings (Hebrew + English)",
        "difficulty": "easy",
        "impact": "high",
        "description": "Use paraphrase-multilingual-MiniLM-L12-v2 — handles Hebrew natively, no translation needed."
      },
      {
        "task": "/rag slash command",
        "difficulty": "medium",
        "impact": "high",
        "description": "Query the RAG store from any Hermes session. Returns relevant chunks as context."
      },
      {
        "task": "Separate ChromaDB collection",
        "difficulty": "easy",
        "impact": "medium",
        "description": "Keep isolated from existing agent memory store (chroma_data)."
      }
    ]
  }
],
  resources: [
  {
    "id": "1",
    "title": "50 Days of OpenClaw — Real Use Cases",
    "url": "https://www.youtube.com/watch?v=NZ1mKAWJPr4",
    "type": "video",
    "category": "inspiration",
    "status": "processed",
    "note": "Power user walkthrough of always-on AI agent after 50 days. Discord channel architecture, per-channel model routing, markdown-first workflows.",
    "takeaways": [
      "Separate Discord channels per workflow for context isolation — not needed for us yet (no per-channel model routing in Hermes)",
      "Markdown-first storage — we already do this with memory detail files",
      "Match model to task for cost savings — revisit when Hermes adds channel routing",
      "Weekly bookmark inbox channel that auto-enriches links — inspired our Resources system"
    ],
    "added": "2026-04-03"
  },
  {
    "id": "2",
    "title": "oh-my-codex — Multi-agent orchestration for Codex CLI",
    "url": "https://yeachan-heo.github.io/oh-my-codex-website/",
    "type": "article",
    "category": "ai-tools",
    "status": "archived",
    "note": "Orchestration layer for OpenAI Codex CLI. Team worktrees, staged pipelines, role prompts.",
    "takeaways": [
      "Not relevant — Codex CLI only, we use Claude Code + Hermes"
    ],
    "added": "2026-04-03"
  },
  {
    "id": "3",
    "title": "Claude Code Source Leak: What's Worth Learning for AI Agents (Blog)",
    "url": "https://thoughts.jock.pl/p/claude-code-source-leak-what-to-learn-ai-agents-2026",
    "type": "article",
    "category": "ai-tools",
    "status": "processed",
    "note": "Deep analysis of leaked Claude Code source. Three-layer memory, autoDream consolidation, skeptical memory, adversarial verification, frustration detection.",
    "takeaways": [
      "Three-layer memory (index → topic files → raw search) — DONE: built today",
      "Skeptical memory: treat memory as hint, verify before acting — DONE: added to behavior.md",
      "autoDream nightly consolidation of memory files — DONE: expanded nightly cron job",
      "Adversarial verification: post-task check step — DONE: added to behavior.md",
      "Frustration detection with tiered response — DONE: added to behavior.md",
      "Semantic memory merging catches contradictions — DONE: nightly cron now checks for contradictions"
    ],
    "added": "2026-04-03"
  },
  {
    "id": "4",
    "title": "Claude Code Source Leak: 12 Engineering Primitives (Video)",
    "url": "https://youtu.be/FtCdYhspm7w",
    "type": "video",
    "category": "ai-tools",
    "status": "processed",
    "note": "Nate Herk's analysis of Claude Code leak. 12 primitives in 3 tiers: tool registry, permissions, session persistence, workflow state, token budgets, streaming events, system logging, verification, tool pool assembly, compaction, permission audit trail, agent type system.",
    "takeaways": [
      "Tool registry with metadata-first design — Hermes handles this internally, not actionable for us",
      "Session persistence that survives crashes — Hermes already does this",
      "Workflow state ≠ conversation state — good principle, not directly implementable in Hermes",
      "Token budget hard stops — Hermes has compression config, could investigate further",
      "Agent type system (explore/plan/verify/guide) with constrained tools — interesting for future multi-agent work",
      "Released a skill to evaluate agentic harnesses — TODO: could run against our Hermes setup for fun"
    ],
    "added": "2026-04-03"
  },
  {
    "id": "5",
    "title": "opensource by Vercel — Give AI Agents Perfect Framework Context",
    "url": "https://youtu.be/KYOg81dfac8?si=ndLH04UcyvMfzv8P",
    "type": "video",
    "category": "ai-tools",
    "status": "new",
    "note": "NPM CLI tool that downloads entire source code of any npm package or GitHub repo into your project (.opensource/ folder, auto-gitignored). Gives AI agents the actual framework codebase as context — the ultimate source of truth for new/updated libraries the model wasn't trained on.",
    "takeaways": [
      "Source code > docs for AI agent context — code is the ultimate source of truth",
      "Solves the 'model trained on old version' problem without copy-pasting docs or Context7 MCP",
      "Usage: npx opensource <github-url> or npx opensource <package-name>",
      "Auto-gitignored — won't bloat your repo",
      "Could be useful for our web dev work when using newer framework features"
    ],
    "added": "2026-04-04"
  },
  {
    "id": "6",
    "title": "Automated accessible text with contrast-color()",
    "url": "https://una.im/contrast-color",
    "type": "article",
    "category": "css",
    "status": "new",
    "note": "New native CSS function landing in Chrome 147, Firefox 146, Safari 26. Takes any color, returns black or white — whichever hits WCAG 2 AA (4.5:1). One line replaces all manual dark/light text logic in design systems.",
    "takeaways": [
      "color: contrast-color(var(--brand-color)) — one line for always-accessible text",
      "Works with prefers-color-scheme for auto dark mode text",
      "Mid-tones are still a weak spot for the WCAG 2 algorithm",
      "No JS or Sass hacks needed anymore"
    ],
    "added": "2026-04-07"
  },
  {
    "id": "7",
    "title": "contrast-color() beyond black & white",
    "url": "https://una.im/advanced-contrast-color",
    "type": "article",
    "category": "css",
    "status": "new",
    "note": "Follow-up to contrast-color() basics. Two methods to go beyond black/white: (1) tint with color-mix() in oklch, 10-25% for light colors, 30-40% for dark; (2) style queries + @property + if() for full custom palette branching. Chrome 137+/Safari 26+ only for method 2.",
    "takeaways": [
      "color-mix(in oklch, var(--bg) 10%, contrast-color(var(--bg))) — branded tinted text",
      "Register --contrast-color as @property <color>, then branch with if() or @container style()",
      "Style queries not in Firefox yet but are Interop 2026 — landing soon",
      "Always validate tinted colors with WCAG or APCA checker"
    ],
    "added": "2026-04-07"
  },
  {
    "id": "8",
    "title": "Git Worktrees — Multiple Working Directories (Video)",
    "url": "https://youtu.be/jmAJQEooFhg?si=qvdh2x8leurr4hQJ",
    "type": "video",
    "category": "dev-tools",
    "status": "processed",
    "note": "Git Worktrees let you have multiple working directories for the same repo. Context-switch between tasks without stashing or throwaway commits.",
    "takeaways": [
      "git worktree add <name> <branch> — create a clean workspace from any branch instantly",
      "Each worktree is just a folder — cd in/out to switch, no special command",
      "Same branch cannot be checked out in two worktrees simultaneously",
      "Useful for reviewing PRs, hotfixes, or running parallel AI agents on the same repo"
    ],
    "added": "2026-04-07"
  },
  {
    "id": "9",
    "title": "A Continuous Integration System — 500 Lines or Less",
    "url": "https://aosabook.org/en/500L/a-continuous-integration-system.html",
    "type": "article",
    "category": "dev-tools",
    "status": "new",
    "note": "Malini Das builds a bare-bones distributed CI system in Python, under 500 lines. Three processes (observer, dispatcher, test runner) communicate over sockets. Designed for extensibility and fault tolerance.",
    "takeaways": [
      "CI = observer + dispatcher + runner — each as an independent process for parallelism and fault isolation",
      "Processes communicate via sockets — enables running each on a separate networked machine",
      "Polling observer pattern (not webhooks) — simpler to model locally",
      "Results stored as flat files — no UI needed for a minimal system",
      "Load handling via multiple test runner instances in parallel"
    ],
    "added": "2026-04-08"
  }
],
  memory: {"total_drawers": 4338, "wings": {"elli-vault": 4328, "elli-agent": 10}, "rooms": {"root": 50, "Clippings": 2736, "Context": 24, "Guidelines": 34, "Issues": 107, "Meetings": 417, "Plans": 658, "Presentations": 12, "Projects": 119, "Reports": 14, "Research": 26, "Retrospectives": 17, "Scripts": 12, "Templates": 5, "_assets": 14, "claude-memory": 62, "dashboard": 15, "packages": 6, "decisions": 2, "discord": 8}, "palace_path": "/Users/elizabethpatrick/.mempalace/palace"},
  cron: {jobs: [
  {"name": "Morning Brief", "schedule": "0 8 * * *", "description": "Daily task brief via Discord"},
  {"name": "Nightly Maintenance", "schedule": "0 23 * * *", "description": "Vault re-index and git sync"},
  {"name": "WIX Stock Review", "schedule": "0 10 1 * *", "description": "Monthly WIX stock check"},
  {"name": "Health Check", "schedule": "0 9,14,19 * * *", "description": "Agent health ping 3x daily"}
], state: {
  "Health Check": {
    "lastRun": "2026-04-10T16:00:00.034Z",
    "lastStatus": "ok",
    "runCount": 1
  }
}},
  skills: [],
  agent: {"status":"ok","timestamp":"2026-04-10T17:19:00.810Z"},
  generated: "2026-04-10T17:19:00Z"
};
