# AI 시민 동화책 제작 플랫폼 — 공공도서관 도입 제안

공공도서관 담당 공무원·관리자 대상 **인터랙티브 HTML 발표자료**입니다. (발표: 틸론)

🔗 **발표 보기 → https://gojump0713.github.io/ppt_tstory/**

## 구성

```
presentation/          배포되는 덱 (GitHub Pages 사이트 루트)
├─ index.html          진입점
├─ css/presentation.css
├─ js/ data.js · slides.js · app.js
├─ media/              장표 배경 영상·이미지 (27건)
├─ fonts/              Pretendard Variable
├─ og-image.jpg        링크 공유 카드 (카카오톡·페이스북 등)
├─ favicon.svg · favicon.ico · apple-touch-icon.png
└─ tools/              QA·이미지 생성 스크립트

AI시민동화책_공공도서관_발표멘트_최종.md        낭독 멘트·수치·출처 (콘텐츠 1차 기준)
AI시민동화책_인터랙티브HTML_작업지시서_PRD.md   18장 구조·수치 무결성·UX 원칙
AI시민동화책_인터랙티브HTML_화면설계서.md       장표별 제목·화면 문구·레이아웃 (19~26장 PART Ⅱ 포함)
reading-activation-16x9.html                     PART Ⅱ(19~26장) 원본 문서 · 독서 활성화 방안
AI시민동화책_인터랙티브HTML_Higgsfield_프롬프트.md  배경 미디어 프롬프트·파일명 규칙
작업인수인계_HANDOFF.md                          작업 이력·남은 일
```

## 조작키

| 키 | 동작 |
|---|---|
| `→` `↓` `Space` `PgDn` | 다음 장표 |
| `←` `↑` `PgUp` | 이전 장표 |
| `Home` / `End` | 처음 / 끝 |
| `T` · `O` · `Esc` | 목차 (우하단 페이지 번호 클릭도 동일) |
| `S` | 출처 |
| `P` | 발표자 메모 |
| `F` | 전체화면 |
| `M` | 모션 최소화 |
| `B` | 배경 미디어 강조 토글 |
| `R` | 장표 다시 재생 |
| `D` / `Enter`(마지막 장) / 18·26장 DEMO 버튼 | 실제 서비스 시연 (`Backspace`·`Esc` 로 시연을 연 장표로 복귀) |

> `Esc` 는 시연 중이면 발표로 복귀, 패널이 열려 있으면 닫기, 그 외에는 목차를 엽니다.

## 로컬 실행

`presentation/index.html` 을 브라우저로 열고 `F` 로 전체화면. 별도 빌드 단계는 없습니다.

## 배포

`main` 브랜치에 푸시하면 `.github/workflows/deploy.yml` 이 `presentation/` 을 GitHub Pages 사이트 루트로 게시합니다.

## QA

```bash
cd presentation/tools
npm i                 # 최초 1회 (puppeteer-core)
node qa.js            # 26장 순회 + 시연 + 넘침·잘림 검사
node audit_type.js    # 렌더 실측 글자 크기 검사
```
