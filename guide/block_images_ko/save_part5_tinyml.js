// Part 5: TinyML only (ESP32 board must be selected first!)
// RUN: fetch("/guide/block_images_ko/save_part5_tinyml.js").then(r=>r.text()).then(eval)

(async function savePart5() {
    "use strict";
    var CATS = ["tinyml"];
    var SKIP_FLAGS = true;
    var FORMAT = "svg";
    var DELAY_RENDER = 500;
    var DELAY_BETWEEN = 300;

    var ws = Blockly.getMainWorkspace();
    if (!ws) { console.error("No workspace"); return; }

    // Force ESP32 toolbox to include TinyML
    var toolboxXml = window.generateToolbox ? window.generateToolbox("esp32") : null;
    if (!toolboxXml) { console.error("generateToolbox() not found"); return; }

    var parser = new DOMParser();
    var doc = parser.parseFromString("<toolbox>" + toolboxXml + "</toolbox>", "text/xml");

    var parseError = doc.querySelector("parsererror");
    if (parseError) { console.error("XML PARSE ERROR:", parseError.textContent); return; }

    var categories = doc.querySelectorAll("category");

    var blockList = [];

    for (var ci = 0; ci < categories.length; ci++) {
        var cat = categories[ci];
        var colour = cat.getAttribute("colour") || "";
        if (colour !== "#9C27B0") continue; // TinyML colour

        var blocks = cat.querySelectorAll(":scope > block");
        for (var bi = 0; bi < blocks.length; bi++) {
            var blockType = blocks[bi].getAttribute("type") || "";
            if (SKIP_FLAGS && blockType.match(/_flag$/)) continue;
            var serializer = new XMLSerializer();
            blockList.push({ category: "tinyml", type: blockType, xml: serializer.serializeToString(blocks[bi]) });
        }
    }

    if (blockList.length === 0) {
        console.error("TinyML blocks not found! Make sure ESP32 board is selected.");
        return;
    }

    console.log("=== Part 5: TinyML (" + blockList.length + " blocks) ===");
    var ok = 0, fail = [];

    for (var i = 0; i < blockList.length; i++) {
        var e = blockList[i];
        var fn = e.category + "_" + e.type;
        console.log("[" + (i+1) + "/" + blockList.length + "] " + fn);
        try {
            ws.clear();
            var xmlDom = Blockly.utils.xml.textToDom("<xml>" + e.xml + "</xml>");
            var block = Blockly.Xml.domToBlock(xmlDom.firstElementChild, ws);
            block.moveBy(50, 50);
            await new Promise(function(r){setTimeout(r, DELAY_RENDER);});
            if (FORMAT === "svg") await window.BlockImageSaver.saveMainBlocksAsSvg(ws, fn, block);
            else await window.BlockImageSaver.saveMainBlocksAsImage(ws, fn, block);
            ok++;
        } catch(err) { console.error("  FAIL: " + fn + " - " + err.message); fail.push(fn); }
        await new Promise(function(r){setTimeout(r, DELAY_BETWEEN);});
    }
    ws.clear();
    console.log("=== Part 5 DONE! " + ok + "/" + blockList.length + " ===");
    if (fail.length) console.log("Failed: " + fail.join(", "));
})();
