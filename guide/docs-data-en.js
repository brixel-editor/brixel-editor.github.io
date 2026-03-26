/* ============================================================
   Brixel Docs — Content Data (English)
   Generated from brixel_toolbox.js + block_tooltips.json
   ============================================================ */

var DOCS_NAV = [
  {
    group: 'software',
    title: '📦 Software (Block Coding)',
    items: [
      { id: 'main', name: 'Main', color: '#FFAB19', icon: '🚀' },
      { id: 'pin', name: 'Pin Control', color: '#6190DF', icon: '📌' },
      { id: 'control', name: 'Control', color: '#FF9800', icon: '🔄' },
      { id: 'logic', name: 'Logic', color: '#5CB1D6', icon: '🧠' },
      { id: 'math', name: 'Math', color: '#59C059', icon: '🔢' },
      { id: 'text', name: 'Text', color: '#82a52d', icon: '📝' },
      { id: 'color', name: 'Color', color: '#A855F7', icon: '🎨' },
      { id: 'variables', name: 'Variables', color: '#98607F', icon: '📦' },
      { id: 'list', name: 'List', color: '#59ACF7', icon: '📋' },
      { id: 'functions', name: 'Functions', color: '#8E61A3', icon: '⚙️' },
      { id: 'utility', name: 'Utility', color: '#08B89F', icon: '🛠️' }
    ]
  },
  {
    group: 'hardware',
    title: '🔌 Hardware (I/O Devices)',
    items: [
      { id: 'display-a', name: 'Display A', color: '#FAC907', icon: '📺' },
      { id: 'display-b', name: 'Display B', color: '#FAC907', icon: '🖥️' },
      { id: 'sensors-a', name: 'Sensors A', color: '#FF6F00', icon: '🌡️' },
      { id: 'sensors-b', name: 'Sensors B', color: '#4D68EC', icon: '🔬' },
      { id: 'motor', name: 'Motor', color: '#50B91A', icon: '⚡' },
      { id: 'output', name: 'Output', color: '#70D650', icon: '🔔' },
      { id: 'communication', name: 'Communication', color: '#F75ACF', icon: '📡' },
      { id: 'huskylens', name: 'HuskyLens', color: '#00BFA5', icon: '🐶' },
      { id: 'webble', name: 'Web Bluetooth', color: '#4285F4', icon: '🌐' },
      { id: 'wifi', name: 'WiFi', color: '#4285F4', icon: '📶' },
      { id: 'serial', name: 'Serial', color: '#367E7F', icon: '🔌' },
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
    title: 'Main',
    color: '#FFAB19',
    description: 'Blocks that define the program entry point and basic structure',
    blocks: [
      { id: 'arduino_uno_starts_up', name: 'Board Startup', params: null, output: null, description: 'Includes required libraries at program start' },
      { id: 'arduino_setup', name: 'setup() Function', params: null, output: null, description: 'Runs once at program start for initialization' },
      { id: 'arduino_loop', name: 'loop() Function', params: null, output: null, description: 'Main loop that runs repeatedly' }
    ],
    tips: ['setup() is for initialization code, loop() is for repeating code', 'Place the "Board Startup" block at the top of your program']
  },

  'pin': {
    title: 'Pin Control',
    color: '#6190DF',
    description: 'Blocks for direct control of Arduino digital/analog pins',
    blocks: [
      { id: 'pin_mode', name: 'Set Pin Mode', params: ['PIN'], output: null, description: 'Set pin as INPUT or OUTPUT' },
      { id: 'read_digital_pin', name: 'Read Digital Pin', params: ['PIN'], output: 'Number', description: 'Read HIGH/LOW value from digital pin' },
      { id: 'read_analog_pin', name: 'Read Analog Pin', params: ['PIN'], output: 'Number', description: 'Read analog pin value (0~1023)' },
      { id: 'set_digital_pin', name: 'Digital Pin Output', params: ['PIN'], output: null, description: 'Output HIGH or LOW to pin' },
      { id: 'set_pwm_pin', name: 'PWM Output', params: ['PIN', 'VALUE'], output: null, description: 'Output PWM value (0~255)' },
      { id: 'servo_setup', name: 'Servo Setup', params: ['PIN'], output: null, description: 'Connect servo motor pin' },
      { id: 'set_servo_angle', name: 'Set Servo Angle', params: ['PIN', 'ANGLE'], output: null, description: 'Set servo motor angle (0~180)' },
      { id: 'tone_out', name: 'Tone Output', params: ['PIN', 'FREQUENCY', 'DURATION'], output: null, description: 'Output tone at specific frequency to buzzer' },
      { id: 'no_tone', name: 'Stop Tone', params: ['PIN'], output: null, description: 'Stop tone output' },
      { id: 'delay_ms', name: 'Delay', params: ['DELAY_TIME'], output: null, description: 'Wait in milliseconds' },
      { id: 'timer_millis', name: 'Millis Timer', params: null, output: 'Number', description: 'Return millis() value' },
      { id: 'timer_reset', name: 'Reset Timer', params: ['TIMER_NUM'], output: null, description: 'Reset timer' },
      { id: 'timer_non_blocking_delay', name: 'Non-blocking Delay', params: ['INTERVAL'], output: null, description: 'Non-blocking delay (allows other code to run)' },
      { id: 'arduino_interrupt', name: 'Set Interrupt', params: ['PIN'], output: null, description: 'Set external interrupt pin (execute code on pin state change)' },
      { id: 'pulse_in', name: 'Pulse Input', params: ['PIN', 'TIMEOUT'], output: 'Number', description: 'Measure pulse length on pin (microseconds)' },
      { id: 'shift_out', name: 'Shift Out', params: ['DATA_PIN', 'CLOCK_PIN', 'LATCH_PIN', 'VALUE'], output: null, description: 'Output data to shift register' }
    ],
    tips: ['Analog pins: A0~A5, Digital pins: 0~13', 'PWM output only available on pins with ~ mark (3,5,6,9,10,11)']
  },

  'control': {
    title: 'Control',
    color: '#FF9800',
    description: 'Conditional and loop blocks for program flow control',
    blocks: [
      { id: 'delay_ms', name: 'Delay', params: ['DELAY_TIME'], output: null, description: 'Wait in milliseconds' },
      { id: 'wait_until', name: 'Wait Until', params: ['CONDITION'], output: null, description: 'Wait until condition becomes true' },
      { id: 'controls_if', name: 'If-Then', params: null, output: null, description: 'Conditional branching (if/else)' },
      { id: 'controls_repeat_ext', name: 'Repeat (Count)', params: ['TIMES'], output: null, description: 'Repeat specified number of times' },
      { id: 'controls_whileUntil', name: 'Repeat (Condition)', params: null, output: null, description: 'Repeat while or until condition is true' },
      { id: 'controls_flow_statements', name: 'break/continue', params: null, output: null, description: 'Loop control (break/continue)' }
    ],
    tips: ['Use while(true) block for infinite loops', 'break exits loop immediately, continue skips to next iteration']
  },

  'logic': {
    title: 'Logic',
    color: '#5CB1D6',
    description: 'Comparison and logical operation blocks',
    blocks: [
      { id: 'logic_compare', name: 'Compare', params: ['A', 'B'], output: 'Boolean', description: 'Compare two values (=, ≠, <, >, ≤, ≥)' },
      { id: 'logic_operation', name: 'Logic Operation', params: ['A', 'B'], output: 'Boolean', description: 'AND, OR logical operations' },
      { id: 'logic_negate', name: 'NOT', params: ['BOOL'], output: 'Boolean', description: 'Invert true/false' },
      { id: 'logic_boolean', name: 'True/False', params: null, output: 'Boolean', description: 'true or false value' },
      { id: 'logic_null', name: 'null', params: null, output: 'null', description: 'Empty value (null)' },
      { id: 'logic_ternary', name: 'Ternary Operator', params: ['IF', 'THEN', 'ELSE'], output: 'Any', description: 'condition ? trueValue : falseValue' }
    ],
    tips: ['Comparison blocks are commonly used for evaluating sensor values']
  },

  'math': {
    title: 'Math',
    color: '#59C059',
    description: 'Number, arithmetic, and math function blocks',
    blocks: [
      { id: 'math_number', name: 'Number', params: null, output: 'Number', description: 'Enter a number value' },
      { id: 'math_arithmetic', name: 'Arithmetic', params: ['A', 'B'], output: 'Number', description: '+, -, ×, ÷, power' },
      { id: 'math_single', name: 'Unary Operation', params: ['NUM'], output: 'Number', description: 'sqrt, abs, -, ln, log10, e^, 10^' },
      { id: 'math_trig', name: 'Trigonometry', params: ['NUM'], output: 'Number', description: 'sin, cos, tan, asin, acos, atan' },
      { id: 'math_constant', name: 'Math Constant', params: null, output: 'Number', description: 'π, e, φ, √2, √½, ∞' },
      { id: 'math_number_property', name: 'Number Property', params: ['NUMBER_TO_CHECK'], output: 'Boolean', description: 'Check even, odd, prime, integer, etc.' },
      { id: 'math_round', name: 'Round/Ceil/Floor', params: ['NUM'], output: 'Number', description: 'Round number' },
      { id: 'math_modulo', name: 'Modulo', params: ['DIVIDEND', 'DIVISOR'], output: 'Number', description: 'Remainder of division' },
      { id: 'math_constrain', name: 'Constrain', params: ['VALUE', 'LOW', 'HIGH'], output: 'Number', description: 'Constrain value to min~max range' },
      { id: 'math_random_int', name: 'Random Integer', params: ['FROM', 'TO'], output: 'Number', description: 'Random integer in range' },
      { id: 'math_random_float', name: 'Random Float', params: null, output: 'Number', description: 'Random decimal between 0~1' },
      { id: 'math_atan2', name: 'atan2', params: ['X', 'Y'], output: 'Number', description: 'Two-argument arctangent' }
    ],
    tips: ['math_constrain is useful for limiting sensor values to a safe range']
  },

  'text': {
    title: 'Text',
    color: '#82a52d',
    description: 'String manipulation blocks',
    blocks: [
      { id: 'text', name: 'String', params: null, output: 'String', description: 'Enter a string value' },
      { id: 'custom_text_join', name: 'Join Strings', params: ['TEXT1', 'TEXT2'], output: 'String', description: 'Concatenate two strings' },
      { id: 'custom_text_char_at', name: 'Character At', params: ['TEXT', 'INDEX'], output: 'String', description: 'Extract character at position' },
      { id: 'custom_text_length', name: 'String Length', params: ['TEXT'], output: 'Number', description: 'Return length of string' },
      { id: 'custom_text_compare', name: 'Compare Strings', params: null, output: 'Boolean', description: 'Compare two strings' },
      { id: 'custom_text_contains', name: 'Contains', params: ['TEXT', 'SUBSTRING'], output: 'Boolean', description: 'Check if string contains specific text' },
      { id: 'text_append', name: 'Append Text', params: null, output: null, description: 'Append string to variable' },
      { id: 'text_changeCase', name: 'Change Case', params: null, output: null, description: 'Convert to uppercase/lowercase' },
      { id: 'text_trim', name: 'Trim', params: null, output: null, description: 'Remove leading/trailing whitespace' },
      { id: 'text_isEmpty', name: 'Is Empty', params: null, output: 'Boolean', description: 'Check if string is empty' }
    ],
    tips: ['String joining is commonly used for serial communication and LCD output']
  },

  'color': {
    title: 'Color',
    color: '#A855F7',
    description: 'Color value creation and conversion blocks',
    blocks: [
      { id: 'colour_picker_custom', name: 'Color Picker', params: null, output: 'Color', description: 'Select color from palette' },
      { id: 'colour_random_custom', name: 'Random Color', params: null, output: 'Color', description: 'Generate random color' },
      { id: 'colour_rgb_custom', name: 'RGB Color', params: ['RED', 'GREEN', 'BLUE'], output: 'Color', description: 'Create color from R,G,B values' },
      { id: 'colour_blend_custom', name: 'Blend Colors', params: ['COLOUR1', 'COLOUR2', 'RATIO'], output: 'Color', description: 'Blend two colors by ratio' },
      { id: 'colour_to_hex', name: 'Color→HEX', params: ['COLOUR'], output: 'String', description: 'Convert color to HEX string' },
      { id: 'colour_to_rgb_values', name: 'Color→RGB', params: ['COLOUR'], output: 'Array', description: 'Convert color to R,G,B array' }
    ],
    tips: ['Color blocks are convenient when controlling NeoPixel LEDs']
  },

  'variables': {
    title: 'Variables',
    color: '#98607F',
    description: 'Blocks for storing and reading values',
    subsections: [
      {
        label: 'C-type Variables',
        blocks: [
          { id: 'variable_declare', name: 'Declare C Variable', params: ['TYPE', 'VAR_NAME', 'VALUE'], output: null, description: 'Declare typed variable (with initial value)' },
          { id: 'variable_declare_novalue', name: 'Declare Variable (No Value)', params: ['TYPE', 'VAR_NAME'], output: null, description: 'Declare variable without initial value' },
          { id: 'variable_declare_set', name: 'Set Declared Variable', params: ['VAR_NAME', 'VALUE'], output: null, description: 'Assign value to declared variable' },
          { id: 'variable_declare_change', name: 'Change Declared Variable', params: ['VAR_NAME', 'DELTA'], output: null, description: 'Increment/decrement declared variable' },
          { id: 'variable_declare_get', name: 'Get Declared Variable', params: ['VAR_NAME'], output: 'Any', description: 'Get value of declared variable' }
        ]
      },
      {
        label: 'Number Variables',
        blocks: [
          { id: 'number_variable_set', name: 'Set Number Variable', params: ['VALUE'], output: null, description: 'Store value in number(float) variable' },
          { id: 'number_variable_get', name: 'Get Number Variable', params: null, output: 'Number', description: 'Get number(float) variable value' },
          { id: 'math_change', name: 'Change Variable', params: ['DELTA'], output: null, description: 'Add or subtract from variable' }
        ]
      },
      {
        label: 'String Variables',
        blocks: [
          { id: 'string_variable_set', name: 'Set String Variable', params: ['VALUE'], output: null, description: 'Store value in String variable' },
          { id: 'string_variable_get', name: 'Get String Variable', params: null, output: 'String', description: 'Get String variable value' }
        ]
      }
    ],
    tips: ['Use number/string variables for simple projects, C-type variable declaration for advanced control']
  },

  'list': {
    title: 'List',
    color: '#59ACF7',
    description: 'Array (list) creation and manipulation blocks',
    blocks: [
      { id: 'array_create', name: 'Create Array', params: ['VALUES'], output: null, description: 'Create array with values' },
      { id: 'array_create_empty', name: 'Create Empty Array', params: ['SIZE'], output: null, description: 'Create empty array of specified size' },
      { id: 'array_get', name: 'Get Element', params: ['INDEX'], output: 'Any', description: 'Get value at index' },
      { id: 'array_set', name: 'Set Element', params: ['INDEX', 'VALUE'], output: null, description: 'Set value at index' },
      { id: 'array_append', name: 'Append Element', params: ['VALUE'], output: null, description: 'Add value to end of array' },
      { id: 'array_remove', name: 'Remove Element', params: ['INDEX'], output: null, description: 'Remove element at index' },
      { id: 'array_find', name: 'Find Value', params: ['VALUE'], output: 'Number', description: 'Return index of value (-1 if not found)' },
      { id: 'array_length', name: 'Array Length', params: null, output: 'Number', description: 'Number of array elements' },
      { id: 'array_clear', name: 'Clear Array', params: ['VALUE'], output: null, description: 'Fill entire array with specified value' },
      { id: 'array_copy', name: 'Copy Array', params: null, output: null, description: 'Duplicate array' },
      { id: 'array_strlen', name: 'Char Array Length', params: null, output: 'Number', description: 'Actual length of char[] array' },
      { id: 'array_contains', name: 'Array Contains', params: ['VALUE'], output: 'Boolean', description: 'Check if value exists in array' }
    ],
    tips: ['Array indexes start from 0']
  },

  'functions': {
    title: 'Functions',
    color: '#8E61A3',
    description: 'Blocks for defining reusable code bundles',
    blocks: [
      { id: 'procedures_defnoreturn', name: 'Define Function (No Return)', params: null, output: null, description: 'Define function without return value' },
      { id: 'procedures_defreturn', name: 'Define Function (With Return)', params: null, output: null, description: 'Define function with return value' },
      { id: 'procedures_callnoreturn', name: 'Call Function (No Return)', params: null, output: null, description: 'Execute function without return value' },
      { id: 'procedures_callreturn', name: 'Call Function (With Return)', params: null, output: 'Any', description: 'Execute function with return value' },
      { id: 'procedures_ifreturn', name: 'Conditional Return', params: ['CONDITION', 'VALUE'], output: null, description: 'Return value if condition is true' },
      { id: 'procedures_ifreturn_void', name: 'Conditional Return (void)', params: ['CONDITION'], output: null, description: 'Exit function if condition is true' }
    ],
    tips: ['Grouping repeated code into functions makes programs cleaner']
  },

  'utility': {
    title: 'Utility',
    color: '#08B89F',
    description: 'Value conversion, I2C scan, block recording, timer tools',
    subsections: [
      {
        label: 'Value Conversion',
        blocks: [
          { id: 'util_millis', name: 'millis()', params: null, output: 'Number', description: 'Milliseconds elapsed since program start' },
          { id: 'util_map', name: 'Map Value', params: ['VALUE', 'FROMLOW', 'FROMHIGH', 'TOLOW', 'TOHIGH'], output: 'Number', description: 'Map value from one range to another' },
          { id: 'util_constrain', name: 'Constrain Value', params: ['VALUE', 'LOW', 'HIGH'], output: 'Number', description: 'Constrain value to min~max range' },
          { id: 'util_convert', name: 'Type Cast', params: ['VALUE'], output: 'Any', description: 'Data type conversion (int, float, String, etc.)' },
          { id: 'util_to_char', name: 'ASCII→Char', params: ['VALUE'], output: 'String', description: 'Convert ASCII code to character' },
          { id: 'util_to_ascii', name: 'Char→ASCII', params: ['VALUE'], output: 'Number', description: 'Convert character to ASCII code' }
        ]
      },
      {
        label: 'I2C Tools',
        blocks: [
          { id: 'util_i2c_scanner', name: 'I2C Scanner', params: null, output: null, description: 'Scan for connected I2C device addresses' },
          { id: 'util_i2c_read_address', name: 'Read I2C Address', params: null, output: 'Number', description: 'Return detected I2C address' }
        ]
      },
      {
        label: 'Block Assembly Record/Play',
        blocks: [
          { id: 'util_record_start', name: 'Start Recording', params: null, output: null, description: 'Start recording block assembly process' },
          { id: 'util_record_stop', name: 'Stop Recording', params: null, output: null, description: 'Stop recording' },
          { id: 'util_record_play', name: 'Play Recording', params: null, output: null, description: 'Play back recorded block assembly' },
          { id: 'util_record_play_stop', name: 'Stop Playback', params: null, output: null, description: 'Stop playback' },
          { id: 'util_record_reset', name: 'Reset Recording', params: null, output: null, description: 'Delete recording data' }
        ]
      },
      {
        label: 'Recording Info',
        blocks: [
          { id: 'util_record_status', name: 'Recording Status', params: null, output: 'String', description: 'Return current recording/playback status' },
          { id: 'util_record_event_count', name: 'Event Count', params: null, output: 'Number', description: 'Number of recorded events' },
          { id: 'util_record_duration', name: 'Recording Duration', params: null, output: 'Number', description: 'Total recording time (ms)' },
          { id: 'util_record_start_time', name: 'Recording Start Time', params: null, output: 'Number', description: 'Recording start timestamp' },
          { id: 'util_record_end_time', name: 'Recording End Time', params: null, output: 'Number', description: 'Recording end timestamp' }
        ]
      },
      {
        label: 'Non-blocking Timers',
        blocks: [
          { id: 'util_interval', name: 'Run Every N ms', params: ['INTERVAL'], output: null, description: 'Non-blocking periodic execution' },
          { id: 'util_stopwatch_reset', name: 'Reset Stopwatch', params: ['TIMER'], output: null, description: 'Reset stopwatch timer' },
          { id: 'util_stopwatch_elapsed', name: 'Elapsed Time', params: ['TIMER'], output: 'Number', description: 'Return elapsed time (ms)' },
          { id: 'util_timeout', name: 'Run After N ms', params: ['DELAY'], output: null, description: 'Non-blocking one-shot delayed execution' }
        ]
      }
    ],
    tips: ['util_map is commonly used for converting sensor values to PWM output', 'Block assembly recording is useful for recording and replaying students coding process']
  },

  /* ──────────────────────────────────────────────
     HARDWARE SECTIONS
     ────────────────────────────────────────────── */

  'display-a': {
    title: 'Display A',
    color: '#FAC907',
    description: 'LCD, 7-Segment (TM1637), NeoPixel blocks',
    hardwareImages: [
      { src: 'assets/DIS_001_I2C_1602_LCD.jpg', label: 'I2C 1602 LCD' },
      { src: 'assets/DIS_010_7Segment.jpg', label: '7-Segment (TM1637)' },
      { src: 'assets/DIS_013_Neo_Pixels_Ring.jpg', label: 'NeoPixel Ring' },
      { src: 'assets/DIS_014_Neo_Pixels_Square.jpg', label: 'NeoPixel Square' }
    ],
    subsections: [
      {
        label: 'LCD Display (I2C)',
        blocks: [
          { id: 'lcd_i2c_setup', name: 'LCD Init', params: ['LCD_NUM', 'ADDR', 'COLS', 'ROWS'], output: null, description: 'Initialize I2C LCD module (address, columns, rows)' },
          { id: 'lcd_i2c_print', name: 'LCD Print Text', params: ['LCD_NUM', 'ROW', 'COL', 'TEXT'], output: null, description: 'Print text at specified position' },
          { id: 'lcd_i2c_clear', name: 'LCD Clear', params: ['LCD_NUM'], output: null, description: 'Clear LCD screen' },
          { id: 'lcd_i2c_set_cursor', name: 'LCD Move Cursor', params: ['LCD_NUM', 'ROW', 'COL'], output: null, description: 'Move cursor position' },
          { id: 'lcd_i2c_cursor', name: 'LCD Show Cursor', params: ['LCD_NUM'], output: null, description: 'Show/hide cursor control' },
          { id: 'lcd_i2c_backlight', name: 'LCD Backlight', params: ['LCD_NUM'], output: null, description: 'Backlight ON/OFF' },
          { id: 'lcd_i2c_display', name: 'LCD Display ON/OFF', params: ['LCD_NUM'], output: null, description: 'LCD display on/off' },
          { id: 'lcd_i2c_scroll', name: 'LCD Scroll', params: ['LCD_NUM'], output: null, description: 'LCD screen left/right scroll' }
        ]
      },
      {
        label: '7-Segment (TM1637)',
        blocks: [
          { id: 'tm1637_setup', name: 'TM1637 Init', params: ['CLK_PIN', 'DATA_PIN'], output: null, description: 'Initialize TM1637 4-digit display' },
          { id: 'tm1637_display_number', name: 'Display Number', params: ['NUMBER'], output: null, description: 'Show 4-digit number' },
          { id: 'tm1637_display_time', name: 'Display Time', params: ['HOUR', 'MINUTE'], output: null, description: 'Show HH:MM format' },
          { id: 'tm1637_display_text', name: 'Display Text', params: ['TEXT'], output: null, description: 'Show text' },
          { id: 'tm1637_display_digit', name: 'Display Digit', params: ['POSITION', 'VALUE'], output: null, description: 'Show individual digit at position' },
          { id: 'tm1637_clear', name: 'Clear Display', params: null, output: null, description: 'Clear display' },
          { id: 'tm1637_brightness', name: 'Set Brightness', params: null, output: null, description: 'Adjust brightness (0~7)' },
          { id: 'tm1637_colon', name: 'Show Colon', params: null, output: null, description: 'Center colon (:) ON/OFF' }
        ]
      },
      {
        label: 'NeoPixel LED',
        blocks: [
          { id: 'neopixel_setup', name: 'NeoPixel Init', params: ['PIN', 'LED_COUNT', 'TYPE'], output: null, description: 'Initialize NeoPixel LED strip' },
          { id: 'neopixel_set_rgb', name: 'Set RGB Color', params: ['STRIP_NUM', 'LED_INDEX', 'R', 'G', 'B'], output: null, description: 'Set RGB color of specific LED' },
          { id: 'neopixel_set_rgbw', name: 'Set RGBW Color', params: ['STRIP_NUM', 'LED_INDEX', 'R', 'G', 'B', 'W'], output: null, description: 'Set RGBW color of specific LED (with White)' },
          { id: 'neopixel_show', name: 'NeoPixel Update', params: ['STRIP_NUM'], output: null, description: 'Apply color settings to LEDs' },
          { id: 'neopixel_brightness', name: 'Set Brightness', params: ['STRIP_NUM', 'BRI'], output: null, description: 'Adjust overall brightness' },
          { id: 'neopixel_clear', name: 'NeoPixel Off', params: ['STRIP_NUM'], output: null, description: 'Turn off all LEDs' },
          { id: 'neopixel_fill_rgb_all', name: 'Fill All Color', params: ['STRIP_NUM', 'R', 'G', 'B'], output: null, description: 'Set all LEDs to same color' },
          { id: 'neopixel_anim_rainbow', name: 'Rainbow Animation', params: ['STRIP_NUM', 'WAIT', 'LOOPS'], output: null, description: 'Rainbow color cycle effect' },
          { id: 'neopixel_anim_shift', name: 'Shift Animation', params: ['STRIP_NUM', 'STEPS', 'WAIT'], output: null, description: 'Rotate LED colors left/right' },
          { id: 'neopixel_anim_breathe', name: 'Breathe Animation', params: ['STRIP_NUM', 'R', 'G', 'B'], output: null, description: 'Brightness pulse (breathing) effect' }
        ]
      }
    ],
    tips: ['LCD I2C address is usually 0x27 or 0x3F', 'NeoPixel requires 5V power, 470Ω resistor recommended on data pin']
  },

  'display-b': {
    title: 'Display B',
    color: '#FAC907',
    description: 'OLED (SSD1306, SH110X, SH1106), LED Matrix (HT16K33) blocks',
    hardwareImages: [
      { src: 'assets/DIS_011_OLED_096_SSD1306.jpg', label: 'OLED 0.96" SSD1306' },
      { src: 'assets/DIS_012_OLED_1.3_SH1106.jpg', label: 'OLED 1.3" SH1106' },
      { src: 'assets/DIS_016_Dot_Matrix_8x8_I2C.jpg', label: 'Dot Matrix 8x8 (HT16K33)' },
      { src: 'assets/DIS_018_Dot_Matrix_8x16_I2C.jpg', label: 'Dot Matrix 8x16 (HT16K33)' }
    ],
    subsections: [
      {
        label: 'SSD1306 OLED',
        blocks: [
          { id: 'ssd1306_setup_i2c', name: 'SSD1306 Init', params: ['NUM', 'RST'], output: null, description: 'Initialize SSD1306 OLED via I2C' },
          { id: 'ssd1306_text', name: 'Display Text', params: ['NUM', 'TEXT', 'X', 'Y', 'SIZE'], output: null, description: 'Show text on OLED' },
          { id: 'ssd1306_control', name: 'Display Control', params: ['NUM'], output: null, description: 'display/clear control' },
          { id: 'ssd1306_dim', name: 'Brightness', params: ['NUM'], output: null, description: 'Switch OLED brightness dim/bright' },
          { id: 'ssd1306_pixel', name: 'Draw Pixel', params: ['NUM', 'X', 'Y'], output: null, description: 'Draw single pixel' },
          { id: 'ssd1306_line', name: 'Draw Line', params: ['NUM', 'X1', 'Y1', 'X2', 'Y2'], output: null, description: 'Draw line between two points' },
          { id: 'ssd1306_rect', name: 'Draw Rectangle', params: ['NUM', 'X', 'Y', 'W', 'H'], output: null, description: 'Draw rectangle' },
          { id: 'ssd1306_circle', name: 'Draw Circle', params: ['NUM', 'X', 'Y', 'R'], output: null, description: 'Draw circle' },
          { id: 'ssd1306_scroll', name: 'Scroll Display', params: ['NUM'], output: null, description: 'OLED scroll effect' },
          { id: 'ssd1306_bitmap', name: 'Display Bitmap', params: ['NUM', 'X', 'Y', 'W', 'H'], output: null, description: 'Show bitmap image on OLED' }
        ]
      },
      {
        label: 'Korean OLED (SSD1306)',
        blocks: [
          { id: 'oled_han_setup', name: 'Korean OLED Init', params: null, output: null, description: 'Initialize Korean-capable OLED display' },
          { id: 'oled_han_clear', name: 'Clear Korean OLED', params: null, output: null, description: 'Clear Korean OLED screen' },
          { id: 'oled_han_print_text', name: 'Print Korean Text', params: ['TEXT', 'X', 'Y'], output: null, description: 'Print mixed Korean/English/number text' },
          { id: 'oled_han_big_digit', name: 'Large Digit', params: ['DIGIT', 'X', 'Y'], output: null, description: '7-segment style large number (0~9)' },
          { id: 'oled_han_draw_bar', name: 'Bar Graph', params: ['X', 'Y', 'VALUE'], output: null, description: 'Horizontal bar graph (0~128)' }
        ]
      },
      {
        label: 'HT16K33 LED Matrix',
        blocks: [
          { id: 'ht16k33_setup', name: 'HT16K33 Init', params: ['BRI'], output: null, description: 'Initialize LED matrix' },
          { id: 'ht16k33_scroll_text', name: 'Scroll Text', params: ['NUM', 'TEXT', 'SEC'], output: null, description: 'Scroll text display' },
          { id: 'ht16k33_show', name: 'Update Display', params: ['NUM'], output: null, description: 'Render buffer to matrix' },
          { id: 'ht16k33_clear', name: 'Clear Display', params: ['NUM'], output: null, description: 'Clear matrix' },
          { id: 'ht16k33_set_brightness', name: 'Set Brightness', params: null, output: null, description: 'Adjust matrix brightness' },
          { id: 'ht16k33_set_blink', name: 'Set Blink', params: null, output: null, description: 'Set matrix blink rate' },
          { id: 'ht16k33_pixel', name: 'Pixel (Mono)', params: ['NUM', 'ROW', 'COL'], output: null, description: 'Mono LED matrix pixel ON/OFF' },
          { id: 'ht16k33_bicolor_pixel', name: 'Pixel (Bicolor)', params: ['NUM', 'ROW', 'COL', 'COLOR'], output: null, description: 'Bicolor matrix pixel color' },
          { id: 'ht16k33_pattern_8x8', name: '8x8 Pattern', params: ['NUM'], output: null, description: 'Display 8x8 LED pattern' },
          { id: 'ht16k33_pattern_8x16', name: '8x16 Pattern', params: ['NUM'], output: null, description: 'Display 8x16 LED pattern' },
          { id: 'ht16k33_line', name: 'Draw Line', params: ['R1', 'C1', 'R2', 'C2'], output: null, description: 'Draw line on matrix' },
          { id: 'ht16k33_circle', name: 'Draw Circle', params: ['R', 'C', 'RADIUS'], output: null, description: 'Draw circle on matrix' },
          { id: 'ht16k33_rect', name: 'Draw Rectangle', params: ['R', 'C', 'W', 'H'], output: null, description: 'Draw rectangle on matrix' }
        ]
      },
      {
        label: 'SH110X OLED',
        blocks: [
          { id: 'sh110x_setup_i2c', name: 'SH110X Init', params: ['NUM', 'RST', 'WIDTH', 'HEIGHT'], output: null, description: 'Initialize SH110X OLED' },
          { id: 'sh110x_text', name: 'Display Text', params: ['NUM', 'TXT', 'X', 'Y', 'SIZE'], output: null, description: 'SH110X text display' },
          { id: 'sh110x_display', name: 'Show Display', params: ['NUM'], output: null, description: 'Render buffer to screen' },
          { id: 'sh110x_clear', name: 'Clear Display', params: ['NUM'], output: null, description: 'Clear screen' },
          { id: 'sh110x_control', name: 'Display Control', params: ['NUM'], output: null, description: 'display/clear/invert control' },
          { id: 'sh110x_pixel', name: 'Draw Pixel', params: ['NUM', 'X', 'Y'], output: null, description: 'Draw single pixel' },
          { id: 'sh110x_line', name: 'Draw Line', params: ['NUM', 'X1', 'Y1', 'X2', 'Y2'], output: null, description: 'Draw line between two points' },
          { id: 'sh110x_rect', name: 'Draw Rectangle', params: ['NUM', 'X', 'Y', 'W', 'H'], output: null, description: 'Draw rectangle' },
          { id: 'sh110x_circle', name: 'Draw Circle', params: ['NUM', 'X', 'Y', 'R'], output: null, description: 'Draw circle' },
          { id: 'sh110x_contrast', name: 'Set Contrast', params: ['NUM', 'VALUE'], output: null, description: 'Adjust OLED contrast' },
          { id: 'sh110x_bitmap', name: 'Display Bitmap', params: ['NUM', 'X', 'Y', 'W', 'H'], output: null, description: 'Show SH110X bitmap image' }
        ]
      },
      {
        label: 'Korean SH1106 OLED',
        blocks: [
          { id: 'sh1106_setup', name: 'SH1106 Korean Init', params: null, output: null, description: 'Initialize Korean SH1106 OLED' },
          { id: 'sh1106_clear', name: 'SH1106 Clear', params: null, output: null, description: 'Clear SH1106 screen' },
          { id: 'sh1106_print_text', name: 'SH1106 Korean Text', params: ['TEXT', 'X', 'Y'], output: null, description: 'Print Korean text' },
          { id: 'sh1106_large_number', name: 'SH1106 Large Number', params: ['NUM', 'X', 'Y'], output: null, description: 'Display large number' },
          { id: 'sh1106_draw_bar', name: 'SH1106 Bar Graph', params: ['X', 'Y', 'VALUE'], output: null, description: 'Horizontal bar graph' }
        ]
      }
    ],
    tips: ['SSD1306: 0.96 inch (128x64), SH1106: 1.3 inch', 'Default OLED I2C address: 0x3C', 'HT16K33 supports 8x8 or 8x16 LED matrix']
  },

  'sensors-a': {
    title: 'Sensors A',
    color: '#FF6F00',
    description: 'Ultrasonic, temperature/humidity, load cell, rotary, thermistor, particulate, CO2, TDS, pH, fingerprint, turbidity, UV sensor blocks',
    hardwareImages: [
      { src: 'assets/D_007_Ultrasonic_Sensor.jpg', label: 'Ultrasonic Sensor' },
      { src: 'assets/D_008_Ultrasonic_Sensor_Adapter.jpg', label: 'Ultrasonic Adapter' },
      { src: 'assets/D_009_Ultrasonic_Sensor_V2.jpg', label: 'Ultrasonic Sensor V2' },
      { src: 'assets/D_001_Temp_and_Humi_DHT11.jpg', label: 'DHT11 Temp/Humidity' },
      { src: 'assets/D_002_Temp_and_Humi_DHT22.jpg', label: 'DHT22 Temp/Humidity' },
      { src: 'assets/A_003_Water_Temp.jpg', label: 'Water Temp (DS18B20)' },
      { src: 'assets/A_004_Water_Temp_prob.jpg', label: 'Water Temp Probe' },
      { src: 'assets/I2C_010_Weight_Sensor_I2C_HX711.jpg', label: 'HX711 Load Cell' },
      { src: 'assets/I2C_011_Weight_Sensor_Plate.jpg', label: 'Load Cell Plate' },
      { src: 'assets/D_028_Rotary_Encoder.jpg', label: 'Rotary Encoder' },
      { src: 'assets/A_005_NTC_Temp.jpg', label: 'NTC Thermistor' },
      { src: 'assets/A_001_High_Temperature_Sensor.jpg', label: 'High Temp Sensor' },
      { src: 'assets/A_002_High_Temperature_Sensor_prob.jpg', label: 'High Temp Probe' },
      { src: 'assets/D_004_PMS7003_Sensor.jpg', label: 'PMS7003 Particulate' },
      { src: 'assets/D_005_PMS3003_adapter.jpg', label: 'PMS3003 Adapter' },
      { src: 'assets/D_006_PMS3003_Sensor.png', label: 'PMS3003 Sensor' },
      { src: 'assets/A_016_Fine_Dust.jpg', label: 'Fine Dust Sensor' },
      { src: 'assets/A_017_Fine_Dust_prob.jpg', label: 'Fine Dust Probe' },
      { src: 'assets/A_018_Fine_Dust_Sensor.jpg', label: 'Fine Dust Module' },
      { src: 'assets/D_003_CO2_Sensor_Z219D.jpg', label: 'CO2 Sensor MH-Z19' },
      { src: 'assets/A_011_Electrical_Conduction.jpg', label: 'TDS Sensor' },
      { src: 'assets/A_012_Electrical_Conduction_sensor.jpg', label: 'TDS Probe' },
      { src: 'assets/A_009_PH_Sensor.jpg', label: 'pH Sensor' },
      { src: 'assets/A_010_PH_Sensor_prob.jpg', label: 'pH Probe' },
      { src: 'assets/D_029_Fingerprint_Sensor_AS608.jpg', label: 'Fingerprint AS608' },
      { src: 'assets/D_030_Fingerprint_Sensor_Adapter.png', label: 'Fingerprint Adapter' },
      { src: 'assets/A_013_Turbidity_Sensor.jpg', label: 'Turbidity Sensor' },
      { src: 'assets/A_014_Turbidity_Sensor_prob.png', label: 'Turbidity Probe' },
      { src: 'assets/A_007_UV_Sensor_V2.jpg', label: 'UV Sensor' }
    ],
    subsections: [
      {
        label: 'Ultrasonic Sensor',
        blocks: [
          { id: 'ultrasonic_setup', name: 'Ultrasonic Init', params: ['TRIG', 'ECHO'], output: null, description: 'Set ultrasonic sensor pins (Trig/Echo)' },
          { id: 'ultrasonic_distance', name: 'Measure Distance', params: null, output: 'Number', description: 'Return distance in cm' }
        ]
      },
      {
        label: 'DHT Temp/Humidity',
        blocks: [
          { id: 'dht_setup', name: 'DHT Init', params: ['PIN', 'TYPE'], output: null, description: 'Setup DHT11/DHT22 sensor' },
          { id: 'dht_read_temperature', name: 'Read Temperature', params: ['PIN'], output: 'Number', description: 'Return temperature in Celsius' },
          { id: 'dht_read_humidity', name: 'Read Humidity', params: ['PIN'], output: 'Number', description: 'Return relative humidity (%)' },
          { id: 'dht_convert_temperature', name: 'Convert Temperature', params: ['TEMP', 'FROM', 'TO'], output: 'Number', description: 'Convert Celsius↔Fahrenheit' },
          { id: 'dht_heat_index', name: 'Heat Index', params: ['TEMPERATURE', 'HUMIDITY'], output: 'Number', description: 'Calculate heat index' }
        ]
      },
      {
        label: 'Dallas Temperature (DS18B20)',
        blocks: [
          { id: 'dallas_temp_setup', name: 'Dallas Init', params: ['PIN'], output: null, description: 'Setup DS18B20 temperature sensor' },
          { id: 'dallas_temp_request', name: 'Request Temperature', params: null, output: null, description: 'Request temperature measurement from all sensors' },
          { id: 'dallas_temp_read', name: 'Read Temperature', params: ['INDEX', 'UNIT'], output: 'Number', description: 'Return measured temperature (C/F)' },
          { id: 'dallas_temp_count', name: 'Sensor Count', params: null, output: 'Number', description: 'Number of connected Dallas sensors' }
        ]
      },
      {
        label: 'Load Cell (HX711)',
        blocks: [
          { id: 'hx711_setup', name: 'HX711 Init', params: ['DOUT_PIN', 'CLK_PIN', 'GAIN'], output: null, description: 'Initialize load cell amplifier' },
          { id: 'hx711_get_weight', name: 'Read Weight', params: null, output: 'Number', description: 'Return calibrated weight (g)' },
          { id: 'hx711_tare', name: 'Tare', params: ['TIMES'], output: null, description: 'Set zero point (average count)' },
          { id: 'hx711_set_scale', name: 'Set Scale', params: ['SCALE'], output: null, description: 'Set calibration factor' },
          { id: 'hx711_is_ready', name: 'Is Ready', params: null, output: 'Boolean', description: 'Check HX711 data ready' },
          { id: 'hx711_power_control', name: 'Power Control', params: null, output: null, description: 'HX711 power ON/OFF' },
          { id: 'hx711_read_data', name: 'Read Data', params: null, output: 'Number', description: 'Read HX711 raw/average/unit data' }
        ]
      },
      {
        label: 'I2C Weight Sensor',
        blocks: [
          { id: 'i2c_weight_setup', name: 'I2C Weight Init', params: ['ADDR'], output: null, description: 'Set I2C weight sensor slave address' },
          { id: 'i2c_weight_read', name: 'Read Weight', params: null, output: 'Number', description: 'Read I2C weight value' },
          { id: 'i2c_weight_available', name: 'Sensor Available', params: null, output: 'Boolean', description: 'Check I2C weight sensor response' },
          { id: 'i2c_weight_raw_data', name: 'Raw Data', params: null, output: 'Number', description: 'Read I2C weight sensor raw bytes' }
        ]
      },
      {
        label: 'Rotary Encoder',
        blocks: [
          { id: 'rotary_setup', name: 'Rotary Init', params: ['DT_PIN', 'CLK_PIN'], output: null, description: 'Setup rotary encoder pins' },
          { id: 'rotary_get_value', name: 'Read Value', params: null, output: 'Number', description: 'Current rotation value' },
          { id: 'rotary_direction', name: 'Direction', params: null, output: 'Number', description: 'Rotation direction (CW/CCW)' },
          { id: 'rotary_counter', name: 'Counter', params: null, output: 'Number', description: 'Cumulative rotation count' },
          { id: 'rotary_reset_counter', name: 'Reset Counter', params: null, output: null, description: 'Reset rotation count' }
        ]
      },
      {
        label: 'Thermistor (NTC)',
        blocks: [
          { id: 'thermistor_setup', name: 'Thermistor Init', params: ['PIN'], output: null, description: 'Setup NTC thermistor pin' },
          { id: 'thermistor_read_temperature', name: 'Read Temperature', params: null, output: 'Number', description: 'Return thermistor temperature' },
          { id: 'thermistor_read_raw', name: 'Read Raw', params: null, output: 'Number', description: 'Return analog raw value' },
          { id: 'thermistor_get_resistance', name: 'Read Resistance', params: null, output: 'Number', description: 'Return thermistor resistance (Ω)' }
        ]
      },
      {
        label: 'Particulate Sensor (PMS)',
        blocks: [
          { id: 'pms_setup', name: 'PMS Init', params: ['RX_PIN', 'TX_PIN', 'BAUD'], output: null, description: 'Setup PMS particulate sensor' },
          { id: 'pms_power_control', name: 'PMS Power', params: null, output: null, description: 'PMS sensor power ON/OFF' },
          { id: 'pms_set_mode', name: 'PMS Mode', params: null, output: null, description: 'Set PMS operating mode (active/passive)' },
          { id: 'pms_read_data', name: 'Read Particulate', params: null, output: 'Number', description: 'PM1.0/PM2.5/PM10 concentration (μg/m³)' },
          { id: 'pms_request_read', name: 'Request Data', params: null, output: null, description: 'Request data in passive mode' },
          { id: 'pms_data_available', name: 'Data Available', params: null, output: 'Boolean', description: 'Check PMS data reception complete' }
        ]
      },
      {
        label: 'CO2 Sensor (MH-Z19)',
        blocks: [
          { id: 'mhz19_setup', name: 'MH-Z19 Init', params: ['RX_PIN', 'TX_PIN', 'BAUD'], output: null, description: 'Setup MH-Z19 CO2 sensor' },
          { id: 'mhz19_set_range', name: 'Set Range', params: ['RANGE'], output: null, description: 'Set CO2 measurement range (ppm)' },
          { id: 'mhz19_filter_mode', name: 'Filter Mode', params: null, output: null, description: 'Set MH-Z19 filter type' },
          { id: 'mhz19_read_value', name: 'Read CO2', params: null, output: 'Number', description: 'Return CO2 concentration/temperature' },
          { id: 'mhz19_calibration', name: 'Calibrate', params: null, output: null, description: 'MH-Z19 sensor calibration' },
          { id: 'mhz19_get_status', name: 'Status Info', params: null, output: 'Number', description: 'Return MH-Z19 status info' }
        ]
      },
      {
        label: 'TDS Water Quality',
        blocks: [
          { id: 'gravity_tds_setup', name: 'TDS Init', params: ['PIN'], output: null, description: 'Setup TDS water quality sensor pin' },
          { id: 'gravity_tds_set_temp', name: 'Temperature Compensation', params: ['TEMP'], output: null, description: 'Set TDS temperature compensation (°C)' },
          { id: 'gravity_tds_update', name: 'TDS Update', params: null, output: null, description: 'Update TDS sensor value' },
          { id: 'gravity_tds_read_value', name: 'Read TDS', params: null, output: 'Number', description: 'Return TDS/voltage/temperature' },
          { id: 'gravity_tds_advanced_config', name: 'TDS Advanced Config', params: null, output: null, description: 'Set TDS advanced parameters' }
        ]
      },
      {
        label: 'pH Sensor',
        blocks: [
          { id: 'dfrobot_ph_setup', name: 'pH Init', params: ['PIN'], output: null, description: 'Setup pH sensor analog pin' },
          { id: 'dfrobot_ph_read', name: 'Read pH', params: ['TEMPERATURE'], output: 'Number', description: 'Return temperature-compensated pH' },
          { id: 'dfrobot_ph_voltage', name: 'Read pH Voltage', params: null, output: 'Number', description: 'Return pH sensor raw voltage' },
          { id: 'dfrobot_ph_calibration', name: 'pH Calibrate', params: null, output: null, description: 'Send pH sensor calibration command' }
        ]
      },
      {
        label: 'Fingerprint Sensor (AS608)',
        blocks: [
          { id: 'fingerprint_setup', name: 'Fingerprint Init', params: ['RX', 'TX', 'BAUD'], output: null, description: 'Setup fingerprint sensor serial' },
          { id: 'fingerprint_enroll_process', name: 'Enroll Fingerprint', params: ['ID'], output: null, description: 'Run fingerprint enrollment process' },
          { id: 'fingerprint_search', name: 'Search Fingerprint', params: null, output: 'Boolean', description: 'Search for matching fingerprint' },
          { id: 'fingerprint_get_result', name: 'Search Result', params: null, output: 'Number', description: 'Return match ID/confidence' },
          { id: 'fingerprint_database', name: 'Database Manage', params: ['ID'], output: null, description: 'Delete/reset fingerprint database' },
          { id: 'fingerprint_led_control', name: 'LED Control', params: null, output: null, description: 'Fingerprint sensor LED ON/OFF' }
        ]
      },
      {
        label: 'Turbidity Sensor',
        blocks: [
          { id: 'turbidity_setup', name: 'Turbidity Init', params: ['PIN'], output: null, description: 'Setup turbidity sensor analog pin' },
          { id: 'turbidity_calibrate', name: 'Turbidity Calibrate', params: null, output: null, description: 'Calibrate turbidity sensor' },
          { id: 'turbidity_update', name: 'Turbidity Update', params: null, output: null, description: 'Update turbidity sensor value' },
          { id: 'turbidity_read_value', name: 'Read Turbidity', params: null, output: 'Number', description: 'Return turbidity (NTU)/voltage' }
        ]
      },
      {
        label: 'UV Sensor',
        blocks: [
          { id: 'uv_sensor_setup', name: 'UV Init', params: ['PIN'], output: null, description: 'Setup UV sensor analog pin' },
          { id: 'uv_sensor_calibrate', name: 'UV Calibrate', params: null, output: null, description: 'Calibrate UV sensor' },
          { id: 'uv_sensor_read_value', name: 'Read UV', params: null, output: 'Number', description: 'Return UV index/voltage' }
        ]
      },
      {
        label: 'Filter / Calibration Tools',
        blocks: [
          { id: 'util_filter_moving_avg', name: 'Moving Average Filter', params: ['VALUE', 'SAMPLES'], output: 'Number', description: 'Noise reduction moving average filter' },
          { id: 'util_filter_ema', name: 'EMA Filter', params: ['VALUE', 'ALPHA'], output: 'Number', description: 'Exponential moving average noise filter' },
          { id: 'util_filter_median', name: 'Median Filter', params: ['VALUE', 'WINDOW'], output: 'Number', description: 'Outlier removal median filter' },
          { id: 'util_filter_range', name: 'Range Filter', params: ['VALUE', 'MIN', 'MAX'], output: 'Number', description: 'Out-of-range value removal filter' },
          { id: 'util_cal_setup', name: '2-Point Calibration Setup', params: ['NAME', 'RAW1', 'REF1', 'RAW2', 'REF2'], output: null, description: 'Set sensor 2-point calibration data' },
          { id: 'util_cal_apply', name: 'Apply Calibration', params: ['NAME', 'VALUE'], output: 'Number', description: 'Correct value using calibration data' },
          { id: 'util_cal_offset', name: 'Offset Correction', params: ['VALUE', 'OFFSET'], output: 'Number', description: 'Apply offset to value' },
          { id: 'util_adc_stable', name: 'Stable Analog Read', params: ['PIN'], output: 'Number', description: 'Noise-reduced stable analog reading' },
          { id: 'util_adc_oversample', name: 'Oversampled Read', params: ['PIN', 'SAMPLES'], output: 'Number', description: 'Oversampling analog reading' }
        ]
      }
    ],
    tips: ['Connect ultrasonic Trig/Echo pins correctly', 'DHT11 measures integer, DHT22 measures decimal temperature/humidity', 'Filter blocks are effective for reducing sensor noise']
  },

  'sensors-b': {
    title: 'Sensors B',
    color: '#4D68EC',
    description: 'RTC, barometric, gyro, gas, distance, temp/humidity, color, IR temperature, gesture, heart rate, SI7021 I2C sensor blocks',
    hardwareImages: [
      { src: 'assets/I2C_006_Barometric_Altitude_BMP280.jpg', label: 'Barometric BMP280' },
      { src: 'assets/I2C_007_6Axis_Gyro_MPU6050.jpg', label: '6-Axis Gyro MPU6050' },
      { src: 'assets/I2C_004_CO2_SGP30_Sensor.jpg', label: 'CO2 SGP30' },
      { src: 'assets/I2C_009_Distance_Sensor_VL053L0x.jpg', label: 'VL53L0X Sensor' },
      { src: 'assets/I2C_002_Temp_and_Humi_SHT31.jpg', label: 'Temp/Humidity SHT31' },
      { src: 'assets/I2C_012_Color_Sensor_TCS34725.jpg', label: 'Color Sensor TCS34725' },
      { src: 'assets/I2C_003_Non_Contact_Temp_Sensor_MAX90614.jpg', label: 'MLX90614 Sensor' },
      { src: 'assets/I2C_008_Gesture_Sensor_APDS9960.jpg', label: 'Gesture APDS9960' },
      { src: 'assets/I2C_013_Heartbit_MAX30102.jpg', label: 'Heart Rate MAX30102' }
    ],
    subsections: [
      {
        label: 'RTC (DS1307)',
        blocks: [
          { id: 'ds1307_setup', name: 'RTC Init', params: ['NUM'], output: null, description: 'Initialize DS1307 real-time clock' },
          { id: 'ds1307_set_time', name: 'Set Time', params: ['NUM', 'YEAR', 'MONTH', 'DATE', 'HOUR', 'MINUTE', 'SECOND'], output: null, description: 'Set current date/time on RTC' },
          { id: 'ds1307_get_time', name: 'Read Time', params: ['NUM'], output: 'Number', description: 'Read individual year/month/day/hour/minute/second' },
          { id: 'ds1307_clock_control', name: 'Clock Control', params: null, output: null, description: 'RTC clock start/stop' },
          { id: 'ds1307_sqw_output', name: 'SQW Output', params: null, output: null, description: 'Set SQW pin output type' },
          { id: 'ds1307_get_time_string', name: 'Time String', params: ['FORMAT'], output: 'String', description: 'Return formatted time string' }
        ]
      },
      {
        label: 'Barometric/Altitude (BMP280)',
        blocks: [
          { id: 'bmp280_setup', name: 'BMP280 Init', params: null, output: null, description: 'Initialize barometric/altitude sensor' },
          { id: 'bmp280_set_sea_pressure', name: 'Set Sea Level Pressure', params: ['PRESSURE'], output: null, description: 'Set sea level pressure (Pa) for altitude calculation' },
          { id: 'bmp280_set_reference', name: 'Set Reference Altitude', params: ['ALTITUDE'], output: null, description: 'Set reference altitude (m)' },
          { id: 'bmp280_read_value', name: 'Read Value', params: null, output: 'Number', description: 'Return temperature/pressure/altitude' }
        ]
      },
      {
        label: 'Gyro/Accel (MPU6050)',
        blocks: [
          { id: 'bx_mpu_setup', name: 'MPU6050 Init', params: null, output: null, description: 'Initialize 6-axis gyro/accelerometer sensor' },
          { id: 'bx_mpu_update', name: 'Update Data', params: null, output: null, description: 'Update sensor values' },
          { id: 'bx_mpu_read_value', name: 'Read Value', params: null, output: 'Number', description: 'Return angle/acceleration/gyro/temperature' },
          { id: 'bx_mpu_set_offsets', name: 'Set Offsets', params: ['X', 'Y', 'Z'], output: null, description: 'Manually set gyro/acceleration offsets' },
          { id: 'bx_mpu_calc_offsets', name: 'Auto Calculate Offsets', params: null, output: null, description: 'Auto-calibrate offset calculation' }
        ]
      },
      {
        label: 'Air Quality (SGP30)',
        blocks: [
          { id: 'sgp30_setup', name: 'SGP30 Init', params: ['EBASE', 'TBASE'], output: null, description: 'Initialize gas sensor (baseline setup)' },
          { id: 'sgp30_measure', name: 'Measure', params: null, output: null, description: 'Execute gas concentration measurement' },
          { id: 'sgp30_get_eco2', name: 'eCO2 Value', params: null, output: 'Number', description: 'Return CO2 concentration (ppm)' },
          { id: 'sgp30_get_tvoc', name: 'TVOC Value', params: null, output: 'Number', description: 'Return total volatile organic compounds (ppb)' },
          { id: 'sgp30_set_humidity', name: 'Set Humidity', params: null, output: null, description: 'Set humidity compensation value' },
          { id: 'sgp30_set_baseline', name: 'Set Baseline', params: null, output: null, description: 'Manually set SGP30 baseline' },
          { id: 'sgp30_eeprom_save_baseline_fixed', name: 'EEPROM Save Baseline (Fixed)', params: null, output: null, description: 'Save baseline to EEPROM at fixed address' },
          { id: 'sgp30_eeprom_load_baseline_fixed', name: 'EEPROM Load Baseline (Fixed)', params: null, output: null, description: 'Load baseline from EEPROM at fixed address' },
          { id: 'sgp30_eeprom_save_baseline', name: 'EEPROM Save Baseline', params: ['ADDR'], output: null, description: 'Save baseline to EEPROM at specified address' },
          { id: 'sgp30_eeprom_load_baseline', name: 'EEPROM Load Baseline', params: ['ADDR'], output: null, description: 'Load baseline from EEPROM at specified address' }
        ]
      },
      {
        label: 'Laser Distance (VL53L0X)',
        blocks: [
          { id: 'vl53l0x_setup', name: 'VL53L0X Init', params: ['ADDR'], output: null, description: 'Initialize laser distance sensor (I2C)' },
          { id: 'vl53l0x_set_mode', name: 'Measurement Mode', params: null, output: null, description: 'Set precision/high-speed/long-range mode' },
          { id: 'vl53l0x_control', name: 'Sensor Control', params: null, output: null, description: 'VL53L0X measurement start/stop' },
          { id: 'vl53l0x_read_value', name: 'Read Distance', params: null, output: 'Number', description: 'Return distance in mm' }
        ]
      },
      {
        label: 'Temp/Humidity (SHT31)',
        blocks: [
          { id: 'sht31_setup', name: 'SHT31 Init', params: ['ADDRESS'], output: null, description: 'Initialize high-precision temp/humidity sensor' },
          { id: 'sht31_read', name: 'Trigger Measurement', params: null, output: null, description: 'Trigger temperature/humidity measurement' },
          { id: 'sht31_is_connected', name: 'Connection Check', params: null, output: 'Boolean', description: 'Check sensor connection status' },
          { id: 'sht31_get_data', name: 'Read Value', params: null, output: 'Number', description: 'Return temperature/humidity' },
          { id: 'sht31_heater_control', name: 'Heater Control', params: null, output: null, description: 'Built-in heater ON/OFF' },
          { id: 'sht31_is_heater_on', name: 'Heater Status', params: null, output: 'Boolean', description: 'Check heater operating status' },
          { id: 'sht31_reset', name: 'Sensor Reset', params: null, output: null, description: 'SHT31 soft reset' },
          { id: 'sht31_get_error', name: 'Error Status', params: null, output: 'Number', description: 'Return sensor error code' }
        ]
      },
      {
        label: 'Color Sensor (TCS34725)',
        blocks: [
          { id: 'color_sensor_setup', name: 'Color Sensor Init', params: null, output: null, description: 'Setup TCS34725 color sensor' },
          { id: 'color_sensor_init', name: 'Activate Sensor', params: null, output: null, description: 'Execute color sensor initialization' },
          { id: 'color_sensor_trigger', name: 'Measure Color', params: null, output: null, description: 'Trigger color detection' },
          { id: 'color_sensor_get_data', name: 'Color Data', params: null, output: 'Number', description: 'Return R/G/B/Clear/color temperature/Lux' },
          { id: 'color_sensor_is_color', name: 'Identify Color', params: null, output: 'Boolean', description: 'Check if specific color is detected' }
        ]
      },
      {
        label: 'IR Temperature (MLX90614)',
        blocks: [
          { id: 'mlx90614_setup', name: 'MLX90614 Init', params: ['ADDRESS'], output: null, description: 'Initialize non-contact IR temperature sensor' },
          { id: 'mlx90614_read_temp', name: 'Read Temperature', params: null, output: 'Number', description: 'Return object/ambient temperature (C/F)' }
        ]
      },
      {
        label: 'Gesture/Light/Proximity (APDS9960)',
        blocks: [
          { id: 'apds9960_setup', name: 'APDS9960 Init', params: null, output: null, description: 'Initialize gesture/light/proximity sensor' },
          { id: 'apds9960_sensor_control', name: 'Sensor Control', params: null, output: null, description: 'Enable/disable sensor functions' },
          { id: 'apds9960_read_light', name: 'Read Light', params: null, output: 'Number', description: 'Return ambient/R/G/B light values' },
          { id: 'apds9960_read_proximity', name: 'Proximity Value', params: null, output: 'Number', description: 'Return proximity sensor value' },
          { id: 'apds9960_gesture_available', name: 'Gesture Detected', params: null, output: 'Boolean', description: 'Check gesture data available' },
          { id: 'apds9960_gesture_control', name: 'Read/Check Gesture', params: null, output: 'Number', description: 'Read gesture or check specific gesture' }
        ]
      },
      {
        label: 'Heart Rate/SpO2 (MAX30105)',
        blocks: [
          { id: 'max30105_setup_basic', name: 'Heart Rate Sensor Init', params: null, output: null, description: 'MAX30105 heart rate/oxygen sensor basic setup' },
          { id: 'max30105_finger_detected', name: 'Finger Detected', params: null, output: 'Boolean', description: 'Detect finger presence on sensor' },
          { id: 'max30105_get_heartrate', name: 'Heart Rate', params: null, output: 'Number', description: 'Return heart rate (BPM)' },
          { id: 'max30105_get_spo2', name: 'SpO2', params: null, output: 'Number', description: 'Return blood oxygen saturation (%)' },
          { id: 'max30105_beat_detected', name: 'Beat Detected', params: null, output: 'Boolean', description: 'Detect new heartbeat' },
          { id: 'max30105_sensor_ready', name: 'Sensor Ready', params: null, output: 'Boolean', description: 'Check if measurement data is sufficient' },
          { id: 'max30105_get_temperature', name: 'Sensor Temperature', params: null, output: 'Number', description: 'Return sensor internal temperature (°C)' },
          { id: 'max30105_setup_advanced', name: 'Advanced Setup', params: null, output: null, description: 'Configure sensor advanced parameters' },
          { id: 'max30105_get_red_raw', name: 'Red LED Raw', params: null, output: 'Number', description: 'Red LED raw sensor value (advanced)' },
          { id: 'max30105_get_ir_raw', name: 'IR LED Raw', params: null, output: 'Number', description: 'Infrared LED raw sensor value (advanced)' }
        ]
      },
      {
        label: 'Temp/Humidity (SI7021)',
        blocks: [
          { id: 'si7021_setup', name: 'SI7021 Init', params: null, output: null, description: 'Initialize SI7021 temp/humidity sensor' },
          { id: 'si7021_read_value', name: 'Read Value', params: null, output: 'Number', description: 'Return temperature/humidity' },
          { id: 'si7021_reset', name: 'Sensor Reset', params: null, output: null, description: 'SI7021 soft reset' },
          { id: 'si7021_get_serial', name: 'Serial Number', params: null, output: 'String', description: 'Return sensor unique serial number' }
        ]
      },
      {
        label: 'Filter / Calibration Tools',
        blocks: [
          { id: 'util_filter_moving_avg', name: 'Moving Average Filter', params: ['VALUE', 'SAMPLES'], output: 'Number', description: 'Noise reduction moving average filter' },
          { id: 'util_filter_ema', name: 'EMA Filter', params: ['VALUE', 'ALPHA'], output: 'Number', description: 'Exponential moving average noise filter' },
          { id: 'util_filter_median', name: 'Median Filter', params: ['VALUE', 'WINDOW'], output: 'Number', description: 'Outlier removal median filter' },
          { id: 'util_filter_range', name: 'Range Filter', params: ['VALUE', 'MIN', 'MAX'], output: 'Number', description: 'Out-of-range value removal filter' },
          { id: 'util_cal_setup', name: '2-Point Calibration Setup', params: ['NAME', 'RAW1', 'REF1', 'RAW2', 'REF2'], output: null, description: 'Set sensor 2-point calibration data' },
          { id: 'util_cal_apply', name: 'Apply Calibration', params: ['NAME', 'VALUE'], output: 'Number', description: 'Correct value using calibration data' },
          { id: 'util_cal_offset', name: 'Offset Correction', params: ['VALUE', 'OFFSET'], output: 'Number', description: 'Apply offset to value' },
          { id: 'util_adc_stable', name: 'Stable Analog Read', params: ['PIN'], output: 'Number', description: 'Noise-reduced stable analog reading' },
          { id: 'util_adc_oversample', name: 'Oversampled Read', params: ['PIN', 'SAMPLES'], output: 'Number', description: 'Oversampling analog reading' }
        ]
      }
    ],
    tips: ['I2C sensors use SDA(A4), SCL(A5) pins', 'Watch for address conflicts when connecting multiple I2C sensors']
  },

  'motor': {
    title: 'Motor',
    color: '#50B91A',
    description: 'Servo, 5Kg GeekServo, Green GeekServo, Geek DC Motor, DC, Stepper, PCA9685 motor driver blocks',
    hardwareImages: [
      { src: 'assets/M_006_MG90S_Servo.png', label: 'MG90S Servo' },
      { src: 'assets/M_008_Geek_Servo_360_5Kg.png', label: 'GeekServo 5Kg' },
      { src: 'assets/M_024_Grey_Geek_Servo_360.webp', label: 'Grey GeekServo 2KG' },
      { src: 'assets/M_023_Orange_Geek__Servo_Motor.webp', label: 'Orange GeekServo 0.7KG' },
      { src: 'assets/M_022_Green_Geek_Servo_Motor.webp', label: 'Green GeekServo' },
      { src: 'assets/M_025_Red_Square_Geek_DC_Motor.webp', label: 'Red Geek DC 2KG' },
      { src: 'assets/M_026_Blue_Geek__DC_Motor.webp', label: 'Blue Geek DC 0.7KG' },
      { src: 'assets/M_012_Blue_Lego_DC_Motor.png', label: 'DC Motor' },
      { src: 'assets/M_013_Step_Motor_Driver_A4988.jpg', label: 'A4988 Driver' },
      { src: 'assets/M_014_Step_Motor.png', label: 'Stepper Motor' },
      { src: 'assets/M_020_16Ch_Servo_Motor_Driver_I2C_PCA9685.jpg', label: 'PCA9685 16-Ch Servo' }
    ],
    subsections: [
      {
        label: 'Servo Motor',
        blocks: [
          { id: 'attach_servo', name: 'Attach Servo', params: ['PIN'], output: null, description: 'Assign servo motor pin' },
          { id: 'attach_servo_minmax', name: 'Attach Servo (Range)', params: ['PIN', 'MIN', 'MAX'], output: null, description: 'Attach servo with min/max pulse width' },
          { id: 'detach_servo', name: 'Detach Servo', params: ['PIN'], output: null, description: 'Release servo pin' },
          { id: 'set_servo_angle', name: 'Servo Angle', params: ['PIN', 'ANGLE'], output: null, description: 'Set angle 0~180 degrees' },
          { id: 'set_servo_microseconds', name: 'Servo Microseconds', params: ['PIN', 'US'], output: null, description: 'Precise position control via pulse width (μs)' },
          { id: 'read_servo_angle', name: 'Read Servo Angle', params: ['PIN'], output: 'Number', description: 'Return current angle' },
          { id: 'read_servo_microseconds', name: 'Read Servo Microseconds', params: ['PIN'], output: 'Number', description: 'Return current pulse width (μs)' },
          { id: 'is_servo_attached', name: 'Is Servo Attached', params: ['PIN'], output: 'Boolean', description: 'Check if servo is attached to pin' }
        ]
      },
      {
        label: '5Kg Big GeekServo',
        blocks: [
          { id: 'geekservo_setup', name: '5Kg GeekServo Init', params: ['PIN'], output: null, description: 'Setup 5Kg GeekServo pin (angle: 500-2500μs, wheel: 3000-5000μs)' },
          { id: 'geekservo_angle_360', name: '5Kg GeekServo Angle', params: ['PIN', 'ANGLE'], output: null, description: '360-degree position control (0~360)' },
          { id: 'geekservo_wheel', name: '5Kg GeekServo Wheel', params: ['PIN', 'SPEED', 'DIR'], output: null, description: 'Continuous rotation speed/direction (3000-5000μs)' },
          { id: 'geekservo_wheel_timed', name: '5Kg GeekServo Wheel (Timed)', params: ['PIN', 'SPEED', 'DIR', 'DURATION'], output: null, description: 'Rotate wheel for specified duration (ms) then auto-stop' },
          { id: 'geekservo_stop', name: '5Kg GeekServo Stop', params: ['PIN'], output: null, description: 'Stop 5Kg GeekServo motor' }
        ]
      },
      {
        label: 'Green GeekServo (Continuous)',
        blocks: [
          { id: 'green_geekservo_setup', name: 'Green GeekServo Init', params: ['PIN'], output: null, description: 'Setup Green GeekServo pin (500-2500μs continuous rotation)' },
          { id: 'green_geekservo_wheel', name: 'Green GeekServo Wheel', params: ['PIN', 'SPEED', 'DIR'], output: null, description: 'Continuous rotation speed/direction (500-2500μs)' },
          { id: 'green_geekservo_wheel_timed', name: 'Green GeekServo Wheel (Timed)', params: ['PIN', 'SPEED', 'DIR', 'DURATION'], output: null, description: 'Rotate wheel for specified duration (ms) then auto-stop' },
          { id: 'green_geekservo_stop', name: 'Green GeekServo Stop', params: ['PIN'], output: null, description: 'Stop Green GeekServo motor' }
        ]
      },
      {
        label: 'DC Motor',
        blocks: [
          { id: 'dcmotor_setup', name: 'DC Motor Init', params: ['PIN_A', 'PIN_B'], output: null, description: 'Setup L9110 DC motor driver' },
          { id: 'dcmotor_run', name: 'DC Motor Run', params: ['SPEED', 'DIR'], output: null, description: 'Set direction and speed' },
          { id: 'dcmotor_stop', name: 'DC Motor Stop', params: null, output: null, description: 'Stop motor' }
        ]
      },
      {
        label: 'PCA9685 DC Motor Driver',
        blocks: [
          { id: 'pca9685_dcmotor_setup', name: 'PCA9685 DC Motor Setup', params: ['NUM', 'ADDRESS'], output: null, description: 'PCA9685 DC motor driver I2C setup' },
          { id: 'pca9685_dcmotor_wheel_a', name: 'Wheel A Control', params: ['NUM', 'DIRECTION', 'SPEED'], output: null, description: 'Channel A motor direction/speed (0~100%)' },
          { id: 'pca9685_dcmotor_wheel_b', name: 'Wheel B Control', params: ['NUM', 'DIRECTION', 'SPEED'], output: null, description: 'Channel B motor direction/speed (0~100%)' },
          { id: 'pca9685_dcmotor_stop', name: 'Motor Stop', params: ['NUM'], output: null, description: 'Stop all PCA9685 motors' }
        ]
      },
      {
        label: 'AccelStepper',
        blocks: [
          { id: 'accelstepper_setup', name: 'AccelStepper Init', params: ['MOTOR_NUM', 'INTERFACE', 'PIN1', 'PIN2'], output: null, description: 'Setup stepper motor driver' },
          { id: 'accelstepper_settings', name: 'Speed/Accel Settings', params: ['MOTOR_NUM', 'MAX_SPEED', 'ACCEL', 'SPEED', 'STEPS'], output: null, description: 'Stepper motor operation parameters' },
          { id: 'accelstepper_move', name: 'Move', params: ['MOTOR_NUM', 'POSITION'], output: null, description: 'Move to target position' },
          { id: 'accelstepper_control', name: 'Run Control', params: ['MOTOR_NUM'], output: null, description: 'run/stop/runToPosition control' },
          { id: 'accelstepper_status', name: 'Status Check', params: ['MOTOR_NUM'], output: 'Number', description: 'Return current position/speed/remaining distance' }
        ]
      },
      {
        label: 'StepperMulti',
        blocks: [
          { id: 'steppermulti_setup', name: 'StepperMulti Init', params: ['MOTOR_NUM', 'PIN1', 'PIN2', 'PIN3', 'PIN4'], output: null, description: 'Setup multi stepper motor (4-pin)' },
          { id: 'steppermulti_speed', name: 'Set Speed', params: ['MOTOR_NUM', 'SPEED'], output: null, description: 'Set stepper motor RPM' },
          { id: 'steppermulti_move', name: 'Move', params: ['MOTOR_NUM', 'STEPS'], output: null, description: 'Move by step count' },
          { id: 'steppermulti_run', name: 'Run', params: null, output: null, description: 'Run all stepper motors simultaneously' }
        ]
      },
      {
        label: 'PCA9685 PWM Servo Driver',
        blocks: [
          { id: 'pwmservo_setup', name: 'PCA9685 Servo Init', params: ['NUM', 'ADDR', 'FREQ'], output: null, description: '16-channel I2C PWM servo driver setup' },
          { id: 'pwmservo_servo_angle', name: 'Servo Angle', params: ['NUM', 'CHANNEL', 'ANGLE'], output: null, description: 'Per-channel servo angle (0~180 degrees)' },
          { id: 'pwmservo_servo_microseconds', name: 'Servo Microseconds', params: ['NUM', 'CHANNEL', 'US'], output: null, description: 'Per-channel servo pulse width (500~2500μs)' },
          { id: 'pwmservo_pwm_output', name: 'PWM Output', params: ['NUM', 'CHANNEL', 'VALUE'], output: null, description: 'PWM value output (0~4095)' },
          { id: 'pwmservo_pwm_advanced', name: 'PWM Advanced Control', params: ['NUM', 'CHANNEL', 'ON', 'OFF'], output: null, description: 'Advanced PWM On/Off timing (0~4095)' },
          { id: 'pwmservo_power', name: 'Power Management', params: null, output: null, description: 'Servo driver power management' },
          { id: 'pwmservo_multi_servo', name: 'Multi Servo', params: ['NUM'], output: null, description: 'Control multiple servos simultaneously (up to 4 channels)' },
          { id: 'pwmservo_led_brightness', name: 'LED Brightness', params: ['NUM', 'CHANNEL', 'BRIGHTNESS'], output: null, description: 'Control LED brightness via PWM (0~100%)' }
        ]
      }
    ],
    tips: ['External 5V power recommended for servos', 'PCA9685 supports up to 16-channel servo/motor control', 'AccelStepper supports acceleration/deceleration control']
  },

  'output': {
    title: 'Output',
    color: '#70D650',
    description: 'Buzzer, MP3, SD card output device blocks',
    hardwareImages: [
      { src: 'assets/O_001_Buzzer.jpg', label: 'Buzzer' },
      { src: 'assets/O_002_MP3_Player_KT403A.jpg', label: 'MP3 KT403A' },
      { src: 'assets/O_003_MP3_Player_Speaker.png', label: 'MP3 Speaker' },
      { src: 'assets/O_008_TF_Card_Adapter_V2.jpg', label: 'SD Card Adapter' }
    ],
    subsections: [
      {
        label: 'Buzzer',
        blocks: [
          { id: 'buzzer_tone_setup', name: 'Buzzer Init', params: null, output: null, description: 'Setup buzzer tone library' },
          { id: 'buzzer_set_tempo', name: 'Set Tempo', params: ['BPM'], output: null, description: 'Set BPM (beats per minute)' },
          { id: 'buzzer_play_note', name: 'Play Note', params: ['PIN', 'NOTE', 'BEAT'], output: null, description: 'Play tone by note/beat' },
          { id: 'buzzer_stop', name: 'Stop Buzzer', params: ['PIN'], output: null, description: 'Stop tone output' }
        ]
      },
      {
        label: 'MP3 Player (KT403A)',
        blocks: [
          { id: 'mp3_setup_kt403a', name: 'MP3 Init', params: ['RX', 'TX', 'VOL'], output: null, description: 'Setup KT403A MP3 module' },
          { id: 'mp3_play_index', name: 'Play by Index', params: ['INDEX'], output: null, description: 'Play by file number' },
          { id: 'mp3_play_folder', name: 'Play Folder/File', params: ['FOLDER', 'FILE'], output: null, description: 'Play file in folder' },
          { id: 'mp3_set_volume', name: 'Set Volume', params: ['VOL'], output: null, description: 'Adjust volume (0~30)' },
          { id: 'mp3_control', name: 'Playback Control', params: null, output: null, description: 'Play/stop/next/previous control' },
          { id: 'mp3_query_status', name: 'Query Status', params: null, output: 'Number', description: 'Return MP3 playback status' }
        ]
      },
      {
        label: 'SD Card',
        blocks: [
          { id: 'sd_setup', name: 'SD Init', params: ['NUM', 'CS', 'MOSI', 'MISO', 'SCK'], output: null, description: 'Initialize SD card module SPI' },
          { id: 'sd_open_file', name: 'Open File', params: ['FILE_VAR', 'FILENAME', 'MODE'], output: null, description: 'Open SD file (read/write)' },
          { id: 'sd_write_file', name: 'Write File', params: ['FILE_VAR', 'DATA'], output: null, description: 'Write data to file' },
          { id: 'sd_read_file', name: 'Read File', params: ['FILE_VAR'], output: 'String', description: 'Read file contents' },
          { id: 'sd_file_exists', name: 'File Exists', params: ['FILENAME'], output: 'Boolean', description: 'Check if file exists' },
          { id: 'sd_file_size', name: 'File Size', params: ['FILE_VAR'], output: 'Number', description: 'Return file size (bytes)' },
          { id: 'sd_close_file', name: 'Close File', params: ['FILE_VAR'], output: null, description: 'Close file handle' },
          { id: 'sd_remove_file', name: 'Delete File', params: ['FILENAME'], output: null, description: 'Delete file from SD card' },
          { id: 'sd_make_directory', name: 'Create Folder', params: ['DIRNAME'], output: null, description: 'Create folder on SD card' },
          { id: 'sd_file_available', name: 'Data Available', params: ['FILE_VAR'], output: 'Boolean', description: 'Check if data remains to read from file' }
        ]
      }
    ],
    tips: ['Store MP3 files in folder 01 as 001.mp3 format on SD card', 'SD card SPI pins: MOSI(11), MISO(12), SCK(13), CS(4)']
  },

  'communication': {
    title: 'Communication',
    color: '#F75ACF',
    description: 'IR remote, RF 433MHz, GPS communication blocks',
    hardwareImages: [
      { src: 'assets/C_005_IR_Transmitter.jpg', label: 'IR Transmitter' },
      { src: 'assets/C_006_IR_Receiver.jpg', label: 'IR Receiver' },
      { src: 'assets/C_003_RF433MHz_Tx.jpg', label: 'RF 433MHz Tx' },
      { src: 'assets/C_004_RF433MHz_Rx.jpg', label: 'RF 433MHz Rx' },
      { src: 'assets/D_031_GPS.jpg', label: 'GPS Module' },
      { src: 'assets/D_032_GPS_Antenna.jpg', label: 'GPS Antenna' },
      { src: 'assets/U_003_Remote_Control.jpg', label: 'IR Remote' }
    ],
    subsections: [
      {
        label: 'IR Remote',
        blocks: [
          { id: 'ir_setup', name: 'IR Receiver Init', params: ['PIN'], output: null, description: 'Setup infrared receiver' },
          { id: 'ir_available', name: 'Signal Received', params: null, output: 'Boolean', description: 'Check IR signal received (non-blocking)' },
          { id: 'ir_read_button', name: 'Read Button', params: null, output: 'String', description: 'Return remote button number' },
          { id: 'ir_read_raw', name: 'Read Raw Code', params: null, output: 'Number', description: 'Return IR raw code value' },
          { id: 'ir_button_is', name: 'Button Compare', params: null, output: 'Boolean', description: 'Check if specific button is pressed' }
        ]
      },
      {
        label: 'RF 433MHz',
        blocks: [
          { id: 'rf433_setup', name: 'RF Transmitter Init', params: null, output: null, description: 'Setup RF433 transmitter' },
          { id: 'rf433_config', name: 'RF Send Message', params: ['TX_PIN', 'MESSAGE'], output: null, description: 'Send message via RF433' },
          { id: 'rf433_rx_setup', name: 'RF Receiver Init', params: ['RX_PIN', 'SPEED'], output: null, description: 'Setup RF433 receiver' },
          { id: 'rf433_rx_start', name: 'RF Start Receiving', params: null, output: null, description: 'Enable RF433 reception' },
          { id: 'rf433_have_message', name: 'Message Received', params: null, output: 'Boolean', description: 'Check if message arrived' },
          { id: 'rf433_get_message', name: 'Read Message', params: null, output: 'String', description: 'Return received message' },
          { id: 'rf433_read_data', name: 'Read Data', params: null, output: 'Number', description: 'Read RF433 received data details' }
        ]
      },
      {
        label: 'GPS',
        blocks: [
          { id: 'gps_setup_tinygps', name: 'GPS Init', params: ['BAUD', 'RX', 'TX'], output: null, description: 'Setup TinyGPS++ module' },
          { id: 'gps_update_from_serial', name: 'Update Data', params: null, output: null, description: 'Receive/parse GPS serial data' },
          { id: 'gps_read_value', name: 'Read Value', params: null, output: 'Number', description: 'Latitude/longitude/speed/altitude/satellite count, etc.' },
          { id: 'gps_has_fix', name: 'Fix Status', params: null, output: 'Boolean', description: 'Satellite fix status' },
          { id: 'gps_between_calc', name: 'Coordinate Calculation', params: ['LAT1', 'LNG1', 'LAT2', 'LNG2'], output: 'Number', description: 'Calculate distance (m) / bearing (deg) between two coordinates' },
          { id: 'gps_cardinal', name: 'Cardinal Direction', params: ['COURSE'], output: 'String', description: 'Convert angle to cardinal direction (N/NE/E...)' }
        ]
      }
    ],
    tips: ['IR receiver uses 38kHz carrier frequency', 'RF 433MHz supports up to 100m wireless communication']
  },

  'huskylens': {
    title: 'HuskyLens',
    color: '#00BFA5',
    description: 'HuskyLens AI camera blocks (face recognition, object tracking, line tracking, color recognition, tag recognition)',
    hardwareImages: [],
    subsections: [
      {
        label: 'Connection Setup',
        blocks: [
          { id: 'huskylens_setup_i2c', name: 'I2C Connection', params: null, output: null, description: 'Initialize HuskyLens I2C communication' },
          { id: 'huskylens_setup_serial', name: 'Serial Connection', params: ['RX', 'TX'], output: null, description: 'Setup HuskyLens serial communication' }
        ]
      },
      {
        label: 'Algorithm',
        blocks: [
          { id: 'huskylens_set_algorithm', name: 'Set Algorithm', params: null, output: null, description: 'Select face recognition/object tracking/line tracking/color recognition/tag recognition/object classification' }
        ]
      },
      {
        label: 'Data Request',
        blocks: [
          { id: 'huskylens_request', name: 'Request All Data', params: null, output: null, description: 'Request all currently recognized data' },
          { id: 'huskylens_request_by_id', name: 'Request Data by ID', params: ['ID'], output: null, description: 'Request data for specific ID only' }
        ]
      },
      {
        label: 'Detection Check',
        blocks: [
          { id: 'huskylens_available', name: 'Object Detected', params: null, output: 'Boolean', description: 'Check if recognized objects exist' },
          { id: 'huskylens_is_learned', name: 'ID Learned', params: ['ID'], output: 'Boolean', description: 'Check if specific ID has been learned' },
          { id: 'huskylens_count_learned_ids', name: 'Learned ID Count', params: null, output: 'Number', description: 'Total number of learned IDs' },
          { id: 'huskylens_count_blocks', name: 'Block Count', params: null, output: 'Number', description: 'Number of detected rectangles (blocks)' },
          { id: 'huskylens_count_arrows', name: 'Arrow Count', params: null, output: 'Number', description: 'Number of detected lines (arrows)' }
        ]
      },
      {
        label: 'Block Info',
        blocks: [
          { id: 'huskylens_block_info', name: 'Center Block Info', params: null, output: 'Number', description: 'X/Y/W/H/ID of block nearest to screen center' },
          { id: 'huskylens_block_info_by_id', name: 'Block Info by ID', params: ['ID'], output: 'Number', description: 'X/Y/W/H of specific ID block' }
        ]
      },
      {
        label: 'Arrow Info',
        blocks: [
          { id: 'huskylens_arrow_info', name: 'Center Arrow Info', params: null, output: 'Number', description: 'Coordinates/ID of arrow nearest to screen center' },
          { id: 'huskylens_arrow_info_by_id', name: 'Arrow Info by ID', params: ['ID'], output: 'Number', description: 'Coordinates of specific ID arrow' }
        ]
      },
      {
        label: 'Learning',
        blocks: [
          { id: 'huskylens_learn_once', name: 'Learn', params: ['ID'], output: null, description: 'Learn current screen as ID' },
          { id: 'huskylens_forget', name: 'Forget All', params: null, output: null, description: 'Delete all learned data' }
        ]
      },
      {
        label: 'Screen Display',
        blocks: [
          { id: 'huskylens_write_osd', name: 'Screen Text', params: ['TEXT', 'X', 'Y'], output: null, description: 'Display text on HuskyLens screen (X:0-319, Y:0-239)' },
          { id: 'huskylens_clear_osd', name: 'Clear Screen Text', params: null, output: null, description: 'Remove all text from screen' }
        ]
      },
      {
        label: 'SD Card',
        blocks: [
          { id: 'huskylens_screenshot', name: 'Screenshot', params: null, output: null, description: 'Save current screen to SD card' },
          { id: 'huskylens_save_model', name: 'Save Model', params: ['SLOT'], output: null, description: 'Save learned model to slot' },
          { id: 'huskylens_load_model', name: 'Load Model', params: ['SLOT'], output: null, description: 'Load saved model' }
        ]
      }
    ],
    tips: ['HuskyLens connects via I2C or Serial', '7 algorithms: face recognition, object tracking, object recognition, line tracking, color recognition, tag recognition, object classification']
  },

  'webble': {
    title: 'Web Bluetooth',
    color: '#4285F4',
    description: 'Web BLE and Bluetooth (HC-06, JDY-33, ESP32 BLE) communication blocks',
    hardwareImages: [
      { src: 'assets/C_001_Bluetooth_4.0_JDY33.jpg', label: 'Bluetooth JDY33' }
    ],
    subsections: [
      {
        label: 'Web BLE Setup',
        blocks: [
          { id: 'sys_webble_setup', name: 'Web BLE Init', params: ['NAME'], output: null, description: 'Start BLE service (ESP32)' },
          { id: 'sys_webble_connected', name: 'Connection Status', params: null, output: 'Boolean', description: 'Check BLE client connection' }
        ]
      },
      {
        label: 'Web BLE Send/Receive',
        blocks: [
          { id: 'sys_webble_available', name: 'Data Available', params: null, output: 'Boolean', description: 'Check if received data exists' },
          { id: 'sys_webble_read', name: 'Read Data', params: null, output: 'String', description: 'Return received string' },
          { id: 'sys_webble_write', name: 'Send Data', params: ['CONTENT'], output: null, description: 'Send data via BLE' }
        ]
      },
      {
        label: 'Web BLE Parse',
        blocks: [
          { id: 'sys_webble_parse', name: 'Parse Data', params: ['DELIMITER'], output: null, description: 'Split received data by delimiter' },
          { id: 'sys_webble_get_value', name: 'Get Parsed Value', params: ['N'], output: 'String', description: 'Get Nth split value' }
        ]
      },
      {
        label: 'Bluetooth Setup',
        blocks: [
          { id: 'arduino_bt_setup', name: 'Arduino BT Setup', params: ['RX', 'TX', 'NAME', 'BAUD'], output: null, description: 'Setup external BT module (JDY-33, etc.) SoftwareSerial' },
          { id: 'esp32_bt_setup', name: 'ESP32 BT Setup', params: ['NAME'], output: null, description: 'Setup ESP32 built-in BLE' }
        ]
      },
      {
        label: 'Bluetooth Send/Receive',
        blocks: [
          { id: 'arduino_bt_available', name: 'BT Data Available', params: null, output: 'Boolean', description: 'Check BT data arrival' },
          { id: 'arduino_bt_read_raw', name: 'BT Read Byte', params: null, output: 'Number', description: 'Return first received byte as number' },
          { id: 'arduino_bt_read_hex', name: 'BT Read HEX', params: null, output: 'String', description: 'Return received data as hexadecimal' },
          { id: 'arduino_bt_read_auto', name: 'BT Auto Read', params: null, output: 'String', description: 'Return received data as readable characters' },
          { id: 'arduino_bt_write', name: 'BT Send', params: ['CONTENT'], output: null, description: 'Send data via BT' }
        ]
      },
      {
        label: 'Bluetooth Send/Receive (\\n required)',
        blocks: [
          { id: 'arduino_bt_msg_ready', name: 'BT Message Complete', params: null, output: 'Boolean', description: 'Check for complete message ending with newline (\\n)' },
          { id: 'arduino_bt_read', name: 'BT Read Message', params: null, output: 'String', description: 'Return complete message string' }
        ]
      },
      {
        label: 'Bluetooth Parse',
        blocks: [
          { id: 'arduino_bt_parse', name: 'BT Parse Data', params: ['DELIMITER'], output: null, description: 'Split BT received data by delimiter' },
          { id: 'arduino_bt_get_value', name: 'BT Parsed Value', params: ['INDEX'], output: 'String', description: 'Return Nth parsed BT value' }
        ]
      }
    ],
    tips: ['Web BLE available on ESP32 boards', 'Arduino requires external BT module like JDY-33', 'Communicate directly from web browser via Web Bluetooth API']
  },

  'wifi': {
    title: 'WiFi',
    color: '#4285F4',
    description: 'ESP32 WiFi connection and WebSocket communication blocks (ESP32 only)',
    hardwareImages: [
      { src: 'assets/C_002_WiFi_ESP12E.jpg', label: 'WiFi ESP-12E' }
    ],
    subsections: [
      {
        label: 'Setup',
        blocks: [
          { id: 'wifi_setup', name: 'WiFi Connect', params: ['SSID', 'PASS'], output: null, description: 'Connect to WiFi network' },
          { id: 'wifi_ws_server_setup', name: 'WebSocket Server', params: ['PORT'], output: null, description: 'Start WebSocket server' },
          { id: 'wifi_is_connected', name: 'WiFi Connection Status', params: null, output: 'Boolean', description: 'Check WiFi connection' },
          { id: 'wifi_local_ip', name: 'Local IP Address', params: null, output: 'String', description: 'Return currently assigned IP' }
        ]
      },
      {
        label: 'Send/Receive',
        blocks: [
          { id: 'wifi_ws_available', name: 'WebSocket Data Available', params: null, output: 'Boolean', description: 'Check if received data exists' },
          { id: 'wifi_ws_read', name: 'WebSocket Read', params: null, output: 'String', description: 'Return received string' },
          { id: 'wifi_ws_send', name: 'WebSocket Send', params: ['DATA'], output: null, description: 'Send string data' },
          { id: 'wifi_ws_send_raw', name: 'WebSocket Raw Send', params: ['DATA'], output: null, description: 'Send raw data' },
          { id: 'wifi_ws_send_label_value', name: 'Send Label:Value', params: ['LABEL', 'VALUE'], output: null, description: 'Send label and value as pair' }
        ]
      }
    ],
    tips: ['Available on ESP32 boards only', 'Real-time bidirectional communication with web browser via WebSocket']
  },

  'serial': {
    title: 'Serial',
    color: '#367E7F',
    description: 'Serial (UART) communication send/receive and data parsing blocks',
    hardwareImages: [
      { src: 'assets/C_007_USB_to_UART_Converter.jpg', label: 'USB-UART Converter' },
      { src: 'assets/C_008_Wireless_Uploader.png', label: 'Wireless Uploader' },
      { src: 'assets/C_009_Wireless_Uploader_Dongle.png', label: 'Wireless Uploader Dongle' }
    ],
    subsections: [
      {
        label: 'Setup',
        blocks: [
          { id: 'sys_serial_begin', name: 'Serial Init', params: ['RX', 'TX', 'BAUD'], output: null, description: 'Start serial communication (port/baud rate)' },
          { id: 'sys_serial_connected', name: 'Connection Status', params: null, output: 'Boolean', description: 'Check serial port is open' }
        ]
      },
      {
        label: 'Send',
        blocks: [
          { id: 'sys_serial_print', name: 'Serial Print', params: ['CONTENT'], output: null, description: 'Print to serial monitor (with newline)' },
          { id: 'sys_serial_send_change', name: 'Send on Change', params: ['VALUE'], output: null, description: 'Send via serial only when value changes' },
          { id: 'sys_serial_print_continuous', name: 'Continuous Print', params: ['CONTENT'], output: null, description: 'Print without newline' },
          { id: 'sys_serial_print_multi', name: 'Multi Print', params: ['CONTENT'], output: null, description: 'Print multiple values on one line' },
          { id: 'sys_serial_send_key_val', name: 'Send Key:Value', params: ['KEY', 'VALUE'], output: null, description: 'Send key and value pair via serial' }
        ]
      },
      {
        label: 'Receive',
        blocks: [
          { id: 'sys_serial_poll', name: 'Serial Poll', params: null, output: null, description: 'Poll serial data reception' },
          { id: 'sys_serial_available', name: 'Data Available', params: null, output: 'Boolean', description: 'Check if received data exists' },
          { id: 'sys_serial_read_raw', name: 'Raw Read', params: null, output: 'String', description: 'Return received data as string' },
          { id: 'sys_serial_flush', name: 'Flush Buffer', params: null, output: null, description: 'Clear serial buffer' }
        ]
      },
      {
        label: 'Parsing (Scratch Style)',
        blocks: [
          { id: 'sys_serial_parse_delimiter', name: 'Delimiter Parse', params: ['DELIMITER'], output: null, description: 'Split received data by delimiter' },
          { id: 'sys_parsed_value_get', name: 'Get Parsed Value', params: ['INDEX'], output: 'String', description: 'Nth split value' },
          { id: 'sys_parsed_count', name: 'Parsed Value Count', params: null, output: 'Number', description: 'Number of split values' }
        ]
      },
      {
        label: 'Parsing (Manual)',
        blocks: [
          { id: 'sys_parse_csv_get', name: 'Get CSV Value', params: ['STRING', 'DELIMITER', 'INDEX'], output: 'String', description: 'Split string by delimiter and get Nth value' },
          { id: 'sys_parse_count', name: 'CSV Value Count', params: ['STRING', 'DELIMITER'], output: 'Number', description: 'Number of delimited values' },
          { id: 'sys_util_to_number', name: 'String→Number', params: ['STRING'], output: 'Number', description: 'Convert string to number' }
        ]
      }
    ],
    tips: ['Default baud rate is 9600 bps', 'Use serial monitor for debugging sensor values', 'Scratch-style parsing auto-splits received data']
  },

  'esp32cam': {
    title: 'ESP32-CAM',
    color: '#367E7F',
    description: 'ESP32-CAM / ESP32-S3 camera module video streaming blocks (ESP32 only)',
    hardwareImages: [
      { src: 'assets/C_010_ESP32CAM.jpg', label: 'ESP32-CAM' }
    ],
    subsections: [
      {
        label: 'ESP32-CAM',
        blocks: [
          { id: 'esp32cam_declare', name: 'ESP32-CAM Declare', params: null, output: null, description: 'Declare ESP32-CAM library/variables' },
          { id: 'esp32cam_wifi_config', name: 'WiFi Config', params: ['SSID', 'PASSWORD'], output: null, description: 'Configure camera WiFi network' },
          { id: 'esp32cam_receiver_config', name: 'Receiver Config', params: ['IP', 'PORT', 'CHUNK'], output: null, description: 'Set UDP receiver PC IP/port/chunk size' },
          { id: 'esp32cam_setup', name: 'Camera Init', params: ['QUALITY', 'BRI', 'CONTRAST', 'SAT'], output: null, description: 'Set camera resolution/quality/brightness' },
          { id: 'esp32cam_flip', name: 'Flip/Mirror', params: null, output: null, description: 'Flip camera image vertically/horizontally' }
        ]
      },
      {
        label: 'Camera Control',
        blocks: [
          { id: 'esp32cam_loop', name: 'Stream Video', params: null, output: null, description: 'Send video frames via UDP in loop()' },
          { id: 'esp32cam_led_control', name: 'LED Control', params: null, output: null, description: 'Built-in LED flash ON/OFF (GPIO 4)' }
        ]
      },
      {
        label: 'ESP32-S3 CAM',
        blocks: [
          { id: 'esp32s3cam_declare', name: 'S3 CAM Declare', params: null, output: null, description: 'Declare ESP32-S3 CAM library (Freenove pin map)' },
          { id: 'esp32s3cam_setup', name: 'S3 Camera Init', params: ['QUALITY', 'BRI', 'CONTRAST', 'SAT'], output: null, description: 'S3 camera setup (PSRAM auto-detect)' }
        ]
      }
    ],
    tips: ['Supports ESP32-CAM and ESP32-S3-CAM boards', 'Lower JPEG quality value = higher image quality (10~63)', 'Python receiver program required on receiving PC']
  },

  'tinyml': {
    title: 'TinyML',
    color: '#9C27B0',
    description: 'TensorFlow Lite on-device AI inference blocks (ESP32 only)',
    subsections: [
      {
        label: 'Model Setup',
        blocks: [
          { id: 'tinyml_model_setup', name: 'Model Init', params: ['MODEL_NAME', 'ARENA_SIZE'], output: null, description: 'Load TFLite model and allocate Arena memory' },
          { id: 'tinyml_model_info', name: 'Model Info', params: null, output: 'Number', description: 'Return input/output/Arena size' }
        ]
      },
      {
        label: 'Data Collection',
        blocks: [
          { id: 'tinyml_collect_imu', name: 'Collect IMU Data', params: ['DURATION', 'LABEL'], output: null, description: 'Collect MPU6050 accel/gyro data (Edge Impulse CSV)' },
          { id: 'tinyml_collect_analog', name: 'Collect Analog Data', params: ['PIN', 'SAMPLES', 'RATE'], output: null, description: 'Collect analog sensor data' },
          { id: 'tinyml_collect_sound', name: 'Collect Sound Data', params: ['DURATION', 'LABEL'], output: null, description: 'Collect I2S mic (INMP441) audio data' }
        ]
      },
      {
        label: 'Inference',
        blocks: [
          { id: 'tinyml_inference_start', name: 'Run Inference', params: null, output: null, description: 'Run inference with TFLite model' },
          { id: 'tinyml_classification_result', name: 'Classification Result', params: null, output: 'String', description: 'Return highest confidence class name' },
          { id: 'tinyml_confidence', name: 'Confidence Score', params: null, output: 'Number', description: 'Highest confidence score (0~100)' },
          { id: 'tinyml_result_is', name: 'Result Compare', params: ['CLASS_NAME'], output: 'Boolean', description: 'Check if classification result is specific class' },
          { id: 'tinyml_anomaly_detected', name: 'Anomaly Detected', params: null, output: 'Boolean', description: 'Check if anomaly detected' }
        ]
      }
    ],
    tips: ['Available on ESP32 boards only', 'Export trained models from Edge Impulse as .h files', 'Data collection blocks output training data via serial']
  }

};
