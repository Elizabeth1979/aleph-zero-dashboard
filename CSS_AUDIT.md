# CSS Audit — Hermes Dashboard
_Generated 2026-04-04 | Files reviewed: theme.css, a11y-widget.css, index.html, pages/*.html (17 pages)_

---

## Executive Summary

The dashboard has a **cohesive design system** built on `theme.css` custom properties and consistently applied across all pages. The visual language is consistent. However, there are **critical issues in three areas**: contrast ratio failures on secondary text, zero mobile breakpoints in all detail pages, and every page duplicating ~60+ lines of base CSS that belongs in a shared file. The a11y widget itself has multiple sub-14px font sizes, which is ironic.

---

## 1. Accessibility Issues

### 1a. Contrast Ratios — CRITICAL

| Color Pair | Ratio | WCAG AA | Used For |
|---|---|---|---|
| `--text-3` (#5f6368) on `--bg` (#0b0e11) | **3.20:1** | ❌ FAIL | `.card-desc`, `.section-label`, `.cfg-key`, `.task-date`, `.cat-header` |
| `--text-3` on `--bg-card` (#13171c) | **2.97:1** | ❌ FAIL | Same elements over cards |
| `--text-2` (#9aa0a6) on `--bg` | 7.33:1 | ✅ PASS | Secondary labels |
| `--text` (#e8eaed) on `--bg` | 16.06:1 | ✅ PASS | Primary text |
| `--accent` (#5de4d4) on `--bg` | 12.45:1 | ✅ PASS | Links, icons |

**`--text-3` fails WCAG AA everywhere it's used.** This affects a large proportion of the UI:
- `index.html:99` — `.section-label` text (uppercase labels like "Action Items", "Memory")
- `index.html:227` — `.card-desc` (the subtitle under every card heading)
- `tasks.html:69` — `.cfg-key` (left column of all key/value rows)
- `tasks.html:111` — `.task-date` (monospace date on every task)
- `tasks.html:124` — `.cat-header` text
- All pages: `.text-3` used anywhere with `var(--fs-xs)` = 13px = even stricter contrast requirement

**Fix:** Lighten `--text-3` in `theme.css:30` to at least `#808589` (≈4.6:1 on `--bg`) or `#878d93`.

### 1b. Font Sizes Below 14px Minimum

The stated design preference is **min 14px**. Violations:

| File | Line | Size | Selector |
|---|---|---|---|
| `theme.css` | 35 | **13px** | `--fs-xs` — used **228 times** across all pages |
| `a11y-widget.css` | 130 | 13px | `.a11y-panel-title` |
| `a11y-widget.css` | 149 | 10.5px | `.a11y-panel-subtitle` |
| `a11y-widget.css` | 218 | 12.5px | `.a11y-toggle` (all toggle buttons) |
| `a11y-widget.css` | 261 | 12.5px | `.a11y-toggle-name` |
| `a11y-widget.css` | 267 | 10.5px | `.a11y-toggle-desc` (description under each toggle) |
| `a11y-widget.css` | 333 | 10px | `.a11y-font-badge` (the "1x/1.2x/1.4x" indicator) |

The entire a11y widget — a tool meant to improve accessibility — itself renders below the stated font-size minimum. The widget is self-contained dark UI, but the `--fs-xs: 13px` affecting 228 places is the most impactful issue.

**Fix:** Raise `theme.css:35` `--fs-xs` to `14px`. The `a11y-font-badge` at 10px is the worst — raise to at minimum 12px, ideally 13px+.

### 1c. Touch Targets — CRITICAL for Android mobile

| File | Line | Size | Element |
|---|---|---|---|
| `a11y-widget.css` | 156–170 | **26×26px** | `.a11y-close-btn` (❌ minimum is 44×44px) |
| `a11y-widget.css` | 200–219 | **full-width × ~47px** | `.a11y-toggle` rows (✅ OK in practice) |
| All pages | ~34–43 | text-height only | `.back-link` (no explicit min-height — tappable area = line height of 14px text ≈ 21px) |

`.a11y-close-btn` at 26px is the main offender — it's the X button in the a11y panel, exactly the button users would need to tap. On a phone it will be very hard to hit precisely.

**Fix:** `a11y-widget.css:156` — change to `width: 44px; height: 44px` or add `min-width: 44px; min-height: 44px` while keeping visual size via padding. For `.back-link`, add `min-height: 44px` and `padding: var(--s2) 0`.

### 1d. Focus Indicators — Missing on all pages

**Zero `:focus` or `:focus-visible` rules exist in any of the 17 detail pages or `index.html`.** (Confirmed by search.) 

Interactive elements with no custom focus styles:
- `index.html` — `.card` (all are `<a>` elements) — browser defaults only
- All pages — `.back-link`, `.raw-toggle`, `.rules-toggle`, `.pill` buttons, `.btn` buttons
- `a11y-widget.css:31` — `outline: none` on `#a11y-widget-btn` with only `:focus-visible` compensation (line 43). In browsers/contexts without `:focus-visible` support, this button is invisible to keyboard users.

Browser-default blue outlines are jarring on the dark theme and inconsistent across browsers.

**Fix:** Add to each page's shared boilerplate (or a future `pages.css`):
```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 3px;
}
```

### 1e. Non-Button Interactive Elements (Keyboard Inaccessibility)

| File | Line | Element | Issue |
|---|---|---|---|
| `index.html` | 711–714 | `.egg` div | `<div>` with click handler — no `tabindex`, no keyboard |
| `tasks.html` | 428 | `.rules-toggle` | `<div onclick=...>` — not focusable |
| `agent.html` | 353 | `.detail-header` | `<div onclick="toggleDetail(...)">` — not a button |

All three are click-only. On Android screen readers (TalkBack), these are either invisible or non-activatable.

**Fix:** Change `.rules-toggle` and `.detail-header` to `<button>` elements, or add `role="button" tabindex="0"` + `keydown` handler for Enter/Space. The `.egg` easter egg can stay non-accessible as a discovery feature, but add `aria-hidden="true"` to suppress screen-reader noise.

### 1f. Red Used in the a11y Widget Reset Button

`a11y-widget.css:377–380` — the "Reset All" button hover turns red:
```css
.a11y-reset-btn:hover {
  background: rgba(255, 80, 80, 0.10);   /* red */
  color: #ff8585;                          /* red */
}
```
Design preference explicitly says **no red**. This is the one red element in the whole UI.

**Fix:** Change to a neutral de-emphasis hover or use `rgba(var(--accent-rgb), 0.10)` / `var(--text-2)`.

---

## 2. Mobile Responsiveness Gaps — CRITICAL

### 2a. Zero Breakpoints in All 17 Detail Pages

**Only `index.html` has a responsive breakpoint** (`@media (max-width: 600px)` at line 87). All detail pages — tasks, cron, gateway, sessions, config, etc. — have **no `@media` rules at all**.

Impact on Android phone (e.g. 390px viewport with 24px side padding = **342px content width**):
- `.page-header` is `display: flex` with no `flex-wrap` — if the back-link + title is wide, they collide. No stacking fallback.
- `.cfg-row` has `justify-content: space-between` with long monospace values (dates, IDs) that may overflow or wrap awkwardly.
- `.task` rows with multiple inline elements (checkbox + text + priority badge + date) at narrow widths will wrap in unexpected ways.

**Fix:** Add to each detail page (or the future `pages.css`):
```css
@media (max-width: 600px) {
  .page-wrap { padding: var(--s4) var(--s3); }
  .page-header { flex-wrap: wrap; gap: var(--s2); }
  .cfg-row { flex-direction: column; gap: var(--s1); }
  .task { flex-wrap: wrap; }
}
```

### 2b. a11y Widget Panel Width on Very Small Screens

`a11y-widget.css:89` — `#a11y-widget-panel { width: 280px; right: 24px; }`. 
On a 320px screen: panel would occupy 280px of 296px available = fine. But the panel + button is absolutely positioned and has no `max-width: calc(100vw - 48px)` guard.

**Fix:** `a11y-widget.css:89` add `max-width: calc(100vw - 48px);` to the panel.

### 2c. `.page-wrap` Fixed Padding

All 17 pages: `padding: var(--s6)` = 24px on all four sides. On mobile this is actually okay (leaves ~342px content), but the vertical top padding being 24px instead of something smaller wastes vertical space on phone. Minor.

---

## 3. Unused CSS Rules

### 3a. tasks.html Contains ~150 Lines of CSS Never Used on That Page

`tasks.html` has a massive shared `<style>` block that includes styles for **other pages** that were copy-pasted and never pruned. Lines 162–255:

| Lines | Unused Selectors | Belong In |
|---|---|---|
| 162–186 | `.cron`, `.cron-top`, `.cron-name`, `.cron-meta`, `.cron-prompt`, `.cron-prompt-box` | `cron.html` |
| 202–212 | `.modal-chroma-cat`, `.modal-chroma-entry` | `longterm.html` |
| 213–237 | `.skill-cat`, `.skill-cat-name`, `.skill-pills`, `.pill`, `.skill-detail` | `skills.html` |
| 238–255 | `.mem-entry`, `.mem-label`, `.usage-bar`, `.usage-fill` | `user.html`, `agent.html` |
| 112–138 | `.modal-meta`, `.modal-editor`, `.modal-actions`, `.btn`, `.btn-save`, `.modal-hint` | `agent.html` (these actually appear in agent.html too, duplicated) |

Also: `.cmd-row`, `.cmd-name`, `.cmd-desc` (lines 71–86) — these belong in `commands.html`, not tasks.html.

### 3b. `@keyframes fadeIn` Defined 18 Times

Identical keyframe animation duplicated in all 17 pages and `index.html`. If it's changed, 18 files need updating.

### 3c. Base Boilerplate Duplicated 17×

The following ~55 lines appear verbatim in every detail page:
```
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { font-family/size/color/bg... }
.page-wrap { max-width/margin/padding/min-height }
.page-header { display flex/align/gap/border }
.back-link { display/color/text-decoration... }
.page-title { font-size/weight/color/flex... }
.page-body { animation: fadeIn }
@keyframes fadeIn { ... }
::-webkit-scrollbar { ... }
```

---

## 4. Specificity Wars / !important Overuse

**No specificity conflicts** exist — page files all use flat class selectors, no ID wars, no deeply nested rules.

The `!important` count in `a11y-widget.css` is **~35 uses** — all in section 2 (the accessibility feature classes applied to `<html>`). This is intentional and well-documented (`/* Use !important to override */`), so it's appropriate usage.

**One concern:** `a11y-widget.css:418–432` — The high-contrast rule sets `color: #ffffff !important` on `div` among others. This is a very broad selector that could color structural/layout divs white if they have inline text. A more targeted approach would use `:is(p, span, li, td, th, label, h1, h2, h3, h4)` and skip bare `div`.

---

## 5. Inconsistent Theming / Variables

### 5a. Category Colors Not in theme.css

Six category colors are hardcoded as hex literals in multiple files, not as CSS variables, and are slightly inconsistent:

| Color | Used As | Files | vs. Theme |
|---|---|---|---|
| `#c084fc` | idea/purple | `tasks.html:116`, `resources.html:113` | Not in theme |
| `#60a5fa` | read/blue | `tasks.html:117`, `resources.html:112,116` | Not in theme |
| `#34d399` | write/green | `tasks.html:118`, `resources.html:115,120` | Not in theme |
| `#fbbf24` | share/amber | `tasks.html:119`, `resources.html:114,122,155` | ≠ `--warn: #f0b866` |
| `#a78bfa` | remember/violet | `tasks.html:120` | Not in theme |
| `#f472b6` | blog/pink | `resources.html:117` | Not in theme |

**`#fbbf24` vs `--warn: #f0b866`** is an actual inconsistency — two different ambers used for "warning/amber" semantic.

Also same colors duplicated in JS at `tasks.html:400–402`.

**Fix:** Add to `theme.css`:
```css
--cat-idea:     #c084fc;
--cat-read:     #60a5fa;
--cat-write:    #34d399;
--cat-share:    #f0b866;  /* align with --warn */
--cat-remember: #a78bfa;
--cat-blog:     #f472b6;
```

### 5b. Hardcoded Colors in HTML (Not CSS Variables)

| File | Line | Value | Should Be |
|---|---|---|---|
| `gateway.html` | 283 | `color:#0a0a0a` on restart button | `color: var(--bg)` |
| `resources.html` | 155 | `color: #fbbf24` | `color: var(--warn)` or `var(--cat-share)` |

### 5c. `page-wrap` Max-Width Inconsistency

- `index.html:23` — `.wrap { max-width: 1100px }` (grid homepage)
- All detail pages — `.page-wrap { max-width: 900px }` (consistent ✅)

This is intentional differentiation (grid vs. content), not a bug.

---

## 6. Dark Mode

The dashboard is **always dark** by design. There is no `@media (prefers-color-scheme: light)` anywhere. Users with light mode preference on their device will see the dark theme regardless.

This is likely intentional for a personal agent dashboard, but worth noting. If someone ever views this on a device with forced light mode, the `#0b0e11` backgrounds will still render dark because they're hardcoded, not using `color-scheme`. No action needed unless you want to add `<meta name="color-scheme" content="dark">` to explicitly declare the intent.

---

## 7. Print Stylesheet

**No print styles exist anywhere.** Printing any page would:

1. Print `#0b0e11` black background consuming ink across every page
2. Print the fixed-position a11y widget button on top of content
3. Print the 3D card hover effects and animations (Chrome will snapshot mid-animation)
4. Show no logical page breaks between sections

Minimum recommended addition to each page (or a shared `pages.css`):
```css
@media print {
  * { background: white !important; color: black !important; }
  .page-wrap { max-width: none; padding: 0; }
  #a11y-widget-btn, #a11y-widget-panel { display: none !important; }
  .back-link { display: none; }
  .card { break-inside: avoid; border: 1px solid #ccc !important; }
}
```

---

## Design System Assessment

| Aspect | Status | Notes |
|---|---|---|
| Color palette | ✅ Consistent | All pages use `theme.css` vars |
| Typography | ✅ Mostly consistent | `--fs-xs: 13px` is the one systemic issue |
| Spacing | ✅ Consistent | `--s*` vars used throughout |
| Component patterns | ✅ Consistent | `.cfg-row`, `.tag`, `.usage-bar`, etc. shared |
| Layout base | ❌ Not shared | ~60 lines duplicated in 17 files |
| Category colors | ❌ Inline | Not in theme vars, inconsistent amber |
| Responsive design | ❌ Index only | 17/18 pages have no breakpoints |
| Focus management | ❌ Missing | No `:focus-visible` on interactive elements |
| Print | ❌ Missing | Zero print styles |
| Dark mode declaration | ⚠️ Implicit | Works but no `color-scheme` meta |

The design is coherent and uses variables well. The structural problem is that there's no `pages.css` — a shared stylesheet for the detail pages. This would fix the duplication and make global changes (focus rings, breakpoints, print, font-size floor) a single-file edit instead of 17.

---

## Priority Fix List

### P0 — Contrast (Accessibility Law / WCAG Blocker)
- `theme.css:30` — Lighten `--text-3: #5f6368` → `#878d93` (achieves ~4.8:1 on `--bg`)

### P1 — Mobile (Primary use case: Android via Discord)
- All 17 detail pages — Add `@media (max-width: 600px)` block (or extract to `pages.css`)
- `a11y-widget.css:89` — Add `max-width: calc(100vw - 48px)` to panel

### P2 — Touch Targets (Android usability)
- `a11y-widget.css:156` — Raise `.a11y-close-btn` to 44×44px
- All pages — Add `min-height: 44px` to `.back-link`

### P3 — Font Sizes
- `theme.css:35` — Raise `--fs-xs: 13px` → `14px`
- `a11y-widget.css:267` — Raise toggle description from 10.5px → 12px minimum

### P4 — Design System Extraction
- Create `pages.css` with shared boilerplate, `@keyframes fadeIn`, focus styles, scrollbars, `@media print`
- Add category color variables to `theme.css`

### P5 — Focus Rings
- Add `pages.css` or per-page `:focus-visible { outline: 2px solid var(--accent); ... }`

### P6 — Semantic HTML
- `tasks.html:428` `.rules-toggle` → `<button>`
- `agent.html:353` `.detail-header` → `<button>`
- `index.html` `.egg` → add `aria-hidden="true"`

### P7 — Minor Cleanup
- `a11y-widget.css:377` — Remove red from reset button hover
- `gateway.html:283` — `#0a0a0a` → `var(--bg)`
- `resources.html:155` — `#fbbf24` → `var(--warn)`
- tasks.html — Remove ~150 lines of unused CSS (cron/chroma/skill/mem styles)
