/* 공유 카드(og-image.jpg) 생성 — tools/og.html 을 1200×630 으로 렌더 */
const puppeteer = require("puppeteer-core");
const path = require("path");
const SRC = "file:///" + path.join(__dirname, "og.html").split(path.sep).join("/");
const OUT = path.join(__dirname, "..", "og-image.png");
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--disable-gpu"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
  await p.goto(SRC, { waitUntil: "networkidle0" });
  await p.evaluate(() => document.fonts.ready); await sleep(600);
  await p.screenshot({ path: OUT });
  console.log("wrote", OUT);
  await b.close();
})();
