# Unified Knowledge Library — Design Specification

**Date:** 2026-08-23  
**Status:** Implemented and verified

## Purpose

Turn the dashboard’s Knowledge page into the single home for curated learning. It should include saved videos and articles, research notes, and Project 001 insights. The library should support future child-accessible blog writing without mixing a subject with a possible use.

## Information Architecture

### Primary subjects

Every item has exactly one primary subject:

- Economics
- History
- Self-Improvement
- AI
- Intelligence & Security
- Politics
- Neuroscience
- Accessibility
- Technology
- Uncategorized

`Uncategorized` is a temporary holding subject. When an item does not fit, save it there, tell Elli, and suggest one new subject. Add the new subject only after Elli approves it.

### Tags and status

Items may have multiple tags. Tags describe secondary themes or intended uses, such as:

- Blog material
- Reference
- Children
- Decision-making
- Media literacy
- Psychology

Workflow state remains separate from subjects and tags:

- New
- To explore
- Processed
- Archived

### Why this separation matters

`Economics` describes what an item is about. `Blog material` describes what Elli may do with it. They must not share one category field.

## Data Architecture

Keep the existing files separate to reduce migration risk:

- `resources.json` remains the source for saved videos, articles, and summaries.
- `project-001-insights.json` remains the source for structured 001 insights.
- Vault research remains in the existing reports feed.

The Knowledge page normalizes all three sources into one display model at runtime:

- stable source ID
- title
- primary subject
- tags
- workflow status
- date
- summary
- key points
- why it matters / takeaway
- source links
- source-language metadata
- bias or reliability note
- blog/story angle

Do not duplicate or migrate the underlying content during this change.

## Dashboard Behavior

### Home page

- Keep one `Knowledge` card.
- Remove the separate `001 Insights` card.
- The Knowledge badge counts all visible knowledge items across resources, research, and 001 insights.
- The preview reports the subject coverage and item count in plain language.

### Knowledge page

- Display all sources in one library.
- Provide accessible filter buttons for primary subjects.
- Provide a second filter for useful workflow/tag views, including Blog material and To explore.
- Default to All subjects.
- Cards show title, primary subject, status, date, and short summary.
- Opening an item shows the full summary, key points, source links, bias/reliability note, and blog angle.
- Preserve keyboard operation, visible focus, semantic buttons, minimum 44px targets, and existing dark/teal visual language.
- Do not use nested scrolling.

The standalone `project-001.html` file may remain as an unlinked compatibility/archive page, but it is no longer a top-level dashboard destination.

## English-First, Hebrew-Source Support

- Dashboard summaries and future blog drafts are written in English by default.
- Hebrew sources keep their original title and source URL where available.
- Add `source_language: "he"` or `"en"` to structured items.
- Translation must preserve the speaker’s claim versus independently verified fact.

## Young Reader Writing Standard

Create a reusable Hermes skill based on the MIT-licensed DreambigOu ELI5 Claude Code skill, adapted for this project.

Target audience:

- Grades 7–9 / approximately ages 12–15
- English-first
- Intelligent and curious readers
- No baby talk and no age-5 default

Writing rules:

1. Start with one sentence explaining what the idea is.
2. Use one idea per sentence.
3. Prefer concrete examples over abstract descriptions.
4. Introduce proper terminology when useful, then define it immediately.
5. Explain cause and effect step by step.
6. Include why the idea matters in real life.
7. Preserve uncertainty, competing interpretations, and source bias.
8. Use stories or analogies only when they improve understanding.
9. Avoid slang that tries too hard to sound young.
10. Aim for Flesch–Kincaid Grade 7–9 when writing English, but treat the score as a warning signal rather than proof of clarity.

Each processed knowledge item should support:

- a clear summary
- key ideas
- why it matters
- source/bias note
- possible child-friendly story or blog angle

## Existing Content Mapping

- Basic Economics → Economics; tags: Blog material, Children; status: Processed; source language: Hebrew.
- Project 001 mission/OSINT/security items → Intelligence & Security, with secondary tags such as History, Politics, Decision-making, or Media literacy.
- CSS accessibility resources → Accessibility, with Technology tags where useful.
- AI-agent resources → AI or Technology, depending on the central subject.

Existing items that cannot be mapped confidently become Uncategorized and are reported to Elli with a suggested subject.

## Validation and Tests

Add regression checks before implementation:

- Knowledge renders resources when research reports are empty.
- Every visible item has an approved primary subject or Uncategorized.
- Every item preserves its source identity so opening a card shows the correct details.
- 001 items appear on Knowledge.
- The home page has no separate 001 card.
- The Knowledge badge includes normalized 001 items.
- Subject filters use buttons and expose their selected state accessibly.
- Existing dashboard validation, JavaScript syntax checks, and live browser verification pass.

## Scope Boundaries

This change organizes and displays knowledge. It does not:

- build or publish the public blog
- rewrite every historical resource into a full article
- delete the original Project 001 data or compatibility page
- add automatic category creation without Elli’s approval
