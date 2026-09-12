const puppeteer = require("puppeteer-core");
const path = require("path"); const fs = require("fs");
const OUT = path.join(__dirname, "qa-shots"); fs.mkdirSync(OUT, { recursive: true });
const URL = "file:///C:/coding/ppt_tstory3/presentation/index.html";
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const slides = process.argv.slice(2).length ? process.argv.slice(2) : ["03","07","08","09","10","12","14"];
(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--window-size=1920,1080","--disable-gpu","--no-first-run"] });
  const page = await browser.newPage(); await page.setViewport({ width: 1920, height: 1080 });
  const errs = []; page.on("pageerror", e => errs.push(e.message));
  for (const s of slides) {
    if (s.startsWith("d")) { await page.goto(URL + "#slide-18", { waitUntil: "load" }); await sleep(800); await page.keyboard.press("Enter"); await sleep(4200);
      const n = parseInt(s.slice(1)); for (let i = 1; i < n; i++) { await page.keyboard.press("ArrowRight"); await sleep(3000); }
      await page.screenshot({ path: path.join(OUT, `${s}.png`) }); continue; }
    await page.goto(URL + "#slide-" + s, { waitUntil: "load" }); await sleep(5000);
    await page.screenshot({ path: path.join(OUT, `s${s}.png`) });
  }
  console.log("errors:", errs); await browser.close();
})();
