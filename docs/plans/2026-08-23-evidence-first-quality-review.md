# Evidence-First Quality Review — Stage 1 Implementation Plan

> **For Hermes:** Use grounded-citations and strict TDD while implementing each task.

**Goal:** Add a cited evidence review and actionable editorial decision to Basic Economics as the pilot Knowledge item.

**Architecture:** Store structured review data inside the existing resource item. Knowledge normalizes and renders it in the existing detail modal. The validator enforces the schema and UI wiring. No new data source or page is introduced.

**Tech Stack:** JSON, static HTML/CSS/JavaScript, Python validator, browser research, citation ledger, GitHub Pages.

---

### Task 1: Research the pilot claims

**Objective:** Build an evidence ledger from authoritative sources.

**Files:**
- Create temporary evidence ledger under the Hermes citation cache
- Modify later: `resources.json`

**Steps:**
1. Reset a task-specific citation ledger.
2. Retrieve authoritative sources for scarcity, opportunity cost, incentives, Friedman’s spending framework, and public/private efficiency.
3. Attach exact evidence quotes to each registered source.
4. Label each claim Verified, Disputed, Viewpoint, or Needs evidence.
5. Cross-check disputed political/economic claims with more than one credible source.
6. Verify the evidence ledger before writing resource data.

### Task 2: Add failing schema and UI checks

**Objective:** Define the required quality-review behavior before implementation.

**Files:**
- Modify: `validate_dashboard.py`

**Steps:**
1. Require an `evidence_review` object on Basic Economics.
2. Require claim text, approved label, editorial note, and citations.
3. Require rubric fields, editorial decision, reason, and revision list.
4. Require the Knowledge UI to render Evidence Review, Editorial Rubric, Editorial Decision, and Required Revisions.
5. Run `python3 validate_dashboard.py` and confirm expected failures.

### Task 3: Add the Basic Economics evidence review

**Objective:** Save the grounded review and actionable revisions.

**Files:**
- Modify: `resources.json`

**Steps:**
1. Add checked claims with labels, notes, and citation metadata.
2. Add rubric findings for source diversity, missing context, bias/framing, reading level, child suitability, and actionability.
3. Set the editorial decision to Ready, Revise, or Do not publish based on evidence.
4. Add specific required revisions.
5. Validate JSON and re-run the dashboard validator; data checks should pass while UI checks remain red.

### Task 4: Render evidence and editorial decisions

**Objective:** Make the complete review readable and actionable in Knowledge.

**Files:**
- Modify: `pages/knowledge.html`

**Steps:**
1. Preserve `evidence_review` during resource normalization.
2. Render claim labels as text badges, never color alone.
3. Render citations as safe external links with publisher and date.
4. Render the rubric, decision reason, and revision list.
5. Omit empty sections rather than inventing content.
6. Run validator, JavaScript syntax checks, and keyboard/modal checks.

### Task 5: Update the recurring workflow

**Objective:** Ensure future summaries follow the evidence-first process.

**Files:**
- Modify: `pages/workflows.html`
- Update personal skills: `hermes-dashboard`, `young-reader-writing`

**Steps:**
1. Document which claims are always checked.
2. Document the four claim labels and three editorial decisions.
3. Require citations and actionable revisions before Ready status.
4. Re-run dashboard validation.

### Task 6: Simplify, publish, and verify

**Objective:** Remove non-essential code and prove the production workflow.

**Steps:**
1. Remove duplicated or unused rendering helpers.
2. Run JSON validation, dashboard validation, JavaScript syntax checks, citation verification, and `git diff --check`.
3. Publish through `bash publish.sh`.
4. Verify live that Basic Economics shows claims, labels, citations, rubric, decision, and revisions.
5. Confirm all source links open the intended authoritative pages.
