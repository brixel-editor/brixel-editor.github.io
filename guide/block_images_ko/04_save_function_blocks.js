// ============================================================
// Brixel WebEditor - Function Category Block SVG Saver
// ============================================================
// 함수 카테고리는 Blockly의 custom="PROCEDURE" 동적 카테고리이므로
// 기존 save_all_blocks.js의 toolbox XML 파싱으로는 추출되지 않는다.
// 이 스크립트는 함수 블록 6종을 직접 생성하여 SVG로 저장한다.
//
// HOW TO RUN:
//   1. Open http://127.0.0.1:3000/index.html
//   2. Press F12 -> Console
//   3. Paste and run:
//      fetch("/guide/block_images_ko/04_save_function_blocks.js").then(r=>r.text()).then(eval)
//
// 또는 콘솔에 직접 아래 전체 코드를 붙여넣기
// ============================================================

(async function saveFunctionBlocks() {
    "use strict";

    var FORMAT = "svg";
    var DELAY_RENDER = 800;
    var DELAY_BETWEEN = 400;
    var CATEGORY_PREFIX = "functions";

    var ws = Blockly.getMainWorkspace();
    if (!ws) { console.error("No workspace found"); return; }

    // ---- 함수 블록 6종 정의 (XML) ----
    // procedures_defnoreturn, procedures_defreturn는 workspace에 먼저 생성해야
    // procedures_callnoreturn, procedures_callreturn가 동적으로 사용 가능해진다.

    var functionBlocks = [
        {
            type: "procedures_defnoreturn",
            name: "함수 정의 (반환 없음)",
            xml: '<block type="procedures_defnoreturn">' +
                 '  <mutation>' +
                 '    <arg name="x" varid="arg1"></arg>' +
                 '  </mutation>' +
                 '  <field name="NAME">myFunction</field>' +
                 '</block>'
        },
        {
            type: "procedures_defreturn",
            name: "함수 정의 (반환 있음)",
            xml: '<block type="procedures_defreturn">' +
                 '  <mutation>' +
                 '    <arg name="x" varid="arg2"></arg>' +
                 '  </mutation>' +
                 '  <field name="NAME">myFunction2</field>' +
                 '  <value name="RETURN">' +
                 '    <shadow type="math_number">' +
                 '      <field name="NUM">0</field>' +
                 '    </shadow>' +
                 '  </value>' +
                 '</block>'
        },
        {
            type: "procedures_callnoreturn",
            name: "함수 호출 (반환 없음)",
            // callnoreturn은 defnoreturn이 워크스페이스에 있어야 동적 생성됨
            // 직접 XML로 mutation 지정
            xml: '<block type="procedures_callnoreturn">' +
                 '  <mutation name="myFunction">' +
                 '    <arg name="x"></arg>' +
                 '  </mutation>' +
                 '</block>'
        },
        {
            type: "procedures_callreturn",
            name: "함수 호출 (반환 있음)",
            xml: '<block type="procedures_callreturn">' +
                 '  <mutation name="myFunction2">' +
                 '    <arg name="x"></arg>' +
                 '  </mutation>' +
                 '</block>'
        },
        {
            type: "procedures_ifreturn",
            name: "조건부 반환",
            xml: '<block type="procedures_ifreturn">' +
                 '  <mutation value="1"></mutation>' +
                 '  <value name="CONDITION">' +
                 '    <shadow type="logic_boolean">' +
                 '      <field name="BOOL">TRUE</field>' +
                 '    </shadow>' +
                 '  </value>' +
                 '  <value name="VALUE">' +
                 '    <shadow type="math_number">' +
                 '      <field name="NUM">0</field>' +
                 '    </shadow>' +
                 '  </value>' +
                 '</block>'
        },
        {
            type: "procedures_ifreturn_void",
            name: "조건부 반환 (void)",
            xml: '<block type="procedures_ifreturn_void">' +
                 '  <value name="CONDITION">' +
                 '    <shadow type="logic_boolean">' +
                 '      <field name="BOOL">TRUE</field>' +
                 '    </shadow>' +
                 '  </value>' +
                 '</block>'
        }
    ];

    console.log("=== Brixel Function Block Image Saver ===");
    console.log("Total blocks to save: " + functionBlocks.length);
    console.log("Format: " + FORMAT);
    console.log("=========================================");

    var ok = 0;
    var fail = [];

    for (var i = 0; i < functionBlocks.length; i++) {
        var entry = functionBlocks[i];
        var fileName = CATEGORY_PREFIX + "_" + entry.type;
        console.log("[" + (i + 1) + "/" + functionBlocks.length + "] " + fileName + " (" + entry.name + ")");

        try {
            ws.clear();

            // XML에서 블록 생성
            var xmlDom = Blockly.utils.xml.textToDom("<xml>" + entry.xml + "</xml>");
            var blockDom = xmlDom.firstElementChild;
            var block = Blockly.Xml.domToBlock(blockDom, ws);
            block.moveBy(50, 50);

            // 렌더링 대기
            await new Promise(function(r) { setTimeout(r, DELAY_RENDER); });

            // SVG 저장
            if (FORMAT === "svg") {
                await window.BlockImageSaver.saveMainBlocksAsSvg(ws, fileName, block);
            } else {
                await window.BlockImageSaver.saveMainBlocksAsImage(ws, fileName, block);
            }

            console.log("  OK: " + fileName + "." + FORMAT);
            ok++;
        } catch (e) {
            console.error("  FAIL: " + fileName + " - " + e.message);
            fail.push(fileName + " (" + e.message + ")");
        }

        await new Promise(function(r) { setTimeout(r, DELAY_BETWEEN); });
    }

    ws.clear();
    console.log("=========================================");
    console.log("DONE! " + ok + "/" + functionBlocks.length + " saved successfully");
    if (fail.length > 0) {
        console.log("Failed (" + fail.length + "):");
        fail.forEach(function(f) { console.log("  - " + f); });
    }
    console.log("=========================================");
    console.log("");
    console.log(">>> 다운로드된 SVG 파일을 아래 폴더로 이동하세요:");
    console.log(">>> guide/block_images_ko/");
    console.log("");
    console.log("PowerShell 명령:");
    console.log('Move-Item "$env:USERPROFILE\\Downloads\\functions_*.svg" "D:\\00_backup_Brixel WebEditor\\Blockcoding_WebIDE_Project_V27_API\\guide\\block_images_ko\\"');
})();
