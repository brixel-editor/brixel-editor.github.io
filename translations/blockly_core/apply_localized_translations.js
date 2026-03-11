const fs = require('fs');
const path = require('path');

const translationDir = 'd:/00_backup_Brixel WebEditor/Blockcoding_WebIDE_Project_V24_ESP32cam_mirror/translations/blockly_core';

const translations = {
    "ar": { "BKY_ESP32CAM_FLIP": "📷 إعداد شاشة الكاميرا النوع %1 التفعيل %2", "BKY_ESP32CAM_FLIP_TOOLTIP": "قلب أو عينة صورة الكاميرا.", "BKY_ESP32CAM_FLIP_TYPE_VFLIP": "قلب عمودي", "BKY_ESP32CAM_FLIP_TYPE_HMIRROR": "مرآة أفقية", "BKY_ESP32CAM_FLIP_ENABLE_ON": "تشغيل", "BKY_ESP32CAM_FLIP_ENABLE_OFF": "إيقاف" },
    "de": { "BKY_ESP32CAM_FLIP": "📷 Kamerabildschirmeinstellung Typ %1 Aktivieren %2", "BKY_ESP32CAM_FLIP_TOOLTIP": "Kamerabild spiegeln oder umdrehen.", "BKY_ESP32CAM_FLIP_TYPE_VFLIP": "Vertikal spiegeln", "BKY_ESP32CAM_FLIP_TYPE_HMIRROR": "Horizontal spiegeln", "BKY_ESP32CAM_FLIP_ENABLE_ON": "An", "BKY_ESP32CAM_FLIP_ENABLE_OFF": "Aus" },
    "es": { "BKY_ESP32CAM_FLIP": "📷 Configuración de pantalla de cámara Tipo %1 Habilitar %2", "BKY_ESP32CAM_FLIP_TOOLTIP": "Voltear o reflejar la imagen de la cámara.", "BKY_ESP32CAM_FLIP_TYPE_VFLIP": "Volteo vertical", "BKY_ESP32CAM_FLIP_TYPE_HMIRROR": "Espejo horizontal", "BKY_ESP32CAM_FLIP_ENABLE_ON": "Encendido", "BKY_ESP32CAM_FLIP_ENABLE_OFF": "Apagado" },
    "fa": { "BKY_ESP32CAM_FLIP": "📷 تنظیمات صفحه دوربین نوع %1 فعال‌سازی %2", "BKY_ESP32CAM_FLIP_TOOLTIP": "چرخش یا آینه‌ای کردن تصویر دوربین.", "BKY_ESP32CAM_FLIP_TYPE_VFLIP": "چرخش عمودی", "BKY_ESP32CAM_FLIP_TYPE_HMIRROR": "آینه افقی", "BKY_ESP32CAM_FLIP_ENABLE_ON": "روشن", "BKY_ESP32CAM_FLIP_ENABLE_OFF": "خاموش" },
    "fil": { "BKY_ESP32CAM_FLIP": "📷 Setting ng Screen ng Camera Uri %1 Paganahin %2", "BKY_ESP32CAM_FLIP_TOOLTIP": "I-flip o i-mirror ang imahe ng camera.", "BKY_ESP32CAM_FLIP_TYPE_VFLIP": "Vertical Flip", "BKY_ESP32CAM_FLIP_TYPE_HMIRROR": "Horizontal Mirror", "BKY_ESP32CAM_FLIP_ENABLE_ON": "Buhay", "BKY_ESP32CAM_FLIP_ENABLE_OFF": "Patay" },
    "fr": { "BKY_ESP32CAM_FLIP": "📷 Paramètres de l'écran de la caméra Type %1 Activer %2", "BKY_ESP32CAM_FLIP_TOOLTIP": "Retourner ou inverser l'image de la caméra.", "BKY_ESP32CAM_FLIP_TYPE_VFLIP": "Retournement vertical", "BKY_ESP32CAM_FLIP_TYPE_HMIRROR": "Miroir horizontal", "BKY_ESP32CAM_FLIP_ENABLE_ON": "Marche", "BKY_ESP32CAM_FLIP_ENABLE_OFF": "Arrêt" },
    "hi": { "BKY_ESP32CAM_FLIP": "📷 कैमरा स्क्रीन सेटिंग प्रकार %1 सक्षम करें %2", "BKY_ESP32CAM_FLIP_TOOLTIP": "कैमरा छवि को पलटें या दर्पण करें।", "BKY_ESP32CAM_FLIP_TYPE_VFLIP": "लंबवत पलटें", "BKY_ESP32CAM_FLIP_TYPE_HMIRROR": "क्षैतिज दर्पण", "BKY_ESP32CAM_FLIP_ENABLE_ON": "चालू", "BKY_ESP32CAM_FLIP_ENABLE_OFF": "बंद" },
    "id": { "BKY_ESP32CAM_FLIP": "📷 Pengaturan Layar Kamera Tipe %1 Aktifkan %2", "BKY_ESP32CAM_FLIP_TOOLTIP": "Balik atau cerminkan gambar kamera.", "BKY_ESP32CAM_FLIP_TYPE_VFLIP": "Balik Vertikal", "BKY_ESP32CAM_FLIP_TYPE_HMIRROR": "Cermin Horizontal", "BKY_ESP32CAM_FLIP_ENABLE_ON": "Hidup", "BKY_ESP32CAM_FLIP_ENABLE_OFF": "Mati" },
    "it": { "BKY_ESP32CAM_FLIP": "📷 Impostazione Schermo Fotocamera Tipo %1 Abilita %2", "BKY_ESP32CAM_FLIP_TOOLTIP": "Capovolgi o specchia l'immagine della fotocamera.", "BKY_ESP32CAM_FLIP_TYPE_VFLIP": "Capovolgimento Verticale", "BKY_ESP32CAM_FLIP_TYPE_HMIRROR": "Specchio Orizzontale", "BKY_ESP32CAM_FLIP_ENABLE_ON": "On", "BKY_ESP32CAM_FLIP_ENABLE_OFF": "Off" },
    "ja": { "BKY_ESP32CAM_FLIP": "📷 カメラ画面設定 タイプ %1 有効化 %2", "BKY_ESP32CAM_FLIP_TOOLTIP": "カメラ画像を反転または鏡像にします。", "BKY_ESP32CAM_FLIP_TYPE_VFLIP": "垂直反転", "BKY_ESP32CAM_FLIP_TYPE_HMIRROR": "水平鏡像", "BKY_ESP32CAM_FLIP_ENABLE_ON": "オン", "BKY_ESP32CAM_FLIP_ENABLE_OFF": "オフ" },
    "nl": { "BKY_ESP32CAM_FLIP": "📷 Camerascherm Instelling Type %1 Inschakelen %2", "BKY_ESP32CAM_FLIP_TOOLTIP": "Draai of spiegel het camerabeeld.", "BKY_ESP32CAM_FLIP_TYPE_VFLIP": "Verticaal Spiegelen", "BKY_ESP32CAM_FLIP_TYPE_HMIRROR": "Horizontaal Spiegelen", "BKY_ESP32CAM_FLIP_ENABLE_ON": "Aan", "BKY_ESP32CAM_FLIP_ENABLE_OFF": "Uit" },
    "pl": { "BKY_ESP32CAM_FLIP": "📷 Ustawienia Ekranu Kamery Typ %1 Włącz %2", "BKY_ESP32CAM_FLIP_TOOLTIP": "Odwróć lub odbij obraz z kamery.", "BKY_ESP32CAM_FLIP_TYPE_VFLIP": "Odbicie Pionowe", "BKY_ESP32CAM_FLIP_TYPE_HMIRROR": "Odbicie Poziome", "BKY_ESP32CAM_FLIP_ENABLE_ON": "Wł.", "BKY_ESP32CAM_FLIP_ENABLE_OFF": "Wył." },
    "pt": { "BKY_ESP32CAM_FLIP": "📷 Configuração da Tela da Câmera Tipo %1 Ativar %2", "BKY_ESP32CAM_FLIP_TOOLTIP": "Inverter ou espelhar a imagem da câmera.", "BKY_ESP32CAM_FLIP_TYPE_VFLIP": "Inversão Vertical", "BKY_ESP32CAM_FLIP_TYPE_HMIRROR": "Espelho Horizontal", "BKY_ESP32CAM_FLIP_ENABLE_ON": "Ligado", "BKY_ESP32CAM_FLIP_ENABLE_OFF": "Desligado" },
    "ru": { "BKY_ESP32CAM_FLIP": "📷 Настройка экрана камеры Тип %1 Включить %2", "BKY_ESP32CAM_FLIP_TOOLTIP": "Перевернуть или отзеркалить изображение камеры.", "BKY_ESP32CAM_FLIP_TYPE_VFLIP": "Вертикальное отражение", "BKY_ESP32CAM_FLIP_TYPE_HMIRROR": "Горизонтальное зеркало", "BKY_ESP32CAM_FLIP_ENABLE_ON": "Вкл", "BKY_ESP32CAM_FLIP_ENABLE_OFF": "Выкл" },
    "sv": { "BKY_ESP32CAM_FLIP": "📷 Kameraskärminställning Typ %1 Aktivera %2", "BKY_ESP32CAM_FLIP_TOOLTIP": "Vänd eller spegla kamerabilden.", "BKY_ESP32CAM_FLIP_TYPE_VFLIP": "Vertikal Vändning", "BKY_ESP32CAM_FLIP_TYPE_HMIRROR": "Horisontell Spegel", "BKY_ESP32CAM_FLIP_ENABLE_ON": "På", "BKY_ESP32CAM_FLIP_ENABLE_OFF": "Av" },
    "th": { "BKY_ESP32CAM_FLIP": "📷 การตั้งค่าหน้าจอกล้อง ประเภท %1 เปิดใช้งาน %2", "BKY_ESP32CAM_FLIP_TOOLTIP": "พลิกหรือสะท้อนภาพกล้อง", "BKY_ESP32CAM_FLIP_TYPE_VFLIP": "พลิกแนวตั้ง", "BKY_ESP32CAM_FLIP_TYPE_HMIRROR": "กระจกเงาแนวนอน", "BKY_ESP32CAM_FLIP_ENABLE_ON": "เปิด", "BKY_ESP32CAM_FLIP_ENABLE_OFF": "ปิด" },
    "tr": { "BKY_ESP32CAM_FLIP": "📷 Kamera Ekran Ayarı Tür %1 Etkinleştir %2", "BKY_ESP32CAM_FLIP_TOOLTIP": "Kamera görüntüsünü çevir veya aynala.", "BKY_ESP32CAM_FLIP_TYPE_VFLIP": "Dikey Çevirme", "BKY_ESP32CAM_FLIP_TYPE_HMIRROR": "Yatay Aynalama", "BKY_ESP32CAM_FLIP_ENABLE_ON": "Açık", "BKY_ESP32CAM_FLIP_ENABLE_OFF": "Kapalı" },
    "uz": { "BKY_ESP32CAM_FLIP": "📷 Kamera Ekrani Sozlamasi Tur %1 Yoqish %2", "BKY_ESP32CAM_FLIP_TOOLTIP": "Kamera tasvirini burish yoki ko'zgulash.", "BKY_ESP32CAM_FLIP_TYPE_VFLIP": "Vertikal Burish", "BKY_ESP32CAM_FLIP_TYPE_HMIRROR": "Gorizontal Ko'zgu", "BKY_ESP32CAM_FLIP_ENABLE_ON": "Yoqish", "BKY_ESP32CAM_FLIP_ENABLE_OFF": "O'chirish" },
    "vi": { "BKY_ESP32CAM_FLIP": "📷 Cài đặt màn hình máy ảnh Loại %1 Bật %2", "BKY_ESP32CAM_FLIP_TOOLTIP": "Lật hoặc phản chiếu hình ảnh máy ảnh.", "BKY_ESP32CAM_FLIP_TYPE_VFLIP": "Lật dọc", "BKY_ESP32CAM_FLIP_TYPE_HMIRROR": "Gương ngang", "BKY_ESP32CAM_FLIP_ENABLE_ON": "Bật", "BKY_ESP32CAM_FLIP_ENABLE_OFF": "Tắt" },
    "zh-tw": { "BKY_ESP32CAM_FLIP": "📷 相機畫面設定 類型 %1 啟用 %2", "BKY_ESP32CAM_FLIP_TOOLTIP": "翻轉或鏡像相機影像。", "BKY_ESP32CAM_FLIP_TYPE_VFLIP": "垂直翻轉", "BKY_ESP32CAM_FLIP_TYPE_HMIRROR": "水平鏡像", "BKY_ESP32CAM_FLIP_ENABLE_ON": "開啟", "BKY_ESP32CAM_FLIP_ENABLE_OFF": "關閉" },
    "zh": { "BKY_ESP32CAM_FLIP": "📷 相机屏幕设置 类型 %1 启用 %2", "BKY_ESP32CAM_FLIP_TOOLTIP": "翻转或镜像相机图像。", "BKY_ESP32CAM_FLIP_TYPE_VFLIP": "垂直翻转", "BKY_ESP32CAM_FLIP_TYPE_HMIRROR": "水平镜像", "BKY_ESP32CAM_FLIP_ENABLE_ON": "开启", "BKY_ESP32CAM_FLIP_ENABLE_OFF": "关闭" }
};

try {
    const files = fs.readdirSync(translationDir).filter(file => file.endsWith('.json'));

    files.forEach(file => {
        // Extract language code from filename (e.g., 'blockly_en.json' -> 'en', 'blockly_zh-tw.json' -> 'zh-tw')
        const match = file.match(/blockly_(.+)\.json/);
        if (!match) return;

        let langCode = match[1];

        if (translations[langCode]) {
            const filePath = path.join(translationDir, file);
            try {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                let json = JSON.parse(fileContent);
                let updated = false;

                // Update keys
                for (const [key, value] of Object.entries(translations[langCode])) {
                    if (json[key] !== value) {
                        json[key] = value;
                        updated = true;
                    }
                }

                if (updated) {
                    fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
                    console.log(`Updated translations for ${langCode} in ${file}`);
                } else {
                    console.log(`No changes needed for ${langCode}`);
                }

            } catch (err) {
                console.error(`Error processing ${file}:`, err.message);
            }
        }
    });

} catch (err) {
    console.error('Fatal error:', err);
}
