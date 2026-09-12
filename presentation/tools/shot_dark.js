const puppeteer = require("puppeteer-core");
const path = require("path");
const OUT = path.join(__dirname, "qa-shots");
const URL = "file:///C:/coding/ppt_tstory3/presentation/index.html";
const sleep = ms => new Promise(r => setTimeout(r, ms));
const slides = process.argv.slice(2);
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--window-size=1920,1080","--disable-gpu"] });
  const p = await b.newPage(); await p.setViewport({ width: 1920, height: 1080 });
  const errs = []; p.on("pageerror", e => errs.push(e.message));
  for (const s of slides) {
    await p.goto(URL + "#slide-" + s, { waitUntil: "load" }); await sleep(1200);
    await p.keyboard.press("b"); await sleep(4200);
    await p.screenshot({ path: path.join(OUT, `dark${s}.png`) });
  }
  console.log("errors:", errs); await b.close();
})();
