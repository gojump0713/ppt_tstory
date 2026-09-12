/* favicon.svg 를 래스터화 — favicon.ico / apple-touch-icon.png / icon-192·512.png 의 원본 */
const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");
const ROOT = path.join(__dirname, "..");
const TMP = path.join(__dirname, "_icon_render.html");
const OUT = path.join(__dirname, "icon-1024.png");
(async () => {
  fs.writeFileSync(TMP, `<!DOCTYPE html><meta charset="utf-8"><style>html,body{margin:0;width:1024px;height:1024px;background:transparent}img{width:1024px;height:1024px;display:block}</style><img src="../favicon.svg">`);
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--disable-gpu"] });
  const p = await b.newPage();
  await p.setViewport({ width: 1024, height: 1024, deviceScaleFactor: 1 });
  await p.goto("file:///" + TMP.split(path.sep).join("/"), { waitUntil: "networkidle0" });
  await p.screenshot({ path: OUT, omitBackground: true });
  fs.unlinkSync(TMP);
  console.log("wrote", OUT);
  await b.close();
})();
