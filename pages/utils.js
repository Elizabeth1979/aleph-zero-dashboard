// Shared utility functions for all dashboard pages

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function cronHuman(expr) {
  if (!expr) return '';
  const parts = expr.split(' ');
  if (parts.length !== 5) return expr;
  const [min, hr, dom, mon, dow] = parts;
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  let out = '';
  if (dow !== '*') out += days[+dow] + 's ';
  if (dom !== '*') out += 'day ' + dom + ' ';
  if (mon !== '*') out += 'month ' + mon + ' ';
  out += hr + ':' + min.padStart(2,'0');
  return out.trim();
}
