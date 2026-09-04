# AI Task Copilot — MVP Design

**Date:** 2026-09-04  
**Status:** Awaiting Elli’s review  
**Primary surface:** Discord `#chrons / todos` thread  
**Language:** English

## Goal

Replace the passive daily to-do dump with an AI-first conversation that selects one appropriate task, helps execute it, and keeps the task source synchronized.

The MVP must reduce decisions rather than create another task-management interface.

## Confirmed Decisions

- The Copilot checks in every morning and is also available on demand through “What should I do next?”
- The morning interaction starts with one capacity choice: **Low energy**, **Normal**, or **Focused**.
- The Copilot shows one best task at a time.
- It both selects tasks and performs work.
- Safe internal work may run automatically.
- External actions always require explicit approval.
- The interaction is in English.

## User Experience

### 1. Morning check-in

At 08:00, the Copilot sends only:

> How is your capacity right now?  
> **Low energy · Normal · Focused**

It does not send the full task list.

### 2. Task selection

After Elli answers, the Copilot reads the current open tasks and available calendar context. It returns one compact task card:

> **Best next step:** Schedule the MRI  
> **Why now:** It is overdue and should take less than 15 minutes.  
> **I can:** Find the correct booking details and prepare the call information.
>
> **Done · Help me start · Do it for me · Later · Remove**

The actions are conversational reply choices in the MVP. Native Discord buttons are a later enhancement because the current gateway does not expose a general task-action button API.

### 3. Action behavior

- **Done** — delete the matching task from `tasks.json`, publish the dashboard, verify removal, then offer to stop or continue.
- **Help me start** — produce the smallest useful first step: a link, draft, checklist, phone number, or two-minute action.
- **Do it for me** — perform safe internal work immediately. If an external action is required, prepare it and ask for approval at the final boundary.
- **Later** — keep the task, avoid suggesting it again during the current interaction, then choose another task.
- **Remove** — ask for confirmation if the request is ambiguous; otherwise delete, publish, and verify.

After any action, never automatically flood Elli with another task. Ask: **Continue or stop?**

## Capacity Rules

These are simple eligibility bands, not a complex score:

- **Low energy:** short administrative work, tasks estimated at 2–15 minutes, or work the AI can mostly complete.
- **Normal:** tasks estimated at 15–45 minutes with a clear next action.
- **Focused:** deep work estimated at 45–90 minutes or a meaningful project step.

Capacity is combined with:

1. Overdue or approaching deadlines
2. Calendar availability
3. Whether another task is blocked by this task
4. Whether the AI can reduce the work
5. Whether the task was already deferred in the current interaction

The Copilot explains the selected reason in one sentence. It does not expose a numeric score.

## Execution Safety

### Automatic safe internal work

- Read and organize local information
- Research public information
- Summarize documents
- Draft messages or documents
- Break a task into next actions
- Prepare options and recommendations

### Approval required

- Send or post a message
- Book or cancel an appointment
- Purchase or subscribe
- Change an external account
- Submit a form
- Delete external data
- Publish content publicly

Approval applies to the exact prepared action. A general “proceed” does not authorize unrelated later actions.

## Data and Architecture

### Canonical task source

`~/.hermes/dashboard/tasks.json` remains the source of truth. Completed tasks are deleted, not retained with a completed status.

### Optional metadata

The MVP does not require a schema migration. The Copilot infers likely duration, energy, next action, and AI capability from the task title and description during selection. This avoids forcing Elli to maintain metadata.

If repeated inference becomes inconsistent, a later version may store optional agent-maintained metadata. Elli will not be required to fill it in.

### Scheduled entry point

The existing daily task cron remains attached to a continuable Discord session. Its prompt will be changed from “print all tasks” to “ask for capacity.” The follow-up response reads the live task source before choosing anything.

### On-demand entry point

When Elli writes “What should I do next?” in the task thread, the same selection flow starts. If no capacity was supplied recently, the Copilot asks for the three-way capacity choice first.

### State

Short-lived interaction state contains:

- Current capacity choice
- Last task shown
- Tasks deferred during this interaction
- Pending external-action approval

Persistent state remains limited to the task file and existing conversation transcript. No second task database is introduced.

## Failure Handling

- **Task file unavailable or invalid:** say it cannot be read and do not invent tasks.
- **Calendar unavailable:** choose using task data only and disclose that calendar context was unavailable.
- **No suitable task:** offer either a two-minute cleanup action or stop.
- **Ambiguous user reply:** ask one short clarification; never guess which task to delete or execute.
- **Action fails:** report the actual failure and preserve the task.
- **Dashboard publication fails:** report that the task file changed but dashboard publication is pending; retry through the canonical publish path.

## Verification

The implementation plan must include these scenarios:

1. Morning check-in contains no full task list.
2. Each capacity choice produces one suitable task.
3. “Later” does not repeat the same task in the current interaction.
4. “Done” deletes only the displayed task and publishes successfully.
5. “Do it for me” performs safe internal work without unnecessary approval.
6. External actions stop at a clear approval boundary.
7. Missing task or calendar data produces an honest fallback.
8. “What should I do next?” starts the same flow on demand.
9. Replies remain concise and in English.

Use real task-file fixtures and end-to-end prompt runs. Do not mock the task source or deletion/publish boundary so heavily that the critical behavior is untested.

## Deliberately Excluded from MVP

- A new Kanban board
- Numeric productivity scores
- Full automatic calendar scheduling
- Native Discord action buttons
- A second task database
- Streaks, guilt messages, or gamified pressure
- Multiple simultaneous task recommendations

## Success Criteria

The MVP succeeds when Elli can begin with one capacity choice, receive one relevant task, and either complete, defer, remove, start, or delegate it without opening the full task list or manually organizing metadata.
