// Part 2-B: DISPLAY_B only (OLED SSD1306, 한글OLED, 도트매트릭스 HT16K33, SH1106)
// RUN: fetch("/guide/block_images_ko/save_part2_display_b.js").then(r=>r.text()).then(eval)

(async function savePart2B() {
    "use strict";
    var CATS = ["display_b"];
    var SKIP_FLAGS = true;
    var FORMAT = "svg";
    var DELAY_RENDER = 500;
    var DELAY_BETWEEN = 300;

    var ws = Blockly.getMainWorkspace();
    if (!ws) { console.error("No workspace"); return; }

    var toolboxXml = window.generateToolbox ? window.generateToolbox() : null;
    if (!toolboxXml) { console.error("generateToolbox() not found"); return; }

    var parser = new DOMParser();
    var doc = parser.parseFromString("<toolbox>" + toolboxXml + "</toolbox>", "text/xml");
    var categories = doc.querySelectorAll("category");

    var colourToId = {
        "#FFAB19":"main","#6190DF":"pin","#FF9800":"control","#5CB1D6":"logic",
        "#59C059":"math","#82a52d":"text","#A855F7":"color","#98607F":"variables",
        "#59ACF7":"list","#8E61A3":"functions","#08B89F":"utility","#FAC907":"display",
        "#FF6F00":"sensors_a","#4D68EC":"sensors_b","#50B91A":"motor","#70D650":"output",
        "#F75ACF":"communication","#4285F4":"webble","#367E7F":"serial","#9C27B0":"tinyml"
    };

    var displayCount = 0, serialCount = 0, commCount = 0;
    var blockList = [];

    for (var ci = 0; ci < categories.length; ci++) {
        var cat = categories[ci];
        var colour = cat.getAttribute("colour") || "";
        if (colour === "#171717") continue;

        var catId = colourToId[colour] || "";
        if (colour === "#FAC907") { displayCount++; catId = displayCount <= 1 ? "display_a" : "display_b"; }
        if (colour === "#367E7F") { serialCount++; catId = serialCount <= 1 ? "serial" : "esp32cam"; }
        if (colour === "#F75ACF") { commCount++; catId = commCount === 1 ? "communication" : "huskylens"; }
        if (colour === "#4285F4" && blockList.some(function(b){return b.category==="webble";})) catId = "wifi";

        if (CATS.indexOf(catId) === -1) continue;

        var blocks = cat.querySelectorAll(":scope > block");
        for (var bi = 0; bi < blocks.length; bi++) {
            var blockType = blocks[bi].getAttribute("type") || "";
            if (SKIP_FLAGS && blockType.match(/_flag$/)) continue;
            var serializer = new XMLSerializer();
            blockList.push({ category: catId, type: blockType, xml: serializer.serializeToString(blocks[bi]) });
        }
    }

    console.log("=== Part 2-B: DISPLAY_B (" + blockList.length + " blocks) ===");
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
    console.log("=== Part 2-B DONE! " + ok + "/" + blockList.length + " ===");
    if (fail.length) console.log("Failed: " + fail.join(", "));
})();
