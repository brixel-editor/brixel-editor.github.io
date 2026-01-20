/**
 * @file CDN Fallback Loader - 글로벌 배포 최적화
 * @description 여러 CDN 소스를 시도하고, 실패 시 대체 소스를 사용하는 로더
 * @version 1.0.0
 */

window.CDNFallbackLoader = {
    // CDN 설정
    cdnSources: {
        blockly: [
            'https://cdnjs.cloudflare.com/ajax/libs/blockly/12.2.0',
            'https://cdn.jsdelivr.net/npm/blockly@12.2.0/dist',
            'https://unpkg.com/blockly@12.2.0/dist'
        ],
        monaco: [
            'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.0/min',
            'https://cdn.jsdelivr.net/npm/monaco-editor@0.34.0/min',
            'https://unpkg.com/monaco-editor@0.34.0/min'
        ]
    },

    // 로딩 상태
    loadedLibraries: {
        blockly: false,
        monacoLoader: false,
        monacoCss: false
    },

    // 현재 사용 중인 CDN 인덱스
    currentCdnIndex: {
        blockly: 0,
        monaco: 0
    },

    /**
     * 스크립트를 동적으로 로드합니다.
     * @param {string} url - 스크립트 URL
     * @param {number} timeout - 타임아웃 (ms)
     * @returns {Promise<void>}
     */
    loadScript(url, timeout = 10000) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.async = true;

            const timeoutId = setTimeout(() => {
                script.remove();
                reject(new Error(`Script load timeout: ${url}`));
            }, timeout);

            script.onload = () => {
                clearTimeout(timeoutId);
                resolve();
            };

            script.onerror = () => {
                clearTimeout(timeoutId);
                script.remove();
                reject(new Error(`Script load failed: ${url}`));
            };

            document.head.appendChild(script);
        });
    },

    /**
     * CSS를 동적으로 로드합니다.
     * @param {string} url - CSS URL
     * @param {string} name - data-name 속성
     * @returns {Promise<void>}
     */
    loadCSS(url, name = '') {
        return new Promise((resolve, reject) => {
            // 이미 로드된 CSS인지 확인
            const existing = document.querySelector(`link[href="${url}"]`);
            if (existing) {
                resolve();
                return;
            }

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            if (name) link.setAttribute('data-name', name);

            link.onload = () => resolve();
            link.onerror = () => reject(new Error(`CSS load failed: ${url}`));

            document.head.appendChild(link);
        });
    },

    /**
     * Blockly 라이브러리를 Fallback과 함께 로드합니다.
     * @param {string} language - 언어 코드 (기본값: 'ko')
     * @returns {Promise<boolean>}
     */
    async loadBlockly(language = 'ko') {
        if (this.loadedLibraries.blockly && typeof Blockly !== 'undefined') {
            console.log('✅ Blockly 이미 로드됨');
            return true;
        }

        const blocklyFiles = [
            'blockly_compressed.js',
            'blocks_compressed.js',
            'javascript_compressed.js',
            `msg/${language}.js`
        ];

        for (let cdnIndex = 0; cdnIndex < this.cdnSources.blockly.length; cdnIndex++) {
            const baseUrl = this.cdnSources.blockly[cdnIndex];
            console.log(`🔄 Blockly 로드 시도 (CDN ${cdnIndex + 1}): ${baseUrl}`);

            try {
                // 순차적으로 모든 파일 로드
                for (const file of blocklyFiles) {
                    await this.loadScript(`${baseUrl}/${file}`);
                }

                // Blockly 객체 확인
                if (typeof Blockly !== 'undefined') {
                    this.loadedLibraries.blockly = true;
                    this.currentCdnIndex.blockly = cdnIndex;
                    console.log(`✅ Blockly 로드 성공 (CDN ${cdnIndex + 1}): ${baseUrl}`);
                    return true;
                }
            } catch (error) {
                console.warn(`⚠️ Blockly 로드 실패 (CDN ${cdnIndex + 1}):`, error.message);
                // 다음 CDN 시도
            }
        }

        console.error('❌ 모든 Blockly CDN 소스 로드 실패');
        this.showLoadError('Blockly');
        return false;
    },

    /**
     * Monaco Editor를 지연 로드합니다. (텍스트 모드 전환 시 호출)
     * @returns {Promise<boolean>}
     */
    async loadMonaco() {
        // 이미 로드된 경우
        if (this.loadedLibraries.monacoLoader && typeof require !== 'undefined' && require.config) {
            console.log('✅ Monaco loader 이미 로드됨');
            return true;
        }

        for (let cdnIndex = 0; cdnIndex < this.cdnSources.monaco.length; cdnIndex++) {
            const baseUrl = this.cdnSources.monaco[cdnIndex];
            console.log(`🔄 Monaco 로드 시도 (CDN ${cdnIndex + 1}): ${baseUrl}`);

            try {
                // CSS 로드
                if (!this.loadedLibraries.monacoCss) {
                    await this.loadCSS(
                        `${baseUrl}/vs/editor/editor.main.css`,
                        'vs/editor/editor.main'
                    );
                    this.loadedLibraries.monacoCss = true;
                }

                // Loader 스크립트 로드
                await this.loadScript(`${baseUrl}/vs/loader.min.js`);

                // RequireJS 설정
                if (typeof require !== 'undefined' && require.config) {
                    require.config({
                        paths: {
                            'vs': `${baseUrl}/vs`
                        }
                    });

                    this.loadedLibraries.monacoLoader = true;
                    this.currentCdnIndex.monaco = cdnIndex;
                    console.log(`✅ Monaco loader 로드 성공 (CDN ${cdnIndex + 1}): ${baseUrl}`);
                    return true;
                }
            } catch (error) {
                console.warn(`⚠️ Monaco 로드 실패 (CDN ${cdnIndex + 1}):`, error.message);
            }
        }

        console.error('❌ 모든 Monaco CDN 소스 로드 실패');
        this.showLoadError('Monaco Editor');
        return false;
    },

    /**
     * CDN 로드 실패 시 사용자에게 알림
     * @param {string} libraryName - 라이브러리 이름
     */
    showLoadError(libraryName) {
        const errorMsg = window.IDEI18n
            ? window.IDEI18n.getMsg('cdn_load_error', `❌ ${libraryName} 라이브러리를 불러올 수 없습니다. 네트워크 연결을 확인하세요.`)
            : `❌ ${libraryName} 라이브러리를 불러올 수 없습니다. 네트워크 연결을 확인하세요.`;

        if (window.IDEUtils && window.IDEUtils.logToConsole) {
            window.IDEUtils.logToConsole(errorMsg);
        } else {
            console.error(errorMsg);
            alert(errorMsg);
        }
    },

    /**
     * 네트워크 상태 확인
     * @returns {boolean}
     */
    isOnline() {
        return navigator.onLine;
    },

    /**
     * CDN 응답 시간 테스트
     * @param {string} url - 테스트할 URL
     * @returns {Promise<number>} - 응답 시간 (ms), 실패 시 -1
     */
    async testCdnLatency(url) {
        try {
            const start = performance.now();
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            await fetch(url, {
                method: 'HEAD',
                mode: 'cors',
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            return Math.round(performance.now() - start);
        } catch {
            return -1;
        }
    },

    /**
     * 최적의 CDN을 선택합니다.
     * @param {string} library - 'blockly' 또는 'monaco'
     * @returns {Promise<string>} - 최적의 CDN base URL
     */
    async selectBestCdn(library) {
        const sources = this.cdnSources[library];
        const latencies = [];

        console.log(`🔍 ${library} CDN 응답 시간 측정 중...`);

        for (const baseUrl of sources) {
            const testUrl = library === 'blockly'
                ? `${baseUrl}/blockly_compressed.js`
                : `${baseUrl}/vs/loader.min.js`;

            const latency = await this.testCdnLatency(testUrl);
            latencies.push({ url: baseUrl, latency });
            console.log(`  - ${baseUrl}: ${latency >= 0 ? latency + 'ms' : '실패'}`);
        }

        // 응답 성공한 것 중 가장 빠른 것 선택
        const available = latencies.filter(l => l.latency >= 0);
        if (available.length === 0) {
            return sources[0]; // 기본값
        }

        available.sort((a, b) => a.latency - b.latency);
        console.log(`✅ 최적 CDN 선택: ${available[0].url} (${available[0].latency}ms)`);
        return available[0].url;
    },

    /**
     * 로딩 상태 리셋
     */
    reset() {
        this.loadedLibraries = {
            blockly: false,
            monacoLoader: false,
            monacoCss: false
        };
        this.currentCdnIndex = {
            blockly: 0,
            monaco: 0
        };
    }
};

// 전역 접근 가능하도록 등록
window.CDNLoader = window.CDNFallbackLoader;

console.log('📦 CDN Fallback Loader 초기화 완료');
