# 블록 이미지 자동 저장 가이드

## 목적
브릭셀 웹에디터의 **모든 블록(350+개)**을 개별 SVG 이미지로 자동 저장한다.
Docs 페이지, 매뉴얼, 교육 자료 등에서 블록 스크린샷으로 활용한다.

---

## 사전 조건

| 항목 | 설명 |
|------|------|
| 로컬 서버 | `npx http-server . -p 3000` 또는 `node build.js && npx http-server dist -p 3000` |
| 브라우저 | Chrome (F12 Console 사용) |
| 페이지 | `http://127.0.0.1:3000/index.html` 열린 상태 |
| 스크립트 | `guide/block_images_ko/save_all_blocks.js` |

---

## 실행 방법

### Step 1: 로컬 서버 실행
```bash
cd "D:\00_backup_Brixel WebEditor\Blockcoding_WebIDE_Project_V27_API"
npx http-server . -p 3000 -c-1
```

### Step 2: 브라우저에서 에디터 열기
```
http://127.0.0.1:3000/index.html
```

### Step 3: 콘솔에서 스크립트 실행
F12 → Console 탭에서:
```javascript
fetch("/guide/block_images_ko/save_all_blocks.js").then(r=>r.text()).then(eval)
```

### Step 4: 자동 다운로드 완료 대기
- 콘솔에 진행 상황이 출력된다: `[1/350] main_arduino_uno_starts_up`
- 완료 시: `DONE! 350/350 saved successfully`
- 블록당 약 0.8초 소요 → 전체 약 5분

### Step 5: 다운로드 폴더 → block_images 폴더로 이동
다운로드된 SVG 파일들을 `block_images/` 폴더로 이동:
```bash
# Windows PowerShell
Move-Item "$env:USERPROFILE\Downloads\*_*.svg" "D:\00_backup_Brixel WebEditor\Blockcoding_WebIDE_Project_V27_API\guide\block_images_ko\"

# 또는 수동으로: 다운로드 폴더에서 *_*.svg 파일 전부 선택 → guide/block_images_ko 폴더로 이동
```

---

## 스크립트 옵션 (save_all_blocks.js 상단)

| 옵션 | 기본값 | 설명 |
|------|--------|------|
| `SKIP_FLAGS` | `true` | 카테고리 구분용 flag 블록 건너뛰기 |
| `CATEGORY` | `null` | 특정 카테고리만 저장 (예: `"pin"`, `"motor"`) |
| `FORMAT` | `"svg"` | `"svg"` 또는 `"png"` |
| `DELAY_RENDER` | `500` | 블록 렌더링 대기 시간 (ms) |
| `DELAY_BETWEEN` | `300` | 블록 간 간격 (ms) |

### 특정 카테고리만 저장하려면
`save_all_blocks.js` 파일의 상단에서:
```javascript
var CATEGORY = "pin";    // pin 카테고리만 저장
```
사용 가능한 카테고리 ID:
- **소프트웨어**: `main`, `pin`, `control`, `logic`, `math`, `text`, `color`, `variables`, `list`, `functions`, `utility`
- **하드웨어**: `display_a`, `display_b`, `sensors_a`, `sensors_b`, `motor`, `output`, `communication`, `huskylens`, `webble`, `wifi`, `serial`, `esp32cam`, `tinyml`

---

## 파일 이름 규칙

```
{카테고리ID}_{블록타입}.svg
```

### 예시
```
main_arduino_setup.svg
pin_pin_mode.svg
pin_set_pwm_pin.svg
display_a_lcd_i2c_setup.svg
display_a_neopixel_setup.svg
sensors_a_dht_setup.svg
sensors_b_bmp280_setup.svg
motor_dcmotor_setup.svg
output_buzzer_play_note.svg
communication_ir_setup.svg
huskylens_huskylens_setup_i2c.svg
serial_sys_serial_begin.svg
```

---

## 핵심 기술 원리

### 왜 `Blockly.Xml.domToBlock()`을 사용하는가?

| 방식 | Shadow 블록 | 기본값 |
|------|------------|--------|
| `ws.newBlock("pin_mode")` | **X 없음** | **X 없음** |
| `Blockly.Xml.domToBlock(xmlDom, ws)` | **O 포함** | **O 포함** |

`workspace.newBlock()`은 빈 블록만 생성한다. Shadow 블록(흰색 원형 입력칸 + 기본값 13, 255 등)은 toolbox XML에 정의되어 있으며, `Blockly.Xml.domToBlock()`으로 XML을 파싱해야 포함된다.

이는 사용자가 toolbox에서 블록을 드래그할 때와 동일한 방식이다.

### 블록 XML 소스
`brixel/brixel_toolbox.js`의 `generateToolbox()` 함수가 반환하는 XML 문자열에서 각 블록의 XML을 추출한다.

예시 (핀 모드 블록):
```xml
<block type="pin_mode">
  <value name="PIN">
    <shadow type="math_number">
      <field name="NUM">13</field>
    </shadow>
  </value>
</block>
```

### SVG 저장 핵심 함수
`brixel/brixel_utils.js`의 `window.BlockImageSaver.saveMainBlocksAsSvg(workspace, filename, block)`:
1. 블록의 SVG DOM을 복제
2. `injectBlocklyStyles()` - Blockly CSS 주입
3. `inlineRectFills()` - computed style을 inline 속성으로 변환 (검정 박스 방지)
4. `applyFieldValuesToSvg()` - 텍스트 값 반영 + foreignObject 변환
5. SVG Blob 생성 → 다운로드

---

## 문제 해결

### 블록 이미지에 검정 박스가 나온다
→ `brixel_utils.js`의 `inlineRectFills()`, `applyFieldValuesToSvg()` 함수가 정상 동작하는지 확인. `getComputedStyle()`로 원본 색상을 읽어 `style.fill`로 인라인 적용해야 한다.

### Shadow 블록(흰색 입력칸)이 없다
→ `Blockly.Xml.domToBlock()`을 사용하고 있는지 확인. `ws.newBlock()`은 shadow 블록을 생성하지 않는다.

### 콘솔에 SyntaxError 발생
→ 스크립트를 직접 붙여넣지 말고 `fetch().then(eval)` 방식으로 실행. 템플릿 리터럴이나 이모지가 콘솔 붙여넣기에서 깨질 수 있다.

### 다운로드가 너무 빠르게 실행되어 누락된다
→ `DELAY_RENDER`와 `DELAY_BETWEEN` 값을 늘린다 (예: 각각 800, 500).

### Chrome이 다운로드를 차단한다
→ 주소창에 `chrome://settings/downloads` → "다운로드하기 전에 각 파일의 저장 위치를 확인" 해제 필요.

### TinyML 블록이 저장되지 않는다
→ TinyML 카테고리는 ESP32 보드 선택 시에만 toolbox에 포함된다. 보드를 ESP32로 변경 후 스크립트를 실행한다.

---

## 관련 파일

| 파일 | 설명 |
|------|------|
| `guide/block_images_ko/save_all_blocks.js` | 모든 블록 자동 저장 스크립트 (메인) |
| `guide/block_images_ko/BLOCK_IMAGE_SAVE_GUIDE.md` | 이 가이드 문서 |
| `save_pin_blocks.js` | 핀 제어 카테고리만 저장 (레거시) |
| `brixel/brixel_toolbox.js` | 툴박스 XML 정의 (블록 + shadow 블록) |
| `brixel/brixel_utils.js` | BlockImageSaver 클래스 (SVG/PNG 저장 로직) |
| `guide/block_images_ko/` | 저장된 블록 이미지 폴더 |

---

## 전체 카테고리별 블록 수 (참고)

| 카테고리 | 예상 블록 수 |
|----------|-------------|
| main | 3 |
| pin | 16 |
| control | 6 |
| logic | 6 |
| math | 12 |
| text | 10 |
| color | 6 |
| variables | 10 |
| list | 12 |
| functions | 2 |
| utility | ~25 |
| display_a | ~35 |
| display_b | ~35 |
| sensors_a | ~60 |
| sensors_b | ~55 |
| motor | ~35 |
| output | ~20 |
| communication | ~15 |
| huskylens | ~20 |
| webble | ~20 |
| wifi | ~10 |
| serial | ~15 |
| esp32cam | ~10 |
| **합계** | **~350+** |
