const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");
const OUT = path.join(__dirname, "qa-shots");
fs.mkdirSync(OUT, { recursive: true });
const URL = "file:///C:/coding/ppt_tstory3/presentation/index.html";
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: "new",
    args: ["--window-size=1920,1080", "--disable-gpu", "--no-first-run"]
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  const errors = [];
  page.on("pageerror", e => errors.push("PAGEERROR: " + e.message));
  page.on("console", m => { if (["error", "warning"].includes(m.type())) errors.push(m.type().toUpperCase() + ": " + m.text()); });
  page.on("requestfailed", r => { if (!/media\//.test(r.url())) errors.push("REQFAIL: " + r.url()); });

  const report = [];
  const state = async () => page.evaluate(() => {
    const act = document.querySelector(".slide.is-active");
    return { hash: location.hash, active: act && act.dataset.id, deck: document.getElementById("deck").style.transform, chapter: document.getElementById("chapter").textContent, page: document.getElementById("pageno").textContent };
  });

  // 1) 직접 해시 진입 (새로고침 시나리오)
  await page.goto(URL + "#slide-12", { waitUntil: "load" });
  await sleep(4500);
  report.push({ test: "direct #slide-12", ...(await state()) });
  await page.screenshot({ path: path.join(OUT, "direct-12.png") });

  // 2) 처음부터 키보드로 순회
  await page.goto(URL, { waitUntil: "load" });
  await sleep(4800);
  for (let i = 1; i <= 26; i++) {
    if (i > 1) { await page.keyboard.press("ArrowRight"); await sleep(5200); }
    const st = await state();
    const extra = await page.evaluate((i) => {
      const s = document.querySelector(".slide.is-active");
      const o = {};
      if (i === 9) { o.stepsOn = s.querySelectorAll(".step.on").length; o.focus = s.querySelector(".step.focus")?.dataset.i; o.fill = s.querySelector("#railFill").style.width; }
      if (i === 12) o.evening = s.querySelector("#scene12").classList.contains("evening");
      if (i === 13) o.x = s.querySelector("#ba13").style.getPropertyValue("--x");
      
      if (i === 16) { const c = s.querySelector(".orbit .core").getBoundingClientRect(); const o1 = s.querySelector(".orbit").getBoundingClientRect(); o.coreCenter = [Math.round(c.left + c.width/2 - o1.left), Math.round(c.top + c.height/2 - o1.top)]; }
      
      // 오버플로 검사: 슬라이드 내부 요소가 1920x1080 밖으로 나가는지
      const r0 = s.getBoundingClientRect();
      let over = [];
      s.querySelectorAll(".visual *, .hero *, .closing *").forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        if (r.right > r0.right + 1 || r.bottom > r0.bottom + 1 || r.left < r0.left - 1 || r.top < r0.top - 1) over.push(el.className?.baseVal ?? el.className);
      });
      o.overflow = over.slice(0, 5);
      // 텍스트가 카드 밖으로 넘치는지 (scrollHeight > clientHeight)
      let clip = [];
      s.querySelectorAll(".card, .chip, .step, .vnode, .leaf, .barrier, .verb, .row, .bk, .r-card, .rd, .cn, .cl").forEach(el => { if (el.scrollHeight > el.clientHeight + 2 && getComputedStyle(el).overflow !== "visible") clip.push(el.className); });
      o.clipped = clip.slice(0, 5);
      return o;
    }, i);
    report.push({ test: `slide ${i}`, ...st, ...extra });
    await page.screenshot({ path: path.join(OUT, `s${String(i).padStart(2, "0")}.png`) });
  }
  // 3) 뒤로 이동, End/Home
  await page.keyboard.press("ArrowLeft"); await sleep(900);
  report.push({ test: "ArrowLeft from 26", ...(await state()) });
  await page.keyboard.press("Home"); await sleep(900);
  report.push({ test: "Home", ...(await state()) });
  await page.keyboard.press("End"); await sleep(900);
  report.push({ test: "End", ...(await state()) });

  // 4) 휠: 한 번에 한 장
  await page.keyboard.press("Home"); await sleep(900);
  await page.mouse.move(960, 540);
  await page.mouse.wheel({ deltaY: 120 }); await page.mouse.wheel({ deltaY: 120 }); await page.mouse.wheel({ deltaY: 120 });
  await sleep(1200);
  report.push({ test: "3 wheel ticks in 100ms → expect slide 2", ...(await state()) });

  // 5) 오버레이: P / T / S
  await page.keyboard.press("p"); await sleep(400);
  await page.screenshot({ path: path.join(OUT, "presenter.png") });
  report.push({ test: "presenter", hidden: await page.$eval("#presenter", e => e.hidden), body: (await page.$eval("#pnBody", e => e.textContent)).slice(0, 40) });
  await page.keyboard.press("p"); await sleep(200);
  await page.keyboard.press("t"); await sleep(400);
  await page.screenshot({ path: path.join(OUT, "toc.png") });
  await page.keyboard.press("Escape"); await sleep(200);
  await page.keyboard.press("s"); await sleep(400);
  await page.screenshot({ path: path.join(OUT, "sources.png") });
  await page.keyboard.press("Escape"); await sleep(200);

  // 6) 마지막 장(26) → Enter → DEMO 5화면 → 26장 복귀 (시연은 연 장표로 복귀)
  await page.goto(URL + "#slide-26", { waitUntil: "load" }); await sleep(3200);
  await page.keyboard.press("Enter"); await sleep(4500);
  report.push({ test: "demo 1", hash: await page.evaluate(() => location.hash) });
  await page.screenshot({ path: path.join(OUT, "d1.png") });
  await page.keyboard.press("ArrowRight"); await sleep(4200);
  await page.screenshot({ path: path.join(OUT, "d2.png") });
  await page.keyboard.press("ArrowRight"); await sleep(2800);
  await page.screenshot({ path: path.join(OUT, "d3.png") });
  await page.keyboard.press("ArrowRight"); await sleep(2000);
  await page.screenshot({ path: path.join(OUT, "d4.png") });
  await page.keyboard.press("ArrowRight"); await sleep(2200);
  await page.screenshot({ path: path.join(OUT, "d5.png") });
  report.push({ test: "demo 5", hash: await page.evaluate(() => location.hash), steps: await page.$$eval("#demoSteps i", a => a.length) });
  await page.keyboard.press("Enter"); await sleep(1500);
  report.push({ test: "after demo Enter → expect 26", ...(await state()) });
  // Backspace 복귀
  await page.keyboard.press("d"); await sleep(800);
  await page.keyboard.press("Backspace"); await sleep(800);
  report.push({ test: "demo Backspace → expect 26", ...(await state()) });

  // 7) 1366x768 스케일 + 1024 미만 안내
  await page.setViewport({ width: 1366, height: 768 });
  await page.goto(URL + "#slide-04", { waitUntil: "load" }); await sleep(3500);
  await page.screenshot({ path: path.join(OUT, "laptop-1366.png") });
  report.push({ test: "1366x768 scale", transform: await page.$eval("#stage", e => e.style.transform + " " + e.style.left + " " + e.style.top) });
  await page.setViewport({ width: 900, height: 700 }); await sleep(500);
  report.push({ test: "900px notice", shown: await page.$eval("#small-notice", e => !e.hidden) });

  // 8) M (모션 최소화) 상태에서 8장
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(URL + "#slide-09", { waitUntil: "load" }); await sleep(500);
  await page.keyboard.press("m"); await sleep(600);
  report.push({ test: "reduced motion slide 9", stepsOn: await page.evaluate(() => document.querySelectorAll(".slide.is-active .step.on").length) });
  await page.screenshot({ path: path.join(OUT, "rm-08.png") });

  fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify({ report, errors }, null, 2));
  console.log(JSON.stringify({ report, errors }, null, 1));
  await browser.close();
})().catch(e => { console.error("QA FAILED", e); process.exit(1); });
