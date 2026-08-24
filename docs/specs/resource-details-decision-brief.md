# Resource Details Decision Brief — Design Specification

## Goal

When Elli opens a saved resource, the modal must answer two questions immediately:

1. What does this source mean?
2. What should I do with it?

The result should feel like a concise decision brief, not a rendering of the JSON schema.

## Scope

- Redesign only the opened saved-resource details inside `pages/knowledge.html`.
- Keep the existing modal interaction and the approved Knowledge grid unchanged.
- Upgrade all 14 currently saved resources to the new brief fields.
- Apply the new schema to future saved resources.
- Preserve optional deep content already supported: evidence review, young-reader version, blog draft, publication state, activities, and rights review.
- Vault research reports and Project 001 insights keep their existing data sources; the renderer may use compatible fallbacks for them, but this migration does not rewrite those sources.

## Modal Structure

### Header

Show:

- Subject
- Resource title
- Source type (`Article` or `Video`)
- Estimated reading time when recorded
- Status and saved date as quiet secondary metadata
- Existing close button

Do not show absent metadata as placeholders.

### Primary brief

Render these sections in this order:

1. **Bottom line**
   - Two or three concise sentences.
   - Answers: “What is this source saying?”

2. **Apply to our work**
   - One `recommended_action` sentence.
   - Up to three `application_steps`.
   - When no action is warranted, state: “No action needed—keep as reference.”

3. **Why it matters**
   - Explain the practical consequence, value, risk, or decision relevance.

4. **Trust note**
   - Identify evidence type and material limitations.
   - Include sponsorship, ideology, uncertainty, legal caveats, or source-quality concerns when relevant.

5. **Source**
   - Link label uses the source’s real title when available.
   - Fall back to `Read original article` or `Watch original video`, never generic `Open source`.

### Optional deep sections

After the primary brief, render existing optional material only when populated:

- Evidence review
- Young-reader version
- Activities
- Blog/story angle
- Blog draft
- Rights and publication review

The decision brief remains first. Optional depth must not delay the initial answer.

## Resource Data Contract

Every saved resource uses:

```json
{
  "bottom_line": "Two or three concise sentences.",
  "recommended_action": "One clear decision or action.",
  "application_steps": ["Up to three steps"],
  "why_it_matters": "Practical consequence or value.",
  "trust_note": "Evidence type and material limitations.",
  "source_title": "Human-readable source title",
  "reading_time_minutes": 5
}
```

Rules:

- `application_steps` contains zero to three non-duplicative items.
- `reading_time_minutes` is optional and must be a positive integer when present.
- `source_title` is required for migrated resources.
- Existing `note`, `takeaways`, `bias_note`, and `blog_angle` may remain for backward compatibility, but the redesigned resource brief reads the new fields first.
- Future resource ingestion writes the new fields directly rather than reconstructing them in the browser.

## Content Migration

Upgrade all 14 visible entries in `resources.json`.

For each resource:

1. Re-read its existing summary, takeaways, context, and source metadata.
2. Write a distinct bottom line, action, why-it-matters statement, and trust note.
3. Remove duplication across the new fields.
4. Keep factual and viewpoint claims attributed.
5. Preserve all existing optional evidence, blog, young-reader, rights, and publication data.
6. Do not change subject, tags, status, URL, or source language unless the current value is demonstrably wrong.

## Rendering Rules

- Replace “Standard Summary” with “Bottom line.”
- Replace “Standard Key Points” with the new action and meaning sections.
- Never render “No separate … recorded” or any equivalent filler.
- Hide every empty optional section.
- Do not repeat the same sentence in multiple sections.
- Keep human-readable prose left-aligned.
- Preserve the current dashboard palette, typography, minimum font sizes, target sizes, and near-AAA text contrast.
- Keep links visibly identifiable and use `rel="noopener noreferrer"` for external targets.
- Escape all dynamic content before injecting it into HTML.

## Interaction and Accessibility

Preserve and verify:

- Modal remains a modal dialog over the Knowledge page.
- Opening moves focus into the modal.
- `Escape` closes the modal.
- Close button remains at least 44×44px with an accessible name.
- Closing restores focus to the resource card that opened it.
- Keyboard focus cannot escape behind the open modal.
- Background is inert or otherwise unavailable to assistive technology while the modal is open.
- Long content uses normal page/modal scrolling; no nested scrolling containers.
- Mobile layout keeps the bottom line and recommended action visible early in the reading order.

## Non-Goals

- No redesign of Knowledge grid cards, filters, subjects, or views.
- No dedicated resource page.
- No new resource-management workflow, editing UI, completion tracking, or project-task creation.
- No changes to research-report or Project 001 storage schemas.
- No unrelated cleanup of `knowledge.html`.

## Verification

### Data

- `resources.json` remains valid JSON and retains the `_instructions` metadata entry.
- All 14 visible resources contain every required new field.
- Every `application_steps` array has at most three items.
- Existing URLs and resource IDs remain unique.
- Existing optional deep-content objects are preserved byte-for-byte in meaning and structure.

### Rendering

- No visible “Standard Summary,” “Standard Key Points,” or “No separate … recorded” strings remain for resources.
- All five primary sections render in the approved order when populated.
- Empty optional sections do not render.
- Source controls use human-readable labels.
- The original complex economics resource still renders its evidence, young-reader, blog, rights, and publication sections after the primary brief.

### Accessibility and responsive behavior

- Keyboard-only open, read, close, and focus restoration pass.
- Focus trap and background isolation pass.
- Screen-reader dialog name and section heading order pass.
- Desktop and Android-sized mobile screenshots show no clipping or horizontal overflow.
- Text and control contrast meet the dashboard’s existing accessibility targets.

### Delivery

- Run the dashboard validator and canonical `publish.sh` path.
- Verify the deployed Knowledge page contains the redesigned brief for at least one simple resource and the complex economics resource.
- Verify all 14 migrated source identifiers remain present in deployed `data.js`.
