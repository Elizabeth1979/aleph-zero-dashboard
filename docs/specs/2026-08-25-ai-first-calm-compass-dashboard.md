# AI-First Calm Compass Dashboard Redesign

**Status:** Draft for Elli's review  
**Date:** 2026-08-25  
**Mode:** Personal tool / builder project  
**Chosen direction:** Calm Compass concentric canvas  
**Reference mockups:** `sketches/calm-compass/`

## 1. Problem statement

The current dashboard was created before Hermes Desktop existed. Its original purpose was to expose nearly every configuration file, skill, session, memory store, cron job, and integration through a public static site. Hermes Desktop now handles much of that administration directly.

The result is an 18-card homepage with overlapping technical and personal concerns. It reports many totals but does not reliably answer Elli's primary question:

> What needs my attention today, and why?

For an ADHD user, equal visual weight creates decision work. Technical health, projects, personal tasks, resources, memory statistics, and setup documentation should remain discoverable, but should not compete equally with the next useful action.

The replacement must remain a read-only visual replica of Elli's personal system and Hermes setup. Discord remains the place for questions and commands.

## 2. Product principles

1. **One decision first.** The centre always answers “Start here.”
2. **Everything relevant remains visible.** The complete system is represented through stable concentric layers.
3. **AI must improve decisions.** It prioritizes, explains, connects, detects change, and learns cautiously. It does not generate decoration.
4. **Predictability beats novelty.** Ring positions and labels remain stable; AI changes emphasis and content, not basic navigation.
5. **Read-only web interface.** Commands, corrections, and external actions happen in Discord.
6. **Private by default.** Personal daily data requires authentication and is never emitted into a public client bundle.
7. **Deterministic fallback.** The dashboard stays useful when the model, Google APIs, or the morning job fails.
8. **No duplicate administration.** Hermes Desktop owns detailed configuration, memory, session, skill, model, and cron management.

Microsoft HAX recommends contextually relevant information, accessible explanations, granular feedback, and cautious adaptation.[1]

Google PAIR recommends explanations that help users move forward, feedback and correction, and retained user control.[2]

W3C guidance for cognitive accessibility emphasizes clear structure, focus, and predictable interaction.[3]

## 3. Information architecture

The dashboard is one interactive canvas with three concentric rings.

### 3.1 Centre — Start here

The centre contains:

- One recommended next action
- A human-readable due date or timing reason when available
- Estimated effort: quick, medium, or deep
- A one-sentence “Why now?” explanation
- Two alternatives:
  - **Quick win** — useful in approximately 5–15 minutes
  - **Continue** — resume meaningful recent work

Only one item can occupy the centre. Alternatives appear in the selected detail sheet, not as competing centre cards.

### 3.2 Ring 1 — Today

Stable nodes:

- **To-dos** — every open personal to-do, with urgent/due count
- **Calendar** — today plus tomorrow morning
- **Email** — only messages requiring a reply, decision, payment, deadline, or security check
- **New resources** — saved items waiting for review
- **System health** — genuine failures or “Clear”
- **Someday** — intentionally parked ideas, visually quiet

Healthy or empty nodes remain visible as “Clear.” This confirms the source was checked and avoids ambiguity.

### 3.3 Ring 2 — Your world

Stable nodes:

- Projects and next steps
- Knowledge and saved resources
- Portfolio and published work
- Progress and weekly review
- Ideas and learnings
- Personal patterns

### 3.4 Ring 3 — Hermes setup

Stable nodes:

- Automations
- Planner, builder, and reviewer workers
- Models and fallback routing
- Built-in memory and synchronization
- Integrations
- Skills
- Mac gateway and Mac scheduler health
- Private access status

These are sanitized summaries. Detailed configuration remains in Hermes Desktop.

## 4. Interaction design

### 4.1 Desktop

- Full three-ring canvas fits in one viewport without scrolling.
- Selecting a node highlights it and opens a right-side detail sheet.
- `Fit all` restores the complete overview.
- Keyboard users can tab through nodes in ring order and press Enter or Space to select.
- Browser back restores the previous zoom, layer, and selection.

### 4.2 Android

A full three-ring diagram would force unreadably small text. Mobile therefore preserves the canvas model through three fixed tabs:

- Today
- My world
- Setup

The default is Today. Each tab shows one readable ring around the centre. Selecting a node opens a bottom sheet. Primary touch targets are at least 44px.

### 4.3 Discord handoff

Every detail sheet can show:

- A suggested question
- A `Copy question` control
- An `Open Discord` link to `#general` or the relevant known thread

The dashboard does not execute commands, complete tasks, edit priorities, or send messages.

## 5. Full Context Engine

The Context Engine is a separate, tested data layer. The canvas renders its output and contains no prioritization logic.

### 5.1 Outputs

The typed snapshot contains:

- `focus` — Start here recommendation
- `why` — concise explanation and evidence references
- `effort` — quick, medium, or deep
- `quick_win` — alternative short action
- `continue` — recent meaningful work to resume
- `changes` — changes since the previous successful snapshot
- `connections` — useful cross-links between tasks, resources, projects, email, and portfolio items
- `anomalies` — failures, conflicts, staleness, or overload
- `rings` — stable nodes with counts, labels, status, and detail records
- `uncertainty` — missing or stale sources
- `generated_at` and per-source timestamps
- `fallback_mode` — whether AI or deterministic ranking produced the snapshot

### 5.2 Focus ranking

The model considers:

1. Overdue
2. Due today
3. Due soon
4. Explicitly urgent
5. Calendar constraints
6. Actionable email
7. Blockers and dependencies
8. Repeated postponement
9. Recently created resources related to active projects
10. Meaningful recent work that can be resumed

It may not invent urgency, deadlines, effort, dependencies, or completion state. Every load-bearing recommendation must point to source fields.

### 5.3 What changed

The engine diffs the last two valid snapshots and reports only meaningful changes, such as:

- New or completed tasks
- Deadlines moving into the due-soon window
- New actionable email
- New resources
- Project tasks becoming blocked or unblocked
- Automation failures or recovery
- Setup changes that affect user-visible behavior

Static counts without change are omitted from this summary.

### 5.4 Intelligent connections

Connections are suggestions, never silent mutations. Examples:

- Resource → related project task
- Email → related personal task
- Research → potential blog material
- Completed project work → possible portfolio entry
- Open thread → unresolved decision
- Multiple resources → one review batch

Each connection includes a short reason and source identifiers.

### 5.5 Anomaly detection

Deterministic rules detect:

- Failed cron execution or delivery
- Stale synchronization or snapshot data
- Gateway/scheduler ownership mismatch
- Duplicate reminders
- Missing source files
- Too many urgent tasks
- Conflicting dates
- A commitment without a next action

AI may summarize anomalies but does not decide whether a system is healthy.

### 5.6 Continuity

The engine tracks:

- Last selected dashboard node
- Recent approved design or project decision
- Last meaningful project worked on
- Tasks completed, postponed, or ignored
- Open Discord threads with unresolved decisions

The `Continue` suggestion must cite this recent activity. Raw session transcripts are not exposed to the browser.

### 5.7 Cautious personalization

The system can learn from:

- Which recommendations are completed first
- Repeated postponement
- Which projects Elli asks about
- Explicit Discord corrections
- Whether quick wins or deeper work are more useful at certain times

Personalization changes ranking weights slowly. It does not move ring positions, hide categories, rename nodes, or automatically rewrite priorities. Explicit corrections override inferred preferences.

Personalization state is inspectable as simple preference records, not an opaque profile.

### 5.8 Failure behavior

If the AI call fails or returns invalid data:

- Use deterministic due-date and urgency ordering.
- Show `AI summary unavailable` in the detail sheet, not as a warning banner.
- Preserve the previous valid connections and mark them stale.
- Never leave the centre empty when an open task exists.
- If all personal sources are empty, show a calm `Nothing needs attention` centre.

## 6. Data sources and freshness

### 6.1 Personal sources

- `tasks.json`
- `projects.json`
- `resources.json`
- `portfolio.json`
- `someday.json`
- Project 001 insights
- Knowledge metadata
- Commitments and pending replies

### 6.2 Live sources

- Google Calendar
- Gmail action-item triage
- Mac cron execution/delivery state
- Mac gateway and scheduler state
- One-way synchronization state
- Kanban board state

### 6.3 Snapshot generation

The existing Mac Morning Brief reasoning run is extended to produce both:

1. The concise Discord morning message
2. A validated private dashboard snapshot

This avoids a duplicate model call. A deterministic collector creates the source payload first. The model receives curated metadata, not raw credentials or unrelated email bodies.

When dashboard-owned data changes later in the day, the deterministic snapshot is refreshed immediately. AI-derived focus is refreshed through a change-gated monitor only when meaningful inputs change, preventing unnecessary Codex runs.

## 7. Technical architecture

### 7.1 Application

- Next.js with TypeScript
- Server components for private snapshot reading
- SVG-based responsive canvas
- No canvas library in version one; geometry remains testable and accessible
- Existing JSON files remain source-of-truth during migration
- A typed schema validates the private snapshot at build/runtime boundaries

### 7.2 Hosting and authentication

- Vercel deployment from the private repository
- Auth.js Google authentication
- Access restricted to `el.patrick79@gmail.com`
- Persistent session on approved Mac and Android browsers
- Unauthenticated routes expose only the sign-in screen and static branding
- Personal snapshot data remains server-only and is not written to `public/` or client JavaScript bundles

### 7.3 Publishing

The Mac updates the validated private snapshot in the private GitHub repository and triggers Vercel deployment. The publish script must pull before writing to avoid divergence.

No new database is required in version one. Snapshot history is a bounded JSON file retaining enough prior state for `What changed` and personalization evidence.

### 7.4 Migration

1. Keep the current GitHub Pages dashboard live during development.
2. Build the new application beside it.
3. Implement the typed snapshot generator before the canvas.
4. Verify authentication and privacy before importing personal data.
5. Verify desktop and Android behavior with real data.
6. Switch the canonical dashboard link only after acceptance checks pass.
7. Archive the old public site after explicit approval; do not delete the repository history.

## 8. Content removed from the web dashboard

The replacement does not expose:

- Raw `.env`
- Authentication records
- OAuth tokens or credential metadata
- Full config file dumps
- Raw session history
- Obsolete ChromaDB data
- Standalone Skills, Config, Sessions, Memory, SOUL, and Credential card pages
- Gateway restart controls
- Accessibility tester overlay
- Daily Easter egg
- 3D card tilt, pointer-following glow, or decorative motion

Sanitized status remains available through the Setup ring.

## 9. Accessibility requirements

- Minimum 14px text; 16px preferred
- Minimum 44px primary mobile targets
- WCAG 2.2 AA minimum; near-AAA text contrast where practical
- No red status colour
- No colour-only status communication
- Visible 2px focus indication with offset
- Logical keyboard order: centre, Today clockwise, Your world clockwise, Setup clockwise, detail sheet
- SVG nodes expose accessible names, roles, and values
- Reduced-motion mode removes zoom transitions
- Screen-reader alternative presents the same rings as hierarchical lists
- Detail sheets use headings and real buttons/links
- Stable labels and predictable interaction

## 10. Testing strategy

### 10.1 Context Engine tests

- Deterministic ranking order
- Missing due dates never become invented deadlines
- AI output schema rejection and fallback
- Evidence references resolve to source records
- Snapshot diff produces only meaningful changes
- Explicit corrections override inferred preferences
- Anomaly rules do not depend on model judgment
- Stale source handling

### 10.2 Privacy tests

- Unauthenticated requests cannot retrieve snapshot data
- Client bundles contain no personal snapshot strings, tokens, config dumps, or email bodies
- Google sign-in rejects non-approved accounts
- Session expiration and logout work
- Logs redact private content

### 10.3 UI tests

- Desktop full-ring fit at common Chrome sizes
- Android Today/My world/Setup tabs at 360px, 390px, and 412px widths
- Keyboard operation and focus order
- Screen-reader list alternative
- 200% text zoom
- Reduced motion
- Empty, stale, loading, fallback, and error states
- Side/bottom sheet state restoration through browser back

### 10.4 End-to-end acceptance

- Morning Brief produces Discord output and a valid dashboard snapshot from one reasoning run
- A Discord task change appears on the dashboard through the canonical publish flow
- One new resource appears in Today and Knowledge
- A simulated cron failure appears as a Setup anomaly
- The model failure path still produces a useful centre recommendation
- No existing production dashboard is removed before the replacement passes

## 11. Success criteria

The redesign is successful when:

1. Elli can identify the recommended next action and reason within five seconds.
2. The complete personal and Hermes system is understandable from the full desktop canvas.
3. Android labels remain readable without showing all three rings simultaneously.
4. Technical health does not compete visually when healthy.
5. Every AI recommendation is explainable and correctable.
6. The dashboard remains useful without AI.
7. Personal data is inaccessible without approved authentication.
8. Discord remains the only command surface.
9. Hermes Desktop remains the administration surface.
10. Current public dashboard remains available until replacement approval.

## 12. Approaches considered

### A. Minimal AI summary

Add Start here, Why, and What changed to the current static dashboard.

- Effort: medium
- Risk: low
- Advantage: fastest
- Rejected because the underlying card grid and public data architecture remain wrong.

### B. Full Context Engine + Calm Compass — selected

Introduce a typed intelligence layer and private concentric canvas while preserving current source files.

- Effort: large
- Risk: medium
- Advantage: meaningful AI-first behavior with a stable, understandable interface

### C. Autonomous personal agent dashboard

Allow the dashboard to complete, postpone, edit, and trigger actions directly.

- Effort: extra large
- Risk: high
- Rejected because it duplicates Discord, weakens user control, adds security scope, and conflicts with the read-only requirement.

## 13. Dependencies and user-gated steps

- Google OAuth credentials for Auth.js
- Vercel environment configuration
- Confirmation of the final production hostname
- Explicit approval before disabling the public GitHub Pages site

## 14. Explicit non-goals

- Replacing Discord
- Replacing Hermes Desktop
- Creating another task database
- Migrating all source JSON files immediately
- Autonomous task execution
- Mood detection
- Public sharing
- Multi-user support
- Real-time collaboration

## Sources

[1] https://www.microsoft.com/en-us/haxtoolkit/library — Microsoft HAX Design Library
    > "Show contextually relevant information"
    > "Make clear why the system did what it did"
    > "Encourage granular feedback"
    > "Update and adapt cautiously"
[2] https://pair.withgoogle.com/guidebook — Google PAIR Guidebook
    > "Focus on giving your users the information they need in the moment, rather than a full run-down of your system."
    > "Give users the opportunity for real-time teaching, feedback and error correction."
    > "Maintaining control over automation helps users build comfort and correct when things go wrong."
[3] https://www.w3.org/WAI/people-use-web/abilities-barriers/cognitive — W3C: Cognitive and learning disabilities
    > "Clearly structured content that helps users focus and find what they need"
    > "Predictable link targets, functionality, and overall interaction"
