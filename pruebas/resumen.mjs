// Resume pruebas/salida/resultados.json: problemas por escenario y medidas por resolución.
import fs from 'fs';
const R = JSON.parse(fs.readFileSync(new URL('./salida/resultados.json', import.meta.url)));
const by = {};
for(const r of R){
  const k = r.cfg; by[k] = by[k] || {runs:0, errores:0, consola:0, problemas:0, tanteadorMin:99, nombreMin:99, letraMin:99, kMin:1};
  const b = by[k]; b.runs++; if(r.error) b.errores++; b.consola += r.console.length; b.problemas += r.problems.length;
  for(const s of r.shots){
    if(s.tanteador) b.tanteadorMin = Math.min(b.tanteadorMin, s.tanteador);
    if(s.nombreTurno) b.nombreMin = Math.min(b.nombreMin, s.nombreTurno);
    for(const [sel,v] of Object.entries(s.letra||{})) if(!['.ask'].includes(sel)) b.letraMin = Math.min(b.letraMin, v);
    b.kMin = Math.min(b.kMin, parseFloat(s.k)||1);
  }
}
console.table(by);
for(const r of R) if(r.error || r.console.length || r.problems.length){
  console.log('\n'+r.scenario+' / '+r.cfg+(r.error?'  ERROR: '+r.error.split('\n')[0]:''));
  for(const x of [...new Set([...r.console, ...r.problems.map(p=>p.replace(/^\d+-/,''))])].slice(0,12)) console.log('   '+x);
}
