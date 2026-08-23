# Knowledge Content Pipeline Roadmap — Design Specification

**Date:** 2026-08-23  
**Status:** Stage 1 approved; pending implementation

## Goal

Turn saved resources into trustworthy, child-accessible knowledge and eventually publishable stories without hiding uncertainty or automating weak content at scale.

## Delivery Order

Build one stage at a time:

1. Evidence-first quality review
2. Blog-draft pipeline
3. Child learning experience
4. Resource inbox automation

Each stage must work and be verified before the next stage begins.

## Stage 1 — Evidence-First Quality Review

### Claim selection

Check:

- every political claim
- every health claim
- every science claim
- every factual claim that is central to the lesson

Do not spend time verifying incidental details that do not affect the explanation.

### Claim labels

Each checked claim receives one label:

- `Verified` — supported by reliable evidence.
- `Disputed` — credible sources materially disagree.
- `Viewpoint` — an interpretation, value judgment, or ideological position rather than a testable fact.
- `Needs evidence` — important claim lacks enough reliable support.

Labels use words, not red/green color alone.

### Evidence record

Each claim stores:

- the claim in plain language
- its label
- a short editorial note
- one or more citations with title, publisher, URL, and publication date when available

Prefer primary sources, official statistics, peer-reviewed research, and high-quality reference works. For political claims, include more than one credible viewpoint when the disagreement matters.

### Editorial rubric

The quality review records:

- source diversity
- missing context
- bias and framing
- reading level
- child suitability
- actionability

Avoid a numeric quality score. Numbers imply precision the review does not have.

### Editorial decision

Every reviewed item receives one decision:

- `Ready` — suitable to use or publish in its current editorial form.
- `Revise` — useful, but specific quality gaps must be fixed.
- `Do not publish` — evidence, safety, or framing problems make publication inappropriate.

The decision includes a short reason and actionable revision list.

### Knowledge UI

Keep one Knowledge card per resource. In the item detail view, add:

1. Evidence Review
2. Claim list with labels and citations
3. Editorial Rubric
4. Editorial Decision
5. Required Revisions

The existing Standard Summary, Young Reader Version, activities, source notes, and blog angle remain.

### Basic Economics pilot

Use Basic Economics as the first reviewed item.

Claims to check include:

- what scarcity means in economics
- what opportunity cost means
- whether incentives can change behavior
- the Milton Friedman spending framework and how it should be labeled
- claims about government or private-sector efficiency

The first three are foundational economic concepts. Claims about government efficiency and ideological conclusions require evidence, context, and competing perspectives.

## Stage 2 — Blog-Draft Pipeline

After Stage 1 is approved in production:

- generate a structured draft from a Ready or revised item
- keep citations attached to claims
- include standard and young-reader variants
- require Elli’s approval before anything is published externally
- track draft state separately from Knowledge status

## Stage 3 — Child Learning Experience

After the draft pipeline works:

- glossary for necessary terms
- short comprehension questions
- optional activity or experiment
- misconception check
- “what another viewpoint says” section when relevant
- visual/story prompt that teaches rather than decorates

## Stage 4 — Resource Inbox Automation

After quality and publishing rules are stable:

- accept dropped links into a review queue
- fetch metadata and source text
- propose subject and tags
- flag missing categories for Elli
- summarize and assess child suitability
- do not create publishable content until the quality review is complete
- notify Elli only when a decision or approval is needed

## Scope for the Next Implementation

Implement Stage 1 only, using Basic Economics as the pilot. Do not begin the blog, learning, or inbox stages in the same change.
