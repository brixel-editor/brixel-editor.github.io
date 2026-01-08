/**
 * Arduino 코드 생성기 기본 설정 (Blockly 12.2.0)
 * 이 파일은 Arduino 생성기의 기본 구조와 ORDER 상수들을 정의합니다.
 */

// === Arduino 코드 생성기 생성 (Blockly 12.x 방식) ===
var Arduino = new Blockly.CodeGenerator('Arduino');

// === 예약어 정의 ===
Arduino.RESERVED_WORDS_ = [
  'setup', 'loop', 'if', 'else', 'for', 'while', 'do', 'break', 'continue', 'return',
  'void', 'boolean', 'char', 'byte', 'int', 'unsigned', 'long', 'short', 'float', 'double',
  'String', 'INPUT', 'OUTPUT', 'HIGH', 'LOW', 'true', 'false'
].join(',');

// === ORDER 상수들 정의 (연산자 우선순위) ===
Arduino.ORDER_ATOMIC = 0;
Arduino.ORDER_MEMBER = 1.2;
Arduino.ORDER_FUNCTION_CALL = 2;
Arduino.ORDER_UNARY_MINUS = 4.3;
Arduino.ORDER_LOGICAL_NOT = 4.4;
Arduino.ORDER_MULTIPLICATION = 5.1;
Arduino.ORDER_DIVISION = 5.2;
Arduino.ORDER_MODULUS = 5.3;
Arduino.ORDER_SUBTRACTION = 6.1;
Arduino.ORDER_ADDITION = 6.2;
Arduino.ORDER_RELATIONAL = 8;
Arduino.ORDER_EQUALITY = 9;
Arduino.ORDER_LOGICAL_AND = 13;
Arduino.ORDER_LOGICAL_OR = 14;
Arduino.ORDER_CONDITIONAL = 15;
Arduino.ORDER_ASSIGNMENT = 16;
Arduino.ORDER_COMMA = 18;
Arduino.ORDER_NONE = 99;

/**
 * 생성기 초기화 함수
 */
Arduino.init = function (workspace) {
  // 🔥 전역 속성 완전 초기화 (이전 상태 오염 방지)
  Arduino.definitions_ = Object.create(null);
  Arduino.setups_ = Object.create(null);
  Arduino.loops_ = Object.create(null);

  // 타이머 카운터도 초기화
  Arduino.timerCount_ = 0;

  // if (typeof console !== 'undefined' && console.log) {
  //   console.log('🔄 Arduino 코드 생성기 초기화 완료');
  // }
};

/**
 * 최종 코드 완성 함수 (개선 버전)
 * 🔥 코드 생성 완료 후 즉시 초기화하여 다음 생성 시 깨끗한 상태 보장
 */
Arduino.finish = function (code) {
  // 1. 모든 #include, 전역 변수 정의를 모음
  let definitions = Object.values(Arduino.definitions_).join('\n');

  // 2. 최종 코드를 순서대로 조립
  // setup() 함수는 arduino_setup 블록이 직접 생성하므로 여기서는 처리하지 않음
  let finalCode = (definitions ? definitions + '\n\n' : '') + code;

  // 3. 🔥 중요: 코드 생성 완료 후 즉시 초기화 (다음 생성을 위해)
  Arduino.definitions_ = Object.create(null);
  Arduino.setups_ = Object.create(null);
  Arduino.loops_ = Object.create(null);
  Arduino.timerCount_ = 0;

  return finalCode;
};

/**
 * 블록 체인 연결 함수
 */
Arduino.scrub_ = function (block, code, thisOnly) {
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  const nextCode = thisOnly ? '' : Arduino.blockToCode(nextBlock);
  return code + nextCode;
};