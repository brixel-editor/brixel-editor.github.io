const fs = require('fs');
const path = require('path');

// 1. 설정: 현재 스크립트가 있는 폴더를 타겟으로 지정
const localesDir = __dirname; 
const masterFile = 'ui_en.json'; // 기준이 되는 영어 파일

// 2. 영어 파일 로드
const enPath = path.join(localesDir, masterFile);
if (!fs.existsSync(enPath)) {
    console.error(`❌ 같은 폴더에 ${masterFile} 파일이 없어요!`);
    process.exit(1);
}
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// 3. 같은 폴더 내의 모든 json 파일 스캔
fs.readdirSync(localesDir).forEach(file => {
    // 기준 파일(en.json)이거나, 확장자가 .json이 아니면 건너뜀 (스크립트 파일 본인 제외됨)
    if (file === masterFile || path.extname(file) !== '.json') return;

    const targetPath = path.join(localesDir, file);
    
    // JSON 파싱 에러 방지 (혹시 깨진 파일 있을까봐)
    let targetData;
    try {
        targetData = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
    } catch (e) {
        console.error(`⚠️ ${file} 파일은 JSON 형식이 잘못돼서 건너뜁니다.`);
        return;
    }
    
    // 4. 동기화 로직
    const newContent = {};
    let addedCount = 0;

    Object.keys(enData).forEach(key => {
        if (targetData[key]) {
            newContent[key] = targetData[key]; // 기존 번역 유지
        } else {
            newContent[key] = `[TODO] ${enData[key]}`; // 영어 내용 채워넣기
            addedCount++;
        }
    });

    // 5. 파일 저장
    fs.writeFileSync(targetPath, JSON.stringify(newContent, null, 4));
    console.log(`✅ ${file} 완료: ${addedCount}개 키 추가됨`);
});

console.log('🎉 동기화 끝! 같은 폴더 내의 파일들을 확인해봐.');