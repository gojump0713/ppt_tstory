# tools — 실시간 브라우저 QA (puppeteer-core + 로컬 Chrome)

```bash
cd presentation/tools
npm init -y && npm i puppeteer-core@23
node qa.js                 # 18장 순회 + 시연 + 스케일 검증 → tools/qa-shots/*.png, report.json
node shot.js 01 07 d1 d5   # 지정 장표/시연 화면만 스크린샷 (d1~d5 = 시연 화면)
node shot_special.js       # 키 반복·IME·Ctrl 조합·슬라이더 포커스·전체화면 히어로 텍스트 등 동작 검사

node make_og.js            # 공유 카드 렌더 (tools/og.html → ../og-image.png, 이후 JPG 변환 필요)
node make_icons.js         # favicon.svg 래스터화 (→ tools/icon-1024.png, 이후 ico/png 변환 필요)
```

## 공유 카드·파비콘 다시 만들기

문구나 배경을 바꾸려면 `tools/og.html`(카드 레이아웃) 또는 `favicon.svg`(아이콘)를 고친 뒤:

```bash
node make_og.js && python -c "from PIL import Image; im=Image.open('../og-image.png').convert('RGB'); im.resize((1200,630), Image.LANCZOS).save('../og-image.jpg','JPEG',quality=88,optimize=True,progressive=True)"
node make_icons.js && python -c "from PIL import Image; s=Image.open('icon-1024.png').convert('RGBA'); s.save('../favicon.ico',sizes=[(16,16),(32,32),(48,48)]); o=Image.new('RGB',(180,180),(92,108,255)); r=s.resize((180,180),Image.LANCZOS); o.paste(r,(0,0),r); o.save('../apple-touch-icon.png')"
```

`og-image.jpg`를 교체했다면 `index.html`의 `og:image` 뒤 `?v=` 숫자를 올리고
[카카오 공유 디버거](https://developers.kakao.com/tool/debugger/sharing)에서 캐시를 초기화해야 새 이미지가 보입니다.

- `executablePath`가 다른 PC의 Chrome 경로와 다르면 각 스크립트 상단에서 수정
- 헤드리스 Chrome을 병렬로 띄우면 프로필을 공유해 URL이 섞이므로 **순차 실행**
- `--virtual-time-budget` 방식은 CSS transition을 반영하지 못하므로 실시간 대기(sleep) 방식 유지
