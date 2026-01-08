/**
 * Arduino 블록 프로그래밍 유틸리티 함수들 (Blockly 12.2.0 호환)
 * 코드 업데이트, 복사, 하이라이팅 등의 기능을 담당합니다.
 */

/**
 * 실시간 코드 업데이트 함수 (개선 버전)
 * 🔥 핵심: 코드 생성 전 Arduino 생성기 완전 초기화
 */
function updateCode(event) { 
    try { 
        // workspace 존재 확인 (다양한 방법으로)
        const currentWorkspace = window.workspace || 
                                (typeof Blockly !== 'undefined' && Blockly.mainWorkspace) ||
                                workspace;
        
        if (!currentWorkspace) {
            console.warn('워크스페이스를 찾을 수 없습니다.');
            return;
        }
        
        // 🔥 핵심 추가: 코드 생성 전 Arduino 생성기 완전 초기화
        if (typeof Arduino !== 'undefined' && Arduino.init) {
            Arduino.init(currentWorkspace);
        }
        
        // 코드 생성 시도
        let code = '';
        if (typeof Arduino !== 'undefined' && Arduino.workspaceToCode) {
            code = Arduino.workspaceToCode(currentWorkspace);
        } else if (typeof Blockly !== 'undefined' && Blockly.JavaScript) {
            code = Blockly.JavaScript.workspaceToCode(currentWorkspace);
        } else {
            code = '// 코드 생성기를 찾을 수 없습니다.';
        }
        
        // 코드 표시
        const codePreviewElement = document.getElementById('codePreview');
        if (codePreviewElement) {
            codePreviewElement.innerHTML = highlightArduinoCode(code);
        }
        
    } catch (e) { 
        console.error('코드 생성 오류:', e); 
        const codePreviewElement = document.getElementById('codePreview');
        if (codePreviewElement) {
            codePreviewElement.innerHTML = 
                '<span style="color: #ff6b6b;">코드 생성 중 오류가 발생했습니다. 블록 연결을 확인해주세요.</span>';
        }
    } 
}

/**
 * 코드 복사 함수 (개선된 버전)
 */
function copyCode() { 
    try {
        const codePreviewElement = document.getElementById('codePreview');
        if (!codePreviewElement) {
            console.error('코드 미리보기 요소를 찾을 수 없습니다.');
            return;
        }
        
        const codeText = codePreviewElement.textContent || codePreviewElement.innerText || '';
        
        if (!codeText.trim()) {
            showCopyFeedback(false, '복사할 코드가 없습니다.');
            return;
        }
        
        navigator.clipboard.writeText(codeText).then(() => {
            showCopyFeedback(true); // 성공
        }).catch(err => {
            console.error('Copy failed:', err);
            
            // 대안: 텍스트 선택 방식
            try {
                const textArea = document.createElement('textarea');
                textArea.value = codeText;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showCopyFeedback(true);
            } catch (fallbackErr) {
                console.error('Fallback copy failed:', fallbackErr);
                showCopyFeedback(false); // 실패
            }
        });
    } catch (error) {
        console.error('copyCode 함수 오류:', error);
        showCopyFeedback(false);
    }
}

/**
 * 복사 완료 피드백 표시 (개선된 버전)
 */
function showCopyFeedback(isSuccess, customMessage = null) {
    try {
        const btn = document.querySelector('.copy-btn');
        if (!btn) {
            console.warn('복사 버튼을 찾을 수 없습니다.');
            return;
        }
        
        const originalText = btn.textContent || '📋 복사';
        
        // 메시지 결정
        let message;
        if (customMessage) {
            message = customMessage;
        } else if (isSuccess) {
            message = '✅ 복사됨!';
        } else {
            message = '❌ 복사 실패';
        }
        
        // 피드백 표시
        btn.textContent = message;
        btn.style.backgroundColor = isSuccess ? '#28a745' : '#dc3545';
        
        // 원래 상태로 복원
        setTimeout(() => { 
            btn.textContent = originalText;
            btn.style.backgroundColor = ''; // 원래 색상으로
        }, 1500);
        
    } catch (error) {
        console.error('showCopyFeedback 함수 오류:', error);
    }
}

/**
 * Arduino 코드 신택스 하이라이팅 함수 (개선된 버전)
 */
function highlightArduinoCode(code) {
    try {
        // HTML 특수문자 이스케이프
        code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        
        // Arduino 키워드
        const keywords = [
            'void', 'int', 'float', 'char', 'byte', 'boolean', 'unsigned', 'long', 'short', 'double',
            'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'break', 'continue', 'return',
            'HIGH', 'LOW', 'INPUT', 'OUTPUT', 'INPUT_PULLUP', 'true', 'false', 'setup', 'loop',
            'const', 'static', 'volatile'
        ];
        code = code.replace(new RegExp('\\b(' + keywords.join('|') + ')\\b', 'g'), 
                           '<span style="color: #569cd6; font-weight: bold;">$1</span>');
        
        // Arduino 함수들
        const functions = [
            'digitalWrite', 'digitalRead', 'analogWrite', 'analogRead', 'pinMode', 'delay', 'delayMicroseconds',
            'Serial', 'begin', 'println', 'print', 'available', 'read', 'write', 'flush',
            'attach', 'detach', 'millis', 'micros', 'tone', 'noTone', 'pulseIn', 'shiftOut', 'shiftIn',
            'map', 'constrain', 'min', 'max', 'abs', 'sqrt', 'pow', 'sin', 'cos', 'tan',
            'random', 'randomSeed', 'sizeof', 'strlen', 'strcmp', 'strcpy'
        ];
        code = code.replace(new RegExp('\\b(' + functions.join('|') + ')\\b', 'g'), 
                           '<span style="color: #dcdcaa;">$1</span>');
        
        // 숫자
        code = code.replace(/\b(\d+\.?\d*[fFlL]?)\b/g, '<span style="color: #b5cea8;">$1</span>');
        
        // 문자열
        code = code.replace(/&quot;([^&]*)&quot;/g, '<span style="color: #ce9178;">&quot;$1&quot;</span>');
        code = code.replace(/\'([^'])\'/g, '<span style="color: #ce9178;">\'$1\'</span>');
        
        // 주석
        code = code.replace(/(\/\/.*$)/gm, '<span style="color: #6a9955; font-style: italic;">$1</span>');
        code = code.replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color: #6a9955; font-style: italic;">$1</span>');
        
        // 전처리기 지시문
        code = code.replace(/(#.*$)/gm, '<span style="color: #9cdcfe;">$1</span>');
        
        return code;
        
    } catch (error) {
        console.error('코드 하이라이팅 오류:', error);
        return code; // 오류 시 원본 코드 반환
    }
}

/**
 * 안전한 전역 에러 핸들러 (개선된 버전)
 */
window.addEventListener('error', function(e) {
    // Script error는 CORS 정책으로 인한 것이므로 무시
    if (e.message === 'Script error.' && e.lineno === 0) {
        return; // 로그하지 않음
    }
    
    // 실제 오류만 로깅
    console.error('전역 에러 발생:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error
    });
});

/**
 * Blockly 워크스페이스 이벤트 리스너 등록 (유틸리티)
 */
function setupWorkspaceListeners(workspace) {
    if (!workspace) return;
    
    try {
        // 코드 변경 이벤트 리스너
        workspace.addChangeListener(updateCode);
        console.log('워크스페이스 이벤트 리스너 등록 완료');
    } catch (error) {
        console.error('워크스페이스 리스너 등록 실패:', error);
    }
}

// 전역 함수로 내보내기 (필요한 경우)
if (typeof window !== 'undefined') {
    window.updateCode = updateCode;
    window.copyCode = copyCode;
    window.highlightArduinoCode = highlightArduinoCode;
    window.setupWorkspaceListeners = setupWorkspaceListeners;
}

/**
 * ========================================
 * Phase 3: 블록 검증 시스템 (안전 장치)
 * ========================================
 */

/**
 * 블록 조립 상태 검증 함수
 * 호환되지 않는 블록 조합, 중복 초기화, 연결되지 않은 블록 등을 검사합니다.
 */
function validateBlockAssembly() {
    if (!window.workspace) return { valid: true, errors: [] };
    
    const errors = [];
    const allBlocks = window.workspace.getAllBlocks(false);
    
    // 1. 호환되지 않는 OLED 블록 조합 검사
    const ssd1306Blocks = allBlocks.filter(b => b.type && b.type.includes('ssd1306'));
    const sh1106Blocks = allBlocks.filter(b => b.type && b.type.includes('sh1106'));
    
    if (ssd1306Blocks.length > 0 && sh1106Blocks.length > 0) {
        errors.push({
            type: 'incompatible_blocks',
            message: '⚠️ SSD1306과 SH1106 OLED 블록을 동시에 사용할 수 없습니다. 하나만 선택해주세요.',
            blocks: [...ssd1306Blocks, ...sh1106Blocks]
        });
    }
    
    // 2. 중복 OLED 초기화 검사
    const oledInitBlocks = allBlocks.filter(b => 
        b.type && (b.type.includes('ssd1306_init') || b.type.includes('sh1106_init'))
    );
    
    if (oledInitBlocks.length > 1) {
        errors.push({
            type: 'duplicate_init',
            message: '⚠️ OLED 초기화 블록이 중복되었습니다. 하나만 사용해주세요.',
            blocks: oledInitBlocks
        });
    }
    
    // 3. setup/loop 블록 존재 확인
    const setupBlock = allBlocks.find(b => b.type === 'arduino_setup');
    const loopBlock = allBlocks.find(b => b.type === 'arduino_loop');
    
    if (!setupBlock || !loopBlock) {
        errors.push({
            type: 'missing_main_blocks',
            message: 'ℹ️ setup() 또는 loop() 블록이 없습니다.',
            blocks: []
        });
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

/**
 * 블록 검증 결과를 UI에 표시
 * @param {Object} validation - validateBlockAssembly()의 반환값
 */
function displayValidationResults(validation) {
    const validationPanel = document.getElementById('validationPanel');
    if (!validationPanel) return;
    
    if (validation.valid) {
        validationPanel.innerHTML = '';
        validationPanel.style.display = 'none';
    } else {
        let html = '<div style="padding: 10px; background: #fff3cd; border: 1px solid #ffc107; border-radius: 4px; margin: 10px 0;">';
        html += '<strong>⚠️ 블록 검증 경고:</strong><ul style="margin: 5px 0; padding-left: 20px;">';
        
        validation.errors.forEach(error => {
            html += `<li>${error.message}</li>`;
        });
        
        html += '</ul></div>';
        validationPanel.innerHTML = html;
        validationPanel.style.display = 'block';
    }
}

// 전역 함수로 추가 내보내기
if (typeof window !== 'undefined') {
    window.validateBlockAssembly = validateBlockAssembly;
    window.displayValidationResults = displayValidationResults;
}

/**
 * ========================================
 * Phase 4: Unknown Block 처리 시스템
 * ========================================
 */

// Unknown Block 처리 유틸리티 네임스페이스
window.IDEBlocklyUtils = window.IDEBlocklyUtils || {};

/**
 * XML에서 정의되지 않은 블록을 감지하고 placeholder로 변환
 * @param {string} xmlText - 원본 XML 텍스트
 * @returns {Object} { xmlDom: 처리된 XML DOM, unknownBlocks: 발견된 unknown block 목록 }
 */
window.IDEBlocklyUtils.preprocessXmlForUnknownBlocks = function(xmlText) {
    const unknownBlocks = [];

    try {
        // XML을 DOM으로 파싱
        const xmlDom = Blockly.utils.xml.textToDom(xmlText);

        // 모든 block 요소를 순회 (역순으로 순회하여 DOM 수정 안전하게 처리)
        const blockElements = xmlDom.getElementsByTagName('block');

        for (let i = blockElements.length - 1; i >= 0; i--) {
            const blockElement = blockElements[i];
            const blockType = blockElement.getAttribute('type');

            // 블록 타입이 정의되어 있는지 확인
            if (blockType && !Blockly.Blocks[blockType]) {
                // Unknown block 발견
                console.warn('[Unknown Block 발견]', blockType);
                unknownBlocks.push(blockType);

                // 동적으로 placeholder 블록 생성
                if (typeof createUnknownBlockPlaceholder === 'function') {
                    createUnknownBlockPlaceholder(blockType);
                }

                // block 요소의 type을 placeholder로 변경
                blockElement.setAttribute('type', 'unknown_block_placeholder_' + blockType);
                blockElement.setAttribute('data-original-type', blockType);

                // 기존 field와 value를 모두 제거 (placeholder는 단순한 레이블만 표시)
                const childrenToRemove = [];
                for (let j = 0; j < blockElement.children.length; j++) {
                    const child = blockElement.children[j];
                    if (child.tagName === 'field' || child.tagName === 'value') {
                        childrenToRemove.push(child);
                    }
                }
                childrenToRemove.forEach(child => blockElement.removeChild(child));
            }
        }

        return {
            xmlDom: xmlDom,
            unknownBlocks: [...new Set(unknownBlocks)]  // 중복 제거
        };

    } catch (error) {
        console.error('XML 전처리 중 오류:', error);
        throw error;
    }
};

/**
 * 워크스페이스에서 unknown block이 있는지 확인
 * @param {Blockly.Workspace} workspace - 검사할 워크스페이스
 * @returns {Array} Unknown block 타입 목록 (중복 제거됨)
 */
window.IDEBlocklyUtils.detectUnknownBlocksInWorkspace = function(workspace) {
    const unknownBlocks = [];

    if (!workspace) {
        console.warn('워크스페이스가 제공되지 않았습니다.');
        return unknownBlocks;
    }

    try {
        const allBlocks = workspace.getAllBlocks(false);

        allBlocks.forEach(block => {
            if (block.type && block.type.startsWith('unknown_block_placeholder_')) {
                const originalType = block.type.replace('unknown_block_placeholder_', '');
                unknownBlocks.push(originalType);
            }
        });

        return [...new Set(unknownBlocks)];  // 중복 제거

    } catch (error) {
        console.error('워크스페이스에서 unknown block 감지 중 오류:', error);
        return unknownBlocks;
    }
};