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

    // ResizeObserver 에러는 무해한 성능 경고이므로 무시
    // Monaco Editor와 같은 복잡한 UI 컴포넌트에서 자주 발생
    if (e.message && e.message.includes('ResizeObserver loop')) {
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

/**
 * ========================================
 * Phase 5: 블록 이미지 저장 시스템 (단순화 버전)
 * ========================================
 *
 * PNG 저장 시 foreignObject (HTML 입력 필드) 내의 텍스트는
 * Canvas 보안 제한으로 인해 표시되지 않을 수 있습니다.
 * 완전한 이미지가 필요한 경우 SVG 저장을 권장합니다.
 */

window.BlockImageSaver = window.BlockImageSaver || {};

/**
 * 메인 블록과 연결된 모든 블록 수집
 */
window.BlockImageSaver.getAllConnectedBlocks = function(block) {
    const blocks = [];

    function collect(b) {
        if (!b || blocks.includes(b)) return;
        blocks.push(b);

        if (b.getNextBlock()) collect(b.getNextBlock());

        b.inputList.forEach(input => {
            if (input.connection && input.connection.targetBlock()) {
                collect(input.connection.targetBlock());
            }
        });
    }

    collect(block);
    return blocks;
};

/**
 * 최상위 메인 블록 찾기
 */
window.BlockImageSaver.findTopMainBlock = function(workspace) {
    const allBlocks = workspace.getAllBlocks(false);
    let topBlock = allBlocks.find(b => b.type === 'arduino_uno_starts_up') ||
                   allBlocks.find(b => b.type === 'arduino_setup') ||
                   allBlocks.find(b => b.type === 'arduino_loop');

    if (!topBlock) return null;

    while (topBlock.getPreviousBlock()) {
        topBlock = topBlock.getPreviousBlock();
    }

    return topBlock;
};

/**
 * 블록들의 bounding box 계산 (Blockly API 사용)
 */
window.BlockImageSaver.calculateBoundingBox = function(blocks) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    blocks.forEach(block => {
        try {
            // Blockly의 getBoundingRectangle() 사용 - 가장 정확한 방법
            if (block.getBoundingRectangle) {
                const rect = block.getBoundingRectangle();
                minX = Math.min(minX, rect.left);
                minY = Math.min(minY, rect.top);
                maxX = Math.max(maxX, rect.right);
                maxY = Math.max(maxY, rect.bottom);
            } else {
                // fallback: getRelativeToSurfaceXY 사용
                const xy = block.getRelativeToSurfaceXY();
                const hw = block.getHeightWidth();
                minX = Math.min(minX, xy.x);
                minY = Math.min(minY, xy.y);
                maxX = Math.max(maxX, xy.x + hw.width);
                maxY = Math.max(maxY, xy.y + hw.height);
            }
        } catch (e) {
            console.warn('블록 크기 계산 실패:', e);
        }
    });

    // 전체 블록 영역 크기 계산
    const totalWidth = maxX - minX;
    const totalHeight = maxY - minY;

    const padding = 40;
    return {
        x: minX - padding,
        y: minY - padding,
        width: totalWidth + padding * 2,
        height: totalHeight + padding * 2
    };
};

/**
 * SVG 복제 및 정리
 */
window.BlockImageSaver.prepareClonedSvg = function(workspace, bbox) {
    const svg = workspace.getParentSvg();
    const clone = svg.cloneNode(true);

    // blocklyBlockCanvas의 현재 transform 가져오기
    const canvas = clone.querySelector('.blocklyBlockCanvas');
    let canvasTranslateX = 0, canvasTranslateY = 0, scale = 1;
    if (canvas) {
        const transform = canvas.getAttribute('transform');
        if (transform) {
            const tm = transform.match(/translate\(([-\d.]+),?\s*([-\d.]+)?\)/);
            if (tm) {
                canvasTranslateX = parseFloat(tm[1]) || 0;
                canvasTranslateY = parseFloat(tm[2]) || 0;
            }
            const sm = transform.match(/scale\(([-\d.]+)\)/);
            if (sm) {
                scale = parseFloat(sm[1]) || 1;
            }
        }
        // canvas transform 제거하고 새로운 transform 설정
        // 블록을 원점 기준으로 이동
        const newTranslateX = -bbox.x + 40;
        const newTranslateY = -bbox.y + 40;
        canvas.setAttribute('transform', `translate(${newTranslateX}, ${newTranslateY})`);
    }

    // viewBox를 0,0 기준으로 설정
    clone.setAttribute('viewBox', `0 0 ${bbox.width} ${bbox.height}`);
    clone.setAttribute('width', bbox.width);
    clone.setAttribute('height', bbox.height);
    clone.style.backgroundColor = 'transparent';

    // 배경 투명
    const bg = clone.querySelector('.blocklyMainBackground');
    if (bg) {
        bg.setAttribute('fill', 'none');
        bg.setAttribute('fill-opacity', '0');
    }

    // 불필요한 요소 제거
    ['.blocklyFlyout', '.blocklyTrash', '.blocklyZoom',
     '.blocklyScrollbarBackground', '.blocklyScrollbarHandle',
     '.blocklyGridPattern', '.blocklyGridLine', '.blocklyToolboxDiv'
    ].forEach(sel => {
        clone.querySelectorAll(sel).forEach(el => el.remove());
    });

    return clone;
};

/**
 * Blockly 필드 값을 SVG에 반영 (PNG 저장용)
 */
window.BlockImageSaver.applyFieldValuesToSvg = function(svgClone, workspace) {
    const blocks = workspace.getAllBlocks(false);
    const originalSvg = workspace.getParentSvg();

    // 1. 모든 블록의 필드 값을 블록ID와 함께 수집
    const fieldData = [];
    blocks.forEach(block => {
        const blockId = block.id;
        block.inputList.forEach(input => {
            input.fieldRow.forEach(field => {
                if (field.getText) {
                    const text = field.getText();
                    const name = field.name || '';
                    if (text) {
                        fieldData.push({ blockId, name, text });
                    }
                }
            });
        });
    });

    // 2. SVG 클론에서 각 블록 그룹을 찾아 텍스트 업데이트
    fieldData.forEach(({ blockId, name, text }) => {
        const blockGroup = svgClone.querySelector(`g[data-id="${blockId}"]`);
        if (!blockGroup) return;

        const textElements = blockGroup.querySelectorAll('text.blocklyText');
        textElements.forEach(textEl => {
            if (!textEl.textContent || textEl.textContent.trim() === '') {
                const parentG = textEl.closest('g[class*="blocklyField"]');
                if (parentG) {
                    const fieldId = parentG.getAttribute('id') || '';
                    if (fieldId.includes(name) || name === '') {
                        textEl.textContent = text;
                    }
                }
            }
        });
    });

    // 3. rect 색상은 변경하지 않음 (원본 유지)

    // 4. foreignObject 처리 - 입력 필드를 흰색 배경 + 검정색 텍스트로 변환
    const originalFOs = Array.from(originalSvg.querySelectorAll('foreignObject'));
    const cloneFOs = Array.from(svgClone.querySelectorAll('foreignObject'));

    originalFOs.forEach((origFo, idx) => {
        const input = origFo.querySelector('input, textarea');
        const textValue = input ? input.value : '';

        if (cloneFOs[idx]) {
            const fo = cloneFOs[idx];
            const x = parseFloat(fo.getAttribute('x')) || 0;
            const y = parseFloat(fo.getAttribute('y')) || 0;
            const width = parseFloat(fo.getAttribute('width')) || 50;
            const height = parseFloat(fo.getAttribute('height')) || 20;

            const parent = fo.parentNode;
            if (parent) {
                // 흰색 배경 rect 추가
                const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                bgRect.setAttribute('x', x);
                bgRect.setAttribute('y', y);
                bgRect.setAttribute('width', width);
                bgRect.setAttribute('height', height);
                bgRect.setAttribute('fill', '#FFFFFF');
                bgRect.setAttribute('rx', '4');
                bgRect.setAttribute('ry', '4');
                parent.insertBefore(bgRect, fo);

                // 검정색 텍스트 추가
                if (textValue) {
                    const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    textEl.setAttribute('x', x + 4);
                    textEl.setAttribute('y', y + height / 2);
                    textEl.setAttribute('fill', '#000000');
                    textEl.setAttribute('font-family', 'sans-serif, Arial');
                    textEl.setAttribute('font-size', '11px');
                    textEl.setAttribute('dominant-baseline', 'middle');
                    textEl.textContent = textValue;
                    parent.insertBefore(textEl, fo);
                }
            }
            fo.remove();
        }
    });

    // 5. 남은 foreignObject 제거
    svgClone.querySelectorAll('foreignObject').forEach(fo => fo.remove());

    // 6. 선택된 블록 처리 - 클래스 제거 및 텍스트 색상 강제 설정
    svgClone.querySelectorAll('.blocklySelected, .blocklyActiveFocus').forEach(el => {
        // 선택된 블록 내부의 모든 텍스트에 명시적 색상 설정
        el.querySelectorAll('text').forEach(textEl => {
            textEl.setAttribute('fill', '#000000');
            textEl.setAttribute('visibility', 'visible');
            textEl.setAttribute('opacity', '1');
        });
        // 클래스 제거
        el.classList.remove('blocklySelected', 'blocklyActiveFocus');
    });

    // path 요소의 blocklyActiveFocus 클래스도 제거
    svgClone.querySelectorAll('path.blocklyActiveFocus').forEach(path => {
        path.classList.remove('blocklyActiveFocus');
    });

    // 7. 텍스트 블록 내부의 텍스트는 흰색으로 (어두운 배경에서 보이도록)
    svgClone.querySelectorAll('g.text_blocks text, g[class*="text_blocks"] text').forEach(textEl => {
        textEl.setAttribute('fill', '#FFFFFF');
    });

    // 8. 텍스트 요소 기본 스타일 보장
    svgClone.querySelectorAll('text').forEach(textEl => {
        // fill이 없으면 검정색으로
        if (!textEl.getAttribute('fill')) {
            textEl.setAttribute('fill', '#000000');
        }
        textEl.setAttribute('font-family', 'sans-serif, Arial');
    });
};

/**
 * SVG를 PNG로 변환
 */
window.BlockImageSaver.svgToPng = function(svgElement, width, height, filename) {
    return new Promise((resolve, reject) => {
        const serializer = new XMLSerializer();
        let svgString = serializer.serializeToString(svgElement);

        // 네임스페이스 추가
        if (!svgString.includes('xmlns="http://www.w3.org/2000/svg"')) {
            svgString = svgString.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const scale = 2;

        canvas.width = width * scale;
        canvas.height = height * scale;
        ctx.scale(scale, scale);

        const img = new Image();

        img.onload = () => {
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(blob => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${filename}.png`;
                    a.click();
                    URL.revokeObjectURL(url);
                    resolve();
                } else {
                    reject(new Error('PNG 변환 실패'));
                }
            }, 'image/png');
        };

        img.onerror = () => reject(new Error('이미지 로드 실패'));

        const blob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
        img.src = URL.createObjectURL(blob);
    });
};

/**
 * PNG 이미지로 저장
 */
window.BlockImageSaver.saveMainBlocksAsImage = async function(workspace, filename = 'brixel_blocks') {
    const topBlock = this.findTopMainBlock(workspace);
    if (!topBlock) {
        alert('저장할 블록이 없습니다.');
        return;
    }

    // 블록 선택 해제 (선택된 블록 텍스트 숨김 문제 해결)
    if (Blockly.common && Blockly.common.getSelected) {
        const selected = Blockly.common.getSelected();
        if (selected && selected.unselect) {
            selected.unselect();
        }
    } else if (Blockly.selected) {
        Blockly.selected.unselect();
    }

    // 약간의 지연 후 SVG 복제 (선택 해제 반영을 위해)
    await new Promise(resolve => setTimeout(resolve, 50));

    const blocks = this.getAllConnectedBlocks(topBlock);
    const bbox = this.calculateBoundingBox(blocks);
    const svgClone = this.prepareClonedSvg(workspace, bbox);

    // Blockly 필드 값을 SVG에 반영하고 foreignObject 제거
    this.applyFieldValuesToSvg(svgClone, workspace);

    await this.svgToPng(svgClone, bbox.width, bbox.height, filename);
};

/**
 * foreignObject 내 input 값을 복원 (SVG 저장용)
 */
window.BlockImageSaver.preserveForeignObjectValues = function(svgClone, originalSvg) {
    // 원본 SVG의 foreignObject에서 input 값들을 수집
    const originalFOs = originalSvg.querySelectorAll('foreignObject');
    const cloneFOs = svgClone.querySelectorAll('foreignObject');

    originalFOs.forEach((origFo, idx) => {
        const origInput = origFo.querySelector('input, textarea');
        if (origInput && cloneFOs[idx]) {
            const cloneInput = cloneFOs[idx].querySelector('input, textarea');
            if (cloneInput && origInput.value) {
                // 값을 attribute로 설정 (SVG 저장 시 유지됨)
                cloneInput.setAttribute('value', origInput.value);
                cloneInput.value = origInput.value;
            }
        }
    });
};

/**
 * SVG 파일로 저장 (foreignObject 유지 - 텍스트 완전 보존)
 */
window.BlockImageSaver.saveMainBlocksAsSvg = async function(workspace, filename = 'brixel_blocks') {
    const topBlock = this.findTopMainBlock(workspace);
    if (!topBlock) {
        alert('저장할 블록이 없습니다.');
        return;
    }

    // 블록 선택 해제 (선택된 블록 텍스트 숨김 문제 해결)
    if (Blockly.common && Blockly.common.getSelected) {
        const selected = Blockly.common.getSelected();
        if (selected && selected.unselect) {
            selected.unselect();
        }
    } else if (Blockly.selected) {
        Blockly.selected.unselect();
    }

    // 약간의 지연 후 SVG 복제 (선택 해제 반영을 위해)
    await new Promise(resolve => setTimeout(resolve, 50));

    const blocks = this.getAllConnectedBlocks(topBlock);
    const bbox = this.calculateBoundingBox(blocks);

    // 원본 SVG 참조 유지
    const originalSvg = workspace.getParentSvg();
    const svgClone = this.prepareClonedSvg(workspace, bbox);

    // foreignObject 내 input 값 복원
    this.preserveForeignObjectValues(svgClone, originalSvg);

    // 선택된 블록 클래스 제거
    svgClone.querySelectorAll('.blocklySelected, .blocklyActiveFocus').forEach(el => {
        el.classList.remove('blocklySelected', 'blocklyActiveFocus');
    });

    // 텍스트 블록 내부의 텍스트는 흰색으로 (어두운 배경에서 보이도록)
    svgClone.querySelectorAll('g.text_blocks text, g[class*="text_blocks"] text').forEach(textEl => {
        textEl.setAttribute('fill', '#FFFFFF');
    });

    // SVG는 foreignObject 유지 (텍스트 보존)
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgClone);

    if (!svgString.includes('xmlns="http://www.w3.org/2000/svg"')) {
        svgString = svgString.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    const blob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.svg`;
    a.click();
    URL.revokeObjectURL(url);
};

/**
 * 메인 블록 체인 연결 확인
 */
window.BlockImageSaver.isConnectedToMainBlocks = function(block) {
    if (!block) return false;

    const mainTypes = ['arduino_uno_starts_up', 'arduino_setup', 'arduino_loop'];
    let current = block;

    while (current) {
        if (mainTypes.includes(current.type)) return true;
        current = current.getPreviousBlock() || current.getSurroundParent();
    }

    return false;
};

/**
 * 컨텍스트 메뉴 등록
 */
window.BlockImageSaver.registerContextMenu = function() {
    if (!Blockly || !Blockly.ContextMenuRegistry) return;

    const genFilename = () => {
        const d = new Date();
        return `brixel_blocks_${d.toISOString().slice(0,19).replace(/[:-]/g,'').replace('T','_')}`;
    };

    const precondition = (scope) => {
        return scope.block && this.isConnectedToMainBlocks(scope.block) ? 'enabled' : 'hidden';
    };

    // PNG 메뉴
    if (!Blockly.ContextMenuRegistry.registry.getItem('save_blocks_as_png')) {
        Blockly.ContextMenuRegistry.registry.register({
            id: 'save_blocks_as_png',
            weight: 200,
            displayText: () => 'PNG 이미지로 저장',
            preconditionFn: precondition,
            callback: (scope) => {
                if (scope.block) this.saveMainBlocksAsImage(scope.block.workspace, genFilename());
            },
            scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK
        });
    }

    // SVG 메뉴
    if (!Blockly.ContextMenuRegistry.registry.getItem('save_blocks_as_svg')) {
        Blockly.ContextMenuRegistry.registry.register({
            id: 'save_blocks_as_svg',
            weight: 201,
            displayText: () => 'SVG 파일로 저장 (권장)',
            preconditionFn: precondition,
            callback: (scope) => {
                if (scope.block) this.saveMainBlocksAsSvg(scope.block.workspace, genFilename());
            },
            scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK
        });
    }

    console.log('블록 이미지 저장 메뉴 등록 완료');
};

// 전역 함수
window.saveBlocksAsImage = (ws, fn) => window.BlockImageSaver.saveMainBlocksAsImage(ws, fn);
window.saveBlocksAsSvg = (ws, fn) => window.BlockImageSaver.saveMainBlocksAsSvg(ws, fn);