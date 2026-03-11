/**
 * sort-and-sync-locales.js
 *
 * 번역 파일 카테고리 순서 정렬 및 동기화 도구
 * - 모든 키를 카테고리별로 그룹화하여 정렬
 * - 영어(ui_en.json)를 기준으로 누락 키 추가 ([TODO] 접두사)
 * - 기준 파일에 없는 불필요 키 제거
 * - 모든 언어 파일을 동일한 카테고리 순서로 정렬
 *
 * 사용법: node sort-and-sync-locales.js
 *
 * @version 1.0.0
 * @date 2026-02-22
 */

const fs = require('fs');
const path = require('path');

const localesDir = __dirname;
const masterFile = 'ui_en.json';
const koreanFile = 'ui_ko.json';

// ============================================================
// 카테고리 정의 (논리적 순서)
// 각 카테고리: [카테고리명, 키 매칭 함수]
// 순서: 시스템/UI → 블록 코어 → 센서 → 디스플레이 → 모터 → 출력 → 통신 → AI → 유틸리티
// ============================================================
const CATEGORIES = [
    // ── 1. 시스템 및 UI ──
    ['SYSTEM_AND_UI', k => {
        // 시스템, IDE UI, 파일, 모드, 로딩, 웹소켓 등
        const uiPrefixes = [
            'mainTitle', 'blockModeBtn', 'textModeBtn', 'blocklyHeaderTitle',
            'codePreview_initial', 'codeTitle', 'compileBtn', 'uploadBtn',
            'saveBtn', 'loadBtn', 'copyBtn', 'labelFilename', 'labelLanguage',
            'fileNameInput_placeholder', 'loadingText', 'loading_system_init',
            'consoleHeader', 'sectionTitle', 'portAutoSelect', 'portDisabledMessage',
            'refreshPortsBtn_title', 'downloadAgentBtn_title', 'connectionStatus',
            'connection_status_', 'mode_block', 'mode_text', 'mode_switch_',
            'monaco_ltr_', 'system_init_fail', 'system_ready',
            'compile_progress', 'upload_progress', 'memory_usage', 'unknown',
            'websocket_', 'js_log_', 'js_alert_', 'file_load_', 'file_save_',
            'project_export_', 'project_import_', 'code_copy_',
            'template_arduino', 'template_esp32', 'template_pico',
            '_comment', 'MILLISECONDS', 'PIN_HIGH', 'PIN_LOW', 'PIN_NUMBER', 'PIN_VALUE',
            'BKY_PAGE_TITLE', 'BKY_FILE_NAME_PLACEHOLDER', 'BKY_SAVE_BUTTON',
            'BKY_LOAD_BUTTON', 'BKY_COPY_BUTTON', 'BKY_ALERT_LOAD_FAILED',
            'BKY_ALERT_SAVE_FAILED', 'BKY_LANGUAGE_LABEL', 'BKY_CONTEXT_SAVE_PNG',
            'BKY_CONTEXT_SAVE_SVG', 'BKY_EMPTY_ALL'
        ];
        return uiPrefixes.some(p => k === p || k.startsWith(p));
    }],

    ['I18N_SYSTEM', k => k.startsWith('i18n_') || k.startsWith('language_') || k.startsWith('languageStatus_') || k.startsWith('lang')],

    ['HARDWARE_BOARDS', k => k.startsWith('board')],

    ['AGENT_COMMUNICATION', k => k.startsWith('agent') || k.startsWith('agentId') || k.startsWith('agentOs')],

    ['SHARE_AND_COLLABORATION', k => k.startsWith('share')],

    ['ANALYTICS', k => k.startsWith('analytics_')],

    ['AI_FEATURES', k => k.startsWith('ai') || k === 'aiBtn'],

    ['RECORDER', k => k.startsWith('recorder_')],

    // ── 2. 아두이노 코어 블록 ──
    ['BKY_ARDUINO_CORE', k => {
        return k.startsWith('ARDUINO_') || k.startsWith('SENSOR_') ||
               k === 'BKY_ARDUINO_SETUP' || k === 'BKY_ARDUINO_SETUP_TOOLTIP' ||
               k === 'BKY_ARDUINO_LOOP' || k === 'BKY_ARDUINO_LOOP_TOOLTIP' ||
               k === 'BKY_ARDUINO_STARTS_UP' || k === 'BKY_ARDUINO_STARTS_UP_TOOLTIP' ||
               k === 'BKY_ARDUINO_REALTIME_CODE' ||
               k === 'BKY_ARDUINO_INTERRUPT' || k === 'BKY_ARDUINO_INTERRUPT_TOOLTIP' ||
               k.startsWith('ACTUATOR_');
    }],

    // ── 3. 툴박스 카테고리 ──
    ['BKY_TOOLBOX_CATEGORIES', k => k.startsWith('BKY_CATEGORY_')],

    ['BKY_TOOLBOX_FLAGS', k => k.endsWith('_FLAG') || k.endsWith('_FLAG_TOOLTIP')],

    ['BKY_SENSOR_LABELS', k => k.startsWith('BKY_SENSOR_LABEL_')],
    ['BKY_MOTOR_LABELS', k => k.startsWith('BKY_MOTOR_LABEL_')],
    ['BKY_OUTPUT_LABELS', k => k.startsWith('BKY_OUTPUT_LABEL_')],
    ['BKY_COMM_LABELS', k => k.startsWith('BKY_COMM_LABEL_')],
    ['BKY_DISPLAY_LABELS', k => k.startsWith('BKY_DISPLAY_LABEL_')],

    // ── 4. 변수 ──
    ['BKY_VARIABLES', k => {
        return k.startsWith('BKY_VARIABLE_DECLARE') || k.startsWith('BKY_NUMBER_VARIABLE_') ||
               k.startsWith('BKY_STRING_VARIABLE_') || k === 'BKY_INT' || k === 'BKY_FLOAT' ||
               k === 'BKY_STRING';
    }],

    // ── 5. 배열 ──
    ['BKY_ARRAYS', k => k.startsWith('BKY_ARRAY_')],

    // ── 6. 로직/수학/텍스트/색상/제어 ──
    ['BKY_LOGIC_MATH_TEXT', k => {
        return k.startsWith('BKY_CUSTOM_TEXT_') || k.startsWith('BKY_COLOUR_') ||
               k.startsWith('BKY_PROCEDURES_') || k === 'BKY_WAIT_UNTIL' ||
               k === 'BKY_WAIT_UNTIL_TOOLTIP' || k === 'BKY_DELAY_MS' ||
               k === 'BKY_DELAY_MS_TOOLTIP';
    }],

    // ── 7. 핀 제어 ──
    ['BKY_PIN_CONTROL', k => {
        return k.startsWith('BKY_PIN_') || k.startsWith('BKY_READ_ANALOG_') ||
               k.startsWith('BKY_READ_DIGITAL_') || k.startsWith('BKY_SET_DIGITAL_') ||
               k.startsWith('BKY_SET_PWM_') || k.startsWith('BKY_PULSE_IN') ||
               k.startsWith('BKY_SHIFT_') || k === 'BKY_HIGH' || k === 'BKY_LOW' ||
               k === 'BKY_INPUT' || k === 'BKY_OUTPUT' || k === 'BKY_ON' || k === 'BKY_OFF' ||
               k === 'BKY_LEFT' || k === 'BKY_RIGHT' ||
               k.startsWith('BKY_INTERRUPT_') || k.startsWith('BKY_CUSTOM_AD_BLOCK');
    }],

    // ── 8. 센서 - 온습도 ──
    ['BKY_SENSOR_DHT', k => k.startsWith('BKY_DHT_') || k === 'BKY_TEMP_CELSIUS' || k === 'BKY_TEMP_FAHRENHEIT'],
    ['BKY_SENSOR_SHT31', k => k.startsWith('BKY_SHT31_')],
    ['BKY_SENSOR_SI7021', k => k.startsWith('BKY_SI7021_')],
    ['BKY_SENSOR_BMP280', k => k.startsWith('BKY_BMP280_')],
    ['BKY_SENSOR_MLX90614', k => k.startsWith('BKY_MLX90614_')],
    ['BKY_SENSOR_DALLAS', k => k.startsWith('BKY_DALLAS_')],
    ['BKY_SENSOR_THERMISTOR', k => k.startsWith('BKY_THERMISTOR_')],

    // ── 9. 센서 - 거리/모션/컬러 ──
    ['BKY_SENSOR_ULTRASONIC', k => k.startsWith('BKY_ULTRA_') || k.startsWith('BKY_UNIT_')],
    ['BKY_SENSOR_VL53L0X', k => k.startsWith('BKY_VL53_')],
    ['BKY_SENSOR_MPU6050', k => k.startsWith('BKY_MPU_')],
    ['BKY_SENSOR_APDS9960', k => k.startsWith('BKY_APDS9960_')],
    ['BKY_SENSOR_COLOR', k => k.startsWith('BKY_COLOR_SENSOR_')],
    ['BKY_SENSOR_ROTARY', k => k.startsWith('BKY_ROTARY_')],

    // ── 10. 센서 - 생체/지문/무게 ──
    ['BKY_SENSOR_MAX30105', k => k.startsWith('BKY_MAX30105_')],
    ['BKY_SENSOR_FINGERPRINT', k => k.startsWith('BKY_FINGERPRINT_') || k === 'BKY_FINGER_ID'],
    ['BKY_SENSOR_HX711', k => k.startsWith('BKY_HX711_') || k.startsWith('BKY_I2C_WEIGHT_')],

    // ── 11. 센서 - 수질 ──
    ['BKY_SENSOR_PH', k => k.startsWith('BKY_DFROBOT_PH_')],
    ['BKY_SENSOR_TDS', k => k.startsWith('BKY_GRAVITY_TDS_') || k === 'BKY_TDS_VALUE' || k === 'BKY_EC_VALUE'],
    ['BKY_SENSOR_TURBIDITY', k => k.startsWith('BKY_TURBIDITY_')],

    // ── 12. 센서 - 대기질 ──
    ['BKY_SENSOR_MHZ19', k => k.startsWith('BKY_MHZ19_') || k.startsWith('BKY_STATUS_') || k.startsWith('BKY_CAL_') || k === 'BKY_RAW_VALUE' || k === 'BKY_AVERAGE_VALUE' || k === 'BKY_ACTUAL_VALUE'],
    ['BKY_SENSOR_SGP30', k => k.startsWith('BKY_SGP30_')],
    ['BKY_SENSOR_PMS', k => k.startsWith('BKY_PMS_') || k.startsWith('BKY_PM') || k === 'BKY_ACTIVE_MODE' || k === 'BKY_PASSIVE_MODE' || k === 'BKY_SLEEP_MODE' || k === 'BKY_WAKE_UP' || k === 'BKY_POWER_ON' || k === 'BKY_POWER_OFF'],
    ['BKY_SENSOR_UV', k => k.startsWith('BKY_UV_') || k === 'BKY_ADC_RANGE' || k === 'BKY_ADC_REF'],

    // ── 13. 디스플레이 - OLED SSD1306 ──
    ['BKY_DISPLAY_SSD1306', k => k.startsWith('BKY_SSD1306_')],

    // ── 14. 디스플레이 - OLED SH1106 (간편) ──
    ['BKY_DISPLAY_SH1106_SIMPLE', k => k.startsWith('BKY_SH1106_')],

    // ── 15. 디스플레이 - OLED SH110X (Adafruit) ──
    ['BKY_DISPLAY_SH110X', k => k.startsWith('BKY_SH110X_')],

    // ── 16. 디스플레이 - OLED 한글 ──
    ['BKY_DISPLAY_OLED_HANGUL', k => k.startsWith('BKY_OLED_HAN_')],

    // ── 17. 디스플레이 - LCD ──
    ['BKY_DISPLAY_LCD', k => k.startsWith('BKY_LCD_I2C_')],

    // ── 18. 디스플레이 - 네오픽셀 ──
    ['BKY_DISPLAY_NEOPIXEL', k => k.startsWith('BKY_NEO_') || k === 'BKY_RED' || k === 'BKY_GREEN' || k === 'BKY_BLUE' || k === 'BKY_YELLOW'],

    // ── 19. 디스플레이 - HT16K33 매트릭스 ──
    ['BKY_DISPLAY_HT16K33', k => k.startsWith('BKY_HT16_') || k.startsWith('BKY_DM_')],

    // ── 20. 디스플레이 - 7세그먼트 TM1637 ──
    ['BKY_DISPLAY_TM1637', k => k.startsWith('BKY_TM1637_')],

    // ── 21. 디스플레이 - LED (기본) ──
    ['BKY_DISPLAY_LED', k => k.startsWith('BKY_LED_') || k.startsWith('BKY_BLINK') || k === 'BKY_NO_BLINK'],

    // ── 22. 모터 - 서보 ──
    ['BKY_MOTOR_SERVO', k => {
        return k.startsWith('BKY_SERVO_') || k.startsWith('BKY_ATTACH_SERVO') ||
               k.startsWith('BKY_DETACH_SERVO') || k.startsWith('BKY_IS_SERVO_') ||
               k.startsWith('BKY_SET_SERVO_') || k.startsWith('BKY_READ_SERVO_');
    }],

    // ── 23. 모터 - GeekServo ──
    ['BKY_MOTOR_GEEKSERVO', k => k.startsWith('BKY_GEEKSERVO_')],

    // ── 24. 모터 - DC 모터 ──
    ['BKY_MOTOR_DC', k => k.startsWith('BKY_DCMOTOR_')],

    // ── 25. 모터 - PCA9685 DC 모터 ──
    ['BKY_MOTOR_PCA9685', k => k.startsWith('BKY_PCA9685_')],

    // ── 26. 모터 - 스텝 모터 (AccelStepper) ──
    ['BKY_MOTOR_ACCELSTEPPER', k => k.startsWith('BKY_ACCELSTEPPER_')],

    // ── 27. 모터 - 스텝 모터 (멀티) ──
    ['BKY_MOTOR_STEPPER_MULTI', k => k.startsWith('BKY_STEPPERMULTI_')],

    // ── 28. 모터 - PCA9685 PWM 서보 ──
    ['BKY_MOTOR_PCA9685_PWM', k => k.startsWith('BKY_PWMSERVO_')],

    // ── 29. 속도 설정 ──
    ['BKY_SPEED_SETTINGS', k => k.startsWith('BKY_SPEED_')],

    // ── 30. 출력 - 부저 ──
    ['BKY_OUTPUT_BUZZER', k => {
        return k.startsWith('BKY_BUZZER_') || k.startsWith('BKY_TONE_') ||
               k.startsWith('BKY_NO_TONE') || k.startsWith('BKY_NOTE_') ||
               k.startsWith('BKY_BEAT_');
    }],

    // ── 31. 출력 - MP3 ──
    ['BKY_OUTPUT_MP3', k => k.startsWith('BKY_MP3_')],

    // ── 32. 출력 - SD 카드 ──
    ['BKY_OUTPUT_SD', k => k.startsWith('BKY_SD_')],

    // ── 33. 통신 - 시리얼 ──
    ['BKY_COMM_SERIAL', k => k.startsWith('BKY_SERIAL_') || k.startsWith('BKY_PARSE') || k.startsWith('BKY_PARSED')],

    // ── 34. 통신 - 블루투스 ──
    ['BKY_COMM_BLUETOOTH', k => k.startsWith('BKY_ARDUINO_BT_') || k.startsWith('BKY_ESP32_BT_') || k === 'BKY_BT_LABEL_COMM'],

    // ── 35. 통신 - IR 리모컨 ──
    ['BKY_COMM_IR', k => k.startsWith('BKY_IR_')],

    // ── 36. 통신 - RF433 ──
    ['BKY_COMM_RF433', k => k.startsWith('BKY_RF433_')],

    // ── 37. 통신 - GPS ──
    ['BKY_COMM_GPS', k => k.startsWith('BKY_GPS_')],

    // ── 38. 통신 - WebBLE ──
    ['BKY_COMM_WEBBLE', k => k.startsWith('BKY_WEBBLE_')],

    // ── 39. 통신 - WiFi/WebSocket ──
    ['BKY_COMM_WIFI', k => k.startsWith('BKY_WIFI_')],

    // ── 40. AI 비전 - HuskyLens ──
    ['BKY_AI_HUSKYLENS', k => k.startsWith('BKY_HUSKYLENS_') || k === 'BKY_CATEGORY_HUSKYLENS'],

    // ── 41. AI 비전 - HuskyLens 공통 ──
    ['BKY_AI_HUSKYLENS_COMMON', k => {
        return k === 'BKY_CONFIDENCE' || k === 'BKY_GET_COUNT' || k === 'BKY_GET_IMAGE' ||
               k === 'BKY_DELETE_ID' || k === 'BKY_NORMAL_SEARCH' || k === 'BKY_FAST_SEARCH' ||
               k === 'BKY_K_ADDRESS' || k === 'BKY_K_VALUE' || k === 'BKY_FILTER_ON' ||
               k === 'BKY_FILTER_OFF' || k === 'BKY_FILTER_NORMAL' || k === 'BKY_FILTER_CLEAR' ||
               k === 'BKY_TEMPLATE_COUNT' || k === 'BKY_CONVERT_TEMPLATE' ||
               k === 'BKY_CREATE_MODEL' || k === 'BKY_STORE_MODEL';
    }],

    // ── 42. TinyML ──
    ['BKY_TINYML', k => k.startsWith('BKY_TINYML_')],

    // ── 43. ESP32-CAM ──
    ['BKY_ESP32CAM', k => k.startsWith('BKY_ESP32CAM_') || k.startsWith('BKY_ESP32S3CAM_')],

    // ── 44. RTC (DS1307) ──
    ['BKY_RTC_DS1307', k => k.startsWith('BKY_DS1307_')],

    // ── 45. 유틸리티 - 타입 변환/맵/제한 ──
    ['BKY_UTIL_BASIC', k => {
        return k === 'BKY_UTIL_CONSTRAIN' || k === 'BKY_UTIL_CONSTRAIN_TOOLTIP' ||
               k === 'BKY_UTIL_CONVERT' || k === 'BKY_UTIL_CONVERT_TOOLTIP' ||
               k === 'BKY_UTIL_MAP' || k === 'BKY_UTIL_MAP_TOOLTIP' ||
               k === 'BKY_UTIL_MILLIS' || k === 'BKY_UTIL_MILLIS_TOOLTIP' ||
               k === 'BKY_UTIL_TO_ASCII' || k === 'BKY_UTIL_TO_ASCII_TOOLTIP' ||
               k === 'BKY_UTIL_TO_CHAR' || k === 'BKY_UTIL_TO_CHAR_TOOLTIP' ||
               k === 'BKY_UTIL_TO_NUMBER' || k === 'BKY_UTIL_TO_NUMBER_TOOLTIP' ||
               k === 'BKY_DEVELOPER_INFO_BLOCK' || k === 'BKY_DEVELOPER_INFO_BLOCK_TOOLTIP' ||
               k.startsWith('BKY_UTIL_I2C_') || k === 'BKY_UTIL_FLAG' || k === 'BKY_UTIL_FLAG_TOOLTIP';
    }],

    // ── 46. 유틸리티 - 타이머/논블로킹 ──
    ['BKY_UTIL_TIMER', k => {
        return k.startsWith('BKY_TIMER_') || k === 'BKY_UTIL_NONBLOCK_LABEL' ||
               k.startsWith('BKY_UTIL_INTERVAL') || k.startsWith('BKY_UTIL_STOPWATCH') ||
               k.startsWith('BKY_UTIL_TIMEOUT');
    }],

    // ── 47. 유틸리티 - 필터/보정/ADC ──
    ['BKY_UTIL_FILTER', k => {
        return k.startsWith('BKY_UTIL_FILTER_') || k.startsWith('BKY_UTIL_CAL_') ||
               k.startsWith('BKY_UTIL_ADC_');
    }],

    // ── 48. 유틸리티 - 녹화/재생 ──
    ['BKY_UTIL_RECORD', k => k.startsWith('BKY_UTIL_RECORD_')],

    // ── 49. 가이드 링크 ──
    ['BKY_GUIDE_LINKS', k => k.startsWith('BKY_GO_TO_')],

    // ── 50. 무게 센서 공통 ──
    ['BKY_WEIGHT_COMMON', k => k.startsWith('BKY_GAIN_')],
];

// ============================================================
// 키를 카테고리에 매핑
// ============================================================
function categorizeKeys(keys) {
    const categorized = new Map();
    const uncategorized = [];

    // 카테고리별 빈 배열 초기화
    CATEGORIES.forEach(([name]) => categorized.set(name, []));

    for (const key of keys) {
        let found = false;
        for (const [catName, matchFn] of CATEGORIES) {
            if (matchFn(key)) {
                categorized.get(catName).push(key);
                found = true;
                break; // 첫 번째 매칭 카테고리에만 배정
            }
        }
        if (!found) {
            uncategorized.push(key);
        }
    }

    return { categorized, uncategorized };
}

// ============================================================
// 카테고리 순서대로 키 배열 생성
// ============================================================
function getSortedKeys(keys) {
    const { categorized, uncategorized } = categorizeKeys(keys);
    const sorted = [];

    for (const [catName] of CATEGORIES) {
        const catKeys = categorized.get(catName);
        if (catKeys.length > 0) {
            // 카테고리 내에서는 알파벳 순 정렬
            catKeys.sort();
            sorted.push(...catKeys);
        }
    }

    // 미분류 키는 맨 뒤에 알파벳 순으로 추가
    if (uncategorized.length > 0) {
        uncategorized.sort();
        sorted.push(...uncategorized);
    }

    return { sorted, uncategorized };
}

// ============================================================
// JSON 파일을 카테고리 순서로 정렬하여 저장
// ============================================================
function sortAndWriteJson(filePath, data, sortedKeys) {
    const ordered = {};
    for (const key of sortedKeys) {
        if (data.hasOwnProperty(key)) {
            ordered[key] = data[key];
        }
    }
    fs.writeFileSync(filePath, JSON.stringify(ordered, null, 2) + '\n', 'utf8');
}

// ============================================================
// 메인 실행
// ============================================================
function main() {
    console.log('=== 번역 파일 카테고리 순서 정렬 및 동기화 ===\n');

    // 1. 기준 파일 로드
    const enPath = path.join(localesDir, masterFile);
    const koPath = path.join(localesDir, koreanFile);

    if (!fs.existsSync(enPath)) {
        console.error(`❌ ${masterFile} 파일을 찾을 수 없습니다.`);
        process.exit(1);
    }
    if (!fs.existsSync(koPath)) {
        console.error(`❌ ${koreanFile} 파일을 찾을 수 없습니다.`);
        process.exit(1);
    }

    const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    const koData = JSON.parse(fs.readFileSync(koPath, 'utf8'));

    const enKeys = Object.keys(enData);
    console.log(`📋 기준 파일(${masterFile}): ${enKeys.length}개 키`);

    // 2. 카테고리 분류 및 정렬 순서 결정
    const { sorted: sortedKeys, uncategorized } = getSortedKeys(enKeys);

    // 카테고리별 통계 출력
    const { categorized } = categorizeKeys(enKeys);
    console.log('\n📊 카테고리별 키 수:');
    let totalCategorized = 0;
    for (const [catName] of CATEGORIES) {
        const count = categorized.get(catName).length;
        if (count > 0) {
            console.log(`  ${catName}: ${count}`);
            totalCategorized += count;
        }
    }
    if (uncategorized.length > 0) {
        console.log(`  ⚠️ 미분류: ${uncategorized.length}`);
        uncategorized.forEach(k => console.log(`    - ${k}`));
    }
    console.log(`  합계: ${totalCategorized + uncategorized.length} / ${enKeys.length}`);

    // 3. 기준 파일 정렬
    console.log(`\n✏️ ${masterFile} 카테고리 순서로 정렬...`);
    sortAndWriteJson(enPath, enData, sortedKeys);
    console.log(`  ✅ 완료`);

    console.log(`✏️ ${koreanFile} 카테고리 순서로 정렬...`);
    sortAndWriteJson(koPath, koData, sortedKeys);
    console.log(`  ✅ 완료`);

    // 4. 다른 언어 파일 동기화
    console.log('\n🔄 다른 언어 파일 동기화:');
    const files = fs.readdirSync(localesDir).filter(f =>
        f.endsWith('.json') && f !== masterFile && f !== koreanFile
    );

    files.sort();

    let totalAdded = 0;
    let totalRemoved = 0;

    for (const file of files) {
        const filePath = path.join(localesDir, file);
        let targetData;
        try {
            targetData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch (e) {
            console.error(`  ⚠️ ${file}: JSON 파싱 오류 - 건너뜁니다.`);
            continue;
        }

        const targetKeys = new Set(Object.keys(targetData));
        const masterKeySet = new Set(enKeys);

        // 누락 키 찾기
        const missing = enKeys.filter(k => !targetKeys.has(k));
        // 불필요 키 찾기
        const extra = [...targetKeys].filter(k => !masterKeySet.has(k));

        // 새 데이터 생성 (기준 파일 순서대로)
        const newData = {};
        for (const key of sortedKeys) {
            if (targetData.hasOwnProperty(key)) {
                newData[key] = targetData[key];
            } else {
                // 누락 키: [TODO] 접두사 + 영어 값
                newData[key] = `[TODO] ${enData[key]}`;
            }
        }

        // 저장
        fs.writeFileSync(filePath, JSON.stringify(newData, null, 2) + '\n', 'utf8');

        totalAdded += missing.length;
        totalRemoved += extra.length;

        const status = missing.length === 0 && extra.length === 0 ? '✅' : '🔧';
        console.log(`  ${status} ${file}: +${missing.length}개 추가, -${extra.length}개 제거`);
    }

    // 5. 요약
    console.log('\n' + '='.repeat(50));
    console.log('📊 동기화 요약:');
    console.log(`  처리된 언어 파일: ${files.length}개`);
    console.log(`  총 추가된 키: ${totalAdded}개`);
    console.log(`  총 제거된 키: ${totalRemoved}개`);
    console.log(`  카테고리 수: ${CATEGORIES.length}개`);
    console.log('='.repeat(50));
    console.log('\n🎉 완료! 모든 파일이 카테고리 순서로 정렬되었습니다.');
}

main();
