/* ============================================================
   app.js — 발표 엔진
   - 1920×1080 캔버스 스케일 (Letterbox)
   - 한 번의 조작 = 정확히 한 장 (휠 디바운스 700ms)
   - 키보드: ↓→Space PgDn 다음 / ↑← PgUp 이전 / Home End / F P M T S D R
   - 시연(DEMO): 마지막 장(32장)에서 Enter, 18·25장의 DEMO 버튼, 또는 어느 장표에서든 D. 종료 시 시연을 연 장표로 복귀
   - URL Hash #slide-NN 유지, 새로고침 시 복원
   - 장표 진입 시 자동 시퀀스 재생, 재진입 시 처음부터
   ============================================================ */
(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const pad2 = (n) => String(n).padStart(2, "0");
  const N = SLIDES.length;

  const stage = $("#stage"), deck = $("#deck");
  const html = document.documentElement;

  /* ---------- 상태 ---------- */
  let cur = -1;               // 현재 장표 index (0-based)
  let ctx = null;             // 현재 장표 lifecycle context
  let wheelLock = 0, lastWheelT = 0;
  let demoOpen = false, demoIdx = 0, demoCtx = null, demoFrom = N - 1;   // demoFrom: 시연을 연 장표 index (복귀 지점 · #demo-N 직접 진입 시 마지막 장)

  /* ---------- 유틸: lifecycle context ---------- */
  function makeCtx(extra = {}) {
    const timers = [], offs = [];
    const c = {
      dead: false,
      timer(fn, ms) { const id = setTimeout(() => { if (!c.dead) fn(); }, ms); timers.push(id); return id; },
      on(el, ev, fn, opt) { if (!el) return; el.addEventListener(ev, fn, opt); offs.push(() => el.removeEventListener(ev, fn, opt)); },
      kill() { c.dead = true; timers.forEach(clearTimeout); offs.forEach(f => f()); },
      ...extra
    };
    return c;
  }

  /* ---------- 출처 footnote ---------- */
  function sourceHTML(ids) {
    if (!ids || !ids.length) return "";
    return "출처 · " + ids.map(id => {
      const s = SOURCES.find(x => x.id === id);
      return s ? `${s.status === "verify" ? '<span class="vf" title="원문 확인 필요"></span>' : ""}<b>[${s.id}]</b> ${s.org}, ${s.title}${s.date ? ` (${s.date})` : ""}` : "";
    }).join(" · ");
  }

  /* ---------- 배경 레이어 ---------- */
  function bgHTML(slide, vis) {
    const b = vis.bg || { tone: "warm", seed: slide.id };
    const tint = b.tint || {
      warm: "linear-gradient(180deg,rgba(247,244,236,.86) 0%,rgba(247,244,236,.96) 60%,rgba(247,244,236,1) 100%)",
      cool: "linear-gradient(180deg,rgba(244,246,248,.86) 0%,rgba(244,246,248,.96) 60%,rgba(244,246,248,1) 100%)",
      green:"linear-gradient(180deg,rgba(247,244,236,.86) 0%,rgba(247,244,236,.96) 60%,rgba(247,244,236,1) 100%)"
    }[b.tone || "warm"];
    const m = MEDIA[slide.id];
    let media = "";
    if (m && m.type === "video") media = `<video class="media" muted playsinline loop preload="none" data-src="${m.src}" ${m.poster ? `data-poster="${m.poster}"` : ""}></video>`;
    else if (m && m.type === "image") media = `<img class="media" alt="" data-src="${m.src}">`;
    return `<div class="bg">${shelvesSVG(b.seed || slide.id, b.tone || "warm")}<div class="tint" style="background:${tint}"></div>${media}<div class="veil"></div>${b.extra || ""}</div>`;
  }

  /* 제목의 <br> 는 장표에서만 줄바꿈으로 쓰고, 목차·읽기 표시·메모에서는 공백으로 */
  const plain = (s) => s.replace(/<br\s*\/?>/gi, " ");

  /* ---------- 장표 DOM 생성 ---------- */
  function build() {
    deck.innerHTML = SLIDES.map((s, i) => {
      const vis = VISUALS[s.id] || { html: () => "" };
      const inner = vis.hero
        ? vis.html()
        : `<div class="slide-inner">
             <header class="slide-head">
               <h1 class="title rv" style="--d:0ms">${s.title}</h1>
               <p class="gov rv" style="--d:120ms">${s.gov}</p>
             </header>
             <div class="visual">${vis.html()}</div>
           </div>`;
      const src = sourceHTML(s.sources);
      return `<section class="slide" id="sec-${pad2(s.id)}" data-id="${s.id}" data-tone="${vis.tone || "warm"}" data-media-mode="${vis.hero ? "hero" : "normal"}" style="--i:${i}" aria-label="${s.id}. ${plain(s.title)}">
        ${bgHTML(s, vis)}${inner}${src ? `<div class="source">${src}</div>` : ""}
      </section>`;
    }).join("");

    // 목차
    $("#tocList").innerHTML = SLIDES.map((s, i) => `<li data-i="${i}"><span class="n">${pad2(s.id)}</span><div><span class="t">${plain(s.title)}</span><span class="c">${s.chapter}</span></div></li>`).join("")
      + `<li class="demo-row" data-demo="1"><span class="n">${ic("monitor")}</span><div><span class="t">서비스 시연 ${DEMO_SCREENS.length}화면</span><span class="c">18장 · 25장 DEMO 버튼 · D 키</span></div></li>`;
    $$("#tocList li").forEach(li => li.addEventListener("click", () => {
      closeOverlays();
      if (li.dataset.demo) { goTo(SLIDES.length - 1); openDemo(); return; }
      goTo(+li.dataset.i);
    }));
    // 출처
    $("#srcList").innerHTML = SOURCES.map(s => `<li class="${s.status}"><span class="k">[${s.id}]${s.status === "verify" ? ' <em class="verify">원문 확인 필요</em>' : ""}</span><div class="h">${s.org}<small>${s.title}${s.date ? ` · ${s.date}` : ""}</small></div><div class="n">${s.note}${s.url ? `<span class="u">${s.url}</span>` : ""}</div></li>`).join("");
  }

  /* ---------- 스케일 ---------- */
  function fit() {
    const w = window.innerWidth, h = window.innerHeight;
    const sc = Math.min(w / 1920, h / 1080);
    stage.style.transform = `scale(${sc})`;
    stage.style.left = Math.round((w - 1920 * sc) / 2) + "px";
    stage.style.top = Math.round((h - 1080 * sc) / 2) + "px";
    stage.scrollTop = 0; stage.scrollLeft = 0;
    $("#small-notice").hidden = w >= 1024;
  }

  /* ---------- 미디어 지연 로딩 (현재 ±1) ---------- */
  function loadMedia(i) {
    for (let k = Math.max(0, i - 1); k <= Math.min(N - 1, i + 1); k++) {
      const sec = deck.children[k];
      const m = sec.querySelector(".media");
      if (!m || m.dataset.loaded) continue;
      m.dataset.loaded = "1";
      const bg = sec.querySelector(".bg");
      const ok = () => { bg.classList.add("has-media"); m.classList.add("ready"); if (k === cur) syncChromeMedia(); };
      // 실패 시: 영상 → 포스터 이미지 → CSS/SVG 배경 (PRD 폴백 순서)
      const fail = () => {
        if (m.tagName === "VIDEO" && m.dataset.poster) {
          const im = document.createElement("img");
          im.className = m.className.replace(/ready/, "").trim();
          im.alt = "";
          im.addEventListener("load", () => { bg.classList.add("has-media"); im.classList.add("ready"); if (k === cur) syncChromeMedia(); }, { once: true });
          im.addEventListener("error", () => im.remove(), { once: true });
          im.src = m.dataset.poster;
          m.replaceWith(im);
        } else {
          m.remove();
        }
      };
      if (m.tagName === "VIDEO") {
        m.addEventListener("loadeddata", ok, { once: true });
        m.addEventListener("error", fail, { once: true });
        if (m.dataset.poster) { const im = new Image(); im.onload = () => { m.poster = m.dataset.poster; }; im.src = m.dataset.poster; }
        m.preload = k === i ? "auto" : "metadata";
        m.src = m.dataset.src;
      } else {
        m.addEventListener("load", ok, { once: true });
        m.addEventListener("error", fail, { once: true });
        m.src = m.dataset.src;
      }
    }
    // 재생 제어: 현재 장표만 재생
    $$("video.media", deck).forEach(v => {
      const sec = v.closest(".slide");
      if (+sec.style.getPropertyValue("--i") === i) { v.play?.().catch(() => {}); } else { v.pause?.(); }
    });
  }

  /* ---------- 카운트업 ---------- */
  function runCounts(sec, c) {
    const rm = html.classList.contains("rm");
    $$(".count", sec).forEach(el => {
      const to = parseFloat(el.dataset.to), dec = +(el.dataset.dec || 0), dur = +(el.dataset.dur || 1000);
      const fmt = (v) => v.toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      const delay = parseFloat(getComputedStyle(el.closest("[style*='--d']") || el).getPropertyValue("--d")) || 0;
      el.textContent = fmt(0);
      if (rm) { el.textContent = fmt(to); return; }
      c.timer(() => {
        const t0 = performance.now();
        const step = (now) => {
          if (c.dead) return;
          const t = Math.min(1, (now - t0) / dur);
          const e = 1 - Math.pow(1 - t, 3);
          el.textContent = fmt(to * e);
          if (t < 1) requestAnimationFrame(step); else el.textContent = fmt(to);
        };
        requestAnimationFrame(step);
      }, delay + 150);
    });
  }

  /* ---------- 장표 전환 ---------- */
  const leaveTimers = new WeakMap();
  function goTo(i, { replace = false, force = false } = {}) {
    i = Math.max(0, Math.min(N - 1, i));
    if (i === cur && !force) return;
    const prev = cur; cur = i;
    // leave: 나가는 장표의 콘텐츠는 슬라이드 전환(650ms)이 끝난 뒤 초기화 (빈 배경이 밀려 나가는 번쩍임 방지)
    if (prev >= 0) {
      const ps = deck.children[prev];
      ctx?.kill();
      const doLeave = () => { ps.classList.remove("is-active"); VISUALS[SLIDES[prev].id]?.leave?.(ps); };
      if (force || html.classList.contains("rm")) doLeave();
      else leaveTimers.set(ps, setTimeout(doLeave, 700));
    }
    // move (앵커 스크롤 등으로 스테이지가 밀린 경우 항상 0으로 고정)
    stage.scrollTop = 0; stage.scrollLeft = 0; $("#viewport").scrollTop = 0;
    deck.style.transform = `translateY(${-i * 1080}px)`;
    const sec = deck.children[i];
    // 되돌아온 장표는 예약된 leave를 취소하고 처음부터 재생
    clearTimeout(leaveTimers.get(sec));
    sec.classList.remove("is-active"); VISUALS[SLIDES[i].id]?.leave?.(sec);
    // 재진입 시 애니메이션 리셋을 위해 reflow
    void sec.offsetWidth;
    sec.classList.add("is-active");
    ctx = makeCtx({ openDemo, finishDemo });
    runCounts(sec, ctx);
    VISUALS[SLIDES[i].id]?.enter?.(sec, ctx);
    loadMedia(i);
    updateChrome();
    const h = `#slide-${pad2(SLIDES[i].id)}`;
    if (replace) history.replaceState(null, "", h); else if (location.hash !== h) history.pushState(null, "", h);
  }
  const next = () => goTo(cur + 1);
  const prevS = () => goTo(cur - 1);

  /* 현재 장표에 배경 미디어가 실제로 떠 있는지 → 장표 밖 크롬(챕터·쪽번호)의 밝은 글자 여부 */
  function syncChromeMedia() {
    const sec = deck.children[cur];
    html.classList.toggle("cur-media", !!(sec && sec.querySelector(".bg.has-media")));
  }

  function updateChrome() {
    const s = SLIDES[cur];
    syncChromeMedia();
    $("#progress").style.setProperty("--p", (cur + 1) / N);
    $("#chapter").textContent = s.chapter;
    $("#pageno").textContent = `${pad2(s.id)} / ${N}`;
    $$("#tocList li").forEach(li => li.classList.toggle("cur", +li.dataset.i === cur));
    updatePresenter();
  }

  /* ---------- 발표자 메모 ---------- */
  function updatePresenter() {
    const p = $("#presenter"); if (p.hidden) return;
    if (demoOpen) {
      const dn = DEMO_NOTES[DEMO_SCREENS[demoIdx].noteIdx ?? demoIdx];
      $("#pnProgress").textContent = `DEMO ${demoIdx + 1} / ${DEMO_SCREENS.length}${dn.time ? ` · ${dn.time}` : ""}`;
      $("#pnCue").innerHTML = `<span>DEMO</span>${dn.cue}`;
      $("#pnBody").innerHTML = `<p>${dn.note}</p>`;
      $("#pnNext").textContent = demoIdx < DEMO_SCREENS.length - 1 ? DEMO_SCREENS[demoIdx + 1].title : `${pad2(SLIDES[demoFrom].id)}장으로 복귀 · 발표 종료`;
      return;
    }
    const s = SLIDES[cur];
    $("#pnProgress").textContent = `${pad2(s.id)} / ${N}${s.time ? ` · ${s.time}` : ""}`;
    $("#pnCue").innerHTML = `<span>${s.cue.split(" ")[0]}</span>${s.cue}`;
    $("#pnBody").innerHTML = s.note.map(t => `<p>${t}</p>`).join("");
    $("#pnNext").textContent = cur < N - 1 ? `${pad2(SLIDES[cur + 1].id)}. ${plain(SLIDES[cur + 1].title)}` : "실제 서비스 시연 (Enter 또는 D) → 종료";
  }
  function togglePresenter() { const p = $("#presenter"); p.hidden = !p.hidden; updatePresenter(); toast(p.hidden ? "발표자 메모 OFF" : "발표자 메모 ON"); }

  /* ---------- 오버레이 ---------- */
  function closeOverlays() { $("#toc").hidden = true; $("#sources").hidden = true; }
  function toggle(id) { const el = $(id); const was = el.hidden; closeOverlays(); el.hidden = !was; }

  /* ---------- 토스트 ---------- */
  let toastT;
  function toast(msg) { const t = $("#toast"); t.hidden = true; void t.offsetWidth; t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => t.hidden = true, 2300); }

  /* ---------- 전체화면 / 모션 ---------- */
  async function toggleFull() {
    if (!document.fullscreenElement) {
      try { await document.documentElement.requestFullscreen?.(); } catch (_) {}
      // 전체화면 중 Esc가 브라우저에 먹히지 않고 덱(패널 닫기·시연 종료)에 전달되도록 (지원 브라우저에서만)
      navigator.keyboard?.lock?.(["Escape"]).catch(() => {});
    } else document.exitFullscreen?.();
  }
  function toggleMotion() { html.classList.toggle("rm"); toast(html.classList.contains("rm") ? "모션 최소화 ON" : "모션 최소화 OFF"); replay(); }
  function replay() { goTo(cur, { replace: true, force: true }); }

  /* ---------- DEMO ---------- */
  function openDemo() {
    if (DECK_META.demoUrl) { window.open(DECK_META.demoUrl, "demo"); return; }
    demoFrom = Math.max(0, cur);
    showDemo(0, true);
  }
  // 히스토리 복원(popstate/초기 진입)과 일반 진입을 한 경로로
  function showDemo(idx, push) {
    demoOpen = true; demoIdx = idx;
    $("#demo").hidden = false; closeOverlays();
    if (push) history.pushState(null, "", `#demo-${idx + 1}`);
    renderDemo();
  }
  function renderDemo() {
    demoCtx?.kill();
    const sc = DEMO_SCREENS[demoIdx];
    const st = $("#demoStage");
    st.innerHTML = `<div class="dm-head fade-in"><span class="n">DEMO ${demoIdx + 1} / ${DEMO_SCREENS.length}</span><h2>${sc.title}</h2><span>${sc.sub}</span></div><div class="dm-body">${sc.html()}</div>`;
    $("#demoSteps").innerHTML = DEMO_SCREENS.map((_, k) => `<i class="${k <= demoIdx ? "on" : ""}"></i>`).join("");
    demoCtx = makeCtx({ finishDemo });
    sc.enter?.(st, demoCtx);
    history.replaceState(null, "", `#demo-${demoIdx + 1}`);
    updatePresenter();
  }
  function demoNext() { if (demoIdx < DEMO_SCREENS.length - 1) { demoIdx++; renderDemo(); } else finishDemo(); }
  const LAST = N - 1;   // 마지막 장에서 Enter → 시연
  function demoPrev() { if (demoIdx > 0) { demoIdx--; renderDemo(); } else closeDemo(demoFrom); }
  function closeDemo(toIndex) {
    demoOpen = false; demoCtx?.kill(); demoCtx = null;
    $("#demo").hidden = true; $("#demoStage").innerHTML = "";
    if (toIndex !== undefined) { goTo(toIndex, { replace: true, force: true }); } else { updatePresenter(); history.replaceState(null, "", `#slide-${pad2(SLIDES[cur].id)}`); }
  }
  function finishDemo() { closeDemo(demoFrom); }   // 시연을 연 장표로 복귀

  /* ---------- 입력 ---------- */
  function onKey(e) {
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea") return;
    if (e.repeat) return;                                   // 키를 길게 눌러도 한 장만
    if (e.ctrlKey || e.metaKey || e.altKey) return;         // Win+P, Ctrl+F 등 브라우저/OS 조합은 통과
    const k = /^Key[A-Z]$/.test(e.code) ? e.code.slice(3).toLowerCase() : e.key;   // 한글 입력 상태·CapsLock 무관
    const anyOverlay = !$("#toc").hidden || !$("#sources").hidden;

    // Esc: 시연 중이면 복귀 · 패널이 열려 있으면 닫기 · 그 외에는 목차 열기 (O 키도 동일)
    if (k === "Escape") {
      if (demoOpen) closeDemo(demoFrom);
      else if (anyOverlay) closeOverlays();
      else toggle("#toc");
      return;
    }

    if (demoOpen) {
      if (["ArrowRight", "ArrowDown", " ", "PageDown", "Enter"].includes(k)) { e.preventDefault(); demoNext(); }
      else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(k)) { e.preventDefault(); demoPrev(); }
      else if (k === "Backspace") { e.preventDefault(); closeDemo(demoFrom); }
      else if (k === "p") togglePresenter();
      else if (k === "f") toggleFull();
      return;
    }
    if (anyOverlay && !["t", "s", "o"].includes(k)) { if (["ArrowRight", "ArrowDown", " ", "PageDown"].includes(k)) e.preventDefault(); return; }

    switch (k) {
      case "ArrowRight": case "ArrowDown": case " ": case "PageDown": e.preventDefault(); next(); break;
      case "ArrowLeft": case "ArrowUp": case "PageUp": e.preventDefault(); prevS(); break;
      case "Home": e.preventDefault(); goTo(0); break;
      case "End": e.preventDefault(); goTo(N - 1); break;
      case "Enter": e.preventDefault(); if (cur === LAST) openDemo(); else next(); break;
      case "d": openDemo(); break;
      case "f": toggleFull(); break;
      case "p": togglePresenter(); break;
      case "m": toggleMotion(); break;
      case "t": case "o": toggle("#toc"); break;
      case "s": toggle("#sources"); break;
      case "r": replay(); toast("장표 다시 재생"); break;
      case "b": html.classList.toggle("mediadark"); toast(html.classList.contains("mediadark") ? "배경 강조 ON · 밝은 글자" : "배경 강조 OFF · 기본"); break;
    }
  }

  function onWheel(e) {
    if (demoOpen || !$("#toc").hidden || !$("#sources").hidden) return;
    if ($("#presenter").contains(e.target) && !$("#presenter").hidden) return;   // 메모 스크롤 허용
    e.preventDefault();
    const now = Date.now();
    const gap = now - lastWheelT; lastWheelT = now;
    if (Math.abs(e.deltaY) < 8) return;
    if (gap < 200) return;                 // 트랙패드 관성 등 같은 제스처의 연속 이벤트
    if (now < wheelLock) return;
    wheelLock = now + 700;
    if (e.deltaY > 0) next(); else prevS();
  }

  function fromHash() {
    const h = location.hash;
    let m = /#slide-(\d+)/.exec(h);
    if (m) { const idx = SLIDES.findIndex(s => s.id === +m[1]); return { slide: idx >= 0 ? idx : 0 }; }
    m = /#demo-(\d+)/.exec(h);
    if (m) return { slide: demoFrom, demo: Math.max(0, Math.min(DEMO_SCREENS.length - 1, +m[1] - 1)) };
    return { slide: 0 };
  }

  /* ---------- 초기화 ---------- */
  function init() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) html.classList.add("rm");
    build();
    fit();
    window.addEventListener("resize", fit);
    document.addEventListener("keydown", onKey);
    stage.addEventListener("wheel", onWheel, { passive: false });
    $("#navPrev").addEventListener("click", () => demoOpen ? demoPrev() : prevS());
    $("#navNext").addEventListener("click", () => demoOpen ? demoNext() : next());
    $("#pageno").addEventListener("click", () => toggle("#toc"));
    $$("button", stage).forEach(b => b.addEventListener("click", () => b.blur()));   // 클릭 후 Enter가 버튼을 다시 누르지 않도록
    window.addEventListener("popstate", () => {
      const t = fromHash();
      if (t.demo !== undefined) { if (!demoOpen) { goTo(demoFrom, { replace: true, force: true }); } showDemo(t.demo, false); }
      else { if (demoOpen) closeDemo(); goTo(t.slide, { replace: true }); }
    });
    const t = fromHash();
    // 새로고침 복원 시 1장에서 해당 장표까지 스크롤되는 모습이 보이지 않도록
    deck.style.transition = "none";
    goTo(t.slide, { replace: true });
    requestAnimationFrame(() => requestAnimationFrame(() => { deck.style.transition = ""; }));
    if (t.demo !== undefined) showDemo(t.demo, false);
    html.classList.add("mediadark");   // 배경 미디어 강조 기본 ON (B 키로 해제)
    if (html.classList.contains("rm")) setTimeout(() => toast("시스템 설정으로 모션 최소화 ON · M 키로 해제"), 600);
    else setTimeout(() => toast("T·O·Esc 목차 · S 출처 · P 발표자 메모 · F 전체화면 · D 시연"), 700);
  }
  document.addEventListener("DOMContentLoaded", init);
})();
