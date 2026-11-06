// Ensayo automatizado de "Sos el Impulso".
// Juega partidas completas, graba video, saca capturas de cada pantalla y revisa:
// errores de consola, textos fuera de pantalla, encimados o cortados, contraste y tamaños.
//
// Uso:
//   node pruebas/ensayo.mjs                  -> todos los escenarios en todas las resoluciones (modo ensayo, rápido)
//   node pruebas/ensayo.mjs parejo 1920x1080 -> un escenario en una resolución
//   node pruebas/ensayo.mjs --tiempo         -> partida con pausas humanas reales para medir la duración
//   URL=https://... node pruebas/ensayo.mjs --publica  -> revisa la página publicada
// Resultados en pruebas/salida/ (no se sube al repositorio).

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import http from 'http';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'pruebas', 'salida');
const args = process.argv.slice(2);

// Resoluciones: proyectores comunes y el escalado de Windows (125% y 150% de una pantalla de 1920x1080, y 125% de 1366x768)
const CONFIGS = {
  '1920x1080': {width:1920, height:1080, dpr:1},
  '1366x768':  {width:1366, height:768,  dpr:1},
  '1280x720':  {width:1280, height:720,  dpr:1},
  '1024x768':  {width:1024, height:768,  dpr:1},
  'win125':    {width:1536, height:864,  dpr:1.25},
  'win150':    {width:1280, height:720,  dpr:1.5},
  'win125-1366': {width:1093, height:614, dpr:1.25},
  'ipad':      {width:1194, height:834,  dpr:2, touch:true},
  'ipad-10':   {width:1080, height:810,  dpr:2, touch:true},
};
// Respuesta correcta de cada parada (índice 0, 1, 2) y a quién le toca (0 Simpáticos, 1 Parasimpáticos)
const CORRECT = [1,2,0,1,2,0];
const TURNS = [1,0,1,0,1,0];

/* ---------- servidor local (como GitHub Pages) ---------- */
function serve(){
  const types = {'.html':'text/html; charset=utf-8','.woff2':'font/woff2','.js':'text/javascript','.css':'text/css','.png':'image/png'};
  const srv = http.createServer((req,res)=>{
    let p = decodeURIComponent(new URL(req.url,'http://x').pathname);
    if(p.endsWith('/')) p += 'index.html';
    const f = path.join(ROOT, p);
    if(!f.startsWith(ROOT) || !fs.existsSync(f)){ res.writeHead(404); return res.end(); }
    res.writeHead(200, {'Content-Type': types[path.extname(f)] || 'application/octet-stream'});
    fs.createReadStream(f).pipe(res);
  });
  return new Promise(r => srv.listen(0, () => r(srv)));
}

/* ---------- revisión de la pantalla (corre dentro de la página) ---------- */
function auditInPage(){
  const W = innerWidth, H = innerHeight, issues = [];
  const lum = c => { const m = c.match(/[\d.]+/g).map(Number); const f = v => { v/=255; return v<=.03928 ? v/12.92 : Math.pow((v+.055)/1.055,2.4); }; return .2126*f(m[0])+.7152*f(m[1])+.0722*f(m[2]); };
  const ratio = (a,b) => { const x = lum(a), y = lum(b); return (Math.max(x,y)+.05)/(Math.min(x,y)+.05); };
  const alpha = c => { const m = c.match(/[\d.]+/g); return m && m.length>3 ? +m[3] : 1; };
  const shown = el => { for(let e=el; e && e!==document.documentElement; e=e.parentElement){ const s = getComputedStyle(e); if(s.display==='none' || s.visibility==='hidden' || +s.opacity < .9) return false; } return true; };
  const txt = e => (e.id?'#'+e.id+' ':'') + '«' + e.textContent.trim().replace(/\s+/g,' ').slice(0,40) + '»';
  const bgOf = e => {
    for(let a=e; a; a=a.parentElement){
      const s = getComputedStyle(a);
      if(s.backgroundImage && s.backgroundImage!=='none' && /gradient/.test(s.backgroundImage) && !a.classList.contains('hl') && a!==document.body && !a.closest('.title')){
        // fondos con patrón de equipo: se toma el color más oscuro del patrón
        if(/198, 40, 40|168, 31, 31/.test(s.backgroundImage)) return 'rgb(168, 31, 31)';
        if(/29, 63, 158/.test(s.backgroundImage)) return 'rgb(29, 63, 158)';
      }
      if(alpha(s.backgroundColor) > .5) return s.backgroundColor;
    }
    return 'rgb(251, 252, 254)';
  };
  // ¿hay una pantalla superpuesta? Entonces solo se revisa esa.
  const overlay = [...document.querySelectorAll('.flash, .ov')].find(o => !o.hidden);
  const scope = overlay || document.querySelector('.app');
  const els = [...scope.querySelectorAll('*')].filter(e => !e.closest('svg') && [...e.childNodes].some(n => n.nodeType===3 && n.textContent.trim()) && shown(e));
  const boxes = [];
  for(const e of els){
    const r = e.getBoundingClientRect(); if(r.width===0 || r.height===0) continue;
    if(r.left < -2 || r.top < -2 || r.right > W+2 || r.bottom > H+2) issues.push('fuera de pantalla: '+txt(e));
    const s = getComputedStyle(e);
    const vert = /vertical/.test(s.writingMode);
    if((s.overflowX==='hidden' || s.overflow==='hidden') && (vert ? e.scrollHeight > e.clientHeight + 2 : e.scrollWidth > e.clientWidth + 2)) issues.push('texto cortado: '+txt(e));
    // contraste
    const fs = parseFloat(s.fontSize), bold = +s.fontWeight >= 700 || /Marker/.test(s.fontFamily);
    const need = (fs >= 24 || (bold && fs >= 18.66)) ? 3 : 4.5;
    const cr = ratio(s.color, bgOf(e));
    if(cr < need) issues.push('contraste '+cr.toFixed(2)+' (< '+need+'): '+txt(e));
    // cajas de cada línea de texto, para detectar encimados
    for(const n of e.childNodes){
      if(n.nodeType!==3 || !n.textContent.trim()) continue;
      const rg = document.createRange(); rg.selectNodeContents(n);
      // caja ajustada al alto real de las letras (la caja de línea de algunas fuentes es más alta que el texto)
      for(const r of rg.getClientRects()) if(r.width>2 && r.height>4){ const mid = (r.top+r.bottom)/2, h = fs*.42; boxes.push({e, b:{left:r.left, right:r.right, top:mid-h, bottom:mid+h, width:r.width, height:2*h}}); }
    }
  }
  for(let i=0;i<boxes.length;i++) for(let j=i+1;j<boxes.length;j++){
    const A = boxes[i], B = boxes[j];
    if(A.e===B.e || A.e.contains(B.e) || B.e.contains(A.e)) continue;
    const x = Math.min(A.b.right,B.b.right) - Math.max(A.b.left,B.b.left), y = Math.min(A.b.bottom,B.b.bottom) - Math.max(A.b.top,B.b.top);
    if(x>2 && y>2){
      const area = x*y, small = Math.min(A.b.width*A.b.height, B.b.width*B.b.height);
      if(area/small > .25) issues.push('texto encimado: '+txt(A.e)+' con '+txt(B.e));
    }
  }
  // medidas útiles para la rúbrica
  const m = {};
  const num = document.querySelector('.plate .num'); if(num && !document.getElementById('board').hidden) m.tanteador = +(num.getBoundingClientRect().height / H * 100).toFixed(1);
  const rib = document.querySelector('.ribbon .nm'); if(rib && shown(rib)) m.nombreTurno = +(parseFloat(getComputedStyle(rib).fontSize) / H * 100).toFixed(1);
  const sizes = {};
  for(const sel of ['.scene','.ask','.opt','.fb .why','.relator','.lead','.rule p','.idea span','.farewell .line']){
    const e = [...document.querySelectorAll(sel)].find(shown); if(e) sizes[sel] = Math.round(parseFloat(getComputedStyle(e).fontSize));
  }
  m.letra = sizes;
  m.k = getComputedStyle(document.getElementById('note')).getPropertyValue('--k') || '1';
  m.palabras = (overlay || document.getElementById('note')).innerText.split(/\s+/).filter(Boolean).length;
  return {issues: [...new Set(issues)], m};
}

/* ---------- un ensayo ---------- */
async function rehearse(browser, base, scenario, cfgName, opts={}){
  const cfg = CONFIGS[cfgName];
  const dir = path.join(OUT, scenario.name, cfgName);
  fs.rmSync(dir, {recursive:true, force:true});
  fs.mkdirSync(dir, {recursive:true});
  const ctx = await browser.newContext({viewport:{width:cfg.width, height:cfg.height}, deviceScaleFactor:cfg.dpr, hasTouch:!!cfg.touch, isMobile:!!cfg.touch, recordVideo: opts.video===false ? undefined : {dir, size:{width:Math.min(1280,cfg.width), height:Math.round(Math.min(1280,cfg.width)*cfg.height/cfg.width)}}});
  const page = await ctx.newPage();
  const log = [], problems = [], shots = [];
  page.on('console', m => { if(['error','warning'].includes(m.type())) log.push(m.type()+': '+m.text()); });
  page.on('pageerror', e => log.push('pageerror: '+e.message));
  const t0 = Date.now(); let n = 0;
  const H = {
    page, cfgName,
    sleep: ms => page.waitForTimeout(ms),
    phase: () => page.evaluate(() => window.__impulso.phase),
    st: () => page.evaluate(() => JSON.parse(JSON.stringify(window.__impulso.state))),
    key: async k => { await page.keyboard.press(k); await page.waitForTimeout(80); },
    async enter(){ await H.waitReady(); await page.keyboard.press('Enter'); await page.waitForTimeout(120); },
    async waitReady(){ await page.waitForTimeout(400); },
    async waitPhase(ph, ms=30000){ const end = Date.now()+ms; while(Date.now()<end){ const p = await H.phase(); if((Array.isArray(ph)?ph:[ph]).includes(p)) return p; await page.waitForTimeout(100); } throw new Error('no llegó a '+ph+' (está en '+await H.phase()+')'); },
    async waitSel(sel, ms=20000){ await page.waitForSelector(sel, {state:'visible', timeout:ms}); },
    async shot(label){
      await page.waitForTimeout(650); // que terminen las animaciones de entrada
      const file = String(++n).padStart(2,'0')+'-'+label+'.png';
      await page.screenshot({path: path.join(dir, file)});
      const a = await page.evaluate(auditInPage);
      shots.push({file, ...a.m});
      for(const i of a.issues) problems.push(file+': '+i);
      return a;
    },
    async untilDone(){ await H.waitSel('#nextrow:not([hidden])', 40000); },
  };
  let error = null;
  try{
    await page.goto(base + (opts.ensayo===false ? '' : '?ensayo'));
    await page.evaluate(() => { try{ localStorage.clear(); }catch(e){} });
    await page.reload();
    await page.waitForTimeout(1200);
    await scenario.run(H);
  }catch(e){ error = e.message; try{ await page.screenshot({path: path.join(dir, 'ERROR.png')}); }catch(_){} }
  const dur = (Date.now()-t0)/1000;
  const finalState = await H.st().catch(()=>null);
  await ctx.close();
  return {scenario: scenario.name, cfg: cfgName, error, console: log, problems, shots, dur, score: finalState && finalState.score};
}

/* ---------- acciones de juego ---------- */
async function setup(H, {cry=2, names=null}={}){
  await H.shot('portada');
  await H.enter(); await H.waitPhase('teams'); await H.shot('equipos');
  if(names){ await H.page.keyboard.press('Control+A'); await H.page.keyboard.type(names[0]); await H.page.keyboard.press('Enter'); await H.page.keyboard.press('Control+A'); await H.page.keyboard.type(names[1]); await H.shot('equipos-escritos'); await H.page.keyboard.press('Enter'); }
  else { await H.enter(); await H.page.keyboard.press('Enter'); }
  await H.waitPhase('cry'); await H.shot('grito');
  await H.enter(); await H.waitPhase('cry-pick', 15000); await H.shot('grito-quien');
  await H.key(String(cry+1)); await H.waitPhase('rules', 10000); await H.shot('reglas');
  await H.enter(); await H.waitPhase('read');
}
// plan de una parada: 'ok' | 'steal' | 'none' | 'tt' (mecha vencida dos veces) | 'ts' (vence y roban bien) | 'wt' (falla y vence)
async function station(H, i, plan, {shoot=true, pauses=null}={}){
  const P = pauses || {};
  await H.waitPhase('read');
  if(i>=4 && shoot){ await H.sleep(500); await H.shot('parada'+(i+1)+'-dorada'); }
  await H.page.waitForSelector('#flash', {state:'hidden', timeout:15000});
  if(shoot) await H.shot('parada'+(i+1));
  if(P.read) await H.sleep(P.read);
  await H.enter(); await H.waitPhase('answer');
  if(shoot) await H.shot('parada'+(i+1)+'-opciones');
  if(P.think) await H.sleep(P.think);
  const ok = CORRECT[i], bad = [0,1,2].filter(k=>k!==ok);
  if(plan==='ok'){ await H.key(String(ok+1)); }
  else if(plan==='steal'){ await H.key(String(bad[0]+1)); await H.sleep(1500); if(shoot) await H.shot('parada'+(i+1)+'-robo'); if(P.think) await H.sleep(P.think/2); await H.key(String(ok+1)); }
  else if(plan==='none'){ await H.key(String(bad[0]+1)); await H.sleep(1500); await H.key(String(bad[1]+1)); }
  else if(plan==='tt'){ await H.waitSel('.ribbon small:has-text("Roban")', 30000); if(shoot) await H.shot('parada'+(i+1)+'-mecha1'); await H.waitPhase(['done'], 30000); }
  else if(plan==='ts'){ await H.waitSel('.ribbon small:has-text("Roban")', 30000); await H.key(String(ok+1)); }
  else if(plan==='wt'){ await H.key(String(bad[1]+1)); await H.waitPhase(['done'], 30000); }
  await H.sleep(1600); if(shoot) await H.shot('parada'+(i+1)+'-respuesta');
  await H.untilDone(); if(shoot) await H.shot('parada'+(i+1)+'-fin');
  if(P.after) await H.sleep(P.after);
  await H.enter();
}
async function duel(H, how, {shoot=true}={}){
  await H.waitPhase('duel-intro'); if(shoot) await H.shot('duelo');
  await H.enter(); await H.waitPhase('duel');
  if(how==='early'){ await H.sleep(500); await H.key('a'); }
  else if(how==='trap'){ await H.waitSel('.flash:not(.real):not([hidden]) p', 15000); if(shoot) await H.shot('duelo-trampa'); await H.key('l'); }
  else if(how==='none'){ await H.waitSel('.flash.real:not([hidden])', 20000); if(shoot) await H.shot('duelo-rayo'); await H.waitPhase('duel-done', 15000); if(shoot) await H.shot('duelo-nadie'); await H.enter(); await H.waitPhase('duel'); await H.waitSel('.flash.real:not([hidden])', 20000); await H.sleep(250); await H.key('a'); }
  else { await H.waitSel('.flash.real:not([hidden])', 20000); if(shoot) await H.shot('duelo-rayo'); await H.sleep(300); await H.key(how==='A'?'a':'l'); }
  await H.waitPhase('duel-done');
  await H.waitSel('#endrow:not([hidden])', 15000); if(shoot) await H.shot('duelo-resultado');
}
async function ending(H, {shoot=true, pauses=null}={}){
  const P = pauses || {};
  await H.enter();
  const ph = await H.waitPhase(['champ','duel-intro'], 10000);
  if(ph==='duel-intro'){ if(shoot) await H.shot('desempate'); await duel(H, 'L', {shoot}); await H.enter(); await H.waitPhase('champ', 10000); }
  await H.sleep(2600); if(shoot) await H.shot('campeones');
  if(P.champ) await H.sleep(P.champ);
  await H.enter(); await H.waitPhase('diploma'); await H.sleep(4200); if(shoot) await H.shot('diploma');
  if(P.dip) await H.sleep(P.dip);
  await H.enter(); await H.waitPhase('bye'); await H.sleep(P.bye || 13000); if(shoot) await H.shot('cierre');
}
async function stations(H, plans, o){ for(let i=0;i<plans.length;i++) await station(H, i, plans[i], o); }

/* ---------- escenarios ---------- */
const SCENARIOS = [
  {name:'parejo', desc:'Partido parejo que se define en el duelo', run: async H => {
    await setup(H, {cry:2, names:['Los Rayos','Las Siestas']});
    await stations(H, ['ok','ok','steal','ok','ok','none']);
    await duel(H, 'A'); await ending(H);
  }},
  {name:'paliza', desc:'Paliza de un equipo', run: async H => {
    await setup(H, {cry:0});
    await stations(H, ['steal','ok','steal','ok','steal','ok']);
    await duel(H, 'L'); await ending(H);
  }},
  {name:'remontada', desc:'Remontada en las paradas doradas', run: async H => {
    await setup(H, {cry:0});
    await stations(H, ['none','ok','steal','ok','ok','steal']);
    await duel(H, 'trap'); await ending(H);
  }},
  {name:'empate', desc:'Empate al final del duelo: desempate', run: async H => {
    await setup(H, {cry:2});
    await stations(H, ['ok','ok','ok','ok','ok','none']);
    await duel(H, 'A'); await ending(H);
  }},
  {name:'errores', desc:'Todos los errores y la mecha vencida dos veces seguidas', run: async H => {
    await setup(H, {cry:1});
    await stations(H, ['tt','none','wt','tt','none','tt']);
    await duel(H, 'early'); await ending(H);
  }},
  {name:'duelo-nadie', desc:'Nadie aprieta en el duelo', run: async H => {
    await setup(H, {cry:1});
    await stations(H, ['ok','ok','ok','ok','ok','ok'], {shoot:false});
    await duel(H, 'none'); await ending(H, {shoot:false});
  }},
  {name:'manejo', desc:'El que maneja se equivoca de tecla, aprieta dos veces o pausa la mecha', run: async H => {
    const p = H.page;
    await H.shot('portada');
    // Enter repetido y doble clic: no se saltea nada
    await H.sleep(400); await p.keyboard.press('Enter'); await p.keyboard.press('Enter'); await p.keyboard.press('Enter');
    await H.waitPhase('teams'); await H.sleep(300);
    // en el campo de nombre, las letras de comandos (H, M, P, A, L, R, U) se escriben y no hacen nada raro
    await p.keyboard.press('Control+A'); await p.keyboard.type('Mamá Hurra Pura'); await H.shot('nombre-con-letras-de-comando');
    if(await H.phase()!=='teams') throw new Error('escribir un nombre disparó un comando');
    await p.keyboard.press('Enter'); await p.keyboard.press('Enter');
    await H.waitPhase('cry'); await H.sleep(500); await p.dblclick('#count'); await H.waitPhase('cry-pick', 15000);
    await p.keyboard.press('7'); await p.keyboard.press('2'); await p.keyboard.press('1'); // tecla de más: solo vale la primera
    await H.waitPhase('rules', 10000);
    const s0 = await H.st(); if(s0.score.join()!=='0,1') throw new Error('el grito sumó mal: '+s0.score);
    // ayuda
    await H.key('h'); await H.shot('ayuda'); await H.key('Escape');
    await H.enter(); await H.waitPhase('read');
    // doble Enter en la parada: prende la mecha una sola vez
    await H.sleep(500); await p.keyboard.press('Enter'); await p.keyboard.press('Enter'); await H.waitPhase('answer');
    // pausa general: la mecha no avanza
    await H.key('Space'); await H.shot('pausa');
    const a = await p.locator('#sec').textContent(); await H.sleep(2500); const b = await p.locator('#sec').textContent();
    if(a!==b) throw new Error('la mecha avanzó en pausa: '+a+' → '+b);
    // durante la pausa, las respuestas no cuentan
    await p.keyboard.press('2'); if(await H.phase()!=='answer') throw new Error('respondió durante la pausa');
    await H.key('Space');
    // se equivoca de tecla: responde mal y la tecla mala se repite
    await p.keyboard.down('1'); await p.keyboard.down('1'); await p.keyboard.up('1'); await H.sleep(1500); await H.shot('tecla-equivocada');
    // Retroceso: repetir la parada
    await H.key('Backspace'); await H.shot('repetir-pregunta'); await H.key('Enter');
    await H.waitPhase('read'); await H.sleep(500);
    const s1 = await H.st(); if(s1.score.join()!=='0,1' || s1.stealing) throw new Error('repetir parada no volvió atrás: '+s1.score);
    await H.enter(); await H.waitPhase('answer'); await H.key(String(CORRECT[0]+1)); await H.untilDone();
    await H.sleep(400);
    // doble clic en Seguir: avanza una sola parada
    await p.dblclick('#next'); await H.sleep(800); await H.waitPhase('read');
    if((await H.st()).i!==1) throw new Error('el doble clic salteó una parada');
    // deshacer el último punto
    const before = (await H.st()).score.slice(); await H.key('u'); const after = (await H.st()).score;
    if(before[1]-after[1]!==1) throw new Error('U no deshizo el punto: '+before+' → '+after);
    await H.shot('deshacer');
    // reiniciar: pide confirmación; con Esc no pasa nada
    await H.key('r'); await H.shot('reiniciar-pregunta'); await H.key('Escape');
    if(await H.phase()!=='read') throw new Error('R reinició sin confirmar');
    // música y efectos
    await H.key('m'); await H.key('m'); await H.key('-'); await H.key('+');
    for(let i=1;i<6;i++) await station(H, i, 'ok', {shoot:false});
    await duel(H, 'A', {shoot:false});
  }},
  {name:'recarga', desc:'Recargar la página en medio de la partida', run: async H => {
    const p = H.page;
    // el modo ensayo no guarda: este escenario corre en modo normal (se ajusta abajo)
    await setup(H, {cry:0, names:['Los Rayos','Las Siestas']});
    await station(H, 0, 'ok', {shoot:false});
    await station(H, 1, 'ok', {shoot:false});
    await H.waitPhase('read'); const before = (await H.st()).score.slice();
    await p.reload(); await H.sleep(1500); await H.shot('recarga-portada');
    await H.enter(); await H.waitPhase('read'); await H.shot('recarga-recuperada');
    const s = await H.st(); if(s.i!==2 || s.score.join()!==before.join()) throw new Error('no recuperó bien: parada '+s.i+' '+s.score+' (esperaba 2 y '+before+')');
    // recargar después de responder: no suma dos veces
    await H.enter(); await H.waitPhase('answer'); await H.key(String(CORRECT[2]+1)); await H.untilDone();
    const sc = (await H.st()).score.slice();
    await p.reload(); await H.sleep(1500); await H.enter(); await H.waitPhase('read');
    const s2 = await H.st(); if(s2.i!==3 || s2.score.join()!==sc.join()) throw new Error('después de responder recuperó mal: parada '+s2.i+' '+s2.score+' (esperaba 3 y '+sc+')');
    await H.shot('recarga-despues-de-responder');
    await station(H, 3, 'ok', {shoot:false}); await station(H, 4, 'ok', {shoot:false}); await station(H, 5, 'ok', {shoot:false});
    await H.waitPhase('duel-intro'); await p.reload(); await H.sleep(1500); await H.enter(); await H.waitPhase('duel-intro'); await H.shot('recarga-duelo');
    await duel(H, 'A', {shoot:false}); await ending(H, {shoot:false});
  }},
];

// Partida entera con el dedo, sin teclado (por ejemplo, desde un iPad): también pausa, deshacer y repetir desde el menú
SCENARIOS.push({name:'tactil', desc:'Todo con toques, sin teclado', run: async H => {
  const p = H.page, tap = async (sel, ms=700) => { await p.locator(sel).first().tap({force:true}); await H.sleep(ms); };
  await H.shot('portada');
  await tap('#start'); await H.waitPhase('teams'); await tap('#ot0', 300); await tap('#ready', 800);
  await H.waitPhase('cry'); await tap('#count'); await H.waitPhase('cry-pick', 15000); await H.sleep(600); await tap('#pk0', 300);
  await H.waitPhase('rules', 10000); await H.shot('reglas'); await tap('#play');
  for(let i=0;i<6;i++){
    await H.waitPhase('read'); await p.waitForSelector('#flash', {state:'hidden', timeout:15000}); await H.sleep(450);
    await tap('#reveal'); await H.waitPhase('answer');
    if(i===0){
      await tap('#bMenu', 400); await H.shot('menu');
      await tap('#ovMenu [data-m="pause"]', 300);
      const a = await p.locator('#sec').textContent(); await H.sleep(2000); const b = await p.locator('#sec').textContent();
      if(a!==b) throw new Error('la mecha avanzó en pausa');
      await H.shot('pausa-tactil'); await tap('#ovPause', 300);
      if(await p.evaluate(() => window.__impulso.paused)) throw new Error('tocar no sacó la pausa');
      const bad = [0,1,2].find(k=>k!==CORRECT[i]);
      await tap('.opt[data-k="'+bad+'"]', 1500);
      await tap('#bMenu', 300); await tap('#ovMenu [data-m="repeat"]', 300); await H.shot('repetir-tactil'); await tap('#askYes', 600);
      await H.waitPhase('read'); await H.sleep(450); await tap('#reveal'); await H.waitPhase('answer');
    }
    await tap('.opt[data-k="'+CORRECT[i]+'"]', 1500);
    await H.untilDone(); if(i===1){ await tap('#bMenu', 300); await tap('#ovMenu [data-m="undo"]', 300); await H.shot('deshacer-tactil'); }
    await H.sleep(400); await tap('#next');
  }
  await H.waitPhase('duel-intro'); await H.shot('duelo'); await tap('#ready', 300);
  await H.waitPhase('duel'); await p.waitForSelector('.flash.real:not([hidden])', {timeout:20000}); await H.sleep(250);
  await p.touchscreen.tap(Math.round(H.page.viewportSize().width*0.8), 300);
  await H.waitPhase('duel-done'); await H.waitSel('#endrow:not([hidden])', 15000); await H.shot('duelo-resultado');
  await tap('#end'); await H.waitPhase(['champ','duel-intro'], 10000);
  if(await H.phase()==='duel-intro'){ await tap('#ready', 300); await p.waitForSelector('.flash.real:not([hidden])', {timeout:20000}); await p.touchscreen.tap(50, 300); await H.waitSel('#endrow:not([hidden])', 15000); await tap('#end'); }
  await H.waitPhase('champ'); await H.sleep(2600); await H.shot('campeones');
  await tap('#dip'); await H.waitPhase('diploma'); await H.sleep(4200); await H.shot('diploma');
  await tap('#last'); await H.waitPhase('bye'); await H.sleep(13000); await H.shot('cierre');
}});

/* ---------- partida con tiempos humanos, para medir la duración ---------- */
const HUMAN = {read:8000, think:8000, after:6000, champ:6000, dip:12000, bye:15000};
async function timing(browser, base){
  const sc = {name:'tiempo', run: async H => {
    const T = {}; const mark = k => T[k] = (Date.now()-start)/1000; const start = Date.now();
    await H.sleep(5000); // presentan la portada
    await H.enter(); await H.waitPhase('teams'); await H.sleep(30000); // la sala elige nombres y Cerebros
    await H.page.keyboard.press('Enter'); await H.page.keyboard.press('Enter'); mark('equipos');
    await H.waitPhase('cry'); await H.sleep(6000); await H.enter(); await H.waitPhase('cry-pick', 15000); await H.sleep(3000); await H.key('1'); mark('grito');
    await H.waitPhase('rules', 10000); await H.sleep(15000); await H.enter(); mark('reglas');
    const plans = ['ok','steal','ok','ok','steal','ok'];
    for(let i=0;i<6;i++){ await station(H, i, plans[i], {shoot:false, pauses:HUMAN}); mark('parada'+(i+1)); }
    await H.waitPhase('duel-intro'); await H.sleep(10000); await H.enter(); await H.waitPhase('duel'); await H.waitSel('.flash.real:not([hidden])', 20000); await H.sleep(400); await H.key('a');
    await H.waitSel('#endrow:not([hidden])', 15000); await H.sleep(4000); mark('duelo');
    await ending(H, {shoot:false, pauses:HUMAN}); mark('cierre');
    H.page.__T = T;
    fs.writeFileSync(path.join(OUT,'tiempo.json'), JSON.stringify(T, null, 2));
  }};
  return rehearse(browser, base, sc, '1920x1080', {ensayo:false, video:false});
}

/* ---------- principal ---------- */
const srv = await serve();
const base = args.includes('--publica') ? (process.env.URL || 'https://moroneleandro-dotcom.github.io/sos-el-impulso/') : 'http://localhost:'+srv.address().port+'/index.html';
fs.mkdirSync(OUT, {recursive:true});
const browser = await chromium.launch();
let results = [];
if(args.includes('--tiempo')){
  results.push(await timing(browser, base));
  console.log(fs.readFileSync(path.join(OUT,'tiempo.json'),'utf8'));
} else {
  const only = args.filter(a => !a.startsWith('--'));
  const scs = SCENARIOS.filter(s => !only.some(o => SCENARIOS.some(x=>x.name===o)) || only.includes(s.name));
  const cfs = Object.keys(CONFIGS).filter(c => !only.some(o => CONFIGS[o]) || only.includes(c));
  const jobs = []; for(const s of scs) for(const c of cfs) if(s.name!=='tactil' || CONFIGS[c].touch) jobs.push([s,c]);
  const par = +(process.env.PAR || 4);
  let k = 0;
  await Promise.all(Array.from({length:par}, async () => {
    while(k < jobs.length){
      const [s,c] = jobs[k++];
      const r = await rehearse(browser, base, s, c, {ensayo: s.name!=='recarga'});
      results.push(r);
      fs.writeFileSync(path.join(OUT, s.name, c, 'problemas.txt'), [r.error?'ERROR: '+r.error:'', ...r.console, ...r.problems].filter(Boolean).join('\n'));
      const bad = r.error || r.console.length || r.problems.length;
      console.log((bad?'✗':'✓')+' '+s.name.padEnd(12)+' '+c.padEnd(12)+' '+r.dur.toFixed(0)+'s  '+(r.score?r.score.join('-'):'')+(r.error?'  ERROR: '+r.error:'')+(r.console.length?'  consola: '+r.console.length:'')+(r.problems.length?'  problemas: '+r.problems.length:''));
    }
  }));
}
await browser.close(); srv.close();
fs.writeFileSync(path.join(OUT,'resultados.json'), JSON.stringify(results, null, 2));
const all = results.flatMap(r => [...(r.error?[r.scenario+'/'+r.cfg+': ERROR '+r.error]:[]), ...r.console.map(x=>r.scenario+'/'+r.cfg+': '+x), ...r.problems.map(x=>r.scenario+'/'+r.cfg+'/'+x)]);
if(all.length){ console.log('\nProblemas:'); for(const x of [...new Set(all)].slice(0,80)) console.log(' - '+x); process.exitCode = 1; }
else console.log('\nTodo en orden: sin errores de consola, sin textos encimados, cortados o fuera de pantalla.');
