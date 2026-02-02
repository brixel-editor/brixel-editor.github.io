/**
 * Arduino 블록코딩 웹에디터 - 툴박스 정의
 * 모든 블록 카테고리와 블록 정의를 포함
 */

// 🔥 보드별 지원 기능 정의
const BOARD_CAPABILITIES = {
    uno: { ble: false, wifi: false },
    nano: { ble: false, wifi: false },
    mega: { ble: false, wifi: false },
    esp32: { ble: true, wifi: true },
    esp32cam: { ble: true, wifi: true },
    esp32s2: { ble: true, wifi: true },
    esp32c3: { ble: true, wifi: true },
    esp32s3: { ble: true, wifi: true },
    pico: { ble: false, wifi: false },     // 🚫 피코는 BLE 미지원
    picow: { ble: false, wifi: true }      // 🚫 피코W도 BLE 미지원 (WiFi만)
};

function generateToolbox(boardType = 'uno') {
    // 🔥 보드 기능 확인
    const capabilities = BOARD_CAPABILITIES[boardType] || { ble: false, wifi: false };

    return `
        <category name="===== BASIC =====" colour="#171717"></category>    
        <category name="${Blockly.Msg.BKY_CATEGORY_MAIN}" colour="#FFAB19">
            <block type="main_flag"></block>
            <block type="arduino_uno_starts_up"></block>
            <sep gap="10"></sep>
            <block type="arduino_setup"></block>
            <sep gap="10"></sep>
            <block type="arduino_loop"></block>
        </category>

         <category name="${Blockly.Msg.BKY_CATEGORY_PIN_CONTROL}" colour="#6190DF">
            <block type="pin_flag"></block>
            <block type="pin_mode"><value name="PIN"><shadow type="math_number"><field name="NUM">13</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="read_digital_pin"><value name="PIN"><shadow type="math_number"><field name="NUM">2</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="read_analog_pin"><value name="PIN"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="set_digital_pin"><value name="PIN"><shadow type="math_number"><field name="NUM">13</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="set_pwm_pin"><value name="PIN"><shadow type="math_number"><field name="NUM">5</field></shadow></value><value name="VALUE"><shadow type="math_number"><field name="NUM">255</field></shadow></value></block>
            <sep gap="40"></sep>
            <block type="servo_setup"><value name="PIN"><shadow type="math_number"><field name="NUM">9</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="set_servo_angle"><value name="PIN"><shadow type="math_number"><field name="NUM">9</field></shadow></value><value name="ANGLE"><shadow type="math_number"><field name="NUM">90</field></shadow></value></block>
            <sep gap="40"></sep>
            <block type="tone_out"><value name="PIN"><shadow type="math_number"><field name="NUM">8</field></shadow></value><value name="FREQUENCY"><shadow type="math_number"><field name="NUM">262</field></shadow></value><value name="DURATION"><shadow type="math_number"><field name="NUM">1000</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="no_tone"><value name="PIN"><shadow type="math_number"><field name="NUM">8</field></shadow></value></block>
            <sep gap="40"></sep>
            <block type="delay_ms"><value name="DELAY_TIME"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="40"></sep>
            <block type="timer_millis"></block>
            <sep gap="10"></sep>
            <block type="timer_reset"><value name="TIMER_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="timer_non_blocking_delay"><value name="INTERVAL"><shadow type="math_number"><field name="NUM">1000</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="arduino_interrupt"><value name="PIN"><shadow type="math_number"><field name="NUM">2</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="pulse_in"><value name="PIN"><shadow type="math_number"><field name="NUM">7</field></shadow></value><value name="TIMEOUT"><shadow type="math_number"><field name="NUM">1000000</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="shift_out"><value name="DATA_PIN"><shadow type="math_number"><field name="NUM">2</field></shadow></value><value name="CLOCK_PIN"><shadow type="math_number"><field name="NUM">3</field></shadow></value><value name="LATCH_PIN"><shadow type="math_number"><field name="NUM">4</field></shadow></value><value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
        </category>

        <category name="${Blockly.Msg.BKY_CATEGORY_CONTROL}" colour="#FF9800">
            <block type="control_flag"></block>
            <block type="delay_ms"><value name="DELAY_TIME"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="wait_until"><value name="CONDITION"><shadow type="logic_boolean"><field name="BOOL">TRUE</field></shadow></value></block>
            <sep gap="40"></sep>
            <block type="controls_if"></block>
            <sep gap="10"></sep>
            <block type="controls_repeat_ext"><value name="TIMES"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="controls_whileUntil"></block>
            <sep gap="10"></sep>
            <block type="controls_flow_statements"></block>
        </category>

        <category name="${Blockly.Msg.BKY_CATEGORY_LOGIC}" colour="#5CB1D6">
            <block type="logic_flag"></block>
            <block type="logic_compare"><value name="A"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="logic_operation"><value name="A"><shadow type="logic_boolean"><field name="BOOL">TRUE</field></shadow></value><value name="B"><shadow type="logic_boolean"><field name="BOOL">TRUE</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="logic_negate"><value name="BOOL"><shadow type="logic_boolean"><field name="BOOL">TRUE</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="logic_boolean"></block>
            <sep gap="10"></sep>
            <block type="logic_null"></block>
            <sep gap="10"></sep>
            <block type="logic_ternary"><value name="IF"><shadow type="logic_boolean"><field name="BOOL">TRUE</field></shadow></value><value name="THEN"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="ELSE"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
        </category>

        <category name="${Blockly.Msg.BKY_CATEGORY_MATH}" colour="#59C059">
            <block type="math_flag"></block>
            <block type="math_number"><field name="NUM">0</field></block>
            <sep gap="10"></sep>
            <block type="math_arithmetic"><value name="A"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="math_single"><value name="NUM"><shadow type="math_number"><field name="NUM">9</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="math_trig"><value name="NUM"><shadow type="math_number"><field name="NUM">45</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="math_constant"></block>
            <sep gap="10"></sep>
            <block type="math_number_property"><value name="NUMBER_TO_CHECK"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="math_round"><value name="NUM"><shadow type="math_number"><field name="NUM">3.1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="math_modulo"><value name="DIVIDEND"><shadow type="math_number"><field name="NUM">64</field></shadow></value><value name="DIVISOR"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="math_constrain"><value name="VALUE"><shadow type="math_number"><field name="NUM">50</field></shadow></value><value name="LOW"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="HIGH"><shadow type="math_number"><field name="NUM">100</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="math_random_int"><value name="FROM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="TO"><shadow type="math_number"><field name="NUM">100</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="math_random_float"></block>
            <sep gap="10"></sep>
            <block type="math_atan2"><value name="X"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
        </category>

        <category name="${Blockly.Msg.BKY_CATEGORY_TEXT}" colour="#82a52d">
            <block type="text_flag"></block>
            <block type="text"><field name="TEXT">apple</field></block>
            <sep gap="40"></sep>
            <block type="custom_text_join"><value name="TEXT1"><shadow type="text"><field name="TEXT">banana</field></shadow></value><value name="TEXT2"><shadow type="text"><field name="TEXT">apple</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="custom_text_char_at"><value name="TEXT"><shadow type="text"><field name="TEXT">apple</field></shadow></value><value name="INDEX"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="custom_text_length"><value name="TEXT"><shadow type="text"><field name="TEXT">apple</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="custom_text_contains"><value name="TEXT"><shadow type="text"><field name="TEXT">apple</field></shadow></value><value name="SUBSTRING"><shadow type="text"><field name="TEXT">a</field></shadow></value></block>
            <sep gap="40"></sep>
            <block type="text_append"></block>
            <sep gap="10"></sep>
            <block type="text_changeCase"></block>
            <sep gap="10"></sep>
            <block type="text_trim"></block>
            <sep gap="10"></sep>
            <block type="text_isEmpty"></block>
        </category>

        <category name="${Blockly.Msg.BKY_CATEGORY_COLOR}" colour="#A855F7">
            <block type="colour_flag"></block>
            <block type="colour_picker_custom"></block>
            <sep gap="10"></sep>
            <block type="colour_random_custom"></block>
            <sep gap="10"></sep>
            <block type="colour_rgb_custom"><value name="RED"><shadow type="math_number"><field name="NUM">255</field></shadow></value><value name="GREEN"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="BLUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="colour_blend_custom"><value name="COLOUR1"><shadow type="colour_picker_custom"></shadow></value><value name="COLOUR2"><shadow type="colour_picker_custom"></shadow></value><value name="RATIO"><shadow type="math_number"><field name="NUM">0.5</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="colour_to_hex"><value name="COLOUR"><shadow type="colour_picker_custom"></shadow></value></block>
            <sep gap="10"></sep>
            <block type="colour_to_rgb_values"><value name="COLOUR"><shadow type="colour_picker_custom"></shadow></value></block>
        </category>
        
        <category name="${Blockly.Msg.BKY_CATEGORY_VARIABLES}" colour="#98607F" >
            <block type="var_flag"></block>
            <block type="number_variable_set"><value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="number_variable_get"></block>
            <sep gap="10"></sep>
            <block type="math_change"><value name="DELTA"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="40"></sep>
            <block type="string_variable_set"><value name="VALUE"><shadow type="text"><field name="TEXT">Hello</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="string_variable_get"></block>
        </category>

        <category name="${Blockly.Msg.BKY_CATEGORY_LIST}" colour="#59ACF7">
            <block type="array_create" gap="10"><value name="VALUES"><shadow type="text"><field name="TEXT">1,2,3,4,5</field></shadow></value></block>
            <block type="array_create_empty" gap="10"><value name="SIZE"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block>
            <block type="array_get" gap="10"><value name="INDEX"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <block type="array_set" gap="10"><value name="INDEX"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <block type="array_append" gap="10"><value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <block type="array_remove" gap="10"><value name="INDEX"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <block type="array_find" gap="10"><value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <block type="array_length" gap="10"></block>
            <block type="array_clear" gap="10"><value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <block type="array_copy" gap="10"></block>
            <block type="array_strlen" gap="10"></block>
            <block type="array_contains" gap="10"><value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>

        </category>

        <category name="${Blockly.Msg.BKY_CATEGORY_FUNCTIONS}" colour="#8E61A3" custom="PROCEDURE">
            <block type="func_flag"></block>
            <block type="procedures_ifreturn"><value name="CONDITION"><shadow type="logic_boolean"><field name="BOOL">TRUE</field></shadow></value><value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="procedures_ifreturn_void"><value name="CONDITION"><shadow type="logic_boolean"><field name="BOOL">TRUE</field></shadow></value></block>

        </category>
        <category name="${Blockly.Msg.BKY_CATEGORY_UTIL}" colour="#08B89F">
            <block type="util_flag"></block>
            <block type="util_millis"></block>
            <sep gap="10"></sep>
            <block type="util_map"><value name="VALUE"><shadow type="math_number"><field name="NUM">50</field></shadow></value><value name="FROMLOW"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="FROMHIGH"><shadow type="math_number"><field name="NUM">100</field></shadow></value><value name="TOLOW"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="TOHIGH"><shadow type="math_number"><field name="NUM">1000</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="util_constrain"><value name="VALUE"><shadow type="math_number"><field name="NUM">50</field></shadow></value><value name="LOW"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="HIGH"><shadow type="math_number"><field name="NUM">100</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="util_convert"><value name="VALUE"><shadow type="math_number"><field name="NUM">123</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="util_to_char"><value name="VALUE"><shadow type="math_number"><field name="NUM">97</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="util_to_ascii"><value name="VALUE"><shadow type="text"><field name="TEXT">a</field></shadow></value></block>
            <sep gap="40"></sep>
            <block type="util_i2c_scanner"></block>
            <sep gap="10"></sep>
            <block type="util_i2c_read_address"></block>
            <sep gap="40"></sep>
            <!-- 블록 조립 기록/재생 블록 -->
            <label text="${Blockly.Msg.BKY_UTIL_RECORD_PLAY_LABEL || '블록 조립 기록/재생'}"></label>
            <block type="util_record_start"></block>
            <sep gap="10"></sep>
            <block type="util_record_stop"></block>
            <sep gap="10"></sep>
            <block type="util_record_play"></block>
            <sep gap="10"></sep>
            <block type="util_record_play_stop"></block>
            <sep gap="10"></sep>
            <block type="util_record_reset"></block>

        <sep gap="32"></sep>

        <label text="${Blockly.Msg.BKY_UTIL_RECORD_LABEL || 'Block Recorder'}"></label>
            <block type="util_record_status"></block>
            <sep gap="10"></sep>
            <block type="util_record_event_count"></block>
            <sep gap="10"></sep>
            <block type="util_record_duration"></block>
            <sep gap="10"></sep>
            <block type="util_record_start_time"></block>
            <sep gap="10"></sep>
            <block type="util_record_end_time"></block>

        <sep gap="32"></sep>

        <label text="${Blockly.Msg.BKY_UTIL_NONBLOCK_LABEL || 'Non-blocking Timers'}"></label>
        <block type="util_interval">
            <value name="INTERVAL">
                <shadow type="math_number">
                    <field name="NUM">500</field>
                </shadow>
            </value>
        </block>
        <block type="util_stopwatch_reset">
            <field name="ID">1</field>
        </block>
        <block type="util_stopwatch_elapsed">
            <field name="ID">1</field>
        </block>
        <block type="util_timeout">
            <value name="DELAY">
                <shadow type="math_number">
                    <field name="NUM">3000</field>
                </shadow>
            </value>
        </block>
            <sep gap="40"></sep>
        </category>

        <category name="=== I/O Devices ===" colour="#171717"></category>

        <category name="${Blockly.Msg.BKY_CATEGORY_DISPLAY_A}" colour="#FAC907">
            <block type="dis01_flag"></block>
            <label text="${Blockly.Msg.BKY_DISPLAY_LABEL_LCD || '📺 LCD 디스플레이'}"></label>
            <sep gap="10"></sep>
            <block type="lcd_i2c_setup"><value name="LCD_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="lcd_i2c_print"><value name="LCD_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="ROW"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="COL"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="TEXT"><shadow type="text"><field name="TEXT">Hello Arduino!</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="lcd_i2c_clear"><value name="LCD_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="lcd_i2c_set_cursor"><value name="LCD_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="ROW"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="COL"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="lcd_i2c_cursor"><value name="LCD_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="lcd_i2c_backlight"><value name="LCD_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="lcd_i2c_display"><value name="LCD_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="lcd_i2c_scroll"><value name="LCD_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_DISPLAY_LABEL_7SEG || '🔢 7세그먼트 (TM1637)'}"></label>
            <sep gap="10"></sep>
            <block type="tm1637_setup" gap="10"><value name="CLK_PIN"><shadow type="math_number"><field name="NUM">2</field></shadow></value><value name="DATA_PIN"><shadow type="math_number"><field name="NUM">3</field></shadow></value></block>
            <block type="tm1637_display_number" gap="10"><value name="NUMBER"><shadow type="math_number"><field name="NUM">1234</field></shadow></value></block>
            <block type="tm1637_display_time" gap="10"><value name="HOUR"><shadow type="math_number"><field name="NUM">12</field></shadow></value><value name="MINUTE"><shadow type="math_number"><field name="NUM">30</field></shadow></value></block>
            <block type="tm1637_display_text" gap="10"><value name="TEXT"><shadow type="text"><field name="TEXT">Hello</field></shadow></value><value name="DELAY"><shadow type="math_number"><field name="NUM">500</field></shadow></value></block>
            <block type="tm1637_display_digit" gap="10"><value name="DIGIT"><shadow type="math_number"><field name="NUM">8</field></shadow></value></block>
            <block type="tm1637_clear" gap="10"></block>
            <block type="tm1637_brightness" gap="10"></block>
            <block type="tm1637_colon" gap="10"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_DISPLAY_LABEL_NEOPIXEL || '💡 네오픽셀 (WS2812)'}"></label>
            <sep gap="10"></sep>
            <block type="neopixel_setup"><value name="PIN"><shadow type="math_number"><field name="NUM">6</field></shadow></value><value name="LED_COUNT"><shadow type="math_number"><field name="NUM">16</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="neopixel_set_rgb"><value name="STRIP_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="LED_INDEX"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="R"><shadow type="math_number"><field name="NUM">100</field></shadow></value><value name="G"><shadow type="math_number"><field name="NUM">100</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">100</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="neopixel_set_rgbw"><value name="STRIP_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="LED_INDEX"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="R"><shadow type="math_number"><field name="NUM">100</field></shadow></value><value name="G"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="W"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="neopixel_show"><value name="STRIP_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="neopixel_brightness"><value name="STRIP_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="BRI"><shadow type="math_number"><field name="NUM">64</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="neopixel_clear"><value name="STRIP_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="neopixel_fill_rgb_all"><value name="STRIP_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="R"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="G"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">255</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="neopixel_anim_rainbow"><value name="STRIP_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="WAIT"><shadow type="math_number"><field name="NUM">20</field></shadow></value><value name="LOOPS"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="neopixel_anim_shift"><value name="STRIP_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="STEPS"><shadow type="math_number"><field name="NUM">16</field></shadow></value><value name="WAIT"><shadow type="math_number"><field name="NUM">50</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="neopixel_anim_breathe"><value name="STRIP_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="R"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="G"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">255</field></shadow></value><value name="MIN_BRI"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="MAX_BRI"><shadow type="math_number"><field name="NUM">180</field></shadow></value><value name="STEP"><shadow type="math_number"><field name="NUM">5</field></shadow></value><value name="WAIT"><shadow type="math_number"><field name="NUM">20</field></shadow></value></block>
        </category>

        <category name="${Blockly.Msg.BKY_CATEGORY_DISPLAY_B}" colour="#FAC907">
            <block type="dis02_flag"></block>
            <label text="${Blockly.Msg.BKY_DISPLAY_LABEL_SSD1306 || '📺 OLED 0.96\" (SSD1306)'}"></label>
            <sep gap="10"></sep>
            <block type="ssd1306_setup_i2c" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="RST"><shadow type="math_number"><field name="NUM">-1</field></shadow></value></block>
            <block type="ssd1306_text" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="TEXT"><shadow type="text"><field name="TEXT">Hello OLED</field></shadow></value><value name="X"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="SIZE"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <block type="ssd1306_control" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <block type="ssd1306_dim" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <block type="ssd1306_pixel" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="X"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <block type="ssd1306_line" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="X1"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Y1"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="X2"><shadow type="math_number"><field name="NUM">127</field></shadow></value><value name="Y2"><shadow type="math_number"><field name="NUM">63</field></shadow></value></block>
            <block type="ssd1306_rect" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="X"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="W"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="H"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block>
            <block type="ssd1306_circle" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="X"><shadow type="math_number"><field name="NUM">64</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">32</field></shadow></value><value name="R"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block>
            <block type="ssd1306_scroll" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="START"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="STOP"><shadow type="math_number"><field name="NUM">7</field></shadow></value></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_DISPLAY_LABEL_HAN_SSD1306 || '🔤 한글 OLED (SSD1306)'}"></label>
            <sep gap="10"></sep>
            <block type="oled_han_setup" gap="10"></block>
            <block type="oled_han_clear" gap="10"></block>
            <block type="oled_han_print_text" gap="10"><value name="TEXT"><shadow type="text"><field name="TEXT">Hello 안녕</field></shadow></value><value name="X"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <block type="oled_han_big_digit" gap="10"><value name="DIGIT"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="X"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <block type="oled_han_draw_bar" gap="10"><value name="X"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="VALUE"><shadow type="math_number"><field name="NUM">50</field></shadow></value></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_DISPLAY_LABEL_HT16K33 || '🔲 도트매트릭스 (HT16K33)'}"></label>
            <sep gap="10"></sep>
            <block type="ht16k33_setup"><value name="BRI"><shadow type="math_number"><field name="NUM">15</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="ht16k33_scroll_text"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="TEXT"><shadow type="text"><field name="TEXT">Hello</field></shadow></value><value name="SEC"><shadow type="math_number"><field name="NUM">0.2</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="ht16k33_show"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="ht16k33_clear"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="10"></sep>            
            <block type="ht16k33_set_brightness"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="BRI"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="ht16k33_set_blink"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="ht16k33_pixel"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="ROW"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="COL"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="ht16k33_bicolor_pixel"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="ROW"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="COL"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="ht16k33_pattern_8x8"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="ht16k33_pattern_8x16"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="ht16k33_line"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="R1"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="C1"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="R2"><shadow type="math_number"><field name="NUM">7</field></shadow></value><value name="C2"><shadow type="math_number"><field name="NUM">7</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="ht16k33_circle"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="R"><shadow type="math_number"><field name="NUM">3</field></shadow></value><value name="C"><shadow type="math_number"><field name="NUM">3</field></shadow></value><value name="RAD"><shadow type="math_number"><field name="NUM">3</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="ht16k33_rect"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="R"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="C"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="W"><shadow type="math_number"><field name="NUM">4</field></shadow></value><value name="H"><shadow type="math_number"><field name="NUM">4</field></shadow></value></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_DISPLAY_LABEL_SH1106 || '📺 OLED 1.3\" (SH1106)'}"></label>
            <sep gap="10"></sep>
            <block type="sh110x_setup_i2c" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="RST"><shadow type="math_number"><field name="NUM">-1</field></shadow></value><value name="WIDTH"><shadow type="math_number"><field name="NUM">128</field></shadow></value><value name="HEIGHT"><shadow type="math_number"><field name="NUM">64</field></shadow></value></block>
            <block type="sh110x_text" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="TXT"><shadow type="text"><field name="TEXT">Hello OLED</field></shadow></value><value name="X"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="SIZE"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <block type="sh110x_display" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <block type="sh110x_clear" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <block type="sh110x_control" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <block type="sh110x_pixel" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="X"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <block type="sh110x_line" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="X1"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Y1"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="X2"><shadow type="math_number"><field name="NUM">127</field></shadow></value><value name="Y2"><shadow type="math_number"><field name="NUM">63</field></shadow></value></block>
            <block type="sh110x_rect" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="X"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="W"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="H"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block>
            <block type="sh110x_circle" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="X"><shadow type="math_number"><field name="NUM">64</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">32</field></shadow></value><value name="R"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block>
            <block type="sh110x_contrast" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="CONTRAST"><shadow type="math_number"><field name="NUM">127</field></shadow></value></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_DISPLAY_LABEL_HAN_SH1106 || '🔤 한글 OLED (SH1106)'}"></label>
            <sep gap="10"></sep>
            <block type="sh1106_setup" gap="10"></block>
            <block type="sh1106_clear" gap="10"></block>
            <block type="sh1106_print_text" gap="10"><value name="TEXT"><shadow type="text"><field name="TEXT">안녕하세요</field></shadow></value><value name="X"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <block type="sh1106_large_number" gap="10"><value name="NUMBER"><shadow type="math_number"><field name="NUM">123</field></shadow></value><value name="X"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">2</field></shadow></value></block>
            <block type="sh1106_draw_bar" gap="10"><value name="X"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">4</field></shadow></value><value name="VALUE"><shadow type="math_number"><field name="NUM">64</field></shadow></value></block>
            <sep gap="40"></sep>
       </category>

        <category name="${Blockly.Msg.BKY_CATEGORY_SENSORS_A}" colour="#FF6F00">
            <block type="sensor01_flag"></block>
            <label text="${Blockly.Msg.BKY_SENSOR_LABEL_ULTRASONIC || '📏 초음파 센서'}"></label>
            <sep gap="10"></sep>
            <block type="ultrasonic_setup"></block>
            <sep gap="10"></sep>
            <block type="ultrasonic_distance"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SENSOR_LABEL_DHT || '🌡️ 온습도 센서 (DHT)'}"></label>
            <sep gap="10"></sep>
            <block type="dht_setup"><value name="PIN"><shadow type="math_number"><field name="NUM">7</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="dht_read_temperature"><value name="PIN"><shadow type="math_number"><field name="NUM">7</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="dht_read_humidity"><value name="PIN"><shadow type="math_number"><field name="NUM">7</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="dht_convert_temperature"><value name="TEMPERATURE"><shadow type="math_number"><field name="NUM">25</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="dht_heat_index"><value name="TEMPERATURE"><shadow type="math_number"><field name="NUM">25</field></shadow></value><value name="HUMIDITY"><shadow type="math_number"><field name="NUM">60</field></shadow></value></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SENSOR_LABEL_DALLAS || '🌡️ 온도 센서 (DS18B20)'}"></label>
            <sep gap="10"></sep>
            <block type="dallas_temp_setup"></block>
            <sep gap="10"></sep>
            <block type="dallas_temp_request"></block>
            <sep gap="10"></sep>
            <block type="dallas_temp_read"></block>
            <sep gap="10"></sep>
            <block type="dallas_temp_count"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SENSOR_LABEL_HX711 || '⚖️ 무게 센서 (HX711)'}"></label>
            <sep gap="10"></sep>
            <block type="hx711_setup" gap="10"><value name="DOUT_PIN"><shadow type="math_number"><field name="NUM">3</field></shadow></value><value name="CLK_PIN"><shadow type="math_number"><field name="NUM">2</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="hx711_get_weight"></block>
            <sep gap="10"></sep>
            <block type="hx711_tare"><value name="TIMES"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="hx711_set_scale"><value name="SCALE"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="hx711_is_ready"></block>
            <sep gap="10"></sep>
            <block type="hx711_power_control"></block>
            <sep gap="10"></sep>
            <block type="hx711_read_data"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SENSOR_LABEL_I2C_WEIGHT || '⚖️ I2C 무게 센서'}"></label>
            <sep gap="10"></sep>
            <block type="i2c_weight_setup" gap="10"><value name="ADDRESS"><shadow type="math_number"><field name="NUM">99</field></shadow></value></block>
            <block type="i2c_weight_read" gap="10"></block>
            <block type="i2c_weight_available" gap="10"></block>
            <block type="i2c_weight_raw_data" gap="10"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SENSOR_LABEL_ROTARY || '🔄 로터리 엔코더'}"></label>
            <sep gap="10"></sep>
            <block type="rotary_setup"><value name="DT_PIN"><shadow type="math_number"><field name="NUM">2</field></shadow></value><value name="CLK_PIN"><shadow type="math_number"><field name="NUM">3</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="rotary_get_value"></block>
            <sep gap="10"></sep>
            <block type="rotary_direction"></block>
            <sep gap="10"></sep>
            <block type="rotary_counter"></block>
            <sep gap="10"></sep>
            <block type="rotary_reset_counter"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SENSOR_LABEL_THERMISTOR || '🌡️ 서미스터 (NTC)'}"></label>
            <sep gap="10"></sep>
            <block type="thermistor_setup"><value name="ANALOG_PIN"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="NOMINAL_RES"><shadow type="math_number"><field name="NUM">10000</field></shadow></value><value name="BETA_COEF"><shadow type="math_number"><field name="NUM">3950</field></shadow></value><value name="SERIAL_RES"><shadow type="math_number"><field name="NUM">10000</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="thermistor_read_temperature"></block>
            <sep gap="10"></sep>
            <block type="thermistor_read_raw"></block>
            <sep gap="10"></sep>
            <block type="thermistor_get_resistance"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SENSOR_LABEL_PMS || '🌫️ 미세먼지 센서 (PMS)'}"></label>
            <sep gap="10"></sep>
            <block type="pms_setup"><value name="RX_PIN"><shadow type="math_number"><field name="NUM">2</field></shadow></value><value name="TX_PIN"><shadow type="math_number"><field name="NUM">3</field></shadow></value><value name="BAUD_RATE"><shadow type="math_number"><field name="NUM">9600</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="pms_power_control"></block>
            <sep gap="10"></sep>
            <block type="pms_set_mode"></block>
            <sep gap="10"></sep>
            <block type="pms_read_data"></block>
            <sep gap="10"></sep>
            <block type="pms_request_read"></block>
            <sep gap="10"></sep>
            <block type="pms_data_available"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SENSOR_LABEL_MHZ19 || '💨 CO2 센서 (MH-Z19)'}"></label>
            <sep gap="10"></sep>
            <block type="mhz19_setup"><value name="RX_PIN"><shadow type="math_number"><field name="NUM">2</field></shadow></value><value name="TX_PIN"><shadow type="math_number"><field name="NUM">3</field></shadow></value><value name="BAUD"><shadow type="math_number"><field name="NUM">9600</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="mhz19_set_range"><value name="RANGE"><shadow type="math_number"><field name="NUM">2000</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="mhz19_filter_mode"></block>
            <sep gap="10"></sep>
            <block type="mhz19_read_value"></block>
            <sep gap="10"></sep>
            <block type="mhz19_calibration"><value name="PERIOD"><shadow type="math_number"><field name="NUM">24</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="mhz19_get_status"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SENSOR_LABEL_TDS || '💧 TDS 수질 센서'}"></label>
            <sep gap="10"></sep>
            <block type="gravity_tds_setup"><value name="PIN"><shadow type="math_number"><field name="NUM">A1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="gravity_tds_set_temp"><value name="TEMP"><shadow type="math_number"><field name="NUM">25.0</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="gravity_tds_update"></block>
            <sep gap="10"></sep>
            <block type="gravity_tds_read_value"></block>
            <sep gap="10"></sep>
            <block type="gravity_tds_advanced_config"><value name="VALUE"><shadow type="math_number"><field name="NUM">5.0</field></shadow></value></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SENSOR_LABEL_PH || '🧪 pH 센서'}"></label>
            <sep gap="10"></sep>
            <block type="dfrobot_ph_setup" gap="10"><value name="PIN"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <block type="dfrobot_ph_read" gap="10"><value name="TEMPERATURE"><shadow type="math_number"><field name="NUM">25</field></shadow></value></block>
            <block type="dfrobot_ph_voltage" gap="10"></block>
            <block type="dfrobot_ph_calibration" gap="10"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SENSOR_LABEL_FINGERPRINT || '👆 지문 센서'}"></label>
            <sep gap="10"></sep>
            <block type="fingerprint_setup"><value name="RX_PIN"><shadow type="math_number"><field name="NUM">2</field></shadow></value><value name="TX_PIN"><shadow type="math_number"><field name="NUM">3</field></shadow></value><value name="BAUD"><shadow type="math_number"><field name="NUM">57600</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="fingerprint_enroll_process"><value name="ID"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="fingerprint_search"></block>
            <sep gap="10"></sep>
            <block type="fingerprint_get_result"></block>
            <sep gap="10"></sep>
            <block type="fingerprint_database"><value name="ID"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="fingerprint_led_control"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SENSOR_LABEL_TURBIDITY || '💧 탁도 센서'}"></label>
            <sep gap="10"></sep>
            <block type="turbidity_setup"><value name="PIN"><shadow type="math_number"><field name="NUM">A0</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="turbidity_calibrate"></block>
            <sep gap="10"></sep>
            <block type="turbidity_update"></block>
            <sep gap="10"></sep>
            <block type="turbidity_read_value"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SENSOR_LABEL_UV || '☀️ 자외선 센서'}"></label>
            <sep gap="10"></sep>
            <block type="uv_sensor_setup"><value name="PIN"><shadow type="math_number"><field name="NUM">A0</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="uv_sensor_calibrate"><value name="VOLTAGE"><shadow type="math_number"><field name="NUM">990</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="uv_sensor_read_value"></block>
            <sep gap="40"></sep>
        </category>

        <category name="${Blockly.Msg.BKY_CATEGORY_SENSORS_B}" colour="#4D68EC">
            <block type="sensor02_flag"></block>
            <label text="${Blockly.Msg.BKY_SENSOR_LABEL_RTC || '🕐 RTC 실시간 시계 (DS1307)'}"></label>
            <sep gap="10"></sep>
            <block type="ds1307_setup" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <block type="ds1307_set_time" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="YEAR"><shadow type="math_number"><field name="NUM">2024</field></shadow></value><value name="MONTH"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="DATE"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="HOUR"><shadow type="math_number"><field name="NUM">12</field></shadow></value><value name="MINUTE"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="SECOND"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <block type="ds1307_get_time" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <block type="ds1307_clock_control" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <block type="ds1307_sqw_output" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <block type="ds1307_get_time_string" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SENSOR_LABEL_BMP280 || '🌡️ 기압/온도 센서 (BMP280)'}"></label>
            <sep gap="10"></sep>
            <block type="bmp280_setup"></block>
            <sep gap="10"></sep>
            <block type="bmp280_set_sea_pressure"><value name="PRESSURE"><shadow type="math_number"><field name="NUM">1013.25</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="bmp280_set_reference"><value name="ALTITUDE"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="bmp280_read_value"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SENSOR_LABEL_MPU6050 || '🎯 자이로/가속도 센서 (MPU6050)'}"></label>
            <sep gap="10"></sep>
            <block type="bx_mpu_setup" gap="10"></block>
            <block type="bx_mpu_update" gap="10"></block>
            <block type="bx_mpu_read_value" gap="10"></block>
            <block type="bx_mpu_set_offsets" gap="10"><value name="X"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Z"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <block type="bx_mpu_calc_offsets" gap="10"><value name="DELAY_B"><shadow type="math_number"><field name="NUM">1000</field></shadow></value><value name="DELAY_A"><shadow type="math_number"><field name="NUM">3000</field></shadow></value></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SENSOR_LABEL_SGP30 || '🌬️ 공기질 센서 (SGP30)'}"></label>
            <sep gap="10"></sep>
            <block type="sgp30_setup"><value name="EBASE"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="TBASE"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="sgp30_measure"></block>
            <sep gap="10"></sep>
            <block type="sgp30_get_eco2"></block>
            <sep gap="10"></sep>
            <block type="sgp30_get_tvoc"></block>
            <sep gap="10"></sep>
            <block type="sgp30_set_humidity"><value name="AH"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="sgp30_set_baseline"><value name="EBASE"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="TBASE"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="sgp30_eeprom_save_baseline_fixed"></block>
            <sep gap="10"></sep>
            <block type="sgp30_eeprom_load_baseline_fixed"></block>
            <sep gap="10"></sep>
            <block type="sgp30_eeprom_save_baseline"><value name="ADDR_E"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="ADDR_T"><shadow type="math_number"><field name="NUM">2</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="sgp30_eeprom_load_baseline"><value name="ADDR_E"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="ADDR_T"><shadow type="math_number"><field name="NUM">2</field></shadow></value></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SENSOR_LABEL_VL53L0X || '📏 레이저 거리 센서 (VL53L0X)'}"></label>
            <sep gap="10"></sep>
            <block type="vl53l0x_setup"><value name="ADDR"><shadow type="math_number"><field name="NUM">41</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="vl53l0x_set_mode"><field name="MODE">eSingle</field><field name="PREC">eHigh</field></block>
            <sep gap="10"></sep>
            <block type="vl53l0x_control"><field name="ACT">START</field></block>
            <sep gap="10"></sep>
            <block type="vl53l0x_read_value"><field name="WHAT">DIST</field></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SENSOR_LABEL_SHT31 || '🌡️ 온습도 센서 (SHT31)'}"></label>
            <sep gap="10"></sep>
            <block type="sht31_setup"><value name="ADDRESS"><shadow type="math_number"><field name="NUM">0x44</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="sht31_read"></block>
            <sep gap="10"></sep>
            <block type="sht31_is_connected"></block>
            <sep gap="10"></sep>
            <block type="sht31_get_data"></block>
            <sep gap="10"></sep>
            <block type="sht31_heater_control"></block>
            <sep gap="10"></sep>
            <block type="sht31_is_heater_on"></block>
            <sep gap="10"></sep>
            <block type="sht31_reset"></block>
            <sep gap="10"></sep>
            <block type="sht31_get_error"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SENSOR_LABEL_COLOR || '🎨 컬러 센서 (TCS34725)'}"></label>
            <sep gap="10"></sep>
            <block type="color_sensor_setup"></block>
            <sep gap="10"></sep>
            <block type="color_sensor_init"></block>
            <sep gap="10"></sep>
            <block type="color_sensor_trigger"></block>
            <sep gap="10"></sep>
            <block type="color_sensor_get_data"></block>
            <sep gap="10"></sep>
            <block type="color_sensor_is_color"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SENSOR_LABEL_MLX90614 || '🌡️ 비접촉 온도 센서 (MLX90614)'}"></label>
            <sep gap="10"></sep>
            <block type="mlx90614_setup" gap="10"><value name="ADDRESS"><shadow type="math_number"><field name="NUM">90</field></shadow></value></block>
            <block type="mlx90614_read_temp" gap="10"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SENSOR_LABEL_APDS9960 || '👋 제스처 센서 (APDS9960)'}"></label>
            <sep gap="10"></sep>
            <block type="apds9960_setup"></block>
            <sep gap="10"></sep>
            <block type="apds9960_sensor_control"></block>
            <sep gap="10"></sep>
            <block type="apds9960_read_light"></block>
            <sep gap="10"></sep>
            <block type="apds9960_read_proximity"></block>
            <sep gap="10"></sep>
            <block type="apds9960_gesture_available"></block>
            <sep gap="10"></sep>
            <block type="apds9960_gesture_control"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SENSOR_LABEL_MAX30105 || '❤️ 심박/산소 센서 (MAX30105)'}"></label>
            <sep gap="10"></sep>
            <block type="max30105_setup_basic" gap="10"></block>
            <block type="max30105_finger_detected" gap="10"></block>
            <block type="max30105_get_heartrate" gap="10"></block>
            <block type="max30105_get_spo2" gap="10"></block>
            <block type="max30105_beat_detected" gap="10"></block>
            <block type="max30105_sensor_ready" gap="10"></block>
            <block type="max30105_get_temperature" gap="30"></block>
            <block type="max30105_setup_advanced" gap="10"></block>
            <block type="max30105_get_red_raw" gap="10"></block>
            <block type="max30105_get_ir_raw" gap="10"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SENSOR_LABEL_SI7021 || '🌡️ 온습도 센서 (SI7021)'}"></label>
            <sep gap="10"></sep>
            <block type="si7021_setup"></block>
            <sep gap="10"></sep>
            <block type="si7021_read_value"></block>
            <sep gap="10"></sep>
            <block type="si7021_reset"></block>
            <sep gap="10"></sep>
            <block type="si7021_get_serial"></block>
            <sep gap="40"></sep>

        </category>

        <category name="${Blockly.Msg.BKY_CATEGORY_MOTOR}" colour="#50B91A">
            <block type="motor_flag"></block>
            <label text="${Blockly.Msg.BKY_MOTOR_LABEL_SERVO || '🔄 서보 모터'}"></label>
            <block type="attach_servo"><value name="PIN"><shadow type="math_number"><field name="NUM">9</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="attach_servo_minmax"><value name="PIN"><shadow type="math_number"><field name="NUM">9</field></shadow></value><value name="MIN"><shadow type="math_number"><field name="NUM">500</field></shadow></value><value name="MAX"><shadow type="math_number"><field name="NUM">5000</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="detach_servo"><value name="PIN"><shadow type="math_number"><field name="NUM">9</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="set_servo_angle"><value name="PIN"><shadow type="math_number"><field name="NUM">9</field></shadow></value><value name="ANGLE"><shadow type="math_number"><field name="NUM">90</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="set_servo_microseconds"><value name="PIN"><shadow type="math_number"><field name="NUM">9</field></shadow></value><value name="MICROSECONDS"><shadow type="math_number"><field name="NUM">1500</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="read_servo_angle"><value name="PIN"><shadow type="math_number"><field name="NUM">9</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="read_servo_microseconds"><value name="PIN"><shadow type="math_number"><field name="NUM">9</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="is_servo_attached"><value name="PIN"><shadow type="math_number"><field name="NUM">9</field></shadow></value></block>
            <label text="${Blockly.Msg.BKY_MOTOR_LABEL_GEEKSERVO || '🎮 GeekServo'}"></label>
            <block type="geekservo_angle_360"><value name="PIN"><shadow type="math_number"><field name="NUM">9</field></shadow></value><value name="ANGLE"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="geekservo_wheel"><value name="PIN"><shadow type="math_number"><field name="NUM">9</field></shadow></value><value name="SPEED"><shadow type="math_number"><field name="NUM">100</field></shadow></value></block>
            <label text="${Blockly.Msg.BKY_MOTOR_LABEL_DC || '⚡ DC 모터'}"></label>
            <block type="dcmotor_setup"><value name="PIN_A"><shadow type="math_number"><field name="NUM">5</field></shadow></value><value name="PIN_B"><shadow type="math_number"><field name="NUM">6</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="dcmotor_run"><value name="SPEED"><shadow type="math_number"><field name="NUM">150</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="dcmotor_stop"></block>
            <label text="${Blockly.Msg.BKY_MOTOR_LABEL_STEPPER || '🔩 스테퍼 모터 (AccelStepper)'}"></label>
            <block type="accelstepper_setup"><value name="MOTOR_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="PIN1"><shadow type="math_number"><field name="NUM">8</field></shadow></value><value name="PIN2"><shadow type="math_number"><field name="NUM">9</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="accelstepper_settings"><value name="MOTOR_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="MAX_SPEED"><shadow type="math_number"><field name="NUM">1000</field></shadow></value><value name="ACCELERATION"><shadow type="math_number"><field name="NUM">50</field></shadow></value><value name="SPEED"><shadow type="math_number"><field name="NUM">200</field></shadow></value><value name="STEPS"><shadow type="math_number"><field name="NUM">200</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="accelstepper_move"><value name="MOTOR_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="POSITION"><shadow type="math_number"><field name="NUM">200</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="accelstepper_control"><value name="MOTOR_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="accelstepper_status"><value name="MOTOR_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <label text="${Blockly.Msg.BKY_MOTOR_LABEL_STEPPER_MULTI || '🔩 스테퍼 모터 (4핀)'}"></label>
            <block type="steppermulti_setup"><value name="MOTOR_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="PIN1"><shadow type="math_number"><field name="NUM">8</field></shadow></value><value name="PIN2"><shadow type="math_number"><field name="NUM">9</field></shadow></value><value name="PIN3"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="PIN4"><shadow type="math_number"><field name="NUM">11</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="steppermulti_speed"><value name="MOTOR_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="SPEED"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="steppermulti_move"><value name="MOTOR_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="VALUE"><shadow type="math_number"><field name="NUM">35</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="steppermulti_run"><value name="MOTOR_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <label text="${Blockly.Msg.BKY_MOTOR_LABEL_PWM || '🎛️ PWM 서보 (PCA9685)'}"></label>
            <block type="pwmservo_setup" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="FREQ"><shadow type="math_number"><field name="NUM">50</field></shadow></value></block>
            <block type="pwmservo_servo_angle" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="CHANNEL"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="ANGLE"><shadow type="math_number"><field name="NUM">90</field></shadow></value></block>
            <block type="pwmservo_servo_microseconds" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="CHANNEL"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="MICROSECONDS"><shadow type="math_number"><field name="NUM">1500</field></shadow></value></block>
            <block type="pwmservo_pwm_output" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="CHANNEL"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="VALUE"><shadow type="math_number"><field name="NUM">2048</field></shadow></value></block>
            <block type="pwmservo_pwm_advanced" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="CHANNEL"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="ON"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="OFF"><shadow type="math_number"><field name="NUM">2048</field></shadow></value></block>
            <block type="pwmservo_power" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <block type="pwmservo_multi_servo" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="ANGLE1"><shadow type="math_number"><field name="NUM">90</field></shadow></value><value name="ANGLE2"><shadow type="math_number"><field name="NUM">90</field></shadow></value><value name="ANGLE3"><shadow type="math_number"><field name="NUM">90</field></shadow></value><value name="ANGLE4"><shadow type="math_number"><field name="NUM">90</field></shadow></value></block>
            <block type="pwmservo_led_brightness" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="CHANNEL"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="BRIGHTNESS"><shadow type="math_number"><field name="NUM">50</field></shadow></value></block>
        
        </category>

        <category name="${Blockly.Msg.BKY_CATEGORY_OUTPUT}" colour="#70D650">
            <block type="output_flag"></block>
            <label text="${Blockly.Msg.BKY_OUTPUT_LABEL_BUZZER || '🔔 부저/피에조'}"></label>
            <block type="buzzer_tone_setup"></block>
            <sep gap="10"></sep>
            <block type="buzzer_set_tempo"><value name="BPM"><shadow type="math_number"><field name="NUM">120</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="buzzer_play_note"><value name="PIN"><shadow type="math_number"><field name="NUM">7</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="buzzer_stop"><value name="PIN"><shadow type="math_number"><field name="NUM">7</field></shadow></value></block>
            <label text="${Blockly.Msg.BKY_OUTPUT_LABEL_MP3 || '🎵 MP3 플레이어 (KT403A)'}"></label>
            <block type="mp3_setup_kt403a"><value name="RX"><shadow type="math_number"><field name="NUM">2</field></shadow></value><value name="TX"><shadow type="math_number"><field name="NUM">3</field></shadow></value><value name="VOL"><shadow type="math_number"><field name="NUM">20</field></shadow></value><field name="DEVICE">0x02</field></block>
            <sep gap="10"></sep>
            <block type="mp3_play_index"><value name="INDEX"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="mp3_play_folder"><value name="FOLDER"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="FILE"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="mp3_set_volume"><value name="VOL"><shadow type="math_number"><field name="NUM">20</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="mp3_control"><field name="CMD">NEXT</field></block>
            <sep gap="10"></sep>
            <block type="mp3_query_status"></block>
            <label text="${Blockly.Msg.BKY_OUTPUT_LABEL_SD || '💾 SD 카드'}"></label>
            <block type="sd_setup" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="CS"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="MOSI"><shadow type="math_number"><field name="NUM">11</field></shadow></value><value name="MISO"><shadow type="math_number"><field name="NUM">12</field></shadow></value><value name="SCK"><shadow type="math_number"><field name="NUM">13</field></shadow></value></block>
            <block type="sd_open_file" gap="10"><value name="FILE_VAR"><shadow type="text"><field name="TEXT">myFile</field></shadow></value><value name="FILENAME"><shadow type="text"><field name="TEXT">data.txt</field></shadow></value></block>
            <block type="sd_write_file" gap="10"><value name="FILE_VAR"><shadow type="text"><field name="TEXT">myFile</field></shadow></value><value name="DATA"><shadow type="text"><field name="TEXT">Hello</field></shadow></value></block>
            <block type="sd_read_file" gap="10"><value name="FILE_VAR"><shadow type="text"><field name="TEXT">myFile</field></shadow></value></block>
            <block type="sd_file_exists" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="FILENAME"><shadow type="text"><field name="TEXT">data.txt</field></shadow></value></block>
            <block type="sd_file_size" gap="10"><value name="FILE_VAR"><shadow type="text"><field name="TEXT">myFile</field></shadow></value></block>
            <block type="sd_close_file" gap="10"><value name="FILE_VAR"><shadow type="text"><field name="TEXT">myFile</field></shadow></value></block>
            <block type="sd_remove_file" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="FILENAME"><shadow type="text"><field name="TEXT">data.txt</field></shadow></value></block>
            <block type="sd_make_directory" gap="10"><value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="PATH"><shadow type="text"><field name="TEXT">mydir</field></shadow></value></block>
            <block type="sd_file_available" gap="10"><value name="FILE_VAR"><shadow type="text"><field name="TEXT">myFile</field></shadow></value></block>
        </category>

        <category name="${Blockly.Msg.BKY_CATEGORY_COMM}" colour="#F75ACF">
            <block type="comm_flag"></block>
            <label text="${Blockly.Msg.BKY_COMM_LABEL_IR || '📡 IR 리모컨'}"></label>
            <block type="ir_setup"><value name="PIN"><shadow type="math_number"><field name="NUM">11</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="ir_available"></block>
            <sep gap="10"></sep>
            <block type="ir_read_button"></block>
            <sep gap="10"></sep>
            <block type="ir_read_raw"></block>
            <sep gap="10"></sep>
            <block type="ir_button_is"></block>
            <label text="${Blockly.Msg.BKY_COMM_LABEL_RF433 || '📻 RF433 무선'}"></label>
            <block type="rf433_setup"></block>
            <sep gap="10"></sep>
            <block type="rf433_config"><value name="TX_PIN"><shadow type="math_number"><field name="NUM">12</field></shadow></value><value name="MESSAGE"><shadow type="text"><field name="TEXT">Gorillacell</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="rf433_rx_setup"><value name="RX_PIN"><shadow type="math_number"><field name="NUM">11</field></shadow></value><value name="SPEED"><shadow type="math_number"><field name="NUM">2000</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="rf433_rx_start"></block>
            <sep gap="10"></sep>
            <block type="rf433_have_message"></block>
            <sep gap="10"></sep>
            <block type="rf433_get_message"></block>
            <sep gap="10"></sep>
            <block type="rf433_read_data"></block>
            <label text="${Blockly.Msg.BKY_COMM_LABEL_GPS || '🛰️ GPS 모듈'}"></label>
            <block type="gps_setup_tinygps"><field name="SER">Serial</field><value name="BAUD"><shadow type="math_number"><field name="NUM">9600</field></shadow></value><value name="RX"><shadow type="math_number"><field name="NUM">4</field></shadow></value><value name="TX"><shadow type="math_number"><field name="NUM">3</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="gps_update_from_serial"></block>
            <sep gap="10"></sep>
            <block type="gps_read_value"><field name="WHAT">LAT</field></block>
            <sep gap="10"></sep>
            <block type="gps_has_fix"></block>
            <sep gap="10"></sep>
            <block type="gps_between_calc"><field name="WHAT">DIST_M</field><value name="LAT1"><shadow type="math_number"><field name="NUM">37.5665</field></shadow></value><value name="LNG1"><shadow type="math_number"><field name="NUM">126.9780</field></shadow></value><value name="LAT2"><shadow type="math_number"><field name="NUM">35.1796</field></shadow></value><value name="LNG2"><shadow type="math_number"><field name="NUM">129.0756</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="gps_cardinal"><value name="COURSE"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
        </category>

        <category name="${Blockly.Msg.BKY_CATEGORY_HUSKYLENS || '🐶 허스키렌즈'}" colour="#F75ACF">
            <label text="${Blockly.Msg.BKY_HUSKYLENS_LABEL_SETUP || '⚙️ 연결 설정'}"></label>
            <sep gap="10"></sep>
            <block type="huskylens_setup_i2c"></block>
            <sep gap="10"></sep>
            <block type="huskylens_setup_serial">
                <value name="RX"><shadow type="math_number"><field name="NUM">10</field></shadow></value>
                <value name="TX"><shadow type="math_number"><field name="NUM">11</field></shadow></value>
            </block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_HUSKYLENS_LABEL_ALGORITHM || '🎯 알고리즘'}"></label>
            <sep gap="10"></sep>
            <block type="huskylens_set_algorithm"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_HUSKYLENS_LABEL_REQUEST || '📡 데이터 요청'}"></label>
            <sep gap="10"></sep>
            <block type="huskylens_request"></block>
            <sep gap="10"></sep>
            <block type="huskylens_request_by_id">
                <value name="ID"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
            </block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_HUSKYLENS_LABEL_DETECT || '🔍 감지 확인'}"></label>
            <sep gap="10"></sep>
            <block type="huskylens_available"></block>
            <sep gap="10"></sep>
            <block type="huskylens_is_learned">
                <value name="ID"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
            </block>
            <sep gap="10"></sep>
            <block type="huskylens_count_learned_ids"></block>
            <sep gap="10"></sep>
            <block type="huskylens_count_blocks"></block>
            <sep gap="10"></sep>
            <block type="huskylens_count_arrows"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_HUSKYLENS_LABEL_BLOCK || '📦 블록(사각형) 정보'}"></label>
            <sep gap="10"></sep>
            <block type="huskylens_block_info"></block>
            <sep gap="10"></sep>
            <block type="huskylens_block_info_by_id">
                <value name="ID"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
            </block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_HUSKYLENS_LABEL_ARROW || '➡️ 화살표(선) 정보'}"></label>
            <sep gap="10"></sep>
            <block type="huskylens_arrow_info"></block>
            <sep gap="10"></sep>
            <block type="huskylens_arrow_info_by_id">
                <value name="ID"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
            </block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_HUSKYLENS_LABEL_LEARN || '🎓 학습'}"></label>
            <sep gap="10"></sep>
            <block type="huskylens_learn_once">
                <value name="ID"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
            </block>
            <sep gap="10"></sep>
            <block type="huskylens_forget"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_HUSKYLENS_LABEL_DISPLAY || '🖥️ 화면 표시'}"></label>
            <sep gap="10"></sep>
            <block type="huskylens_write_osd">
                <value name="TEXT"><shadow type="text"><field name="TEXT">Hello</field></shadow></value>
                <value name="X"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
                <value name="Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
            </block>
            <sep gap="10"></sep>
            <block type="huskylens_clear_osd"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_HUSKYLENS_LABEL_SDCARD || '💾 SD 카드'}"></label>
            <sep gap="10"></sep>
            <block type="huskylens_screenshot"></block>
            <sep gap="10"></sep>
            <block type="huskylens_save_model">
                <value name="INDEX"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
            </block>
            <sep gap="10"></sep>
            <block type="huskylens_load_model">
                <value name="INDEX"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
            </block>
        </category>

        ${capabilities.ble ? `
        <category name="${Blockly.Msg.BKY_CATEGORY_WEBBLE || '🌐 웹 BLE 통신'}" colour="#4285F4">
            <label text="${Blockly.Msg.BKY_SERIAL_LABEL_SETUP || '⚙️ 설정'}"></label>
            <sep gap="10"></sep>
            <block type="sys_webble_setup">
                <value name="NAME"><shadow type="text"><field name="TEXT">Brixel_BLE</field></shadow></value>
            </block>
            <sep gap="10"></sep>
            <block type="sys_webble_connected"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_BT_LABEL_COMM || '📡 송수신'}"></label>
            <sep gap="10"></sep>
            <block type="sys_webble_available"></block>
            <sep gap="10"></sep>
            <block type="sys_webble_read"></block>
            <sep gap="10"></sep>
            <block type="sys_webble_write">
                <value name="CONTENT"><shadow type="text"><field name="TEXT">Hello</field></shadow></value>
            </block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SERIAL_LABEL_PARSE || '🔍 분석'}"></label>
            <sep gap="10"></sep>
            <block type="sys_webble_parse">
                <value name="DELIMITER"><shadow type="text"><field name="TEXT">,</field></shadow></value>
            </block>
            <sep gap="10"></sep>
            <block type="sys_webble_get_value">
                <value name="N"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
            </block>
            <sep gap="30"></sep>
        </category>
        ` : ''}
        
        ${capabilities.wifi ? `
        <category name="${Blockly.Msg.BKY_CATEGORY_WIFI || '🌐 WiFi 통신'}" colour="#4285F4">
            <label text="${Blockly.Msg.BKY_SERIAL_LABEL_SETUP || '⚙️ 설정'}"></label>
            <sep gap="10"></sep>
            <block type="wifi_setup">
                <value name="SSID"><shadow type="text"><field name="TEXT">SSID</field></shadow></value>
                <value name="PASS"><shadow type="text"><field name="TEXT">PASSWORD</field></shadow></value>
            </block>
            <sep gap="10"></sep>
            <block type="wifi_ws_server_setup">
                <value name="PORT"><shadow type="math_number"><field name="NUM">81</field></shadow></value>
            </block>
            <sep gap="10"></sep>
            <block type="wifi_is_connected"></block>
            <sep gap="10"></sep>
            <block type="wifi_local_ip"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_BT_LABEL_COMM || '📡 송수신'}"></label>
            <sep gap="10"></sep>
            <block type="wifi_ws_available"></block>
            <sep gap="10"></sep>
            <block type="wifi_ws_read"></block>
            <sep gap="10"></sep>
            <block type="wifi_ws_send">
                <value name="DATA"><shadow type="text"><field name="TEXT">Hello</field></shadow></value>
            </block>
            <sep gap="10"></sep>
            <block type="wifi_ws_send_raw">
                <value name="DATA"><shadow type="text"><field name="TEXT">Hello</field></shadow></value>
            </block>
            <sep gap="10"></sep>
            <block type="wifi_ws_send_label_value">
                <value name="LABEL"><shadow type="text"><field name="TEXT">temp</field></shadow></value>
                <value name="VALUE"><shadow type="math_number"><field name="NUM">25</field></shadow></value>
            </block>
        </category>
        ` : ''}

        <category name="${Blockly.Msg.BKY_CATEGORY_SERIAL}" colour="#367E7F">
            <label text="${Blockly.Msg.BKY_SERIAL_LABEL_SETUP || '⚙️ 설정'}"></label>
            <sep gap="10"></sep>
            <block type="sys_serial_begin"><value name="RX"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="TX"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="BAUD"><shadow type="math_number"><field name="NUM">115200</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="sys_serial_connected"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SERIAL_LABEL_SEND || '📤 송신'}"></label>
            <sep gap="10"></sep>
            <block type="sys_serial_print"><value name="CONTENT"><shadow type="text"><field name="TEXT">Hello</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="sys_serial_send_change"><value name="CONTENT"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="sys_serial_print_continuous"><value name="CONTENT"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="sys_serial_print_multi"><value name="CONTENT"><shadow type="text"><field name="TEXT">100,200,300</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="sys_serial_send_key_val"><value name="KEY"><shadow type="text"><field name="TEXT">LED</field></shadow></value><value name="VAL"><shadow type="text"><field name="TEXT">ON</field></shadow></value></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SERIAL_LABEL_RECV || '📥 수신'}"></label>
            <sep gap="10"></sep>
            <block type="sys_serial_poll"></block>
            <sep gap="10"></sep>
            <block type="sys_serial_available"></block>
            <sep gap="10"></sep>
            <block type="sys_serial_read_raw"></block>
            <sep gap="10"></sep>
            <block type="sys_serial_flush"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SERIAL_LABEL_PARSE_SCRATCH || '🔍 파싱 (스크래치 호환)'}"></label>
            <sep gap="10"></sep>
            <block type="sys_serial_parse_delimiter"><value name="DELIMITER"><shadow type="text"><field name="TEXT">,</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="sys_parsed_value_get"><value name="INDEX"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="sys_parsed_count"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_SERIAL_LABEL_PARSE_MANUAL || '🔍 파싱 (직접 입력)'}"></label>
            <sep gap="10"></sep>
            <block type="sys_parse_csv_get"><value name="INDEX"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="STRING"><shadow type="text"><field name="TEXT">a,b,c</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="sys_parse_count"><value name="STRING"><shadow type="text"><field name="TEXT">a,b,c</field></shadow></value></block>
            <sep gap="10"></sep>
            <block type="sys_util_to_number"><value name="STRING"><shadow type="text"><field name="TEXT">123</field></shadow></value></block>
            <sep gap="30"></sep>
        </category>

        <category name="${Blockly.Msg.BKY_CATEGORY_ESP32CAM}" colour="#367E7F">
            <label text="${Blockly.Msg.BKY_ESP32CAM_LABEL_SETUP || '⚙️ ESP32CAM 연결 설정'}"></label>
            <sep gap="10"></sep>
            <block type="esp32cam_declare"></block>
            <sep gap="10"></sep>
            <block type="esp32cam_wifi_config">
                <value name="SSID"><shadow type="text"><field name="TEXT">User ID</field></shadow></value>
                <value name="PASSWORD"><shadow type="text"><field name="TEXT">PW11112222</field></shadow></value>
            </block>
            <sep gap="10"></sep>
            <block type="esp32cam_receiver_config">
                <value name="IP"><shadow type="text"><field name="TEXT">192.168.137.1</field></shadow></value>
                <value name="PORT"><shadow type="math_number"><field name="NUM">8888</field></shadow></value>
                <value name="CHUNK_SIZE"><shadow type="math_number"><field name="NUM">1000</field></shadow></value>
            </block>
            <sep gap="10"></sep>
            <block type="esp32cam_setup">
                <value name="JPEG_QUALITY"><shadow type="math_number"><field name="NUM">12</field></shadow></value>
                <value name="BRIGHTNESS"><shadow type="math_number"><field name="NUM">-1</field></shadow></value>
                <value name="CONTRAST"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
                <value name="SATURATION"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
            </block>
            <sep gap="10"></sep>
            <block type="esp32cam_flip"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_ESP32CAM_LABEL_CAMERA || '📷 카메라'}"></label>
            <sep gap="10"></sep>
            <block type="esp32cam_loop"></block>
            <sep gap="10"></sep>
            <block type="esp32cam_led_control"></block>
            <sep gap="30"></sep>
            <label text="${Blockly.Msg.BKY_ESP32S3CAM_LABEL_SETUP || '⚙️ ESP32 S3 CAM 연결 설정'}"></label>
            <sep gap="10"></sep>
            <block type="esp32s3cam_declare"></block>
            <sep gap="10"></sep>
            <block type="esp32s3cam_setup">
                <value name="JPEG_QUALITY"><shadow type="math_number"><field name="NUM">12</field></shadow></value>
                <value name="BRIGHTNESS"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
                <value name="CONTRAST"><shadow type="math_number"><field name="NUM">1</field></shadow></value>
                <value name="SATURATION"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
            </block>
            <sep gap="10"></sep>
        </category>

        <category name="=================" colour="#171717"></category>
        <category name="${Blockly.Msg.BKY_CATEGORY_GUIDE}" colour="#FFAB19">
            <block type="developer_info_block"></block>
            <sep gap="10"></sep>
            <block type="custom_ad_block"></block>
            <sep gap="10"></sep>  
            <block type="go_to_ai_robot_scratch"></block>
            <sep gap="10"></sep>
            <block type="go_to_bowerbird_pro"></block>
            <sep gap="10"></sep>
            <block type="go_to_circuit_config"></block>
            <sep gap="10"></sep>
            <block type="go_to_k12_projectHub"></block>
        </category>
    `;
}

// 툴박스 관리 헬퍼 함수들
const ToolboxManager = {
    // 툴박스 XML 생성
    generate: generateToolbox,

    // 카테고리별 블록 정보를 동적으로 업데이트할 때 사용할 수 있는 헬퍼
    updateCategory: function (categoryName, blocks) {
        // 향후 확장을 위한 함수 (현재는 기본 구조)
        console.log(`Updating category: ${categoryName}`, blocks);
    },

    // 툴박스 검증 함수
    validate: function () {
        const toolboxContent = generateToolbox();
        return toolboxContent.length > 0 && toolboxContent.includes('category');
    }
};

// 전역 접근을 위한 윈도우 객체에 할당
if (typeof window !== 'undefined') {
    window.generateToolbox = generateToolbox;
    window.ToolboxManager = ToolboxManager;
}