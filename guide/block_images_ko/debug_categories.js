// DEBUG: Check what categories are parsed from toolbox XML
// RUN: fetch("/guide/block_images_ko/debug_categories.js").then(r=>r.text()).then(eval)

(function debugCategories() {
    var toolboxXml = window.generateToolbox ? window.generateToolbox() : null;
    if (!toolboxXml) { console.error("generateToolbox() not found"); return; }

    var parser = new DOMParser();
    var doc = parser.parseFromString("<toolbox>" + toolboxXml + "</toolbox>", "text/xml");

    // Check for XML parse errors
    var parseError = doc.querySelector("parsererror");
    if (parseError) {
        console.error("XML PARSE ERROR:", parseError.textContent);
        return;
    }

    var categories = doc.querySelectorAll("category");
    console.log("Total categories found: " + categories.length);

    var colourToId = {
        "#FFAB19":"main","#6190DF":"pin","#FF9800":"control","#5CB1D6":"logic",
        "#59C059":"math","#82a52d":"text","#A855F7":"color","#98607F":"variables",
        "#59ACF7":"list","#8E61A3":"functions","#08B89F":"utility","#FAC907":"display",
        "#FF6F00":"sensors_a","#4D68EC":"sensors_b","#50B91A":"motor","#70D650":"output",
        "#F75ACF":"communication","#4285F4":"webble","#367E7F":"serial","#9C27B0":"tinyml"
    };

    var displayCount = 0, serialCount = 0, commCount = 0;

    for (var ci = 0; ci < categories.length; ci++) {
        var cat = categories[ci];
        var colour = cat.getAttribute("colour") || "";
        var name = cat.getAttribute("name") || "";
        if (colour === "#171717") { console.log("  [SKIP] separator: " + name); continue; }

        var catId = colourToId[colour] || "UNKNOWN";
        if (colour === "#FAC907") { displayCount++; catId = displayCount <= 1 ? "display_a" : "display_b"; }
        if (colour === "#367E7F") { serialCount++; catId = serialCount <= 1 ? "serial" : "esp32cam"; }
        if (colour === "#F75ACF") { commCount++; catId = commCount === 1 ? "communication" : "huskylens"; }

        var blockCount = cat.querySelectorAll(":scope > block").length;
        console.log("  [" + catId + "] colour=" + colour + " name=" + name.substring(0,30) + " blocks=" + blockCount);
    }
})();
