#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Add translations for WiFi, WebBLE, Serial, and ESP32CAM blocks to all language files
"""

import json
import os

# Base directory
base_dir = r"D:\00_backup_Brixel WebEditor_20251215\Blockcoding_WebIDE_Project_V21_serial_upgrade\translations\ui_i18n"

# Translation data for each language
translations = {
    "zh-tw": {
        "BKY_ESP32CAM_DECLARE": "📷 ESP32-CAM開發板啟動時",
        "BKY_ESP32CAM_DECLARE_TOOLTIP": "宣告ESP32-CAM的函式庫和變數。",
        "BKY_ESP32CAM_FRAMESIZE_HD": "HD (1280x720)",
        "BKY_ESP32CAM_FRAMESIZE_QVGA": "QVGA (320x240)",
        "BKY_ESP32CAM_FRAMESIZE_SVGA": "SVGA (800x600)",
        "BKY_ESP32CAM_FRAMESIZE_SXGA": "SXGA (1280x1024)",
        "BKY_ESP32CAM_FRAMESIZE_UXGA": "UXGA (1600x1200)",
        "BKY_ESP32CAM_FRAMESIZE_VGA": "VGA (640x480)",
        "BKY_ESP32CAM_FRAMESIZE_XGA": "XGA (1024x768)",
        "BKY_ESP32CAM_LABEL_CAMERA": "📷 攝影機",
        "BKY_ESP32CAM_LABEL_SETUP": "⚙️ ESP32-CAM設定",
        "BKY_ESP32CAM_LED_CONTROL": "💡 ESP32-CAM LED %1",
        "BKY_ESP32CAM_LED_CONTROL_TOOLTIP": "開啟或關閉內建閃光燈LED。(GPIO 4)",
        "BKY_ESP32CAM_LED_OFF": "關閉",
        "BKY_ESP32CAM_LED_ON": "開啟",
        "BKY_ESP32CAM_LOOP": "📡 透過UDP傳輸影像",
        "BKY_ESP32CAM_LOOP_TOOLTIP": "從攝影機擷取畫面並透過UDP傳送。",
        "BKY_ESP32CAM_RECEIVER_CONFIG": "📡 接收器設定 IP %1 連接埠 %2 區塊大小 %3",
        "BKY_ESP32CAM_RECEIVER_CONFIG_TOOLTIP": "設定UDP接收器的IP、連接埠和區塊大小。",
        "BKY_ESP32CAM_SETUP": "📷 攝影機初始化 畫面大小 %1 JPEG品質 %2 亮度 %3 對比度 %4 飽和度 %5",
        "BKY_ESP32CAM_SETUP_TOOLTIP": "連接WiFi並初始化攝影機。JPEG品質為10-63（數值越低品質越高）。",
        "BKY_ESP32CAM_WIFI_CONFIG": "📡 WiFi設定 SSID %1 密碼 %2",
        "BKY_ESP32CAM_WIFI_CONFIG_TOOLTIP": "設定WiFi連線的SSID和密碼。",
        "BKY_SERIAL_A": "串列埠A",
        "BKY_SERIAL_AVAILABLE": "📥有新訊息嗎?",
        "BKY_SERIAL_AVAILABLE_TOOLTIP": "檢查是否收到訊息",
        "BKY_SERIAL_B": "串列埠B",
        "BKY_SERIAL_BEGIN": "📡開始串列通訊 (RX:%1 TX:%2 鮑率:%3)",
        "BKY_SERIAL_BEGIN_TOOLTIP": "腳位0,1使用硬體串列埠，其他腳位自動使用軟體串列埠",
        "BKY_SERIAL_CONNECTED": "📡串列已連線?",
        "BKY_SERIAL_CONNECTED_TOOLTIP": "檢查串列連線狀態",
        "BKY_SERIAL_FLUSH": "📥清除接收資料",
        "BKY_SERIAL_FLUSH_TOOLTIP": "清空接收緩衝區",
        "BKY_SERIAL_HARD": "硬體串列埠",
        "BKY_SERIAL_HARD1": "硬體串列埠1",
        "BKY_SERIAL_HARD2": "硬體串列埠2",
        "BKY_SERIAL_PARSE_DELIMITER": "🔍用 %1 解析接收的資料",
        "BKY_SERIAL_PARSE_DELIMITER_TOOLTIP": "用分隔符號解析接收的資料並內部儲存",
        "BKY_SERIAL_POLL": "🔄輪詢串列資料",
        "BKY_SERIAL_POLL_TOOLTIP": "必須放在Loop函式的頂部！這是非阻塞接收的核心",
        "BKY_SERIAL_PRINT": "📤傳送 %1 (換行 %2)",
        "BKY_SERIAL_PRINT_CONTINUOUS": "📤持續傳送 %1 (換行 %2)",
        "BKY_SERIAL_PRINT_CONTINUOUS_TOOLTIP": "每次迴圈都傳送資料",
        "BKY_SERIAL_PRINT_MULTI": "📤傳送多個資料: %1 (CSV)",
        "BKY_SERIAL_PRINT_MULTI_TOOLTIP": "用逗號分隔傳送多個值",
        "BKY_SERIAL_PRINT_TOOLTIP": "透過串列埠傳送資料",
        "BKY_SERIAL_READ_RAW": "📥接收的資料 (原始)",
        "BKY_SERIAL_READ_RAW_TOOLTIP": "傳回接收到的原始資料",
        "BKY_SERIAL_SEND_CHANGE": "📤僅在 %1 改變時傳送",
        "BKY_SERIAL_SEND_CHANGE_TOOLTIP": "僅在值與上次不同時傳送（感測器資料傳輸最佳化）",
        "BKY_SERIAL_SEND_KEY_VAL": "📤名稱: %1 值: %2 傳送 (換行 %3)",
        "BKY_SERIAL_SEND_KEY_VAL_TOOLTIP": "以鍵:值格式傳送資料",
        "BKY_SERIAL_SOFT": "軟體串列埠",
        "BKY_WEBBLE_AVAILABLE": "有網路藍牙訊息嗎?",
        "BKY_WEBBLE_AVAILABLE_TIP": "檢查是否透過網路藍牙接收到資料。",
        "BKY_WEBBLE_CONNECTED": "網路藍牙已連線?",
        "BKY_WEBBLE_CONNECTED_TIP": "檢查網路藍牙連線狀態。",
        "BKY_WEBBLE_GET_VALUE": "第 %1 個解析的網路藍牙值",
        "BKY_WEBBLE_GET_VALUE_TIP": "從解析的資料中取得指定索引的值並作為字串傳回。",
        "BKY_WEBBLE_PARSE": "用 %1 解析接收的網路藍牙資料",
        "BKY_WEBBLE_PARSE_TIP": "用分隔符號（如逗號）解析接收的資料並儲存。",
        "BKY_WEBBLE_READ": "透過網路藍牙接收的訊息",
        "BKY_WEBBLE_READ_TIP": "讀取透過網路藍牙接收的資料。",
        "BKY_WEBBLE_SETUP": "網路藍牙設定 名稱 %1",
        "BKY_WEBBLE_SETUP_TIP": "初始化內建藍牙並設定裝置名稱。（Scratch相容）",
        "BKY_WEBBLE_WRITE": "透過網路藍牙傳送 %1",
        "BKY_WEBBLE_WRITE_TIP": "透過網路藍牙傳送資料。",
        "BKY_WIFI_IS_CONNECTED": "WiFi已連線?",
        "BKY_WIFI_IS_CONNECTED_TIP": "檢查WiFi連線狀態。",
        "BKY_WIFI_LOCAL_IP": "WiFi本地IP位址",
        "BKY_WIFI_LOCAL_IP_TIP": "傳回開發板的本地IP位址。",
        "BKY_WIFI_SETUP": "WiFi設定 SSID %1 密碼 %2",
        "BKY_WIFI_SETUP_TIP": "連線到WiFi網路。",
        "BKY_WIFI_WS_AVAILABLE": "有WebSocket訊息嗎?",
        "BKY_WIFI_WS_AVAILABLE_TIP": "檢查是否接收到新的WebSocket訊息。",
        "BKY_WIFI_WS_READ": "讀取WebSocket訊息",
        "BKY_WIFI_WS_READ_TIP": "讀取最新的WebSocket訊息。",
        "BKY_WIFI_WS_SEND": "透過WebSocket傳送 %1 (帶換行)",
        "BKY_WIFI_WS_SEND_LABEL_VALUE": "透過WebSocket傳送 標籤 %1 值 %2",
        "BKY_WIFI_WS_SEND_LABEL_VALUE_TIP": "以'標籤:值'格式傳送資料。",
        "BKY_WIFI_WS_SEND_RAW": "透過WebSocket傳送 %1 (原始)",
        "BKY_WIFI_WS_SEND_RAW_TIP": "透過WebSocket傳送原始資料（不帶換行）。",
        "BKY_WIFI_WS_SEND_TIP": "透過WebSocket傳送資料並新增換行符號。",
        "BKY_WIFI_WS_SERVER_SETUP": "啟動WebSocket伺服器 連接埠 %1",
        "BKY_WIFI_WS_SERVER_SETUP_TIP": "在指定連接埠上啟動WebSocket伺服器。"
    },
    "es": {
        "BKY_ESP32CAM_DECLARE": "📷 Cuando se inicia la placa ESP32-CAM",
        "BKY_ESP32CAM_DECLARE_TOOLTIP": "Declara bibliotecas y variables para ESP32-CAM.",
        "BKY_ESP32CAM_FRAMESIZE_HD": "HD (1280x720)",
        "BKY_ESP32CAM_FRAMESIZE_QVGA": "QVGA (320x240)",
        "BKY_ESP32CAM_FRAMESIZE_SVGA": "SVGA (800x600)",
        "BKY_ESP32CAM_FRAMESIZE_SXGA": "SXGA (1280x1024)",
        "BKY_ESP32CAM_FRAMESIZE_UXGA": "UXGA (1600x1200)",
        "BKY_ESP32CAM_FRAMESIZE_VGA": "VGA (640x480)",
        "BKY_ESP32CAM_FRAMESIZE_XGA": "XGA (1024x768)",
        "BKY_ESP32CAM_LABEL_CAMERA": "📷 Cámara",
        "BKY_ESP32CAM_LABEL_SETUP": "⚙️ Configuración ESP32-CAM",
        "BKY_ESP32CAM_LED_CONTROL": "💡 ESP32-CAM LED %1",
        "BKY_ESP32CAM_LED_CONTROL_TOOLTIP": "Enciende o apaga el LED flash integrado. (GPIO 4)",
        "BKY_ESP32CAM_LED_OFF": "Apagado",
        "BKY_ESP32CAM_LED_ON": "Encendido",
        "BKY_ESP32CAM_LOOP": "📡 Transmitir imagen vía UDP",
        "BKY_ESP32CAM_LOOP_TOOLTIP": "Captura un fotograma de la cámara y lo envía vía UDP.",
        "BKY_ESP32CAM_RECEIVER_CONFIG": "📡 Configuración receptor IP %1 Puerto %2 Tamaño fragmento %3",
        "BKY_ESP32CAM_RECEIVER_CONFIG_TOOLTIP": "Establece IP, puerto y tamaño de fragmento del receptor UDP.",
        "BKY_ESP32CAM_SETUP": "📷 Inicializar cámara Tamaño %1 Calidad JPEG %2 Brillo %3 Contraste %4 Saturación %5",
        "BKY_ESP32CAM_SETUP_TOOLTIP": "Conecta a WiFi e inicializa la cámara. Calidad JPEG: 10-63 (menor es mejor).",
        "BKY_ESP32CAM_WIFI_CONFIG": "📡 Configuración WiFi SSID %1 Contraseña %2",
        "BKY_ESP32CAM_WIFI_CONFIG_TOOLTIP": "Establece SSID y contraseña para la conexión WiFi.",
        "BKY_SERIAL_A": "Serie A",
        "BKY_SERIAL_AVAILABLE": "📥¿Hay mensaje nuevo disponible?",
        "BKY_SERIAL_AVAILABLE_TOOLTIP": "Verifica si se ha recibido un mensaje",
        "BKY_SERIAL_B": "Serie B",
        "BKY_SERIAL_BEGIN": "📡Iniciar Serial (RX:%1 TX:%2 Baudios:%3)",
        "BKY_SERIAL_BEGIN_TOOLTIP": "Pines 0,1 usan serial por hardware, otros usan serial por software automáticamente",
        "BKY_SERIAL_CONNECTED": "📡¿Serial conectado?",
        "BKY_SERIAL_CONNECTED_TOOLTIP": "Verifica si la conexión serial está establecida",
        "BKY_SERIAL_FLUSH": "📥Borrar datos recibidos",
        "BKY_SERIAL_FLUSH_TOOLTIP": "Limpia el búfer de recepción",
        "BKY_SERIAL_HARD": "Serial por hardware",
        "BKY_SERIAL_HARD1": "Serial por hardware 1",
        "BKY_SERIAL_HARD2": "Serial por hardware 2",
        "BKY_SERIAL_PARSE_DELIMITER": "🔍Analizar datos recibidos con %1",
        "BKY_SERIAL_PARSE_DELIMITER_TOOLTIP": "Analiza los datos recibidos con delimitador y almacena internamente",
        "BKY_SERIAL_POLL": "🔄Sondear datos seriales",
        "BKY_SERIAL_POLL_TOOLTIP": "¡Debe colocarse al inicio de Loop! Esencial para recepción no bloqueante",
        "BKY_SERIAL_PRINT": "📤Enviar %1 (nueva línea %2)",
        "BKY_SERIAL_PRINT_CONTINUOUS": "📤Seguir enviando %1 (nueva línea %2)",
        "BKY_SERIAL_PRINT_CONTINUOUS_TOOLTIP": "Transmite datos continuamente en cada bucle",
        "BKY_SERIAL_PRINT_MULTI": "📤Enviar múltiples datos: %1 (CSV)",
        "BKY_SERIAL_PRINT_MULTI_TOOLTIP": "Envía varios valores separados por comas",
        "BKY_SERIAL_PRINT_TOOLTIP": "Transmite datos vía serial",
        "BKY_SERIAL_READ_RAW": "📥Datos recibidos (sin procesar)",
        "BKY_SERIAL_READ_RAW_TOOLTIP": "Devuelve los datos sin procesar recibidos",
        "BKY_SERIAL_SEND_CHANGE": "📤Enviar %1 solo cuando cambie",
        "BKY_SERIAL_SEND_CHANGE_TOOLTIP": "Transmite solo cuando el valor difiere del anterior (optimizado para datos de sensores)",
        "BKY_SERIAL_SEND_KEY_VAL": "📤Nombre: %1 Valor: %2 Enviar (nueva línea %3)",
        "BKY_SERIAL_SEND_KEY_VAL_TOOLTIP": "Transmite datos en formato clave:valor",
        "BKY_SERIAL_SOFT": "Serial por software",
        "BKY_WEBBLE_AVAILABLE": "¿Mensaje Web BLE disponible?",
        "BKY_WEBBLE_AVAILABLE_TIP": "Verifica si se han recibido datos vía Web BLE.",
        "BKY_WEBBLE_CONNECTED": "¿Web BLE conectado?",
        "BKY_WEBBLE_CONNECTED_TIP": "Verifica el estado de conexión Web BLE.",
        "BKY_WEBBLE_GET_VALUE": "Valor Web BLE analizado nº %1",
        "BKY_WEBBLE_GET_VALUE_TIP": "Recupera el valor en el índice especificado de los datos analizados como cadena.",
        "BKY_WEBBLE_PARSE": "Analizar datos Web BLE recibidos por %1",
        "BKY_WEBBLE_PARSE_TIP": "Analiza los datos recibidos con un delimitador (ej., coma) y los almacena.",
        "BKY_WEBBLE_READ": "Mensaje recibido vía Web BLE",
        "BKY_WEBBLE_READ_TIP": "Lee datos recibidos vía Web BLE.",
        "BKY_WEBBLE_SETUP": "Configuración Web BLE Nombre %1",
        "BKY_WEBBLE_SETUP_TIP": "Inicializa BLE integrado y establece nombre (compatible con Scratch).",
        "BKY_WEBBLE_WRITE": "Enviar %1 vía Web BLE",
        "BKY_WEBBLE_WRITE_TIP": "Transmite datos vía Web BLE.",
        "BKY_WIFI_IS_CONNECTED": "¿WiFi conectado?",
        "BKY_WIFI_IS_CONNECTED_TIP": "Verifica si WiFi está conectado.",
        "BKY_WIFI_LOCAL_IP": "Dirección IP local WiFi",
        "BKY_WIFI_LOCAL_IP_TIP": "Devuelve la dirección IP local de la placa.",
        "BKY_WIFI_SETUP": "Configurar WiFi SSID %1 Contraseña %2",
        "BKY_WIFI_SETUP_TIP": "Conecta a la red WiFi.",
        "BKY_WIFI_WS_AVAILABLE": "¿Mensaje WebSocket disponible?",
        "BKY_WIFI_WS_AVAILABLE_TIP": "Verifica si se ha recibido un nuevo mensaje WebSocket.",
        "BKY_WIFI_WS_READ": "Leer mensaje WebSocket",
        "BKY_WIFI_WS_READ_TIP": "Lee el último mensaje WebSocket.",
        "BKY_WIFI_WS_SEND": "Enviar WebSocket %1 (con nueva línea)",
        "BKY_WIFI_WS_SEND_LABEL_VALUE": "Enviar WebSocket Etiqueta %1 Valor %2",
        "BKY_WIFI_WS_SEND_LABEL_VALUE_TIP": "Envía datos en formato 'ETIQUETA:VALOR'.",
        "BKY_WIFI_WS_SEND_RAW": "Enviar WebSocket %1 (sin procesar)",
        "BKY_WIFI_WS_SEND_RAW_TIP": "Envía datos sin procesar vía WebSocket sin nueva línea.",
        "BKY_WIFI_WS_SEND_TIP": "Envía datos vía WebSocket seguidos de nueva línea.",
        "BKY_WIFI_WS_SERVER_SETUP": "Iniciar servidor WebSocket Puerto %1",
        "BKY_WIFI_WS_SERVER_SETUP_TIP": "Inicia un servidor WebSocket en el puerto especificado."
    }
}

# Continue with more languages...
# Due to length, I'll add remaining languages in separate blocks

def add_translations_to_file(lang_code, trans_dict):
    """Add translations to a specific language file"""
    file_path = os.path.join(base_dir, f"ui_{lang_code}.json")

    # Read existing file
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Add new translations
    data.update(trans_dict)

    # Write back to file
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"Added {len(trans_dict)} translations to {lang_code}")
    return len(trans_dict)

# Process each language
total_added = 0
for lang_code, trans_dict in translations.items():
    count = add_translations_to_file(lang_code, trans_dict)
    total_added += count

print(f"\nTotal translations added: {total_added}")
