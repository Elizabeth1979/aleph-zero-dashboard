# Parallel Young Reader Content — Design Specification

**Date:** 2026-08-23  
**Status:** Approved; pending implementation

## Goal

Keep one Knowledge item while presenting two distinct editorial layers:

1. Standard Summary — accurate source-oriented notes for adults.
2. Young Reader Version — an adapted explanation for grades 7–9.

The young version supplements the standard summary. It never replaces it.

## Data Model

A Knowledge resource may include a `young_reader` object:

```json
{
  "verdict": "Adaptable",
  "target_grades": "7–9",
  "summary": "Clear child-accessible explanation.",
  "key_points": ["Key idea"],
  "activities": ["Action the reader can try"],
  "reading_grade": 8.0,
  "quality_note": "Why it is or is not suitable and what changed."
}
```

Allowed verdicts:

- `Ready` — source and explanation can be recommended with minor editing.
- `Adaptable` — core ideas are useful, but framing, complexity, or context must change.
- `Not recommended` — unsuitable to adapt without distorting the subject or exposing children to inappropriate material.

## Quality Review

Every future processed item should be checked for:

- Accuracy: key ideas remain correct after simplification.
- Source framing: opinions and ideological positions stay labeled.
- Context: necessary competing views or missing facts are named.
- Clarity: key terms are defined and cause/effect is explicit.
- Child suitability: topic, tone, examples, and emotional content fit grades 7–9.
- Actionability: at least one safe activity helps the reader use the idea.
- Readability: English young-reader prose targets Flesch–Kincaid grade 7–9; the score is a warning signal, not a substitute for editorial review.

## Knowledge UI

The existing item modal displays, in order:

1. Standard Summary
2. Standard Key Points
3. Why It Matters
4. Young Reader Version, when present
5. Try It Yourself, when activities are present
6. Young Reader Quality Review
7. Sources
8. Bias / Reliability Note
9. Blog / Story Angle

The quality review shows verdict, target grades, measured reading grade, and the editorial note. Missing young-reader content is not fabricated; the section is omitted.

## Basic Economics Decision

Verdict: `Adaptable`.

Suitable ideas:

- scarcity
- opportunity cost
- incentives
- judging outcomes as well as intentions

Required changes:

- replace abstract language with school and allowance examples
- define economic terms on first use
- label the source as a pro-market viewpoint
- remind readers that economists disagree about policy
- avoid presenting political claims as settled fact

Activities should help readers identify opportunity costs, map incentives, and compare a claim with another source.

## Scope

This change updates Basic Economics and establishes the reusable model. It does not automatically rewrite every existing Knowledge item. Future processed items use the quality review and add a Young Reader version only when appropriate.
