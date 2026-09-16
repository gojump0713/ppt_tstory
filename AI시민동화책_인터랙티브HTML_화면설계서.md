# AI 시민 동화책 제작 플랫폼
## 공공도서관 발표용 인터랙티브 HTML 화면설계서

- 기준 원고: `AI시민동화책_공공도서관_발표멘트_최종.md`
- 화면 기준: 1920×1080 / 16:9 / Full-screen Presentation
- 발표 순서: 원고의 실제 등장 순서에 맞춰 **18장으로 재정렬**
- 원고의 `Ⅰ~Ⅵ` 장 구분은 별도 장표로 만들지 않고 각 화면의 Chapter Label로 사용
- 발표 방식: **PC/프로젝터 전용** 세로 스크롤 + 스냅 + 키보드/클리커 이동
- 패럴랙스: **사용하지 않음**
- 핵심 원칙: **말은 발표자가 하고, 화면은 숫자·장면·구조를 보여준다.**
- 이미지/영상 원칙: **모든 영상과 이미지는 Higgsfield로 제작**한다. 생성 이미지/영상 안에는 한글 문구·수치·출처를 넣지 않는다. 모든 텍스트는 HTML/SVG 레이어로 구현한다.

---

# 0. 공통 디자인 시스템

## 0-1. 전체 톤앤매너
- 키워드: 공공성, 따뜻함, 시민, 책, AI, 세대 연결, 신뢰
- 무드: 공공기관 발표의 신뢰감 + 동화책의 감성
- 화면은 “AI 기술 데모”보다 “시민의 경험”을 앞세운다.
- 실사 사진/영상 60%, 정보 시각화 30%, UI Mockup 10% 권장
- 한 화면의 핵심 문장은 최대 2개, 핵심 숫자는 최대 3개까지 우선 노출한다.

## 0-2. 컬러
- Background: #F7F4EC 또는 #F4F6F8
- Primary Dark: #15202B
- AI/Innovation Accent: #5C6CFF
- Library/Warm Accent: #E7A74E
- Positive/Community: #3F9B74
- Alert/Gap: #E5645E
- 차트는 색상만으로 구분하지 않고 라벨·패턴·수치 병기

## 0-3. 타이포그래피
- Title: 58~72px / 700
- Governing Message: 28~34px / 500 / line-height 1.45
- Main Number: 96~150px / 700
- Body Label: 22~28px
- Source: 15~18px
- 공공기관 회의실 프로젝터를 고려해 작은 글씨를 최소화한다.

## 0-4. 공통 UI
- 좌상단: `CHAPTER 01 · 문제제기` 형태의 Chapter Label
- 상단 얇은 Progress Bar: 1/18 → 18/18
- 우하단: 현재 장표 번호 `03 / 18`
- 좌우 가장자리: Hover 시 이전/다음 내비게이션 표시
- 키보드: ↑/↓, ←/→, PageUp/PageDown, Space 지원
- `P`: 발표자 메모 패널 토글
- `F`: 전체화면
- `M`: 모션 최소화 모드
- 화면 이동 시 scroll-snap으로 한 장씩 정착
- 본 발표자료는 **데스크톱/노트북/프로젝터 환경만 지원**하며 모바일 레이아웃은 제작하지 않는다.

## 0-5. 인터랙션 운영 원칙
- 인터랙티브 요소는 적극적으로 사용하되, **발표 진행을 위해 반복 클릭이 필요하지 않게 한다.**
- 기본 원칙은 **Slide Enter → 자동 순차 재생 → 정지 상태 유지**이다.
- 발표자가 수행하는 기본 입력은 `다음 장표 / 이전 장표` 이동뿐이어야 한다.
- 숫자 Count-up, 카드 등장, 연결선 Draw, 이미지 변환, 영상 재생은 장표 진입과 동시에 자동 시작한다.
- Hover, Before/After 드래그, 상세 정보 확장 등은 **선택적 보조 인터랙션**으로만 제공한다.
- 클릭해야만 핵심 내용이 보이는 구조는 금지한다.
- 자동 연출은 2.5~4.5초 안에 핵심 상태까지 도달하고, 이후 안정된 최종 화면을 유지한다.
- 발표자가 장표를 다시 진입하면 애니메이션을 처음부터 재생할 수 있게 한다.
- 패럴랙스, 마우스 포인터 추적형 배경, 과도한 3D 카메라 이동은 사용하지 않는다.

## 0-6. 공통 모션
- 기본 장면 전환: 650ms, cubic-bezier(0.22, 1, 0.36, 1)
- Title: 24px 아래에서 Fade-up
- Governing Message: Title 이후 120ms 지연
- 숫자: 0 → 목표값 Count-up, 800~1200ms
- 그래프: 좌→우 Draw, 1000ms
- 카드: 80ms Stagger
- 영상: 5~8초 무음 루프, 0.6~0.85 배속의 잔잔한 움직임
- `prefers-reduced-motion`에서는 카운트업·모핑·연속 동작을 제거하고 즉시 표시

## 0-7. 장표 배경 영상 활용 원칙
- 각 페이지는 필요 시 **Full-bleed 배경 영상**을 사용할 수 있다.
- 배경 영상은 장표의 메시지를 강화하는 용도로 사용하며, 텍스트 가독성을 해치지 않아야 한다.
- 배경 영상이 있는 장표는 상단 또는 중앙에 **반투명 오버레이**, Blur, 그라데이션 마스크 중 하나를 적용해 제목과 본문을 안정적으로 읽히게 한다.
- 영상은 설명용 UI가 아니라 **분위기·상황·행동**을 보여주는 장면으로 구성한다.
- 한 장표 안에서 영상은 1개만 기본으로 사용하고, 필요 시 2분할 영상 구성까지 허용한다.
- 모든 배경 영상은 **장표 진입 시 자동 재생**, 무음, 반복(loop)으로 동작한다.
- 발표자가 별도 클릭하지 않아도 장면이 완성되어 보여야 한다.
- 영상이 불필요한 장표는 정적 이미지, CSS 배경, SVG 도식만으로 구성한다.
- 정보량이 많은 장표는 영상보다 정적 배경을 우선한다.
- 배경 영상 사용 우선 장표: 01, 02, 05, 09, 11, 12, 14, 17, 18
- 보조적으로 선택 가능한 장표: 03, 10, 13
- 영상보다 정보도식이 우선인 장표: 04, 06, 07, 08, 15, 16

## 0-8. 미디어 생성 공통 규칙
### 정지 이미지
- 제작 도구: **Higgsfield만 사용**
- Higgsfield 모델: `gpt_image_2`
- Aspect Ratio: `16:9`
- 사람은 한국의 공공도서관 맥락이 자연스럽게 느껴지도록 표현
- 과도한 미래형 홀로그램, 네온 사이버펑크 금지
- 생성물 안에 읽을 수 있는 글자, 로고, 워터마크 금지

### 영상
- 제작 도구: **Higgsfield만 사용**
- Higgsfield 모델 기본 `seedance_2_5`
- 다중 장면·복합 카메라 연출이 필요할 때 `kling3_0` 검토
- Aspect Ratio: `16:9`
- Duration: 5~8 sec 권장
- 무음 루프를 기본으로 하고, 시작/끝 프레임이 자연스럽게 이어지게 설계

### 공통 Negative Direction
`no text, no captions, no logos, no watermark, no distorted hands, no extra fingers, no floating UI text, no cyberpunk neon, no dystopian mood, no exaggerated holograms`

---

# Slide 01 — 표지
**원문 기준:** [1] 표지

### 제목
**전 세대를 잇는 공공도서관**

### 서브타이틀
**AI 시민 동화책 제작 플랫폼**

### 거버닝 메시지
아이의 상상, 직장인의 일상, 어르신의 기억이 한 권의 책이 됩니다.  
AI를 시민의 창작 경험으로 바꾸고, 그 경험을 다시 독서와 도서관 이용으로 연결하는 공공도서관형 서비스입니다.

### 본문 화면 문구
- `아이의 상상`
- `직장인의 일상`
- `어르신의 기억`
- 중앙 결론: **“모든 시민의 이야기가 책이 되는 도서관”**

### 핵심 레이아웃
- Full-bleed 영상 배경
- 화면 중앙에 반투명 책 페이지 형태의 타이틀 패널
- 하단에 세대별 3개 키워드가 한 줄로 연결
- 표지에는 설명형 본문을 많이 넣지 않는다.

### 시각/도식
세 개의 작은 빛/종이 조각이 중앙의 한 권의 책으로 모이는 모션.

### 장면전환/애니메이션
1. 어두운 도서관 실사 영상에서 서가 조명이 켜짐
2. 세대별 인물 장면이 부드럽게 Cross-fade
3. 중앙에서 책 표지가 열리며 타이틀 등장
4. 스크롤 시 책 페이지가 앞으로 넘어가며 Slide 02로 전환

### Higgsfield 영상 프롬프트
`Cinematic warm Korean public library at late afternoon, a child drawing at a table, a young office worker writing a small personal story, and an elderly person gently speaking memories into a tablet, intercut as one continuous elegant sequence, bookshelves and natural wood interior, warm daylight, subtle camera dolly, human and authentic, public cultural space, hopeful and calm, realistic documentary-cinematic look, seamless loop ending on an open blank book on a library table, no text, no logos, no watermark`

---

# Slide 02 — 모든 시민의 이야기가 책이 되는 도서관
**원문 기준:** [2] 오프닝

### 제목
**읽고 배우는 도서관에서, 시민이 만드는 도서관으로**

### 거버닝 메시지
도서관이 가진 장서·사서·공간의 강점에 AI 창작 도구를 연결하면, 책과 멀어진 시민에게도 다시 책을 펼칠 이유를 만들어 줄 수 있습니다.

### 본문 화면 문구
왼쪽 `지금의 도서관`
- 읽기
- 배우기
- 만나기

가운데 `+ AI 창작 도구`

오른쪽 `확장된 도서관`
- 이야기 만들기
- 그림으로 표현하기
- 내 책 완성하기
- 다시 읽기

하단: **장서 + 사서 + 공간 + AI = 시민 창작 경험**

### 레이아웃
- 3단 구조: 기존 역할 → 연결 장치 → 새로운 경험
- 기존 영역은 고정, AI 블록이 끼워지며 오른쪽 결과가 확장되는 방식



### 배경 미디어
- **배경 영상 사용 권장**
- 공공도서관에서 시민이 읽고 만들고 이야기하는 장면을 부드럽게 보여주는 영상
- 좌측 정보영역의 가독성을 위해 우측 중심 구도의 영상 사용
### 배경 미디어
- **배경 영상 사용**
- 세대별 시민 장면이 한 권의 책으로 수렴하는 Full-bleed 영상 배경
- 텍스트 가독성을 위해 중앙 패널 뒤에 45~60% 반투명 오버레이 적용
### 장면전환/애니메이션
- 왼쪽 3개 단어가 먼저 등장
- 중앙 AI 블록이 슬라이드 인
- 오른쪽에 4개 경험이 연쇄적으로 펼쳐짐
- 마지막에 `시연으로 보여드리겠습니다`를 작은 Pill로 표시

### Higgsfield 이미지 프롬프트
`A modern Korean public library interior designed as a welcoming community space, children, adults and seniors using books, tablets and creative materials together, documentary realism, natural daylight, wood and paper textures, calm inclusive atmosphere, visual emphasis on people creating rather than futuristic technology, wide composition with clear negative space for presentation text, no readable text, no logos, no watermark`

---

# Slide 03 — 문학을 만나는 방식이 다양화가 필요합니다
**원문 기준:** [3] 문학빵 사례

### 제목
**문학을 만나는 방식이 다양화가 필요합니다**

### 거버닝 메시지
문학빵 사례는 ‘문학을 고르고, 모으고, 나누는 경험’ 자체가 관심의 입구가 될 수 있음을 보여줍니다. 시민이 관심을 가진 이야기를 직접 만들고, 그 주제와 관련된 책을 함께 읽도록 연결해 보는 것입니다. 책과 멀어진 시민에게 새로운 입구가 필요합니다.

### 본문 화면 문구
핵심 숫자 카드:
- **20종** `무작위 책갈피`
- **10일**
- **최대 35만 개** `판매 보도`

중앙 경험 플로우:
**고른다 → 확인한다 → 모은다 → 나눈다 → 관심이 생긴다**

하단 Insight:
**“책을 먼저 읽게 하는 것”만이 독서의 시작은 아닙니다.**

사례 캡션(좌측 상단, 동일 글씨 크기 3줄):
- 빵 봉지 안에 문학 작품 표지를 활용한 책갈피가 20종 가운데 하나씩 무작위로 들어 있음
- 빵 표지에 문학 작품 이미지와 책갈피를 넣었더니 대박 (앞 줄과 줄간격 좁게 · 한 묶음)
- 봉지를 열어 어떤 책갈피가 나왔는지 확인하고, 마음에 드는 표지를 모으고, 사진으로 나누는 경험이 문학의 관심과 그 책을 다시 읽어보는 사례로 이야기 되고 있습니다.

### 레이아웃
- 왼쪽 55%: 실제 문학빵/책갈피 사진 사용 권장
- 오른쪽 45%: 숫자 3개 + 경험 플로우
- 실제 브랜드 사례는 라이선스 가능한 보도/공식 이미지를 우선 사용한다.


### 배경 미디어
- **정적 배경 기본**, 필요 시 보조 영상 사용 가능
- 실제 사례 설명이 중심이므로 화면 한쪽에 보조 배경 영상 또는 생성 보조 컷 사용
- 핵심은 수치와 사례 설명이며 배경 영상이 전면을 차지하지 않도록 함
### 도식화
20 → 350,000의 단순 규모 대비 대신 `상품 → 수집 경험 → 문학 관심 → 도서관 프로그램` Funnel로 연결

### 장면전환/애니메이션
- 포장지가 열리는 듯한 Mask Reveal
- 책갈피 카드가 Fan 형태로 펼쳐짐
- 20종/10일/35만 개가 차례로 Count-up
- 마지막에 화면 오른쪽에서 도서관 아이콘이 들어오며 `관심 → 읽기·창작` 연결

### Higgsfield 보조 이미지 프롬프트
`Editorial still life of a convenience-store pastry package beside a small collection of elegant literary bookmark cards, no brand names, no logos, paper textures, collectible experience, warm neutral light, Korean everyday retail context, premium editorial photography, composition leaving clear negative space for large statistics, no readable text, no watermark`

---

# Slide 04 — AI 3대 강국
**Chapter:** Ⅰ. 정책환경  
**원문 기준:** [3] AI 3대 강국 — 국민 모두가 쓰는 AI

### 제목
**AI 3대 강국의 핵심은 ‘국민 모두가 쓰는 AI’입니다**

### 거버닝 메시지
대한민국 인공지능 행동계획은 ‘AI 기본사회’와 ‘AI 기반 문화강국’을 주요 전략으로 두고 있습니다. 범용 AI의 보급만으로는 시민 활용이 자동으로 늘지 않기 때문에, 목적이 분명한 활용 프로그램과 이를 운영할 공공기관이 함께 필요합니다.

### 본문 화면 문구
상단: `대한민국 인공지능 행동계획 2026~2028`

중앙:
- `12대 전략분야`
- 강조 1: **AI 기본사회**
- 강조 2: **AI 기반 문화강국**
- 노드 하단 문구: `온 국민이 AI를 누리고, AI로 콘텐츠를 창작하는 지원체계를 만들겠다는 것`

하단 연결:
**국가 AI 전략 → 시민이 실제로 쓰는 프로그램 → 공공도서관 → AI 동화 창작**

### 레이아웃
- 12개 노드의 원형/그리드 중 10개는 저채도
- 2개 핵심 노드만 Accent
- 우측에 시민→도서관→창작 장면을 미니 플로우로 연결


### 배경 미디어
- **정적 배경 권장**
- 정책 구조와 노드 시각화가 핵심이므로 배경은 매우 약한 정적 이미지 또는 미세한 루프 영상만 허용
### 애니메이션
12개 노드가 0.05초 간격으로 등장 → 2개 노드 Pulse → 선이 도서관 아이콘으로 연결

### Higgsfield 이미지 프롬프트
`Conceptual but realistic civic AI scene in South Korea, diverse citizens in a public library using accessible AI tools to create stories and cultural content, inclusive ages from child to senior, trustworthy public-service atmosphere, subtle visual metaphor of ideas becoming illustrated book pages, bright natural light, modern but not futuristic, wide negative space for policy diagram overlay, no text, no logos, no watermark`

---

# Slide 05 — 독서·도서관 정책
**Chapter:** Ⅰ. 정책환경  
**원문 기준:** [4] 독서·도서관 정책 — 비독자를 독자로

### 제목
**독서정책과 AI 창작정책이 도서관에서 만납니다**

### 거버닝 메시지
정부 정책은 독서장려 캠페인과 AI활용 장려이며, 그 접점이 도서관에서의 AI이야기 창작으로 모이고 있습니다. 시민이 도서관에서 AI로 직접 창작하고 그 경험을 다시 독서로 연결하면 세 정책을 하나의 체감 서비스로 구현할 수 있습니다.

### 본문 화면 문구
정책 3축:
1. **모두의 도서관**  
   `‘모두의 도서관’과 ‘도서관 혁신’을 목표로 디지털 문해력 교육과 신기술 서비스 확대 추진`
2. **비독자의 독자 전환**  
   `2028 성인 독서율 목표 50%`
3. **2026 책 읽는 대한민국**  
   `AI 시대에 사유의 힘을 기른다는 취지로 ‘책 읽는 대한민국’ 캠페인 선포`

중앙 교집합:
**공공도서관 AI 동화 창작**

### 레이아웃
3개의 큰 정책 원이 중앙의 `AI 동화 창작`으로 겹치는 Venn/Convergence 구조


### 배경 미디어
- **배경 영상 사용 가능**
- 읽기와 창작이 순환되는 도서관 장면의 잔잔한 루프 영상 배경
- 중앙 정책 도식이 우선 보이도록 저채도·저명암 처리
### 애니메이션
- 3개 원이 화면 바깥에서 진입
- 중앙에서 10% 확대되며 겹침
- `50%`는 별도 숫자 Badge로 Count-up

### Higgsfield 보조 영상 프롬프트
`Slow cinematic sequence inside a Korean public library: a reader closes a book, begins drafting a personal story on a tablet, then walks to a bookshelf to choose another book, emphasizing a cycle between reading and creating, natural light, gentle camera movement, authentic public library environment, diverse age representation, no text, no logos, seamless 7 second loop`

---

# Slide 06 — 법·제도와 서비스 기능
**Chapter:** Ⅰ. 정책환경  
**원문 기준:** [5] 법·제도 — 정책 요구와 서비스 기능의 연결

### 제목
**정책 요구 5가지를 서비스 기능 5가지로 연결합니다**

### 거버닝 메시지
올해 1월 시행된 디지털포용법은 누구나 배제 없이 AI의 혜택을 누리는 환경을, AI 기본법은 AI 활용 교육과 취약계층 접근 보장을 국가와 지자체의 책무로 두었습니다. 정부의 디지털포용법과 AI기본법을 가장 잘 적용할 수 있는 것이 공공도서관의 AI창작서비스입니다.

### 본문 화면 문구
| 정책 요구 | 서비스 기능 |
|---|---|
| 비독자 전환 | **짧고 성취감 있는 창작 경험** |
| 생애주기별 독서 | **세대별 프로그램** |
| 디지털 문해력 | **AI를 쓰고·검토하고·고치는 경험** |
| 디지털 포용 | **도서관을 통한 접근 보장** |
| 신뢰 기반 AI | **AI 표시·사람의 검토·권리 보호** |

하단: **“정책 언어를 시민의 행동으로 바꾸는 연결 장치”**

### 레이아웃
왼쪽 5개 정책 카드 → 중앙 연결선 → 오른쪽 5개 기능 카드


### 배경 미디어
- **배경 영상 사용하지 않음**
- 5×5 매핑 정보그래픽 중심
- 배경은 종이 질감 또는 단색 그라데이션
### 애니메이션
각 행이 1개씩 연결되며 중앙 선이 Draw. 마지막에 5개 선이 하나의 책 아이콘으로 수렴.

### Higgsfield 이미지
별도 생성 이미지 없이 정보그래픽 중심. 배경에 종이 질감/책 페이지를 CSS로만 구현.

---

# Slide 07 — 목표와 현실의 격차
**Chapter:** Ⅱ. 현장 문제  
**원문 기준:** [6] 성인 독서율 38.5%

### 제목
**성인 독서율 38.5% — 목표와 현실의 간격이 커지고 있습니다**

### 거버닝 메시지
정책 목표는 2028년 성인 독서율 50%지만, 2025년 성인 독서율은 38.5%로 제시되어 있습니다. 세대와 도서관 이용에서도 큰 격차가 나타나기 때문에 기존 방식만으로는 비독자를 다시 독서로 끌어들이기 어렵습니다.

### 본문 화면 문구
Hero Number:
**38.5%** `2025 성인 독서율`

Goal:
**50%** `2028 목표`

Gap:
**11.5%p** `현재 목표 격차`

세대:
- **75.3%** `20대`
- **14.4%** `60세 이상`
- 약 **5.2배** 차이 *(제시 수치 단순비율)*

도서관 이용:
- **84.0%** `학생`
- **13.8%** `성인`
- **70.2%p** 차이 *(제시 수치 단순차)*

### 레이아웃
- 왼쪽 60%: 2013~2025 추이 차트 영역 + 2028 50% 점선
- 오른쪽 40%: 세대/도서관 이용 Gap Cards
- 연도별 원자료가 없으면 추이선을 임의로 만들지 말고, `38.5 → 50` Goal Gap 형태로 대체


### 배경 미디어
- **정적 배경 권장**
- 수치 비교와 Gap 시각화가 핵심이므로 영상 사용 시에도 매우 약한 분위기 보조 수준으로 제한
### 애니메이션
- 38.5 카운트업
- 50% 목표선이 위에서 내려옴
- 두 값 사이에 11.5%p 브래킷 표시
- 75.3/14.4, 84.0/13.8의 막대가 대비되며 등장

### Higgsfield 보조 이미지 프롬프트
`Documentary photograph of an almost empty adult reading area in a modern Korean public library contrasted with an active student reading zone in the distance, subtle and respectful, not depressing, natural daylight, architectural realism, wide composition designed to support data overlays, no readable text, no logos, no watermark`

---

# Slide 08 — 정책 공백
**Chapter:** Ⅱ. 현장 문제  
**원문 기준:** [7] 정책 공백

### 제목
**도서관의 강점은 충분합니다. 빠진 것은 ‘창작으로 이어지는 연결 장치’입니다**

### 거버닝 메시지
AI창작서비스는 시민을 보다 능동적 창작자로 바꾸고, 공공도서관에서 AI를 안전하고 반복 가능한 프로그램으로 운영할 표준 연결 장치가 될 것입니다.

### 본문 화면 문구
중앙: **MISSING LINK**

4개 공백:
1. `프로그램 이후`  
   **다음 행동으로 이어지지 않음**
2. `창작 장벽`  
   **글쓰기·그림 기술이 참여층을 제한**
3. `민간 AI 격차`  
   **비용·기기·안전·역량을 개인에게 전가**
4. `운영 도구 부재`  
   **사서가 활용할 표준 관리도구 부족**

하단: **AI 시민 동화책 플랫폼 = 네 가지 공백을 잇는 운영형 서비스**

### 레이아웃
4개의 섬이 중앙의 끊어진 다리를 둘러싼 구조 → 마지막에 다리가 완성


### 배경 미디어
- **정적 또는 미세 루프 배경 권장**
- 연결장치 부재를 상징하는 메타포형 보조 배경 가능
- 카드 정보가 우선
### 애니메이션
- 4카드가 순차 등장
- 중앙 Broken Line
- 마지막에 연결선이 이어지며 `플랫폼` 레이어 등장

### Higgsfield 보조 이미지 프롬프트
`Metaphorical editorial scene inside a public library: four separate activity areas for reading, writing, digital access, and librarian support, visually disconnected at first, with a subtle pathway converging toward one shared creative table, realistic architectural photography, warm public-service tone, no futuristic interface, no text, no logos`

---

# Slide 09 — 서비스 5단계
**Chapter:** Ⅲ. 서비스 구조  
**원문 기준:** [9] 기획부터 실물 출판까지 5단계

### 제목
**아이디어에서 실물 책까지, 시민이 5단계로 직접 완성합니다**

### 거버닝 메시지
AI가 클릭 한 번으로 책을 대신 만드는 서비스가 아닙니다. 시민이 매 단계에서 읽고, 선택하고, 고치며 자신의 이야기를 완성하고, 글·그림·낭독·실물 출판까지 하나의 창작 경험으로 이어갑니다.

### 본문 화면 문구
1. **기획**  
   `키워드 · 줄거리 메모`
2. **글 다듬기**  
   `AI 질문 → 시작·사건·결말`
3. **그림 그리기**  
   `수채화 · 클레이 · 동양화`
4. **오디오북**  
   `내 목소리로 낭독`
5. **실물 출판**  
   `인쇄·제본 연계`

Hero Badge:
**1~5분** `한 권 제작 과정`

핵심:
**AI 생성 → 사람의 선택 → 수정 → 완성**

### 레이아웃
- 가로 5단계 Story Rail
- 각 단계는 카드가 아니라 책 페이지가 한 장씩 넘어가는 구조
- 1~5분은 상단 우측의 큰 Badge


### 배경 미디어
- **배경 영상 사용 권장**
- 기획→글→그림→오디오→실물책으로 이어지는 변환형 영상 또는 단계형 장면 영상 사용
- 5단계 인터랙션과 충돌하지 않도록 중앙 또는 하단 중심 구도
### 인터랙션
- 장표 진입 후 1→5단계가 **자동으로 순차 활성화**
- 활성 단계의 Mock UI가 12~18% 확대되며 다음 단계로 자연스럽게 이동
- 발표자는 별도 클릭 없이 전체 5단계 흐름을 확인할 수 있음
- 각 단계를 Hover하면 해당 단계 설명을 다시 강조하는 보조 인터랙션만 제공

### 애니메이션
키워드가 문장으로, 문장이 그림으로, 그림이 음성 Waveform으로, 마지막에 3D 책 Mockup으로 변환되는 Morph 느낌

### Higgsfield 영상 프롬프트
`Elegant transformation sequence showing a handwritten story idea on paper becoming a refined digital story page, then an illustrated children's-book spread, then a voice waveform recording moment, finally a beautifully printed physical picture book being held in two hands, warm Korean library environment, tactile paper and ink detail, smooth match cuts, realistic cinematic style, 7 seconds, no readable text, no logos, no watermark`

---

# Slide 10 — 공공도서관 전용 설계
**Chapter:** Ⅲ. 서비스 구조  
**원문 기준:** [10] 공공도서관 전용 설계

### 제목
**개인용 AI 동화 서비스가 아니라, 공공도서관 운영을 기준으로 설계합니다**

### 거버닝 메시지
조사한 국내외 AI 동화 서비스 다수는 개인 구독을 중심으로 설계되어 있습니다. 공공도서관용 플랫폼은 시민 안전, 실물 결과물, 사서의 운영·통계를 하나의 관리 체계로 묶어야 실제 공공서비스로 운영할 수 있습니다.

### 본문 화면 문구
상단 Badge:
**20여 종 조사** `대부분 개인 구독형`

3대 설계:
1. **안전한 생성**
   - 입력·생성 2단계 유해성 필터
   - AI 생성물 표시
2. **결과물의 실체화**
   - 다양한 형태의 실물책 제작 연계
3. **사서 운영도구**
   - AI 토큰
   - 결과물 관리
   - 이용 통계

### 레이아웃
- 중앙에 `LIBRARY MODE` 형태의 큰 운영 허브
- 3개의 모듈이 허브와 연결
- 오른쪽 1/3에 관리자 Dashboard Mockup


### 배경 미디어
- **선택적 배경 영상 사용 가능**
- 사서 운영 장면과 시민 이용 장면을 보여주는 잔잔한 루프 영상 또는 정적 이미지
- 관리자 Mockup이 주인공이므로 배경은 보조 역할
### 애니메이션
개인용 서비스 카드들이 뒤로 사라지고 `공공도서관 운영 레이어`가 앞으로 펼쳐짐

### Higgsfield 이미지 프롬프트
`Professional public-library service desk in Korea with a librarian calmly managing a digital dashboard while citizens use creative story stations in the background, secure and trustworthy atmosphere, realistic interface screens intentionally blurred and unreadable, warm modern library interior, documentary commercial photography, no text, no logos, no watermark`

---

# Slide 11 — 어린이·청소년
**Chapter:** Ⅳ. 생애주기별 활용  
**원문 기준:** [11]

### 제목
**내 이야기를 만든 경험이 ‘다른 책도 읽어보고 싶다’는 호기심으로 이어집니다**

### 거버닝 메시지
어린이와 청소년에게 독서를 먼저 요구하기보다 자신의 하루를 주인공이 되어 만들어보게 합니다. 아이디어가 활자와 삽화로 완성되는 창작 효능감은 다른 작가의 표현 방식에 대한 호기심을 만들고 관련 도서 대출로 이어질 수 있습니다.

### 본문 화면 문구
**내 이야기 만들기 → 완성의 성취감 → “다른 작가는 어떻게 썼을까?” → 관련 도서 대출**

Callout:
**“오늘 네가 겪은 하루를, 네가 주인공이 되어 책으로 만들어 볼까?”**

### 레이아웃
- 좌: 아이가 만든 그림/낙서
- 중: AI 동화책 Mockup
- 우: 서가에서 관련 책을 고르는 장면
- 3컷 Comic Sequence처럼 연결


### 배경 미디어
- **배경 영상 사용 권장**
- 아이의 낙서가 그림책과 도서 대출로 이어지는 장면 영상 배경
- 3컷 구조를 방해하지 않는 좌→우 진행형 구도 사용
### 애니메이션
낙서가 페이지 일러스트로 변환 → 책 표지가 닫힘 → 같은 색상 라인이 실제 서가의 책으로 이동

### Higgsfield 영상 프롬프트
`A Korean child in a public library sketches a playful character, watches the drawing become part of a picture-book style page on a tablet, then walks excitedly to a bookshelf and chooses a related book, warm natural light, authentic expressions, educational but not staged, gentle camera tracking, 7 second cinematic sequence, no readable text, no logos`

---

# Slide 12 — 청년·직장인
**Chapter:** Ⅳ. 생애주기별 활용  
**원문 기준:** [12]

### 제목
**퇴근 후 도서관이 ‘나만의 이야기를 만드는 감성 커뮤니티’가 됩니다**

### 거버닝 메시지
청년과 직장인에게 도서관을 공부하는 공간만으로 남겨두지 않고, 퇴근 후 자신의 반려동물·꿈·고민을 동화의 은유로 풀어내는 창작 프로그램으로 확장합니다. 야간 문화강좌와 결합하면 성인 이용자가 도서관으로 다시 들어오는 새로운 이유가 생깁니다.

### 본문 화면 문구
프로그램 예시:
- `퇴근 후 도서관`
- **나만의 힐링 동화 만들기**
- `일상 → 은유 → 이야기 → 한 권의 책`

참여 소재:
`반려견` · `소소한 꿈` · `오늘의 고민`

결론:
**공부방 → 감성 커뮤니티 거점**

### 레이아웃
도서관의 낮/밤을 Split-screen으로 보여주고, 밤 화면에서 창작 테이블이 활성화


### 배경 미디어
- **배경 영상 사용 권장**
- 퇴근 후 저녁 도서관의 따뜻한 분위기와 창작 모임 장면 영상 배경
### 애니메이션
- 배경 시간대가 낮→저녁으로 Time-lapse
- 직장인의 가방/노트북이 놓이고 책 제작 UI가 켜짐
- 3개 소재 키워드가 작은 일러스트 카드로 변환

### Higgsfield 영상 프롬프트
`Evening in a contemporary Korean public library after work hours, a small group of young professionals and office workers sit around a warm table creating personal illustrated stories, one person smiles at a story inspired by a pet dog, another reflects quietly, cozy community atmosphere, cinematic practical lighting, realistic and emotionally warm, slow handheld camera, 7 second loop, no text, no logos`

---

# Slide 13 — 부모·양육자
**Chapter:** Ⅳ. 생애주기별 활용  
**원문 기준:** [13]

### 제목
**아이의 낙서와 한마디가 세상에 하나뿐인 가족 그림책이 됩니다**

### 거버닝 메시지
부모와 아이가 함께 자녀의 말과 그림을 고르고 AI로 다듬어 한 권의 가족 그림책을 완성합니다. 가족에게는 함께 만든 기록이 남고, 도서관에는 주말에 성인 양육자가 다시 들어오는 새로운 이용 접점이 생깁니다.

### 본문 화면 문구
**아이의 말 + 낙서 + 부모의 선택 + AI 보조 = 가족 그림책**

장면:
`주말 오전, 부모와 아이가 나란히 한 권을 완성`

효과:
- `함께 만든 가족 기록`
- `부모의 도서관 재방문`
- `아이에게는 창작 경험`

### 레이아웃
Before/After Slider:
- Before: 크레파스 낙서
- After: 완성된 그림책 펼침면


### 배경 미디어
- **정적 배경 또는 보조 영상 사용 가능**
- 부모와 아이가 함께 책을 만드는 장면을 정적 이미지로 두고, 필요 시 매우 약한 배경 루프를 추가
### 애니메이션
장표 진입 시 Slider가 **2.5초 동안 자동으로 이동**해 낙서 → 완성 페이지 변화를 먼저 보여준다. 이후 최종 상태에서 멈추며, 사용자가 원할 경우에만 드래그로 다시 비교할 수 있다.

### Higgsfield 이미지 프롬프트
`Warm weekend morning in a Korean public library, parent and young child sitting side by side, the child showing a simple crayon doodle while the parent helps turn it into a beautiful family picture book on a tablet, affectionate but natural interaction, soft daylight, paper and crayon textures, editorial lifestyle photography, no readable text, no logos`

---

# Slide 14 — 노년층
**Chapter:** Ⅳ. 생애주기별 활용  
**원문 기준:** [14]

### 제목
**자판이 아니라 목소리로 시작하면, 어르신의 삶도 한 권의 동화가 됩니다**

### 거버닝 메시지
기기가 낯선 어르신도 자신의 기억을 말로 들려주는 것부터 시작할 수 있습니다. 구술을 그림동화로 정리해 손주에게 전하면 디지털 접근 경험, 기억을 되짚는 활동, 세대 간 대화를 한 번에 만드는 프로그램이 됩니다.

### 본문 화면 문구
**말한다 → AI가 정리한다 → 그림동화로 만든다 → 손주에게 전한다**

Hero Quote:
**“내가 살아온 이야기를 책으로 쓰면 수십 권이지.”**

3가지 가치:
- `디지털 접근`
- `기억을 되짚는 활동`
- `세대 간 소통`

### 레이아웃
왼쪽 어르신 구술 장면 → 중앙 음성 Waveform → 오른쪽 완성책을 손주가 함께 보는 장면


### 배경 미디어
- **배경 영상 사용 권장**
- 어르신의 구술이 그림책이 되고 손주에게 전달되는 장면 영상 배경
### 애니메이션
Waveform이 문장 Line으로 바뀌고 → 그림 페이지의 선으로 이어짐 → 책을 건네는 장면으로 전환

### Higgsfield 영상 프롬프트
`An elderly Korean person in a quiet public library tells a life memory naturally into a simple tablet microphone, the scene transitions to a warm illustrated picture book being created, then the elderly person shares the finished physical book with a grandchild, intergenerational warmth, respectful documentary realism, soft daylight, gentle camera movement, 8 seconds, no text, no logos, no watermark`

---

# Slide 15 — 왜 정부·도서관·동화인가
**Chapter:** Ⅴ. 도입 타당성과 공공적 가치  
**원문 기준:** [15]

### 제목
**왜 정부가, 왜 도서관이, 왜 ‘동화’여야 합니까?**

### 거버닝 메시지
정부는 시장에서 배제될 수 있는 시민에게 안전한 기본 접근을 보장하고, 도서관은 전 생애 시민이 평가 부담 없이 AI를 경험할 수 있는 가장 가까운 공공문화 공간입니다. 동화는 짧은 서사·그림·낭독을 결합해 처음 창작하는 사람도 시작하기 쉬운 형식입니다.

### 본문 화면 문구
Q1 **왜 정부가?**  
`비용·기기·역량·연령 때문에 시장에서 배제되는 시민에게 안전한 기본 접근 보장과 독서 정책과 연결`

Q2 **왜 도서관이?**  
`아동부터 은퇴자까지 전 생애가 자발적으로 참여하는 공공문화 공간, 모든 세대가 안전하게 AI를 처음 경험할 수 있는 가장 가까운 공공기관`

Q3 **왜 동화가?**  
`짧은 서사 + 그림 + 낭독 = 낮은 창작 진입장벽`

하단:
**공공성 × 접근성 × 쉬운 창작 형식**

### 레이아웃
3개의 대형 질문 카드. 장표 진입 후 질문 1→2→3의 답변이 자동으로 순차 노출되며, 최종적으로 세 답변이 모두 보이는 상태에서 멈춘다.


### 배경 미디어
- **정적 배경 권장**
- 질의응답 구조가 핵심이므로 Blur 처리된 도서관 실사 배경 정도만 사용
### 애니메이션
카드 Flip 느낌의 자동 Reveal을 사용하되 실제 클릭은 요구하지 않는다. 질문 1, 2, 3이 약 0.7초 간격으로 순차 오픈되고 최종 상태를 유지한다. Hover 시 해당 카드만 3~4% 확대.

### Higgsfield 이미지
정보구조 자체가 핵심이므로 배경은 도서관 실사 Still을 15% Blur 처리하여 사용.

---

# Slide 16 — 공공적 가치 7가지
**Chapter:** Ⅴ. 도입 타당성과 공공적 가치  
**원문 기준:** [16]

### 제목
**한 개의 창작 서비스가 7개의 공공가치를 동시에 만듭니다**

### 거버닝 메시지
AI 동화책 창작은 단순한 체험 프로그램이 아니라 독서문화, 디지털 포용, AI 리터러시, 지역문화 기록, 세대 연결, 문화격차 해소, 공동체 소속감을 한 서비스 안에서 연결합니다. 이 7개 가치는 앞서 본 국가·도서관 정책의 방향과 겹칩니다.

### 본문 화면 문구
중앙: **공공도서관**

주변 7개 가치:
1. **독서문화 진흥** — 창작이 독서를 끌고 옴
2. **디지털 포용** — 도서관에서 누구나 AI 접근
3. **AI 리터러시** — 쓰고·검토하고·고치는 경험
4. **지역문화 기록** — 마을과 이웃의 이야기를 축적
5. **세대 간 소통** — 어르신의 이야기가 손주의 책으로
6. **문화격차 해소** — 지역에 관계없이 같은 서비스
7. **공동체 소속감** — 내 책이 꽂힌 도서관

### 레이아웃
Radial Orbit 7개 노드. 중앙 도서관이 각 가치와 연결.


### 배경 미디어
- **정적 배경 기본**
- 7개 가치 Orbit이 주인공이며, 필요 시 공동체성 분위기의 매우 잔잔한 영상 또는 정적 이미지 허용
### 애니메이션
- 중앙 도서관 고정
- 7개 노드가 시계방향으로 100ms 간격 등장
- 마지막에 모든 연결선이 동시에 밝아짐
- Hover 시 관련 생애주기 장면 Thumbnail을 표시할 수 있으나, 핵심 7개 가치와 설명은 장표 진입만으로 모두 확인 가능해야 함

### Higgsfield 보조 이미지 프롬프트
`A symbolic yet realistic overhead scene of a circular community table inside a Korean public library, child, young adult, parent, librarian and senior all participating in different forms of reading and story creation, books and paper radiating outward like a community network, warm natural light, balanced symmetrical composition for radial infographic overlay, no text, no logos`

---

# Slide 17 — 도서관 지표 개선
**Chapter:** Ⅵ. 도서관 지표 개선  
**원문 기준:** [17]

### 제목
**한 번의 체험을 재방문·행사·지역 아카이브로 확장합니다**

### 거버닝 메시지
시민은 창작·수정·인쇄 확인을 위해 한 번이 아니라 여러 번 도서관을 찾고, 완성된 책은 전시회와 공모전의 콘텐츠가 됩니다. 결국 시민은 독서 수혜자에서 지역 이야기를 기록하는 시민 작가로 전환되고, 도서관에는 고유한 지역자료가 축적됩니다.

### 본문 화면 문구
Hero Metric:
**3~4회** `창작 → 수정 → 인쇄 확인을 위한 재방문`

성과 3축:
1. **재방문**
   - 창작
   - 수정
   - 인쇄 확인
2. **행사**
   - 우리 동네 시민 작가 전시회
   - 전국 도서관 AI 그림책 공모전
3. **시민 작가·지역 아카이브**
   - `연간 지역자료 ○○○권`
   - 실제 사업계획 확정 후 숫자 입력

하단:
**장서 + 사서 + 공간 + 지역 네트워크 → AI 경험의 공공재화**

### 수치화 규칙
- `○○○권`은 임의 숫자를 생성하지 않는다.
- 구현 시 `annualArchiveCount`를 데이터 변수로 분리하고 값이 없으면 `○○○권` 또는 `TBD`로 표시한다.
- 필요 시 시나리오 계산식만 별도로 제공:
  `연간 참여자 수 × 완성률 = 연간 지역자료 예상치`
  단, 가정값은 본 발표 화면에 넣지 않는다.

### 레이아웃
- 왼쪽: 1회 → 2회 → 3회 → 4회 방문 Timeline
- 중앙: 완성책에서 전시/공모전으로 갈라지는 Branch
- 오른쪽: 지역 아카이브 서가가 책으로 채워지는 Animation


### 배경 미디어
- **배경 영상 사용 권장**
- 시민의 재방문, 전시, 지역 아카이브 축적을 보여주는 장면 영상 배경
### 애니메이션
방문 횟수 Dot가 하나씩 점등 → 책이 전시장 벽으로 이동 → 마지막에 가상 서가에 책 Spine이 축적

### Higgsfield 영상 프롬프트
`A civic storybook created in a Korean public library moves through three real-world moments: the citizen returns to revise it, the finished book appears in a small community exhibition, then multiple citizen-made books are respectfully archived on a dedicated local-history shelf, realistic cinematic transitions, warm public cultural atmosphere, 8 seconds, no readable text, no logos, no watermark`

---

# Slide 18 — 마무리
**원문 기준:** [18]

### 제목
**지식의 보관소에서, 시민 상상력의 발원지로**

### 거버닝 메시지
이 제안은 이미 수립된 AI·독서·도서관·디지털 포용 정책을 시민이 직접 체감하는 창작 경험으로 바꾸는 사업입니다. AI가 동화를 대신 쓰는 것이 아니라 시민이 읽고, 질문하고, 고쳐서 자기 책을 완성하게 만드는 것이 핵심입니다.

### 본문 화면 문구
세 문장 요약:
1. **정책을 시민이 체감하는 서비스로**
2. **AI가 대신 쓰는 것이 아니라, 시민이 직접 창작하도록**
3. **관심의 첫 입구를 ‘내 책 한 권’과 다시 독서로 연결**

Final Statement:
**“과거 도서관이 지식의 보관소였다면, 오늘의 도서관은 시민의 상상력이 책이 되는 발원지여야 합니다.”**

CTA:
**이어서 실제 서비스 시연으로 보여드리겠습니다.**

### 레이아웃
- 중앙 3문장 → 마지막 문장만 72px로 확대
- 배경은 서가의 책들이 빛의 종이 조각으로 변해 중앙의 한 권으로 모이는 영상
- 우하단 `DEMO →` 버튼/클리커 포커스


### 배경 미디어
- **배경 영상 사용**
- 서가의 책들이 한 권의 열린 책으로 모이는 상징적 클로징 영상 배경
- 마지막 문장에 집중되도록 중앙 하단으로 시선이 모이는 구도
### 장면전환/애니메이션
- 3문장 순차 등장
- 마지막 문장 등장 시 나머지 2문장은 투명도 35%로
- `DEMO →` 클릭 시 발표 자료 종료가 아니라 별도 서비스 URL/로컬 데모 페이지로 전환
- 뒤로가기 시 Slide 18 상태 보존

### Higgsfield 영상 프롬프트
`Poetic cinematic closing shot in a modern Korean public library: shelves full of books, subtle paper-like particles and warm light gently converge toward one open blank picture book on a wooden table, symbolizing citizens' imagination becoming books, elegant slow camera push-in, hopeful public-cultural tone, realistic materials, warm daylight, seamless 8 second loop, no text, no logos, no watermark`

---


# 19. 디바이스 및 해상도 지원 범위

- **모바일은 지원하지 않는다.**
- 스마트폰/태블릿용 세로형 재배치, 터치 전용 UI, Swipe Navigation은 구현 대상에서 제외한다.
- 지원 대상:
  - 1920×1080 Full HD 발표 화면 — 최우선
  - 2560×1440 QHD — 확대 대응
  - 1366×768 노트북 — 최소 지원 해상도
  - 16:10 노트북 — Letterbox/여백 조정 방식으로 대응
- 화면비가 달라도 콘텐츠 구조를 세로로 재배치하지 않고 **16:9 프레젠테이션 캔버스를 유지**한다.
- 1024px 미만 Viewport에서는 발표 화면 대신 `PC 발표 환경에서 열어주세요` 안내만 표시해도 된다.

# 20. 출처 표기 및 검증 상태


발표 화면 하단의 출처는 작은 각주로 노출하고, 별도의 `sources` 데이터 파일에서 관리한다.

원고에 명시된 출처:
- 대한민국 인공지능 행동계획(2026~2028)
- 제4차 도서관발전종합계획(2024~2028)
- 제4차 독서문화진흥 기본계획(2024~2028)
- 2026 책 읽는 대한민국 캠페인
- 2025년 국민 독서실태조사 보도자료
- 도서관 이용 경험 관련 보도
- 민음사 문학빵 판매 사례
- 디지털포용법 / AI 기본법

**중요:** 원고 자체에 `제4차 독서문화진흥 기본계획 2028년 50% 목표 [원문 확인]`, `디지털포용법·AI 기본법 [조문 확인]` 표시가 있으므로, 외부 배포본을 만들기 전 해당 문구와 출처는 원문 대조가 필요하다.

---

# 21. 권장 미디어 자산 목록

- 아래 자산은 **모두 Higgsfield로 제작**한다.
- 실제 사례 출처 이미지 사용이 필요한 경우도 최종 발표용 배경/보조 자산은 Higgsfield 제작 원칙에 맞춰 대체 또는 보완한다.

| 파일명 예시 | 장표 | 유형 | 생성/수급 |
|---|---:|---|---|
| `s01_library_generations.mp4` | 1 | 영상 | Higgsfield |
| `s02_library_creation.jpg` | 2 | 이미지 | Higgsfield |
| `s03_literature_bread_real.jpg` | 3 | 실제 사례 | 공식/보도 이미지 우선 |
| `s04_civic_ai.jpg` | 4 | 이미지 | Higgsfield |
| `s05_read_create_cycle.mp4` | 5 | 영상 | Higgsfield |
| `s07_reading_gap.jpg` | 7 | 이미지 | Higgsfield |
| `s09_five_steps.mp4` | 9 | 영상 | Higgsfield |
| `s10_librarian_dashboard.jpg` | 10 | 이미지 | Higgsfield |
| `s11_child_read_create.mp4` | 11 | 영상 | Higgsfield |
| `s12_afterwork_library.mp4` | 12 | 영상 | Higgsfield |
| `s13_family_book.jpg` | 13 | 이미지 | Higgsfield |
| `s14_senior_story.mp4` | 14 | 영상 | Higgsfield |
| `s16_community_circle.jpg` | 16 | 이미지 | Higgsfield |
| `s17_library_archive.mp4` | 17 | 영상 | Higgsfield |
| `s18_imagination_origin.mp4` | 18 | 영상 | Higgsfield |

---

# 22. 발표 흐름 요약

**관심의 입구**  
문학빵 → 일상 속 문학 접점

**정책적 이유**  
AI 기본사회 + 모두의 도서관 + 비독자의 독자 전환 + 디지털 포용

**현장의 문제**  
성인 독서율 38.5% + 세대·이용 격차 + 창작 연결장치 부족

**서비스 해법**  
5단계 시민 창작 + 공공도서관 운영 설계

**생애주기 활용**  
어린이 → 직장인 → 부모 → 어르신

**공공적 타당성**  
정부·도서관·동화의 이유 + 7대 공공가치

**성과**  
재방문 3~4회 + 시민 작가 + 지역 아카이브

**결론**  
읽는 도서관을 넘어 시민 상상력이 책이 되는 도서관


---

# PART Ⅱ — AI 동화 제작 서비스의 독서 활성화 방안 (Slide 19~25)
**원문 기준:** `reading-activation-16x9.html` (수치 없음 · 방안·구조 설명만) · 챕터 라벨 `PART Ⅱ · 독서 활성화 방안`
**배경 미디어:** 없음 (CSS/SVG 서가 배경) — 필요 시 `media/s19_~s26_` 규칙으로 추가

## Slide 19 — 표지 (hero)
- 상단: `대체` (취소선) → `확장` 배지
- 제목 **AI 동화 제작 서비스의 독서 활성화 방안**
- 거버닝: AI 동화책 서비스는 독서를 대체하는 것이 아니라, **독서의 진입장벽을 낮추고 독서 행동을 확장하는 도구**입니다.
- 하단 4개 키: 1 시작하게 한다 · 2 읽기를 만들기로 · 3 혼자에서 함께로 · 4 도서관 프로그램으로

## Slide 20 — ① 시작하게 한다 — 독서의 진입장벽을 낮춥니다 (2×2 카드)
- 거버닝 메시지는 줄바꿈 없이 한 줄로 노출 (`.slide[data-id="20"] .gov{white-space:nowrap}`)
관심사 맞춤 이야기 · 연령·수준별 콘텐츠 · 음성 낭독 · 다국어 동화책 (각 요약 1줄 + 근거 2개, 클릭 없이 모두 노출)

## Slide 21 — ② 읽기를 만들기로 바꿉니다 (순환)
- 좌: 원형 궤도 4노드 `이야기 생성 → 삽화 생성 → 완성된 책 읽기 → 다시 만들기`, 중앙 `창작 ↔ 독서 · 반복되는 순환`
- 우: `수동적 ‘읽기’에서 능동적 ‘참여’로` 카드 + 4단계 설명 리스트 (노드와 2.2초 간격으로 동기 점등 · 모션 최소화 시 전체 점등)

## Slide 22 — ③ 혼자 읽기에서 함께 읽기로 (2 카드, 세로형)
가족이 함께 만드는 동화책 · 자신이 만든 책의 소장 / 하단 칩: 개인 활동 → 가족 문화 | 한 번 읽는 콘텐츠 → 반복해 읽는 소장품

## Slide 23 — ④ 도서관 프로그램으로 확장합니다 (3 카드, 세로형)
방문 목적 전환 · 참여율과 지속성 · 관심 낮은 어린이의 통로 / 하단 칩: AI가 재미있어서 참여 → 이야기가 궁금해서 읽음 → 다른 책도 찾아봄

## Slide 24 — 어린이실에서 달라지는 것 (도입 전/후)
좌 `도입 전 · 대출 중심의 이용` 4행 ↔ 우 `도입 후 · 창작·독서 체험으로 확장` 4행, 행 단위로 순차 등장

## Slide 25 — 읽기를 대신하지 않고, 읽기로 데려갑니다 (hero · 마무리)
- 상단 3단 흐름: AI가 재미있어서 참여하고 → 이야기가 궁금해서 읽고 → 그래서 다른 책도 찾아보게
- 최종 문장 **읽기를 대신하지 않고, 읽기로 데려갑니다.** + `AI 동화책 서비스가 도서관에서 맡는 역할은 여기까지입니다.`
- DEMO 버튼 (Enter) — 시연 종료 시 시연을 연 장표(18 또는 25)로 복귀
