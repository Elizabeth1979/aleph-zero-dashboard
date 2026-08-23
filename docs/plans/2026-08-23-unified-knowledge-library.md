# Unified Knowledge Library Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Make Knowledge the single subject-organized library, integrate Project 001, and add a reusable Grade 7–9 Young Reader writing standard.

**Architecture:** Keep `resources.json`, `project-001-insights.json`, and vault reports as separate sources. Add explicit subject/tag/source-language metadata, normalize all sources in `knowledge.html`, and remove only the separate home-page 001 destination. Use `validate_dashboard.py` as the regression suite and verify the rendered production page in a real browser.

**Tech Stack:** Static HTML/CSS/JavaScript, JSON, Python dashboard validator, GitHub Pages, Hermes skills.

---

### Task 1: Add failing architecture and taxonomy checks

**Objective:** Make the validator describe the approved behavior before production code changes.

**Files:**
- Modify: `validate_dashboard.py`

**Steps:**
1. Add checks for the approved subject list in Knowledge.
2. Add checks that Knowledge reads `project_001_insights` and exposes subject filter buttons with `aria-pressed`.
3. Add checks that the home page no longer links to `pages/project-001.html`.
4. Add JSON checks requiring every resource and 001 item to have an approved `subject`, a list of `tags`, and a supported `source_language`.
5. Run `python3 validate_dashboard.py` and confirm the new checks fail for the missing implementation.

### Task 2: Classify existing knowledge data

**Objective:** Separate subject, tags, workflow status, and source language without deleting content.

**Files:**
- Modify: `resources.json`
- Modify: `project-001-insights.json`

**Steps:**
1. Add one approved `subject` to every visible resource and 001 insight.
2. Add `tags` arrays and `source_language` values.
3. Replace the Basic Economics item’s Hebrew dashboard title and summary with English-first copy while preserving the Hebrew-source marker and URL.
4. Set Basic Economics to subject `Economics`, tags `Blog material` and `Children`, status `Processed`.
5. Validate both JSON files with Python.
6. Re-run the dashboard validator; data checks should pass while UI checks still fail.

### Task 3: Build the unified Knowledge page

**Objective:** Render resources, vault research, and 001 insights in one accessible library.

**Files:**
- Modify: `pages/knowledge.html`

**Steps:**
1. Read `BEST-PRACTICES.md` before editing.
2. Normalize all three source arrays into a shared item model with stable source IDs.
3. Add an approved-subject filter bar using native buttons, minimum 44px targets, and `aria-pressed`.
4. Add a view/tag filter for All, Blog material, and To explore.
5. Render title, subject, status, date, and summary on each card.
6. Render source links, key points, takeaway, bias/reliability note, and blog angle in the existing modal.
7. Preserve correct source identity so every card opens its own data.
8. Run `python3 validate_dashboard.py` and the inline-JavaScript syntax check.

### Task 4: Make Knowledge the single home destination

**Objective:** Remove the separate 001 home card and make Knowledge counts include all normalized sources.

**Files:**
- Modify: `index.html`

**Steps:**
1. Remove the `001 Insights` card only; retain the compatibility page and data file.
2. Remove the now-unused home-page 001 badge/preview rendering code.
3. Update the Knowledge badge to count visible reports, resources, and 001 insights.
4. Update the Knowledge preview to report total items and subject count.
5. Run the validator and inline-JavaScript syntax check.

### Task 5: Create the Young Reader writing skill

**Objective:** Make the approved Grade 7–9 editorial style reusable for future summaries and blog drafts.

**Files:**
- Create skill: `young-reader-writing`

**Steps:**
1. Create a custom Hermes skill with English-first, Grade 7–9 rules.
2. Credit the MIT-licensed DreambigOu ELI5 skill as inspiration without copying its age-5 default.
3. Include source/bias preservation, Hebrew-source handling, concrete examples, terminology definitions, and Flesch–Kincaid as a warning signal rather than a quality guarantee.
4. Include the dashboard output fields: summary, key ideas, why it matters, source/bias note, and story/blog angle.
5. Run dashboard publication so the skill appears on the Skills page.

### Task 6: Ruthless simplification and production verification

**Objective:** Remove non-essential code while preserving all approved behavior.

**Files:**
- Review all files changed in Tasks 1–5.

**Steps:**
1. Remove dead 001-home code and duplicated normalization logic.
2. Keep data sources separate; do not add a second knowledge data file.
3. Run `python3 validate_dashboard.py`.
4. Run JavaScript syntax checks for `index.html` and `pages/knowledge.html`.
5. Run `git diff --check` and review the final diff.
6. Run `bash ~/.hermes/dashboard/publish.sh`.
7. In the live browser, verify the separate 001 card is gone, Knowledge contains resources plus 001 items, filters work, and Basic Economics opens with the correct English-first details.
