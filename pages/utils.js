// Shared utility functions for all dashboard pages

function esc(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function renderMd(raw) {
  let html = esc(raw);
  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  // Bold & inline code
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
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
