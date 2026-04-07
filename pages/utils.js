// Shared utility functions for all dashboard pages

function esc(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function stripFrontmatter(raw) {
  const m = raw.match(/^---\n[\s\S]*?\n---\n?/);
  return m ? raw.slice(m[0].length) : raw;
}

function renderMd(raw) {
  // Extract fenced code blocks before escaping
  const codeBlocks = [];
  let preprocessed = raw.replace(/```(\w*)\n([\s\S]*?)```/g, function(_, lang, code) {
    codeBlocks.push({ lang: lang, code: code });
    return `%%CODEBLOCK_${codeBlocks.length - 1}%%`;
  });
  let html = esc(preprocessed);
  // Restore code blocks with proper formatting
  html = html.replace(/%%CODEBLOCK_(\d+)%%/g, function(_, i) {
    const cb = codeBlocks[+i];
    return `<pre class="code-block"><code>${esc(cb.code)}</code></pre>`;
  });
  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  // Bold & inline code
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/`([^`]+)`/g, function(_, inner) {
    // Linkify known file paths
    const memMatch = inner.match(/~\/.hermes\/memory\/(.+\.md)/);
    if (memMatch) {
      const key = memMatch[1].replace('.md','').replace(/-/g,'_');
      return `<a href="#detail-${key}" class="file-link" data-detail="${key}"><code>${inner}</code></a>`;
    }
    const dashMatch = inner.match(/~\/.hermes\/dashboard\/(.+)\.(json|html)/);
    if (dashMatch) {
      const pageMap = {
        'tasks': 'tasks.html', 'commands': 'commands.html',
        'config': 'config.html', 'data': null
      };
      const page = pageMap[dashMatch[1]];
      if (page) return `<a href="${page}" class="file-link"><code>${inner}</code></a>`;
    }
    return `<code>${inner}</code>`;
  });
  // Linkify bare file paths (not already inside a tag)
  html = html.replace(/(~\/.hermes\/memory\/)([\w-]+\.md)/g, function(_, prefix, file) {
    const key = file.replace('.md','').replace(/-/g,'_');
    return `<a href="#detail-${key}" class="file-link" data-detail="${key}"><code>${prefix}${file}</code></a>`;
  });
  html = html.replace(/(~\/.hermes\/dashboard\/)([\w-]+)\.(json|html|sh)/g, function(_, prefix, name, ext) {
    const pageMap = {
      'tasks': 'tasks.html', 'commands': 'commands.html',
      'config': 'config.html'
    };
    const page = pageMap[name];
    if (page) return `<a href="${page}" class="file-link"><code>${prefix}${name}.${ext}</code></a>`;
    return `<code>${prefix}${name}.${ext}</code>`;
  });
  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr>');
  // Section separators (§)
  html = html.replace(/^§$/gm, '<hr class="section-sep">');
  // Unordered list items → <li>
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');
  // Ordered list items → <li class="ol">
  html = html.replace(/^\d+\.\s+(.+)$/gm, '<li class="ol">$1</li>');
  // Wrap consecutive <li class="ol"> in <ol>
  html = html.replace(/((?:<li class="ol">.*<\/li>\n?)+)/g, function(block) {
    return '<ol>' + block.replace(/ class="ol"/g, '') + '</ol>';
  });
  // Remaining plain lines → <p> (skip empty, skip tags)
  html = html.split('\n').map(line => {
    const t = line.trim();
    if (!t || t.startsWith('<')) return line;
    return `<p>${t}</p>`;
  }).join('\n');
  return html;
}



// ── Status dots ──
function renderStatus(html) {
  const el = document.getElementById('status-bar');
  if (!el || !html) return;
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const items = doc.querySelectorAll('.config-item');
  let out = '';
  items.forEach(item => {
    const k = item.querySelector('.config-key')?.textContent || '';
    const v = item.querySelector('.config-val')?.textContent || '';
    const on = v.includes('Online') || v.includes('\u2713');
    out += `<div class="status-item"><span class="dot ${on?'on':'off'}"></span>${esc(k)}</div>`;
  });
  el.innerHTML = out;
}

// ── Gateway restart ──
function restartGateway(e) {
  e.preventDefault();
  e.stopPropagation();
  const btn = document.getElementById('gw-restart-btn');
  const status = document.getElementById('gw-restart-status');
  btn.disabled = true;
  btn.style.opacity = '0.5';
  status.textContent = 'Restarting...';
  const hosts = ['localhost', 'Elizabeths-MacBook-Pro.local'];
  function tryHost(i) {
    if (i >= hosts.length) {
      status.textContent = 'Health server not running. Use terminal: gw';
      btn.disabled = false;
      btn.style.opacity = '1';
      return;
    }
    fetch(`http://${hosts[i]}:7865/restart`, { method: 'POST' })
      .then(r => r.text())
      .then(() => {
        status.textContent = '\u2713 Restarted';
        setTimeout(() => location.reload(), 2000);
      })
      .catch(() => tryHost(i + 1));
  }
  tryHost(0);
}

// ── Shared site header for detail pages ──
function initSiteHeader() {
  const el = document.getElementById('site-header');
  if (!el) return;
  el.innerHTML = `
    <div class="header">
      <a href="../index.html" class="header-left" style="text-decoration:none">
        <img src="../logo.png" alt="Hermes">
        <h1>Hermes <span>e11i's agent</span></h1>
      </a>
      <div class="status-row" id="status-bar"></div>
      <button id="gw-restart-btn" onclick="restartGateway(event)" class="gw-restart-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
        Restart
      </button>
      <span id="gw-restart-status" style="font-size:var(--fs-xs);color:var(--text-3)"></span>
    </div>`;
  const d = window.__DASHBOARD_DATA__ || {};
  if (d.status) renderStatus(d.status);
}

document.addEventListener('DOMContentLoaded', () => {
  initSiteHeader();
});

function cronHuman(c) {
  if (!c) return '?';
  const p = c.trim().split(/\s+/);
  if (p.length !== 5) return c;
  const [min,hr] = p;
  const days = {0:'Sun',1:'Mon',2:'Tue',3:'Wed',4:'Thu',5:'Fri',6:'Sat'};
  const h = +hr, m = +min;
  const t = `${h > 12 ? h-12 : h||12}:${String(m).padStart(2,'0')} ${h >= 12 ? 'PM' : 'AM'}`;
  if (p[2]==='*' && p[3]==='*' && p[4]==='*') return `Daily at ${t}`;
  if (p[2]==='*' && p[3]==='*' && p[4]!=='*') return `Every ${days[p[4]]||p[4]} at ${t}`;
  return c;
}
