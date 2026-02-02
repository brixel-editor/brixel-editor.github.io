/**
 * @file 다국어 번역 시스템 (i18n.js)
 * @description UI 텍스트와 Blockly 블록 텍스트의 다국어 번역을 관리하는 중앙 컨트롤러입니다.
 * 브라우저 언어를 감지하고, 언어별 JSON 파일을 로드하며, UI를 동적으로 업데이트하는 기능을 제공합니다.
 * @version 1.2.0
 * @author 김석전 (alphaco@kakao.com)
 */

// =================================================================
// 1. 메인 I18nManager 클래스
// =================================================================

class I18nManager {
    /**
     * I18nManager의 생성자입니다.
     * 번역 메시지 저장소와 지원 언어 목록 등 시스템의 기본 상태를 초기화합니다.
     */
    constructor() {
        this.messages = {};          // UI + Blockly 병합된 전체 번역 메시지
        this.uiMessages = {};        // UI 전용 번역 메시지
        this.blocklyMessages = {};   // Blockly 블록 전용 번역 메시지
        this.currentLanguage = 'ko'; // 기본 언어
        // --- [수정 1] 지원 언어 목록에 새로운 언어 코드 추가 ---
        this.supportedLanguages = ['ko', 'en', 'es', 'zh', 'ja', 'fr', 'de', 'ru', 'tr', 'vi','pt','uz', 'ar', 'fa', 'fil', 'hi', 'id', 'it', 'nl', 'th', 'zh-tw', 'sv','pl'];
        
        // --- [수정 2] 언어별 메타 정보에 새로운 언어 정보 추가 ---
        this.languageInfo = {
            'ko': { name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
            'en': { name: 'English', nativeName: 'English', flag: '🇺🇸' },
            'es': { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
            'zh': { name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
            'ja': { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
            'fr': { name: 'French', nativeName: 'Français', flag: '🇫🇷' },
            'de': { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
            'ru': { name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
            'tr': { name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
            'vi': { name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
            'pt': { name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)', flag: '🇧🇷' },
            'uz': { name: 'Ozbek tili', nativeName: 'O"zbek tili', flag: 'uz' },
            'ar': { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
            'fa': { name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷' },
            'fil': { name: 'Filipino', nativeName: 'Filipino', flag: '🇵🇭' },
            'hi': { name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
            'id': { name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
            'it': { name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
            'nl': { name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
            'th': { name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
            'zh-tw': { name: 'Chinese (Traditional)', nativeName: '繁體中文', flag: '🇹🇼' },
            'sv': { name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
            'pl': { name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' }
        };
        
        // 사용 통계
        this.stats = { languageUsage: {} };
    }

    // --- 언어 파일 로드 및 처리 ---

    /**
     * 지정된 언어의 UI 번역 파일(ui_xx.json)을 비동기적으로 로드합니다.
     * @param {string} language - 로드할 언어 코드 (e.g., 'ko')
     * @returns {Promise<object>} 로드 성공 여부와 결과 객체를 포함하는 Promise
     */
    async loadUITranslation(language) {
        try {
            const response = await fetch(`./translations/ui_i18n/ui_${language}.json`);
            if (!response.ok) throw new Error(`UI translation file not found: ui_${language}.json`);
            
            const translations = await response.json();
            // console.log(`[UI] ui_${language}.json 로드 성공:`, Object.keys(translations).length, '개 키');
            this.uiMessages = translations;
            return { success: true };
        } catch (error) {
            console.warn(`❌ UI 번역 파일 로드 실패: ${error.message}`);
            return { success: false, error: error.message };
        }
    }

    /**
     * 지정된 언어의 Blockly 내장 블록 번역 파일(blockly_xx.json)을 비동기적으로 로드합니다.
     * @param {string} language - 로드할 언어 코드 (e.g., 'ko')
     * @returns {Promise<object>} 로드 성공 여부와 결과 객체를 포함하는 Promise
     */
    async loadBlocklyTranslation(language) {
        try {
            const response = await fetch(`./translations/blockly_core/blockly_${language}.json`);
            if (!response.ok) throw new Error(`Blockly translation file not found: blockly_${language}.json`);
            
            const translations = await response.json();
            // console.log(`[Blockly] blockly_${language}.json 로드 성공:`, Object.keys(translations).length, '개 키');
            this.blocklyMessages = translations;
            return { success: true };
        } catch (error) {
            console.warn(`❌ Blockly 번역 파일 로드 실패: ${error.message}`);
            return { success: false, error: error.message };
        }
    }

    /**
     * 로드된 Blockly 번역과 UI 번역을 하나의 메시지 객체로 병합합니다.
     * 키가 충돌할 경우 UI 번역이 우선권을 가집니다.
     */
    mergeTranslations() {
        this.messages = { ...this.blocklyMessages, ...this.uiMessages };
        // console.log(`🔗 번역 병합 완료: Blockly(${Object.keys(this.blocklyMessages).length}) + UI(${Object.keys(this.uiMessages).length}) = 총 ${Object.keys(this.messages).length}개 키`);
        this.detectKeyConflicts();

        // Blockly.Msg에 번역 적용 (BKY_ 접두사 키들)
        this.applyToBlocklyMsg();
    }

    /**
     * 병합된 번역 메시지를 Blockly.Msg에 적용합니다.
     * BKY_ 접두사를 가진 키들을 Blockly.Msg에 할당하여 블록 정의에서 사용할 수 있게 합니다.
     */
    applyToBlocklyMsg() {
        if (typeof Blockly === 'undefined' || !Blockly.Msg) {
            // console.warn('⚠️ Blockly.Msg가 아직 로드되지 않았습니다.');
            return;
        }

        let appliedCount = 0;
        for (const key in this.messages) {
            if (key.startsWith('BKY_')) {
                Blockly.Msg[key] = this.messages[key];
                appliedCount++;
            }
        }
        // console.log(`🔗 Blockly.Msg에 ${appliedCount}개 번역 적용 완료`);
    }

    /**
     * UI 번역과 Blockly 번역 간에 중복되는 키가 있는지 감지하고 경고를 출력합니다.
     */
    detectKeyConflicts() {
        const blocklyKeys = Object.keys(this.blocklyMessages);
        const uiKeys = Object.keys(this.uiMessages);
        const conflicts = blocklyKeys.filter(key => uiKeys.includes(key));

        if (conflicts.length > 0) {
            // console.warn(`⚠️ 번역 키 충돌 감지 (${conflicts.length}개):`, conflicts.slice(0, 5));
            // console.warn('UI 번역이 Blockly 번역을 덮어씁니다.');
        }
    }
    
    /**
     * UI와 Blockly 번역 파일을 모두 로드하고 시스템 언어를 설정하는 메인 로직입니다.
     * @param {string | null} language - 로드할 특정 언어. null일 경우 브라우저 언어를 감지합니다.
     * @returns {Promise<boolean>} 번역 로드 성공 여부
     */
    async loadTranslations(language = null) {
        const targetLang = language || this.detectBrowserLanguage();
        
        try {
            if (this.supportedLanguages.includes(targetLang)) {
                // console.log(`🌍 언어 로드 시작: ${targetLang}`);
                const [uiResult, blocklyResult] = await Promise.all([
                    this.loadUITranslation(targetLang),
                    this.loadBlocklyTranslation(targetLang)
                ]);
                
                if (uiResult.success && blocklyResult.success) {
                    this.mergeTranslations();
                    this.currentLanguage = targetLang;
                    this.recordLanguageUsage(targetLang);
                    // console.log(`✅ ${targetLang} 완전한 번역 로드 완료`);
                    return true;
                }
                throw new Error(`일부 번역 파일 로드 실패: ${targetLang}`);
            } else {
                console.warn(`🔄 ${targetLang}은 지원하지 않는 언어입니다. 한국어로 설정합니다.`);
                return await this.loadTranslations('ko');
            }
        } catch (error) {
            console.error(`❌ 번역 시스템 오류: ${error.message}`);
            if (targetLang !== 'ko') {
                console.log(`🚨 ${targetLang} 로드 실패, 한국어로 폴백`);
                return await this.loadTranslations('ko');
            }
            return false;
        }
    }

    // --- 공개 API 및 Getter ---

    /**
     * 번역된 메시지를 반환합니다. BKY_ 접두사를 우선적으로 찾습니다.
     * @param {string} key - 번역 키
     * @param {string} [defaultText=key] - 키를 찾지 못했을 때 반환할 기본 텍스트
     * @returns {string} 번역된 텍스트
     */
    getMessage(key, defaultText = key) {
        return this.messages['BKY_' + key] || this.messages[key] || defaultText;
    }

    /**
     * UI 전용 번역 메시지를 반환합니다.
     * @param {string} key - UI 번역 키
     * @param {string} [defaultText=key] - 키를 찾지 못했을 때 반환할 기본 텍스트
     * @returns {string} 번역된 텍스트
     */
    getUIMessage(key, defaultText = key) {
        return this.uiMessages[key] || defaultText;
    }

    /**
     * Blockly 전용 번역 메시지를 반환합니다.
     * @param {string} key - Blockly 번역 키
     * @param {string} [defaultText=key] - 키를 찾지 못했을 때 반환할 기본 텍스트
     * @returns {string} 번역된 텍스트
     */
    getBlocklyMessage(key, defaultText = key) {
        return this.blocklyMessages[key] || this.blocklyMessages['BKY_' + key] || defaultText;
    }
    
    /**
     * 현재 설정된 언어 코드를 반환합니다.
     * @returns {string} 현재 언어 코드
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    /**
     * 현재 언어가 공식 지원 언어인지 확인합니다.
     * @returns {boolean} 지원 여부
     */
    isNativeLanguage() {
        return this.supportedLanguages.includes(this.currentLanguage);
    }
    
    /**
     * 지원하는 모든 언어의 목록을 배열로 반환합니다.
     * @returns {Array<string>} 지원 언어 코드 배열
     */
    getAllSupportedLanguages() {
        return [...this.supportedLanguages];
    }

    // --- 언어 변경 및 제어 ---

    /**
     * 시스템의 언어를 변경합니다.
     * @param {string} language - 변경할 언어 코드
     * @returns {Promise<boolean>} 언어 변경 성공 여부
     */
    async changeLanguage(language) {
        if (this.supportedLanguages.includes(language)) {
            return await this.loadTranslations(language);
        }
        return false;
    }

    // --- 유틸리티 및 헬퍼 함수 ---
    
/**
 * 사용자의 브라우저 언어 설정을 감지하여 가장 적합한 지원 언어 코드를 반환합니다.
 * @returns {string} 감지된 언어 코드
 */
        detectBrowserLanguage() {
            const browserLangs = navigator.languages || [navigator.language || 'ko'];
            
            // 먼저 정확한 언어-지역 코드 매칭 시도
            for (let browserLang of browserLangs) {
                const fullLangCode = browserLang.toLowerCase();
                
                // 정확한 매칭 (예: zh-tw, zh-cn)
                if (fullLangCode === 'zh-tw' && this.supportedLanguages.includes('zh-tw')) {
                    return 'zh-tw';
                }
                if (fullLangCode === 'zh-cn' && this.supportedLanguages.includes('zh')) {
                    return 'zh';
                }
                if (fullLangCode === 'en-us' && this.supportedLanguages.includes('en')) {
                    return 'en';
                }
                
                // 다른 정확한 매칭들
                const exactMatch = fullLangCode.replace('-', '-');
                if (this.supportedLanguages.includes(exactMatch)) {
                    return exactMatch;
                }
            }
            
            // 정확한 매칭이 없으면 언어 코드만으로 매칭 시도
            for (let browserLang of browserLangs) {
                const langCode = browserLang.split('-')[0].toLowerCase();
                if (this.supportedLanguages.includes(langCode)) {
                    return langCode;
                }
            }
            
            return 'ko'; // 기본값
        }
    
    /**
     * 언어 선택 UI(<select>)에 표시할 옵션 목록을 생성합니다.
     * @returns {Array<object>} UI 렌더링에 사용할 옵션 객체 배열
     */
    generateLanguageOptions() {
        return this.supportedLanguages.map(lang => {
            const info = this.languageInfo[lang];
            return info ? { value: lang, text: info.nativeName, type: 'native' } : null;
        }).filter(Boolean); // null 값 제거
    }
    
    /**
     * 지정된 언어가 오른쪽에서 왼쪽으로 쓰는 RTL 언어인지 확인합니다.
     * @param {string} [language=this.currentLanguage] - 확인할 언어 코드
     * @returns {boolean} RTL 여부
     */
    isRTLLanguage(language = this.currentLanguage) {
        const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
        return rtlLanguages.includes(language);
    }

    // --- 통계 및 디버깅 ---

    /**
     * 언어 사용 통계를 기록합니다.
     * @param {string} language - 사용된 언어 코드
     */
    recordLanguageUsage(language) {
        this.stats.languageUsage[language] = (this.stats.languageUsage[language] || 0) + 1;
        try {
            localStorage.setItem('i18n_stats', JSON.stringify(this.stats));
        } catch (e) {
            // 로컬 스토리지 사용 불가 시 무시
        }
    }

    /**
     * 현재 기록된 사용 통계를 반환합니다.
     * @returns {object} 사용 통계 객체
     */
    getUsageStats() {
        return this.stats;
    }

    /**
     * 현재 로드된 번역 상태를 검증하고 콘솔에 출력합니다.
     * @returns {object} 검증 결과 객체
     */
    validateTranslations() {
        const result = {
            uiCount: Object.keys(this.uiMessages).length,
            blocklyCount: Object.keys(this.blocklyMessages).length,
            totalCount: Object.keys(this.messages).length,
            language: this.currentLanguage,
            isNative: this.isNativeLanguage()
        };
        // console.log(`📊 번역 상태 검증:
        // - UI 번역 (ui_${result.language}.json): ${result.uiCount}개
        // - Blockly 번역 (blockly_${result.language}.json): ${result.blocklyCount}개
        // - 병합된 총 번역: ${result.totalCount}개
        // - 현재 언어: ${result.language}
        // - 지원 언어 여부: ${result.isNative ? '✅' : '❌'}`);
        return result;
    }

    /**
     * 현재 메모리에 있는 모든 번역 메시지를 삭제합니다.
     */
    clearCache() {
        this.messages = {};
        this.uiMessages = {};
        this.blocklyMessages = {};
        // console.log('🗑️ 번역 캐시 정리 완료');
    }

    /**
     * 현재 언어의 번역 파일을 다시 로드합니다.
     * @returns {Promise<boolean>} 재로드 성공 여부
     */
    async reloadTranslations() {
        // console.log(`🔄 번역 파일 재로드: ${this.currentLanguage}`);
        this.clearCache();
        return await this.loadTranslations(this.currentLanguage);
    }
}


// =================================================================
// 2. 전역 인스턴스 및 초기화 함수
// =================================================================

/**
 * 전역에서 사용할 I18nManager의 단일 인스턴스입니다.
 * @global
 */
window.i18n = new I18nManager();

/**
 * 다국어 시스템을 시작하는 메인 초기화 함수입니다.
 * 페이지 로딩 시 한 번만 호출되어야 합니다.
 * @returns {Promise<boolean>} 초기화 성공 여부
 */
window.initializeI18n = async function() {
    // console.log('🚀 다국어 시스템 초기화 시작...');
    // console.log('📁 예상 파일 구조:');
    // console.log('   - UI: ./translations/ui_i18n/ui_*.json');
    // console.log('   - Blockly: ./translations/blockly_core/blockly_*.json');

    const success = await window.i18n.loadTranslations();

    if (success) {
        // console.log(`✅ 다국어 시스템 초기화 완료`);
        // console.log(`📍 현재 언어: ${window.i18n.getCurrentLanguage()}`);
        window.i18n.validateTranslations();
        updateLanguageSelector(); // 언어 선택 UI 업데이트
        return true;
    } else {
        console.error('❌ 다국어 시스템 초기화 실패');
        return false;
    }
};


// =================================================================
// 3. UI 업데이트 및 헬퍼 함수
// =================================================================

/**
 * HTML 문서의 UI 텍스트를 현재 언어로 업데이트합니다.
 * data-i18n 속성을 가진 요소를 찾아 번역된 텍스트로 교체합니다.
 */
        window.updateUITexts = function() {
            // console.log('🔄 UI 텍스트 업데이트 시작...');

            // optgroup과 option을 제외한 모든 data-i18n 요소를 처리
            const i18nElements = document.querySelectorAll('[data-i18n]:not(optgroup):not(option)');
            i18nElements.forEach(element => {
                const key = element.getAttribute('data-i18n');
                const translatedText = window.i18n.getUIMessage(key);
                if (element.hasAttribute('title')) {
                    element.title = translatedText;
                } else {
                    element.textContent = translatedText;
                }
            });
            
            // placeholder 속성을 가진 요소를 별도로 처리
            const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
            placeholderElements.forEach(element => {
                const key = element.getAttribute('data-i18n-placeholder');
                element.placeholder = window.i18n.getUIMessage(key);
            });
            
            // <select> 요소들은 전문 함수를 통해 안전하게 처리
            updateSelectElements();

            // console.log(`🔄 UI 텍스트 업데이트 완료: ${i18nElements.length}개 요소 + ${placeholderElements.length}개 플레이스홀더`);
        };

        /**
         * 페이지 내의 모든 <select> 요소 내부의 텍스트(optgroup, option)를 번역합니다.
         * 이 함수는 `updateUITexts`에서 호출되어야 합니다.
         */
        function updateSelectElements() {
            const selectors = ['boardSelect', 'portSelect', 'agentOsSelect'];
            selectors.forEach(id => {
                const select = document.getElementById(id);
                if (!select) return;

                select.querySelectorAll('optgroup[data-i18n]').forEach(optgroup => {
                    optgroup.label = window.i18n.getUIMessage(optgroup.getAttribute('data-i18n'));
                });
                
                select.querySelectorAll('option[data-i18n]').forEach(option => {
                    option.textContent = window.i18n.getUIMessage(option.getAttribute('data-i18n'));
                });
            });
            
            // 언어 선택 메뉴는 별도 함수로 관리
            updateLanguageSelector();
        }

        /**
         * 언어 선택(<select id="languageSelect">) UI를 동적으로 생성하고 업데이트합니다.
         */
        function updateLanguageSelector() {
            const languageSelect = document.getElementById('languageSelect');
            if (!languageSelect) return;
            
            languageSelect.innerHTML = '';
            const options = window.i18n.generateLanguageOptions();
            options.forEach(opt => {
                const optionElement = document.createElement('option');
                optionElement.value = opt.value;
                optionElement.textContent = opt.text;
                languageSelect.appendChild(optionElement);
            });
            
            // 현재 언어를 선택된 상태로 설정
            languageSelect.value = window.i18n.getCurrentLanguage();
            
            // 만약 값이 설정되지 않았다면 강제로 설정
            if (!languageSelect.value) {
                const currentLang = window.i18n.getCurrentLanguage();
                const matchingOption = languageSelect.querySelector(`option[value="${currentLang}"]`);
                if (matchingOption) {
                    matchingOption.selected = true;
                }
            }
        }


// =================================================================
// 4. 전역 디버그용 객체
// =================================================================

/**
 * 개발자 도구 콘솔에서 사용할 수 있는 디버그용 함수 모음입니다.
 * @global
 */
window.i18nDebug = {
    getStats: () => window.i18n.getUsageStats(),
    getSupportedLanguages: () => window.i18n.getAllSupportedLanguages(),
    getCurrentLanguage: () => window.i18n.getCurrentLanguage(),
    isNative: () => window.i18n.isNativeLanguage(),
    testTranslation: (key) => window.i18n.getMessage(key),
    validate: () => window.i18n.validateTranslations(),
    getUIMessages: () => window.i18n.uiMessages,
    getBlocklyMessages: () => window.i18n.blocklyMessages,
    getAllMessages: () => window.i18n.messages,
    reload: () => window.i18n.reloadTranslations(),
    clearCache: () => window.i18n.clearCache(),
    detectConflicts: () => window.i18n.detectKeyConflicts()
};