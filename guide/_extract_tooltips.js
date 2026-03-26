/**
 * Block Tooltip Extraction Script (v2)
 * Scans all block definition files and generator files to extract tooltips and comments.
 *
 * Improvements over v1:
 * - Filters out false positive type matches (field_*, input_value, input_statement, etc.)
 * - Better tooltip regex handling for Blockly.Msg.KEY || "fallback" patterns
 * - Cleans up generator comments (removes section headers, separator lines)
 * - Extracts message0 fallback text as block_label
 *
 * Run with: node _extract_tooltips.js
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..');
const BLOCKS_DIR = path.join(BASE, 'brixel', 'blocks');
const GENERATORS_DIR = path.join(BASE, 'brixel', 'generators');
const OUTPUT = path.join(__dirname, 'block_tooltips.json');

const result = {};

// Known Blockly field/input types that should NOT be treated as block types
const NON_BLOCK_TYPES = new Set([
    'input_value', 'input_statement', 'input_dummy', 'input_end_row',
    'field_input', 'field_dropdown', 'field_checkbox', 'field_colour',
    'field_color', 'field_number', 'field_angle', 'field_variable',
    'field_label', 'field_image', 'field_label_serializable',
    'field_matrix', 'field_note', 'field_multilineinput',
    'field_text_input', 'field_grid_dropdown'
]);

// ============================================================
// 1. Extract tooltips from block definition files
// ============================================================

function extractTooltipsFromFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);

    // Strategy: Parse block definitions by finding block boundaries,
    // then extract type, tooltip, and message0 within each block scope.

    // Approach A: For JSON array style blocks (defineBlocksWithJsonArray)
    // Find each { "type": "block_name", ... } object in the array
    extractFromJsonBlocks(content, fileName);

    // Approach B: For Blockly.Blocks['name'] = { init: ... jsonInit({...}) } style
    extractFromBlocklyBlocks(content, fileName);
}

/**
 * Extract from JSON array style block definitions.
 * These look like: { "type": "block_name", ..., "tooltip": Blockly.Msg.KEY || "text", ... }
 */
function extractFromJsonBlocks(content, fileName) {
    // Find all top-level block objects by looking for "type" at a block-definition level.
    // We identify block boundaries by finding "{" followed shortly by "type" key.

    // Match "type": "value" occurrences
    const typeRegex = /"type"\s*:\s*"([^"]+)"/g;
    let match;
    const allTypes = [];

    while ((match = typeRegex.exec(content)) !== null) {
        const typeName = match[1];
        const pos = match.index;

        // Skip non-block types (field_*, input_*, etc.)
        if (NON_BLOCK_TYPES.has(typeName)) continue;
        // Also skip if the type starts with known non-block prefixes
        if (typeName.startsWith('field_') || typeName.startsWith('input_')) continue;

        allTypes.push({ name: typeName, index: pos });
    }

    // For each valid block type, find the tooltip and message0 within its scope
    for (let i = 0; i < allTypes.length; i++) {
        const blockType = allTypes[i];
        const startPos = blockType.index;
        // Scope ends at next block type or +5000 chars, whichever is closer
        const nextBlockPos = (i + 1 < allTypes.length) ? allTypes[i + 1].index : startPos + 5000;
        const scope = content.substring(startPos, nextBlockPos);

        // Extract tooltip - handle: "tooltip": Blockly.Msg.KEY || "text"
        // or "tooltip": "text" or "tooltip": 'text'
        const tooltip = extractTooltipFromScope(scope);

        // Extract message0 - handle: "message0": Blockly.Msg.KEY || "text"
        const message0 = extractMessage0FromScope(scope);

        if (tooltip || message0) {
            if (!result[blockType.name]) {
                result[blockType.name] = {};
            }
            if (tooltip) {
                result[blockType.name].tooltip = tooltip;
            }
            if (message0) {
                result[blockType.name].block_label = cleanMessage0(message0);
            }
        }
    }
}

/**
 * Extract from Blockly.Blocks['name'] = { init: function() { this.jsonInit({...}) } } style
 * This handles blocks in files like 16_esp32cam.js, 15_post_init.js, etc.
 */
function extractFromBlocklyBlocks(content, fileName) {
    // Match Blockly.Blocks['block_name'] patterns
    const blockPattern = /Blockly\.Blocks\['([^']+)'\]\s*=\s*\{/g;
    let match;

    while ((match = blockPattern.exec(content)) !== null) {
        const blockName = match[1];
        const startPos = match.index;

        // Skip placeholder blocks
        if (blockName.startsWith('unknown_block_placeholder')) continue;

        // Find the end of this block definition (matching closing brace at same depth)
        const blockScope = findBlockScope(content, startPos + match[0].length - 1);
        if (!blockScope) continue;

        // Within this scope, look for jsonInit({...}) and extract tooltip/message0
        const tooltip = extractTooltipFromScope(blockScope);
        const message0 = extractMessage0FromScope(blockScope);

        // Also check for this.setTooltip('...')
        const setTooltipMatch = blockScope.match(/this\.setTooltip\(\s*['"]([^'"]+)['"]\s*\)/);

        if (tooltip || message0 || setTooltipMatch) {
            if (!result[blockName]) {
                result[blockName] = {};
            }
            if (tooltip && !result[blockName].tooltip) {
                result[blockName].tooltip = tooltip;
            }
            if (setTooltipMatch && !result[blockName].tooltip) {
                result[blockName].tooltip = setTooltipMatch[1];
            }
            if (message0 && !result[blockName].block_label) {
                result[blockName].block_label = cleanMessage0(message0);
            }
        }
    }
}

/**
 * Extract tooltip fallback text from a code scope.
 * Handles patterns like:
 *   "tooltip": Blockly.Msg.BKY_KEY || "fallback text"
 *   "tooltip": "direct text"
 *   "tooltip": 'direct text'
 */
function extractTooltipFromScope(scope) {
    // Pattern 1: "tooltip": Blockly.Msg.KEY || "text" or 'text'
    // The fallback text may contain escaped quotes, Korean chars, special chars
    let m = scope.match(/"tooltip"\s*:\s*Blockly\.Msg\.\w+\s*\|\|\s*"((?:[^"\\]|\\.)*)"/);
    if (m) return unescapeString(m[1]);

    m = scope.match(/"tooltip"\s*:\s*Blockly\.Msg\.\w+\s*\|\|\s*'((?:[^'\\]|\\.)*)'/);
    if (m) return unescapeString(m[1]);

    // Pattern 2: "tooltip": "text" (no Blockly.Msg)
    m = scope.match(/"tooltip"\s*:\s*"((?:[^"\\]|\\.)*)"/);
    if (m) return unescapeString(m[1]);

    m = scope.match(/"tooltip"\s*:\s*'((?:[^'\\]|\\.)*)'/);
    if (m) return unescapeString(m[1]);

    return null;
}

/**
 * Extract message0 fallback text from a code scope.
 */
function extractMessage0FromScope(scope) {
    let m = scope.match(/"message0"\s*:\s*Blockly\.Msg\.\w+\s*\|\|\s*"((?:[^"\\]|\\.)*)"/);
    if (m) return unescapeString(m[1]);

    m = scope.match(/"message0"\s*:\s*Blockly\.Msg\.\w+\s*\|\|\s*'((?:[^'\\]|\\.)*)'/);
    if (m) return unescapeString(m[1]);

    // Direct string without Blockly.Msg
    m = scope.match(/"message0"\s*:\s*"((?:[^"\\]|\\.)*)"/);
    if (m) return unescapeString(m[1]);

    return null;
}

/**
 * Find the block scope starting from an opening brace.
 * Returns the content between the matched braces.
 */
function findBlockScope(content, openBracePos) {
    let depth = 0;
    let started = false;
    for (let i = openBracePos; i < Math.min(content.length, openBracePos + 10000); i++) {
        if (content[i] === '{') {
            depth++;
            started = true;
        } else if (content[i] === '}') {
            depth--;
            if (started && depth === 0) {
                return content.substring(openBracePos, i + 1);
            }
        }
    }
    return null;
}

/**
 * Unescape common JS string escapes
 */
function unescapeString(str) {
    return str
        .replace(/\\n/g, '\n')
        .replace(/\\t/g, '\t')
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'")
        .replace(/\\\\/g, '\\');
}

/**
 * Clean message0 text for use as block_label.
 * Remove format placeholders like %1, %2 and emoji prefixes, trim whitespace.
 */
function cleanMessage0(msg) {
    return msg
        .replace(/%\d+/g, '')   // Remove %1, %2, etc.
        .replace(/\s+/g, ' ')   // Collapse whitespace
        .trim();
}


// ============================================================
// 2. Extract generator comments from generator files
// ============================================================

function extractGeneratorComments(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Match Arduino.forBlock['block_type']
        const blockMatch = line.match(/Arduino\.forBlock\['([^']+)'\]/);
        if (!blockMatch) continue;

        const blockType = blockMatch[1];
        let comment = '';

        // Check for comment on same line after opening brace
        const sameLine = line.match(/\{[^\n]*\/\/\s*(.+)/);
        if (sameLine) {
            comment = sameLine[1].trim();
        }

        // If no same-line comment, look at previous lines for comments
        if (!comment) {
            let commentLines = [];
            for (let j = i - 1; j >= Math.max(0, i - 5); j--) {
                const prevLine = lines[j].trim();
                if (prevLine.startsWith('//')) {
                    commentLines.unshift(prevLine.replace(/^\/\/\s*/, ''));
                } else if (prevLine === '' || prevLine === '{') {
                    continue;
                } else {
                    break;
                }
            }
            if (commentLines.length > 0) {
                comment = commentLines.join(' ').trim();
            }
        }

        // Clean the comment
        comment = cleanGeneratorComment(comment);

        if (comment && comment.length > 1) {
            if (!result[blockType]) {
                result[blockType] = {};
            }
            // Only set if not already set (same-line comment takes priority)
            if (!result[blockType].generator_comment) {
                result[blockType].generator_comment = comment;
            }
        }
    }
}

/**
 * Clean generator comment by removing section headers and separator noise.
 *
 * Examples of noise to remove:
 * - "============================== 1. 메인 카테고리 =========="
 * - "===== 코드 생성 함수 (Arduino C++) ====="
 * - "-------- DFRobot_PH 코드 생성기 --------"
 * - "===================== IR 적외선 송신/수신 Generators ====================="
 *
 * Keep only the meaningful description part.
 */
function cleanGeneratorComment(comment) {
    if (!comment) return '';

    // Split on separator patterns (sequences of = or -)
    // Then keep only the parts that have meaningful content
    const parts = comment.split(/[=\-]{3,}/);

    // Filter and clean parts
    const meaningful = parts
        .map(p => p.trim())
        .filter(p => {
            if (!p) return false;
            // Skip generic category headers like "1. 메인 카테고리", "13. 모터 카테고리"
            if (/^\d+\.\s*(메인|핀제어|제어|논리|수학|텍스트|색상|변수|함수|리스트|디스플레이|센서|모터|출력장치|통신|유틸|안내|플래그)\s*카테고리\s*$/.test(p)) return false;
            // Skip pure category header variations
            if (/^[A-Z]\.\s*(일반|고급|기본)?(센서|디스플레이)\s*카테고리\s*$/.test(p)) return false;
            // Skip generic "코드 생성 함수" headers
            if (/^코드 생성 함수\s*\(.*?\)\s*$/.test(p)) return false;
            if (/^index\.html 순서에 맞춰 재정렬됨$/.test(p)) return false;
            // Skip pure numbering like "1." without meaningful content
            if (/^\d+\.\s*$/.test(p)) return false;
            return true;
        });

    if (meaningful.length === 0) return '';

    // Take the last meaningful part (most specific description)
    // But if there's a short specific description, prefer it
    let best = '';
    for (const part of meaningful) {
        // Prefer parts that look like actual descriptions (not section titles)
        if (part.length > 1) {
            best = part;
        }
    }

    // Clean up residual prefixes like "17. " at the start
    best = best.replace(/^\d+[\.\)]\s*/, '').trim();

    // If still too noisy (has remaining separator-like patterns), clean further
    best = best.replace(/^\s*[=\-]+\s*/, '').replace(/\s*[=\-]+\s*$/, '').trim();

    return best;
}


// ============================================================
// Main execution
// ============================================================

// Read all block definition JS files
const blockFiles = fs.readdirSync(BLOCKS_DIR)
    .filter(f => f.endsWith('.js'))
    .map(f => path.join(BLOCKS_DIR, f));

for (const file of blockFiles) {
    console.log('Processing block file:', path.basename(file));
    extractTooltipsFromFile(file);
}

// Read all generator files
const generatorFiles = fs.readdirSync(GENERATORS_DIR)
    .filter(f => f.endsWith('.js'))
    .map(f => path.join(GENERATORS_DIR, f));

for (const file of generatorFiles) {
    console.log('Processing generator file:', path.basename(file));
    extractGeneratorComments(file);
}

// ============================================================
// Sort, validate, and write output
// ============================================================

const sorted = {};
const keys = Object.keys(result).sort();

let tooltipCount = 0;
let commentCount = 0;
let labelCount = 0;

for (const key of keys) {
    sorted[key] = {};
    if (result[key].tooltip) {
        sorted[key].tooltip = result[key].tooltip;
        tooltipCount++;
    }
    if (result[key].block_label) {
        sorted[key].block_label = result[key].block_label;
        labelCount++;
    }
    if (result[key].generator_comment) {
        sorted[key].generator_comment = result[key].generator_comment;
        commentCount++;
    }
    // Remove empty entries
    if (Object.keys(sorted[key]).length === 0) {
        delete sorted[key];
    }
}

const totalEntries = Object.keys(sorted).length;

fs.writeFileSync(OUTPUT, JSON.stringify(sorted, null, 2), 'utf-8');
console.log(`\nDone! Extracted ${totalEntries} block entries.`);
console.log(`  - ${tooltipCount} with tooltips`);
console.log(`  - ${labelCount} with block labels (message0)`);
console.log(`  - ${commentCount} with generator comments`);
console.log(`Output: ${OUTPUT}`);
