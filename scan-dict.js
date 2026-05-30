const fs = require('fs');
const path = require('path');
const ar = require('./src/i18n/dictionaries/ar.json');
const en = require('./src/i18n/dictionaries/en.json');

function walk(dir, acc) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) {
      if (f === 'node_modules') continue;
      walk(p, acc);
    } else if (/\.(tsx|ts)$/.test(f)) {
      acc.push(p);
    }
  }
  return acc;
}

const files = walk('./src', []);
function get(o, p) {
  return p.split('.').filter(Boolean).reduce((a, k) => (a == null ? a : a[k]), o);
}

const re = /\bdict\??((?:\??\.[a-zA-Z0-9_]+)+)/g;
const methodish = new Set(['map','filter','forEach','length','toUpperCase','toLowerCase','charAt','slice','join','split','trim','replace','includes','find','some','every','reduce','keys','values','entries','toString','push','pop','sort']);

let missing = [];
for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  let m;
  const seen = new Set();
  while ((m = re.exec(src))) {
    let parts = m[1].replace(/\?/g, '').split('.').filter(Boolean);
    while (parts.length && methodish.has(parts[parts.length - 1])) parts.pop();
    if (parts.length === 0) continue;
    const key = parts.join('.');
    if (seen.has(key)) continue;
    seen.add(key);
    const arv = get(ar, key), env = get(en, key);
    if (arv === undefined || env === undefined) {
      missing.push({ file: file.split(path.sep).join('/'), key, ar: arv === undefined ? 'MISSING' : 'ok', en: env === undefined ? 'MISSING' : 'ok' });
    }
  }
}

if (missing.length === 0) {
  console.log('No missing dict keys found across src.');
} else {
  console.log('POTENTIAL MISSING DICT KEYS (' + missing.length + '):');
  for (const x of missing) console.log('  [' + x.file + '] dict.' + x.key + '  AR:' + x.ar + ' EN:' + x.en);
}
