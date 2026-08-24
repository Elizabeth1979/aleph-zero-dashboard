# Knowledge Content Pipeline Roadmap — Design Specification

**Date:** 2026-08-23  
**Status:** Stages 1–2 implemented and verified; Stage 3 pending

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

The existing Standard Summary, Young Reader Version, source notes, and blog angle remain. Learning activities are deferred to Stage 3.

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
- use simple language with key ideas, FAQs, and a self-check
- include standard and young-reader variants where useful
- link clearly to every original source
- show a visible “AI-generated and human-reviewed” disclosure on every article
- require Elli’s approval before anything is published externally
- track draft state separately from Knowledge status

Every draft also receives a rights record covering source license or terms, attribution requirements, quotation limits, image/media reuse, and whether permission is needed. Drafts use original wording, avoid reproducing transcripts, and use only short necessary quotations unless the source license or owner grants broader reuse. The blog is public and may be monetized later, so the workflow must use the conservative commercial-use interpretation rather than assuming non-commercial exceptions.

## Stage 3 — Child Learning Experience

After the draft pipeline works:

- glossary for necessary terms
- short comprehension questions
- optional activity or experiment
- misconception check
- “what another viewpoint says” section when relevant
- visual/story prompt that teaches rather than decorates

Add optional reader Q&A after the static learning content works. The first local model candidate is `mlc-ai/Qwen2.5-0.5B-Instruct-q4f16_1-MLC`, whose model artifacts are approximately 290 MB and whose base model uses Apache 2.0. It runs in the browser through WebLLM/WebGPU and is cached after an explicit optional download; the total download and runtime footprint must stay below 1 GB.

The assistant answers from the current article and its cited sources by default. Readers may explicitly expand a question to the curated Knowledge library. Retrieved sections—not the model’s general memory—supply the answer context. Every answer links to the relevant article section or source, says when support is missing, and never invents a citation. Static FAQs remain available when the model is not downloaded or the device lacks WebGPU support.

## Stage 4 — Resource Inbox Automation

After quality and publishing rules are stable:

- accept dropped links into a review queue
- fetch metadata and source text
- propose subject and tags
- flag missing categories for Elli
- summarize and assess child suitability
- do not create publishable content until the quality review is complete
- notify Elli only when a decision or approval is needed

## Current Implementation State

Stages 1 and 2 use Basic Economics as the pilot. The evidence review and private blog draft are implemented; external publication remains blocked until Elli approves the draft. Do not begin the child learning experience or inbox automation in the same change.
