#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import os

# All 21 language files
languages = [
    ("ja", "Japanese"),
    ("zh", "Chinese Simplified"),
    ("zh-tw", "Chinese Traditional"),
    ("ko", "Korean"),
    ("en", "English"),
    ("fr", "French"),
    ("de", "German"),
    ("es", "Spanish"),
    ("hi", "Hindi"),
    ("ru", "Russian"),
    ("it", "Italian"),
    ("pt", "Portuguese"),
    ("ar", "Arabic"),
    ("th", "Thai"),
    ("vi", "Vietnamese"),
    ("id", "Indonesian"),
    ("fil", "Filipino"),
    ("tr", "Turkish"),
    ("pl", "Polish"),
    ("nl", "Dutch"),
    ("sv", "Swedish"),
    ("fa", "Persian"),
    ("uz", "Uzbek")
]

# Key prefixes to check
key_prefixes = ["BKY_WIFI_", "BKY_WEBBLE_", "BKY_SERIAL_", "BKY_ESP32CAM_"]

print("=" * 80)
print("Translation Verification Report")
print("=" * 80)
print()

base_path = "translations/ui_i18n"
total_complete = 0
total_incomplete = 0

for lang_code, lang_name in languages:
    file_path = os.path.join(base_path, f"ui_{lang_code}.json")

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # Count keys for each category
        counts = {prefix: 0 for prefix in key_prefixes}
        for key in data.keys():
            for prefix in key_prefixes:
                if key.startswith(prefix):
                    counts[prefix] += 1

        total_keys = sum(counts.values())

        # Check if complete (should have at least 91 keys)
        status = "[OK]" if total_keys >= 91 else "[INCOMPLETE]"

        if total_keys >= 91:
            total_complete += 1
        else:
            total_incomplete += 1

        print(f"{status} {lang_code:6s} ({lang_name:20s}): {total_keys:3d} keys")
        print(f"        WiFi: {counts['BKY_WIFI_']:2d} | WebBLE: {counts['BKY_WEBBLE_']:2d} | Serial: {counts['BKY_SERIAL_']:2d} | ESP32CAM: {counts['BKY_ESP32CAM_']:2d}")
        print()

    except FileNotFoundError:
        print(f"[ERR] {lang_code:6s} ({lang_name:20s}): File not found")
        print()
        total_incomplete += 1
    except json.JSONDecodeError as e:
        print(f"[ERR] {lang_code:6s} ({lang_name:20s}): JSON error - {e}")
        print()
        total_incomplete += 1

print("=" * 80)
print(f"Summary: {total_complete}/21 languages complete, {total_incomplete} incomplete")
print("=" * 80)
