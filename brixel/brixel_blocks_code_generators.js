/**
 * 개발자 : 김석전, alphaco@kakao.com
 * Arduino 코드 생성 함수 (Blockly 12.2.0 호환 최종본)
 * - 텍스트, 변수, 함수 오류 모두 해결된 버전
 * - index.html 기준으로 재정렬 및 색상 통일 (2025-08-25)
 */

// ==================================================================================
// ===== 코드 생성 함수 (Arduino C++) / index.html 순서에 맞춰 재정렬됨 =====
// ==================================================================================

// ============================================================================================ 1. 메인 카테고리 ==========
Arduino.forBlock['arduino_uno_starts_up'] = function (block, generator) {
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));

  var includes = `
//It's generated with Arduino C code.. Anything is possible, so just Do it.
#include <Arduino.h>
#include <Wire.h>
#include <SPI.h>
`;

  if (!isEsp32 && !isPico) {
    includes += `#include <SoftwareSerial.h>\n`;
  }

  // ESP32 analogWrite compatibility for older cores (optional but safer)
  if (isEsp32) {
    // Check if custom analogWrite definition is needed or trusted. 
    // For now, we rely on the core, but if user reports issues, we can inject a helper here.
  }

  generator.definitions_['include_arduino'] = includes;
  return '';
};

Arduino.forBlock['arduino_setup'] = function (block, generator) {
  var setupCode = generator.statementToCode(block, 'SETUP') || '';
  let autoSetups = Object.values(generator.setups_).join('\n  ');
  let allSetupCode = (autoSetups ? '  ' + autoSetups + '\n' : '') + setupCode;
  return 'void setup() {\n' + allSetupCode + '}\n\n';
};

Arduino.forBlock['arduino_loop'] = function (block, generator) {
  var loopCode = generator.statementToCode(block, 'LOOP') || '';
  let autoLoops = Object.values(generator.loops_).join('\n  ');
  let allLoopCode = (autoLoops ? '  ' + autoLoops + '\n' : '') + loopCode;
  return 'void loop() {\n' + allLoopCode + '}\n\n';
};

// =============================================================================================== 2. 핀제어 카테고리 ==========
Arduino.forBlock['pin_mode'] = function (block, generator) {
  var pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '13';
  var mode = block.getFieldValue('MODE');
  return 'pinMode(' + pin + ', ' + mode + ');\n';
};

Arduino.forBlock['read_digital_pin'] = function (block, generator) {
  var pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '2';
  // Pin setup is automatic on Arduino for read, but good practice to enforce.
  generator.setups_['setup_pin_in_' + pin] = 'pinMode(' + pin + ', INPUT);';
  return ['digitalRead(' + pin + ')', Arduino.ORDER_ATOMIC];
};

Arduino.forBlock['set_digital_pin'] = function (block, generator) {
  var pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '13';
  var state = block.getFieldValue('STATE');
  generator.setups_['setup_pin_' + pin] = 'pinMode(' + pin + ', OUTPUT);';
  return 'digitalWrite(' + pin + ', ' + state + ');\n';
};

Arduino.forBlock['read_analog_pin'] = function (block, generator) {
  var pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '0';
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));

  if (isEsp32 || isPico) {
    // ESP32/Pico: Use direct GPIO number (no 'A' prefix usually, or pin is already the GPIO num)
    // If the block returns just a number '0', '1', we might need to map it if the board labels are different.
    // But usually in Blockly for ESP32, users select GPIO numbers.
    return ['analogRead(' + pin + ')', Arduino.ORDER_ATOMIC];
  } else {
    // Arduino AVR: Use A0, A1...
    return ['analogRead(A' + pin + ')', Arduino.ORDER_ATOMIC];
  }
};

Arduino.forBlock['set_pwm_pin'] = function (block, generator) {
  var pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '5';
  var value = generator.valueToCode(block, 'VALUE', Arduino.ORDER_ATOMIC) || '255';

  // Note: ESP32 core v3.0+ supports analogWrite.
  // We assume the environment provides a compatible core or user uses a helper.
  // If strict LEDC is needed, we would add it here, but analogWrite is cleaner.

  generator.setups_['setup_pin_' + pin] = 'pinMode(' + pin + ', OUTPUT);';
  return 'analogWrite(' + pin + ', ' + value + ');\n';
};

Arduino.forBlock['servo_setup'] = function (block, generator) {
  var pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '9';
  var pinVar = pin.replace('A', '');

  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  generator.definitions_['include_servo'] = isEsp32 ? '#include <ESP32Servo.h>' : '#include <Servo.h>';

  generator.definitions_['servo_object_' + pinVar] = 'Servo servo_' + pinVar + ';';
  generator.setups_['servo_attach_' + pinVar] = 'servo_' + pinVar + '.attach(' + pin + ');';
  return '';
};

Arduino.forBlock['set_servo_angle'] = function (block, generator) {
  var pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '9';
  var angle = generator.valueToCode(block, 'ANGLE', Arduino.ORDER_ATOMIC) || '90';
  var pinVar = pin.replace('A', '');

  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  generator.definitions_['include_servo'] = isEsp32 ? '#include <ESP32Servo.h>' : '#include <Servo.h>';

  generator.definitions_['servo_object_' + pinVar] = 'Servo servo_' + pinVar + ';';
  generator.setups_['servo_attach_' + pinVar] = 'servo_' + pinVar + '.attach(' + pin + ');';
  return 'servo_' + pinVar + '.write(' + angle + ');\n';
};

Arduino.forBlock['delay_ms'] = function (block, generator) {
  var delay_time = generator.valueToCode(block, 'DELAY_TIME', Arduino.ORDER_ATOMIC) || '1';
  return 'delay(' + (delay_time + ' * 1000') + ');\n';
};

Arduino.forBlock['timer_millis'] = function (block, generator) {
  return ['millis()', Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['timer_reset'] = function (block, generator) {
  let timerNum = generator.valueToCode(block, 'TIMER_NUM', Arduino.ORDER_ATOMIC) || '1';
  let timerVar = 'timer' + timerNum;
  return timerVar + ' = millis();\n';
};

Arduino.forBlock['timer_non_blocking_delay'] = function (block, generator) {
  let interval = generator.valueToCode(block, 'INTERVAL', Arduino.ORDER_ATOMIC) || '1000';
  let branch = generator.statementToCode(block, 'DO') || '';

  // 간단한 카운터 사용
  if (!generator.timerCount_) generator.timerCount_ = 0;
  let timerVar = 'timer' + (++generator.timerCount_);

  generator.definitions_['var_' + timerVar] = 'unsigned long ' + timerVar + ' = 0;';
  let code = 'if (millis() - ' + timerVar + ' >= ' + interval + ') {\n';
  code += '  ' + timerVar + ' = millis();\n';
  code += branch;
  code += '}\n';
  return code;
};

Arduino.forBlock['tone_out'] = function (block, generator) {
  let pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '8';
  let freq = generator.valueToCode(block, 'FREQUENCY', Arduino.ORDER_ATOMIC) || '262';
  let duration = generator.valueToCode(block, 'DURATION', Arduino.ORDER_ATOMIC) || '0';
  if (duration === '0') {
    return 'tone(' + pin + ', ' + freq + ');\n';
  }
  return 'tone(' + pin + ', ' + freq + ', ' + duration + ');\n';
};

Arduino.forBlock['no_tone'] = function (block, generator) {
  let pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '8';
  return 'noTone(' + pin + ');\n';
};

Arduino.forBlock['arduino_interrupt'] = function (block, generator) {
  let pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '2';
  let mode = block.getFieldValue('MODE');
  let branch = generator.statementToCode(block, 'DO') || '';
  let funcName = 'isr_pin_' + pin;
  generator.definitions_['func_' + funcName] = 'void ' + funcName + '() {\n' + branch + '}';
  generator.setups_['interrupt_' + pin] = 'attachInterrupt(digitalPinToInterrupt(' + pin + '), ' + funcName + ', ' + mode + ');';
  return '';
};

Arduino.forBlock['pulse_in'] = function (block, generator) {
  let pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '7';
  let state = block.getFieldValue('STATE');
  let timeout = generator.valueToCode(block, 'TIMEOUT', Arduino.ORDER_ATOMIC) || '1000000';
  return ['pulseIn(' + pin + ', ' + state + ', ' + timeout + ')', Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['shift_out'] = function (block, generator) {
  let dataPin = generator.valueToCode(block, 'DATA_PIN', Arduino.ORDER_ATOMIC) || '2';
  let clockPin = generator.valueToCode(block, 'CLOCK_PIN', Arduino.ORDER_ATOMIC) || '3';
  let latchPin = generator.valueToCode(block, 'LATCH_PIN', Arduino.ORDER_ATOMIC) || '4';
  let bitOrder = block.getFieldValue('BIT_ORDER');
  let value = generator.valueToCode(block, 'VALUE', Arduino.ORDER_ATOMIC) || '0';
  generator.setups_['setup_shift_data_' + dataPin] = 'pinMode(' + dataPin + ', OUTPUT);';
  generator.setups_['setup_shift_clock_' + clockPin] = 'pinMode(' + clockPin + ', OUTPUT);';
  generator.setups_['setup_shift_latch_' + latchPin] = 'pinMode(' + latchPin + ', OUTPUT);';
  let code = 'digitalWrite(' + latchPin + ', LOW);\n';
  code += 'shiftOut(' + dataPin + ', ' + clockPin + ', ' + bitOrder + ', ' + value + ');\n';
  code += 'digitalWrite(' + latchPin + ', HIGH);\n';
  return code;
};

// ================================================================================================ 3. 제어 카테고리 ==========
Arduino.forBlock['wait_until'] = function (block, generator) {
  var condition = generator.valueToCode(block, 'CONDITION', Arduino.ORDER_ATOMIC) || 'false';
  return 'while (!(' + condition + ')) {}\n';
};

Arduino.forBlock['controls_if'] = function (block, generator) {
  var n = 0;
  var code = '', branchCode, conditionCode;
  do {
    conditionCode = generator.valueToCode(block, 'IF' + n, Arduino.ORDER_NONE) || 'false';
    branchCode = generator.statementToCode(block, 'DO' + n) || '';
    code += (n > 0 ? ' else ' : '') + 'if (' + conditionCode + ') {\n' + branchCode + '}';
    n++;
  } while (block.getInput('IF' + n));
  if (block.getInput('ELSE')) {
    branchCode = generator.statementToCode(block, 'ELSE') || '';
    code += ' else {\n' + branchCode + '}';
  }
  return code + '\n';
};

Arduino.forBlock['controls_repeat_ext'] = function (block, generator) {
  var repeats = generator.valueToCode(block, 'TIMES', Arduino.ORDER_ASSIGNMENT) || '0';
  var branch = generator.statementToCode(block, 'DO') || '';
  var code = 'for (int count = 0; count < ' + repeats + '; count++) {\n' + branch + '}\n';
  return code;
};

Arduino.forBlock['controls_whileUntil'] = function (block, generator) {
  var until = block.getFieldValue('MODE') == 'UNTIL';
  var argument0 = generator.valueToCode(block, 'BOOL', until ? Arduino.ORDER_LOGICAL_NOT : Arduino.ORDER_NONE) || 'false';
  var branch = generator.statementToCode(block, 'DO') || '';
  if (until) {
    argument0 = '!' + argument0;
  }
  return 'while (' + argument0 + ') {\n' + branch + '}\n';
};

Arduino.forBlock['controls_for'] = function (block, generator) {
  var varId = block.getFieldValue('VAR');
  var variable0 = block.workspace.getVariableById(varId).name;
  // 한글 변수명 로마자 변환
  if (window.IDEUtils && window.IDEUtils.romanizeKorean) {
    variable0 = window.IDEUtils.romanizeKorean(variable0);
  }

  var argument0 = generator.valueToCode(block, 'FROM', Arduino.ORDER_ASSIGNMENT) || '0';
  var argument1 = generator.valueToCode(block, 'TO', Arduino.ORDER_ASSIGNMENT) || '0';
  var increment = generator.valueToCode(block, 'BY', Arduino.ORDER_ASSIGNMENT) || '1';
  var branch = generator.statementToCode(block, 'DO') || '';

  if (!generator.variableTypes_) {
    generator.variableTypes_ = {};
  }

  if (generator.variableTypes_[variable0] === undefined) {
    generator.variableTypes_[variable0] = 'int';
    generator.definitions_['var_' + variable0] = 'int ' + variable0 + ';';
  }

  var code = 'for (' + variable0 + ' = ' + argument0 + '; ' + variable0 + ' <= ' + argument1 + '; ' + variable0 + ' += ' + increment + ') {\n' + branch + '}\n';
  return code;
};

Arduino.forBlock['controls_flow_statements'] = function (block, generator) {
  switch (block.getFieldValue('FLOW')) {
    case 'BREAK': return 'break;\n';
    case 'CONTINUE': return 'continue;\n';
  }
  return '';
};

// =============================================================================================== 4. 논리 카테고리 ==========
Arduino.forBlock['logic_compare'] = function (block, generator) {
  var OPERATORS = { 'EQ': '==', 'NEQ': '!=', 'LT': '<', 'LTE': '<=', 'GT': '>', 'GTE': '>=' };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var argument0 = generator.valueToCode(block, 'A', Arduino.ORDER_RELATIONAL) || '0';
  var argument1 = generator.valueToCode(block, 'B', Arduino.ORDER_RELATIONAL) || '0';
  return [argument0 + ' ' + operator + ' ' + argument1, Arduino.ORDER_RELATIONAL];
};

Arduino.forBlock['logic_operation'] = function (block, generator) {
  var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Arduino.ORDER_LOGICAL_AND : Arduino.ORDER_LOGICAL_OR;
  var argument0 = generator.valueToCode(block, 'A', order) || 'false';
  var argument1 = generator.valueToCode(block, 'B', order) || 'false';
  return ['(' + argument0 + ') ' + operator + ' (' + argument1 + ')', order];
};

Arduino.forBlock['logic_negate'] = function (block, generator) {
  var argument0 = generator.valueToCode(block, 'BOOL', Arduino.ORDER_LOGICAL_NOT) || 'true';
  return ['!(' + argument0 + ')', Arduino.ORDER_LOGICAL_NOT];
};

Arduino.forBlock['logic_boolean'] = function (block, generator) {
  return [(block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false', Arduino.ORDER_ATOMIC];
};

Arduino.forBlock['logic_null'] = function (block, generator) {
  return ['NULL', Arduino.ORDER_ATOMIC];
};

Arduino.forBlock['logic_ternary'] = function (block, generator) {
  var value_if = generator.valueToCode(block, 'IF', Arduino.ORDER_CONDITIONAL) || 'false';
  var value_then = generator.valueToCode(block, 'THEN', Arduino.ORDER_CONDITIONAL) || 'null';
  var value_else = generator.valueToCode(block, 'ELSE', Arduino.ORDER_CONDITIONAL) || 'null';
  return [value_if + ' ? ' + value_then + ' : ' + value_else, Arduino.ORDER_CONDITIONAL];
};

// ========== 5. 수학 카테고리 ==========
Arduino.forBlock['math_number'] = function (block, generator) {
  var code = Number(block.getFieldValue('NUM'));
  return [code, code < 0 ? Arduino.ORDER_UNARY_MINUS : Arduino.ORDER_ATOMIC];
};

Arduino.forBlock['math_arithmetic'] = function (block, generator) {
  var OPERATORS = {
    'ADD': [' + ', Arduino.ORDER_ADDITION], 'MINUS': [' - ', Arduino.ORDER_SUBTRACTION],
    'MULTIPLY': [' * ', Arduino.ORDER_MULTIPLICATION], 'DIVIDE': [' / ', Arduino.ORDER_DIVISION],
    'POWER': [null, Arduino.ORDER_NONE]
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = generator.valueToCode(block, 'A', order) || '0';
  var argument1 = generator.valueToCode(block, 'B', order) || '0';
  var code;
  if (!operator) { // POWER
    code = 'pow(' + argument0 + ', ' + argument1 + ')';
    return [code, Arduino.ORDER_FUNCTION_CALL];
  }
  code = argument0 + operator + argument1;
  return [code, order];
};

Arduino.forBlock['math_single'] = function (block, generator) {
  var op = block.getFieldValue('OP');
  var arg = generator.valueToCode(block, 'NUM', Arduino.ORDER_UNARY_MINUS) || '0';
  var code;
  switch (op) {
    case 'ROOT': code = 'sqrt(' + arg + ')'; break;
    case 'ABS': code = 'abs(' + arg + ')'; break;
    case 'NEG': code = '-' + arg; break;
    case 'LN': code = 'log(' + arg + ')'; break;
    case 'LOG10': code = 'log10(' + arg + ')'; break;
    case 'EXP': code = 'exp(' + arg + ')'; break;
    case 'POW10': code = 'pow(10, ' + arg + ')'; break;
  }
  return [code, Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['math_trig'] = function (block, generator) {
  var op = block.getFieldValue('OP');
  var arg = generator.valueToCode(block, 'NUM', Arduino.ORDER_NONE) || '0';
  var code;
  switch (op) {
    case 'SIN': code = 'sin(' + arg + ')'; break;
    case 'COS': code = 'cos(' + arg + ')'; break;
    case 'TAN': code = 'tan(' + arg + ')'; break;
    case 'ASIN': code = 'asin(' + arg + ')'; break;
    case 'ACOS': code = 'acos(' + arg + ')'; break;
    case 'ATAN': code = 'atan(' + arg + ')'; break;
  }
  return [code, Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['math_constant'] = function (block, generator) {
  var CONSTANTS = {
    'PI': ['M_PI', Arduino.ORDER_ATOMIC], 'E': ['M_E', Arduino.ORDER_ATOMIC],
    'GOLDEN_RATIO': ['1.61803398875', Arduino.ORDER_ATOMIC], 'SQRT2': ['M_SQRT2', Arduino.ORDER_ATOMIC],
    'SQRT1_2': ['M_SQRT1_2', Arduino.ORDER_ATOMIC], 'INFINITY': ['INFINITY', Arduino.ORDER_ATOMIC]
  };
  return CONSTANTS[block.getFieldValue('CONSTANT')];
};

Arduino.forBlock['math_number_property'] = function (block, generator) {
  var number_to_check = generator.valueToCode(block, 'NUMBER_TO_CHECK', Arduino.ORDER_MODULUS) || '0';
  var property = block.getFieldValue('PROPERTY');
  var code;
  switch (property) {
    case 'EVEN': code = number_to_check + ' % 2 == 0'; break;
    case 'ODD': code = number_to_check + ' % 2 != 0'; break;
    case 'WHOLE': code = 'fmod(' + number_to_check + ', 1) == 0'; break;
    case 'POSITIVE': code = number_to_check + ' > 0'; break;
    case 'NEGATIVE': code = number_to_check + ' < 0'; break;
    case 'DIVISIBLE_BY':
      var divisor = generator.valueToCode(block, 'DIVISOR', Arduino.ORDER_MODULUS) || '0';
      code = divisor + ' != 0 && ' + number_to_check + ' % ' + divisor + ' == 0';
      break;
    case 'PRIME':
      var funcName = 'isPrime';
      var func = `
boolean ${funcName}(int n) {
  if (n <= 1) return false; if (n <= 3) return true;
  if (n % 2 == 0 || n % 3 == 0) return false;
  for (int i = 5; i * i <= n; i = i + 6)
    if (n % i == 0 || n % (i + 2) == 0) return false;
  return true;
}`;
      generator.definitions_['function_' + funcName] = func;
      code = funcName + '(' + number_to_check + ')';
      break;
  }
  return [code, Arduino.ORDER_RELATIONAL];
};

Arduino.forBlock['math_round'] = function (block, generator) {
  var op = block.getFieldValue('OP');
  var arg = generator.valueToCode(block, 'NUM', Arduino.ORDER_NONE) || '0';
  var code;
  switch (op) {
    case 'ROUND': code = 'round(' + arg + ')'; break;
    case 'ROUNDUP': code = 'ceil(' + arg + ')'; break;
    case 'ROUNDDOWN': code = 'floor(' + arg + ')'; break;
  }
  return [code, Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['math_modulo'] = function (block, generator) {
  var arg0 = generator.valueToCode(block, 'DIVIDEND', Arduino.ORDER_MODULUS) || '0';
  var arg1 = generator.valueToCode(block, 'DIVISOR', Arduino.ORDER_MODULUS) || '1';
  return [arg0 + ' % ' + arg1, Arduino.ORDER_MODULUS];
};

Arduino.forBlock['math_constrain'] = function (block, generator) {
  var val = generator.valueToCode(block, 'VALUE', Arduino.ORDER_COMMA) || '0';
  var low = generator.valueToCode(block, 'LOW', Arduino.ORDER_COMMA) || '0';
  var high = generator.valueToCode(block, 'HIGH', Arduino.ORDER_COMMA) || '0';
  return ['constrain(' + val + ', ' + low + ', ' + high + ')', Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['math_random_int'] = function (block, generator) {
  var from = generator.valueToCode(block, 'FROM', Arduino.ORDER_COMMA) || '0';
  var to = generator.valueToCode(block, 'TO', Arduino.ORDER_COMMA) || '100';
  return ['random(' + from + ', ' + to + ' + 1)', Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['math_random_float'] = function (block, generator) {
  return ['(random(0, 10000) / 10000.0)', Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['math_atan2'] = function (block, generator) {
  var y = generator.valueToCode(block, 'Y', Arduino.ORDER_COMMA) || '0';
  var x = generator.valueToCode(block, 'X', Arduino.ORDER_COMMA) || '0';
  return ['atan2(' + y + ', ' + x + ') * 180 / M_PI', Arduino.ORDER_FUNCTION_CALL];
};

// ======================================== 6. 텍스트 카테고리 ==========
Arduino.forBlock['text'] = function (block, generator) {
  const text = block.getFieldValue('TEXT');
  const quotedText = '"' + text.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
  return [quotedText, Arduino.ORDER_ATOMIC];
};

Arduino.forBlock['custom_text_join'] = function (block, generator) {
  const text1 = generator.valueToCode(block, 'TEXT1', Arduino.ORDER_ADDITION) || '""';
  const text2 = generator.valueToCode(block, 'TEXT2', Arduino.ORDER_ADDITION) || '""';
  const code = 'String(' + text1 + ') + String(' + text2 + ')';
  return [code, Arduino.ORDER_ADDITION];
};

Arduino.forBlock['custom_text_char_at'] = function (block, generator) {
  const text = generator.valueToCode(block, 'TEXT', Arduino.ORDER_MEMBER) || '""';
  const index = generator.valueToCode(block, 'INDEX', Arduino.ORDER_SUBTRACTION) || '1';
  const code = 'String(' + text + ').charAt(' + index + ' - 1)';
  return [code, Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['custom_text_length'] = function (block, generator) {
  const text = generator.valueToCode(block, 'TEXT', Arduino.ORDER_FUNCTION_CALL) || '""';
  return ['String(' + text + ').length()', Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['custom_text_contains'] = function (block, generator) {
  const text = generator.valueToCode(block, 'TEXT', Arduino.ORDER_MEMBER) || '""';
  const substring = generator.valueToCode(block, 'SUBSTRING', Arduino.ORDER_NONE) || '""';
  const code = '(String(' + text + ').indexOf(String(' + substring + ')) != -1)';
  return [code, Arduino.ORDER_EQUALITY];
};
Arduino.forBlock['text_append'] = function (block, generator) {
  let varName = block.getFieldValue('VAR');  // getVariableName 제거

  // 한글 변수명 로마자 변환
  if (window.IDEUtils && window.IDEUtils.romanizeKorean) {
    varName = window.IDEUtils.romanizeKorean(varName);
  }

  const value = generator.valueToCode(block, 'TEXT', Arduino.ORDER_ATOMIC) || '""';
  return varName + ' += ' + value + ';\n';
};
Arduino.forBlock['text_getSubstring'] = function (block, generator) {
  const text = generator.valueToCode(block, 'STRING', Arduino.ORDER_MEMBER) || '""';
  const where1 = block.getFieldValue('WHERE1');
  const where2 = block.getFieldValue('WHERE2');
  const at1 = generator.valueToCode(block, 'AT1', Arduino.ORDER_ATOMIC) || '0';
  const at2 = generator.valueToCode(block, 'AT2', Arduino.ORDER_ATOMIC) || '0';

  let startIndex, endIndex;

  if (where1 === 'FROM_START') {
    startIndex = '(' + at1 + ' - 1)';
  } else if (where1 === 'FROM_END') {
    startIndex = '(' + text + '.length() - ' + at1 + ')';
  } else if (where1 === 'FIRST') {
    startIndex = '0';
  }

  if (where2 === 'FROM_START') {
    endIndex = at2;
  } else if (where2 === 'FROM_END') {
    endIndex = '(' + text + '.length() - ' + at2 + ' + 1)';
  } else if (where2 === 'LAST') {
    endIndex = text + '.length()';
  }

  const code = text + '.substring(' + startIndex + ', ' + endIndex + ')';
  return [code, Arduino.ORDER_MEMBER];
};
Arduino.forBlock['text_changeCase'] = function (block, generator) {
  const text = generator.valueToCode(block, 'TEXT', Arduino.ORDER_MEMBER) || '""';
  const caseType = block.getFieldValue('CASE');

  let code;
  if (caseType === 'UPPERCASE') {
    code = '(String(' + text + ').toUpperCase())';
  } else if (caseType === 'LOWERCASE') {
    code = '(String(' + text + ').toLowerCase())';
  } else if (caseType === 'TITLECASE') {
    generator.addFunction('titleCase',
      'String titleCase(String str) {\n' +
      '  str.toLowerCase();\n' +
      '  if (str.length() > 0 && str.charAt(0) >= \'a\' && str.charAt(0) <= \'z\') {\n' +
      '    str.setCharAt(0, str.charAt(0) - 32);\n' +
      '  }\n' +
      '  return str;\n' +
      '}'
    );
    code = 'titleCase(String(' + text + '))';
  }

  return [code, Arduino.ORDER_MEMBER];
};
Arduino.forBlock['text_trim'] = function (block, generator) {
  const text = generator.valueToCode(block, 'TEXT', Arduino.ORDER_MEMBER) || '""';
  const mode = block.getFieldValue('MODE');

  let code;
  if (mode === 'BOTH') {
    code = '(String(' + text + ').trim())';
  } else if (mode === 'LEFT') {
    generator.addFunction('trimLeft',
      'String trimLeft(String str) {\n' +
      '  int start = 0;\n' +
      '  while (start < str.length() && str.charAt(start) == \' \') start++;\n' +
      '  return str.substring(start);\n' +
      '}'
    );
    code = 'trimLeft(String(' + text + '))';
  } else if (mode === 'RIGHT') {
    generator.addFunction('trimRight',
      'String trimRight(String str) {\n' +
      '  int end = str.length() - 1;\n' +
      '  while (end >= 0 && str.charAt(end) == \' \') end--;\n' +
      '  return str.substring(0, end + 1);\n' +
      '}'
    );
    code = 'trimRight(String(' + text + '))';
  }

  return [code, Arduino.ORDER_MEMBER];
};
Arduino.forBlock['text_isEmpty'] = function (block, generator) {
  const text = generator.valueToCode(block, 'VALUE', Arduino.ORDER_MEMBER) || '""';
  const code = '(' + text + '.length() == 0)';
  return [code, Arduino.ORDER_EQUALITY];
};
// ============================================================================================== 6-1. 색상 카테고리 ==========
Arduino.forBlock['colour_picker_custom'] = function (block, generator) {
  const colour = block.getFieldValue('COLOUR');
  return [`"${colour}"`, Arduino.ORDER_ATOMIC];
};

Arduino.forBlock['colour_random_custom'] = function (block, generator) {
  const funcName = 'getRandomColour';
  const functionCode = `
String ${funcName}() {
  int r = random(0, 256);
  int g = random(0, 256);  
  int b = random(0, 256);
  char colourHex[8];
  sprintf(colourHex, "#%02X%02X%02X", r, g, b);
  return String(colourHex);
}`;
  generator.definitions_['function_' + funcName] = functionCode;
  return [`${funcName}()`, Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['colour_rgb_custom'] = function (block, generator) {
  const red = generator.valueToCode(block, 'RED', Arduino.ORDER_COMMA) || '0';
  const green = generator.valueToCode(block, 'GREEN', Arduino.ORDER_COMMA) || '0';
  const blue = generator.valueToCode(block, 'BLUE', Arduino.ORDER_COMMA) || '0';

  const funcName = 'rgbToColour';
  const functionCode = `
String ${funcName}(int r, int g, int b) {
  r = constrain(r, 0, 255);
  g = constrain(g, 0, 255);
  b = constrain(b, 0, 255);
  char colourHex[8];
  sprintf(colourHex, "#%02X%02X%02X", r, g, b);
  return String(colourHex);
}`;
  generator.definitions_['function_' + funcName] = functionCode;
  return [`${funcName}(${red}, ${green}, ${blue})`, Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['colour_blend_custom'] = function (block, generator) {
  const colour1 = generator.valueToCode(block, 'COLOUR1', Arduino.ORDER_COMMA) || '"#FF0000"';
  const colour2 = generator.valueToCode(block, 'COLOUR2', Arduino.ORDER_COMMA) || '"#0000FF"';
  const ratio = generator.valueToCode(block, 'RATIO', Arduino.ORDER_COMMA) || '0.5';

  const funcName = 'blendColours';
  const functionCode = `
String ${funcName}(String col1, String col2, float ratio) {
  ratio = constrain(ratio, 0.0, 1.0);
  
  // Extract RGB from hex strings
  int r1 = (int)strtol(col1.substring(1,3).c_str(), NULL, 16);
  int g1 = (int)strtol(col1.substring(3,5).c_str(), NULL, 16);
  int b1 = (int)strtol(col1.substring(5,7).c_str(), NULL, 16);
  
  int r2 = (int)strtol(col2.substring(1,3).c_str(), NULL, 16);
  int g2 = (int)strtol(col2.substring(3,5).c_str(), NULL, 16);
  int b2 = (int)strtol(col2.substring(5,7).c_str(), NULL, 16);
  
  // Blend colours
  int r = r1 + (r2 - r1) * ratio;
  int g = g1 + (g2 - g1) * ratio;
  int b = b1 + (b2 - b1) * ratio;
  
  char colourHex[8];
  sprintf(colourHex, "#%02X%02X%02X", r, g, b);
  return String(colourHex);
}`;
  generator.definitions_['function_' + funcName] = functionCode;
  return [`${funcName}(${colour1}, ${colour2}, ${ratio})`, Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['colour_to_hex'] = function (block, generator) {
  const colour = generator.valueToCode(block, 'COLOUR', Arduino.ORDER_NONE) || '"#FF0000"';
  return [`String(${colour})`, Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['colour_to_rgb_values'] = function (block, generator) {
  const colour = generator.valueToCode(block, 'COLOUR', Arduino.ORDER_COMMA) || '"#FF0000"';
  const component = block.getFieldValue('COMPONENT');

  const funcName = 'extractColourComponent';
  const functionCode = `
int ${funcName}(String colour, String component) {
  if (component == "RED") {
    return (int)strtol(colour.substring(1,3).c_str(), NULL, 16);
  } else if (component == "GREEN") {
    return (int)strtol(colour.substring(3,5).c_str(), NULL, 16);
  } else if (component == "BLUE") {
    return (int)strtol(colour.substring(5,7).c_str(), NULL, 16);
  }
  return 0;
}`;
  generator.definitions_['function_' + funcName] = functionCode;
  return [`${funcName}(${colour}, "${component}")`, Arduino.ORDER_FUNCTION_CALL];
};

// =============================================================================================== 7. 변수 카테고리 ==========
Arduino.forBlock['number_variable_set'] = function (block, generator) {
  const varId = block.getFieldValue('VAR');
  let varName = block.workspace.getVariableById(varId).name;

  // 한글 변수명 로마자 변환
  if (window.IDEUtils && window.IDEUtils.romanizeKorean) {
    varName = window.IDEUtils.romanizeKorean(varName);
  }

  const value = generator.valueToCode(block, 'VALUE', Arduino.ORDER_ASSIGNMENT) || '0';

  if (!generator.globalVariables_) generator.globalVariables_ = {};
  const globalVarKey = 'var_' + varName;
  if (generator.definitions_[globalVarKey] === undefined) {
    generator.definitions_[globalVarKey] = 'float ' + varName + ';';
    generator.globalVariables_[varName] = 'float';
  }
  return varName + ' = ' + value + ';\n';
};

Arduino.forBlock['number_variable_get'] = function (block, generator) {
  const varId = block.getFieldValue('VAR');
  let varName = block.workspace.getVariableById(varId).name;

  // 한글 변수명 로마자 변환
  if (window.IDEUtils && window.IDEUtils.romanizeKorean) {
    varName = window.IDEUtils.romanizeKorean(varName);
  }

  if (!generator.globalVariables_) generator.globalVariables_ = {};
  const globalVarKey = 'var_' + varName;
  if (generator.definitions_[globalVarKey] === undefined) {
    generator.definitions_[globalVarKey] = 'float ' + varName + ';';
    generator.globalVariables_[varName] = 'float';
  }
  return [varName, Arduino.ORDER_ATOMIC];
};

Arduino.forBlock['string_variable_set'] = function (block, generator) {
  const varId = block.getFieldValue('VAR');
  let varName = block.workspace.getVariableById(varId).name;

  // 한글 변수명 로마자 변환
  if (window.IDEUtils && window.IDEUtils.romanizeKorean) {
    varName = window.IDEUtils.romanizeKorean(varName);
  }

  const value = generator.valueToCode(block, 'VALUE', Arduino.ORDER_ASSIGNMENT) || '""';

  if (!generator.globalVariables_) generator.globalVariables_ = {};
  const globalVarKey = 'var_' + varName;
  if (generator.definitions_[globalVarKey] === undefined) {
    generator.definitions_[globalVarKey] = 'String ' + varName + ';';
    generator.globalVariables_[varName] = 'String';
  }
  return varName + ' = String(' + value + ');\n';
};

Arduino.forBlock['string_variable_get'] = function (block, generator) {
  const varId = block.getFieldValue('VAR');
  let varName = block.workspace.getVariableById(varId).name;

  // 한글 변수명 로마자 변환
  if (window.IDEUtils && window.IDEUtils.romanizeKorean) {
    varName = window.IDEUtils.romanizeKorean(varName);
  }

  if (!generator.globalVariables_) generator.globalVariables_ = {};
  const globalVarKey = 'var_' + varName;
  if (generator.definitions_[globalVarKey] === undefined) {
    generator.definitions_[globalVarKey] = 'String ' + varName + ';';
    generator.globalVariables_[varName] = 'String';
  }
  return [varName, Arduino.ORDER_ATOMIC];
};

Arduino.forBlock['math_change'] = function (block, generator) {
  const varId = block.getFieldValue('VAR');
  let varName = block.workspace.getVariableById(varId).name;

  // 한글 변수명 로마자 변환
  if (window.IDEUtils && window.IDEUtils.romanizeKorean) {
    varName = window.IDEUtils.romanizeKorean(varName);
  }

  const delta = generator.valueToCode(block, 'DELTA', Arduino.ORDER_ADDITION) || '0';

  if (!generator.variableTypes_) generator.variableTypes_ = {};
  if (generator.variableTypes_[varName] === undefined) {
    generator.variableTypes_[varName] = 'float';
    generator.definitions_['var_' + varName] = 'float ' + varName + ';';
  }
  return varName + ' += ' + delta + ';\n';
};

// --- 기존 변수 블록 호환용 ---
Arduino.forBlock['variables_get'] = function (block, generator) {
  const varId = block.getFieldValue('VAR');
  let varName = block.workspace.getVariableById(varId).name;

  // 한글 변수명 로마자 변환
  if (window.IDEUtils && window.IDEUtils.romanizeKorean) {
    varName = window.IDEUtils.romanizeKorean(varName);
  }

  if (!generator.variableTypes_) generator.variableTypes_ = {};
  if (generator.variableTypes_[varName] === undefined) {
    generator.variableTypes_[varName] = 'float';
    generator.definitions_['var_' + varName] = 'float ' + varName + ';';
  }
  return [varName, Arduino.ORDER_ATOMIC];
};

Arduino.forBlock['variables_set'] = function (block, generator) {
  const varId = block.getFieldValue('VAR');
  let varName = block.workspace.getVariableById(varId).name;

  // 한글 변수명 로마자 변환
  if (window.IDEUtils && window.IDEUtils.romanizeKorean) {
    varName = window.IDEUtils.romanizeKorean(varName);
  }

  const value = generator.valueToCode(block, 'VALUE', Arduino.ORDER_ASSIGNMENT) || '0';
  if (!generator.variableTypes_) generator.variableTypes_ = {};
  if (generator.variableTypes_[varName] === undefined) {
    generator.variableTypes_[varName] = 'float';
    generator.definitions_['var_' + varName] = 'float ' + varName + ';';
  }
  return varName + ' = ' + value + ';\n';
};
// ============================================================= 7-1. 리스트 카테고리 ==========
Arduino.forBlock['array_create'] = function (block, generator) {
  let varName = block.getFieldValue('VAR_NAME') || 'myArray';
  // 한글 변수명 로마자 변환
  if (window.IDEUtils && window.IDEUtils.romanizeKorean) {
    varName = window.IDEUtils.romanizeKorean(varName);
  }

  const type = block.getFieldValue('TYPE') || 'int';
  const values = generator.valueToCode(block, 'VALUES', Arduino.ORDER_ATOMIC) || '0';

  // 값 문자열 정리 (따옴표 제거)
  const cleanValues = values.replace(/["']/g, '').trim();
  const valueArray = cleanValues.split(',').map(v => v.trim()).filter(v => v);
  const size = valueArray.length > 0 ? valueArray.length : 1;

  if (type === 'char') {
    // 각 값에 작은따옴표 추가
    const charValues = valueArray.map(v => {
      // 이미 작은따옴표가 있는 경우 제거 후 다시 추가
      const clean = v.replace(/^['"]|['"]$/g, '');

      // 단일 문자인 경우
      if (clean.length === 1) {
        return "'" + clean + "'";
      }
      // 여러 문자(문자열)인 경우 - 큰따옴표 사용
      else {
        return '"' + clean + '"';
      }
    }).join(', ');

    // 문자열 배열인 경우 (2글자 이상)
    if (valueArray.some(v => v.replace(/^['"]|['"]$/g, '').length > 1)) {
      generator.definitions_['array_' + varName] =
        'char* ' + varName + '[' + size + '] = {' + charValues + '};';
    }
    // 단일 문자 배열인 경우
    else {
      generator.definitions_['array_' + varName] =
        'char ' + varName + '[' + (size + 1) + '] = {' + charValues + ', \'\\0\'};';
    }
  } else {
    generator.definitions_['array_' + varName] =
      type + ' ' + varName + '[' + size + '] = {' + cleanValues + '};';
  }

  return '';
};

Arduino.forBlock['array_create_empty'] = function (block, generator) {
  let varName = block.getFieldValue('VAR_NAME') || 'myArray';
  // 한글 변수명 로마자 변환
  if (window.IDEUtils && window.IDEUtils.romanizeKorean) {
    varName = window.IDEUtils.romanizeKorean(varName);
  }

  const type = block.getFieldValue('TYPE') || 'int';
  const size = generator.valueToCode(block, 'SIZE', Arduino.ORDER_ATOMIC) || '10';

  if (type === 'char') {
    generator.definitions_['array_' + varName] =
      'char ' + varName + '[' + size + ' + 1];';
  } else {
    generator.definitions_['array_' + varName] =
      type + ' ' + varName + '[' + size + '];';
  }

  return '';
};

Arduino.forBlock['array_get'] = function (block, generator) {
  let varName = block.getFieldValue('VAR_NAME') || 'myArray';
  // 한글 변수명 로마자 변환
  if (window.IDEUtils && window.IDEUtils.romanizeKorean) {
    varName = window.IDEUtils.romanizeKorean(varName);
  }
  let index = generator.valueToCode(block, 'INDEX', Arduino.ORDER_ATOMIC) || '0';

  if (!index.startsWith('(int)')) {
    index = '(int)(' + index + ')';
  }

  return [varName + '[' + index + ']', Arduino.ORDER_ATOMIC];
};

Arduino.forBlock['array_set'] = function (block, generator) {
  let varName = block.getFieldValue('VAR_NAME') || 'myArray';
  // 한글 변수명 로마자 변환
  if (window.IDEUtils && window.IDEUtils.romanizeKorean) {
    varName = window.IDEUtils.romanizeKorean(varName);
  }
  let index = generator.valueToCode(block, 'INDEX', Arduino.ORDER_ATOMIC) || '0';
  const value = generator.valueToCode(block, 'VALUE', Arduino.ORDER_ATOMIC) || '0';

  if (!index.startsWith('(int)')) {
    index = '(int)(' + index + ')';
  }

  return varName + '[' + index + '] = ' + value + ';\n';
};

Arduino.forBlock['array_append'] = function (block, generator) {
  let varName = block.getFieldValue('VAR_NAME') || 'myArray';
  // 한글 변수명 로마자 변환
  if (window.IDEUtils && window.IDEUtils.romanizeKorean) {
    varName = window.IDEUtils.romanizeKorean(varName);
  }
  const value = generator.valueToCode(block, 'VALUE', Arduino.ORDER_ATOMIC) || '0';

  const funcName = 'appendArray_' + varName;
  const countVar = varName + '_count';

  if (!generator.definitions_['count_' + varName]) {
    generator.definitions_['count_' + varName] = 'int ' + countVar + ' = 0;';
  }

  generator.definitions_[funcName] =
    'void ' + funcName + '(int val) {\n' +
    '  int maxSize = sizeof(' + varName + ') / sizeof(' + varName + '[0]);\n' +
    '  if(' + countVar + ' < maxSize) {\n' +
    '    ' + varName + '[' + countVar + '++] = val;\n' +
    '  }\n' +
    '}';

  return funcName + '(' + value + ');\n';
};

Arduino.forBlock['array_remove'] = function (block, generator) {
  let varName = block.getFieldValue('VAR_NAME') || 'myArray';
  // 한글 변수명 로마자 변환
  if (window.IDEUtils && window.IDEUtils.romanizeKorean) {
    varName = window.IDEUtils.romanizeKorean(varName);
  }
  let index = generator.valueToCode(block, 'INDEX', Arduino.ORDER_ATOMIC) || '0';

  if (!index.startsWith('(int)')) {
    index = '(int)(' + index + ')';
  }

  const funcName = 'removeArray_' + varName;
  const countVar = varName + '_count';

  if (!generator.definitions_['count_' + varName]) {
    generator.definitions_['count_' + varName] = 'int ' + countVar + ' = 0;';
  }

  generator.definitions_[funcName] =
    'void ' + funcName + '(int idx) {\n' +
    '  if(idx >= 0 && idx < ' + countVar + ') {\n' +
    '    for(int i = idx; i < ' + countVar + ' - 1; i++) {\n' +
    '      ' + varName + '[i] = ' + varName + '[i + 1];\n' +
    '    }\n' +
    '    ' + countVar + '--;\n' +
    '  }\n' +
    '}';

  return funcName + '(' + index + ');\n';
};

Arduino.forBlock['array_find'] = function (block, generator) {
  let varName = block.getFieldValue('VAR_NAME') || 'myArray';
  // 한글 변수명 로마자 변환
  if (window.IDEUtils && window.IDEUtils.romanizeKorean) {
    varName = window.IDEUtils.romanizeKorean(varName);
  }
  const value = generator.valueToCode(block, 'VALUE', Arduino.ORDER_ATOMIC) || '0';

  const funcName = 'findArray_' + varName;

  generator.definitions_[funcName] =
    'int ' + funcName + '(int val) {\n' +
    '  int size = sizeof(' + varName + ') / sizeof(' + varName + '[0]);\n' +
    '  for(int i = 0; i < size; i++) {\n' +
    '    if(' + varName + '[i] == val) {\n' +
    '      return i;\n' +
    '    }\n' +
    '  }\n' +
    '  return -1;\n' +
    '}';

  return [funcName + '(' + value + ')', Arduino.ORDER_ATOMIC];
};

Arduino.forBlock['array_length'] = function (block, generator) {
  let varName = block.getFieldValue('VAR_NAME') || 'myArray';
  // 한글 변수명 로마자 변환
  if (window.IDEUtils && window.IDEUtils.romanizeKorean) {
    varName = window.IDEUtils.romanizeKorean(varName);
  }

  return ['(sizeof(' + varName + ') / sizeof(' + varName + '[0]))', Arduino.ORDER_ATOMIC];
};

Arduino.forBlock['array_clear'] = function (block, generator) {
  let varName = block.getFieldValue('VAR_NAME') || 'myArray';
  // 한글 변수명 로마자 변환
  if (window.IDEUtils && window.IDEUtils.romanizeKorean) {
    varName = window.IDEUtils.romanizeKorean(varName);
  }
  const value = generator.valueToCode(block, 'VALUE', Arduino.ORDER_ATOMIC) || '0';

  const funcName = 'clearArray_' + varName;

  generator.definitions_[funcName] =
    'void ' + funcName + '(int val) {\n' +
    '  int size = sizeof(' + varName + ') / sizeof(' + varName + '[0]);\n' +
    '  for(int i = 0; i < size; i++) {\n' +
    '    ' + varName + '[i] = val;\n' +
    '  }\n' +
    '}';

  return funcName + '(' + value + ');\n';
};

Arduino.forBlock['array_copy'] = function (block, generator) {
  let source = block.getFieldValue('SOURCE') || 'sourceArray';
  let dest = block.getFieldValue('DEST') || 'destArray';

  // 한글 변수명 로마자 변환
  if (window.IDEUtils && window.IDEUtils.romanizeKorean) {
    source = window.IDEUtils.romanizeKorean(source);
    dest = window.IDEUtils.romanizeKorean(dest);
  }

  const funcName = 'copyArray_' + source + '_to_' + dest;

  generator.definitions_[funcName] =
    'void ' + funcName + '() {\n' +
    '  int sourceSize = sizeof(' + source + ') / sizeof(' + source + '[0]);\n' +
    '  int destSize = sizeof(' + dest + ') / sizeof(' + dest + '[0]);\n' +
    '  int copySize = (sourceSize < destSize) ? sourceSize : destSize;\n' +
    '  for(int i = 0; i < copySize; i++) {\n' +
    '    ' + dest + '[i] = ' + source + '[i];\n' +
    '  }\n' +
    '}';

  return funcName + '();\n';
};

Arduino.forBlock['array_strlen'] = function (block, generator) {
  let varName = block.getFieldValue('VAR_NAME') || 'myArray';
  // 한글 변수명 로마자 변환
  if (window.IDEUtils && window.IDEUtils.romanizeKorean) {
    varName = window.IDEUtils.romanizeKorean(varName);
  }

  return ['strlen(' + varName + ')', Arduino.ORDER_ATOMIC];
};

Arduino.forBlock['array_contains'] = function (block, generator) {
  let varName = block.getFieldValue('VAR_NAME') || 'myArray';
  // 한글 변수명 로마자 변환
  if (window.IDEUtils && window.IDEUtils.romanizeKorean) {
    varName = window.IDEUtils.romanizeKorean(varName);
  }
  const value = generator.valueToCode(block, 'VALUE', Arduino.ORDER_ATOMIC) || '0';

  const funcName = 'containsArray_' + varName;

  generator.definitions_[funcName] =
    'bool ' + funcName + '(int val) {\n' +
    '  int size = sizeof(' + varName + ') / sizeof(' + varName + '[0]);\n' +
    '  for(int i = 0; i < size; i++) {\n' +
    '    if(' + varName + '[i] == val) {\n' +
    '      return true;\n' +
    '    }\n' +
    '  }\n' +
    '  return false;\n' +
    '}';

  return [funcName + '(' + value + ')', Arduino.ORDER_ATOMIC];
};


// ============================================================= 8. 함수 카테고리 ==========
Arduino.forBlock['procedures_ifreturn'] = function (block, generator) {
  const condition = generator.valueToCode(block, 'CONDITION', Arduino.ORDER_NONE) || 'false';
  const value = generator.valueToCode(block, 'VALUE', Arduino.ORDER_NONE) || '0';
  return 'if (' + condition + ') {\n  return ' + value + ';\n}\n';
};

Arduino.forBlock['procedures_ifreturn_void'] = function (block, generator) {
  const condition = generator.valueToCode(block, 'CONDITION', Arduino.ORDER_NONE) || 'false';
  return 'if (' + condition + ') {\n  return;\n}\n';
};

Arduino.forBlock['procedures_defnoreturn'] = function (block, generator) {
  let funcName = block.getFieldValue('NAME');
  // 한글 함수명 로마자 변환
  if (window.IDEUtils && window.IDEUtils.romanizeKorean) {
    funcName = window.IDEUtils.romanizeKorean(funcName);
  }
  let branch = generator.statementToCode(block, 'STACK') || '';
  const { args } = getProcedureParams(block);
  const code = 'void ' + funcName + '(' + args.join(', ') + ') {\n' + branch + '}\n';
  generator.definitions_['function_' + funcName] = code;
  return null;
};

Arduino.forBlock['procedures_defreturn'] = function (block, generator) {
  let funcName = block.getFieldValue('NAME');
  // 한글 함수명 로마자 변환
  if (window.IDEUtils && window.IDEUtils.romanizeKorean) {
    funcName = window.IDEUtils.romanizeKorean(funcName);
  }
  let branch = generator.statementToCode(block, 'STACK') || '';
  let returnValue = generator.valueToCode(block, 'RETURN', Arduino.ORDER_NONE) || '';
  if (returnValue) {
    returnValue = generator.INDENT + 'return ' + returnValue + ';\n';
  }
  let returnType = 'float';
  const { args } = getProcedureParams(block);
  const code = returnType + ' ' + funcName + '(' + args.join(', ') + ') {\n' + branch + returnValue + '}\n';
  generator.definitions_['function_' + funcName] = code;
  return null;
};

Arduino.forBlock['procedures_callnoreturn'] = function (block, generator) {
  let funcName = block.getFieldValue('NAME');
  // 한글 함수명 로마자 변환
  if (window.IDEUtils && window.IDEUtils.romanizeKorean) {
    funcName = window.IDEUtils.romanizeKorean(funcName);
  }
  const args = getProcedureCallArgs(block, generator);
  const code = funcName + '(' + args.join(', ') + ');\n';
  return code;
};

Arduino.forBlock['procedures_callreturn'] = function (block, generator) {
  let funcName = block.getFieldValue('NAME');
  // 한글 함수명 로마자 변환
  if (window.IDEUtils && window.IDEUtils.romanizeKorean) {
    funcName = window.IDEUtils.romanizeKorean(funcName);
  }
  const args = getProcedureCallArgs(block, generator);
  const code = funcName + '(' + args.join(', ') + ')';
  return [code, Arduino.ORDER_FUNCTION_CALL];
};

// =========================================== 9. A.디스플레이 카테고리 ===========================
// ========== LCD I2C 코드 생성 함수들 ==========
Arduino.forBlock['lcd_i2c_setup'] = function (block, generator) {
  const lcdNum = generator.valueToCode(block, 'LCD_NUM', Arduino.ORDER_ATOMIC) || '1';
  const address = block.getFieldValue('ADDRESS');
  const cols = block.getFieldValue('COLS');
  const rows = block.getFieldValue('ROWS');

  // 🔥 [NEW] 보드 분기 처리
  // 🔥 [NEW] 보드 분기 처리 (ESP32 및 Pico는 Wire 라이브러리 명시적 포함 권장)
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));

  if (isEsp32 || isPico) {
    generator.definitions_['include_wire'] = '#include <Wire.h>';
  }

  generator.definitions_['include_liquidcrystal_i2c'] = '#include <LiquidCrystal_I2C.h>';
  generator.definitions_['lcd_object_' + lcdNum] = 'LiquidCrystal_I2C lcd' + lcdNum + '(' + address + ', ' + cols + ', ' + rows + ');';
  generator.setups_['lcd_begin_' + lcdNum] = 'lcd' + lcdNum + '.begin();\n  lcd' + lcdNum + '.backlight();';

  return '';
};

Arduino.forBlock['lcd_i2c_print'] = function (block, generator) {
  const lcdNum = generator.valueToCode(block, 'LCD_NUM', Arduino.ORDER_ATOMIC) || '1';
  const row = generator.valueToCode(block, 'ROW', Arduino.ORDER_ATOMIC) || '0';
  const col = generator.valueToCode(block, 'COL', Arduino.ORDER_ATOMIC) || '0';
  const text = generator.valueToCode(block, 'TEXT', Arduino.ORDER_ATOMIC) || '"Hello"';

  let code = 'lcd' + lcdNum + '.setCursor(' + col + ', ' + row + ');\n';
  code += 'lcd' + lcdNum + '.print(' + text + ');\n';
  return code;
};

Arduino.forBlock['lcd_i2c_clear'] = function (block, generator) {
  const lcdNum = generator.valueToCode(block, 'LCD_NUM', Arduino.ORDER_ATOMIC) || '1';
  return 'lcd' + lcdNum + '.clear();\n';
};

Arduino.forBlock['lcd_i2c_cursor'] = function (block, generator) {
  const lcdNum = generator.valueToCode(block, 'LCD_NUM', Arduino.ORDER_ATOMIC) || '1';
  const mode = block.getFieldValue('CURSOR_MODE');

  switch (mode) {
    case 'ON': return 'lcd' + lcdNum + '.cursor();\n';
    case 'OFF': return 'lcd' + lcdNum + '.noCursor();\n';
    case 'BLINK': return 'lcd' + lcdNum + '.blink();\n';
    case 'NO_BLINK': return 'lcd' + lcdNum + '.noBlink();\n';
    default: return '';
  }
};

Arduino.forBlock['lcd_i2c_backlight'] = function (block, generator) {
  const lcdNum = generator.valueToCode(block, 'LCD_NUM', Arduino.ORDER_ATOMIC) || '1';
  const backlight = block.getFieldValue('BACKLIGHT');

  if (backlight === 'ON') {
    return 'lcd' + lcdNum + '.backlight();\n';
  } else {
    return 'lcd' + lcdNum + '.noBacklight();\n';
  }
};

Arduino.forBlock['lcd_i2c_scroll'] = function (block, generator) {
  const lcdNum = generator.valueToCode(block, 'LCD_NUM', Arduino.ORDER_ATOMIC) || '1';
  const direction = block.getFieldValue('DIRECTION');

  if (direction === 'LEFT') {
    return 'lcd' + lcdNum + '.scrollDisplayLeft();\n';
  } else {
    return 'lcd' + lcdNum + '.scrollDisplayRight();\n';
  }
};

Arduino.forBlock['lcd_i2c_display'] = function (block, generator) {
  const lcdNum = generator.valueToCode(block, 'LCD_NUM', Arduino.ORDER_ATOMIC) || '1';
  const display = block.getFieldValue('DISPLAY');

  if (display === 'ON') {
    return 'lcd' + lcdNum + '.display();\n';
  } else {
    return 'lcd' + lcdNum + '.noDisplay();\n';
  }
};


Arduino.forBlock['lcd_i2c_set_cursor'] = function (block, generator) {
  const lcdNum = generator.valueToCode(block, 'LCD_NUM', Arduino.ORDER_ATOMIC) || '1';
  const row = generator.valueToCode(block, 'ROW', Arduino.ORDER_ATOMIC) || '0';
  const col = generator.valueToCode(block, 'COL', Arduino.ORDER_ATOMIC) || '0';

  return 'lcd' + lcdNum + '.setCursor(' + col + ', ' + row + ');\n';
};

// ==========================  FND 코드 생성 함수들 ==================================
// TM1637Display 4-Digit Display 코드 생성기 (v2.0)

// 1. TM1637Display 설정 블록 (설정 블록에서만 #include 생성)
Arduino.forBlock['tm1637_setup'] = function (block, generator) {
  const clkPin = generator.valueToCode(block, 'CLK_PIN', Arduino.ORDER_ATOMIC) || '2';
  const dataPin = generator.valueToCode(block, 'DATA_PIN', Arduino.ORDER_ATOMIC) || '3';

  // 라이브러리 포함 및 객체 생성 (설정 블록에서만)
  generator.definitions_['include_tm1637display'] = '#include <TM1637Display.h>';
  generator.definitions_['tm1637display_object'] = `TM1637Display display(${clkPin}, ${dataPin});`;

  // 초기화 코드 (밝기 설정 추가)
  generator.setups_['tm1637display_init'] = 'display.setBrightness(0x0a);';

  return '';
};

// 2. 숫자 표시 블록
Arduino.forBlock['tm1637_display_number'] = function (block, generator) {
  const number = generator.valueToCode(block, 'NUMBER', Arduino.ORDER_ATOMIC) || '0';
  const decimalType = block.getFieldValue('DECIMAL_TYPE') || '0';
  const showMinus = block.getFieldValue('SHOW_MINUS') || 'true';

  if (decimalType === '2') {
    // 콜론 포함
    return `display.showNumberDecEx(${number}, 0x40, true);\n`;
  } else if (decimalType === '1') {
    // 소수점 1자리 (점 표시)
    return `display.showNumberDecEx(${number}, 0x20, true);\n`;
  } else {
    // 소수점 없음
    return `display.showNumberDec(${number}, true);\n`;
  }
};

// 3. 시계 표시 블록
Arduino.forBlock['tm1637_display_time'] = function (block, generator) {
  const hour = generator.valueToCode(block, 'HOUR', Arduino.ORDER_ATOMIC) || '12';
  const minute = generator.valueToCode(block, 'MINUTE', Arduino.ORDER_ATOMIC) || '0';
  const showColon = block.getFieldValue('SHOW_COLON') || 'true';

  let code = '';
  code += `int timeValue = (${hour}) * 100 + (${minute});\n`;
  if (showColon === 'true') {
    code += `display.showNumberDecEx(timeValue, 0x40, true);\n`;
  } else {
    code += `display.showNumberDec(timeValue, true);\n`;
  }

  return code;
};

// 4. 문자열 표시 블록 (라이브러리 내장 패턴 활용)
Arduino.forBlock['tm1637_display_text'] = function (block, generator) {
  const text = generator.valueToCode(block, 'TEXT', Arduino.ORDER_ATOMIC) || '"Hello"';
  const delay = generator.valueToCode(block, 'DELAY', Arduino.ORDER_ATOMIC) || '500';

  let code = '';
  // 확장된 문자를 세그먼트로 변환하는 함수 추가
  generator.definitions_['char_to_segment_func'] = `
uint8_t charToSegment(char c) {
  switch (c) {
    // 라이브러리 내장 패턴 활용
    case '0': return 0b00111111;
    case '1': return 0b00000110;
    case '2': return 0b01011011;
    case '3': return 0b01001111;
    case '4': return 0b01100110;
    case '5': return 0b01101101;
    case '6': return 0b01111101;
    case '7': return 0b00000111;
    case '8': return 0b01111111;
    case '9': return 0b01101111;
    case 'A': case 'a': return 0b01110111;
    case 'B': case 'b': return 0b01111100;
    case 'C': case 'c': return 0b00111001;
    case 'D': case 'd': return 0b01011110;
    case 'E': case 'e': return 0b01111001;
    case 'F': case 'f': return 0b01110001;
    // 추가 문자들
    case 'H': case 'h': return 0b01110110;
    case 'L': case 'l': return 0b00111000;
    case 'O': case 'o': return 0b00111111;
    case 'P': case 'p': return 0b01110011;
    case 'r': case 'R': return 0b01010000;
    case 'S': case 's': return 0b01101101;
    case 't': case 'T': return 0b01111000;
    case 'U': case 'u': return 0b00111110;
    case 'Y': case 'y': return 0b01101110;
    case ' ': return 0b00000000;
    case '-': return 0b01000000;
    default: return 0b00000000;
  }
}`;

  code += `String textStr = String(${text});\n`;
  code += `if(textStr.length() <= 4) {\n`;
  code += `  uint8_t segments[4] = {0, 0, 0, 0};\n`;
  code += `  for(int i = 0; i < textStr.length() && i < 4; i++) {\n`;
  code += `    char c = textStr.charAt(i);\n`;
  code += `    if(c >= '0' && c <= '9') {\n`;
  code += `      segments[i] = display.encodeDigit(c - '0');\n`;
  code += `    } else if(c >= 'A' && c <= 'F') {\n`;
  code += `      segments[i] = display.encodeDigit(c - 'A' + 10);\n`;
  code += `    } else if(c >= 'a' && c <= 'f') {\n`;
  code += `      segments[i] = display.encodeDigit(c - 'a' + 10);\n`;
  code += `    } else {\n`;
  code += `      segments[i] = charToSegment(c);\n`;
  code += `    }\n`;
  code += `  }\n`;
  code += `  display.setSegments(segments);\n`;
  code += `} else {\n`;
  code += `  for(int i = 0; i <= (int)textStr.length() - 4; i++) {\n`;
  code += `    uint8_t segments[4] = {0, 0, 0, 0};\n`;
  code += `    for(int j = 0; j < 4; j++) {\n`;
  code += `      char c = textStr.charAt(i + j);\n`;
  code += `      if(c >= '0' && c <= '9') {\n`;
  code += `        segments[j] = display.encodeDigit(c - '0');\n`;
  code += `      } else if(c >= 'A' && c <= 'F') {\n`;
  code += `        segments[j] = display.encodeDigit(c - 'A' + 10);\n`;
  code += `      } else if(c >= 'a' && c <= 'f') {\n`;
  code += `        segments[j] = display.encodeDigit(c - 'a' + 10);\n`;
  code += `      } else {\n`;
  code += `        segments[j] = charToSegment(c);\n`;
  code += `      }\n`;
  code += `    }\n`;
  code += `    display.setSegments(segments);\n`;
  code += `    delay(${delay});\n`;
  code += `  }\n`;
  code += `}\n`;

  return code;
};

// 5. 개별 자리 표시 블록
Arduino.forBlock['tm1637_display_digit'] = function (block, generator) {
  const position = block.getFieldValue('POSITION') || '0';
  const digit = generator.valueToCode(block, 'DIGIT', Arduino.ORDER_ATOMIC) || '0';

  let code = '';
  code += `uint8_t segmentData = display.encodeDigit(${digit});\n`;
  code += `display.setSegments(&segmentData, 1, ${position});\n`;

  return code;
};

// 6. 화면 지우기 블록
Arduino.forBlock['tm1637_clear'] = function (block, generator) {
  return 'display.clear();\n';
};

// 7. 밝기 설정 블록
Arduino.forBlock['tm1637_brightness'] = function (block, generator) {
  const brightness = block.getFieldValue('BRIGHTNESS') || '2';

  return `display.setBrightness(${brightness});\n`;
};

// 8. 콜론 제어 블록
Arduino.forBlock['tm1637_colon'] = function (block, generator) {
  const state = block.getFieldValue('STATE') || 'true';

  // 현재 시간 값을 유지하면서 콜론만 제어
  let code = '';
  if (state === 'true') {
    code += `display.showNumberDecEx(1234, 0x40, true);  // 콜론 표시 (예시: 12:34)\n`;
  } else {
    code += `display.showNumberDec(1234, true);  // 콜론 숨김 (예시: 1234)\n`;
  }

  return code;
};
// ===================== NeoPixel (WS2812/B) Generators =====================

Arduino.forBlock['neopixel_setup'] = function (block, generator) {
  const stripNum = block.getFieldValue('STRIP_NUM') || 1;
  const pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '6';
  const count = generator.valueToCode(block, 'LED_COUNT', Arduino.ORDER_ATOMIC) || '8';
  const order = block.getFieldValue('ORDER') || 'NEO_GRB + NEO_KHZ800';

  // include & 객체 정의는 설정 블록에서만!
  generator.definitions_['include_neopixel'] = '#include "Adafruit_NeoPixel.h"';
  generator.definitions_['neopixel_object_' + stripNum] =
    'Adafruit_NeoPixel neo' + stripNum + '(' + count + ', ' + pin + ', ' + order + ');';

  // 초기화(begin/clear/show)
  generator.setups_['neopixel_begin_' + stripNum] =
    'neo' + stripNum + '.begin();\n  neo' + stripNum + '.clear();\n  neo' + stripNum + '.show();';

  return '';
};

Arduino.forBlock['neopixel_set_rgb'] = function (block, generator) {
  const stripNum = generator.valueToCode(block, 'STRIP_NUM', Arduino.ORDER_ATOMIC) || '1';
  const ledIndex = generator.valueToCode(block, 'LED_INDEX', Arduino.ORDER_ATOMIC) || '1';
  const r = generator.valueToCode(block, 'R', Arduino.ORDER_ATOMIC) || '0';
  const g = generator.valueToCode(block, 'G', Arduino.ORDER_ATOMIC) || '0';
  const b = generator.valueToCode(block, 'B', Arduino.ORDER_ATOMIC) || '0';

  const idxExpr = '(' + ledIndex + ' - 1)'; // 1-based → 0-based
  const code =
    'neo' + stripNum + '.setPixelColor(' + idxExpr + ', Adafruit_NeoPixel::Color(' + r + ', ' + g + ', ' + b + '));\n';
  return code;
};

Arduino.forBlock['neopixel_set_rgbw'] = function (block, generator) {
  const stripNum = generator.valueToCode(block, 'STRIP_NUM', Arduino.ORDER_ATOMIC) || '1';
  const ledIndex = generator.valueToCode(block, 'LED_INDEX', Arduino.ORDER_ATOMIC) || '1';
  const r = generator.valueToCode(block, 'R', Arduino.ORDER_ATOMIC) || '0';
  const g = generator.valueToCode(block, 'G', Arduino.ORDER_ATOMIC) || '0';
  const b = generator.valueToCode(block, 'B', Arduino.ORDER_ATOMIC) || '0';
  const w = generator.valueToCode(block, 'W', Arduino.ORDER_ATOMIC) || '0';

  const idxExpr = '(' + ledIndex + ' - 1)';
  const code =
    'neo' + stripNum + '.setPixelColor(' + idxExpr + ', Adafruit_NeoPixel::Color(' + r + ', ' + g + ', ' + b + ', ' + w + '));\n';
  return code;
};

Arduino.forBlock['neopixel_brightness'] = function (block, generator) {
  const stripNum = generator.valueToCode(block, 'STRIP_NUM', Arduino.ORDER_ATOMIC) || '1';
  const bri = generator.valueToCode(block, 'BRI', Arduino.ORDER_ATOMIC) || '50';
  return 'neo' + stripNum + '.setBrightness(' + bri + ');\n';
};

Arduino.forBlock['neopixel_show'] = function (block, generator) {
  const stripNum = generator.valueToCode(block, 'STRIP_NUM', Arduino.ORDER_ATOMIC) || '1';
  return 'neo' + stripNum + '.show();\n';
};

Arduino.forBlock['neopixel_clear'] = function (block, generator) {
  const stripNum = generator.valueToCode(block, 'STRIP_NUM', Arduino.ORDER_ATOMIC) || '1';
  return 'neo' + stripNum + '.clear();\n';
};

Arduino.forBlock['neopixel_fill_rgb_all'] = function (block, generator) {
  const stripNum = generator.valueToCode(block, 'STRIP_NUM', Arduino.ORDER_ATOMIC) || '1';
  const r = generator.valueToCode(block, 'R', Arduino.ORDER_ATOMIC) || '0';
  const g = generator.valueToCode(block, 'G', Arduino.ORDER_ATOMIC) || '0';
  const b = generator.valueToCode(block, 'B', Arduino.ORDER_ATOMIC) || '0';
  // numPixels()로 전체 루프
  const code = `
for (uint16_t i = 0; i < neo${stripNum}.numPixels(); i++) {
  neo${stripNum}.setPixelColor(i, Adafruit_NeoPixel::Color(${r}, ${g}, ${b}));
}
`;
  return code;
};
// ===================== NeoPixel (WS2812/B) — Advanced Generators =====================

// 공용 헬퍼: 컬러 휠(0~255 → RGB) — 한 번만 정의
function ensureNeoWheelHelper(generator) {
  if (!generator.definitions_['function_neopixel_wheel']) {
    generator.definitions_['function_neopixel_wheel'] =
      `uint32_t _neoWheel(byte WheelPos) {
  WheelPos = 255 - WheelPos;
  if (WheelPos < 85) {
    return ((255 - WheelPos * 3) << 16) | (0 << 8) | (WheelPos * 3);
  }
  if (WheelPos < 170) {
    WheelPos -= 85;
    return (0 << 16) | (WheelPos * 3 << 8) | (255 - WheelPos * 3);
  }
  WheelPos -= 170;
  return (WheelPos * 3 << 16) | (255 - WheelPos * 3 << 8) | 0;
}`;
  }
}

// 공용 헬퍼: 스트립 전체 채우기
function ensureNeoFillAllHelper(generator) {
  if (!generator.definitions_['function_neopixel_fillall']) {
    generator.definitions_['function_neopixel_fillall'] =
      `void _neoFillAll(Adafruit_NeoPixel &neo, uint8_t r, uint8_t g, uint8_t b) {
  for (uint16_t i = 0; i < neo.numPixels(); i++) {
    neo.setPixelColor(i, Adafruit_NeoPixel::Color(r,g,b));
  }
}`;
  }
}

// Rainbow
Arduino.forBlock['neopixel_anim_rainbow'] = function (block, generator) {
  const stripNum = generator.valueToCode(block, 'STRIP_NUM', Arduino.ORDER_ATOMIC) || '1';
  const wait = generator.valueToCode(block, 'WAIT', Arduino.ORDER_ATOMIC) || '20';
  const loops = generator.valueToCode(block, 'LOOPS', Arduino.ORDER_ATOMIC) || '1';

  ensureNeoWheelHelper(generator);

  const code =
    `for (int _loop = 0; _loop < ${loops}; _loop++) {
  for (uint16_t j = 0; j < 256; j++) {
    for (uint16_t i = 0; i < neo${stripNum}.numPixels(); i++) {
      uint32_t c = _neoWheel((i + j) & 255);
      neo${stripNum}.setPixelColor(i, c);
    }
    neo${stripNum}.show();
    delay(${wait});
  }
}
`;
  return code;
};

// Shift (좌/우로 한 칸씩 회전)
Arduino.forBlock['neopixel_anim_shift'] = function (block, generator) {
  const stripNum = generator.valueToCode(block, 'STRIP_NUM', Arduino.ORDER_ATOMIC) || '1';
  const dir = block.getFieldValue('DIR') || 'LEFT';
  const steps = generator.valueToCode(block, 'STEPS', Arduino.ORDER_ATOMIC) || '16';
  const wait = generator.valueToCode(block, 'WAIT', Arduino.ORDER_ATOMIC) || '50';

  const tmpVar = '_tmpColor';
  generator.definitions_['var_neopixel_tmpcolor'] = 'uint32_t ' + tmpVar + ';';

  let body;
  if (dir === 'LEFT') {
    body =
      `for (uint16_t s = 0; s < ${steps}; s++) {
  ${tmpVar} = neo${stripNum}.getPixelColor(0);
  for (uint16_t i = 0; i < neo${stripNum}.numPixels()-1; i++) {
    neo${stripNum}.setPixelColor(i, neo${stripNum}.getPixelColor(i+1));
  }
  neo${stripNum}.setPixelColor(neo${stripNum}.numPixels()-1, ${tmpVar});
  neo${stripNum}.show();
  delay(${wait});
}
`;
  } else {
    body =
      `for (uint16_t s = 0; s < ${steps}; s++) {
  ${tmpVar} = neo${stripNum}.getPixelColor(neo${stripNum}.numPixels()-1);
  for (int16_t i = neo${stripNum}.numPixels()-1; i > 0; i--) {
    neo${stripNum}.setPixelColor(i, neo${stripNum}.getPixelColor(i-1));
  }
  neo${stripNum}.setPixelColor(0, ${tmpVar});
  neo${stripNum}.show();
  delay(${wait});
}
`;
  }
  return body;
};

// Breathe (밝기 펄스)
Arduino.forBlock['neopixel_anim_breathe'] = function (block, generator) {
  const stripNum = generator.valueToCode(block, 'STRIP_NUM', Arduino.ORDER_ATOMIC) || '1';
  const r = generator.valueToCode(block, 'R', Arduino.ORDER_ATOMIC) || '0';
  const g = generator.valueToCode(block, 'G', Arduino.ORDER_ATOMIC) || '0';
  const b = generator.valueToCode(block, 'B', Arduino.ORDER_ATOMIC) || '255';
  const minB = generator.valueToCode(block, 'MIN_BRI', Arduino.ORDER_ATOMIC) || '10';
  const maxB = generator.valueToCode(block, 'MAX_BRI', Arduino.ORDER_ATOMIC) || '180';
  const step = generator.valueToCode(block, 'STEP', Arduino.ORDER_ATOMIC) || '5';
  const wait = generator.valueToCode(block, 'WAIT', Arduino.ORDER_ATOMIC) || '20';

  ensureNeoFillAllHelper(generator);

  const code =
    `_neoFillAll(neo${stripNum}, ${r}, ${g}, ${b});
for (int _b = ${minB}; _b <= ${maxB}; _b += ${step}) {
  neo${stripNum}.setBrightness(_b);
  neo${stripNum}.show();
  delay(${wait});
}
for (int _b = ${maxB}; _b >= ${minB}; _b -= ${step}) {
  neo${stripNum}.setBrightness(_b);
  neo${stripNum}.show();
  delay(${wait});
}
`;
  return code;
};

// ============================================= 10. B.고급 디스플레이 카테고리 =====================
// ===================== OLED SH1106 Generators =====================

// ===================== SH110X OLED Generators =====================

// 1) 설정 (I2C 전용)
Arduino.forBlock['sh110x_setup_i2c'] = function (block, generator) {
  const num = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const type = block.getFieldValue('TYPE') || 'SH1106G';
  const addr = block.getFieldValue('ADDR') || '0x3C';
  const rst = generator.valueToCode(block, 'RST', Arduino.ORDER_ATOMIC) || '-1';
  const width = generator.valueToCode(block, 'WIDTH', Arduino.ORDER_ATOMIC) || '128';
  const height = generator.valueToCode(block, 'HEIGHT', Arduino.ORDER_ATOMIC) || '64';

  // 이 블록에서만 include 생성
  // 🔥 [NEW] 보드 분기 처리 (ESP32 및 Pico는 Wire 라이브러리 명시적 포함 권장)
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));

  if (isEsp32 || isPico) {
    generator.definitions_['include_wire_sh110x'] = '#include <Wire.h>';
  }
  generator.definitions_['include_gfx'] = '#include "Adafruit_GFX.h"';
  generator.definitions_['include_grayoled'] = '#include "Adafruit_GrayOLED.h"';
  generator.definitions_['include_sh110x'] = '#include "Adafruit_SH110X.h"';

  // 전역 객체
  generator.definitions_['sh110x_obj_' + num] = `Adafruit_${type} oled${num}(${width}, ${height}, &Wire, ${rst});`;

  // setup
  generator.setups_['wire_begin'] = 'Wire.begin();';
  generator.setups_['sh110x_begin_' + num] =
    `oled${num}.begin(${addr}, true);
  oled${num}.clearDisplay();
  oled${num}.display();`;

  return '';
};

// 2) 화면 표시
Arduino.forBlock['sh110x_display'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  return `oled${n}.display();\n`;
};

// 3) 화면 지우기
Arduino.forBlock['sh110x_clear'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  return `oled${n}.clearDisplay();\n`;
};

// 4) 화면 제어
Arduino.forBlock['sh110x_control'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const action = block.getFieldValue('ACTION') || 'NORMAL';
  let code = '';

  switch (action) {
    case 'INVERT':
      code = `oled${n}.invertDisplay(true);\n`;
      break;
    case 'NORMAL':
      code = `oled${n}.invertDisplay(false);\n`;
      break;
    case 'ON':
      code = `oled${n}.oled_command(SH110X_DISPLAYON);\n`;
      break;
    case 'OFF':
      code = `oled${n}.oled_command(SH110X_DISPLAYOFF);\n`;
      break;
    default:
      code = `oled${n}.invertDisplay(false);\n`;
      break;
  }
  return code;
};

// 5) 픽셀 그리기
Arduino.forBlock['sh110x_pixel'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const x = generator.valueToCode(block, 'X', Arduino.ORDER_ATOMIC) || '0';
  const y = generator.valueToCode(block, 'Y', Arduino.ORDER_ATOMIC) || '0';
  const c = block.getFieldValue('COL') || 'SH110X_WHITE';
  return `oled${n}.drawPixel(${x}, ${y}, ${c});\n`;
};

// 6) 선 그리기
Arduino.forBlock['sh110x_line'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const x1 = generator.valueToCode(block, 'X1', Arduino.ORDER_ATOMIC) || '0';
  const y1 = generator.valueToCode(block, 'Y1', Arduino.ORDER_ATOMIC) || '0';
  const x2 = generator.valueToCode(block, 'X2', Arduino.ORDER_ATOMIC) || '127';
  const y2 = generator.valueToCode(block, 'Y2', Arduino.ORDER_ATOMIC) || '63';
  const c = block.getFieldValue('COL') || 'SH110X_WHITE';
  return `oled${n}.drawLine(${x1}, ${y1}, ${x2}, ${y2}, ${c});\n`;
};

// 7) 사각형 그리기
Arduino.forBlock['sh110x_rect'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const x = generator.valueToCode(block, 'X', Arduino.ORDER_ATOMIC) || '0';
  const y = generator.valueToCode(block, 'Y', Arduino.ORDER_ATOMIC) || '0';
  const w = generator.valueToCode(block, 'W', Arduino.ORDER_ATOMIC) || '10';
  const h = generator.valueToCode(block, 'H', Arduino.ORDER_ATOMIC) || '10';
  const fill = block.getFieldValue('FILL') === '1';
  const c = block.getFieldValue('COL') || 'SH110X_WHITE';
  return fill
    ? `oled${n}.fillRect(${x}, ${y}, ${w}, ${h}, ${c});\n`
    : `oled${n}.drawRect(${x}, ${y}, ${w}, ${h}, ${c});\n`;
};

// 8) 원 그리기
Arduino.forBlock['sh110x_circle'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const x = generator.valueToCode(block, 'X', Arduino.ORDER_ATOMIC) || '64';
  const y = generator.valueToCode(block, 'Y', Arduino.ORDER_ATOMIC) || '32';
  const r = generator.valueToCode(block, 'R', Arduino.ORDER_ATOMIC) || '10';
  const fill = block.getFieldValue('FILL') === '1';
  const c = block.getFieldValue('COL') || 'SH110X_WHITE';
  return fill
    ? `oled${n}.fillCircle(${x}, ${y}, ${r}, ${c});\n`
    : `oled${n}.drawCircle(${x}, ${y}, ${r}, ${c});\n`;
};

// 9) 텍스트 출력
Arduino.forBlock['sh110x_text'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const txt = generator.valueToCode(block, 'TXT', Arduino.ORDER_ATOMIC) || '"Hello OLED"';
  const x = generator.valueToCode(block, 'X', Arduino.ORDER_ATOMIC) || '0';
  const y = generator.valueToCode(block, 'Y', Arduino.ORDER_ATOMIC) || '0';
  const sz = generator.valueToCode(block, 'SIZE', Arduino.ORDER_ATOMIC) || '1';
  const col = block.getFieldValue('COL') || 'SH110X_WHITE';
  const wrap = block.getFieldValue('WRAP') === '1' ? 'true' : 'false';

  return `oled${n}.setTextSize(${sz});
oled${n}.setTextColor(${col});
oled${n}.setTextWrap(${wrap});
oled${n}.setCursor(${x}, ${y});
oled${n}.print(${txt});
`;
};

// 10) 밝기 조절
Arduino.forBlock['sh110x_contrast'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const contrast = generator.valueToCode(block, 'CONTRAST', Arduino.ORDER_ATOMIC) || '127';
  return `oled${n}.setContrast(${contrast});\n`;
};


// SH1106 OLED 한글 라이브러리 코드 생성기
// 1. 설정 블록 코드 생성기
Arduino.forBlock['sh1106_setup'] = function (block, generator) {
  // 필요한 헤더 파일들 포함
  // 🔥 [NEW] 보드 분기 처리
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));
  if (isEsp32 || isPico) {
    generator.definitions_['include_wire_sh1106'] = '#include <Wire.h>';
  }
  generator.definitions_['include_oled_han'] = '#include "OLED_HAN_UNO_SH1106.h"';
  // OLED 객체 생성
  generator.definitions_['oled_object'] = 'OLED_uno_lib oled;';
  // 초기화 코드
  generator.setups_['oled_init'] = 'oled.init();';

  return '';
};

// 2. 화면 지우기 코드 생성기
Arduino.forBlock['sh1106_clear'] = function (block, generator) {
  return 'oled.clearDisplay();\n';
};

// 3. 텍스트 출력 코드 생성기
Arduino.forBlock['sh1106_print_text'] = function (block, generator) {
  const text = generator.valueToCode(block, 'TEXT', Arduino.ORDER_ATOMIC) || '""';
  const x = generator.valueToCode(block, 'X', Arduino.ORDER_ATOMIC) || '0';
  const y = generator.valueToCode(block, 'Y', Arduino.ORDER_ATOMIC) || '0';
  const style = block.getFieldValue('STYLE') || 'NORMAL';

  const normalInverse = style === 'NORMAL' ? '1' : '0';

  return `oled.puts(${x}, ${y}, (unsigned char*)String(${text}).c_str(), ${normalInverse});\n`;
};

// 4. 큰 숫자 출력 코드 생성기
Arduino.forBlock['sh1106_large_number'] = function (block, generator) {
  const number = generator.valueToCode(block, 'NUMBER', Arduino.ORDER_ATOMIC) || '0';
  const x = generator.valueToCode(block, 'X', Arduino.ORDER_ATOMIC) || '0';
  const y = generator.valueToCode(block, 'Y', Arduino.ORDER_ATOMIC) || '0';
  const style = block.getFieldValue('STYLE') || 'NORMAL';

  const normalInverse = style === 'NORMAL' ? '1' : '0';

  // 숫자를 문자로 변환하고 각 자릿수를 그리는 코드
  let code = `{
  String numStr = String(${number});
  int xPos = ${x};
  for (int i = 0; i < numStr.length(); i++) {
    char digit = numStr[i];
    int digitValue;
    if (digit >= '0' && digit <= '9') {
      digitValue = digit - '0';
    } else if (digit == ':') {
      digitValue = 10;
    } else {
      digitValue = -1; // blank
    }
    oled.drawBitmap32(xPos, ${y}, digitValue, ${normalInverse});
    xPos += 4; // 각 숫자 간격
  }
}\n`;

  return code;
};

// 5. 바 그래프 코드 생성기
Arduino.forBlock['sh1106_draw_bar'] = function (block, generator) {
  const x = generator.valueToCode(block, 'X', Arduino.ORDER_ATOMIC) || '0';
  const y = generator.valueToCode(block, 'Y', Arduino.ORDER_ATOMIC) || '0';
  const value = generator.valueToCode(block, 'VALUE', Arduino.ORDER_ATOMIC) || '0';

  return `oled.drawBar(${x}, ${y}, ${value});\n`;
};
/* ===================== HT16K33 Generators ===================== */

// 설정: 이 블록에서만 include/객체/초기화
Arduino.forBlock['ht16k33_setup'] = function (block, generator) {
  const num = block.getFieldValue('NUM') || 1;
  const dev = block.getFieldValue('DEV') || 'M8x8';
  const addr = block.getFieldValue('ADDR') || '0x70';
  const bri = generator.valueToCode(block, 'BRI', Arduino.ORDER_ATOMIC) || '15';
  const blink = block.getFieldValue('BLINK') || 'HT16K33_BLINK_OFF';
  const rot = block.getFieldValue('ROT') || '0';

  generator.definitions_['include_gfx'] = '#include "Adafruit_GFX.h"';
  generator.definitions_['include_bp'] = '#include "Adafruit_LEDBackpack.h"';

  let cls = 'Adafruit_8x8matrix';
  if (dev === 'M8x16') cls = 'Adafruit_8x16matrix';
  else if (dev === 'M8x16mini') cls = 'Adafruit_8x16minimatrix';
  else if (dev === 'B8x8') cls = 'Adafruit_BicolorMatrix';

  generator.definitions_['ht16_obj_' + num] = `${cls} ht16_${num};`;
  generator.setups_['ht16_begin_' + num] =
    `ht16_${num}.begin(${addr});
ht16_${num}.setBrightness(${bri});
ht16_${num}.blinkRate(${blink});
ht16_${num}.setRotation(${rot});
ht16_${num}.clear();
ht16_${num}.writeDisplay();`;
  return '';
};

// 공통 제어
Arduino.forBlock['ht16k33_set_brightness'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const b = generator.valueToCode(block, 'BRI', Arduino.ORDER_ATOMIC) || '15';
  return `ht16_${n}.setBrightness(${b});\n`;
};
Arduino.forBlock['ht16k33_set_blink'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const br = block.getFieldValue('BLINK') || 'HT16K33_BLINK_OFF';
  return `ht16_${n}.blinkRate(${br});\n`;
};

// 단색 픽셀
Arduino.forBlock['ht16k33_pixel'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const r = generator.valueToCode(block, 'ROW', Arduino.ORDER_ATOMIC) || '0';
  const c = generator.valueToCode(block, 'COL', Arduino.ORDER_ATOMIC) || '0';
  const on = block.getFieldValue('ON') === '1' ? '1' : '0';

  // 사용자의 요청에 따라 0,0 시작 좌표계로 통일 (오프셋 제거)
  return `ht16_${n}.drawPixel(${c},${r},${on});\n`;
};

// 양색 픽셀
Arduino.forBlock['ht16k33_bicolor_pixel'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const r = generator.valueToCode(block, 'ROW', Arduino.ORDER_ATOMIC) || '0';
  const c = generator.valueToCode(block, 'COL', Arduino.ORDER_ATOMIC) || '0';
  const col = block.getFieldValue('COLR') || 'LED_RED';

  return `ht16_${n}.drawPixel(${c},${r},${col});\n`;
};

// 패턴 8×8
Arduino.forBlock['ht16k33_pattern_8x8'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const bits = block.getFieldValue('MAT') || ''.padStart(64, '0');
  const code =
    `{
  const char* __b = "${bits}";
  for(uint8_t __y=0; __y<8; __y++){
    for(uint8_t __x=0; __x<8; __x++){
      uint16_t __i = __y*8+__x;
      ht16_${n}.drawPixel(__x, __y, (__b[__i]=='1')?1:0);
    }
  }
}
`;
  return code;
};

// 패턴 8×16  (가로 16 × 세로 8 편집값을 그대로 그리기)
Arduino.forBlock['ht16k33_pattern_8x16'] = function (block, generator) {
  const isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const bits = block.getFieldValue('MAT') || "0".repeat(16 * 8); // 128비트 문자열

  // ESP32에서 오른쪽 매트릭스가 안 나오는 문제는 drawPixel의 좌표 범위 문제일 가능성이 큼
  // Adafruit_8x16matrix 라이브러리가 ESP32에서 내부적으로 어떻게 매핑되는지 확인 필요
  // 일단 표준적인 루프를 생성하되, ESP32일 경우 writeDisplay를 더 명확히 호출하도록 보장
  const code =
    `{
  const char* __b = "${bits}";
  for (uint8_t __y = 0; __y < 8; __y++) {         // 행: 0..7
    for (uint8_t __x = 0; __x < 16; __x++) {      // 열: 0..15
      uint16_t __i = __y * 16 + __x;              // 인덱스: (행*16+열)
      ht16_${n}.drawPixel(__x, __y, (__b[__i] == '1') ? 1 : 0);
    }
  }
}
`;
  return code;
};

// GFX 도형
Arduino.forBlock['ht16k33_line'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const r1 = generator.valueToCode(block, 'R1', Arduino.ORDER_ATOMIC) || '0';
  const c1 = generator.valueToCode(block, 'C1', Arduino.ORDER_ATOMIC) || '0';
  const r2 = generator.valueToCode(block, 'R2', Arduino.ORDER_ATOMIC) || '7';
  const c2 = generator.valueToCode(block, 'C2', Arduino.ORDER_ATOMIC) || '7';

  return `ht16_${n}.drawLine(${c1},${r1},${c2},${r2},1);\n`;
};
Arduino.forBlock['ht16k33_circle'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const r = generator.valueToCode(block, 'R', Arduino.ORDER_ATOMIC) || '3';
  const c = generator.valueToCode(block, 'C', Arduino.ORDER_ATOMIC) || '3';
  const rad = generator.valueToCode(block, 'RAD', Arduino.ORDER_ATOMIC) || '3';

  return `ht16_${n}.drawCircle(${c},${r},${rad},1);\n`;
};
Arduino.forBlock['ht16k33_rect'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const r = generator.valueToCode(block, 'R', Arduino.ORDER_ATOMIC) || '0';
  const c = generator.valueToCode(block, 'C', Arduino.ORDER_ATOMIC) || '0';
  const w = generator.valueToCode(block, 'W', Arduino.ORDER_ATOMIC) || '8';
  const h = generator.valueToCode(block, 'H', Arduino.ORDER_ATOMIC) || '8';
  const fill = block.getFieldValue('FILL') === '1';

  return fill
    ? `ht16_${n}.fillRect(${c},${r},${w},${h},1);\n`
    : `ht16_${n}.drawRect(${c},${r},${w},${h},1);\n`;
};

// 출력/지우기/스크롤
Arduino.forBlock['ht16k33_show'] = (b, g) => { const n = g.valueToCode(b, 'NUM', Arduino.ORDER_ATOMIC) || '1'; return `ht16_${n}.writeDisplay();\n`; };
Arduino.forBlock['ht16k33_clear'] = (b, g) => { const n = g.valueToCode(b, 'NUM', Arduino.ORDER_ATOMIC) || '1'; return `ht16_${n}.clear();\n`; };

Arduino.forBlock['ht16k33_scroll_text'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const s = generator.valueToCode(block, 'TEXT', Arduino.ORDER_ATOMIC) || '"Hello"';  // 변경된 부분
  const dir = block.getFieldValue('DIR') || 'LEFT';
  const sec = generator.valueToCode(block, 'SEC', Arduino.ORDER_ATOMIC) || '0.2';
  const code =
    `{
  String __str = String(${s});
  const char* __s = __str.c_str();
  int16_t __w=strlen(__s)*6; int __d=(int)(${sec}*1000);
  ht16_${n}.setTextSize(1); ht16_${n}.setTextColor(1); ht16_${n}.setTextWrap(false);
  if(strcmp("${dir}","LEFT")==0){
    for(int16_t __x=8; __x>-__w; __x--){ ht16_${n}.clear(); ht16_${n}.setCursor(__x,0); ht16_${n}.print(__s); ht16_${n}.writeDisplay(); delay(__d); }
  }else{
    for(int16_t __x=-__w; __x<=8; __x++){ ht16_${n}.clear(); ht16_${n}.setCursor(__x,0); ht16_${n}.print(__s); ht16_${n}.writeDisplay(); delay(__d); }
  }
}
`;
  return code;
};

// ===================== SSD1306 OLED Generators =====================

// 1) 설정 블록 (I2C)
Arduino.forBlock['ssd1306_setup_i2c'] = function (block, generator) {
  const num = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const width = block.getFieldValue('WIDTH') || '128';
  const height = block.getFieldValue('HEIGHT') || '64';
  const addr = block.getFieldValue('ADDR') || '0x3C';
  const rst = generator.valueToCode(block, 'RST', Arduino.ORDER_ATOMIC) || '-1';

  // 이 블록에서만 include 생성
  generator.definitions_['include_gfx'] = '#include <Adafruit_GFX.h>';
  generator.definitions_['include_ssd1306'] = '#include <Adafruit_SSD1306.h>';

  // 전역 객체
  generator.definitions_['ssd1306_obj_' + num] = `Adafruit_SSD1306 oled${num}(${width}, ${height}, &Wire, ${rst});`;

  // setup
  generator.setups_['wire_begin'] = 'Wire.begin();';
  generator.setups_['ssd1306_begin_' + num] =
    `oled${num}.begin(SSD1306_SWITCHCAPVCC, ${addr});
  oled${num}.clearDisplay();
  oled${num}.display();`;

  return '';
};

// 2) 기본 제어
Arduino.forBlock['ssd1306_control'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const action = block.getFieldValue('ACTION') || 'DISPLAY';
  let code = '';

  switch (action) {
    case 'DISPLAY':
      code = `oled${n}.display();\n`;
      break;
    case 'CLEAR':
      code = `oled${n}.clearDisplay();\n`;
      break;
    case 'INVERT':
      code = `oled${n}.invertDisplay(true);\n`;
      break;
    case 'NORMAL':
      code = `oled${n}.invertDisplay(false);\n`;
      break;
    default:
      code = `oled${n}.display();\n`;
      break;
  }
  return code;
};

// 3) 밝기 조절
Arduino.forBlock['ssd1306_dim'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const state = block.getFieldValue('STATE') || 'false';
  return `oled${n}.dim(${state});\n`;
};

// 4) 픽셀 그리기
Arduino.forBlock['ssd1306_pixel'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const x = generator.valueToCode(block, 'X', Arduino.ORDER_ATOMIC) || '0';
  const y = generator.valueToCode(block, 'Y', Arduino.ORDER_ATOMIC) || '0';
  const color = block.getFieldValue('COLOR') || 'SSD1306_WHITE';
  return `oled${n}.drawPixel(${x}, ${y}, ${color});\n`;
};

// 5) 선 그리기
Arduino.forBlock['ssd1306_line'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const x1 = generator.valueToCode(block, 'X1', Arduino.ORDER_ATOMIC) || '0';
  const y1 = generator.valueToCode(block, 'Y1', Arduino.ORDER_ATOMIC) || '0';
  const x2 = generator.valueToCode(block, 'X2', Arduino.ORDER_ATOMIC) || '127';
  const y2 = generator.valueToCode(block, 'Y2', Arduino.ORDER_ATOMIC) || '63';
  const color = block.getFieldValue('COLOR') || 'SSD1306_WHITE';
  return `oled${n}.drawLine(${x1}, ${y1}, ${x2}, ${y2}, ${color});\n`;
};

// 6) 사각형 그리기
Arduino.forBlock['ssd1306_rect'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const x = generator.valueToCode(block, 'X', Arduino.ORDER_ATOMIC) || '0';
  const y = generator.valueToCode(block, 'Y', Arduino.ORDER_ATOMIC) || '0';
  const w = generator.valueToCode(block, 'W', Arduino.ORDER_ATOMIC) || '10';
  const h = generator.valueToCode(block, 'H', Arduino.ORDER_ATOMIC) || '10';
  const fill = block.getFieldValue('FILL') === '1';
  const color = block.getFieldValue('COLOR') || 'SSD1306_WHITE';
  return fill
    ? `oled${n}.fillRect(${x}, ${y}, ${w}, ${h}, ${color});\n`
    : `oled${n}.drawRect(${x}, ${y}, ${w}, ${h}, ${color});\n`;
};

// 7) 원 그리기
Arduino.forBlock['ssd1306_circle'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const x = generator.valueToCode(block, 'X', Arduino.ORDER_ATOMIC) || '64';
  const y = generator.valueToCode(block, 'Y', Arduino.ORDER_ATOMIC) || '32';
  const r = generator.valueToCode(block, 'R', Arduino.ORDER_ATOMIC) || '10';
  const fill = block.getFieldValue('FILL') === '1';
  const color = block.getFieldValue('COLOR') || 'SSD1306_WHITE';
  return fill
    ? `oled${n}.fillCircle(${x}, ${y}, ${r}, ${color});\n`
    : `oled${n}.drawCircle(${x}, ${y}, ${r}, ${color});\n`;
};

// 8) 텍스트 출력
Arduino.forBlock['ssd1306_text'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const text = generator.valueToCode(block, 'TEXT', Arduino.ORDER_ATOMIC) || '"Hello OLED"';
  const x = generator.valueToCode(block, 'X', Arduino.ORDER_ATOMIC) || '0';
  const y = generator.valueToCode(block, 'Y', Arduino.ORDER_ATOMIC) || '0';
  const size = generator.valueToCode(block, 'SIZE', Arduino.ORDER_ATOMIC) || '1';
  const color = block.getFieldValue('COLOR') || 'SSD1306_WHITE';
  const wrap = block.getFieldValue('WRAP') || 'false';

  return `oled${n}.setTextSize(${size});
oled${n}.setTextColor(${color});
oled${n}.setTextWrap(${wrap});
oled${n}.setCursor(${x}, ${y});
oled${n}.print(${text});
`;
};

// 9) 스크롤 기능
Arduino.forBlock['ssd1306_scroll'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const direction = block.getFieldValue('DIRECTION') || 'RIGHT';
  const start = generator.valueToCode(block, 'START', Arduino.ORDER_ATOMIC) || '0';
  const stop = generator.valueToCode(block, 'STOP', Arduino.ORDER_ATOMIC) || '7';
  let code = '';

  switch (direction) {
    case 'RIGHT':
      code = `oled${n}.startscrollright(${start}, ${stop});\n`;
      break;
    case 'LEFT':
      code = `oled${n}.startscrollleft(${start}, ${stop});\n`;
      break;
    case 'DIAG_RIGHT':
      code = `oled${n}.startscrolldiagright(${start}, ${stop});\n`;
      break;
    case 'DIAG_LEFT':
      code = `oled${n}.startscrolldiagleft(${start}, ${stop});\n`;
      break;
    case 'STOP':
      code = `oled${n}.stopscroll();\n`;
      break;
    default:
      code = `oled${n}.startscrollright(${start}, ${stop});\n`;
      break;
  }
  return code;
};
// OLED 한글 라이브러리 코드 생성기 (통합 버전)

// 설정 블록
Arduino.forBlock['oled_han_setup'] = function (block, generator) {
  // 🔥 [NEW] 보드 분기 처리
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));

  if (isEsp32 || isPico) {
    generator.definitions_['include_wire_oled_han'] = '#include <Wire.h>';
  }

  generator.definitions_['include_oled_han_3'] = '#include "OLED_HAN_UNO.h"';
  generator.definitions_['obj_oled_han'] = 'OLED_uno_lib oledDisplay;';
  generator.setups_['init_oled_han'] = 'oledDisplay.init();';

  return '';
};

// 화면 지우기
Arduino.forBlock['oled_han_clear'] = function (block, generator) {
  return 'oledDisplay.clearDisplay();\n';
};

// 통합 텍스트 출력 (한글, 영어, 숫자, 혼합 모두 지원)
Arduino.forBlock['oled_han_print_text'] = function (block, generator) {
  const text = generator.valueToCode(block, 'TEXT', Arduino.ORDER_ATOMIC) || '"Hello 안녕"';
  const x = generator.valueToCode(block, 'X', Arduino.ORDER_ATOMIC) || '0';
  const y = generator.valueToCode(block, 'Y', Arduino.ORDER_ATOMIC) || '0';
  const mode = block.getFieldValue('MODE') || 'NORMAL';
  const modeValue = mode === 'NORMAL' ? '1' : '0';

  const code = `{
    String textStr = String(${text});
    oledDisplay.puts(${x}, ${y}, (unsigned char*)textStr.c_str(), ${modeValue});
}
`;
  return code;
};

// 큰 숫자 표시
Arduino.forBlock['oled_han_big_digit'] = function (block, generator) {
  const digit = generator.valueToCode(block, 'DIGIT', Arduino.ORDER_ATOMIC) || '0';
  const x = generator.valueToCode(block, 'X', Arduino.ORDER_ATOMIC) || '0';
  const y = generator.valueToCode(block, 'Y', Arduino.ORDER_ATOMIC) || '0';
  const mode = block.getFieldValue('MODE') || 'NORMAL';
  const modeValue = mode === 'NORMAL' ? '1' : '0';

  const code = `{
    int digitValue = (int)(${digit});
    if (digitValue >= 0 && digitValue <= 9) {
        oledDisplay.drawBitmap32(${x}, ${y}, digitValue, ${modeValue});
    }
}
`;
  return code;
};

// 바 그래프
Arduino.forBlock['oled_han_draw_bar'] = function (block, generator) {
  const x = generator.valueToCode(block, 'X', Arduino.ORDER_ATOMIC) || '0';
  const y = generator.valueToCode(block, 'Y', Arduino.ORDER_ATOMIC) || '0';
  const value = generator.valueToCode(block, 'VALUE', Arduino.ORDER_ATOMIC) || '50';

  return `oledDisplay.drawBar(${x}, ${y}, ${value});\n`;
};
// ======================================================== 11. A.일반센서 카테고리 ==========
// 초음파 센서 설정 블록의 코드 생성기 (오류 수정 버전)
Arduino.forBlock['ultrasonic_setup'] = function (block, generator) {
  const trigPin = block.getFieldValue('TRIG_PIN');
  const echoPin = block.getFieldValue('ECHO_PIN');

  // 전역 변수 및 함수를 definitions 객체에 직접 추가
  Arduino.definitions_['define_ultrasonic_trig'] = `int Trigpin = ${trigPin};`;
  Arduino.definitions_['define_ultrasonic_echo'] = `int Echopin = ${echoPin};`;

  const func = [
    'long getUltrasonicDistance() {',
    '  digitalWrite(Trigpin, LOW);',
    '  delayMicroseconds(2);',
    '  digitalWrite(Trigpin, HIGH);',
    '  delayMicroseconds(10);',
    '  digitalWrite(Trigpin, LOW);',
    '  long duration = pulseIn(Echopin, HIGH);', // <<-- 변수명 오타 수정
    '  return duration;',
    '}'
  ];
  Arduino.definitions_['func_getUltrasonicDistance'] = func.join('\n');

  // setup() 함수에 들어갈 코드를 setups 객체에 직접 추가
  Arduino.setups_['setup_ultrasonic'] = `pinMode(Trigpin, OUTPUT);\n  pinMode(Echopin, INPUT);`;

  return ''; // 이 블록 자체는 루프에서 코드를 생성하지 않음
};


// 초음파 센서 거리값 블록의 코드 생성기 (수정 없음)
Arduino.forBlock['ultrasonic_distance'] = function (block, generator) {
  const unit = block.getFieldValue('UNIT');
  let conversionFactor;

  if (unit === 'CM') {
    conversionFactor = '0.0343 / 2.0';
  } else if (unit === 'MM') {
    conversionFactor = '0.343 / 2.0';
  }

  const code = `(getUltrasonicDistance() * ${conversionFactor})`;

  return [code, Arduino.ORDER_ATOMIC];
};
// DHT 라이브러리 코드 생성기

Arduino.forBlock['dht_setup'] = function (block, generator) {
  let pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '2';
  let type = block.getFieldValue('TYPE');

  // definitions_를 사용해서 #include 처리 (includes_ 대신)
  generator.definitions_ = generator.definitions_ || {};
  generator.setups_ = generator.setups_ || {};

  // 올바른 방법: definitions_에 include 추가
  generator.definitions_['include_dht'] = '#include "DHT.h"';

  let dhtObjectName = 'dht_pin' + pin;
  generator.definitions_[dhtObjectName] = `DHT ${dhtObjectName}(${pin}, ${type});`;

  generator.setups_[dhtObjectName] = `${dhtObjectName}.begin();`;

  return '';
};

Arduino.forBlock['dht_read_temperature'] = function (block, generator) {
  let pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '2';
  let scale = block.getFieldValue('SCALE');
  let dhtObjectName = 'dht_pin' + pin;

  let code = `${dhtObjectName}.readTemperature(${scale})`;
  return [code, Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['dht_read_humidity'] = function (block, generator) {
  let pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '2';
  let dhtObjectName = 'dht_pin' + pin;

  let code = `${dhtObjectName}.readHumidity()`;
  return [code, Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['dht_convert_temperature'] = function (block, generator) {
  let temperature = generator.valueToCode(block, 'TEMPERATURE', Arduino.ORDER_ATOMIC) || '0';
  let from = block.getFieldValue('FROM');
  let to = block.getFieldValue('TO');

  // definitions 초기화
  generator.definitions_ = generator.definitions_ || {};

  let funcName = '';
  let functionCode = '';

  if (from === 'C' && to === 'F') {
    funcName = 'convertCtoF';
    functionCode = `float ${funcName}(float c) {
  return c * 1.8 + 32;
}`;
    generator.definitions_['func_' + funcName] = functionCode;
    return [`${funcName}(${temperature})`, Arduino.ORDER_FUNCTION_CALL];
  } else if (from === 'F' && to === 'C') {
    funcName = 'convertFtoC';
    functionCode = `float ${funcName}(float f) {
  return (f - 32) * 0.55555;
}`;
    generator.definitions_['func_' + funcName] = functionCode;
    return [`${funcName}(${temperature})`, Arduino.ORDER_FUNCTION_CALL];
  } else {
    return [temperature, Arduino.ORDER_ATOMIC];
  }
};

Arduino.forBlock['dht_heat_index'] = function (block, generator) {
  let temperature = generator.valueToCode(block, 'TEMPERATURE', Arduino.ORDER_ATOMIC) || '25';
  let humidity = generator.valueToCode(block, 'HUMIDITY', Arduino.ORDER_ATOMIC) || '50';
  let unit = block.getFieldValue('UNIT');

  // definitions 초기화
  generator.definitions_ = generator.definitions_ || {};

  let funcName = 'computeHeatIndex';
  let functionCode = `float ${funcName}(float temperature, float percentHumidity, bool isFahrenheit) {
  float hi;
  if (!isFahrenheit)
    temperature = temperature * 1.8 + 32;
  
  hi = 0.5 * (temperature + 61.0 + ((temperature - 68.0) * 1.2) + (percentHumidity * 0.094));
  
  if (hi > 79) {
    hi = -42.379 +
             2.04901523 * temperature +
            10.14333127 * percentHumidity +
            -0.22475541 * temperature*percentHumidity +
            -0.00683783 * pow(temperature, 2) +
            -0.05481717 * pow(percentHumidity, 2) +
             0.00122874 * pow(temperature, 2) * percentHumidity +
             0.00085282 * temperature*pow(percentHumidity, 2) +
            -0.00000199 * pow(temperature, 2) * pow(percentHumidity, 2);

    if((percentHumidity < 13) && (temperature >= 80.0) && (temperature <= 112.0))
      hi -= ((13.0 - percentHumidity) * 0.25) * sqrt((17.0 - abs(temperature - 95.0)) * 0.05882);

    else if((percentHumidity > 85.0) && (temperature >= 80.0) && (temperature <= 87.0))
      hi += ((percentHumidity - 85.0) * 0.1) * ((87.0 - temperature) * 0.2);
  }
  
  return isFahrenheit ? hi : (hi - 32) * 0.55555;
}`;

  generator.definitions_['func_' + funcName] = functionCode;

  return [`${funcName}(${temperature}, ${humidity}, ${unit})`, Arduino.ORDER_FUNCTION_CALL];
};
// 물온도센서 코드 생성기

Arduino.forBlock['dallas_temp_setup'] = function (block, generator) {
  var pin = block.getFieldValue('PIN');

  // 속성 초기화 확인
  if (!generator.definitions_) generator.definitions_ = {};
  if (!generator.setups_) generator.setups_ = {};

  // 라이브러리 추가 (includes_ 대신 definitions_ 사용)
  // generator.definitions_['include_onewire'] = '#include <OneWire.h>';
  generator.definitions_['include_dallas_temperature'] = '#include <DallasTemperature.h>';

  // 전역 변수 선언
  generator.definitions_['dallas_onewire'] = 'OneWire oneWire(' + pin + ');';
  generator.definitions_['dallas_sensors'] = 'DallasTemperature sensors(&oneWire);';

  // setup 코드
  generator.setups_['dallas_init'] = 'sensors.begin();';

  return '';
};

Arduino.forBlock['dallas_temp_read'] = function (block, generator) {
  var index = block.getFieldValue('INDEX');
  var unit = block.getFieldValue('UNIT');

  var code;
  if (unit === 'C') {
    code = 'sensors.getTempCByIndex(' + index + ')';
  } else {
    code = 'sensors.getTempFByIndex(' + index + ')';
  }

  return [code, Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['dallas_temp_count'] = function (block, generator) {
  var code = 'sensors.getDeviceCount()';
  return [code, Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['dallas_temp_request'] = function (block, generator) {
  var code = 'sensors.requestTemperatures();\n';
  return code;
};
// HX711 무게센서 라이브러리 코드 생성기

// 1. 설정 블록 코드 생성기
Arduino.forBlock['hx711_setup'] = function (block, generator) {
  const doutPin = generator.valueToCode(block, 'DOUT_PIN', Arduino.ORDER_ATOMIC) || '3';
  const clkPin = generator.valueToCode(block, 'CLK_PIN', Arduino.ORDER_ATOMIC) || '2';
  const gain = block.getFieldValue('GAIN') || '128';

  // 설정 블록에서만 include와 객체 정의 생성
  generator.definitions_['include_hx711'] = '#include "HX711.h"';
  generator.definitions_['obj_hx711'] = `HX711 hx711Scale(${doutPin}, ${clkPin}, ${gain});`;

  return '';
};

Arduino.forBlock['hx711_get_weight'] = function (block, generator) {
  let code = `hx711Scale.get_units()`;
  return [code, Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['hx711_tare'] = function (block, generator) {
  let times = generator.valueToCode(block, 'TIMES', Arduino.ORDER_ATOMIC) || '10';

  let code = `hx711Scale.tare(${times});\\n`;
  return code;
};

Arduino.forBlock['hx711_set_scale'] = function (block, generator) {
  let scale = generator.valueToCode(block, 'SCALE', Arduino.ORDER_ATOMIC) || '1';

  let code = `hx711Scale.set_scale(${scale});\\n`;
  return code;
};

Arduino.forBlock['hx711_is_ready'] = function (block, generator) {
  let code = `hx711Scale.is_ready()`;
  return [code, Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['hx711_power_control'] = function (block, generator) {
  let power = block.getFieldValue('POWER');

  let code;
  if (power === 'UP') {
    code = `hx711Scale.power_up();\\n`;
  } else {
    code = `hx711Scale.power_down();\\n`;
  }
  return code;
};

Arduino.forBlock['hx711_read_data'] = function (block, generator) {
  let readType = block.getFieldValue('READ_TYPE');

  let code;
  switch (readType) {
    case 'RAW':
      code = `hx711Scale.read()`;
      break;
    case 'AVERAGE':
      code = `hx711Scale.read_average(10)`;
      break;
    case 'VALUE':
      code = `hx711Scale.get_value()`;
      break;
    default:
      code = `hx711Scale.read()`;
  }
  return [code, Arduino.ORDER_FUNCTION_CALL];
};

// I2C 무게센서 코드 생성기

// 1. 설정 블록 코드 생성기
Arduino.forBlock['i2c_weight_setup'] = function (block, generator) {
  const address = generator.valueToCode(block, 'ADDRESS', Arduino.ORDER_ATOMIC) || '0x63';

  // 설정 블록에서만 include와 전역 변수, 함수 정의 생성
  generator.definitions_['i2c_weight_address'] = `byte i2cWeightAddress = ${address};`;
  generator.definitions_['i2c_weight_data'] = 'byte i2cWeightData[3];';

  // I2C 무게 읽기 함수 정의
  generator.definitions_['i2c_weight_functions'] = `
uint16_t readI2CWeight() {
    Wire.requestFrom(i2cWeightAddress, 3);
    for(byte i = 0; i < 3; i++) {
        while(!Wire.available());
        i2cWeightData[i] = Wire.read();
    }
    
    if(i2cWeightData[0] == 0xff) {
        return ((uint16_t)i2cWeightData[1] << 8) | (uint16_t)i2cWeightData[2];
    }
    return 0;
}

bool isI2CWeightAvailable() {
    Wire.requestFrom(i2cWeightAddress, 1);
    return Wire.available() > 0;
}

byte readI2CWeightRawByte(byte index) {
    Wire.requestFrom(i2cWeightAddress, 3);
    for(byte i = 0; i < 3; i++) {
        while(!Wire.available());
        i2cWeightData[i] = Wire.read();
    }
    if(index < 3) return i2cWeightData[index];
    return 0;
}`;

  generator.setups_['init_i2c_weight'] = 'Wire.begin();';

  return '';
};

// 2. 무게 읽기 블록 코드 생성기
Arduino.forBlock['i2c_weight_read'] = function (block, generator) {
  const code = 'readI2CWeight()';
  return [code, Arduino.ORDER_ATOMIC];
};

// 3. 센서 연결 확인 블록 코드 생성기
Arduino.forBlock['i2c_weight_available'] = function (block, generator) {
  const code = 'isI2CWeightAvailable()';
  return [code, Arduino.ORDER_ATOMIC];
};

// 4. 원시 데이터 읽기 블록 코드 생성기
Arduino.forBlock['i2c_weight_raw_data'] = function (block, generator) {
  const byteIndex = block.getFieldValue('BYTE_INDEX') || '0';

  const code = `readI2CWeightRawByte(${byteIndex})`;
  return [code, Arduino.ORDER_ATOMIC];
};
// 로터리 엔코더 라이브러리 코드 생성기

Arduino.forBlock['rotary_setup'] = function (block, generator) {
  let dtPin = generator.valueToCode(block, 'DT_PIN', Arduino.ORDER_ATOMIC) || '2';
  let clkPin = generator.valueToCode(block, 'CLK_PIN', Arduino.ORDER_ATOMIC) || '3';

  // 설정 블록에서만 include와 객체 정의 생성
  generator.definitions_['include_rotary'] = '#include "Rotary.h"';
  generator.definitions_['rotaryEncoder'] = `Rotary rotaryEncoder(${dtPin}, ${clkPin});`;
  generator.definitions_['rotaryCounter'] = `int rotaryCounter = 0;`;

  generator.setups_['setup_rotary_dt'] = `pinMode(${dtPin}, INPUT_PULLUP);`;
  generator.setups_['setup_rotary_clk'] = `pinMode(${clkPin}, INPUT_PULLUP);`;

  return '';
};

Arduino.forBlock['rotary_get_value'] = function (block, generator) {
  let code = `rotaryEncoder.getValue()`;
  return [code, Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['rotary_direction'] = function (block, generator) {
  // 함수 정의
  generator.definitions_ = generator.definitions_ || {};
  let funcName = 'getRotaryDirection';
  let functionCode = `String ${funcName}() {
  int val = rotaryEncoder.getValue();
  if (val == 1) return "시계방향";
  else if (val == -1) return "반시계방향";
  else return "정지";
}`;

  generator.definitions_['func_' + funcName] = functionCode;

  let code = `${funcName}()`;
  return [code, Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['rotary_counter'] = function (block, generator) {
  // 함수 정의
  generator.definitions_ = generator.definitions_ || {};
  let funcName = 'getRotaryCounter';
  let functionCode = `int ${funcName}() {
  int val = rotaryEncoder.getValue();
  rotaryCounter += val;
  return rotaryCounter;
}`;

  generator.definitions_['func_' + funcName] = functionCode;

  let code = `${funcName}()`;
  return [code, Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['rotary_reset_counter'] = function (block, generator) {
  let code = `rotaryCounter = 0;\\n`;
  return code;
};
// 서미스터 온도센서 라이브러리 코드 생성기

Arduino.forBlock['thermistor_setup'] = function (block, generator) {
  let analogPin = generator.valueToCode(block, 'ANALOG_PIN', Arduino.ORDER_ATOMIC) || 'A0';
  let nominalRes = generator.valueToCode(block, 'NOMINAL_RES', Arduino.ORDER_ATOMIC) || '10000';
  let betaCoef = generator.valueToCode(block, 'BETA_COEF', Arduino.ORDER_ATOMIC) || '3950';
  let serialRes = generator.valueToCode(block, 'SERIAL_RES', Arduino.ORDER_ATOMIC) || '10000';

  // 설정 블록에서만 include와 객체 정의 생성
  generator.definitions_['include_thermistor'] = '#include "thermistor.h"';
  generator.definitions_['thermistorSensor'] = `THERMISTOR thermistorSensor(${analogPin}, ${nominalRes}, ${betaCoef}, ${serialRes});`;

  return '';
};

Arduino.forBlock['thermistor_read_temperature'] = function (block, generator) {
  let unit = block.getFieldValue('UNIT');

  if (unit === 'CELSIUS') {
    let code = `(thermistorSensor.read() / 10.0)`;
    return [code, Arduino.ORDER_FUNCTION_CALL];
  } else {
    // 화씨 변환: (C * 9/5) + 32
    let code = `((thermistorSensor.read() / 10.0) * 9.0 / 5.0 + 32.0)`;
    return [code, Arduino.ORDER_FUNCTION_CALL];
  }
};

Arduino.forBlock['thermistor_read_raw'] = function (block, generator) {
  let code = `thermistorSensor.read()`;
  return [code, Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['thermistor_get_resistance'] = function (block, generator) {
  // 저항값 계산 함수 정의
  generator.definitions_ = generator.definitions_ || {};
  let funcName = 'getThermistorResistance';
  let functionCode = `float ${funcName}() {
  int adcValue = analogRead(thermistorSensor.analogPin);
  float average = adcValue;
  
  #if defined(PANSTAMP_NRG) || defined(ESP_PLATFORM)
  average = 4095.0 / average - 1;
  #else
  average = 1023.0 / average - 1;
  #endif
  
  return thermistorSensor.serialResistance * average;
}`;

  generator.definitions_['func_' + funcName] = functionCode;

  let code = `${funcName}()`;
  return [code, Arduino.ORDER_FUNCTION_CALL];
};
// PMS 미세먼지센서 라이브러리 코드 생성기

Arduino.forBlock['pms_setup'] = function (block, generator) {
  let serialPort = block.getFieldValue('SERIAL_PORT');
  let rxPin = generator.valueToCode(block, 'RX_PIN', Arduino.ORDER_ATOMIC) || '2';
  let txPin = generator.valueToCode(block, 'TX_PIN', Arduino.ORDER_ATOMIC) || '3';
  let baudRate = generator.valueToCode(block, 'BAUD_RATE', Arduino.ORDER_ATOMIC) || '9600';

  // 설정 블록에서만 include와 객체 정의 생성
  generator.definitions_['include_pms'] = '#include "PMS.h"';

  // SoftwareSerial 사용 시
  if (serialPort === 'SoftwareSerial') {
    // 🔥 [NEW] 보드 분기 처리
    var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
    var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));

    if (isEsp32) {
      // ESP32: HardwareSerial(1) 사용 (RX/TX 핀 재맵핑)
      generator.definitions_['include_hardwareserial'] = '#include <HardwareSerial.h>';
      generator.definitions_['pms_softserial'] = `HardwareSerial pmsSerial(1);`;
      generator.definitions_['pmsSensor'] = 'PMS pmsSensor(pmsSerial);';
      generator.definitions_['pmsData'] = 'PMS::DATA pmsData;';
      generator.setups_['pms_serial_begin'] = `pmsSerial.begin(${baudRate}, SERIAL_8N1, ${rxPin}, ${txPin});`;
    } else if (isPico) {
      // Pico: 표준 Serial1 사용 (setRX, setTX 지원 가정)
      generator.definitions_['pmsSensor'] = 'PMS pmsSensor(Serial1);';
      generator.definitions_['pmsData'] = 'PMS::DATA pmsData;';
      generator.setups_['pms_serial_begin'] = `Serial1.setRX(${rxPin}); Serial1.setTX(${txPin}); Serial1.begin(${baudRate});`;
    } else {
      // Arduino: SoftwareSerial 사용
      generator.definitions_['include_sw_serial'] = '#include <SoftwareSerial.h>';
      generator.definitions_['pms_softserial'] = `SoftwareSerial pmsSerial(${rxPin}, ${txPin});`;
      generator.definitions_['pmsSensor'] = 'PMS pmsSensor(pmsSerial);';
      generator.definitions_['pmsData'] = 'PMS::DATA pmsData;';
      generator.setups_['pms_serial_begin'] = `pmsSerial.begin(${baudRate});`;
    }
  }
  // 하드웨어 시리얼 사용 시 (핀 설정 무시)
  else {
    generator.definitions_['pmsSensor'] = `PMS pmsSensor(${serialPort});`;
    generator.definitions_['pmsData'] = 'PMS::DATA pmsData;';
    generator.setups_['pms_serial_begin'] = `${serialPort}.begin(${baudRate});`;
  }

  return '';
};

Arduino.forBlock['pms_power_control'] = function (block, generator) {
  let powerState = block.getFieldValue('POWER_STATE');

  let code;
  if (powerState === 'WAKEUP') {
    code = `pmsSensor.wakeUp();\n`;
  } else {
    code = `pmsSensor.sleep();\n`;
  }
  return code;
};

Arduino.forBlock['pms_set_mode'] = function (block, generator) {
  let mode = block.getFieldValue('MODE');

  let code;
  if (mode === 'ACTIVE') {
    code = `pmsSensor.activeMode();\n`;
  } else {
    code = `pmsSensor.passiveMode();\n`;
  }
  return code;
};

Arduino.forBlock['pms_read_data'] = function (block, generator) {
  let dataType = block.getFieldValue('DATA_TYPE');

  // 데이터 읽기 및 파싱 함수 정의
  generator.definitions_ = generator.definitions_ || {};
  let funcName = 'getPmsData';
  let functionCode = `int ${funcName}(String dataType) {
  if (pmsSensor.readUntil(pmsData)) {
    if (dataType == "PM_SP_1_0") return pmsData.PM_SP_UG_1_0;
    else if (dataType == "PM_SP_2_5") return pmsData.PM_SP_UG_2_5;
    else if (dataType == "PM_SP_10_0") return pmsData.PM_SP_UG_10_0;
    else if (dataType == "PM_AE_1_0") return pmsData.PM_AE_UG_1_0;
    else if (dataType == "PM_AE_2_5") return pmsData.PM_AE_UG_2_5;
    else if (dataType == "PM_AE_10_0") return pmsData.PM_AE_UG_10_0;
  }
  return -1;  // 읽기 실패
}`;

  generator.definitions_['func_' + funcName] = functionCode;

  let code = `${funcName}("${dataType}")`;
  return [code, Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['pms_request_read'] = function (block, generator) {
  let code = `pmsSensor.requestRead();\\n`;
  return code;
};

Arduino.forBlock['pms_data_available'] = function (block, generator) {
  let code = `pmsSensor.read(pmsData)`;
  return [code, Arduino.ORDER_FUNCTION_CALL];
};
// -------- MHZ19 CO2 센서 --------
Arduino.forBlock['mhz19_setup'] = function (block, generator) {
  const serialType = block.getFieldValue('SERIAL_TYPE');
  const rxPin = generator.valueToCode(block, 'RX_PIN', Arduino.ORDER_ATOMIC) || '2';
  const txPin = generator.valueToCode(block, 'TX_PIN', Arduino.ORDER_ATOMIC) || '3';
  const baud = generator.valueToCode(block, 'BAUD', Arduino.ORDER_ATOMIC) || '9600';

  // 설정 블록에서만 include와 객체 정의 생성
  generator.definitions_['include_mhz19'] = '#include "MHZ19.h"';
  generator.definitions_['mhz19_object'] = 'MHZ19 mhz19;';

  if (serialType === 'SOFT') {
    // 🔥 [NEW] 보드 분기 처리
    var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
    var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));

    if (isEsp32) {
      generator.definitions_['include_hardwareserial'] = '#include <HardwareSerial.h>';
      generator.definitions_['mhz19_serial'] = `HardwareSerial mhz19Serial(1);`;
      generator.setups_['mhz19_serial_begin'] = `mhz19Serial.begin(${baud}, SERIAL_8N1, ${rxPin}, ${txPin});`;
      generator.setups_['mhz19_begin'] = `mhz19.begin(mhz19Serial);`;
      generator.setups_['mhz19_auto_cal'] = `mhz19.autoCalibration();`;
    } else if (isPico) {
      // Pico: 표준 Serial1 사용
      generator.setups_['mhz19_serial_begin'] = `Serial1.setRX(${rxPin}); Serial1.setTX(${txPin}); Serial1.begin(${baud});`;
      generator.setups_['mhz19_begin'] = `mhz19.begin(Serial1);`;
      generator.setups_['mhz19_auto_cal'] = `mhz19.autoCalibration();`;
    } else {
      // SoftwareSerial은 가이드에 따라 포함하지 않음 (기본 라이브러리)
      generator.definitions_['include_sw_serial'] = '#include <SoftwareSerial.h>';
      generator.definitions_['mhz19_serial'] = `SoftwareSerial mhz19Serial(${rxPin}, ${txPin});`;
      generator.setups_['mhz19_serial_begin'] = `mhz19Serial.begin(${baud});`;
      generator.setups_['mhz19_begin'] = `mhz19.begin(mhz19Serial);`;
      generator.setups_['mhz19_auto_cal'] = `mhz19.autoCalibration();`;
    }
  } else {
    let serialName = serialType === 'HARD' ? 'Serial' : serialType;
    generator.setups_['mhz19_serial_begin'] = `${serialName}.begin(${baud});`;
    generator.setups_['mhz19_begin'] = `mhz19.begin(${serialName});`;
    generator.setups_['mhz19_auto_cal'] = `mhz19.autoCalibration();`;
  }

  return '';
};

Arduino.forBlock['mhz19_set_range'] = function (block, generator) {
  const range = generator.valueToCode(block, 'RANGE', Arduino.ORDER_ATOMIC) || '2000';
  return `mhz19.setRange(${range});\n`;
};

Arduino.forBlock['mhz19_filter_mode'] = function (block, generator) {
  const mode = block.getFieldValue('MODE');
  const type = block.getFieldValue('TYPE');
  const isOn = mode === 'ON' ? 'true' : 'false';
  const isCleared = type === 'CLEAR' ? 'true' : 'false';

  return `mhz19.setFilter(${isOn}, ${isCleared});\n`;
};

Arduino.forBlock['mhz19_read_value'] = function (block, generator) {
  const valueType = block.getFieldValue('VALUE_TYPE');

  switch (valueType) {
    case 'CO2':
      return ['mhz19.getCO2(false)', Arduino.ORDER_ATOMIC];
    case 'CO2_UNLIM':
      return ['mhz19.getCO2(true)', Arduino.ORDER_ATOMIC];
    case 'TEMP':
      return ['mhz19.getTemperature()', Arduino.ORDER_ATOMIC];
    case 'RAW':
      return ['mhz19.getCO2Raw()', Arduino.ORDER_ATOMIC];
    case 'TRANS':
      return ['mhz19.getTransmittance()', Arduino.ORDER_ATOMIC];
    case 'ACCURACY':
    default:
      return ['mhz19.getAccuracy()', Arduino.ORDER_ATOMIC];
  }
};

Arduino.forBlock['mhz19_calibration'] = function (block, generator) {
  const calType = block.getFieldValue('CAL_TYPE');
  const period = generator.valueToCode(block, 'PERIOD', Arduino.ORDER_ATOMIC) || '24';

  switch (calType) {
    case 'AUTO_ON':
      return `mhz19.autoCalibration(true, ${period});\n`;
    case 'AUTO_OFF':
      return `mhz19.autoCalibration(false);\n`;
    case 'ZERO_CAL':
      return `mhz19.calibrate();\n`;
    case 'RESET':
    default:
      return `mhz19.recoveryReset();\n`;
  }
};

Arduino.forBlock['mhz19_get_status'] = function (block, generator) {
  const statusType = block.getFieldValue('STATUS_TYPE');

  switch (statusType) {
    case 'RANGE':
      return ['mhz19.getRange()', Arduino.ORDER_ATOMIC];
    case 'ABC':
      return ['mhz19.getABC()', Arduino.ORDER_ATOMIC];
    case 'BG_CO2':
      return ['mhz19.getBackgroundCO2()', Arduino.ORDER_ATOMIC];
    case 'VERSION':
    default:
      generator.definitions_['mhz19_version_func'] = `String getMHZ19Version() {
  char version[4];
  mhz19.getVersion(version);
  return String(version);
}`;
      return ['getMHZ19Version()', Arduino.ORDER_ATOMIC];
  }
};
// -------- DFRobot GravityTDS 센서 --------
Arduino.forBlock['gravity_tds_setup'] = function (block, generator) {
  const pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || 'A1';

  generator.definitions_['include_gravity_tds'] = '#include "DFRobot_GravityTDS.h"';
  generator.definitions_['gravity_tds_object'] = 'DFRobot_GravityTDS gravityTds;';

  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  let configCode = '';
  if (isEsp32) {
    configCode = `\n  gravityTds.setAref(3.3);\n  gravityTds.setAdcRange(4096.0);`;
  }

  generator.setups_['gravity_tds_begin'] = `gravityTds.setPin(${pin});${configCode}\n  gravityTds.begin();`;

  return '';
};

Arduino.forBlock['gravity_tds_set_temp'] = function (block, generator) {
  const temp = generator.valueToCode(block, 'TEMP', Arduino.ORDER_ATOMIC) || '25.0';
  return `gravityTds.setTemperature(${temp});\n`;
};

Arduino.forBlock['gravity_tds_update'] = function (block, generator) {
  return 'gravityTds.update();\n';
};

Arduino.forBlock['gravity_tds_read_value'] = function (block, generator) {
  const valueType = block.getFieldValue('VALUE_TYPE');

  switch (valueType) {
    case 'TDS':
      return ['gravityTds.getTdsValue()', Arduino.ORDER_ATOMIC];
    case 'EC':
      return ['gravityTds.getEcValue()', Arduino.ORDER_ATOMIC];
    case 'K_VAL':
    default:
      return ['gravityTds.getKvalue()', Arduino.ORDER_ATOMIC];
  }
};

Arduino.forBlock['gravity_tds_advanced_config'] = function (block, generator) {
  const configType = block.getFieldValue('CONFIG_TYPE');
  const value = generator.valueToCode(block, 'VALUE', Arduino.ORDER_ATOMIC) || '0';

  switch (configType) {
    case 'AREF':
      return `gravityTds.setAref(${value});\n`;
    case 'ADC_RANGE':
      return `gravityTds.setAdcRange(${value});\n`;
    case 'K_ADDR':
    default:
      return `gravityTds.setKvalueAddress(${value});\n`;
  }
};
// DFRobot_PH 코드 생성기

// 1. 설정 블록 코드 생성기
Arduino.forBlock['dfrobot_ph_setup'] = function (block, generator) {
  const pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || 'A0';

  // 설정 블록에서만 include와 객체 정의 생성
  generator.definitions_['include_dfrobot_ph'] = '#include "DFRobot_PH.h"';
  generator.definitions_['ph_sensor'] = 'DFRobot_PH phSensor;';
  generator.definitions_['ph_pin'] = `int phPin = ${pin};`;

  // pH 센서용 헬퍼 함수들 정의
  generator.definitions_['ph_functions'] = `
float readPhVoltage() {
    int analogValue = analogRead(phPin);
    return analogValue * (5000.0 / 1024.0);
}

float readPhValue(float temperature) {
    float voltage = readPhVoltage();
    return phSensor.readPH(voltage, temperature);
}

void sendPhCommand(String command) {
    float voltage = readPhVoltage();
    char cmd[10];
    command.toCharArray(cmd, 10);
    phSensor.calibration(voltage, 25.0, cmd);
}`;

  generator.setups_['ph_serial_begin'] = 'Serial.begin(9600);';
  generator.setups_['ph_sensor_begin'] = 'phSensor.begin();';

  return '';
};

// 2. pH 값 읽기 블록 코드 생성기
Arduino.forBlock['dfrobot_ph_read'] = function (block, generator) {
  const temperature = generator.valueToCode(block, 'TEMPERATURE', Arduino.ORDER_ATOMIC) || '25.0';

  const code = `readPhValue(${temperature})`;
  return [code, Arduino.ORDER_ATOMIC];
};

// 3. 전압 읽기 블록 코드 생성기
Arduino.forBlock['dfrobot_ph_voltage'] = function (block, generator) {
  const code = 'readPhVoltage()';
  return [code, Arduino.ORDER_ATOMIC];
};

// 4. 보정 모드 블록 코드 생성기
Arduino.forBlock['dfrobot_ph_calibration'] = function (block, generator) {
  const command = block.getFieldValue('COMMAND') || 'ENTERPH';

  return `sendPhCommand("${command}");\n`;
};
// -------- Adafruit 지문센서 --------
Arduino.forBlock['fingerprint_setup'] = function (block, generator) {
  const serialType = block.getFieldValue('SERIAL_TYPE');
  const rxPin = generator.valueToCode(block, 'RX_PIN', Arduino.ORDER_ATOMIC) || '2';
  const txPin = generator.valueToCode(block, 'TX_PIN', Arduino.ORDER_ATOMIC) || '3';
  const baud = generator.valueToCode(block, 'BAUD', Arduino.ORDER_ATOMIC) || '57600';

  generator.definitions_['include_fingerprint'] = '#include "Adafruit_Fingerprint.h"';

  if (serialType === 'SOFT') {
    // 🔥 [NEW] 보드 분기 처리
    var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
    var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));

    if (isEsp32) {
      generator.definitions_['include_hardwareserial'] = '#include <HardwareSerial.h>';
      generator.definitions_['fingerprint_serial'] = `HardwareSerial fingerSerial(1);`;
      generator.definitions_['fingerprint_object'] = 'Adafruit_Fingerprint finger = Adafruit_Fingerprint(&fingerSerial);';

      generator.setups_['fingerprint_begin'] = `fingerSerial.begin(${baud}, SERIAL_8N1, ${rxPin}, ${txPin});\n  finger.begin(${baud});\n  if (finger.verifyPassword()) {\n    Serial.println("Found fingerprint sensor!");\n  } else {\n    Serial.println("Did not find fingerprint sensor :(");\n    while (1) { delay(1); }\n  }`;
    } else if (isPico) {
      generator.definitions_['fingerprint_serial'] = `// Pico Hardware Serial1`;
      generator.definitions_['fingerprint_object'] = 'Adafruit_Fingerprint finger = Adafruit_Fingerprint(&Serial1);';

      generator.setups_['fingerprint_begin'] = `Serial1.setRX(${rxPin});\n  Serial1.setTX(${txPin});\n  finger.begin(${baud});\n  if (finger.verifyPassword()) {\n    Serial.println("Found fingerprint sensor!");\n  } else {\n    Serial.println("Did not find fingerprint sensor :(");\n    while (1) { delay(1); }\n  }`;
    } else {
      generator.definitions_['fingerprint_serial'] = `SoftwareSerial fingerSerial(${rxPin}, ${txPin});`;
      generator.definitions_['fingerprint_object'] = 'Adafruit_Fingerprint finger = Adafruit_Fingerprint(&fingerSerial);';
      generator.setups_['fingerprint_begin'] = `finger.begin(${baud});\n  if (finger.verifyPassword()) {\n    Serial.println("Found fingerprint sensor!");\n  } else {\n    Serial.println("Did not find fingerprint sensor :(");\n    while (1) { delay(1); }\n  }`;
    }
  } else {
    let serialName = serialType === 'HARD' ? 'Serial' : serialType;
    generator.definitions_['fingerprint_object'] = `Adafruit_Fingerprint finger = Adafruit_Fingerprint(&${serialName});`;
    generator.setups_['fingerprint_begin'] = `${serialName}.begin(${baud});\n  finger.begin(${baud});\n  if (finger.verifyPassword()) {\n    Serial.println("Found fingerprint sensor!");\n  } else {\n    Serial.println("Did not find fingerprint sensor :(");\n    while (1) { delay(1); }\n  }`;
  }

  return '';
};

Arduino.forBlock['fingerprint_enroll_process'] = function (block, generator) {
  const processType = block.getFieldValue('PROCESS_TYPE');
  const id = generator.valueToCode(block, 'ID', Arduino.ORDER_ATOMIC) || '1';

  switch (processType) {
    case 'GET_IMAGE':
      return ['finger.getImage()', Arduino.ORDER_ATOMIC];
    case 'CONVERT':
      return [`finger.image2Tz(1)`, Arduino.ORDER_ATOMIC];
    case 'CREATE':
      return ['finger.createModel()', Arduino.ORDER_ATOMIC];
    case 'STORE':
    default:
      return [`finger.storeModel(${id})`, Arduino.ORDER_ATOMIC];
  }
};

Arduino.forBlock['fingerprint_search'] = function (block, generator) {
  const searchMode = block.getFieldValue('SEARCH_MODE');

  // 먼저 이미지를 캡처하고 변환하는 코드 추가
  generator.definitions_['fingerprint_search_func'] = `uint8_t getFingerprintID() {
  uint8_t p = finger.getImage();
  if (p != FINGERPRINT_OK) return p;
  
  p = finger.image2Tz();
  if (p != FINGERPRINT_OK) return p;
  
  p = finger.fingerFastSearch();
  return p;
}`;

  if (searchMode === 'FAST') {
    return ['getFingerprintID()', Arduino.ORDER_ATOMIC];
  } else {
    return ['finger.fingerSearch()', Arduino.ORDER_ATOMIC];
  }
};

Arduino.forBlock['fingerprint_get_result'] = function (block, generator) {
  const resultType = block.getFieldValue('RESULT_TYPE');

  switch (resultType) {
    case 'FINGER_ID':
      return ['finger.fingerID', Arduino.ORDER_ATOMIC];
    case 'CONFIDENCE':
      return ['finger.confidence', Arduino.ORDER_ATOMIC];
    case 'TEMPLATE_COUNT':
    default:
      generator.setups_['fingerprint_get_params'] = 'finger.getParameters();\n  finger.getTemplateCount();';
      return ['finger.templateCount', Arduino.ORDER_ATOMIC];
  }
};

Arduino.forBlock['fingerprint_database'] = function (block, generator) {
  const dbAction = block.getFieldValue('DB_ACTION');
  const id = generator.valueToCode(block, 'ID', Arduino.ORDER_ATOMIC) || '1';

  switch (dbAction) {
    case 'DELETE':
      return [`finger.deleteModel(${id})`, Arduino.ORDER_ATOMIC];
    case 'EMPTY':
      return ['finger.emptyDatabase()', Arduino.ORDER_ATOMIC];
    case 'COUNT':
    default:
      return ['finger.getTemplateCount()', Arduino.ORDER_ATOMIC];
  }
};

Arduino.forBlock['fingerprint_led_control'] = function (block, generator) {
  const ledAction = block.getFieldValue('LED_ACTION');

  switch (ledAction) {
    case 'ON':
      return 'finger.LEDcontrol(true);\n';
    case 'OFF':
      return 'finger.LEDcontrol(false);\n';
    case 'BREATHING':
      return 'finger.LEDcontrol(FINGERPRINT_LED_BREATHING, 100, FINGERPRINT_LED_RED, 10);\n';
    case 'FLASHING':
    default:
      return 'finger.LEDcontrol(FINGERPRINT_LED_FLASHING, 25, FINGERPRINT_LED_BLUE, 10);\n';
  }
};
// -------- 탁도센서 --------
Arduino.forBlock['turbidity_setup'] = function (block, generator) {
  const pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || 'A0';

  generator.definitions_['turbidity_pin'] = `#define TURBIDITY_PIN ${pin}`;
  generator.definitions_['turbidity_scount'] = '#define SCOUNT 30';
  generator.definitions_['turbidity_variables'] = `int turbidityBuffer[SCOUNT];
int turbidityBufferIndex = 0;
float turbidity_cal_voltage = 4.15;  // 기준 전압 (맑은 물)
unsigned long lastTurbiditySampleTime = 0;`;

  generator.definitions_['turbidity_median_func'] = `float getTurbidityMedian(int bArray[], int iFilterLen) {
  if (iFilterLen < 3) return 0;
  int bTab[iFilterLen];
  for (byte i = 0; i < iFilterLen; i++) bTab[i] = bArray[i];
  int i, j, bTemp;
  for (j = 0; j < iFilterLen - 1; j++) {
    for (i = 0; i < iFilterLen - j - 1; i++) {
      if (bTab[i] > bTab[i + 1]) {
        bTemp = bTab[i];
        bTab[i] = bTab[i + 1];
        bTab[i + 1] = bTemp;
      }
    }
  }
  long sum = 0;
  for (i = 1; i < iFilterLen - 1; i++) sum += bTab[i];
  return (float)sum / (iFilterLen - 2);
}`;

  return '';
};

Arduino.forBlock['turbidity_calibrate'] = function (block, generator) {
  return `// 탁도센서 0점 조정 - 맑은 물에서 실행하세요
float calibSum = 0;
for(int i = 0; i < 50; i++) {
  calibSum += analogRead(TURBIDITY_PIN);
  delay(20);
}
turbidity_cal_voltage = (calibSum / 50.0) * 5.0 / 1024.0;
Serial.print("Turbidity calibrated at: ");
Serial.print(turbidity_cal_voltage);
Serial.println(" V");
`;
};

Arduino.forBlock['turbidity_update'] = function (block, generator) {
  return `// 탁도센서 샘플링 업데이트 (30ms 간격)
if (millis() - lastTurbiditySampleTime > 30) {
  turbidityBuffer[turbidityBufferIndex] = analogRead(TURBIDITY_PIN);
  turbidityBufferIndex++;
  if (turbidityBufferIndex == SCOUNT) {
    turbidityBufferIndex = 0;
  }
  lastTurbiditySampleTime = millis();
}
`;
};

Arduino.forBlock['turbidity_read_value'] = function (block, generator) {
  const valueType = block.getFieldValue('VALUE_TYPE');

  switch (valueType) {
    case 'VOLTAGE':
      return ['(getTurbidityMedian(turbidityBuffer, SCOUNT) * 5.0 / 1024.0)', Arduino.ORDER_ATOMIC];

    case 'RAW':
      return ['getTurbidityMedian(turbidityBuffer, SCOUNT)', Arduino.ORDER_ATOMIC];

    case 'NTU':
    default:
      generator.definitions_['turbidity_ntu_func'] = `float getTurbidityNTU() {
  float averageVoltage = getTurbidityMedian(turbidityBuffer, SCOUNT) * 5.0 / 1024.0;
  float ntu_value;
  
  if (turbidity_cal_voltage - averageVoltage > 0.5) {
    ntu_value = 800 - 1900 * (averageVoltage - 2.5);
  } else {
    ntu_value = 0;
  }
  
  if (ntu_value < 0) ntu_value = 0;
  return ntu_value;
}`;
      return ['getTurbidityNTU()', Arduino.ORDER_ATOMIC];
  }
};
// -------- UV센서 --------
Arduino.forBlock['uv_sensor_setup'] = function (block, generator) {
  const pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || 'A0';

  generator.definitions_['uv_pin'] = `#define UV_SENSOR_PIN ${pin}`;
  generator.definitions_['uv_variables'] = `float uv_min_voltage = 990.0;  // 최소 전압 (mV) - UV 0
float uv_max_voltage = 2800.0; // 최대 전압 (mV) - UV 15
float uv_max_index = 15.0;     // 최대 UV 지수`;

  generator.definitions_['uv_read_func'] = `float getUVAverage() {
  int total_value = 0;
  for (int i = 0; i < 10; i++) {
    total_value += analogRead(UV_SENSOR_PIN);
    delay(10);
  }
  return total_value / 10.0;
}`;

  return '';
};

Arduino.forBlock['uv_sensor_calibrate'] = function (block, generator) {
  const calType = block.getFieldValue('CAL_TYPE');
  const voltage = generator.valueToCode(block, 'VOLTAGE', Arduino.ORDER_ATOMIC) || '990';

  switch (calType) {
    case 'INDOOR':
      return `// UV센서 실내 0점 조정
float avgValue = getUVAverage();
uv_min_voltage = avgValue * (5000.0 / 1024.0);
Serial.print("UV min voltage calibrated to: ");
Serial.print(uv_min_voltage);
Serial.println(" mV");
`;

    case 'OUTDOOR':
      return `// UV센서 실외 기준점 조정
float avgValue = getUVAverage();
uv_max_voltage = avgValue * (5000.0 / 1024.0);
Serial.print("UV max voltage calibrated to: ");
Serial.print(uv_max_voltage);
Serial.println(" mV");
`;

    case 'CUSTOM':
    default:
      return `// UV센서 사용자 기준전압 설정
uv_min_voltage = ${voltage};
Serial.print("UV reference voltage set to: ");
Serial.print(uv_min_voltage);
Serial.println(" mV");
`;
  }
};

Arduino.forBlock['uv_sensor_read_value'] = function (block, generator) {
  const valueType = block.getFieldValue('VALUE_TYPE');

  switch (valueType) {
    case 'VOLTAGE':
      return ['(getUVAverage() * 5.0 / 1024.0)', Arduino.ORDER_ATOMIC];

    case 'VOLTAGE_MV':
      return ['(getUVAverage() * 5000.0 / 1024.0)', Arduino.ORDER_ATOMIC];

    case 'RAW':
      return ['getUVAverage()', Arduino.ORDER_ATOMIC];

    case 'UV_INDEX':
    default:
      generator.definitions_['uv_index_func'] = `float getUVIndex() {
  float avgValue = getUVAverage();
  float voltage_mV = avgValue * (5000.0 / 1024.0);
  
  // 전압이 최소값보다 낮으면 0 반환
  if (voltage_mV <= uv_min_voltage) {
    return 0.0;
  }
  
  // map() 함수로 전압을 UV 지수로 변환
  int uv_index_multiplied = map(voltage_mV, uv_min_voltage, uv_max_voltage, 0, uv_max_index * 10);
  float uv_index = uv_index_multiplied / 10.0;
  
  // 음수나 최대값 초과 방지
  if (uv_index < 0) uv_index = 0;
  if (uv_index > uv_max_index) uv_index = uv_max_index;
  
  return uv_index;
}`;
      return ['getUVIndex()', Arduino.ORDER_ATOMIC];
  }
};
// =================================================== 12. B.고급센서 카테고리 ======================
// =================================================== 12. B.고급센서 카테고리 ======================
// ===================== DS1307 RTC Library Code Generators =====================

// 1) DS1307 RTC 설정
Arduino.forBlock['ds1307_setup'] = function (block, generator) {
  const num = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';

  // 라이브러리 포함 및 객체 생성 (설정 블록에서만)
  // 🔥 [NEW] 보드 분기 처리
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));
  if (isEsp32 || isPico) {
    generator.definitions_['include_wire_ds1307'] = '#include <Wire.h>';
  }
  generator.definitions_['include_ds1307'] = '#include <DFRobot_DS1307.h>';
  generator.definitions_['obj_ds1307_' + num] = `DFRobot_DS1307 rtc${num};`;
  generator.setups_['init_ds1307_' + num] = `rtc${num}.begin();\n  rtc${num}.start();`;

  return '';
};

// 2) 시간 설정
Arduino.forBlock['ds1307_set_time'] = function (block, generator) {
  const num = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const year = generator.valueToCode(block, 'YEAR', Arduino.ORDER_ATOMIC) || '20264';
  const month = generator.valueToCode(block, 'MONTH', Arduino.ORDER_ATOMIC) || '1';
  const date = generator.valueToCode(block, 'DATE', Arduino.ORDER_ATOMIC) || '1';
  const hour = generator.valueToCode(block, 'HOUR', Arduino.ORDER_ATOMIC) || '12';
  const minute = generator.valueToCode(block, 'MINUTE', Arduino.ORDER_ATOMIC) || '0';
  const second = generator.valueToCode(block, 'SECOND', Arduino.ORDER_ATOMIC) || '0';

  return `rtc${num}.setTime(${year}, ${month}, ${date}, ${hour}, ${minute}, ${second});\n`;
};

// 3) 시간 읽기
Arduino.forBlock['ds1307_get_time'] = function (block, generator) {
  const num = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const timeType = block.getFieldValue('TIME_TYPE') || 'DS1307_YR';

  const code = `rtc${num}.getTime(DFRobot_DS1307::${timeType})`;
  return [code, Arduino.ORDER_FUNCTION_CALL];
};

// 4) 클록 제어
Arduino.forBlock['ds1307_clock_control'] = function (block, generator) {
  const num = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const action = block.getFieldValue('ACTION') || 'START';

  if (action === 'START') {
    return `rtc${num}.start();\n`;
  } else {
    return `rtc${num}.stop();\n`;
  }
};

// 5) SQW 출력 설정
Arduino.forBlock['ds1307_sqw_output'] = function (block, generator) {
  const num = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const outputType = block.getFieldValue('OUTPUT_TYPE') || 'LOW';

  return `rtc${num}.SetOutput(${outputType});\n`;
};

// 6) 현재 시간 가져오기 (문자열)
Arduino.forBlock['ds1307_get_time_string'] = function (block, generator) {
  const num = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const format = block.getFieldValue('FORMAT') || 'DATETIME';

  let code = '';

  if (format === 'DATETIME') {
    code = `(String(rtc${num}.getTime(DFRobot_DS1307::DS1307_YR)) + "/" + 
                String(rtc${num}.getTime(DFRobot_DS1307::DS1307_MTH)) + "/" + 
                String(rtc${num}.getTime(DFRobot_DS1307::DS1307_DATE)) + " " + 
                String(rtc${num}.getTime(DFRobot_DS1307::DS1307_HR)) + ":" + 
                String(rtc${num}.getTime(DFRobot_DS1307::DS1307_MIN)) + ":" + 
                String(rtc${num}.getTime(DFRobot_DS1307::DS1307_SEC)))`;
  } else if (format === 'DATE') {
    code = `(String(rtc${num}.getTime(DFRobot_DS1307::DS1307_YR)) + "/" + 
                String(rtc${num}.getTime(DFRobot_DS1307::DS1307_MTH)) + "/" + 
                String(rtc${num}.getTime(DFRobot_DS1307::DS1307_DATE)))`;
  } else if (format === 'TIME') {
    code = `(String(rtc${num}.getTime(DFRobot_DS1307::DS1307_HR)) + ":" + 
                String(rtc${num}.getTime(DFRobot_DS1307::DS1307_MIN)) + ":" + 
                String(rtc${num}.getTime(DFRobot_DS1307::DS1307_SEC)))`;
  }

  return [code, Arduino.ORDER_ADDITIVE];
};

// -------- BMP280 설정 및 제어 (DFRobot_BMP280 라이브러리 기준) --------
Arduino.forBlock['bmp280_setup'] = function (block, generator) {
  // 🔥 [NEW] 보드 분기 처리
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));
  if (isEsp32 || isPico) {
    generator.definitions_['include_wire_bmp'] = '#include <Wire.h>';
  }
  generator.definitions_['include_bmp280'] = '#include <DFRobot_BMP280.h>';
  generator.definitions_['bmp_object'] = 'DFRobot_BMP280 bmp280;';
  generator.definitions_['bmp_sea_level'] = 'float bmp280_seaLevelPressure = 101325.0;';
  generator.definitions_['bmp_reference'] = 'float bmp280_referencePressure = 0.0; ';
  generator.definitions_['bmp_reference_alt'] = 'float bmp280_referenceAltitude = 0.0; ';

  generator.setups_['bmp_begin'] = `if (!bmp280.begin()) {
    Serial.println("BMP280 init failed!");
    while (1);
  }
  delay(100);
  bmp280_referencePressure = bmp280.getPressure();`;

  return '';
};

Arduino.forBlock['bmp280_set_sea_pressure'] = function (block, generator) {
  const pressure = generator.valueToCode(block, 'PRESSURE', Arduino.ORDER_ATOMIC) || '1013.25';

  return `// 기상청 해수면 기압 설정 (${pressure} hPa)
bmp280_seaLevelPressure = ${pressure} * 100.0; // hPa를 Pa로 변환
Serial.print("Sea level pressure set to: ");
Serial.print(bmp280_seaLevelPressure);
Serial.println(" Pa");`;
};

Arduino.forBlock['bmp280_set_reference'] = function (block, generator) {
  const altitude = generator.valueToCode(block, 'ALTITUDE', Arduino.ORDER_ATOMIC) || '0';

  return `// 기준점 설정 (${altitude}m)
bmp280_referencePressure = bmp280.getPressure();
bmp280_referenceAltitude = ${altitude};
Serial.print("Reference point set at ");
Serial.print(bmp280_referenceAltitude);
Serial.print("m, pressure: ");
Serial.print(bmp280_referencePressure);
Serial.println(" Pa");`;
};

Arduino.forBlock['bmp280_read_value'] = function (block, generator) {
  const field = block.getFieldValue('FIELD');

  switch (field) {
    case 'TEMP':
      return [`bmp280.getTemperature()`, Arduino.ORDER_ATOMIC];

    case 'PRES':
      return [`bmp280.getPressure()`, Arduino.ORDER_ATOMIC];

    case 'PRES_HPA':
      return [`(bmp280.getPressure() / 100.0)`, Arduino.ORDER_ATOMIC];

    case 'ALT':
      // 해수면 기압을 이용한 절대 고도 계산
      return [`(44330.0 * (1.0 - pow(bmp280.getPressure() / bmp280_seaLevelPressure, 0.1903)))`, Arduino.ORDER_ATOMIC];

    case 'REL_ALT':
    default:
      // 기준점 대비 상대 고도 계산
      return [`(bmp280_referenceAltitude + (44330.0 * (1.0 - pow(bmp280.getPressure() / bmp280_referencePressure, 0.1903))))`, Arduino.ORDER_ATOMIC];
  }
};

// ㅡMPU 6050블록들
// ⓐ 블록 타입이 bx_mpu_setup 인 경우
Arduino.forBlock['bx_mpu_setup'] = function (block, generator) {
  generator.definitions_ = generator.definitions_ || {};
  generator.setups_ = generator.setups_ || {};

  // 🔥 [NEW] 보드 분기 처리
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));
  if (isEsp32 || isPico) {
    generator.definitions_['include_wire_mpu'] = '#include <Wire.h>';
  }
  generator.definitions_['mpu_include_hdr'] = '#include "MPU6050_tockn.h"';
  generator.definitions_['mpu_object'] = 'MPU6050 mpu6050(Wire);';

  generator.setups_['mpu_begin'] = `Wire.begin();
mpu6050.begin();`;

  return '';
};

// 값 갱신
Arduino.forBlock['bx_mpu_update'] = function (block, generator) {
  return 'mpu6050.update();\n';
};

// 값 읽기
Arduino.forBlock['bx_mpu_read_value'] = function (block, generator) {
  var f = block.getFieldValue('FIELD');
  var code = '0';
  switch (f) {
    case 'TEMP': code = 'mpu6050.getTemp()'; break;
    case 'ANGLEX': code = 'mpu6050.getAngleX()'; break;
    case 'ANGLEY': code = 'mpu6050.getAngleY()'; break;
    case 'ANGLEZ': code = 'mpu6050.getAngleZ()'; break;
    case 'ACCX': code = 'mpu6050.getAccX()'; break;
    case 'ACCY': code = 'mpu6050.getAccY()'; break;
    case 'ACCZ': code = 'mpu6050.getAccZ()'; break;
    case 'GYROX': code = 'mpu6050.getGyroX()'; break;
    case 'GYROY': code = 'mpu6050.getGyroY()'; break;
    case 'GYROZ': code = 'mpu6050.getGyroZ()'; break;
  }
  return [code, Arduino.ORDER_ATOMIC];
};

// 오프셋 수동 설정
Arduino.forBlock['bx_mpu_set_offsets'] = function (block, generator) {
  var x = generator.valueToCode(block, 'X', Arduino.ORDER_ATOMIC) || '0';
  var y = generator.valueToCode(block, 'Y', Arduino.ORDER_ATOMIC) || '0';
  var z = generator.valueToCode(block, 'Z', Arduino.ORDER_ATOMIC) || '0';
  return 'mpu6050.setGyroOffsets(' + x + ', ' + y + ', ' + z + ');\n';
};

// 오프셋 자동 계산 (콘솔 출력 없음)
Arduino.forBlock['bx_mpu_calc_offsets'] = function (block, generator) {
  var db = generator.valueToCode(block, 'DELAY_B', Arduino.ORDER_ATOMIC) || '1000';
  var da = generator.valueToCode(block, 'DELAY_A', Arduino.ORDER_ATOMIC) || '3000';
  return 'mpu6050.calcGyroOffsets(false, ' + db + ', ' + da + ');\n';
};



/* ===== CO2/TVOC (Adafruit SGP30) Generators ===== */

// 설정하기: include는 여기서만
Arduino.forBlock['sgp30_setup'] = function (block, generator) {
  const ebase = generator.valueToCode(block, 'EBASE', Arduino.ORDER_ATOMIC) || '0';
  const tbase = generator.valueToCode(block, 'TBASE', Arduino.ORDER_ATOMIC) || '0';

  // includes 
  // 🔥 [NEW] 보드 분기 처리
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));
  if (isEsp32 || isPico) {
    generator.definitions_['include_wire_sgp'] = '#include <Wire.h>';
  }
  generator.definitions_['inc_eeprom'] = '#include <EEPROM.h>';
  generator.definitions_['inc_sgp30'] = '#include "Adafruit_SGP30.h"';

  // 전역 객체
  generator.definitions_['var_sgp'] = 'Adafruit_SGP30 sgp;';

  // setup
  generator.setups_['wire_begin'] = 'Wire.begin();';
  // sgp.begin()는 initSensor=true(기본값)로 IAQinit을 내부 호출 (라이브러리 구현) 
  generator.setups_['sgp_begin'] = 'sgp.begin();';

  // 선택적 베이스라인 초기 설정
  // (두 값이 모두 양수일 때만 호출하도록 간단히 처리)
  let code = '';
  code += 'if ((' + ebase + ') > 0 && (' + tbase + ') > 0) {\n';
  code += '  sgp.setIAQBaseline((uint16_t)(' + ebase + '), (uint16_t)(' + tbase + '));\n';
  code += '}\n';
  return code;
};

// 측정 실행: IAQmeasure()로 eCO2/TVOC 내부값 갱신
Arduino.forBlock['sgp30_measure'] = function (block, generator) {
  // 반환 불리언은 무시하고 단순 호출, 짧은 대기 추가
  return 'sgp.IAQmeasure();\n';
};

// eCO2 읽기 (리포터)
Arduino.forBlock['sgp30_get_eco2'] = function (block, generator) {
  return ['sgp.eCO2', Arduino.ORDER_ATOMIC];
};

// TVOC 읽기 (리포터)
Arduino.forBlock['sgp30_get_tvoc'] = function (block, generator) {
  return ['sgp.TVOC', Arduino.ORDER_ATOMIC];
};

// 습도 보정
Arduino.forBlock['sgp30_set_humidity'] = function (block, generator) {
  const ah = generator.valueToCode(block, 'AH', Arduino.ORDER_ATOMIC) || '0';
  return 'sgp.setHumidity((uint32_t)(' + ah + '));\n';
};

// 베이스라인 설정
Arduino.forBlock['sgp30_set_baseline'] = function (block, generator) {
  const ebase = generator.valueToCode(block, 'EBASE', Arduino.ORDER_ATOMIC) || '0';
  const tbase = generator.valueToCode(block, 'TBASE', Arduino.ORDER_ATOMIC) || '0';
  return 'sgp.setIAQBaseline((uint16_t)(' + ebase + '), (uint16_t)(' + tbase + '));\n';
};
/* ===== SGP30 — EEPROM 베이스라인 (Generators) ===== */

// 고정주소: eCO2 @0, TVOC @2
Arduino.forBlock['sgp30_eeprom_save_baseline_fixed'] = function (block, generator) {
  let code = 'uint16_t __eco2=0, __tvoc=0;\n';
  code += 'sgp.getIAQBaseline(&__eco2, &__tvoc);\n';
  code += 'EEPROM.put(0, __eco2);\n';
  code += 'EEPROM.put(2, __tvoc);\n';
  return code;
};

Arduino.forBlock['sgp30_eeprom_load_baseline_fixed'] = function (block, generator) {
  let code = 'uint16_t __eco2=0, __tvoc=0;\n';
  code += 'EEPROM.get(0, __eco2);\n';
  code += 'EEPROM.get(2, __tvoc);\n';
  code += 'if (__eco2>0 || __tvoc>0) { sgp.setIAQBaseline(__eco2, __tvoc); }\n';
  return code;
};

// 고급: 주소 입력형
Arduino.forBlock['sgp30_eeprom_save_baseline'] = function (block, generator) {
  const aE = generator.valueToCode(block, 'ADDR_E', Arduino.ORDER_ATOMIC) || '0';
  const aT = generator.valueToCode(block, 'ADDR_T', Arduino.ORDER_ATOMIC) || '2';
  let code = 'uint16_t __eco2=0, __tvoc=0;\n';
  code += 'sgp.getIAQBaseline(&__eco2, &__tvoc);\n';
  code += 'EEPROM.put((int)(' + aE + '), __eco2);\n';
  code += 'EEPROM.put((int)(' + aT + '), __tvoc);\n';
  return code;
};

Arduino.forBlock['sgp30_eeprom_load_baseline'] = function (block, generator) {
  const aE = generator.valueToCode(block, 'ADDR_E', Arduino.ORDER_ATOMIC) || '0';
  const aT = generator.valueToCode(block, 'ADDR_T', Arduino.ORDER_ATOMIC) || '2';
  let code = 'uint16_t __eco2=0, __tvoc=0;\n';
  code += 'EEPROM.get((int)(' + aE + '), __eco2);\n';
  code += 'EEPROM.get((int)(' + aT + '), __tvoc);\n';
  code += 'if (__eco2>0 || __tvoc>0) { sgp.setIAQBaseline(__eco2, __tvoc); }\n';
  return code;
};
/* ===== VL53L0X Laser (DFRobot_VL53L0X) Generators ===== */

// 설정 블록: include는 여기서만!
Arduino.forBlock['vl53l0x_setup'] = function (block, generator) {
  const addr = generator.valueToCode(block, 'ADDR', Arduino.ORDER_ATOMIC) || '0x29';

  // includes 
  // 🔥 [NEW] 보드 분기 처리
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));
  if (isEsp32 || isPico) {
    generator.definitions_['include_wire_vl53'] = '#include <Wire.h>';
  }
  generator.definitions_['inc_vl53'] = '#include "DFRobot_VL53L0X.h"';

  // 전역 객체
  generator.definitions_['var_vl53'] = 'DFRobot_VL53L0X vl53;';

  // setup
  generator.setups_['wire_begin'] = 'Wire.begin();';
  generator.setups_['vl53_begin'] = 'vl53.begin((uint8_t)(' + addr + '));';

  return '';
};

// 모드/정밀도 설정
Arduino.forBlock['vl53l0x_set_mode'] = function (block, generator) {
  const mode = block.getFieldValue('MODE') || 'eSingle';
  const prec = block.getFieldValue('PREC') || 'eHigh';
  return 'vl53.setMode(DFRobot_VL53L0X::' + mode + ', DFRobot_VL53L0X::' + prec + ');\n';
};
// 통합 제어: START/STOP
Arduino.forBlock['vl53l0x_control'] = function (block, generator) {
  const act = block.getFieldValue('ACT');
  if (act === 'START') return 'vl53.start();\n';
  if (act === 'STOP') return 'vl53.stop();\n';
  return '';
};

// 통합 읽기: 거리/주변광/신호/상태 (리포터)
Arduino.forBlock['vl53l0x_read_value'] = function (block, generator) {
  const what = block.getFieldValue('WHAT');
  switch (what) {
    case 'DIST': return ['vl53.getDistance()', Arduino.ORDER_ATOMIC];
    case 'AMBIENT': return ['vl53.getAmbientCount()', Arduino.ORDER_ATOMIC];
    case 'SIGNAL': return ['vl53.getSignalCount()', Arduino.ORDER_ATOMIC];
    case 'STATUS': return ['vl53.getStatus()', Arduino.ORDER_ATOMIC];
    default: return ['0', Arduino.ORDER_ATOMIC];
  }
};

// SHT31 센서 설정
Arduino.forBlock['sht31_setup'] = function (block, generator) {
  const address = generator.valueToCode(block, 'ADDRESS', Arduino.ORDER_ATOMIC) || '0x44';

  // 🔥 [NEW] 보드 분기 처리
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));
  if (isEsp32 || isPico) {
    generator.definitions_['include_wire_sht31'] = '#include <Wire.h>';
  }
  generator.definitions_['include_sht31'] = '#include "SHT31.h"';
  generator.definitions_['var_sht31'] = 'SHT31 sht31 = SHT31();';

  const code = 'sht31.begin(' + address + ');\n';
  return code;
};

// SHT31 센서 읽기
Arduino.forBlock['sht31_read'] = function (block, generator) {
  const fast = block.getFieldValue('FAST');
  const code = 'sht31.read(' + fast + ')';
  return [code, Arduino.ORDER_ATOMIC];
};

// SHT31 센서 연결 확인
Arduino.forBlock['sht31_is_connected'] = function (block, generator) {
  const code = 'sht31.isConnected()';
  return [code, Arduino.ORDER_ATOMIC];
};

// SHT31 데이터 가져오기
Arduino.forBlock['sht31_get_data'] = function (block, generator) {
  const dataType = block.getFieldValue('DATA_TYPE');
  let code = '';

  switch (dataType) {
    case 'TEMP_C':
      code = 'sht31.getTemperature()';
      break;
    case 'TEMP_F':
      code = 'sht31.getFahrenheit()';
      break;
    case 'HUMIDITY':
      code = 'sht31.getHumidity()';
      break;
    default:
      code = 'sht31.getTemperature()';
  }

  return [code, Arduino.ORDER_ATOMIC];
};

// SHT31 히터 제어
Arduino.forBlock['sht31_heater_control'] = function (block, generator) {
  const action = block.getFieldValue('ACTION');
  let code = '';

  if (action === 'ON') {
    code = 'sht31.heatOn();\n';
  } else if (action === 'OFF') {
    code = 'sht31.heatOff();\n';
  }

  return code;
};

// SHT31 히터 상태 확인
Arduino.forBlock['sht31_is_heater_on'] = function (block, generator) {
  const code = 'sht31.isHeaterOn()';
  return [code, Arduino.ORDER_ATOMIC];
};

// SHT31 리셋
Arduino.forBlock['sht31_reset'] = function (block, generator) {
  const hard = block.getFieldValue('HARD');
  const code = 'sht31.reset(' + hard + ');\n';
  return code;
};

// SHT31 에러 코드 가져오기
Arduino.forBlock['sht31_get_error'] = function (block, generator) {
  const code = 'sht31.getError()';
  return [code, Arduino.ORDER_ATOMIC];
};
// 컬러센서 설정
Arduino.forBlock['color_sensor_setup'] = function (block, generator) {
  // 🔥 [NEW] 보드 분기 처리
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));
  if (isEsp32 || isPico) {
    generator.definitions_['include_wire_color'] = '#include <Wire.h>';
  }
  generator.definitions_['include_color_sensor'] = '#include "Color_sensor.h"';
  generator.definitions_['var_color_sensor'] = 'Color_sensor colorSensor = Color_sensor();';

  const code = 'colorSensor.setup();\n';
  return code;
};

// 컬러센서 초기화
Arduino.forBlock['color_sensor_init'] = function (block, generator) {
  const code = 'colorSensor.init();\n';
  return code;
};

// 컬러센서 색상감지 트리거
Arduino.forBlock['color_sensor_trigger'] = function (block, generator) {
  const adjust = block.getFieldValue('ADJUST');
  const code = 'colorSensor.triggerColorSensor(' + adjust + ');\n';
  return code;
};

// 컬러센서 데이터 가져오기
Arduino.forBlock['color_sensor_get_data'] = function (block, generator) {
  const dataType = block.getFieldValue('DATA_TYPE');
  let code = '';

  switch (dataType) {
    case 'RED':
      code = 'colorSensor.getRGBcomponent(COMPONENT_RED)';
      break;
    case 'GREEN':
      code = 'colorSensor.getRGBcomponent(COMPONENT_GREEN)';
      break;
    case 'BLUE':
      code = 'colorSensor.getRGBcomponent(COMPONENT_BLUE)';
      break;
    case 'HUE':
      code = 'colorSensor.getHSVcomponent(COMPONENT_HUE)';
      break;
    case 'SATURATION':
      code = 'colorSensor.getHSVcomponent(COMPONENT_SATURATION)';
      break;
    case 'VALUE':
      code = 'colorSensor.getHSVcomponent(COMPONENT_VALUE)';
      break;
    default:
      code = 'colorSensor.getRGBcomponent(COMPONENT_RED)';
  }

  return [code, Arduino.ORDER_ATOMIC];
};

// 컬러센서 특정 색상 확인
Arduino.forBlock['color_sensor_is_color'] = function (block, generator) {
  const colorId = block.getFieldValue('COLOR_ID');
  let code = '';

  switch (colorId) {
    case 'RED':
      code = 'colorSensor.isColor(COLOR_ID_RED)';
      break;
    case 'GREEN':
      code = 'colorSensor.isColor(COLOR_ID_GREEN)';
      break;
    case 'BLUE':
      code = 'colorSensor.isColor(COLOR_ID_BLUE)';
      break;
    case 'YELLOW':
      code = 'colorSensor.isColor(COLOR_ID_YELLOW)';
      break;
    case 'CYAN':
      code = 'colorSensor.isColor(COLOR_ID_CYAN)';
      break;
    case 'MAGENTA':
      code = 'colorSensor.isColor(COLOR_ID_MAGENTA)';
      break;
    default:
      code = 'colorSensor.isColor(COLOR_ID_RED)';
  }

  return [code, Arduino.ORDER_ATOMIC];
};
// DFRobot_MLX90614 코드 생성기

// 1. 설정 블록 코드 생성기
Arduino.forBlock['mlx90614_setup'] = function (block, generator) {
  const address = generator.valueToCode(block, 'ADDRESS', Arduino.ORDER_ATOMIC) || '0x5A';

  // 설정 블록에서만 include와 객체 정의 생성
  // 🔥 [NEW] 보드 분기 처리
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));
  if (isEsp32 || isPico) {
    generator.definitions_['include_wire_mlx'] = '#include <Wire.h>';
  }
  generator.definitions_['include_mlx90614'] = '#include "DFRobot_MLX90614.h"';
  generator.definitions_['mlx90614_sensor'] = `DFRobot_MLX90614 mlx90614(${address});`;

  // begin() 함수는 private이므로 호출하지 않음 (자동 초기화됨)

  return '';
};

// 2. 온도 읽기 블록 코드 생성기
Arduino.forBlock['mlx90614_read_temp'] = function (block, generator) {
  const tempType = block.getFieldValue('TEMP_TYPE') || 'OBJECT';
  const unit = block.getFieldValue('UNIT') || 'C';

  let code;

  if (tempType === 'OBJECT') {
    if (unit === 'C') {
      code = 'mlx90614.getObjectTempC()';
    } else {
      code = 'mlx90614.getObjectTempF()';
    }
  } else { // AMBIENT
    if (unit === 'C') {
      code = 'mlx90614.getAmbientTempC()';
    } else {
      code = 'mlx90614.getAmbientTempF()';
    }
  }

  return [code, Arduino.ORDER_ATOMIC];
};

// APDS9960 센서 초기화
Arduino.forBlock['apds9960_setup'] = function (block, generator) {
  // 🔥 [NEW] 보드 분기 처리
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));
  if (isEsp32 || isPico) {
    generator.definitions_['include_wire_apds'] = '#include <Wire.h>';
  }
  generator.definitions_['include_apds9960'] = '#include "SparkFun_APDS9960.h"';
  generator.definitions_['var_apds9960'] = 'SparkFun_APDS9960 apds = SparkFun_APDS9960();';

  const code = 'apds.init();\n';
  return code;
};

// APDS9960 센서 제어 (활성화/비활성화 통합)
Arduino.forBlock['apds9960_sensor_control'] = function (block, generator) {
  const sensorType = block.getFieldValue('SENSOR_TYPE');
  const action = block.getFieldValue('ACTION');
  const interrupt = block.getFieldValue('INTERRUPT');
  let code = '';

  if (action === 'ENABLE') {
    switch (sensorType) {
      case 'LIGHT':
        code = 'apds.enableLightSensor(' + interrupt + ');\n';
        break;
      case 'PROXIMITY':
        code = 'apds.enableProximitySensor(' + interrupt + ');\n';
        break;
      case 'GESTURE':
        code = 'apds.enableGestureSensor(' + interrupt + ');\n';
        break;
    }
  } else if (action === 'DISABLE') {
    switch (sensorType) {
      case 'LIGHT':
        code = 'apds.disableLightSensor();\n';
        break;
      case 'PROXIMITY':
        code = 'apds.disableProximitySensor();\n';
        break;
      case 'GESTURE':
        code = 'apds.disableGestureSensor();\n';
        break;
    }
  }

  return code;
};

// APDS9960 광량 읽기
Arduino.forBlock['apds9960_read_light'] = function (block, generator) {
  const lightType = block.getFieldValue('LIGHT_TYPE');
  let code = '';

  switch (lightType) {
    case 'AMBIENT':
      generator.definitions_['var_ambient_light'] = 'uint16_t ambient_light;';
      code = '(apds.readAmbientLight(ambient_light) ? ambient_light : 0)';
      break;
    case 'RED':
      generator.definitions_['var_red_light'] = 'uint16_t red_light;';
      code = '(apds.readRedLight(red_light) ? red_light : 0)';
      break;
    case 'GREEN':
      generator.definitions_['var_green_light'] = 'uint16_t green_light;';
      code = '(apds.readGreenLight(green_light) ? green_light : 0)';
      break;
    case 'BLUE':
      generator.definitions_['var_blue_light'] = 'uint16_t blue_light;';
      code = '(apds.readBlueLight(blue_light) ? blue_light : 0)';
      break;
  }

  return [code, Arduino.ORDER_ATOMIC];
};

// APDS9960 근접센서 읽기
Arduino.forBlock['apds9960_read_proximity'] = function (block, generator) {
  generator.definitions_['var_proximity'] = 'uint8_t proximity_val;';
  const code = '(apds.readProximity(proximity_val) ? proximity_val : 0)';
  return [code, Arduino.ORDER_ATOMIC];
};

// APDS9960 제스처 사용 가능 확인
Arduino.forBlock['apds9960_gesture_available'] = function (block, generator) {
  const code = 'apds.isGestureAvailable()';
  return [code, Arduino.ORDER_ATOMIC];
};

// APDS9960 제스처 제어 (읽기/확인 통합)
Arduino.forBlock['apds9960_gesture_control'] = function (block, generator) {
  const action = block.getFieldValue('ACTION');
  const gestureType = block.getFieldValue('GESTURE_TYPE');
  let code = '';

  if (action === 'READ') {
    code = 'apds.readGesture()';
  } else if (action === 'CHECK') {
    let gestureCode = '';

    switch (gestureType) {
      case 'LEFT':
        gestureCode = 'DIR_LEFT';
        break;
      case 'RIGHT':
        gestureCode = 'DIR_RIGHT';
        break;
      case 'UP':
        gestureCode = 'DIR_UP';
        break;
      case 'DOWN':
        gestureCode = 'DIR_DOWN';
        break;
      case 'NEAR':
        gestureCode = 'DIR_NEAR';
        break;
      case 'FAR':
        gestureCode = 'DIR_FAR';
        break;
    }

    code = '(apds.readGesture() == ' + gestureCode + ' ? 1 : 0)';
  }

  return [code, Arduino.ORDER_ATOMIC];
};
// MAX30105 심박센서 코드 생성기 (실용적 버전)

// 1. 기본 센서 설정 블록
Arduino.forBlock['max30105_setup_basic'] = function (block, generator) {
  // 필요한 라이브러리들 포함
  // 🔥 [NEW] 보드 분기 처리
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));
  if (isEsp32 || isPico) {
    generator.definitions_['include_wire_max'] = '#include <Wire.h>';
  }
  generator.definitions_['include_max30105'] = '#include "MAX30105.h"';
  generator.definitions_['include_heartrate'] = '#include "heartRate.h"';
  generator.definitions_['obj_max30105'] = 'MAX30105 heartSensor;';

  // 심박수 계산을 위한 변수들
  generator.definitions_['heartrate_vars'] = `const byte RATE_SIZE = 4;
unsigned long rateArray[RATE_SIZE];
byte rateArrayIndex = 0;
long lastBeat = 0;
int beatsPerMinute = 0;
bool fingerDetected = false;
unsigned long irBuffer[100];
unsigned long redBuffer[100];
int bufferLength = 100;
int spo2 = 0;
bool validSPO2 = false;
bool validHeartRate = false;`;

  // 초기화 코드
  generator.setups_['init_max30105'] = `if (!heartSensor.begin()) {
    Serial.println("Heart rate sensor not found!");
    while(1);
  }
  heartSensor.setup();
  heartSensor.setPulseAmplitudeRed(0x0A);
  heartSensor.setPulseAmplitudeGreen(0);`;

  return '';
};

// 2. 심박수 측정 블록
Arduino.forBlock['max30105_get_heartrate'] = function (block, generator) {
  // 심박수 계산 함수 추가
  generator.definitions_['heartrate_function'] = `int calculateHeartRate() {
  long irValue = heartSensor.getIR();
  
  if (checkForBeat(irValue)) {
    long delta = millis() - lastBeat;
    lastBeat = millis();
    
    beatsPerMinute = 60 / (delta / 1000.0);
    
    if (beatsPerMinute < 255 && beatsPerMinute > 20) {
      rateArray[rateArrayIndex++] = (byte)beatsPerMinute;
      rateArrayIndex %= RATE_SIZE;
      
      long total = 0;
      for (byte i = 0; i < RATE_SIZE; i++) {
        total += rateArray[i];
      }
      beatsPerMinute = total / RATE_SIZE;
      validHeartRate = true;
    }
  }
  
  if (irValue < 50000) {
    validHeartRate = false;
    return 0;
  }
  
  return validHeartRate ? beatsPerMinute : 0;
}`;

  return ['calculateHeartRate()', Arduino.ORDER_ATOMIC];
};

// 3. 혈중산소포화도 측정 블록
Arduino.forBlock['max30105_get_spo2'] = function (block, generator) {
  // SpO2 계산 함수 추가
  generator.definitions_['spo2_function'] = `int calculateSpO2() {
  static int bufferIndex = 0;
  
  redBuffer[bufferIndex] = heartSensor.getRed();
  irBuffer[bufferIndex] = heartSensor.getIR();
  bufferIndex++;
  
  if (bufferIndex >= bufferLength) {
    bufferIndex = 0;
    
    // 간단한 SpO2 계산 (실제로는 더 복잡한 알고리즘 필요)
    long redAverage = 0, irAverage = 0;
    for (int i = 0; i < bufferLength; i++) {
      redAverage += redBuffer[i];
      irAverage += irBuffer[i];
    }
    redAverage /= bufferLength;
    irAverage /= bufferLength;
    
    if (irAverage > 50000 && redAverage > 50000) {
      double ratio = (double)redAverage / (double)irAverage;
      spo2 = (int)(104 - 17 * ratio); // 근사 공식
      spo2 = constrain(spo2, 70, 100);
      validSPO2 = true;
    } else {
      validSPO2 = false;
      spo2 = 0;
    }
  }
  
  return validSPO2 ? spo2 : 0;
}`;

  return ['calculateSpO2()', Arduino.ORDER_ATOMIC];
};

// 4. 손가락 감지 블록
Arduino.forBlock['max30105_finger_detected'] = function (block, generator) {
  return ['(heartSensor.getIR() > 50000)', Arduino.ORDER_RELATIONAL];
};

// 5. 심박 비트 감지 블록
Arduino.forBlock['max30105_beat_detected'] = function (block, generator) {
  return ['checkForBeat(heartSensor.getIR())', Arduino.ORDER_ATOMIC];
};

// 6. 센서 상태 확인 블록
Arduino.forBlock['max30105_sensor_ready'] = function (block, generator) {
  return ['(heartSensor.getIR() > 50000 && millis() > 5000)', Arduino.ORDER_LOGICAL_AND];
};

// 7. 온도 읽기 블록
Arduino.forBlock['max30105_get_temperature'] = function (block, generator) {
  return ['heartSensor.readTemperature()', Arduino.ORDER_ATOMIC];
};

// 8. 고급 설정 블록
Arduino.forBlock['max30105_setup_advanced'] = function (block, generator) {
  const mode = block.getFieldValue('MODE') || 'HEARTRATE';
  const power = block.getFieldValue('POWER') || 'MEDIUM';

  // 라이브러리 포함
  // 🔥 [NEW] 보드 분기 처리
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));
  if (isEsp32 || isPico) {
    generator.definitions_['include_wire_max'] = '#include <Wire.h>';
  }
  generator.definitions_['include_max30105'] = '#include "MAX30105.h"';
  generator.definitions_['include_heartrate'] = '#include "heartRate.h"';
  generator.definitions_['obj_max30105'] = 'MAX30105 heartSensor;';

  // 전력 설정
  let powerValue;
  switch (power) {
    case 'LOW': powerValue = '0x02'; break;
    case 'MEDIUM': powerValue = '0x1F'; break;
    case 'HIGH': powerValue = '0x7F'; break;
    default: powerValue = '0x1F';
  }

  // 모드별 설정
  let setupCode;
  switch (mode) {
    case 'HEARTRATE':
      setupCode = `heartSensor.setup(${powerValue}, 4, 2, 100);`;
      break;
    case 'OXYGEN':
      setupCode = `heartSensor.setup(${powerValue}, 8, 2, 200);`;
      break;
    case 'PROXIMITY':
      setupCode = `heartSensor.setup(${powerValue}, 1, 1, 50);`;
      break;
    default:
      setupCode = `heartSensor.setup(${powerValue}, 4, 2, 100);`;
  }

  // 변수들 및 초기화
  generator.definitions_['heartrate_vars'] = `const byte RATE_SIZE = 4;
unsigned long rateArray[RATE_SIZE];
byte rateArrayIndex = 0;
long lastBeat = 0;
int beatsPerMinute = 0;
bool fingerDetected = false;`;

  generator.setups_['init_max30105'] = `if (!heartSensor.begin()) {
    Serial.println("Heart rate sensor not found!");
    while(1);
  }
  ${setupCode}`;

  return '';
};

// 9. 원시 적색 LED 값 (고급용)
Arduino.forBlock['max30105_get_red_raw'] = function (block, generator) {
  return ['heartSensor.getRed()', Arduino.ORDER_ATOMIC];
};

// 10. 원시 적외선 LED 값 (고급용)
Arduino.forBlock['max30105_get_ir_raw'] = function (block, generator) {
  return ['heartSensor.getIR()', Arduino.ORDER_ATOMIC];
};

// -------- Adafruit Si7021 온습도 센서 --------
Arduino.forBlock['si7021_setup'] = function (block, generator) {
  // 🔥 [NEW] 보드 분기 처리
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));
  if (isEsp32 || isPico) {
    generator.definitions_['include_wire_si7021'] = '#include <Wire.h>';
  }
  generator.definitions_['include_si7021'] = '#include "Adafruit_Si7021.h"';
  generator.definitions_['si7021_object'] = 'Adafruit_Si7021 si7021;';

  generator.setups_['si7021_begin'] = 'if (!si7021.begin()) {\n    Serial.println("Si7021 sensor not found!");\n    while (1);\n  }';

  return '';
};

Arduino.forBlock['si7021_read_value'] = function (block, generator) {
  const valueType = block.getFieldValue('VALUE_TYPE');

  switch (valueType) {
    case 'TEMP':
      return ['si7021.readTemperature()', Arduino.ORDER_ATOMIC];
    case 'HUMIDITY':
    default:
      return ['si7021.readHumidity()', Arduino.ORDER_ATOMIC];
  }
};

Arduino.forBlock['si7021_reset'] = function (block, generator) {
  return 'si7021.reset();\n';
};

Arduino.forBlock['si7021_get_serial'] = function (block, generator) {
  const serialPart = block.getFieldValue('SERIAL_PART');

  // 시리얼 번호를 읽기 위해 먼저 readSerialNumber() 호출 필요
  generator.setups_['si7021_read_serial'] = 'si7021.readSerialNumber();';

  switch (serialPart) {
    case 'SERIAL_A':
      return ['si7021.sernum_a', Arduino.ORDER_ATOMIC];
    case 'SERIAL_B':
    default:
      return ['si7021.sernum_b', Arduino.ORDER_ATOMIC];
  }
};

// =================================================== 13. 모터 카테고리  ================================================================

// 1. 서보 연결 (기본)
Arduino.forBlock['attach_servo'] = function (block, generator) {
  var pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '9';
  var pinVar = pin.replace('A', '');
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  generator.definitions_['include_servo'] = isEsp32 ? '#include <ESP32Servo.h>' : '#include <Servo.h>';
  generator.definitions_['servo_object_' + pinVar] = 'Servo servo_' + pinVar + ';';
  return 'servo_' + pinVar + '.attach(' + pin + ');\n';
};

// 2. 서보 연결 (최소/최대값 설정)
Arduino.forBlock['attach_servo_minmax'] = function (block, generator) {
  var pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '9';
  var pinVar = pin.replace('A', '');
  var min = generator.valueToCode(block, 'MIN', Arduino.ORDER_ATOMIC) || '500';
  var max = generator.valueToCode(block, 'MAX', Arduino.ORDER_ATOMIC) || '5000';
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  generator.definitions_['include_servo'] = isEsp32 ? '#include <ESP32Servo.h>' : '#include <Servo.h>';
  generator.definitions_['servo_object_' + pinVar] = 'Servo servo_' + pinVar + ';';
  return 'servo_' + pinVar + '.attach(' + pin + ', ' + min + ', ' + max + ');\n';
};

// 3. 서보 분리
Arduino.forBlock['detach_servo'] = function (block, generator) {
  var pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '9';
  var pinVar = pin.replace('A', '');
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  generator.definitions_['include_servo'] = isEsp32 ? '#include <ESP32Servo.h>' : '#include <Servo.h>';
  generator.definitions_['servo_object_' + pinVar] = 'Servo servo_' + pinVar + ';';
  return 'servo_' + pinVar + '.detach();\n';
};

// 4. 서보 각도 설정 - 상단 중복 제거를 위해 주석 처리하거나 상단과 동기화
// 여기서는 상단(line 120)에 정의되어 있으므로 하단은 삭제 및 통합 관리 권장
// 하지만 카테고리별 분리를 위해 유지한다면 상단과 동일하게 수정
Arduino.forBlock['set_servo_angle_alt'] = function (block, generator) {
  return Arduino.forBlock['set_servo_angle'](block, generator);
};

// 5. 서보 마이크로초 설정
Arduino.forBlock['set_servo_microseconds'] = function (block, generator) {
  var pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '9';
  var pinVar = pin.replace('A', '');
  var microseconds = generator.valueToCode(block, 'MICROSECONDS', Arduino.ORDER_ATOMIC) || '1500';
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  generator.definitions_['include_servo'] = isEsp32 ? '#include <ESP32Servo.h>' : '#include <Servo.h>';
  generator.definitions_['servo_object_' + pinVar] = 'Servo servo_' + pinVar + ';';
  generator.setups_['servo_attach_' + pinVar] = 'servo_' + pinVar + '.attach(' + pin + ');';
  return 'servo_' + pinVar + '.writeMicroseconds(' + microseconds + ');\n';
};

// 6. 서보 각도 읽기
Arduino.forBlock['read_servo_angle'] = function (block, generator) {
  var pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '9';
  var pinVar = pin.replace('A', '');
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  generator.definitions_['include_servo'] = isEsp32 ? '#include <ESP32Servo.h>' : '#include <Servo.h>';
  generator.definitions_['servo_object_' + pinVar] = 'Servo servo_' + pinVar + ';';
  generator.setups_['servo_attach_' + pinVar] = 'servo_' + pinVar + '.attach(' + pin + ');';
  var code = 'servo_' + pinVar + '.read()';
  return [code, Arduino.ORDER_ATOMIC];
};

// 7. 서보 마이크로초 읽기
Arduino.forBlock['read_servo_microseconds'] = function (block, generator) {
  var pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '9';
  var pinVar = pin.replace('A', '');
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  generator.definitions_['include_servo'] = isEsp32 ? '#include <ESP32Servo.h>' : '#include <Servo.h>';
  generator.definitions_['servo_object_' + pinVar] = 'Servo servo_' + pinVar + ';';
  generator.setups_['servo_attach_' + pinVar] = 'servo_' + pinVar + '.attach(' + pin + ');';
  var code = 'servo_' + pinVar + '.readMicroseconds()';
  return [code, Arduino.ORDER_ATOMIC];
};

// 8. 서보 연결 상태 확인
Arduino.forBlock['is_servo_attached'] = function (block, generator) {
  var pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '9';
  var pinVar = pin.replace('A', '');
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  generator.definitions_['include_servo'] = isEsp32 ? '#include <ESP32Servo.h>' : '#include <Servo.h>';
  generator.definitions_['servo_object_' + pinVar] = 'Servo servo_' + pinVar + ';';
  var code = 'servo_' + pinVar + '.attached()';
  return [code, Arduino.ORDER_ATOMIC];
};


// 9. Geekservo 각도 제어 (360도)
Arduino.forBlock['geekservo_angle_360'] = function (block, generator) {
  var pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '9';
  var angle = generator.valueToCode(block, 'ANGLE', Arduino.ORDER_ATOMIC) || '0';
  var pinVar = pin.replace('A', '');
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  generator.definitions_['include_servo'] = isEsp32 ? '#include <ESP32Servo.h>' : '#include <Servo.h>';
  generator.definitions_['servo_object_' + pinVar] = 'Servo servo_' + pinVar + ';';

  // [중요] Geekservo는 500~5000 범위를 쓰겠다고 명시적으로 attach 합니다.
  generator.setups_['servo_attach_' + pinVar] = 'servo_' + pinVar + '.attach(' + pin + ', 500, 5000);';

  // 수정된 라이브러리의 writeGeekAngle 함수 호출
  return 'servo_' + pinVar + '.writeGeekAngle(' + angle + ');\n';
};

// 10. Geekservo 바퀴 모드 (무한 회전)
Arduino.forBlock['geekservo_wheel'] = function (block, generator) {
  var pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '9';
  var speed = generator.valueToCode(block, 'SPEED', Arduino.ORDER_ATOMIC) || '100';
  var dir = block.getFieldValue('DIR'); // "TRUE" 또는 "FALSE" 반환
  var pinVar = pin.replace('A', '');
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  generator.definitions_['include_servo'] = isEsp32 ? '#include <ESP32Servo.h>' : '#include <Servo.h>';
  generator.definitions_['servo_object_' + pinVar] = 'Servo servo_' + pinVar + ';';

  // [중요] 모터 모드(3000~5000us)를 위해 범위를 5000까지 확장하여 attach 합니다.
  generator.setups_['servo_attach_' + pinVar] = 'servo_' + pinVar + '.attach(' + pin + ', 500, 5000);';

  var dirBool = (dir === 'TRUE') ? 'true' : 'false';
  // 수정된 라이브러리의 writeGeekWheel 함수 호출
  return 'servo_' + pinVar + '.writeGeekWheel(' + speed + ', ' + dirBool + ');\n';
};

// DC모터 블록 시작
Arduino.forBlock['dcmotor_setup'] = function (block, generator) {
  const motorNum = block.getFieldValue('MOTOR_NUM');
  const pinA = generator.valueToCode(block, 'PIN_A', Arduino.ORDER_ATOMIC) || '5';
  const pinB = generator.valueToCode(block, 'PIN_B', Arduino.ORDER_ATOMIC) || '2';

  // 설정 블록에서만 라이브러리를 선언합니다.
  generator.definitions_['include_dcmotor'] = '#include "DCmotor.h"';

  // DC모터 객체를 선언합니다.
  generator.definitions_['dcmotor_object_' + motorNum] = `DCmotor motor${motorNum}(${pinA}, ${pinB});`;

  return ''; // setup() 함수에 들어갈 코드는 없습니다.
};

Arduino.forBlock['dcmotor_run'] = function (block, generator) {
  const motorNum = block.getFieldValue('MOTOR_NUM');
  const speed = generator.valueToCode(block, 'SPEED', Arduino.ORDER_ATOMIC) || '150';
  const direction = block.getFieldValue('DIRECTION');

  const code = `motor${motorNum}.turnMotor(${direction}, ${speed});\n`;
  return code;
};

Arduino.forBlock['dcmotor_stop'] = function (block, generator) {
  const motorNum = block.getFieldValue('MOTOR_NUM');
  const code = `motor${motorNum}.stopMotor();\n`;
  return code;
};
// AccelStepper 라이브러리 설정
Arduino.forBlock['accelstepper_setup'] = function (block, generator) {
  const motorNum = generator.valueToCode(block, 'MOTOR_NUM', Arduino.ORDER_ATOMIC) || '1';
  const interface = block.getFieldValue('INTERFACE');
  const pin1 = generator.valueToCode(block, 'PIN1', Arduino.ORDER_ATOMIC) || '2';
  const pin2 = generator.valueToCode(block, 'PIN2', Arduino.ORDER_ATOMIC) || '3';

  generator.definitions_['include_accelstepper'] = '#include "AccelStepper.h"';

  let interfaceValue = '';
  switch (interface) {
    case 'DRIVER':
      interfaceValue = 'AccelStepper::DRIVER';
      break;
    case 'FULL2WIRE':
      interfaceValue = 'AccelStepper::FULL2WIRE';
      break;
    case 'FULL4WIRE':
      interfaceValue = 'AccelStepper::FULL4WIRE';
      break;
    case 'HALF4WIRE':
      interfaceValue = 'AccelStepper::HALF4WIRE';
      break;
    default:
      interfaceValue = 'AccelStepper::DRIVER';
  }

  generator.definitions_['var_stepper_' + motorNum] = 'AccelStepper stepper' + motorNum + '(' + interfaceValue + ', ' + pin1 + ', ' + pin2 + ');';

  const code = '// 스텝모터 ' + motorNum + ' 초기화 완료\n';
  return code;
};

// AccelStepper 설정 (속도, 가속도 등)
Arduino.forBlock['accelstepper_settings'] = function (block, generator) {
  const motorNum = generator.valueToCode(block, 'MOTOR_NUM', Arduino.ORDER_ATOMIC) || '1';
  const maxSpeed = generator.valueToCode(block, 'MAX_SPEED', Arduino.ORDER_ATOMIC) || '1000';
  const acceleration = generator.valueToCode(block, 'ACCELERATION', Arduino.ORDER_ATOMIC) || '50';
  const speed = generator.valueToCode(block, 'SPEED', Arduino.ORDER_ATOMIC) || '200';
  const steps = generator.valueToCode(block, 'STEPS', Arduino.ORDER_ATOMIC) || '200';

  let code = '';
  code += 'stepper' + motorNum + '.setMaxSpeed(' + maxSpeed + ');\n';
  code += 'stepper' + motorNum + '.setAcceleration(' + acceleration + ');\n';
  code += 'stepper' + motorNum + '.setSpeed(' + speed + ');\n';

  return code;
};

// AccelStepper 이동 제어
Arduino.forBlock['accelstepper_move'] = function (block, generator) {
  const motorNum = generator.valueToCode(block, 'MOTOR_NUM', Arduino.ORDER_ATOMIC) || '1';
  const moveType = block.getFieldValue('MOVE_TYPE');
  const position = generator.valueToCode(block, 'POSITION', Arduino.ORDER_ATOMIC) || '0';

  let code = '';

  switch (moveType) {
    case 'MOVE_TO':
      code = 'stepper' + motorNum + '.moveTo(' + position + ');\n';
      break;
    case 'MOVE_REL':
      code = 'stepper' + motorNum + '.move(' + position + ');\n';
      break;
    case 'SET_POS':
      code = 'stepper' + motorNum + '.setCurrentPosition(' + position + ');\n';
      break;
  }

  return code;
};

// AccelStepper 제어
Arduino.forBlock['accelstepper_control'] = function (block, generator) {
  const motorNum = generator.valueToCode(block, 'MOTOR_NUM', Arduino.ORDER_ATOMIC) || '1';
  const controlType = block.getFieldValue('CONTROL_TYPE');

  let code = '';

  switch (controlType) {
    case 'RUN':
      code = 'stepper' + motorNum + '.run();\n';
      break;
    case 'RUN_SPEED':
      code = 'stepper' + motorNum + '.runSpeed();\n';
      break;
    case 'RUN_TO_POS':
      code = 'stepper' + motorNum + '.runToPosition();\n';
      break;
    case 'STOP':
      code = 'stepper' + motorNum + '.stop();\n';
      break;
    case 'ENABLE':
      code = 'stepper' + motorNum + '.enableOutputs();\n';
      break;
    case 'DISABLE':
      code = 'stepper' + motorNum + '.disableOutputs();\n';
      break;
  }

  return code;
};

// AccelStepper 상태 확인
Arduino.forBlock['accelstepper_status'] = function (block, generator) {
  const motorNum = generator.valueToCode(block, 'MOTOR_NUM', Arduino.ORDER_ATOMIC) || '1';
  const statusType = block.getFieldValue('STATUS_TYPE');

  let code = '';

  switch (statusType) {
    case 'CURRENT_POS':
      code = 'stepper' + motorNum + '.currentPosition()';
      break;
    case 'TARGET_POS':
      code = 'stepper' + motorNum + '.targetPosition()';
      break;
    case 'DISTANCE':
      code = 'stepper' + motorNum + '.distanceToGo()';
      break;
    case 'IS_RUNNING':
      code = '(stepper' + motorNum + '.isRunning() ? 1 : 0)';
      break;
    case 'SPEED':
      code = 'stepper' + motorNum + '.speed()';
      break;
    default:
      code = '0';
  }

  return [code, Arduino.ORDER_ATOMIC];
};
// StepperMulti 모터 설정
Arduino.forBlock['steppermulti_setup'] = function (block, generator) {
  const motorType = block.getFieldValue('MOTOR_TYPE');
  const motorNum = generator.valueToCode(block, 'MOTOR_NUM', Arduino.ORDER_ATOMIC) || '1';
  const pinConfig = block.getFieldValue('PIN_CONFIG');
  const pin1 = generator.valueToCode(block, 'PIN1', Arduino.ORDER_ATOMIC) || '8';
  const pin2 = generator.valueToCode(block, 'PIN2', Arduino.ORDER_ATOMIC) || '9';
  const pin3 = generator.valueToCode(block, 'PIN3', Arduino.ORDER_ATOMIC) || '10';
  const pin4 = generator.valueToCode(block, 'PIN4', Arduino.ORDER_ATOMIC) || '11';

  generator.definitions_['include_steppermulti'] = '#include "StepperMulti.h"';

  let steps = '200'; // 기본값
  switch (motorType) {
    case '28BYJ':
      steps = '2048'; // 28BYJ-48 모터 스텝 수
      break;
    case 'ULN2003':
      steps = '2048'; // ULN2003도 보통 28BYJ-48과 함께 사용
      break;
    case 'CUSTOM':
      steps = '200'; // 사용자 정의 기본값
      break;
  }

  let constructorCode = '';
  if (pinConfig === '2PIN') {
    constructorCode = 'StepperMulti stepper' + motorNum + '(' + steps + ', ' + pin1 + ', ' + pin2 + ');';
  } else {
    constructorCode = 'StepperMulti stepper' + motorNum + '(' + steps + ', ' + pin1 + ', ' + pin2 + ', ' + pin3 + ', ' + pin4 + ');';
  }

  generator.definitions_['var_stepper_' + motorNum] = constructorCode;

  const code = '// 스텝모터 ' + motorNum + ' 초기화 완료\n';
  return code;
};

// StepperMulti 속도 설정
Arduino.forBlock['steppermulti_speed'] = function (block, generator) {
  const motorNum = generator.valueToCode(block, 'MOTOR_NUM', Arduino.ORDER_ATOMIC) || '1';
  const speed = generator.valueToCode(block, 'SPEED', Arduino.ORDER_ATOMIC) || '10';

  const code = 'stepper' + motorNum + '.setSpeed(' + speed + ');\n';
  return code;
};

// StepperMulti 이동 설정
Arduino.forBlock['steppermulti_move'] = function (block, generator) {
  const motorNum = generator.valueToCode(block, 'MOTOR_NUM', Arduino.ORDER_ATOMIC) || '1';
  const moveType = block.getFieldValue('MOVE_TYPE');
  const value = generator.valueToCode(block, 'VALUE', Arduino.ORDER_ATOMIC) || '10';

  let code = '';

  if (moveType === 'STEP') {
    code = 'stepper' + motorNum + '.setStep(' + value + ');\n';
  } else if (moveType === 'ANGLE') {
    // 각도를 스텝으로 변환 (28BYJ-48 기준: 2048 스텝 = 360도)
    // 다른 모터의 경우 적절히 조정 필요
    code = 'stepper' + motorNum + '.setStep((long)(' + value + ' * 2048.0 / 360.0));\n';
  }

  return code;
};

// StepperMulti 실행
Arduino.forBlock['steppermulti_run'] = function (block, generator) {
  const motorNum = generator.valueToCode(block, 'MOTOR_NUM', Arduino.ORDER_ATOMIC) || '1';

  const code = 'stepper' + motorNum + '.moveStep();\n';
  return code;
};

// ===================== PWM Servo Driver Generators =====================

// 1) 설정 블록
Arduino.forBlock['pwmservo_setup'] = function (block, generator) {
  const num = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const addr = block.getFieldValue('ADDR') || '0x40';
  const freq = generator.valueToCode(block, 'FREQ', Arduino.ORDER_ATOMIC) || '50';

  // 이 블록에서만 include 생성
  // 🔥 [NEW] 보드 분기 처리 (ESP32 및 Pico는 Wire 라이브러리 명시적 포함 권장)
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));

  if (isEsp32 || isPico) {
    generator.definitions_['include_wire_pwmservo'] = '#include <Wire.h>';
  }
  generator.definitions_['include_pwmservo'] = '#include <Adafruit_PWMServoDriver.h>';

  // 전역 객체
  generator.definitions_['pwmservo_obj_' + num] = `Adafruit_PWMServoDriver servo${num} = Adafruit_PWMServoDriver(${addr});`;

  // setup
  generator.setups_['wire_begin'] = 'Wire.begin();';
  generator.setups_['pwmservo_begin_' + num] =
    `servo${num}.begin();
  servo${num}.setPWMFreq(${freq});`;

  return '';
};

// 2) 서보모터 제어 (각도)
Arduino.forBlock['pwmservo_servo_angle'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const channel = generator.valueToCode(block, 'CHANNEL', Arduino.ORDER_ATOMIC) || '0';
  const angle = generator.valueToCode(block, 'ANGLE', Arduino.ORDER_ATOMIC) || '90';

  return `{
  int pulseWidth = map(${angle}, 0, 180, 500, 2500);
  servo${n}.writeMicroseconds(${channel}, pulseWidth);
}
`;
};

// 3) 서보모터 제어 (마이크로초)
Arduino.forBlock['pwmservo_servo_microseconds'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const channel = generator.valueToCode(block, 'CHANNEL', Arduino.ORDER_ATOMIC) || '0';
  const microseconds = generator.valueToCode(block, 'MICROSECONDS', Arduino.ORDER_ATOMIC) || '1500';

  return `servo${n}.writeMicroseconds(${channel}, ${microseconds});\n`;
};

// 4) PWM 출력 제어
Arduino.forBlock['pwmservo_pwm_output'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const channel = generator.valueToCode(block, 'CHANNEL', Arduino.ORDER_ATOMIC) || '0';
  const value = generator.valueToCode(block, 'VALUE', Arduino.ORDER_ATOMIC) || '2048';

  return `servo${n}.setPin(${channel}, ${value});\n`;
};

// 5) PWM 고급 제어
Arduino.forBlock['pwmservo_pwm_advanced'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const channel = generator.valueToCode(block, 'CHANNEL', Arduino.ORDER_ATOMIC) || '0';
  const on = generator.valueToCode(block, 'ON', Arduino.ORDER_ATOMIC) || '0';
  const off = generator.valueToCode(block, 'OFF', Arduino.ORDER_ATOMIC) || '2048';

  return `servo${n}.setPWM(${channel}, ${on}, ${off});\n`;
};

// 6) 전원 관리
Arduino.forBlock['pwmservo_power'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const action = block.getFieldValue('ACTION') || 'WAKEUP';
  let code = '';

  switch (action) {
    case 'WAKEUP':
      code = `servo${n}.wakeup();\n`;
      break;
    case 'SLEEP':
      code = `servo${n}.sleep();\n`;
      break;
    case 'RESET':
      code = `servo${n}.reset();\n`;
      break;
    default:
      code = `servo${n}.wakeup();\n`;
      break;
  }
  return code;
};

// 7) 다중 서보 제어
Arduino.forBlock['pwmservo_multi_servo'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const angle1 = generator.valueToCode(block, 'ANGLE1', Arduino.ORDER_ATOMIC) || '90';
  const angle2 = generator.valueToCode(block, 'ANGLE2', Arduino.ORDER_ATOMIC) || '90';
  const angle3 = generator.valueToCode(block, 'ANGLE3', Arduino.ORDER_ATOMIC) || '90';
  const angle4 = generator.valueToCode(block, 'ANGLE4', Arduino.ORDER_ATOMIC) || '90';

  return `{
  int pulse1 = map(${angle1}, 0, 180, 500, 2500);
  int pulse2 = map(${angle2}, 0, 180, 500, 2500);
  int pulse3 = map(${angle3}, 0, 180, 500, 2500);
  int pulse4 = map(${angle4}, 0, 180, 500, 2500);
  servo${n}.writeMicroseconds(0, pulse1);
  servo${n}.writeMicroseconds(1, pulse2);
  servo${n}.writeMicroseconds(2, pulse3);
  servo${n}.writeMicroseconds(3, pulse4);
}
`;
};

// 8) LED 밝기 제어
Arduino.forBlock['pwmservo_led_brightness'] = function (block, generator) {
  const n = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const channel = generator.valueToCode(block, 'CHANNEL', Arduino.ORDER_ATOMIC) || '0';
  const brightness = generator.valueToCode(block, 'BRIGHTNESS', Arduino.ORDER_ATOMIC) || '50';

  return `{
  int pwmValue = map(${brightness}, 0, 100, 0, 4095);
  servo${n}.setPin(${channel}, pwmValue);
}
`;
};

// ====================================================== 14. 출력장치 카테고리  =================================================================
Arduino.forBlock['buzzer_tone_setup'] = function (block, generator) {
  // 설정 블록에서만 라이브러리를 선언합니다.
  generator.definitions_['include_buzzer_tone'] = '#include "tone.h"';

  // 버저 객체와 템포 변수를 전역으로 선언합니다.
  generator.definitions_['buzzer_object'] = 'DFRobot_Tone buzzer;';
  generator.definitions_['buzzer_tempo'] = 'float buzzer_tempo = 120.0;';

  return ''; // setup()에는 별도 코드가 들어가지 않습니다.
};

Arduino.forBlock['buzzer_set_tempo'] = function (block, generator) {
  const bpm = generator.valueToCode(block, 'BPM', Arduino.ORDER_ATOMIC) || '120';
  return `buzzer_tempo = ${bpm};\n`;
};

Arduino.forBlock['buzzer_play_note'] = function (block, generator) {
  const pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '7';
  const frequency = block.getFieldValue('NOTE');
  const beat = block.getFieldValue('BEAT');

  // 박자를 밀리초(ms) 단위의 연주 시간으로 변환합니다.
  // (60초 * 1000ms) / BPM = 1박자의 길이
  const duration = `(unsigned long)(((60.0 * 1000.0) / buzzer_tempo) * ${beat})`;

  const code = `buzzer.play(${pin}, ${frequency}, ${duration});\n`;
  return code;
};

Arduino.forBlock['buzzer_stop'] = function (block, generator) {
  const pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '7';
  const code = `buzzer.stop(${pin});\n`;
  return code;
};
/* ===== MP3 (KT403A) Generators ===== */

// 설정하기 (include는 여기서만)
Arduino.forBlock['mp3_setup_kt403a'] = function (block, generator) {
  const dev = block.getFieldValue('DEVICE') || '0x02';
  const rx = generator.valueToCode(block, 'RX', Arduino.ORDER_ATOMIC) || '2';
  const tx = generator.valueToCode(block, 'TX', Arduino.ORDER_ATOMIC) || '3';
  const vol = generator.valueToCode(block, 'VOL', Arduino.ORDER_ATOMIC) || '20';

  // includes (설정 블록 전용)  ※ addInclude → definitions_ 로 통일
  generator.definitions_['kt403a_inc'] = '#include "MP3Player_KT403A.h"';
  // 필요시 SoftwareSerial는 헤더 내부에서 include 되지만, 안전하게 다음 줄을 추가해도 됩니다.
  // generator.definitions_['ss_inc'] = '#include <SoftwareSerial.h>';

  // 전역 선언: SoftwareSerial mp3(RX, TX);  ※ addDeclaration → definitions_

  // 🔥 [NEW] 보드 분기 처리
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));

  if (isEsp32) {
    generator.definitions_['include_hardwareserial'] = '#include <HardwareSerial.h>';
    generator.definitions_['mp3_decl'] = `HardwareSerial mp3(1);`;
    generator.setups_['serial_begin_kt403a'] = 'Serial.begin(9600);';
    // setup에서 핀 설정
    generator.setups_['mp3_begin'] = `mp3.begin(9600, SERIAL_8N1, ${rx}, ${tx});`;
  } else if (isPico) {
    generator.definitions_['mp3_decl'] = `#define mp3 Serial1`;
    generator.setups_['serial_begin_kt403a'] = 'Serial.begin(9600);';
    generator.setups_['mp3_begin'] = `Serial1.setRX(${rx});\n  Serial1.setTX(${tx});\n  Serial1.begin(9600);`;
  } else {
    generator.definitions_['mp3_decl'] = `SoftwareSerial mp3(${rx}, ${tx});`;
    generator.setups_['serial_begin_kt403a'] = 'Serial.begin(9600);';
    generator.setups_['mp3_begin'] = 'mp3.begin(9600);';
  }
  generator.setups_['mp3_device'] = `SelectPlayerDevice(${dev}); // 0x01: U-DISK, 0x02: SD`;
  generator.setups_['mp3_volume'] = `SetVolume((uint8_t)(${vol}));`;

  return '';
};

// 트랙 번호 재생
Arduino.forBlock['mp3_play_index'] = function (block, generator) {
  const idx = generator.valueToCode(block, 'INDEX', Arduino.ORDER_ATOMIC) || '1';
  return `SpecifyMusicPlay((uint16_t)(${idx}));\n`;
};

// 폴더/파일 재생
Arduino.forBlock['mp3_play_folder'] = function (block, generator) {
  const folder = generator.valueToCode(block, 'FOLDER', Arduino.ORDER_ATOMIC) || '1';
  const file = generator.valueToCode(block, 'FILE', Arduino.ORDER_ATOMIC) || '1';
  return `SpecifyfolderPlay((uint8_t)(${folder}), (uint8_t)(${file}));\n`;
};

// 볼륨 설정
Arduino.forBlock['mp3_set_volume'] = function (block, generator) {
  const v = generator.valueToCode(block, 'VOL', Arduino.ORDER_ATOMIC) || '20';
  return `SetVolume((uint8_t)(${v}));\n`;
};

// 제어(드롭다운)
Arduino.forBlock['mp3_control'] = function (block, generator) {
  const cmd = block.getFieldValue('CMD');
  switch (cmd) {
    case 'NEXT': return 'PlayNext();\n';
    case 'PREV': return 'PlayPrevious();\n';
    case 'PAUSE': return 'PlayPause();\n';
    case 'RESUME': return 'PlayResume();\n';
    case 'LOOP_ALL': return 'PlayLoop();\n';
    case 'VOL_UP': return 'IncreaseVolume();\n';
    case 'VOL_DOWN': return 'DecreaseVolume();\n';
    case 'PRINT_RET': return 'printReturnedData();\n';
    default: return '';
  }
};

// 상태값(리포터)
Arduino.forBlock['mp3_query_status'] = function (block, generator) {
  return ['QueryPlayStatus()', Arduino.ORDER_ATOMIC];
};
// ===================== SD Card Library Code Generators =====================

// 1) SD 카드 설정
Arduino.forBlock['sd_setup'] = function (block, generator) {
  const num = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const csPin = generator.valueToCode(block, 'CS', Arduino.ORDER_ATOMIC) || '10';
  const mosiPin = generator.valueToCode(block, 'MOSI', Arduino.ORDER_ATOMIC) || '11';
  const misoPin = generator.valueToCode(block, 'MISO', Arduino.ORDER_ATOMIC) || '12';
  const sckPin = generator.valueToCode(block, 'SCK', Arduino.ORDER_ATOMIC) || '13';

  // 라이브러리 포함 및 초기화 (설정 블록에서만)
  generator.definitions_['include_sd'] = '#include <SD.h>';
  generator.definitions_['include_spi'] = '#include <SPI.h>';

  // 핀 정보를 주석으로 표시 (교육용)
  generator.setups_['spi_pins_' + num] = `// SD Card ${num} SPI 핀 설정:\n  // CS: ${csPin}, MOSI: ${mosiPin}, MISO: ${misoPin}, SCK: ${sckPin}`;

  // 🔥 [NEW] 보드 분기 처리
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));

  if (isEsp32) {
    // ESP32: 사용자 정의 핀으로 SPI 시작
    generator.setups_['init_spi_' + num] = `SPI.begin(${sckPin}, ${misoPin}, ${mosiPin}, ${csPin});`;
  } else if (isPico) {
    // Pico: SPI 설정 (코어에 따라 다를 수 있음, 일반적으로 SPI.set... 사용)
    generator.setups_['init_spi_' + num] = `SPI.setRX(${misoPin}); SPI.setTX(${mosiPin}); SPI.setSCK(${sckPin});`;
  }

  // SD 카드 초기화 (CS 핀만 사용)
  generator.setups_['init_sd_' + num] = `if (!SD.begin(${csPin})) {\n    Serial.println("SD Card ${num} initialization failed!");\n    while(1);\n  }\n  Serial.println("SD Card ${num} initialization done.");`;

  return '';
};

// 2) 파일 열기
Arduino.forBlock['sd_open_file'] = function (block, generator) {
  const fileVar = generator.valueToCode(block, 'FILE_VAR', Arduino.ORDER_ATOMIC) || 'myFile';
  const filename = generator.valueToCode(block, 'FILENAME', Arduino.ORDER_ATOMIC) || '"data.txt"';
  const mode = block.getFieldValue('MODE') || 'FILE_READ';

  // File 객체 선언
  generator.definitions_['file_' + fileVar.replace(/"/g, '')] = `File ${fileVar.replace(/"/g, '')};`;

  return `${fileVar.replace(/"/g, '')} = SD.open(${filename}, ${mode});\n`;
};

// 3) 파일에 쓰기
Arduino.forBlock['sd_write_file'] = function (block, generator) {
  const fileVar = generator.valueToCode(block, 'FILE_VAR', Arduino.ORDER_ATOMIC) || 'myFile';
  const data = generator.valueToCode(block, 'DATA', Arduino.ORDER_ATOMIC) || '"Hello World"';

  return `if (${fileVar.replace(/"/g, '')}) {\n  ${fileVar.replace(/"/g, '')}.print(${data});\n}\n`;
};

// 4) 파일에서 읽기
Arduino.forBlock['sd_read_file'] = function (block, generator) {
  const fileVar = generator.valueToCode(block, 'FILE_VAR', Arduino.ORDER_ATOMIC) || 'myFile';

  const code = `(${fileVar.replace(/"/g, '')}.available() ? ${fileVar.replace(/"/g, '')}.readString() : "")`;
  return [code, Arduino.ORDER_FUNCTION_CALL];
};

// 5) 파일 존재 확인
Arduino.forBlock['sd_file_exists'] = function (block, generator) {
  const num = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const filename = generator.valueToCode(block, 'FILENAME', Arduino.ORDER_ATOMIC) || '"data.txt"';

  const code = `SD.exists(${filename})`;
  return [code, Arduino.ORDER_FUNCTION_CALL];
};

// 6) 파일 크기 확인
Arduino.forBlock['sd_file_size'] = function (block, generator) {
  const fileVar = generator.valueToCode(block, 'FILE_VAR', Arduino.ORDER_ATOMIC) || 'myFile';

  const code = `(${fileVar.replace(/"/g, '')} ? ${fileVar.replace(/"/g, '')}.size() : 0)`;
  return [code, Arduino.ORDER_CONDITIONAL];
};

// 7) 파일 닫기
Arduino.forBlock['sd_close_file'] = function (block, generator) {
  const fileVar = generator.valueToCode(block, 'FILE_VAR', Arduino.ORDER_ATOMIC) || 'myFile';

  return `if (${fileVar.replace(/"/g, '')}) {\n  ${fileVar.replace(/"/g, '')}.close();\n}\n`;
};

// 8) 파일 삭제
Arduino.forBlock['sd_remove_file'] = function (block, generator) {
  const num = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const filename = generator.valueToCode(block, 'FILENAME', Arduino.ORDER_ATOMIC) || '"data.txt"';

  return `SD.remove(${filename});\n`;
};

// 9) 디렉토리 생성
Arduino.forBlock['sd_make_directory'] = function (block, generator) {
  const num = generator.valueToCode(block, 'NUM', Arduino.ORDER_ATOMIC) || '1';
  const path = generator.valueToCode(block, 'PATH', Arduino.ORDER_ATOMIC) || '"mydir"';

  return `SD.mkdir(${path});\n`;
};

// 10) 파일 사용 가능한 바이트 수
Arduino.forBlock['sd_file_available'] = function (block, generator) {
  const fileVar = generator.valueToCode(block, 'FILE_VAR', Arduino.ORDER_ATOMIC) || 'myFile';

  const code = `(${fileVar.replace(/"/g, '')} ? ${fileVar.replace(/"/g, '')}.available() : 0)`;
  return [code, Arduino.ORDER_CONDITIONAL];
};

// ======================================================== 15. 통신 카테고리 =====================================================================
// ===================== IR 적외선 송신/수신 Generators =====================
// IR 리모컨 수신기 설정 (IRremote v4.x 멀티플랫폼 라이브러리)
Arduino.forBlock['ir_setup'] = function (block, generator) {
  const pin = generator.valueToCode(block, 'PIN', Arduino.ORDER_ATOMIC) || '11';

  generator.definitions_['include_irremote'] = '#include <IRremote.hpp>';
  generator.definitions_['include_irread'] = '#include <IRread.h>';

  const code = 'IrReceiver.begin(' + pin + ', ENABLE_LED_FEEDBACK);\n';
  return code;
};

// IR 신호 수신 확인
Arduino.forBlock['ir_available'] = function (block, generator) {
  const code = 'IrReceiver.decode()';
  return [code, Arduino.ORDER_ATOMIC];
};

// IR 버튼 번호 읽기
Arduino.forBlock['ir_read_button'] = function (block, generator) {
  const code = '(IrReceiver.decode() ? (IrReceiver.resume(), readIR(IrReceiver.decodedIRData.decodedRawData)) : -1)';
  return [code, Arduino.ORDER_ATOMIC];
};

// IR 원본 코드값 읽기
Arduino.forBlock['ir_read_raw'] = function (block, generator) {
  const code = '(IrReceiver.decode() ? (IrReceiver.resume(), IrReceiver.decodedIRData.decodedRawData) : 0)';
  return [code, Arduino.ORDER_ATOMIC];
};

// IR 특정 버튼 확인
Arduino.forBlock['ir_button_is'] = function (block, generator) {
  const button = block.getFieldValue('BUTTON');
  const code = '(IrReceiver.decode() ? (IrReceiver.resume(), readIR(IrReceiver.decodedIRData.decodedRawData) == ' + button + ') : false)';
  return [code, Arduino.ORDER_ATOMIC];
};

// RF433MHz 라이브러리 설정 (조건부 컴파일: AVR=VirtualWire, ESP32/피코=RadioHead)
Arduino.forBlock['rf433_setup'] = function (block, generator) {
  generator.definitions_['include_rf433'] = '#if defined(ESP32) || defined(ARDUINO_ARCH_RP2040)\n' +
    '  #include <RH_ASK.h>\n' +
    '  RH_ASK rf433_driver;\n' +
    '#else\n' +
    '  #include "VirtualWire.h"\n' +
    '  uint8_t rf433_buf[VW_MAX_MESSAGE_LEN];\n' +
    '  uint8_t rf433_buflen = VW_MAX_MESSAGE_LEN;\n' +
    '#endif';

  const code = '// RF433MHz 무선통신 초기화 완료\n';
  return code;
};

// RF433MHz 송신 설정 및 전송 (조건부 컴파일)
Arduino.forBlock['rf433_config'] = function (block, generator) {
  const txPin = generator.valueToCode(block, 'TX_PIN', Arduino.ORDER_ATOMIC) || '12';
  const message = generator.valueToCode(block, 'MESSAGE', Arduino.ORDER_ATOMIC) || '"Hello"';

  let code = '';
  code += '#if defined(ESP32) || defined(ARDUINO_ARCH_RP2040)\n';
  code += '  rf433_driver.init();\n';
  code += '  rf433_driver.send((uint8_t *)' + message + ', strlen(' + message + '));\n';
  code += '  rf433_driver.waitPacketSent();\n';
  code += '#else\n';
  code += '  vw_set_tx_pin(' + txPin + ');\n';
  code += '  vw_setup(2000);\n';
  code += '  vw_send((uint8_t *)' + message + ', strlen(' + message + '));\n';
  code += '  vw_wait_tx();\n';
  code += '#endif\n';

  return code;
};

// RF433MHz 수신 설정 (조건부 컴파일)
Arduino.forBlock['rf433_rx_setup'] = function (block, generator) {
  const rxPin = generator.valueToCode(block, 'RX_PIN', Arduino.ORDER_ATOMIC) || '11';
  const speed = generator.valueToCode(block, 'SPEED', Arduino.ORDER_ATOMIC) || '2000';

  let code = '';
  code += '#if defined(ESP32) || defined(ARDUINO_ARCH_RP2040)\n';
  code += '  rf433_driver.init();\n';
  code += '#else\n';
  code += '  vw_set_rx_pin(' + rxPin + ');\n';
  code += '  vw_setup(' + speed + ');\n';
  code += '#endif\n';

  return code;
};

// RF433MHz 수신 시작 (조건부 컴파일)
Arduino.forBlock['rf433_rx_start'] = function (block, generator) {
  let code = '';
  code += '#if !defined(ESP32) && !defined(ARDUINO_ARCH_RP2040)\n';
  code += '  vw_rx_start();\n';
  code += '#endif\n';
  return code;
};

// RF433MHz 메시지 수신 확인 (조건부 컴파일)
Arduino.forBlock['rf433_have_message'] = function (block, generator) {
  const code = '(defined(ESP32) || defined(ARDUINO_ARCH_RP2040) ? rf433_driver.available() : vw_have_message())';
  return [code, Arduino.ORDER_ATOMIC];
};

// RF433MHz 메시지 버퍼에 저장 (조건부 컴파일)
Arduino.forBlock['rf433_get_message'] = function (block, generator) {
  let code = '';
  code += '#if defined(ESP32) || defined(ARDUINO_ARCH_RP2040)\n';
  code += '  uint8_t rf433_buf[RH_ASK_MAX_MESSAGE_LEN];\n';
  code += '  uint8_t rf433_buflen = sizeof(rf433_buf);\n';
  code += '  rf433_driver.recv(rf433_buf, &rf433_buflen);\n';
  code += '#else\n';
  code += '  vw_get_message(rf433_buf, &rf433_buflen);\n';
  code += '#endif\n';
  return code;
};

// RF433MHz 수신 데이터 읽기
Arduino.forBlock['rf433_read_data'] = function (block, generator) {
  generator.definitions_['var_rf433_result'] = 'String rf433_result = "";';

  const code = '(rf433_result = String((char*)rf433_buf).substring(0, rf433_buflen), rf433_result)';
  return [code, Arduino.ORDER_ATOMIC];
};

/* ===== GPS (TinyGPS++) — Student Simple Generators ===== */

// 설정하기: include는 여기서만!
Arduino.forBlock['gps_setup_tinygps'] = function (block, generator) {
  const ser = block.getFieldValue('SER') || 'Serial';
  const baud = generator.valueToCode(block, 'BAUD', Arduino.ORDER_ATOMIC) || '9600';
  const rx = generator.valueToCode(block, 'RX', Arduino.ORDER_ATOMIC) || '4';
  const tx = generator.valueToCode(block, 'TX', Arduino.ORDER_ATOMIC) || '3';

  // includes (지시 예시 포함)
  generator.definitions_['inc_tm1637_gps'] = '#include "TM1637Display.h"';
  generator.definitions_['inc_tinygps'] = '#include "TinyGPS++.h"';

  // TinyGPS++ 객체
  generator.definitions_['var_tinygps_obj'] = 'TinyGPSPlus gps;';

  // 선택한 시리얼을 통일 이름으로 사용
  if (ser === 'Soft') {
    // 🔥 [NEW] 보드 분기 처리
    var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
    var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));

    if (isEsp32) {
      generator.definitions_['include_hardwareserial'] = '#include <HardwareSerial.h>';
      generator.definitions_['def_gps_serial'] = 'HardwareSerial GPS_SERIAL_USED(1);';
      generator.setups_['gps_serial_begin'] = `GPS_SERIAL_USED.begin(${baud}, SERIAL_8N1, ${rx}, ${tx});`;
    } else if (isPico) {
      generator.definitions_['def_gps_serial'] = '#define GPS_SERIAL_USED Serial1';
      generator.setups_['gps_serial_begin'] = `Serial1.setRX(${rx});\n  Serial1.setTX(${tx});\n  Serial1.begin(${baud});`;
    } else {
      generator.definitions_['inc_softserial'] = '#include <SoftwareSerial.h>';
      generator.definitions_['def_gps_serial'] = 'SoftwareSerial GPS_SERIAL_USED(' + rx + ', ' + tx + ');';
      generator.setups_['gps_serial_begin'] = 'GPS_SERIAL_USED.begin(' + baud + ');';
    }
  } else {
    generator.definitions_['def_gps_serial'] = '#define GPS_SERIAL_USED ' + ser;
    generator.setups_['gps_serial_begin'] = 'GPS_SERIAL_USED.begin(' + baud + ');';
  }
  return '';
};

// 시리얼 → 파서 업데이트 (NMEA를 한 글자씩 encode)  // ref: TinyGPSPlus::encode
Arduino.forBlock['gps_update_from_serial'] = function (block, generator) {
  return 'while (GPS_SERIAL_USED.available()) { gps.encode(GPS_SERIAL_USED.read()); }\n';
};

// 값 읽기 (리포터)  // API: location/speed/altitude/course/satellites/hdop/date/time
Arduino.forBlock['gps_read_value'] = function (block, generator) {
  const w = block.getFieldValue('WHAT');
  switch (w) {
    case 'LAT': return ['gps.location.lat()', Arduino.ORDER_FUNCTION_CALL];
    case 'LNG': return ['gps.location.lng()', Arduino.ORDER_FUNCTION_CALL];
    case 'SPEED_KMPH': return ['gps.speed.kmph()', Arduino.ORDER_FUNCTION_CALL];
    case 'ALT_M': return ['gps.altitude.meters()', Arduino.ORDER_FUNCTION_CALL];
    case 'COURSE_DEG': return ['gps.course.deg()', Arduino.ORDER_FUNCTION_CALL];
    case 'SATS': return ['gps.satellites.value()', Arduino.ORDER_FUNCTION_CALL];
    case 'HDOP': return ['gps.hdop.hdop()', Arduino.ORDER_FUNCTION_CALL];
    case 'YEAR': return ['gps.date.year()', Arduino.ORDER_FUNCTION_CALL];
    case 'MONTH': return ['gps.date.month()', Arduino.ORDER_FUNCTION_CALL];
    case 'DAY': return ['gps.date.day()', Arduino.ORDER_FUNCTION_CALL];
    case 'HOUR': return ['gps.time.hour()', Arduino.ORDER_FUNCTION_CALL];
    case 'MIN': return ['gps.time.minute()', Arduino.ORDER_FUNCTION_CALL];
    case 'SEC': return ['gps.time.second()', Arduino.ORDER_FUNCTION_CALL];
    default: return ['0', Arduino.ORDER_ATOMIC];
  }
};

// 고정(FIX) 여부 (1/0)  // API: location.isValid()
Arduino.forBlock['gps_has_fix'] = function (block, generator) {
  return ['(gps.location.isValid() ? 1 : 0)', Arduino.ORDER_CONDITIONAL];
};

// 두 좌표 계산 (거리m / 방위deg)  // API: distanceBetween / courseTo
Arduino.forBlock['gps_between_calc'] = function (block, generator) {
  const what = block.getFieldValue('WHAT');
  const lat1 = generator.valueToCode(block, 'LAT1', Arduino.ORDER_COMMA) || '0';
  const lng1 = generator.valueToCode(block, 'LNG1', Arduino.ORDER_COMMA) || '0';
  const lat2 = generator.valueToCode(block, 'LAT2', Arduino.ORDER_COMMA) || '0';
  const lng2 = generator.valueToCode(block, 'LNG2', Arduino.ORDER_ATOMIC) || '0';
  if (what === 'DIST_M')
    return ['TinyGPSPlus::distanceBetween(' + lat1 + ',' + lng1 + ',' + lat2 + ',' + lng2 + ')', Arduino.ORDER_FUNCTION_CALL];
  else // COURSE_DEG
    return ['TinyGPSPlus::courseTo(' + lat1 + ',' + lng1 + ',' + lat2 + ',' + lng2 + ')', Arduino.ORDER_FUNCTION_CALL];
};

// 각도 → 방위문자  // API: cardinal(course)
Arduino.forBlock['gps_cardinal'] = function (block, generator) {
  const deg = generator.valueToCode(block, 'COURSE', Arduino.ORDER_ATOMIC) || '0';
  return ['TinyGPSPlus::cardinal(' + deg + ')', Arduino.ORDER_FUNCTION_CALL];
};

// ===================== 16. 시리얼 통신 =====================
// =============================================================================
// ===================== 16. 시리얼 통신 =====================
// =============================================================================
// [0. 웹 BLE 통신 (Web BLE - Scratch Compatible)]
// =============================================================================
Arduino.forBlock['sys_webble_setup'] = function (block, generator) {
  var name = generator.valueToCode(block, 'NAME', Arduino.ORDER_ATOMIC) || '"Brixel_BLE"';
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));

  if (isEsp32) {
    generator.definitions_['include_ble'] = '#include <BLEDevice.h>\n#include <BLEServer.h>\n#include <BLEUtils.h>\n#include <BLE2902.h>';
    generator.definitions_['var_ble_nus'] = `
#define SERVICE_UUID           "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"
#define CHARACTERISTIC_UUID_RX "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"
#define CHARACTERISTIC_UUID_TX "6E400002-B5A3-F393-E0A9-E50E24DCCA9E"

BLEServer *pServer = NULL;
BLECharacteristic *pTxCharacteristic;
bool deviceConnected = false;
String _webble_rx_buffer = "";
String _webble_last_msg = "";
bool _webble_msg_ready = false;
String _webble_parsed_data = "";
char _webble_parsed_delim = ',';
uint32_t _webble_last_tx = 0;


class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) { deviceConnected = true; };
    void onDisconnect(BLEServer* pServer) { 
      deviceConnected = false;
      pServer->getAdvertising()->start(); // 연결 끊기면 다시 광고 시작 (재연결 가능)
    }
};

class MyCallbacks: public BLECharacteristicCallbacks {
    void onWrite(BLECharacteristic *pCharacteristic) {
      String rxValue = pCharacteristic->getValue().c_str();
      if (rxValue.length() > 0) {
        if (_webble_rx_buffer.length() > 512) _webble_rx_buffer = ""; // 버퍼 오버플로우 방지
        for (int i = 0; i < rxValue.length(); i++) {
          char c = rxValue[i];
          if (c == '\\n') {
            _webble_last_msg = _webble_rx_buffer;
            _webble_last_msg.trim();
            _webble_msg_ready = true;
            _webble_rx_buffer = "";
          } else {
            _webble_rx_buffer += c;
          }
        }
      }
    }
};
`;
    generator.setups_['setup_webble'] = `
  Serial.begin(115200); // 시리얼 모니터 출력 및 안정성 확보
  BLEDevice::init(${name});
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());
  BLEService *pService = pServer->createService(SERVICE_UUID);
  pTxCharacteristic = pService->createCharacteristic(CHARACTERISTIC_UUID_TX, BLECharacteristic::PROPERTY_NOTIFY);
  pTxCharacteristic->addDescriptor(new BLE2902());
  BLECharacteristic *pRxCharacteristic = pService->createCharacteristic(CHARACTERISTIC_UUID_RX, BLECharacteristic::PROPERTY_WRITE | BLECharacteristic::PROPERTY_WRITE_NR);
  pRxCharacteristic->setCallbacks(new MyCallbacks());
  pService->start();

  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);  // iPhone 연결 문제 도움
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();

  Serial.print("Web BLE MAC: ");
  Serial.println(BLEDevice::getAddress().toString().c_str());
`;
  } else if (isPico) {
    // Pico W Web BLE template (Uses ArduinoBLE if available or similar)
    generator.definitions_['include_ble'] = '#include <ArduinoBLE.h>';
    generator.definitions_['var_ble_nus'] = `
#define SERVICE_UUID           "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"
#define CHARACTERISTIC_UUID_RX "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"
#define CHARACTERISTIC_UUID_TX "6E400002-B5A3-F393-E0A9-E50E24DCCA9E"

BLEService nusService(SERVICE_UUID);
BLEStringCharacteristic txChar(CHARACTERISTIC_UUID_TX, BLENotify, 20);
BLEStringCharacteristic rxChar(CHARACTERISTIC_UUID_RX, BLEWrite, 20);
String _webble_last_msg = "";
bool _webble_msg_ready = false;
String _webble_parsed_data = "";
char _webble_parsed_delim = ',';
uint32_t _webble_last_tx = 0;

`;
    generator.setups_['setup_webble'] = `
  Serial.begin(115200);
  if (!BLE.begin()) { Serial.println("BLE failed!"); }
  BLE.setLocalName(${name});
  BLE.setAdvertisedService(nusService);
  nusService.addCharacteristic(txChar);
  nusService.addCharacteristic(rxChar);
  BLE.addService(nusService);
  BLE.advertise();
  Serial.print("Web BLE MAC: ");
  Serial.println(BLE.address());
`;
  }
  return '';
};

Arduino.forBlock['sys_webble_available'] = function (block, generator) {
  return ['_webble_msg_ready', Arduino.ORDER_ATOMIC];
};

Arduino.forBlock['sys_webble_read'] = function (block, generator) {
  var code = '([](){ String s = _webble_last_msg; _webble_msg_ready = false; return s; }())';
  return [code, Arduino.ORDER_ATOMIC];
};

Arduino.forBlock['sys_webble_write'] = function (block, generator) {
  var content = generator.valueToCode(block, 'CONTENT', Arduino.ORDER_ATOMIC) || '""';
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));

  if (isEsp32) {
    return `if (deviceConnected && (millis() - _webble_last_tx >= 20)) { pTxCharacteristic->setValue((String(${content}) + "\\n").c_str()); pTxCharacteristic->notify(); _webble_last_tx = millis(); }\n`;
  } else if (isPico) {
    return `if (BLE.connected() && (millis() - _webble_last_tx >= 20)) { txChar.writeValue(String(${content}) + "\\n"); _webble_last_tx = millis(); }\n`;
  }
  return '';
};

Arduino.forBlock['sys_webble_connected'] = function (block, generator) {
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));
  if (isEsp32) return ['deviceConnected', Arduino.ORDER_ATOMIC];
  if (isPico) return ['BLE.connected()', Arduino.ORDER_ATOMIC];
  return ['false', Arduino.ORDER_ATOMIC];
};

Arduino.forBlock['sys_webble_parse'] = function (block, generator) {
  var delimiter = generator.valueToCode(block, 'DELIMITER', Arduino.ORDER_ATOMIC) || '","';
  var code = `_webble_parsed_data = _webble_last_msg;\n`;
  code += `_webble_parsed_delim = (${delimiter})[0];\n`;
  code += `_webble_msg_ready = false;\n`;
  return code;
};

Arduino.forBlock['sys_webble_get_value'] = function (block, generator) {
  var n = generator.valueToCode(block, 'N', Arduino.ORDER_ATOMIC) || '1';
  var code = `([](int n){ 
    int count = 0;
    int start = 0;
    int end = _webble_parsed_data.indexOf(_webble_parsed_delim);
    while (end != -1) {
      if (++count == n) return _webble_parsed_data.substring(start, end);
      start = end + 1;
      end = _webble_parsed_data.indexOf(_webble_parsed_delim, start);
    }
    if (++count == n) return _webble_parsed_data.substring(start);
    return String("");
  }(${n}))`;
  return [code, Arduino.ORDER_ATOMIC];
};

// =============================================================================
// [0. WiFi 통신 (WiFi - WebSocket - Scratch Compatible)]
// =============================================================================

Arduino.forBlock['wifi_setup'] = function (block, generator) {
  var ssid = generator.valueToCode(block, 'SSID', Arduino.ORDER_ATOMIC) || '"SSID"';
  var pass = generator.valueToCode(block, 'PASS', Arduino.ORDER_ATOMIC) || '"PASSWORD"';
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPicoW = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('pico');

  if (isEsp32) {
    generator.definitions_['include_wifi'] = '#include <WiFi.h>';
  } else if (isPicoW) {
    generator.definitions_['include_wifi'] = '#include <WiFi.h>';
  }

  generator.setups_['setup_wifi_begin'] = `
  WiFi.begin(${ssid}, ${pass});
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
`;
  return '';
};

Arduino.forBlock['wifi_ws_server_setup'] = function (block, generator) {
  var port = generator.valueToCode(block, 'PORT', Arduino.ORDER_ATOMIC) || '81';
  var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
  var isPicoW = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));

  generator.definitions_['include_websockets'] = '#include <WebSocketsServer.h>';
  generator.definitions_['var_wifi_ws'] = `
WebSocketsServer webSocket = WebSocketsServer(${port});
String _ws_last_msg = "";
bool _ws_msg_ready = false;

void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
  switch(type) {
    case WStype_TEXT:
      _ws_last_msg = String((char*)payload);
      _ws_msg_ready = true;
      break;
    case WStype_CONNECTED:
      Serial.printf("[%u] Connected!\\n", num);
      break;
    case WStype_DISCONNECTED:
      Serial.printf("[%u] Disconnected!\\n", num);
      break;
  }
}
`;

  generator.setups_['setup_wifi_ws_server'] = `
  webSocket.begin();
  webSocket.onEvent(webSocketEvent);
`;

  // loop에 webSocket.loop() 추가
  generator.loops_['loop_wifi_ws'] = 'webSocket.loop();';

  return '';
};

Arduino.forBlock['wifi_is_connected'] = function (block, generator) {
  return ['(WiFi.status() == WL_CONNECTED)', Arduino.ORDER_ATOMIC];
};

Arduino.forBlock['wifi_local_ip'] = function (block, generator) {
  return ['WiFi.localIP().toString()', Arduino.ORDER_ATOMIC];
};

Arduino.forBlock['wifi_ws_available'] = function (block, generator) {
  return ['_ws_msg_ready', Arduino.ORDER_ATOMIC];
};

Arduino.forBlock['wifi_ws_read'] = function (block, generator) {
  var code = '(_ws_msg_ready = false, _ws_last_msg)';
  return [code, Arduino.ORDER_COMMA];
};

Arduino.forBlock['wifi_ws_send'] = function (block, generator) {
  var data = generator.valueToCode(block, 'DATA', Arduino.ORDER_ATOMIC) || '""';
  return `webSocket.broadcastTXT(String(${data}) + "\\n");\n`;
};

Arduino.forBlock['wifi_ws_send_raw'] = function (block, generator) {
  var data = generator.valueToCode(block, 'DATA', Arduino.ORDER_ATOMIC) || '""';
  return `webSocket.broadcastTXT(String(${data}));\n`;
};

Arduino.forBlock['wifi_ws_send_label_value'] = function (block, generator) {
  var label = generator.valueToCode(block, 'LABEL', Arduino.ORDER_ATOMIC) || '""';
  var value = generator.valueToCode(block, 'VALUE', Arduino.ORDER_ATOMIC) || '""';
  return `webSocket.broadcastTXT(String(${label}) + ":" + String(${value}) + "\\n");\n`;
};

// =============================================================================
// [1. 설정 & 공통 유틸]
// =============================================================================
Arduino.forBlock['sys_serial_begin'] = function (block, generator) {
  var rx = generator.valueToCode(block, 'RX', Arduino.ORDER_ATOMIC) || '0';
  var tx = generator.valueToCode(block, 'TX', Arduino.ORDER_ATOMIC) || '1';
  var baud = generator.valueToCode(block, 'BAUD', Arduino.ORDER_ATOMIC) || '115200';

  // [수신용 전역 변수] - 버퍼와 플래그
  generator.definitions_['sys_serial_vars'] = `
String _sys_rx_buffer = "";      // 수신 중인 데이터
String _sys_last_msg = "";       // 수신 완료된 최신 메시지
bool _sys_msg_ready = false;     // 메시지 도착 플래그
Stream* _sys_stream;             // 통합 시리얼 포인터
`;

  // [파싱용 전역 변수]
  generator.definitions_['sys_parsed_vars'] = `
String _sys_parsed_data = "";    // 분석된 데이터 저장
char _sys_parsed_delim = ',';    // 구분자 저장
`;

  if ((rx === '0' && tx === '1') || (rx === '1' && tx === '0')) {
    generator.setups_['sys_serial_setup'] = `
  Serial.begin(${baud});
  _sys_stream = &Serial;
`;
  } else {
    // 🔥 [NEW] 보드 분기 처리
    var isEsp32 = Arduino.selectedBoard && Arduino.selectedBoard.startsWith('esp32');
    var isPico = Arduino.selectedBoard && (Arduino.selectedBoard.startsWith('pico') || Arduino.selectedBoard.startsWith('rp2040'));

    if (isEsp32) {
      generator.definitions_['include_hardwareserial'] = '#include <HardwareSerial.h>';
      generator.definitions_['def_sw_serial'] = `HardwareSerial _sw_serial(1);`;
      generator.setups_['sys_serial_setup'] = `
  _sw_serial.begin(${baud}, SERIAL_8N1, ${rx}, ${tx});
  _sys_stream = &_sw_serial;
`;
    } else if (isPico) {
      // Pico: Serial1/Serial2 typically mapped to specific pins, but can use SoftwareSerial or hardware UART instance if supported.
      // safely use Serial1 with setRX/TX if library supports, otherwise standard Serial1
      // For simplicity/compatibility with typical Pico cores (Philhower):
      generator.definitions_['def_sw_serial'] = `// Note: Pico might need Serial1.setRX/TX depending on core`;
      generator.setups_['sys_serial_setup'] = `
  Serial1.setRX(${rx});
  Serial1.setTX(${tx});
  Serial1.begin(${baud});
  _sys_stream = &Serial1;
`;
    } else {
      generator.definitions_['include_sw_serial'] = '#include <SoftwareSerial.h>';
      generator.definitions_['def_sw_serial'] = `SoftwareSerial _sw_serial(${rx}, ${tx});`;
      generator.setups_['sys_serial_setup'] = `
  _sw_serial.begin(${baud});
  _sys_stream = &_sw_serial;
`;
    }
  }
  return '';
};

Arduino.forBlock['sys_serial_connected'] = function (block, generator) {
  return ['(bool)(_sys_stream)', Arduino.ORDER_ATOMIC];
};

// =============================================================================
// [2. 데이터 송신 (Smart Tx)]
// =============================================================================

// 값이 변했을 때만 보내기 (중복 전송 방지)
Arduino.forBlock['sys_serial_send_change'] = function (block, generator) {
  var content = generator.valueToCode(block, 'CONTENT', Arduino.ORDER_ATOMIC) || '0';
  // 블록마다 고유 ID를 생성해 static 변수 이름 충돌 방지
  var varName = 'last_val_' + block.id.replace(/[^a-zA-Z0-9]/g, '');

  var code = `
{
  static String ${varName} = "";
  String curr = String(${content});
  if (curr != ${varName}) {
    _sys_stream->println(curr);
    ${varName} = curr;
  }
}
`;
  return code;
};

// 일반 보내기 (줄바꿈 옵션)
Arduino.forBlock['sys_serial_print'] = function (block, generator) {
  var content = generator.valueToCode(block, 'CONTENT', Arduino.ORDER_ATOMIC) || '""';
  var newline = block.getFieldValue('NEWLINE') == 'TRUE';
  return newline ? `_sys_stream->println(${content});\n` : `_sys_stream->print(${content});\n`;
};

// 계속 보내기 (스크래치 호환)
Arduino.forBlock['sys_serial_print_continuous'] = function (block, generator) {
  var content = generator.valueToCode(block, 'CONTENT', Arduino.ORDER_ATOMIC) || '""';
  var newline = block.getFieldValue('NEWLINE') == 'TRUE';
  return newline ? `_sys_stream->println(${content});\n` : `_sys_stream->print(${content});\n`;
};

// 여러 개 묶어 보내기 (CSV)
Arduino.forBlock['sys_serial_print_multi'] = function (block, generator) {
  var content = generator.valueToCode(block, 'CONTENT', Arduino.ORDER_ATOMIC) || '""';
  return `_sys_stream->println(${content});\n`;
};

// Key:Value 보내기
Arduino.forBlock['sys_serial_send_key_val'] = function (block, generator) {
  var key = generator.valueToCode(block, 'KEY', Arduino.ORDER_ATOMIC) || '""';
  var val = generator.valueToCode(block, 'VAL', Arduino.ORDER_ATOMIC) || '""';
  var newline = block.getFieldValue('NEWLINE') == 'TRUE';

  var code = `_sys_stream->print(${key}); _sys_stream->print(":"); _sys_stream->print(${val})`;
  return newline ? code + `; _sys_stream->println();\n` : code + `;\n`;
};

// =============================================================================
// [3. 데이터 수신 (Non-blocking Rx)]
// =============================================================================

// 폴링 함수 (필수)
Arduino.forBlock['sys_serial_poll'] = function (block, generator) {
  generator.definitions_['func_sys_poll'] = `
void _sys_poll_serial() {
  while (_sys_stream->available()) {
    char c = (char)_sys_stream->read();
    if (c == '\\n') {
      _sys_last_msg = _sys_rx_buffer; // 완성된 문장 저장
      _sys_last_msg.trim();           // 공백/개행 제거
      _sys_msg_ready = true;
      _sys_rx_buffer = "";
    } else {
      _sys_rx_buffer += c;
    }
  }
}`;
  return '_sys_poll_serial();\n';
};

Arduino.forBlock['sys_serial_available'] = function (block, generator) {
  return ['_sys_msg_ready', Arduino.ORDER_ATOMIC];
};

Arduino.forBlock['sys_serial_read_raw'] = function (block, generator) {
  return ['_sys_last_msg', Arduino.ORDER_ATOMIC];
};

Arduino.forBlock['sys_serial_flush'] = function (block, generator) {
  return '_sys_msg_ready = false; _sys_last_msg = "";\n';
};

// =============================================================================
// [4. 파싱 (Parsing Logic)]
// =============================================================================

// 파싱 헬퍼 함수 주입
function addParseHelper(generator) {
  generator.definitions_['func_sys_parse'] = `
String _sys_get_token(String data, char separator, int index) {
  int found = 0;
  int strIndex[] = {0, -1};
  int maxIndex = data.length() - 1;
  for (int i = 0; i <= maxIndex && found <= index; i++) {
    if (data.charAt(i) == separator || i == maxIndex) {
      found++;
      strIndex[0] = strIndex[1] + 1;
      strIndex[1] = (i == maxIndex) ? i + 1 : i;
    }
  }
  return found > index ? data.substring(strIndex[0], strIndex[1]) : "";
}`;
}

// 토큰 개수 세기 헬퍼 함수 주입
function addCountHelper(generator) {
  generator.definitions_['func_sys_count_tokens'] = `
int _sys_count_tokens(String data, char separator) {
  if (data.length() == 0) return 0;
  int count = 1;
  for (unsigned int i = 0; i < data.length(); i++) {
    if (data.charAt(i) == separator) count++;
  }
  return count;
}`;
}

// 구분자로 분석하기 (상태 저장 방식 - 스크래치 호환)
Arduino.forBlock['sys_serial_parse_delimiter'] = function (block, generator) {
  var delim = generator.valueToCode(block, 'DELIMITER', Arduino.ORDER_ATOMIC) || '","';
  return `_sys_parsed_data = _sys_last_msg; _sys_parsed_delim = ${delim}[0];\n`;
};

// 분석된 N번째 값 (저장된 데이터에서 - 스크래치 호환)
Arduino.forBlock['sys_parsed_value_get'] = function (block, generator) {
  addParseHelper(generator);
  var idx = generator.valueToCode(block, 'INDEX', Arduino.ORDER_ATOMIC) || '1';
  return [`_sys_get_token(_sys_parsed_data, _sys_parsed_delim, ${idx} - 1)`, Arduino.ORDER_ATOMIC];
};

// 분석된 값 개수 (저장된 데이터에서 - 스크래치 호환)
Arduino.forBlock['sys_parsed_count'] = function (block, generator) {
  addCountHelper(generator);
  return ['_sys_count_tokens(_sys_parsed_data, _sys_parsed_delim)', Arduino.ORDER_ATOMIC];
};

// CSV에서 N번째 값 가져오기 (문장 직접 입력)
Arduino.forBlock['sys_parse_csv_get'] = function (block, generator) {
  addParseHelper(generator);
  var str = generator.valueToCode(block, 'STRING', Arduino.ORDER_ATOMIC) || '""';
  var idx = generator.valueToCode(block, 'INDEX', Arduino.ORDER_ATOMIC) || '1';
  // 사용자는 1부터 세므로 -1 처리
  return [`_sys_get_token(${str}, ',', ${idx} - 1)`, Arduino.ORDER_ATOMIC];
};

// 분석된 값의 개수 (문장 직접 입력)
Arduino.forBlock['sys_parse_count'] = function (block, generator) {
  addCountHelper(generator);
  var str = generator.valueToCode(block, 'STRING', Arduino.ORDER_ATOMIC) || '""';
  return [`_sys_count_tokens(${str}, ',')`, Arduino.ORDER_ATOMIC];
};

// 숫자로 변환
Arduino.forBlock['sys_util_to_number'] = function (block, generator) {
  var str = generator.valueToCode(block, 'STRING', Arduino.ORDER_ATOMIC) || '""';
  return [`String(${str}).toFloat()`, Arduino.ORDER_ATOMIC];
};

// ============================================================================================== 17. 유틸 카테고리 ==========
Arduino.forBlock['util_millis'] = function (block, generator) {
  return ['millis()', Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['util_map'] = function (block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Arduino.ORDER_COMMA) || '0';
  const fromLow = generator.valueToCode(block, 'FROMLOW', Arduino.ORDER_COMMA) || '0';
  const fromHigh = generator.valueToCode(block, 'FROMHIGH', Arduino.ORDER_COMMA) || '1023';
  const toLow = generator.valueToCode(block, 'TOLOW', Arduino.ORDER_COMMA) || '0';
  const toHigh = generator.valueToCode(block, 'TOHIGH', Arduino.ORDER_COMMA) || '255';
  return ['map(' + value + ', ' + fromLow + ', ' + fromHigh + ', ' + toLow + ', ' + toHigh + ')', Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['util_constrain'] = function (block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Arduino.ORDER_COMMA) || '0';
  const low = generator.valueToCode(block, 'LOW', Arduino.ORDER_COMMA) || '0';
  const high = generator.valueToCode(block, 'HIGH', Arduino.ORDER_COMMA) || '100';
  return ['constrain(' + value + ', ' + low + ', ' + high + ')', Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['util_convert'] = function (block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Arduino.ORDER_NONE) || '0';
  const type = block.getFieldValue('TYPE');
  let code;
  switch (type) {
    case 'INT':
      code = 'String(' + value + ').toInt()';
      break;
    case 'FLOAT':
      code = 'String(' + value + ').toFloat()';
      break;
    case 'STRING':
      code = 'String(' + value + ')';
      break;
    default:
      code = value;
  }
  return [code, Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['util_to_char'] = function (block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Arduino.ORDER_NONE) || '65';
  return ['char(' + value + ')', Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['util_to_ascii'] = function (block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Arduino.ORDER_NONE) || '"A"';
  return ['int(String(' + value + ')[0])', Arduino.ORDER_FUNCTION_CALL];
};

Arduino.forBlock['util_i2c_scanner'] = function (block, generator) {
  generator.definitions_['include_wire'] = '#include <Wire.h>';
  generator.setups_['wire_begin'] = 'Wire.begin();';
  generator.setups_['serial_begin_i2c'] = 'Serial.begin(9600);';
  const funcName = 'scanI2CDevices';
  const scannerFunction = `
void ${funcName}() {
  Serial.println("I2C Device Scanner");
  byte error, address; int nDevices = 0;
  for(address = 1; address < 127; address++) {
    Wire.beginTransmission(address); error = Wire.endTransmission();
    if (error == 0) {
      Serial.print("I2C device found at address 0x");
      if (address < 16) Serial.print("0");
      Serial.println(address, HEX); nDevices++;
    }
  }
  if (nDevices == 0) Serial.println("No I2C devices found");
  else Serial.println("I2C scan complete");
}`;
  generator.definitions_['function_' + funcName] = scannerFunction;
  return funcName + '();\n';
};

Arduino.forBlock['util_i2c_read_address'] = function (block, generator) {
  return ['"Check Serial Monitor for I2C addresses"', Arduino.ORDER_ATOMIC];
};

// ============================================================================================== 17. 안내 카테고리 ==========
Arduino.forBlock['developer_info_block'] = function (block, generator) {
  // 정보 제공용 블록이므로 생성되는 코드는 없습니다.
  return '';
};
Arduino.forBlock['custom_ad_block'] = function (block, generator) {
  // 아무 기능이 없으므로 생성되는 코드는 없습니다.
  return '';
};
Arduino.forBlock['go_to_ai_robot_scratch'] = function (block, generator) {
  // 바로가기 블록이므로 생성되는 코드는 없습니다.
  return '';
};
Arduino.forBlock['go_to_k12_projectHub'] = function (block, generator) {
  // 바로가기 블록이므로 생성되는 코드는 없습니다.
  return '';
};
// ============================================================================================= 18. 플래그 블럭 모음 ==========
Arduino.forBlock['main_flag'] = function (block, generator) {
  // 정보 제공용 블록이므로 생성되는 코드는 없습니다.
  return '';
};
Arduino.forBlock['pin_flag'] = function (block, generator) {
  // 정보 제공용 블록이므로 생성되는 코드는 없습니다.
  return '';
};
Arduino.forBlock['control_flag'] = function (block, generator) {
  // 정보 제공용 블록이므로 생성되는 코드는 없습니다.
  return '';
};
Arduino.forBlock['logic_flag'] = function (block, generator) {
  // 정보 제공용 블록이므로 생성되는 코드는 없습니다.
  return '';
};
Arduino.forBlock['math_flag'] = function (block, generator) {
  // 정보 제공용 블록이므로 생성되는 코드는 없습니다.
  return '';
};
Arduino.forBlock['text_flag'] = function (block, generator) {
  // 정보 제공용 블록이므로 생성되는 코드는 없습니다.
  return '';
};
Arduino.forBlock['colour_flag'] = function (block, generator) {
  // 정보 제공용 블록이므로 생성되는 코드는 없습니다.
  return '';
};
Arduino.forBlock['var_flag'] = function (block, generator) {
  // 정보 제공용 블록이므로 생성되는 코드는 없습니다.
  return '';
};
Arduino.forBlock['func_flag'] = function (block, generator) {
  // 정보 제공용 블록이므로 생성되는 코드는 없습니다.
  return '';
};
Arduino.forBlock['dis01_flag'] = function (block, generator) {
  // 정보 제공용 블록이므로 생성되는 코드는 없습니다.
  return '';
};
Arduino.forBlock['dis02_flag'] = function (block, generator) {
  // 정보 제공용 블록이므로 생성되는 코드는 없습니다.
  return '';
};
Arduino.forBlock['sensor01_flag'] = function (block, generator) {
  // 정보 제공용 블록이므로 생성되는 코드는 없습니다.
  return '';
};
Arduino.forBlock['sensor02_flag'] = function (block, generator) {
  // 정보 제공용 블록이므로 생성되는 코드는 없습니다.
  return '';
};
Arduino.forBlock['motor_flag'] = function (block, generator) {
  // 정보 제공용 블록이므로 생성되는 코드는 없습니다.
  return '';
};
Arduino.forBlock['output_flag'] = function (block, generator) {
  // 정보 제공용 블록이므로 생성되는 코드는 없습니다.
  return '';
};
Arduino.forBlock['comm_flag'] = function (block, generator) {
  // 정보 제공용 블록이므로 생성되는 코드는 없습니다.
  return '';
};
Arduino.forBlock['util_flag'] = function (block, generator) {
  // 정보 제공용 블록이므로 생성되는 코드는 없습니다.
  return '';
};

// 동적 블록 호환성 지원
Arduino.forBlock['variables_get_dynamic'] = Arduino.forBlock['variables_get'];
Arduino.forBlock['variables_set_dynamic'] = Arduino.forBlock['variables_set'];
Arduino.forBlock['procedures_defnoreturn_dynamic'] = Arduino.forBlock['procedures_defnoreturn'];
Arduino.forBlock['procedures_defreturn_dynamic'] = Arduino.forBlock['procedures_defreturn'];
Arduino.forBlock['procedures_callnoreturn_dynamic'] = Arduino.forBlock['procedures_callnoreturn'];
Arduino.forBlock['procedures_callreturn_dynamic'] = Arduino.forBlock['procedures_callreturn'];

// ============================================================
// 블록 조립 기록/재생 블록 코드 생성기
// IDE 내부 기능이므로 Arduino 코드를 생성하지 않습니다.
// ============================================================

// 1. 블록조립 기록 시작 (실행 블록)
Arduino.forBlock['util_record_start'] = function (block, generator) {
  // IDE 내부 기능이므로 Arduino 코드를 생성하지 않습니다.
  return '';
};

// 2. 블록조립 기록 중지 (실행 블록)
Arduino.forBlock['util_record_stop'] = function (block, generator) {
  return '';
};

// 3. 블록조립 과정 재생 (실행 블록)
Arduino.forBlock['util_record_play'] = function (block, generator) {
  return '';
};

// 4. 블록조립 재생 중지 (실행 블록)
Arduino.forBlock['util_record_play_stop'] = function (block, generator) {
  return '';
};

// 5. 블록조립 기록 초기화 (실행 블록)
Arduino.forBlock['util_record_reset'] = function (block, generator) {
  return '';
};

// 6. 기록 상태 (정보 블록 - 더미 값 반환)
Arduino.forBlock['util_record_status'] = function (block, generator) {
  // IDE 전용 정보 블록
  // 실제 값은 BlockAssemblyRecorder에서 가져오지만
  // Arduino 코드에서는 더미 값 반환
  return ['""', Arduino.ORDER_ATOMIC];
};

// 7. 이벤트 수 (정보 블록 - 더미 값 반환)
Arduino.forBlock['util_record_event_count'] = function (block, generator) {
  return ['0', Arduino.ORDER_ATOMIC];
};

// 8. 총 블록조립 시간(초) (정보 블록 - 더미 값 반환)
Arduino.forBlock['util_record_duration'] = function (block, generator) {
  return ['0', Arduino.ORDER_ATOMIC];
};

// 9. 블록조립 시작시간 (정보 블록 - 더미 값 반환)
Arduino.forBlock['util_record_start_time'] = function (block, generator) {
  return ['""', Arduino.ORDER_ATOMIC];
};

// 10. 블록조립 종료시간 (정보 블록 - 더미 값 반환)
Arduino.forBlock['util_record_end_time'] = function (block, generator) {
  return ['""', Arduino.ORDER_ATOMIC];
};

// ==================== Unknown Block Code Generator ====================
/**
 * Unknown block placeholder는 코드 생성하지 않음 (빈 문자열 반환)
 * 동적으로 생성된 unknown block (예: unknown_block_placeholder_시리얼_시작)은
 * createUnknownBlockPlaceholder 함수에서 자동으로 코드 생성기가 등록됨
 */
Arduino.forBlock['unknown_block_placeholder'] = function (block, generator) {
  // 코드 생성 시 무시 (빈 문자열 반환)
  return '';
};

// ============================================================================
// ESP32-CAM 코드 생성기
// ============================================================================

// 1. ESP32-CAM 선언부
Arduino.forBlock['esp32cam_declare'] = function (block, generator) {
  generator.definitions_['esp32cam_includes'] = `#include "esp_camera.h"
#include <WiFi.h>
#include <WiFiUdp.h>`;

  generator.definitions_['esp32cam_pinmap'] = `
// AI-Thinker ESP32-CAM 핀맵
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22`;

  generator.definitions_['esp32cam_udp'] = `WiFiUDP udp;`;

  return '';
};

// 2. WiFi 설정
Arduino.forBlock['esp32cam_wifi_config'] = function (block, generator) {
  var ssid = generator.valueToCode(block, 'SSID', Arduino.ORDER_ATOMIC) || '"exllu_2401"';
  var password = generator.valueToCode(block, 'PASSWORD', Arduino.ORDER_ATOMIC) || '"11112222"';

  generator.definitions_['esp32cam_wifi_credentials'] = `
// WiFi 설정
const char* ssid = ${ssid};
const char* password = ${password};`;

  return '';
};

// 3. 수신자 설정
Arduino.forBlock['esp32cam_receiver_config'] = function (block, generator) {
  var ip = generator.valueToCode(block, 'IP', Arduino.ORDER_ATOMIC) || '"192.168.137.1"';
  var port = generator.valueToCode(block, 'PORT', Arduino.ORDER_ATOMIC) || '8888';
  var chunkSize = generator.valueToCode(block, 'CHUNK_SIZE', Arduino.ORDER_ATOMIC) || '1000';

  generator.definitions_['esp32cam_receiver'] = `
// 수신자(PC) 설정
const char* pc_ip = ${ip};
const int udp_port = ${port};
const size_t chunkSize = ${chunkSize};`;

  return '';
};

// 4. 카메라 초기화 (setup 안에 배치)
Arduino.forBlock['esp32cam_setup'] = function (block, generator) {
  var frameSize = block.getFieldValue('FRAME_SIZE');
  var jpegQuality = generator.valueToCode(block, 'JPEG_QUALITY', Arduino.ORDER_ATOMIC) || '12';
  var brightness = generator.valueToCode(block, 'BRIGHTNESS', Arduino.ORDER_ATOMIC) || '-1';
  var contrast = generator.valueToCode(block, 'CONTRAST', Arduino.ORDER_ATOMIC) || '1';
  var saturation = generator.valueToCode(block, 'SATURATION', Arduino.ORDER_ATOMIC) || '1';

  var code = `
  Serial.begin(115200);

  // LED 핀 초기화 (GPIO 4 - 플래시 LED)
  pinMode(4, OUTPUT);
  digitalWrite(4, LOW);  // 초기값: 꺼짐

  // WiFi 연결
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\\nWi-Fi Connected!");

  // 카메라 설정
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;
  config.frame_size = ${frameSize};
  config.jpeg_quality = ${jpegQuality};
  config.fb_count = 2;

  if (esp_camera_init(&config) != ESP_OK) {
    Serial.println("Camera Init Failed");
    return;
  }

  // 카메라 센서 설정
  sensor_t * s = esp_camera_sensor_get();
  if (s != NULL) {
    s->set_brightness(s, ${brightness});  // -2 ~ 2
    s->set_contrast(s, ${contrast});      // -2 ~ 2
    s->set_saturation(s, ${saturation});  // -2 ~ 2
  }
`;

  return code;
};

// 5. UDP 영상 전송 (loop 안에 배치)
Arduino.forBlock['esp32cam_loop'] = function (block, generator) {
  var code = `
  // 카메라 프레임 획득
  camera_fb_t * fb = esp_camera_fb_get();
  if (!fb) {
    Serial.println("Camera capture failed");
    return;
  }

  // 이미지를 청크로 쪼개서 UDP 전송
  uint8_t * data = fb->buf;
  size_t length = fb->len;
  size_t sent = 0;

  while (sent < length) {
    size_t available = length - sent;
    size_t packetSize = (available < chunkSize) ? available : chunkSize;

    udp.beginPacket(pc_ip, udp_port);
    udp.write(data + sent, packetSize);
    udp.endPacket();

    sent += packetSize;
    delayMicroseconds(3000);
  }

  esp_camera_fb_return(fb);
`;

  return code;
};

// 6. ESP32-CAM 내장 LED 제어
Arduino.forBlock['esp32cam_led_control'] = function (block, generator) {
  var state = block.getFieldValue('STATE');

  var code = `  digitalWrite(4, ${state});  // ESP32-CAM 플래시 LED (GPIO 4)
`;

  return code;
};