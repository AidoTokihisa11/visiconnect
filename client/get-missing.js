const fs = require('fs');

function getObject(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace('export default', 'module.exports =');
  return eval(content); // Using a dirty way because eval is easy, or we can use Function
}

let fr;
try {
  let frCode = fs.readFileSync('src/i18n/locales/fr.js', 'utf8');
  frCode = frCode.replace(/export default/, 'return');
  fr = new Function(frCode)();
} catch(e) {
  console.error(e);
}

let es;
try {
  let esCode = fs.readFileSync('src/i18n/locales/es.js', 'utf8');
  esCode = esCode.replace(/export default/, 'return');
  es = new Function(esCode)();
} catch(e) {}

const missing = {};
function findMissing(f, e, path='') {
  for (let k in f) {
    if (typeof f[k] === 'object' && !Array.isArray(f[k])) {
      findMissing(f[k], e?.[k] || {}, path ? path+'.'+k : k);
    } else {
      if (!e || e[k] === undefined) {
        missing[path ? path+'.'+k : k] = f[k];
      }
    }
  }
}
findMissing(fr, es);
console.log(JSON.stringify(missing, null, 2));
