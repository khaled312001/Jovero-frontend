const ar = require('./src/i18n/dictionaries/ar.json');
const en = require('./src/i18n/dictionaries/en.json');

function flatten(obj, prefix, acc) {
  for (const k of Object.keys(obj)) {
    const key = prefix ? prefix + '.' + k : k;
    const v = obj[k];
    if (v && typeof v === 'object' && !Array.isArray(v)) flatten(v, key, acc);
    else acc.add(key);
  }
  return acc;
}

const arKeys = flatten(ar, '', new Set());
const enKeys = flatten(en, '', new Set());

const inArNotEn = [...arKeys].filter(k => !enKeys.has(k));
const inEnNotAr = [...enKeys].filter(k => !arKeys.has(k));

console.log('Keys in AR missing from EN (' + inArNotEn.length + '):');
inArNotEn.forEach(k => console.log('  ' + k));
console.log('\nKeys in EN missing from AR (' + inEnNotAr.length + '):');
inEnNotAr.forEach(k => console.log('  ' + k));

// Detect values that look identical (untranslated) — same string in both (only for short leaf strings, skip numbers/urls)
const same = [];
function get(o, p) { return p.split('.').reduce((a, k) => (a == null ? a : a[k]), o); }
for (const k of arKeys) {
  if (!enKeys.has(k)) continue;
  const a = get(ar, k), e = get(en, k);
  if (typeof a === 'string' && typeof e === 'string' && a === e && a.length > 3 && /[A-Za-z]/.test(a) && !/^https?:|^\+|^\/|@|\.(com|net|tech)/.test(a) && !/^\d/.test(a)) {
    same.push(k + '  => "' + a + '"');
  }
}
console.log('\nIdentical AR/EN string values (possible untranslated, ' + same.length + '):');
same.forEach(s => console.log('  ' + s));
