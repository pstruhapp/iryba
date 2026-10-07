import { chromium } from "playwright";
const D="out/vid/"; const BASE=process.env.BASE||"https://pstruh.iryba.cz";
const b = await chromium.launch();
const ctx = await b.newContext({serviceWorkers:"block",viewport:{width:390,height:780},deviceScaleFactor:1,recordVideo:{dir:D,size:{width:390,height:780}}});
const p = await ctx.newPage();
await p.route(/goatcounter|gc\.zgo/, r=>r.abort());
await p.goto(BASE+"/"); await p.waitForTimeout(1500);
await p.evaluate(()=>{ try{localStorage.clear()}catch(e){} });
await p.goto(BASE+"/#gps50.40_14.52"); await p.waitForLoadState("networkidle").catch(()=>{}); await p.waitForTimeout(2500);
await p.addStyleTag({content:`html{scroll-behavior:auto}
#cap{position:fixed;left:10px;right:10px;bottom:14px;z-index:99999;background:rgba(10,30,28,.92);color:#fff;font:800 24px/1.25 system-ui,sans-serif;padding:14px 14px;border-radius:14px;text-align:center;box-shadow:0 6px 20px rgba(0,0,0,.35);transition:opacity .3s}
#tap{position:absolute;z-index:99998;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;background:rgba(255,190,40,.55);border:3px solid #ffbe28;pointer-events:none;transition:transform .35s,opacity .35s}`});
await p.evaluate(()=>{ const c=document.createElement("div"); c.id="cap"; document.body.appendChild(c); const t=document.createElement("div"); t.id="tap"; t.style.opacity=0; document.body.appendChild(t); });
const W=ms=>p.waitForTimeout(ms);
const cap=async(s,ms=2600)=>{ await p.evaluate(s=>{const c=document.getElementById("cap"); c.style.opacity=s?1:0; if(s) c.innerHTML=s;},s); if(ms) await W(ms); };
async function smooth(y,dur=1200){ await p.evaluate(async([y,dur])=>{ const s=scrollY, d=y-s, t0=performance.now(); await new Promise(res=>{ function f(t){ const k=Math.min(1,(t-t0)/dur); const e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2; scrollTo(0,s+d*e); k<1?requestAnimationFrame(f):res(); } requestAnimationFrame(f); }); },[y,dur]); }
async function to(sel,off=120,dur=1000){ await cap("",0); const y=await p.evaluate(([s,o])=>{const e=document.querySelector(s); return e?e.getBoundingClientRect().top+scrollY-o:scrollY;},[sel,off]); await smooth(Math.max(0,y),dur); }
async function tap(sel){ const bb=await p.evaluate(s=>{const e=document.querySelector(s); const r=e.getBoundingClientRect(); return {x:r.left+r.width/2+scrollX,y:r.top+r.height/2+scrollY};},sel);
  await p.evaluate(b=>{const t=document.getElementById("tap"); t.style.left=b.x+"px"; t.style.top=b.y+"px"; t.style.opacity=1; t.style.transform="scale(1)";},bb); await W(450);
  await p.evaluate(()=>{const t=document.getElementById("tap"); t.style.transform="scale(.7)";}); await W(150);
  await p.click(sel); await W(200); await p.evaluate(()=>{const t=document.getElementById("tap"); t.style.opacity=0;}); }
// 1 intro
await cap("Pstruh a Kapr – revíry, podmínky lovu<br>a průtoky v jednom telefonu",3200);
await cap("1 · Zvol typ vody: pstruhové, nebo nepstruhové",2600);
await cap("2 · Kde jsi? Poloha z GPS, nebo hledej místo",2800);
await to("#findBtn",200); await cap("3 · Najdi 3 nejbližší revíry",900); await tap("#findBtn"); await cap("",0); await W(700);
{ const y=await p.evaluate(()=>{ const h=[...document.querySelectorAll("#out *")].find(e=>/nejbližší/i.test(e.textContent)&&e.children.length===0); return h?h.getBoundingClientRect().top+scrollY-30:scrollY; }); await smooth(y,900); }
await cap("Revíry seřazené podle vzdálenosti k vodě",2800); await cap("",0);
await to("#map",90,1000); await W(1800); await cap("Revíry i v mapě – čísla podle vzdálenosti",3200);
await cap("",0); await to("#out",60,900);
await tap("#out [data-i]").catch(async()=>{ await p.click("#out .card"); }); await W(2200);
await to("#detail",10,900); await cap("Detail revíru: číslo, MO, vzdálenost",2400);
await cap("Kopírovat revír – rychlý zápis do Karty rybáře",2600);
await to("#chDetail",20,1100); await cap("Šance na záběr dnes – tlak, teplota, průtok,<br>denní doba, zarybnění…",3600);
await cap("",0); await smooth(await p.evaluate(()=>scrollY+520),1400); await cap("Dnes na revíru: doba lovu a povolené techniky",3000);
await cap("",0); await smooth(await p.evaluate(()=>scrollY+700),1800); await cap("Lovné míry a hájení – co dnes smíš lovit",3000);
await to("#stockBtn",250,1500); await cap("Zarybněno za posledních 6 týdnů",900); await tap("#stockBtn"); await W(1200); await to("#out",60); await cap("Kde se vysazovalo – nejnovější nebo nejblíž tobě",3000);
await to("#map",90,1100); await W(1800); await cap("Mapa zarybnění – kde se nedávno vysazovalo",3400);
await to("#flowBtn",250,1200); await tap("#flowBtn"); await W(1200); await to("#out",60); await cap("Průtoky z ČHMÚ: stav a trend vody",3200);
await to("#newsBtn",250,1000); await tap("#newsBtn"); await W(1200); await to("#out",60); await cap("Aktuality svazů: zarybnění, zákazy, muškaření",3000);
await to("#fishBtn",250,1000); await tap("#fishBtn"); await W(1200); await to("#out",60); await cap("Poznej rybu – atlas 41 druhů",2600);
await tap('#out .fishcard'); await W(1500); await to("#detail",10,900); await cap("Jak ji poznáš a s čím se plete",2600);
await to("#fLen",260,1200); await cap("Co s ní? Zadej délku…",1200); await p.click("#fLen"); await p.type("#fLen","34",{delay:250}); await W(600);
await cap("…a víš hned, jestli si ji smíš ponechat",3400);
await to("#radBtn",260,1500); await tap("#radBtn"); await W(1500); await cap("Celý Rybářský řád s hledáním",2400);
await p.click("#radBtn"); await W(300);
await to("#catchBtn",260,800); await tap("#catchBtn"); await W(600); await tap("#cMeBtn"); await W(1200); await to("#sendMe",40,900);
await cap("Zapsat úlovek: do RIS, nebo Poslat sobě<br>s fotkami a podmínkami lovu",3600);
await p.click("#catchBtn"); await W(300);
await to("#guardBtn",260,800); await tap("#guardBtn"); await W(1000); await to("#guardPanel",40,900); await cap("Jak u kontroly rybářské stráže",2400);
const ask=await p.$(".ask"); if(ask){ await to(".ask",160,1400); await p.click("#askQ"); await p.type("#askQ","doba lovu",{delay:120}); await W(800); await cap("Zeptej se – odpověď z Rybářského řádu",3200); }
await smooth(0,1600); await cap("Zdarma, bez reklam, bez registrace<br><b>iryba.cz</b>",3500);
await p.close(); await ctx.close(); await b.close();
