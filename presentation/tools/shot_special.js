const puppeteer = require("puppeteer-core"); const path = require("path"); const fs = require("fs");
const OUT = path.join(__dirname, "qa-shots"); const URL = "file:///C:/coding/ppt_tstory3/presentation/index.html";
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--window-size=1920,1080","--disable-gpu","--no-first-run"] });
  const page = await browser.newPage(); await page.setViewport({ width: 1920, height: 1080 });
  const errs = []; page.on("pageerror", e => errs.push(e.message));
  // 1) hero has-media simulation (dark veil + white text)
  await page.goto(URL + "#slide-01", { waitUntil: "load" }); await sleep(3500);
  await page.evaluate(() => { const bg = document.querySelector("#sec-01 .bg"); bg.classList.add("has-media"); const m = bg.querySelector(".media"); if (m) { const d = document.createElement("div"); d.className = "media ready"; d.style.cssText = "position:absolute;inset:0;background:linear-gradient(135deg,#7a5a3a,#2e4a3a,#1e2a44)"; bg.insertBefore(d, bg.querySelector(".veil")); } });
  await sleep(1200); await page.screenshot({ path: path.join(OUT, "hero-media-01.png") });
  await page.goto(URL + "#slide-18", { waitUntil: "load" }); await sleep(3500);
  await page.evaluate(() => { const bg = document.querySelector("#sec-18 .bg"); bg.classList.add("has-media"); const d = document.createElement("div"); d.className = "media ready"; d.style.cssText = "position:absolute;inset:0;background:linear-gradient(135deg,#5a4a3a,#3a3a2a,#1e2a44)"; bg.insertBefore(d, bg.querySelector(".veil")); });
  await sleep(1200); await page.screenshot({ path: path.join(OUT, "hero-media-18.png") });
  // 2) slide 13 after .ask fix
  await page.goto(URL + "#slide-13", { waitUntil: "load" }); await sleep(5000); await page.screenshot({ path: path.join(OUT, "s13.png") });
  // 3) transition mid-way: leaving slide keeps content (screenshot 250ms after ArrowRight from slide 4)
  await page.goto(URL + "#slide-04", { waitUntil: "load" }); await sleep(4500);
  await page.keyboard.press("ArrowRight"); await sleep(250); await page.screenshot({ path: path.join(OUT, "transition-4to5.png") });
  await sleep(1500);
  // 4) key repeat guard: dispatch 5 repeat keydowns
  await page.evaluate(() => { for (let i = 0; i < 5; i++) document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", code: "ArrowRight", repeat: true, bubbles: true })); });
  await sleep(900);
  const afterRepeat = await page.evaluate(() => location.hash);
  // 5) Ctrl+F should not toggle anything / Korean IME 'ㅔ' with code KeyP should toggle presenter
  await page.evaluate(() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "ㅔ", code: "KeyP", bubbles: true })));
  await sleep(300);
  const presenterShown = await page.evaluate(() => !document.getElementById("presenter").hidden);
  await page.evaluate(() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "ㅔ", code: "KeyP", bubbles: true })));
  await page.evaluate(() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "d", code: "KeyD", ctrlKey: true, bubbles: true })));
  await sleep(300);
  const demoOpenedByCtrlD = await page.evaluate(() => !document.getElementById("demo").hidden);
  // 6) slide 12: drag then ArrowRight should move to slide 13
  await page.goto(URL + "#slide-12", { waitUntil: "load" }); await sleep(4000);
  await page.mouse.move(400, 640); await page.mouse.down(); await page.mouse.move(700, 640, { steps: 5 }); await page.mouse.up(); await sleep(300);
  const xAfterDrag = await page.evaluate(() => document.getElementById("ba12").style.getPropertyValue("--x"));
  await page.keyboard.press("ArrowRight"); await sleep(1000);
  const afterDragNav = await page.evaluate(() => location.hash);
  // 7) presenter panel visible over demo (z-index)
  await page.goto(URL + "#slide-17", { waitUntil: "load" }); await sleep(1500);
  await page.keyboard.press("Enter"); await sleep(1500); await page.keyboard.press("p"); await sleep(500);
  const z = await page.evaluate(() => [getComputedStyle(document.getElementById("presenter")).zIndex, getComputedStyle(document.getElementById("demo")).zIndex]);
  await page.screenshot({ path: path.join(OUT, "demo-presenter.png") });
  console.log(JSON.stringify({ afterRepeat, presenterShown, demoOpenedByCtrlD, xAfterDrag, afterDragNav, z, errs }));
  await browser.close();
})();
