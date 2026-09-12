const puppeteer = require("puppeteer-core");
const URL = "file:///C:/coding/ppt_tstory3/presentation/index.html";
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--window-size=1920,1080","--disable-gpu"] });
  const p = await b.newPage(); await p.setViewport({ width: 1920, height: 1080 });
  const all = {};
  const scan = async (label) => {
    const r = await p.evaluate((label) => {
      const out = [];
      const root = document.querySelector("#demoStage") && document.querySelector("#demoStage").children.length ? document.querySelector("#demoStage") : document.querySelector(".slide.is-active");
      if (!root) return out;
      root.querySelectorAll("*").forEach(el => {
        const txt = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join("").trim();
        if (!txt) return;
        const cs = getComputedStyle(el);
        if (cs.visibility === "hidden" || cs.display === "none" || parseFloat(cs.opacity) === 0) return;
        const rc = el.getBoundingClientRect();
        if (rc.width < 2 || rc.height < 2) return;
        const fs = parseFloat(cs.fontSize);
        const cls = (el.className && el.className.baseVal !== undefined) ? el.className.baseVal : (el.className || el.tagName);
        if (fs < 22) out.push({ label, fs: Math.round(fs*10)/10, cls: String(cls), txt: txt.slice(0, 30) });
      });
      return out;
    }, label);
    r.forEach(x => { const k = x.cls + "|" + x.fs; if (!all[k]) all[k] = { ...x, where: new Set() }; all[k].where.add(label); });
  };
  for (let i = 1; i <= 18; i++) { await p.goto(URL + "#slide-" + String(i).padStart(2,"0"), { waitUntil: "load" }); await sleep(4200); await scan("s"+i); }
  await p.goto(URL + "#slide-18", { waitUntil: "load" }); await sleep(900); await p.keyboard.press("Enter"); await sleep(4200);
  for (let i = 1; i <= 5; i++) { if (i>1){ await p.keyboard.press("ArrowRight"); await sleep(3200);} await scan("d"+i); }
  const rows = Object.values(all).sort((a,b)=>a.fs-b.fs);
  rows.forEach(r => console.log(String(r.fs).padStart(5), "|", String(r.cls).slice(0,32).padEnd(32), "|", [...r.where].slice(0,5).join(","), "|", r.txt));
  console.log("총", rows.length, "종");
  await b.close();
})();
