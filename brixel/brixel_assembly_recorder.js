/**
 * @file 블록 조립 기록/재생 시스템
 * @description 사용자의 블록 조립 과정을 기록하고 재생하는 기능을 제공합니다.
 * 수정: 재생 속도 버그 수정, 시간 포맷 변경 (YYYY-MM-DD HH:mm:ss), UI 개선
 */

window.BlockAssemblyRecorder = {
    // 워크스페이스 참조
    workspace: null,

    // 기록 상태: 'stopped' | 'recording' | 'playing'
    recordingState: 'stopped',

    // 기록된 이벤트 배열
    events: [],

    // 메타데이터
    metadata: {
        startTime: null,        // ISO 8601 문자열
        endTime: null,
        totalDuration: 0,       // ms
        eventCount: 0,
        initialXml: null        // 초기 블록 상태
    },

    // 재생 관련
    playback: {
        speed: 1,               // 1, 2, 4, 8
        currentIndex: 0,
        isPlaying: false,
        timerId: null,
        startTimestamp: 0,      // 기록 시작 시간
        blockIdMap: {}          // 원래 블록 ID -> 새 블록 ID 매핑
    },

    // UI 오버레이 참조
    _overlayElement: null,

    // 이벤트 리스너 참조 (제거용)
    eventListener: null,

    // 최대 이벤트 수 제한
    MAX_EVENTS: 10000,

    /**
     * 초기화 함수
     * @param {Blockly.WorkspaceSvg} workspace - Blockly 워크스페이스
     */
    init(workspace) {
        this.workspace = workspace;
        console.log('[BlockAssemblyRecorder] 초기화 완료');
        
        // CSS 스타일 주입 (툴팁 애니메이션 등)
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(5px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    },

    /**
     * 블록 조립 기록 시작
     */
    startRecording() {
        if (this.recordingState === 'recording') {
            window.IDEUtils.logToConsole('⚠️ 이미 기록 중입니다.');
            return;
        }

        if (this.recordingState === 'playing') {
            window.IDEUtils.logToConsole('⚠️ 재생 중에는 기록을 시작할 수 없습니다.');
            return;
        }

        // 초기화
        this.events = [];
        this.metadata.startTime = new Date().toISOString();
        this.metadata.endTime = null;
        this.metadata.totalDuration = 0;
        this.metadata.eventCount = 0;
        this.playback.startTimestamp = Date.now();

        // 현재 워크스페이스의 초기 상태(기본 블록들)를 XML로 저장
        const xmlDom = Blockly.Xml.workspaceToDom(this.workspace);
        this.metadata.initialXml = Blockly.Xml.domToText(xmlDom);
        console.log('[BlockAssemblyRecorder] 초기 상태 저장 완료 (기본 블록 포함)');

        // 이벤트 리스너 등록
        this.eventListener = this.captureEvent.bind(this);
        this.workspace.addChangeListener(this.eventListener);

        this.recordingState = 'recording';

        console.log('✅ 블록 조립 기록 시작');
        window.IDEUtils.logToConsole('✅ 블록 조립 기록 시작');
    },

    /**
     * 블록 조립 기록 중지
     */
    stopRecording() {
        if (this.recordingState !== 'recording') {
            window.IDEUtils.logToConsole('⚠️ 기록 중이 아닙니다.');
            return;
        }

        // 이벤트 리스너 제거
        if (this.eventListener && this.workspace) {
            this.workspace.removeChangeListener(this.eventListener);
            this.eventListener = null;
        }

        // 메타데이터 완료
        this.metadata.endTime = new Date().toISOString();
        this.metadata.totalDuration = Date.now() - this.playback.startTimestamp;
        this.metadata.eventCount = this.events.length;

        this.recordingState = 'stopped';

        const duration = this.formatDuration(Math.floor(this.metadata.totalDuration / 1000));
        console.log(`✅ 기록 중지 (이벤트: ${this.events.length}개, 시간: ${duration})`);
        window.IDEUtils.logToConsole(`✅ 기록 중지 (이벤트: ${this.events.length}개, 시간: ${duration})`);
    },

    /**
     * 이벤트 캡처
     * @param {Blockly.Events.Abstract} event - Blockly 이벤트
     */
    captureEvent(event) {
        // UI 이벤트 필터링
        if (!event.type || event.isUiEvent) return;

        // 재생 중 이벤트 무시
        if (this.recordingState === 'playing') return;

        // 최대 이벤트 수 체크
        if (this.events.length >= this.MAX_EVENTS) {
            console.warn('[BlockAssemblyRecorder] 최대 이벤트 수 도달:', this.MAX_EVENTS);
            this.stopRecording();
            window.IDEUtils.logToConsole('⚠️ 최대 이벤트 수(10,000개)에 도달하여 기록이 중지되었습니다.');
            return;
        }

        // 이벤트 타입 필터링
        const validTypes = ['create', 'delete', 'move', 'change'];
        if (!validTypes.includes(event.type.toLowerCase())) return;

        try {
            const recordedEvent = this.extractEventData(event);
            if (recordedEvent) {
                this.events.push(recordedEvent);
                // console.log('[BlockAssemblyRecorder] 이벤트 기록:', event.type);
            }
        } catch (error) {
            console.error('[BlockAssemblyRecorder] 이벤트 캡처 실패:', error);
        }
    },

    /**
     * 이벤트 데이터 추출
     */
    extractEventData(event) {
        const timestamp = Date.now() - this.playback.startTimestamp;
        const baseEvent = {
            type: event.type,
            timestamp: timestamp,
            blockId: event.blockId || null
        };

        switch (event.type.toLowerCase()) {
            case 'create': {
                const block = this.workspace.getBlockById(event.blockId);
                if (!block) return null;
                return {
                    ...baseEvent,
                    blockType: block.type,
                    data: {
                        xml: Blockly.Xml.domToText(Blockly.Xml.blockToDom(block)),
                        position: {
                            x: block.getRelativeToSurfaceXY().x,
                            y: block.getRelativeToSurfaceXY().y
                        }
                    }
                };
            }
            case 'delete': {
                return {
                    ...baseEvent,
                    blockType: event.oldXml ? Blockly.Xml.textToDom(event.oldXml).getAttribute('type') : 'unknown',
                    data: { oldXml: event.oldXml }
                };
            }
            case 'move': {
                return {
                    ...baseEvent,
                    blockType: event.type,
                    data: {
                        oldParentId: event.oldParentId || null,
                        newParentId: event.newParentId || null,
                        newInputName: event.newInputName || null,
                        newCoordinate: event.newCoordinate ? { x: event.newCoordinate.x, y: event.newCoordinate.y } : null
                    }
                };
            }
            case 'change': {
                return {
                    ...baseEvent,
                    blockType: event.type,
                    data: {
                        element: event.element || null,
                        name: event.name || null,
                        newValue: event.newValue
                    }
                };
            }
            default: return null;
        }
    },

    /**
     * 블록 조립 과정 재생
     * @param {number} speed - 재생 배속 (1, 2, 4, 8)
     */
    async playRecording(speed = 1) {
        if (this.recordingState !== 'stopped') {
            window.IDEUtils.logToConsole('⚠️ 기록/재생 중에는 실행할 수 없습니다.');
            return;
        }

        if (this.events.length === 0) {
            window.IDEUtils.logToConsole('⚠️ 재생할 이벤트가 없습니다.');
            return;
        }

        // 워크스페이스 초기화
        this.workspace.clear();
        if (this.metadata.initialXml) {
            try {
                const xmlDom = Blockly.utils.xml.textToDom(this.metadata.initialXml);
                Blockly.Xml.domToWorkspace(xmlDom, this.workspace);
            } catch (e) {
                console.error('초기 상태 복구 실패:', e);
            }
        }

        // [핵심 수정] 1. 먼저 재생 상태와 속도 설정을 완료한다!
        this.recordingState = 'playing';
        this.playback.speed = speed;  // <-- 여기서 먼저 설정해야 UI에 반영됨
        this.playback.currentIndex = 0;
        this.playback.isPlaying = true;
        this.playback.blockIdMap = {};

        // [핵심 수정] 2. 그 다음에 UI(오버레이)를 그린다.
        this.lockWorkspace();

        console.log(`▶️ 재생 시작 (배속: ${speed}x, 이벤트: ${this.events.length}개)`);
        window.IDEUtils.logToConsole(`▶️ 재생 시작 (배속: ${speed}x)`);

        this.playNextEvent();
    },

    /**
     * 다음 이벤트 재생 (속도 문제 수정됨)
     */
    playNextEvent() {
        if (!this.playback.isPlaying || this.playback.currentIndex >= this.events.length) {
            this.stopPlaying();
            return;
        }

        const currentEvent = this.events[this.playback.currentIndex];

        try {
            this.executeEvent(currentEvent);
        } catch (error) {
            console.error('이벤트 실행 실패:', error);
        }

        this.playback.currentIndex++;

        if (this.playback.currentIndex < this.events.length) {
            const nextEvent = this.events[this.playback.currentIndex];
            // [수정됨] 실제 시간 차이를 배속으로 나눔
            const delay = (nextEvent.timestamp - currentEvent.timestamp) / this.playback.speed;

            // [핵심 수정] 최소 지연 시간을 0ms로 변경하여 고속 재생 시 병목 현상 제거
            // 기존 Math.max(10, delay) 때문에 2배속, 4배속이 안 먹히던 문제 해결
            const actualDelay = Math.max(0, delay);

            this.playback.timerId = setTimeout(() => {
                this.playNextEvent();
            }, actualDelay);
        } else {
            this.stopPlaying();
        }
    },

    /**
     * 이벤트 실행 로직
     */
    executeEvent(event) {
        if (!event || !event.type) return;

        switch (event.type.toLowerCase()) {
            case 'create': {
                if (event.data && event.data.xml) {
                    try {
                        const xmlDom = Blockly.utils.xml.textToDom(event.data.xml);
                        // block 태그 찾기 로직 강화
                        const blockElement = xmlDom.tagName === 'block' ? xmlDom : xmlDom.querySelector('block');
                        
                        if (blockElement) {
                            const newBlock = Blockly.Xml.domToBlock(blockElement, this.workspace);
                            if (newBlock) {
                                this.playback.blockIdMap[event.blockId] = newBlock.id;
                            }
                        }
                    } catch (e) { console.warn('Create Error', e); }
                }
                break;
            }

            case 'delete': {
                const blockId = this.playback.blockIdMap[event.blockId] || event.blockId;
                const block = this.workspace.getBlockById(blockId);
                if (block) {
                    block.dispose(false);
                    delete this.playback.blockIdMap[event.blockId];
                }
                break;
            }

            case 'move': {
                const blockId = this.playback.blockIdMap[event.blockId] || event.blockId;
                const block = this.workspace.getBlockById(blockId);
                
                if (block && event.data) {
                    // 1. 좌표 이동 (부모 연결 해제 후 이동)
                    if (event.data.newCoordinate) {
                        if (block.getParent()) block.unplug();
                        block.moveBy(
                            event.data.newCoordinate.x - block.getRelativeToSurfaceXY().x,
                            event.data.newCoordinate.y - block.getRelativeToSurfaceXY().y
                        );
                    }

                    // 2. 연결 처리
                    if (event.data.newParentId) {
                        const parentId = this.playback.blockIdMap[event.data.newParentId] || event.data.newParentId;
                        const parentBlock = this.workspace.getBlockById(parentId);

                        if (parentBlock) {
                            let parentConnection = null;
                            let childConnection = null;

                            if (event.data.newInputName) {
                                const input = parentBlock.getInput(event.data.newInputName);
                                if (input) {
                                    parentConnection = input.connection;
                                    childConnection = block.outputConnection || block.previousConnection;
                                }
                            } else {
                                parentConnection = parentBlock.nextConnection;
                                childConnection = block.previousConnection;
                            }

                            if (parentConnection && childConnection) {
                                try { childConnection.connect(parentConnection); } catch (e) {}
                            }
                        }
                    } 
                    else if (event.data.oldParentId && !event.data.newParentId) {
                        if (block.getParent()) block.unplug();
                    }
                }
                break;
            }

            case 'change': {
                const blockId = this.playback.blockIdMap[event.blockId] || event.blockId;
                const block = this.workspace.getBlockById(blockId);
                if (block && event.data && event.data.element === 'field') {
                    const field = block.getField(event.data.name);
                    if (field) field.setValue(event.data.newValue);
                }
                break;
            }
        }
    },

    stopPlaying() {
        if (this.playback.timerId) {
            clearTimeout(this.playback.timerId);
            this.playback.timerId = null;
        }
        this.playback.isPlaying = false;
        this.recordingState = 'stopped';
        this.unlockWorkspace();
        console.log('⏹️ 재생 중지');
        window.IDEUtils.logToConsole('⏹️ 재생 완료');
    },

    lockWorkspace() {
        if (!this.workspace) return;
        this.workspace.options.readOnly = true;
        const blocklyDiv = document.getElementById('blocklyDiv');
        if (blocklyDiv) {
            blocklyDiv.style.pointerEvents = 'none';
            
            // 오버레이 생성
            const overlay = document.createElement('div');
            overlay.id = 'playback-overlay';
            overlay.style.cssText = `
                position: absolute; top: 20px; left: 50%; transform: translateX(-50%);
                z-index: 9999; display: flex; flex-direction: column; align-items: center; gap: 10px;
                pointer-events: auto; font-family: 'Malgun Gothic', sans-serif;
            `;
            
            const badge = document.createElement('div');
            badge.style.cssText = `background-color: #E65100; color: white; padding: 12px 30px; border-radius: 8px; font-size: 18px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.2);`;
            badge.innerHTML = `<span>▶️ 블록 조립 재생 중 (${this.playback.speed}배속)</span>`;
            
            const btn = document.createElement('button');
            btn.style.cssText = `background-color: #333; color: white; border: 2px solid white; padding: 8px 25px; border-radius: 20px; font-size: 14px; cursor: pointer; font-weight: bold;`;
            btn.innerHTML = '⏹ 중지';
            btn.onclick = (e) => { e.stopPropagation(); window.BlockAssemblyRecorder.stopPlaying(); };
            
            overlay.appendChild(badge);
            overlay.appendChild(btn);
            blocklyDiv.parentElement.appendChild(overlay);
            this._overlayElement = overlay;
        }
    },

    unlockWorkspace() {
        if (!this.workspace) return;
        this.workspace.options.readOnly = false;
        const blocklyDiv = document.getElementById('blocklyDiv');
        if (blocklyDiv) blocklyDiv.style.pointerEvents = 'auto';
        if (this._overlayElement) { this._overlayElement.remove(); this._overlayElement = null; }
        else { const overlay = document.getElementById('playback-overlay'); if (overlay) overlay.remove(); }
    },

    reset() {
        if (this.recordingState !== 'stopped') this.stopRecording();
        this.events = [];
        this.metadata = { startTime: null, endTime: null, totalDuration: 0, eventCount: 0 };
        this.playback.currentIndex = 0;
        console.log('🔄 초기화 완료');
        window.IDEUtils.logToConsole('🔄 블록 조립 기록 초기화 완료');
    },

    getStatus() {
        switch (this.recordingState) {
            case 'stopped': return '중지';
            case 'recording': return '기록 중';
            case 'playing': return '재생 중';
            default: return '알 수 없음';
        }
    },
    getEventCount() { return this.events.length; },

    // [수정됨] 시간을 HH:MM:SS 포맷으로 변환하는 헬퍼 함수
    formatDuration(seconds) {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    },

    // [수정됨] 총 블록조립 시간 (포맷 적용)
    getDuration() {
        let sec = 0;
        if (this.recordingState === 'recording') {
            sec = Math.floor((Date.now() - this.playback.startTimestamp) / 1000);
        } else {
            sec = Math.floor(this.metadata.totalDuration / 1000);
        }
        return this.formatDuration(sec);
    },

    // [수정됨] 날짜 포맷 헬퍼 (YYYY-MM-DD HH:MM:SS) - 컴퓨터 현재 시간 기준
    formatDateTime(isoString) {
        if (!isoString) return '기록 없음';
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        const sec = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    },

    getStartTime() { return this.formatDateTime(this.metadata.startTime); },
    getEndTime() { return this.formatDateTime(this.metadata.endTime); },

    exportData() { return { events: this.events, metadata: this.metadata }; },
    importData(data) {
        if (!data || !data.events) { console.warn('잘못된 데이터'); return; }
        this.events = data.events;
        this.metadata = data.metadata;
        console.log('데이터 가져오기 완료');
    }
};

/**
 * 블록 더블클릭 이벤트 설정
 */
function setupBlockDoubleClick(workspace) {
    const blocklyDiv = document.getElementById('blocklyDiv');
    if (!blocklyDiv) return;

    blocklyDiv.addEventListener('dblclick', (e) => {
        const allBlocks = workspace.getAllBlocks(false);
        let clickedBlock = null;
        for (const block of allBlocks) {
            const svgRoot = block.getSvgRoot();
            if (svgRoot && svgRoot.contains(e.target)) { clickedBlock = block; break; }
        }
        if (clickedBlock) handleBlockDoubleClick(clickedBlock, workspace);
    });
}

/**
 * 블록 더블클릭 핸들러 (말풍선 + 포맷팅 적용)
 */
function handleBlockDoubleClick(block, workspace) {
    const blockType = block.type;
    const recorder = window.BlockAssemblyRecorder;

    switch (blockType) {
        case 'util_record_start':
            recorder.startRecording();
            showBlockTooltip(block, "✅ 기록 시작!", "#4CAF50");
            break;
        case 'util_record_stop':
            recorder.stopRecording();
            showBlockTooltip(block, "⏹ 기록 중지", "#F44336");
            break;
        case 'util_record_play': {
            const speedField = block.getField('SPEED');
            const speed = speedField ? parseInt(speedField.getValue()) : 1;
            recorder.playRecording(speed);
            break;
        }
        case 'util_record_play_stop':
            recorder.stopPlaying();
            break;
        case 'util_record_reset':
            if (confirm('기록을 초기화하시겠습니까?')) {
                recorder.reset();
                showBlockTooltip(block, "🔄 초기화 완료", "#2196F3");
            }
            break;

        // 정보 표시 블록 (수정된 포맷 적용)
        case 'util_record_status':
            showBlockTooltip(block, recorder.getStatus(), "#009688");
            break;
        case 'util_record_event_count':
            showBlockTooltip(block, `${recorder.getEventCount()}개`, "#009688");
            break;
        case 'util_record_duration':
            // getDuration()이 이제 "HH:MM:SS" 문자열을 반환함
            showBlockTooltip(block, recorder.getDuration(), "#E65100");
            break;
        case 'util_record_start_time':
            // getStartTime()이 "YYYY-MM-DD HH:MM:SS" 문자열을 반환함
            showBlockTooltip(block, recorder.getStartTime(), "#009688");
            break;
        case 'util_record_end_time':
            showBlockTooltip(block, recorder.getEndTime(), "#009688");
            break;
    }
}

/**
 * 말풍선 툴팁 표시
 */
function showBlockTooltip(block, text, color = '#333') {
    const oldTooltip = document.getElementById('block-custom-tooltip');
    if (oldTooltip) oldTooltip.remove();

    const svgRoot = block.getSvgRoot();
    if (!svgRoot) return;
    const rect = svgRoot.getBoundingClientRect();
    
    const tooltip = document.createElement('div');
    tooltip.id = 'block-custom-tooltip';
    tooltip.style.cssText = `
        position: fixed; background-color: white; color: ${color};
        border: 2px solid ${color}; padding: 5px 15px; border-radius: 8px;
        font-family: 'Malgun Gothic', sans-serif; font-size: 16px; font-weight: bold;
        z-index: 10000; box-shadow: 0 2px 5px rgba(0,0,0,0.2); pointer-events: none;
        animation: fadeIn 0.2s ease-out;
    `;
    
    const arrow = document.createElement('div');
    arrow.style.cssText = `
        position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%) rotate(45deg);
        width: 10px; height: 10px; background-color: white;
        border-right: 2px solid ${color}; border-bottom: 2px solid ${color};
    `;
    
    tooltip.textContent = text;
    tooltip.appendChild(arrow);
    document.body.appendChild(tooltip);

    const tooltipRect = tooltip.getBoundingClientRect();
    const top = rect.top - tooltipRect.height - 10;
    const left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;

    setTimeout(() => { if (tooltip && tooltip.parentNode) tooltip.remove(); }, 3000);
}