const puppeteer = require("puppeteer-core");
const path = require("path");
const OUT = path.join(__dirname, "qa-shots");
const URL = "file:///C:/coding/ppt_tstory3/presentation/index.html";
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--window-size=1920,1080","--disable-gpu"] });
  const p = await b.newPage(); await p.setViewport({ width: 1920, height: 1080 });
  const errs = []; p.on("pageerror", e => errs.push(e.message));
  await p.goto(URL + "#slide-07", { waitUntil: "load" }); await sleep(2500);
  await p.keyboard.press("t"); await sleep(1200);
  await p.screenshot({ path: path.join(OUT, "toc.png") });
  const st = await p.evaluate(() => ({ hidden: document.querySelector("#toc").hidden, items: document.querySelectorAll("#tocList li").length, cur: document.querySelector("#tocList li.cur")?.textContent.slice(0,20) }));
  console.log(JSON.stringify(st), "errors:", errs);
  await p.keyboard.press("Escape"); await sleep(600);
  console.log("esc closed:", await p.evaluate(() => document.querySelector("#toc").hidden));
  await b.close();
})();
