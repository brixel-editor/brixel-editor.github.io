# 브릭셀 웹에디터 (Brixel WebEditor)

> **브라우저에서 바로 쓰는 아두이노 / ESP32 / 라즈베리파이 피코 블록 코딩 IDE.**
> 설치 없이 시작 → 블록 조립 → 실제 보드에 업로드까지 한 흐름으로.
> **Windows · macOS · Chromebook · Android** — 4개 운영체제에서 동작합니다.

🌐 **사이트**: [brixel.gorillacell.kr](https://brixel.gorillacell.kr) · [brixel-editor.github.io](https://brixel-editor.github.io)
📌 **버전**: 2.7.0

---

## ✨ 무엇을 할 수 있나요?

- 블록을 조립하면 → **아두이노 C++ 코드가 자동 생성**됩니다
- **120종 이상의 센서·모터·디스플레이**를 블록 한 줄로 제어
- AI 에게 *"온도 센서 값을 OLED에 표시해"* 라고 말하면 블록을 자동으로 만들어 줍니다
- 만든 작품을 친구·선생님과 **URL 한 줄로 공유**
- 작업 과정이 자동 기록되어 **학습 평가 자료**로 활용 가능

---

## 🛠️ 지원하는 보드 (10종)

| 보드 | BLE | WiFi | TinyML |
|---|:-:|:-:|:-:|
| Arduino Uno / Nano / Mega | – | – | – |
| ESP32 / ESP32-S2 / ESP32-C3 / ESP32-S3 | ✓ | ✓ | ✓ |
| ESP32-CAM | ✓ | ✓ | ✓ |
| Raspberry Pi Pico / Pico W | – | Pico W만 ✓ | – |

보드를 바꾸면 **사용 가능한 블록 도구상자가 자동으로 조정**됩니다.

---

## 💻 4개 운영체제에서 동작

| 운영체제 | 컴파일·업로드 방식 | 지원 보드 |
|---|---|---|
| **Windows · macOS** | PC 에이전트 (설치형, Arduino CLI 내장) | **Arduino · ESP32 전 계열** (Uno·Nano·Mega · ESP32 시리즈 · Pico) |
| **Chromebook** | 설치 불필요 — 브라우저 WASM 컴파일 + Web Serial 업로드 | **Arduino 계열** (Uno · Nano · Mega) |
| **Android** | BrixelDroid 앱 (기기 내 로컬 에이전트) | **Arduino 계열** (Uno · Nano · Mega) |

- **Windows · macOS** — PC 에이전트가 Arduino CLI 로 컴파일하고 USB 로 업로드합니다. **ESP32 · Pico 까지 전부** 지원.
- **Chromebook** — 크롬OS 의 Web Serial 덕분에 **에이전트도 서버도 없이** 브라우저가 직접 컴파일(WASM avr-gcc)·업로드합니다.
- **Android** — BrixelDroid 앱이 기기에서 직접 컴파일·업로드합니다.

> Chromebook · Android 은 현재 **아두이노 AVR 계열(Uno · Nano · Mega)** 만 지원합니다. ESP32 가 필요하면 Windows · macOS 를 사용하세요.

---

## 🧩 어떤 블록이 있나요?

500개 이상의 블록이 24개 카테고리로 정리되어 있습니다.

| 분야 | 대표 부품 |
|---|---|
| **온·습도** | DHT11/22, SHT31, Si7021, BMP280, MLX90614, DS18B20, 서미스터 |
| **거리·모션** | 초음파(HC-SR04), ToF(VL53L0X), 자이로(MPU6050), 제스처(APDS9960), 로터리 엔코더 |
| **공기 측정** | CO2(MH-Z19B), VOC(SGP30), 미세먼지(PMS5003/7003), UV |
| **수질** | pH, TDS/EC, 탁도 |
| **생체** | 심박·SpO2(MAX30105), 지문(R503), 무게(HX711) |
| **디스플레이** | OLED(SSD1306·SH1106·한글), LCD I2C, NeoPixel, 7세그먼트, LED 매트릭스 |
| **모터** | 서보, 긱서보 360°, DC 모터(L298N), 16채널 PWM(PCA9685), 스텝모터 |
| **소리·저장** | 부저, MP3 플레이어(KT403A), SD카드 |
| **통신** | UART, Bluetooth, BLE, WiFi, IR 리모컨, RF433, GPS |
| **AI 비전** | HuskyLens (7가지 알고리즘), TinyML, ESP32-CAM 스트리밍 |
| **프로그래밍** | 변수, 배열, 논리, 수학, 텍스트, 색상, 함수, 인터럽트 |

---

## 🚀 시작하기

### 1️⃣ 웹에서 바로 (설치 불필요)
1. **[brixel.gorillacell.kr](https://brixel.gorillacell.kr)** 접속
2. 왼쪽 도구상자에서 블록을 드래그
3. 오른쪽에서 자동 생성된 Arduino C++ 코드 확인

### 2️⃣ 실제 보드에 업로드 (운영체제별)
- **Windows · macOS** — IDE 우측 패널에서 **PC 에이전트** 다운로드·설치 → 웹 IDE와 자동 연결 → 보드/포트 선택 → **컴파일·업로드** (Arduino · ESP32 전 계열)
- **Chromebook** — 설치 불필요. **보드 연결** 버튼 → USB 포트 선택 → 브라우저가 직접 **컴파일·업로드** (Arduino 계열)
- **Android** — **BrixelDroid** 앱 설치 → 웹 IDE와 연결 → **컴파일·업로드** (Arduino 계열)

> PC 에이전트 · BrixelDroid 에는 Arduino CLI(또는 컴파일러)와 40개 이상의 라이브러리가 미리 포함되어 별도 설치가 필요 없습니다.

---

## 🎨 주요 기능

### 블록 ↔ 텍스트 자유 전환
Google Blockly 기반 블록 모드와 Monaco Editor (VS Code 엔진) 텍스트 모드를 작업 내용 손실 없이 오갈 수 있습니다.

### 🤖 AI 도우미
*"빨간 LED를 0.5초마다 깜빡이게 해줘"* 같은 자연어를 블록으로 자동 변환합니다. WebGPU로 브라우저 안에서 실행하거나 로컬 Ollama 서버에 연결할 수 있어 인터넷 없이도 동작합니다.

### 🌐 23개 언어 지원
한국어, English, 日本語, 中文(简/繁), Español, Français, Deutsch, Italiano, Português, Русский, Türkçe, Polski, Nederlands, Svenska, Tiếng Việt, ไทย, Bahasa Indonesia, Filipino, हिन्दी, العربية(RTL), فارسی(RTL), O'zbek tili.
브라우저 언어를 자동 감지하며, 아랍어·페르시아어는 RTL 레이아웃을 완전 지원합니다.

### 🇰🇷 한글 변수명 지원
`온도`, `습도` 같은 한글 변수명을 그대로 사용 가능. 컴파일 시 자동으로 로마자로 변환되어 C++ 호환성 문제를 해결합니다.

### 🌗 다크 모드 & 반응형
블록 워크스페이스, 텍스트 에디터, 콘솔까지 모든 UI에 적용되는 완전한 다크 테마. PC · 태블릿 · 모바일 화면에 자동 대응합니다.

### 📱 앱으로 설치 (PWA)
`manifest.json` 과 서비스 워커(`sw.js`)로 **홈 화면 · 바탕화면에 앱처럼 설치**할 수 있고, 한 번 연 뒤에는 **오프라인에서도** 에디터가 열립니다 (Windows · macOS · Chromebook · Android 공통).

### 🔗 프로젝트 공유 & 임베드
URL 한 번으로 공유, 카카오톡 · 구글 클래스룸 · 팀즈 · 트위터 등 SNS 직접 공유, `<iframe>`으로 외부 사이트나 LMS에 임베드 가능합니다.

### 📊 학습 분석
블록 조립 과정과 오류 패턴이 자동으로 기록되어 교사가 학생의 문제 해결 과정을 검토할 수 있습니다. SHA-256 익명 해싱과 GDPR 동의 관리로 개인정보를 보호합니다.

### 📷 ESP32-CAM 카메라
WiFi 카메라 스트리밍, 사진 캡처, 화면 밝기·대비 조정 등 카메라 기반 프로젝트 전용 블록을 제공합니다.

### 🧠 엣지 AI (TinyML · HuskyLens)
ESP32에서 직접 추론하는 TensorFlow Lite Micro와, 7가지 알고리즘(얼굴·객체·선·색상·태그 인식 등)을 지원하는 HuskyLens 모듈을 블록으로 사용할 수 있습니다.

---

## 👨‍🏫 누구를 위한 도구인가요?

- **초·중·고 정보 / 과학 교사** — 피지컬 컴퓨팅 수업 준비와 실습
- **메이커 동아리 · 방과후 강사** — 즉석에서 작품 제작과 시연
- **학생** — 코딩 입문부터 ESP32 IoT 프로젝트까지
- **AI 교육 강사** — HuskyLens · TinyML 로 AI 비전 실습
- **가정** — 부모와 자녀가 함께 즐기는 메이커 활동

---

## 📞 개발자

- **김석전 (Kim Suk-jeon)**
  - 송도중학교 정보교사
  - 인하대학교 겸임교수
- **이메일**: [alphaco@naver.com](mailto:alphaco@naver.com)

---

## 📜 라이선스

교육·비영리 용도로 자유롭게 사용 가능합니다. 자세한 사항은 개발자에게 문의해 주세요.

---

> 브릭셀 웹에디터는 피지컬 컴퓨팅의 진입 장벽을 낮추고, 누구나 메이커가 될 수 있는 세상을 지향합니다.
