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
  // List items → <li>
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');
  // Remaining plain lines → <p> (skip empty, skip tags)
  html = html.split('\n').map(line => {
    const t = line.trim();
    if (!t || t.startsWith('<')) return line;
    return `<p>${t}</p>`;
  }).join('\n');
  return html;
}

// Upgrade back-links to use browser history when available
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a.back-link').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.history.length > 1) {
        e.preventDefault();
        window.history.back();
      }
      // else: follow the href to ../index.html as fallback
    });
  });
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
