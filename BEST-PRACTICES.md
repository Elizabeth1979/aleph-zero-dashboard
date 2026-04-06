# Web Best Practices

## UX Patterns

- **Modal dialogs**: click outside backdrop to close is standard (focus is trapped, backdrop is visible)
- **Non-modal panels** (settings, tools, sidebars): do NOT close on outside click. User opened it intentionally — let them close with X button or Escape key. Click-outside is frustrating when you accidentally dismiss a panel you're using.
- **Tooltips/popovers**: click outside to close is fine (they're transient)
- **General rule**: the more persistent the UI, the more explicit the close action should be

Living reference file. Updated as we build and learn.

---

## HTML

- Use semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- One `<main>` per page
- Headings in order — don't skip levels (h1 → h2 → h3)
- Use `<button>` for actions, `<a>` for navigation — never a `<div>` with click handlers
- Always include `lang` attribute on `<html>`
- Images need meaningful `alt` text (or `alt=""` for decorative)
- Use `<label>` with `for` attribute for every form input
- Don't use `<br>` for spacing — use CSS margin/padding

## CSS

- Don't use interactive-looking elements (checkboxes, toggles) if they're not actionable — use passive indicators instead (dots, badges, color)
- Use CSS custom properties (variables) for colors, spacing, fonts — single source of truth
- Mobile-first: write base styles for small screens, add `min-width` media queries for larger
- Use `rem` for font sizes, `em` for component-relative spacing
- Avoid `!important` — fix specificity instead
- Use logical properties (`margin-inline`, `padding-block`) for RTL support
- Prefer `gap` over margins for flex/grid children
- Use `clamp()` for fluid typography: `font-size: clamp(1rem, 2.5vw, 1.5rem)`
- Keep specificity flat — prefer classes over nested selectors
- Group related properties: layout → box model → typography → visual
- Use `prefers-reduced-motion` media query for animations
- Use `prefers-color-scheme` for dark/light mode
- Avoid fixed heights — let content determine height
- Use `min-height` instead of `height` for containers
- **px is absolute** — setting `font-size: 120%` on `<html>` only scales `em`/`rem`, not `px`. If CSS variables use `px` (e.g. `--fs-base: 15px`), override them with scaled values for font-size toggles
- **Prefer % on `<html>` for font scaling** — `font-size: 120%` on `<html>` scales everything using `rem`/`em` automatically. Two lines instead of twenty element-specific rules
- **Avoid `calc()` with `em` for sizing** — `calc(1em + 2px)` compounds on nested elements (each level adds 2px more). Use `rem` or CSS variable overrides instead
- **Don't list specific elements for global changes** — targeting `p`, `span`, `li` etc. individually misses headings, divs, buttons, inputs. Apply to `<html>` or `:root` and let inheritance do the work

## JavaScript

- Use `const` by default, `let` when reassignment needed, never `var`
- Use template literals over string concatenation
- Prefer `addEventListener` over inline `onclick`
- Debounce scroll/resize handlers
- Use `async/await` over `.then()` chains
- Handle errors with try/catch — don't swallow errors silently
- Use `document.querySelector` / `querySelectorAll` over `getElementById`
- Keep DOM reads and writes batched to avoid layout thrashing

## Accessibility (a11y)

- Color contrast: minimum 4.5:1 for normal text, 3:1 for large text (WCAG AA)
- All interactive elements must be keyboard accessible (Tab, Enter, Escape)
- Use `aria-label` or `aria-labelledby` when visible text isn't enough
- Use `role` attributes only when semantic HTML can't do the job
- Focus indicators must be visible — never `outline: none` without replacement
- Use `aria-live` regions for dynamic content updates
- Skip-to-content link as first focusable element
- Don't rely on color alone to convey information
- Test with screen reader (TalkBack on Android)
- Minimum touch target: 44×44px (WCAG 2.5.5)
- Form errors: associate with `aria-describedby`, announce with `aria-live`
- **Underline links = inline text links only** — navigational block elements (`<a class="card">`, bento cards) are visually distinct already. Don't underline those. Target inline `<a>` inside text content, not every `<a>` on the page

## Security

- Never commit secrets, API keys, or tokens in client-side code
- CDN scripts must have `integrity` + `crossorigin="anonymous"` (Subresource Integrity)
- Sanitize any dynamic content before `innerHTML` — use `textContent` for plain text, `esc()` for HTML templates
- External links: always `rel="noopener noreferrer"` on `target="_blank"`
- No `eval()`, `new Function()`, or `document.write()`
- No inline event handlers (`onclick="..."`) — use `addEventListener`
- Avoid loading scripts from untrusted third-party domains
- Use HTTPS for all external resources
- Set `autocomplete="off"` on sensitive form inputs
- Don't store sensitive data in `localStorage` — it's accessible to any JS on the domain

## Performance

- Lazy-load images below the fold: `loading="lazy"`
- Use `<picture>` with `srcset` for responsive images
- Minimize layout shifts — set explicit `width`/`height` on images
- Defer non-critical JS: `<script defer>`
- Inline critical CSS, lazy-load the rest

---

*Last updated: 2026-04-04 (added: px vs rem scaling, font-size toggle patterns, underline links scope)*
