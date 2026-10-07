import { chromium } from "playwright";
const BASE=process.env.BASE||"https://pstruh.iryba.cz";
const b=await chromium.launch();
for (const [base,name,hash] of [[BASE,"pstruh","#gps50.40_14.52"],["https://kapr.iryba.cz","kapr","#gps50.08_14.60"]]){
const p=await b.newPage({serviceWorkers:"block",viewport:{width:390,height:844},deviceScaleFactor:2});
await p.route(/goatcounter|gc\.zgo/, r=>r.abort());
p.on("pageerror",e=>console.log("ERR",e.message));
await p.goto(base+"/"+hash); await p.waitForLoadState("networkidle").catch(()=>{}); await p.waitForTimeout(2500);
await p.screenshot({path:`out/${name}-top.png`});
await p.click("#findBtn"); await p.waitForTimeout(1500); await p.waitForLoadState("networkidle").catch(()=>{}); await p.waitForTimeout(2500);
await p.locator("#map").scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
await p.locator("#map").screenshot({path:`out/${name}-mapa-reviry.png`});
await p.click("#stockBtn"); await p.waitForTimeout(1500); await p.waitForLoadState("networkidle").catch(()=>{}); await p.waitForTimeout(2500);
await p.locator("#map").scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
await p.locator("#map").screenshot({path:`out/${name}-mapa-zarybneni.png`});
const near=await p.$('#out button:has-text("Nejblíž mně")'); if(near){ await near.click(); await p.waitForTimeout(2500); await p.locator("#map").screenshot({path:`out/${name}-mapa-zarybneni-blizko.png`}); }
await p.close(); }
await b.close();
