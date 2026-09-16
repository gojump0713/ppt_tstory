# AI 시민 동화책 제작 플랫폼
## 인터랙티브 HTML 발표자료 작업지시서(PRD)

## 1. 프로젝트 목적
첨부 발표멘트를 기반으로 공공도서관 담당 공무원·관리자가 짧은 시간 안에 아래 내용을 직관적으로 이해하도록 하는 인터랙티브 HTML 발표자료를 제작한다.

1. 왜 지금 공공도서관에 AI 시민 동화책 서비스가 필요한가
2. 국가 AI·독서·도서관·디지털 포용 정책과 어떻게 연결되는가
3. 시민이 실제로 어떤 과정으로 책을 만드는가
4. 어린이·직장인·부모·어르신에게 어떤 활용 장면이 있는가
5. 공공도서관의 재방문·행사·지역자료 축적과 어떻게 이어지는가

이 발표는 일반적인 웹사이트가 아니라 **발표자가 말하는 동안 화면이 핵심 수치·장면·구조를 증명하는 프레젠테이션 UI**다.

또한 필요 시 각 장표의 바탕화면에는 장표 메시지에 맞는 **Higgsfield 제작 배경 영상**을 사용할 수 있다.

---

## 2. 청중
- 공공도서관 담당 공무원
- 도서관장·관리자
- 문화·독서정책 담당자
- 디지털/AI 사업 담당자
- 필요 시 중앙부처·지자체 정책 결정자

청중 특성:
- 기술 설명보다 정책 적합성·시민 체감도·운영 가능성을 중요하게 봄
- 화면을 오래 읽기보다 발표자의 설명과 함께 핵심 수치/도식으로 판단
- 지나친 미래형 AI 이미지보다 실제 도서관 장면과 운영 흐름에 신뢰를 느낌

---

## 3. Source of Truth
콘텐츠의 1차 기준은 `AI시민동화책_공공도서관_발표멘트_최종.md`다.

### 적용 원칙
- 원고에 있는 수치·정책명·사례를 임의로 변경하지 않는다.
- 원고에 없는 성과 수치나 도입효과를 새로 만들어 넣지 않는다.
- `○○○권`은 그대로 변수 처리한다.
- 원고에서 확인 필요로 표시한 출처는 UI에 `VERIFY` 상태로 관리한다.
- 외부 자료 추가가 필요할 때는 원고와 구분되는 별도 데이터 레이어에서 관리한다.

---

## 4. 최종 산출물
권장 폴더 구조:

```text
ai-library-presentation/
├─ index.html
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx
│  ├─ data/
│  │  ├─ slides.ts
│  │  ├─ sources.ts
│  │  └─ media.ts
│  ├─ components/
│  │  ├─ PresentationShell.tsx
│  │  ├─ SlideFrame.tsx
│  │  ├─ ChapterLabel.tsx
│  │  ├─ ProgressBar.tsx
│  │  ├─ MetricCounter.tsx
│  │  ├─ SourceFootnote.tsx
│  │  ├─ FlowDiagram.tsx
│  │  ├─ RadialValues.tsx
│  │  ├─ BeforeAfter.tsx
│  │  └─ PresenterNotes.tsx
│  ├─ slides/
│  │  ├─ Slide01.tsx
│  │  ├─ ...
│  │  └─ Slide18.tsx
│  ├─ styles/
│  │  ├─ tokens.css
│  │  └─ presentation.css
│  └─ hooks/
│     ├─ usePresentationNav.ts
│     ├─ useSlideInView.ts
│     └─ useReducedMotion.ts
├─ public/
│  ├─ media/
│  ├─ sources/
│  └─ fonts/
└─ README.md
```

---

## 5. 권장 기술 스택
바이브코딩 시 아래 조합을 우선 권장한다.

- React + TypeScript + Vite
- **PC/프로젝터 발표 전용. 모바일 UI는 구현하지 않음.**
- CSS Variables 또는 Tailwind CSS
- Motion/Framer Motion 계열 애니메이션 라이브러리
- SVG 기반 도식화
- D3는 복잡한 차트가 필요한 경우에만 사용
- 영상: HTML5 `<video muted playsInline preload="metadata">`
- **모든 영상과 이미지는 Higgsfield로 제작**
- 아이콘: Lucide 등 단순 라인 아이콘
- 외부 네트워크가 불안한 발표장을 고려해 **미디어는 가능한 로컬 번들/캐시 가능 구조**

프레임워크가 달라도 아래 UX/데이터 구조는 유지한다.

---

## 6. 발표 구조
총 **17장**으로 구현한다.

1. 표지
2. 도서관 역할의 확장
3. 문학빵 사례
4. AI 3대 강국
5. 독서·도서관 정책
6. 법·제도 5×5 매핑
7. 성인 독서율 38.5%
8. 서비스 5단계
9. 공공도서관 전용 설계
10. 어린이·청소년
11. 청년·직장인
12. 부모·양육자
13. 노년층
14. 왜 정부/도서관/동화인가
15. 공공적 가치 7가지
16. 재방문·행사·지역 아카이브
17. 마무리/시연 전환

원고의 `Ⅰ~Ⅵ`는 별도 장표로 늘리지 말고 Chapter Label로 표시한다.

---

## 7. 슬라이드 데이터 구조
콘텐츠를 JSX에 직접 박아 넣지 말고 데이터화한다.

```ts
type SlideData = {
  id: number;
  sourceLabel?: string;
  chapter?: string;
  title: string;
  governingMessage: string;
  body?: string[];
  metrics?: {
    value: number | string;
    suffix?: string;
    label: string;
    derived?: boolean;
  }[];
  sourceIds?: string[];
  media?: {
    type: "image" | "video" | "none";
    src?: string;
    poster?: string;
  };
  presenterNote?: string;
};
```

`derived: true` 예:
- 75.3 / 14.4 ≈ 5.2배
- 84.0 - 13.8 = 70.2%p

파생수치는 화면에서 `제시 수치 단순계산`임을 Tooltip 또는 작은 각주로 표시한다.

---

## 8. 네비게이션 UX

### 필수
- 마우스 휠: 1회 제스처 = 1장 이동
- 키보드:
  - ↓ / → / Space / PageDown = 다음
  - ↑ / ← / PageUp = 이전
  - Home = 1장
  - End = 17장
  - F = Fullscreen
  - P = Presenter Note
  - M = Motion 최소화
- URL Hash: `#slide-01` 형태
- 새로고침해도 현재 장표 유지

### Scroll
- 각 Slide `min-height: 100svh`
- `scroll-snap-type: y mandatory`
- 스크롤 중 중간 위치에 멈추지 않게 한다.
- Wheel Debounce 650~800ms

---

## 9. 인터랙션 운영 원칙

인터랙티브 요소는 많이 사용하되, **발표자가 한 장표 안에서 계속 마우스를 클릭해야 하는 구조는 금지**한다.

### 기본 동작
`장표 진입 → 자동 애니메이션 시퀀스 재생 → 최종 상태 유지`

### 자동 실행 대상
- 숫자 Count-up
- 그래프 Draw
- 카드 Stagger
- 정책-기능 연결선
- 5단계 서비스 흐름
- 음성 Waveform → 문장/책 변환
- 7대 공공가치 노드 등장
- 재방문/전시/아카이브 흐름
- Before/After 자동 비교
- Q&A 카드 순차 Reveal

### 사용자 조작은 보조 기능으로 한정
- Hover: 강조, 툴팁, 썸네일
- Drag: 이미 자동 재생된 Before/After를 다시 비교
- Click: Demo 진입, 목차 이동처럼 명확한 목적이 있을 때만 사용
- 핵심 정보는 클릭하지 않아도 모두 노출되어야 한다.

### 시간 규칙
- 장표 진입 후 약 0.2초 내 Title 시작
- 0.5~3.5초 사이 핵심 요소 순차 표시
- 4.5초 이내 최종 안정 상태 도달 권장
- 발표자가 오래 머물러도 반복 재생하지 않음
- 장표 재진입 시 처음부터 재생 가능

### 금지
- 패럴랙스
- 마우스 포인터 추적형 효과
- 클릭할 때마다 다음 문장이 나오는 방식
- 탭을 여러 번 열어야 전체 내용을 이해하는 구조
- 3D 회전/과도한 카메라 무빙

---

## 10. 발표자 UI
발표 모드에서는 청중 화면에 불필요한 메뉴가 보이지 않아야 한다.

### 기본 노출
- 상단 Progress Bar
- Chapter Label
- Page Number

### 숨김/호버
- 좌/우 이동 버튼
- 목차 Drawer

### 발표자 메모
`P` 키로 토글되는 반투명 패널:
- 현재 장표 발표멘트
- 다음 장표 제목
- 진행률
- 동작 Cue: `NEXT`, `CLICK`, `DEMO`

청중용 프로젝터에서는 Presenter Note가 기본 OFF.

---

## 11. 디자인 토큰

```css
:root {
  --bg-paper: #F7F4EC;
  --bg-cool: #F4F6F8;
  --ink: #15202B;
  --muted: #6B7480;
  --ai: #5C6CFF;
  --warm: #E7A74E;
  --community: #3F9B74;
  --gap: #E5645E;

  --title-size: clamp(3.6rem, 5.1vw, 6rem);
  --gov-size: clamp(1.55rem, 2.05vw, 2.25rem);
  --body-size: clamp(1.2rem, 1.55vw, 1.75rem);
  --metric-size: clamp(5.5rem, 10vw, 11rem);

  --radius-lg: 28px;
  --shadow-soft: 0 20px 60px rgba(20, 30, 50, .12);
}
```

---

## 12. 거버닝 메시지 표현 규칙
- 제목 아래 2~3줄 영역 고정
- 개조식이 아니라 읽었을 때 장표의 주장 전체가 이해되는 문장
- 발표멘트를 그대로 붙이지 않고 70~140자 정도로 압축
- "무엇이 문제인지 → 왜 중요한지 → 이 장표의 결론" 흐름
- 한 줄 폭이 지나치게 길지 않게 최대 46~54자 수준

---

## 13. 본문 카피 표현 규칙
- 발표멘트 전체를 화면에 노출하지 않는다.
- 한 카드 = 한 주장
- 명사형보다 행동형 문구 선호
- 수치는 숫자를 먼저 크게, 설명을 아래에 배치
- 표는 5행을 넘기지 않도록 함
- 긴 문장은 `상세 설명 → 발표자 멘트`로 넘기고 화면은 요약

---

## 14. 차트/수치화 요구사항

### Slide 03
- 20종
- 10일
- 최대 35만 개
- 반드시 `판매량 ≠ 독서 증가` 주의 문구

### Slide 04
- 12대 전략분야
- 2개 강조: AI 기본사회 / AI 기반 문화강국

### Slide 05
- 2028 성인 독서율 목표 50%

### Slide 06
- 5개 정책 요구 ↔ 5개 서비스 기능

### Slide 07
- 성인 독서율 38.5%
- 목표 50%
- Gap 11.5%p
- 20대 75.3%
- 60세 이상 14.4%
- 단순 비율 약 5.2배
- 학생 도서관 이용 84.0%
- 성인 13.8%
- 단순 차이 70.2%p
- **연도별 원자료가 없으면 2013~2025 추이선을 임의 생성하지 말 것**

### Slide 08
- 5단계
- 1~5분

### Slide 09
- 조사 20여 종
- 3대 공공도서관 설계

### Slide 15
- 7대 공공가치

### Slide 16
- 재방문 3~4회
- `연간 지역자료 ○○○권`은 Placeholder

---

## 15. 애니메이션 원칙
모션은 “멋”이 아니라 발표의 논리 순서를 보여주는 장치로 사용한다.

### Motion Timing
- Slide Enter: 650ms
- Title: 0ms
- Governing: +120ms
- Main Visual: +220ms
- Metrics: +320ms
- Supporting labels: +450ms

### 금지
- 3D 회전 과다
- 바운스 반복
- 텍스트가 계속 떠다니는 효과
- 읽어야 할 수치가 움직인 채 유지되는 효과
- Scroll hijacking으로 사용자가 멈출 수 없는 구성

### 권장
- Fade-up
- Mask Reveal
- Line Draw
- Count-up
- Stagger
- Mask Reveal / Morph / Line Draw / Count-up / 자동 순차 Reveal
- **패럴랙스는 사용하지 않음**
- Before/After Slider
- Card Flip

---

## 16. Slide별 인터랙션 매핑

| Slide | 핵심 인터랙션 |
|---:|---|
| 1 | 배경 영상 + 책 열림 Transition |
| 2 | 기존 도서관 + AI → 역할 확장 |
| 3 | 책갈피 Fan + 숫자 Count-up |
| 4 | 12개 정책 노드 중 2개 Highlight |
| 5 | 3개 정책 원 Converge |
| 6 | 5개 정책-기능 Line Draw |
| 7 | Goal Gap + 막대 비교 |
| 8 | 장표 진입 후 5-Step 자동 순차 활성화 |
| 9 | 운영 허브 + 관리자 Mockup |
| 10 | 낙서 → 책 → 대출 흐름 |
| 11 | 낮 → 야간 도서관 |
| 12 | Before/After 자동 Slider + 선택적 Drag |
| 13 | Voice Wave → Story → Book |
| 14 | Q&A 카드 자동 순차 Reveal |
| 15 | 7개 Value Orbit |
| 16 | 1→4회 방문 + 아카이브 축적 |
| 17 | 3문장 → Final Statement → Demo |

---

## 17. Higgsfield MCP 연동 지침

### 목적
발표의 사실·수치는 HTML/SVG에서 관리하고, Higgsfield는 감정적 장면·시민 경험·공간 분위기를 만드는 이미지/영상 자산 생성에 사용한다.

### 모델 기본값
- 정지 이미지: `gpt_image_2`
- 일반 영상: `seedance_2_5`
- 복합 다중 장면/카메라 연출: `kling3_0` 검토

### 호출 파라미터 기본
이미지:
```json
{
  "model": "gpt_image_2",
  "aspect_ratio": "16:9",
  "count": 1
}
```

영상:
```json
{
  "model": "seedance_2_5",
  "aspect_ratio": "16:9",
  "count": 1,
  "duration": 7
}
```

실제 MCP 도구의 함수명/인증 방식은 연결된 Higgsfield 환경을 사용하고, 프롬프트와 위 파라미터만 데이터에서 전달하도록 Adapter를 만든다.

### Adapter 인터페이스 예시
```ts
type MediaRequest = {
  slideId: number;
  kind: "image" | "video";
  model: string;
  aspectRatio: "16:9";
  duration?: number;
  prompt: string;
};

async function generatePresentationMedia(req: MediaRequest) {
  // 실제 Higgsfield MCP 호출은 여기에서만 수행
  // UI/Slide 컴포넌트가 직접 MCP에 의존하지 않게 한다.
}
```

### 프롬프트 규칙
항상 아래 순서:
1. Subject
2. Public library context
3. Human action
4. Visual style
5. Camera/composition
6. Lighting
7. Negative restrictions

예:
```text
A Korean senior telling a life story into a tablet microphone
inside a quiet public library,
then sharing the finished picture book with a grandchild,
respectful documentary realism,
gentle push-in camera, 16:9 wide composition,
warm natural daylight,
no text, no captions, no logos, no watermark
```

### 중요
- 생성 이미지에 정책명, 숫자, 출처를 넣지 않는다.
- `민음사 문학빵`처럼 실제 브랜드/사실 사례는 생성 이미지로 사실을 대체하지 않는다.
- 브랜드 사례 장표는 실제 사용권 확보 이미지 또는 보도/공식 자료를 우선하고, Higgsfield 생성물은 배경/보조 연출로만 쓴다.
- 인물은 과도하게 광고 모델처럼 보이지 않게 한다.
- 어린이 장면은 안전하고 일상적인 도서관 활동만 표현한다.

---

## 18. 장표 배경 영상 정책

- 장표별로 필요 시 **Full-bleed 배경 영상**을 사용할 수 있다.
- 배경 영상은 장표의 상황·분위기·행동을 전달하는 용도로 사용하고, 사실 수치나 설명 텍스트는 HTML/SVG 레이어에서 표시한다.
- 배경 영상은 장표 진입 시 자동 재생되고 무음·반복(loop)되어야 한다.
- 영상은 발표자의 설명을 보조해야 하며 본문 가독성을 침해하면 안 된다.
- 따라서 영상 위에는 반투명 오버레이, Blur, 상하 그라데이션 마스크 중 하나를 적용한다.
- 정보 밀도가 높은 장표는 영상보다 정적 배경을 우선한다.
- 영상 우선 장표: 01, 02, 05, 09, 11, 12, 14, 17, 18
- 선택적 영상 장표: 03, 10, 13
- 정적/도식 우선 장표: 04, 06, 07, 08, 15, 16

---

## 19. 미디어 로딩 전략
영상이 많아도 발표 시작이 느려지지 않게 한다.

### Loading
- Slide 1 영상만 `preload="auto"`
- 현재 장표 ±1의 영상만 미리 로드
- 나머지 영상 `preload="metadata"`
- 이미지 WebP/AVIF 우선
- 영상 H.264 MP4 + 필요 시 WebM

### 권장 크기
- 이미지: 1920×1080 기준 300~700KB
- 영상: 1080p, 5~8초, 3~8Mbps
- Poster 이미지 제공

### 실패 시
- 영상 로드 실패 → poster 이미지
- 이미지 실패 → CSS Gradient + Icon Diagram
- 발표는 미디어 실패와 무관하게 진행 가능해야 함

---

## 20. 접근성
- 본문 최소 22px 이상
- 수치와 차트 색상은 명도 차 + 라벨 병행
- 키보드로 모든 장표 이동 가능
- `prefers-reduced-motion` 지원
- 영상 자동재생은 무음
- 모든 정보가 영상에만 존재하지 않게 함
- 중요한 이미지에는 `alt` 제공
- Before/After Slider는 키보드 화살표 조작 지원

---

## 21. 지원 화면 및 비지원 범위

### 지원 환경
- 1920×1080 Full HD — 기준 해상도
- 2560×1440 QHD — 확대 대응
- 1366×768 — 최소 지원
- 16:10 노트북 — 16:9 캔버스 유지 + 여백 조정

### 비지원
- **모바일 지원하지 않음**
- 스마트폰 세로 UI 미제작
- 태블릿 전용 레이아웃 미제작
- Touch/Swipe Navigation 미지원
- 반응형 재배치보다 16:9 프레젠테이션 캔버스 유지가 우선

### 작은 Viewport 처리
- 1024px 미만에서는 발표 UI를 억지로 축소하지 않는다.
- 대신 `이 프레젠테이션은 PC/프로젝터 환경에 최적화되어 있습니다.` 안내 화면을 표시할 수 있다.

---

## 22. 출처 컴포넌트
각 Slide 하단 좌측에 작은 Source Footnote.

```ts
type Source = {
  id: string;
  title: string;
  url?: string;
  status: "verified" | "verify";
  note?: string;
};
```

`verify` 상태인 자료:
- 제4차 독서문화진흥 기본계획의 `2028년 50% 목표` — 원고에서 원문 확인 표시
- 디지털포용법 / AI 기본법 관련 조문 — 원고에서 조문 확인 표시

개발 중에는 노란 점, 최종 발표 모드에서는 확인 완료 후 일반 출처 스타일로 변경.

---

## 23. 수치 데이터 무결성
- 숫자를 JSX 문자열로 여러 곳에 중복 작성하지 않는다.
- `metrics.ts` 또는 `slides.ts`에서 단일 관리
- 퍼센트포인트는 `%p`, 비율은 `배`로 구분
- `38.5 → 50`의 차이는 11.5%p
- 75.3/14.4의 5.2배는 파생값이므로 원자료 수치와 시각적으로 구분
- 84.0-13.8의 70.2%p도 파생값 표시
- `최대 35만 개`에서 `최대`를 삭제하지 않는다.

---

## 24. 오디오
기본 발표에는 배경음악을 넣지 않는다.
- 발표자 음성을 방해할 수 있음
- 영상은 모두 무음 자동재생
- Slide 13 음성 Waveform도 시각 효과이며 실제 음성을 자동재생하지 않음
- 시연 페이지에서만 별도 오디오 기능 가능

---

## 25. 시연 전환
Slide 17의 `DEMO →`는 다음 중 하나를 환경변수로 지정한다.

```ts
const DEMO_URL = import.meta.env.VITE_DEMO_URL;
```

동작:
1. 발표 중 클릭/Enter
2. 새 탭이 아니라 같은 화면에서 전환하는 옵션 우선
3. `Backspace` 또는 브라우저 뒤로가기로 Slide 17 복귀
4. 네트워크 없는 발표를 대비해 로컬 Demo Route도 허용

---

## 26. QA 체크리스트

### 콘텐츠
- [ ] 18개 장표 모두 존재
- [ ] 제목/거버닝 메시지/본문 카피가 화면설계서와 일치
- [ ] `최대 35만 개`의 `최대` 유지
- [ ] 38.5%, 50%, 11.5%p 정확
- [ ] 75.3%, 14.4%, 84.0%, 13.8% 정확
- [ ] 1~5분 정확
- [ ] 3~4회 정확
- [ ] `○○○권` 임의 수치로 대체하지 않음
- [ ] 원고의 확인 필요 출처는 검증 전까지 상태 표시

### 발표 UX
- [ ] 방향키/Space/휠 모두 이동
- [ ] 핵심 내용 확인에 장표 내부 클릭이 필요하지 않음
- [ ] 패럴랙스 효과가 전혀 없음
- [ ] 한 번 조작에 정확히 한 장
- [ ] Slide Hash 유지
- [ ] Fullscreen 동작
- [ ] Presenter Note 토글
- [ ] Demo 전환 후 복귀

### 모션
- [ ] 모션이 발표 순서를 방해하지 않음
- [ ] Reduced Motion 지원
- [ ] 영상은 무음
- [ ] 루프 이음새가 눈에 띄지 않음

### 성능
- [ ] 첫 화면 3초 이내 시각적 표시 목표
- [ ] 1번 장표 외 영상 Lazy Load
- [ ] 영상 실패 시 Poster Fallback
- [ ] 오프라인/불안정 네트워크 상황에서 핵심 발표 진행 가능

### 화면
- [ ] 1920×1080에서 잘림 없음
- [ ] 프로젝터에서도 22px 이하 핵심 정보 없음
- [ ] Source Footnote가 본문보다 눈에 띄지 않음
- [ ] 색상만으로 데이터 구분하지 않음

---

## 27. 바이브코딩용 최종 작업 명령문

아래 내용을 코딩 에이전트에게 그대로 전달해도 된다.

```text
첨부된 screen-spec.md와 본 PRD를 기준으로 17장짜리 공공도서관 발표용 인터랙티브 HTML 프레젠테이션을 구현하라.

핵심 요구사항:
1. 1920x1080, 16:9 Full-screen을 기준으로 한다.
2. 모바일과 태블릿 전용 UI는 제작하지 않는다. PC/노트북/프로젝터 발표 환경만 지원한다.
3. 세로 scroll-snap 방식이며 마우스 휠, 방향키, Space, PageUp/Down으로 정확히 한 장씩 이동한다.
4. 패럴랙스는 어떤 장표에서도 사용하지 않는다.
5. 인터랙티브 요소는 적극적으로 사용하되, 장표 진입 시 자동 순차 재생되는 구조를 기본으로 한다.
6. 발표자가 한 장표의 핵심 내용을 보기 위해 반복 클릭할 필요가 없어야 한다. 기본 조작은 다음/이전 장표 이동뿐이어야 한다.
7. Hover, Drag 등은 보조 탐색 기능으로만 제공하고, 클릭하지 않아도 핵심 정보가 모두 보이게 한다.
8. 각 장표에는 Chapter Label, Title, Governing Message, Main Visual, Source Footnote, Page Number 구조를 유지한다.
9. 필요 시 각 장표는 Full-bleed 배경 영상을 사용할 수 있으며, 배경 영상은 무음·자동재생·반복으로 동작한다.
10. 모든 영상과 이미지는 Higgsfield로 제작한다.
11. 화면에 발표멘트 전체를 넣지 말고 screen-spec.md의 본문 카피만 노출한다.
12. Slide 03, 07, 08, 15, 16은 숫자와 도식을 중심으로 강하게 시각화한다.
13. 수치는 하드코딩 중복하지 말고 data/slides.ts에서 단일 관리한다.
14. 2013~2025 연도별 독서율 데이터가 제공되지 않았으므로 임의의 추이선을 생성하지 않는다.
15. 연간 지역자료는 ○○○권 또는 TBD로 유지하고 숫자를 만들지 않는다.
16. 이미지/영상 안에 한글 제목이나 수치를 생성하지 않는다. 모든 텍스트는 HTML/SVG로 올린다.
17. Higgsfield 연동은 별도 adapter 함수로 분리하고, 화면설계서의 프롬프트를 사용한다.
18. 정지 이미지는 gpt_image_2, 일반 영상은 seedance_2_5를 기본값으로 사용한다. 복잡한 다중 장면이 필요할 때만 kling3_0을 검토한다.
19. 생성 미디어가 없어도 CSS/SVG/Poster fallback으로 발표 전체가 동작해야 한다.
20. 영상은 muted, playsInline, loop. Slide 1만 우선 로딩하고 나머지는 lazy load한다.
21. prefers-reduced-motion을 지원한다.
22. P 키로 발표자 메모, F 키로 전체화면, M 키로 모션 최소화 모드를 제공한다.
23. Slide 17의 DEMO 버튼은 환경변수 VITE_DEMO_URL로 연결한다.
24. 민음사 문학빵 사례는 생성 이미지로 실제 상품을 대체하지 말고, 실제 사용권 확보 이미지가 없으면 Higgsfield 제작 보조 이미지 + 텍스트/수치 구조로 구현한다.
25. 전체 분위기는 공공기관의 신뢰감 60%, 동화책의 따뜻함 40%로 한다. 사이버펑크/홀로그램 중심의 AI 연출은 금지한다.
26. 화면 설계상의 모든 핵심 문장은 한 화면에서 3초 내 읽히도록 계층을 설계한다.
27. 자동 연출은 약 4.5초 이내 최종 상태에 도달하고 이후 반복하지 않는다.
28. 개발 완료 후 1920x1080, 1366x768, 16:10 노트북 화면에서 QA하고 오버플로/잘림을 수정한다.
29. 1024px 미만 Viewport에서는 모바일 레이아웃을 만들지 말고 PC 발표 환경 안내 화면을 표시한다.
```

---

## 28. 완료 기준
다음 상태이면 완료로 본다.

- 17장 전체가 끊김 없이 발표 가능
- 발표자가 화면을 읽지 않아도 시각자료가 논리를 보조함
- 핵심 수치가 오독되지 않음
- 생애주기 장표가 서로 다른 시민 장면으로 명확히 구분됨
- 미디어가 없어도 전체 논리가 전달됨
- 미디어가 있으면 감정적 몰입이 더해지되 사실 전달을 침범하지 않음
- 마지막 장에서 실제 서비스 시연으로 자연스럽게 넘어감
- 발표자가 장표 내부를 반복 클릭하지 않아도 전체 메시지가 전달됨
- 패럴랙스가 사용되지 않음
- 모바일 전용 레이아웃이 포함되지 않음
