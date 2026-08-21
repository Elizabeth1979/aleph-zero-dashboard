---
name: accessibility-widget
description: Build floating a11y toggle widgets for dark-themed web dashboards. Covers DOM orphaning pitfalls, mobile touch event handling, and dark-theme-aware contrast modes. Use when adding an accessibility panel to a web page. NOT for auditing existing a11y issues — use the a11y MCP tools instead.
custom: true
tags: [accessibility, a11y, css, javascript, widget, dashboard, mobile]
---

# Accessibility Widget

Build a floating accessibility button + panel for web pages. Toggles CSS classes on `<html>` for various a11y features. Saves to localStorage.

## When to Use

User wants an accessibility toggle panel on a website. Common features: underline links, high contrast, color vision filters (multiple colorblind types), dyslexia font, font size, focus highlight, reduce motion, letter spacing, reading guide, big cursor.

## Architecture

Two files, no dependencies:
- `a11y-widget.css` — widget chrome + feature class definitions
- `a11y-widget.js` — IIFE, self-contained, auto-initializes on DOMContentLoaded

Include both in every page:
```html
<link rel="stylesheet" href="a11y-widget.css">
<!-- before </body> -->
<script src="a11y-widget.js"></script>
```

## Key Design Decisions

### 1. Apply settings everywhere — including the widget itself
Do NOT scope the widget out of its own settings. If someone needs high contrast, they need it in the panel too. No `revert !important` or `:not(#widget)` exclusions.

### 2. Dark-theme-aware high contrast
For dark-themed sites, high contrast should NOT set `background: #000` — the site is already dark. Instead:
- Boost CSS custom property grays (`--text-2`, `--text-3`) — NOT to full white, but to high-contrast grays like `#e0e0e0` / `#d0d0d0`
- Do NOT add blanket `color: #ffffff !important` rules on all elements — this overrides accent colors (teal, etc.) and makes everything monochrome white
- Brighten accent colors on links
- Sharpen card/container borders
- Boost opacity on status indicators
- Do NOT force underlines on links (that's a separate toggle)

**Real bug (2026-04-04):** Original had `html.a11y-high-contrast p, span, div, h1-h6 { color: #ffffff !important }` — this killed teal accent colors, making everything white. Elli's feedback: "leave the teal alone, just boost the grays." Fix: delete element-level overrides entirely, only adjust CSS custom property values. Verified contrast ratios: `#d0d0d0` on `#0a0e27` = 12.3:1 (AAA), `#e0e0e0` on `#0a0e27` = 14.4:1 (AAA).

**Critical pitfall**: A blanket rule like `html.a11y-high-contrast p, span, div, h1... { color: #ffffff !important }` will override inherited accent/teal colors on those elements. High contrast means boosting LOW contrast grays — leave already-high-contrast accent colors alone. Only override CSS variables, not individual element colors.

### 3. Underline Links — skip card-level links
Cards that are `<a>` tags should not get underlined. Use `:not(.card):not([class*="card"])`:
```css
html.a11y-underline-links a:not(.card):not([class*="card"]):not([class*="bento"]) {
  text-decoration: underline !important;
  text-underline-offset: 3px !important;
}
```

## Critical Pitfall: DOM Orphaning on innerHTML Rebuild

### The Bug
Panel rebuilds its innerHTML on every toggle to update visual state. This orphans the clicked button from the DOM. If the outside-click handler uses `panel.contains(e.target)`, it returns false (orphaned node has no parent) → panel closes.

### What Does NOT Work
1. `panel.contains(e.target)` on `click` — orphaned node, always false
2. `e.target.closest('#panel')` on `click` — same problem, orphaned node
3. `mousedown` instead of `click` — still fails on mobile touch events
4. Flag-based approach (`clickInsideWidget = true` on panel pointerdown) — race conditions on mobile
5. `stopPropagation` on the panel element — doesn't reliably catch events from rebuilt children
6. `revert !important` on widget elements — reverts to UA defaults (white bg), not widget styles

### What WORKS
**`e.stopPropagation()` inside each button's click handler, BEFORE calling the handler that rebuilds innerHTML:**

```javascript
toggleBtn.addEventListener('click', (e) => {
  e.stopPropagation();  // Kill bubbling BEFORE innerHTML rebuild
  handleToggle(feat);   // This rebuilds panel.innerHTML
});
```

Combined with a simple outside-click listener using `mousedown` (fires before click):
```javascript
document.addEventListener('mousedown', (e) => {
  if (!isOpen) return;
  if (e.target.closest('#a11y-widget-panel') || e.target.closest('#a11y-widget-btn')) return;
  closePanel();
});
```

The `mousedown` fires before `click`, so at mousedown time the DOM hasn't been rebuilt yet and `closest()` works. The `stopPropagation` on click prevents any residual click events from reaching document-level handlers.

Apply `stopPropagation` to ALL interactive elements inside the panel: toggle buttons, close button, reset button.

## Features Checklist

| Feature | CSS Class | Type | Notes |
|---------|-----------|------|-------|
| Underline Links | `a11y-underline-links` | toggle | Skip card-level `<a>` tags |
| High Contrast | `a11y-high-contrast` | toggle | Dark-theme aware, no forced underlines |
| Color Vision | `a11y-cb-{mode}` | cycle | Off → deuteranopia → protanopia → tritanopia. Each mode has its own SVG feColorMatrix filter. Replaces old single "colorblind" toggle |
| Dyslexia Font | `a11y-dyslexia-font` | toggle | Lazy-load Lexend from Google Fonts |
| Font Size | `a11y-font-lg` / `a11y-font-xl` | cycle | Scale root + override `--fs-*` px vars |
| Focus Highlight | `a11y-focus-highlight` | toggle | 2.5px teal outline + glow on :focus |
| Reduce Motion | `a11y-reduce-motion` | toggle | Kills all animation-duration, transition-duration, scroll-behavior via `*, *::before, *::after` |
| Letter Spacing | `a11y-letter-spacing` | toggle | 0.12em letter-spacing + 0.16em word-spacing on all text elements |
| Reading Guide | `a11y-reading-guide` | toggle | JS-managed: creates `#a11y-reading-guide` div, tracks `mousemove`, sets `top` to `e.clientY`. Requires `manageReadingGuide()` to create/destroy the element |
| Big Cursor | `a11y-big-cursor` | toggle | Data URI SVG cursors at 32px. Separate pointer cursor for links/buttons |

### Cycle-type features
Font Size and Color Vision both use "cycle" type — clicking advances through an array of options. The badge shows the current mode label instead of a toggle pill. Both need:
- Dedicated `apply*()` function to remove all possible classes then add the current one
- Early restore must handle the cycle state separately from toggle features
- Panel builder must compute `isOn` differently (check if mode !== default/off)

### Color Vision implementation
Three separate SVG `<feColorMatrix>` filters injected into a hidden `<svg>` in `<body>`:
- `#a11y-deuteranopia-filter` — red-green deficiency (most common, ~6% of men)
- `#a11y-protanopia-filter` — red-weak
- `#a11y-tritanopia-filter` — blue-yellow (rare)

Applied via `filter: url(#a11y-{mode}-filter)` on `<html>`. CSS-level overrides change `.success`/green to blue and `.error`/red to orange as a complement.

### Reading Guide implementation
Not purely CSS — requires JS event listener for `mousemove`. The guide element is a fixed-position 3px teal bar with glow, `z-index: 9997`, `pointer-events: none`. Must create/destroy the element AND add/remove the event listener when toggled.

### Big Cursor implementation
Uses inline data URI SVGs in CSS `cursor` property. Two cursors:
- Default arrow (32px) for general elements
- Pointer hand (32px) for clickable elements (a, button, [role="button"])

## Coexistence with A11y Audit Toolkit

The a11y widget (bottom-right, for visitors) and the a11y audit toolkit (bottom-left, for QA testers) are separate projects. They must:
- Use different z-index ranges
- Position on opposite corners
- Not share any state or CSS classes
- Both be included on every page independently
- **Match visually** — same button size, background, shadow, border, hover/active states, icon size, positioning offset. Same panel width, background, border-radius, shadow, header style, close button style. Users immediately notice when sibling FABs look different.
- **Be mutually exclusive** — opening one panel must close the other. In the widget's `openPanel()`, close the tester panel. In the tester's toggle click, close the widget panel and reset its aria-expanded.

### Mutual exclusivity pattern
```javascript
// In widget openPanel():
const testerPanel = document.querySelector('.a11y-tester-panel');
if (testerPanel) testerPanel.classList.remove('open');

// In tester toggle click:
const widgetPanel = document.getElementById('a11y-widget-panel');
if (widgetPanel) {
  widgetPanel.classList.remove('a11y-panel-open');
  const widgetBtn = document.getElementById('a11y-widget-btn');
  if (widgetBtn) widgetBtn.setAttribute('aria-expanded', 'false');
}
```

See the `a11y-audit-toolkit` skill for the testing toolkit.

## Implementation Notes

- **Early restore**: Apply saved classes from localStorage BEFORE DOMContentLoaded to prevent flash of unstyled state. Must handle both toggle classes AND cycle states (font-size, colorblind mode)
- **Lazy font loading**: Only inject Google Fonts `<link>` when dyslexia font is first activated
- **Pulse animation**: Show on first visit (no localStorage key), stop permanently after first panel open
- **Respect `prefers-reduced-motion`**: Disable all transitions and animations via `@media` query
- **Manual reduce-motion toggle**: Separate from the OS-level media query — lets users disable motion even without OS setting
- **Button icon**: Use the universal accessibility symbol SVG (person with arms outstretched), not the wheelchair icon
- **Panel height**: Make the panel use available viewport with `max-height: calc(100vh - 120px)` and `display: flex; flex-direction: column` on the panel. The body needs `flex: 1; min-height: 0; overflow-y: auto` to grow into remaining space. Header/footer get `flex-shrink: 0`. On short screens/mobile, the body scrolls with thin scrollbar styling
- **Compact items for 10+ features**: Keep padding tight (6px 10px), gap small (2px), desc text at 10px, icons at 26px. Goal: all features visible without scrolling on a standard desktop viewport
- **Preserve scroll on toggle**: innerHTML rebuild resets `scrollTop`. Before `buildPanel()`, save `panel.querySelector('.a11y-panel-body').scrollTop`, then restore it after re-render. Critical for usability when toggling items near the bottom of a scrollable panel. Without this, every toggle jumps back to the top — very annoying when you're activating Big Cursor (the last item).
- **Special toggle handlers**: Reading Guide needs `manageReadingGuide()` call; Dyslexia Font needs `loadLexend()` — wire these in `handleToggle()` for the specific feature IDs
- **Panel flex layout for full height**: The panel needs `display: flex; flex-direction: column; max-height: calc(100vh - 120px)`. The body needs `flex: 1; min-height: 0; overflow-y: auto`. Header/footer need `flex-shrink: 0`. Without `min-height: 0` on the body, the flex item won't shrink below its content size and the scrollbar won't appear. Without `flex: 1`, the body won't grow to fill available space. This was a multi-iteration fix — just `max-height` on the body alone doesn't work because the panel itself needs to be a flex container first.

## Design & WCAG Standards

- Minimum font size: 14px — never use 13px (--fs-xs = 14px minimum in theme.css)
- Touch target size: WCAG 2.2 SC 2.5.8 (AA) = 24x24px minimum. 44px is SC 2.5.5 (AAA, optional). 26px already passes AA.
- No red in UI — including hover states (reset btn, close btn). Use teal/neutral hover colors instead.

## Pitfall: GitHub Pages Cache When Testing

GitHub Pages serves files with `cache-control: max-age=600` (10 minutes). When iterating on JS/CSS changes:
- `curl` shows the new file immediately (cache MISS), but the browser keeps serving the old one
- **Best fix**: Add `?v=<timestamp>` cache-bust params to ALL `<script>` and `<link>` tags across index.html AND all subpages. Bulk-update with `sed`:
  ```bash
  V="$(date +%s)" && sed -i '' "s|a11y-widget\.css?v=[0-9]*|a11y-widget.css?v=$V|g" index.html pages/*.html
  ```
- Mobile browsers (Android Chrome) are especially aggressive about caching — users won't see changes without cache-busting
- Closing the Browserbase session and navigating fresh helps for verification but doesn't fix the user's phone

## Pitfall: Bare File Paths in Rendered Markdown

When rendering markdown as HTML (e.g. `renderMd()` in a dashboard), file paths may appear as plain text WITHOUT backticks. The regex for linkifying `<code>` content won't match. Add a SECOND pass that catches bare paths:

```javascript
// After backtick→code conversion, also catch bare paths
html = html.replace(/(~\/.hermes\/memory\/)([\w-]+\.md)/g, function(_, prefix, file) {
  const key = file.replace('.md','').replace(/-/g,'_');
  return `<a href="#detail-${key}" class="file-link" data-detail="${key}"><code>${prefix}${file}</code></a>`;
});
```

Always check the actual content (not just the code) to see if paths use backticks or not.

## Pitfall: Back Button Navigation Between Dashboard Pages

Hardcoded `<a href="../index.html">` back links always go to the home page, even when the user arrived from a detail page. Fix: intercept back-link clicks with `history.back()`, falling back to the href if there's no history:

```javascript
document.querySelectorAll('a.back-link').forEach(link => {
  link.addEventListener('click', (e) => {
    if (window.history.length > 1) { e.preventDefault(); window.history.back(); }
  });
});
```

Put this in a shared utils.js loaded by all pages.

## Pitfall: Font Size with px CSS Variables

If the site defines font sizes as CSS custom properties with `px` values (`--fs-sm: 14px`), setting `font-size: 120%` on `<html>` won't scale them — `px` is absolute. Override the variables too:

```css
html.a11y-font-lg {
  font-size: 120% !important;
  --fs-xs:   15.5px !important;
  --fs-sm:   17px !important;
  --fs-base: 18px !important;
  --fs-lg:   20px !important;
  --fs-xl:   24px !important;
  --fs-2xl:  34px !important;
  --fs-3xl:  48px !important;
}
```
---
name: a11y-audit-toolkit
description: Build floating a11y audit/testing toolkits for QA testers — headings map, landmarks, alt text, labels, hidden elements, tab order, contrast, focus, ARIA validation, form labels. Separate from the visitor-facing a11y widget.
custom: true
tags: [accessibility, a11y, testing, QA, audit, javascript, css]
---

# A11y Audit Toolkit

A floating panel with testing tools for QA/accessibility testers. Unlike the a11y widget (which customizes the experience for visitors), this is for inspecting and auditing page accessibility.

## When to Use

User wants accessibility testing tools overlaid on a web page — similar to Chrome extensions like Headings Map, Landmarks, Alt Text Viewer. The toolkit is for testers, not end users.

## Architecture

Two files, no dependencies:
- `a11y-tester.css` — panel chrome + all overlay styles
- `a11y-tester.js` — IIFE, self-contained, auto-initializes

Position: **bottom-left** (the a11y widget uses bottom-right). They must never conflict.

**The tester button and panel must visually match the widget's.** Users notice immediately when sibling FABs differ in size, shadow, background, or border. Copy the exact CSS values from the widget button/panel — don't approximate.

```html
<link rel="stylesheet" href="a11y-tester.css">
<script src="a11y-tester.js"></script>
```

## Visual Parity with A11y Widget (CRITICAL)

Both floating buttons must share identical styles:
- Size: 48×48px, `border-radius: 50%`
- Background: `#5de4d4`, border: `none`
- Shadow: `0 4px 16px rgba(93,228,212,0.35), 0 2px 6px rgba(0,0,0,0.5)`
- Icon: 26×26px, `display: block; flex-shrink: 0`
- Hover: `filter: brightness(1.12); transform: scale(1.06)` with matching shadow boost
- Active: `transform: scale(0.97)`
- Focus-visible: `outline: 2px solid #5de4d4; outline-offset: 3px`
- Position offset: 24px from edge

Both panels must share:
- Width: 280px
- Background: `#13171c`
- Border: `1px solid rgba(255,255,255,0.08)`
- Border-radius: 14px
- Shadow: `0 8px 40px rgba(0,0,0,0.65), 0 2px 8px rgba(0,0,0,0.4)`
- Open/close: opacity + translateY animation, NOT display:none/flex toggle
- Header: 10px 14px 8px padding, 13px font, same close button (26×26, rounded 6px)

## Mutual Exclusivity

Opening the tester panel must close the widget panel, and vice versa:
```javascript
// In tester toggle click handler:
const willOpen = !panel.classList.contains('open');
panel.classList.toggle('open');
if (willOpen) {
  const widgetPanel = document.getElementById('a11y-widget-panel');
  if (widgetPanel) {
    widgetPanel.classList.remove('a11y-panel-open');
    const widgetBtn = document.getElementById('a11y-widget-btn');
    if (widgetBtn) widgetBtn.setAttribute('aria-expanded', 'false');
  }
}
```

## Tools (10 total)

### Inspection Tools (show what's on the page)
1. **Headings Map** — H1-H6 hierarchy + red outlines with level badges. Warns on skipped levels or empty headings.
2. **Landmarks** — Outlines semantic regions (nav, main, header, footer, section[aria-label]) in blue with role labels. Warns if no `<main>`.
3. **Alt Text** — Checks every `<img>` for alt attribute. Green outline = has alt, red = missing. Badge shows alt text.
4. **Interactive Labels** — Shows accessible name of every button, link, input. Purple outlines. Flags missing names.
5. **Hidden Elements** — Reveals aria-hidden and display:none elements with orange dashed outlines.

### Validation Tools (check for problems)
6. **Tab Order** — Numbered green circle badges showing tab sequence. Warns on tabindex > 0 anti-pattern.
7. **Color Contrast** — WCAG contrast ratio check with sRGB linearization. Walks DOM tree for real background color. Flags below 4.5:1 (3:1 for large text).
8. **Focus Indicators** — Checks for outline:none without compensating box-shadow. Orange overlays on suspects.
9. **ARIA Validation** — 7 checks: non-keyboard role="button", broken labelledby/describedby IDs, aria-hidden on focusable, invalid roles, missing controls, redundant native roles.
10. **Form Labels** — Audits inputs for labels (label[for], aria-label, wrapping label). Warns on placeholder-only labels, suggests autocomplete.

## Key Design Patterns

### One tool active at a time
Clicking a tool deactivates the previous one. This keeps the page readable — multiple overlays simultaneously would be chaos.

### On-page overlays + results panel
Each tool does two things:
1. Adds CSS classes and badge elements directly on the page elements
2. Returns HTML for the results panel with a summary (pass/warn/fail) + item list

### Overlay cleanup
Track all added DOM elements in an `overlayElements` array. On deactivate, remove them all and strip overlay CSS classes:
```javascript
function clearOverlays() {
  overlayElements.forEach(el => el.remove());
  overlayElements = [];
  document.querySelectorAll('[class*="a11y-tester-"]').forEach(el => {
    // remove all overlay classes
  });
}
```

### Skip self AND the a11y widget
Every tool must skip elements inside the audit panel AND the a11y widget. The widget uses IDs not classes:
```javascript
if (el.closest('.a11y-tester-panel, .a11y-tester-toggle, #a11y-widget-btn, #a11y-widget-panel')) return;
```
**CRITICAL**: The a11y widget uses `#a11y-widget-btn` and `#a11y-widget-panel` (IDs), NOT class selectors. Using `.a11y-widget-panel` will silently fail to exclude it.

### Badge positioning
Badges use `position: absolute` inside elements set to `position: relative`. Each tool uses different badge positions (top-left, top-right, bottom-left) and colors to avoid visual collision.

### Color coding by tool
- Headings: red `#e06c75`
- Landmarks: blue `#60a5fa`
- Alt text: teal `#5de4d4` (missing: red)
- Labels: purple `#c084fc`
- Hidden: orange `#e0a458`
- Tab order: green `#34d399`
- Contrast: green/red based on pass/fail
- Focus: orange `#f59e0b`
- ARIA: pink `#f472b6`
- Forms: cyan `#22d3ee`

### Accessible name computation
Helper function for getting computed accessible name:
```
aria-label → aria-labelledby → label[for] → title → textContent → img[alt]
```

### Contrast ratio calculation
Must use the real WCAG formula with sRGB linearization. Walk up DOM tree to find actual non-transparent background color.

## Pitfalls

### Don't share z-index space with the a11y widget
Tester toggle: `z-index: 10000`. Panel: `z-index: 10001`. The a11y widget uses different z-index range. They must not interfere.

### Mobile layout
On small screens, the panel must not cover the a11y widget button:
```css
@media (max-width: 480px) {
  .a11y-tester-panel {
    left: 8px;
    right: 8px;
    bottom: 74px;
    width: auto;
    max-height: 60vh;
  }
}
```

### Naming
Elli prefers "A11y Audit" over "A11y Tester" — it sounds more professional for showing to company QAs.

### position: relative !important breaks fixed-position elements
Overlay classes use `position: relative !important` so badges can be positioned absolutely inside them. If a tool adds an overlay class to a `position: fixed` element (like the a11y widget button), it breaks it out of its fixed position and the element disappears from view. The JS exclusions above prevent this, but it's the root cause if a fixed element vanishes when a tool runs.

### Click-outside handlers on other panels
If the page has a panel with a "click outside to close" listener (like the a11y widget), clicking inside the audit panel will be treated as "outside" and close the other panel. Fix: add the audit panel selectors to the other panel's click-outside exclusion:
```javascript
// In the OTHER panel's mousedown handler:
if (e.target.closest('.a11y-tester-panel') || e.target.closest('.a11y-tester-toggle')) return;
```

### CSS/JS caching on GitHub Pages
GitHub Pages caches aggressively (`max-age=600`). When iterating on CSS/JS, add `?v=<timestamp>` cache-bust params to `<link>` and `<script>` tags across ALL HTML files (index + subpages). Without this, mobile browsers serve stale files and changes appear broken. Use `sed` to bulk-update all pages:
```bash
V="$(date +%s)"
sed -i '' "s|a11y-tester\.css?v=[0-9]*|a11y-tester.css?v=$V|g" index.html pages/*.html
```
