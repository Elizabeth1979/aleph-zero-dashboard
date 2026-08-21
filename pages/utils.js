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
  // Extract markdown tables before escaping
  const tableBlocks = [];
  preprocessed = preprocessed.replace(/^(\|.+\|\n)((?:\|[-:| ]+\|\n))((?:\|.+\|\n?)*)/gm, function(match) {
    tableBlocks.push(match);
    return `%%TABLE_${tableBlocks.length - 1}%%`;
  });
  let html = esc(preprocessed);
  // Restore code blocks with proper formatting
  html = html.replace(/%%CODEBLOCK_(\d+)%%/g, function(_, i) {
    const cb = codeBlocks[+i];
    return `<pre class="code-block"><code>${esc(cb.code)}</code></pre>`;
  });
  // Restore tables as HTML
  html = html.replace(/%%TABLE_(\d+)%%/g, function(_, i) {
    const raw = tableBlocks[+i];
    const lines = raw.trim().split('\n').filter(l => l.trim());
    if (lines.length < 2) return esc(raw);
    // Header row
    const headers = lines[0].split('|').map(c => c.trim()).filter(c => c);
    // Skip separator row (lines[1])
    // Body rows
    const rows = lines.slice(2).map(line =>
      line.split('|').map(c => c.trim()).filter(c => c)
    );
    let t = '<div class="table-wrap"><table class="md-table"><thead><tr>';
    t += headers.map(h => `<th>${h}</th>`).join('');
    t += '</tr></thead><tbody>';
    rows.forEach(row => {
      t += '<tr>' + row.map(cell => `<td>${cell}</td>`).join('') + '</tr>';
    });
    t += '</tbody></table></div>';
    return t;
  });
  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  // Bold & inline code
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Standard markdown links [text](url)
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="md-link">$1</a>');
  // Bare URLs (not already in an href)
  html = html.replace(/(?<!href="|href=')(https?:\/\/[^\s<"']+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="md-link">$1</a>');
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
