/**
 * HERMES DASHBOARD — Accessibility Widget
 * a11y-widget.js
 *
 * Self-contained. No external dependencies.
 * Reads/writes state to localStorage key: hermes-a11y
 * Applies classes to document.documentElement.
 */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Constants
  ---------------------------------------------------------- */
  const LS_KEY = 'hermes-a11y';
  const LS_SEEN_KEY = 'hermes-a11y-seen';

  const FONT_CYCLE = ['default', 'lg', 'xl'];
  const FONT_LABELS = { default: 'Default', lg: 'Large', xl: 'XL' };

  const CB_CYCLE = ['off', 'deuteranopia', 'protanopia', 'tritanopia'];
  const CB_LABELS = { off: 'Off', deuteranopia: 'Red-Green', protanopia: 'Red-Weak', tritanopia: 'Blue-Yellow' };

  /* LOCKED — Feature order and panel layout approved by Elli 2026-04-05.
     10 features in this order. Do not reorder or change the panel UI structure. */
  /* Feature definitions */
  const FEATURES = [
    {
      id: 'underline-links',
      cls: 'a11y-underline-links',
      label: 'Underline Links',
      desc: 'Adds underlines to all links',
      type: 'toggle',
      icon: /* svg underline */ `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 4v6a6 6 0 0 0 12 0V4"/>
        <line x1="4" y1="20" x2="20" y2="20"/>
      </svg>`,
    },
    {
      id: 'high-contrast',
      cls: 'a11y-high-contrast',
      label: 'High Contrast',
      desc: 'Boosts text and background contrast',
      type: 'toggle',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 3a9 9 0 0 1 0 18V3z" fill="currentColor" stroke="none"/>
      </svg>`,
    },
    {
      id: 'colorblind',
      cls: null, // managed via a11y-cb-deuteranopia / a11y-cb-protanopia / a11y-cb-tritanopia
      label: 'Color Vision',
      desc: 'Cycles: Off → Red-Green → Red-Weak → Blue-Yellow',
      type: 'cycle-cb',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M9 12a3 3 0 0 1 6 0"/>
        <circle cx="9.5" cy="10" r="1" fill="currentColor" stroke="none"/>
        <circle cx="14.5" cy="10" r="1" fill="currentColor" stroke="none"/>
      </svg>`,
    },
    {
      id: 'dyslexia-font',
      cls: 'a11y-dyslexia-font',
      label: 'Dyslexia Friendly Font',
      desc: 'Switches to Lexend for readability',
      type: 'toggle',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="4 7 4 4 20 4 20 7"/>
        <line x1="9" y1="20" x2="15" y2="20"/>
        <line x1="12" y1="4" x2="12" y2="20"/>
      </svg>`,
    },
    {
      id: 'font-size',
      cls: null, // managed via a11y-font-lg / a11y-font-xl
      label: 'Increase Font Size',
      desc: 'Cycles: Default → Large → XL',
      type: 'cycle',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <text x="8.5" y="16" font-size="10" font-family="Inter,sans-serif" fill="currentColor" stroke="none" font-weight="600">A</text>
        <text x="13" y="15.5" font-size="7.5" font-family="Inter,sans-serif" fill="currentColor" stroke="none" font-weight="600">a</text>
      </svg>`,
    },
    {
      id: 'focus-highlight',
      cls: 'a11y-focus-highlight',
      label: 'Highlight Focus',
      desc: 'Visible outlines on focused elements',
      type: 'toggle',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke-dasharray="4 2"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>`,
    },
    {
      id: 'reduce-motion',
      cls: 'a11y-reduce-motion',
      label: 'Reduce Motion',
      desc: 'Stops animations and transitions',
      type: 'toggle',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <line x1="8" y1="12" x2="16" y2="12"/>
      </svg>`,
    },
    {
      id: 'letter-spacing',
      cls: 'a11y-letter-spacing',
      label: 'Letter Spacing',
      desc: 'Increases space between characters',
      type: 'toggle',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M7 8h10"/>
        <path d="M5 12h14"/>
        <path d="M7 16h10"/>
        <line x1="3" y1="8" x2="3" y2="16"/>
        <line x1="21" y1="8" x2="21" y2="16"/>
      </svg>`,
    },
    {
      id: 'reading-guide',
      cls: 'a11y-reading-guide',
      label: 'Reading Guide',
      desc: 'Horizontal line follows your cursor',
      type: 'toggle',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"/>
        <polyline points="8 8 12 4 16 8"/>
      </svg>`,
    },
    {
      id: 'big-cursor',
      cls: 'a11y-big-cursor',
      label: 'Big Cursor',
      desc: 'Enlarges the mouse pointer',
      type: 'toggle',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 4l7 18 2.5-7.5L21 12z" fill="currentColor" stroke="none"/>
        <path d="M4 4l7 18 2.5-7.5L21 12z"/>
      </svg>`,
    },
  ];

  /* ----------------------------------------------------------
     State management
  ---------------------------------------------------------- */
  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) || '{}');
    } catch {
      return {};
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch { /* quota exceeded — silently ignore */ }
  }

  function hasBeenSeen() {
    try {
      return !!localStorage.getItem(LS_SEEN_KEY);
    } catch {
      return false;
    }
  }

  function markSeen() {
    try {
      localStorage.setItem(LS_SEEN_KEY, '1');
    } catch {}
  }

  /* ----------------------------------------------------------
     CSS class application
  ---------------------------------------------------------- */
  const html = document.documentElement;

  function applyFontSize(level) {
    html.classList.remove('a11y-font-lg', 'a11y-font-xl');
    if (level === 'lg') html.classList.add('a11y-font-lg');
    if (level === 'xl') html.classList.add('a11y-font-xl');
  }

  function applyColorblind(mode) {
    html.classList.remove('a11y-cb-deuteranopia', 'a11y-cb-protanopia', 'a11y-cb-tritanopia');
    // Also remove legacy class
    html.classList.remove('a11y-colorblind');
    if (mode && mode !== 'off') html.classList.add('a11y-cb-' + mode);
  }

  function applyState(state) {
    FEATURES.forEach(feat => {
      if (feat.type === 'toggle' && feat.cls) {
        html.classList.toggle(feat.cls, !!state[feat.id]);
      }
    });
    applyFontSize(state['font-size'] || 'default');
    applyColorblind(state['colorblind'] || 'off');

    /* Load Lexend dynamically if enabled */
    if (state['dyslexia-font']) {
      loadLexend();
    }

    /* Reading guide: create/destroy the guide element */
    manageReadingGuide(!!state['reading-guide']);
  }

  /* ----------------------------------------------------------
     Lexend font — lazy-load from Google Fonts
  ---------------------------------------------------------- */
  let lexendLoaded = false;

  function loadLexend() {
    if (lexendLoaded) return;
    lexendLoaded = true;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600&display=swap';
    document.head.appendChild(link);
  }

  /* ----------------------------------------------------------
     Reading guide — horizontal bar following mouse
  ---------------------------------------------------------- */
  let readingGuideEl = null;

  function manageReadingGuide(enabled) {
    if (enabled && !readingGuideEl) {
      readingGuideEl = document.createElement('div');
      readingGuideEl.id = 'a11y-reading-guide';
      readingGuideEl.setAttribute('aria-hidden', 'true');
      document.body.appendChild(readingGuideEl);
      document.addEventListener('mousemove', moveReadingGuide);
    } else if (!enabled && readingGuideEl) {
      document.removeEventListener('mousemove', moveReadingGuide);
      readingGuideEl.remove();
      readingGuideEl = null;
    }
  }

  function moveReadingGuide(e) {
    if (readingGuideEl) {
      readingGuideEl.style.top = e.clientY + 'px';
    }
  }

  /* ----------------------------------------------------------
     Inject SVG filters for color vision
  ---------------------------------------------------------- */
  function injectSVGFilters() {
    if (document.getElementById('a11y-svg-filter-defs')) return;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('id', 'a11y-svg-filter-defs');
    svg.setAttribute('aria-hidden', 'true');
    svg.classList.add('a11y-svg-filters');
    svg.innerHTML = `
      <defs>
        <filter id="a11y-deuteranopia-filter" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="linearRGB">
          <feColorMatrix type="matrix" values="
            0.367 0.861 -0.228 0 0
            0.280 0.673  0.047 0 0
           -0.012 0.043  0.969 0 0
            0     0      0     1 0
          "/>
        </filter>
        <filter id="a11y-protanopia-filter" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="linearRGB">
          <feColorMatrix type="matrix" values="
            0.152 1.053 -0.205 0 0
            0.115 0.786  0.099 0 0
           -0.004 -0.048  1.052 0 0
            0     0      0     1 0
          "/>
        </filter>
        <filter id="a11y-tritanopia-filter" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="linearRGB">
          <feColorMatrix type="matrix" values="
            1.256 -0.077 -0.179 0 0
           -0.078  0.931  0.148 0 0
            0.005  0.691  0.304 0 0
            0      0      0     1 0
          "/>
        </filter>
      </defs>
    `;
    document.body.appendChild(svg);
  }

  /* ----------------------------------------------------------
     BUILD PANEL HTML
  ---------------------------------------------------------- */
  function buildPanel(state) {
    /* Accessibility symbol SVG — universal "person in circle" */
    const a11ySymbolSm = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="12" cy="7.5" r="1.6" fill="currentColor" stroke="none"/>
      <line x1="7" y1="11" x2="17" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="12" y1="11" x2="12" y2="15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="9" y1="19" x2="12" y2="15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="15" y1="19" x2="12" y2="15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`;

    const closeIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>`;

    let togglesHTML = '';

    FEATURES.forEach(feat => {
      let isOn;
      if (feat.type === 'cycle') {
        isOn = (state['font-size'] || 'default') !== 'default';
      } else if (feat.type === 'cycle-cb') {
        isOn = (state['colorblind'] || 'off') !== 'off';
      } else {
        isOn = !!state[feat.id];
      }

      const ariaPressed = isOn ? 'true' : 'false';

      let rightEl;
      if (feat.type === 'cycle') {
        const level = state['font-size'] || 'default';
        rightEl = `<span class="a11y-font-badge" data-font-badge>${FONT_LABELS[level]}</span>`;
      } else if (feat.type === 'cycle-cb') {
        const mode = state['colorblind'] || 'off';
        rightEl = `<span class="a11y-font-badge" data-cb-badge>${CB_LABELS[mode]}</span>`;
      } else {
        rightEl = `<span class="a11y-toggle-pill" aria-hidden="true"></span>`;
      }

      togglesHTML += `
        <button
          class="a11y-toggle"
          data-feature="${feat.id}"
          aria-pressed="${ariaPressed}"
          title="${feat.label}"
          type="button"
        >
          <span class="a11y-toggle-icon" aria-hidden="true">${feat.icon}</span>
          <span class="a11y-toggle-label">
            <span class="a11y-toggle-name">${feat.label}</span>
            <span class="a11y-toggle-desc">${feat.desc}</span>
          </span>
          ${rightEl}
        </button>
      `;
    });

    return `
      <div class="a11y-panel-header">
        <div>
          <div class="a11y-panel-title">
            ${a11ySymbolSm}
            Accessibility
          </div>
          <div class="a11y-panel-subtitle">Customise your experience</div>
        </div>
        <button class="a11y-close-btn" id="a11y-close-btn" aria-label="Close accessibility panel" type="button">
          ${closeIcon}
        </button>
      </div>
      <div class="a11y-panel-body" role="group" aria-label="Accessibility options">
        ${togglesHTML}
      </div>
      <div class="a11y-panel-footer">
        <button class="a11y-reset-btn" id="a11y-reset-btn" type="button">↺ Reset All</button>
      </div>
    `;
  }

  /* ----------------------------------------------------------
     MAIN WIDGET INIT
  ---------------------------------------------------------- */
  function init() {
    /* ---- Restore state before paint ---- */
    let state = loadState();
    applyState(state);

    /* ---- Inject SVG colour-filter definitions ---- */
    injectSVGFilters();

    /* ---- Build the floating button ---- */
    const btn = document.createElement('button');
    btn.id = 'a11y-widget-btn';
    btn.setAttribute('aria-label', 'Open accessibility settings');
    btn.setAttribute('aria-haspopup', 'dialog');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('type', 'button');

    /* Universal accessibility symbol SVG */
    btn.innerHTML = `
      <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" fill="#0b0e11">
        <!-- Outer circle -->
        <circle cx="50" cy="50" r="47" fill="none" stroke="#0b0e11" stroke-width="6"/>
        <!-- Head -->
        <circle cx="50" cy="22" r="9" fill="#0b0e11"/>
        <!-- Arms outstretched horizontally -->
        <line x1="14" y1="42" x2="86" y2="42" stroke="#0b0e11" stroke-width="7" stroke-linecap="round"/>
        <!-- Torso -->
        <line x1="50" y1="42" x2="50" y2="63" stroke="#0b0e11" stroke-width="7" stroke-linecap="round"/>
        <!-- Left leg -->
        <line x1="50" y1="63" x2="30" y2="85" stroke="#0b0e11" stroke-width="7" stroke-linecap="round"/>
        <!-- Right leg -->
        <line x1="50" y1="63" x2="70" y2="85" stroke="#0b0e11" stroke-width="7" stroke-linecap="round"/>
      </svg>
    `;

    /* ---- Build the panel ---- */
    const panel = document.createElement('div');
    panel.id = 'a11y-widget-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Accessibility settings');
    panel.setAttribute('aria-modal', 'false');
    panel.innerHTML = buildPanel(state);

    document.body.appendChild(btn);
    document.body.appendChild(panel);

    /* ---- Pulse on first visit ---- */
    if (!hasBeenSeen()) {
      btn.classList.add('a11y-pulse');
    }

    /* ----------------------------------------------------------
       OPEN / CLOSE
    ---------------------------------------------------------- */
    let isOpen = false;

    function openPanel() {
      isOpen = true;
      panel.classList.add('a11y-panel-open');
      btn.setAttribute('aria-expanded', 'true');
      /* Stop pulse permanently after first open */
      if (btn.classList.contains('a11y-pulse')) {
        btn.classList.remove('a11y-pulse');
        markSeen();
      }
      /* Refresh panel state */
      panel.innerHTML = buildPanel(state);
      bindPanelEvents();
      /* Focus the close button */
      requestAnimationFrame(() => {
        const closeBtn = document.getElementById('a11y-close-btn');
        if (closeBtn) closeBtn.focus();
      });
    }

    function closePanel() {
      isOpen = false;
      panel.classList.remove('a11y-panel-open');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }

    /* ----------------------------------------------------------
       TOGGLE HANDLER
    ---------------------------------------------------------- */
    function handleToggle(feat) {
      if (feat.type === 'toggle') {
        state[feat.id] = !state[feat.id];
        html.classList.toggle(feat.cls, state[feat.id]);

        /* Load Lexend on first activation */
        if (feat.id === 'dyslexia-font' && state[feat.id]) {
          loadLexend();
        }
        /* Toggle reading guide */
        if (feat.id === 'reading-guide') {
          manageReadingGuide(state[feat.id]);
        }

      } else if (feat.type === 'cycle') {
        /* Font size cycle: default → lg → xl → default */
        const current = state['font-size'] || 'default';
        const idx = FONT_CYCLE.indexOf(current);
        const next = FONT_CYCLE[(idx + 1) % FONT_CYCLE.length];
        state['font-size'] = next;
        applyFontSize(next);
      } else if (feat.type === 'cycle-cb') {
        /* Colorblind cycle: off → deuteranopia → protanopia → tritanopia → off */
        const current = state['colorblind'] || 'off';
        const idx = CB_CYCLE.indexOf(current);
        const next = CB_CYCLE[(idx + 1) % CB_CYCLE.length];
        state['colorblind'] = next;
        applyColorblind(next);
      }

      saveState(state);

      /* Re-render panel — preserve scroll position */
      const body = panel.querySelector('.a11y-panel-body');
      const scrollY = body ? body.scrollTop : 0;
      panel.innerHTML = buildPanel(state);
      bindPanelEvents();
      const newBody = panel.querySelector('.a11y-panel-body');
      if (newBody) newBody.scrollTop = scrollY;
    }

    /* ----------------------------------------------------------
       RESET
    ---------------------------------------------------------- */
    function handleReset() {
      state = {};
      saveState(state);
      applyState(state);
      panel.innerHTML = buildPanel(state);
      bindPanelEvents();
    }

    /* ----------------------------------------------------------
       BIND PANEL EVENTS (called after every re-render)
    ---------------------------------------------------------- */
    function bindPanelEvents() {
      /* Close button */
      const closeBtn = document.getElementById('a11y-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closePanel(); });
      }

      /* Reset button */
      const resetBtn = document.getElementById('a11y-reset-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', (e) => { e.stopPropagation(); handleReset(); });
      }

      /* Toggle buttons */
      const toggleBtns = panel.querySelectorAll('.a11y-toggle');
      toggleBtns.forEach(toggleBtn => {
        const featureId = toggleBtn.dataset.feature;
        const feat = FEATURES.find(f => f.id === featureId);
        if (!feat) return;

        toggleBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          handleToggle(feat);
        });
      });
    }

    /* ----------------------------------------------------------
       BUTTON CLICK
    ---------------------------------------------------------- */
    btn.addEventListener('click', () => {
      if (isOpen) {
        closePanel();
      } else {
        openPanel();
      }
    });

    /* ----------------------------------------------------------
       CLOSE ON OUTSIDE CLICK
    ---------------------------------------------------------- */
    document.addEventListener('mousedown', (e) => {
      if (!isOpen) return;
      // Non-modal panels: don't close on outside click.
      // User has X button and Escape key for explicit control.
      return;
    });

    /* ----------------------------------------------------------
       CLOSE ON ESCAPE
    ---------------------------------------------------------- */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        closePanel();
      }
    });

    /* Initial panel event binding (panel already rendered) */
    bindPanelEvents();
  }

  /* ----------------------------------------------------------
     Early class restore (before DOMContentLoaded)
     so there's no flash of unstyled state.
  ---------------------------------------------------------- */
  (function earlyRestore() {
    try {
      const state = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
      const html = document.documentElement;
      FEATURES.forEach(feat => {
        if (feat.type === 'toggle' && feat.cls && state[feat.id]) {
          html.classList.add(feat.cls);
        }
      });
      const fs = state['font-size'] || 'default';
      if (fs === 'lg') html.classList.add('a11y-font-lg');
      if (fs === 'xl') html.classList.add('a11y-font-xl');
      const cb = state['colorblind'] || 'off';
      if (cb !== 'off') html.classList.add('a11y-cb-' + cb);
    } catch { /* ignore */ }
  })();

  /* ----------------------------------------------------------
     Bootstrap
  ---------------------------------------------------------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
