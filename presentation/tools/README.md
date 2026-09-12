# tools — 실시간 브라우저 QA (puppeteer-core + 로컬 Chrome)

```bash
cd presentation/tools
npm init -y && npm i puppeteer-core@23
node qa.js                 # 18장 순회 + 시연 + 스케일 검증 → tools/qa-shots/*.png, report.json
node shot.js 01 07 d1 d5   # 지정 장표/시연 화면만 스크린샷 (d1~d5 = 시연 화면)
node shot_special.js       # 키 반복·IME·Ctrl 조합·슬라이더 포커스·전체화면 히어로 텍스트 등 동작 검사
```

- `executablePath`가 다른 PC의 Chrome 경로와 다르면 각 스크립트 상단에서 수정
- 헤드리스 Chrome을 병렬로 띄우면 프로필을 공유해 URL이 섞이므로 **순차 실행**
- `--virtual-time-budget` 방식은 CSS transition을 반영하지 못하므로 실시간 대기(sleep) 방식 유지
