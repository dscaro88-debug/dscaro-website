// DS CARO — Global Search Component
// Injects search icon into navbar and handles full-site search
(function () {
  'use strict';

  /* ── 1. Detect current language ───────────────────────────── */
  function getLang() {
    return localStorage.getItem('dscaro-lang') || 'en';
  }

  /* ── 2. Get localised text ────────────────────────────────── */
  var UI = {
    placeholder: { en: 'Search products, pages…', de: 'Suche…', fr: 'Rechercher…', es: 'Buscar…', zh: '搜索产品、页面…', ar: '…ابحث', ja: '検索…' },
    noresult:    { en: 'No results found.', de: 'Keine Ergebnisse.', fr: 'Aucun résultat.', es: 'Sin resultados.', zh: '未找到相关结果。', ar: '.لا توجد نتائج', ja: '結果が見つかりません。' },
    product:     { en: 'Product', de: 'Produkt', fr: 'Produit', es: 'Producto', zh: '产品', ar: 'منتج', ja: '製品' },
    page:        { en: 'Page', de: 'Seite', fr: 'Page', es: 'Página', zh: '页面', ar: 'صفحة', ja: 'ページ' }
  };

  function t(key) {
    var lang = getLang();
    return (UI[key] && (UI[key][lang] || UI[key]['en'])) || '';
  }

  function localText(obj) {
    if (!obj) return '';
    var lang = getLang();
    return obj[lang] || obj['en'] || '';
  }

  /* ── 3. Search logic ──────────────────────────────────────── */
  function search(query) {
    if (!query || query.trim().length < 1) return [];
    var q = query.trim().toLowerCase();
    var lang = getLang();
    var data = window.DSCARO_SEARCH_DATA || [];

    return data.filter(function (item) {
      var title = localText(item.title).toLowerCase();
      var desc  = localText(item.desc).toLowerCase();
      var sku   = (item.sku || '').toLowerCase();
      var tags  = (item.tags || []).join(' ').toLowerCase();
      return title.indexOf(q) > -1 || desc.indexOf(q) > -1 ||
             sku.indexOf(q) > -1   || tags.indexOf(q) > -1;
    }).slice(0, 8);
  }

  /* ── 4. Render results ────────────────────────────────────── */
  function renderResults(results, query) {
    var box = document.getElementById('ds-search-results');
    if (!box) return;
    if (!results.length) {
      box.innerHTML = '<p class="px-4 py-6 text-sm text-center text-muted-foreground">' + t('noresult') + '</p>';
      return;
    }

    var html = '<ul>';
    results.forEach(function (item) {
      var badge = item.type === 'product'
        ? '<span class="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-semibold">' + t('product') + '</span>'
        : '<span class="text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 rounded font-semibold">' + t('page') + '</span>';

      var price = item.price
        ? '<span class="text-xs font-bold text-foreground ml-auto">' + item.price + '</span>'
        : '';

      var sku = item.sku
        ? '<span class="text-[10px] font-mono text-muted-foreground">' + item.sku + '</span>'
        : '';

      var highlight = function(str) {
        var re = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
        return str.replace(re, '<mark class="bg-accent/20 text-foreground rounded px-0.5">$1</mark>');
      };

      html += '<li>'
        + '<a href="' + item.url + '" class="flex items-start gap-3 px-4 py-3 hover:bg-primary/5 transition group" onclick="document.getElementById(\'ds-search-overlay\').classList.add(\'hidden\')">'
        + '<div class="flex-1 min-w-0">'
        + '<div class="flex items-center gap-2 mb-0.5">' + badge + sku + price + '</div>'
        + '<div class="text-sm font-medium text-foreground truncate">' + highlight(localText(item.title)) + '</div>'
        + '<div class="text-xs text-muted-foreground line-clamp-1 mt-0.5">' + highlight(localText(item.desc)) + '</div>'
        + '</div>'
        + '<svg class="w-4 h-4 text-muted-foreground group-hover:text-primary mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>'
        + '</a>'
        + '</li>';
    });
    html += '</ul>';
    box.innerHTML = html;
  }

  /* ── 5. Build overlay HTML ────────────────────────────────── */
  function buildOverlay() {
    var overlay = document.createElement('div');
    overlay.id = 'ds-search-overlay';
    overlay.className = 'hidden fixed inset-0 z-[9999] flex items-start justify-center pt-20 px-4';
    overlay.style.background = 'rgba(0,0,0,0.45)';
    overlay.innerHTML =
      '<div id="ds-search-modal" class="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden" onclick="event.stopPropagation()">'
      + '<div class="flex items-center gap-3 px-4 py-3 border-b border-border">'
      + '<svg class="w-4 h-4 text-muted-foreground shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/></svg>'
      + '<input id="ds-search-input" type="text" autocomplete="off" class="flex-1 text-sm outline-none bg-transparent text-foreground placeholder-muted-foreground" placeholder="' + t('placeholder') + '" />'
      + '<button onclick="document.getElementById(\'ds-search-overlay\').classList.add(\'hidden\')" class="p-1 rounded-lg hover:bg-muted transition">'
      + '<svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>'
      + '</button>'
      + '</div>'
      + '<div id="ds-search-results" class="max-h-96 overflow-y-auto divide-y divide-border">'
      + '<p class="px-4 py-6 text-sm text-center text-muted-foreground">' + t('placeholder') + '</p>'
      + '</div>'
      + '</div>';

    overlay.addEventListener('click', function () {
      overlay.classList.add('hidden');
    });

    document.body.appendChild(overlay);

    /* Realtime search */
    var input = document.getElementById('ds-search-input');
    var debounceTimer;
    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      var q = input.value;
      debounceTimer = setTimeout(function () {
        renderResults(search(q), q);
      }, 150);
    });

    /* Keyboard shortcut: Escape to close */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') overlay.classList.add('hidden');
    });
  }

  /* ── 6. Inject search icon into navbar ───────────────────── */
  function injectSearchIcon() {
    /* Find the right-side button group in navbar */
    var btnGroup = document.querySelector('nav .flex.items-center.gap-3');
    if (!btnGroup) return;

    var btn = document.createElement('button');
    btn.id = 'ds-search-btn';
    btn.setAttribute('aria-label', 'Search');
    btn.className = 'p-2 rounded-lg hover:bg-muted transition text-foreground';
    btn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/></svg>';
    btn.addEventListener('click', function () {
      document.getElementById('ds-search-overlay').classList.remove('hidden');
      setTimeout(function () {
        var inp = document.getElementById('ds-search-input');
        if (inp) inp.focus();
      }, 50);
    });

    /* Insert before the hamburger / first button */
    btnGroup.insertBefore(btn, btnGroup.firstChild);
  }

  /* ── 7. Init on DOM ready ─────────────────────────────────── */
  function init() {
    if (!window.DSCARO_SEARCH_DATA) return; /* data not loaded yet */
    buildOverlay();
    injectSearchIcon();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
