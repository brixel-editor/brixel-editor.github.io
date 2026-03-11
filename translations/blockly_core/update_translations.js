const fs = require('fs');
const path = require('path');

const translationDir = 'd:/00_backup_Brixel WebEditor/Blockcoding_WebIDE_Project_V24_ESP32cam_mirror/translations/blockly_core';
const enFilePath = path.join(translationDir, 'blockly_en.json');

// Keys to copy from English to other languages
const keysToAdd = [
    "BKY_ESP32CAM_FLIP",
    "BKY_ESP32CAM_FLIP_TOOLTIP",
    "BKY_ESP32CAM_FLIP_TYPE_VFLIP",
    "BKY_ESP32CAM_FLIP_TYPE_HMIRROR",
    "BKY_ESP32CAM_FLIP_ENABLE_ON",
    "BKY_ESP32CAM_FLIP_ENABLE_OFF"
];

try {
    // Read English file
    const enContent = fs.readFileSync(enFilePath, 'utf8');
    const enJson = JSON.parse(enContent);

    // Extract values for the keys
    const newTranslations = {};
    keysToAdd.forEach(key => {
        if (enJson[key]) {
            newTranslations[key] = enJson[key];
        } else {
            console.warn(`Warning: Key '${key}' not found in English file.`);
        }
    });

    // Get list of all JSON files in the directory
    const files = fs.readdirSync(translationDir).filter(file => file.endsWith('.json') && file !== 'blockly_en.json');

    console.log(`Found ${files.length} files to update.`);

    files.forEach(file => {
        const filePath = path.join(translationDir, file);
        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            let json = JSON.parse(fileContent);

            let updated = false;
            // Add new keys if they don't exist
            for (const [key, value] of Object.entries(newTranslations)) {
                if (!json[key]) {
                    json[key] = value;
                    updated = true;
                }
            }

            if (updated) {
                // Write back to file with formatting
                fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
                console.log(`Updated ${file}`);
            } else {
                console.log(`Skipped ${file} (already has keys)`);
            }

        } catch (err) {
            console.error(`Error processing ${file}:`, err.message);
        }
    });

    console.log('Batch translation update completed.');

} catch (err) {
    console.error('Fatal error:', err);
}
