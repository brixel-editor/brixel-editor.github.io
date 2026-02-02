/**
 * @file IDE 다국어 모듈 - 번역 키 적용
 * @description 국제화(i18n) 관련 모든 기능을 담당하는 모듈
 */

window.IDEI18n = {
    currentLanguage: 'ko',

    /**
     * 우리가 사용하는 언어 코드를 Blockly가 지원하는 언어 코드로 변환합니다.
     * @param {string} languageCode - 우리가 사용하는 언어 코드
     * @returns {string} Blockly가 지원하는 언어 코드
     */
    getBlocklyLanguageCode(languageCode) {
        const blocklyLanguageMap = {
            'zh': 'zh-hans',        // 간체 중국어
            'zh-tw': 'zh-hant',     // 번체 중국어
            'fil': 'en',            // 필리핀어는 Blockly에서 지원하지 않으므로 영어로 대체
            'fa': 'en',             // 페르시아어도 지원하지 않으므로 영어로 대체
            'hi': 'en',             // 힌디어도 지원하지 않으므로 영어로 대체
            'id': 'en',             // 인도네시아어도 지원하지 않으므로 영어로 대체
            'th': 'en',             // 태국어도 지원하지 않으므로 영어로 대체
            'uz': 'en'              // 우즈베크어도 지원하지 않으므로 영어로 대체
        };
        return blocklyLanguageMap[languageCode] || languageCode;
    },

    /**
     * i18n.js를 호출하여 번역 시스템을 설정하고, Blockly에 번역 메시지를 주입합니다.
     * 전체 초기화 과정에서 가장 먼저 실행되어야 합니다.
     */
    async initialize() {
        try {
            // console.log(this.getMsg('i18n_init_start', '[1] i18n 초기화 시작'));

            // 기본 i18n 시스템 초기화
            if (typeof initializeI18n === 'function') {
                await initializeI18n();
                // console.log(this.getMsg('i18n_basic_complete', '[2] i18n 기본 초기화 완료'));
            }

            this.currentLanguage = i18n ? i18n.getCurrentLanguage() : 'ko';
            const langCodeForBlockly = this.getBlocklyLanguageCode(this.currentLanguage);

            // Blockly 공식 번역 파일 로드
            try {
                const blocklyLangUrl = `https://cdnjs.cloudflare.com/ajax/libs/blockly/12.2.0/msg/${langCodeForBlockly}.js`;
                await window.IDEUtils.loadScript(blocklyLangUrl);
                // console.log(this.getMsg('i18n_blockly_load_complete', '[3] Blockly 공식 번역 파일 로드 완료'));
            } catch (error) {
                console.warn(this.getMsg('i18n_blockly_load_fail', '[3] Blockly 공식 번역 파일 로드 실패, 기본값 사용'));
            }

            // Blockly 메시지 적용
            if (window.Msg) {
                Blockly.setLocale(window.Msg);
                // console.log(this.getMsg('i18n_blockly_setlocale_complete', '[4] Blockly.setLocale 적용 완료'));
            }

            // 커스텀 번역 메시지 주입
            if (i18n && i18n.messages) {
                this.injectMessagesIntoBlockly(i18n.messages);
                // console.log(this.getMsg('i18n_custom_inject_complete', '[5] 커스텀 번역 메시지 주입 완료'));
            }

            this.setDefaultMessages();
            this.validateMessages();

        } catch (error) {
            console.error(this.getMsg('i18n_init_fail', '번역 시스템 초기화 실패:'), error);
            this.setDefaultMessages();
        }
    },

    /**
     * 사용자가 언어를 변경했을 때 호출됩니다.
     * 새로운 언어 파일을 로드하고, Blockly 워크스페이스를 재생성하며, UI 텍스트를 업데이트합니다.
     * @param {string} newLanguage - 변경할 언어 코드 (e.g., 'en', 'ja')
     */
    async changeLanguage(newLanguage) {
        if (newLanguage === this.currentLanguage) return;

        const loadingOverlay = document.getElementById('loadingOverlay');
        const loadingText = document.getElementById('loadingText');
        const loadingTexts = { 
            ko: this.getMsg('loading_system_init', '시스템 초기화 중...'),
            en: this.getMsg('loading_system_init_en', 'Initializing system...'),
            ja: this.getMsg('loading_system_init_ja', 'システム初期化中...'),
            zh: this.getMsg('loading_system_init_zh', '系统初始化中...'),
            es: this.getMsg('loading_system_init_es', 'Inicializando sistema...')
        };

        loadingOverlay.classList.remove('hidden');
        loadingText.textContent = loadingTexts[newLanguage] || loadingTexts['en'];

        try {
            if (typeof i18n !== 'undefined' && typeof i18n.changeLanguage === 'function') {
                const success = await i18n.changeLanguage(newLanguage);
                if (!success) throw new Error(
                    this.getMsg('language_json_load_fail', '{newLanguage}.json 로드 실패')
                        .replace('{newLanguage}', newLanguage)
                );

                // 메시지 재주입
                this.injectMessagesIntoBlockly(i18n.messages);

                // Blockly 언어 스크립트 로드
                const langCodeForBlockly = this.getBlocklyLanguageCode(newLanguage);
                const blocklyLangUrl = `https://cdnjs.cloudflare.com/ajax/libs/blockly/12.2.0/msg/${langCodeForBlockly}.js`;
                await window.IDEUtils.loadScript(blocklyLangUrl);

                if (window.Msg) Blockly.setLocale(window.Msg);

                // Arduino 블록 재정의 (언어 변경 적용을 위해 필수)
                // 블록 정의에서 Blockly.Msg.BKY_XXX || "기본값" 형태로 평가되므로,
                // 언어 변경 시 재정의해야 새 언어의 메시지가 적용됨.
                // 중복 정의 경고는 정상 동작이며 무시 가능.
                if (typeof window.defineArduinoBlocks === 'function') {
                    window.defineArduinoBlocks();
                }
                // HuskyLens 블록 재정의
                if (typeof window.defineHuskyLensBlocks === 'function') {
                    window.defineHuskyLensBlocks();
                }

                // 워크스페이스 재생성 (다른 모듈에서 처리)
                if (window.IDEEditors && window.IDEEditors.recreateWorkspace) {
                    await window.IDEEditors.recreateWorkspace();
                }

                this.updateUITexts();
                this.currentLanguage = newLanguage;

                // RTL 언어 변경 시 Monaco 에디터 방향성 재설정
                this.ensureMonacoLTRDirection();

                // PC 에이전트에 언어 변경 알림
                if (window.IDEServerComm && window.IDEServerComm.websocket) {
                    try {
                        window.IDEServerComm.websocket.send(JSON.stringify({
                            type: 'language-change',
                            payload: { language: newLanguage }
                        }));
                    } catch (e) {
                        console.warn('PC 에이전트 언어 변경 알림 실패:', e);
                    }
                }

                window.IDEUtils.logToConsole(
                    this.getMsg('language_change_success', '언어가 {lang}로 변경되었습니다.')
                        .replace('{lang}', newLanguage)
                );
            }
        } catch (error) {
            console.error('언어 변경 실패:', error);
            window.IDEUtils.logToConsole(
                this.getMsg('language_change_fail', '언어 변경에 실패했습니다: {errorMsg}')
                    .replace('{errorMsg}', error.message)
            );
        } finally {
            loadingOverlay.classList.add('hidden');
        }
    },

    /**
     * UI의 모든 텍스트 요소를 현재 선택된 언어로 업데이트합니다.
     * i18n.js에 정의된 전역 함수를 호출하고, 추가적인 동적 UI 요소를 처리합니다.
     */
    updateUITexts() {
        if (typeof window.updateUITexts === 'function') {
            window.updateUITexts();
        }

        // 언어 상태 표시 업데이트
        const languageStatus = document.getElementById('languageStatus');
        if (languageStatus && i18n) {
            const isNative = i18n.isNativeLanguage ? i18n.isNativeLanguage() : true;
            languageStatus.textContent = isNative 
                ? this.getMsg('languageStatus_official', '✓ 공식 지원') 
                : this.getMsg('languageStatus_browser', '🌐 브라우저 번역');
            languageStatus.style.color = isNative ? '#4caf50' : '#ff9800';
        }

        // RTL 언어 지원
        if (i18n && i18n.isRTLLanguage && i18n.isRTLLanguage()) {
            document.body.classList.add('rtl');
            // RTL 언어에서도 Monaco 에디터는 LTR 유지
            this.ensureMonacoLTRDirection();
        } else {
            document.body.classList.remove('rtl');
        }

        // 코드 제목 업데이트
        const codeTitle = document.getElementById('codeTitle');
        if (codeTitle) {
            const currentMode = window.arduinoIDE ? window.arduinoIDE.currentMode : 'block';
            if (currentMode === 'text') {
                codeTitle.textContent = this.getMsg('codeTitle_textMode', '📝 Arduino C++ 코드 에디터');
            } else {
                codeTitle.textContent = this.getMsg('codeTitle', '📄 실시간 Arduino C++ 코드');
            }
        }
    },

    /**
     * RTL 언어에서도 Monaco 에디터가 LTR 방향을 유지하도록 강제합니다.
     * 언어 변경 시마다 호출되어 Monaco 에디터의 방향성을 재설정합니다.
     */
    ensureMonacoLTRDirection() {
        const monacoDiv = document.getElementById('monacoEditor');
        if (!monacoDiv) return;

        // Monaco 에디터 컨테이너 강제 LTR 설정
        monacoDiv.style.direction = 'ltr';
        monacoDiv.style.textAlign = 'left';
        monacoDiv.setAttribute('dir', 'ltr');

        // Monaco 에디터 내부 요소들도 강제 LTR 설정
        setTimeout(() => {
            const monacoElements = monacoDiv.querySelectorAll('.monaco-editor, .overflow-guard, .monaco-scrollable-element, .view-lines, .view-line');
            monacoElements.forEach(element => {
                element.style.direction = 'ltr';
                element.style.textAlign = 'left';
            });

            // 텍스트 입력 영역도 LTR로 설정
            const textareas = monacoDiv.querySelectorAll('textarea');
            textareas.forEach(textarea => {
                textarea.style.direction = 'ltr';
                textarea.style.textAlign = 'left';
            });

            // Monaco 에디터 인스턴스가 있다면 레이아웃 재계산
            if (window.IDEEditors && window.IDEEditors.monacoEditor) {
                window.IDEEditors.monacoEditor.layout();
            }
        }, 100);

        // console.log(this.getMsg('monaco_ltr_reset_complete', 'Monaco 에디터 LTR 방향성 재설정 완료'));
    },
    
    /**
     * 커스텀 번역 메시지를 Blockly의 전역 메시지 객체(Blockly.Msg)에 주입합니다.
     * 이를 통해 커스텀 블록과 툴박스가 번역된 텍스트를 사용할 수 있게 됩니다.
     * @param {object} messages - 번역 키-값 쌍을 포함하는 객체
     */
    injectMessagesIntoBlockly(messages) {
        for (const key in messages) {
            Blockly.Msg[key] = messages[key];
        }
    },

    /**
     * i18n.js에서 번역 메시지를 안전하게 가져오는 헬퍼 함수입니다.
     * @param {string} key - 번역 키
     * @param {string} defaultText - 키를 찾지 못했을 때 반환할 기본 텍스트
     * @returns {string} 번역된 텍스트
     */
    getMsg(key, defaultText = key) {
        if (typeof window.i18n !== 'undefined' && window.i18n.getUIMessage) {
            return window.i18n.getUIMessage(key, defaultText);
        }
        return defaultText;
    },

    /**
     * Blockly에 필요한 최소한의 메시지가 로드되지 않았을 경우를 대비한 안전장치입니다.
     */
    setDefaultMessages() {
        // console.log('[안전장치] 최소한의 필수 메시지만 설정');
        const criticalMessages = {
            'LOGIC_BOOLEAN_TRUE': 'true',
            'LOGIC_BOOLEAN_FALSE': 'false',
            'LOGIC_OPERATION_AND': 'and',
            'LOGIC_OPERATION_OR': 'or',
            'CONTROLS_IF_MSG_IF': 'if',
            'CONTROLS_REPEAT_TITLE': 'repeat %1 times',
            'MATH_NUMBER_TOOLTIP': 'A number.',
            'TEXT_TEXT_TOOLTIP': 'A letter, word, or line of text.',
            'VARIABLES_SET': 'set %1 to %2',
            'VARIABLES_DEFAULT_NAME': 'item'
        };

        for (const [key, value] of Object.entries(criticalMessages)) {
            if (!Blockly.Msg[key]) {
                Blockly.Msg[key] = value;
                // console.log(`[안전장치] ${key} 메시지 추가`);
            }
        }
    },

    /**
     * 핵심 Blockly 메시지가 제대로 로드되었는지 검증하고, 누락된 경우 경고를 출력합니다.
     */
    validateMessages() {
        const requiredKeys = [
            'LOGIC_BOOLEAN_TRUE', 'LOGIC_BOOLEAN_FALSE', 'LOGIC_OPERATION_AND', 
            'LOGIC_OPERATION_OR', 'CONTROLS_IF_MSG_IF', 'CONTROLS_REPEAT_TITLE',
            'MATH_NUMBER_TOOLTIP', 'TEXT_TEXT_TOOLTIP', 'VARIABLES_SET', 'VARIABLES_DEFAULT_NAME'
        ];

        const missingKeys = requiredKeys.filter(key => !Blockly.Msg[key]);
        
        if (missingKeys.length > 0) {
            console.warn('⚠️ 누락된 핵심 메시지:', missingKeys);
            missingKeys.forEach(key => {
                Blockly.Msg[key] = this.getEmergencyFallback(key);
            });
        }
        // else {
        //     console.log('✅ 모든 핵심 메시지 확인 완료');
        // }

        // console.log(`📊 번역 상태: ${Object.keys(Blockly.Msg).length}개 메시지 로드됨`);
    },
    
    /**
     * validateMessages에서 누락된 키를 발견했을 때 사용할 최소한의 영문 대체 텍스트입니다.
     * @param {string} key - 누락된 메시지 키
     * @returns {string} 대체 텍스트
     */
    getEmergencyFallback(key) {
        const emergency = {
            'LOGIC_BOOLEAN_TRUE': 'true',
            'LOGIC_BOOLEAN_FALSE': 'false',
            'LOGIC_OPERATION_AND': 'and',
            'LOGIC_OPERATION_OR': 'or',
            'CONTROLS_IF_MSG_IF': 'if',
            'CONTROLS_REPEAT_TITLE': 'repeat %1 times',
            'MATH_NUMBER_TOOLTIP': 'A number.',
            'TEXT_TEXT_TOOLTIP': 'Text.',
            'VARIABLES_SET': 'set %1 to %2',
            'VARIABLES_DEFAULT_NAME': 'item'
        };
        return emergency[key] || key;
    },

    /**
     * 현재 언어 코드를 반환합니다.
     * @returns {string} 현재 언어 코드
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }
};