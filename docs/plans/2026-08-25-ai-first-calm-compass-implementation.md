# AI-First Calm Compass Dashboard Implementation Plan

> **For Hermes:** Execute this plan on a dedicated Kanban board. Assign implementation cards to `builder`; every card must request same-card review from `reviewer`. Use strict RED → GREEN → REFACTOR and preserve the current public dashboard until cutover approval.

**Goal:** Build a private, responsive Calm Compass dashboard whose tested Context Engine selects and explains what needs Elli’s attention while preserving a complete read-only view of her personal world and Hermes setup.

**Architecture:** A new Next.js application lives under `calm-compass/`, isolated from the legacy static site. A small Python Context Engine on the VPS collects existing JSON/Google/system inputs, performs deterministic ranking/diff/anomaly/connection logic, merges a validated AI overlay from the existing Morning Brief run, and writes a private snapshot. The authenticated Next.js server reads the snapshot and renders an accessible SVG canvas; Discord remains the command surface.

**Tech stack:** Next.js 16.3.2, React 19.2.8, TypeScript 7.0.2, Auth.js (`next-auth` 5.0.0-beta.32), Zod 4.4.3, Vitest 4.1.11, Testing Library 16.3.2, Playwright 1.62.1, Python 3, `jsonschema`, Vercel.

**Approved spec:** `docs/specs/2026-08-25-ai-first-calm-compass-dashboard.md`

**Reference sketch:** `sketches/calm-compass/index.html`

---

## Architecture map

### Components

- `calm-compass/src/lib/snapshot/schema.ts` — canonical Zod snapshot contract and inferred TypeScript types.
- `calm-compass/schema/dashboard-snapshot.schema.json` — generated JSON Schema consumed by Python.
- `scripts/calm_compass/collect.py` — deterministic adapters for dashboard JSON, Google summaries, Kanban, and system status.
- `scripts/calm_compass/engine.py` — pure ranking, diff, anomaly, connection, and cautious-personalization rules.
- `scripts/calm_compass/pipeline.py` — validates inputs/AI overlay, merges deterministic and AI output, retains bounded history, writes atomically.
- `scripts/calm_compass/publish.py` — safe Git pull/update/commit/push for the private snapshot only.
- `calm-compass/src/auth.ts` + `src/proxy.ts` — Google authentication and single-email authorization.
- `calm-compass/src/components/compass/*` — desktop/mobile concentric canvas, accessible list alternative, and detail sheet.
- Existing VPS Morning Brief cron — creates the AI overlay during the same reasoning run; no duplicate daily model call.

### Data flow

```text
Existing files + Google summaries + live health
  → collect.py (curated deterministic source payload)
  → engine.py (fallback focus, changes, anomalies, connections)
  → Morning Brief agent writes validated AI overlay
  → pipeline.py merges overlay or retains deterministic fallback
  → private/dashboard-snapshot.json + bounded history
  → private Git commit
  → Vercel deploy
  → authenticated server component
  → Calm Compass canvas
```

### Failure flow

```text
Google unavailable → mark source stale; continue with local data
AI overlay missing/invalid → deterministic focus; show subtle availability note
Snapshot invalid → preserve previous valid snapshot; fail publishing
Authentication missing/wrong email → sign-in screen only
Vercel unavailable → current production deployment remains available
```

### Security boundary

The snapshot is never placed in `public/`. Server code loads it after authentication. No raw email body, token, config dump, session transcript, or credential metadata enters the snapshot.

---

## Phase 1 — Isolated application foundation

### Task 1: Bootstrap the isolated feature workspace (orchestrator, before Kanban)

**Objective:** Establish the ignored worktree location and cutover invariant before any Kanban implementation card is dispatched.

**Files:**
- Modify: `.gitignore`
- Create: `calm-compass/README.md`

**Step 1: Write the failing repository check**

Add a temporary assertion to the plan execution notes:

```bash
git check-ignore -q .worktrees
```

Expected: FAIL because `.worktrees/` is not ignored.

**Step 2: Add the minimal ignore rule**

Append:

```gitignore
.worktrees/
```

**Step 3: Verify the rule**

Run:

```bash
git check-ignore -q .worktrees/example
```

Expected: exit 0.

**Step 4: Create the worktree**

```bash
git worktree add .worktrees/calm-compass -b feature/ai-first-calm-compass
```

**Step 5: Create the application README**

Document:

- Legacy root remains production until explicit approval.
- New app root is `calm-compass/`.
- No personal snapshot may enter `public/`.
- Discord is the only command surface.

**Step 6: Commit**

```bash
git add .gitignore calm-compass/README.md
git commit -m "chore: prepare Calm Compass workspace"
```

### Task 2: Scaffold the Next.js application with test runners

**Objective:** Create the smallest buildable/testable Next.js shell without importing legacy UI.

**Files:**
- Create: `calm-compass/package.json`
- Create: `calm-compass/tsconfig.json`
- Create: `calm-compass/next.config.ts`
- Create: `calm-compass/eslint.config.mjs`
- Create: `calm-compass/vitest.config.ts`
- Create: `calm-compass/playwright.config.ts`
- Create: `calm-compass/src/app/layout.tsx`
- Create: `calm-compass/src/app/page.tsx`
- Create: `calm-compass/src/app/globals.css`
- Create: `calm-compass/src/app/page.test.tsx`

**Step 1: Write the failing shell test**

```tsx
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

it("renders the Calm Compass product identity", () => {
  render(<HomePage />);
  expect(screen.getByRole("heading", { name: /Elli’s Calm Compass/i })).toBeVisible();
});
```

**Step 2: Verify RED**

Run:

```bash
cd calm-compass && npm test -- src/app/page.test.tsx
```

Expected: FAIL because package/application files do not exist.

**Step 3: Add pinned dependencies and minimal shell**

Required scripts:

```json
{
  "dev": "next dev",
  "build": "next build",
  "lint": "eslint .",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test",
  "schema": "tsx scripts/export-schema.ts"
}
```

Pin the versions listed in the plan header. Add `jsdom`, `tsx`, `@types/node`, `@types/react`, `@types/react-dom`, `eslint`, and `eslint-config-next` as development dependencies.

**Step 4: Verify GREEN**

```bash
npm install
npm test -- src/app/page.test.tsx
npm run lint
npm run build
```

Expected: one test passes, lint exits 0, production build exits 0.

**Step 5: Commit**

```bash
git add calm-compass
git commit -m "feat: scaffold private Calm Compass app"
```

---

## Phase 2 — Shared private snapshot contract

### Task 3: Define the canonical snapshot schema

**Objective:** Make invalid AI or collector output impossible to publish silently.

**Files:**
- Create: `calm-compass/src/lib/snapshot/schema.ts`
- Create: `calm-compass/src/lib/snapshot/schema.test.ts`
- Create: `calm-compass/scripts/export-schema.ts`
- Create: `calm-compass/schema/dashboard-snapshot.schema.json`
- Create: `calm-compass/private/dashboard-snapshot.example.json`

**Step 1: Write failing contract tests**

Test at least:

```ts
it("accepts the complete deterministic fallback snapshot", () => {
  expect(DashboardSnapshotSchema.safeParse(validFixture).success).toBe(true);
});

it("rejects a focus deadline without source evidence", () => {
  const invalid = structuredClone(validFixture);
  invalid.focus.due = "2026-09-01";
  invalid.focus.evidence = [];
  expect(DashboardSnapshotSchema.safeParse(invalid).success).toBe(false);
});

it("rejects raw email bodies and credential-shaped fields", () => {
  expect(() => DashboardSnapshotSchema.parse({ ...validFixture, email_body: "secret" })).toThrow();
});
```

**Step 2: Verify RED**

```bash
npm test -- src/lib/snapshot/schema.test.ts
```

Expected: FAIL because the schema is missing.

**Step 3: Implement the minimal Zod schema**

Required top-level fields:

```ts
{
  version,
  generatedAt,
  fallbackMode,
  sourceFreshness,
  focus,
  quickWin,
  continueItem,
  changes,
  connections,
  anomalies,
  uncertainty,
  rings,
  personalizationSummary
}
```

Use `.strict()` for all objects. Evidence records require `source`, `id`, and `reason`.

**Step 4: Export JSON Schema**

Use Zod 4’s `z.toJSONSchema` and produce a deterministic formatted file. Add a test that runs export and confirms a clean git diff.

**Step 5: Verify GREEN**

```bash
npm run schema
npm test -- src/lib/snapshot/schema.test.ts
npm run lint
```

Expected: all schema tests pass; generated schema is stable.

**Step 6: Commit**

```bash
git add calm-compass/src/lib/snapshot calm-compass/scripts calm-compass/schema calm-compass/private
git commit -m "feat: define Calm Compass snapshot contract"
```

### Task 4: Add server-only snapshot loading

**Objective:** Ensure the client cannot fetch snapshot files without authenticated rendering.

**Files:**
- Create: `calm-compass/src/lib/snapshot/load.server.ts`
- Create: `calm-compass/src/lib/snapshot/load.server.test.ts`
- Create: `calm-compass/private/dashboard-snapshot.json`
- Modify: `calm-compass/.gitignore`

**Step 1: Write failing tests**

Test valid load, invalid JSON, invalid schema, and missing file. The loader must return a typed result with either `snapshot` or a non-sensitive error code.

**Step 2: Verify RED**

```bash
npm test -- src/lib/snapshot/load.server.test.ts
```

**Step 3: Implement minimal loader**

- Add `import "server-only"`.
- Read from `CALM_COMPASS_SNAPSHOT_PATH` or the committed private default.
- Parse through `DashboardSnapshotSchema`.
- Never include raw parse content in thrown/logged errors.
- Force dynamic page rendering.

**Step 4: Add privacy assertion**

```bash
test ! -e calm-compass/public/dashboard-snapshot.json
```

Expected: exit 0; no public snapshot exists.

**Step 5: Verify GREEN and commit**

```bash
npm test -- src/lib/snapshot/load.server.test.ts
npm run build
git add calm-compass
git commit -m "feat: load private dashboard snapshot server-side"
```

---

## Phase 3 — Deterministic Context Engine

### Task 5: Create normalized source models and fixture adapters

**Objective:** Read existing source files without leaking metadata or coupling ranking to file shapes.

**Files:**
- Create: `scripts/calm_compass/__init__.py`
- Create: `scripts/calm_compass/models.py`
- Create: `scripts/calm_compass/collect.py`
- Create: `scripts/calm_compass/tests/test_collect.py`
- Create: `scripts/calm_compass/tests/fixtures/`

**Step 1: Write failing adapter tests**

Cover:

- `_instructions` entries are excluded.
- Missing optional files produce stale source markers, not crashes.
- Tasks retain only id, title, due, urgent, description, and tags.
- Email fixtures retain sender/action/deadline summary but discard body.
- Cron data reads the canonical VPS store, not paused Mac copies.
- Dates normalize to Asia/Jerusalem.

**Step 2: Verify RED**

```bash
python3 -m unittest discover -s scripts/calm_compass/tests -p 'test_collect.py' -v
```

**Step 3: Implement minimal adapters**

Use dataclasses or typed dictionaries; do not add a second database. All filesystem paths are injectable for tests.

**Step 4: Verify GREEN and commit**

```bash
python3 -m unittest discover -s scripts/calm_compass/tests -p 'test_collect.py' -v
git add scripts/calm_compass
git commit -m "feat: collect curated Calm Compass sources"
```

### Task 6: Implement deterministic focus, quick-win, and continue ranking

**Objective:** Guarantee a useful centre even with no model response.

**Files:**
- Create: `scripts/calm_compass/engine.py`
- Create: `scripts/calm_compass/tests/test_focus.py`

**Step 1: Write failing ranking tests**

One behavior per test:

- Overdue outranks due today.
- Due today outranks due soon.
- Due soon outranks undated urgent.
- Future due date does not automatically mean urgent.
- Missing due date stays missing.
- Quick win selects low-effort actionable work, not the centre duplicate.
- Continue selects recent meaningful project work with evidence.
- Empty inputs return `Nothing needs attention`.

**Step 2: Verify RED**

```bash
python3 -m unittest scripts/calm_compass/tests/test_focus.py -v
```

**Step 3: Implement minimal pure functions**

Suggested API:

```python
def rank_focus(candidates, now): ...
def choose_quick_win(candidates, focus_id): ...
def choose_continue(recent_activity, focus_id): ...
```

Every result carries evidence ids and a deterministic reason.

**Step 4: Mutation check**

Temporarily reverse the overdue ordering and confirm the relevant test fails. Restore it and rerun.

**Step 5: Verify GREEN and commit**

```bash
python3 -m unittest scripts/calm_compass/tests/test_focus.py -v
git add scripts/calm_compass
git commit -m "feat: rank deterministic daily focus"
```

### Task 7: Implement meaningful snapshot diffs

**Objective:** Generate “What changed” without reporting static noise.

**Files:**
- Modify: `scripts/calm_compass/engine.py`
- Create: `scripts/calm_compass/tests/test_changes.py`

**Step 1: Write failing tests**

Cover new/completed tasks, deadline entering due-soon, new resource, project unblock, automation failure/recovery, and unchanged counts omitted.

**Step 2: Verify RED**

```bash
python3 -m unittest scripts/calm_compass/tests/test_changes.py -v
```

**Step 3: Implement `diff_snapshots(previous, current)`**

Return bounded records with kind, title, summary, source id, and impact. Do not compare generated timestamps.

**Step 4: Verify GREEN and commit**

```bash
python3 -m unittest scripts/calm_compass/tests/test_changes.py -v
git add scripts/calm_compass
git commit -m "feat: summarize meaningful dashboard changes"
```

### Task 8: Implement deterministic anomaly detection

**Objective:** Keep healthy infrastructure quiet and surface real problems without model judgment.

**Files:**
- Modify: `scripts/calm_compass/engine.py`
- Create: `scripts/calm_compass/tests/test_anomalies.py`

**Step 1: Write failing tests**

Cover:

- VPS scheduler active + Mac jobs paused = healthy.
- Both schedulers enabled = ownership anomaly.
- Stale sync/snapshot = anomaly.
- Historic error followed by success = healthy.
- Duplicate reminders = anomaly.
- More than three urgent tasks = overload anomaly.
- Conflicting dates = anomaly.
- Commitment with no next action = anomaly.

**Step 2: Verify RED**

```bash
python3 -m unittest scripts/calm_compass/tests/test_anomalies.py -v
```

**Step 3: Implement explicit rules**

AI may later summarize the resulting records; it may not create or clear them.

**Step 4: Verify GREEN and commit**

```bash
python3 -m unittest scripts/calm_compass/tests/test_anomalies.py -v
git add scripts/calm_compass
git commit -m "feat: detect Calm Compass anomalies"
```

### Task 9: Implement connections and cautious personalization

**Objective:** Suggest useful relationships and ranking preferences without silent mutations.

**Files:**
- Modify: `scripts/calm_compass/engine.py`
- Create: `scripts/calm_compass/preferences.json`
- Create: `scripts/calm_compass/tests/test_connections.py`
- Create: `scripts/calm_compass/tests/test_preferences.py`

**Step 1: Write failing tests**

Cover:

- Shared project/resource tags create a connection with evidence.
- Email/task relationship needs explicit shared identifier or strong normalized title match.
- No source is mutated.
- Explicit correction overrides learned weight.
- Weight changes are bounded per update.
- Ring labels and order cannot be personalized.

**Step 2: Verify RED**

```bash
python3 -m unittest scripts/calm_compass/tests/test_connections.py -v
python3 -m unittest scripts/calm_compass/tests/test_preferences.py -v
```

**Step 3: Implement the smallest rules**

Do not add embeddings or another vector database in version one. Use transparent tags, ids, normalized words, and explicit preference records.

**Step 4: Verify GREEN and commit**

```bash
python3 -m unittest discover -s scripts/calm_compass/tests -v
git add scripts/calm_compass
git commit -m "feat: connect related work and preferences"
```

---

## Phase 4 — AI overlay and atomic snapshot pipeline

### Task 10: Validate and merge the AI overlay

**Objective:** Let Morning Brief improve recommendations without making the dashboard dependent on model output.

**Files:**
- Create: `scripts/calm_compass/pipeline.py`
- Create: `scripts/calm_compass/tests/test_pipeline.py`
- Create: `scripts/calm_compass/tests/fixtures/ai-overlay-valid.json`
- Create: `scripts/calm_compass/tests/fixtures/ai-overlay-invalid.json`

**Step 1: Write failing tests**

Cover:

- Valid overlay replaces focus wording but not source facts.
- Invented due date is rejected.
- Unknown evidence id is rejected.
- Invalid overlay uses deterministic focus.
- Missing overlay uses deterministic focus.
- Previous valid connections may be retained as stale.
- Snapshot writes atomically.
- History stays bounded.

**Step 2: Verify RED**

```bash
python3 -m unittest scripts/calm_compass/tests/test_pipeline.py -v
```

**Step 3: Implement pipeline**

Validate final output against `calm-compass/schema/dashboard-snapshot.schema.json` with `jsonschema`. Write temp → fsync → replace. Never overwrite the previous valid snapshot on validation failure.

**Step 4: Verify GREEN and commit**

```bash
python3 -m unittest scripts/calm_compass/tests/test_pipeline.py -v
git add scripts/calm_compass calm-compass/private
git commit -m "feat: merge validated AI dashboard overlay"
```

### Task 11: Integrate the existing Morning Brief run

**Objective:** Produce Discord brief and dashboard AI overlay from one reasoning run.

**Files:**
- Create: `scripts/calm_compass/build_source_payload.py`
- Create: `scripts/calm_compass/apply_ai_overlay.py`
- Create: `scripts/calm_compass/tests/test_cli.py`
- Modify on VPS: Morning Brief job `9a6cc6e7ea59`
- Modify: Mac mirror of Morning Brief job, while keeping it paused

**Step 1: Write failing CLI tests**

Test exit codes and output paths with temporary directories. Invalid JSON must fail without modifying the current snapshot.

**Step 2: Verify RED**

```bash
python3 -m unittest scripts/calm_compass/tests/test_cli.py -v
```

**Step 3: Implement CLIs**

The cron workflow becomes:

1. Build curated source payload.
2. Agent reads payload and gathers Google data once.
3. Agent writes one strict AI overlay JSON file.
4. Pipeline validates/merges snapshot.
5. Agent sends the existing concise Discord brief.
6. Publish snapshot only after validation.

**Step 4: Update VPS canonical cron only**

Use absolute VPS paths. Keep delivery `discord:1489553133066653726`. Copy prompt to the paused Mac mirror after verification, but do not resume Mac jobs.

**Step 5: Run one manual validation**

Trigger the VPS job once. Verify:

- Last status `ok`
- Delivery succeeds to `#chrons`
- One cron agent session only
- Snapshot validates
- Focus evidence resolves

**Step 6: Commit code/config mirror**

```bash
git add scripts/calm_compass calm-compass/private
git commit -m "feat: publish dashboard focus from Morning Brief"
```

### Task 12: Add change-gated daytime refresh

**Objective:** Refresh AI focus only when meaningful inputs change.

**Files:**
- Create: `scripts/calm_compass/monitor_input.py`
- Create: `scripts/calm_compass/tests/test_monitor_input.py`
- Create/update on VPS: change-gated cron job

**Step 1: Write failing stability test**

Two equivalent inputs with different timestamps/order must emit identical stable output. A task addition must change output.

**Step 2: Verify RED**

```bash
python3 -m unittest scripts/calm_compass/tests/test_monitor_input.py -v
```

**Step 3: Implement stable monitor output**

No timestamps, random ordering, or volatile health counters. Configure `monitor_script`; unchanged output suppresses the model run.

**Step 4: Verify scheduler behavior**

- First run establishes baseline.
- Second unchanged run records `no_change`, zero API calls, no delivery.
- Changed fixture invokes one agent run.

**Step 5: Commit**

```bash
git add scripts/calm_compass
git commit -m "feat: gate daytime focus refresh on changes"
```

---

## Phase 5 — Authentication and private application shell

### Task 13: Add Google authentication restricted to Elli

**Objective:** Prevent all unauthenticated or non-Elli access before personal data enters the app.

**Files:**
- Create: `calm-compass/src/auth.ts`
- Create: `calm-compass/src/auth.test.ts`
- Create: `calm-compass/src/proxy.ts`
- Create: `calm-compass/src/app/api/auth/[...nextauth]/route.ts`
- Create: `calm-compass/src/app/sign-in/page.tsx`
- Create: `calm-compass/src/components/sign-in-button.tsx`
- Create: `calm-compass/.env.example`

**Step 1: Write failing authorization tests**

Test:

- `el.patrick79@gmail.com` accepted.
- Different email rejected.
- Missing/uppercase/whitespace forms handled explicitly.
- Test bypass cannot be enabled when `VERCEL_ENV=production`.

**Step 2: Verify RED**

```bash
npm test -- src/auth.test.ts
```

**Step 3: Implement minimal Auth.js config**

Use Google provider and a pure exported `isAllowedEmail` function. Read allowed email from `AUTH_ALLOWED_EMAIL`, defaulting to no access if missing.

Required environment names only:

```text
AUTH_SECRET
AUTH_GOOGLE_ID
AUTH_GOOGLE_SECRET
AUTH_ALLOWED_EMAIL
```

Do not commit values.

**Step 4: Protect all app routes**

Unauthenticated users see sign-in only. Snapshot loader is called only after session/email verification.

**Step 5: Verify GREEN**

```bash
npm test -- src/auth.test.ts
npm run lint
npm run build
```

**Step 6: Commit**

```bash
git add calm-compass
git commit -m "feat: protect Calm Compass with Google sign-in"
```

### Task 14: Add privacy regression tests

**Objective:** Prove personal data is not exposed before authenticated rendering.

**Files:**
- Create: `calm-compass/tests/privacy.test.ts`
- Create: `calm-compass/tests/no-client-secrets.test.ts`
- Create: `calm-compass/e2e/auth.spec.ts`

**Step 1: Write failing tests**

- Search `public/` and client components for known fixture personal strings.
- Request `/` unauthenticated and assert redirect/sign-in without snapshot content.
- Request likely static paths for `dashboard-snapshot.json` and expect 404.
- Build output client chunks must not contain fixture email body/config/token strings.

**Step 2: Verify RED, then add only required server/client boundaries**

Do not mock the page under test. Use a real local Next server for Playwright.

**Step 3: Verify GREEN and commit**

```bash
npm test
npm run build
npm run test:e2e -- e2e/auth.spec.ts
git add calm-compass
git commit -m "test: prevent unauthenticated dashboard data access"
```

---

## Phase 6 — Calm Compass user interface

### Task 15: Build the accessible desktop ring geometry

**Objective:** Render the approved full three-ring canvas in one desktop viewport.

**Files:**
- Create: `calm-compass/src/components/compass/compass.tsx`
- Create: `calm-compass/src/components/compass/geometry.ts`
- Create: `calm-compass/src/components/compass/geometry.test.ts`
- Create: `calm-compass/src/components/compass/compass.test.tsx`
- Create: `calm-compass/src/components/compass/compass.module.css`
- Modify: `calm-compass/src/app/page.tsx`

**Step 1: Write failing geometry tests**

Test stable ring order, no duplicate angles, all node bounds inside the viewBox, centre preserved, and deterministic output independent of object key order.

**Step 2: Verify RED**

```bash
npm test -- src/components/compass/geometry.test.ts
```

**Step 3: Implement pure polar geometry**

No canvas library. Return coordinates; keep rendering separate.

**Step 4: Write failing component tests**

Test centre label, all stable nodes, accessible button names, keyboard selection, selected state, and Fit all.

**Step 5: Implement minimal SVG component**

Use real `<button>` controls positioned with SVG/CSS where possible, or SVG groups with `role="button"`, `tabIndex=0`, key handlers, and accessible values.

**Step 6: Verify GREEN and commit**

```bash
npm test -- src/components/compass
npm run lint
npm run build
git add calm-compass
git commit -m "feat: render desktop Calm Compass canvas"
```

### Task 16: Build the detail sheet and browser-state restoration

**Objective:** Explain recommendations without cluttering the canvas.

**Files:**
- Create: `calm-compass/src/components/compass/detail-sheet.tsx`
- Create: `calm-compass/src/components/compass/detail-sheet.test.tsx`
- Create: `calm-compass/src/hooks/use-compass-state.ts`
- Create: `calm-compass/src/hooks/use-compass-state.test.ts`

**Step 1: Write failing tests**

Cover selecting node, heading hierarchy, Why/evidence, Quick Win/Continue, stale/uncertainty display, close behavior, URL/history state, and back restoration.

**Step 2: Verify RED**

```bash
npm test -- src/components/compass/detail-sheet.test.tsx src/hooks/use-compass-state.test.ts
```

**Step 3: Implement minimal sheet and state hook**

Desktop right sheet; no nested scrolling. Detail text remains left aligned.

**Step 4: Verify GREEN and commit**

```bash
npm test -- src/components/compass src/hooks
npm run build
git add calm-compass
git commit -m "feat: explain Calm Compass selections"
```

### Task 17: Build Android layer tabs and bottom sheet

**Objective:** Keep labels readable at 360–412px widths.

**Files:**
- Create: `calm-compass/src/components/compass/layer-tabs.tsx`
- Create: `calm-compass/src/components/compass/layer-tabs.test.tsx`
- Modify: `calm-compass/src/components/compass/compass.tsx`
- Modify: `calm-compass/src/components/compass/compass.module.css`
- Create: `calm-compass/e2e/mobile.spec.ts`

**Step 1: Write failing tests**

- Today is default at mobile breakpoint.
- Only selected ring labels are visible.
- Centre remains visible in every layer.
- Tab targets are at least 44px.
- Bottom sheet opens and closes without horizontal overflow.

**Step 2: Verify RED**

```bash
npm test -- src/components/compass/layer-tabs.test.tsx
```

**Step 3: Implement mobile adaptation**

Preserve identical data/labels. Do not create a separate mobile information architecture.

**Step 4: Verify with Playwright**

```bash
npm run test:e2e -- e2e/mobile.spec.ts
```

Run at 360×800, 390×844, and 412×915. Expected: no horizontal overflow, labels readable, all tabs usable.

**Step 5: Commit**

```bash
git add calm-compass
git commit -m "feat: adapt Calm Compass for Android"
```

### Task 18: Add screen-reader list alternative and reduced motion

**Objective:** Offer equivalent non-spatial access to every canvas item.

**Files:**
- Create: `calm-compass/src/components/compass/accessible-list.tsx`
- Create: `calm-compass/src/components/compass/accessible-list.test.tsx`
- Modify: `calm-compass/src/components/compass/compass.module.css`
- Create: `calm-compass/e2e/accessibility.spec.ts`

**Step 1: Write failing tests**

Test hierarchical ring headings, same labels/counts/details as canvas, focus return, 200% zoom, reduced motion, and no color-only attention status.

**Step 2: Verify RED, implement minimally, verify GREEN**

```bash
npm test -- src/components/compass/accessible-list.test.tsx
npm run test:e2e -- e2e/accessibility.spec.ts
```

Use Playwright + axe only if axe is added explicitly and the test exercises the real page. Do not replace behavior tests with scanner-only assertions.

**Step 3: Commit**

```bash
git add calm-compass
git commit -m "feat: add accessible Calm Compass alternative"
```

### Task 19: Add contextual Discord handoff

**Objective:** Help Elli ask or act without turning the dashboard into a command surface.

**Files:**
- Create: `calm-compass/src/lib/discord-links.ts`
- Create: `calm-compass/src/lib/discord-links.test.ts`
- Modify: `calm-compass/src/components/compass/detail-sheet.tsx`

**Step 1: Write failing tests**

Test known guild/channel/thread URL construction, safe fallback to `#general`, copied question text, and no message-sending API.

**Step 2: Implement**

Buttons:

- Copy suggested question
- Open Discord

No endpoint may mutate dashboard or Discord state.

**Step 3: Verify and commit**

```bash
npm test -- src/lib/discord-links.test.ts src/components/compass/detail-sheet.test.tsx
git add calm-compass
git commit -m "feat: hand dashboard questions to Discord"
```

---

## Phase 7 — Private deployment and migration

### Task 20: Configure Vercel without exposing the legacy app

**Objective:** Deploy the new app privately while GitHub Pages remains unchanged.

**Files:**
- Create: `calm-compass/vercel.json` only if required
- Modify: `calm-compass/README.md`
- Create: `docs/runbooks/calm-compass-deployment.md`

**Step 1: Add deployment assertions**

Document and verify:

- Vercel root directory: `calm-compass`
- Production branch: feature preview first; `main` only after merge
- Required environment variables are present without printing values
- Google OAuth callback URL matches deployment hostname

**Step 2: User-gated setup**

Elli completes/approves Google OAuth and Vercel environment configuration. Do not guess or expose secrets.

**Step 3: Deploy preview**

Use the Vercel MCP/deploy tool. Verify preview URL, authenticated access, unauthorized rejection, and server-side snapshot load.

**Step 4: Commit runbook**

```bash
git add calm-compass docs/runbooks/calm-compass-deployment.md
git commit -m "docs: define private Calm Compass deployment"
```

### Task 21: Wire safe snapshot publishing from the VPS

**Objective:** Let the canonical scheduler publish snapshots without repository divergence.

**Files:**
- Create: `scripts/calm_compass/publish.py`
- Create: `scripts/calm_compass/tests/test_publish.py`
- Modify: `publish.sh` only to pull/rebase safely before dashboard-owned writes
- Modify: VPS scheduler service dependencies only if needed

**Step 1: Write failing repository tests**

Use temporary local/bare repositories. Cover clean pull/update/push, no-change run, remote-ahead rebase, dirty-tree refusal, and conflict refusal. Do not mock git—the test should use real temporary repositories.

**Step 2: Verify RED**

```bash
python3 -m unittest scripts/calm_compass/tests/test_publish.py -v
```

**Step 3: Implement minimal publisher**

- Lock.
- Refuse dirty tree.
- Fetch/rebase.
- Replace only snapshot/history files.
- Validate.
- Commit only if changed.
- Push.
- Re-read remote commit hash.

**Step 4: Verify GREEN and deploy to VPS**

Hash-verify transferred scripts. Run twice: first changes, second no-op.

**Step 5: Commit**

```bash
git add scripts/calm_compass publish.sh
git commit -m "feat: publish private dashboard snapshots safely"
```

### Task 22: Run complete migration acceptance

**Objective:** Prove the replacement works without cutting over.

**Files:**
- Create: `calm-compass/e2e/acceptance.spec.ts`
- Create: `docs/reviews/calm-compass-acceptance.md`

**Step 1: Write acceptance E2E first**

The test must cover:

- Authenticated desktop full-ring fit
- Android Today/My world/Setup
- Focus reason/evidence
- What changed
- New resource in Today and Knowledge
- Deterministic fallback
- Setup anomaly
- Discord handoff
- Unauthenticated privacy

**Step 2: Verify RED before wiring final fixtures**

```bash
npm run test:e2e -- e2e/acceptance.spec.ts
```

**Step 3: Run full verification**

```bash
cd calm-compass
npm test
npm run lint
npm run build
npm run test:e2e
cd ..
python3 -m unittest discover -s scripts/calm_compass/tests -v
python3 validate_dashboard.py
git diff --check
```

Expected: all commands exit 0, no warnings that invalidate privacy/accessibility, legacy validator remains green.

**Step 4: Manual device review**

Elli checks the authenticated preview in Chrome on Android and Mac. Record feedback; do not switch canonical links yet.

**Step 5: Reviewer sign-off**

Reviewer compares every acceptance criterion in the approved spec and writes evidence to `docs/reviews/calm-compass-acceptance.md`.

**Step 6: Commit**

```bash
git add calm-compass/e2e docs/reviews/calm-compass-acceptance.md
git commit -m "test: verify Calm Compass acceptance"
```

### Task 23: Cut over only after explicit approval

**Objective:** Replace the canonical dashboard without destroying recovery paths.

**Files:**
- Modify: dashboard links in memory/config/docs as identified by search
- Modify: `manifest.webmanifest` or install instructions for the new hostname
- Modify: `docs/runbooks/calm-compass-deployment.md`

**Step 1: Ask Elli for explicit cutover approval**

Do not infer approval from preview feedback.

**Step 2: Search all consumers**

```bash
git grep -n "elizabeth1979.github.io/aleph-zero-dashboard"
```

Update only canonical dashboard links. Keep an archived legacy link in the runbook.

**Step 3: Verify live deployment**

- Google sign-in persists on both devices.
- Old public dashboard is archived/disabled only as approved.
- New PWA/install behavior works.
- VPS snapshot update appears after deployment.

**Step 4: Commit and publish**

```bash
git add -A
git commit -m "feat: make Calm Compass the canonical dashboard"
git push
```

Read back the live authenticated target and remote commit before claiming success.

---

## Phase 8 — Ruthless simplification

### Task 24: Remove everything non-essential

**Objective:** Reduce the implementation while preserving every verified behavior.

**Files:**
- Review all files added under `calm-compass/` and `scripts/calm_compass/`

**Step 1: Audit code removal opportunities**

Ask:

- Which components are only pass-through wrappers?
- Which helpers are used once and obscure behavior?
- Which styles duplicate tokens?
- Which schema fields are speculative rather than required?
- Which tests mock internal behavior rather than exercise real outputs?

**Step 2: Remove bloat**

- Delete dead code and unused dependencies.
- Merge trivially thin abstractions.
- Replace duplicate constants with one source.
- Keep deterministic and AI logic separate.
- Do not remove accessibility or privacy checks as “complexity.”

**Step 3: Run the complete verification matrix**

```bash
cd calm-compass
npm test
npm run lint
npm run build
npm run test:e2e
cd ..
python3 -m unittest discover -s scripts/calm_compass/tests -v
python3 validate_dashboard.py
git diff --check
```

Expected: all pass after removals.

**Step 4: Commit**

```bash
git add -A
git commit -m "refactor: simplify Calm Compass implementation"
```

---

## Kanban execution graph

After the orchestrator completes Task 1 and verifies the worktree baseline, create a dedicated board: `calm-compass`. All cards below use the preserved worktree created by Task 1.

Use these phase cards with dependencies:

1. `Foundation and snapshot contract` — Tasks 2–4 — assignee `builder`
2. `Deterministic Context Engine` — Tasks 5–9 — parent 1 — assignee `builder`
3. `AI overlay and Morning Brief integration` — Tasks 10–12 — parent 2 — assignee `builder`
4. `Private authentication shell` — Tasks 13–14 — parent 1 — assignee `builder`
5. `Calm Compass desktop UI` — Tasks 15–16 — parents 1 and 2 — assignee `builder`
6. `Android and accessibility` — Tasks 17–19 — parent 5 — assignee `builder`
7. `Private deployment and safe publishing` — Tasks 20–21 — parents 3, 4, and 6 — assignee `builder`
8. `Acceptance and cutover gate` — Tasks 22–23 — parent 7 — assignee `builder`
9. `Ruthless simplification` — Task 24 — parent 8 — assignee `builder`

Every implementation card must:

- Use a preserved worktree, not scratch.
- Load `test-driven-development` and relevant accessibility/auth skills.
- Request review from `reviewer` with commands, changed files, residual risks, and red/green evidence.
- Return for changes if reviewer cannot verify the failing-test-before-code sequence.
- Never auto-complete Task 23 without Elli’s explicit cutover approval.

## Final verification checklist

- [ ] All new behavior began with a failing test.
- [ ] Snapshot schema is one canonical contract.
- [ ] No personal data in public/client assets.
- [ ] One Morning Brief reasoning run feeds Discord and dashboard.
- [ ] Deterministic fallback is independently tested.
- [ ] Desktop full canvas fits one viewport.
- [ ] Android labels are readable at 360/390/412px.
- [ ] Keyboard and screen-reader alternatives are equivalent.
- [ ] Mac cron copies remain paused; VPS remains canonical.
- [ ] Current production dashboard remains until explicit cutover.
- [ ] Full tests, lint, build, E2E, Python tests, legacy validator, and diff check pass.
- [ ] Reviewer evidence is stored on the Kanban cards and in the acceptance report.
- [ ] Simplification pass removed non-essential code with tests still green.
