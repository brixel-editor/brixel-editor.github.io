/* ============================================================
   Brixel Docs — Content Data (Korean)
   Generated from brixel_toolbox.js + block_tooltips.json
   ============================================================ */

var DOCS_NAV = [
  {
    group: 'software',
    title: '📦 소프트웨어 (블록 코딩)',
    items: [
      { id: 'main', name: '메인', color: '#FFAB19', icon: '🚀' },
      { id: 'pin', name: '핀 제어', color: '#6190DF', icon: '📌' },
      { id: 'control', name: '제어', color: '#FF9800', icon: '🔄' },
      { id: 'logic', name: '논리', color: '#5CB1D6', icon: '🧠' },
      { id: 'math', name: '수학', color: '#59C059', icon: '🔢' },
      { id: 'text', name: '텍스트', color: '#82a52d', icon: '📝' },
      { id: 'color', name: '색상', color: '#A855F7', icon: '🎨' },
      { id: 'variables', name: '변수', color: '#98607F', icon: '📦' },
      { id: 'list', name: '리스트', color: '#59ACF7', icon: '📋' },
      { id: 'functions', name: '함수', color: '#8E61A3', icon: '⚙️' },
      { id: 'utility', name: '유틸리티', color: '#08B89F', icon: '🛠️' }
    ]
  },
  {
    group: 'hardware',
    title: '🔌 하드웨어 (입출력 장치)',
    items: [
      { id: 'display-a', name: '디스플레이 A', color: '#FAC907', icon: '📺' },
      { id: 'display-b', name: '디스플레이 B', color: '#FAC907', icon: '🖥️' },
      { id: 'sensors-a', name: '센서 A', color: '#FF6F00', icon: '🌡️' },
      { id: 'sensors-b', name: '센서 B', color: '#4D68EC', icon: '🔬' },
      { id: 'motor', name: '모터', color: '#50B91A', icon: '⚡' },
      { id: 'output', name: '출력', color: '#70D650', icon: '🔔' },
      { id: 'communication', name: '통신', color: '#F75ACF', icon: '📡' },
      { id: 'huskylens', name: '허스키렌즈', color: '#00BFA5', icon: '🐶' },
      { id: 'webble', name: '웹 블루투스', color: '#4285F4', icon: '🌐' },
      { id: 'wifi', name: 'WiFi 통신', color: '#4285F4', icon: '📶' },
      { id: 'serial', name: '시리얼 통신', color: '#367E7F', icon: '🔌' },
      { id: 'esp32cam', name: 'ESP32-CAM', color: '#367E7F', icon: '📷' },
      { id: 'tinyml', name: 'TinyML', color: '#9C27B0', icon: '🧠' }
    ]
  }
];

var DOCS_DATA = {

  /* ──────────────────────────────────────────────
     SOFTWARE SECTIONS
     ────────────────────────────────────────────── */

  'main': {
    title: '메인',
    color: '#FFAB19',
    description: '프로그램의 시작점과 기본 구조를 정의하는 블록',
    blocks: [
      { id: 'arduino_uno_starts_up', name: '보드 시작', params: null, output: null, description: '프로그램 시작 시 필수 라이브러리를 포함합니다' },
      { id: 'arduino_setup', name: 'setup() 함수', params: null, output: null, description: '프로그램 시작 시 한 번 실행되는 설정 블록' },
      { id: 'arduino_loop', name: 'loop() 함수', params: null, output: null, description: '반복 실행되는 메인 루프 블록' }
    ],
    tips: ['setup()은 초기화 코드, loop()은 반복 코드를 배치합니다', '"보드 시작" 블록은 프로그램 최상단에 배치하세요']
  },

  'pin': {
    title: '핀 제어',
    color: '#6190DF',
    description: '아두이노 디지털/아날로그 핀을 직접 제어하는 블록',
    blocks: [
      { id: 'pin_mode', name: '핀 모드 설정', params: ['PIN'], output: null, description: '핀을 INPUT 또는 OUTPUT으로 설정' },
      { id: 'read_digital_pin', name: '디지털 핀 읽기', params: ['PIN'], output: 'Number', description: '디지털 핀의 HIGH/LOW 값을 읽음' },
      { id: 'read_analog_pin', name: '아날로그 핀 읽기', params: ['PIN'], output: 'Number', description: '아날로그 핀 값을 읽음 (0~1023)' },
      { id: 'set_digital_pin', name: '디지털 핀 출력', params: ['PIN'], output: null, description: '핀에 HIGH 또는 LOW 출력' },
      { id: 'set_pwm_pin', name: 'PWM 출력', params: ['PIN', 'VALUE'], output: null, description: 'PWM 값 출력 (0~255)' },
      { id: 'servo_setup', name: '서보 모터 설정', params: ['PIN'], output: null, description: '서보 모터 핀 연결' },
      { id: 'set_servo_angle', name: '서보 각도 설정', params: ['PIN', 'ANGLE'], output: null, description: '서보 모터 각도 지정 (0~180)' },
      { id: 'tone_out', name: '톤 출력', params: ['PIN', 'FREQUENCY', 'DURATION'], output: null, description: '부저에 특정 주파수의 톤 출력' },
      { id: 'no_tone', name: '톤 중지', params: ['PIN'], output: null, description: '톤 출력 중지' },
      { id: 'delay_ms', name: '지연', params: ['DELAY_TIME'], output: null, description: '밀리초 단위 대기' },
      { id: 'timer_millis', name: '밀리초 타이머', params: null, output: 'Number', description: 'millis() 값 반환' },
      { id: 'timer_reset', name: '타이머 리셋', params: ['TIMER_NUM'], output: null, description: '타이머 초기화' },
      { id: 'timer_non_blocking_delay', name: '논블로킹 지연', params: ['INTERVAL'], output: null, description: '비차단 방식 지연 (다른 코드 실행 가능)' },
      { id: 'arduino_interrupt', name: '인터럽트 설정', params: ['PIN'], output: null, description: '외부 인터럽트 핀 설정 (핀 상태 변화 시 코드 실행)' },
      { id: 'pulse_in', name: '펄스 입력 측정', params: ['PIN', 'TIMEOUT'], output: 'Number', description: '핀의 펄스 길이 측정 (마이크로초)' },
      { id: 'shift_out', name: '시프트 출력', params: ['DATA_PIN', 'CLOCK_PIN', 'LATCH_PIN', 'VALUE'], output: null, description: '시프트 레지스터 데이터 출력' }
    ],
    tips: ['아날로그 핀은 A0~A5, 디지털 핀은 0~13 사용', 'PWM 출력은 ~표시가 있는 핀(3,5,6,9,10,11)에서만 가능']
  },

  'control': {
    title: '제어',
    color: '#FF9800',
    description: '프로그램 흐름을 제어하는 조건문, 반복문 블록',
    blocks: [
      { id: 'delay_ms', name: '지연', params: ['DELAY_TIME'], output: null, description: '밀리초 단위 대기' },
      { id: 'wait_until', name: '조건까지 대기', params: ['CONDITION'], output: null, description: '조건이 참이 될 때까지 대기' },
      { id: 'controls_if', name: '만약-이면', params: null, output: null, description: '조건 분기문 (if/else)' },
      { id: 'controls_repeat_ext', name: '반복 (횟수)', params: ['TIMES'], output: null, description: '지정 횟수만큼 반복' },
      { id: 'controls_whileUntil', name: '반복 (조건)', params: null, output: null, description: '조건이 참인 동안 또는 참이 될 때까지 반복' },
      { id: 'controls_flow_statements', name: 'break/continue', params: null, output: null, description: '반복문 제어 (중단/다음)' }
    ],
    tips: ['무한루프는 while(true) 블록 사용', 'break는 반복문 즉시 종료, continue는 다음 반복으로 이동']
  },

  'logic': {
    title: '논리',
    color: '#5CB1D6',
    description: '비교, 논리 연산 블록',
    blocks: [
      { id: 'logic_compare', name: '비교 연산', params: ['A', 'B'], output: 'Boolean', description: '두 값 비교 (=, ≠, <, >, ≤, ≥)' },
      { id: 'logic_operation', name: '논리 연산', params: ['A', 'B'], output: 'Boolean', description: 'AND, OR 논리 연산' },
      { id: 'logic_negate', name: 'NOT 연산', params: ['BOOL'], output: 'Boolean', description: '참/거짓 반전' },
      { id: 'logic_boolean', name: '참/거짓', params: null, output: 'Boolean', description: 'true 또는 false 값' },
      { id: 'logic_null', name: 'null 값', params: null, output: 'null', description: '빈 값 (null)' },
      { id: 'logic_ternary', name: '삼항 연산자', params: ['IF', 'THEN', 'ELSE'], output: 'Any', description: '조건 ? 참값 : 거짓값' }
    ],
    tips: ['비교 블록은 센서값 판단에 자주 사용됩니다']
  },

  'math': {
    title: '수학',
    color: '#59C059',
    description: '숫자, 연산, 수학 함수 블록',
    blocks: [
      { id: 'math_number', name: '숫자', params: null, output: 'Number', description: '숫자 값 입력' },
      { id: 'math_arithmetic', name: '사칙연산', params: ['A', 'B'], output: 'Number', description: '+, -, ×, ÷, 거듭제곱' },
      { id: 'math_single', name: '단항 연산', params: ['NUM'], output: 'Number', description: 'sqrt, abs, -, ln, log10, e^, 10^' },
      { id: 'math_trig', name: '삼각함수', params: ['NUM'], output: 'Number', description: 'sin, cos, tan, asin, acos, atan' },
      { id: 'math_constant', name: '수학 상수', params: null, output: 'Number', description: 'π, e, φ, √2, √½, ∞' },
      { id: 'math_number_property', name: '숫자 속성 검사', params: ['NUMBER_TO_CHECK'], output: 'Boolean', description: '짝수, 홀수, 소수, 정수 등 검사' },
      { id: 'math_round', name: '반올림/올림/내림', params: ['NUM'], output: 'Number', description: '숫자 반올림 처리' },
      { id: 'math_modulo', name: '나머지 연산', params: ['DIVIDEND', 'DIVISOR'], output: 'Number', description: '나눗셈의 나머지' },
      { id: 'math_constrain', name: '범위 제한', params: ['VALUE', 'LOW', 'HIGH'], output: 'Number', description: '값을 최소~최대 범위로 제한' },
      { id: 'math_random_int', name: '랜덤 정수', params: ['FROM', 'TO'], output: 'Number', description: '범위 내 랜덤 정수' },
      { id: 'math_random_float', name: '랜덤 소수', params: null, output: 'Number', description: '0~1 사이 랜덤 소수' },
      { id: 'math_atan2', name: 'atan2 함수', params: ['X', 'Y'], output: 'Number', description: '2인수 아크탄젠트' }
    ],
    tips: ['math_constrain은 센서값을 안전 범위로 제한할 때 유용']
  },

  'text': {
    title: '텍스트',
    color: '#82a52d',
    description: '문자열 처리 블록',
    blocks: [
      { id: 'text', name: '문자열', params: null, output: 'String', description: '문자열 값 입력' },
      { id: 'custom_text_join', name: '문자열 연결', params: ['TEXT1', 'TEXT2'], output: 'String', description: '두 문자열을 합침' },
      { id: 'custom_text_char_at', name: 'N번째 문자', params: ['TEXT', 'INDEX'], output: 'String', description: '문자열에서 특정 위치 문자 추출' },
      { id: 'custom_text_length', name: '문자열 길이', params: ['TEXT'], output: 'Number', description: '문자열의 길이 반환' },
      { id: 'custom_text_compare', name: '문자열 비교', params: null, output: 'Boolean', description: '두 문자열 비교' },
      { id: 'custom_text_contains', name: '포함 여부', params: ['TEXT', 'SUBSTRING'], output: 'Boolean', description: '문자열에 특정 텍스트가 포함되어 있는지 확인' },
      { id: 'text_append', name: '문자열 추가', params: null, output: null, description: '변수에 문자열 덧붙이기' },
      { id: 'text_changeCase', name: '대소문자 변환', params: null, output: null, description: '대문자/소문자 변환' },
      { id: 'text_trim', name: '공백 제거', params: null, output: null, description: '앞뒤 공백 제거' },
      { id: 'text_isEmpty', name: '빈 문자열 여부', params: null, output: 'Boolean', description: '문자열이 비어있는지 확인' }
    ],
    tips: ['시리얼 통신이나 LCD 출력 시 문자열 결합이 자주 사용됩니다']
  },

  'color': {
    title: '색상',
    color: '#A855F7',
    description: '색상 값 생성 및 변환 블록',
    blocks: [
      { id: 'colour_picker_custom', name: '색상 선택기', params: null, output: 'Color', description: '팔레트에서 색상 선택' },
      { id: 'colour_random_custom', name: '랜덤 색상', params: null, output: 'Color', description: '무작위 색상 생성' },
      { id: 'colour_rgb_custom', name: 'RGB 색상', params: ['RED', 'GREEN', 'BLUE'], output: 'Color', description: 'R,G,B 값으로 색상 생성' },
      { id: 'colour_blend_custom', name: '색상 혼합', params: ['COLOUR1', 'COLOUR2', 'RATIO'], output: 'Color', description: '두 색상을 비율로 혼합' },
      { id: 'colour_to_hex', name: '색상→HEX', params: ['COLOUR'], output: 'String', description: '색상을 HEX 문자열로 변환' },
      { id: 'colour_to_rgb_values', name: '색상→RGB', params: ['COLOUR'], output: 'Array', description: '색상을 R,G,B 배열로 변환' }
    ],
    tips: ['NeoPixel LED 제어 시 색상 블록을 활용하면 편리합니다']
  },

  'variables': {
    title: '변수',
    color: '#98607F',
    description: '값을 저장하고 읽는 변수 블록',
    subsections: [
      {
        label: 'C언어 변수',
        blocks: [
          { id: 'variable_declare', name: 'C언어 변수 선언', params: ['TYPE', 'VAR_NAME', 'VALUE'], output: null, description: '타입 지정 변수 선언 (초기값 포함)' },
          { id: 'variable_declare_novalue', name: '변수 선언 (초기값 없음)', params: ['TYPE', 'VAR_NAME'], output: null, description: '초기값 없는 변수 선언' },
          { id: 'variable_declare_set', name: '선언 변수에 값 저장', params: ['VAR_NAME', 'VALUE'], output: null, description: '선언된 변수에 값 대입' },
          { id: 'variable_declare_change', name: '선언 변수 값 변경', params: ['VAR_NAME', 'DELTA'], output: null, description: '선언된 변수 값 증감' },
          { id: 'variable_declare_get', name: '선언 변수 값 읽기', params: ['VAR_NAME'], output: 'Any', description: '선언된 변수 값 가져오기' }
        ]
      },
      {
        label: '숫자 변수',
        blocks: [
          { id: 'number_variable_set', name: '숫자 변수 설정', params: ['VALUE'], output: null, description: '숫자(float) 변수에 값 저장' },
          { id: 'number_variable_get', name: '숫자 변수 읽기', params: null, output: 'Number', description: '숫자(float) 변수 값 가져오기' },
          { id: 'math_change', name: '변수 값 변경', params: ['DELTA'], output: null, description: '변수에 값을 더하거나 빼기' }
        ]
      },
      {
        label: '문자열 변수',
        blocks: [
          { id: 'string_variable_set', name: '문자열 변수 설정', params: ['VALUE'], output: null, description: '문자열(String) 변수에 값 저장' },
          { id: 'string_variable_get', name: '문자열 변수 읽기', params: null, output: 'String', description: '문자열(String) 변수 값 가져오기' }
        ]
      }
    ],
    tips: ['간단한 프로젝트는 숫자/문자열 변수를, 고급 제어는 C언어 변수 선언을 사용하세요']
  },

  'list': {
    title: '리스트',
    color: '#59ACF7',
    description: '배열(리스트) 생성 및 조작 블록',
    blocks: [
      { id: 'array_create', name: '배열 생성', params: ['VALUES'], output: null, description: '값을 지정하여 배열 생성' },
      { id: 'array_create_empty', name: '빈 배열 생성', params: ['SIZE'], output: null, description: '지정 크기의 빈 배열' },
      { id: 'array_get', name: '배열 요소 읽기', params: ['INDEX'], output: 'Any', description: '인덱스 위치의 값 가져오기' },
      { id: 'array_set', name: '배열 요소 설정', params: ['INDEX', 'VALUE'], output: null, description: '인덱스 위치에 값 저장' },
      { id: 'array_append', name: '배열 요소 추가', params: ['VALUE'], output: null, description: '배열 끝에 값 추가' },
      { id: 'array_remove', name: '배열 요소 삭제', params: ['INDEX'], output: null, description: '인덱스 위치 요소 삭제' },
      { id: 'array_find', name: '배열에서 값 찾기', params: ['VALUE'], output: 'Number', description: '값의 인덱스 반환 (-1이면 없음)' },
      { id: 'array_length', name: '배열 길이', params: null, output: 'Number', description: '배열 요소 개수' },
      { id: 'array_clear', name: '배열 초기화', params: ['VALUE'], output: null, description: '배열 전체를 지정 값으로 채우기' },
      { id: 'array_copy', name: '배열 복사', params: null, output: null, description: '배열 복제' },
      { id: 'array_strlen', name: '문자배열 길이', params: null, output: 'Number', description: '문자 배열(char[])의 실제 길이' },
      { id: 'array_contains', name: '배열 포함 여부', params: ['VALUE'], output: 'Boolean', description: '값이 배열에 있는지 확인' }
    ],
    tips: ['배열 인덱스는 0부터 시작합니다']
  },

  'functions': {
    title: '함수',
    color: '#8E61A3',
    description: '재사용 가능한 코드 묶음을 정의하는 함수 블록',
    blocks: [
      { id: 'procedures_defnoreturn', name: '함수 정의 (반환 없음)', params: null, output: null, description: '반환값 없는 함수 정의' },
      { id: 'procedures_defreturn', name: '함수 정의 (반환 있음)', params: null, output: null, description: '반환값 있는 함수 정의' },
      { id: 'procedures_callnoreturn', name: '함수 호출 (반환 없음)', params: null, output: null, description: '반환값 없는 함수 실행' },
      { id: 'procedures_callreturn', name: '함수 호출 (반환 있음)', params: null, output: 'Any', description: '반환값 있는 함수 실행' },
      { id: 'procedures_ifreturn', name: '조건부 반환', params: ['CONDITION', 'VALUE'], output: null, description: '조건이 참이면 값 반환' },
      { id: 'procedures_ifreturn_void', name: '조건부 반환 (void)', params: ['CONDITION'], output: null, description: '조건이 참이면 함수 종료' }
    ],
    tips: ['반복되는 코드는 함수로 묶으면 프로그램이 깔끔해집니다']
  },

  'utility': {
    title: '유틸리티',
    color: '#08B89F',
    description: '값 변환, I2C 스캔, 블록 기록, 타이머 등 유용한 도구 블록',
    subsections: [
      {
        label: '값 변환',
        blocks: [
          { id: 'util_millis', name: 'millis()', params: null, output: 'Number', description: '프로그램 시작 후 경과 밀리초' },
          { id: 'util_map', name: '값 매핑', params: ['VALUE', 'FROMLOW', 'FROMHIGH', 'TOLOW', 'TOHIGH'], output: 'Number', description: '값의 범위를 다른 범위로 변환' },
          { id: 'util_constrain', name: '값 제한', params: ['VALUE', 'LOW', 'HIGH'], output: 'Number', description: '값을 최소~최대 범위로 제한' },
          { id: 'util_convert', name: '형변환', params: ['VALUE'], output: 'Any', description: '데이터 타입 변환 (int, float, String 등)' },
          { id: 'util_to_char', name: 'ASCII→문자', params: ['VALUE'], output: 'String', description: 'ASCII 코드를 문자로 변환' },
          { id: 'util_to_ascii', name: '문자→ASCII', params: ['VALUE'], output: 'Number', description: '문자를 ASCII 코드로 변환' }
        ]
      },
      {
        label: 'I2C 도구',
        blocks: [
          { id: 'util_i2c_scanner', name: 'I2C 스캐너', params: null, output: null, description: '연결된 I2C 장치 주소 검색' },
          { id: 'util_i2c_read_address', name: 'I2C 주소 읽기', params: null, output: 'Number', description: '감지된 I2C 주소 반환' }
        ]
      },
      {
        label: '블록 조립 기록/재생',
        blocks: [
          { id: 'util_record_start', name: '기록 시작', params: null, output: null, description: '블록 조립 과정 기록 시작' },
          { id: 'util_record_stop', name: '기록 중지', params: null, output: null, description: '기록 중지' },
          { id: 'util_record_play', name: '기록 재생', params: null, output: null, description: '기록된 블록 조립 과정 재생' },
          { id: 'util_record_play_stop', name: '재생 중지', params: null, output: null, description: '재생 중지' },
          { id: 'util_record_reset', name: '기록 초기화', params: null, output: null, description: '기록 데이터 삭제' }
        ]
      },
      {
        label: '블록 기록 정보',
        blocks: [
          { id: 'util_record_status', name: '기록 상태', params: null, output: 'String', description: '현재 기록/재생 상태 반환' },
          { id: 'util_record_event_count', name: '기록 이벤트 수', params: null, output: 'Number', description: '기록된 이벤트 개수' },
          { id: 'util_record_duration', name: '기록 시간', params: null, output: 'Number', description: '기록 총 시간(ms)' },
          { id: 'util_record_start_time', name: '기록 시작 시간', params: null, output: 'Number', description: '기록 시작 타임스탬프' },
          { id: 'util_record_end_time', name: '기록 종료 시간', params: null, output: 'Number', description: '기록 종료 타임스탬프' }
        ]
      },
      {
        label: '논블로킹 타이머',
        blocks: [
          { id: 'util_interval', name: 'N ms마다 실행', params: ['INTERVAL'], output: null, description: '논블로킹 주기 실행' },
          { id: 'util_stopwatch_reset', name: '스톱워치 초기화', params: ['TIMER'], output: null, description: '스톱워치 타이머 리셋' },
          { id: 'util_stopwatch_elapsed', name: '스톱워치 경과 시간', params: ['TIMER'], output: 'Number', description: '경과 시간(ms) 반환' },
          { id: 'util_timeout', name: 'N ms 뒤 실행', params: ['DELAY'], output: null, description: '논블로킹 1회 지연 실행' }
        ]
      }
    ],
    tips: ['util_map은 센서값을 PWM 출력으로 변환할 때 자주 사용', '블록 조립 기록은 학생들의 코딩 과정을 기록하고 재생하는 데 활용']
  },
  /* ──────────────────────────────────────────────
     HARDWARE SECTIONS
     ────────────────────────────────────────────── */

  'display-a': {
    title: '디스플레이 A',
    color: '#FAC907',
    description: 'LCD, 7세그먼트(TM1637), NeoPixel 블록',
    hardwareImages: [
      { src: 'assets/DIS_001_I2C_1602_LCD.jpg', label: 'I2C 1602 LCD' },
      { src: 'assets/DIS_010_7Segment.jpg', label: '7세그먼트 (TM1637)' },
      { src: 'assets/DIS_013_Neo_Pixels_Ring.jpg', label: '네오픽셀 링' },
      { src: 'assets/DIS_014_Neo_Pixels_Square.jpg', label: '네오픽셀 사각' }
    ],
    subsections: [
      {
        label: 'LCD 디스플레이 (I2C)',
        blocks: [
          { id: 'lcd_i2c_setup', name: 'LCD 초기화', params: ['LCD_NUM', 'ADDR', 'COLS', 'ROWS'], output: null, description: 'I2C LCD 모듈 초기화 (주소, 열, 행 설정)' },
          { id: 'lcd_i2c_print', name: 'LCD 텍스트 출력', params: ['LCD_NUM', 'ROW', 'COL', 'TEXT'], output: null, description: '지정 위치에 텍스트 출력' },
          { id: 'lcd_i2c_clear', name: 'LCD 화면 지우기', params: ['LCD_NUM'], output: null, description: 'LCD 화면 전체 지우기' },
          { id: 'lcd_i2c_set_cursor', name: 'LCD 커서 이동', params: ['LCD_NUM', 'ROW', 'COL'], output: null, description: '커서 위치 이동' },
          { id: 'lcd_i2c_cursor', name: 'LCD 커서 표시', params: ['LCD_NUM'], output: null, description: '커서 표시/숨김 제어' },
          { id: 'lcd_i2c_backlight', name: 'LCD 백라이트', params: ['LCD_NUM'], output: null, description: '백라이트 ON/OFF' },
          { id: 'lcd_i2c_display', name: 'LCD 디스플레이 ON/OFF', params: ['LCD_NUM'], output: null, description: 'LCD 화면 표시/끄기' },
          { id: 'lcd_i2c_scroll', name: 'LCD 스크롤', params: ['LCD_NUM'], output: null, description: 'LCD 화면 좌/우 스크롤' }
        ]
      },
      {
        label: '7세그먼트 (TM1637)',
        blocks: [
          { id: 'tm1637_setup', name: 'TM1637 초기화', params: ['CLK_PIN', 'DATA_PIN'], output: null, description: 'TM1637 4자리 디스플레이 초기화' },
          { id: 'tm1637_display_number', name: '숫자 표시', params: ['NUMBER'], output: null, description: '4자리 숫자 표시' },
          { id: 'tm1637_display_time', name: '시간 표시', params: ['HOUR', 'MINUTE'], output: null, description: '시:분 형태 표시' },
          { id: 'tm1637_display_text', name: '텍스트 표시', params: ['TEXT'], output: null, description: '영문 텍스트 표시' },
          { id: 'tm1637_display_digit', name: '자릿수별 표시', params: ['POSITION', 'VALUE'], output: null, description: '특정 자릿수에 개별 숫자 표시' },
          { id: 'tm1637_clear', name: '화면 지우기', params: null, output: null, description: '디스플레이 지우기' },
          { id: 'tm1637_brightness', name: '밝기 설정', params: null, output: null, description: '밝기 조절 (0~7)' },
          { id: 'tm1637_colon', name: '콜론 표시', params: null, output: null, description: '가운데 콜론(:) ON/OFF' }
        ]
      },
      {
        label: 'NeoPixel LED',
        blocks: [
          { id: 'neopixel_setup', name: 'NeoPixel 초기화', params: ['PIN', 'LED_COUNT', 'TYPE'], output: null, description: 'NeoPixel LED 스트립 초기화' },
          { id: 'neopixel_set_rgb', name: 'RGB 색상 설정', params: ['STRIP_NUM', 'LED_INDEX', 'R', 'G', 'B'], output: null, description: '특정 LED의 RGB 색상 설정' },
          { id: 'neopixel_set_rgbw', name: 'RGBW 색상 설정', params: ['STRIP_NUM', 'LED_INDEX', 'R', 'G', 'B', 'W'], output: null, description: '특정 LED의 RGBW 색상 설정 (White 포함)' },
          { id: 'neopixel_show', name: 'NeoPixel 업데이트', params: ['STRIP_NUM'], output: null, description: '설정한 색상을 LED에 반영' },
          { id: 'neopixel_brightness', name: '밝기 설정', params: ['STRIP_NUM', 'BRI'], output: null, description: '전체 밝기 조절' },
          { id: 'neopixel_clear', name: 'NeoPixel 끄기', params: ['STRIP_NUM'], output: null, description: '모든 LED 끄기' },
          { id: 'neopixel_fill_rgb_all', name: '전체 색상 채우기', params: ['STRIP_NUM', 'R', 'G', 'B'], output: null, description: '모든 LED를 같은 색상으로' },
          { id: 'neopixel_anim_rainbow', name: '무지개 애니메이션', params: ['STRIP_NUM', 'WAIT', 'LOOPS'], output: null, description: '무지개 색 순환 효과' },
          { id: 'neopixel_anim_shift', name: '시프트 애니메이션', params: ['STRIP_NUM', 'STEPS', 'WAIT'], output: null, description: 'LED 색상을 좌/우로 회전 이동' },
          { id: 'neopixel_anim_breathe', name: '브리딩 애니메이션', params: ['STRIP_NUM', 'R', 'G', 'B'], output: null, description: '밝기 펄스(숨쉬기) 효과' }
        ]
      }
    ],
    tips: ['LCD I2C 주소는 보통 0x27 또는 0x3F', 'NeoPixel은 5V 전원 필요, 데이터 핀에 470옴 저항 권장']
  },

  'display-b': {
    title: '디스플레이 B',
    color: '#FAC907',
    description: 'OLED (SSD1306, SH110X, SH1106), LED 매트릭스 (HT16K33) 블록',
    hardwareImages: [
      { src: 'assets/DIS_011_OLED_096_SSD1306.jpg', label: 'OLED 0.96" SSD1306' },
      { src: 'assets/DIS_012_OLED_1.3_SH1106.jpg', label: 'OLED 1.3" SH1106' },
      { src: 'assets/DIS_016_Dot_Matrix_8x8_I2C.jpg', label: '도트 매트릭스 8x8 (HT16K33)' },
      { src: 'assets/DIS_018_Dot_Matrix_8x16_I2C.jpg', label: '도트 매트릭스 8x16 (HT16K33)' }
    ],
    subsections: [
      {
        label: 'SSD1306 OLED',
        blocks: [
          { id: 'ssd1306_setup_i2c', name: 'SSD1306 초기화', params: ['NUM', 'RST'], output: null, description: 'SSD1306 OLED I2C 초기화' },
          { id: 'ssd1306_text', name: '텍스트 출력', params: ['NUM', 'TEXT', 'X', 'Y', 'SIZE'], output: null, description: 'OLED에 텍스트 표시' },
          { id: 'ssd1306_control', name: '디스플레이 제어', params: ['NUM'], output: null, description: 'display/clear 제어' },
          { id: 'ssd1306_dim', name: '밝기 조절', params: ['NUM'], output: null, description: 'OLED 밝기 어둡게/밝게 전환' },
          { id: 'ssd1306_pixel', name: '픽셀 그리기', params: ['NUM', 'X', 'Y'], output: null, description: '단일 픽셀 표시' },
          { id: 'ssd1306_line', name: '선 그리기', params: ['NUM', 'X1', 'Y1', 'X2', 'Y2'], output: null, description: '두 점 사이 직선' },
          { id: 'ssd1306_rect', name: '사각형 그리기', params: ['NUM', 'X', 'Y', 'W', 'H'], output: null, description: '사각형 도형' },
          { id: 'ssd1306_circle', name: '원 그리기', params: ['NUM', 'X', 'Y', 'R'], output: null, description: '원 도형' },
          { id: 'ssd1306_scroll', name: '화면 스크롤', params: ['NUM'], output: null, description: 'OLED 화면 스크롤 효과' },
          { id: 'ssd1306_bitmap', name: '비트맵 표시', params: ['NUM', 'X', 'Y', 'W', 'H'], output: null, description: 'OLED에 비트맵 이미지 표시' }
        ]
      },
      {
        label: '한글 OLED (SSD1306)',
        blocks: [
          { id: 'oled_han_setup', name: '한글 OLED 초기화', params: null, output: null, description: '한글 지원 OLED 디스플레이 초기화' },
          { id: 'oled_han_clear', name: '한글 OLED 지우기', params: null, output: null, description: '한글 OLED 화면 지우기' },
          { id: 'oled_han_print_text', name: '한글 텍스트 출력', params: ['TEXT', 'X', 'Y'], output: null, description: '한글/영어/숫자 혼합 텍스트 출력' },
          { id: 'oled_han_big_digit', name: '큰 숫자 표시', params: ['DIGIT', 'X', 'Y'], output: null, description: '7세그먼트 스타일 큰 숫자 (0~9)' },
          { id: 'oled_han_draw_bar', name: '바 그래프', params: ['X', 'Y', 'VALUE'], output: null, description: '수평 바 그래프 (0~128)' }
        ]
      },
      {
        label: 'HT16K33 LED 매트릭스',
        blocks: [
          { id: 'ht16k33_setup', name: 'HT16K33 초기화', params: ['BRI'], output: null, description: 'LED 매트릭스 초기화' },
          { id: 'ht16k33_scroll_text', name: '텍스트 스크롤', params: ['NUM', 'TEXT', 'SEC'], output: null, description: '텍스트 스크롤 표시' },
          { id: 'ht16k33_show', name: '화면 업데이트', params: ['NUM'], output: null, description: '버퍼 내용을 매트릭스에 반영' },
          { id: 'ht16k33_clear', name: '화면 지우기', params: ['NUM'], output: null, description: '매트릭스 초기화' },
          { id: 'ht16k33_set_brightness', name: '밝기 설정', params: null, output: null, description: '매트릭스 밝기 조절' },
          { id: 'ht16k33_set_blink', name: '깜빡임 설정', params: null, output: null, description: '매트릭스 깜빡임 속도' },
          { id: 'ht16k33_pixel', name: '픽셀 (단색)', params: ['NUM', 'ROW', 'COL'], output: null, description: '단색 매트릭스 LED ON/OFF' },
          { id: 'ht16k33_bicolor_pixel', name: '픽셀 (양색)', params: ['NUM', 'ROW', 'COL', 'COLOR'], output: null, description: '양색 매트릭스 LED 색상 설정' },
          { id: 'ht16k33_pattern_8x8', name: '8x8 패턴', params: ['NUM'], output: null, description: '8x8 LED 패턴 표시' },
          { id: 'ht16k33_pattern_8x16', name: '8x16 패턴', params: ['NUM'], output: null, description: '8x16 LED 패턴 표시' },
          { id: 'ht16k33_line', name: '선 그리기', params: ['R1', 'C1', 'R2', 'C2'], output: null, description: '매트릭스에 직선 그리기' },
          { id: 'ht16k33_circle', name: '원 그리기', params: ['R', 'C', 'RADIUS'], output: null, description: '매트릭스에 원 그리기' },
          { id: 'ht16k33_rect', name: '사각형 그리기', params: ['R', 'C', 'W', 'H'], output: null, description: '매트릭스에 사각형 그리기' }
        ]
      },
      {
        label: 'SH110X OLED',
        blocks: [
          { id: 'sh110x_setup_i2c', name: 'SH110X 초기화', params: ['NUM', 'RST', 'WIDTH', 'HEIGHT'], output: null, description: 'SH110X OLED 초기화' },
          { id: 'sh110x_text', name: '텍스트 출력', params: ['NUM', 'TXT', 'X', 'Y', 'SIZE'], output: null, description: 'SH110X 텍스트 표시' },
          { id: 'sh110x_display', name: '화면 표시', params: ['NUM'], output: null, description: '버퍼를 화면에 반영' },
          { id: 'sh110x_clear', name: '화면 지우기', params: ['NUM'], output: null, description: '화면 초기화' },
          { id: 'sh110x_control', name: '디스플레이 제어', params: ['NUM'], output: null, description: 'display/clear/invert 제어' },
          { id: 'sh110x_pixel', name: '픽셀 그리기', params: ['NUM', 'X', 'Y'], output: null, description: '단일 픽셀 표시' },
          { id: 'sh110x_line', name: '선 그리기', params: ['NUM', 'X1', 'Y1', 'X2', 'Y2'], output: null, description: '두 점 사이 직선' },
          { id: 'sh110x_rect', name: '사각형 그리기', params: ['NUM', 'X', 'Y', 'W', 'H'], output: null, description: '사각형 도형' },
          { id: 'sh110x_circle', name: '원 그리기', params: ['NUM', 'X', 'Y', 'R'], output: null, description: '원 도형' },
          { id: 'sh110x_contrast', name: '대비 조절', params: ['NUM', 'VALUE'], output: null, description: 'OLED 대비 설정' },
          { id: 'sh110x_bitmap', name: '비트맵 표시', params: ['NUM', 'X', 'Y', 'W', 'H'], output: null, description: 'SH110X 비트맵 이미지 표시' }
        ]
      },
      {
        label: '한글 SH1106 OLED',
        blocks: [
          { id: 'sh1106_setup', name: 'SH1106 한글 초기화', params: null, output: null, description: 'SH1106 한글 OLED 초기화' },
          { id: 'sh1106_clear', name: 'SH1106 화면 지우기', params: null, output: null, description: 'SH1106 화면 지우기' },
          { id: 'sh1106_print_text', name: 'SH1106 한글 텍스트', params: ['TEXT', 'X', 'Y'], output: null, description: '한글 텍스트 출력' },
          { id: 'sh1106_large_number', name: 'SH1106 큰 숫자', params: ['NUM', 'X', 'Y'], output: null, description: '큰 숫자 표시' },
          { id: 'sh1106_draw_bar', name: 'SH1106 바 그래프', params: ['X', 'Y', 'VALUE'], output: null, description: '수평 바 그래프' }
        ]
      }
    ],
    tips: ['SSD1306은 0.96인치(128x64), SH1106은 1.3인치', 'OLED 기본 I2C 주소: 0x3C', 'HT16K33은 8x8 또는 8x16 LED 매트릭스 지원']
  },

  'sensors-a': {
    title: '센서 A',
    color: '#FF6F00',
    description: '초음파, 온습도, 무게, 로터리, 서미스터, 미세먼지, CO2, TDS, pH, 지문, 탁도, UV 센서 블록',
    hardwareImages: [
      { src: 'assets/D_007_Ultrasonic_Sensor.jpg', label: '초음파 센서' },
      { src: 'assets/D_008_Ultrasonic_Sensor_Adapter.jpg', label: '초음파 어댑터' },
      { src: 'assets/D_009_Ultrasonic_Sensor_V2.jpg', label: '초음파 센서 V2' },
      { src: 'assets/D_001_Temp_and_Humi_DHT11.jpg', label: 'DHT11 온습도 센서' },
      { src: 'assets/D_002_Temp_and_Humi_DHT22.jpg', label: 'DHT22 온습도 센서' },
      { src: 'assets/A_003_Water_Temp.jpg', label: '수온 센서 (DS18B20)' },
      { src: 'assets/A_004_Water_Temp_prob.jpg', label: '수온 프로브' },
      { src: 'assets/I2C_010_Weight_Sensor_I2C_HX711.jpg', label: 'HX711 무게 센서' },
      { src: 'assets/I2C_011_Weight_Sensor_Plate.jpg', label: '무게 센서 플레이트' },
      { src: 'assets/D_028_Rotary_Encoder.jpg', label: '로터리 엔코더' },
      { src: 'assets/A_005_NTC_Temp.jpg', label: 'NTC 서미스터' },
      { src: 'assets/A_001_High_Temperature_Sensor.jpg', label: '고온 센서' },
      { src: 'assets/A_002_High_Temperature_Sensor_prob.jpg', label: '고온 센서 프로브' },
      { src: 'assets/D_004_PMS7003_Sensor.jpg', label: '미세먼지 PMS7003' },
      { src: 'assets/D_005_PMS3003_adapter.jpg', label: 'PMS3003 어댑터' },
      { src: 'assets/D_006_PMS3003_Sensor.png', label: 'PMS3003 센서' },
      { src: 'assets/A_016_Fine_Dust.jpg', label: '미세먼지 센서' },
      { src: 'assets/A_017_Fine_Dust_prob.jpg', label: '미세먼지 프로브' },
      { src: 'assets/A_018_Fine_Dust_Sensor.jpg', label: '미세먼지 센서 모듈' },
      { src: 'assets/D_003_CO2_Sensor_Z219D.jpg', label: 'CO2 센서 MH-Z19' },
      { src: 'assets/A_011_Electrical_Conduction.jpg', label: 'TDS 센서' },
      { src: 'assets/A_012_Electrical_Conduction_sensor.jpg', label: 'TDS 프로브' },
      { src: 'assets/A_009_PH_Sensor.jpg', label: 'pH 센서' },
      { src: 'assets/A_010_PH_Sensor_prob.jpg', label: 'pH 프로브' },
      { src: 'assets/D_029_Fingerprint_Sensor_AS608.jpg', label: '지문 센서 AS608' },
      { src: 'assets/D_030_Fingerprint_Sensor_Adapter.png', label: '지문 센서 어댑터' },
      { src: 'assets/A_013_Turbidity_Sensor.jpg', label: '탁도 센서' },
      { src: 'assets/A_014_Turbidity_Sensor_prob.png', label: '탁도 프로브' },
      { src: 'assets/A_007_UV_Sensor_V2.jpg', label: 'UV 센서' }
    ],
    subsections: [
      {
        label: '초음파 센서',
        blocks: [
          { id: 'ultrasonic_setup', name: '초음파 초기화', params: ['TRIG', 'ECHO'], output: null, description: '초음파 센서 핀 설정 (Trig/Echo)' },
          { id: 'ultrasonic_distance', name: '거리 측정', params: null, output: 'Number', description: 'cm 단위 거리 반환' }
        ]
      },
      {
        label: 'DHT 온습도 센서',
        blocks: [
          { id: 'dht_setup', name: 'DHT 초기화', params: ['PIN', 'TYPE'], output: null, description: 'DHT11/DHT22 센서 설정' },
          { id: 'dht_read_temperature', name: '온도 읽기', params: ['PIN'], output: 'Number', description: '섭씨 온도 반환' },
          { id: 'dht_read_humidity', name: '습도 읽기', params: ['PIN'], output: 'Number', description: '상대 습도(%) 반환' },
          { id: 'dht_convert_temperature', name: '온도 변환', params: ['TEMP', 'FROM', 'TO'], output: 'Number', description: '섭씨↔화씨 온도 변환' },
          { id: 'dht_heat_index', name: '체감온도', params: ['TEMPERATURE', 'HUMIDITY'], output: 'Number', description: '체감온도 계산' }
        ]
      },
      {
        label: 'Dallas 온도 센서 (DS18B20)',
        blocks: [
          { id: 'dallas_temp_setup', name: 'Dallas 초기화', params: ['PIN'], output: null, description: 'DS18B20 수온/온도 센서 설정' },
          { id: 'dallas_temp_request', name: '온도 요청', params: null, output: null, description: '모든 Dallas 센서에 온도 측정 요청' },
          { id: 'dallas_temp_read', name: '온도 읽기', params: ['INDEX', 'UNIT'], output: 'Number', description: '측정된 온도 반환 (섭씨/화씨)' },
          { id: 'dallas_temp_count', name: '센서 개수', params: null, output: 'Number', description: '연결된 Dallas 센서 수' }
        ]
      },
      {
        label: '무게 센서 (HX711)',
        blocks: [
          { id: 'hx711_setup', name: 'HX711 초기화', params: ['DOUT_PIN', 'CLK_PIN', 'GAIN'], output: null, description: '로드셀 앰프 초기화' },
          { id: 'hx711_get_weight', name: '무게 읽기', params: null, output: 'Number', description: '보정된 무게 값 반환(g)' },
          { id: 'hx711_tare', name: '영점 조정', params: ['TIMES'], output: null, description: '저울 영점 설정 (평균 횟수)' },
          { id: 'hx711_set_scale', name: '스케일 설정', params: ['SCALE'], output: null, description: '보정 계수 설정' },
          { id: 'hx711_is_ready', name: '준비 상태', params: null, output: 'Boolean', description: 'HX711 데이터 읽기 준비 확인' },
          { id: 'hx711_power_control', name: '전원 제어', params: null, output: null, description: 'HX711 전원 ON/OFF' },
          { id: 'hx711_read_data', name: '데이터 읽기', params: null, output: 'Number', description: 'HX711 원시/평균/단위 데이터 읽기' }
        ]
      },
      {
        label: 'I2C 무게 센서',
        blocks: [
          { id: 'i2c_weight_setup', name: 'I2C 무게 초기화', params: ['ADDR'], output: null, description: 'I2C 무게 센서 슬레이브 주소 설정' },
          { id: 'i2c_weight_read', name: '무게 읽기', params: null, output: 'Number', description: 'I2C 무게 센서 값 읽기' },
          { id: 'i2c_weight_available', name: '센서 연결 확인', params: null, output: 'Boolean', description: 'I2C 무게 센서 응답 확인' },
          { id: 'i2c_weight_raw_data', name: '원시 데이터', params: null, output: 'Number', description: 'I2C 무게 센서 원시 바이트 읽기' }
        ]
      },
      {
        label: '로터리 엔코더',
        blocks: [
          { id: 'rotary_setup', name: '로터리 초기화', params: ['DT_PIN', 'CLK_PIN'], output: null, description: '로터리 엔코더 핀 설정' },
          { id: 'rotary_get_value', name: '값 읽기', params: null, output: 'Number', description: '현재 회전값' },
          { id: 'rotary_direction', name: '방향', params: null, output: 'Number', description: '회전 방향 (CW/CCW)' },
          { id: 'rotary_counter', name: '카운터', params: null, output: 'Number', description: '누적 회전 카운트' },
          { id: 'rotary_reset_counter', name: '카운터 초기화', params: null, output: null, description: '회전 카운트 리셋' }
        ]
      },
      {
        label: '서미스터 (NTC)',
        blocks: [
          { id: 'thermistor_setup', name: '서미스터 초기화', params: ['PIN'], output: null, description: 'NTC 서미스터 핀 설정' },
          { id: 'thermistor_read_temperature', name: '온도 읽기', params: null, output: 'Number', description: '서미스터 온도 값 반환' },
          { id: 'thermistor_read_raw', name: '원시값 읽기', params: null, output: 'Number', description: '아날로그 원시값 반환' },
          { id: 'thermistor_get_resistance', name: '저항값 읽기', params: null, output: 'Number', description: '서미스터 저항값(Ω) 반환' }
        ]
      },
      {
        label: '미세먼지 센서 (PMS)',
        blocks: [
          { id: 'pms_setup', name: 'PMS 초기화', params: ['RX_PIN', 'TX_PIN', 'BAUD'], output: null, description: 'PMS 미세먼지 센서 설정' },
          { id: 'pms_power_control', name: 'PMS 전원 제어', params: null, output: null, description: 'PMS 센서 전원 ON/OFF' },
          { id: 'pms_set_mode', name: 'PMS 모드 설정', params: null, output: null, description: 'PMS 작동 모드(능동/수동) 설정' },
          { id: 'pms_read_data', name: '미세먼지 읽기', params: null, output: 'Number', description: 'PM1.0/PM2.5/PM10 농도(μg/m³)' },
          { id: 'pms_request_read', name: '데이터 요청', params: null, output: null, description: '수동 모드에서 데이터 요청' },
          { id: 'pms_data_available', name: '데이터 유효', params: null, output: 'Boolean', description: 'PMS 데이터 수신 완료 확인' }
        ]
      },
      {
        label: 'CO2 센서 (MH-Z19)',
        blocks: [
          { id: 'mhz19_setup', name: 'MH-Z19 초기화', params: ['RX_PIN', 'TX_PIN', 'BAUD'], output: null, description: 'MH-Z19 CO2 센서 설정' },
          { id: 'mhz19_set_range', name: '측정 범위 설정', params: ['RANGE'], output: null, description: 'CO2 측정 범위(ppm) 설정' },
          { id: 'mhz19_filter_mode', name: '필터 설정', params: null, output: null, description: 'MH-Z19 필터 유형 설정' },
          { id: 'mhz19_read_value', name: 'CO2 읽기', params: null, output: 'Number', description: 'CO2 농도/온도 값 반환' },
          { id: 'mhz19_calibration', name: '교정', params: null, output: null, description: 'MH-Z19 센서 교정' },
          { id: 'mhz19_get_status', name: '상태 정보', params: null, output: 'Number', description: 'MH-Z19 상태 정보 반환' }
        ]
      },
      {
        label: 'TDS 수질 센서',
        blocks: [
          { id: 'gravity_tds_setup', name: 'TDS 초기화', params: ['PIN'], output: null, description: 'TDS 수질 센서 아날로그 핀 설정' },
          { id: 'gravity_tds_set_temp', name: '온도 보정', params: ['TEMP'], output: null, description: 'TDS 온도 보정값 설정 (°C)' },
          { id: 'gravity_tds_update', name: 'TDS 업데이트', params: null, output: null, description: 'TDS 센서 값 갱신' },
          { id: 'gravity_tds_read_value', name: 'TDS 값 읽기', params: null, output: 'Number', description: 'TDS/전압/온도 값 반환' },
          { id: 'gravity_tds_advanced_config', name: 'TDS 고급 설정', params: null, output: null, description: 'TDS 고급 파라미터 설정' }
        ]
      },
      {
        label: 'pH 센서',
        blocks: [
          { id: 'dfrobot_ph_setup', name: 'pH 초기화', params: ['PIN'], output: null, description: 'pH 센서 아날로그 핀 설정' },
          { id: 'dfrobot_ph_read', name: 'pH 값 읽기', params: ['TEMPERATURE'], output: 'Number', description: '온도 보정된 pH 값 반환' },
          { id: 'dfrobot_ph_voltage', name: 'pH 전압 읽기', params: null, output: 'Number', description: 'pH 센서 원시 전압 반환' },
          { id: 'dfrobot_ph_calibration', name: 'pH 교정', params: null, output: null, description: 'pH 센서 보정 명령 전송' }
        ]
      },
      {
        label: '지문 센서 (AS608)',
        blocks: [
          { id: 'fingerprint_setup', name: '지문 센서 초기화', params: ['RX', 'TX', 'BAUD'], output: null, description: '지문 센서 시리얼 설정' },
          { id: 'fingerprint_enroll_process', name: '지문 등록', params: ['ID'], output: null, description: '지문 등록 프로세스 실행' },
          { id: 'fingerprint_search', name: '지문 검색', params: null, output: 'Boolean', description: '등록된 지문 일치 검색' },
          { id: 'fingerprint_get_result', name: '검색 결과', params: null, output: 'Number', description: '일치 ID/신뢰도 반환' },
          { id: 'fingerprint_database', name: 'DB 관리', params: ['ID'], output: null, description: '지문 데이터베이스 삭제/초기화' },
          { id: 'fingerprint_led_control', name: 'LED 제어', params: null, output: null, description: '지문 센서 LED ON/OFF' }
        ]
      },
      {
        label: '탁도 센서',
        blocks: [
          { id: 'turbidity_setup', name: '탁도 초기화', params: ['PIN'], output: null, description: '탁도 센서 아날로그 핀 설정' },
          { id: 'turbidity_calibrate', name: '탁도 교정', params: null, output: null, description: '탁도 센서 교정' },
          { id: 'turbidity_update', name: '탁도 업데이트', params: null, output: null, description: '탁도 센서 값 갱신' },
          { id: 'turbidity_read_value', name: '탁도 값 읽기', params: null, output: 'Number', description: '탁도(NTU)/전압 반환' }
        ]
      },
      {
        label: 'UV 센서',
        blocks: [
          { id: 'uv_sensor_setup', name: 'UV 초기화', params: ['PIN'], output: null, description: 'UV 센서 아날로그 핀 설정' },
          { id: 'uv_sensor_calibrate', name: 'UV 교정', params: null, output: null, description: 'UV 센서 교정' },
          { id: 'uv_sensor_read_value', name: 'UV 값 읽기', params: null, output: 'Number', description: 'UV 지수/전압 반환' }
        ]
      },
      {
        label: '필터 / 교정 도구',
        blocks: [
          { id: 'util_filter_moving_avg', name: '이동평균 필터', params: ['VALUE', 'SAMPLES'], output: 'Number', description: '노이즈 제거용 이동평균 필터' },
          { id: 'util_filter_ema', name: '지수평활 필터', params: ['VALUE', 'ALPHA'], output: 'Number', description: 'EMA 방식 노이즈 필터' },
          { id: 'util_filter_median', name: '중앙값 필터', params: ['VALUE', 'WINDOW'], output: 'Number', description: '이상치 제거용 중앙값 필터' },
          { id: 'util_filter_range', name: '범위제한 필터', params: ['VALUE', 'MIN', 'MAX'], output: 'Number', description: '범위 밖 값 제거 필터' },
          { id: 'util_cal_setup', name: '2점 교정 설정', params: ['NAME', 'RAW1', 'REF1', 'RAW2', 'REF2'], output: null, description: '센서 2점 교정 데이터 설정' },
          { id: 'util_cal_apply', name: '교정 적용', params: ['NAME', 'VALUE'], output: 'Number', description: '교정 데이터로 값 보정' },
          { id: 'util_cal_offset', name: '오프셋 보정', params: ['VALUE', 'OFFSET'], output: 'Number', description: '값에 오프셋 적용' },
          { id: 'util_adc_stable', name: '안정 아날로그 읽기', params: ['PIN'], output: 'Number', description: '노이즈 제거된 안정적 아날로그 읽기' },
          { id: 'util_adc_oversample', name: '오버샘플링 읽기', params: ['PIN', 'SAMPLES'], output: 'Number', description: '오버샘플링 방식 아날로그 읽기' }
        ]
      }
    ],
    tips: ['초음파 센서는 Trig/Echo 핀을 올바르게 연결', 'DHT11은 정수, DHT22는 소수점 온습도 측정 가능', '필터 블록은 센서 노이즈를 줄이는 데 효과적']
  },

  'sensors-b': {
    title: '센서 B',
    color: '#4D68EC',
    description: 'RTC, 기압, 자이로, 가스, 거리, 온습도, 색상, 적외선온도, 제스처, 심박, 온습도(SI7021) I2C 센서 블록',
    hardwareImages: [
      { src: 'assets/I2C_006_Barometric_Altitude_BMP280.jpg', label: '기압/고도 BMP280' },
      { src: 'assets/I2C_007_6Axis_Gyro_MPU6050.jpg', label: '6축 자이로 MPU6050' },
      { src: 'assets/I2C_004_CO2_SGP30_Sensor.jpg', label: 'CO2 SGP30' },
      { src: 'assets/I2C_009_Distance_Sensor_VL053L0x.jpg', label: 'VL53L0X 센서' },
      { src: 'assets/I2C_002_Temp_and_Humi_SHT31.jpg', label: '온습도 SHT31' },
      { src: 'assets/I2C_012_Color_Sensor_TCS34725.jpg', label: '컬러 센서 TCS34725' },
      { src: 'assets/I2C_003_Non_Contact_Temp_Sensor_MAX90614.jpg', label: 'MLX90614 센서' },
      { src: 'assets/I2C_008_Gesture_Sensor_APDS9960.jpg', label: '제스처 APDS9960' },
      { src: 'assets/I2C_013_Heartbit_MAX30102.jpg', label: '심박 MAX30102' }
    ],
    subsections: [
      {
        label: 'RTC (DS1307)',
        blocks: [
          { id: 'ds1307_setup', name: 'RTC 초기화', params: ['NUM'], output: null, description: 'DS1307 실시간 시계 초기화' },
          { id: 'ds1307_set_time', name: '시간 설정', params: ['NUM', 'YEAR', 'MONTH', 'DATE', 'HOUR', 'MINUTE', 'SECOND'], output: null, description: 'RTC에 현재 날짜/시간 설정' },
          { id: 'ds1307_get_time', name: '시간 읽기', params: ['NUM'], output: 'Number', description: '년/월/일/시/분/초 개별 읽기' },
          { id: 'ds1307_clock_control', name: '클록 제어', params: null, output: null, description: 'RTC 클록 시작/정지' },
          { id: 'ds1307_sqw_output', name: 'SQW 출력', params: null, output: null, description: 'SQW 핀 출력 타입 설정' },
          { id: 'ds1307_get_time_string', name: '시간 문자열', params: ['FORMAT'], output: 'String', description: '포맷된 시간 문자열 반환' }
        ]
      },
      {
        label: '기압/고도 센서 (BMP280)',
        blocks: [
          { id: 'bmp280_setup', name: 'BMP280 초기화', params: null, output: null, description: '기압/고도 센서 초기화' },
          { id: 'bmp280_set_sea_pressure', name: '해수면 기압 설정', params: ['PRESSURE'], output: null, description: '고도 계산용 해수면 기압(Pa) 설정' },
          { id: 'bmp280_set_reference', name: '기준 고도 설정', params: ['ALTITUDE'], output: null, description: '기준 고도(m) 설정' },
          { id: 'bmp280_read_value', name: '값 읽기', params: null, output: 'Number', description: '온도/기압/고도 값 반환' }
        ]
      },
      {
        label: '자이로/가속도 센서 (MPU6050)',
        blocks: [
          { id: 'bx_mpu_setup', name: 'MPU6050 초기화', params: null, output: null, description: '6축 자이로/가속도 센서 초기화' },
          { id: 'bx_mpu_update', name: '데이터 갱신', params: null, output: null, description: '센서 값 업데이트' },
          { id: 'bx_mpu_read_value', name: '값 읽기', params: null, output: 'Number', description: '각도/가속도/자이로/온도 반환' },
          { id: 'bx_mpu_set_offsets', name: '오프셋 설정', params: ['X', 'Y', 'Z'], output: null, description: '자이로/가속도 오프셋 수동 설정' },
          { id: 'bx_mpu_calc_offsets', name: '오프셋 자동 계산', params: null, output: null, description: '자동 교정 오프셋 계산' }
        ]
      },
      {
        label: '가스 센서 (SGP30)',
        blocks: [
          { id: 'sgp30_setup', name: 'SGP30 초기화', params: ['EBASE', 'TBASE'], output: null, description: '가스 센서 초기화 (기준선 설정)' },
          { id: 'sgp30_measure', name: '측정', params: null, output: null, description: '가스 농도 측정 실행' },
          { id: 'sgp30_get_eco2', name: 'eCO2 값', params: null, output: 'Number', description: 'CO2 농도(ppm) 반환' },
          { id: 'sgp30_get_tvoc', name: 'TVOC 값', params: null, output: 'Number', description: '총 휘발성 유기화합물(ppb) 반환' },
          { id: 'sgp30_set_humidity', name: '습도 설정', params: null, output: null, description: '습도 보정값 설정' },
          { id: 'sgp30_set_baseline', name: '기준선 설정', params: null, output: null, description: 'SGP30 기준선 수동 설정' },
          { id: 'sgp30_eeprom_save_baseline_fixed', name: 'EEPROM 기준선 저장 (고정)', params: null, output: null, description: '기준선을 EEPROM 고정 주소에 저장' },
          { id: 'sgp30_eeprom_load_baseline_fixed', name: 'EEPROM 기준선 로드 (고정)', params: null, output: null, description: 'EEPROM 고정 주소에서 기준선 로드' },
          { id: 'sgp30_eeprom_save_baseline', name: 'EEPROM 기준선 저장', params: ['ADDR'], output: null, description: '기준선을 EEPROM 지정 주소에 저장' },
          { id: 'sgp30_eeprom_load_baseline', name: 'EEPROM 기준선 로드', params: ['ADDR'], output: null, description: 'EEPROM 지정 주소에서 기준선 로드' }
        ]
      },
      {
        label: '레이저 거리 센서 (VL53L0X)',
        blocks: [
          { id: 'vl53l0x_setup', name: 'VL53L0X 초기화', params: ['ADDR'], output: null, description: '레이저 거리 센서 초기화 (I2C)' },
          { id: 'vl53l0x_set_mode', name: '측정 모드', params: null, output: null, description: '정밀/고속/장거리 모드 설정' },
          { id: 'vl53l0x_control', name: '센서 제어', params: null, output: null, description: 'VL53L0X 측정 시작/정지' },
          { id: 'vl53l0x_read_value', name: '거리 읽기', params: null, output: 'Number', description: 'mm 단위 거리 반환' }
        ]
      },
      {
        label: '온습도 센서 (SHT31)',
        blocks: [
          { id: 'sht31_setup', name: 'SHT31 초기화', params: ['ADDRESS'], output: null, description: '고정밀 온습도 센서 초기화' },
          { id: 'sht31_read', name: '측정 실행', params: null, output: null, description: '온습도 측정 트리거' },
          { id: 'sht31_is_connected', name: '연결 확인', params: null, output: 'Boolean', description: '센서 연결 상태 확인' },
          { id: 'sht31_get_data', name: '값 읽기', params: null, output: 'Number', description: '온도/습도 반환' },
          { id: 'sht31_heater_control', name: '히터 제어', params: null, output: null, description: '센서 내장 히터 ON/OFF' },
          { id: 'sht31_is_heater_on', name: '히터 상태', params: null, output: 'Boolean', description: '히터 동작 여부 확인' },
          { id: 'sht31_reset', name: '센서 리셋', params: null, output: null, description: 'SHT31 소프트 리셋' },
          { id: 'sht31_get_error', name: '에러 상태', params: null, output: 'Number', description: '센서 에러 코드 반환' }
        ]
      },
      {
        label: '컬러 센서 (TCS34725)',
        blocks: [
          { id: 'color_sensor_setup', name: '컬러 센서 초기화', params: null, output: null, description: 'TCS34725 컬러 센서 설정' },
          { id: 'color_sensor_init', name: '센서 활성화', params: null, output: null, description: '컬러 센서 초기화 실행' },
          { id: 'color_sensor_trigger', name: '색상 측정', params: null, output: null, description: '색상 감지 트리거' },
          { id: 'color_sensor_get_data', name: '색상 데이터', params: null, output: 'Number', description: 'R/G/B/Clear/색온도/Lux 반환' },
          { id: 'color_sensor_is_color', name: '색상 판별', params: null, output: 'Boolean', description: '특정 색상 여부 확인' }
        ]
      },
      {
        label: '비접촉 온도 센서 (MLX90614)',
        blocks: [
          { id: 'mlx90614_setup', name: 'MLX90614 초기화', params: ['ADDRESS'], output: null, description: '비접촉 적외선 온도 센서 초기화' },
          { id: 'mlx90614_read_temp', name: '온도 읽기', params: null, output: 'Number', description: '물체/주변 온도 (섭씨/화씨) 반환' }
        ]
      },
      {
        label: '제스처/조도/근접 센서 (APDS9960)',
        blocks: [
          { id: 'apds9960_setup', name: 'APDS9960 초기화', params: null, output: null, description: '제스처/조도/근접 센서 초기화' },
          { id: 'apds9960_sensor_control', name: '센서 제어', params: null, output: null, description: '센서 기능 활성화/비활성화' },
          { id: 'apds9960_read_light', name: '조도 읽기', params: null, output: 'Number', description: '조도/R/G/B 광량 값 반환' },
          { id: 'apds9960_read_proximity', name: '근접 값', params: null, output: 'Number', description: '근접 센서 값 반환' },
          { id: 'apds9960_gesture_available', name: '제스처 감지', params: null, output: 'Boolean', description: '제스처 데이터 사용 가능 확인' },
          { id: 'apds9960_gesture_control', name: '제스처 읽기/확인', params: null, output: 'Number', description: '제스처 읽기 또는 특정 제스처 확인' }
        ]
      },
      {
        label: '심박/SpO2 센서 (MAX30105)',
        blocks: [
          { id: 'max30105_setup_basic', name: '심박 센서 초기화', params: null, output: null, description: 'MAX30105 심박/산소 센서 기본 설정' },
          { id: 'max30105_finger_detected', name: '손가락 감지', params: null, output: 'Boolean', description: '센서 위 손가락 유무' },
          { id: 'max30105_get_heartrate', name: '심박수', params: null, output: 'Number', description: '심박수(BPM) 반환' },
          { id: 'max30105_get_spo2', name: 'SpO2', params: null, output: 'Number', description: '혈중 산소포화도(%) 반환' },
          { id: 'max30105_beat_detected', name: '심박 비트 감지', params: null, output: 'Boolean', description: '새로운 심박 비트 감지 여부' },
          { id: 'max30105_sensor_ready', name: '센서 준비', params: null, output: 'Boolean', description: '측정 데이터 충분 여부 확인' },
          { id: 'max30105_get_temperature', name: '센서 온도', params: null, output: 'Number', description: '센서 자체 온도(°C) 반환' },
          { id: 'max30105_setup_advanced', name: '고급 설정', params: null, output: null, description: '센서 고급 파라미터 설정' },
          { id: 'max30105_get_red_raw', name: 'Red LED 원시값', params: null, output: 'Number', description: '적색 LED 원시 센서 값 (고급)' },
          { id: 'max30105_get_ir_raw', name: 'IR LED 원시값', params: null, output: 'Number', description: '적외선 LED 원시 센서 값 (고급)' }
        ]
      },
      {
        label: '온습도 센서 (SI7021)',
        blocks: [
          { id: 'si7021_setup', name: 'SI7021 초기화', params: null, output: null, description: 'SI7021 온습도 센서 초기화' },
          { id: 'si7021_read_value', name: '값 읽기', params: null, output: 'Number', description: '온도/습도 반환' },
          { id: 'si7021_reset', name: '센서 리셋', params: null, output: null, description: 'SI7021 소프트 리셋' },
          { id: 'si7021_get_serial', name: '시리얼 번호', params: null, output: 'String', description: '센서 고유 시리얼 번호 반환' }
        ]
      },
      {
        label: '필터 / 교정 도구',
        blocks: [
          { id: 'util_filter_moving_avg', name: '이동평균 필터', params: ['VALUE', 'SAMPLES'], output: 'Number', description: '노이즈 제거용 이동평균 필터' },
          { id: 'util_filter_ema', name: '지수평활 필터', params: ['VALUE', 'ALPHA'], output: 'Number', description: 'EMA 방식 노이즈 필터' },
          { id: 'util_filter_median', name: '중앙값 필터', params: ['VALUE', 'WINDOW'], output: 'Number', description: '이상치 제거용 중앙값 필터' },
          { id: 'util_filter_range', name: '범위제한 필터', params: ['VALUE', 'MIN', 'MAX'], output: 'Number', description: '범위 밖 값 제거 필터' },
          { id: 'util_cal_setup', name: '2점 교정 설정', params: ['NAME', 'RAW1', 'REF1', 'RAW2', 'REF2'], output: null, description: '센서 2점 교정 데이터 설정' },
          { id: 'util_cal_apply', name: '교정 적용', params: ['NAME', 'VALUE'], output: 'Number', description: '교정 데이터로 값 보정' },
          { id: 'util_cal_offset', name: '오프셋 보정', params: ['VALUE', 'OFFSET'], output: 'Number', description: '값에 오프셋 적용' },
          { id: 'util_adc_stable', name: '안정 아날로그 읽기', params: ['PIN'], output: 'Number', description: '노이즈 제거된 안정적 아날로그 읽기' },
          { id: 'util_adc_oversample', name: '오버샘플링 읽기', params: ['PIN', 'SAMPLES'], output: 'Number', description: '오버샘플링 방식 아날로그 읽기' }
        ]
      }
    ],
    tips: ['I2C 센서는 SDA(A4), SCL(A5) 핀 사용', '여러 I2C 센서를 동시에 연결할 때 주소 충돌 주의']
  },

  'motor': {
    title: '모터',
    color: '#50B91A',
    description: '서보, GeekServo, DC, 스테퍼, PCA9685 모터 드라이버 블록',
    hardwareImages: [
      { src: 'assets/M_006_MG90S_Servo.png', label: 'MG90S 서보' },
      { src: 'assets/M_007_Geek_Servo_360.jpg', label: '긱서보 360' },
      { src: 'assets/M_008_Geek_Servo_360_5Kg.png', label: '긱서보 5Kg' },
      { src: 'assets/M_012_Blue_Lego_DC_Motor.png', label: 'DC 모터' },
      { src: 'assets/M_013_Step_Motor_Driver_A4988.jpg', label: 'A4988 드라이버' },
      { src: 'assets/M_014_Step_Motor.png', label: '스텝 모터' },
      { src: 'assets/M_020_16Ch_Servo_Motor_Driver_I2C_PCA9685.jpg', label: 'PCA9685 16채널 서보' }
    ],
    subsections: [
      {
        label: '서보 모터',
        blocks: [
          { id: 'attach_servo', name: '서보 연결', params: ['PIN'], output: null, description: '서보 모터 핀 할당' },
          { id: 'attach_servo_minmax', name: '서보 연결 (범위)', params: ['PIN', 'MIN', 'MAX'], output: null, description: '최소/최대 펄스폭 지정 서보 연결' },
          { id: 'detach_servo', name: '서보 분리', params: ['PIN'], output: null, description: '서보 핀 해제' },
          { id: 'set_servo_angle', name: '서보 각도', params: ['PIN', 'ANGLE'], output: null, description: '0~180도 각도 설정' },
          { id: 'set_servo_microseconds', name: '서보 마이크로초', params: ['PIN', 'US'], output: null, description: '펄스폭(μs)으로 정밀 위치 제어' },
          { id: 'read_servo_angle', name: '서보 각도 읽기', params: ['PIN'], output: 'Number', description: '현재 각도 반환' },
          { id: 'read_servo_microseconds', name: '서보 마이크로초 읽기', params: ['PIN'], output: 'Number', description: '현재 펄스폭(μs) 반환' },
          { id: 'is_servo_attached', name: '서보 연결 확인', params: ['PIN'], output: 'Boolean', description: '서보가 핀에 연결되어 있는지 확인' }
        ]
      },
      {
        label: 'GeekServo',
        blocks: [
          { id: 'geekservo_setup', name: 'GeekServo 초기화', params: ['PIN'], output: null, description: 'GeekServo 핀 설정 (각도: 500-2500μs, 모터: 3000-5000μs)' },
          { id: 'geekservo_angle_360', name: 'GeekServo 각도', params: ['PIN', 'ANGLE'], output: null, description: '360도 위치 제어 (0~360)' },
          { id: 'geekservo_wheel', name: 'GeekServo 바퀴', params: ['PIN', 'SPEED', 'DIR'], output: null, description: '무한 회전 속도/방향 (5Kg 모델)' },
          { id: 'geekservo_stop', name: 'GeekServo 정지', params: ['PIN'], output: null, description: 'GeekServo 모터 정지' }
        ]
      },
      {
        label: 'DC 모터',
        blocks: [
          { id: 'dcmotor_setup', name: 'DC 모터 초기화', params: ['PIN_A', 'PIN_B'], output: null, description: 'L9110 DC 모터 드라이버 설정' },
          { id: 'dcmotor_run', name: 'DC 모터 구동', params: ['SPEED', 'DIR'], output: null, description: '방향과 속도 설정' },
          { id: 'dcmotor_stop', name: 'DC 모터 정지', params: null, output: null, description: '모터 정지' }
        ]
      },
      {
        label: 'PCA9685 DC 모터 드라이버',
        blocks: [
          { id: 'pca9685_dcmotor_setup', name: 'PCA9685 DC모터 설정', params: ['NUM', 'ADDRESS'], output: null, description: 'PCA9685 DC 모터 드라이버 I2C 설정' },
          { id: 'pca9685_dcmotor_wheel_a', name: 'A바퀴 제어', params: ['NUM', 'DIRECTION', 'SPEED'], output: null, description: 'A채널 모터 방향/속도 (0~100%)' },
          { id: 'pca9685_dcmotor_wheel_b', name: 'B바퀴 제어', params: ['NUM', 'DIRECTION', 'SPEED'], output: null, description: 'B채널 모터 방향/속도 (0~100%)' },
          { id: 'pca9685_dcmotor_stop', name: '모터 정지', params: ['NUM'], output: null, description: 'PCA9685 모터 전체 정지' }
        ]
      },
      {
        label: 'AccelStepper 스텝 모터',
        blocks: [
          { id: 'accelstepper_setup', name: 'AccelStepper 초기화', params: ['MOTOR_NUM', 'INTERFACE', 'PIN1', 'PIN2'], output: null, description: '스텝 모터 드라이버 설정' },
          { id: 'accelstepper_settings', name: '속도/가속 설정', params: ['MOTOR_NUM', 'MAX_SPEED', 'ACCEL', 'SPEED', 'STEPS'], output: null, description: '스텝 모터 동작 파라미터' },
          { id: 'accelstepper_move', name: '이동', params: ['MOTOR_NUM', 'POSITION'], output: null, description: '목표 위치로 이동' },
          { id: 'accelstepper_control', name: '실행 제어', params: ['MOTOR_NUM'], output: null, description: 'run/stop/runToPosition 제어' },
          { id: 'accelstepper_status', name: '상태 확인', params: ['MOTOR_NUM'], output: 'Number', description: '현재 위치/속도/남은 거리 반환' }
        ]
      },
      {
        label: 'StepperMulti 스텝 모터',
        blocks: [
          { id: 'steppermulti_setup', name: 'StepperMulti 초기화', params: ['MOTOR_NUM', 'PIN1', 'PIN2', 'PIN3', 'PIN4'], output: null, description: '멀티 스텝 모터 설정 (4핀)' },
          { id: 'steppermulti_speed', name: '속도 설정', params: ['MOTOR_NUM', 'SPEED'], output: null, description: '스텝 모터 RPM 설정' },
          { id: 'steppermulti_move', name: '이동', params: ['MOTOR_NUM', 'STEPS'], output: null, description: '스텝 수만큼 이동' },
          { id: 'steppermulti_run', name: '실행', params: null, output: null, description: '모든 스텝 모터 동시 실행' }
        ]
      },
      {
        label: 'PCA9685 PWM 서보 드라이버',
        blocks: [
          { id: 'pwmservo_setup', name: 'PCA9685 서보 초기화', params: ['NUM', 'ADDR', 'FREQ'], output: null, description: '16채널 I2C PWM 서보 드라이버 설정' },
          { id: 'pwmservo_servo_angle', name: '서보 각도', params: ['NUM', 'CHANNEL', 'ANGLE'], output: null, description: '채널별 서보 각도 (0~180도)' },
          { id: 'pwmservo_servo_microseconds', name: '서보 마이크로초', params: ['NUM', 'CHANNEL', 'US'], output: null, description: '채널별 서보 펄스폭 (500~2500μs)' },
          { id: 'pwmservo_pwm_output', name: 'PWM 출력', params: ['NUM', 'CHANNEL', 'VALUE'], output: null, description: 'PWM 값 출력 (0~4095)' },
          { id: 'pwmservo_pwm_advanced', name: 'PWM 고급 제어', params: ['NUM', 'CHANNEL', 'ON', 'OFF'], output: null, description: '고급 PWM On/Off 타이밍 (0~4095)' },
          { id: 'pwmservo_power', name: '전원 관리', params: null, output: null, description: '서보 드라이버 전원 관리' },
          { id: 'pwmservo_multi_servo', name: '다중 서보', params: ['NUM'], output: null, description: '여러 서보 동시 제어 (최대 4채널)' },
          { id: 'pwmservo_led_brightness', name: 'LED 밝기', params: ['NUM', 'CHANNEL', 'BRIGHTNESS'], output: null, description: 'PWM으로 LED 밝기 제어 (0~100%)' }
        ]
      }
    ],
    tips: ['서보는 5V 외부 전원 권장', 'PCA9685는 최대 16채널 서보/모터 제어 가능', 'AccelStepper는 가감속 제어 지원']
  },

  'output': {
    title: '출력',
    color: '#70D650',
    description: '부저, MP3, SD카드 등 출력 장치 블록',
    hardwareImages: [
      { src: 'assets/O_001_Buzzer.jpg', label: '부저' },
      { src: 'assets/O_002_MP3_Player_KT403A.jpg', label: 'MP3 KT403A' },
      { src: 'assets/O_003_MP3_Player_Speaker.png', label: 'MP3 스피커' },
      { src: 'assets/O_008_TF_Card_Adapter_V2.jpg', label: 'SD 카드 어댑터' }
    ],
    subsections: [
      {
        label: '부저',
        blocks: [
          { id: 'buzzer_tone_setup', name: '부저 초기화', params: null, output: null, description: '부저 톤 라이브러리 설정' },
          { id: 'buzzer_set_tempo', name: '템포 설정', params: ['BPM'], output: null, description: 'BPM(분당 박자 수) 설정' },
          { id: 'buzzer_play_note', name: '음 재생', params: ['PIN', 'NOTE', 'BEAT'], output: null, description: '음계/박자별 톤 재생' },
          { id: 'buzzer_stop', name: '부저 정지', params: ['PIN'], output: null, description: '톤 출력 중지' }
        ]
      },
      {
        label: 'MP3 플레이어 (KT403A)',
        blocks: [
          { id: 'mp3_setup_kt403a', name: 'MP3 초기화', params: ['RX', 'TX', 'VOL'], output: null, description: 'KT403A MP3 모듈 설정' },
          { id: 'mp3_play_index', name: '인덱스 재생', params: ['INDEX'], output: null, description: '파일 번호로 재생' },
          { id: 'mp3_play_folder', name: '폴더/파일 재생', params: ['FOLDER', 'FILE'], output: null, description: '폴더 내 파일 재생' },
          { id: 'mp3_set_volume', name: '볼륨 설정', params: ['VOL'], output: null, description: '볼륨 조절 (0~30)' },
          { id: 'mp3_control', name: '재생 제어', params: null, output: null, description: '재생/정지/다음/이전 제어' },
          { id: 'mp3_query_status', name: '상태 확인', params: null, output: 'Number', description: 'MP3 재생 상태 반환' }
        ]
      },
      {
        label: 'SD 카드',
        blocks: [
          { id: 'sd_setup', name: 'SD 초기화', params: ['NUM', 'CS', 'MOSI', 'MISO', 'SCK'], output: null, description: 'SD 카드 모듈 SPI 초기화' },
          { id: 'sd_open_file', name: '파일 열기', params: ['FILE_VAR', 'FILENAME', 'MODE'], output: null, description: 'SD 파일 열기 (읽기/쓰기)' },
          { id: 'sd_write_file', name: '파일 쓰기', params: ['FILE_VAR', 'DATA'], output: null, description: '파일에 데이터 기록' },
          { id: 'sd_read_file', name: '파일 읽기', params: ['FILE_VAR'], output: 'String', description: '파일 내용 읽기' },
          { id: 'sd_file_exists', name: '파일 존재 확인', params: ['FILENAME'], output: 'Boolean', description: '파일 존재 여부 확인' },
          { id: 'sd_file_size', name: '파일 크기', params: ['FILE_VAR'], output: 'Number', description: '파일 크기(바이트) 반환' },
          { id: 'sd_close_file', name: '파일 닫기', params: ['FILE_VAR'], output: null, description: '파일 핸들 닫기' },
          { id: 'sd_remove_file', name: '파일 삭제', params: ['FILENAME'], output: null, description: 'SD 카드에서 파일 삭제' },
          { id: 'sd_make_directory', name: '폴더 생성', params: ['DIRNAME'], output: null, description: 'SD 카드에 폴더 생성' },
          { id: 'sd_file_available', name: '읽기 가능', params: ['FILE_VAR'], output: 'Boolean', description: '파일에서 읽을 데이터 남음 확인' }
        ]
      }
    ],
    tips: ['MP3 파일은 SD카드의 01 폴더에 001.mp3 형식으로 저장', 'SD 카드 SPI 핀: MOSI(11), MISO(12), SCK(13), CS(4)']
  },

  'communication': {
    title: '통신',
    color: '#F75ACF',
    description: 'IR 리모컨, RF 433MHz, GPS 통신 블록',
    hardwareImages: [
      { src: 'assets/C_005_IR_Transmitter.jpg', label: 'IR 송신기' },
      { src: 'assets/C_006_IR_Receiver.jpg', label: 'IR 수신기' },
      { src: 'assets/C_003_RF433MHz_Tx.jpg', label: 'RF 433MHz 송신' },
      { src: 'assets/C_004_RF433MHz_Rx.jpg', label: 'RF 433MHz 수신' },
      { src: 'assets/D_031_GPS.jpg', label: 'GPS 모듈' },
      { src: 'assets/D_032_GPS_Antenna.jpg', label: 'GPS 안테나' },
      { src: 'assets/U_003_Remote_Control.jpg', label: 'IR 리모컨' }
    ],
    subsections: [
      {
        label: 'IR 리모컨',
        blocks: [
          { id: 'ir_setup', name: 'IR 수신기 초기화', params: ['PIN'], output: null, description: '적외선 수신기 설정' },
          { id: 'ir_available', name: '수신 여부', params: null, output: 'Boolean', description: 'IR 신호 수신 확인 (논블로킹)' },
          { id: 'ir_read_button', name: '버튼 읽기', params: null, output: 'String', description: '리모컨 버튼 번호 반환' },
          { id: 'ir_read_raw', name: '원시 코드 읽기', params: null, output: 'Number', description: 'IR 원본 코드값 반환' },
          { id: 'ir_button_is', name: '버튼 비교', params: null, output: 'Boolean', description: '특정 버튼 눌림 확인' }
        ]
      },
      {
        label: 'RF 433MHz',
        blocks: [
          { id: 'rf433_setup', name: 'RF 송신 초기화', params: null, output: null, description: 'RF433 송신기 설정' },
          { id: 'rf433_config', name: 'RF 메시지 송신', params: ['TX_PIN', 'MESSAGE'], output: null, description: 'RF433으로 메시지 송신' },
          { id: 'rf433_rx_setup', name: 'RF 수신 초기화', params: ['RX_PIN', 'SPEED'], output: null, description: 'RF433 수신기 설정' },
          { id: 'rf433_rx_start', name: 'RF 수신 시작', params: null, output: null, description: 'RF433 수신 활성화' },
          { id: 'rf433_have_message', name: '수신 여부', params: null, output: 'Boolean', description: '메시지 도착 여부' },
          { id: 'rf433_get_message', name: '메시지 읽기', params: null, output: 'String', description: '수신 메시지 반환' },
          { id: 'rf433_read_data', name: '데이터 읽기', params: null, output: 'Number', description: 'RF433 수신 데이터 상세 읽기' }
        ]
      },
      {
        label: 'GPS',
        blocks: [
          { id: 'gps_setup_tinygps', name: 'GPS 초기화', params: ['BAUD', 'RX', 'TX'], output: null, description: 'TinyGPS++ 모듈 설정' },
          { id: 'gps_update_from_serial', name: '데이터 갱신', params: null, output: null, description: 'GPS 시리얼 데이터 수신/파싱' },
          { id: 'gps_read_value', name: '값 읽기', params: null, output: 'Number', description: '위도/경도/속도/고도/위성수 등' },
          { id: 'gps_has_fix', name: 'Fix 상태', params: null, output: 'Boolean', description: '위성 수신(Fix) 상태' },
          { id: 'gps_between_calc', name: '좌표간 계산', params: ['LAT1', 'LNG1', 'LAT2', 'LNG2'], output: 'Number', description: '두 좌표 간 거리(m)/방위(deg) 계산' },
          { id: 'gps_cardinal', name: '방위 문자', params: ['COURSE'], output: 'String', description: '각도를 방위 문자(N/NE/E...)로 변환' }
        ]
      }
    ],
    tips: ['IR 수신기는 38kHz 캐리어 주파수 사용', 'RF 433MHz는 최대 100m 무선 통신 가능']
  },

  'huskylens': {
    title: '허스키렌즈',
    color: '#00BFA5',
    description: 'HuskyLens AI 카메라 블록 (얼굴인식, 객체추적, 라인추적, 색상인식, 태그인식)',
    hardwareImages: [],
    subsections: [
      {
        label: '연결 설정',
        blocks: [
          { id: 'huskylens_setup_i2c', name: 'I2C 연결', params: null, output: null, description: '허스키렌즈 I2C 통신 초기화' },
          { id: 'huskylens_setup_serial', name: '시리얼 연결', params: ['RX', 'TX'], output: null, description: '허스키렌즈 시리얼 통신 설정' }
        ]
      },
      {
        label: '알고리즘',
        blocks: [
          { id: 'huskylens_set_algorithm', name: '알고리즘 설정', params: null, output: null, description: '얼굴인식/객체추적/라인추적/색상인식/태그인식/객체분류 선택' }
        ]
      },
      {
        label: '데이터 요청',
        blocks: [
          { id: 'huskylens_request', name: '전체 데이터 요청', params: null, output: null, description: '현재 인식된 모든 데이터 요청' },
          { id: 'huskylens_request_by_id', name: 'ID별 데이터 요청', params: ['ID'], output: null, description: '특정 ID의 데이터만 요청' }
        ]
      },
      {
        label: '감지 확인',
        blocks: [
          { id: 'huskylens_available', name: '객체 감지 여부', params: null, output: 'Boolean', description: '인식된 객체 존재 확인' },
          { id: 'huskylens_is_learned', name: 'ID 학습 여부', params: ['ID'], output: 'Boolean', description: '특정 ID 학습 완료 확인' },
          { id: 'huskylens_count_learned_ids', name: '학습된 ID 수', params: null, output: 'Number', description: '학습된 ID의 총 개수' },
          { id: 'huskylens_count_blocks', name: '블록 개수', params: null, output: 'Number', description: '감지된 사각형(블록) 수' },
          { id: 'huskylens_count_arrows', name: '화살표 개수', params: null, output: 'Number', description: '감지된 선(화살표) 수' }
        ]
      },
      {
        label: '블록 정보',
        blocks: [
          { id: 'huskylens_block_info', name: '중앙 블록 정보', params: null, output: 'Number', description: '화면 중앙 가장 가까운 블록의 X/Y/W/H/ID' },
          { id: 'huskylens_block_info_by_id', name: 'ID별 블록 정보', params: ['ID'], output: 'Number', description: '특정 ID 블록의 X/Y/W/H' }
        ]
      },
      {
        label: '화살표 정보',
        blocks: [
          { id: 'huskylens_arrow_info', name: '중앙 화살표 정보', params: null, output: 'Number', description: '화면 중앙 가장 가까운 화살표의 좌표/ID' },
          { id: 'huskylens_arrow_info_by_id', name: 'ID별 화살표 정보', params: ['ID'], output: 'Number', description: '특정 ID 화살표의 좌표' }
        ]
      },
      {
        label: '학습',
        blocks: [
          { id: 'huskylens_learn_once', name: '학습 실행', params: ['ID'], output: null, description: '현재 화면을 ID로 학습' },
          { id: 'huskylens_forget', name: '학습 삭제', params: null, output: null, description: '모든 학습 데이터 삭제' }
        ]
      },
      {
        label: '화면 표시',
        blocks: [
          { id: 'huskylens_write_osd', name: '화면 텍스트', params: ['TEXT', 'X', 'Y'], output: null, description: '허스키렌즈 화면에 텍스트 표시 (X:0-319, Y:0-239)' },
          { id: 'huskylens_clear_osd', name: '화면 텍스트 지우기', params: null, output: null, description: '화면의 모든 텍스트 삭제' }
        ]
      },
      {
        label: 'SD 카드',
        blocks: [
          { id: 'huskylens_screenshot', name: '스크린샷', params: null, output: null, description: '현재 화면을 SD카드에 저장' },
          { id: 'huskylens_save_model', name: '모델 저장', params: ['SLOT'], output: null, description: '학습 모델을 슬롯에 저장' },
          { id: 'huskylens_load_model', name: '모델 불러오기', params: ['SLOT'], output: null, description: '저장된 모델 로드' }
        ]
      }
    ],
    tips: ['허스키렌즈는 I2C 또는 시리얼로 연결 가능', '7가지 알고리즘: 얼굴인식, 객체추적, 객체인식, 라인추적, 색상인식, 태그인식, 객체분류']
  },

  'webble': {
    title: '웹 블루투스',
    color: '#4285F4',
    description: '웹 BLE 및 블루투스(HC-06, JDY-33, ESP32 BLE) 통신 블록',
    hardwareImages: [
      { src: 'assets/C_001_Bluetooth_4.0_JDY33.jpg', label: '블루투스 JDY33' }
    ],
    subsections: [
      {
        label: '웹 BLE 설정',
        blocks: [
          { id: 'sys_webble_setup', name: '웹 BLE 초기화', params: ['NAME'], output: null, description: 'BLE 서비스 시작 (ESP32)' },
          { id: 'sys_webble_connected', name: '연결 상태', params: null, output: 'Boolean', description: 'BLE 클라이언트 연결 확인' }
        ]
      },
      {
        label: '웹 BLE 송수신',
        blocks: [
          { id: 'sys_webble_available', name: '수신 데이터 여부', params: null, output: 'Boolean', description: '수신된 데이터 존재 확인' },
          { id: 'sys_webble_read', name: '데이터 읽기', params: null, output: 'String', description: '수신 문자열 반환' },
          { id: 'sys_webble_write', name: '데이터 전송', params: ['CONTENT'], output: null, description: 'BLE로 데이터 전송' }
        ]
      },
      {
        label: '웹 BLE 분석',
        blocks: [
          { id: 'sys_webble_parse', name: '데이터 파싱', params: ['DELIMITER'], output: null, description: '구분자로 수신 데이터 분리' },
          { id: 'sys_webble_get_value', name: '파싱 값 가져오기', params: ['N'], output: 'String', description: 'N번째 분리된 값 가져오기' }
        ]
      },
      {
        label: '블루투스 설정',
        blocks: [
          { id: 'arduino_bt_setup', name: '아두이노 BT 설정', params: ['RX', 'TX', 'NAME', 'BAUD'], output: null, description: '외부 BT 모듈(JDY-33 등) SoftwareSerial 설정' },
          { id: 'esp32_bt_setup', name: 'ESP32 BT 설정', params: ['NAME'], output: null, description: 'ESP32 내장 BLE 설정' }
        ]
      },
      {
        label: '블루투스 송수신',
        blocks: [
          { id: 'arduino_bt_available', name: 'BT 수신 여부', params: null, output: 'Boolean', description: 'BT 데이터 도착 확인' },
          { id: 'arduino_bt_read_raw', name: 'BT 바이트 읽기', params: null, output: 'Number', description: '수신 첫 바이트를 숫자로 반환' },
          { id: 'arduino_bt_read_hex', name: 'BT HEX 읽기', params: null, output: 'String', description: '수신 데이터를 16진수로 반환' },
          { id: 'arduino_bt_read_auto', name: 'BT 자동 변환 읽기', params: null, output: 'String', description: '수신 데이터를 읽기 쉬운 문자로 반환' },
          { id: 'arduino_bt_write', name: 'BT 전송', params: ['CONTENT'], output: null, description: 'BT로 데이터 송신' }
        ]
      },
      {
        label: '블루투스 송수신 (\\n 필수)',
        blocks: [
          { id: 'arduino_bt_msg_ready', name: 'BT 메시지 완성', params: null, output: 'Boolean', description: '줄바꿈(\\n)으로 끝나는 완성 메시지 수신 확인' },
          { id: 'arduino_bt_read', name: 'BT 메시지 읽기', params: null, output: 'String', description: '완성된 메시지 문자열 반환' }
        ]
      },
      {
        label: '블루투스 분석',
        blocks: [
          { id: 'arduino_bt_parse', name: 'BT 데이터 파싱', params: ['DELIMITER'], output: null, description: '구분자로 BT 수신 데이터 분리' },
          { id: 'arduino_bt_get_value', name: 'BT 파싱 값', params: ['INDEX'], output: 'String', description: 'N번째 분석된 BT 값 반환' }
        ]
      }
    ],
    tips: ['ESP32 보드에서 웹 BLE 사용 가능', '아두이노는 JDY-33 등 외부 BT 모듈 필요', '웹 브라우저에서 Web Bluetooth API로 직접 통신']
  },

  'wifi': {
    title: 'WiFi 통신',
    color: '#4285F4',
    description: 'ESP32 WiFi 연결 및 WebSocket 통신 블록 (ESP32 전용)',
    hardwareImages: [
      { src: 'assets/C_002_WiFi_ESP12E.jpg', label: 'WiFi ESP-12E' }
    ],
    subsections: [
      {
        label: '설정',
        blocks: [
          { id: 'wifi_setup', name: 'WiFi 연결', params: ['SSID', 'PASS'], output: null, description: 'WiFi 네트워크에 연결' },
          { id: 'wifi_ws_server_setup', name: 'WebSocket 서버', params: ['PORT'], output: null, description: 'WebSocket 서버 시작' },
          { id: 'wifi_is_connected', name: 'WiFi 연결 상태', params: null, output: 'Boolean', description: 'WiFi 연결 여부 확인' },
          { id: 'wifi_local_ip', name: '로컬 IP 주소', params: null, output: 'String', description: '현재 할당된 IP 반환' }
        ]
      },
      {
        label: '송수신',
        blocks: [
          { id: 'wifi_ws_available', name: 'WebSocket 수신 여부', params: null, output: 'Boolean', description: '수신 데이터 존재 확인' },
          { id: 'wifi_ws_read', name: 'WebSocket 읽기', params: null, output: 'String', description: '수신 문자열 반환' },
          { id: 'wifi_ws_send', name: 'WebSocket 전송', params: ['DATA'], output: null, description: '문자열 데이터 전송' },
          { id: 'wifi_ws_send_raw', name: 'WebSocket 원시 전송', params: ['DATA'], output: null, description: '원시 데이터 전송' },
          { id: 'wifi_ws_send_label_value', name: '라벨:값 전송', params: ['LABEL', 'VALUE'], output: null, description: '라벨과 값을 쌍으로 전송' }
        ]
      }
    ],
    tips: ['ESP32 보드에서만 사용 가능', 'WebSocket으로 웹 브라우저와 실시간 양방향 통신 가능']
  },

  'serial': {
    title: '시리얼 통신',
    color: '#367E7F',
    description: '시리얼(UART) 통신 송수신 및 데이터 파싱 블록',
    hardwareImages: [
      { src: 'assets/C_007_USB_to_UART_Converter.jpg', label: 'USB-UART 변환기' },
      { src: 'assets/C_008_Wireless_Uploader.png', label: '무선 업로더' },
      { src: 'assets/C_009_Wireless_Uploader_Dongle.png', label: '무선 업로더 동글' }
    ],
    subsections: [
      {
        label: '설정',
        blocks: [
          { id: 'sys_serial_begin', name: '시리얼 초기화', params: ['RX', 'TX', 'BAUD'], output: null, description: '시리얼 통신 시작 (포트/속도)' },
          { id: 'sys_serial_connected', name: '연결 상태', params: null, output: 'Boolean', description: '시리얼 포트 열림 확인' }
        ]
      },
      {
        label: '송신',
        blocks: [
          { id: 'sys_serial_print', name: '시리얼 출력', params: ['CONTENT'], output: null, description: '시리얼 모니터에 출력 (줄바꿈)' },
          { id: 'sys_serial_send_change', name: '변경시 전송', params: ['VALUE'], output: null, description: '값이 변경될 때만 시리얼 전송' },
          { id: 'sys_serial_print_continuous', name: '연속 출력', params: ['CONTENT'], output: null, description: '줄바꿈 없이 연속 출력' },
          { id: 'sys_serial_print_multi', name: '다중 출력', params: ['CONTENT'], output: null, description: '여러 값 한줄 출력' },
          { id: 'sys_serial_send_key_val', name: '키:값 전송', params: ['KEY', 'VALUE'], output: null, description: '키와 값을 쌍으로 시리얼 전송' }
        ]
      },
      {
        label: '수신',
        blocks: [
          { id: 'sys_serial_poll', name: '시리얼 폴링', params: null, output: null, description: '시리얼 데이터 수신 폴링 처리' },
          { id: 'sys_serial_available', name: '수신 여부', params: null, output: 'Boolean', description: '수신 데이터 존재 확인' },
          { id: 'sys_serial_read_raw', name: '원시 읽기', params: null, output: 'String', description: '수신 데이터 문자열 반환' },
          { id: 'sys_serial_flush', name: '버퍼 비우기', params: null, output: null, description: '시리얼 버퍼 초기화' }
        ]
      },
      {
        label: '파싱 (스크래치 방식)',
        blocks: [
          { id: 'sys_serial_parse_delimiter', name: '구분자 파싱', params: ['DELIMITER'], output: null, description: '구분자로 수신 데이터 분리' },
          { id: 'sys_parsed_value_get', name: '파싱 값 가져오기', params: ['INDEX'], output: 'String', description: 'N번째 분리된 값' },
          { id: 'sys_parsed_count', name: '파싱 값 개수', params: null, output: 'Number', description: '분리된 값 개수' }
        ]
      },
      {
        label: '파싱 (직접)',
        blocks: [
          { id: 'sys_parse_csv_get', name: 'CSV 값 가져오기', params: ['STRING', 'DELIMITER', 'INDEX'], output: 'String', description: '문자열을 구분자로 분리하여 N번째 값' },
          { id: 'sys_parse_count', name: 'CSV 값 개수', params: ['STRING', 'DELIMITER'], output: 'Number', description: '구분된 값의 개수' },
          { id: 'sys_util_to_number', name: '문자열→숫자', params: ['STRING'], output: 'Number', description: '문자열을 숫자로 변환' }
        ]
      }
    ],
    tips: ['기본 전송 속도는 9600 bps', '시리얼 모니터로 센서값 디버깅에 활용', '스크래치 방식 파싱은 수신 데이터를 자동 분리']
  },

  'esp32cam': {
    title: 'ESP32-CAM',
    color: '#367E7F',
    description: 'ESP32-CAM / ESP32-S3 카메라 모듈 영상 전송 블록 (ESP32 전용)',
    hardwareImages: [
      { src: 'assets/C_010_ESP32CAM.jpg', label: 'ESP32-CAM' }
    ],
    subsections: [
      {
        label: 'ESP32-CAM',
        blocks: [
          { id: 'esp32cam_declare', name: 'ESP32-CAM 선언', params: null, output: null, description: 'ESP32-CAM 라이브러리/변수 선언' },
          { id: 'esp32cam_wifi_config', name: 'WiFi 설정', params: ['SSID', 'PASSWORD'], output: null, description: '카메라 WiFi 네트워크 설정' },
          { id: 'esp32cam_receiver_config', name: '수신자 설정', params: ['IP', 'PORT', 'CHUNK'], output: null, description: 'UDP 수신 PC의 IP/포트/청크 설정' },
          { id: 'esp32cam_setup', name: '카메라 초기화', params: ['QUALITY', 'BRI', 'CONTRAST', 'SAT'], output: null, description: '카메라 해상도/화질/밝기 설정' },
          { id: 'esp32cam_flip', name: '화면 뒤집기/미러', params: null, output: null, description: '카메라 영상 상하/좌우 반전' }
        ]
      },
      {
        label: '카메라 제어',
        blocks: [
          { id: 'esp32cam_loop', name: '영상 전송', params: null, output: null, description: 'loop()에서 UDP로 영상 프레임 전송' },
          { id: 'esp32cam_led_control', name: 'LED 제어', params: null, output: null, description: '내장 LED 플래시 ON/OFF (GPIO 4)' }
        ]
      },
      {
        label: 'ESP32-S3 CAM',
        blocks: [
          { id: 'esp32s3cam_declare', name: 'S3 CAM 선언', params: null, output: null, description: 'ESP32-S3 CAM 라이브러리 선언 (Freenove 핀맵)' },
          { id: 'esp32s3cam_setup', name: 'S3 카메라 초기화', params: ['QUALITY', 'BRI', 'CONTRAST', 'SAT'], output: null, description: 'S3 카메라 설정 (PSRAM 자동 감지)' }
        ]
      }
    ],
    tips: ['ESP32-CAM과 ESP32-S3-CAM 보드 지원', 'JPEG 품질 값이 낮을수록 화질이 높음 (10~63)', '수신 PC에서 Python 수신 프로그램 실행 필요']
  },

  'tinyml': {
    title: 'TinyML',
    color: '#9C27B0',
    description: 'TensorFlow Lite 기반 온디바이스 AI 추론 블록 (ESP32 전용)',
    subsections: [
      {
        label: '모델 설정',
        blocks: [
          { id: 'tinyml_model_setup', name: '모델 초기화', params: ['MODEL_NAME', 'ARENA_SIZE'], output: null, description: 'TFLite 모델 로드 및 Arena 메모리 할당' },
          { id: 'tinyml_model_info', name: '모델 정보', params: null, output: 'Number', description: '입력/출력/Arena 크기 반환' }
        ]
      },
      {
        label: '데이터 수집',
        blocks: [
          { id: 'tinyml_collect_imu', name: 'IMU 데이터 수집', params: ['DURATION', 'LABEL'], output: null, description: 'MPU6050 가속도/자이로 데이터 수집 (Edge Impulse CSV)' },
          { id: 'tinyml_collect_analog', name: '아날로그 데이터 수집', params: ['PIN', 'SAMPLES', 'RATE'], output: null, description: '아날로그 센서 데이터 수집' },
          { id: 'tinyml_collect_sound', name: '사운드 데이터 수집', params: ['DURATION', 'LABEL'], output: null, description: 'I2S 마이크(INMP441) 오디오 데이터 수집' }
        ]
      },
      {
        label: '추론',
        blocks: [
          { id: 'tinyml_inference_start', name: '추론 실행', params: null, output: null, description: 'TFLite 모델로 추론 실행' },
          { id: 'tinyml_classification_result', name: '분류 결과', params: null, output: 'String', description: '최고 신뢰도 클래스 이름 반환' },
          { id: 'tinyml_confidence', name: '신뢰도 점수', params: null, output: 'Number', description: '최고 신뢰도 점수 (0~100)' },
          { id: 'tinyml_result_is', name: '결과 비교', params: ['CLASS_NAME'], output: 'Boolean', description: '분류 결과가 특정 클래스인지 확인' },
          { id: 'tinyml_anomaly_detected', name: '이상 감지', params: null, output: 'Boolean', description: '이상(anomaly) 감지 여부 확인' }
        ]
      }
    ],
    tips: ['ESP32 보드에서만 사용 가능', 'Edge Impulse에서 학습한 모델을 .h 파일로 변환하여 사용', '데이터 수집 블록으로 학습 데이터를 시리얼로 출력 가능']
  }

};
