// Shared utility functions for all dashboard pages

function esc(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
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
