/* ==============================================
   Brixel i18n Engine v1.0
   Lightweight internationalization for static HTML
   ============================================== */
(function () {
    'use strict';

    var SUPPORTED_LANGS = [
        'ko', 'en', 'es', 'zh', 'ja', 'fr', 'de', 'ru',
        'tr', 'vi', 'pt', 'uz', 'ar', 'fa', 'fil', 'hi',
        'id', 'it', 'nl', 'th', 'zh-tw', 'sv', 'pl'
    ];

    var STORAGE_KEY = 'brixel-lang';
    var CACHE_PREFIX = 'brixel-i18n-v3-';

    var BrixelI18n = {
        _currentLang: 'ko',
        _translations: null,
        _basePath: '',
        _page: 'main',
        _initialized: false,

        /* ── Public API ── */

        init: function () {
            if (this._initialized) return;
            this._initialized = true;

            // Detect base path and page from script tag
            var scriptEl = document.querySelector('script[data-base]');
            if (scriptEl) {
                this._basePath = scriptEl.getAttribute('data-base') || '';
                this._page = scriptEl.getAttribute('data-page') || 'main';
                this._gtMode = scriptEl.getAttribute('data-gt-mode') === 'true';
            }

            // Detect language
            var lang = this._detectLang();

            // Google Translate mode: only render selector, skip i18n translation
            // (Google Translate handles the actual page translation)
            if (this._gtMode) {
                this._currentLang = lang;
                this._renderSelector();
                return;
            }

            if (lang === 'ko') {
                // Korean is default, no translation needed
                this._currentLang = 'ko';
                this._renderSelector();
                return;
            }

            this._setLang(lang);
        },

        setLang: function (lang) {
            if (lang === this._currentLang && this._translations) return;
            localStorage.setItem(STORAGE_KEY, lang);

            // Clear all translation caches to prevent stale data
            try {
                Object.keys(sessionStorage).forEach(function(key) {
                    if (key.indexOf('brixel-i18n') === 0) sessionStorage.removeItem(key);
                });
            } catch(e) {}

            // GT mode: use Google Translate's select element to switch language
            if (this._gtMode) {
                this._currentLang = lang;
                var gtMap = {'fil':'tl','zh':'zh-CN','zh-tw':'zh-TW'};
                var gtLang = gtMap[lang] || lang;

                if (lang === 'ko') {
                    // Reset to original: select empty value in GT combo
                    var sel = document.querySelector('.goog-te-combo');
                    if (sel) { sel.value = ''; sel.dispatchEvent(new Event('change')); }
                    // Also clear cookies
                    document.cookie = 'googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT';
                    document.cookie = 'googtrans=;path=/;domain=' + location.hostname + ';expires=Thu, 01 Jan 1970 00:00:00 GMT';
                    document.cookie = 'googtrans=;path=/;domain=.' + location.hostname + ';expires=Thu, 01 Jan 1970 00:00:00 GMT';
                    location.reload();
                    return;
                }

                // If GT is already loaded, just change the select
                var sel = document.querySelector('.goog-te-combo');
                if (sel) {
                    sel.value = gtLang;
                    sel.dispatchEvent(new Event('change'));
                    this._updateSelector();
                    return;
                }

                // GT not loaded yet - set cookie and reload
                document.cookie = 'googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT';
                document.cookie = 'googtrans=;path=/;domain=' + location.hostname + ';expires=Thu, 01 Jan 1970 00:00:00 GMT';
                document.cookie = 'googtrans=;path=/;domain=.' + location.hostname + ';expires=Thu, 01 Jan 1970 00:00:00 GMT';
                document.cookie = 'googtrans=/ko/' + gtLang + ';path=/';
                document.cookie = 'googtrans=/ko/' + gtLang + ';path=/;domain=' + location.hostname;
                location.reload();
                return;
            }

            if (lang === 'ko') {
                this._currentLang = 'ko';
                this._translations = null;
                this._restoreOriginals();
                this._applyDirection('ltr');
                this._enableGoogleTranslate();
                this._updateSelector();
                document.documentElement.lang = 'ko';
                return;
            }

            this._setLang(lang);
        },

        getLang: function () {
            return this._currentLang;
        },

        t: function (key, fallback) {
            if (!this._translations) return fallback || '';
            var val = this._resolve(key);
            return val || fallback || '';
        },

        /* ── Internal ── */

        _detectLang: function () {
            // 1. URL param
            var urlParams = new URLSearchParams(window.location.search);
            var urlLang = urlParams.get('lang');
            if (urlLang && SUPPORTED_LANGS.indexOf(urlLang) !== -1) {
                localStorage.setItem(STORAGE_KEY, urlLang);
                return urlLang;
            }

            // 2. localStorage
            var saved = localStorage.getItem(STORAGE_KEY);
            if (saved && SUPPORTED_LANGS.indexOf(saved) !== -1) {
                return saved;
            }

            // 3. navigator.language / navigator.languages
            var browserLangs = navigator.languages || [navigator.language || navigator.userLanguage || 'ko'];
            for (var i = 0; i < browserLangs.length; i++) {
                var full = browserLangs[i].toLowerCase();
                // Exact match for compound codes (zh-tw)
                if (full === 'zh-tw' && SUPPORTED_LANGS.indexOf('zh-tw') !== -1) return 'zh-tw';
                if ((full === 'zh-cn' || full === 'zh') && SUPPORTED_LANGS.indexOf('zh') !== -1) return 'zh';
                // Exact match
                if (SUPPORTED_LANGS.indexOf(full) !== -1) return full;
                // Base language code match
                var code = full.split('-')[0];
                if (SUPPORTED_LANGS.indexOf(code) !== -1) return code;
            }

            // 4. fallback
            return 'ko';
        },

        _setLang: function (lang) {
            var self = this;
            this._currentLang = lang;

            // Always fetch fresh translation file (no cache)
            var url = this._basePath + 'locales/' + lang + '.json?v=' + Date.now();
            fetch(url)
                .then(function (res) {
                    if (!res.ok) throw new Error('HTTP ' + res.status);
                    return res.json();
                })
                .then(function (data) {
                    self._translations = data;
                    self._applyAll();
                })
                .catch(function (err) {
                    console.warn('[i18n] Failed to load ' + lang + ':', err.message);
                    // Fallback: let Google Translate handle it
                    self._enableGoogleTranslate();
                    self._renderSelector();
                });
        },

        _applyAll: function () {
            this._applyTranslations();
            this._applyMeta();
            this._applyDirection(this._translations._meta ? this._translations._meta.dir || 'ltr' : 'ltr');
            this._applyFont();
            this._disableGoogleTranslate();
            this._renderSelector();
            this._updateSelector();
            document.documentElement.lang = this._currentLang;
        },

        _resolve: function (key) {
            if (!this._translations) return null;
            var parts = key.split('.');
            var obj = this._translations;
            for (var i = 0; i < parts.length; i++) {
                if (obj && typeof obj === 'object' && parts[i] in obj) {
                    obj = obj[parts[i]];
                } else {
                    return null;
                }
            }
            return typeof obj === 'string' ? obj : null;
        },

        _applyTranslations: function () {
            var self = this;

            // Save originals on first apply
            document.querySelectorAll('[data-i18n]').forEach(function (el) {
                if (!el.hasAttribute('data-i18n-original')) {
                    el.setAttribute('data-i18n-original', el.innerHTML);
                }
                var key = el.getAttribute('data-i18n');
                var val = self._resolve(key);
                if (val) {
                    el.innerHTML = val;
                }
            });

            // Attribute translations (skip <title> element for 'title' attr to avoid collision)
            var attrs = ['alt', 'title', 'placeholder', 'content', 'aria-label'];
            attrs.forEach(function (attr) {
                document.querySelectorAll('[data-i18n-' + attr + ']').forEach(function (el) {
                    if (attr === 'title' && el.tagName === 'TITLE') return;
                    if (!el.hasAttribute('data-i18n-original-' + attr)) {
                        el.setAttribute('data-i18n-original-' + attr, el.getAttribute(attr) || '');
                    }
                    var key = el.getAttribute('data-i18n-' + attr);
                    var val = self._resolve(key);
                    if (val) el.setAttribute(attr, val);
                });
            });
        },

        _restoreOriginals: function () {
            document.querySelectorAll('[data-i18n-original]').forEach(function (el) {
                el.innerHTML = el.getAttribute('data-i18n-original');
            });
            var attrs = ['alt', 'title', 'placeholder', 'content', 'aria-label'];
            attrs.forEach(function (attr) {
                document.querySelectorAll('[data-i18n-original-' + attr + ']').forEach(function (el) {
                    el.setAttribute(attr, el.getAttribute('data-i18n-original-' + attr));
                });
            });
            // Restore document title
            var titleEl = document.querySelector('title[data-i18n-original-title]');
            if (titleEl) document.title = titleEl.getAttribute('data-i18n-original-title');
            // Restore meta content originals
            document.querySelectorAll('[data-i18n-original-content]').forEach(function (el) {
                el.setAttribute('content', el.getAttribute('data-i18n-original-content'));
            });
        },

        _applyMeta: function () {
            var self = this;
            // <title>
            var titleEl = document.querySelector('title[data-i18n-title]');
            if (titleEl) {
                if (!titleEl.hasAttribute('data-i18n-original-title')) {
                    titleEl.setAttribute('data-i18n-original-title', document.title);
                }
                var titleVal = self._resolve(titleEl.getAttribute('data-i18n-title'));
                if (titleVal) document.title = titleVal;
            }

            // OG & Twitter meta
            var metaMap = {
                'og:title': 'common.siteTitle',
                'og:description': 'common.siteDescription',
                'twitter:title': 'common.siteTitle',
                'twitter:description': 'common.siteDescription'
            };
            Object.keys(metaMap).forEach(function (prop) {
                var meta = document.querySelector('meta[property="' + prop + '"], meta[name="' + prop + '"]');
                if (meta) {
                    if (!meta.hasAttribute('data-i18n-original-content')) {
                        meta.setAttribute('data-i18n-original-content', meta.getAttribute('content') || '');
                    }
                    var val = self._resolve(metaMap[prop]);
                    if (val) meta.setAttribute('content', val);
                }
            });

            // Description meta
            var descMeta = document.querySelector('meta[name="description"]');
            if (descMeta) {
                if (!descMeta.hasAttribute('data-i18n-original-content')) {
                    descMeta.setAttribute('data-i18n-original-content', descMeta.getAttribute('content') || '');
                }
                var descVal = self._resolve('common.siteDescription');
                if (descVal) descMeta.setAttribute('content', descVal);
            }

            // Content-Language
            var clMeta = document.querySelector('meta[http-equiv="Content-Language"]');
            if (clMeta) clMeta.setAttribute('content', this._currentLang);
        },

        _applyDirection: function (dir) {
            document.documentElement.dir = dir;
        },

        _applyFont: function () {
            if (!this._translations || !this._translations._meta) return;
            var meta = this._translations._meta;

            // Load custom font if needed
            if (meta.fontUrl && !document.querySelector('link[href="' + meta.fontUrl + '"]')) {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = meta.fontUrl;
                document.head.appendChild(link);
            }

            if (meta.fontFamily) {
                document.body.style.fontFamily = meta.fontFamily;
            }
        },

        _disableGoogleTranslate: function () {
            // Mark self-translated elements as notranslate to prevent double-translation
            // but let Google Translate handle untranslated content
            document.querySelectorAll('[data-i18n]').forEach(function (el) {
                if (!el.hasAttribute('data-i18n-gt-original')) {
                    el.setAttribute('data-i18n-gt-original', el.getAttribute('translate') || '');
                }
                el.setAttribute('translate', 'no');
            });
            // Set googtrans cookie for remaining content
            var lang = this._currentLang;
            document.cookie = 'googtrans=/ko/' + lang + '; path=/';
            document.cookie = 'googtrans=/ko/' + lang + '; path=/; domain=' + location.hostname;
        },

        _enableGoogleTranslate: function () {
            // Restore translate attributes on self-translated elements
            document.querySelectorAll('[data-i18n-gt-original]').forEach(function (el) {
                var orig = el.getAttribute('data-i18n-gt-original');
                if (orig) {
                    el.setAttribute('translate', orig);
                } else {
                    el.removeAttribute('translate');
                }
                el.removeAttribute('data-i18n-gt-original');
            });
        },

        /* ── Language Selector UI ── */

        _renderSelector: function () {
            if (document.getElementById('brixel-lang-selector')) return;

            var langNames = {
                ko: '한국어', en: 'English', es: 'Español', zh: '中文',
                ja: '日本語', fr: 'Français', de: 'Deutsch', ru: 'Русский',
                tr: 'Türkçe', vi: 'Tiếng Việt', pt: 'Português (Brasil)', uz: 'Oʻzbek tili',
                ar: 'العربية', fa: 'فارسی', fil: 'Filipino', hi: 'हिन्दी',
                id: 'Bahasa Indonesia', it: 'Italiano', nl: 'Nederlands', th: 'ไทย',
                'zh-tw': '繁體中文', sv: 'Svenska', pl: 'Polski'
            };

            var self = this;

            // Container (translate="no" to prevent Google Translate from translating language names)
            var container = document.createElement('div');
            container.id = 'brixel-lang-selector';
            container.className = 'brixel-i18n-selector';
            container.setAttribute('translate', 'no');
            container.classList.add('notranslate');

            // Toggle button
            var btn = document.createElement('button');
            btn.className = 'brixel-i18n-btn';
            btn.setAttribute('aria-label', 'Change language');
            btn.innerHTML = '<span class="brixel-i18n-globe">🌐</span><span class="brixel-i18n-label">' + (langNames[this._currentLang] || this._currentLang) + '</span>';
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                var panel = document.getElementById('brixel-lang-panel');
                panel.classList.toggle('brixel-i18n-open');
            });

            // Panel
            var panel = document.createElement('div');
            panel.id = 'brixel-lang-panel';
            panel.className = 'brixel-i18n-panel';

            SUPPORTED_LANGS.forEach(function (code) {
                var item = document.createElement('button');
                item.className = 'brixel-i18n-lang-item';
                if (code === self._currentLang) item.classList.add('active');
                item.setAttribute('data-lang', code);
                item.textContent = langNames[code] || code;
                item.addEventListener('click', function (e) {
                    e.stopPropagation();
                    self.setLang(code);
                    panel.classList.remove('brixel-i18n-open');
                });
                panel.appendChild(item);
            });

            container.appendChild(panel);
            container.appendChild(btn);
            document.body.appendChild(container);

            // Close on outside click
            document.addEventListener('click', function () {
                panel.classList.remove('brixel-i18n-open');
            });

            // Load CSS
            this._loadCSS();
        },

        _updateSelector: function () {
            var langNames = {
                ko: '한국어', en: 'English', es: 'Español', zh: '中文',
                ja: '日本語', fr: 'Français', de: 'Deutsch', ru: 'Русский',
                tr: 'Türkçe', vi: 'Tiếng Việt', pt: 'Português (Brasil)', uz: 'Oʻzbek tili',
                ar: 'العربية', fa: 'فارسی', fil: 'Filipino', hi: 'हिन्दी',
                id: 'Bahasa Indonesia', it: 'Italiano', nl: 'Nederlands', th: 'ไทย',
                'zh-tw': '繁體中文', sv: 'Svenska', pl: 'Polski'
            };

            // Update button label
            var label = document.querySelector('.brixel-i18n-label');
            if (label) label.textContent = langNames[this._currentLang] || this._currentLang;

            // Update active state
            document.querySelectorAll('.brixel-i18n-lang-item').forEach(function (item) {
                item.classList.toggle('active', item.getAttribute('data-lang') === this._currentLang);
            }.bind(this));
        },

        _loadCSS: function () {
            if (document.querySelector('link[data-i18n-css]')) return;
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = this._basePath + 'i18n.css';
            link.setAttribute('data-i18n-css', '1');
            document.head.appendChild(link);
        }
    };

    // Expose globally
    window.BrixelI18n = BrixelI18n;

    // Auto-init on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { BrixelI18n.init(); });
    } else {
        BrixelI18n.init();
    }
})();
