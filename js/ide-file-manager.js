/**
 * @file IDE 파일 관리 모듈 - 번역 키 적용
 * @description 파일 저장, 로드, 다운로드 등 파일 관련 모든 기능을 담당하는 모듈
 */

window.IDEFileManager = {
    /**
     * 현재 작업 내용을 파일로 저장합니다.
     * 블록 모드에서는 XML 파일로, 텍스트 모드에서는 .ino 파일로 저장됩니다.
     */
    saveWorkspace() {
        const currentMode = window.IDEEditors ? window.IDEEditors.currentMode : 'block';
        const isBlockMode = currentMode === 'block';
        
        // 파일명 입력값 가져오기
        const fileNameInput = document.getElementById('fileNameInput');
        const fileName = (fileNameInput ? fileNameInput.value.trim() : '') || 
                        (isBlockMode ? 'arduino_blocks' : 'arduino_sketch');

        try {
            if (isBlockMode) {
                // Unknown block 검증
                if (window.IDEEditors && window.IDEEditors.workspace) {
                    let unknownBlocks = [];

                    if (window.IDEBlocklyUtils && window.IDEBlocklyUtils.detectUnknownBlocksInWorkspace) {
                        unknownBlocks = window.IDEBlocklyUtils.detectUnknownBlocksInWorkspace(window.IDEEditors.workspace);
                    }

                    if (unknownBlocks.length > 0) {
                        const blockList = unknownBlocks.join(', ');
                        const warningMsg = window.IDEI18n ?
                            window.IDEI18n.getMsg('file_save_unknown_blocks_warning',
                                '⚠️ 경고: 지원되지 않는 블록이 포함되어 있습니다:\n{blockList}\n\n이 블록들은 코드로 변환되지 않습니다.\n빨간색 블록을 제거하고 새로운 블록으로 교체하는 것을 권장합니다.\n\n그래도 저장하시겠습니까?')
                                .replace('{blockList}', blockList) :
                            `⚠️ 경고: 지원되지 않는 블록이 포함되어 있습니다:\n${blockList}\n\n이 블록들은 코드로 변환되지 않습니다.\n빨간색 블록을 제거하고 새로운 블록으로 교체하는 것을 권장합니다.\n\n그래도 저장하시겠습니까?`;

                        if (!confirm(warningMsg)) {
                            window.IDEUtils.logToConsole(
                                window.IDEI18n ? window.IDEI18n.getMsg('file_save_cancelled', '저장이 취소되었습니다.') : '저장이 취소되었습니다.'
                            );
                            return;
                        }
                    }
                }

                // 블록 모드: XML 파일로 저장
                if (!window.IDEEditors || !window.IDEEditors.workspace) {
                    throw new Error('워크스페이스가 초기화되지 않았습니다.');
                }

                const xml = Blockly.Xml.workspaceToDom(window.IDEEditors.workspace);
                let content = Blockly.Xml.domToText(xml);

                // 블록 조립 기록 데이터를 XML 텍스트에 추가
                if (window.BlockAssemblyRecorder) {
                    const recordingData = window.BlockAssemblyRecorder.exportData();
                    if (recordingData && (recordingData.events.length > 0 || recordingData.metadata.startTime)) {
                        // JSON 데이터를 Base64로 인코딩
                        const jsonString = JSON.stringify(recordingData);
                        const base64Data = btoa(unescape(encodeURIComponent(jsonString)));

                        // XML 텍스트에 커스텀 요소 추가 (닫는 </xml> 태그 앞에 삽입)
                        const assemblyRecordingXml = `  <assemblyRecording version="1.0" encoding="base64">${base64Data}</assemblyRecording>\n`;
                        content = content.replace('</xml>', assemblyRecordingXml + '</xml>');

                        console.log('💾 블록 조립 기록 데이터 포함 저장:', recordingData.events.length + '개 이벤트');
                    }
                }

                window.IDEUtils.downloadFile(
                    new Blob([content], { type: 'text/xml;charset=utf-8' }), 
                    fileName + '.xml'
                );

                window.IDEUtils.logToConsole(
                    (window.IDEI18n ? window.IDEI18n.getMsg('file_save_block', '{fileName} 블록 파일이 저장되었습니다.') : '{fileName} 블록 파일이 저장되었습니다.')
                        .replace('{fileName}', fileName + '.xml')
                );
            } else {
                // 텍스트 모드: .ino 파일로 저장
                if (!window.IDEEditors || !window.IDEEditors.monacoEditor) {
                    throw new Error('Monaco 에디터가 초기화되지 않았습니다.');
                }

                const content = window.IDEEditors.monacoEditor.getValue();
                
                window.IDEUtils.downloadFile(
                    new Blob([content], { type: 'text/plain;charset=utf-8' }), 
                    fileName + '.ino'
                );

                window.IDEUtils.logToConsole(
                    (window.IDEI18n ? window.IDEI18n.getMsg('file_save_sketch', '{fileName} 스케치 파일이 저장되었습니다.') : '{fileName} 스케치 파일이 저장되었습니다.')
                        .replace('{fileName}', fileName + '.ino')
                );
            }
        } catch (error) {
            console.error('파일 저장 실패:', error);
            window.IDEUtils.logToConsole(
                window.IDEI18n ? window.IDEI18n.getMsg(isBlockMode ? 'file_save_fail_block' : 'file_save_fail_sketch', '파일 저장에 실패했습니다.') : '파일 저장에 실패했습니다.'
            );
        }
    },

    /**
     * 사용자가 선택한 파일을 불러와 워크스페이스나 에디터에 적용합니다.
     * 파일 확장자에 따라 모드를 자동으로 전환합니다.
     * @param {Event} event - 파일 입력(input) 요소의 change 이벤트 객체
     */
    loadWorkspace(event) {
        const file = event.target.files[0];
        if (!file) return;

        // 파일명을 입력 필드에 반영 (확장자 제거)
        const fileNameInput = document.getElementById('fileNameInput');
        if (fileNameInput) {
            fileNameInput.value = file.name.replace(/\.(xml|ino)$/, '');
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const isXml = file.name.endsWith('.xml');
                
                // 파일 형식에 맞게 모드 전환
                if (window.IDEEditors && window.IDEEditors.switchMode) {
                    window.IDEEditors.switchMode(isXml ? 'block' : 'text');
                }

                // 약간의 지연 후 파일 내용 로드 (모드 전환 완료 대기)
                setTimeout(() => {
                    if (isXml) {
                        // XML 파일: 블록 워크스페이스에 로드
                        if (window.IDEEditors && window.IDEEditors.workspace) {
                            const xmlText = e.target.result;

                            // Unknown block 전처리
                            let xmlDom, unknownBlocks = [];
                            try {
                                if (window.IDEBlocklyUtils && window.IDEBlocklyUtils.preprocessXmlForUnknownBlocks) {
                                    const result = window.IDEBlocklyUtils.preprocessXmlForUnknownBlocks(xmlText);
                                    xmlDom = result.xmlDom;
                                    unknownBlocks = result.unknownBlocks;
                                } else {
                                    xmlDom = Blockly.utils.xml.textToDom(xmlText);
                                }

                                // 블록 조립 기록 데이터 추출
                                let recordingData = null;
                                const recordingElements = xmlDom.getElementsByTagName('assemblyRecording');
                                if (recordingElements.length > 0) {
                                    try {
                                        const recordingElement = recordingElements[0];
                                        const encoding = recordingElement.getAttribute('encoding');
                                        let jsonString = '';

                                        if (encoding === 'base64') {
                                            // Base64 디코딩
                                            const base64Data = recordingElement.textContent || recordingElement.innerText;
                                            jsonString = decodeURIComponent(escape(atob(base64Data)));
                                        } else {
                                            // CDATA 방식 (하위 호환성)
                                            jsonString = recordingElement.firstChild ? recordingElement.firstChild.nodeValue : recordingElement.textContent;
                                        }

                                        recordingData = JSON.parse(jsonString);
                                        console.log('📥 블록 조립 기록 데이터 발견:', recordingData.events.length + '개 이벤트');

                                        // XML에서 assemblyRecording 요소 제거 (Blockly 파싱 오류 방지)
                                        recordingElement.parentNode.removeChild(recordingElement);
                                    } catch (parseError) {
                                        console.warn('블록 조립 기록 데이터 파싱 실패:', parseError);
                                    }
                                }

                                window.IDEEditors.workspace.clear();
                                Blockly.Xml.domToWorkspace(xmlDom, window.IDEEditors.workspace);

                                // 블록 조립 기록 복원
                                if (recordingData && window.BlockAssemblyRecorder) {
                                    window.BlockAssemblyRecorder.importData(recordingData);
                                    window.IDEUtils.logToConsole('📥 블록 조립 기록 로드 완료: ' + recordingData.events.length + '개 이벤트');
                                }

                                // Unknown block이 발견되었으면 경고 메시지 표시
                                if (unknownBlocks.length > 0) {
                                    const blockList = unknownBlocks.join(', ');
                                    const warningMsg = window.IDEI18n ?
                                        window.IDEI18n.getMsg('file_load_unknown_blocks_warning',
                                            '파일이 로드되었지만 다음 블록은 더 이상 지원되지 않습니다:\n{blockList}\n\n빨간색 블록을 제거하고 새로운 블록으로 교체해주세요.')
                                            .replace('{blockList}', blockList) :
                                        `파일이 로드되었지만 다음 블록은 더 이상 지원되지 않습니다:\n${blockList}\n\n빨간색 블록을 제거하고 새로운 블록으로 교체해주세요.`;

                                    window.IDEUtils.logToConsole('⚠️ ' + warningMsg);

                                    // 알림 표시
                                    if (confirm(warningMsg + '\n\n확인을 누르면 계속 작업할 수 있습니다.')) {
                                        console.log('Unknown blocks detected:', unknownBlocks);
                                    }
                                }

                            } catch (parseError) {
                                // XML 파싱 실패 시 원본 에러 메시지 표시
                                throw parseError;
                            }
                        }
                    } else {
                        // .ino 파일: Monaco 에디터에 로드
                        if (window.IDEEditors && window.IDEEditors.monacoEditor) {
                            window.IDEEditors.monacoEditor.setValue(e.target.result);
                        }
                    }

                    // 성공 로그
                    window.IDEUtils.logToConsole(
                        (window.IDEI18n ? window.IDEI18n.getMsg(isXml ? 'file_load_block' : 'file_load_sketch', '{fileName} 파일이 로드되었습니다.') : '{fileName} 파일이 로드되었습니다.')
                            .replace('{fileName}', file.name)
                    );
                }, 100);

            } catch (error) {
                console.error('파일 로드 실패:', error);
                window.IDEUtils.logToConsole(
                    (window.IDEI18n ? window.IDEI18n.getMsg('file_load_fail', '파일 로드 실패: {errorMsg}') : '파일 로드 실패: {errorMsg}')
                        .replace('{errorMsg}', error.message)
                );
            }
        };

        reader.readAsText(file, 'UTF-8');
        
        // 파일 입력 값 초기화 (같은 파일을 다시 선택할 수 있도록)
        event.target.value = '';
    },

    /**
     * 현재 코드를 사용자의 클립보드에 복사합니다.
     */
    async copyCode() {
        try {
            const code = window.IDEEditors ? window.IDEEditors.getCurrentCode() : '';
            
            if (!code.trim()) {
                window.IDEUtils.logToConsole(
                    window.IDEI18n ? window.IDEI18n.getMsg('code_copy_no_content', '복사할 코드가 없습니다.') : '복사할 코드가 없습니다.'
                );
                return false;
            }

            const success = await window.IDEUtils.copyCodeToClipboard(code);
            return success;
        } catch (error) {
            console.error('코드 복사 실패:', error);
            window.IDEUtils.logToConsole(
                window.IDEI18n ? window.IDEI18n.getMsg('code_copy_fail', '클립보드 복사에 실패했습니다.') : '클립보드 복사에 실패했습니다.'
            );
            return false;
        }
    },

    /**
     * 프로젝트 데이터를 JSON 형태로 내보냅니다 (고급 기능).
     * 블록 데이터, 설정, 메타데이터를 모두 포함합니다.
     * @param {string} projectName - 프로젝트 이름
     */
    exportProject(projectName = 'arduino_project') {
        try {
            const projectData = {
                metadata: {
                    name: projectName,
                    created: new Date().toISOString(),
                    version: '1.0.0',
                    board: document.getElementById('boardSelect')?.value || 'uno',
                    language: window.IDEI18n ? window.IDEI18n.getCurrentLanguage() : 'ko'
                },
                blocklyXml: null,
                textCode: null,
                currentMode: window.IDEEditors ? window.IDEEditors.currentMode : 'block'
            };

            // 블록 데이터 저장
            if (window.IDEEditors && window.IDEEditors.workspace) {
                projectData.blocklyXml = window.IDEEditors.getWorkspaceXml();
            }

            // 텍스트 코드 저장
            if (window.IDEEditors && window.IDEEditors.monacoEditor) {
                projectData.textCode = window.IDEEditors.monacoEditor.getValue();
            }

            const content = JSON.stringify(projectData, null, 2);
            window.IDEUtils.downloadFile(
                new Blob([content], { type: 'application/json;charset=utf-8' }), 
                projectName + '.json'
            );

            window.IDEUtils.logToConsole(
                (window.IDEI18n ? window.IDEI18n.getMsg('project_export_success', '프로젝트가 내보내기되었습니다: {fileName}') : '프로젝트가 내보내기되었습니다: {fileName}')
                    .replace('{fileName}', projectName + '.json')
            );

        } catch (error) {
            console.error('프로젝트 내보내기 실패:', error);
            window.IDEUtils.logToConsole(
                window.IDEI18n ? window.IDEI18n.getMsg('project_export_fail', '프로젝트 내보내기에 실패했습니다.') : '프로젝트 내보내기에 실패했습니다.'
            );
        }
    },

    /**
     * JSON 형태의 프로젝트 파일을 가져옵니다 (고급 기능).
     * @param {Event} event - 파일 입력 이벤트
     */
    importProject(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.name.endsWith('.json')) {
            window.IDEUtils.logToConsole(
                window.IDEI18n ? window.IDEI18n.getMsg('project_import_invalid', '올바른 프로젝트 파일(.json)을 선택해주세요.') : '올바른 프로젝트 파일(.json)을 선택해주세요.'
            );
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const projectData = JSON.parse(e.target.result);
                
                // 프로젝트 데이터 검증
                if (!projectData.metadata || !projectData.currentMode) {
                    throw new Error('올바르지 않은 프로젝트 파일 형식입니다.');
                }

                // 프로젝트 이름 설정
                const fileNameInput = document.getElementById('fileNameInput');
                if (fileNameInput && projectData.metadata.name) {
                    fileNameInput.value = projectData.metadata.name;
                }

                // 보드 설정 복원
                const boardSelect = document.getElementById('boardSelect');
                if (boardSelect && projectData.metadata.board) {
                    boardSelect.value = projectData.metadata.board;
                    // 보드 표시기 업데이트
                    if (window.IDEUtils && window.IDEUtils.updateBoardIndicator) {
                        const boardIndicator = document.getElementById('boardIndicator');
                        window.IDEUtils.updateBoardIndicator(projectData.metadata.board, boardIndicator);
                    }
                }

                // 모드 전환
                if (window.IDEEditors && window.IDEEditors.switchMode) {
                    window.IDEEditors.switchMode(projectData.currentMode);
                }

                setTimeout(() => {
                    // 블록 데이터 복원
                    if (projectData.blocklyXml && window.IDEEditors) {
                        window.IDEEditors.loadWorkspaceFromXml(projectData.blocklyXml);
                    }

                    // 텍스트 코드 복원
                    if (projectData.textCode && window.IDEEditors && window.IDEEditors.monacoEditor) {
                        window.IDEEditors.monacoEditor.setValue(projectData.textCode);
                    }

                    window.IDEUtils.logToConsole(
                        (window.IDEI18n ? window.IDEI18n.getMsg('project_import_success', '프로젝트가 가져와졌습니다: {projectName}') : '프로젝트가 가져와졌습니다: {projectName}')
                            .replace('{projectName}', projectData.metadata.name || file.name)
                    );
                }, 200);

            } catch (error) {
                console.error('프로젝트 가져오기 실패:', error);
                window.IDEUtils.logToConsole(
                    (window.IDEI18n ? window.IDEI18n.getMsg('project_import_fail', '프로젝트 가져오기 실패: {errorMsg}') : '프로젝트 가져오기 실패: {errorMsg}')
                        .replace('{errorMsg}', error.message)
                );
            }
        };

        reader.readAsText(file, 'UTF-8');
        event.target.value = '';
    },

    /**
     * 로컬 스토리지를 이용한 자동 저장 기능 (선택사항)
     * 주의: Claude.ai artifact 환경에서는 localStorage를 사용할 수 없으므로 이 기능은 비활성화됩니다.
     */
    enableAutoSave() {
        console.warn('자동 저장 기능은 현재 환경에서 지원되지 않습니다 (localStorage 제한)');
        return false;
    },

    /**
     * 파일 형식별 유효성 검증
     * @param {string} content - 파일 내용
     * @param {string} extension - 파일 확장자
     * @returns {boolean} 유효성 여부
     */
    validateFileContent(content, extension) {
        try {
            switch (extension.toLowerCase()) {
                case 'xml':
                    // XML 파싱 테스트
                    Blockly.utils.xml.textToDom(content);
                    return true;
                case 'ino':
                    // 기본적인 C++ 구문 체크 (간단한 검증)
                    return content.includes('setup') || content.includes('loop') || content.trim().length > 0;
                case 'json':
                    // JSON 파싱 테스트
                    const data = JSON.parse(content);
                    return data && typeof data === 'object';
                default:
                    return true;
            }
        } catch (error) {
            return false;
        }
    }
};