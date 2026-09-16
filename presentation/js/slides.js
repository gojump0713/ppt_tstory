/* ============================================================
   slides.js — 장표별 메인 비주얼 템플릿 + 진입 시퀀스
   기준: AI시민동화책_공공도서관_발표멘트_최종.md · 화면설계서 · PRD
   각 항목: { html: () => string, enter?(el, ctx), leave?(el) }
   - 진입 후 자동 순차 재생, 4.5초 이내 최종 상태
   - 클릭 없이 모든 핵심 정보 노출 (Hover/Drag는 보조)
   - 화면 텍스트는 화면설계서의 본문 문구만 노출 (낭독 멘트는 발표자 메모)
   ============================================================ */

const ic = (name, cls = "") => `<svg class="ic ${cls}"><use href="#i-${name}"/></svg>`;
const arr = () => `<span class="arr">${ic("arrow")}</span>`;
const d = (ms) => `style="--d:${ms}ms"`;

/* 도서관 서가 배경 (SVG, 결정적 난수) */
function shelvesSVG(seed = 1, tone = "warm") {
  let s = seed * 9301 + 49297;
  const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const palettes = {
    warm: ["#E7A74E", "#D98E5C", "#C9B79C", "#8FA5B8", "#6C7A89", "#B2C4A8", "#E1C78F"],
    cool: ["#8A96FF", "#9DB2CC", "#C4CFDD", "#7B8FA3", "#B9C6D6", "#A6B7C9", "#D6DDE6"],
    green:["#3F9B74", "#8FBFA9", "#C9B79C", "#B2C4A8", "#6C7A89", "#E1C78F", "#9DB2CC"]
  };
  const pal = palettes[tone] || palettes.warm;
  let out = `<svg class="shelves" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" aria-hidden="true">`;
  const rows = [150, 330, 510, 690, 870];
  rows.forEach((y) => {
    out += `<rect x="0" y="${y + 130}" width="1920" height="10" fill="rgba(21,32,43,.10)"/>`;
    let x = -20 + rnd() * 30;
    while (x < 1940) {
      const w = 18 + rnd() * 30, h = 84 + rnd() * 46;
      const c = pal[Math.floor(rnd() * pal.length)];
      const tilt = rnd() < 0.08 ? (rnd() * 8 - 4) : 0;
      out += `<rect x="${x.toFixed(1)}" y="${(y + 130 - h).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="3" fill="${c}" opacity="${(0.18 + rnd() * 0.16).toFixed(2)}" transform="rotate(${tilt.toFixed(1)} ${x + w / 2} ${y + 130})"/>`;
      x += w + 3 + rnd() * 6;
      if (rnd() < 0.06) x += 40 + rnd() * 80;
    }
  });
  out += `</svg>`;
  return out;
}

/* 공룡 (SVG 일러스트) — 아이의 그림 예시 */
function dinoSVG() {
  return `<svg viewBox="0 0 160 160" aria-hidden="true">
    <ellipse cx="80" cy="140" rx="46" ry="8" fill="rgba(21,32,43,.08)"/>
    <path d="M40 120c-14-6-20-26-10-44 8-14 24-20 40-18l30 4c16 2 28 14 30 30 2 14-6 26-18 30l-28 6c-16 3-30 0-44-8z" fill="#7BC67E"/>
    <path d="M118 66c10-14 22-16 30-10-6 6-8 14-6 22-8-4-16-6-24-12z" fill="#7BC67E"/>
    <circle cx="118" cy="74" r="20" fill="#8FD292"/>
    <circle cx="124" cy="70" r="4.5" fill="#15202B"/><circle cx="125.5" cy="68.5" r="1.4" fill="#fff"/>
    <path d="M128 84c-4 4-10 4-14 0" stroke="#15202B" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M62 60l6-16 6 16M78 58l6-14 6 14M94 60l5-12 5 12" fill="#3F9B74"/>
    <ellipse cx="60" cy="124" rx="10" ry="6" fill="#5FAF68"/><ellipse cx="94" cy="128" rx="10" ry="6" fill="#5FAF68"/>
    <path d="M40 98c-14 4-24 14-30 26 10-2 22-8 34-18z" fill="#5FAF68"/>
    <circle cx="112" cy="84" r="3" fill="#F6B8A6"/>
  </svg>`;
}

/* 우산 일러스트 (스타일 변형) — 가족 그림책 · 시연 예시 */
function umbrellaSVG(variant = "clean", opts = {}) {
  const { face = "smile", friend = "raindrop", sky = "#DCEBF8", stroke = "#15202B" } = opts;
  if (variant === "crayon") {
    return `<svg viewBox="0 0 520 400" aria-hidden="true">
      <g fill="none" stroke="#E5645E" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity=".85">
        <path d="M120 200c14-70 70-110 140-110s126 42 140 112c-24-14-46-12-70 2-24-14-46-14-70 0-24-14-46-14-70 0-24-14-46-16-70-4z"/>
        <path d="M262 206v120c0 22-12 34-30 34-16 0-28-10-30-26"/>
      </g>
      <g stroke="#5C6CFF" stroke-width="6" stroke-linecap="round" opacity=".7">
        <path d="M60 60l-6 30M110 40l-8 34M420 50l-8 30M470 90l-6 28M30 150l-6 30M480 170l-6 30"/>
      </g>
      <g stroke="#15202B" stroke-width="5" fill="none" stroke-linecap="round">
        <path d="M230 150c4 8 12 8 16 0M270 150c4 8 12 8 16 0"/>
        <path d="M240 178c10-10 30-10 40 0" transform="rotate(180 260 172)"/>
      </g>
      <path d="M70 360c60-18 320-20 380-6" stroke="#B2C4A8" stroke-width="10" fill="none" stroke-linecap="round" opacity=".8"/>
    </svg>`;
  }
  const friends = {
    raindrop: `<g transform="translate(400 250)"><path d="M0-46C-22-12-30 4-30 18a30 30 0 0 0 60 0C30 4 22-12 0-46z" fill="#8FB5F5"/><circle cx="-9" cy="14" r="3.4" fill="#15202B"/><circle cx="9" cy="14" r="3.4" fill="#15202B"/><path d="M-8 26c4 5 12 5 16 0" stroke="#15202B" stroke-width="3" fill="none" stroke-linecap="round"/></g>`,
    bird: `<g transform="translate(400 240)"><path d="M-40 10c14-24 40-30 66-14 12 8 20 22 22 38-30-4-56 0-88-24z" fill="#F0BC6A"/><circle cx="6" cy="0" r="3.2" fill="#15202B"/><path d="M28-4l14 4-14 5z" fill="#E5645E"/><path d="M-10 36l-4 16M14 34l2 16" stroke="#B97A1C" stroke-width="4" stroke-linecap="round"/></g>`,
    cloud: `<g transform="translate(400 230)"><path d="M-46 24a24 24 0 0 1 8-46 34 34 0 0 1 64-8 26 26 0 0 1 12 50z" fill="#fff" stroke="#C4CFDD" stroke-width="3"/><circle cx="-12" cy="0" r="3.2" fill="#15202B"/><circle cx="12" cy="0" r="3.2" fill="#15202B"/><path d="M-8 12c4 5 12 5 16 0" stroke="#15202B" stroke-width="3" fill="none" stroke-linecap="round"/></g>`,
    none: ``
  };
  const faces = {
    smile: `<path d="M232 188c4 8 12 8 16 0M272 188c4 8 12 8 16 0" stroke="${stroke}" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M244 208c8 10 24 10 32 0" stroke="${stroke}" stroke-width="4.5" fill="none" stroke-linecap="round"/><circle cx="222" cy="206" r="6" fill="#F6B8A6"/><circle cx="298" cy="206" r="6" fill="#F6B8A6"/>`,
    sad: `<circle cx="240" cy="190" r="4" fill="${stroke}"/><circle cx="280" cy="190" r="4" fill="${stroke}"/><path d="M244 214c8-8 24-8 32 0" stroke="${stroke}" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M226 200c0 8-2 14-6 18" stroke="#8FB5F5" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    wow: `<circle cx="240" cy="190" r="4.5" fill="${stroke}"/><circle cx="280" cy="190" r="4.5" fill="${stroke}"/><ellipse cx="260" cy="212" rx="8" ry="10" fill="${stroke}"/>`
  };
  return `<svg viewBox="0 0 520 400" aria-hidden="true">
    <rect width="520" height="400" fill="${sky}"/>
    <g stroke="#9FC3EE" stroke-width="3" stroke-linecap="round" opacity=".7"><path d="M60 40v24M120 20v24M440 30v24M480 80v24M40 130v24M500 150v24M90 90v20M470 200v20"/></g>
    <path d="M0 340c80-30 160-30 260-14s180 10 260-8v82H0z" fill="#B7D3A8"/>
    <path d="M0 360c100-20 220-20 320-6s160 6 200-4v50H0z" fill="#9DC68F"/>
    <g>
      <path d="M118 210c6-72 68-118 142-118s136 46 142 118c-26-16-50-12-72 4-24-16-46-16-70 0-24-16-46-16-70 0-22-16-46-20-72-4z" fill="#E5645E"/>
      <path d="M118 210c6-72 68-118 142-118 20 0 40 4 58 10-60 8-100 52-108 108-24-16-46-16-70 0-22-16-46-20-72-4z" fill="#F08A80" opacity=".6"/>
      <path d="M260 214v112c0 20-12 32-30 32-16 0-28-10-30-26" stroke="#15202B" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path d="M260 92v-14" stroke="#15202B" stroke-width="8" stroke-linecap="round"/>
      ${faces[face] || faces.smile}
    </g>
    ${friends[friend] || ""}
  </svg>`;
}

/* 파형 막대 */
function waveBars(n = 34) {
  let out = "";
  for (let i = 0; i < n; i++) {
    const h = 25 + Math.round(Math.abs(Math.sin(i * 0.7) * 55 + Math.sin(i * 1.9) * 20));
    out += `<i style="--h:${Math.min(100, h)}%;--n:${i}"></i>`;
  }
  return out;
}

/* 가로 막대 비교 (7장) */
function hbar(label, value, max, color, delay) {
  return `<div class="hb rv" ${d(delay)}><span class="hb-l">${label}</span><span class="hb-t"><i style="--w:${(value / max * 100).toFixed(1)}%;background:${color}"></i></span><b class="hb-v" style="color:${color}">${value.toFixed(1)}<small>%</small></b></div>`;
}

/* ============================================================ */
const VISUALS = {

  /* ---------- 01 표지 ---------- */
  1: {
    hero: true,
    bg: { tone: "warm", seed: 3, extra: `<div class="light-on"></div>`, tint: "linear-gradient(180deg,rgba(247,244,236,.55) 0%,rgba(247,244,236,.86) 55%,rgba(247,244,236,.97) 100%)" },
    html: () => `
      <div class="hero">
        <div class="converge">
          <div class="glow"></div>
          <div class="paper p1" style="--fx:-330px;--fy:-70px;--fr:-14deg;--d:250ms">${ic("child")}아이의 상상</div>
          <div class="paper p2" style="--fx:0px;--fy:-150px;--fr:4deg;--d:420ms">${ic("worker")}직장인의 일상</div>
          <div class="paper p3" style="--fx:330px;--fy:-70px;--fr:14deg;--d:590ms">${ic("senior")}어르신의 기억</div>
          <div class="book">${ic("book")}</div>
        </div>
        <div class="hero-kicker rv" ${d(900)}>${DECK_META.subtitle} · 공공도서관 도입 제안</div>
        <h1 class="hero-title rv" ${d(1050)}>전 세대를 잇는<br>공공도서관</h1>
        <p class="hero-gov rv" ${d(1250)}>아이의 상상, 직장인의 일상, 어르신의 기억이 한 권의 책이 됩니다.<br>AI를 시민의 창작 경험으로 바꾸고, 그 경험을 다시 독서와 도서관 이용으로 연결합니다.</p>
        <div class="hero-keys rv" ${d(2200)}>
          <span class="k">${ic("child")}아이의 상상</span><span class="ln"></span>
          <span class="k">${ic("worker")}직장인의 일상</span><span class="ln"></span>
          <span class="k">${ic("senior")}어르신의 기억</span>
        </div>
        <div class="hero-concl rv" ${d(2700)}>${ic("book")}모든 시민의 이야기가 책이 되는 도서관</div>
      </div>`
  },

  /* ---------- 02 도서관 역할의 확장 ---------- */
  2: {
    bg: { tone: "warm", seed: 5 },
    html: () => `
      <div class="s02">
        <div class="s02-grid">
          <div class="card col now rv-left" ${d(200)}>
            <span class="kicker">지금의 도서관</span>
            <div class="verbs3">
              <span class="chip lg rv" ${d(400)}>${ic("book")}읽기</span>
              <span class="chip lg rv" ${d(520)}>${ic("edu")}배우기</span>
              <span class="chip lg rv" ${d(640)}>${ic("users")}만나기</span>
            </div>
            <div class="assets"><span>장서</span><span>사서</span><span>공간</span></div>
          </div>
          <div class="plusai rv-scale" ${d(1200)}>
            <span class="plus">+</span>
            <span class="blk">${ic("spark")}AI 창작 도구</span>
            ${ic("arrow", "go")}
          </div>
          <div class="card col next accent-ai rv-right" ${d(1500)}>
            <span class="kicker">확장된 도서관</span>
            <ul class="expand">
              <li class="rv" ${d(1900)}><span class="icw">${ic("pencil")}</span>이야기 만들기</li>
              <li class="rv" ${d(2050)}><span class="icw warm">${ic("image")}</span>그림으로 표현하기</li>
              <li class="rv" ${d(2200)}><span class="icw green">${ic("book")}</span>내 책 완성하기</li>
              <li class="rv" ${d(2350)}><span class="icw ink">${ic("read")}</span>다시 읽기</li>
            </ul>
          </div>
        </div>
        <div class="eq-row rv" ${d(2900)}>
          <span class="grp"><span class="chip">장서</span><span>+</span><span class="chip">사서</span><span>+</span><span class="chip">공간</span><span>+</span><span class="chip ai">AI</span></span>
          <span>=</span>
          <span class="res">시민 <b>창작 경험</b></span>
        </div>
      </div>`
  },

  /* ---------- 03 문학빵 ---------- */
  3: {
    bg: { tone: "warm", seed: 8 },
    html: () => {
      const colors = ["#5C6CFF", "#3F9B74", "#E7A74E", "#E5645E", "#15202B", "#8A96FF", "#C4841F"];
      const rots = [-42, -28, -14, 0, 14, 28, 42];
      const fan = rots.map((r, i) => `<div class="bm" style="--r:${r}deg;--d:${300 + i * 90}ms;background:linear-gradient(160deg,${colors[i]},${colors[i]}CC)"><i></i><i></i></div>`).join("");
      return `
      <div class="s03">
        <div class="fan-wrap">
          <div class="fan-cap rv" ${d(200)}><span class="tag">사례 · 민음사 × GS25 문학빵</span><span class="note-line tight">빵 봉지 안에 문학 작품 표지를 활용한 책갈피가 20종 가운데 하나씩 무작위로 들어 있음</span><span class="note-line tight">빵 표지에 문학 작품 이미지와 책갈피를 넣었더니 대박</span><span class="note-line">봉지를 열어 어떤 책갈피가 나왔는지 확인하고, 마음에 드는 표지를 모으고, 사진으로 나누는 경험이 문학의 관심과 그 책을 다시 읽어보는 사례로 이야기 되고 있습니다.</span></div>
          <div class="fan">${fan}</div>
          <div class="pack rv-scale" ${d(200)}>${ic("bread")}<span>편의점 빵</span></div>
        </div>
        <div class="s03-right">
          <div class="s03-metrics">
            <div class="metric rv" ${d(500)}><div class="num"><span class="count" data-to="${METRICS.bookmarkKinds}" data-dur="900">0</span><small>종</small></div><div class="lbl">무작위 책갈피</div></div>
            <div class="metric rv" ${d(700)}><div class="num"><span class="count" data-to="${METRICS.saleDays}" data-dur="900">0</span><small>일</small></div><div class="lbl">출시 후 · 판매 보도 시점</div></div>
            <div class="metric ai rv" ${d(900)}><div class="num"><span class="pre">최대</span><span class="count" data-to="${METRICS.saleMaxMan}" data-dur="1200">0</span><small>만 개</small></div><div class="lbl">판매 보도</div></div>
          </div>
          <div>
            <div class="tag ai rv" ${d(1500)} style="margin-bottom:12px">만들어진 경험</div>
            <div class="flow s03-flow">
              <span class="chip rv" ${d(1600)}>고른다</span>${arr()}<span class="chip rv" ${d(1720)}>확인한다</span>${arr()}<span class="chip rv" ${d(1840)}>모은다</span>${arr()}<span class="chip rv" ${d(1960)}>나눈다</span>${arr()}<span class="chip ai rv" ${d(2100)}>관심이 생긴다</span>
            </div>
          </div>
          <div class="statement rv" ${d(2500)}>“책을 먼저 읽게 하는 것”만이 <span class="hl">독서의 시작</span>은 아닙니다.</div>
          <div class="s03-bridge rv" ${d(3000)}>
            <span class="chip">상품</span>${arr()}<span class="chip">수집 경험</span>${arr()}<span class="chip warm">문학 관심</span>${arr()}<span class="lib">${ic("library")}도서관 프로그램</span>
          </div>
        </div>
        <img class="s03-photo" src="media/s03_munhakppang_minumsa.png" width="1034" height="512" alt="민음사 × GS25 문학빵 책갈피 사진">
      </div>`;
    },
    /* 문학빵 사진: 장표 정중앙에 원본 크기로 겹쳐 두고, 화면을 클릭하면 사진만 사라진다 */
    enter(el, ctx) {
      const photo = el.querySelector(".s03-photo");
      if (!photo) return;
      if (photo.parentElement !== el) el.appendChild(photo);   // .slide 직계로 올려 화면(1920×1080) 정중앙 기준
      photo.classList.remove("is-out");
      // 이 장표로 넘어오게 한 클릭이 그대로 사진을 숨기지 않도록 다음 틱에 연결
      ctx.timer(() => ctx.on(document, "click", () => photo.classList.add("is-out")), 0);
    },
    leave(el) { el.querySelector(".s03-photo")?.classList.remove("is-out"); }
  },

  /* ---------- 04 AI 3대 강국 · 12대 전략분야 ---------- */
  4: {
    bg: { tone: "cool", seed: 11 }, tone: "cool",
    html: () => {
      const hi = { 5: "AI 기본사회", 9: "AI 기반 문화강국" };
      let nodes = "";
      for (let i = 1; i <= METRICS.aiStrategyAreas; i++) {
        const h = hi[i];
        nodes += `<div class="nd ${h ? "hi" : ""} rv-scale" style="--d:${250 + i * 60}ms"><span class="n">${String(i).padStart(2, "0")}</span>${h ? `<span class="t">${h}</span>` : ""}</div>`;
      }
      return `
      <div class="s04n">
        <div class="left">
          <div class="tag ai rv" ${d(150)}>대한민국 인공지능 행동계획 2026~2028 · <b>${METRICS.aiStrategyAreas}대 전략분야</b></div>
          <div class="nodes12">${nodes}</div>
          <div class="legend rv" ${d(1500)}>온 국민이 AI를 누리고, AI로 콘텐츠를 창작하는 지원체계를 만들겠다는 것</div>
        </div>
        <div class="right">
          <div class="chain">
            <div class="ch rv" ${d(1700)}><span class="icw ink">${ic("globe")}</span><div><b>국가 AI 전략</b><span>AI 기본사회 · AI 기반 문화강국</span></div></div>
            <i class="ln rv" ${d(2000)}></i>
            <div class="ch rv" ${d(2100)}><span class="icw">${ic("tool")}</span><div><b>시민이 실제로 쓰는 프로그램</b><span>범용 AI 보급만으로는 활용이 늘지 않음</span></div></div>
            <i class="ln rv" ${d(2400)}></i>
            <div class="ch rv" ${d(2500)}><span class="icw warm">${ic("library")}</span><div><b>공공도서관</b><span>목적이 분명한 프로그램을 운영하는 공공기관</span></div></div>
            <i class="ln rv" ${d(2800)}></i>
            <div class="ch hi rv" ${d(2900)}><span class="icw green">${ic("book")}</span><div><b>AI 동화 창작</b><span>온 국민이 AI로 콘텐츠를 창작하는 경험</span></div></div>
          </div>
        </div>
      </div>`;
    }
  },

  /* ---------- 05 독서·도서관 정책 수렴 (Venn) ---------- */
  5: {
    bg: { tone: "green", seed: 14 },
    html: () => `
      <div class="venn">
        <div class="circ c1 rv-scale" ${d(300)}><b>모두의 도서관</b><span>제4차 도서관발전종합계획</span><small>‘모두의 도서관’과 ‘도서관 혁신’을 목표로 디지털 문해력 교육과 신기술 서비스 확대 추진</small></div>
        <div class="circ c2 rv-scale" ${d(600)}><b>비독자의 독자 전환</b><span>제4차 독서문화진흥 기본계획</span><small>${METRICS.goalYear} 성인 독서율 목표</small><div class="badge"><span class="count" data-to="${METRICS.adultReadingGoal}" data-dur="1000">0</span>%</div></div>
        <div class="circ c3 rv-scale" ${d(900)}><b>2026 책 읽는 대한민국</b><span>문화체육관광부 캠페인</span><small>AI 시대에 사유의 힘을 기른다는 취지로 ‘책 읽는 대한민국’ 캠페인 선포</small></div>
        <div class="center rv-scale" ${d(1900)}>${ic("library")}<b>공공도서관<br>AI 동화 창작</b></div>
      </div>`
  },

  /* ---------- 06 법·제도 5×5 매핑 ---------- */
  6: {
    bg: { tone: "cool", seed: 17 }, tone: "cool",
    html: () => {
      const rows = [
        { p: "비독자 전환", f: "짧고 성취감 있는 창작 경험", ic: "book" },
        { p: "생애주기별 독서", f: "세대별 프로그램", ic: "users" },
        { p: "디지털 문해력", f: "AI를 쓰고 · 검토하고 · 고치는 경험", ic: "spark" },
        { p: "디지털 포용", f: "도서관을 통한 접근 보장", ic: "access" },
        { p: "신뢰 기반 AI", f: "AI 표시 · 사람의 검토 · 권리 보호", ic: "shield" }
      ];
      const ys = [50, 150, 250, 350, 450];
      let lines = "", left = "", right = "";
      rows.forEach((r, i) => {
        lines += `<path class="draw" pathLength="1" d="M0 ${ys[i]} C 90 ${ys[i]}, 90 ${ys[i]}, 180 ${ys[i]}" stroke="var(--ai)" stroke-width="4" fill="none" style="--d:${900 + i * 260}ms"/><circle class="pop" cx="180" cy="${ys[i]}" r="8" fill="var(--ai)" style="--d:${1100 + i * 260}ms"/>`;
        left += `<div class="pc rv" ${d(300 + i * 120)}><span class="n">${i + 1}</span>${r.p}</div>`;
        right += `<div class="fc rv" ${d(1000 + i * 260)}><span class="icw">${ic(r.ic)}</span><b>${r.f}</b></div>`;
      });
      return `
      <div class="map55">
        <div class="heads">
          <div class="tag red rv" ${d(150)}>정책 요구 · 디지털포용법 · AI 기본법 · 독서문화진흥 기본계획</div>
          <div></div>
          <div class="tag ai rv" ${d(800)}>서비스 기능</div>
        </div>
        <div class="body">
          <div class="pcs">${left}</div>
          <div class="mid"><svg viewBox="0 0 180 500" preserveAspectRatio="none">${lines}</svg></div>
          <div class="fcs">${right}</div>
        </div>
        <div class="map-foot rv" ${d(2600)}>“정책 언어를 <b>시민의 행동</b>으로 바꾸는 연결 장치”</div>
      </div>`;
    }
  },

  /* ---------- 07 성인 독서율 38.5% · 격차 ---------- */
  7: {
    bg: { tone: "cool", seed: 21 }, tone: "cool",
    html: () => `
      <div class="s07n">
        <div class="left">
          <div class="metric gap hero-metric rv" ${d(200)}>
            <div class="num"><span class="count" data-to="${METRICS.adultReadingRate}" data-dec="1" data-dur="1400">0.0</span><small>%</small></div>
            <div class="lbl">2025 성인 독서율 · <b>${METRICS.lowestSince}년 조사 이래 최저</b></div>
          </div>
          <div class="gapviz">
            <div class="gcol now rv" ${d(900)}><i style="--h:${METRICS.adultReadingRate / METRICS.adultReadingGoal * 100}%"></i><b>${METRICS.adultReadingRate}%</b><span>2025 현재</span></div>
            <div class="bracket rv" ${d(2000)}><b>${METRICS.gapNow}%p</b><span>현재 격차</span></div>
            <div class="gcol goal rv" ${d(1400)}><i style="--h:100%"></i><b>${METRICS.adultReadingGoal}%</b><span>${METRICS.goalYear} 목표</span></div>
          </div>
          <div class="gap-note rv" ${d(2400)}>2년 만에 격차 <b>${METRICS.gapBefore}%p → ${METRICS.gapNow}%p</b></div>
        </div>
        <div class="right">
          <div class="cmp rv" ${d(1200)}>
            <div class="cmp-h"><span class="tag">세대별 독서율</span><span class="derived">약 <b>${METRICS.ratioAge}배</b> 차이 <small>제시 수치 단순계산</small></span></div>
            ${hbar("20대", METRICS.rate20s, 100, "var(--ai)", 1400)}
            ${hbar("60세 이상", METRICS.rate60plus, 100, "var(--gap)", 1600)}
          </div>
          <div class="cmp rv" ${d(2000)}>
            <div class="cmp-h"><span class="tag">도서관 이용 경험</span><span class="derived"><b>${METRICS.diffLib}%p</b> 차이 <small>제시 수치 단순계산</small></span></div>
            ${hbar("학생", METRICS.libStudent, 100, "var(--community)", 2200)}
            ${hbar("성인", METRICS.libAdult, 100, "var(--gap)", 2400)}
          </div>
        </div>
      </div>`
  },

  /* ---------- 08 정책 공백 4개 · Missing Link ---------- */
  8: {
    bg: { tone: "warm", seed: 23 },
    html: () => `
      <div class="gaps">
        <div class="gside l">
          <div class="gcard rv-left" ${d(400)}><span class="k">1 · 프로그램 이후</span><b>다음 행동으로 이어지지 않음</b></div>
          <div class="gcard rv-left" ${d(700)}><span class="k">2 · 창작 장벽</span><b>글쓰기·그림 기술이 참여층을 제한</b></div>
        </div>
        <div class="gmid">
          <div class="end a rv" ${d(200)}><span class="icw lg warm">${ic("library")}</span><b>도서관의 강점</b><span>장서 · 사서 · 공간</span></div>
          <div class="linkviz">
            <svg viewBox="0 0 120 420" preserveAspectRatio="none">
              <path class="broken" d="M60 0 V150" stroke="rgba(21,32,43,.25)" stroke-width="6" stroke-dasharray="14 12" fill="none"/>
              <path class="broken" d="M60 270 V420" stroke="rgba(21,32,43,.25)" stroke-width="6" stroke-dasharray="14 12" fill="none"/>
              <path class="draw fix" pathLength="1" d="M60 0 V420" stroke="var(--ai)" stroke-width="8" fill="none" stroke-linecap="round" style="--d:2600ms"/>
            </svg>
            <div class="missing"><span>MISSING LINK</span>연결 장치 부재</div>
            <div class="plat rv-scale" ${d(3000)}>${ic("spark")}AI 시민 동화책 플랫폼</div>
          </div>
          <div class="end b rv" ${d(200)}><span class="icw lg green">${ic("pencil")}</span><b>시민 창작자</b><span>수동적 수혜자 → 능동적 창작자</span></div>
        </div>
        <div class="gside r">
          <div class="gcard rv-right" ${d(1000)}><span class="k">3 · 민간 AI 격차</span><b>비용·기기·안전·역량을 개인에게 전가</b></div>
          <div class="gcard rv-right" ${d(1300)}><span class="k">4 · 운영 도구 부재</span><b>사서가 활용할 표준 관리도구 부족</b></div>
        </div>
        <div class="gaps-foot rv" ${d(3300)}><b>AI 시민 동화책 플랫폼</b> = 네 가지 공백을 잇는 운영형 서비스</div>
      </div>`
  },

  /* ---------- 09 서비스 5단계 ---------- */
  9: {
    bg: { tone: "warm", seed: 27 },
    html: () => {
      const steps = [
        { ic: "chat", t: "기획", p: "키워드 · 줄거리 메모", ex: "AI가 질문을 던지며 시작" },
        { ic: "pencil", t: "글 다듬기", p: "AI 질문 → 시작 · 사건 · 결말", ex: "읽고 고르고 고친다" },
        { ic: "image", t: "그림 그리기", p: "수채화 · 클레이 · 동양화", ex: "장면마다 그림 생성 · 선택" },
        { ic: "mic", t: "오디오북", p: "내 목소리로 낭독", ex: "낭독본 녹음" },
        { ic: "print", t: "실물 출판", p: "인쇄 · 제본 연계", ex: "실물 책으로 받아본다" }
      ];
      return `
      <div class="s08 s09n">
        <div class="rail-badge rv" ${d(200)}><div class="metric ai"><div class="num">${METRICS.minutesMin}~${METRICS.minutesMax}<small>분</small></div><div class="lbl">한 권 제작 과정</div></div></div>
        <div class="rail">
          <div class="track"><i id="railFill"></i></div>
          ${steps.map((s, i) => `
          <div class="step" data-i="${i}">
            <div class="num">${ic(s.ic)}</div>
            <h4>${i + 1}. ${s.t}</h4>
            <p>${s.p}</p>
            <div class="ex">${s.ex}</div>
            <div class="pick">${ic("check")}시민의 선택</div>
          </div>`).join("")}
        </div>
        <div class="s08-foot">
          <div class="keyflow rv" ${d(3600)}><span class="chip ai-soft">${ic("spark")}AI 생성</span>${arr()}<span class="chip warm">사람의 선택</span>${arr()}<span class="chip">수정</span>${arr()}<span class="chip ink">완성</span><span class="keytxt">클릭 한 번이 아니라, 시민이 매 단계에서 <b>읽고 · 고르고 · 고쳐서</b> 완성</span></div>
        </div>
      </div>`;
    },
    enter(el, ctx) {
      const steps = [...el.querySelectorAll(".step")];
      const fill = el.querySelector("#railFill");
      const rm = document.documentElement.classList.contains("rm");
      if (rm) { steps.forEach(s => s.classList.add("on")); steps[4].classList.add("focus"); fill.style.width = "100%"; return; }
      steps.forEach((s, i) => ctx.timer(() => {
        steps.forEach(x => x.classList.remove("focus"));
        s.classList.add("on", "focus");
        fill.style.width = (i / 4 * 100) + "%";
      }, 500 + i * 620));
    },
    leave(el) {
      el.querySelectorAll(".step").forEach(s => s.classList.remove("on", "focus"));
      const f = el.querySelector("#railFill"); if (f) f.style.width = "0%";
    }
  },

  /* ---------- 10 공공도서관 전용 설계 ---------- */
  10: {
    bg: { tone: "cool", seed: 31 }, tone: "cool",
    html: () => `
      <div class="s10n">
        <div class="badge-row rv" ${d(200)}>
          <span class="chip ghost lg"><span class="t">국내외 AI 동화 서비스 <b>${METRICS.surveyedServices} 종</b> 조사 · 대부분 개인 구독형</span></span>${arr()}
          <span class="chip ink lg">${ic("library")}공공도서관 운영 기준으로 설계</span>
        </div>
        <div class="s10n-body">
          <div class="mods">
            <div class="card role3 cit rv" ${d(600)}>
              <div class="head"><span class="icw lg">${ic("shield")}</span><div><b>안전한 생성</b><small>시민 보호</small></div></div>
              <ul class="list"><li>${ic("check")}<span>입력 · 생성 <b>2단계 유해성 필터</b></span></li><li>${ic("check")}<span><b>AI 생성물</b> 표시</span></li></ul>
            </div>
            <div class="card role3 lib rv" ${d(850)}>
              <div class="head"><span class="icw lg warm">${ic("print")}</span><div><b>결과물의 실체화</b><small>실물 결과물</small></div></div>
              <ul class="list"><li>${ic("check")}<span>다양한 형태의 <b>실물책 제작 연계</b></span></li><li>${ic("check")}<span>화면에서 읽고 실물로 받아본다</span></li></ul>
            </div>
            <div class="card role3 svc rv" ${d(1100)}>
              <div class="head"><span class="icw lg green">${ic("librarian")}</span><div><b>사서 운영도구</b><small>관리자 화면 하나로</small></div></div>
              <ul class="list"><li>${ic("check")}<span><b>AI 토큰</b> 관리</span></li><li>${ic("check")}<span><b>결과물</b> 관리</span></li><li>${ic("check")}<span><b>이용 통계</b></span></li></ul>
            </div>
          </div>
          <div class="dash rv-right" ${d(1500)}>
            <div class="dash-bar"><i></i><i></i><i></i><span>사서 관리자 화면 · 예시</span><span class="r">LIBRARY MODE</span></div>
            <div class="dash-body">
              <div class="tile rv" ${d(1900)}><span class="tl">AI 토큰</span><div class="ring"><i></i></div><span class="ts">사용량 · 잔여량</span></div>
              <div class="tile rv" ${d(2050)}><span class="tl">결과물 관리</span><div class="rows"><i style="--w:70%"></i><i style="--w:45%"></i><i style="--w:88%"></i></div><span class="ts">검토 · 공개 · 인쇄 요청</span></div>
              <div class="tile rv" ${d(2200)}><span class="tl">이용 통계</span><div class="bars"><i style="--h:40%"></i><i style="--h:65%"></i><i style="--h:50%"></i><i style="--h:80%"></i><i style="--h:70%"></i><i style="--h:95%"></i></div><span class="ts">프로그램 · 세대별 참여</span></div>
            </div>
            <div class="dash-note">화면 구성 예시 · 수치는 표시하지 않음</div>
          </div>
        </div>
      </div>`
  },

  /* ---------- 11 어린이·청소년 · 3컷 ---------- */
  11: {
    bg: { tone: "green", seed: 37 },
    html: () => `
      <div class="comic3">
        <div class="callout rv" ${d(200)}>${ic("chat")}<span class="t">“오늘 네가 겪은 하루를, <b>네가 주인공</b>이 되어 책으로 만들어 볼까?”</span></div>
        <div class="cuts">
          <div class="cut sketch rv-scale" ${d(600)}><span class="cap">① 아이의 낙서와 아이디어</span><div class="art">${dinoSVG()}</div><span class="sub">내 이야기 만들기</span></div>
          ${arr()}
          <div class="cut book rv-scale" ${d(1300)}><span class="cap">② AI 동화책으로 완성</span><div class="art"><div class="mini-book xl">${ic("book")}<em>오늘의 주인공</em></div></div><span class="sub">활자와 삽화 · <b>창작 효능감</b></span></div>
          ${arr()}
          <div class="cut shelf3 rv-scale" ${d(2000)}><span class="cap">③ 서가에서 관련 책을 고른다</span><div class="art"><span class="spine" style="background:#3F9B74">공룡 그림책</span><span class="spine" style="background:#5C6CFF">동물 이야기</span><span class="spine" style="background:#E7A74E">우정 이야기</span><span class="spine" style="background:#2B3846">모험 동화</span></div><span class="sub">“다른 작가는 어떻게 썼을까?” → <b>관련 도서 대출</b></span></div>
        </div>
        <div class="flow comic-flow rv" ${d(2800)}><span class="chip">내 이야기 만들기</span>${arr()}<span class="chip warm">완성의 성취감</span>${arr()}<span class="chip">“다른 작가는 어떻게 썼을까?”</span>${arr()}<span class="chip green">관련 도서 대출</span></div>
      </div>`
  },

  /* ---------- 12 청년·직장인 · 낮→저녁 ---------- */
  12: {
    bg: { tone: "warm", seed: 41 },
    html: () => {
      let stars = "";
      for (let i = 0; i < 40; i++) { const x = (i * 97) % 820, y = (i * 53) % 260 + 10, r = 1 + (i % 3) * 0.6; stars += `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity="${0.4 + (i % 5) * 0.12}"/>`; }
      return `
      <div class="s11">
        <div class="scene" id="scene12">
          <div class="sky"></div><div class="sky night"></div>
          <svg class="stars" viewBox="0 0 820 300" preserveAspectRatio="none" style="position:absolute;left:0;top:0;width:100%;height:300px">${stars}</svg>
          <div class="sun"></div><div class="moon"></div>
          <div class="lamp"></div>
          <svg class="room" viewBox="0 0 820 300" preserveAspectRatio="none">
            <rect x="0" y="120" width="820" height="180" fill="rgba(21,32,43,.55)"/>
            <g fill="rgba(21,32,43,.75)">
              <rect x="40" y="40" width="120" height="120" rx="4"/><rect x="180" y="20" width="140" height="140" rx="4"/><rect x="660" y="30" width="130" height="130" rx="4"/>
            </g>
            <g fill="rgba(255,255,255,.12)"><rect x="52" y="52" width="96" height="10"/><rect x="52" y="76" width="96" height="10"/><rect x="52" y="100" width="96" height="10"/><rect x="192" y="34" width="116" height="10"/><rect x="192" y="58" width="116" height="10"/><rect x="192" y="82" width="116" height="10"/><rect x="672" y="42" width="106" height="10"/><rect x="672" y="66" width="106" height="10"/></g>
            <rect x="330" y="150" width="300" height="14" rx="4" fill="rgba(21,32,43,.9)"/>
            <rect x="350" y="164" width="14" height="70" fill="rgba(21,32,43,.9)"/><rect x="596" y="164" width="14" height="70" fill="rgba(21,32,43,.9)"/>
            <rect x="470" y="60" width="8" height="90" fill="rgba(21,32,43,.9)"/><path d="M440 60h68l-10-28h-48z" fill="#FFD27A"/>
            <rect x="400" y="130" width="60" height="20" rx="3" fill="#8A96FF"/><rect x="540" y="128" width="40" height="22" rx="3" fill="#E7A74E"/>
          </svg>
          <div class="over">
            <span class="chip ink rv" ${d(300)}>${ic("moon")}퇴근 후 도서관 · 야간 문화강좌 연계</span>
            <h3 class="rv" ${d(450)}>나만의 힐링 동화<br>만들기</h3>
            <p class="rv" ${d(600)}>일상 → 은유 → 이야기 → 한 권의 책</p>
          </div>
          <div class="timeline">${ic("sun")}낮 · 공부하는 곳 ${ic("arrow")} ${ic("moon")}저녁 · 내 이야기를 만드는 곳</div>
        </div>
        <div class="s11-right">
          <div class="tag rv" ${d(700)}>참여 소재</div>
          <div class="heroes">
            <span class="chip rv" ${d(800)}>${ic("dog")}반려견</span>
            <span class="chip rv" ${d(920)}>${ic("spark")}소소한 꿈</span>
            <span class="chip rv" ${d(1040)}>${ic("chat")}오늘의 고민</span>
          </div>
          <div class="example rv" ${d(1400)}>
            <div class="kicker">프로그램 장면</div>
            <p>일상에 지친 직장인들이 도서관에 모여 반려견·꿈·고민을 <b>동화의 은유</b>로 풀어내며 마음을 정리하는 시간</p>
          </div>
          <div class="shift rv" ${d(2200)}><span class="chip ghost lg">공부방</span>${arr()}<span class="chip ai lg">감성 커뮤니티 거점</span></div>
          <div class="note-line rv" ${d(2600)}>성인 이용자가 도서관으로 다시 들어오는 새로운 이유</div>
        </div>
      </div>`;
    },
    enter(el, ctx) {
      const sc = el.querySelector("#scene12");
      const rm = document.documentElement.classList.contains("rm");
      ctx.timer(() => sc.classList.add("evening"), rm ? 0 : 900);
    },
    leave(el) { el.querySelector("#scene12")?.classList.remove("evening"); }
  },

  /* ---------- 13 부모·양육자 · Before/After ---------- */
  13: {
    bg: { tone: "warm", seed: 43 },
    html: () => `
      <div class="s12">
        <div class="ba auto" id="ba13" tabindex="0" role="slider" aria-label="아이의 낙서와 완성된 가족 그림책 장면 비교" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
          <div class="layer before">
            <span class="lbl">Before · 아이의 낙서와 한마디</span>
            <div class="art">${umbrellaSVG("crayon")}</div>
            <div class="txt">“비 오는 날 우산도<br>친구가 있으면 좋겠어”</div>
          </div>
          <div class="layer after">
            <span class="lbl">After · 가족 그림책 펼침면</span>
            <div class="art">${umbrellaSVG("clean", { face: "smile", friend: "raindrop" })}</div>
            <div class="txt">우산은 어떤 친구를<br>만나고 싶을까?<small>부모의 질문이 다음 장면이 됩니다</small></div>
          </div>
          <div class="handle"><i>⇔</i></div>
        </div>
        <div class="s12-right">
          <div class="card fam-eq rv" ${d(300)}>
            <span class="kicker">가족 그림책의 재료</span>
            <div class="eqs"><span class="chip warm">아이의 말</span>+<span class="chip warm">낙서</span>+<span class="chip">부모의 선택</span>+<span class="chip ai-soft">${ic("spark")}AI 보조</span></div>
            <div class="res">= <b>세상에 하나뿐인 가족 그림책</b></div>
          </div>
          <div class="scene-line rv" ${d(1300)}>${ic("sun")}<span class="t">주말 오전, 부모와 아이가 <b>나란히</b> 한 권을 완성</span></div>
          <div class="effects">
            <div class="card rv" ${d(1900)}><span class="icw round warm">${ic("heart")}</span><div><b>함께 만든 가족 기록</b><small>유대감을 키우는 기록물</small></div></div>
            <div class="card rv" ${d(2050)}><span class="icw round">${ic("library")}</span><div><b>부모의 도서관 재방문</b><small>성인 이용자가 들어오는 새 입구</small></div></div>
            <div class="card rv" ${d(2200)}><span class="icw round green">${ic("child")}</span><div><b>아이에게는 창작 경험</b><small>내 말과 그림이 책이 된다</small></div></div>
          </div>
        </div>
      </div>`,
    enter(el, ctx) {
      const ba = el.querySelector("#ba13");
      const rm = document.documentElement.classList.contains("rm");
      const setX = (v) => { v = Math.max(0, Math.min(100, v)); ba.style.setProperty("--x", v + "%"); ba.setAttribute("aria-valuenow", Math.round(v)); return v; };
      let cur = setX(0);
      if (rm) { cur = setX(50); }
      else {
        /* 2.5초 자동 이동: 0 → 100 → 50 에서 정지 */
        const t0 = performance.now() + 500;
        const ease = (t) => 1 - Math.pow(1 - t, 3);
        const run = (now) => {
          if (ctx.dead) return;
          const t = now - t0;
          if (t < 0) { requestAnimationFrame(run); return; }
          if (t <= 1700) cur = setX(ease(t / 1700) * 100);
          else if (t <= 2500) cur = setX(100 - ease((t - 1700) / 800) * 50);
          else { cur = setX(50); return; }
          requestAnimationFrame(run);
        };
        requestAnimationFrame(run);
      }
      let dragging = false;
      const px = (e) => { const r = ba.getBoundingClientRect(); return ((e.clientX - r.left) / r.width) * 100; };
      ctx.on(ba, "pointerdown", (e) => { dragging = true; ba.setPointerCapture(e.pointerId); cur = setX(px(e)); });
      ctx.on(ba, "pointermove", (e) => { if (dragging) cur = setX(px(e)); });
      ctx.on(ba, "pointerup", () => { dragging = false; ba.blur(); });
      ctx.on(ba, "pointercancel", () => { dragging = false; ba.blur(); });
      ctx.on(ba, "keydown", (e) => {
        if (!e.shiftKey) return;
        if (e.key === "ArrowLeft") { cur = setX(cur - 4); e.stopPropagation(); e.preventDefault(); }
        if (e.key === "ArrowRight") { cur = setX(cur + 4); e.stopPropagation(); e.preventDefault(); }
      });
    },
    leave(el) { const ba = el.querySelector("#ba13"); if (ba) ba.style.setProperty("--x", "0%"); }
  },

  /* ---------- 14 노년층 · 목소리 → 책 ---------- */
  14: {
    bg: { tone: "warm", seed: 47 },
    html: () => `
      <div class="s13">
        <div class="card voice accent-warm rv" ${d(200)}>
          <span class="kicker">어르신의 구술 · 자판이 아니라 목소리로</span>
          <div class="wave">${waveBars(34)}</div>
          <div class="quote">내가 살아온 이야기를 책으로 쓰면 수십 권이지.</div>
          <div class="ask"><span class="chip sm warm">${ic("mic")}목소리로 시작</span><span class="chip sm warm">${ic("senior")}기기 사용 부담 없음</span></div>
        </div>
        <div class="stages">
          <div class="stage-row rv" ${d(900)}><span class="icw warm">${ic("mic")}</span><div><b>말한다</b><span>살아온 이야기를 목소리로 들려준다</span></div></div>
          <div class="stage-row rv" ${d(1300)}><span class="icw">${ic("spark")}</span><div><b>AI가 정리한다</b><span>구술을 따뜻한 문장으로 정리 · 어르신이 확인</span></div></div>
          <div class="stage-row rv" ${d(1700)}><span class="icw green">${ic("image")}</span><div><b>그림동화로 만든다</b><span>기억의 장면이 그림동화 페이지가 된다</span></div></div>
          <div class="stage-row rv" ${d(2100)}><span class="icw ink">${ic("gift")}</span><div><b>손주에게 전한다</b><span>완성된 책이 세대 간 소통의 매개체가 된다</span></div></div>
        </div>
        <div class="outcome">
          <div class="card rv" ${d(2600)}><span class="icw round">${ic("access")}</span><h3>디지털 접근</h3><p>디지털 격차 해소의 첫 경험</p></div>
          <div class="card rv" ${d(2800)}><span class="icw round warm">${ic("search")}</span><h3>기억을 되짚는 활동</h3><p>기억을 되살리는 인지 활동의 기회</p></div>
          <div class="card rv" ${d(3000)}><span class="icw round green">${ic("users")}</span><h3>세대 간 소통</h3><p>어르신의 이야기가 손주의 그림책으로</p></div>
        </div>
      </div>`
  },

  /* ---------- 15 왜 정부 · 왜 도서관 · 왜 동화 (Q&A 자동 Reveal) ---------- */
  15: {
    bg: { tone: "cool", seed: 53 }, tone: "cool",
    html: () => `
      <div class="qa3">
        <div class="qcards">
          <div class="qcard rv" ${d(300)}>
            <span class="qn">Q1</span><span class="icw lg ink">${ic("globe")}</span>
            <h3>왜 정부가?</h3>
            <div class="a rv" ${d(700)}>비용·기기·역량·연령 때문에 시장에서 배제되는 시민에게 <b>안전한 기본 접근 보장</b>과 독서 정책과 연결</div>
          </div>
          <div class="qcard rv" ${d(1000)}>
            <span class="qn">Q2</span><span class="icw lg warm">${ic("library")}</span>
            <h3>왜 도서관이?</h3>
            <div class="a rv" ${d(1400)}>아동부터 은퇴자까지 <b>전 생애가 자발적으로</b> 참여하는 공공문화 공간, 모든 세대가 안전하게 AI를 처음 경험할 수 있는 가장 가까운 공공기관</div>
          </div>
          <div class="qcard rv" ${d(1700)}>
            <span class="qn">Q3</span><span class="icw lg green">${ic("book")}</span>
            <h3>왜 동화가?</h3>
            <div class="a rv" ${d(2100)}>짧은 서사 + 그림 + 낭독 = <b>낮은 창작 진입장벽</b></div>
          </div>
        </div>
        <div class="qa-foot rv" ${d(2800)}><span class="chip ink lg">공공성</span><span class="x">×</span><span class="chip warm lg">접근성</span><span class="x">×</span><span class="chip green lg">쉬운 창작 형식</span></div>
      </div>`
  },

  /* ---------- 16 공공적 가치 7가지 (Orbit) ---------- */
  16: {
    bg: { tone: "green", seed: 59 },
    html: () => {
      const vals = [
        { ic: "book", c: "", t: "독서문화 진흥", s: "창작이 독서를 끌고 옴" },
        { ic: "access", c: "green", t: "디지털 포용", s: "도서관에서 누구나 AI 접근" },
        { ic: "spark", c: "", t: "AI 리터러시", s: "쓰고 · 검토하고 · 고치는 경험" },
        { ic: "map", c: "warm", t: "지역문화 기록", s: "마을과 이웃의 이야기를 축적" },
        { ic: "users", c: "green", t: "세대 간 소통", s: "어르신의 이야기가 손주의 책으로" },
        { ic: "globe", c: "warm", t: "문화격차 해소", s: "지역에 관계없이 같은 서비스" },
        { ic: "heart", c: "red", t: "공동체 소속감", s: "내 책이 꽂힌 도서관" }
      ];
      const cx = 840, cy = 300, rx = 600, ry = 236;
      let lines = "", nodes = "";
      vals.forEach((v, i) => {
        const a = -Math.PI / 2 + (i / 7) * Math.PI * 2;
        const x = cx + Math.cos(a) * rx, y = cy + Math.sin(a) * ry;
        lines += `<line class="draw" pathLength="1" x1="${cx}" y1="${cy}" x2="${x.toFixed(0)}" y2="${y.toFixed(0)}" stroke="rgba(21,32,43,.22)" stroke-width="3" stroke-dasharray="1" style="--d:${500 + i * 100}ms"/>`;
        nodes += `<div class="vnode rv-scale" style="left:${x.toFixed(0)}px;top:${y.toFixed(0)}px;--d:${650 + i * 100}ms"><span class="n">${i + 1}</span><span class="icw ${v.c}">${ic(v.ic)}</span><div><b>${v.t}</b><span>${v.s}</span></div></div>`;
      });
      return `
      <div class="orbit">
        <svg viewBox="0 0 1680 600" preserveAspectRatio="none">${lines}</svg>
        ${nodes}
        <div class="core rv-scale" ${d(150)}>${ic("library")}<b>공공도서관</b><span>${METRICS.valueCount}개 가치 모두<br>국가 · 도서관 정책과 겹칩니다</span></div>
      </div>`;
    }
  },

  /* ---------- 17 재방문 · 행사 · 지역 아카이브 ---------- */
  17: {
    bg: { tone: "warm", seed: 61 },
    html: () => {
      const visits = ["창작", "수정", "인쇄 확인"];
      let dots = visits.map((v, i) => `<div class="vd" style="--d:${800 + i * 420}ms"><i>${i + 1}</i><span>${v}</span></div>`).join('<span class="vl"></span>');
      let spines = "";
      const cols = ["#5C6CFF", "#3F9B74", "#E7A74E", "#E5645E", "#2B3846", "#8A96FF", "#C4841F", "#57B08A", "#F0BC6A", "#6D7BFF"];
      for (let i = 0; i < 10; i++) spines += `<i class="sp" style="--d:${2000 + i * 110}ms;background:${cols[i]};height:${70 + ((i * 37) % 30)}%"></i>`;
      return `
      <div class="s17n">
        <div class="card axis revisit rv" ${d(200)}>
          <span class="kicker">① 재방문</span>
          <div class="metric warm"><div class="num">${METRICS.revisitMin}~${METRICS.revisitMax}<small>회</small></div><div class="lbl">창작 → 수정 → 인쇄 확인을 위한 재방문</div></div>
          <div class="visits">${dots}</div>
        </div>
        <div class="card axis events rv" ${d(700)}>
          <span class="kicker">② 행사</span>
          <div class="ev rv" ${d(1300)}><span class="icw warm">${ic("frame")}</span><div><b>우리 동네 시민 작가 전시회</b><span>완성된 책을 매개로</span></div></div>
          <div class="ev rv" ${d(1550)}><span class="icw">${ic("gift")}</span><div><b>전국 도서관 AI 그림책 공모전</b><span>도서관 간 연계 행사</span></div></div>
          <div class="ev-note">시민 = 책을 읽는 수혜자 → <b>지역의 이야기를 기록하는 시민 작가</b></div>
        </div>
        <div class="card axis archive rv" ${d(1200)}>
          <span class="kicker">③ 시민 작가 · 지역 아카이브</span>
          <div class="shelfviz"><div class="books">${spines}</div><div class="plank"></div></div>
          <div class="arch-metric"><b>연간 지역자료 ${fmtArchive()}</b><small>지역 자료로 축적</small></div>
        </div>
        <div class="s17-foot rv" ${d(3400)}><span class="chip">장서</span>+<span class="chip">사서</span>+<span class="chip">공간</span>+<span class="chip">지역 네트워크</span>${arr()}<b>AI 경험의 공공재화</b></div>
      </div>`;
    }
  },

  /* ---------- 18 마무리 → 시연 ---------- */
  18: {
    hero: true,
    bg: { tone: "warm", seed: 67, extra: `<div class="light-on"></div>`, tint: "linear-gradient(180deg,rgba(247,244,236,.6) 0%,rgba(247,244,236,.9) 50%,rgba(247,244,236,.98) 100%)" },
    html: () => `
      <div class="closing">
        <ol class="lines">
          <li class="ln rv" ${d(300)}><span class="n">1</span><span class="t">정책을 <b>시민이 체감하는 서비스</b>로</span></li>
          <li class="ln rv" ${d(900)}><span class="n">2</span><span class="t">AI가 대신 쓰는 것이 아니라, <b>시민이 직접 창작</b>하도록</span></li>
          <li class="ln rv" ${d(1500)}><span class="n">3</span><span class="t">관심의 첫 입구를 <b>‘내 책 한 권’</b>과 다시 독서로 연결</span></li>
        </ol>
        <div class="final rv" ${d(2300)}>과거 도서관이 <em>지식의 보관소</em>였다면,<br>오늘의 도서관은 시민의 상상력이 책이 되는 <em>발원지</em>여야 합니다.</div>
        <div class="cta rv" ${d(3200)}>
          <button class="demo-btn" id="demoBtn">DEMO ${ic("arrow")}<small>Enter</small></button>
        </div>
      </div>`,
    enter(el, ctx) {
      ctx.on(el.querySelector("#demoBtn"), "click", () => ctx.openDemo());
      const rm = document.documentElement.classList.contains("rm");
      ctx.timer(() => el.querySelector(".lines")?.classList.add("dim"), rm ? 0 : 2400);
    },
    leave(el) { el.querySelector(".lines")?.classList.remove("dim"); }
  },

  /* ============================================================
     PART Ⅱ · AI 동화 제작 서비스의 독서 활성화 방안 (19~26장)
     기준 원고: reading-activation-16x9.html
     ============================================================ */

  /* ---------- 19 PART Ⅱ 표지 ---------- */
  19: {
    hero: true,
    bg: { tone: "cool", seed: 71, extra: `<div class="light-on"></div>`, tint: "linear-gradient(180deg,rgba(244,246,248,.55) 0%,rgba(244,246,248,.86) 55%,rgba(244,246,248,.97) 100%)" },
    html: () => `
      <div class="hero r-hero">
        <div class="r-swap">
          <span class="no rv" ${d(300)}>${ic("monitor")}대체<i></i></span>
          <span class="mid rv" ${d(800)}>${ic("arrow")}</span>
          <span class="yes rv-scale" ${d(1000)}>${ic("book")}확장</span>
        </div>
        <div class="hero-kicker rv" ${d(1300)}>PART Ⅱ · 독서 활성화 방안</div>
        <h1 class="hero-title rv" ${d(1450)}>AI 동화 제작 서비스의<br>독서 활성화 방안</h1>
        <p class="hero-gov rv" ${d(1650)}>AI 동화책 서비스는 독서를 대체하는 것이 아니라,<br><b>독서의 진입장벽을 낮추고 독서 행동을 확장하는 도구</b>입니다.</p>
        <div class="hero-keys r-keys rv" ${d(2400)}>
          <span class="k"><i>1</i>시작하게 한다</span><span class="ln"></span>
          <span class="k"><i>2</i>읽기를 만들기로</span><span class="ln"></span>
          <span class="k"><i>3</i>혼자에서 함께로</span><span class="ln"></span>
          <span class="k"><i>4</i>도서관 프로그램으로</span>
        </div>
      </div>`
  },

  /* ---------- 20 핵심 명제 · 대체가 아니라 확장 ---------- */
  20: {
    bg: { tone: "cool", seed: 73 }, tone: "cool",
    html: () => {
      const road = [
        { n: "1", t: "시작하게 한다", s: "관심사 · 수준 · 낭독 · 다국어로 진입장벽을 낮춥니다", ic: "child", c: "" },
        { n: "2", t: "읽기를 만들기로", s: "받아서 읽는 활동을 만들어 읽는 활동으로 바꿉니다", ic: "pencil", c: "warm" },
        { n: "3", t: "혼자에서 함께로", s: "가족 독서와 반복 독서로 넓힙니다", ic: "users", c: "green" },
        { n: "4", t: "도서관 프로그램으로", s: "방문 동기와 프로그램 지속성을 높입니다", ic: "library", c: "ink" }
      ];
      return `
      <div class="r-claim-wrap">
        <div class="r-claim">
          <div class="card not rv-left" ${d(200)}>
            <span class="kicker">대체하지 않습니다</span>
            <ul>
              <li>AI가 만든 이야기가 책을 밀어내지 않습니다.</li>
              <li>화면에서 끝나는 일회성 디지털 체험으로 두지 않습니다.</li>
            </ul>
          </div>
          <div class="and rv-scale" ${d(700)}>그리고</div>
          <div class="card is accent-ai rv-right" ${d(200)}>
            <span class="kicker">확장합니다</span>
            <ul>
              <li>읽기를 시작하는 <b>문턱을 낮춥니다.</b></li>
              <li>만든 책을 읽고 다시 만드는 <b>순환</b>으로 독서 행동 자체를 늘립니다.</li>
            </ul>
          </div>
        </div>
        <div class="tag ai rv" ${d(1200)}>네 개의 흐름</div>
        <div class="r-road">
          ${road.map((r, i) => `<div class="rd rv" ${d(1350 + i * 180)}><span class="icw ${r.c}">${ic(r.ic)}</span><div><b><em>${r.n}</em>${r.t}</b><span>${r.s}</span></div></div>`).join(arr())}
        </div>
      </div>`;
    }
  },

  /* ---------- 21 장 1 · 시작하게 한다 (2×2) ---------- */
  21: {
    bg: { tone: "warm", seed: 79 },
    html: () => rCards([
      { ic: "heart", c: "red", t: "아이의 관심사를 반영한 맞춤형 이야기", s: "책에 대한 첫 흥미를 높입니다.",
        b: ["좋아하는 동물, 장소, 가족, 장래희망 등을 이야기 소재로 활용", "‘나와 관련된 이야기’라는 몰입감으로 자연스럽게 책 읽기를 시작"] },
      { ic: "layers", c: "", t: "연령과 독서 수준에 맞는 콘텐츠", s: "수준 차이 때문에 생기는 진입장벽을 낮춥니다.",
        b: ["연령별 어휘, 문장 길이, 페이지 수, 주제를 조절", "독서에 익숙하지 않은 어린이도 자신의 수준에 맞는 책부터 접근"] },
      { ic: "mic", c: "warm", t: "음성 낭독", s: "글 읽기가 어려운 어린이도 책을 접할 수 있습니다.",
        b: ["AI 음성 낭독과 텍스트를 함께 제공해 듣기와 읽기를 연계", "저연령 아동, 초기 독서 단계 어린이의 독서 접근성을 높임"] },
      { ic: "globe", c: "green", t: "다국어 동화책", s: "다문화가정의 독서 참여를 확대합니다.",
        b: ["한국어와 부모의 모국어를 함께 제공해 부모와 아이가 함께 읽는 환경 조성", "언어 차이로 참여하기 어려웠던 가족의 접근성을 높임"] }
    ], "g2x2")
  },

  /* ---------- 22 장 2 · 읽기를 만들기로 (순환) ---------- */
  22: {
    bg: { tone: "cool", seed: 83 }, tone: "cool",
    html: () => {
      const steps = [
        { ic: "pencil", t: "이야기 생성", s: "아이가 고른 소재로 이야기가 만들어집니다. 내가 넣은 요소가 글이 되는 순간, 결과물을 끝까지 확인하고 싶어집니다." },
        { ic: "image", t: "삽화 생성", s: "글에 그림이 붙으면서 한 권의 형태가 잡힙니다. 장면을 고르는 과정에서 내용을 다시 읽게 됩니다." },
        { ic: "read", t: "완성된 책 읽기", s: "직접 만든 책이라 애착이 높고, 낭독과 인쇄본으로 반복해서 읽습니다." },
        { ic: "spark", t: "다시 만들기", s: "다른 이야기를 만들고 싶어지고, 그 과정이 다시 읽기로 이어집니다." }
      ];
      // 4개 노드: 상 · 우 · 하 · 좌 (원형 궤도)
      const pos = [[300, 60], [540, 300], [300, 540], [60, 300]];
      const nodes = steps.map((st, i) => `<div class="cn rv-scale" data-i="${i}" style="left:${pos[i][0]}px;top:${pos[i][1]}px;--d:${500 + i * 260}ms"><span class="icw">${ic(st.ic)}</span><b>${st.t}</b></div>`).join("");
      const list = steps.map((st, i) => `<li class="cl rv" data-i="${i}" ${d(1700 + i * 160)}><span class="n">${i + 1}</span><div><b>${st.t}</b><span>${st.s}</span></div></li>`).join("");
      return `
      <div class="r-cyc">
        <div class="cyc-box card rv" ${d(200)}>
          <div class="orb">
            <svg viewBox="0 0 600 600" aria-hidden="true">
              <circle cx="300" cy="300" r="240" fill="none" stroke="rgba(21,32,43,.14)" stroke-width="3" stroke-dasharray="6 10"/>
              <path class="draw" pathLength="1" d="M300 60 A240 240 0 0 1 540 300" fill="none" stroke="var(--ai)" stroke-width="5" stroke-linecap="round" style="--d:700ms"/>
              <path class="draw" pathLength="1" d="M540 300 A240 240 0 0 1 300 540" fill="none" stroke="var(--ai)" stroke-width="5" stroke-linecap="round" style="--d:960ms"/>
              <path class="draw" pathLength="1" d="M300 540 A240 240 0 0 1 60 300" fill="none" stroke="var(--ai)" stroke-width="5" stroke-linecap="round" style="--d:1220ms"/>
              <path class="draw" pathLength="1" d="M60 300 A240 240 0 0 1 300 60" fill="none" stroke="var(--warm)" stroke-width="5" stroke-linecap="round" stroke-dasharray="14 12" style="--d:1480ms"/>
              <polygon class="pop" points="288,42 314,60 288,78" fill="var(--warm)" style="--d:1900ms"/>
            </svg>
            ${nodes}
            <div class="core rv-scale" ${d(1900)}>${ic("book")}<b>창작 ↔ 독서</b><span>반복되는 순환</span></div>
          </div>
        </div>
        <div class="r-cyc-right">
          <div class="card r-card sm rv" ${d(300)}>
            <span class="icw warm">${ic("pencil")}</span>
            <div><h3>수동적 ‘읽기’에서 능동적 ‘참여’로</h3><p class="sum">등장인물·배경·결말을 직접 선택하며 이야기 구성에 참여합니다. 책을 제공받는 것이 아니라 직접 만들어 보는 과정에서 독서에 대한 관심이 높아집니다.</p></div>
          </div>
          <ol class="r-cyc-list card">${list}</ol>
        </div>
      </div>`;
    },
    enter(el, ctx) {
      const rm = document.documentElement.classList.contains("rm");
      const nodes = el.querySelectorAll(".cn"), items = el.querySelectorAll(".cl");
      if (rm) { nodes.forEach(n => n.classList.add("on")); items.forEach(n => n.classList.add("on")); return; }
      let i = 0;
      const tick = () => {
        nodes.forEach(n => n.classList.toggle("on", +n.dataset.i === i));
        items.forEach(n => n.classList.toggle("on", +n.dataset.i === i));
        i = (i + 1) % 4;
        ctx.timer(tick, 2200);
      };
      ctx.timer(tick, 2400);
    },
    leave(el) { el.querySelectorAll(".cn.on,.cl.on").forEach(n => n.classList.remove("on")); }
  },

  /* ---------- 23 장 3 · 혼자에서 함께로 (2) ---------- */
  23: {
    bg: { tone: "warm", seed: 89 },
    html: () => rCards([
      { ic: "users", c: "green", t: "가족이 함께 만드는 동화책", s: "가정 내 독서 활동을 촉진합니다.",
        b: ["부모·조부모·형제의 이야기를 동화책으로 제작", "가족이 함께 만들고 읽는 과정을 통해 독서를 개인 활동에서 가족 문화로 확장"] },
      { ic: "bookmark", c: "warm", t: "자신이 만든 책의 소장", s: "반복 독서를 유도합니다.",
        b: ["PDF, 디지털 책, 실물 동화책으로 보관 가능", "직접 만든 책은 일반 콘텐츠보다 애착이 높아 반복적으로 읽을 가능성이 큼"] }
    ], "g2", `<div class="r-foot rv" ${d(1500)}><span class="chip">개인 활동</span>${arr()}<span class="chip green">가족 문화</span><span class="sep"></span><span class="chip">한 번 읽는 콘텐츠</span>${arr()}<span class="chip warm">반복해 읽는 소장품</span></div>`)
  },

  /* ---------- 24 장 4 · 도서관 프로그램으로 (3) ---------- */
  24: {
    bg: { tone: "green", seed: 97 },
    html: () => rCards([
      { ic: "library", c: "warm", t: "방문 목적을 ‘책 대출’에서 ‘독서·창작 체험’으로", s: "도서관에 올 새로운 이유를 만듭니다.",
        b: ["어린이에게 AI 동화책 만들기라는 새로운 방문 동기를 제공", "체험 후 관련 도서를 대출하는 프로그램으로 연계"] },
      { ic: "calendar", c: "", t: "독서 프로그램의 참여율과 지속성", s: "일회성 체험이 아닌 지속형 프로그램으로 운영합니다.",
        b: ["독서교실, 방학 프로그램, 가족 독서 프로그램, 학교 연계 프로그램 등에 활용", "책 읽기와 창작을 결합한 지속형 프로그램으로 운영"] },
      { ic: "child", c: "green", t: "책에 관심이 낮은 어린이의 새로운 통로", s: "디지털에 익숙한 아이의 관심을 독서로 옮깁니다.",
        b: ["AI·이미지 생성 등 디지털 경험에 익숙한 어린이의 관심을 활용", "AI가 재미있어서 참여 → 이야기가 궁금해서 읽음 → 다른 책도 찾아봄"] }
    ], "g3", `<div class="r-foot rv" ${d(1600)}><span class="chip ai">AI가 재미있어서 참여</span>${arr()}<span class="chip">이야기가 궁금해서 읽음</span>${arr()}<span class="chip warm">다른 책도 찾아봄</span></div>`)
  },

  /* ---------- 25 운영 변화 · 도입 전/후 ---------- */
  25: {
    bg: { tone: "cool", seed: 101 }, tone: "cool",
    html: () => {
      const rows = [
        ["방문 목적이 대출과 반납에 머무릅니다.", "책을 만들러 오는 <b>새로운 방문 동기</b>가 생깁니다."],
        ["독서 프로그램은 회차가 끝나면 참여도 끝납니다.", "체험 뒤 관련 도서 대출로 이어지는 <b>연계 프로그램</b>을 운영할 수 있습니다."],
        ["책에 관심이 낮은 어린이를 끌어올 계기가 마땅치 않습니다.", "만든 책을 다시 만들러 오면서 <b>참여가 이어집니다.</b>"],
        ["언어가 다른 가정은 프로그램 참여가 어렵습니다.", "한국어와 부모의 모국어를 함께 제공해 <b>다문화가정도 참여</b>할 수 있습니다."]
      ];
      return `
      <div class="r-cmp">
        <div class="hd before rv" ${d(200)}><span class="lbl">도입 전</span><b>대출 중심의 이용</b></div>
        <div class="hd mid"></div>
        <div class="hd after rv" ${d(200)}><span class="lbl">도입 후</span><b>창작·독서 체험으로 확장</b></div>
        ${rows.map((r, i) => `
        <div class="row before rv" ${d(600 + i * 420)}><span class="dot"></span><span>${r[0]}</span></div>
        <div class="row mid rv" ${d(800 + i * 420)}>${ic("arrow")}</div>
        <div class="row after rv" ${d(900 + i * 420)}><span class="dot"></span><span>${r[1]}</span></div>`).join("")}
      </div>`;
    }
  },

  /* ---------- 26 마무리 → 시연 ---------- */
  26: {
    hero: true,
    bg: { tone: "warm", seed: 103, extra: `<div class="light-on"></div>`, tint: "linear-gradient(180deg,rgba(247,244,236,.6) 0%,rgba(247,244,236,.9) 50%,rgba(247,244,236,.98) 100%)" },
    html: () => `
      <div class="closing r-closing">
        <div class="r-chain">
          <span class="st rv" ${d(300)}><span class="icw">${ic("spark")}</span><b>AI가 재미있어서</b><span>참여하고</span></span>
          <span class="arr rv" ${d(700)}>${ic("arrow")}</span>
          <span class="st rv" ${d(900)}><span class="icw warm">${ic("read")}</span><b>이야기가 궁금해서</b><span>읽고</span></span>
          <span class="arr rv" ${d(1300)}>${ic("arrow")}</span>
          <span class="st rv" ${d(1500)}><span class="icw green">${ic("search")}</span><b>그래서 다른 책도</b><span>찾아보게</span></span>
        </div>
        <div class="final rv" ${d(2300)}>읽기를 <em>대신하지 않고</em>,<br>읽기로 <em>데려갑니다</em>.</div>
        <div class="req rv" ${d(2900)}>AI 동화책 서비스가 도서관에서 맡는 역할은 여기까지입니다.</div>
        <div class="cta rv" ${d(3400)}>
          <button class="demo-btn" id="demoBtn2">DEMO ${ic("arrow")}<small>Enter</small></button>
        </div>
      </div>`,
    enter(el, ctx) { ctx.on(el.querySelector("#demoBtn2"), "click", () => ctx.openDemo()); }
  }
};

/* PART Ⅱ 방안 카드 (21·23·24장 공용) — 클릭 없이 근거까지 모두 노출 */
function rCards(items, grid, foot = "") {
  const cards = items.map((it, i) => `
    <div class="card r-card rv" ${d(300 + i * 220)}>
      <span class="icw ${it.c}">${ic(it.ic)}</span>
      <div>
        <h3>${it.t}</h3>
        <p class="sum">${it.s}</p>
        <ul>${it.b.map(x => `<li>${x}</li>`).join("")}</ul>
      </div>
    </div>`).join("");
  return `<div class="r-cards-wrap"><div class="r-cards ${grid}">${cards}</div>${foot}</div>`;
}

/* ============================================================
   DEMO 화면 5단계 (서비스 이용 과정 예시 · 원고 9장의 5단계와 동일)
   ============================================================ */
const DEMO_STEPS = ["기획", "글 다듬기", "일러스트", "오디오북", "실물 출판"];
function demoSide(active, who) {
  return `<div class="side">
    <div class="logo">${ic("book")}AI 시민 동화책 제작 플랫폼</div>
    ${DEMO_STEPS.map((s, i) => `<div class="m ${i < active ? "done" : i === active ? "on" : ""}"><span class="k">${i < active ? ic("check") : i + 1}</span>${s}</div>`).join("")}
    <div class="who">${who}</div>
  </div>`;
}

const DEMO_SCREENS = [
  {
    title: "기획", sub: "키워드와 줄거리 메모를 입력하면 AI가 질문을 던지며 시작합니다", noteIdx: 0,
    html: () => `
      <div class="app">
        ${demoSide(0, `${ic("parent")} 가족 그림책 프로그램<br>참여자: 부모와 아이 (예시)<br>${ic("monitor")} 도서관 태블릿에서 진행`)}
        <div class="main">
          <div class="field fade-in" ${d(100)}><label>키워드</label><div class="opts"><span class="chip sel">${ic("cloud-rain")}비 오는 날</span><span class="chip sel">${ic("umbrella")}우산</span><span class="chip sel">${ic("users")}친구</span><span class="chip">${ic("home")}우리 동네</span></div></div>
          <div class="field fade-in" ${d(500)}><label>줄거리 메모</label><div class="val typing" id="dmType"><span id="dmTypeTxt"></span><span class="caret"></span></div></div>
          <div class="field fade-in" ${d(2600)}><label>AI의 질문 <em class="ai-tag">${ic("spark")}AI</em></label>
            <div class="qs">
              <div class="qb fade-in" ${d(2700)}>우산은 왜 친구를 만나고 싶었을까요?</div>
              <div class="qb fade-in" ${d(3000)}>비 오는 날, 우산은 어디로 가면 좋을까요?</div>
              <div class="qb fade-in" ${d(3300)}>이야기의 끝은 어떤 기분이면 좋을까요?</div>
            </div>
          </div>
          <div class="dm-actions fade-in" ${d(3500)}><span class="btn ghost">${ic("librarian")}사서에게 질문하기</span><span class="btn">질문에 답하고 이야기 다듬기 ${ic("arrow")}</span></div>
        </div>
      </div>`,
    enter(el, ctx) {
      const t = "비 오는 날 친구를 만나고 싶은 우산 이야기";
      const out = el.querySelector("#dmTypeTxt");
      const rm = document.documentElement.classList.contains("rm");
      if (rm) { out.textContent = t; return; }
      [...t].forEach((ch, i) => ctx.timer(() => { out.textContent += ch; }, 800 + i * 60));
    }
  },
  {
    title: "글 다듬기", sub: "AI 제안을 읽고, 시작 · 사건 · 결말이 있는 이야기로 함께 다듬습니다", noteIdx: 1,
    html: () => `
      <div class="app">
        ${demoSide(1, `${ic("spark")} AI 제안 문장은 AI 제안으로 표시되고,<br>최종 문장은 시민이 결정합니다`)}
        <div class="main">
          <div class="story3">
            <div class="dpane fade-in" ${d(100)}><span class="ai-lab">${ic("spark")}AI 제안</span><div class="lab">시작</div><div class="txt">비 오는 날, 빨간 우산은 골목 끝에 서 있었어요. 오늘은 꼭 친구를 만나고 싶었거든요.</div></div>
            <div class="dpane old fade-in" ${d(500)}><span class="ai-lab">${ic("spark")}AI 제안</span><div class="lab">사건</div><div class="txt">우산은 <mark>혼자 슬퍼하며 누가 말을 걸어 주기를 기다렸어요.</mark></div><div class="kid fade-in" ${d(1500)}>${ic("child")}“우산이 먼저 친구를 찾아가면 좋겠어요”</div></div>
            <div class="dpane new fade-in" ${d(2400)}><div class="lab">사건 · 가족이 고친 문장</div><div class="txt">우산은 <mark>빗방울 소리를 따라 골목을 걸어 나갔어요.</mark> 물웅덩이에서 작은 빗방울 친구를 만났어요.</div><ul class="list tight"><li>${ic("check")}<span>주인공의 <b>행동</b>이 바뀜: 기다림 → 찾아 나섬</span></li></ul></div>
            <div class="dpane fade-in" ${d(2900)}><span class="ai-lab">${ic("spark")}AI 제안</span><div class="lab">결말</div><div class="txt">“안녕! 나랑 같이 걸을래?” 우산이 먼저 인사했어요. 둘은 함께 집으로 돌아갔어요.</div></div>
          </div>
          <div class="dm-actions fade-in" ${d(3300)}><span class="btn ghost">다시 제안 받기</span><span class="btn">이 이야기로 정하기 ${ic("check")}</span></div>
        </div>
      </div>`
  },
  {
    title: "일러스트", sub: "수채화 · 클레이 · 동양화 중 스타일을 골라 장면마다 그림을 만들고 선택합니다", noteIdx: 2,
    html: () => `
      <div class="app">
        ${demoSide(2, `${ic("image")} 그림 후보는 AI 생성물로 표시되며<br>선택은 시민이 합니다`)}
        <div class="main">
          <div class="field fade-in" ${d(100)}><label>스타일</label><div class="opts"><span class="chip sel">${ic("image")}수채화</span><span class="chip">클레이</span><span class="chip">동양화</span></div></div>
          <div class="field fade-in" ${d(500)}><label>장면 2 · 우산이 빗방울 친구를 만나는 장면 <em class="ai-tag">${ic("spark")}AI 생성</em></label>
            <div class="pics">
              <div class="pic fade-in" ${d(700)}>${umbrellaSVG("clean", { face: "sad", friend: "none", sky: "#CFD9E4" })}<span class="cap">후보 1 · 혼자 기다리는 우산</span></div>
              <div class="pic sel fade-in" ${d(1000)}>${umbrellaSVG("clean", { face: "smile", friend: "raindrop" })}<span class="cap">후보 2 · 빗방울 친구를 만난 우산</span><span class="sel-badge">${ic("check")}</span></div>
              <div class="pic fade-in" ${d(1300)}>${umbrellaSVG("clean", { face: "wow", friend: "bird", sky: "#E4ECF2" })}<span class="cap">후보 3 · 작은 새를 만난 우산</span></div>
            </div>
          </div>
          <div class="choice fade-in" ${d(2400)}><span class="chip green">${ic("check")}후보 2 선택</span><span>우산이 먼저 다가가는 이야기와 맞는 <b>표정</b>과 <b>친구</b>가 있는 장면 · 마음에 들지 않으면 다른 후보를 고르거나 다시 받을 수 있습니다</span></div>
          <div class="dm-actions fade-in" ${d(2800)}><span class="btn ghost">다른 그림 받기</span><span class="btn">이 그림으로 정하기 ${ic("check")}</span></div>
        </div>
      </div>`
  },
  {
    title: "오디오북", sub: "완성한 글을 내 목소리로 낭독해 녹음합니다", noteIdx: 3,
    html: () => `
      <div class="app">
        ${demoSide(3, `${ic("mic")} 파형은 화면 연출이며<br>발표자료에서 실제 음성은 재생되지 않습니다`)}
        <div class="main">
          <div class="spread fade-in" ${d(100)}>
            <div class="pg img">${umbrellaSVG("clean", { face: "smile", friend: "raindrop" })}</div>
            <div class="pg">
              <span class="pn">PAGE 2 · 낭독 중</span>
              <h3>비 오는 날 친구를 만나고 싶은 우산</h3>
              <p><mark class="reading" id="rd1">우산은 빗방울 소리를 따라 골목을 걸어 나갔어요.</mark> <mark class="reading" id="rd2">물웅덩이에서 작은 빗방울 친구를 만났어요.</mark></p>
              <p>“안녕! 나랑 같이 걸을래?” 우산이 먼저 인사했어요.</p>
              <span class="by">글 · 그림 선택: 우리 가족 · 낭독: 아이의 목소리 (예시)</span>
            </div>
          </div>
          <div class="recbar fade-in" ${d(600)}>
            <span class="rec"><i></i>REC</span>
            <div class="wave">${waveBars(48)}</div>
            <span class="rtime">00:12</span>
            <span class="chip sm">${ic("mic")}내 목소리로 낭독</span>
          </div>
          <div class="dm-actions fade-in" ${d(1200)}><span class="btn ghost">다시 녹음</span><span class="btn">낭독본 저장 ${ic("check")}</span></div>
        </div>
      </div>`,
    enter(el, ctx) {
      const rm = document.documentElement.classList.contains("rm");
      if (rm) { el.querySelector("#rd1")?.classList.add("on"); return; }
      ctx.timer(() => el.querySelector("#rd1")?.classList.add("on"), 900);
      ctx.timer(() => { el.querySelector("#rd1")?.classList.remove("on"); el.querySelector("#rd2")?.classList.add("on"); }, 2600);
    }
  },
  {
    title: "실물 출판 · 사서 관리", sub: "인쇄·제본 기업과 연동해 실물 책으로 받고, 사서는 관리자 화면 하나에서 운영합니다", noteIdx: 4,
    html: () => `
      <div class="app">
        ${demoSide(4, `${ic("print")} 인쇄·제본 기업과 연동<br>${ic("librarian")} 사서 관리자 화면 · 예시`)}
        <div class="main">
        <div class="dm-side">
        <div class="pubcol">
          <div class="card pub fade-in" ${d(100)}>
            <span class="kicker">실물 출판 · 인쇄·제본 연동</span>
            <div class="pubrow">
              <div class="mini-book xl warm">${ic("book")}<em>비 오는 날 친구를<br>만나고 싶은 우산</em></div>
              <div class="pubflow2">
                <div class="pf fade-in" ${d(500)}><span class="icw">${ic("check")}</span><div><b>완성본 확인</b><span>글 · 그림 · 낭독본</span></div></div>
                <div class="pf fade-in" ${d(800)}><span class="icw warm">${ic("print")}</span><div><b>인쇄 · 제본 기업 연동</b><span>다양한 형태의 실물책</span></div></div>
                <div class="pf fade-in" ${d(1100)}><span class="icw green">${ic("library")}</span><div><b>도서관에서 수령</b><span>인쇄 확인을 위한 재방문</span></div></div>
              </div>
            </div>
            <div class="dm-actions fade-in" ${d(1400)}><span class="btn ghost">${ic("share")}화면으로 가족과 읽기</span><span class="btn">${ic("print")}실물책 주문</span></div>
          </div>
        </div>
        <div class="card dm-note fade-in" ${d(900)}>
          <span class="kicker">사서 관리자 화면 · 예시</span>
          <div class="dash-body vertical">
            <div class="tile fade-in" ${d(1300)}><span class="tl">AI 토큰</span><div class="ring"><i></i></div><span class="ts">사용량 · 잔여량 관리</span></div>
            <div class="tile fade-in" ${d(1500)}><span class="tl">결과물 관리</span><div class="rows"><i style="--w:70%"></i><i style="--w:45%"></i><i style="--w:88%"></i></div><span class="ts">검토 · 공개 · 인쇄 요청</span></div>
            <div class="tile fade-in" ${d(1700)}><span class="tl">이용 통계</span><div class="bars"><i style="--h:40%"></i><i style="--h:65%"></i><i style="--h:50%"></i><i style="--h:80%"></i><i style="--h:70%"></i><i style="--h:95%"></i></div><span class="ts">프로그램 · 세대별 참여</span></div>
          </div>
        </div>
        <button class="btn dm-return" id="dmFinish">발표로 돌아가기 ${ic("arrow")}</button>
        </div>
        </div>
      </div>`,
    enter(el, ctx) { ctx.on(el.querySelector("#dmFinish"), "click", () => ctx.finishDemo()); }
  }
];
