/* ============================================================
   A11y Tester — Accessibility Testing Toolkit
   Tools: Headings, Landmarks, Alt Text, Labels, Hidden Elements
   ============================================================ */

(function () {
  'use strict';

  // Don't double-init
  if (window.__a11yTesterInit) return;
  window.__a11yTesterInit = true;

  const TOOLS = [
    {
      id: 'headings',
      name: 'Headings Map',
      desc: 'Show heading hierarchy (H1–H6)',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><path d="m17 12 3-2v8"/></svg>',
    },
    {
      id: 'landmarks',
      name: 'Landmarks',
      desc: 'Outline page regions (nav, main, etc.)',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
    },
    {
      id: 'alt-text',
      name: 'Alt Text',
      desc: 'Check images for alt text',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>',
    },
    {
      id: 'labels',
      name: 'Interactive Labels',
      desc: 'Show accessible names of buttons & links',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
    },
    {
      id: 'hidden',
      name: 'Hidden Elements',
      desc: 'Reveal aria-hidden & visually hidden',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',
    },
  ];

  let activeTools = {};
  let overlayElements = [];

  // --- Helpers ---
  function esc(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function clearOverlays() {
    overlayElements.forEach(el => el.remove());
    overlayElements = [];
    document.querySelectorAll(
      '.a11y-tester-heading-overlay, .a11y-tester-landmark-overlay, ' +
      '.a11y-tester-img-overlay, .a11y-tester-label-overlay, .a11y-tester-hidden-reveal'
    ).forEach(el => {
      el.classList.remove(
        'a11y-tester-heading-overlay', 'a11y-tester-landmark-overlay',
        'a11y-tester-img-overlay', 'a11y-tester-label-overlay',
        'a11y-tester-hidden-reveal', 'missing'
      );
    });
  }

  function addBadge(el, text, className) {
    const badge = document.createElement('span');
    badge.className = className;
    badge.textContent = text;
    el.style.position = el.style.position || 'relative';
    el.appendChild(badge);
    overlayElements.push(badge);
    return badge;
  }

  function getAccessibleName(el) {
    // aria-label
    if (el.getAttribute('aria-label')) return el.getAttribute('aria-label');
    // aria-labelledby
    const lblId = el.getAttribute('aria-labelledby');
    if (lblId) {
      const parts = lblId.split(/\s+/).map(id => {
        const ref = document.getElementById(id);
        return ref ? ref.textContent.trim() : '';
      }).filter(Boolean);
      if (parts.length) return parts.join(' ');
    }
    // label[for]
    if (el.id) {
      const label = document.querySelector(`label[for="${el.id}"]`);
      if (label) return label.textContent.trim();
    }
    // title
    if (el.title) return el.title;
    // text content for buttons/links
    const text = el.textContent.trim();
    if (text) return text;
    // alt for img inside
    const img = el.querySelector('img[alt]');
    if (img && img.alt) return img.alt;
    return '';
  }

  // --- Tool implementations ---

  function runHeadings() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const results = [];
    let lastLevel = 0;
    let issues = 0;

    headings.forEach(h => {
      // Skip elements inside the tester panel itself
      if (h.closest('.a11y-tester-panel, .a11y-tester-toggle')) return;

      const level = parseInt(h.tagName[1]);
      const text = h.textContent.trim() || '(empty)';
      const skipped = lastLevel > 0 && level > lastLevel + 1;
      if (skipped) issues++;
      if (!h.textContent.trim()) issues++;

      results.push({ level, text, skipped, empty: !h.textContent.trim() });

      // On-page overlay
      h.classList.add('a11y-tester-heading-overlay');
      addBadge(h, h.tagName, 'a11y-tester-heading-badge');

      lastLevel = level;
    });

    // Build results HTML
    let html = '';
    if (headings.length === 0) {
      html = '<div class="atr-summary fail">No headings found on this page</div>';
    } else {
      const status = issues > 0 ? 'warn' : 'pass';
      const msg = issues > 0
        ? `${headings.length} headings, ${issues} issue${issues > 1 ? 's' : ''}`
        : `${headings.length} headings — all good`;
      html = `<div class="atr-summary ${status}">${msg}</div>`;
      results.forEach(r => {
        const indent = r.level > 1 ? ` atr-indent-${Math.min(r.level - 1, 5)}` : '';
        const cls = r.skipped ? ' atr-warn' : (r.empty ? ' atr-error' : '');
        const warning = r.skipped ? ' ⚠ skipped level' : (r.empty ? ' ⚠ empty' : '');
        html += `<div class="atr-item${indent}"><span class="atr-tag">H${r.level}</span> <span class="atr-text${cls}">${esc(r.text)}${warning}</span></div>`;
      });
    }
    return html;
  }

  function runLandmarks() {
    const landmarkMap = {
      'header': 'banner',
      'nav': 'navigation',
      'main': 'main',
      'aside': 'complementary',
      'footer': 'contentinfo',
      'section': 'region',
      'form': 'form',
    };
    const ariaRoles = ['banner', 'navigation', 'main', 'complementary', 'contentinfo', 'region', 'form', 'search'];

    const found = [];

    // Semantic elements
    Object.keys(landmarkMap).forEach(tag => {
      document.querySelectorAll(tag).forEach(el => {
        if (el.closest('.a11y-tester-panel, .a11y-tester-toggle')) return;
        const role = el.getAttribute('role') || landmarkMap[tag];
        const label = el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || '';
        // section without label is not a landmark
        if (tag === 'section' && !label && !el.getAttribute('role')) return;
        found.push({ el, role, label, tag });
      });
    });

    // Explicit role attributes
    ariaRoles.forEach(role => {
      document.querySelectorAll(`[role="${role}"]`).forEach(el => {
        if (el.closest('.a11y-tester-panel, .a11y-tester-toggle')) return;
        if (found.some(f => f.el === el)) return; // already found
        const label = el.getAttribute('aria-label') || '';
        found.push({ el, role, label, tag: el.tagName.toLowerCase() });
      });
    });

    let html = '';
    if (found.length === 0) {
      html = '<div class="atr-summary fail">No landmarks found — page needs semantic structure</div>';
    } else {
      // Check for main
      const hasMain = found.some(f => f.role === 'main');
      const status = hasMain ? 'pass' : 'warn';
      const msg = hasMain
        ? `${found.length} landmarks found`
        : `${found.length} landmarks — no <main> found`;
      html = `<div class="atr-summary ${status}">${msg}</div>`;

      found.forEach(f => {
        const labelText = f.label ? ` "${f.label}"` : '';
        html += `<div class="atr-item"><span class="atr-tag">${f.role}</span> <span class="atr-text">&lt;${f.tag}&gt;${esc(labelText)}</span></div>`;

        // On-page overlay
        f.el.classList.add('a11y-tester-landmark-overlay');
        addBadge(f.el, f.role + (f.label ? ': ' + f.label : ''), 'a11y-tester-landmark-badge');
      });
    }
    return html;
  }

  function runAltText() {
    const images = document.querySelectorAll('img');
    let html = '';
    let missing = 0;
    let decorative = 0;
    let good = 0;

    if (images.length === 0) {
      return '<div class="atr-summary pass">No images on this page</div>';
    }

    const results = [];
    images.forEach(img => {
      if (img.closest('.a11y-tester-panel, .a11y-tester-toggle')) return;

      const alt = img.getAttribute('alt');
      const src = img.src.split('/').pop().split('?')[0] || '(inline)';
      let status, text;

      if (alt === null) {
        status = 'error';
        text = 'MISSING alt attribute';
        missing++;
      } else if (alt === '') {
        status = 'ok';
        text = 'decorative (alt="")';
        decorative++;
      } else {
        status = 'ok';
        text = alt;
        good++;
      }

      results.push({ img, src, status, text, alt });

      // On-page overlay
      img.classList.add('a11y-tester-img-overlay');
      if (alt === null) img.classList.add('missing');
      const badgeText = alt === null ? '⚠ NO ALT' : (alt === '' ? 'decorative' : alt);
      const badge = addBadge(img.parentElement || img, badgeText, 'a11y-tester-img-badge');
      if (alt === null) badge.classList.add('missing');
    });

    const total = missing + decorative + good;
    const summaryStatus = missing > 0 ? 'fail' : 'pass';
    const summaryMsg = missing > 0
      ? `${total} images — ${missing} missing alt text`
      : `${total} images — all have alt text`;
    html = `<div class="atr-summary ${summaryStatus}">${summaryMsg}</div>`;

    results.forEach(r => {
      const cls = r.status === 'error' ? ' atr-error' : ' atr-ok';
      html += `<div class="atr-item"><span class="atr-tag">${esc(r.src)}</span><br><span class="${cls}">${esc(r.text)}</span></div>`;
    });

    return html;
  }

  function runLabels() {
    const interactives = document.querySelectorAll(
      'a[href], button, input, select, textarea, [role="button"], [role="link"], [tabindex]'
    );
    let html = '';
    let missing = 0;
    let total = 0;

    const results = [];
    interactives.forEach(el => {
      if (el.closest('.a11y-tester-panel, .a11y-tester-toggle')) return;

      const tag = el.tagName.toLowerCase();
      const role = el.getAttribute('role') || tag;
      const name = getAccessibleName(el);
      total++;

      if (!name) {
        missing++;
        results.push({ el, role, name: '(no accessible name)', hasName: false });
      } else {
        results.push({ el, role, name, hasName: true });
      }

      // On-page overlay
      el.classList.add('a11y-tester-label-overlay');
      const badge = addBadge(el, name || '⚠ NO NAME', 'a11y-tester-label-badge');
      if (!name) badge.classList.add('missing');
    });

    if (total === 0) {
      return '<div class="atr-summary pass">No interactive elements found</div>';
    }

    const status = missing > 0 ? 'fail' : 'pass';
    const msg = missing > 0
      ? `${total} interactive elements — ${missing} missing names`
      : `${total} interactive elements — all labeled`;
    html = `<div class="atr-summary ${status}">${msg}</div>`;

    // Show missing first
    const sorted = [...results.filter(r => !r.hasName), ...results.filter(r => r.hasName)];
    sorted.forEach(r => {
      const cls = r.hasName ? 'atr-ok' : 'atr-error';
      html += `<div class="atr-item"><span class="atr-tag">${r.role}</span> <span class="${cls}">${esc(r.name)}</span></div>`;
    });

    return html;
  }

  function runHidden() {
    const hidden = [];

    // aria-hidden elements
    document.querySelectorAll('[aria-hidden="true"]').forEach(el => {
      if (el.closest('.a11y-tester-panel, .a11y-tester-toggle')) return;
      // Skip common decorative aria-hidden (icons)
      if (el.tagName === 'SVG' || el.tagName === 'I') return;
      hidden.push({ el, reason: 'aria-hidden="true"', tag: el.tagName.toLowerCase() });
    });

    // display:none / visibility:hidden with content
    document.querySelectorAll('*').forEach(el => {
      if (el.closest('.a11y-tester-panel, .a11y-tester-toggle')) return;
      if (hidden.some(h => h.el === el)) return;
      const style = getComputedStyle(el);
      if (
        (style.display === 'none' || style.visibility === 'hidden') &&
        el.textContent.trim() &&
        el.children.length < 20 // skip large containers
      ) {
        const reason = style.display === 'none' ? 'display: none' : 'visibility: hidden';
        hidden.push({ el, reason, tag: el.tagName.toLowerCase() });
      }
    });

    // sr-only / visually-hidden
    document.querySelectorAll('.sr-only, .visually-hidden, [class*="screen-reader"]').forEach(el => {
      if (el.closest('.a11y-tester-panel, .a11y-tester-toggle')) return;
      if (hidden.some(h => h.el === el)) return;
      hidden.push({ el, reason: 'visually hidden (sr-only)', tag: el.tagName.toLowerCase() });
    });

    let html = '';
    if (hidden.length === 0) {
      return '<div class="atr-summary pass">No hidden elements with content found</div>';
    }

    html = `<div class="atr-summary warn">${hidden.length} hidden elements found</div>`;
    hidden.forEach(h => {
      const text = h.el.textContent.trim().slice(0, 80);
      html += `<div class="atr-item"><span class="atr-tag">&lt;${h.tag}&gt;</span> <span class="atr-warn">${esc(h.reason)}</span><br><span class="atr-text">${esc(text)}${text.length >= 80 ? '...' : ''}</span></div>`;

      // On-page: try to reveal
      h.el.classList.add('a11y-tester-hidden-reveal');
      addBadge(h.el, h.reason, 'a11y-tester-hidden-badge');
    });

    return html;
  }

  const toolRunners = {
    headings: runHeadings,
    landmarks: runLandmarks,
    'alt-text': runAltText,
    labels: runLabels,
    hidden: runHidden,
  };

  // --- Build UI ---
  function buildPanel() {
    // Toggle button
    const toggle = document.createElement('button');
    toggle.className = 'a11y-tester-toggle';
    toggle.setAttribute('aria-label', 'Toggle accessibility tester');
    toggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
    document.body.appendChild(toggle);

    // Panel
    const panel = document.createElement('div');
    panel.className = 'a11y-tester-panel';
    panel.innerHTML = `
      <div class="a11y-tester-header">
        <div class="a11y-tester-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          A11y Tester
        </div>
        <button class="a11y-tester-close" aria-label="Close tester panel">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="a11y-tester-tools">
        ${TOOLS.map(t => `
          <button class="a11y-tester-tool" data-tool="${t.id}">
            ${t.icon}
            <div class="a11y-tester-tool-info">
              <div class="a11y-tester-tool-name">${t.name}</div>
              <div class="a11y-tester-tool-desc">${t.desc}</div>
            </div>
          </button>
        `).join('')}
      </div>
      <div class="a11y-tester-results" id="a11y-tester-results"></div>
    `;
    document.body.appendChild(panel);

    // Events
    toggle.addEventListener('click', () => {
      panel.classList.toggle('open');
    });

    panel.querySelector('.a11y-tester-close').addEventListener('click', () => {
      panel.classList.remove('open');
      // Clear all active tools
      Object.keys(activeTools).forEach(id => { activeTools[id] = false; });
      clearOverlays();
      panel.querySelectorAll('.a11y-tester-tool').forEach(b => b.classList.remove('active'));
      document.getElementById('a11y-tester-results').classList.remove('show');
    });

    panel.querySelectorAll('.a11y-tester-tool').forEach(btn => {
      btn.addEventListener('click', () => {
        const toolId = btn.dataset.tool;
        const isActive = btn.classList.contains('active');

        // Turn off all tools first
        Object.keys(activeTools).forEach(id => { activeTools[id] = false; });
        clearOverlays();
        panel.querySelectorAll('.a11y-tester-tool').forEach(b => b.classList.remove('active'));

        const resultsEl = document.getElementById('a11y-tester-results');

        if (isActive) {
          // Was active, now deactivate
          resultsEl.classList.remove('show');
          resultsEl.innerHTML = '';
        } else {
          // Activate this tool
          activeTools[toolId] = true;
          btn.classList.add('active');

          const runner = toolRunners[toolId];
          if (runner) {
            const resultHtml = runner();
            resultsEl.innerHTML = `<div class="a11y-tester-results-title">${TOOLS.find(t => t.id === toolId).name}</div>${resultHtml}`;
            resultsEl.classList.add('show');
          }
        }
      });
    });
  }

  // Init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildPanel);
  } else {
    buildPanel();
  }
})();
