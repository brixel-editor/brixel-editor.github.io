// ============================================================
// Brixel WebEditor - All Block SVG Auto Saver
// ============================================================
// Parses the toolbox XML at runtime and saves every block as SVG.
// Uses Blockly.Xml.domToBlock() so shadow blocks are included.
//
// HOW TO RUN:
//   1. Open http://127.0.0.1:3000/index.html
//   2. Press F12 -> Console
//   3. Type:  fetch("/guide/block_images_ko/save_all_blocks.js").then(r=>r.text()).then(eval)
//
// OPTIONS (edit before running if needed):
//   SKIP_FLAGS  - skip category flag/separator blocks (default: true)
//   CATEGORY    - save only one category (null = all)
//   FORMAT      - "svg" or "png"
// ============================================================

(async function saveAllBlocks() {
    "use strict";

    // ---- OPTIONS ----
    var SKIP_FLAGS = true;           // skip *_flag blocks (visual separators)
    var CATEGORY = null;             // null = all, or e.g. "pin" to save one
    var START_FROM = null;           // null = start from beginning, or e.g. "display_b" to resume
    var FORMAT = "svg";              // "svg" or "png"
    var DELAY_RENDER = 500;          // ms to wait after block render
    var DELAY_BETWEEN = 300;         // ms between saves

    // ---- Grab workspace ----
    var ws = Blockly.getMainWorkspace();
    if (!ws) { console.error("No workspace found"); return; }

    // ---- Parse toolbox XML ----
    var toolboxXml = window.generateToolbox ? window.generateToolbox() : null;
    if (!toolboxXml) { console.error("generateToolbox() not found"); return; }

    var parser = new DOMParser();
    var doc = parser.parseFromString("<toolbox>" + toolboxXml + "</toolbox>", "text/xml");
    var categories = doc.querySelectorAll("category");

    // ---- Build block list: [{category, type, xml}] ----
    var blockList = [];
    var categoryMap = {
        // colour -> category name mapping (manual for clear file naming)
    };

    // Category name extraction from Blockly.Msg keys (fallback to raw name)
    function cleanCategoryName(catEl) {
        var nameAttr = catEl.getAttribute("name") || "";
        // Remove ${...} template wrapper if present
        nameAttr = nameAttr.replace(/\$\{[^}]+\}/g, "").trim();
        // Remove emoji and special chars
        nameAttr = nameAttr.replace(/[^\w\sA-Za-z가-힣]/g, "").trim();
        return nameAttr;
    }

    // Known category ID mapping by colour
    var colourToId = {
        "#FFAB19": "main",
        "#6190DF": "pin",
        "#FF9800": "control",
        "#5CB1D6": "logic",
        "#59C059": "math",
        "#82a52d": "text",
        "#A855F7": "color",
        "#98607F": "variables",
        "#59ACF7": "list",
        "#8E61A3": "functions",
        "#08B89F": "utility",
        "#FAC907": "display",
        "#FF6F00": "sensors_a",
        "#4D68EC": "sensors_b",
        "#50B91A": "motor",
        "#70D650": "output",
        "#F75ACF": "communication",
        "#4285F4": "webble",
        "#367E7F": "serial",
        "#9C27B0": "tinyml"
    };

    // Track display sub-categories (A vs B)
    var displayCount = 0;
    var serialCount = 0;
    var commCount = 0;

    for (var ci = 0; ci < categories.length; ci++) {
        var cat = categories[ci];
        var colour = cat.getAttribute("colour") || "";
        var catName = cleanCategoryName(cat);

        // Skip separator categories
        if (colour === "#171717") continue;
        if (!catName && !colour) continue;

        // Determine category ID
        var catId = colourToId[colour] || catName.toLowerCase().replace(/\s+/g, "_");

        // Handle duplicate colours (display A/B, serial/esp32cam, communication/huskylens)
        if (colour === "#FAC907") {
            displayCount++;
            catId = displayCount <= 1 ? "display_a" : "display_b";
        }
        if (colour === "#367E7F") {
            serialCount++;
            catId = serialCount <= 1 ? "serial" : "esp32cam";
        }
        if (colour === "#F75ACF") {
            commCount++;
            if (commCount === 1) catId = "communication";
            else if (commCount === 2) catId = "huskylens";
        }
        if (colour === "#4285F4") {
            // webble first, then wifi
            if (catId === "webble" && blockList.some(function(b) { return b.category === "webble"; })) {
                catId = "wifi";
            }
        }

        // Filter by CATEGORY option
        if (CATEGORY && catId !== CATEGORY) continue;

        // Extract block elements
        var blocks = cat.querySelectorAll(":scope > block");
        for (var bi = 0; bi < blocks.length; bi++) {
            var blockEl = blocks[bi];
            var blockType = blockEl.getAttribute("type") || "";

            // Skip flag blocks
            if (SKIP_FLAGS && blockType.match(/_flag$/)) continue;
            if (SKIP_FLAGS && blockType.match(/^(main_flag|pin_flag|control_flag|logic_flag|math_flag|text_flag|colour_flag|var_flag|func_flag|util_flag|dis01_flag|dis02_flag|sensor01_flag|sensor02_flag|motor_flag|output_flag|comm_flag)$/)) continue;

            // Get outer XML of this block element
            var serializer = new XMLSerializer();
            var blockXml = serializer.serializeToString(blockEl);

            blockList.push({
                category: catId,
                type: blockType,
                xml: blockXml
            });
        }
    }

    // ---- Apply START_FROM: skip blocks before that category ----
    if (START_FROM) {
        var startIdx = -1;
        for (var si = 0; si < blockList.length; si++) {
            if (blockList[si].category === START_FROM) { startIdx = si; break; }
        }
        if (startIdx > 0) {
            var skippedCount = startIdx;
            blockList = blockList.slice(startIdx);
            console.log("START_FROM='" + START_FROM + "' -> skipped first " + skippedCount + " blocks");
        } else if (startIdx < 0) {
            console.error("START_FROM category '" + START_FROM + "' not found!");
            return;
        }
    }

    console.log("=== Brixel Block Image Saver ===");
    console.log("Total blocks to save: " + blockList.length);
    console.log("Format: " + FORMAT);
    if (START_FROM) console.log("Starting from: " + START_FROM);
    console.log("================================");

    // ---- Save each block ----
    var ok = 0;
    var fail = [];
    var skipped = [];

    for (var i = 0; i < blockList.length; i++) {
        var entry = blockList[i];
        var fileName = entry.category + "_" + entry.type;
        console.log("[" + (i + 1) + "/" + blockList.length + "] " + fileName);

        try {
            ws.clear();

            // Create block from toolbox XML (includes shadow blocks)
            var xmlDom = Blockly.utils.xml.textToDom("<xml>" + entry.xml + "</xml>");
            var blockDom = xmlDom.firstElementChild;
            var block = Blockly.Xml.domToBlock(blockDom, ws);
            block.moveBy(50, 50);

            // Wait for render
            await new Promise(function(r) { setTimeout(r, DELAY_RENDER); });

            // Save
            if (FORMAT === "svg") {
                await window.BlockImageSaver.saveMainBlocksAsSvg(ws, fileName, block);
            } else {
                await window.BlockImageSaver.saveMainBlocksAsImage(ws, fileName, block);
            }

            console.log("  OK: " + fileName + "." + FORMAT);
            ok++;
        } catch (e) {
            console.error("  FAIL: " + fileName + " - " + e.message);
            fail.push(fileName);
        }

        await new Promise(function(r) { setTimeout(r, DELAY_BETWEEN); });
    }

    ws.clear();
    console.log("================================");
    console.log("DONE! " + ok + "/" + blockList.length + " saved successfully");
    if (fail.length > 0) {
        console.log("Failed (" + fail.length + "): " + fail.join(", "));
    }
    console.log("================================");
})();
