const fs = require('fs');
const path = require('path');

const dir = __dirname;

const translations = {
  ko: {
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED": "\u{1F697} \ubaa8\ud130 \ub4dc\ub77c\uc774\ubc84 %1 A\ubc14\ud034 \ubc29\ud5a5 %2 \uc18d\ub3c4 %3 % \uc9c0\uc18d\uc2dc\uac04 %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED_TIP": "A\ubc14\ud034\ub97c \uc9c0\uc815\ub41c \uc2dc\uac04 \ub3d9\uc548 \uc81c\uc5b4\ud55c \ud6c4 \uc815\uc9c0\ud569\ub2c8\ub2e4. \ubc29\ud5a5: 0=\uc804\uc9c4, 1=\ud6c4\uc9c4. \uc18d\ub3c4: 0-100%. \uc2dc\uac04: ms \ub2e8\uc704.",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED": "\u{1F697} \ubaa8\ud130 \ub4dc\ub77c\uc774\ubc84 %1 B\ubc14\ud034 \ubc29\ud5a5 %2 \uc18d\ub3c4 %3 % \uc9c0\uc18d\uc2dc\uac04 %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED_TIP": "B\ubc14\ud034\ub97c \uc9c0\uc815\ub41c \uc2dc\uac04 \ub3d9\uc548 \uc81c\uc5b4\ud55c \ud6c4 \uc815\uc9c0\ud569\ub2c8\ub2e4. \ubc29\ud5a5: 0=\uc804\uc9c4, 1=\ud6c4\uc9c4. \uc18d\ub3c4: 0-100%. \uc2dc\uac04: ms \ub2e8\uc704."
  },
  en: {
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED": "\u{1F697} Motor Driver %1 Wheel A Direction %2 Speed %3 % Duration %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED_TIP": "Control wheel A for specified duration then stop. Direction: 0=Forward, 1=Backward. Speed: 0-100%. Duration in ms.",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED": "\u{1F697} Motor Driver %1 Wheel B Direction %2 Speed %3 % Duration %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED_TIP": "Control wheel B for specified duration then stop. Direction: 0=Forward, 1=Backward. Speed: 0-100%. Duration in ms."
  },
  ja: {
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED": "\u{1F697} \u30e2\u30fc\u30bf\u30fc\u30c9\u30e9\u30a4\u30d0\u30fc %1 \u30db\u30a4\u30fc\u30ebA \u65b9\u5411 %2 \u901f\u5ea6 %3 % \u6301\u7d9a\u6642\u9593 %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED_TIP": "\u30db\u30a4\u30fc\u30ebA\u3092\u6307\u5b9a\u6642\u9593\u5236\u5fa1\u3057\u305f\u5f8c\u505c\u6b62\u3057\u307e\u3059\u3002\u65b9\u5411: 0=\u524d\u9032\u30011=\u5f8c\u9000\u3002\u901f\u5ea6: 0-100%\u3002\u6642\u9593: ms\u5358\u4f4d\u3002",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED": "\u{1F697} \u30e2\u30fc\u30bf\u30fc\u30c9\u30e9\u30a4\u30d0\u30fc %1 \u30db\u30a4\u30fc\u30ebB \u65b9\u5411 %2 \u901f\u5ea6 %3 % \u6301\u7d9a\u6642\u9593 %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED_TIP": "\u30db\u30a4\u30fc\u30ebB\u3092\u6307\u5b9a\u6642\u9593\u5236\u5fa1\u3057\u305f\u5f8c\u505c\u6b62\u3057\u307e\u3059\u3002\u65b9\u5411: 0=\u524d\u9032\u30011=\u5f8c\u9000\u3002\u901f\u5ea6: 0-100%\u3002\u6642\u9593: ms\u5358\u4f4d\u3002"
  },
  zh: {
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED": "\u{1F697} \u7535\u673a\u9a71\u52a8\u5668 %1 \u8f6eA \u65b9\u5411 %2 \u901f\u5ea6 %3 % \u6301\u7eed\u65f6\u95f4 %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED_TIP": "\u63a7\u5236\u8f6eA\u5728\u6307\u5b9a\u65f6\u95f4\u5185\u8fd0\u884c\u540e\u505c\u6b62\u3002\u65b9\u5411\uff1a0=\u524d\u8fdb\uff0c1=\u540e\u9000\u3002\u901f\u5ea6\uff1a0-100%\u3002\u65f6\u95f4\uff1a\u6beb\u79d2\u3002",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED": "\u{1F697} \u7535\u673a\u9a71\u52a8\u5668 %1 \u8f6eB \u65b9\u5411 %2 \u901f\u5ea6 %3 % \u6301\u7eed\u65f6\u95f4 %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED_TIP": "\u63a7\u5236\u8f6eB\u5728\u6307\u5b9a\u65f6\u95f4\u5185\u8fd0\u884c\u540e\u505c\u6b62\u3002\u65b9\u5411\uff1a0=\u524d\u8fdb\uff0c1=\u540e\u9000\u3002\u901f\u5ea6\uff1a0-100%\u3002\u65f6\u95f4\uff1a\u6beb\u79d2\u3002"
  },
  "zh-tw": {
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED": "\u{1F697} \u99ac\u9054\u9a45\u52d5\u5668 %1 \u8f2aA \u65b9\u5411 %2 \u901f\u5ea6 %3 % \u6301\u7e8c\u6642\u9593 %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED_TIP": "\u63a7\u5236\u8f2aA\u5728\u6307\u5b9a\u6642\u9593\u5167\u904b\u884c\u5f8c\u505c\u6b62\u3002\u65b9\u5411\uff1a0=\u524d\u9032\uff0c1=\u5f8c\u9000\u3002\u901f\u5ea6\uff1a0-100%\u3002\u6642\u9593\uff1a\u6beb\u79d2\u3002",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED": "\u{1F697} \u99ac\u9054\u9a45\u52d5\u5668 %1 \u8f2aB \u65b9\u5411 %2 \u901f\u5ea6 %3 % \u6301\u7e8c\u6642\u9593 %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED_TIP": "\u63a7\u5236\u8f2aB\u5728\u6307\u5b9a\u6642\u9593\u5167\u904b\u884c\u5f8c\u505c\u6b62\u3002\u65b9\u5411\uff1a0=\u524d\u9032\uff0c1=\u5f8c\u9000\u3002\u901f\u5ea6\uff1a0-100%\u3002\u6642\u9593\uff1a\u6beb\u79d2\u3002"
  },
  de: {
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED": "\u{1F697} Motortreiber %1 Rad A Richtung %2 Geschwindigkeit %3 % Dauer %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED_TIP": "Rad A f\u00fcr die angegebene Dauer steuern und dann stoppen. Richtung: 0=Vorw\u00e4rts, 1=R\u00fcckw\u00e4rts. Geschwindigkeit: 0-100%. Dauer in ms.",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED": "\u{1F697} Motortreiber %1 Rad B Richtung %2 Geschwindigkeit %3 % Dauer %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED_TIP": "Rad B f\u00fcr die angegebene Dauer steuern und dann stoppen. Richtung: 0=Vorw\u00e4rts, 1=R\u00fcckw\u00e4rts. Geschwindigkeit: 0-100%. Dauer in ms."
  },
  es: {
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED": "\u{1F697} Motor %1 Rueda A Direcci\u00f3n %2 Velocidad %3 % Duraci\u00f3n %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED_TIP": "Controlar la rueda A durante el tiempo especificado y luego detener. Direcci\u00f3n: 0=Adelante, 1=Atr\u00e1s. Velocidad: 0-100%. Duraci\u00f3n en ms.",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED": "\u{1F697} Motor %1 Rueda B Direcci\u00f3n %2 Velocidad %3 % Duraci\u00f3n %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED_TIP": "Controlar la rueda B durante el tiempo especificado y luego detener. Direcci\u00f3n: 0=Adelante, 1=Atr\u00e1s. Velocidad: 0-100%. Duraci\u00f3n en ms."
  },
  fr: {
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED": "\u{1F697} Moteur %1 Roue A Direction %2 Vitesse %3 % Dur\u00e9e %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED_TIP": "Contr\u00f4ler la roue A pendant la dur\u00e9e sp\u00e9cifi\u00e9e puis arr\u00eater. Direction : 0=Avant, 1=Arri\u00e8re. Vitesse : 0-100%. Dur\u00e9e en ms.",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED": "\u{1F697} Moteur %1 Roue B Direction %2 Vitesse %3 % Dur\u00e9e %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED_TIP": "Contr\u00f4ler la roue B pendant la dur\u00e9e sp\u00e9cifi\u00e9e puis arr\u00eater. Direction : 0=Avant, 1=Arri\u00e8re. Vitesse : 0-100%. Dur\u00e9e en ms."
  },
  ar: {
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED": "\u{1F697} \u0645\u062d\u0631\u0643 %1 \u0627\u0644\u0639\u062c\u0644\u0629 A \u0627\u0644\u0627\u062a\u062c\u0627\u0647 %2 \u0627\u0644\u0633\u0631\u0639\u0629 %3 % \u0627\u0644\u0645\u062f\u0629 %4 \u0645\u0644\u0644\u064a \u062b\u0627\u0646\u064a\u0629",
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED_TIP": "\u0627\u0644\u062a\u062d\u0643\u0645 \u0641\u064a \u0627\u0644\u0639\u062c\u0644\u0629 A \u0644\u0645\u062f\u0629 \u0645\u062d\u062f\u062f\u0629 \u062b\u0645 \u0627\u0644\u062a\u0648\u0642\u0641. \u0627\u0644\u0627\u062a\u062c\u0627\u0647: 0=\u0623\u0645\u0627\u0645\u060c 1=\u062e\u0644\u0641. \u0627\u0644\u0633\u0631\u0639\u0629: 0-100%. \u0627\u0644\u0645\u062f\u0629 \u0628\u0627\u0644\u0645\u0644\u0644\u064a \u062b\u0627\u0646\u064a\u0629.",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED": "\u{1F697} \u0645\u062d\u0631\u0643 %1 \u0627\u0644\u0639\u062c\u0644\u0629 B \u0627\u0644\u0627\u062a\u062c\u0627\u0647 %2 \u0627\u0644\u0633\u0631\u0639\u0629 %3 % \u0627\u0644\u0645\u062f\u0629 %4 \u0645\u0644\u0644\u064a \u062b\u0627\u0646\u064a\u0629",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED_TIP": "\u0627\u0644\u062a\u062d\u0643\u0645 \u0641\u064a \u0627\u0644\u0639\u062c\u0644\u0629 B \u0644\u0645\u062f\u0629 \u0645\u062d\u062f\u062f\u0629 \u062b\u0645 \u0627\u0644\u062a\u0648\u0642\u0641. \u0627\u0644\u0627\u062a\u062c\u0627\u0647: 0=\u0623\u0645\u0627\u0645\u060c 1=\u062e\u0644\u0641. \u0627\u0644\u0633\u0631\u0639\u0629: 0-100%. \u0627\u0644\u0645\u062f\u0629 \u0628\u0627\u0644\u0645\u0644\u0644\u064a \u062b\u0627\u0646\u064a\u0629."
  },
  fa: {
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED": "\u{1F697} \u062f\u0631\u0627\u06cc\u0648\u0631 \u0645\u0648\u062a\u0648\u0631 %1 \u0686\u0631\u062e A \u062c\u0647\u062a %2 \u0633\u0631\u0639\u062a %3 % \u0645\u062f\u062a %4 \u0645\u06cc\u0644\u06cc\u200c\u062b\u0627\u0646\u06cc\u0647",
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED_TIP": "\u06a9\u0646\u062a\u0631\u0644 \u0686\u0631\u062e A \u0628\u0631\u0627\u06cc \u0645\u062f\u062a \u0645\u0634\u062e\u0635 \u0648 \u0633\u067e\u0633 \u062a\u0648\u0642\u0641. \u062c\u0647\u062a: 0=\u062c\u0644\u0648\u060c 1=\u0639\u0642\u0628. \u0633\u0631\u0639\u062a: 0-100%. \u0645\u062f\u062a \u0628\u0647 \u0645\u06cc\u0644\u06cc\u200c\u062b\u0627\u0646\u06cc\u0647.",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED": "\u{1F697} \u062f\u0631\u0627\u06cc\u0648\u0631 \u0645\u0648\u062a\u0648\u0631 %1 \u0686\u0631\u062e B \u062c\u0647\u062a %2 \u0633\u0631\u0639\u062a %3 % \u0645\u062f\u062a %4 \u0645\u06cc\u0644\u06cc\u200c\u062b\u0627\u0646\u06cc\u0647",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED_TIP": "\u06a9\u0646\u062a\u0631\u0644 \u0686\u0631\u062e B \u0628\u0631\u0627\u06cc \u0645\u062f\u062a \u0645\u0634\u062e\u0635 \u0648 \u0633\u067e\u0633 \u062a\u0648\u0642\u0641. \u062c\u0647\u062a: 0=\u062c\u0644\u0648\u060c 1=\u0639\u0642\u0628. \u0633\u0631\u0639\u062a: 0-100%. \u0645\u062f\u062a \u0628\u0647 \u0645\u06cc\u0644\u06cc\u200c\u062b\u0627\u0646\u06cc\u0647."
  },
  fil: {
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED": "\u{1F697} Motor Driver %1 Gulong A Direksyon %2 Bilis %3 % Tagal %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED_TIP": "Kontrolin ang gulong A sa tinukoy na tagal at itigil. Direksyon: 0=Pasulong, 1=Paatras. Bilis: 0-100%. Tagal sa ms.",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED": "\u{1F697} Motor Driver %1 Gulong B Direksyon %2 Bilis %3 % Tagal %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED_TIP": "Kontrolin ang gulong B sa tinukoy na tagal at itigil. Direksyon: 0=Pasulong, 1=Paatras. Bilis: 0-100%. Tagal sa ms."
  },
  hi: {
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED": "\u{1F697} \u092e\u094b\u091f\u0930 \u0921\u094d\u0930\u093e\u0907\u0935\u0930 %1 \u092a\u0939\u093f\u092f\u093e A \u0926\u093f\u0936\u093e %2 \u0917\u0924\u093f %3 % \u0905\u0935\u0927\u093f %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED_TIP": "\u092a\u0939\u093f\u092f\u093e A \u0915\u094b \u0928\u093f\u0930\u094d\u0926\u093f\u0937\u094d\u091f \u0905\u0935\u0927\u093f \u0924\u0915 \u0928\u093f\u092f\u0902\u0924\u094d\u0930\u093f\u0924 \u0915\u0930\u0947\u0902 \u092b\u093f\u0930 \u0930\u0941\u0915\u0947\u0902\u0964 \u0926\u093f\u0936\u093e: 0=\u0906\u0917\u0947, 1=\u092a\u0940\u091b\u0947\u0964 \u0917\u0924\u093f: 0-100%\u0964 \u0905\u0935\u0927\u093f ms \u092e\u0947\u0902\u0964",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED": "\u{1F697} \u092e\u094b\u091f\u0930 \u0921\u094d\u0930\u093e\u0907\u0935\u0930 %1 \u092a\u0939\u093f\u092f\u093e B \u0926\u093f\u0936\u093e %2 \u0917\u0924\u093f %3 % \u0905\u0935\u0927\u093f %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED_TIP": "\u092a\u0939\u093f\u092f\u093e B \u0915\u094b \u0928\u093f\u0930\u094d\u0926\u093f\u0937\u094d\u091f \u0905\u0935\u0927\u093f \u0924\u0915 \u0928\u093f\u092f\u0902\u0924\u094d\u0930\u093f\u0924 \u0915\u0930\u0947\u0902 \u092b\u093f\u0930 \u0930\u0941\u0915\u0947\u0902\u0964 \u0926\u093f\u0936\u093e: 0=\u0906\u0917\u0947, 1=\u092a\u0940\u091b\u0947\u0964 \u0917\u0924\u093f: 0-100%\u0964 \u0905\u0935\u0927\u093f ms \u092e\u0947\u0902\u0964"
  },
  id: {
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED": "\u{1F697} Driver Motor %1 Roda A Arah %2 Kecepatan %3 % Durasi %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED_TIP": "Kontrol roda A selama durasi yang ditentukan lalu berhenti. Arah: 0=Maju, 1=Mundur. Kecepatan: 0-100%. Durasi dalam ms.",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED": "\u{1F697} Driver Motor %1 Roda B Arah %2 Kecepatan %3 % Durasi %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED_TIP": "Kontrol roda B selama durasi yang ditentukan lalu berhenti. Arah: 0=Maju, 1=Mundur. Kecepatan: 0-100%. Durasi dalam ms."
  },
  it: {
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED": "\u{1F697} Driver Motore %1 Ruota A Direzione %2 Velocit\u00e0 %3 % Durata %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED_TIP": "Controlla la ruota A per la durata specificata e poi ferma. Direzione: 0=Avanti, 1=Indietro. Velocit\u00e0: 0-100%. Durata in ms.",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED": "\u{1F697} Driver Motore %1 Ruota B Direzione %2 Velocit\u00e0 %3 % Durata %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED_TIP": "Controlla la ruota B per la durata specificata e poi ferma. Direzione: 0=Avanti, 1=Indietro. Velocit\u00e0: 0-100%. Durata in ms."
  },
  nl: {
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED": "\u{1F697} Motordriver %1 Wiel A Richting %2 Snelheid %3 % Duur %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED_TIP": "Bestuur wiel A voor de opgegeven duur en stop dan. Richting: 0=Vooruit, 1=Achteruit. Snelheid: 0-100%. Duur in ms.",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED": "\u{1F697} Motordriver %1 Wiel B Richting %2 Snelheid %3 % Duur %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED_TIP": "Bestuur wiel B voor de opgegeven duur en stop dan. Richting: 0=Vooruit, 1=Achteruit. Snelheid: 0-100%. Duur in ms."
  },
  pl: {
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED": "\u{1F697} Sterownik %1 Ko\u0142o A Kierunek %2 Pr\u0119dko\u015b\u0107 %3 % Czas %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED_TIP": "Steruj ko\u0142em A przez okre\u015blony czas, a nast\u0119pnie zatrzymaj. Kierunek: 0=Do przodu, 1=Do ty\u0142u. Pr\u0119dko\u015b\u0107: 0-100%. Czas w ms.",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED": "\u{1F697} Sterownik %1 Ko\u0142o B Kierunek %2 Pr\u0119dko\u015b\u0107 %3 % Czas %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED_TIP": "Steruj ko\u0142em B przez okre\u015blony czas, a nast\u0119pnie zatrzymaj. Kierunek: 0=Do przodu, 1=Do ty\u0142u. Pr\u0119dko\u015b\u0107: 0-100%. Czas w ms."
  },
  pt: {
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED": "\u{1F697} Driver Motor %1 Roda A Dire\u00e7\u00e3o %2 Velocidade %3 % Dura\u00e7\u00e3o %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED_TIP": "Controlar a roda A pela dura\u00e7\u00e3o especificada e depois parar. Dire\u00e7\u00e3o: 0=Frente, 1=Tr\u00e1s. Velocidade: 0-100%. Dura\u00e7\u00e3o em ms.",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED": "\u{1F697} Driver Motor %1 Roda B Dire\u00e7\u00e3o %2 Velocidade %3 % Dura\u00e7\u00e3o %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED_TIP": "Controlar a roda B pela dura\u00e7\u00e3o especificada e depois parar. Dire\u00e7\u00e3o: 0=Frente, 1=Tr\u00e1s. Velocidade: 0-100%. Dura\u00e7\u00e3o em ms."
  },
  ru: {
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED": "\u{1F697} \u0414\u0440\u0430\u0439\u0432\u0435\u0440 %1 \u041a\u043e\u043b\u0435\u0441\u043e A \u041d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 %2 \u0421\u043a\u043e\u0440\u043e\u0441\u0442\u044c %3 % \u0414\u043b\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u044c %4 \u043c\u0441",
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED_TIP": "\u0423\u043f\u0440\u0430\u0432\u043b\u044f\u0442\u044c \u043a\u043e\u043b\u0435\u0441\u043e\u043c A \u0432 \u0442\u0435\u0447\u0435\u043d\u0438\u0435 \u0443\u043a\u0430\u0437\u0430\u043d\u043d\u043e\u0433\u043e \u0432\u0440\u0435\u043c\u0435\u043d\u0438, \u0437\u0430\u0442\u0435\u043c \u043e\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c. \u041d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435: 0=\u0412\u043f\u0435\u0440\u0451\u0434, 1=\u041d\u0430\u0437\u0430\u0434. \u0421\u043a\u043e\u0440\u043e\u0441\u0442\u044c: 0-100%. \u0412\u0440\u0435\u043c\u044f \u0432 \u043c\u0441.",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED": "\u{1F697} \u0414\u0440\u0430\u0439\u0432\u0435\u0440 %1 \u041a\u043e\u043b\u0435\u0441\u043e B \u041d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 %2 \u0421\u043a\u043e\u0440\u043e\u0441\u0442\u044c %3 % \u0414\u043b\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u044c %4 \u043c\u0441",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED_TIP": "\u0423\u043f\u0440\u0430\u0432\u043b\u044f\u0442\u044c \u043a\u043e\u043b\u0435\u0441\u043e\u043c B \u0432 \u0442\u0435\u0447\u0435\u043d\u0438\u0435 \u0443\u043a\u0430\u0437\u0430\u043d\u043d\u043e\u0433\u043e \u0432\u0440\u0435\u043c\u0435\u043d\u0438, \u0437\u0430\u0442\u0435\u043c \u043e\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c. \u041d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435: 0=\u0412\u043f\u0435\u0440\u0451\u0434, 1=\u041d\u0430\u0437\u0430\u0434. \u0421\u043a\u043e\u0440\u043e\u0441\u0442\u044c: 0-100%. \u0412\u0440\u0435\u043c\u044f \u0432 \u043c\u0441."
  },
  sv: {
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED": "\u{1F697} Motordrivare %1 Hjul A Riktning %2 Hastighet %3 % Varaktighet %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED_TIP": "Styr hjul A under angiven tid och stoppa sedan. Riktning: 0=Fram\u00e5t, 1=Bak\u00e5t. Hastighet: 0-100%. Tid i ms.",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED": "\u{1F697} Motordrivare %1 Hjul B Riktning %2 Hastighet %3 % Varaktighet %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED_TIP": "Styr hjul B under angiven tid och stoppa sedan. Riktning: 0=Fram\u00e5t, 1=Bak\u00e5t. Hastighet: 0-100%. Tid i ms."
  },
  th: {
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED": "\u{1F697} \u0e44\u0e14\u0e23\u0e40\u0e27\u0e2d\u0e23\u0e4c\u0e21\u0e2d\u0e40\u0e15\u0e2d\u0e23\u0e4c %1 \u0e25\u0e49\u0e2d A \u0e17\u0e34\u0e28\u0e17\u0e32\u0e07 %2 \u0e04\u0e27\u0e32\u0e21\u0e40\u0e23\u0e47\u0e27 %3 % \u0e23\u0e30\u0e22\u0e30\u0e40\u0e27\u0e25\u0e32 %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED_TIP": "\u0e04\u0e27\u0e1a\u0e04\u0e38\u0e21\u0e25\u0e49\u0e2d A \u0e15\u0e32\u0e21\u0e23\u0e30\u0e22\u0e30\u0e40\u0e27\u0e25\u0e32\u0e17\u0e35\u0e48\u0e01\u0e33\u0e2b\u0e19\u0e14\u0e41\u0e25\u0e49\u0e27\u0e2b\u0e22\u0e38\u0e14 \u0e17\u0e34\u0e28\u0e17\u0e32\u0e07: 0=\u0e40\u0e14\u0e34\u0e19\u0e2b\u0e19\u0e49\u0e32, 1=\u0e16\u0e2d\u0e22\u0e2b\u0e25\u0e31\u0e07 \u0e04\u0e27\u0e32\u0e21\u0e40\u0e23\u0e47\u0e27: 0-100% \u0e23\u0e30\u0e22\u0e30\u0e40\u0e27\u0e25\u0e32\u0e40\u0e1b\u0e47\u0e19 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED": "\u{1F697} \u0e44\u0e14\u0e23\u0e40\u0e27\u0e2d\u0e23\u0e4c\u0e21\u0e2d\u0e40\u0e15\u0e2d\u0e23\u0e4c %1 \u0e25\u0e49\u0e2d B \u0e17\u0e34\u0e28\u0e17\u0e32\u0e07 %2 \u0e04\u0e27\u0e32\u0e21\u0e40\u0e23\u0e47\u0e27 %3 % \u0e23\u0e30\u0e22\u0e30\u0e40\u0e27\u0e25\u0e32 %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED_TIP": "\u0e04\u0e27\u0e1a\u0e04\u0e38\u0e21\u0e25\u0e49\u0e2d B \u0e15\u0e32\u0e21\u0e23\u0e30\u0e22\u0e30\u0e40\u0e27\u0e25\u0e32\u0e17\u0e35\u0e48\u0e01\u0e33\u0e2b\u0e19\u0e14\u0e41\u0e25\u0e49\u0e27\u0e2b\u0e22\u0e38\u0e14 \u0e17\u0e34\u0e28\u0e17\u0e32\u0e07: 0=\u0e40\u0e14\u0e34\u0e19\u0e2b\u0e19\u0e49\u0e32, 1=\u0e16\u0e2d\u0e22\u0e2b\u0e25\u0e31\u0e07 \u0e04\u0e27\u0e32\u0e21\u0e40\u0e23\u0e47\u0e27: 0-100% \u0e23\u0e30\u0e22\u0e30\u0e40\u0e27\u0e25\u0e32\u0e40\u0e1b\u0e47\u0e19 ms"
  },
  tr: {
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED": "\u{1F697} Motor S\u00fcr\u00fcc\u00fc %1 Tekerlek A Y\u00f6n %2 H\u0131z %3 % S\u00fcre %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED_TIP": "Tekerlek A'y\u0131 belirtilen s\u00fcre boyunca kontrol et ve durdur. Y\u00f6n: 0=\u0130leri, 1=Geri. H\u0131z: 0-100%. S\u00fcre ms cinsinden.",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED": "\u{1F697} Motor S\u00fcr\u00fcc\u00fc %1 Tekerlek B Y\u00f6n %2 H\u0131z %3 % S\u00fcre %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED_TIP": "Tekerlek B'yi belirtilen s\u00fcre boyunca kontrol et ve durdur. Y\u00f6n: 0=\u0130leri, 1=Geri. H\u0131z: 0-100%. S\u00fcre ms cinsinden."
  },
  uz: {
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED": "\u{1F697} Motor drayver %1 G'ildirak A Yo'nalish %2 Tezlik %3 % Davomiylik %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED_TIP": "G'ildirak A ni belgilangan vaqt davomida boshqaring va to'xtating. Yo'nalish: 0=Oldinga, 1=Orqaga. Tezlik: 0-100%. Vaqt ms da.",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED": "\u{1F697} Motor drayver %1 G'ildirak B Yo'nalish %2 Tezlik %3 % Davomiylik %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED_TIP": "G'ildirak B ni belgilangan vaqt davomida boshqaring va to'xtating. Yo'nalish: 0=Oldinga, 1=Orqaga. Tezlik: 0-100%. Vaqt ms da."
  },
  vi: {
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED": "\u{1F697} Tr\u00ecnh \u0111i\u1ec1u khi\u1ec3n %1 B\u00e1nh A H\u01b0\u1edbng %2 T\u1ed1c \u0111\u1ed9 %3 % Th\u1eddi gian %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED_TIP": "\u0110i\u1ec1u khi\u1ec3n b\u00e1nh A trong th\u1eddi gian ch\u1ec9 \u0111\u1ecbnh r\u1ed3i d\u1eebng. H\u01b0\u1edbng: 0=Ti\u1ebfn, 1=L\u00f9i. T\u1ed1c \u0111\u1ed9: 0-100%. Th\u1eddi gian t\u00ednh b\u1eb1ng ms.",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED": "\u{1F697} Tr\u00ecnh \u0111i\u1ec1u khi\u1ec3n %1 B\u00e1nh B H\u01b0\u1edbng %2 T\u1ed1c \u0111\u1ed9 %3 % Th\u1eddi gian %4 ms",
    "BKY_PCA9685_DCMOTOR_WHEEL_B_TIMED_TIP": "\u0110i\u1ec1u khi\u1ec3n b\u00e1nh B trong th\u1eddi gian ch\u1ec9 \u0111\u1ecbnh r\u1ed3i d\u1eebng. H\u01b0\u1edbng: 0=Ti\u1ebfn, 1=L\u00f9i. T\u1ed1c \u0111\u1ed9: 0-100%. Th\u1eddi gian t\u00ednh b\u1eb1ng ms."
  }
};

const files = fs.readdirSync(dir).filter(f => f.startsWith('ui_') && f.endsWith('.json'));
let count = 0;

files.forEach(file => {
  const lang = file.replace('ui_', '').replace('.json', '');
  const trans = translations[lang] || translations['en'];

  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('BKY_PCA9685_DCMOTOR_WHEEL_A_TIMED')) {
    console.log('SKIP ' + file + ' (already has keys)');
    return;
  }

  const lastBrace = content.lastIndexOf('}');
  const beforeBrace = content.substring(0, lastBrace).trimEnd();

  const entries = Object.entries(trans).map(function(pair) {
    return '  "' + pair[0] + '": "' + pair[1].replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
  }).join(',\n');

  const newContent = beforeBrace + ',\n' + entries + '\n}';

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('OK ' + file + ' (' + lang + ')' + (trans === translations['en'] ? ' [EN fallback]' : ''));
  count++;
});

console.log('\nDone: ' + count + ' files updated');
