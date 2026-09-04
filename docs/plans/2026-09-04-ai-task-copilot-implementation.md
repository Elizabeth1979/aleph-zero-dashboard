# AI Task Copilot MVP Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Replace the daily full-list cron message with a continuable English Discord interaction that asks for capacity, selects one task, and helps complete it.

**Architecture:** Keep `~/.hermes/dashboard/tasks.json` as the only task database. Reconfigure the existing attached cron job (`9a6cc6e7ea59`) as the morning entry point; its initial run asks only for capacity, and the attached Discord session handles selection and execution after Elli replies. Use the existing dashboard publish path after any task mutation.

**Tech Stack:** Hermes cron scheduler, attached Discord sessions, Google Workspace skill/calendar access, JSON task store, dashboard `publish.sh`.

---

## Architecture

**Components:**

- **Morning trigger** — existing daily cron at 08:00.
- **Conversation state** — attached Discord session containing capacity, last displayed task, deferred tasks, and pending approval.
- **Selection policy** — prompt rules that combine capacity, deadlines, calendar availability, blocking value, and AI executability.
- **Execution boundary** — safe internal work runs automatically; external actions stop for explicit approval.
- **Task store** — `~/.hermes/dashboard/tasks.json`; completed or removed items are deleted.
- **Publication boundary** — `bash ~/.hermes/dashboard/update_tasks.sh` after every task-file mutation.

**Data flow:**

1. Cron fires → sends capacity question only.
2. Elli replies → attached session reads live tasks and calendar.
3. Selection policy chooses one task → sends one compact task card.
4. Elli chooses an action → agent executes, defers, starts, or deletes.
5. Any deletion → task file update → publish → read-back verification.
6. Agent asks `Continue or stop?` rather than pushing another task.

**Failure flow:**

- Invalid task file → stop and report.
- Calendar unavailable → select from tasks and disclose the missing context.
- External side effect → prepare exact action and request approval.
- Failed action → preserve task and report actual error.
- Failed publish → report split state and retry canonical publish path.

---

### Task 1: Capture the Existing Cron Baseline

**Objective:** Record and verify the exact job being changed before mutation.

**Files:**
- Read: `~/.hermes/cron/jobs.json`
- Read: `~/.hermes/dashboard/tasks.json`
- Reference: `docs/specs/2026-09-04-ai-task-copilot-design.md`

**Step 1: List jobs through the supported tool**

Call:

```json
{"action":"list"}
```

Expected: job `9a6cc6e7ea59` exists, is enabled, runs at `0 8 * * *`, delivers to the current todos thread, and has `attach_to_session: true`.

**Step 2: Verify task input**

Run:

```bash
python3 -c "import json; p='$HOME/.hermes/dashboard/tasks.json'; d=json.load(open(p)); print(len([x for x in d if x.get('task')]))"
```

Expected: a positive integer and exit code 0.

**Step 3: Record baseline output**

Save the job’s current prompt and settings in the implementation transcript. Do not create a second cron job.

---

### Task 2: Update the Morning Interaction Contract

**Objective:** Change the existing cron from a list generator into a capacity-first conversational entry point.

**Files:**
- Modify through cron tool: `~/.hermes/cron/jobs.json`, job `9a6cc6e7ea59`

**Step 1: Apply the full prompt**

Update the existing job with `attach_to_session: true`, `continuity: true`, the existing schedule and delivery target, and this prompt:

```text
You are Elli’s English AI Task Copilot in the Discord todos thread.

INITIAL SCHEDULED RUN
Your entire final response must be exactly:
How is your capacity right now?
**Low energy · Normal · Focused**

Do not read or print the task list on the initial scheduled run. Do not add a morning brief, calendar summary, email summary, explanation, greeting, table, or numbered list.

WHEN ELLI REPLIES WITH CAPACITY OR ASKS “WHAT SHOULD I DO NEXT?”
1. If no recent capacity exists in this conversation, ask only: “How is your capacity right now? **Low energy · Normal · Focused**”
2. Read `~/.hermes/dashboard/tasks.json` live. Include only entries with a `task` field. Never invent tasks.
3. Read today’s calendar when available. If it is unavailable, continue using task data and say calendar context was unavailable.
4. Select exactly one best task. Use these eligibility rules, not a visible score:
   - Low energy: 2–15 minute administrative work or work you can mostly complete.
   - Normal: 15–45 minute work with a clear next action.
   - Focused: 45–90 minute deep work or a meaningful project step.
   Then prefer overdue or approaching deadlines, tasks that unblock others, and tasks where you can reduce Elli’s effort. Do not repeat a task deferred in this interaction.
5. Respond in this compact format:
**Best next step:** <task>
**Why now:** <one sentence>
**I can:** <one concrete way you can reduce the work>

**Done · Help me start · Do it for me · Later · Remove**
6. Show one task only. Never print the full list unless Elli explicitly asks for it.

ACTION RULES
- Done: delete only the displayed task from `~/.hermes/dashboard/tasks.json`; run `bash ~/.hermes/dashboard/update_tasks.sh`; read back the file; confirm deletion.
- Help me start: provide or create the smallest useful first step, such as a link, draft, phone number, checklist, or two-minute action.
- Do it for me: automatically perform safe internal work, including reading, research, organization, summaries, drafts, and task breakdown. If the work requires an external side effect, prepare the exact action and request approval before executing it.
- Later: keep the task, remember it as deferred for this interaction, and select a different task only after Elli asks to continue.
- Remove: if the target is unambiguous, delete only that task, publish, and verify. If ambiguous, ask one short clarification.

EXTERNAL APPROVAL BOUNDARY
Always request explicit approval before sending or posting messages, booking or canceling appointments, buying or subscribing, submitting forms, changing external accounts, deleting external data, or publishing publicly. Approval covers only the exact prepared action.

AFTER AN ACTION
Do not automatically show another task. Ask exactly: “Continue or stop?”

Use brief, literal English. No tables. No guilt, streaks, scores, or motivational speeches. Preserve privacy. Report actual failures; never claim an action succeeded without verification.
```

**Step 2: Verify the update by listing jobs again**

Call:

```json
{"action":"list"}
```

Expected: same job ID, schedule, delivery, and enabled state; prompt preview begins in English; `continuity: true`; `attach_to_session: true`.

---

### Task 3: Verify the Capacity-Only Scheduled Output

**Objective:** Prove the morning trigger no longer dumps all tasks.

**Files:**
- No file changes

**Step 1: Fire the existing job once**

Call:

```json
{"action":"run","job_id":"9a6cc6e7ea59","prompt":"Verification run. Follow the INITIAL SCHEDULED RUN contract exactly."}
```

Expected immediate result: a background run handle.

**Step 2: Verify the delivered result when it returns**

Expected delivered content:

```text
How is your capacity right now?
**Low energy · Normal · Focused**
```

Reject the run if it includes tasks, calendar items, email, numbered lists, greetings, or extra explanation.

**Step 3: Confirm continuation is attached**

Reply `Low energy` in the delivered thread.

Expected: one task card only, using the required five actions.

---

### Task 4: Exercise Selection and Deferral

**Objective:** Verify capacity affects selection and deferral prevents immediate repetition.

**Files:**
- Read: `~/.hermes/dashboard/tasks.json`

**Step 1: Test Low energy**

Reply `Low energy`.

Expected: one short/admin/AI-heavy task, one-sentence reason, and one concrete way Hermes can help.

**Step 2: Test Later**

Reply `Later`, then `Continue`.

Expected: the previous task remains in the file and a different single task is selected.

**Step 3: Test on-demand entry**

After stopping, write `What should I do next?`.

Expected: if capacity is stale or absent, the three-way capacity question appears; otherwise one task is selected.

---

### Task 5: Exercise Internal Execution and External Approval

**Objective:** Prove the chosen autonomy boundary works.

**Files:**
- Read-only unless Elli explicitly completes/removes a real task

**Step 1: Test Help me start**

Choose a displayed task and reply `Help me start`.

Expected: one useful starting artifact or two-minute action, not a generic pep talk.

**Step 2: Test safe internal work**

For a research, organization, summary, or drafting task, reply `Do it for me`.

Expected: Hermes starts and completes the safe internal work without asking unnecessary permission, then reports real output.

**Step 3: Test an external boundary without executing it**

For a task requiring a message, booking, purchase, form submission, account change, external deletion, or publication, reply `Do it for me`.

Expected: Hermes prepares the exact action and stops for approval. No external side effect occurs.

---

### Task 6: Verify Done/Remove Mutation Safety

**Objective:** Prove only the displayed task is deleted and the dashboard is synchronized.

**Files:**
- Modify: `~/.hermes/dashboard/tasks.json`
- Generated/published through: `~/.hermes/dashboard/update_tasks.sh`

**Step 1: Capture IDs before mutation**

Run:

```bash
python3 -c "import json; d=json.load(open('$HOME/.hermes/dashboard/tasks.json')); print([(x.get('id'),x.get('task')) for x in d if x.get('task')])"
```

Expected: valid list of open task IDs and titles.

**Step 2: Complete one real task only after Elli identifies it as done**

Reply `Done` to its displayed card.

Expected: agent deletes the matching record, runs the canonical task update script, and verifies absence.

**Step 3: Compare IDs after mutation**

Run the same Python command.

Expected: exactly one intended ID is absent; every other ID is unchanged.

**Step 4: Verify publication**

Run:

```bash
cd "$HOME/.hermes/dashboard" && git status --short --branch
```

Expected: clean branch synchronized with its remote after `update_tasks.sh` completes.

---

### Task 7: Update User-Facing Workflow Documentation

**Objective:** Make the shipped behavior visible without changing the approved Tasks page layout.

**Files:**
- Modify: `~/.hermes/dashboard/pages/workflows.html`
- Modify if required by validator: `~/.hermes/dashboard/validate_dashboard.py`

**Step 1: Add a failing validator assertion**

Add checks requiring the Task Tracking workflow to mention:

- `Low energy`
- `one task at a time`
- `Do it for me`
- `external approval`

Run:

```bash
cd "$HOME/.hermes/dashboard" && python3 validate_dashboard.py
```

Expected: FAIL because the workflow does not yet document the Copilot.

**Step 2: Update only the Task Tracking workflow**

Describe the morning/on-demand capacity flow, single-task card, safe internal execution, and external approval boundary. Do not alter unrelated workflows or the locked Tasks page layout.

**Step 3: Run validation**

```bash
cd "$HOME/.hermes/dashboard" && python3 validate_dashboard.py
```

Expected: `Dashboard validation passed`.

**Step 4: Publish**

```bash
bash "$HOME/.hermes/dashboard/publish.sh"
```

Expected: validation passes before and after refresh, then commit and push succeed.

**Step 5: Verify the live workflow page**

Fetch the deployed workflow page and confirm the new Copilot wording is present. If CDN content is stale, retry with a cache-busting fetch request without changing source URLs.

**Step 6: Commit**

`publish.sh` performs the commit. Confirm the repository is clean afterward.

---

### Task 8: Ruthless Simplification

**Objective:** Remove everything non-essential while preserving the approved behavior and passing verification.

**Step 1: Audit the implementation**

Ask:

```text
Review the AI Task Copilot cron prompt and Task Tracking workflow. What wording, branches, metadata, or files can be removed while all approved behaviors remain testable?
```

**Step 2: Check boundaries**

Confirm there is still:

- One cron job, not a duplicate
- One task database
- One task recommendation at a time
- No numeric scoring
- No automatic external side effects
- No new dashboard UI

**Step 3: Remove duplication or unnecessary wording**

Keep the shortest prompt that still defines the initial run, capacity selection, five actions, execution boundary, failure behavior, and verification.

**Step 4: Re-run all verification**

- List cron jobs
- Run `python3 validate_dashboard.py`
- Run `bash publish.sh`
- Confirm repository clean
- Confirm the next scheduled run remains 08:00

Expected: all checks pass.

**Step 5: Commit**

If simplification changes dashboard files, use `publish.sh`; otherwise no empty commit.

---

## Completion Criteria

Implementation is complete only when:

1. The existing cron, not a duplicate, asks only for capacity at 08:00.
2. The attached reply flow returns one task in English.
3. All five actions behave as specified.
4. Safe internal work runs without unnecessary approval.
5. External actions stop for exact approval.
6. Done/Remove mutate only the intended task and publish successfully.
7. On-demand “What should I do next?” uses the same flow.
8. The dashboard workflow documentation is live.
9. All validators pass and repositories are clean.
