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
  memory: {"total_drawers": 4388, "wings": {"elli-vault": 4328, "elli-agent": 60}, "rooms": {"root": 50, "Clippings": 2736, "Context": 24, "Guidelines": 34, "Issues": 107, "Meetings": 417, "Plans": 658, "Presentations": 12, "Projects": 119, "Reports": 14, "Research": 26, "Retrospectives": 17, "Scripts": 12, "Templates": 5, "_assets": 14, "claude-memory": 62, "dashboard": 51, "packages": 6, "decisions": 2, "discord": 18, "cli": 4}, "palace_path": "/Users/elizabethpatrick/.mempalace/palace"},
  cron: {jobs: [
  {"name": "Morning Brief", "schedule": "0 8 * * *", "description": "Daily task brief via Discord"},
  {"name": "Nightly Maintenance", "schedule": "0 23 * * *", "description": "Vault re-index and git sync"},
  {"name": "WIX Stock Review", "schedule": "0 10 1 * *", "description": "Monthly WIX stock check"},
  {"name": "Health Check", "schedule": "0 9,14,19 * * *", "description": "Agent health ping 3x daily"}
], state: {
  "Health Check": {
    "lastRun": "2026-04-11T11:00:00.060Z",
    "lastStatus": "ok",
    "runCount": 3
  },
  "Morning Brief": {
    "lastRun": "2026-04-11T05:00:19.963Z",
    "lastStatus": "ok",
    "runCount": 1
  }
}},
  skills: [{
  "name": "a11y-audit",
  "category": "Accessibility",
  "description": "Write layered accessibility tests (Vitest/RTL + Playwright + axe) for any component, page, or composite flow in any codebase. Use when the user says `/a11y-audit`.",
  "content": "---\nname: a11y-audit\ncategory: Accessibility\ndescription: Write layered accessibility tests (Vitest/RTL + Playwright + axe) for any component, page, or composite flow in any codebase. Use when the user says `/a11y-audit`.\n---\n\n# a11y-audit\n\nWrite a complete, layered accessibility audit and QA checklist for any component, page, or composite flow — with no a11y expertise required from the developer.\n\n## When to Use\n\n- `/a11y-audit Button` — Layer 1+2 Vitest/RTL tests for any component\n- `/a11y-audit /dashboard` — Layer 3 Playwright tests for any page route\n- `/a11y-audit open Modal from trigger` — composite flow: Layer 1+2 + Layer 3\n\n---\n\n## Step 1: Look Up WCAG Criteria\n\nConsult sources in this order. Stop at the first source that covers the component. Never use generic web search for a11y patterns.\n\n1. `~/elli-vault/Guidelines/<ComponentName>.md` — Elli's guidelines (highest trust)\n2. `~/elli-vault/Testing-Hub/` — validated test patterns\n3. W3C WCAG 2.1/2.2 criteria and APG (W3C Accessibility Patterns Guide) — fetch via `firecrawl:firecrawl-cli` from `w3.org/WAI/ARIA/apg/patterns/`\n4. GOV.UK Design System, Adobe React Aria — known-accessible implementations\n5. Context7 — **library APIs only** (jest-axe, @testing-library/react, @axe-core/playwright). Never use Context7 for a11y patterns.\n\n**If no source has criteria for the given component:**\nOutput a checklist using the WCAG baseline only (keyboard navigation, focus visibility, accessible name, color contrast) and add this note at the top of the checklist:\n> No specific guideline found for `<name>` — checklist uses WCAG baseline only. Consider adding a guideline at `~/elli-vault/Guidelines/<name>.md`.\n\n**Record the source used** — it will appear in terminal output at the end.\n\n---\n\n## Step 2: Detect Scope\n\nInfer scope from the input:\n\n| Input | Scope | Layers to write |\n|---|---|---|\n| Component name (e.g. `Button`, `Modal`) | Component | Layer 1+2 only |\n| Page route (e.g. `/jira`, `/dashboard`) | Page | Layer 3 only |\n| Composite description (e.g. `open modal from button`) | Composite | Layer 1+2 + Layer 3 |\n\n**Composite disambiguation:** If input is a component name but ambiguous, ask the user: \"What repo is this component in?\" Then find the component file by running `find <repo> -name \"<Name>.tsx\" -not -path \"*/node_modules/*\"` and read it. If it contains an interaction trigger (button, link, form submission), treat as composite. Otherwise component.\n\n**Page scope note:** Layer 1+2 (Vitest/JSDOM) does not apply to full pages — no component file to import. Page scope is Layer 3 only.\n\n---\n\n## Step 3: Detect Environment\n\nRun these checks in order to determine what layers to write:\n\n1. **Dev server?**\n   - Read `package.json` in the **current working directory** for the `dev` script to extract the port.\n   - Pattern: look for `-p <number>` or `--port <number>` in the dev command.\n   - If port cannot be determined from `package.json`, try 3000, then 3001, then 8080 in order.\n   - Run: `curl -s -o /dev/null -w \"%{http_code}\" http://localhost:<port>`\n   - If response is `200` → dev server available. Write Layer 1+2 + Layer 3.\n\n2. **Storybook?** — Run:\n   `curl -s -o /dev/null -w \"%{http_code}\" http://localhost:6006`\n   If response is `200` → Storybook available. Layer 3 target = `http://localhost:6006/?path=/story/<name>`.\n\n3. **No server** → Write Layer 1+2 only (JSDOM). Add note in VIOLATIONS.md: `Layer 3 skipped — no server available`.\n\n4. **Production / secured environment** → Checklist only. Add note in VIOLATIONS.md: `requires manual audit — production environment`.\n\n**Layer availability summary:**\n\n| Environment | Layer 1+2 | Layer 3 | Checklist | VIOLATIONS.md |\n|---|---|---|---|---|\n| Dev server | Yes | Yes | Yes | Full |\n| Storybook | Yes | Yes | Yes | Full |\n| No server | Yes | No | Yes | Partial (JSDOM axe only) |\n| Production | No | No | Yes | Manual note only |\n\n---\n\n## Step 4: Write Layer 1+2 Tests (Vitest + RTL + jest-axe)\n\n**Target file:** Detect the repo's test convention by running `find . -name \"*.test.tsx\" -not -path \"*/node_modules/*\" | head -5` and match the directory pattern found. If no convention found, default to `__tests__/components/<Name>.test.tsx`. Append inside the existing file. Do not overwrite.\n\n**Import path detection:** Find the component's actual import path by running `find . -name \"<Name>.tsx\" -not -path \"*/node_modules/*\" | head -3` and derive the relative import or package name from the result.\n\n**Before writing tests:** Use Context7 to look up current `@testing-library/react` and `jest-axe` APIs.\n\n**Pattern — every Layer 1+2 block uses this structure:**\n\n    import { render } from '@testing-library/react'\n    import { axe, toHaveNoViolations } from 'jest-axe'\n    import userEvent from '@testing-library/user-event'\n    import { ComponentName } from '<detected-import-path>'\n\n    expect.extend(toHaveNoViolations)\n\n    describe('accessibility (WCAG X.X.X, Y.Y.Y)', () => {\n      it('criterion description', async () => {\n        const { container } = render(<ComponentName />)\n        const results = await axe(container)\n        expect(results).toHaveNoViolations()\n      })\n\n      it('keyboard behavior description', async () => {\n        const { getByRole } = render(<ComponentName />)\n        await userEvent.tab()\n        // assert focus and ARIA contract\n      })\n    })\n\n**Tagging rule:** Every `describe` block must include the WCAG criterion in the description string.\nExample: `describe('accessibility (WCAG 2.1.1, 4.1.3)', () => { ... })`\n\n**WCAG criteria to cover by default** (supplement with component-specific criteria from Step 1):\n- 2.1.1 Keyboard — all interactive elements reachable and operable\n- 4.1.2 Name, Role, Value — correct ARIA role + accessible name\n- 1.4.3 Contrast — checked by axe automatically\n- 4.1.3 Status Messages — for any component with live regions\n\n---\n\n## Step 5: Write Layer 3 Tests (Playwright + @axe-core/playwright)\n\n**Target file:** Detect the repo's e2e convention by running `find . -name \"*.spec.ts\" -not -path \"*/node_modules/*\" | head -5` and match the directory pattern found. If no convention found, create `e2e/<name>.spec.ts`.\n\n**Before writing tests:** Use Context7 to look up current `@axe-core/playwright` APIs.\n\n**Rule:** Every Layer 3 test = interaction flow + axe scan. Never a static scan alone.\n\n**Pattern:**\n\n    import { test, expect } from '@playwright/test'\n    import AxeBuilder from '@axe-core/playwright'\n\n    test.describe('accessibility (WCAG X.X.X)', () => {\n      test('component/page: no WCAG violations at initial state', async ({ page }) => {\n        await page.goto('/route')\n        const results = await new AxeBuilder({ page }).analyze()\n        expect(results.violations).toEqual([])\n      })\n\n      test('component/page: no violations after interaction', async ({ page }) => {\n        await page.goto('/route')\n        await page.click('button[aria-label=\"label\"]')   // trigger state\n        const results = await new AxeBuilder({ page }).analyze()\n        expect(results.violations).toEqual([])             // axe scan\n        await expect(page.locator('[role=\"dialog\"]')).toBeFocused() // ARIA contract\n      })\n    })\n\n**States to scan:** Initial load, after primary user interaction (open/close, submit, error), and any significant ARIA state change.\n\n**Storybook variant:** If Layer 3 target is Storybook, navigate to:\n`http://localhost:6006/?path=/story/<component-name>--<story-name>`\n\n---\n\n## Step 6: Write QA Checklist\n\n**Target file:** `~/elli-vault/Testing-Hub/checklists/<name>.md` — create or overwrite.\n\nThe checklist is derived from the same WCAG criteria used in Steps 4–5. Every criterion in the tests must have a corresponding manual check in the checklist.\n\n**Format:**\n\n    # ComponentName/PageRoute — Accessibility Checklist\n\n    Generated: YYYY-MM-DD\n    WCAG criteria: list\n    Source: guideline file or \"WCAG baseline\"\n\n    ---\n\n    ## WCAG 2.1.1 — Keyboard\n    - [ ] All interactive elements reachable by Tab\n    - [ ] Enter/Space activates buttons and links\n    - [ ] Arrow keys navigate within composite widgets (menus, tabs, etc.)\n    - [ ] Escape closes modal/popover/tooltip\n\n    ## WCAG 4.1.2 — Name, Role, Value\n    - [ ] Every interactive element has an accessible name (visible label or aria-label)\n    - [ ] Icon-only buttons have aria-label\n    - [ ] Role is correct (button, link, dialog, etc.)\n\n    ## WCAG 1.4.3 — Contrast\n    - [ ] Text meets 4.5:1 against its background (normal text)\n    - [ ] Large text (18px+ or 14px+ bold) meets 3:1\n\n    ## WCAG 4.1.3 — Status Messages (if applicable)\n    - [ ] Error messages announced to screen reader without focus move\n    - [ ] Success confirmation announced without focus move\n\n**If Layer 3 was skipped:** Add at the top:\n> Layer 3 automated tests were not run (no dev server). This checklist is the primary QA artifact — all items require manual verification.\n\n---\n\n## Step 7: Log Violations\n\n**Target file:** `~/elli-vault/Testing-Hub/VIOLATIONS.md` — all violations go here regardless of which repo was audited. Create if absent. Append only. Never modify existing entries.\n\nAfter running Layer 1+2 (jest-axe) or Layer 3 (@axe-core/playwright), append each violation as a new entry.\n\n**Status lifecycle:** `open` → `fix suggested` → `fixed` → `regression test written`\n\n**Entry format:**\n\n    ## YYYY-MM-DD — ComponentName\n    - Repo: penny | platform-app | dashboard | <other>\n    - Rule: axe-rule-id (WCAG criterion)\n    - Element: selector or description\n    - Impact: critical | serious | moderate | minor\n    - Suggested fix: specific change — e.g. \"Change token from `color-text-muted` to `color-text-secondary` (contrast 4.8:1)\"\n    - Confidence: N% — reason for confidence level\n    - Status: open — Jira: <add ticket ID after triage>\n    - Regression test: none yet\n\n**Confidence scoring guide:**\n- 90–100%: Fix is unambiguous from the guideline (e.g. missing `aria-label` on an icon button)\n- 70–89%: Fix is clear but may have edge cases (e.g. contrast token swap — verify in all states)\n- 50–69%: Pattern is correct but implementation details need developer review\n- <50%: Multiple valid fixes — present options, do not pick one\n\n**Never auto-apply fixes.** Suggest and ask: \"I found N violations. Want me to suggest fixes for each?\"\n\n**If no violations:** Still append a summary entry:\n\n    ## YYYY-MM-DD — ComponentName\n    - Status: no violations found\n    - Layers run: Layer 1+2 + Layer 3\n    - WCAG criteria checked: list\n\n---\n\n## Step 8: Learning Loop (on subsequent runs)\n\nOn every run, before writing new tests, scan `~/elli-vault/Testing-Hub/VIOLATIONS.md` for entries where `Status: fixed`.\n\n**For each fixed violation:**\n\n1. **Prompt the developer:**\n   > \"I see `<rule>` on `<element>` (entry from <date>) was marked fixed. Want me to write a regression test?\"\n\n2. **If yes — write regression test** and append to `__tests__/components/<Name>.test.tsx`:\n\n       describe('regression (WCAG criterion) — JiraID', () => {\n         it('description of the fix confirmed', async () => {\n           const { container } = render(<ComponentName />)\n           // assert the specific fix holds\n           const results = await axe(container)\n           expect(results).toHaveNoViolations()\n         })\n       })\n\n3. **Determine the line number** of the regression test just written:\n   Run: `grep -n \"regression (WCAG\" <detected-test-file> | tail -1`\n   Use the returned line number in the next step.\n\n4. **Update VIOLATIONS.md entry** in `~/elli-vault/Testing-Hub/VIOLATIONS.md` — replace the regression line for this entry only:\n   Change: `- Regression test: none yet`\n   To:     `- Regression test: <detected-test-file>:<line>`\n\n5. **Abstract the fix pattern** — append to `~/elli-vault/Guidelines/<ComponentName>.md`:\n\n       ## Fix pattern: short name\n       Pattern: what the violation was\n       Fix: what resolved it\n       WCAG: criterion\n       Date confirmed: YYYY-MM-DD\n       Jira: ticket\n\n   This makes the fix available at source #1 (highest trust) for all future runs.\n\n6. **Run preventive scan** — search the codebase for other instances of the same pattern.\n   Example: for `icon-button-aria-label`, find icon buttons that lack an accessible name:\n   `grep -rn \"<[A-Z][a-zA-Z]*Icon\" --include=\"*.tsx\" | grep -v \"aria-label\"`\n   For each matching instance not yet covered by a test, write a preventive test:\n\n       describe('preventive (WCAG criterion) — pattern: pattern-name', () => {\n         it('ComponentName description', () => { ... })\n       })\n\n**Full loop summary:** find → log → fix → regression test → learn (guideline) → prevent\n\n---\n\n## Step 9: Print Terminal Summary\n\nAfter every run, print:\n\n    a11y-audit complete for: <name>\n      Scope:         Component | Page | Composite\n      Environment:   Dev server | Storybook | No server\n      Tests written: <detected-test-file> (Layer 1+2)\n                     <detected-e2e-file> (Layer 3)       [or: skipped — reason]\n      Checklist:     ~/elli-vault/Testing-Hub/checklists/<name>.md\n      Violations:    ~/elli-vault/Testing-Hub/VIOLATIONS.md (N new entries)  [or: 0 violations found]\n      WCAG criteria: list e.g. 2.1.1, 1.4.3, 4.1.2\n      Source used:   ~/elli-vault/Guidelines/<Name>.md   [or: WCAG baseline]\n\nIf Layer 3 was skipped, add:\n      Note: Layer 3 skipped — reason. All checklist items require manual QA.\n\n---\n\n## Constraints\n\nThis skill never:\n- Auto-applies fixes without developer confirmation\n- Uses generic web search for a11y patterns (only trusted hierarchy from Step 1)\n- Writes tests without a corresponding WCAG criterion in the `describe` tag\n- Leaves a layer empty without an explicit note explaining why (e.g. \"Layer 3 skipped — no server\")\n- Modifies existing VIOLATIONS.md entries (append only)",
  "custom": true
},{
  "name": "a11y-by-design",
  "category": "Accessibility",
  "description": "Audit a codebase for font size, color contrast, and WCAG violations. Use when running `/a11y-by-design`.",
  "content": "---\nname: a11y-by-design\ncategory: Accessibility\ndescription: Audit a codebase for font size, color contrast, and WCAG violations. Use when running `/a11y-by-design`.\n---\n\n# a11y-by-design\n\nAudit a target codebase for visual accessibility violations and output a prioritized report with WCAG citations and fix suggestions.\n\n## When to Use\n\n- Before writing or updating accessibility guidelines for a component\n- When onboarding onto a new codebase to assess visual accessibility debt\n- After a design token migration to verify nothing regressed\n- Whenever you suspect font sizes or color contrast are out of spec\n\n---\n\n## Steps\n\n### 1. Parse Input\n\nAccept an optional target directory. If none provided, use the current working directory.\n\n```\n/a11y-by-design                    # audits cwd\n/a11y-by-design ~/elli-vault/dashboard   # audits specific directory\n```\n\nConfirm the target with the user: \"Auditing `[directory]` — scanning for font size violations, contrast failures, and raw color usage.\"\n\n---\n\n### 2. Discover Styling Files\n\nSearch the target directory for styling and token files. Use Glob and Grep tools.\n\nFiles to find:\n- `tailwind.config.*` (tailwind.config.ts, tailwind.config.js, tailwind.config.mjs)\n- `globals.css`, `global.css`, `variables.css`, `tokens.css`\n- Any `.scss`, `.css` files (skip `node_modules/`)\n- Any `*tokens*` files (design token JSON or JS)\n- `theme.ts`, `theme.js`, `colors.ts`, `colors.js`\n\nList all found files before proceeding.\n\n---\n\n### 3. Extract Color Token Map\n\nBuild a dictionary of `{ tokenName → hexValue }` by reading the discovered files.\n\n**From Tailwind config** — look for `theme.extend.colors` or `theme.colors`:\n```js\n// Example pattern to extract:\ncolors: {\n  surface: '#0D0F14',\n  muted: '#64748B',\n  accent: '#22D3EE',\n}\n```\n\n**From CSS custom properties** — look for `--color-*` or `--*-color` variables:\n```css\n:root {\n  --color-surface: #0D0F14;\n  --color-muted: #64748B;\n}\n```\n\n**From JSON token files** — parse `\"value\"` fields for hex colors.\n\nOutput the extracted map as a reference table:\n```\nColor Token Map:\n  surface    → #0D0F14\n  muted      → #64748B\n  accent     → #22D3EE\n  ...\n```\n\nIf no color token map found, note this and still proceed with raw-color scanning.\n\n---\n\n### 4. Scan for Font Size Violations\n\nSearch for any font size value below 12px.\n\n**Grep patterns to run:**\n\n1. Tailwind arbitrary sizes: `text-\\[[0-9]+px\\]` — extract the `Npx` value\n2. CSS `font-size` values: `font-size:\\s*[0-9]+px` — extract the pixel value\n3. CSS `font-size` in rem: `font-size:\\s*0\\.[0-9]+rem` — convert to px (1rem = 16px)\n4. Tailwind config custom font sizes: look for entries < 12px in `fontSize` config object\n\nFor each match, record:\n- File path + line number\n- Current value\n- Suggested replacement (see table below)\n\n**Minimum font size reference:**\n\n| Current | Issue | Suggested fix |\n|---------|-------|---------------|\n| < 8px   | Hard fail — unreadable | Use `text-xs` (12px) minimum |\n| 8–11px  | WCAG violation | Use `text-xs` (12px) minimum |\n| 12px    | Acceptable minimum | Consider `text-sm` (14px) for body copy |\n\n**WCAG reference:** SC 1.4.4 Resize Text (AA) — text must be resizable up to 200% without loss of content. Minimum practical size is 12px; preferred body text is 14px+.\n\n---\n\n### 5. Calculate Color Contrast\n\nFor each foreground/background pair you can infer from the codebase, compute the WCAG contrast ratio.\n\n**Pairs to check:**\n\n1. From Tailwind config: any pair where one token looks like text color and another looks like a background (e.g., `text-*` + `bg-*` usage patterns in components)\n2. From CSS: any explicit `color` + `background-color` combo in the same selector\n3. Common baseline pairs to always check if tokens exist: body text on surface, muted text on surface, accent on surface, white on primary, black on primary\n\n**WCAG Contrast Formula (use this — do not look it up):**\n\n```\nStep 1 — Linear channel value:\n  c_lin = c/255/12.92          if c/255 ≤ 0.04045\n  c_lin = ((c/255 + 0.055) / 1.055) ^ 2.4   otherwise\n\nStep 2 — Relative luminance:\n  L = 0.2126 * R_lin + 0.7152 * G_lin + 0.0722 * B_lin\n\nStep 3 — Contrast ratio:\n  CR = (L_lighter + 0.05) / (L_darker + 0.05)\n  (L_lighter is the higher luminance value)\n\nThresholds:\n  Normal text (< 18px, or < 14px bold): AA = 4.5:1 · AAA = 7:1\n  Large text  (≥ 18px, or ≥ 14px bold): AA = 3:1   · AAA = 4.5:1\n  UI components and graphical objects:   AA = 3:1\n```\n\n**How to compute hex → RGB:**\n- `#RRGGBB` → R = parseInt(RR, 16), G = parseInt(GG, 16), B = parseInt(BB, 16)\n- `#RGB` → expand each digit: `#ABC` = `#AABBCC`\n\nFor each failing pair, also suggest a fix:\n- If text fails: suggest lightening the text color (increase luminance) if on dark bg, or darkening if on light bg\n- Provide the approximate hex value that would reach AA (4.5:1)\n\n---\n\n### 6. Scan for Raw Color Usage\n\nGrep component and page files for hardcoded color values that bypass the token system.\n\n**Files to scan:** `*.tsx`, `*.jsx`, `*.ts`, `*.js`, `*.css`, `*.scss` in the target directory (skip `node_modules/`, `.next/`, `dist/`, `build/`)\n\n**Patterns to grep:**\n\n1. Inline hex in JSX: `style=\\{\\{[^}]*['\"](#[0-9a-fA-F]{3,6})['\"]}` or simpler `#[0-9a-fA-F]{6}` in component files\n2. rgba/rgb literals: `rgba?\\([0-9, .]+\\)`\n3. Non-semantic Tailwind color classes: `(text|bg|border|ring|fill|stroke)-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-[0-9]+`\n\nFor each match, record:\n- File path + line number\n- Current value\n- Whether a semantic token exists for this value (check against the color token map from Step 3)\n\n**Why this matters:** Raw color values can't be audited consistently, won't respect theme changes, and may not have been checked for contrast.\n\n---\n\n### 7. Output Structured Report\n\nPrint the full audit report in this format:\n\n```\n## a11y-by-design Audit — [directory]\n\n### 🔴 Critical: Font Sizes Below 12px\n[N violations found — or \"None found ✅\"]\n- src/components/Badge.tsx:14 — `text-[9px]` → use `text-xs` (12px) minimum\n- src/styles/globals.css:32 — `font-size: 10px` → use `font-size: 12px` minimum\n\n### 🔴 Critical: WCAG Contrast Failures\n[N pairs failing — or \"None found ✅\"]\n- muted (#64748B) on surface (#0D0F14) — 4.03:1 — fails AA for normal text (need 4.5:1)\n  → Suggested fix: lighten muted to #94A3B8 (7.48:1)\n- faint (#475569) on white (#FFFFFF) — 3.21:1 — fails AA for normal text (need 4.5:1)\n  → Suggested fix: darken faint to #374151 (6.28:1)\n\n### 🟡 Warning: Non-Semantic Color Values\n[N instances — or \"None found ✅\"]\n- components/JiraCard.tsx:43 — `color: '#22D3EE'` → use `text-accent` (semantic token exists)\n- components/Badge.tsx:8 — `bg-cyan-400` → use `bg-accent` if it maps to cyan-400\n- app/globals.css:12 — `rgba(0,0,0,0.5)` → consider adding a token for this opacity value\n\n### ✅ Summary\n[X critical issues, Y warnings across Z files.]\n[Estimated effort: N files need changes.]\n```\n\nBe precise with line numbers. Show the actual grep output value, not a paraphrase.\n\n---\n\n### 8. Offer Next Step\n\nAfter the report, ask:\n\n> \"Would you like me to:\n> - **A)** Create a fix plan (invokes `/writing-plans` with these violations as requirements)\n> - **B)** Just use this report as reference — done for now\n>\n> Which would you prefer?\"\n\nIf user chooses A: invoke `superpowers:writing-plans` with the violations list as the input spec.\n\n---\n\n## Example Invocations\n\n```\n/a11y-by-design\n/a11y-by-design ~/elli-vault/dashboard\n/a11y-by-design ~/penny/packages/penny/src/components/Button\n```\n\n---\n\n## Notes\n\n- Always skip `node_modules/`, `.next/`, `dist/`, `build/`, `.git/` directories\n- If no color tokens found, still run font-size and raw-color scans — report absence of token system as a separate warning\n- Contrast calculations must be done by Claude directly using the formula above — do not delegate to external tools\n- If the codebase uses CSS-in-JS (styled-components, emotion), also grep for template literals containing color values\n- This skill is for **visual** accessibility only — it does not audit ARIA, keyboard behavior, or focus management",
  "custom": true
},{
  "name": "a11y-visualize",
  "category": "Accessibility",
  "description": "Visualize accessibility concepts (contrast, focus order, ARIA, landmarks) in the browser. Use for /a11y-visualize or when a visual explains the a11y problem better than text.",
  "content": "---\nname: a11y-visualize\ncategory: Accessibility\ndescription: Visualize accessibility concepts (contrast, focus order, ARIA, landmarks) in the browser. Use for /a11y-visualize or when a visual explains the a11y problem better than text.\n---\n\n# A11y Visual Companion\n\nBrowser-based visual companion for explaining accessibility concepts — contrast comparisons, focus order diagrams, component state walkthroughs, before/after patterns, and live interactive demos.\n\n## When to Use\n\n**Open the browser** when the accessibility concept is spatial, comparative, or interactive:\n- Contrast ratios — showing pass/fail side-by-side is clearer than numbers\n- Focus order — tab stops need a numbered overlay on a visual layout\n- Component states (hover/focus/disabled/error) — a grid beats a list of descriptions\n- Before/after inaccessible vs accessible — split view makes the diff visceral\n- Live interactive demos — devs need to *try* the keyboard pattern, not read about it\n- Landmark maps, heading trees, accessibility tree views — inherently spatial\n\n**Stay in terminal** when the question is conceptual or procedural:\n- \"Which WCAG criterion applies here?\" → text\n- \"Should I use aria-label or aria-labelledby?\" → text explanation first, then optionally a visual\n- Code review comments → text\n\n## Starting the Server\n\n```bash\nbash /Users/elizabethpatrick/.claude/plugins/cache/claude-plugins-official/superpowers/5.0.2/skills/brainstorming/scripts/start-server.sh --project-dir ~/elli-vault\n```\n\nReturns JSON: `{\"type\":\"server-started\",\"port\":PORT,\"url\":\"http://localhost:PORT\",\"screen_dir\":\"PATH\"}`\n\nSave `screen_dir`. Tell Elli to open the URL. Write HTML files into `screen_dir`.\n\n**Before each write:** check `$SCREEN_DIR/.server-info` exists and `.server-stopped` does not. If server died, restart it.\n\n**Server auto-exits** after 30 min of inactivity.\n\n## The Loop\n\n1. Write HTML fragment to a new file in `screen_dir` (never reuse filenames)\n2. Tell Elli the URL and briefly what's on screen\n3. On next turn: read `$SCREEN_DIR/.events` for browser clicks + Elli's terminal text\n4. Write updated file or advance to next visual\n5. When returning to a text-only exchange, push a waiting screen to clear stale content:\n   ```html\n   <div style=\"display:flex;align-items:center;justify-content:center;min-height:60vh\">\n     <p class=\"subtitle\">Continuing in terminal…</p>\n   </div>\n   ```\n\n## Design System\n\nAll a11y visuals use the **editorial/utilitarian dark theme** — like a high-quality developer tool. Always write full `<!DOCTYPE html>` documents (not server-wrapped fragments). Load Google Fonts in every file.\n\n### Fonts\n```html\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap\" rel=\"stylesheet\">\n```\n- UI text: `'DM Sans', sans-serif`\n- Code, badges, eyebrows, mono labels: `'DM Mono', monospace`\n\n### Color tokens\n```css\n:root {\n  --bg:       #0c0d0f;   /* page background */\n  --surface:  #141618;   /* card/panel */\n  --surface2: #1c1e22;   /* header/footer within mockup */\n  --surface3: #242729;   /* inputs, hover states */\n  --line:     #2a2d32;   /* primary borders */\n  --line2:    #363a40;   /* secondary borders */\n  --text:     #e8eaed;   /* primary text */\n  --muted:    #6b7280;   /* secondary text */\n  --dim:      #3d4148;   /* disabled / very subtle */\n  --amber:    #f5a623;   /* focus ring, current badge, accent */\n  --amber-dim:#7a4e0a;   /* amber badge background */\n  --green:    #34d399;   /* visited/success */\n  --green-dim:#064e3b;   /* green badge background */\n  --red:      #f87171;   /* error/failure */\n  --red-dim:  #4c1d1d;   /* red badge background */\n  --blue:     #60a5fa;   /* code text */\n  --indigo:   #818cf8;   /* links, active states, WCAG chips */\n  --font-ui:  'DM Sans', sans-serif;\n  --font-mono:'DM Mono', monospace;\n}\n```\n\n### Layout patterns\n- Page padding: `2.5rem 2rem 4rem`\n- **Eyebrow**: `font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--amber);`\n- **H1**: `font-size: 1.75rem; font-weight: 600; letter-spacing: -0.02em;`\n- **Section heading**: mono, 0.72rem, uppercase, muted\n- WCAG criterion chips: `font-family: mono; font-size: 0.68rem; background: var(--surface2); border: 1px solid var(--line2); color: var(--indigo);`\n\n### Tab stop badges\nAbsolutely positioned over interactive elements. Three states:\n- Default: `background: var(--surface3); border: 1.5px solid var(--dim); color: var(--muted);`\n- `.visited`: `background: var(--green-dim); border-color: var(--green); color: var(--green);`\n- `.current`: `background: var(--amber-dim); border-color: var(--amber); color: var(--amber); transform: scale(1.35);`\n\n### Focus ring\n```css\n:focus-visible {\n  outline: 2px solid var(--amber);\n  outline-offset: 2px;\n  border-radius: 4px;\n}\n```\n\n### `<code>` inline\n```css\ncode {\n  font-family: var(--font-mono);\n  font-size: 0.76em;\n  background: var(--surface3);\n  border: 1px solid var(--line);\n  border-radius: 3px;\n  padding: 1px 5px;\n  color: var(--blue);\n}\n```\n\n**Reference implementation:** `focus-order-v2.html` in the current session's screen_dir.\n\n## Visual Library\n\n### Fundamentals\n\n**Contrast comparison** — `/a11y-visualizecontrast #FG #BG`\nTwo color swatches side-by-side in `.split`. Each shows: the foreground hex on background, computed contrast ratio, WCAG AA/AAA pass/fail badges for normal text (4.5:1 / 7:1) and large text (3:1 / 4.5:1). Add a third swatch for a fixed alternative if one fails.\n\n```html\n<h2>Contrast Comparison</h2>\n<div class=\"split\">\n  <div class=\"mockup\">\n    <div class=\"mockup-header\">Sample: #1a1a2e on #ffffff</div>\n    <div class=\"mockup-body\" style=\"background:#ffffff;padding:2rem\">\n      <p style=\"color:#1a1a2e;font-size:1rem\">Normal text sample (16px)</p>\n      <p style=\"color:#1a1a2e;font-size:1.5rem;font-weight:700\">Large text sample</p>\n      <p class=\"label\" style=\"margin-top:1rem\">Ratio: 14.7:1</p>\n      <span style=\"background:var(--success);color:white;padding:2px 8px;border-radius:4px;font-size:0.75rem\">AA ✓</span>\n      <span style=\"background:var(--success);color:white;padding:2px 8px;border-radius:4px;font-size:0.75rem;margin-left:4px\">AAA ✓</span>\n    </div>\n  </div>\n</div>\n```\n\n**Touch target checker** — `/a11y-visualizetouch-targets`\nMock UI with colored overlays. 44×44px minimum (WCAG 2.5.5). Failing targets highlighted in red with size label. Passing targets in green.\n\n**WCAG criterion card** — `/a11y-visualizewcag 1.4.3`\nCard showing: criterion ID + name, level (A/AA/AAA), one-sentence description, success checklist (3-5 bullet tests), common failure patterns.\n\n### Component Behavior\n\n**Component states** — `/a11y-visualizestates [component]`\nGrid layout. One cell per state: default, hover, focus, active, disabled, error (skip states that don't apply). Each cell shows: the visual component mockup AND a screen reader announcement badge. Focus state MUST show a visible focus ring — no outline:none. Use `box-shadow: 0 0 0 3px var(--accent)` as the canonical focus ring pattern.\n\n**Accessible component demo** — `/a11y-visualizecomponent [name]`\nFull interactive HTML implementation (write as a full document starting with `<!DOCTYPE html>`). Include: real semantic markup, correct ARIA, keyboard behavior annotations as inline comments, a \"What screen readers hear\" panel below. Devs can tab through it live in the browser.\n\n**Button vs Link** — `/a11y-visualizebutton-vs-link`\nSide-by-side `.split`. Left: `<button>` — triggers action, no navigation, keyboard: Space/Enter. Right: `<a href>` — navigates, keyboard: Enter only. Both show SR announcement, DOM snippet, and a \"use when\" rule.\n\n**Focus order diagram** — `/a11y-visualizefocus-order`\nMock page layout with numbered tab-stop badges (①②③…). Badge color: green = correct order, red = out-of-logical-order, gray = non-focusable. Add a DOM order note if visual order differs from reading order.\n\n### Dynamic Content & Interactions\n\n**Live region demo** — `/a11y-visualizelive-region`\nWrite as full document. Includes: a button that triggers content change, a visible ARIA live region (`aria-live=\"polite\"`), a timeline panel showing \"SR announces: [text]\" with timestamp animation. Shows the markup wired up.\n\n**Hover-only content** — `/a11y-visualizehover-content`\n`.split`: Left = failure (tooltip only on `:hover`, no keyboard access, no touch access). Right = fix (persistent trigger with `aria-describedby` or `aria-expanded` pattern). Both show the DOM snippet.\n\n**Persistent tooltip** — `/a11y-visualizetooltip`\n`.split`: Left = non-persistent (disappears on focus loss, SR misses it). Right = accessible (stays visible on focus, `role=\"tooltip\"`, `aria-describedby` wired to trigger, dismisses on Escape).\n\n**Truncated text** — `/a11y-visualizetruncated-text`\nShow 3 patterns: (1) Failure: CSS `text-overflow:ellipsis` with no alternative. (2) Fix A: full text in accessible tooltip with `aria-label`. (3) Fix B: expand affordance (\"show more\" button). Label which WCAG criterion each pattern affects (1.4.4, 1.3.1).\n\n### Page Structure\n\n**Screen reader flow** — `/a11y-visualizesr-flow`\nOrdered list of what a screen reader announces, top to bottom. Each item is a row: icon (heading/landmark/button/link/image/text), the announced string, and a flag badge (🔴 missing label / 🟡 redundant / 🟢 ok). Makes silent failures visible.\n\n**Landmark map** — `/a11y-visualizelandmark-map`\nPage mockup with color-coded overlay per landmark: `<header>` (blue), `<nav>` (purple), `<main>` (green), `<aside>` (orange), `<footer>` (gray). Each overlay shows its accessible name (or \"⚠ no label\" if unnamed and there are multiple of the same type).\n\n**Heading tree** — `/a11y-visualizeheading-tree`\nIndented tree. Each node: `H1`–`H6` badge + heading text. Red highlight for skipped levels (e.g., H1 → H3 skips H2). Gray out decorative headings if any.\n\n**Before/After** — `/a11y-visualizebefore-after [topic]`\n`.split`. Left = \"Before (inaccessible)\" with red annotation badges on the failures. Right = \"After (accessible)\" with green annotation badges on the fixes. Both include the relevant markup snippet below the mockup.\n\n### Accessible Names & Accessibility Tree\n\n**Accessible name audit** — `/a11y-visualizename-audit`\nMock UI grid. Each interactive element gets a badge: computed accessible name (green), or \"⚠ no name\" (red). Badge also shows the source: `label`, `aria-label`, `aria-labelledby`, `title`, `placeholder` (failure).\n\n**Accessibility tree view** — `/a11y-visualizea11y-tree`\nIndented tree mirroring the browser accessibility tree. Each node: role badge + name + state (expanded/collapsed/checked/disabled). Shows divergence between DOM structure and what AT actually sees.\n\n### Use of Color & Data\n\n**Color-only info** — `/a11y-visualizecolor-only`\n3-panel row. Panel 1: failure (status conveyed by color only — red/green dot). Panel 2: fix (color + icon + text label). Panel 3: simulated deuteranopia view of panel 1 (both dots look the same) to make the failure obvious.\n\n**Complex graph** — `/a11y-visualizegraph`\n`.split`: Left = inaccessible chart (SVG/canvas with no labels, no table, no description). Right = accessible pattern (visible data table below chart, descriptive `<title>` and `<desc>` in SVG, axis labels, summary paragraph). Reference WCAG 1.1.1 and 1.3.1.\n\n**Data table** — `/a11y-visualizetable`\n`.split`: Left = layout table (divs, no semantics, no headers). Right = correct table: `<caption>`, `<th scope=\"col/row\">`, `summary` attribute, `headers` for complex cells. SR announcement difference shown below each.\n\n### Forms & Inputs\n\n**Input labels** — `/a11y-visualizeinput-labels`\n4-column grid. Each column: one labeling pattern. (1) `<label for>` — best, always visible. (2) `aria-label` — ok, invisible. (3) `aria-labelledby` — ok, references visible text. (4) `placeholder` only — FAILURE (disappears on input, fails 1.3.1). SR announcement shown under each.\n\n**Lists** — `/a11y-visualizelists`\n3 columns: `<ul>` (unordered, SR: \"list, N items\"), `<ol>` (ordered, SR: \"list, N items, 1.\"), `<dl>` (description list, SR: \"term / definition\"). vs plain `<div>` divs (SR: reads text, no list semantics). \"Use when\" rule under each.\n\n## Do's & Don'ts — Standard Section\n\n**Every visual must end with a Do's & Don'ts grid.** This is a required fixture, not optional.\n\nPlace it after the main visual content, separated by `<hr>`. Two columns: green left (Do), red right (Don't). 5–6 items each, concise and specific to the topic.\n\n**Fragment template (for server-wrapped files):**\n```html\n<hr style=\"margin: 2rem 0; border-color: var(--border)\" />\n<h3 style=\"font-size:1rem;margin-bottom:1rem\">Do's &amp; Don'ts</h3>\n<div style=\"display:grid;grid-template-columns:1fr 1fr;gap:1rem;max-width:780px\">\n  <div style=\"background:var(--bg-secondary);border:1px solid var(--border);border-top:3px solid var(--success);border-radius:8px;padding:1rem\">\n    <div style=\"font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--success);margin-bottom:0.75rem\">✓ Do</div>\n    <ul style=\"list-style:none;display:flex;flex-direction:column;gap:0.6rem;font-size:0.82rem;line-height:1.5\">\n      <li style=\"display:flex;gap:8px\"><span style=\"color:var(--success);flex-shrink:0\">✓</span> …</li>\n    </ul>\n  </div>\n  <div style=\"background:var(--bg-secondary);border:1px solid var(--border);border-top:3px solid var(--error);border-radius:8px;padding:1rem\">\n    <div style=\"font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--error);margin-bottom:0.75rem\">✗ Don't</div>\n    <ul style=\"list-style:none;display:flex;flex-direction:column;gap:0.6rem;font-size:0.82rem;line-height:1.5\">\n      <li style=\"display:flex;gap:8px\"><span style=\"color:var(--error);flex-shrink:0\">✗</span> …</li>\n    </ul>\n  </div>\n</div>\n```\n\n**Full-document template (for `<!DOCTYPE html>` files):** Same structure but use hardcoded hex colors (`#22c55e` / `#ef4444`) instead of CSS vars, and `#1a1f2e` for card background to match the dark theme.\n\n## File Naming\n\nUse semantic names per visual type: `contrast-check.html`, `button-states.html`, `focus-order.html`. Never reuse filenames. For iterations: append `-v2`, `-v3`.\n\n## Proactive Offering\n\nOffer the visual companion unprompted when Elli:\n- Asks about contrast ratios with specific colors\n- Asks \"what does this look like to a screen reader?\"\n- Describes a focus order or keyboard navigation problem\n- Is drafting a guideline that would benefit from a before/after\n- Asks about any of the visual types listed above\n\nSay: \"Want me to open the visual companion and show you [specific type]?\"",
  "custom": true
},{
  "name": "ada-beacon",
  "category": "Accessibility",
  "description": "Full ADA fixing workflow from melio/claude-code-plugins — 12 issue categories, fix patterns, code examples, and 80+ historical commit references from platform-app. Used as reference by ada-jira-triage.",
  "content": "---\nname: ada-beacon\ncategory: Accessibility\ndescription: Full ADA fixing workflow from melio/claude-code-plugins — 12 issue categories, fix patterns, code examples, and 80+ historical commit references from platform-app. Used as reference by ada-jira-triage.\nuser-invocable: false\n---\n\n# ADA Accessibility Assistant (Beacon)\n\n> **Origin:** Copied from `melio/claude-code-plugins/platform-app-ada-beacon/skills/ada/`\n> **Purpose in this vault:** Read-only reference. The full fixing workflow (implement, test, PR) is designed to run inside `~/platform-app/`, not from elli-vault. The `ada-jira-triage` skill reads `categories.md` from this directory during classification.\n\n## How This Is Used\n\n1. **During triage** (`/ada-jira-triage`): Step 3 reads `categories.md` to classify the issue and find historical commits\n2. **During fixing** (in platform-app): The full workflow below can guide a dev or be run directly from the platform-app repo if the beacon plugin is installed there\n\n---\n\n## Categories Quick Reference\n\n| # | Category | WCAG | Symptoms |\n|---|----------|------|----------|\n| 1 | Missing/Incorrect ARIA Labels | 4.1.2, 1.1.1 | Screen readers announce generic or no label |\n| 2 | Heading Hierarchy Violations | 1.3.1 | Headings skip levels or use wrong levels |\n| 3 | Focus Management Issues | 2.4.3, 2.4.7 | Focus lost, invisible, trapped, or misplaced |\n| 4 | Screen Reader Announcement Issues | 4.1.3 | Dynamic content not announced |\n| 5 | Nested Interactive Controls | 4.1.2 | Interactive elements inside other interactive elements |\n| 6 | Improper List Structure | 1.3.1 | Non-li children in ul/ol |\n| 7 | Tooltips on Disabled Elements | 1.3.1, 4.1.2 | Info only available on hover, not keyboard/SR |\n| 8 | Zoom and Reflow | 1.4.10 | Content cut off, overlaps, or lost at 200%/400% zoom |\n| 9 | Form Input Accessibility | 1.3.1, 3.3.2 | Inputs not associated with labels |\n| 10 | Inline API Error Accessibility | 3.3.1, 4.1.3 | Errors not announced or focused |\n| 11 | Decorative Elements Exposed | 1.1.1 | Decorative items announced by SR |\n| 12 | Read-Only vs Disabled Fields | 4.1.2 | Disabled fields skipped by SR entirely |\n\nFor full details with code examples, fix patterns, and historical commit hashes, see [categories.md](categories.md).\n\n## Anti-Patterns\n\n- Don't add aria-label that duplicates visible text\n- Don't use aria-hidden on focusable elements without tabIndex={-1}\n- Don't use useEffect for announcement unless content is truly dynamic\n- Don't add role=\"alert\" to static content present on initial render\n- Don't wrap everything in VisuallyHidden — prefer Penny's built-in a11y props first\n\n---\n\n## Original Fixing Workflow (for platform-app context)\n\nThe full workflow from the beacon skill is preserved below for reference. This runs inside `~/platform-app/`, not from elli-vault.\n\n### Step 1: Classify the Issue\nCategorize into one or more of the 12 categories. Primary category = root cause, secondary = additional patterns needed.\n\n### Step 2: Research the Affected Component\nLocate component(s), read code, check surrounding heading hierarchy and focus flow.\n\n### Step 3: Search for Historical Precedent\nUse curated commit hashes from categories.md first. Fall back to broad git search only if needed.\n\n### Step 4: Propose and Implement the Fix\nExplain the violation, WCAG criterion, how the fix resolves it, and which historical fixes informed the approach.\n\n### Step 5: Verify\n- Only use @melio/penny components\n- Add i18n messages to correct domain messages.json\n- Run lint and tests\n- Add test cases (ARIA labels, role=\"alert\", heading hierarchy, focus management)\n- Remind user to verify with screen reader for Categories 1, 3, 4, 12\n\n### Step 6: Output Summary\nCategory classification, historical references (commit + PR + Jira links).\n\n### Step 7: Offer to Create PR\nBranch naming: `<TICKET-ID>-ADA-<Short-Description>`\nCommit format: `fix(a11y): <description> [<TICKET-ID>]`\n\n## Implementation Guidelines\n\n1. Use only @melio/penny components — never raw HTML\n2. Add i18n messages for new aria-labels\n3. Follow existing patterns from categories.md\n4. Test with existing test infrastructure\n5. Preserve visual appearance\n6. Respect heading hierarchy\n7. Prefer visible text over tooltips for disabled elements\n8. Use VisuallyHidden from Penny for screen-reader-only content",
  "custom": true
},{
  "name": "ada-jira-triage",
  "category": "Accessibility",
  "description": "Triage an ADA Jira issue — investigate code, search duplicates, research WCAG, determine origin (Penny vs platform-app), and produce a vault research file with draft response. Never writes to Jira.",
  "content": "---\nname: ada-jira-triage\ncategory: Accessibility\ndescription: Triage an ADA Jira issue — investigate code, search duplicates, research WCAG, determine origin (Penny vs platform-app), and produce a vault research file with draft response. Never writes to Jira.\nuser-invocable: true\nargument-hint: <JIRA-KEY or URL>\n---\n\n# /ada-jira-triage — Accessibility Issue Triage\n\n## Golden Rule\n**Never write to Jira.** All output stays in the vault for Elli to review and copy-paste.\nDraft responses must sound human-written — no AI markers, no \"Generated by\" footers, no bullet-heavy template feel.\n\n## Linking Rule\n**Make everything clickable.** Every reference in the triage file must be a link:\n- **Internal vault notes** → Obsidian wikilinks: `[[guidelines]]`, `[[penny-gaps]]`, `[[ada-jira-triage]]`\n- **Jira issues** → Jira URL: `[ME-122802](https://meliorisk.atlassian.net/browse/ME-122802)` (NOT wikilinks — those create empty vault notes)\n- **Code references** → GitHub permalink: `[`useFoo()`](https://github.com/melio/<repo>/blob/main/<path>#L<start>-L<end>)`\n- **Storybook pages** → localhost link + source: `[Foundations/Breakpoints](https://penny.melio.com/?path=/docs/<path>--docs) ([source](<github-link>))`\n  - URL pattern: `https://penny.melio.com/?path=/docs/<meta-title-lowercased-slashes-to-hyphens>--docs`\n  - Find the Meta title in the `.mdx` or `.stories.tsx` file, e.g., `<Meta title=\"Foundations/Breakpoints\" />` → `foundations-breakpoints`\n- **WCAG criteria** → W3C Understanding page: `[1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)`\n- **Techniques** → W3C Techniques page: `[C32](https://www.w3.org/WAI/WCAG22/Techniques/css/C32)`\n\nUse `[[wikilinks]]` for anything inside the vault (Obsidian tracks renames). Use `[text](url)` for external URLs only (GitHub, W3C).\nThis applies to the analysis sections, code investigation, AND the draft response (GitHub links work in Jira too).\n\n## Input\nA Jira key (e.g., ME-122799) or full URL. Extract the key from URLs.\n\n## Steps\n\n### Step 0: Pull Latest Repos\n\n```bash\ngit -C ~/platform-app pull\ngit -C ~/penny pull\n```\n\nIf either fails (not on main, merge conflict), inform the user and continue with what's available.\n\n### Step 1: Fetch the Jira Issue\n\nUse the Atlassian MCP tools (read-only):\n\n1. **Get issue details** — `getJiraIssue` with markdown format. Capture:\n   - Summary, status, assignee, priority, labels, created/updated dates\n   - Full description\n   - Issue type (ADA Bug, Bug, Task, etc.)\n\n2. **Get all comments** — Fetch comments via `getJiraIssue` with expand or\n   `fetchAtlassian` to the comments endpoint. For each comment capture:\n   - Author, date, body\n   - Whether it's directed at Elli / asks a question\n\n3. **Use the exact Jira summary as the heading** — never summarize or rephrase the title. Copy it verbatim into the `# <JIRA-KEY>: <Summary>` heading.\n\n4. **Download attachments** — If the issue has screenshots or screen recordings, ask the user to download them from Jira into `Issues/<JIRA-KEY>/attachments/`. Inspect images with the Read tool before forming conclusions about the UI. Never assume the component type from the title alone — reporters often use imprecise terms (e.g., \"tab\" for a navigation menu item).\n\n### Step 2: Search for Duplicates & Related Issues\n\nRun 3 parallel JQL searches (read-only):\n- **Error-focused:** key terms from the issue summary\n- **Component-focused:** affected component/page name\n- **Symptom-focused:** the observable behavior\n\nFor each match, note: key, summary, status, resolution, assignee, relevance level.\n\n### Step 3: Classify by ADA Category\n\nRead `~/.claude/skills/ada-beacon/categories.md` (local copy from melio/claude-code-plugins) and match the issue against the 12 known categories. Record:\n- Primary category (root cause)\n- Secondary categories if applicable\n- Relevant historical commit hashes from that category\n\n### Step 4: Investigate the Code & Determine Origin\n\nSearch `~/platform-app/` and `~/penny/` for the affected component(s):\n\n1. **Find the affected code in platform-app**\n   - Use Grep/Glob to locate the component/page mentioned in the Jira issue\n   - Read the code and identify which Penny components it uses\n   - Note file paths with line numbers\n\n2. **Trace to the Penny component**\n   - Find the Penny component source in `~/penny/packages/penny/src/components/`\n   - Check its props/API — does it expose the a11y prop or behavior needed for the fix?\n   - Check Storybook stories (`*.stories.tsx`) — is the component accessible in isolation?\n\n3. **Check Storybook a11y test status**\n   - Search the component's `*.stories.tsx` for `a11y:` parameter overrides\n   - If `test: 'off'` → a11y tests are disabled (note why — deprecated? demo only?)\n   - If `test: 'todo'` → known violation with a Jira ticket (capture the ticket key and axe rule)\n   - If no override → component uses the global default (`test: 'error'`, violations fail the build)\n   - Record the status in the triage file under Penny Component → Storybook a11y examples\n   - If the component has disabled or todo a11y tests, note it in `Issues/penny-gaps.md` under Storybook A11y Test Coverage\n\n4. **Determine origin** — it's always one or the other:\n   - Penny component **doesn't support** the needed a11y behavior (no prop, no ARIA forwarding, no keyboard handling) → **Penny**\n   - Penny component **supports it** but platform-app doesn't pass the right props or uses it incorrectly → **Platform-app**\n   - Issue is in **composition/layout** (how components are arranged, responsive behavior, conditional rendering) → **Platform-app**\n   - If Penny has a partial gap, the fix still belongs to **Penny** — file a Penny ticket. Platform-app can't properly work around a missing API.\n\n5. **Check historical commits** from Step 3 if relevant:\n   ```bash\n   git -C ~/platform-app diff <commit>^..<commit>\n   ```\n\n### Step 5: Research WCAG\n\nIdentify the applicable WCAG success criteria:\n- Criterion number and name (e.g., 1.4.10 Reflow)\n- Level (A, AA, AAA)\n- How it applies to this specific issue\n- What the criterion requires (the normative text)\n\n### Step 6: Gatekeeper Check\n\nVerify the ticket has all required fields per the gatekeeper rule:\n- [ ] WCAG criterion cited\n- [ ] Steps to reproduce (detailed)\n- [ ] Expected vs actual behavior\n- [ ] Acceptance criteria\n\nNote what's missing — these gaps will be addressed in the draft response.\n\n### Step 7: Create the Research File\n\nCreate the folder and file:\n```\nIssues/<JIRA-KEY>/\n  triage.md\n```\n\nThe file structure:\n\n**Jira custom fields to fetch:** `customfield_10232` (Severity), `customfield_10080` (Squad-team), `customfield_10069` (Identified by), plus standard fields: `labels`, `assignee`, `created`, `issuetype`.\n\n```markdown\n---\njira: <JIRA-KEY>\nseverity: <customfield_10232, e.g., S2 - High>\nsquad: <customfield_10080, e.g., PartnerX>\nidentified-by: <customfield_10069, e.g., Fiserv QA>\nassignee: <name>\ncategory: <ADA category number and name>\nwcag: <criterion number>\norigin: <penny | platform-app — where the fix belongs, determined by code investigation>\ntriaged: <today's date>\nlabels: <comma-separated Jira labels>\nskills:\n  - \"[[ada-jira-triage]]\"\n  - \"[[ada-beacon]]\"\nupdates:\n  - \"[[guidelines]]\"\n  - \"[[penny-gaps]]\"\n---\n\n# <JIRA-KEY>: <Exact Jira summary — never summarize or rephrase>\n\n## Issue Overview\n<1-2 sentence plain-English summary of the problem>\n\n| Field | Value |\n|-------|-------|\n| Severity | ... |\n| Squad | ... |\n| Identified by | ... |\n| Assignee | ... |\n| Created | ... |\n| Type | ... |\n| Labels | ... |\n\n## Comment History\n\n<Chronological summary of all comments. For each:>\n- **<Author>** (<date>): <summary of what they said>\n\n### Latest Comment\n<Full text of the most recent comment>\n\n### What I Need to Respond To\n<Clear statement of what question or action is being asked of me>\n\n## Duplicate / Related Issues\n\n| Issue | Summary | Status | Relevance |\n|-------|---------|--------|-----------|\n| ... | ... | ... | ... |\n\n<Brief analysis of each — is it a true duplicate, related, or just similar?>\n\n## ADA Category Match\n**Category <N>: <Name>**\n<Why this category matches>\n\n### Historical Fixes in platform-app\n| Commit | What it fixed | Pattern to reuse |\n|--------|--------------|------------------|\n| ... | ... | ... |\n\n## Origin Analysis\n\n**Origin:** <Penny | Platform-app>\n\n### Penny Component\n- **Component:** [`componentName()`](https://github.com/melio/penny/blob/main/<path>#L<start>-L<end>) from `@melio/penny`\n- **Source:** [filename.tsx:lines](https://github.com/melio/penny/blob/main/packages/penny/src/components/<path>#L<start>-L<end>)\n- **A11y in isolation:** <What Storybook/source shows — accessible or not?>\n- **Exposes needed API:** <Yes/No — does it have the prop/behavior needed?>\n- **Storybook a11y examples:** <Present/Missing — are there a11y usage examples?>\n\n### Platform-app Usage\n- **File:** [filename.tsx:lines](https://github.com/melio/platform-app/blob/main/<path>#L<start>-L<end>)\n- **How it uses the component:** <description — link function names, hooks, and variables to their GitHub definitions>\n- **Problem:** <what's wrong with the usage>\n\n### Verdict\n<Clear statement: where the fix belongs and why.>\n<If Penny: note that this requires a Penny release + platform-app version bump — longer timeline.>\n<If platform-app: note that this can be fixed directly.>\n\n## Code Investigation\n\n### Root Cause\n<What the code does wrong and why>\n\n### Relevant Files\nUse GitHub permalink format for all file references — clickable from Obsidian:\n- [filename.tsx:lines](https://github.com/melio/<repo>/blob/main/<path>#L<start>-L<end>) — <what this code does>\n- ...\n\n### Fix Direction\n<High-level description of what needs to change — not a full implementation>\n\n## WCAG Analysis\n**[<Criterion Number> <Name> (Level <X>)](https://www.w3.org/WAI/WCAG22/Understanding/<slug>.html)**\n<How this criterion applies to the issue>\n<What compliance requires>\n\n### Sufficient Techniques\n- **[<ID>: <Name>](<W3C URL>)** — <how it applies>\n\n### Failure Technique\n- **[<ID>: <Name>](<W3C URL>)** — <how it applies>\n\n### Testing Procedure\n<Numbered steps to verify the fix>\n\n## Gatekeeper Gaps\n<List what's missing from the ticket>\n\n## Draft Response\n\n<A natural, human-written response that Elli can copy-paste into Jira.\nTone: professional, knowledgeable, direct. Write as Elli — first person where appropriate.\nInclude: WCAG citation with link, root cause analysis, origin (where the fix belongs), acceptance criteria, any questions back.\nLink all function names, hooks, and file references to their GitHub locations — these work in both Obsidian and Jira.\nDo NOT include: AI disclaimers, \"Generated by\" footers, excessive bullet points,\noverly structured formatting that looks templated.>\n```\n\n### Step 8: Update Guidelines\n\nAppend an entry to `Issues/guidelines.md` (create the file if it doesn't exist).\n\nThis is the **master accessibility playbook** for all developers. It contains:\n- Component-level do's and don'ts (e.g., \"when using Spinner, always pass aria-label\")\n- Fix patterns grouped by ADA category\n- WCAG references for each pattern\n- Correct usage examples learned from real bugs\n\nGroup entries by **component or pattern name**, then by ADA category within each. For each triaged issue, add:\n\n```markdown\n### <ComponentName or pattern>\n- **Category:** <N> — <Name>\n- **WCAG:** <criterion>\n- **Origin:** <penny | platform-app>\n- **Seen in:** [[<JIRA-KEY>]]\n- **Root cause:** <one line>\n- **Fix direction:** <one line>\n\n**Do:**\n- <correct usage — what developers should do>\n\n**Don't:**\n- <incorrect usage — what caused the bug>\n\n**Why:** <brief explanation referencing the WCAG criterion and the real bug>\n```\n\nIf the same component/pattern already exists, add the new Jira key as another \"Seen in\" and enrich the do's/don'ts if the new issue reveals something new.\n\n### Step 9: Update Penny Gaps\n\nIf the origin is **Penny**, or if the investigation revealed missing props, missing ARIA support, or documentation gaps in Penny, update the `Issues/penny-gaps/` folder.\n\nThis folder tracks **what is missing in Penny** — not how to use it (that's guidelines.md). One file per component so each can be used as focused AI context.\n\n**Structure:**\n```\nIssues/penny-gaps/\n  penny-gaps.md          ← index + Storybook A11y Test Coverage\n  breakpoints.md         ← per-component gap file\n  <component-name>.md    ← one per component as triage discovers gaps\n```\n\n**For each new component gap**, create `Issues/penny-gaps/<component-name>.md`:\n\n```markdown\n# <ComponentName>\n\n- **Props / ARIA support:** <specific missing prop, ARIA forwarding, or keyboard behavior — or \"N/A — <reason>\" if not relevant>\n- **A11y test status:** <'error' (default, active), 'off' (disabled — why?), 'todo' (known violation — Jira key + axe rule), or \"N/A — <reason>\" for non-component pages>\n- **Documentation gap:** <what's missing in Storybook docs — no a11y section, misleading examples, etc.>\n- **Recommended addition:** <specific Storybook content to add>\n- **Missing example:** <specific example if needed — or omit if not relevant>\n- **WCAG:** <criterion>\n- **Seen in:** [[<JIRA-KEY>]]\n```\n\nThen add a line to the Components list in `Issues/penny-gaps/penny-gaps.md`:\n```markdown\n- [[<component-name>]] — <one-line summary of the gap>\n```\n\nOnly add entries when the triage reveals an actual gap in Penny — not every issue needs one.\n\n### Step 10: Report to User\n\nAfter creating all files, output:\n```\nTriaged: <JIRA-KEY> → Issues/<JIRA-KEY>/triage.md\nCategory: <N> — <Name>\nOrigin: <penny | platform-app>\nWCAG: <criterion>\nRoot cause: <one line>\nAction needed: <what the latest comment asks for>\nUpdated: guidelines.md <yes/no>, penny-gaps.md <yes/no>\n```",
  "custom": true
},{
  "name": "add-action-item",
  "category": "Vault",
  "description": "Add a new action item to todo.md or dashboard improvements. Use when the user says `/add-action-item` or wants to log a task from a meeting, note, or conversation.",
  "content": "---\nname: add-action-item\ncategory: Vault\ndescription: Add a new action item to todo.md or dashboard improvements. Use when the user says `/add-action-item` or wants to log a task from a meeting, note, or conversation.\n---\n\n# Add Action Item\n\nCapture a new action item or idea and add it to the right place.\n\n## Steps\n\n1. **Parse the input** — extract the description from what the user typed after `/add-action-item`\n\n2. **Ask for destination** — present the options:\n   - 🎯 **Working on** — actively working on this right now (max 3 items) → `todo.md`\n   - 📋 **Backlog** — real work deliverables, queued for later → `todo.md`\n   - 👥 **People** — follow-ups, scheduling, Slack messages, 1:1 agenda items → `todo.md`\n   - 💡 **Ideas** — personal/workflow ideas, not yet actionable, don't lose them → `todo.md`\n   - 🛠 **Dashboard improvement** — product improvement for the accessibility dashboard → `dashboard/improvements.md`\n\n   If Working on already has 3 unchecked items, warn the user and default to Backlog.\n\n3. **Draft the entry** — format:\n\n   Assigned action item (has an owner or due date):\n   `- [ ] [Action] — @Owner — Due: YYYY-MM-DD — 📂 [area] — from: [[meeting]]`\n\n   Self-initiated idea (no owner):\n   `- [ ] [Idea] — 📂 [area] — [notes]`\n\n   - Infer area from the description (e.g. repos, tooling, workflow, guidelines, comms, ai, strategy)\n\n4. **Show the entry** — display exactly what will be written and ask \"Does this look right?\"\n\n5. **Write it** — on confirmation, insert the entry under the correct section:\n   - For `todo.md` destinations: insert under the matching section header\n   - For Dashboard improvement: insert under `## Backlog` in `~/elli-vault/dashboard/improvements.md`\n   - If the section shows `_Nothing here yet._`, replace that line with the new entry\n\n6. **Confirm** — tell the user which file and section it was added to\n\n## Section headers\n\n| Destination | File | Header |\n|-------------|------|--------|\n| 🎯 Working on | `todo.md` | `## 🎯 Working on` |\n| 📋 Backlog | `todo.md` | `## 📋 Backlog` |\n| 👥 People | `todo.md` | `## 👥 People` |\n| 💡 Ideas | `todo.md` | `## 💡 Ideas` |\n| 🛠 Dashboard improvement | `dashboard/improvements.md` | `## Backlog` |",
  "custom": true
},{
  "name": "add-case-study",
  "category": "Reporting",
  "description": "Scaffold a new case study into the dashboard Case Studies tab",
  "content": "---\nname: add-case-study\ncategory: Reporting\ndescription: Scaffold a new case study into the dashboard Case Studies tab\ntrigger: /add-case-study\n---\n\n# Add Case Study\n\nUse this skill to add a new interactive case study to the dashboard at `/case-studies`.\n\n## Files involved\n\n| File | Purpose |\n|------|---------|\n| `~/elli-vault/dashboard/lib/case-studies.ts` | Metadata array — add entry here |\n| `~/elli-vault/dashboard/app/case-studies/[slug]/demos/` | Demo components — add new file here |\n| `~/elli-vault/dashboard/app/case-studies/[slug]/page.tsx` | DEMO_MAP — register component here |\n\n## Steps\n\n### 1. Gather details\n\nAsk the user (or use what they've provided):\n\n- **Title** — display name (e.g. \"Keyboard Navigation\")\n- **Slug** — kebab-case URL slug (e.g. `keyboard-navigation`)\n- **WCAG criterion** — format: `WCAG X.X.X` (e.g. `WCAG 2.1.1`)\n- **Level** — `A`, `AA`, or `AAA`\n- **Description** — one sentence (shown on the card)\n- **Tags** — comma-separated (e.g. `keyboard, tab order, focus`)\n\n### 2. Add metadata entry\n\nIn `dashboard/lib/case-studies.ts`, append to the `CASE_STUDIES` array:\n\n```ts\n{\n  slug: '<slug>',\n  title: '<Title>',\n  criterion: 'WCAG X.X.X',\n  level: 'AA',\n  description: '<one sentence>',\n  tags: ['tag1', 'tag2'],\n},\n```\n\n### 3. Create the demo component stub\n\nCreate `dashboard/app/case-studies/[slug]/demos/<TitleCamelCase>Demo.tsx`:\n\n```tsx\n'use client'\n\nexport function <TitleCamelCase>Demo() {\n  return (\n    <div className=\"space-y-8\">\n      <div className=\"rounded-xl border border-border bg-surface p-6 space-y-4\">\n        <h2 className=\"text-sm font-bold text-fg\">Interactive Demo</h2>\n        <p className=\"text-xs text-muted\">TODO: build the interactive demo here.</p>\n      </div>\n\n      <div className=\"rounded-xl border-l-4 border-accent bg-surface border border-border p-5\">\n        <h3 className=\"text-xs font-bold text-accent mb-2\">The Core Insight</h3>\n        <p className=\"text-xs text-muted leading-relaxed\">\n          TODO: explain the key concept in 2-3 sentences.\n        </p>\n      </div>\n    </div>\n  )\n}\n```\n\n### 4. Register in DEMO_MAP\n\nIn `dashboard/app/case-studies/[slug]/page.tsx`, add to the imports and DEMO_MAP:\n\n```ts\nimport { <TitleCamelCase>Demo } from './demos/<TitleCamelCase>Demo'\n\nconst DEMO_MAP = {\n  // ...existing entries...\n  '<slug>': <TitleCamelCase>Demo,\n}\n```\n\n### 5. Confirm\n\nTell the user:\n\n> Case study **\"<Title>\"** added. Open `/case-studies/<slug>` to build out the interactive demo. The card is live on `/case-studies`.\n\n## Naming convention\n\n- Slug: `kebab-case`, lowercase, no spaces (e.g. `keyboard-navigation`)\n- Component name: `PascalCase` + `Demo` suffix (e.g. `KeyboardNavigationDemo`)\n- File name: `<ComponentName>.tsx` (e.g. `KeyboardNavigationDemo.tsx`)",
  "custom": true
},{
  "name": "defuddle",
  "category": "Vault",
  "description": "Extract clean markdown content from web pages using Defuddle CLI, removing clutter and navigation to save tokens. Use instead of WebFetch when the user provides a URL to read or analyze, for online documentation, articles, blog posts, or any standard web page.",
  "content": "---\nname: defuddle\ncategory: Vault\ndescription: Extract clean markdown content from web pages using Defuddle CLI, removing clutter and navigation to save tokens. Use instead of WebFetch when the user provides a URL to read or analyze, for online documentation, articles, blog posts, or any standard web page.\n---\n\n# Defuddle\n\nUse Defuddle CLI to extract clean readable content from web pages. Prefer over WebFetch for standard web pages — it removes navigation, ads, and clutter, reducing token usage.\n\nIf not installed: `npm install -g defuddle`\n\n## Usage\n\nAlways use `--md` for markdown output:\n\n```bash\ndefuddle parse <url> --md\n```\n\nSave to file:\n\n```bash\ndefuddle parse <url> --md -o content.md\n```\n\nExtract specific metadata:\n\n```bash\ndefuddle parse <url> -p title\ndefuddle parse <url> -p description\ndefuddle parse <url> -p domain\n```\n\n## Output formats\n\n| Flag | Format |\n|------|--------|\n| `--md` | Markdown (default choice) |\n| `--json` | JSON with both HTML and markdown |\n| (none) | HTML |\n| `-p <name>` | Specific metadata property |",
  "custom": true
},{
  "name": "draft-guideline",
  "category": "Accessibility",
  "description": "Use when research for a component is complete and a developer-facing accessibility guideline needs to be written. Use when the user says `/draft-guideline` or asks to write, create, or draft a Penny accessibility guideline.",
  "content": "---\nname: draft-guideline\ncategory: Accessibility\ndescription: Use when research for a component is complete and a developer-facing accessibility guideline needs to be written. Use when the user says `/draft-guideline` or asks to write, create, or draft a Penny accessibility guideline.\n---\n\n# Draft Accessibility Guideline\n\nTurn a completed research doc into a developer-facing accessibility guideline for a Penny component. Output has two audiences: **Penny devs** (implementing the component) and **platform devs** (consuming it in product code / Storybook).\n\n## Core Principle: Accessible by Default\n\n**Penny owns as much accessibility as possible. Platform devs should get correct behavior without thinking about it.**\n\nBefore writing any guideline, answer this question for every ARIA requirement:\n\n> \"Can Penny set this correctly by default, or does it require context that only the platform dev knows?\"\n\n| Can Penny own it? | Action |\n|---|---|\n| Yes — same value always (role, aria-hidden on decorative elements, prefers-reduced-motion) | Penny hard-codes it. Not mentioned in platform dev section. |\n| No — depends on context (accessible name when no visible text, aria-busy on a region Penny doesn't own, completion behavior) | Platform dev responsibility. Document clearly with examples. |\n| Partially — Penny provides a safe default, caller can override | Enforce at prop level. Document default and override. Show good + bad examples. |\n\n**The goal:** a platform dev who does the minimum gets a fully accessible component. Only edge cases require extra work.\n\n## When to Use\n\n- `Research/[Component].md` exists and is complete\n- User says `/draft-guideline [ComponentName]`\n- After `/research-accessible-component` has been run and confirmed\n\n## Steps\n\n### 1. Read Input\n\n- Read `~/elli-vault/Research/[ComponentName].md`\n- Extract: WCAG criterion, recommended pattern, props needed, open questions, Jira ticket, Figma link\n- If unresolved outstanding questions affect the implementation pattern, flag them and ask the user to confirm before writing. Don't block on cosmetic questions.\n\n### 2. Create Guidelines directory if needed\n\n```bash\nmkdir -p ~/elli-vault/Guidelines\n```\n\n### 3. Write the guideline\n\nFill the template below from the research doc. Every `[placeholder]` gets replaced with real content — nothing carries over literally from the template. Use the component's actual name, actual ARIA role, actual props.\n\nSave to `~/elli-vault/Guidelines/[ComponentName].md`.\n\n### 4. Generate Testing-Hub scenario\n\nCreate two files so the pattern can be tested live with a real screen reader.\n\nRead `Testing-Hub/scenarios/empty-element/index.html` for the layout pattern to follow.\n\n**`~/elli-vault/Testing-Hub/scenarios/[component-name]/index.html`** — include variant boxes derived from the research recommendation:\n- Correct pattern (what Penny ships)\n- Missing accessible name (wrong — show what breaks)\n- Any pattern variants from the research (e.g. visible text context → `aria-labelledby`, container announcement with `aria-busy`)\n\nEach variant box: title, rendered HTML element, code snippet.\n\n**`~/elli-vault/Testing-Hub/scenarios/[component-name]/meta.json`**:\n```json\n{\n  \"id\": \"[component-name]\",\n  \"jira\": \"[ticket or null]\",\n  \"priority\": \"P2\",\n  \"summary\": \"[Short description of what this scenario tests]\",\n  \"category\": \"[Live Regions / Focus Management / etc. — from research]\",\n  \"description\": \"[1–2 sentences for the Testing Hub index]\",\n  \"links\": [\n    { \"label\": \"Jira Ticket\", \"url\": \"[jira url — omit entry if none]\" },\n    { \"label\": \"Guideline\", \"url\": \"../../Guidelines/[ComponentName].md\" }\n  ]\n}\n```\n\n### 5. Update Research index\n\nIn `~/elli-vault/Research/_index.md`, update the row for this component — change `Guideline` column from `—` to `[[ComponentName]]`.\n\n### 6. Confirm\n\nTell the user: \"Guideline saved to Guidelines/[ComponentName].md — Testing-Hub scenario at Testing-Hub/scenarios/[component-name]/index.html\" and surface any open questions that still need DS team input.\n\n---\n\n## Guideline Template\n\n```markdown\n# [ComponentName] Accessibility Guideline\n\n#guideline #component #draft\n\n**WCAG:** [criterion number and name, e.g. 4.1.3 Status Messages (AA)]\n**Pattern:** [e.g. role=\"progressbar\" + aria-label]\n**Figma:** [link or —]\n**Jira:** [ticket or —]\n**Status:** Draft\n**Last updated:** YYYY-MM-DD\n\n---\n\n## Overview\n\n[1–2 sentences: what the component is and why it needs specific accessibility handling.]\n\n---\n\n## ARIA Pattern\n\n| Property | Value | Notes |\n|----------|-------|-------|\n| `role` | `[role]` | [why this role] |\n| [aria property] | [value] | [when/why] |\n| [aria property] | [value] | [when/why] |\n\n**Keyboard:** [No interaction required — passive element / Tab-focusable / etc.]\n**Live region:** [How SR announcement is triggered — role, aria-busy, aria-live, or none]\n\n---\n\n## Part 1 — Penny Implementation (Design System Devs)\n\n_How to correctly implement this component in `~/penny/packages/penny/src/components/`._\n\n**Rule: Penny owns everything it can. Platform devs should get correct behavior by default.**\n\n### What Penny owns (hard-coded, not exposed as props)\n\n| Requirement | Implementation | Why Penny owns it |\n|-------------|----------------|-------------------|\n| [requirement] | [how implemented] | [reason] |\n\n### What platform devs must provide\n\n| Prop | Type | Required | Default | Notes |\n|------|------|----------|---------|-------|\n| [prop] | [type] | [Yes/No/Conditional] | [default or —] | [guidance] |\n\n### What platform devs must handle (Penny cannot own it)\n\n| Requirement | Why Penny can't own it | Platform dev responsibility |\n|-------------|----------------------|----------------------------|\n| [requirement] | [reason] | [what to do] |\n\n### Escape hatch\n\n[If applicable: prop that suppresses or overrides accessibility behavior, when it's needed, and what warning to show in Storybook. Remove section if not applicable.]\n\n### Partner overrides\n\n[If the component supports partner customization via a Provider: document accessibility requirements for custom implementations. Remove section if not applicable.]\n\n---\n\n## Part 2 — Usage Guide (Platform Devs / Storybook)\n\n_How to use this component correctly in product code._\n\n### Basic usage\n\n```tsx\n[minimal correct usage example]\n```\n\n### [Additional pattern if needed, e.g. \"With container announcement\"]\n\n```tsx\n[example]\n```\n\n### [Additional pattern if needed, e.g. \"Completion behavior\"]\n\n[explanation + code]\n\n---\n\n## Do / Don't\n\n### Design\n\n| Do | Don't |\n|----|-------|\n| [design do] | [design don't] |\n\n### Code\n\n| Do | Don't |\n|----|-------|\n| [correct code] | [incorrect code — explain why] |\n\n---\n\n## Screen Reader Behavior\n\n| SR + Browser | Expected announcement |\n|---|---|\n| VoiceOver + Safari (macOS) | [expected] |\n| NVDA + Chrome (Windows) | [expected] |\n| JAWS + Chrome (Windows) | [expected] |\n| TalkBack (Android) | [expected, or note if untested] |\n\n---\n\n## WCAG Success Criteria\n\n| Criterion | Level | How it applies |\n|-----------|-------|----------------|\n| [criterion + link] | [A/AA/AAA] | [how this component satisfies or must satisfy it] |\n\n---\n\n## Acceptance Criteria (for Jira tickets)\n\n- [ ] [testable AC item]\n- [ ] [testable AC item]\n- [ ] Storybook MDX includes usage examples for [patterns covered]\n\n---\n\n## Open Questions\n\n[Write each question with full context, not just a one-liner copy from the Research doc. For each question include:\n- What the ambiguity is and why it matters for implementation\n- Any relevant comparison to other design systems (MUI, Carbon, Spectrum)\n- A proposed rule or default, clearly marked as needing DS confirmation\n- What breaks if left unresolved (e.g. \"platform devs will improvise inconsistently\")\n\nRemove this section only once all questions are answered and incorporated into the guideline body.]\n\n---\n\n## Audit\n\n**Score:** —/— (not yet audited)\n**Audited:** —\n**Auditor:** —\n\n| AC | Result | Notes |\n|----|--------|-------|\n| [copy each item from Acceptance Criteria section above] | — | |\n\n_Result: ✅ pass / ❌ fail / ⚠️ partial / — not yet tested_\n\n---\n\n## Related\n\n- Research: [[Research/[ComponentName]]]\n- Testing scenario: [[Testing-Hub/scenarios/[component-name]/index.html]]\n- Decisions: check `~/elli-vault/Issues/Decisions.md` for related entries\n```\n\n---\n\n## Notes\n\n- **Audiences are separate:** Part 1 is for DS devs writing the Penny component. Part 2 is for platform devs consuming it — this content goes into Storybook MDX.\n- **No Spinner-specific defaults in this template.** Fill every section from the research doc. If a section doesn't apply to this component, remove it.\n- **JSX examples use the component name from Figma/Penny**, not a hypothetical API. If final prop names aren't confirmed, note them as `[prop TBD]`.\n- **Do/Don't tables**: one for design (visual/UX decisions), one for code (implementation). Keep them parallel — each Don't answers its matching Do.\n- **Screen reader table**: fill from research findings. If SR behavior wasn't tested, note it.\n- **Acceptance criteria**: these become Jira ticket AC directly. Write as checkbox-style test cases, not requirements prose.\n- **Status tag**: starts as `#draft`. Changes to `#review` when sent to DS team, `#published` when merged to Penny Storybook.\n- **Guideline is not the Storybook MDX** — it's the source of truth that feeds it. Part 2 + Do/Don't + Acceptance Criteria get copied into the component's `.mdx` file.",
  "custom": true
},{
  "name": "json-canvas",
  "category": "Obsidian",
  "description": "Create and edit JSON Canvas files (.canvas) with nodes, edges, groups, and connections. Use when working with .canvas files, creating visual canvases, mind maps, flowcharts, or when the user mentions Canvas files in Obsidian.",
  "content": "---\nname: json-canvas\ncategory: Obsidian\ndescription: Create and edit JSON Canvas files (.canvas) with nodes, edges, groups, and connections. Use when working with .canvas files, creating visual canvases, mind maps, flowcharts, or when the user mentions Canvas files in Obsidian.\n---\n\n# JSON Canvas Skill\n\n## File Structure\n\nA canvas file (`.canvas`) contains two top-level arrays following the [JSON Canvas Spec 1.0](https://jsoncanvas.org/spec/1.0/):\n\n```json\n{\n  \"nodes\": [],\n  \"edges\": []\n}\n```\n\n- `nodes` (optional): Array of node objects\n- `edges` (optional): Array of edge objects connecting nodes\n\n## Common Workflows\n\n### 1. Create a New Canvas\n\n1. Create a `.canvas` file with the base structure `{\"nodes\": [], \"edges\": []}`\n2. Generate unique 16-character hex IDs for each node (e.g., `\"6f0ad84f44ce9c17\"`)\n3. Add nodes with required fields: `id`, `type`, `x`, `y`, `width`, `height`\n4. Add edges referencing valid node IDs via `fromNode` and `toNode`\n5. **Validate**: Parse the JSON to confirm it is valid. Verify all `fromNode`/`toNode` values exist in the nodes array\n\n### 2. Add a Node to an Existing Canvas\n\n1. Read and parse the existing `.canvas` file\n2. Generate a unique ID that does not collide with existing node or edge IDs\n3. Choose position (`x`, `y`) that avoids overlapping existing nodes (leave 50-100px spacing)\n4. Append the new node object to the `nodes` array\n5. Optionally add edges connecting the new node to existing nodes\n6. **Validate**: Confirm all IDs are unique and all edge references resolve to existing nodes\n\n### 3. Connect Two Nodes\n\n1. Identify the source and target node IDs\n2. Generate a unique edge ID\n3. Set `fromNode` and `toNode` to the source and target IDs\n4. Optionally set `fromSide`/`toSide` (top, right, bottom, left) for anchor points\n5. Optionally set `label` for descriptive text on the edge\n6. Append the edge to the `edges` array\n7. **Validate**: Confirm both `fromNode` and `toNode` reference existing node IDs\n\n### 4. Edit an Existing Canvas\n\n1. Read and parse the `.canvas` file as JSON\n2. Locate the target node or edge by `id`\n3. Modify the desired attributes (text, position, color, etc.)\n4. Write the updated JSON back to the file\n5. **Validate**: Re-check all ID uniqueness and edge reference integrity after editing\n\n## Nodes\n\nNodes are objects placed on the canvas. Array order determines z-index: first node = bottom layer, last node = top layer.\n\n### Generic Node Attributes\n\n| Attribute | Required | Type | Description |\n|-----------|----------|------|-------------|\n| `id` | Yes | string | Unique 16-char hex identifier |\n| `type` | Yes | string | `text`, `file`, `link`, or `group` |\n| `x` | Yes | integer | X position in pixels |\n| `y` | Yes | integer | Y position in pixels |\n| `width` | Yes | integer | Width in pixels |\n| `height` | Yes | integer | Height in pixels |\n| `color` | No | canvasColor | Preset `\"1\"`-`\"6\"` or hex (e.g., `\"#FF0000\"`) |\n\n### Text Nodes\n\n| Attribute | Required | Type | Description |\n|-----------|----------|------|-------------|\n| `text` | Yes | string | Plain text with Markdown syntax |\n\n```json\n{\n  \"id\": \"6f0ad84f44ce9c17\",\n  \"type\": \"text\",\n  \"x\": 0,\n  \"y\": 0,\n  \"width\": 400,\n  \"height\": 200,\n  \"text\": \"# Hello World\\n\\nThis is **Markdown** content.\"\n}\n```\n\n**Newline pitfall**: Use `\\n` for line breaks in JSON strings. Do **not** use the literal `\\\\n` -- Obsidian renders that as the characters `\\` and `n`.\n\n### File Nodes\n\n| Attribute | Required | Type | Description |\n|-----------|----------|------|-------------|\n| `file` | Yes | string | Path to file within the system |\n| `subpath` | No | string | Link to heading or block (starts with `#`) |\n\n```json\n{\n  \"id\": \"a1b2c3d4e5f67890\",\n  \"type\": \"file\",\n  \"x\": 500,\n  \"y\": 0,\n  \"width\": 400,\n  \"height\": 300,\n  \"file\": \"Attachments/diagram.png\"\n}\n```\n\n### Link Nodes\n\n| Attribute | Required | Type | Description |\n|-----------|----------|------|-------------|\n| `url` | Yes | string | External URL |\n\n```json\n{\n  \"id\": \"c3d4e5f678901234\",\n  \"type\": \"link\",\n  \"x\": 1000,\n  \"y\": 0,\n  \"width\": 400,\n  \"height\": 200,\n  \"url\": \"https://obsidian.md\"\n}\n```\n\n### Group Nodes\n\nGroups are visual containers for organizing other nodes. Position child nodes inside the group's bounds.\n\n| Attribute | Required | Type | Description |\n|-----------|----------|------|-------------|\n| `label` | No | string | Text label for the group |\n| `background` | No | string | Path to background image |\n| `backgroundStyle` | No | string | `cover`, `ratio`, or `repeat` |\n\n```json\n{\n  \"id\": \"d4e5f6789012345a\",\n  \"type\": \"group\",\n  \"x\": -50,\n  \"y\": -50,\n  \"width\": 1000,\n  \"height\": 600,\n  \"label\": \"Project Overview\",\n  \"color\": \"4\"\n}\n```\n\n## Edges\n\nEdges connect nodes via `fromNode` and `toNode` IDs.\n\n| Attribute | Required | Type | Default | Description |\n|-----------|----------|------|---------|-------------|\n| `id` | Yes | string | - | Unique identifier |\n| `fromNode` | Yes | string | - | Source node ID |\n| `fromSide` | No | string | - | `top`, `right`, `bottom`, or `left` |\n| `fromEnd` | No | string | `none` | `none` or `arrow` |\n| `toNode` | Yes | string | - | Target node ID |\n| `toSide` | No | string | - | `top`, `right`, `bottom`, or `left` |\n| `toEnd` | No | string | `arrow` | `none` or `arrow` |\n| `color` | No | canvasColor | - | Line color |\n| `label` | No | string | - | Text label |\n\n```json\n{\n  \"id\": \"0123456789abcdef\",\n  \"fromNode\": \"6f0ad84f44ce9c17\",\n  \"fromSide\": \"right\",\n  \"toNode\": \"a1b2c3d4e5f67890\",\n  \"toSide\": \"left\",\n  \"toEnd\": \"arrow\",\n  \"label\": \"leads to\"\n}\n```\n\n## Colors\n\nThe `canvasColor` type accepts either a hex string or a preset number:\n\n| Preset | Color |\n|--------|-------|\n| `\"1\"` | Red |\n| `\"2\"` | Orange |\n| `\"3\"` | Yellow |\n| `\"4\"` | Green |\n| `\"5\"` | Cyan |\n| `\"6\"` | Purple |\n\nPreset color values are intentionally undefined -- applications use their own brand colors.\n\n## ID Generation\n\nGenerate 16-character lowercase hexadecimal strings (64-bit random value):\n\n```\n\"6f0ad84f44ce9c17\"\n\"a3b2c1d0e9f8a7b6\"\n```\n\n## Layout Guidelines\n\n- Coordinates can be negative (canvas extends infinitely)\n- `x` increases right, `y` increases down; position is the top-left corner\n- Space nodes 50-100px apart; leave 20-50px padding inside groups\n- Align to grid (multiples of 10 or 20) for cleaner layouts\n\n| Node Type | Suggested Width | Suggested Height |\n|-----------|-----------------|------------------|\n| Small text | 200-300 | 80-150 |\n| Medium text | 300-450 | 150-300 |\n| Large text | 400-600 | 300-500 |\n| File preview | 300-500 | 200-400 |\n| Link preview | 250-400 | 100-200 |\n\n## Validation Checklist\n\nAfter creating or editing a canvas file, verify:\n\n1. All `id` values are unique across both nodes and edges\n2. Every `fromNode` and `toNode` references an existing node ID\n3. Required fields are present for each node type (`text` for text nodes, `file` for file nodes, `url` for link nodes)\n4. `type` is one of: `text`, `file`, `link`, `group`\n5. `fromSide`/`toSide` values are one of: `top`, `right`, `bottom`, `left`\n6. `fromEnd`/`toEnd` values are one of: `none`, `arrow`\n7. Color presets are `\"1\"` through `\"6\"` or valid hex (e.g., `\"#FF0000\"`)\n8. JSON is valid and parseable\n\nIf validation fails, check for duplicate IDs, dangling edge references, or malformed JSON strings (especially unescaped newlines in text content).\n\n## Complete Examples\n\nSee [references/EXAMPLES.md](references/EXAMPLES.md) for full canvas examples including mind maps, project boards, research canvases, and flowcharts.\n\n## References\n\n- [JSON Canvas Spec 1.0](https://jsoncanvas.org/spec/1.0/)\n- [JSON Canvas GitHub](https://github.com/obsidianmd/jsoncanvas)",
  "custom": true
},{
  "name": "monthly-report",
  "category": "Reporting",
  "description": "Generate or refresh the monthly accessibility status report. Use when the user says `/monthly-report`.",
  "content": "---\nname: monthly-report\ncategory: Reporting\ndescription: Generate or refresh the monthly accessibility status report. Use when the user says `/monthly-report`.\n---\n\n# Monthly Accessibility Report (Manager-Facing)\n\nGenerate or refresh the monthly progress report for Ahi Avnon showing 30-60-90 plan advancement and actual work output.\n\n## Steps\n\n1. **Determine the month** — use today's date to identify the current month (YYYY-MM format)\n\n2. **Check if report exists** — look for `~/elli-vault/Reports/YYYY-MM.md`\n   - If it doesn't exist: create it from scratch\n   - If it exists: refresh/update it (overwrite all content)\n\n3. **Gather data from vault — read all in parallel:**\n\n   **30-60-90 Plan** — read `~/elli-vault/Projects/strategic-plan/30-60-90-Plan.md`:\n   - For each item: `- [x]` → ✅ Done, `- [ ]` → ⏳ Not Started (or 🔄 In Progress if it appears in todo.md Working on)\n\n   **Active work** — read `~/elli-vault/todo.md`:\n   - `## 🎯 Working on` section → Active Now\n\n   **Completed items** — read `~/elli-vault/Reports/completed-YYYY-MM.md` (where YYYY-MM is the target month):\n   - Each `- [x]` line → Completed This Month\n   - Strip `completed: ` and `url: ` metadata for display\n   - If the file doesn't exist, the section shows `_None this month._`\n\n   **Decisions** — read `~/elli-vault/Issues/Decisions.md`:\n   - All rows in the table (filter by date column if possible, otherwise include all)\n   - Extract: title/component, decision, outcome\n\n   **Jira stats** — read `~/elli-vault/Reports/stats.json`:\n   - Find the entry where `month` matches the target month (YYYY-MM)\n   - Extract: `violations_open`, `violations_new`, `violations_closed`\n\n4. **Generate the report** using this structure:\n\n   ```markdown\n   # Accessibility Report — [Month Year]\n\n   _Accessibility Monthly Status — generated [date]_\n\n   ---\n\n   ## 30-60-90 Plan Progress\n\n   ### 🟦 30-Day Goals (Days 1–30)\n\n   | Goal | Status |\n   |------|--------|\n   | [goal text] | ✅ Done / 🔄 In Progress / ⏳ Not Started |\n\n   ### 🟪 60-Day Goals (Days 31–60)\n\n   | Goal | Status |\n   |------|--------|\n   | [goal text] | ✅ Done / 🔄 In Progress / ⏳ Not Started |\n\n   ### 🟥 90-Day Goals (Days 61–90)\n\n   | Goal | Status |\n   |------|--------|\n   | [goal text] | ✅ Done / 🔄 In Progress / ⏳ Not Started |\n\n   ---\n\n   ## What I'm Working On\n\n   ### Active Now\n   - [item from Working on]\n\n   ### Completed This Month\n   - [item from Done]\n\n   ---\n\n   ## Accessibility Decisions Made\n\n   | Component | Decision | Outcome |\n   |-----------|---------|---------|\n   | [component] | [summary] | ✅ Fixed / ❌ Won't Fix / 🔜 Deferred |\n\n   ---\n\n   ## Notes / Blockers\n\n   _Any context Ahi needs to know (blockers, dependencies, open questions)._\n   ```\n\n5. **Save the report** — write to `~/elli-vault/Reports/YYYY-MM.md`\n\n6. **Confirm** — tell the user: \"Report saved to Reports/YYYY-MM.md\" with a brief summary of what was included.\n\n## File locations\n- Reports: `~/elli-vault/Reports/YYYY-MM.md`\n- Completed archive: `~/elli-vault/Reports/completed-YYYY-MM.md`\n- Source data:\n  - `~/elli-vault/Projects/strategic-plan/30-60-90-Plan.md`\n  - `~/elli-vault/todo.md`\n  - `~/elli-vault/Reports/completed-YYYY-MM.md`\n  - `~/elli-vault/Issues/Decisions.md`\n\n## Notes\n- This is a **manager-facing** report for Ahi Avnon — not an internal team doc\n- Focus on progress and output, not meetings or action item lists\n- A goal is 🔄 In Progress if it appears in `todo.md` Working on section\n- If a section has no data, write `_None this month._`\n- When refreshing an existing report, replace all content — don't append\n- The report file is one per month: `2026-03.md`, `2026-04.md`, etc.",
  "custom": true
},{
  "name": "new-project",
  "category": "Projects",
  "description": "Scaffold a new project folder with _context.md and _log.md",
  "content": "---\nname: new-project\ncategory: Projects\ndescription: Scaffold a new project folder with _context.md and _log.md\nuser-invocable: true\nargument-hint: \"<project-name>\"\n---\n\n# /new-project — Create a New Project\n\n## Input\nThe user provides a project name (e.g., `/new-project dark-mode-audit`). Use kebab-case for the folder name.\n\n## Steps\n\n1. **Create the project directory** at `Projects/<name>/`.\n\n2. **Create `_context.md`** from the template structure:\n\n```markdown\n---\ntags: project, active\nstarted: <today's date YYYY-MM-DD>\njira:\n---\n# <Title Case Name>\n\n**Goal:**\n**Status:** Not Started\n\n## Artifacts\n-\n\n## Related Meetings\nAuto-populated by `/project` skill — scans Meetings/ for `project: <name>` in frontmatter.\n\n## Open Questions\n-\n\n## Scope\nWhen working on this project, focus on:\n-\n```\n\n3. **Create `_log.md`**:\n\n```markdown\n# <Title Case Name> — Project Log\n\n---\n\n## <today's date YYYY-MM-DD>\n- Project created\n```\n\n4. **Ask the user** to fill in Goal, Artifacts (wikilinks to existing files), and Scope. Offer to help link existing vault content.\n\n5. **Update `00-Dashboard.md`** — add the new project to the \"Active Projects\" section. If the section doesn't exist, create it.\n\n## Notes\n- Folder names are kebab-case: `dark-mode-audit`, not `Dark Mode Audit`\n- No subfolders inside project folders — keep it flat\n- Project-owned artifacts (new content only for this project) can live in the project folder\n- Existing vault content stays in place — link via `[[wikilinks]]`",
  "custom": true
},{
  "name": "obsidian-bases",
  "category": "Obsidian",
  "description": "Create and edit Obsidian Bases (.base files) with views, filters, formulas, and summaries. Use when working with .base files, creating database-like views of notes, or when the user mentions Bases, table views, card views, filters, or formulas in Obsidian.",
  "content": "---\nname: obsidian-bases\ncategory: Obsidian\ndescription: Create and edit Obsidian Bases (.base files) with views, filters, formulas, and summaries. Use when working with .base files, creating database-like views of notes, or when the user mentions Bases, table views, card views, filters, or formulas in Obsidian.\n---\n\n# Obsidian Bases Skill\n\n## Workflow\n\n1. **Create the file**: Create a `.base` file in the vault with valid YAML content\n2. **Define scope**: Add `filters` to select which notes appear (by tag, folder, property, or date)\n3. **Add formulas** (optional): Define computed properties in the `formulas` section\n4. **Configure views**: Add one or more views (`table`, `cards`, `list`, or `map`) with `order` specifying which properties to display\n5. **Validate**: Verify the file is valid YAML with no syntax errors. Check that all referenced properties and formulas exist. Common issues: unquoted strings containing special YAML characters, mismatched quotes in formula expressions, referencing `formula.X` without defining `X` in `formulas`\n6. **Test in Obsidian**: Open the `.base` file in Obsidian to confirm the view renders correctly. If it shows a YAML error, check quoting rules below\n\n## Schema\n\nBase files use the `.base` extension and contain valid YAML.\n\n```yaml\n# Global filters apply to ALL views in the base\nfilters:\n  # Can be a single filter string\n  # OR a recursive filter object with and/or/not\n  and: []\n  or: []\n  not: []\n\n# Define formula properties that can be used across all views\nformulas:\n  formula_name: 'expression'\n\n# Configure display names and settings for properties\nproperties:\n  property_name:\n    displayName: \"Display Name\"\n  formula.formula_name:\n    displayName: \"Formula Display Name\"\n  file.ext:\n    displayName: \"Extension\"\n\n# Define custom summary formulas\nsummaries:\n  custom_summary_name: 'values.mean().round(3)'\n\n# Define one or more views\nviews:\n  - type: table | cards | list | map\n    name: \"View Name\"\n    limit: 10                    # Optional: limit results\n    groupBy:                     # Optional: group results\n      property: property_name\n      direction: ASC | DESC\n    filters:                     # View-specific filters\n      and: []\n    order:                       # Properties to display in order\n      - file.name\n      - property_name\n      - formula.formula_name\n    summaries:                   # Map properties to summary formulas\n      property_name: Average\n```\n\n## Filter Syntax\n\nFilters narrow down results. They can be applied globally or per-view.\n\n### Filter Structure\n\n```yaml\n# Single filter\nfilters: 'status == \"done\"'\n\n# AND - all conditions must be true\nfilters:\n  and:\n    - 'status == \"done\"'\n    - 'priority > 3'\n\n# OR - any condition can be true\nfilters:\n  or:\n    - 'file.hasTag(\"book\")'\n    - 'file.hasTag(\"article\")'\n\n# NOT - exclude matching items\nfilters:\n  not:\n    - 'file.hasTag(\"archived\")'\n\n# Nested filters\nfilters:\n  or:\n    - file.hasTag(\"tag\")\n    - and:\n        - file.hasTag(\"book\")\n        - file.hasLink(\"Textbook\")\n    - not:\n        - file.hasTag(\"book\")\n        - file.inFolder(\"Required Reading\")\n```\n\n### Filter Operators\n\n| Operator | Description |\n|----------|-------------|\n| `==` | equals |\n| `!=` | not equal |\n| `>` | greater than |\n| `<` | less than |\n| `>=` | greater than or equal |\n| `<=` | less than or equal |\n| `&&` | logical and |\n| `\\|\\|` | logical or |\n| <code>!</code> | logical not |\n\n## Properties\n\n### Three Types of Properties\n\n1. **Note properties** - From frontmatter: `note.author` or just `author`\n2. **File properties** - File metadata: `file.name`, `file.mtime`, etc.\n3. **Formula properties** - Computed values: `formula.my_formula`\n\n### File Properties Reference\n\n| Property | Type | Description |\n|----------|------|-------------|\n| `file.name` | String | File name |\n| `file.basename` | String | File name without extension |\n| `file.path` | String | Full path to file |\n| `file.folder` | String | Parent folder path |\n| `file.ext` | String | File extension |\n| `file.size` | Number | File size in bytes |\n| `file.ctime` | Date | Created time |\n| `file.mtime` | Date | Modified time |\n| `file.tags` | List | All tags in file |\n| `file.links` | List | Internal links in file |\n| `file.backlinks` | List | Files linking to this file |\n| `file.embeds` | List | Embeds in the note |\n| `file.properties` | Object | All frontmatter properties |\n\n### The `this` Keyword\n\n- In main content area: refers to the base file itself\n- When embedded: refers to the embedding file\n- In sidebar: refers to the active file in main content\n\n## Formula Syntax\n\nFormulas compute values from properties. Defined in the `formulas` section.\n\n```yaml\nformulas:\n  # Simple arithmetic\n  total: \"price * quantity\"\n\n  # Conditional logic\n  status_icon: 'if(done, \"✅\", \"⏳\")'\n\n  # String formatting\n  formatted_price: 'if(price, price.toFixed(2) + \" dollars\")'\n\n  # Date formatting\n  created: 'file.ctime.format(\"YYYY-MM-DD\")'\n\n  # Calculate days since created (use .days for Duration)\n  days_old: '(now() - file.ctime).days'\n\n  # Calculate days until due date\n  days_until_due: 'if(due_date, (date(due_date) - today()).days, \"\")'\n```\n\n## Key Functions\n\nMost commonly used functions. For the complete reference of all types (Date, String, Number, List, File, Link, Object, RegExp), see [FUNCTIONS_REFERENCE.md](references/FUNCTIONS_REFERENCE.md).\n\n| Function | Signature | Description |\n|----------|-----------|-------------|\n| `date()` | `date(string): date` | Parse string to date (`YYYY-MM-DD HH:mm:ss`) |\n| `now()` | `now(): date` | Current date and time |\n| `today()` | `today(): date` | Current date (time = 00:00:00) |\n| `if()` | `if(condition, trueResult, falseResult?)` | Conditional |\n| `duration()` | `duration(string): duration` | Parse duration string |\n| `file()` | `file(path): file` | Get file object |\n| `link()` | `link(path, display?): Link` | Create a link |\n\n### Duration Type\n\nWhen subtracting two dates, the result is a **Duration** type (not a number).\n\n**Duration Fields:** `duration.days`, `duration.hours`, `duration.minutes`, `duration.seconds`, `duration.milliseconds`\n\n**IMPORTANT:** Duration does NOT support `.round()`, `.floor()`, `.ceil()` directly. Access a numeric field first (like `.days`), then apply number functions.\n\n```yaml\n# CORRECT: Calculate days between dates\n\"(date(due_date) - today()).days\"                    # Returns number of days\n\"(now() - file.ctime).days\"                          # Days since created\n\"(date(due_date) - today()).days.round(0)\"           # Rounded days\n\n# WRONG - will cause error:\n# \"((date(due) - today()) / 86400000).round(0)\"      # Duration doesn't support division then round\n```\n\n### Date Arithmetic\n\n```yaml\n# Duration units: y/year/years, M/month/months, d/day/days,\n#                 w/week/weeks, h/hour/hours, m/minute/minutes, s/second/seconds\n\"now() + \\\"1 day\\\"\"       # Tomorrow\n\"today() + \\\"7d\\\"\"        # A week from today\n\"now() - file.ctime\"      # Returns Duration\n\"(now() - file.ctime).days\"  # Get days as number\n```\n\n## View Types\n\n### Table View\n\n```yaml\nviews:\n  - type: table\n    name: \"My Table\"\n    order:\n      - file.name\n      - status\n      - due_date\n    summaries:\n      price: Sum\n      count: Average\n```\n\n### Cards View\n\n```yaml\nviews:\n  - type: cards\n    name: \"Gallery\"\n    order:\n      - file.name\n      - cover_image\n      - description\n```\n\n### List View\n\n```yaml\nviews:\n  - type: list\n    name: \"Simple List\"\n    order:\n      - file.name\n      - status\n```\n\n### Map View\n\nRequires latitude/longitude properties and the Maps community plugin.\n\n```yaml\nviews:\n  - type: map\n    name: \"Locations\"\n    # Map-specific settings for lat/lng properties\n```\n\n## Default Summary Formulas\n\n| Name | Input Type | Description |\n|------|------------|-------------|\n| `Average` | Number | Mathematical mean |\n| `Min` | Number | Smallest number |\n| `Max` | Number | Largest number |\n| `Sum` | Number | Sum of all numbers |\n| `Range` | Number | Max - Min |\n| `Median` | Number | Mathematical median |\n| `Stddev` | Number | Standard deviation |\n| `Earliest` | Date | Earliest date |\n| `Latest` | Date | Latest date |\n| `Range` | Date | Latest - Earliest |\n| `Checked` | Boolean | Count of true values |\n| `Unchecked` | Boolean | Count of false values |\n| `Empty` | Any | Count of empty values |\n| `Filled` | Any | Count of non-empty values |\n| `Unique` | Any | Count of unique values |\n\n## Complete Examples\n\n### Task Tracker Base\n\n```yaml\nfilters:\n  and:\n    - file.hasTag(\"task\")\n    - 'file.ext == \"md\"'\n\nformulas:\n  days_until_due: 'if(due, (date(due) - today()).days, \"\")'\n  is_overdue: 'if(due, date(due) < today() && status != \"done\", false)'\n  priority_label: 'if(priority == 1, \"🔴 High\", if(priority == 2, \"🟡 Medium\", \"🟢 Low\"))'\n\nproperties:\n  status:\n    displayName: Status\n  formula.days_until_due:\n    displayName: \"Days Until Due\"\n  formula.priority_label:\n    displayName: Priority\n\nviews:\n  - type: table\n    name: \"Active Tasks\"\n    filters:\n      and:\n        - 'status != \"done\"'\n    order:\n      - file.name\n      - status\n      - formula.priority_label\n      - due\n      - formula.days_until_due\n    groupBy:\n      property: status\n      direction: ASC\n    summaries:\n      formula.days_until_due: Average\n\n  - type: table\n    name: \"Completed\"\n    filters:\n      and:\n        - 'status == \"done\"'\n    order:\n      - file.name\n      - completed_date\n```\n\n### Reading List Base\n\n```yaml\nfilters:\n  or:\n    - file.hasTag(\"book\")\n    - file.hasTag(\"article\")\n\nformulas:\n  reading_time: 'if(pages, (pages * 2).toString() + \" min\", \"\")'\n  status_icon: 'if(status == \"reading\", \"📖\", if(status == \"done\", \"✅\", \"📚\"))'\n  year_read: 'if(finished_date, date(finished_date).year, \"\")'\n\nproperties:\n  author:\n    displayName: Author\n  formula.status_icon:\n    displayName: \"\"\n  formula.reading_time:\n    displayName: \"Est. Time\"\n\nviews:\n  - type: cards\n    name: \"Library\"\n    order:\n      - cover\n      - file.name\n      - author\n      - formula.status_icon\n    filters:\n      not:\n        - 'status == \"dropped\"'\n\n  - type: table\n    name: \"Reading List\"\n    filters:\n      and:\n        - 'status == \"to-read\"'\n    order:\n      - file.name\n      - author\n      - pages\n      - formula.reading_time\n```\n\n### Daily Notes Index\n\n```yaml\nfilters:\n  and:\n    - file.inFolder(\"Daily Notes\")\n    - '/^\\d{4}-\\d{2}-\\d{2}$/.matches(file.basename)'\n\nformulas:\n  word_estimate: '(file.size / 5).round(0)'\n  day_of_week: 'date(file.basename).format(\"dddd\")'\n\nproperties:\n  formula.day_of_week:\n    displayName: \"Day\"\n  formula.word_estimate:\n    displayName: \"~Words\"\n\nviews:\n  - type: table\n    name: \"Recent Notes\"\n    limit: 30\n    order:\n      - file.name\n      - formula.day_of_week\n      - formula.word_estimate\n      - file.mtime\n```\n\n## Embedding Bases\n\nEmbed in Markdown files:\n\n```markdown\n![[MyBase.base]]\n\n<!-- Specific view -->\n![[MyBase.base#View Name]]\n```\n\n## YAML Quoting Rules\n\n- Use single quotes for formulas containing double quotes: `'if(done, \"Yes\", \"No\")'`\n- Use double quotes for simple strings: `\"My View Name\"`\n- Escape nested quotes properly in complex expressions\n\n## Troubleshooting\n\n### YAML Syntax Errors\n\n**Unquoted special characters**: Strings containing `:`, `{`, `}`, `[`, `]`, `,`, `&`, `*`, `#`, `?`, `|`, `-`, `<`, `>`, `=`, `!`, `%`, `@`, `` ` `` must be quoted.\n\n```yaml\n# WRONG - colon in unquoted string\ndisplayName: Status: Active\n\n# CORRECT\ndisplayName: \"Status: Active\"\n```\n\n**Mismatched quotes in formulas**: When a formula contains double quotes, wrap the entire formula in single quotes.\n\n```yaml\n# WRONG - double quotes inside double quotes\nformulas:\n  label: \"if(done, \"Yes\", \"No\")\"\n\n# CORRECT - single quotes wrapping double quotes\nformulas:\n  label: 'if(done, \"Yes\", \"No\")'\n```\n\n### Common Formula Errors\n\n**Duration math without field access**: Subtracting dates returns a Duration, not a number. Always access `.days`, `.hours`, etc.\n\n```yaml\n# WRONG - Duration is not a number\n\"(now() - file.ctime).round(0)\"\n\n# CORRECT - access .days first, then round\n\"(now() - file.ctime).days.round(0)\"\n```\n\n**Missing null checks**: Properties may not exist on all notes. Use `if()` to guard.\n\n```yaml\n# WRONG - crashes if due_date is empty\n\"(date(due_date) - today()).days\"\n\n# CORRECT - guard with if()\n'if(due_date, (date(due_date) - today()).days, \"\")'\n```\n\n**Referencing undefined formulas**: Ensure every `formula.X` in `order` or `properties` has a matching entry in `formulas`.\n\n```yaml\n# This will fail silently if 'total' is not defined in formulas\norder:\n  - formula.total\n\n# Fix: define it\nformulas:\n  total: \"price * quantity\"\n```\n\n## References\n\n- [Bases Syntax](https://help.obsidian.md/bases/syntax)\n- [Functions](https://help.obsidian.md/bases/functions)\n- [Views](https://help.obsidian.md/bases/views)\n- [Formulas](https://help.obsidian.md/formulas)\n- [Complete Functions Reference](references/FUNCTIONS_REFERENCE.md)",
  "custom": true
},{
  "name": "obsidian-cli",
  "category": "Obsidian",
  "description": "Interact with Obsidian vaults using the Obsidian CLI to read, create, search, and manage notes, tasks, properties, and more. Also supports plugin and theme development with commands to reload plugins, run JavaScript, capture errors, take screenshots, and inspect the DOM. Use when the user asks to interact with their Obsidian vault, manage notes, search vault content, perform vault operations from the command line, or develop and debug Obsidian plugins and themes.",
  "content": "---\nname: obsidian-cli\ncategory: Obsidian\ndescription: Interact with Obsidian vaults using the Obsidian CLI to read, create, search, and manage notes, tasks, properties, and more. Also supports plugin and theme development with commands to reload plugins, run JavaScript, capture errors, take screenshots, and inspect the DOM. Use when the user asks to interact with their Obsidian vault, manage notes, search vault content, perform vault operations from the command line, or develop and debug Obsidian plugins and themes.\n---\n\n# Obsidian CLI\n\nUse the `obsidian` CLI to interact with a running Obsidian instance. Requires Obsidian to be open.\n\n## Command reference\n\nRun `obsidian help` to see all available commands. This is always up to date. Full docs: https://help.obsidian.md/cli\n\n## Syntax\n\n**Parameters** take a value with `=`. Quote values with spaces:\n\n```bash\nobsidian create name=\"My Note\" content=\"Hello world\"\n```\n\n**Flags** are boolean switches with no value:\n\n```bash\nobsidian create name=\"My Note\" silent overwrite\n```\n\nFor multiline content use `\\n` for newline and `\\t` for tab.\n\n## File targeting\n\nMany commands accept `file` or `path` to target a file. Without either, the active file is used.\n\n- `file=<name>` — resolves like a wikilink (name only, no path or extension needed)\n- `path=<path>` — exact path from vault root, e.g. `folder/note.md`\n\n## Vault targeting\n\nCommands target the most recently focused vault by default. Use `vault=<name>` as the first parameter to target a specific vault:\n\n```bash\nobsidian vault=\"My Vault\" search query=\"test\"\n```\n\n## Common patterns\n\n```bash\nobsidian read file=\"My Note\"\nobsidian create name=\"New Note\" content=\"# Hello\" template=\"Template\" silent\nobsidian append file=\"My Note\" content=\"New line\"\nobsidian search query=\"search term\" limit=10\nobsidian daily:read\nobsidian daily:append content=\"- [ ] New task\"\nobsidian property:set name=\"status\" value=\"done\" file=\"My Note\"\nobsidian tasks daily todo\nobsidian tags sort=count counts\nobsidian backlinks file=\"My Note\"\n```\n\nUse `--copy` on any command to copy output to clipboard. Use `silent` to prevent files from opening. Use `total` on list commands to get a count.\n\n## Plugin development\n\n### Develop/test cycle\n\nAfter making code changes to a plugin or theme, follow this workflow:\n\n1. **Reload** the plugin to pick up changes:\n   ```bash\n   obsidian plugin:reload id=my-plugin\n   ```\n2. **Check for errors** — if errors appear, fix and repeat from step 1:\n   ```bash\n   obsidian dev:errors\n   ```\n3. **Verify visually** with a screenshot or DOM inspection:\n   ```bash\n   obsidian dev:screenshot path=screenshot.png\n   obsidian dev:dom selector=\".workspace-leaf\" text\n   ```\n4. **Check console output** for warnings or unexpected logs:\n   ```bash\n   obsidian dev:console level=error\n   ```\n\n### Additional developer commands\n\nRun JavaScript in the app context:\n\n```bash\nobsidian eval code=\"app.vault.getFiles().length\"\n```\n\nInspect CSS values:\n\n```bash\nobsidian dev:css selector=\".workspace-leaf\" prop=background-color\n```\n\nToggle mobile emulation:\n\n```bash\nobsidian dev:mobile on\n```\n\nRun `obsidian help` to see additional developer commands including CDP and debugger controls.",
  "custom": true
},{
  "name": "obsidian-markdown",
  "category": "Obsidian",
  "description": "Create and edit Obsidian Flavored Markdown with wikilinks, embeds, callouts, properties, and other Obsidian-specific syntax. Use when working with .md files in Obsidian, or when the user mentions wikilinks, callouts, frontmatter, tags, embeds, or Obsidian notes.",
  "content": "---\nname: obsidian-markdown\ncategory: Obsidian\ndescription: Create and edit Obsidian Flavored Markdown with wikilinks, embeds, callouts, properties, and other Obsidian-specific syntax. Use when working with .md files in Obsidian, or when the user mentions wikilinks, callouts, frontmatter, tags, embeds, or Obsidian notes.\n---\n\n# Obsidian Flavored Markdown Skill\n\nCreate and edit valid Obsidian Flavored Markdown. Obsidian extends CommonMark and GFM with wikilinks, embeds, callouts, properties, comments, and other syntax. This skill covers only Obsidian-specific extensions -- standard Markdown (headings, bold, italic, lists, quotes, code blocks, tables) is assumed knowledge.\n\n## Workflow: Creating an Obsidian Note\n\n1. **Add frontmatter** with properties (title, tags, aliases) at the top of the file. See [PROPERTIES.md](references/PROPERTIES.md) for all property types.\n2. **Write content** using standard Markdown for structure, plus Obsidian-specific syntax below.\n3. **Link related notes** using wikilinks (`[[Note]]`) for internal vault connections, or standard Markdown links for external URLs.\n4. **Embed content** from other notes, images, or PDFs using the `![[embed]]` syntax. See [EMBEDS.md](references/EMBEDS.md) for all embed types.\n5. **Add callouts** for highlighted information using `> [!type]` syntax. See [CALLOUTS.md](references/CALLOUTS.md) for all callout types.\n6. **Verify** the note renders correctly in Obsidian's reading view.\n\n> When choosing between wikilinks and Markdown links: use `[[wikilinks]]` for notes within the vault (Obsidian tracks renames automatically) and `[text](url)` for external URLs only.\n\n## Internal Links (Wikilinks)\n\n```markdown\n[[Note Name]]                          Link to note\n[[Note Name|Display Text]]             Custom display text\n[[Note Name#Heading]]                  Link to heading\n[[Note Name#^block-id]]                Link to block\n[[#Heading in same note]]              Same-note heading link\n```\n\nDefine a block ID by appending `^block-id` to any paragraph:\n\n```markdown\nThis paragraph can be linked to. ^my-block-id\n```\n\nFor lists and quotes, place the block ID on a separate line after the block:\n\n```markdown\n> A quote block\n\n^quote-id\n```\n\n## Embeds\n\nPrefix any wikilink with `!` to embed its content inline:\n\n```markdown\n![[Note Name]]                         Embed full note\n![[Note Name#Heading]]                 Embed section\n![[image.png]]                         Embed image\n![[image.png|300]]                     Embed image with width\n![[document.pdf#page=3]]               Embed PDF page\n```\n\nSee [EMBEDS.md](references/EMBEDS.md) for audio, video, search embeds, and external images.\n\n## Callouts\n\n```markdown\n> [!note]\n> Basic callout.\n\n> [!warning] Custom Title\n> Callout with a custom title.\n\n> [!faq]- Collapsed by default\n> Foldable callout (- collapsed, + expanded).\n```\n\nCommon types: `note`, `tip`, `warning`, `info`, `example`, `quote`, `bug`, `danger`, `success`, `failure`, `question`, `abstract`, `todo`.\n\nSee [CALLOUTS.md](references/CALLOUTS.md) for the full list with aliases, nesting, and custom CSS callouts.\n\n## Properties (Frontmatter)\n\n```yaml\n---\ntitle: My Note\ndate: 2024-01-15\ntags:\n  - project\n  - active\naliases:\n  - Alternative Name\ncssclasses:\n  - custom-class\n---\n```\n\nDefault properties: `tags` (searchable labels), `aliases` (alternative note names for link suggestions), `cssclasses` (CSS classes for styling).\n\nSee [PROPERTIES.md](references/PROPERTIES.md) for all property types, tag syntax rules, and advanced usage.\n\n## Tags\n\n```markdown\n#tag                    Inline tag\n#nested/tag             Nested tag with hierarchy\n```\n\nTags can contain letters, numbers (not first character), underscores, hyphens, and forward slashes. Tags can also be defined in frontmatter under the `tags` property.\n\n## Comments\n\n```markdown\nThis is visible %%but this is hidden%% text.\n\n%%\nThis entire block is hidden in reading view.\n%%\n```\n\n## Obsidian-Specific Formatting\n\n```markdown\n==Highlighted text==                   Highlight syntax\n```\n\n## Math (LaTeX)\n\n```markdown\nInline: $e^{i\\pi} + 1 = 0$\n\nBlock:\n$$\n\\frac{a}{b} = c\n$$\n```\n\n## Diagrams (Mermaid)\n\n````markdown\n```mermaid\ngraph TD\n    A[Start] --> B{Decision}\n    B -->|Yes| C[Do this]\n    B -->|No| D[Do that]\n```\n````\n\nTo link Mermaid nodes to Obsidian notes, add `class NodeName internal-link;`.\n\n## Footnotes\n\n```markdown\nText with a footnote[^1].\n\n[^1]: Footnote content.\n\nInline footnote.^[This is inline.]\n```\n\n## Complete Example\n\n````markdown\n---\ntitle: Project Alpha\ndate: 2024-01-15\ntags:\n  - project\n  - active\nstatus: in-progress\n---\n\n# Project Alpha\n\nThis project aims to [[improve workflow]] using modern techniques.\n\n> [!important] Key Deadline\n> The first milestone is due on ==January 30th==.\n\n## Tasks\n\n- [x] Initial planning\n- [ ] Development phase\n  - [ ] Backend implementation\n  - [ ] Frontend design\n\n## Notes\n\nThe algorithm uses $O(n \\log n)$ sorting. See [[Algorithm Notes#Sorting]] for details.\n\n![[Architecture Diagram.png|600]]\n\nReviewed in [[Meeting Notes 2024-01-10#Decisions]].\n````\n\n## References\n\n- [Obsidian Flavored Markdown](https://help.obsidian.md/obsidian-flavored-markdown)\n- [Internal links](https://help.obsidian.md/links)\n- [Embed files](https://help.obsidian.md/embeds)\n- [Callouts](https://help.obsidian.md/callouts)\n- [Properties](https://help.obsidian.md/properties)",
  "custom": true
},{
  "name": "process-meeting",
  "category": "Meetings",
  "description": "Process a meeting transcript or summary into a structured vault note. Use when the user pastes a transcription, says `/process-meeting`, or wants to save a meeting summary.",
  "content": "---\nname: process-meeting\ncategory: Meetings\ndescription: Process a meeting transcript or summary into a structured vault note. Use when the user pastes a transcription, says `/process-meeting`, or wants to save a meeting summary.\n---\n\n# Process Meeting\n\nRead a raw transcription (or pre-written summary), save a structured English meeting note, extract action items, and route confirmed items to `~/elli-vault/todo.md`.\n\n## Steps\n\n1. **Get the source** — the user will either:\n   - Paste raw transcription text directly\n   - Provide a file path (look in `~/elli-vault/Meetings/Transcriptions/` if no full path given)\n   - Paste a pre-written summary (already structured — skip to step 3)\n   - **No file specified?** Search for files tagged `#to-process` in `Meetings/Transcriptions/`. List them and ask which to process (or \"all\" for batch).\n\n2. **Read the transcript** — format detection is mandatory before reading:\n   - **Check file size** with `wc -c`. If >15KB, read in chunks (see Large Files below).\n   - **Detect format**: run `head -c 500 [file]` and check:\n     - Contains `<br><br>` → **Ivrit AI format**. Run `sed 's/<br><br>/\\n/g' [file] > /tmp/meeting-clean.txt` first, then read from `/tmp/meeting-clean.txt`.\n     - Contains `Speaker 0:` / `Speaker 1:` or timestamps → **Otter.ai / generic transcript**. Read directly.\n     - Contains `## Agenda` or `## Work Items` → **Pre-structured summary**. Skip to step 3.\n   - **Large files (>15KB):** After format conversion, read in 12KB chunks using `head -c 12000`, `tail -c +12001 | head -c 12000`, etc. Read the ENTIRE file before writing anything.\n\n3. **Summarize** — if the input is a raw transcription (Hebrew or English):\n   - Read the ENTIRE transcript before writing anything\n   - **Be exhaustive, not brief.** Every topic, decision, task, and idea must appear. Do not collapse distinct items into one bullet.\n   - If Hebrew: translate everything to English. Keep participant names as-is. Add `#hebrew` tag.\n   - Generate a structured English summary:\n     ```markdown\n     # Meeting: [Descriptive Title]\n     **Date:** YYYY-MM-DD\n     **Participants:** [names]\n\n     ## Agenda / Topics Covered\n     [One bullet per distinct topic — all of them, in order. Short/dense — scannable log, not prose.]\n\n     ## Work Items\n     [Concrete, completable tasks — @Owner if known. Bar: \"Could this go straight into a backlog?\" ❌ \"Work on X\" ✅ \"Define/write/research [specific thing]\"]\n\n     ## Follow-ups (People)\n     [\"Talk to X\", \"schedule with Y\", \"Slack someone\" — include tentative ones]\n\n     ## Ideas & Improvements\n     [Suggestions, improvements, \"we should\" items — include speculative ideas]\n\n     ## Reflection\n     **Tone:** [overall mood]\n     **Energy:** [energy dynamics]\n     **What went well:** [things Elli did well]\n     **Elli could improve:** [coaching note — reference the weakest dimension: Preparation & Structure, Active Listening, Outcome Clarity, Relationship & Trust, or Energy & Presence]\n     **Score:** X/10 — [one-line justification]\n     ```\n\n4. **Confirm metadata** — show filename, date, participants. Ask: \"Does this look right?\"\n\n5. **Save the file** — write to `~/elli-vault/Meetings/YYYY-MM-DD-[slug].md` (root — new meetings get classified into Technical/Strategic/Prep later):\n   - Add YAML frontmatter at the very top:\n     ```yaml\n     ---\n     date: YYYY-MM-DD\n     tags: meeting, extracted  # add hebrew, designers, developers etc. as appropriate\n     project:                  # ask user which project(s) this relates to, or leave blank\n     summary: \"One-line description of the meeting's key topics\"\n     ---\n     ```\n   - If source was a transcription file, add after frontmatter: `[[Meetings/Transcriptions/[original-filename]|Full transcription]]`\n   - Then the summary content (no inline tags needed — they're in frontmatter)\n   - Remove `#to-process` tag from the source transcription file (if present)\n\n6. **Update `_index.md`** — find matching row (by recording name, date, or participants) and fill in Date, Topics, link, Extracted=✅, Score. If no match, add a new row.\n\n7. **Extract action items** — read `~/elli-vault/todo.md` to know what's already there, then:\n   - If the note has typed sections (`## Work Items`, `## Follow-ups (People)`, `## Ideas & Improvements`), use those as pre-classification. Otherwise scan for explicit todos, follow-ups, decisions needing work, \"we should\"/\"I need to\"/\"next step\" items.\n   - **Deduplicate** — remove candidates already in todo.md (same task or person+topic). Show filtered items in a collapsed `[already in todo]` list.\n   - **Confidence filtering** — mark each candidate:\n     - `[keep]` — concrete deliverables, decisions needing documentation, guideline/research tasks, scheduled meetings with clear purpose\n     - `[skip?]` — vague intros (\"meet X\" with no clear agenda), one-time logistics (\"get access to Y\"), items already handled via Slack, generic \"we should\" without specifics\n\n8. **Present and route** — show candidates as a numbered list. Each item: `N. [keep]/[skip?] [type] description — @Owner — 📂 area`.\n\n   | Type | Routes to | Format in todo.md |\n   |------|-----------|-------------------|\n   | `[work]` | `## 📋 Backlog` | `- [ ] [Action] — @Owner — 📂 [area] — from: [[YYYY-MM-DD-slug]]` |\n   | `[people]` | `## 👥 People` | `- [ ] [Person] — [what] — 📂 [area] — from: [[YYYY-MM-DD-slug]]` |\n   | `[idea]` | `## 💡 Ideas` | `- [ ] [Idea] — 📂 [area] — from: [[YYYY-MM-DD-slug]]` |\n\n   Ask: \"Which do you want to add? Say 'all', list numbers, or 'none'.\"\n\n9. **Write confirmed items** to the correct section in todo.md. Update `Extracted` column in `_index.md`: `—` → `✅` (if not already set).\n\n10. **Confirm** — summarize: what was saved (meeting note) and what was added to todo.md (count per section).\n\n## File locations\n- Summaries: `~/elli-vault/Meetings/YYYY-MM-DD-[slug].md`\n- Full transcriptions: `~/elli-vault/Meetings/Transcriptions/`\n- Index: `~/elli-vault/Meetings/_index.md`\n- Action items: `~/elli-vault/todo.md`\n\n## Naming\n`YYYY-MM-DD-[short-slug].md` — e.g. `2026-02-25-lev-sync.md`, `2026-03-05-omer-baki.md`\nIf date unknown: `0000-00-00-[slug].md`\n\n## Coaching Dimensions (reference for Reflection scoring)\n\n| Dimension | What to look for |\n|-----------|-----------------|\n| Preparation & Structure | Had agenda? Time-boxed? Covered all topics? |\n| Active Listening | Asked clarifying Qs? Paraphrased? Drew people out? |\n| Outcome Clarity | Every discussion → decision + owner + next step? |\n| Relationship & Trust | Built safety? Acknowledged expertise? |\n| Energy & Presence | Consistent energy? Adapted pace? Managed dynamics? |\n\n## Notes\n- Summaries should be **complete before concise** — capture everything first, then tighten bullets.\n- Always include `from: [[meeting-file]]` for traceability in todo.md items.\n- Skip items already in `Decisions.md`.\n- Do NOT add due dates unless explicitly mentioned.\n- **Received links after the meeting?** Paste into the relevant Work Items or Follow-ups bullet — don't create a separate Links section.\n\n## Extraction-only mode\nIf called on a file that is already a processed meeting note (has `## Work Items` sections, tagged `#meeting`), skip steps 2-6 and go straight to step 7 (extract action items).",
  "custom": true
},{
  "name": "process-raw",
  "category": "Projects",
  "description": "Process a raw input file (Jira paste, Slack thread, CSV, image, plain text) from a project's _raw/ folder into structured markdown",
  "content": "---\nname: process-raw\ncategory: Projects\ndescription: Process a raw input file (Jira paste, Slack thread, CSV, image, plain text) from a project's _raw/ folder into structured markdown\nuser-invocable: true\nargument-hint: \"[file-path]\"\n---\n\n# /process-raw — Process Raw Input\n\n## Input\nThe user provides a path to a raw file, typically `Projects/<name>/_raw/<file>`. If only a filename is given, infer the project from context or ask.\n\n## Steps\n\n1. **Read the raw file.** If the path doesn't exist, tell the user and stop.\n\n2. **Detect input type** using these rules (check in order):\n\n   | Type | Detection |\n   |------|-----------|\n   | **Jira page** | Contains a Jira key pattern (e.g., `ME-12345`), or fields like Status/Priority/Severity |\n   | **Slack thread** | Conversational format with timestamps and usernames |\n   | **CSV** | `.csv` extension or comma/tab-separated tabular content |\n   | **Image** | Image file extension (`.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`) |\n   | **Plain text** | Fallback for anything else |\n\n3. **Confirm with the user:**\n   - \"Detected as **[type]**. Output name suggestion: `[suggested-name].md`. OK, or different name?\"\n   - Wait for confirmation before processing.\n\n4. **Process into structured markdown** based on type:\n\n   ### Jira page\n   Extract fields into frontmatter + table:\n   ```markdown\n   ---\n   tags: jira-extract\n   source: _raw/<original-filename>\n   jira: ME-12345\n   ---\n   # ME-12345: <summary>\n\n   | Field | Value |\n   |-------|-------|\n   | Status | ... |\n   | Priority | ... |\n   | Severity | ... |\n   | Squad | ... |\n   | Identified By | ... |\n   | Reporter | ... |\n   | Assignee | ... |\n   | Labels | ... |\n   | Created | ... |\n   | Updated | ... |\n   | Resolution | ... |\n\n   ## Description\n   <structured content from the paste>\n   ```\n   Omit rows where the field is not present in the source.\n\n   ### Slack thread\n   ```markdown\n   ---\n   tags: slack-extract\n   source: _raw/<original-filename>\n   date: <date if detectable>\n   ---\n   # <topic summary>\n\n   **Participants:** <list>\n   **Date:** <date>\n   **Channel:** <if detectable>\n\n   ## Key Points\n   - ...\n\n   ## Decisions\n   - ...\n\n   ## Action Items\n   - [ ] ...\n   ```\n\n   ### CSV\n   ```markdown\n   ---\n   tags: csv-extract\n   source: _raw/<original-filename>\n   ---\n   # <descriptive title>\n\n   ## Summary\n   <key findings: row count, notable patterns>\n\n   ## Data\n   | col1 | col2 | ... |\n   |------|------|-----|\n   | ...  | ...  | ... |\n   ```\n   For large CSVs (>50 rows), include summary + first 20 rows + \"... N more rows in source file.\"\n\n   ### Image\n   Read the image, then:\n   ```markdown\n   ---\n   tags: image-extract\n   source: _raw/<original-filename>\n   ---\n   # <description of image content>\n\n   ## Extracted Text\n   <any visible text in the image>\n\n   ## Observations\n   - ...\n   ```\n\n   ### Plain text\n   ```markdown\n   ---\n   tags: raw-extract\n   source: _raw/<original-filename>\n   ---\n   # <descriptive title>\n\n   ## Key Points\n   - ...\n\n   ## Details\n   <structured content>\n   ```\n\n5. **Save the output** in the project folder (NOT in `_raw/`):\n   `Projects/<name>/<output-name>.md`\n\n6. **Append to `_log.md`:**\n   ```\n   - YYYY-MM-DD: Processed _raw/<filename> → <output-name>.md (<type> extract)\n   ```\n\n7. **Report to the user:**\n   ```\n   Processed: _raw/<filename> → <output-name>.md\n   Type: <type>\n   Original preserved in _raw/\n   ```\n\n## Notes\n- The original file stays in `_raw/` as an archive — never delete it.\n- If `_raw/` doesn't exist yet for the project, create it.\n- The `source:` frontmatter field links back to the original for traceability.",
  "custom": true
},{
  "name": "project-log",
  "category": "Projects",
  "description": "Append a dated entry to a project's _log.md",
  "content": "---\nname: project-log\ncategory: Projects\ndescription: Append a dated entry to a project's _log.md\nuser-invocable: true\nargument-hint: \"<project-name> <entry text>\"\n---\n\n# /project-log — Log a Project Entry\n\n## Input\nThe user provides a project name and an entry (e.g., `/project-log spinner decided to use role=progressbar`).\n\n## Steps\n\n1. **Read `Projects/<name>/_log.md`** to check the current state.\n\n2. **Check if today's date section exists** — look for `## <today's date YYYY-MM-DD>`.\n\n3. **If today's section exists**, append the new entry as a bullet under it.\n\n4. **If today's section doesn't exist**, add a new section at the top (after the title and `---` separator):\n\n```markdown\n## <today's date YYYY-MM-DD>\n- <entry text>\n```\n\n5. **Confirm** to the user what was logged.\n\n## Format Rules\n- Entries are always bullet points (`- `)\n- Newest date sections go at the top (reverse chronological)\n- Keep entries concise — decisions, outcomes, references to artifacts\n- If the entry references a file, use `[[wikilinks]]`\n\n## Error Handling\n- If `Projects/<name>/` doesn't exist, tell the user and suggest `/new-project <name>`.",
  "custom": true
},{
  "name": "project",
  "category": "Projects",
  "description": "Load project context at session start — reads _context.md, _log.md, follows artifact links, finds related meetings",
  "content": "---\nname: project\ncategory: Projects\ndescription: Load project context at session start — reads _context.md, _log.md, follows artifact links, finds related meetings\nuser-invocable: true\nargument-hint: \"[project-name]\"\n---\n\n# /project — Load Project Context\n\n## Input\nThe user provides a project name (e.g., `/project spinner`). The project folder lives at `Projects/<name>/`.\n\n## Steps\n\n1. **Read `Projects/<name>/_context.md`** — the project brief with goal, status, artifacts, scope, and open questions.\n\n2. **Read `Projects/<name>/_log.md`** (last ~50 lines) — recent decisions and conversation history.\n\n3. **Check for `_raw/` inbox** — if `Projects/<name>/_raw/` exists, count the files in it but do NOT read their contents. Report the count in the summary (e.g., \"3 raw files in inbox\"). Skip `_raw/` entirely when loading context.\n\n4. **Follow artifact wikilinks** — in the Artifacts section of `_context.md`, resolve each `[[wikilink]]` and read those files to build full context. Skip any that don't exist.\n\n5. **Find related meetings** — scan `Meetings/` (including subdirectories, excluding `Transcriptions/`) for files with `project: <name>` in their frontmatter. List them with dates and summaries (from `summary:` frontmatter field).\n\n6. **Print summary** to the user:\n\n```\n## Project: <Name>\n**Status:** <from _context.md>\n**Started:** <date>\n**Jira:** <ticket if any>\n**Raw inbox:** <N files> _(or omit if no `_raw/` folder)_\n\n### Artifacts\n- <list with status/key info from each>\n\n### Related Meetings\n- <date> — <meeting title> — <summary from frontmatter>\n\n### Open Questions\n- <from _context.md>\n\n### Recent Activity (from _log.md)\n- <last few entries>\n```\n\n7. **Set working context** — for the rest of this session, focus on the scope defined in `_context.md`. When the user asks questions or gives tasks, relate them to this project's goals and artifacts.\n\n## Error Handling\n- If `Projects/<name>/` doesn't exist, tell the user and suggest `/new-project <name>`.\n- If artifact wikilinks point to missing files, note them as \"not yet created.\"",
  "custom": true
},{
  "name": "research-accessible-component",
  "category": "Accessibility",
  "description": "Research accessibility patterns for a UI component before writing Penny guidelines. Use when the user says `/research-accessible-component`.",
  "content": "---\nname: research-accessible-component\ncategory: Accessibility\ndescription: Research accessibility patterns for a UI component before writing Penny guidelines. Use when the user says `/research-accessible-component`.\n---\n\n# Research Accessible Component\n\nResearch how trusted accessible design systems implement a component, then synthesize findings into a structured document that feeds `/draft-guideline`.\n\n## When to Use\n\n- Design System team shares a new or updated component (Figma or Jira)\n- Deciding between competing ARIA patterns (e.g., `role=\"status\"` vs `role=\"progressbar\"`)\n- Before writing or updating a Penny accessibility guideline\n- Spinner, Button loading state, Toast, or any new component in the 30-day plan\n\n## Steps\n\n### 1. Receive Input\n\nAccept: `ComponentName` (required), Figma link (optional), Jira ticket (optional), notes from Design System (optional).\n\n### 2. Audit Penny\n\nCheck `~/penny/packages/penny/src/components/[ComponentName]/` for:\n- Current ARIA roles, properties, and states in use\n- Any existing accessibility comments or annotations\n- Props that control accessibility behavior\n\nIf the component doesn't exist yet in Penny, note: \"Not yet implemented — new component.\"\n\n### 3. Research Reference Sources (in parallel)\n\n**REQUIRED SUB-SKILL:** Use `firecrawl:firecrawl-cli` for all web fetches.\n\nSearch each source for the component. Use the component's common alias if needed (e.g., Spinner = Loading Indicator = Progress Indicator).\n\n| Source | URL pattern | Focus |\n|--------|-------------|-------|\n| **APG (W3C)** | `w3.org/WAI/ARIA/apg/patterns/` | ARIA role, keyboard contract, live region spec |\n| **Carbon (IBM)** | `carbondesignsystem.com/components/[name]/accessibility` | Enterprise implementation, screen reader behavior |\n| **Material UI** | `mui.com/material-ui/react-[name]/` | ARIA attrs, keyboard behavior, React implementation |\n| **gov.uk Design System** | `design-system.service.gov.uk/components/[name]` | Evidence-based rationale, user-tested decisions |\n| **Adobe React Spectrum** | `react-spectrum.adobe.com/react-aria/` | React Aria primitives, accessibility props |\n| **Radix UI** | `radix-ui.com/primitives/docs/components/[name]` | Headless, accessibility-first primitives |\n\nFor each source, capture:\n- ARIA role(s) used\n- Keyboard interaction model\n- How the component announces to screen readers\n- Live region usage (yes/no, `aria-live` value)\n- WCAG success criteria referenced\n- Anything surprising or worth noting\n\nIf a source doesn't have the component, write \"Not found — [reason if known]\" (this is meaningful data).\n\n### 4. Create Research Document\n\nSave to `~/elli-vault/Research/[ComponentName].md`:\n\n```markdown\n# [ComponentName] Accessibility Research\n\n#research #component\n\n**Date:** YYYY-MM-DD\n**Status:** Research\n**Figma:** [link or —]\n**Jira:** [ticket or —]\n\n---\n\n## Penny Current State\n\n[What exists in Penny today, or \"Not yet implemented — new component.\"]\n\n---\n\n## APG Pattern\n\n**Pattern name:** [e.g., \"progressbar\", \"status\"]\n**ARIA role:** `role=\"[role]\"`\n**Keyboard:** [key interactions, or \"No keyboard interaction — passive element\"]\n**Live region:** [yes/no — `aria-live=\"polite\"` / `aria-atomic` / etc.]\n**WCAG criterion:** [e.g., 4.1.3 Status Messages (AA)]\n**Spec URL:** [APG link]\n\n---\n\n## Reference Implementations\n\n### Carbon (IBM)\n**Pattern:** [summary]\n**Screen reader:** [how it announces]\n**Notable:** [anything best-practice or surprising]\n**Source:** [URL]\n\n### Material UI\n**Pattern:** [summary]\n**Screen reader:** [how it announces]\n**Notable:** [anything best-practice or surprising]\n**Source:** [URL]\n\n### gov.uk Design System\n**Pattern:** [summary or \"Not found\"]\n**Research rationale:** [if they documented why they made their choice]\n**Source:** [URL]\n\n### Adobe React Spectrum\n**Pattern:** [summary]\n**Primitives used:** [React Aria hooks/components]\n**Source:** [URL]\n\n### Radix UI\n**Pattern:** [summary or \"Not found\"]\n**Source:** [URL]\n\n---\n\n## Pattern Comparison\n\n| Pattern | Role | Live Region | SR Announcement | Used by |\n|---------|------|-------------|-----------------|---------|\n| Option A | `role=\"status\"` | `aria-live=\"polite\"` | visually hidden text | Carbon, gov.uk |\n| Option B | `role=\"progressbar\"` | — | `aria-label` + value props | MUI, Spectrum |\n\n---\n\n## Recommendation\n\n**Recommended pattern:** [pattern name]\n**Rationale:** [why — APG guidance + real-world validation from reference sources]\n**WCAG criterion:** [e.g., 4.1.3 Status Messages]\n**For Penny:** [specific implementation notes — props needed, default behavior]\n**Outstanding questions for Design System team:** [list or \"None\"]\n\n---\n\n## Next Step\n\nRun `/draft-guideline [ComponentName]` using this research as input.\n```\n\n### 5. Surface Recommendation\n\nPresent the comparison table and recommendation. Ask:\n- \"Does this pattern match what Design System is planning in Figma?\"\n- \"Any edge cases or variants (e.g., inline spinner vs. full-page) we need to handle?\"\n- \"Should I also check [Chakra / Headless UI / another source]?\"\n\n### 6. Handoff\n\nOnce confirmed → automatically run `/draft-guideline [ComponentName]` or prompt: \"Ready to create the accessibility guideline — run `/draft-guideline [ComponentName]`.\"\n\n---\n\n## Source Priority\n\nAPG is the primary authority. Use it to anchor every pattern decision.\ngov.uk often has documented user research behind their choices — cite it when recommending.\nAdobe React Aria is the best reference for React-specific implementation details.\nCarbon and MUI validate that a pattern works at scale in production.\nRadix UI shows headless, accessibility-first primitives useful for Penny's architecture.\n\n## Notes\n\n- If a component is not in gov.uk, note it — their absence is meaningful (it may be too complex or contested)\n- Save research before drafting — the Research file is the paper trail for Design System decisions\n- Tag the research file `#research #component` and add a row to `~/elli-vault/Research/_index.md` if it exists\n- Cross-reference any related Decisions.md entries (e.g., \"Button loading state\" research may inform Spinner)",
  "custom": true
},{
  "name": "session-retrospective",
  "category": "Reporting",
  "description": "Capture session learnings into a retrospective note. Use when the user says `/session-retrospective`, \"what did we learn\", or \"session recap\".",
  "content": "---\nname: session-retrospective\ncategory: Reporting\ndescription: Capture session learnings into a retrospective note. Use when the user says `/session-retrospective`, \"what did we learn\", or \"session recap\".\n---\n\n# Session Retrospective\n\nAnalyze the current Claude Code session and decide whether to save a structured retrospective to `~/elli-vault/Retrospectives/`.\n\n**Scope:** This skill produces the *narrative* of what happened — the story, decisions, mistakes, discoveries. It does NOT update `CLAUDE.md` (that's `revise-claude-md`) or `MEMORY.md` (that's auto-memory).\n\n**Important:** Only write detailed retrospectives when there are meaningful learnings, pivots, or decisions to document. Skip verbose retrospectives for straightforward execution work (implement spec → verify → test). Git commit history is sufficient documentation for clean sessions.\n\n## Steps\n\n0. **Assess if a retrospective is needed**\n   - **Skip if:** Session was straightforward execution (implement to spec → verify → test), no major pivots, learnings already in memory\n   - **Write if:** Multiple course corrections, architectural decisions, significant mistakes/learnings, cross-cutting discoveries\n   - If skipping: confirm with user that git history is sufficient documentation\n\n1. **Identify the source**\n   - **Current session:** analyze the conversation history already in context — no file reading needed\n   - **Past session (if user specifies a date/topic):** find the JSONL with:\n     ```bash\n     ls -t ~/.claude/projects/-Users-elizabethpatrick-elli-vault/*.jsonl | head -1\n     ```\n     Read only the user messages and tool results (JSONL files are large — grep for `\"role\":\"user\"` lines if needed)\n\n2. **Analyze the session** — identify:\n   - Main topic and starting goal\n   - Key decisions and turning points\n   - Problems encountered and how they were resolved\n   - New techniques, patterns, or commands discovered\n   - Mistakes or corrections (user rejections, course changes, wrong assumptions)\n   - Unresolved questions or open follow-ups\n\n3. **Generate the retrospective** using this template:\n   ```markdown\n   #retrospective\n\n   # Session Retrospective: [Descriptive Topic]\n   **Date:** YYYY-MM-DD\n\n   ## TL;DR\n   [1–2 sentences]\n\n   ## What We Worked On\n   [Goal and starting context]\n\n   ## Journey\n   [Chronological steps, pivots, challenges — bullet points preferred]\n\n   ## Mistakes & Corrections\n   [What went wrong and how we recovered — include specific error messages, file paths, wrong turns]\n\n   ## Techniques Discovered\n   [New patterns, commands, or approaches worth reusing]\n\n   ## Open Questions / Follow-ups\n   [Unresolved items, next steps]\n   ```\n\n   The **Mistakes & Corrections** section is the most valuable — be specific. \"I tried X and it broke because Y\" is more useful than a success story.\n\n4. **Confirm the filename** — show the proposed path:\n   ```\n   File: Retrospectives/YYYY-MM-DD-[slug].md\n   ```\n   Ask: \"Does this look right?\"\n\n5. **Save** — on confirmation, write to `~/elli-vault/Retrospectives/YYYY-MM-DD-[slug].md`\n\n6. **Identify one persist-worthy learning** — scan the retrospective for something that would change future behavior or reference.\n\n   **Before proposing, state your reasoning explicitly:**\n   - Is this project-specific or global? Project-specific → `CLAUDE.md`. Global/behavioral → `MEMORY.md`.\n   - Is it already documented in either file? If yes, say so and skip.\n   - `CLAUDE.md` = project rules, conventions, architectural contracts, workflow instructions (\"always do X here\")\n   - `MEMORY.md` = things about Elli, the team, or behavioral corrections that apply across all projects\n\n   Then:\n   - Present **exactly one recommendation** — CLAUDE.md *or* MEMORY.md, not both\n   - Show the precise text to insert, including which section\n   - Ask for confirmation before writing anything\n\n7. **Triage open follow-ups** — for each item in \"Open Questions / Follow-ups\":\n\n   **Quick wins** (can be done right now in < 5 min — a comment, a rename, a missing guard, a small doc fix):\n   - Fix them immediately without asking\n   - Note what was fixed at the end of the response\n\n   **Non-trivial tasks** (require design, testing, or meaningful code changes):\n   - Add to `Dashboard/improvements.md` under the `## From Retrospectives` section\n   - Format: `- [ ] [item text]`\n   - Do NOT offer \"want me to add this?\" — just add them\n\n   **Do not save quick wins to the improvements dashboard.** The improvements list is for real backlog items only.\n\n## File locations\n- Retrospectives: `~/elli-vault/Retrospectives/YYYY-MM-DD-[slug].md`\n- Session JSONL: `~/.claude/projects/-Users-elizabethpatrick-elli-vault/*.jsonl`\n- CLAUDE.md: `~/elli-vault/CLAUDE.md`\n- MEMORY.md: `~/.claude/projects/-Users-elizabethpatrick-elli-vault/memory/MEMORY.md`\n\n## Naming convention\n`YYYY-MM-DD-[short-slug].md`\n\nExamples:\n- `2026-03-09-session-retrospective-skill.md`\n- `2026-02-25-button-loading-pattern.md`\n- `2026-03-05-dashboard-semantic-tokens.md`\n\n## Notes\n- Tag every file with `#retrospective` on line 1\n- Do NOT duplicate content already in `CLAUDE.md` or `MEMORY.md` — the retrospective is the story, not the reference\n- Keep everything scannable: prefer bullet points over prose paragraphs\n- Dates are ISO format: YYYY-MM-DD",
  "custom": true
},{
  "name": "switch-model",
  "category": "Utility",
  "description": "Use when the user says /switch-model or wants to change which Claude model to use for cost or quality reasons.",
  "content": "---\nname: switch-model\ncategory: Utility\ndescription: Use when the user says /switch-model or wants to change which Claude model to use for cost or quality reasons.\n---\n\n# Switch Model\n\nWhen invoked as `/switch-model [haiku|sonnet|opus]`, respond with the model info and restart command for that model. If no argument given, show the full table and ask which to use.\n\n## Model Table\n\n| Name | Model ID | Input $/1M | Output $/1M | vs Sonnet savings | Best for |\n|------|----------|-----------|------------|------------------|---------|\n| **Haiku** | `claude-haiku-4-5` | $1.00 | $5.00 | **67% cheaper** (input) / **67% cheaper** (output) | Tagging, classification, simple extraction, action item parsing |\n| **Sonnet** | `claude-sonnet-4-6` | $3.00 | $15.00 | — baseline (current) | Guidelines, analysis, meeting processing, dashboard tasks |\n| **Opus** | `claude-opus-4-6` | $5.00 | $25.00 | 67% more expensive | Complex WCAG reasoning, multi-step compliance decisions |\n\n**Haiku vs Sonnet in plain terms:** Same 10K-token task costs ~$0.06 on Sonnet, ~$0.02 on Haiku. For batch work (100 meeting notes), that's ~$6 vs ~$2.\n\n## To Switch in Claude Code CLI\n\nModel is set at startup — restart with:\n\n```bash\n# Haiku (cheapest)\nclaude --model claude-haiku-4-5\n\n# Sonnet (default, balanced)\nclaude --model claude-sonnet-4-6\n\n# Opus (most powerful)\nclaude --model claude-opus-4-6\n```\n\n## To Use a Different Model in Dashboard API Calls\n\n```typescript\n// In actions/ or lib/ files\nconst response = await anthropic.messages.create({\n  model: \"claude-haiku-4-5\",  // swap here\n  max_tokens: 1024,\n  messages: [...]\n})\n```\n\n## Quick Decision Guide\n\n- Extracting action items from a meeting note → **Haiku**\n- Tagging a clipping → **Haiku**\n- Writing an accessibility guideline → **Sonnet**\n- Processing a meeting transcript → **Sonnet**\n- Interpreting a nuanced WCAG failure → **Opus**\n- Batch processing many notes → **Haiku** (+ Batches API for 50% off)",
  "custom": true
},{
  "name": "tag-clipping",
  "category": "Vault",
  "description": "Tag a clipping file with relevant topic tags. Use when the user says `/tag-clipping`.",
  "content": "---\nname: tag-clipping\ncategory: Vault\ndescription: Tag a clipping file with relevant topic tags. Use when the user says `/tag-clipping`.\n---\n\n# Tag Clipping\n\nAnalyze a clipping's content and propose a refined tag set: keep category tags intact, add audience tags + 1–3 specific topic tags.\n\n## Tag Taxonomy\n\n### Category tags — ALWAYS preserve if present (drive dashboard filter sections)\n- `apg` → ARIA / APG content\n- `WCAG` → WCAG standards and guidelines\n- `design-system` → Design systems, component libraries\n- `testing` → Accessibility testing and auditing\n- `AI` → Any AI content (tools, models, LLMs, RAG, Claude, etc.)\n- `legal` → Legal content (ADA law, compliance, lawsuits, regulation)\n- `Fiserv` → Fiserv partner-specific content\n- `productivity` → Non-accessibility content (Claude Code tools, Obsidian, personal workflow)\n\n### Audience tags — add when the content clearly targets a specific role\n- `developers` — keyboard patterns, ARIA roles, code, testing tools, dev-focused guides\n- `designers` — design systems, visual patterns, color/contrast, UX, Figma\n- `content` — naming/descriptions, screen reader text, writing for a11y, copy\n- `product` — business case, ROI, legal/compliance framing, user impact, strategy\n\n### Topic tags — add 1–3 that best describe the specific subject\n- `keyboard` — keyboard navigation, focus management, tab order, shortcuts\n- `screen-reader` — AT announcements, live regions, verbosity, NVDA/JAWS/VoiceOver\n- `naming` — accessible names, descriptions, labels, aria-label, aria-labelledby\n- `roles` — ARIA roles, semantics, landmark regions, structural roles\n- `ARIA` — ARIA authoring, attributes, patterns (keep uppercase)\n- `color-contrast` — contrast ratios, color use, visual distinction\n- `motion` — animation, transitions, reduced motion, prefers-reduced-motion\n- `mobile` — touch targets, gesture, iOS/Android, mobile-specific patterns\n- `forms` — form controls, validation, error messages, fieldset/legend\n- `patterns` — component patterns, design patterns, interaction models\n- `conference` — conference talks, webinars, presentations, recorded sessions\n- `testing` — auditing, automated testing, manual testing, axe, screen reader testing\n- `research` — academic or industry research, case studies, data\n- `spinner` — loading indicators, progress, status updates\n- `overlays` — accessibility overlays, overlay tools (plural — not `overlay`)\n- `RAG` — retrieval-augmented generation\n- `TTS` — text-to-speech, speech synthesis\n- `business` — business case, ROI, organizational strategy\n- `user` — user stories, real user impact, lived experience\n- `skills` — Claude skills, MCP, AI agent tooling\n- `obsidian` — Obsidian PKM, vault management, templates\n\n## Steps\n\n### Single file mode: `/tag-clipping [filename]`\n\n1. **Find the file** — look in `~/elli-vault/Clippings/`. Accept partial name (e.g. \"keyboard\" → \"Developing a Keyboard Interface.md\"). If ambiguous, list matches and ask.\n\n2. **Read the file** — extract:\n   - `title` from frontmatter\n   - `description` from frontmatter\n   - `tags` (existing) from frontmatter\n   - First 600 characters of body content (after the closing `---`)\n\n3. **Reason about tags** — considering title + description + body snippet:\n   - Keep all existing category tags\n   - Add audience tag(s) where the target audience is clear (can be more than one)\n   - Choose 1–3 topic tags from the taxonomy above that best fit\n   - Do NOT invent tags outside the taxonomy\n\n4. **Propose** — show the user:\n   ```\n   Current tags: [existing tags]\n   Proposed tags: [category tags kept] + [audience tags] + [topic tags]\n   ```\n   Ask: \"Apply these tags? (yes / edit / skip)\"\n\n5. **Apply if approved** — rewrite the `tags:` block in the YAML frontmatter. Format:\n   ```yaml\n   tags:\n     - tag1\n     - tag2\n   ```\n\n---\n\n### Bulk mode: `/tag-clipping --all`\n\nRun the single-file flow for all .md files in `~/elli-vault/Clippings/` except `Index.md`.\n\nFor efficiency, batch-propose all files at once:\n- Show a table: filename | current tags | proposed tags\n- Ask: \"Apply all? Or list numbers to skip (e.g. 2,5)?\"\n- Apply approved ones, skip the rest.\n\n---\n\n### New files mode: `/tag-clipping --new`\n\nOnly process files that are under-tagged (missing audience tags, or fewer than 3 non-category tags).\nUse this after adding new clippings to catch anything that slipped through.\n\n---\n\n## Notes\n- **Never remove** a category tag (`apg`, `WCAG`, `design-system`, `testing`, `AI`, `legal`, `Fiserv`, `productivity`) — these control dashboard filtering. Do not add or remove `ADA` or `ai-a11y` (retired tags).\n- If a clipping already has good audience + topic tags, say so and skip\n- Tags are case-sensitive in the YAML — use lowercase for all topic tags, keep existing case for category tags (e.g. `WCAG`, `AI`, `ARIA`, `Fiserv`)\n- `productivity` files (Claude tools, Obsidian, etc.) don't need a11y topic tags\n- AI content about accessibility: use both `AI` + `a11y` topic tags — no combined tag needed",
  "custom": true
},{
  "name": "transcribe-meeting",
  "category": "Meetings",
  "description": "Checklist for transcribing a meeting recording via Ivrit AI and preparing it for processing. Use when the user says `/transcribe-meeting` or has a new recording to transcribe.",
  "content": "---\nname: transcribe-meeting\ncategory: Meetings\ndescription: Checklist for transcribing a meeting recording via Ivrit AI and preparing it for processing. Use when the user says `/transcribe-meeting` or has a new recording to transcribe.\n---\n\n# Transcribe Meeting\n\n> **Status: On hold.** Transcription is currently done outside the vault. This skill documents the intended future workflow.\n\nChecklist for getting a recording from phone → vault, ready for `/process-meeting`.\n\n## Steps\n\n1. **Locate the recording** — ask which recording to transcribe. Check:\n   - `~/Desktop/Melio/Recordings/` (downloaded from Google Drive)\n   - Or ask the user to paste/upload the file\n\n2. **Transcribe via Ivrit AI** — this is an external step the user does manually:\n   - Go to [Ivrit AI](https://ivrit.ai) (or whichever transcription service)\n   - Upload the audio file or paste the Google Drive link\n   - Wait for transcription to complete\n   - Copy the full transcript text\n\n3. **Save to vault** — save the raw transcript to `~/elli-vault/Meetings/Transcriptions/[Meeting with Name].md`\n   - Naming: `Meeting with [Participant Name].md` (match the recording filename if possible)\n   - Keep the raw text as-is — no editing or formatting\n\n4. **Update the index** — check `~/elli-vault/Meetings/_index.md`:\n   - If a \"pending transcription\" row exists for this meeting, note its position\n   - If no row exists, add one with: Date, Participants, Topics (`—`), Summary (`_pending transcription_`), Extracted (`—`), Score (`—`), Recording filename\n\n5. **Offer next step** — ask: \"Ready to process this meeting? I'll run /process-meeting.\"\n\n## Notes\n- Recordings stay on Desktop — never import large audio/video files into the vault\n- The `Meetings/Transcriptions/` folder must never be deleted, even if empty\n- Hebrew recordings are common — Ivrit AI handles Hebrew natively",
  "custom": true
}],
  portfolio: [{"category":"a11y","description":"One-repo accessibility engineering toolkit: audit panel, UX tools, skills, MCP, docs.","language":"JavaScript","name":"a11y-engineering-toolkit","topics":["accessibility","bookmarklet","javascript","qa","tooling"],"updated":"2026-04-09T07:45:45Z","url":"https://github.com/Elizabeth1979/a11y-engineering-toolkit"},{"category":"a11y","description":"MCP server that gives AI coding assistants accessibility expertise. Reviews code, suggests fixes, provides WAI-ARIA patterns.","language":"Python","name":"a11y-expert-mcp","topics":[],"updated":"2026-04-07T11:40:35Z","url":"https://github.com/Elizabeth1979/a11y-expert-mcp"},{"category":"a11y","description":null,"language":"HTML","name":"a11y-first-ext","topics":[],"updated":"2024-01-26T06:41:44Z","url":"https://github.com/Elizabeth1979/a11y-first-ext"},{"category":"a11y","description":"An intro workshop on accessibility for feds","language":"JavaScript","name":"a11y-for-feds-intro","topics":[],"updated":"2025-07-07T06:38:49Z","url":"https://github.com/Elizabeth1979/a11y-for-feds-intro"},{"category":"a11y","description":"Accessibility skills to enhance accessibility of an digital product","language":null,"name":"a11y-skills","topics":[],"updated":"2026-01-04T13:53:54Z","url":"https://github.com/Elizabeth1979/a11y-skills"},{"category":"a11y","description":"WCAG 2.1 AA accessibility validation for web developers - no false positives","language":"Python","name":"accessibility-validator","topics":[],"updated":"2025-10-24T15:35:19Z","url":"https://github.com/Elizabeth1979/accessibility-validator"},{"category":"a11y","description":null,"language":"JavaScript","name":"accessible-search","topics":[],"updated":"2024-12-07T20:06:24Z","url":"https://github.com/Elizabeth1979/accessible-search"},{"category":"tools","description":null,"language":"JavaScript","name":"aleph-zero-dashboard","topics":[],"updated":"2026-04-11T06:15:43Z","url":"https://github.com/Elizabeth1979/aleph-zero-dashboard"},{"category":"a11y","description":null,"language":"TypeScript","name":"alt-generation-claude","topics":[],"updated":"2024-11-19T10:36:20Z","url":"https://github.com/Elizabeth1979/alt-generation-claude"},{"category":"tools","description":null,"language":"JavaScript","name":"bookmarklets","topics":[],"updated":"2025-06-28T14:23:38Z","url":"https://github.com/Elizabeth1979/bookmarklets"},{"category":"tools","description":"AI-powered accessibility issue tracker - converts screenshots to WCAG-compliant tickets","language":"TypeScript","name":"clip-to-ticket","topics":[],"updated":"2026-01-11T21:52:42Z","url":"https://github.com/Elizabeth1979/clip-to-ticket"},{"category":"meta","description":"Accessibility \u0026 Web Engineering Digital Garden built with Quartz","language":null,"name":"e11i-garden","topics":[],"updated":"2026-01-03T17:24:39Z","url":"https://github.com/Elizabeth1979/e11i-garden"},{"category":"meta","description":"Config files for my GitHub profile.","language":null,"name":"Elizabeth1979","topics":["config","github-config"],"updated":"2022-06-17T08:55:01Z","url":"https://github.com/Elizabeth1979/Elizabeth1979"},{"category":"meta","description":null,"language":"HTML","name":"Elizabeth1979.github.io","topics":[],"updated":"2022-06-17T08:46:42Z","url":"https://github.com/Elizabeth1979/Elizabeth1979.github.io"},{"category":"personal","description":null,"language":"HTML","name":"english-for-kids","topics":[],"updated":"2022-11-17T12:05:29Z","url":"https://github.com/Elizabeth1979/english-for-kids"},{"category":"personal","description":null,"language":"JavaScript","name":"family-travels","topics":[],"updated":"2025-12-14T11:20:45Z","url":"https://github.com/Elizabeth1979/family-travels"},{"category":"personal","description":"A web-based 3D house builder game for kids. Built with Vite + React + TypeScript + Three.js","language":"TypeScript","name":"fun-building","topics":[],"updated":"2026-04-09T18:31:05Z","url":"https://github.com/Elizabeth1979/fun-building"},{"category":"personal","description":null,"language":"HTML","name":"grandma-war","topics":[],"updated":"2025-10-25T07:50:52Z","url":"https://github.com/Elizabeth1979/grandma-war"},{"category":"personal","description":"Educational games for kids - Hebrew alphabet learning with phonetics and drawing canvas","language":"TypeScript","name":"kids-games","topics":[],"updated":"2025-12-31T13:19:16Z","url":"https://github.com/Elizabeth1979/kids-games"},{"category":"tools","description":"AI-powered meeting summarizer using Next.js 14 and Ollama (llama3.2). Transform messy meeting transcripts into clean summaries with text, file upload, and audio recording support.","language":"TypeScript","name":"meeting-summarizer","topics":[],"updated":"2025-12-31T13:44:47Z","url":"https://github.com/Elizabeth1979/meeting-summarizer"},{"category":"tools","description":null,"language":"Python","name":"nano-banana","topics":[],"updated":"2025-09-05T21:17:19Z","url":"https://github.com/Elizabeth1979/nano-banana"},{"category":"a11y","description":"CLI screen reader for any webpage — powered by Virtual Screen Reader + Playwright","language":"JavaScript","name":"screen-reader-cli","topics":[],"updated":"2026-04-10T19:26:00Z","url":"https://github.com/Elizabeth1979/screen-reader-cli"},{"category":"a11y","description":"Screen Reader Visualizer - Accessibility testing tool with virtual SR simulation, WCAG violation detection, and AI-powered fix suggestions","language":"JavaScript","name":"sr-visualizer","topics":[],"updated":"2025-12-25T20:39:14Z","url":"https://github.com/Elizabeth1979/sr-visualizer"},{"category":"tools","description":null,"language":"TypeScript","name":"track-your-progress","topics":[],"updated":"2023-08-05T15:10:48Z","url":"https://github.com/Elizabeth1979/track-your-progress"},{"category":"a11y","description":null,"language":"TypeScript","name":"TTS","topics":[],"updated":"2025-12-31T13:19:50Z","url":"https://github.com/Elizabeth1979/TTS"},{"category":"a11y","description":"Visua11y: accessibility helper browser extension","language":"JavaScript","name":"visua11y","topics":[],"updated":"2025-09-13T10:26:07Z","url":"https://github.com/Elizabeth1979/visua11y"},{"category":"a11y","description":null,"language":"Python","name":"wcag-alt-generator","topics":[],"updated":"2024-11-20T11:34:58Z","url":"https://github.com/Elizabeth1979/wcag-alt-generator"}],
  agent: {"status":"ok","timestamp":"2026-04-11T12:35:38.042Z"},
  generated: "2026-04-11T12:35:38Z"
};
