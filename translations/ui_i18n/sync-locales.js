/**
 * sync-locales.js
 *
 * 번역 파일 동기화 도구
 * - ui_en.json을 기준으로 다른 언어 파일을 동기화
 * - 기준 파일의 키 순서(카테고리 순서) 유지
 * - 누락 키에 [TODO] 접두사 + 영어 값 추가
 * - 기준 파일에 없는 불필요 키 제거
 *
 * 사용법: node sync-locales.js
 *
 * 카테고리 순서 재정렬이 필요한 경우: node sort-and-sync-locales.js
 */

const fs = require('fs');
const path = require('path');

// 1. 설정
const localesDir = __dirname;
const masterFile = 'ui_en.json';
const koreanFile = 'ui_ko.json';

// 2. 영어 파일 로드 (카테고리 순서가 적용된 기준 파일)
const enPath = path.join(localesDir, masterFile);
if (!fs.existsSync(enPath)) {
    console.error(`❌ 같은 폴더에 ${masterFile} 파일이 없어요!`);
    process.exit(1);
}
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const enKeys = Object.keys(enData);
const masterKeySet = new Set(enKeys);

console.log(`📋 기준 파일(${masterFile}): ${enKeys.length}개 키\n`);

// 3. 같은 폴더 내의 모든 json 파일 동기화
let totalAdded = 0;
let totalRemoved = 0;
let fileCount = 0;

const files = fs.readdirSync(localesDir)
    .filter(f => f.endsWith('.json') && f !== masterFile && f !== koreanFile)
    .sort();

files.forEach(file => {
    const targetPath = path.join(localesDir, file);

    // JSON 파싱 에러 방지
    let targetData;
    try {
        targetData = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
    } catch (e) {
        console.error(`  ⚠️ ${file}: JSON 형식 오류 - 건너뜁니다.`);
        return;
    }

    const targetKeys = new Set(Object.keys(targetData));

    // 누락 키, 불필요 키 카운트
    const missing = enKeys.filter(k => !targetKeys.has(k));
    const extra = [...targetKeys].filter(k => !masterKeySet.has(k));

    // 기준 파일 키 순서대로 새 데이터 생성
    const newContent = {};
    enKeys.forEach(key => {
        if (targetData.hasOwnProperty(key)) {
            newContent[key] = targetData[key]; // 기존 번역 유지
        } else {
            newContent[key] = `[TODO] ${enData[key]}`; // 누락: 영어 내용 채워넣기
        }
    });

    // 파일 저장 (2칸 들여쓰기 + 끝에 개행)
    fs.writeFileSync(targetPath, JSON.stringify(newContent, null, 2) + '\n', 'utf8');

    totalAdded += missing.length;
    totalRemoved += extra.length;
    fileCount++;

    const status = missing.length === 0 && extra.length === 0 ? '✅' : '🔧';
    console.log(`  ${status} ${file}: +${missing.length}개 추가, -${extra.length}개 제거`);
});

// 4. 요약
console.log('\n' + '─'.repeat(40));
console.log(`📊 동기화 완료: ${fileCount}개 파일`);
console.log(`   추가: ${totalAdded}개 키, 제거: ${totalRemoved}개 키`);
console.log('─'.repeat(40));
