# AI 시민 동화책 제작 플랫폼
## 장표별 Higgsfield 이미지·영상 프롬프트 문서

- 기준 문서:
  - `AI시민동화책_공공도서관_발표멘트_최종.md`
  - `AI시민동화책_인터랙티브HTML_화면설계서.md`
  - `AI시민동화책_인터랙티브HTML_작업지시서_PRD.md`
- 목적: 공공도서관 발표용 인터랙티브 HTML의 **장표별 배경 영상 및 보조 이미지**를 Higgsfield로 제작하기 위한 프롬프트 세트
- 원칙:
  - **모든 영상과 이미지는 Higgsfield로 제작**
  - 모든 텍스트·수치·출처는 HTML/SVG 레이어로 올리고, 생성 미디어 안에는 넣지 않음
  - 발표는 **PC/프로젝터 16:9** 전용
  - 배경 영상은 **무음·자동재생·루프**
  - 패럴랙스 사용 안 함
  - 인터랙션은 풍부하되 발표자가 장표 내부에서 반복 클릭하지 않도록 설계

---

# 0. 공통 생성 가이드

## 0-1. 공통 스타일 방향
- 공공기관 발표에 맞는 **신뢰감 60% + 동화적 따뜻함 40%**
- 너무 미래적이거나 과장된 AI 시각효과는 지양
- 한국 공공도서관 맥락이 자연스럽게 느껴지는 공간과 사람
- 실사 기반의 다큐멘터리·시네마틱 톤
- 과장된 광고 모델 컷보다 **실제 시민의 자연스러운 표정과 행동**
- 나무·종이·책·자연광의 질감 강조
- 어린이, 청년, 부모, 노년층이 모두 존중감 있게 표현될 것

## 0-2. 모델 기본값
### 이미지
- 권장 모델: `gpt_image_2`
- 비율: `16:9`
- 수량: 1

### 영상
- 권장 모델: `seedance_2_5`
- 비율: `16:9`
- 길이: 5~8초
- 수량: 1

### 복합 장면 전환이 많은 영상
- 필요 시 검토 모델: `kling3_0`

## 0-3. 공통 네거티브 지시문
아래 문구는 이미지/영상 생성 시 공통으로 추가 권장

`no text, no captions, no typography, no logos, no watermark, no poster design, no infographic text, no interface text, no neon cyberpunk, no dystopian mood, no exaggerated holograms, no deformed hands, no extra fingers, no unnatural facial expression, no over-stylized sci-fi environment`

## 0-4. 프롬프트 작성 구조
1. 장면의 주제
2. 공공도서관 맥락
3. 사람의 행동
4. 감정/분위기
5. 카메라 구도
6. 조명
7. 결과 용도(배경 영상/보조 이미지용)
8. 네거티브 지시

---

# Slide 01 — 표지
## 용도
- **배경 영상**
- 발표 시작 화면의 Full-bleed Hero 영상

## 권장 타입
- 영상

## 권장 모델
- `seedance_2_5`

## 권장 비율 / 길이
- `16:9` / 7~8초

## 연출 목표
아이의 상상, 직장인의 일상, 어르신의 기억이 하나의 책으로 연결되는 인트로 영상

## 메인 프롬프트
`Cinematic warm Korean public library at late afternoon, showing three connected citizen moments: a child drawing a story character at a table, a young office worker quietly writing a personal story after work, and an elderly person gently speaking memories into a tablet, intercut as one elegant continuous sequence inside a modern public library, bookshelves, wood textures, paper textures, soft natural daylight, calm and hopeful emotional tone, realistic documentary-cinematic style, subtle dolly movement, ending with an open blank picture book on a wooden library table, full-bleed background video for a public presentation, no text, no logos, no watermark`

## 보조 이미지 프롬프트
`A modern Korean public library hero scene with an open blank picture book on a wooden table, warm daylight, shelves in the background, symbolic feeling that citizens' stories gather into one book, realistic cinematic still image, calm and hopeful, wide composition with clean negative space, no text, no logos, no watermark`

---

# Slide 02 — 읽고 배우는 도서관에서, 시민이 만드는 도서관으로
## 용도
- 배경 영상 또는 보조 배경 이미지

## 권장 타입
- 영상 우선

## 권장 모델
- 영상: `seedance_2_5`
- 이미지: `gpt_image_2`

## 권장 비율 / 길이
- `16:9` / 6~7초

## 연출 목표
기존의 읽는 도서관이 시민이 창작하는 도서관으로 확장되는 분위기 표현

## 메인 영상 프롬프트
`Inside a Korean public library, show a natural transition from reading and studying to creating: people first reading books and browsing shelves, then using a tablet and notebook to shape personal stories together, ending with a scene of a citizen smiling at a finished picture-book page, warm public cultural atmosphere, authentic diverse citizens, natural light, gentle lateral camera movement, realistic documentary-commercial look, designed as a background video for a presentation slide, no text, no logos, no watermark`

## 보조 이미지 프롬프트
`A welcoming Korean public library interior where children, adults, and seniors are reading, discussing, and creating personal stories together with books and tablets, realistic and trustworthy, warm daylight, wood and paper textures, wide composition with clean negative space for presentation text, no readable text, no logos, no watermark`

---

# Slide 03 — 문학을 만나는 입구가 일상으로 넓어졌습니다
## 용도
- 실제 사례 설명용 보조 이미지
- 필요 시 매우 약한 보조 배경 영상

## 권장 타입
- 이미지 우선

## 권장 모델
- 이미지: `gpt_image_2`

## 권장 비율
- `16:9`

## 연출 목표
문학을 ‘고르고 모으고 나누는 경험’이 관심의 입구가 되는 느낌을 상징적으로 표현

## 메인 이미지 프롬프트
`Editorial still life showing a collectible reading-related everyday experience in Korea: a pastry package without branding beside a fan of elegant literary-themed bookmark cards, tactile paper textures, warm neutral light, premium editorial photography, a feeling of choosing, collecting, and sharing cultural objects, wide composition leaving generous space for overlaid presentation statistics, no brand names, no text, no logos, no watermark`

## 선택 영상 프롬프트
`A subtle cinematic tabletop scene in a Korean everyday setting: hands open a simple pastry package, discover a beautiful collectible bookmark card, then place it beside several other cards, communicating curiosity and collecting behavior, soft studio-natural lighting, elegant slow motion feeling, realistic editorial look, 6 second seamless loop, no text, no logos, no watermark`

---

# Slide 04 — AI 3대 강국
## 용도
- 보조 배경 이미지
- 정책 노드 그래픽 뒤에 약하게 깔리는 시각적 배경

## 권장 타입
- 이미지

## 권장 모델
- `gpt_image_2`

## 권장 비율
- `16:9`

## 연출 목표
AI가 시민 모두에게 닿는 공공적 도구라는 인상을 제공

## 메인 이미지 프롬프트
`Conceptual but realistic civic AI scene in South Korea: diverse citizens of different ages using accessible creative technology in a modern public library, subtle visual metaphor of ideas becoming illustrated book pages, inclusive and trustworthy public-service atmosphere, natural daylight, modern but not futuristic, clean wide composition with low visual noise for policy diagram overlay, no text, no logos, no watermark`

---

# Slide 05 — 독서정책과 AI 창작정책이 도서관에서 만납니다
## 용도
- 배경 영상

## 권장 타입
- 영상

## 권장 모델
- `seedance_2_5`

## 권장 비율 / 길이
- `16:9` / 6~7초

## 연출 목표
읽기와 창작이 다시 읽기로 이어지는 순환 장면

## 메인 영상 프롬프트
`Slow cinematic sequence inside a Korean public library: a citizen reads a book, closes it thoughtfully, begins drafting a personal story on a tablet, then walks to a bookshelf and chooses another book, emphasizing a cycle between reading and creating, natural light, warm wood interior, gentle camera movement, authentic public library environment, realistic documentary-cinematic style, seamless 7 second loop, no text, no logos, no watermark`

## 보조 이미지 프롬프트
`A Korean public library scene showing one citizen moving between reading and creating, books, notebook, and tablet arranged naturally, warm quiet atmosphere, realistic photography, wide layout with space for a policy convergence diagram, no text, no logos, no watermark`

---

# Slide 06 — 정책 요구 5가지를 서비스 기능 5가지로 연결합니다
## 용도
- 정보그래픽 중심 장표의 약한 배경 이미지 또는 질감

## 권장 타입
- 이미지 또는 배경 없음

## 권장 모델
- `gpt_image_2` (선택)

## 권장 비율
- `16:9`

## 연출 목표
정책과 기능을 연결하는 공공적·문서적 분위기

## 메인 이미지 프롬프트
`Minimal elegant background inspired by books and paper in a Korean public library, subtle layered paper textures and a clean desk-like public-service atmosphere, neutral and restrained, suitable behind a structured infographic, realistic soft light, extremely low visual distraction, no text, no logos, no watermark`

---

# Slide 07 — 성인 독서율 38.5%
## 용도
- 수치 비교 장표의 보조 배경 이미지

## 권장 타입
- 이미지

## 권장 모델
- `gpt_image_2`

## 권장 비율
- `16:9`

## 연출 목표
학생과 성인 이용의 대비, 성인 독서/도서관 이용 격차의 분위기적 표현

## 메인 이미지 프롬프트
`Documentary-style realistic scene in a Korean public library showing a quiet adult reading area with only a few adults, contrasted with a more active student study and reading area visible in the distance, respectful and neutral tone, not depressing, natural daylight, wide composition designed for large data overlays, no readable text, no logos, no watermark`

---

# Slide 08 — 아이디어에서 실물 책까지, 시민이 5단계로 직접 완성합니다
## 용도
- 배경 영상
- 서비스 5단계의 변환감을 강화하는 핵심 장표 영상

## 권장 타입
- 영상

## 권장 모델
- 기본 `seedance_2_5`
- 복합 전환이 많으면 `kling3_0` 검토

## 권장 비율 / 길이
- `16:9` / 7~8초

## 연출 목표
기획 → 글 → 그림 → 오디오 → 실물책의 흐름을 직관적으로 보여주는 변환형 영상

## 메인 영상 프롬프트
`Elegant transformation sequence showing a handwritten story idea on paper becoming a refined digital story page, then an illustrated children's-book spread, then a voice recording moment with a gentle waveform visual feeling, and finally a beautifully printed physical picture book held in two hands, all within a warm Korean library or creative table environment, tactile paper and ink detail, smooth cinematic match cuts, realistic style, 8 second background video for a presentation, no readable text, no logos, no watermark`

## 보조 이미지 프롬프트
`A five-stage creative process table scene in a Korean public library: story notes, edited manuscript, illustrated page, audio recording, and finished printed picture book visually arranged left to right, elegant overhead composition, warm daylight, realistic editorial photography, no text, no logos, no watermark`

---

# Slide 09 — 공공도서관 운영을 기준으로 설계합니다
## 용도
- 선택적 배경 영상 또는 보조 이미지

## 권장 타입
- 이미지 우선

## 권장 모델
- 이미지: `gpt_image_2`
- 영상: `seedance_2_5` (선택)

## 권장 비율 / 길이
- `16:9` / 6초

## 연출 목표
사서의 운영성과 공공도서관의 안정적 서비스 관리 분위기 표현

## 메인 이미지 프롬프트
`Professional public-library service desk in Korea with a librarian calmly managing a digital dashboard while citizens use creative story stations in the background, secure and trustworthy atmosphere, realistic interface screens intentionally blurred and unreadable, warm modern library interior, documentary commercial photography, wide composition for overlaid management labels, no text, no logos, no watermark`

## 선택 영상 프롬프트
`A calm Korean public library operations scene: a librarian reviews a management screen, glances toward citizens creating storybooks, then returns to the dashboard, emphasizing safe and well-managed public service, realistic and trustworthy, gentle camera movement, 6 second loop, no readable text, no logos, no watermark`

---

# Slide 10 — 어린이·청소년
## 용도
- 배경 영상

## 권장 타입
- 영상

## 권장 모델
- `seedance_2_5`

## 권장 비율 / 길이
- `16:9` / 7초

## 연출 목표
아이의 자기표현이 창작 효능감과 책 대출로 이어지는 장면

## 메인 영상 프롬프트
`A Korean child in a public library sketches a playful character or scene, watches the drawing become part of a picture-book style page on a tablet, then walks excitedly to a bookshelf and chooses a related children's book, warm natural light, authentic expression, educational and emotionally warm, gentle camera tracking from left to right, realistic cinematic style, 7 second loop, no readable text, no logos, no watermark`

## 보조 이미지 프롬프트
`A bright and welcoming Korean public library scene with a child comparing their own drawing to a beautifully illustrated storybook page, then looking toward a bookshelf with curiosity, realistic lifestyle photography, warm and hopeful, no text, no logos, no watermark`

---

# Slide 11 — 청년·직장인
## 용도
- 배경 영상

## 권장 타입
- 영상

## 권장 모델
- `seedance_2_5`

## 권장 비율 / 길이
- `16:9` / 7초

## 연출 목표
퇴근 후 도서관에서 감성적 창작 커뮤니티가 형성되는 장면

## 메인 영상 프롬프트
`Evening in a contemporary Korean public library after work hours, a small group of young professionals and office workers gather around a warm table creating personal illustrated stories, one person smiles at a pet-inspired story, another reflects quietly while writing, cozy community atmosphere, practical evening lighting, realistic and emotionally warm, slow cinematic camera movement, 7 second loop, no text, no logos, no watermark`

## 보조 이미지 프롬프트
`A cozy after-work Korean public library program scene with young adults creating personal storybooks together at a shared table, soft evening lighting, books and notebooks, realistic lifestyle editorial style, no text, no logos, no watermark`

---

# Slide 12 — 부모·양육자
## 용도
- 보조 이미지 또는 약한 배경 영상

## 권장 타입
- 이미지 우선

## 권장 모델
- 이미지: `gpt_image_2`

## 권장 비율
- `16:9`

## 연출 목표
아이의 낙서와 부모의 참여가 가족 그림책으로 완성되는 장면

## 메인 이미지 프롬프트
`Warm weekend morning in a Korean public library, a parent and young child sit side by side, the child proudly shows a simple crayon doodle while the parent helps transform it into a beautiful family picture book on a tablet, affectionate and natural interaction, soft daylight, paper and crayon textures, editorial lifestyle photography, no readable text, no logos, no watermark`

## 선택 영상 프롬프트
`A gentle family creation moment in a Korean public library: a child places a crayon drawing on the table, a parent smiles and helps review a storybook version on a tablet, then both look together at a finished family picture book, warm and calm, 6 second loop, no text, no logos, no watermark`

---

# Slide 13 — 노년층
## 용도
- 배경 영상

## 권장 타입
- 영상

## 권장 모델
- `seedance_2_5`

## 권장 비율 / 길이
- `16:9` / 7~8초

## 연출 목표
구술 → 그림동화 → 손주 전달의 정서적 연결을 표현

## 메인 영상 프롬프트
`An elderly Korean person in a quiet public library gently tells a life memory into a simple tablet microphone, the moment transitions into a warm illustrated picture book being created, and then the elder shares the finished physical book with a grandchild, intergenerational warmth, respectful documentary realism, soft daylight, subtle cinematic movement, 8 second loop, no readable text, no logos, no watermark`

## 보조 이미지 프롬프트
`A respectful Korean public library scene with an elderly person and grandchild looking together at a finished picture book created from personal memories, soft daylight, warm emotional tone, realistic photography, no text, no logos, no watermark`

---

# Slide 14 — 왜 정부가, 왜 도서관이, 왜 동화인가
## 용도
- 질문 카드 장표의 배경 이미지

## 권장 타입
- 이미지

## 권장 모델
- `gpt_image_2`

## 권장 비율
- `16:9`

## 연출 목표
공공성·접근성·쉬운 창작 형식을 차분하게 뒷받침하는 이미지

## 메인 이미지 프롬프트
`A calm, trustworthy Korean public library background scene showing citizens of different ages using books and simple creative tools in a safe public environment, softly blurred to support foreground Q&A cards, realistic public-service atmosphere, warm but restrained, no text, no logos, no watermark`

---

# Slide 15 — 한 개의 창작 서비스가 7개의 공공가치를 동시에 만듭니다
## 용도
- 보조 배경 이미지

## 권장 타입
- 이미지

## 권장 모델
- `gpt_image_2`

## 권장 비율
- `16:9`

## 연출 목표
도서관을 중심으로 세대·공동체·문화 활동이 연결되는 원형 공동체성 표현

## 메인 이미지 프롬프트
`A symbolic yet realistic overhead scene of a circular community table inside a Korean public library, with a child, young adult, parent, librarian, and senior participating in different forms of reading and story creation, books and paper radiating outward like a community network, warm natural light, balanced symmetrical composition for radial infographic overlay, no text, no logos, no watermark`

---

# Slide 16 — 한 번의 체험을 재방문·행사·지역 아카이브로 확장합니다
## 용도
- 배경 영상

## 권장 타입
- 영상

## 권장 모델
- `seedance_2_5`

## 권장 비율 / 길이
- `16:9` / 7~8초

## 연출 목표
재방문 → 전시 → 아카이브 축적으로 이어지는 공공도서관 성과 흐름 표현

## 메인 영상 프롬프트
`A civic storybook created in a Korean public library moves through three real-world moments: the citizen returns to revise it at the library, the finished book appears in a small community exhibition, and multiple citizen-made books are respectfully archived on a dedicated local-history shelf, realistic cinematic transitions, warm public cultural atmosphere, 8 second background loop, no readable text, no logos, no watermark`

## 보조 이미지 프롬프트
`A Korean public library scene with a shelf of citizen-made storybooks, a small local exhibition display, and a feeling of community participation and archival value, realistic editorial photography, warm and trustworthy, no text, no logos, no watermark`

---

# Slide 17 — 지식의 보관소에서, 시민 상상력의 발원지로
## 용도
- 클로징 배경 영상

## 권장 타입
- 영상

## 권장 모델
- `seedance_2_5`

## 권장 비율 / 길이
- `16:9` / 8초

## 연출 목표
도서관의 책과 시민의 상상력이 한 권의 열린 책으로 모이는 상징적 엔딩

## 메인 영상 프롬프트
`Poetic cinematic closing shot in a modern Korean public library: bookshelves full of books, subtle paper-like particles and warm light gently converge toward one open blank picture book on a wooden table, symbolizing citizens' imagination becoming books, elegant slow push-in camera, hopeful public-cultural tone, realistic materials, warm daylight, seamless 8 second loop, no text, no logos, no watermark`

## 보조 이미지 프롬프트
`A poetic closing still image in a Korean public library with an open blank picture book on a wooden table and a sense that warm light and paper fragments from surrounding books are gathering into it, elegant and hopeful, realistic cinematic photography, no text, no logos, no watermark`

---

# 1. 장표별 권장 제작 우선순위

| Slide | 제목 요약 | 권장 매체 | 우선순위 |
|---:|---|---|---|
| 01 | 표지 | 영상 | 높음 |
| 02 | 도서관 역할 확장 | 영상 | 높음 |
| 03 | 문학빵 사례 | 이미지 | 중간 |
| 04 | AI 3대 강국 | 이미지 | 중간 |
| 05 | 독서·도서관 정책 | 영상 | 높음 |
| 06 | 법·제도 5×5 | 정적/이미지 | 낮음 |
| 07 | 독서율 격차 | 이미지 | 중간 |
| 08 | 서비스 5단계 | 영상 | 매우 높음 |
| 09 | 공공도서관 전용 설계 | 이미지 | 중간 |
| 10 | 어린이·청소년 | 영상 | 높음 |
| 11 | 청년·직장인 | 영상 | 높음 |
| 12 | 부모·양육자 | 이미지 | 중간 |
| 13 | 노년층 | 영상 | 높음 |
| 14 | 왜 정부/도서관/동화인가 | 이미지 | 낮음 |
| 15 | 공공적 가치 7가지 | 이미지 | 중간 |
| 16 | 도서관 지표 개선 | 영상 | 높음 |
| 17 | 마무리 | 영상 | 매우 높음 |

---

# 2. 파일명 권장 규칙

## 영상
- `s01_cover_library_story.mp4`
- `s02_library_role_expand.mp4`
- `s05_policy_read_create_loop.mp4`
- `s08_five_step_creation.mp4`
- `s10_child_story_to_borrow.mp4`
- `s11_after_work_story_program.mp4`
- `s13_senior_memory_to_book.mp4`
- `s16_revisit_exhibit_archive.mp4`
- `s17_closing_origin_of_imagination.mp4`

## 이미지
- `s03_collectible_literary_entry.jpg`
- `s04_civic_ai_library.jpg`
- `s06_policy_function_mapping_bg.jpg`
- `s07_reading_gap_library.jpg`
- `s09_librarian_dashboard_scene.jpg`
- `s12_family_picture_book.jpg`
- `s14_public_library_qa_bg.jpg`
- `s15_public_value_circle.jpg`

---

# 3. Higgsfield MCP 호출용 메모

## 이미지 기본 예시
```json
{
  "model": "gpt_image_2",
  "aspect_ratio": "16:9",
  "count": 1,
  "prompt": "..."
}
```

## 영상 기본 예시
```json
{
  "model": "seedance_2_5",
  "aspect_ratio": "16:9",
  "count": 1,
  "duration": 7,
  "prompt": "..."
}
```

## 복합 장면 영상 예시
```json
{
  "model": "kling3_0",
  "aspect_ratio": "16:9",
  "count": 1,
  "duration": 8,
  "prompt": "..."
}
```

---

# 4. 최종 사용 원칙
- 배경 영상은 항상 **텍스트 가독성 우선**
- 배경 영상이 장표의 숫자·도식보다 강하게 튀지 않도록 색감과 명암을 조절
- 정보량이 많은 장표는 영상보다 정적 이미지나 미디어 없음이 더 적절할 수 있음
- 실제 발표에서는 영상 로딩 실패를 대비해 각 자산의 poster 이미지도 함께 준비
- 모든 장표에서 핵심 정보는 미디어가 없어도 전달되도록 구현

---

# 5. 실무 권장 제작 순서
1. 반드시 먼저 제작
   - 01 표지
   - 08 서비스 5단계
   - 10 어린이·청소년
   - 11 청년·직장인
   - 13 노년층
   - 16 재방문·행사·아카이브
   - 17 마무리

2. 다음 단계 제작
   - 02, 05, 09, 12, 15

3. 필요 시 제작
   - 03, 04, 06, 07, 14

---

이 문서는 장표별 Higgsfield 프롬프트 초안이다.  
실제 제작 시에는 시안 결과를 보고 **명암·인물 비중·카메라 구도·텍스트 여백** 중심으로 한 번 더 미세 조정하는 것을 권장한다.
