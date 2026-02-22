# Brixel WebEditor (Blockcoding WebIDE)

**"The ultimate solution for physical computing education and practice."**

Brixel WebEditor is a powerful web-based block coding platform that allows users to code and upload to various microcontroller boards, including **Arduino**, **ESP32**, and **Raspberry Pi Pico**, from a single unified interface. With **467+ blocks**, **22 languages**, and **AI assistance**, it provides everything needed for physical computing education.

> **Version**: 2.7.0 | **Website**: [https://brixel-editor.github.io/](https://brixel-editor.github.io/)

---

## Key Features

### 1. Universal Multi-Board Support
- **10 Boards Supported**: Arduino Uno/Nano/Mega, ESP32 Dev/CAM/S2/C3/S3, Raspberry Pi Pico/Pico W
- **Write Once, Run Anywhere**: A single block program generates compatible C++ code for any supported board
- **Auto Board Detection**: Automatically adjusts toolbox, block visibility, and code generation per board

### 2. 467+ Pre-Built Blocks (50 Categories)
Comprehensive block library covering all major hardware domains:

| Domain | Hardware / Blocks |
|--------|-------------------|
| **Sensors - Temperature/Humidity** | DHT11/22, SHT31, Si7021, BMP280, MLX90614, DS18B20, Thermistor |
| **Sensors - Distance/Motion** | Ultrasonic (HC-SR04), VL53L0X (ToF), MPU6050 (6-axis IMU), APDS9960 (Gesture/Color/Proximity), Rotary Encoder |
| **Sensors - Biometric** | MAX30105 (Heart Rate/SpO2), Fingerprint (R503), HX711 (Load Cell) |
| **Sensors - Water Quality** | DFRobot pH, Gravity TDS/EC, Turbidity |
| **Sensors - Air Quality** | MH-Z19B (CO2), SGP30 (VOC/eCO2), PMS5003/7003 (Particulate), UV (GUVA-S12SD) |
| **Displays** | SSD1306 OLED, SH1106 OLED, SH110X OLED, Korean-font OLED, LCD I2C (16x2/20x4), NeoPixel, HT16K33 Matrix, TM1637 7-Segment, LED |
| **Motors** | Servo, GeekServo, DC Motor (L298N), PCA9685 (16ch PWM), AccelStepper, Multi-Stepper |
| **Output** | Buzzer/Tone, MP3 Player (KT403A), SD Card Read/Write |
| **Communication** | Serial (UART), Bluetooth Classic, BLE (WebBLE), IR Remote, RF433 (ASK), GPS (NEO-6M), WiFi/WebSocket |
| **AI Vision** | HuskyLens (7 algorithms), TinyML (TensorFlow Lite), ESP32-CAM/S3-CAM |
| **Utilities** | Timer/Non-blocking, Signal Filter, ADC Calibration, Type Conversion, Map/Constrain, Recording/Playback, RTC (DS1307), I2C Scanner |
| **Programming** | Variables (int/float/String), Arrays, Logic, Math, Text, Color, Functions, Interrupts |

### 3. Dual Coding Mode
- **Block Mode**: Drag-and-drop visual programming with Google Blockly
- **Text Mode**: Full-featured Arduino C++ editor with Monaco Editor (VS Code engine)
- **Real-time Transpilation**: Block changes instantly generate Arduino C++ code preview
- **Seamless Switching**: Toggle between block and text editing without losing work

### 4. AI Assistant (Browser-Based)
- **Natural Language to Blocks**: Describe what you want in Korean/English, AI generates the block sequence
- **Intent Classification**: 20+ intent categories (sensors, motors, display, communication, etc.)
- **WebLLM / Ollama**: Runs entirely in-browser via WebGPU, or connects to local Ollama server
- **Block Catalog Awareness**: AI understands all 467+ available blocks for accurate suggestions

### 5. 22 Languages (i18n)
All UI text and block labels fully translated in **1,763 keys** across 22 languages:

| | | | | |
|---|---|---|---|---|
| Korean | English | Japanese | Chinese (Simplified) | Chinese (Traditional) |
| Spanish | French | German | Italian | Portuguese (Brazil) |
| Russian | Turkish | Polish | Dutch | Swedish |
| Vietnamese | Thai | Indonesian | Filipino | Hindi |
| Arabic (RTL) | Persian (RTL) | Uzbek | | |

- **Auto-detection**: Detects browser language on first visit
- **RTL Support**: Full right-to-left layout for Arabic and Persian
- **Korean Variable Names**: Supports Hangul variables with auto-romanization for C++ compilation

### 6. PC Agent (Compile & Upload)
- **Electron-based Desktop Agent**: Bridges the web IDE to physical hardware via WebSocket
- **Cross-Platform**: Windows (.exe), macOS (.dmg), Linux (.tar.gz), Chromebook
- **Arduino CLI Integration**: Compile, upload, and manage libraries automatically
- **40+ Bundled Libraries**: Pre-packaged Arduino libraries (no manual install needed)
- **Serial Port Auto-Detection**: Finds connected boards and ports automatically
- **Real-time Console**: Live compilation output and serial monitor in the browser

### 7. ESP32-CAM & Camera Agent
- **Dedicated Camera Blocks**: WiFi config, JPEG quality, brightness/contrast, flip, web streaming
- **ESP32-CAM + ESP32-S3-CAM**: Both boards supported with specialized blocks
- **Camera Agent App**: Windows/macOS app for receiving and displaying camera streams
- **UDP Streaming**: Chunked image transfer over WiFi

### 8. Project Sharing & Collaboration
- **One-Click Share**: Generate shareable URLs with LZString compression
- **Cloud Storage**: Supabase PostgreSQL backend for persistent project hosting
- **Short URLs**: `?s=ID` format for easy sharing
- **SNS Integration**: Direct share to Twitter, Facebook, KakaoTalk, Google Classroom, Teams, WhatsApp
- **Embed Code**: `<iframe>` embed for websites and LMS platforms
- **Remix Tracking**: Fork and remix shared projects with attribution

### 9. Learning Analytics
- **Block Assembly Recording**: Tracks every block creation, deletion, movement, and connection
- **Session Snapshots**: Periodic workspace XML + code + block distribution captures
- **Error Pattern Analysis**: Compilation failure tracking for educational insights
- **Dexie.js (IndexedDB)**: Client-side storage with optional Supabase cloud sync
- **Anonymous Hashing**: SHA-256 client hashing for privacy-preserving analytics
- **Consent Management**: GDPR-friendly opt-in dialog for data collection

### 10. Block Assembly Recorder
- **Creative Process Capture**: Records the step-by-step block assembly journey
- **Educational Assessment**: Teachers can review student problem-solving processes
- **Export**: Recorded data embedded in project files for sharing

### 11. Dark Mode
- **Full Theme Support**: Every UI element, Blockly workspace, Monaco editor, and console
- **Persistent**: Remembers preference across sessions via localStorage
- **CSS Variables**: Clean theming architecture with `body.dark-mode` toggle

### 12. Responsive Design
- **Desktop**: Full layout with collapsible right panel (400px control panel)
- **Tablet**: Stacked layout with auto-adjusted editor height
- **Mobile**: Compact mode with icon-only buttons, optimized touch targets

---

## Project Structure

```
Brixel_WebIDE_Project/
├── index.html                   # Main IDE entry point
├── ide-styles.css               # All CSS (dark mode, responsive, 21 sections)
├── brixel/                      # Block & Code Generation Engine
│   ├── brixel_blocks_definitions.js  # 467+ block definitions (JSON)
│   ├── blocks/                  # 19 block definition modules (by category)
│   ├── generators/              # Arduino C++ code generators
│   └── brixel_toolbox.js        # Dynamic toolbox generation
├── js/                          # IDE Frontend Core (14 modules)
│   ├── ide-core.js              # Main IDE orchestration
│   ├── ide-editors.js           # Blockly & Monaco management
│   ├── ide-file-manager.js      # File save/load/export
│   ├── ide-server-comm.js       # PC Agent WebSocket communication
│   ├── ide-share.js             # Project sharing (URL/Cloud/SNS)
│   ├── ide-i18n.js              # Internationalization (22 languages)
│   ├── ide-analytics.js         # Learning analytics (Dexie.js)
│   ├── ide-ai-engine.js         # AI NLP-to-blocks engine
│   ├── ide-supabase.js          # Cloud backend integration
│   ├── ide-utils.js             # Utility functions
│   ├── brixel-api.js            # External iframe API
│   ├── cdn-fallback-loader.js   # Multi-CDN failover
│   └── supabase-config.js       # Cloud backend config
├── translations/                # Language assets
│   ├── i18n.js                  # I18nManager class (language loader)
│   └── ui_i18n/                 # 22 language JSON files (1,763 keys each)
├── 01_camera_agent_win/         # ESP32-CAM Camera Agent (Windows GUI)
├── 02_os_install_app/           # Electron desktop app (standalone IDE)
├── 04_pc_agent/                 # PC Agent (compile/upload bridge)
│   ├── pc_agent_win/            # Windows agent + 40+ Arduino libraries
│   ├── pc_agent_mac/            # macOS agent
│   └── pc_agent_chrome/         # Chromebook agent
├── 05_ESP32_bluetooth/          # Bluetooth WebBLE integration
├── 06_AI_add/                   # AI feature extensions
├── 07_analytics_collector/      # Server-side analytics collector
├── code_share/                  # PHP share backend (gorillacell.kr)
├── download_agent/              # Agent installer binaries
│   ├── BrixelLocalAgent_Setup_2.7.0_win.exe
│   ├── Arduino Local Agent-2.6.0-arm64.dmg
│   └── BrixelAI_TTS_Agent_Setup_1.0.0.exe
├── guide/                       # Block usage guide documents (9 parts)
├── dist/                        # Production build output
└── brixel_guide.html            # Interactive block reference guide
```

---

## Bundled Arduino Libraries (40+)

The PC Agent includes pre-packaged libraries requiring no manual installation:

| Category | Libraries |
|----------|-----------|
| **Sensors** | DHT, Adafruit_Si7021, DFRobot_BMP280, DFRobot_MLX90614, DallasTemperature, MPU6050_tockn, HX711, MAX30105, Adafruit_APDS9960, Adafruit_SGP30, MHZ19, PMS, DFRobot_PH, DFRobot_GravityTDS, DFRobot_VL53L0X, Color_sensor, Adafruit_Fingerprint |
| **Displays** | Adafruit_SSD1306, Adafruit_SH110X, Adafruit_GFX, Adafruit_GrayOLED, LiquidCrystal_I2C, Adafruit_NeoPixel, Adafruit_LEDBackpack, OLED_HAN_UNO, OLED_HAN_UNO_SH1106, TM1637Display |
| **Motors** | Servo, ESP32Servo, AccelStepper, DCmotor, Adafruit_PWMServoDriver |
| **Communication** | IRremote, RCSwitch, RadioHead, WebSockets, HuskyLens |
| **Audio** | MP3Player_KT403A |
| **Clock** | DFRobot_DS1307 |
| **AI/ML** | TensorFlowLite_ESP32 |

---

## Quick Start

### Web Version (No Install)
1. Open [https://brixel-editor.github.io/](https://brixel-editor.github.io/) in your browser
2. Drag blocks from the toolbox to the workspace
3. Preview generated Arduino C++ code in real-time

### Compile & Upload (Requires PC Agent)
1. Download the PC Agent for your OS from the IDE's download section
2. Install and run the Agent (it connects automatically via WebSocket)
3. Select your board and port in the IDE
4. Click **Compile** then **Upload**

---

## Developer Information

- **Developer**: **Kim Suk-jeon**
  - Information Teacher at Songdo Middle School
  - Adjunct Professor at Inha University
- **Email**: [alphaco@naver.com](mailto:alphaco@naver.com)

---

# 브릭셀 웹에디터 (Brixel WebEditor)

**"피지컬 컴퓨팅 실습의 모든 것, 이 도구 하나면 충분합니다."**

브릭셀 웹에디터는 아두이노(Arduino), ESP32, 라즈베리 파이 피코(Raspberry Pi Pico) 등 다양한 보드를 하나의 인터페이스에서 코딩하고 업로드할 수 있는 웹 기반 블록 코딩 플랫폼입니다. **467개 이상의 블록**, **22개 언어**, **AI 도우미**를 제공하여 피지컬 컴퓨팅 교육에 필요한 모든 것을 갖추고 있습니다.

> **버전**: 2.7.0 | **웹사이트**: [https://brixel-editor.github.io/](https://brixel-editor.github.io/)

---

## 주요 기능

### 1. 완벽한 멀티 보드 지원
- **10종 보드 지원**: Arduino Uno/Nano/Mega, ESP32 Dev/CAM/S2/C3/S3, Raspberry Pi Pico/Pico W
- **원소스 멀티유즈**: 하나의 블록 코드로 모든 보드에서 동일하게 작동
- **자동 보드 감지**: 보드 선택에 따라 툴박스, 블록 가시성, 코드 생성 자동 조정

### 2. 467+ 블록 라이브러리 (50개 카테고리)

| 분류 | 지원 하드웨어 / 블록 |
|------|----------------------|
| **센서 - 온습도** | DHT11/22, SHT31, Si7021, BMP280, MLX90614, DS18B20, 서미스터 |
| **센서 - 거리/모션** | 초음파(HC-SR04), VL53L0X(ToF), MPU6050(6축 IMU), APDS9960(제스처/색상/근접), 로터리 엔코더 |
| **센서 - 생체** | MAX30105(심박/SpO2), 지문센서(R503), HX711(로드셀) |
| **센서 - 수질** | DFRobot pH, Gravity TDS/EC, 탁도 센서 |
| **센서 - 대기질** | MH-Z19B(CO2), SGP30(VOC/eCO2), PMS5003/7003(미세먼지), UV(GUVA-S12SD) |
| **디스플레이** | SSD1306 OLED, SH1106 OLED, SH110X OLED, 한글 OLED, LCD I2C(16x2/20x4), NeoPixel, HT16K33 매트릭스, TM1637 7세그먼트, LED |
| **모터** | 서보, GeekServo, DC 모터(L298N), PCA9685(16ch PWM), AccelStepper, 멀티 스텝모터 |
| **출력** | 부저/톤, MP3 플레이어(KT403A), SD카드 읽기/쓰기 |
| **통신** | Serial(UART), 블루투스 클래식, BLE(WebBLE), IR 리모컨, RF433(ASK), GPS(NEO-6M), WiFi/WebSocket |
| **AI 비전** | HuskyLens(7가지 알고리즘), TinyML(TensorFlow Lite), ESP32-CAM/S3-CAM |
| **유틸리티** | 타이머/논블로킹, 신호 필터, ADC 보정, 타입변환, Map/Constrain, 녹화/재생, RTC(DS1307), I2C 스캐너 |
| **프로그래밍** | 변수(int/float/String), 배열, 논리, 수학, 텍스트, 색상, 함수, 인터럽트 |

### 3. 듀얼 코딩 모드
- **블록 모드**: Google Blockly 기반 드래그 앤 드롭 비주얼 프로그래밍
- **텍스트 모드**: Monaco Editor (VS Code 엔진) 기반 Arduino C++ 에디터
- **실시간 코드 변환**: 블록 변경 즉시 Arduino C++ 코드 미리보기 생성
- **모드 전환**: 작업 내용 유지하면서 블록/텍스트 자유 전환

### 4. AI 도우미 (브라우저 내장)
- **자연어 → 블록 변환**: 한국어/영어로 원하는 기능을 설명하면 AI가 블록 시퀀스 생성
- **의도 분류**: 20개 이상의 의도 카테고리 (센서, 모터, 디스플레이, 통신 등)
- **WebLLM / Ollama**: WebGPU로 브라우저 내에서 실행하거나 로컬 Ollama 서버 연결
- **블록 카탈로그 인식**: 467개 이상의 블록을 모두 인식하여 정확한 추천

### 5. 22개 언어 지원 (i18n)
모든 UI 텍스트와 블록 레이블이 **1,763개 키**에 걸쳐 22개 언어로 완전 번역:

한국어, English, 日本語, 中文(简体), 繁體中文, Español, Français, Deutsch, Italiano, Português, Русский, Türkçe, Polski, Nederlands, Svenska, Tiếng Việt, ไทย, Bahasa Indonesia, Filipino, हिन्दी, العربية, فارسی, O'zbek tili

### 6. PC 에이전트 (컴파일 & 업로드)
- **Electron 기반 데스크톱 에이전트**: WebSocket으로 웹 IDE와 하드웨어 연결
- **크로스 플랫폼**: Windows(.exe), macOS(.dmg), Linux(.tar.gz), Chromebook
- **Arduino CLI 통합**: 컴파일, 업로드, 라이브러리 관리 자동화
- **40개 이상 내장 라이브러리**: 별도 설치 없이 바로 사용 가능
- **시리얼 포트 자동 감지**: 연결된 보드와 포트 자동 탐지
- **실시간 콘솔**: 브라우저에서 컴파일 출력 및 시리얼 모니터 실시간 확인

### 7. ESP32-CAM & 카메라 에이전트
- **전용 카메라 블록**: WiFi 설정, JPEG 품질, 밝기/대비, 플립, 웹 스트리밍
- **ESP32-CAM + ESP32-S3-CAM**: 두 보드 모두 전용 블록 지원
- **카메라 에이전트 앱**: Windows/macOS용 카메라 스트림 수신 앱

### 8. 프로젝트 공유 & 협업
- **원클릭 공유**: LZString 압축으로 공유 가능한 URL 생성
- **클라우드 저장**: Supabase PostgreSQL 백엔드로 영구 프로젝트 호스팅
- **SNS 공유**: Twitter, Facebook, KakaoTalk, Google Classroom, Teams, WhatsApp
- **임베드 코드**: 웹사이트 및 LMS 플랫폼용 `<iframe>` 코드 제공
- **리믹스 추적**: 공유 프로젝트 포크 및 리믹스 이력 관리

### 9. 학습 분석 (Learning Analytics)
- **블록 조립 기록**: 블록 생성, 삭제, 이동, 연결 모든 이벤트 추적
- **세션 스냅샷**: 주기적 워크스페이스 XML + 코드 + 블록 분포 캡처
- **오류 패턴 분석**: 교육적 인사이트를 위한 컴파일 실패 추적
- **개인정보 보호**: SHA-256 익명 해싱, GDPR 준수 동의 관리

### 10. 한글 친화적 스마트 로마자 변환
- **한글 변수명 지원**: '온도', '습도' 등 한글 변수명 자유 사용
- **자동 변환 엔진**: 컴파일 시 한글을 로마자로 자동 변환 (예: `ondo`)
- **C++ 호환성**: 컴파일러의 한글 미지원 문제 원천 해결

### 11. 다크 모드 & 반응형 디자인
- **완전한 다크 테마**: 모든 UI, Blockly 워크스페이스, Monaco 에디터, 콘솔
- **반응형 레이아웃**: 데스크톱(패널 접기), 태블릿(스택), 모바일(아이콘 전용)
- **영구 설정**: localStorage에 테마 선호도 저장

---

## 빠른 시작

### 웹 버전 (설치 불필요)
1. 브라우저에서 [https://brixel-editor.github.io/](https://brixel-editor.github.io/) 접속
2. 툴박스에서 블록을 드래그하여 워크스페이스에 배치
3. 실시간으로 Arduino C++ 코드 미리보기 확인

### 컴파일 & 업로드 (PC 에이전트 필요)
1. IDE의 다운로드 섹션에서 OS에 맞는 PC 에이전트 다운로드
2. 에이전트 설치 및 실행 (WebSocket으로 자동 연결)
3. IDE에서 보드와 포트 선택
4. **컴파일** 후 **업로드** 클릭

---

## 개발자 정보

- **개발자**: **김석전 (Kim Suk-jeon)**
  - 송도중학교 정보교사
  - 인하대학교 겸임교수
- **이메일**: [alphaco@naver.com](mailto:alphaco@naver.com)

---

> 브릭셀 웹에디터는 피지컬 컴퓨팅의 진입 장벽을 낮추고, 누구나 쉽게 메이커가 될 수 있는 세상을 만듭니다.
