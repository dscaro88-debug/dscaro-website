// DS CARO ToB Website — Multi-Language Builder (7 Languages)
// Languages: EN, DE, FR, ES, ZH, AR, JA
// Strategy: All translations embedded in HTML, JS-powered client-side switching
// Output: 13 HTML files (same as before, but with 7-lang support)

const fs = require('fs');
const path = require('path');

const OUT = '/Users/carokk/WorkBuddy/20260323171726/dscaro-tob';

// ─── Load all language packs ───────────────────────────────────────────
const LANGS = ['en','de','fr','es','zh','ar','ja'].map(code => {
  const t = require(`./i18n/${code}.js`);
  return t;
});
const EN = LANGS[0]; // English is primary

// ─── Brand & Color Config ──────────────────────────────────────────────
const BRAND = {
  name: 'DS CARO',
  tagline: 'Empowering Independence with Warmth',
  desc: 'Premium adaptive products for independent senior living — trusted by care facilities and families across Europe.',
  email: 'dscaro88@gmail.com',
  phone: '+86 135 1694 6001',
  address: 'Manchester, UK',
  contact: 'CARO CHEN',
  shopUrl: 'https://shop.dscaro.com',
};

// ─── Product Catalog ───────────────────────────────────────────────────
const CATALOG = [
  {
    id: 'bathroom-safety',
    name: 'Bathroom Safety', nameDe: 'Badesicherheit', nameFr: 'Sécurité salle de bains', nameEs: 'Seguridad baño', nameZh: '卫浴安全', nameAr: 'سلامة الحمام', nameJa: 'バスルーム安全',
    icon: '🚿',
    desc: 'Fall prevention and dignity in daily bathing routines',
    descDe: 'Sturzprävention und Würde beim täglichen Baden',
    descFr: 'Prévention des chutes et dignité lors des routines de bain',
    descEs: 'Prevención de caídas y dignidad en la rutina de baño',
    descZh: '日常洗浴的防跌倒与有尊严的护理',
    descAr: 'منع السقوط والحفاظ على الكرامة أثناء الاستحمام',
    descJa: '日常入浴時の転倒防止と尊厳のある介護',
    subs: [
      { id: 'grab-bars', name: 'Grab Bars & Handrails', nameZh: '扶手与把手', nameAr: 'قضبان التثبيت والدرابزين', nameJa: 'グラブバー・手すり', desc: 'Suction & wall-mounted grab bars, toilet safety frames', icon: '🔧' },
      { id: 'shower-seating', name: 'Showering & Bathing', nameZh: '淋浴与洗浴辅助', nameAr: 'الاستحمام والغسيل', nameJa: 'シャワー・入浴補助', desc: 'Foldable shower seats, transfer benches, handheld showers', icon: '🛁' },
      { id: 'non-slip', name: 'Non-Slip Solutions', nameZh: '防滑方案', nameAr: 'حلول مضادة للانزلاق', nameJa: '滑り止めソリューション', desc: 'Bath mats, tub strips, anti-slip treads', icon: '🧴' },
    ]
  },
  {
    id: 'kitchen-dining',
    name: 'Kitchen & Dining', nameDe: 'Küche & Essen', nameFr: 'Cuisine & Repas', nameEs: 'Cocina & Comedor', nameZh: '厨房与餐饮', nameAr: 'المطبخ والطعام', nameJa: 'キッチン・ダイニング',
    icon: '🍴',
    desc: 'Arthritis-friendly tools for effortless, one-handed independence',
    descDe: 'Arthritis-freundliche Werkzeuge für mühelose Einhand-Unabhängigkeit',
    descFr: 'Ustensiles pour les personnes arthritiques, indépendance à une main',
    descEs: 'Herramientas para artritis para independencia con una mano',
    descZh: '关节炎友好型工具，轻松实现单手操作独立生活',
    descAr: 'أدوات صديقة لمرضى التهاب المفاصل للاستقلالية بيد واحدة',
    descJa: '関節炎に優しい、片手での自立をサポートするツール',
    subs: [
      { id: 'adaptive-utensils', name: 'Adaptive Utensils', nameZh: '自适应餐具', nameAr: 'أدوات الطعام المتكيفة', nameJa: '自助食器', desc: 'Built-up handle cutlery, weighted spoons, rocker knives', icon: '🥄' },
      { id: 'grip-aids', name: 'Grip Aids', nameZh: '握力辅助', nameAr: 'مساعدات القبضة', nameJa: 'グリップ補助', desc: 'Electric jar openers, bottle grippers, non-slip mats', icon: '🫙' },
      { id: 'plate-aids', name: 'Plate & Dining Aids', nameZh: '餐盘辅助', nameAr: 'مساعدات الأطباق والتناول', nameJa: '皿・食事補助', desc: 'Scoop dishes, plate guards, cup holders', icon: '🍽️' },
      { id: 'kitchen-safety', name: 'Kitchen Safety', nameZh: '厨房安全', nameAr: 'سلامة المطبخ', nameJa: 'キッチン安全', desc: 'Large button timers, auto shut-off kettles', icon: '⏲️' },
    ]
  },
  {
    id: 'dressing-mobility',
    name: 'Dressing & Mobility', nameDe: 'Anziehen & Mobilität', nameFr: 'Habillage & Mobilité', nameEs: 'Vestimenta & Movilidad', nameZh: '穿戴与出行', nameAr: 'الارتداء والتنقل', nameJa: '着替え・移動',
    icon: '👕',
    desc: 'Invisible adaptation for dignity and style',
    descDe: 'Unsichtbare Anpassung für Würde und Stil',
    descFr: 'Adaptation invisible pour la dignité et le style',
    descEs: 'Adaptación invisible para dignidad y estilo',
    descZh: '隐形适老，保持尊严与个人风格',
    descAr: 'تكيف غير مرئي للكرامة والأناقة',
    descJa: '尊厳とスタイルを保つ見えないアダプテーション',
    subs: [
      { id: 'adaptive-clothing', name: 'Adaptive Clothing', nameZh: '适老服装', nameAr: 'الملابس المتكيفة', nameJa: 'アダプティブ衣類', desc: 'Magnetic closure shirts, velcro pants, easy-access underwear', icon: '👔' },
      { id: 'footwear', name: 'Footwear', nameZh: '鞋类', nameAr: 'الأحذية', nameJa: '靴・フットウェア', desc: 'Slip-on shoes, extra-wide fit shoes', icon: '👟' },
      { id: 'dressing-aids', name: 'Dressing Aids', nameZh: '穿衣辅助', nameAr: 'مساعدات الارتداء', nameJa: '着替え補助', desc: 'Sock aids, long-handle shoe horns, button hooks', icon: '🧦' },
      { id: 'mobility-accessories', name: 'Mobility Accessories', nameZh: '出行配件', nameAr: 'ملحقات الحركة', nameJa: '移動補助アクセサリー', desc: 'Shopping trolleys, cane holders, foldable walkers', icon: '🦯' },
    ]
  },
  {
    id: 'bedroom-living',
    name: 'Bedroom & Living', nameDe: 'Schlafzimmer & Wohnen', nameFr: 'Chambre & Séjour', nameEs: 'Dormitorio & Sala', nameZh: '卧室与起居', nameAr: 'غرفة النوم والمعيشة', nameJa: 'ベッドルーム・リビング',
    icon: '🛏️',
    desc: 'Assistive rise and sleep quality solutions',
    descDe: 'Assistive Aufstehhilfen und Schlafqualitätslösungen',
    descFr: "Aides au lever et solutions pour la qualité du sommeil",
    descEs: 'Ayudas para levantarse y soluciones de calidad del sueño',
    descZh: '辅助起身与睡眠质量提升方案',
    descAr: 'حلول مساعدة للنهوض وجودة النوم',
    descJa: '起き上がり補助と睡眠品質向上ソリューション',
    subs: [
      { id: 'bed-assistance', name: 'Bed Assistance', nameZh: '床具辅助', nameAr: 'مساعدات السرير', nameJa: 'ベッド補助', desc: 'Bed rail handles, bed wedges, transfer slide boards', icon: '🛌' },
      { id: 'lighting', name: 'Lighting & Visibility', nameZh: '照明与可视性', nameAr: 'الإضاءة والرؤية', nameJa: '照明・視認性', desc: 'Motion sensor night lights, LED bedside strips', icon: '💡' },
      { id: 'organization', name: 'Organization & Reach', nameZh: '整理与伸取', nameAr: 'التنظيم والوصول', nameJa: '整理・手の届かない場所', desc: 'Bedside organizers, reach extender grabber tools', icon: '📦' },
    ]
  },
  {
    id: 'smart-care',
    name: 'Smart Care & Monitoring', nameDe: 'Smart Care & Überwachung', nameFr: 'Soins intelligents & Surveillance', nameEs: 'Cuidado inteligente & Monitoreo', nameZh: '智能护理与监测', nameAr: 'الرعاية الذكية والمراقبة', nameJa: 'スマートケア・モニタリング',
    icon: '📡',
    desc: 'Privacy-first technology — no cameras required',
    descDe: 'Datenschutz-erste Technologie — keine Kameras erforderlich',
    descFr: 'Technologie respectueuse de la vie privée — sans caméras',
    descEs: 'Tecnología privacidad primero — sin cámaras',
    descZh: '隐私优先技术，无需摄像头',
    descAr: 'تقنية تضع الخصوصية أولاً — لا كاميرات مطلوبة',
    descJa: 'プライバシー優先技術 — カメラ不要',
    subs: [
      { id: 'fall-detection', name: 'Fall Detection', nameZh: '跌倒检测', nameAr: 'الكشف عن السقوط', nameJa: '転倒検知', desc: 'mmWave radar sensors, wearable fall alert pendants', icon: '🔔' },
      { id: 'medication', name: 'Medication Management', nameZh: '用药管理', nameAr: 'إدارة الأدوية', nameJa: '服薬管理', desc: 'Smart pill dispensers, large-print weekly organizers', icon: '💊' },
      { id: 'home-sensors', name: 'Home Safety Sensors', nameZh: '家居安全传感', nameAr: 'أجهزة استشعار السلامة المنزلية', nameJa: '家庭用安全センサー', desc: 'Water leak detectors, smoke & gas alarms, door sensors', icon: '🏠' },
      { id: 'communication', name: 'Communication', nameZh: '通讯设备', nameAr: 'الاتصالات', nameJa: 'コミュニケーション', desc: 'Video call frames, amplified phones', icon: '📞' },
    ]
  },
  {
    id: 'gifts-seniors',
    name: 'Gifts for Seniors', nameDe: 'Geschenke für Senioren', nameFr: 'Cadeaux pour seniors', nameEs: 'Regalos para mayores', nameZh: '老年人礼品', nameAr: 'هدايا كبار السن', nameJa: 'シニアへのギフト',
    icon: '🎁',
    desc: 'Curated for families buying thoughtful gifts for loved ones',
    descDe: 'Kuratiert für Familien, die durchdachte Geschenke suchen',
    descFr: 'Sélectionnés pour les familles cherchant des cadeaux réfléchis',
    descEs: 'Seleccionados para familias que buscan regalos pensados',
    descZh: '精心策划，为家人挑选贴心礼品',
    descAr: 'منتقاة بعناية للعائلات التي تبحث عن هدايا مدروسة',
    descJa: '大切な方への心のこもったギフト',
    subs: [
      { id: 'under-25', name: 'Under £25 Gifts', nameZh: '25英镑以下礼品', nameAr: 'هدايا أقل من 25 جنيهاً', nameJa: '25ポンド以下ギフト', desc: 'Thoughtful everyday essentials', icon: '💝' },
      { id: 'tech-gifts', name: 'Tech Gifts for Seniors', nameZh: '科技类礼品', nameAr: 'هدايا التقنية لكبار السن', nameJa: 'シニア向けテックギフト', desc: 'Easy-to-use technology products', icon: '📱' },
      { id: 'comfort', name: 'Comfort & Relaxation', nameZh: '舒适与放松', nameAr: 'الراحة والاسترخاء', nameJa: 'コンフォート・リラクゼーション', desc: 'Wellness and comfort products', icon: '🛋️' },
      { id: 'best-sellers', name: 'Best Sellers', nameZh: '畅销产品', nameAr: 'الأكثر مبيعاً', nameJa: 'ベストセラー', desc: 'Our most popular products', icon: '⭐' },
    ]
  },
];

// ─── Helper: get localized category name ──────────────────────────────
function catName(cat, lang) {
  if (lang === 'de') return cat.nameDe || cat.name;
  if (lang === 'fr') return cat.nameFr || cat.name;
  if (lang === 'es') return cat.nameEs || cat.name;
  if (lang === 'zh') return cat.nameZh || cat.name;
  if (lang === 'ar') return cat.nameAr || cat.name;
  if (lang === 'ja') return cat.nameJa || cat.name;
  return cat.name;
}
function catDesc(cat, lang) {
  if (lang === 'de') return cat.descDe || cat.desc;
  if (lang === 'fr') return cat.descFr || cat.desc;
  if (lang === 'es') return cat.descEs || cat.desc;
  if (lang === 'zh') return cat.descZh || cat.desc;
  if (lang === 'ar') return cat.descAr || cat.desc;
  if (lang === 'ja') return cat.descJa || cat.desc;
  return cat.desc;
}
function subName(sub, lang) {
  if (lang === 'zh') return sub.nameZh || sub.name;
  if (lang === 'ar') return sub.nameAr || sub.name;
  if (lang === 'ja') return sub.nameJa || sub.name;
  return sub.name;
}

// ─── Multi-lang text helper: generates data-lang spans ───────────────
// t(key) generates hidden spans for each language
function t(key) {
  return LANGS.map((lang, i) => {
    const isDefault = lang.langCode === 'en';
    const hidden = isDefault ? '' : ' style="display:none"';
    const val = lang[key] || EN[key] || '';
    return `<span data-lang="${lang.langCode}"${hidden}>${val}</span>`;
  }).join('');
}

// Simple text value lookup
function tv(key, langCode) {
  const lang = LANGS.find(l => l.langCode === langCode) || EN;
  return lang[key] || EN[key] || '';
}

// ─── Multi-lang switcher script ───────────────────────────────────────
function langScript() {
  const langList = LANGS.map(l => `{code:'${l.langCode}',dir:'${l.dir}',label:'${l.langCode === 'zh' ? '中' : l.langCode === 'ar' ? 'AR' : l.langCode === 'ja' ? 'JA' : l.langCode.toUpperCase()}'}`).join(',');
  return `<script>
var DSCARO_LANGS=[${langList}];
function setLang(code){
  document.querySelectorAll('[data-lang]').forEach(function(el){
    el.style.display = el.getAttribute('data-lang')===code ? '' : 'none';
  });
  var dir = DSCARO_LANGS.find(function(l){return l.code===code;});
  if(dir){document.documentElement.dir = dir.dir; document.documentElement.lang = code;}
  document.querySelectorAll('.lang-btn').forEach(function(btn){
    btn.classList.toggle('active-lang', btn.getAttribute('data-lcode')===code);
  });
  localStorage.setItem('dscaro-lang', code);
}
(function(){
  var saved = localStorage.getItem('dscaro-lang') || 'en';
  setLang(saved);
})();
</script>`;
}

// ─── Language switcher buttons HTML ──────────────────────────────────
function langButtons() {
  const labels = {en:'EN', de:'DE', fr:'FR', es:'ES', zh:'中', ar:'AR', ja:'JA'};
  return LANGS.map(l =>
    `<button onclick="setLang('${l.langCode}')" data-lcode="${l.langCode}" class="lang-btn px-2 py-0.5 rounded text-xs font-semibold hover:bg-white/30 transition">${labels[l.langCode]}</button>`
  ).join('');
}

// ─── Shared Head ──────────────────────────────────────────────────────
function head(titleKey, descVal) {
  const title = tv(titleKey, 'en') || titleKey;
  const desc = descVal || BRAND.desc;
  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | DS CARO</title>
<meta name="description" content="${desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<script>
tailwind.config = {
  theme: {
    extend: {
      colors: {
        background: '#fafaf8',
        foreground: '#1a1a1a',
        primary: { DEFAULT: '#1e6626', foreground: '#ffffff', light: '#e8f5e9' },
        accent: { DEFAULT: '#e48233', foreground: '#ffffff', light: '#fff3e0' },
        muted: { DEFAULT: '#f5f5f0', foreground: '#6b7280' },
        border: '#e5e5e0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    }
  }
}
</script>
<style>
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth}
body{background:#fafaf8;color:#1a1a1a;margin:0;font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased}
.font-serif{font-family:'Playfair Display',serif!important}
.nav-dropdown{display:none;position:absolute;top:100%;left:0;z-index:50}
.nav-item:hover .nav-dropdown{display:block}
@keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.animate-in{animation:fadeInUp 0.5s ease forwards}
.card-hover{transition:all 0.25s ease}
.card-hover:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,0.12)}
::-webkit-scrollbar{width:6px}
::-webkit-scrollbar-track{background:#f5f5f0}
::-webkit-scrollbar-thumb{background:#1e6626;border-radius:3px}
.lang-btn{opacity:.65}
.active-lang{background:rgba(255,255,255,0.35)!important;opacity:1}
</style>
</head>`;
}

// ─── Shared Nav ───────────────────────────────────────────────────────
function nav(activePage='') {
  const links = [
    {href:'index.html',key:'navHome',id:'home'},
    {href:'products.html',key:'navProducts',id:'products',dropdown:true},
    {href:'solutions.html',key:'navSolutions',id:'solutions'},
    {href:'about.html',key:'navAbout',id:'about'},
    {href:'blog.html',key:'navBlog',id:'blog'},
  ];

  const dropdownItems = CATALOG.map(c => `
    <a href="products-${c.id}.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
      <span class="text-xl">${c.icon}</span>
      <div>
        <div class="text-sm font-medium text-foreground group-hover:text-primary">${LANGS.map((l,i)=>`<span data-lang="${l.langCode}"${i>0?' style="display:none"':''}>${catName(c,l.langCode)}</span>`).join('')}</div>
        <div class="text-xs text-muted-foreground mt-0.5">${LANGS.map((l,i)=>`<span data-lang="${l.langCode}"${i>0?' style="display:none"':''}>${catDesc(c,l.langCode).substring(0,38)}...</span>`).join('')}</div>
      </div>
    </a>`).join('');

  const navLinks = links.map(l => {
    const isActive = activePage === l.id;
    const cls = isActive ? 'border-primary text-primary' : 'border-transparent text-foreground hover:text-primary';
    const label = LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>${tv(l.key,lng.langCode)}</span>`).join('');
    if(l.dropdown) {
      return `<div class="nav-item relative">
        <a href="${l.href}" class="flex items-center gap-1 text-sm font-medium px-1 py-2 border-b-2 transition-colors ${cls}">
          ${label}
          <svg class="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </a>
        <div class="nav-dropdown bg-white border border-border rounded-xl shadow-xl w-72 mt-1 overflow-hidden">
          <div class="px-4 py-2 bg-muted border-b border-border">
            ${LANGS.map((lng,i)=>`<a href="products.html" class="text-xs font-semibold text-primary hover:underline"${i>0?' style="display:none"':''} data-lang="${lng.langCode}">${tv('navViewAll',lng.langCode)}</a>`).join('')}
          </div>
          ${dropdownItems}
        </div>
      </div>`;
    }
    return `<a href="${l.href}" class="text-sm font-medium px-1 py-2 border-b-2 transition-colors ${cls}">${label}</a>`;
  }).join('');

  const bizLabel = LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>${tv('navBusiness',lng.langCode)}</span>`).join('');
  const contactLabel = LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>${tv('navContact',lng.langCode)}</span>`).join('');
  const mobileLinks = links.map(l => {
    const label2 = LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>${tv(l.key,lng.langCode)}</span>`).join('');
    return `<a href="${l.href}" class="block py-2 text-sm font-medium text-foreground hover:text-primary">${label2}</a>`;
  }).join('');

  const topbar1 = LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>${tv('navShipping',lng.langCode)}</span>`).join('');
  const topbar2 = LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>${tv('navCatalog',lng.langCode)}</span>`).join('');
  const shopLabel = LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>${tv('navShop',lng.langCode)}</span>`).join('');

  return `<!-- Top bar -->
<div class="bg-primary text-white text-xs py-2">
  <div class="max-w-7xl mx-auto px-4 flex justify-between items-center">
    <div class="flex gap-4 flex-wrap">
      <span>${topbar1}</span>
      <span class="hidden md:inline">${topbar2}</span>
    </div>
    <div class="flex items-center gap-3">
      <a href="${BRAND.shopUrl}" target="_blank" class="font-medium hover:underline">${shopLabel}</a>
      <div class="flex items-center gap-0.5 ml-1 flex-wrap max-w-[200px]">
        ${langButtons()}
      </div>
    </div>
  </div>
</div>
<!-- Main nav -->
<nav class="bg-white border-b border-border sticky top-0 z-40 shadow-sm">
  <div class="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
    <a href="index.html" class="flex items-center gap-2 group">
      <div class="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white font-serif font-bold text-base">DS</div>
      <div>
        <div class="font-serif font-bold text-lg text-foreground leading-tight">DS CARO</div>
        <div class="text-[10px] text-muted-foreground -mt-0.5 tracking-wide uppercase">Senior Care Solutions</div>
      </div>
    </a>
    <div class="hidden md:flex items-center gap-6">${navLinks}</div>
    <div class="flex items-center gap-3">
      <a href="business.html" class="hidden md:inline-flex items-center gap-1.5 bg-accent text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition">${bizLabel}</a>
      <a href="contact.html" class="hidden md:inline-flex items-center gap-1.5 border border-primary text-primary text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition">${contactLabel}</a>
      <button class="md:hidden p-2" onclick="document.getElementById('mobile-menu').classList.toggle('hidden')">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>
  </div>
  <div id="mobile-menu" class="hidden md:hidden border-t border-border bg-white">
    <div class="px-4 py-3 space-y-1">
      ${mobileLinks}
      <a href="business.html" class="block py-2 text-sm font-semibold text-accent">${bizLabel}</a>
      <a href="contact.html" class="block py-2 text-sm font-medium text-foreground hover:text-primary">${contactLabel}</a>
    </div>
  </div>
</nav>`;
}

// ─── Shared Footer ─────────────────────────────────────────────────────
function footer() {
  const catLinks = CATALOG.map(c =>
    `<li><a href="products-${c.id}.html" class="hover:text-white transition">${LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>${catName(c,lng.langCode)}</span>`).join('')}</a></li>`
  ).join('');

  const mk = (key) => LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>${tv(key,lng.langCode)}</span>`).join('');

  return `<footer class="bg-gray-900 text-gray-300 mt-20">
  <div class="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
    <div class="md:col-span-1">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white font-serif font-bold text-base">DS</div>
        <span class="font-serif font-bold text-lg text-white">DS CARO</span>
      </div>
      <p class="text-sm leading-relaxed mb-4">${mk('footerDesc')}</p>
      <div class="text-sm space-y-1">
        <div>👤 ${BRAND.contact}</div>
        <div>📧 <a href="mailto:${BRAND.email}" class="hover:text-white">${BRAND.email}</a></div>
        <div>📞 <a href="tel:${BRAND.phone}" class="hover:text-white">${BRAND.phone}</a></div>
        <div>📍 ${BRAND.address}</div>
      </div>
    </div>
    <div>
      <h4 class="text-white font-semibold mb-4">${mk('footerProducts')}</h4>
      <ul class="space-y-2 text-sm">
        ${catLinks}
        <li>${LANGS.map((lng,i)=>`<a href="products.html" class="hover:text-white text-accent transition"${i>0?' style="display:none"':''} data-lang="${lng.langCode}">${tv('navViewAll',lng.langCode)} →</a>`).join('')}</li>
      </ul>
    </div>
    <div>
      <h4 class="text-white font-semibold mb-4">${mk('footerBusiness')}</h4>
      <ul class="space-y-2 text-sm">
        <li>${LANGS.map((lng,i)=>`<a href="business.html" class="hover:text-white transition"${i>0?' style="display:none"':''} data-lang="${lng.langCode}">${tv('footerWholesale',lng.langCode)}</a>`).join('')}</li>
        <li>${LANGS.map((lng,i)=>`<a href="business.html#pricing" class="hover:text-white transition"${i>0?' style="display:none"':''} data-lang="${lng.langCode}">${tv('footerBulk',lng.langCode)}</a>`).join('')}</li>
        <li>${LANGS.map((lng,i)=>`<a href="business.html#oem" class="hover:text-white transition"${i>0?' style="display:none"':''} data-lang="${lng.langCode}">${tv('footerOEM',lng.langCode)}</a>`).join('')}</li>
        <li>${LANGS.map((lng,i)=>`<a href="business.html#quote" class="hover:text-white transition"${i>0?' style="display:none"':''} data-lang="${lng.langCode}">${tv('footerQuote',lng.langCode)}</a>`).join('')}</li>
        <li>${LANGS.map((lng,i)=>`<a href="contact.html" class="hover:text-white transition"${i>0?' style="display:none"':''} data-lang="${lng.langCode}">${tv('footerDemo',lng.langCode)}</a>`).join('')}</li>
      </ul>
    </div>
    <div>
      <h4 class="text-white font-semibold mb-4">${mk('footerCompany')}</h4>
      <ul class="space-y-2 text-sm">
        <li>${LANGS.map((lng,i)=>`<a href="about.html" class="hover:text-white transition"${i>0?' style="display:none"':''} data-lang="${lng.langCode}">${tv('footerAbout',lng.langCode)}</a>`).join('')}</li>
        <li>${LANGS.map((lng,i)=>`<a href="solutions.html" class="hover:text-white transition"${i>0?' style="display:none"':''} data-lang="${lng.langCode}">${tv('footerSolutions',lng.langCode)}</a>`).join('')}</li>
        <li>${LANGS.map((lng,i)=>`<a href="blog.html" class="hover:text-white transition"${i>0?' style="display:none"':''} data-lang="${lng.langCode}">${tv('footerBlog',lng.langCode)}</a>`).join('')}</li>
        <li>${LANGS.map((lng,i)=>`<a href="contact.html" class="hover:text-white transition"${i>0?' style="display:none"':''} data-lang="${lng.langCode}">${tv('footerContact',lng.langCode)}</a>`).join('')}</li>
      </ul>
      <div class="mt-6">
        <h4 class="text-white font-semibold mb-3">${mk('footerShop')}</h4>
        <a href="${BRAND.shopUrl}" target="_blank" class="inline-flex items-center gap-2 bg-accent text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition">
          <span>🛒</span>${mk('footerVisit')}
        </a>
      </div>
    </div>
  </div>
  <div class="border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
      <div>© 2026 DS CARO. ${mk('footerRights')}</div>
      <div class="flex gap-4">
        ${LANGS.map((lng,i)=>`<a href="#" class="hover:text-white"${i>0?' style="display:none"':''} data-lang="${lng.langCode}">${tv('footerPrivacy',lng.langCode)}</a>`).join('')}
        ${LANGS.map((lng,i)=>`<a href="#" class="hover:text-white"${i>0?' style="display:none"':''} data-lang="${lng.langCode}">${tv('footerTerms',lng.langCode)}</a>`).join('')}
        ${LANGS.map((lng,i)=>`<a href="#" class="hover:text-white"${i>0?' style="display:none"':''} data-lang="${lng.langCode}">${tv('footerAccess',lng.langCode)}</a>`).join('')}
      </div>
    </div>
  </div>
</footer>`;
}

// ─── mk helper: multi-lang inline block ──────────────────────────────
function mk(key, className) {
  const cls = className ? ` class="${className}"` : '';
  return LANGS.map((lng,i)=>
    `<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}${cls}>${tv(key,lng.langCode)}</span>`
  ).join('');
}

// ─── Page: index.html ─────────────────────────────────────────────────
function buildIndex() {
  const stats = [
    { n: '500+', key: 'stat1' },
    { n: '10,000+', key: 'stat2' },
    { n: '30+', key: 'stat3' },
    { n: '95%', key: 'stat4' },
  ];

  const features = [
    { icon: '🏭', tKey: 'whyF1T', dKey: 'whyF1D' },
    { icon: '📦', tKey: 'whyF2T', dKey: 'whyF2D' },
    { icon: '🏷️', tKey: 'whyF3T', dKey: 'whyF3D' },
    { icon: '📋', tKey: 'whyF4T', dKey: 'whyF4D' },
  ];

  const testimonials = [
    { name: 'Margaret H.', role: 'Procurement Manager, NHS Trust',
      en: 'DS CARO has become our preferred supplier for patient mobility aids. Consistent quality, fast delivery, and the team is always responsive.',
      de: 'DS CARO ist unser bevorzugter Lieferant für Patientenmobilitätshilfen geworden. Konstante Qualität, schnelle Lieferung.',
      fr: 'DS CARO est devenu notre fournisseur préféré. Qualité constante, livraison rapide, équipe toujours réactive.',
      es: 'DS CARO se ha convertido en nuestro proveedor preferido. Calidad constante, entrega rápida y equipo siempre receptivo.',
      zh: 'DS CARO已成为我们优选的患者辅助产品供应商。质量稳定、配送及时、团队响应迅速。',
      ar: 'أصبح DS CARO مورّدنا المفضّل لمساعدات تنقل المرضى. جودة ثابتة وتوصيل سريع.',
      ja: 'DS CAROは患者の移動補助具の優先サプライヤーになりました。一貫した品質と迅速な配送。' },
    { name: 'Lars V.', role: 'Director, Nordic Care Group',
      en: 'The OEM packaging service is excellent. Our residents love the products and the discreet design aligns perfectly with our care philosophy.',
      de: 'Der OEM-Verpackungsservice ist ausgezeichnet. Unsere Bewohner lieben die Produkte und das diskrete Design.',
      fr: "Le service d'emballage OEM est excellent. Nos résidents adorent les produits et le design discret.",
      es: 'El servicio de embalaje OEM es excelente. Nuestros residentes adoran los productos y el diseño discreto.',
      zh: 'OEM定制包装服务非常出色。居民们都喜欢这些产品，低调的设计与我们的护理理念完美契合。',
      ar: 'خدمة تعبئة OEM ممتازة. يحب سكاننا المنتجات والتصميم الأنيق.',
      ja: 'OEMパッケージングサービスは素晴らしい。入居者は製品を愛用しており、控えめなデザインが理念に合っています。' },
    { name: 'Claire B.', role: 'Owner, Home Care Agency',
      en: "We've been ordering for 2 years. Competitive wholesale pricing and the quality never disappoints. Highly recommend for any care business.",
      de: 'Wir bestellen seit 2 Jahren. Wettbewerbsfähige Großhandelspreise und die Qualität enttäuscht nie.',
      fr: 'Nous commandons depuis 2 ans. Prix de gros compétitifs et la qualité ne déçoit jamais.',
      es: 'Llevamos 2 años haciendo pedidos. Precios mayoristas competitivos y la calidad nunca decepciona.',
      zh: '我们已合作两年。批发价格有竞争力，质量始终如一。强烈推荐给所有护理机构。',
      ar: 'نطلب منذ سنتين. أسعار جملة تنافسية والجودة لا تخيب أبداً.',
      ja: '2年間注文しています。競争力のある卸売価格で品質は常に期待に応えます。' },
  ];

  const certBadges = [
    { code:'CE', label:'CE Certified' },
    { code:'FDA', label:'FDA Registered' },
    { code:'ISO', label:'ISO 13485' },
    { code:'GDPR', label:'GDPR Ready' },
    { code:'UKCA', label:'UKCA Marked' },
  ];

  return `${head('Premium Senior Care Solutions for Business & Family')}
<body class="bg-background">
${nav('home')}

<!-- Hero -->
<section class="relative overflow-hidden bg-gradient-to-br from-primary-light via-white to-accent-light py-20 md:py-28">
  <div class="absolute inset-0 opacity-5" style="background-image:url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%231e6626 fill-opacity=0.4%3E%3Cpath d=M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"></div>
  <div class="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative">
    <div class="animate-in">
      <div class="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
        <span>🏆</span> ${LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>Trusted by 500+ Care Facilities Across Europe</span>`).join('')}
      </div>
      <h1 class="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
        ${LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''} class="block">${tv('heroLine1',lng.langCode)}<br><span class="text-primary">${tv('heroLine2',lng.langCode)}</span></span>`).join('')}
      </h1>
      <p class="text-lg text-muted-foreground leading-relaxed mb-8">${mk('heroDesc')}</p>
      <div class="flex flex-wrap gap-4">
        <a href="business.html#quote" class="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-800 transition shadow-lg">
          ${mk('heroBtn1')} →
        </a>
        <a href="products.html" class="inline-flex items-center gap-2 border-2 border-primary text-primary font-semibold px-6 py-3 rounded-xl hover:bg-primary hover:text-white transition">
          ${mk('heroBtn2')}
        </a>
        <a href="${BRAND.shopUrl}" target="_blank" class="inline-flex items-center gap-2 bg-accent text-white font-semibold px-6 py-3 rounded-xl hover:bg-orange-600 transition">
          🛒 ${mk('heroBtn3')}
        </a>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      ${stats.map(s=>`<div class="bg-white rounded-2xl p-6 shadow-sm border border-border card-hover text-center">
        <div class="text-3xl font-bold text-primary mb-1">${s.n}</div>
        <div class="text-sm text-muted-foreground">${mk(s.key)}</div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- Trust badges -->
<section class="bg-white border-y border-border py-6">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex flex-wrap justify-center items-center gap-8 text-center">
      ${certBadges.map(b=>`<div class="flex items-center gap-2">
        <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">${b.code}</div>
        <span class="text-sm font-medium text-foreground">${b.label}</span>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- Product Categories -->
<section class="py-20 bg-background">
  <div class="max-w-7xl mx-auto px-4">
    <div class="text-center mb-14">
      <h2 class="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">${mk('catTitle')}</h2>
      <p class="text-muted-foreground text-lg max-w-2xl mx-auto">${mk('catSub')}</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      ${CATALOG.map(c=>`<a href="products-${c.id}.html" class="group bg-white rounded-2xl border border-border p-6 card-hover">
        <div class="text-4xl mb-4">${c.icon}</div>
        <h3 class="font-semibold text-foreground text-lg mb-2 group-hover:text-primary transition">${LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>${catName(c,lng.langCode)}</span>`).join('')}</h3>
        <p class="text-sm text-muted-foreground mb-4">${LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>${catDesc(c,lng.langCode)}</span>`).join('')}</p>
        <div class="flex flex-wrap gap-2 mb-4">
          ${c.subs.slice(0,3).map(s=>`<span class="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">${s.name}</span>`).join('')}
          ${c.subs.length>3?`<span class="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">+${c.subs.length-3} more</span>`:''}
        </div>
        <span class="text-sm font-semibold text-primary group-hover:underline">${mk('catViewCat')}</span>
      </a>`).join('')}
    </div>
    <div class="text-center mt-10">
      <a href="products.html" class="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-green-800 transition shadow-md">
        ${mk('navViewAll')} →
      </a>
    </div>
  </div>
</section>

<!-- Why DS CARO -->
<section class="py-20 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4">
    <div class="grid md:grid-cols-2 gap-16 items-center">
      <div>
        <h2 class="font-serif text-3xl font-bold text-foreground mb-6">${mk('whyTitle')}</h2>
        <div class="space-y-5">
          ${features.map(f=>`<div class="flex gap-4">
            <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-xl flex-shrink-0">${f.icon}</div>
            <div>
              <h4 class="font-semibold text-foreground mb-1">${mk(f.tKey)}</h4>
              <p class="text-sm text-muted-foreground">${mk(f.dKey)}</p>
            </div>
          </div>`).join('')}
        </div>
      </div>
      <div class="space-y-4">
        ${testimonials.map(testimonial=>`<div class="bg-white rounded-2xl p-6 border border-border shadow-sm">
          <div class="flex gap-1 text-accent mb-3">★★★★★</div>
          <p class="text-sm text-foreground leading-relaxed mb-4">
            ${LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none":' :''}"${testimonial[lng.langCode]||testimonial.en}"</span>`).join('')}
          </p>
          <div>
            <div class="text-sm font-semibold text-foreground">${testimonial.name}</div>
            <div class="text-xs text-muted-foreground">${testimonial.role}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</section>

<!-- CTA Banner -->
<section class="py-16 bg-primary text-white">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h2 class="font-serif text-3xl font-bold mb-4">${mk('ctaTitle')}</h2>
    <p class="text-green-100 mb-8 text-lg">${mk('ctaSub')}</p>
    <div class="flex flex-wrap justify-center gap-4">
      <a href="business.html#quote" class="bg-white text-primary font-bold px-8 py-3.5 rounded-xl hover:bg-gray-100 transition shadow-md">${mk('ctaBtn1')}</a>
      <a href="${BRAND.shopUrl}" target="_blank" class="bg-accent text-white font-bold px-8 py-3.5 rounded-xl hover:bg-orange-600 transition shadow-md">🛒 ${mk('ctaBtn2')}</a>
    </div>
  </div>
</section>

${footer()}
${langScript()}
</body></html>`;
}

// ─── Page: about.html ─────────────────────────────────────────────────
function buildAbout() {
  return `${head('About Us')}
<body class="bg-background">
${nav('about')}

<section class="bg-gradient-to-br from-primary-light to-white py-20">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <div class="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-6">${mk('aboutBadge')}</div>
    <h1 class="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
      ${LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''} class="block">${tv('aboutH1a',lng.langCode)}<br><span class="text-primary">${tv('aboutH1b',lng.langCode)}</span></span>`).join('')}
    </h1>
    <p class="text-lg text-muted-foreground max-w-2xl mx-auto">${mk('aboutP')}</p>
    <div class="grid grid-cols-3 gap-6 mt-12 max-w-lg mx-auto">
      ${[['10,000+','stat2'],['500+','stat1'],['30+','stat3']].map(s=>`<div class="bg-white rounded-2xl p-5 shadow-sm border border-border">
        <div class="text-2xl font-bold text-primary">${s[0]}</div>
        <div class="text-xs text-muted-foreground mt-1">${mk(s[1])}</div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <div class="text-center mb-14">
      <h2 class="font-serif text-3xl font-bold text-foreground mb-3">${mk('aboutValTitle')}</h2>
      <p class="text-muted-foreground">${mk('aboutValSub')}</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      ${[
        {icon:'❤️',tKey:'aboutV1T',dKey:'aboutV1D'},
        {icon:'🏆',tKey:'aboutV2T',dKey:'aboutV2D'},
        {icon:'💡',tKey:'aboutV3T',dKey:'aboutV3D'},
        {icon:'🌿',tKey:'aboutV4T',dKey:'aboutV4D'},
      ].map(v=>`<div class="bg-muted rounded-2xl p-6 text-center card-hover">
        <div class="text-4xl mb-4">${v.icon}</div>
        <h3 class="font-semibold text-foreground mb-3">${mk(v.tKey)}</h3>
        <p class="text-sm text-muted-foreground">${mk(v.dKey)}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <div class="grid md:grid-cols-2 gap-16 items-center">
      <div>
        <div class="inline-flex items-center gap-2 bg-accent/10 text-accent text-xs font-semibold px-3 py-1.5 rounded-full mb-6">${mk('aboutStoryBadge')}</div>
        <h2 class="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">${mk('aboutStoryH')}</h2>
        <div class="space-y-4 text-muted-foreground leading-relaxed">
          <p>${mk('aboutStoryP1')}</p>
          <p>${mk('aboutStoryP2')}</p>
          <p>${mk('aboutStoryP3')}</p>
        </div>
      </div>
      <div class="space-y-6">
        <div class="bg-primary/5 rounded-2xl p-8 border border-primary/10">
          <div class="text-5xl mb-4">💬</div>
          <blockquote class="font-serif text-xl text-foreground italic leading-relaxed mb-4">${mk('aboutQuote')}</blockquote>
          <div class="flex items-center gap-3 mt-4">
            <div class="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-serif font-bold text-lg">C</div>
            <div>
              <div class="font-semibold text-foreground">Caro Chen</div>
              <div class="text-sm text-muted-foreground">${mk('aboutFounderTitle')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-20 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4">
    <div class="text-center mb-14">
      <h2 class="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">${mk('aboutTeamTitle')}</h2>
      <p class="text-muted-foreground text-lg max-w-2xl mx-auto">${mk('aboutTeamSub')}</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      ${[
        {initial:'C',name:'Caro Chen',roleKey:'aboutTeamT1',bioKey:'aboutTeamB1',color:'bg-primary'},
        {initial:'P',name:'Product & Sourcing',roleKey:'aboutTeamT2',bioKey:'aboutTeamB2',color:'bg-accent'},
        {initial:'B',name:'B2B & Partnerships',roleKey:'aboutTeamT3',bioKey:'aboutTeamB3',color:'bg-green-700'},
      ].map(m=>`<div class="bg-white rounded-2xl p-8 border border-border shadow-sm card-hover text-center">
        <div class="w-20 h-20 rounded-full ${m.color} flex items-center justify-center text-white font-serif font-bold text-3xl mx-auto mb-5">${m.initial}</div>
        <h3 class="font-serif text-xl font-bold text-foreground mb-1">${m.name}</h3>
        <div class="text-sm font-semibold text-primary mb-4">${mk(m.roleKey)}</div>
        <p class="text-sm text-muted-foreground leading-relaxed">${mk(m.bioKey)}</p>
      </div>`).join('')}
    </div>
    <div class="mt-12 bg-primary/5 rounded-2xl p-8 border border-primary/10 text-center">
      <h3 class="font-serif text-xl font-bold text-foreground mb-3">${mk('aboutGrowTitle')}</h3>
      <p class="text-muted-foreground mb-5">${mk('aboutGrowSub')}</p>
      <a href="contact.html" class="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-800 transition">${mk('aboutGetTouch')}</a>
    </div>
  </div>
</section>

<section class="py-20 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <div class="text-center mb-14">
      <h2 class="font-serif text-3xl font-bold text-foreground mb-3">${mk('aboutJourneyTitle')}</h2>
      <p class="text-muted-foreground">${mk('aboutJourneySub')}</p>
    </div>
    <div class="relative">
      <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20"></div>
      <div class="space-y-8">
        ${[
          {year:'2023',key:'aboutT1'},
          {year:'2024',key:'aboutT2'},
          {year:'2024',key:'aboutT3'},
          {year:'2025',key:'aboutT4'},
          {year:'2026',key:'aboutT5'},
        ].map(t=>`<div class="flex gap-6 items-start">
          <div class="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0 relative z-10">${t.year}</div>
          <div class="bg-white rounded-xl p-4 shadow-sm border border-border flex-1 mt-1">
            <p class="text-sm text-foreground">${mk(t.key)}</p>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</section>

<section class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 text-center">
    <h2 class="font-serif text-3xl font-bold text-foreground mb-4">${mk('aboutCertTitle')}</h2>
    <p class="text-muted-foreground mb-12">${mk('aboutCertSub')}</p>
    <div class="flex flex-wrap justify-center gap-6">
      ${[['CE','CE Certified'],['FDA','FDA Registered'],['ISO','ISO 13485'],['UKCA','UKCA Marked'],['GDPR','GDPR Ready']].map(c=>`<div class="bg-muted rounded-2xl p-6 w-32 text-center card-hover">
        <div class="w-14 h-14 rounded-xl bg-primary text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">${c[0]}</div>
        <div class="text-xs font-semibold text-foreground">${c[1]}</div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="py-16 bg-primary text-white">
  <div class="max-w-3xl mx-auto px-4 text-center">
    <h2 class="font-serif text-3xl font-bold mb-4">${mk('aboutMissionTitle')}</h2>
    <p class="text-green-100 mb-8">${mk('aboutMissionSub')}</p>
    <div class="flex flex-wrap justify-center gap-4">
      <a href="products.html" class="bg-white text-primary font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition">${mk('aboutExplore')}</a>
      <a href="contact.html" class="border-2 border-white text-white font-bold px-8 py-3 rounded-xl hover:bg-white/10 transition">${mk('aboutContact')}</a>
    </div>
  </div>
</section>

${footer()}
${langScript()}
</body></html>`;
}

// ─── Page: products.html ──────────────────────────────────────────────
function buildProductsOverview() {
  return `${head('All Products')}
<body class="bg-background">
${nav('products')}

<section class="bg-gradient-to-br from-primary-light to-white py-16">
  <div class="max-w-7xl mx-auto px-4">
    <nav class="text-sm text-muted-foreground mb-6">
      <a href="index.html" class="hover:text-primary">${mk('prodBreadHome')}</a>
      <span class="mx-2">/</span><span>${mk('prodTitle')}</span>
    </nav>
    <h1 class="font-serif text-4xl font-bold text-foreground mb-4">${mk('prodTitle')}</h1>
    <p class="text-lg text-muted-foreground max-w-2xl">${mk('prodSub')}</p>
  </div>
</section>

<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <div class="space-y-16">
      ${CATALOG.map(cat=>`
      <div id="${cat.id}">
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">${cat.icon}</div>
            <div>
              <h2 class="font-serif text-2xl font-bold text-foreground">${LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>${catName(cat,lng.langCode)}</span>`).join('')}</h2>
              <p class="text-sm text-muted-foreground">${LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>${catDesc(cat,lng.langCode)}</span>`).join('')}</p>
            </div>
          </div>
          <a href="products-${cat.id}.html" class="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">${mk('prodViewAll')} →</a>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          ${cat.subs.map(sub=>`<a href="products-${cat.id}.html#${sub.id}" class="group bg-muted rounded-2xl p-5 card-hover border border-border">
            <div class="text-3xl mb-3">${sub.icon}</div>
            <h3 class="font-semibold text-foreground mb-2 group-hover:text-primary transition">${LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>${subName(sub,lng.langCode)}</span>`).join('')}</h3>
            <p class="text-xs text-muted-foreground">${sub.desc}</p>
          </a>`).join('')}
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="py-14 bg-primary/5 border-y border-primary/10">
  <div class="max-w-3xl mx-auto px-4 text-center">
    <h3 class="font-serif text-2xl font-bold text-foreground mb-3">${mk('prodB2BTitle')}</h3>
    <p class="text-muted-foreground mb-6">${mk('prodB2BSub')}</p>
    <div class="flex flex-wrap justify-center gap-4">
      <a href="business.html#quote" class="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-green-800 transition">${mk('prodWholesale')}</a>
      <a href="${BRAND.shopUrl}" target="_blank" class="bg-accent text-white font-bold px-8 py-3 rounded-xl hover:bg-orange-600 transition">🛒 ${mk('prodShopRetail')}</a>
    </div>
  </div>
</section>

${footer()}
${langScript()}
</body></html>`;
}

// ─── Page: products-{cat}.html ─────────────────────────────────────────
function buildCategoryPage(cat) {
  const prices = ['£24.99','£34.99','£44.99','£59.99','£79.99','£99.99'];
  const productCard = (sub, idx) => {
    const price = prices[idx % prices.length];
    return `<div class="bg-white rounded-2xl border border-border overflow-hidden card-hover group">
      <div class="aspect-square bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
        <span class="text-7xl">${sub.icon}</span>
      </div>
      <div class="p-5">
        <div class="text-xs font-semibold text-primary mb-1 uppercase tracking-wide">${LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>${subName(sub,lng.langCode)}</span>`).join('')}</div>
        <h4 class="font-semibold text-foreground mb-2 text-sm">Premium ${sub.name} — Model ${String.fromCharCode(65+idx)}</h4>
        <p class="text-xs text-muted-foreground mb-4">${sub.desc}</p>
        <div class="flex items-center justify-between">
          <span class="font-bold text-foreground">${price}</span>
          <a href="business.html#quote" class="text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-green-800 transition">${mk('catPagePrice')}</a>
        </div>
      </div>
    </div>`;
  };

  const subSections = cat.subs.map((sub,si)=>`
  <section id="${sub.id}" class="mb-16">
    <div class="flex items-center gap-3 mb-6">
      <span class="text-3xl">${sub.icon}</span>
      <div>
        <h2 class="font-serif text-2xl font-bold text-foreground">${LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>${subName(sub,lng.langCode)}</span>`).join('')}</h2>
        <p class="text-sm text-muted-foreground">${sub.desc}</p>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      ${[0,1,2,3].map(i=>productCard(sub,si*4+i)).join('')}
    </div>
  </section>`).join('');

  return `${head(`${cat.name} Products`)}
<body class="bg-background">
${nav('products')}

<section class="bg-gradient-to-br from-primary-light to-white py-14">
  <div class="max-w-7xl mx-auto px-4">
    <nav class="text-sm text-muted-foreground mb-5">
      <a href="index.html" class="hover:text-primary">${mk('catPageHome')}</a>
      <span class="mx-2">/</span>
      <a href="products.html" class="hover:text-primary">${mk('prodTitle')}</a>
      <span class="mx-2">/</span>
      <span class="text-foreground font-medium">${LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>${catName(cat,lng.langCode)}</span>`).join('')}</span>
    </nav>
    <div class="flex items-center gap-5">
      <div class="w-16 h-16 rounded-2xl bg-white shadow-sm border border-border flex items-center justify-center text-4xl">${cat.icon}</div>
      <div>
        <h1 class="font-serif text-3xl md:text-4xl font-bold text-foreground">${LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>${catName(cat,lng.langCode)}</span>`).join('')}</h1>
        <p class="text-muted-foreground mt-1">${LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>${catDesc(cat,lng.langCode)}</span>`).join('')}</p>
      </div>
    </div>
    <div class="flex flex-wrap gap-2 mt-8">
      <a href="#all" class="px-4 py-1.5 bg-primary text-white text-sm font-medium rounded-full">${mk('catPageAllBtn')}</a>
      ${cat.subs.map(s=>`
        ${LANGS.map((lng,i)=>`<a href="#${s.id}" class="px-4 py-1.5 bg-white border border-border text-sm font-medium rounded-full hover:border-primary hover:text-primary transition"${i>0?' style="display:none"':''} data-lang="${lng.langCode}">${subName(s,lng.langCode)}</a>`).join('')}
      `).join('')}
    </div>
  </div>
</section>

<section id="all" class="py-16 bg-background">
  <div class="max-w-7xl mx-auto px-4">
    ${subSections}
  </div>
</section>

<div class="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg py-3 px-4 flex items-center justify-between z-30">
  <div class="flex items-center gap-3">
    <div class="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold">0</div>
    <span class="text-sm font-medium text-foreground">${mk('catPageItems')}</span>
  </div>
  <a href="business.html#quote" class="bg-primary text-white text-sm font-semibold px-6 py-2 rounded-lg hover:bg-green-800 transition">${mk('catPageSubmit')}</a>
</div>
<div class="h-16"></div>

${footer()}
${langScript()}
</body></html>`;
}

// ─── Page: solutions.html ─────────────────────────────────────────────
function buildSolutions() {
  const bundles = [
    { icon:'🛁', enT:'Bathroom Safety Kit', tagEn:'Most Popular',
      desc:'Complete bathroom fall-prevention solution. Includes suction grab bar, foldable shower seat, non-slip bath mat, and handheld shower.',
      price:'£89', items:['Suction Grab Bar × 2','Foldable Shower Seat','Non-slip Bath Mat','Handheld Shower Head'], targets:'NHS Trusts, Care Homes, Home Care Agencies' },
    { icon:'🍽️', enT:'Independent Eating Set', tagEn:'Arthritis Friendly',
      desc:'Everything needed for dignified, independent mealtimes. Adaptive cutlery, plate guards, jar opener, and non-slip mat.',
      price:'£54', items:['Built-up Handle Cutlery Set','Weighted Spoon','Scoop Plate with Guard','Electric Jar Opener'], targets:'Occupational Therapists, Day Care Centres' },
    { icon:'🔔', enT:'Fall Prevention Pack', tagEn:'Privacy First',
      desc:'Non-camera fall detection and lighting solution. mmWave radar sensor, motion night lights, and wearable alert pendant.',
      price:'£149', items:['mmWave Radar Sensor','Motion Sensor Night Light × 2','Wearable Fall Alert Pendant','Emergency Contact Card'], targets:'Independent Living Schemes, Sheltered Housing' },
    { icon:'💊', enT:'Dementia Care Box', tagEn:'Specialist Care',
      desc:'Designed for memory care environments. Smart pill dispenser, simplified phone, GPS tracker, and large-print organizer.',
      price:'£199', items:['Smart Pill Dispenser','Simplified Big-Button Phone','GPS Personal Tracker','Large-Print Weekly Planner'], targets:'Memory Care Units, Dementia Specialist Services' },
    { icon:'🧦', enT:'Dressing Independence Kit', tagEn:'Daily Living',
      desc:'Complete dressing aid collection for independent dressing.',
      price:'£39', items:['Sock Aid','Long Handle Shoe Horn','Button Hook & Zip Pull','Elastic Shoe Laces (3 pairs)'], targets:'Rehabilitation Centres, OT Services' },
    { icon:'🎁', enT:'Caregiver Starter Kit', tagEn:'Gift Ready',
      desc:'The essential bundle for new caregivers and families. Covers bathroom, kitchen, mobility, and safety basics.',
      price:'£129', items:['Grab Bar (Suction)','Adaptive Cutlery Set','Bed Rail Handle','Motion Night Light'], targets:'Family Caregivers, Gift Purchases, Onboarding Kits' },
  ];

  return `${head('Care Solutions')}
<body class="bg-background">
${nav('solutions')}

<section class="bg-gradient-to-br from-primary-light to-white py-16">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h1 class="font-serif text-4xl font-bold text-foreground mb-4">${mk('solTitle')}</h1>
    <p class="text-lg text-muted-foreground mb-8">${mk('solSub')}</p>
    <div class="flex flex-wrap justify-center gap-4">
      <a href="business.html#catalog" class="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-green-800 transition">${mk('solDownload')}</a>
      <a href="business.html#quote" class="border-2 border-primary text-primary font-bold px-8 py-3 rounded-xl hover:bg-primary hover:text-white transition">${mk('solRequest')}</a>
    </div>
  </div>
</section>

<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${bundles.map(b=>`<div class="bg-background rounded-2xl border border-border overflow-hidden card-hover flex flex-col">
        <div class="bg-primary/5 p-8 text-center"><span class="text-5xl">${b.icon}</span></div>
        <div class="p-6 flex flex-col flex-1">
          <div class="flex items-start justify-between mb-3">
            <h3 class="font-serif text-lg font-bold text-foreground">${b.enT}</h3>
            <span class="text-xs bg-accent/10 text-accent font-semibold px-2 py-1 rounded-full whitespace-nowrap ml-2">${b.tagEn}</span>
          </div>
          <p class="text-sm text-muted-foreground mb-4">${b.desc}</p>
          <div class="bg-muted rounded-xl p-4 mb-4">
            <div class="text-xs font-semibold text-foreground mb-2">${mk('solIncludes')}</div>
            <ul class="space-y-1">${b.items.map(i=>`<li class="text-xs text-muted-foreground flex gap-2"><span class="text-primary">✓</span>${i}</li>`).join('')}</ul>
          </div>
          <div class="text-xs text-muted-foreground mb-5"><span class="font-semibold">${mk('solIdeal')}</span> ${b.targets}</div>
          <div class="flex items-center justify-between mt-auto">
            <div>
              <div class="text-xs text-muted-foreground">${mk('solFrom')}</div>
              <div class="text-xl font-bold text-foreground">${b.price}</div>
            </div>
            <div class="flex flex-col gap-2">
              <a href="business.html#quote" class="bg-primary text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-green-800 transition text-center">${mk('solGetQuote')}</a>
              <a href="${BRAND.shopUrl}" target="_blank" class="bg-accent text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition text-center">🛒 ${mk('solBuyRetail')}</a>
            </div>
          </div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

${footer()}
${langScript()}
</body></html>`;
}

// ─── Page: business.html ──────────────────────────────────────────────
function buildBusiness() {
  const tiers = [
    { name:'Starter', discount:'15% off MSRP', moq:'£1,000 / month', color:'border-border', badge:'', perks:['Standard shipping','Email support','Basic compliance docs','Net 15 payment terms'] },
    { name:'Professional', discount:'20% off MSRP', moq:'£5,000 / month', color:'border-primary', badge:'Most Popular', perks:['Free shipping','Priority support','Full compliance documentation','Net 30 payment terms','Quarterly business review'] },
    { name:'Enterprise', discount:'25%+ off MSRP', moq:'£25,000 / month', color:'border-accent', badge:'Best Value', perks:['Express shipping','Dedicated account manager','Custom packaging & OEM','Net 60 payment terms','On-site training available','Co-branding / white-label'] },
  ];

  return `${head('For Business')}
<body class="bg-background">
${nav()}

<section class="bg-gradient-to-br from-primary to-green-900 text-white py-20">
  <div class="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
    <div>
      <div class="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6">${mk('bizBadge')}</div>
      <h1 class="font-serif text-4xl font-bold mb-6">
        ${LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''} class="block">${tv('bizH1a',lng.langCode)}<br>${tv('bizH1b',lng.langCode)}</span>`).join('')}
      </h1>
      <p class="text-green-100 text-lg mb-8">${mk('bizP')}</p>
      <div class="flex flex-wrap gap-4">
        <a href="#quote" class="bg-white text-primary font-bold px-8 py-3.5 rounded-xl hover:bg-gray-100 transition shadow-lg">${mk('bizApply')}</a>
        <a href="#catalog" class="border-2 border-white text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 transition">${mk('bizDownload')}</a>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      ${[['500+','bizStats',0],['95%','bizStats',1],['24-48h','bizStats',2],['CE/UKCA','bizStats',3]].map(s=>`<div class="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
        <div class="text-3xl font-bold text-white mb-1">${s[0]}</div>
        <div class="text-green-200 text-sm">${LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>${(lang_=LANGS.find(l=>l.langCode===lng.langCode),lang_.bizStats&&lang_.bizStats[s[2]])||EN.bizStats[s[2]]}</span>`).join('')}</div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section id="pricing" class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <div class="text-center mb-14">
      <h2 class="font-serif text-3xl font-bold text-foreground mb-4">${mk('bizPricingTitle')}</h2>
      <p class="text-muted-foreground">${mk('bizPricingSub')}</p>
    </div>
    <div class="grid md:grid-cols-3 gap-6">
      ${tiers.map((t,ti)=>`<div class="rounded-2xl border-2 ${t.color} p-8 flex flex-col relative">
        ${t.badge?`<div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold px-4 py-1 rounded-full">${t.badge}</div>`:''}
        <h3 class="font-serif text-xl font-bold text-foreground mb-2">${LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>${(LANGS.find(l=>l.langCode===lng.langCode).tierNames||EN.tierNames)[ti]}</span>`).join('')}</h3>
        <div class="text-3xl font-bold text-primary mb-1">${t.discount}</div>
        <div class="text-sm text-muted-foreground mb-6">${mk('bizMin')} ${t.moq}</div>
        <ul class="space-y-3 mb-8 flex-1">${t.perks.map(p=>`<li class="flex gap-2 text-sm text-foreground"><span class="text-primary font-bold">✓</span>${p}</li>`).join('')}</ul>
        <a href="#quote" class="block text-center bg-primary text-white font-semibold py-3 rounded-xl hover:bg-green-800 transition">${mk('bizApplyNow')}</a>
      </div>`).join('')}
    </div>
    <p class="text-center text-sm text-muted-foreground mt-6">${mk('bizCustom')}</p>
  </div>
</section>

<section id="oem" class="py-20 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4">
    <div class="grid md:grid-cols-2 gap-16 items-center">
      <div>
        <h2 class="font-serif text-3xl font-bold text-foreground mb-6">${mk('bizOEMTitle')}</h2>
        <p class="text-muted-foreground mb-8">${mk('bizOEMSub')}</p>
        <div class="grid grid-cols-2 gap-4">
          ${[{icon:'🏷️',i:0},{icon:'🎨',i:1},{icon:'📋',i:2},{icon:'🏭',i:3}].map(f=>`<div class="bg-white rounded-xl p-4 border border-border card-hover text-center">
            <div class="text-3xl mb-2">${f.icon}</div>
            <div class="text-sm font-semibold text-foreground">${LANGS.map((lng,i2)=>`<span data-lang="${lng.langCode}"${i2>0?' style="display:none"':''}>${(LANGS.find(l=>l.langCode===lng.langCode).bizOEMF||EN.bizOEMF)[f.i]}</span>`).join('')}</div>
          </div>`).join('')}
        </div>
      </div>
      <div class="bg-white rounded-2xl p-8 border border-border shadow-sm">
        <h3 class="font-serif text-xl font-bold text-foreground mb-6">${mk('bizOEMReqTitle')}</h3>
        <div class="space-y-4">
          ${[0,1,2,3].map(ri=>`<div class="flex justify-between items-center py-3 border-b border-border last:border-0">
            <span class="text-sm text-muted-foreground">${LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>${(LANGS.find(l=>l.langCode===lng.langCode).bizOEMReqs||EN.bizOEMReqs)[ri][0]}</span>`).join('')}</span>
            <span class="text-sm font-semibold text-foreground">${EN.bizOEMReqs[ri][1]}</span>
          </div>`).join('')}
        </div>
        <a href="#quote" class="mt-6 block text-center bg-primary text-white font-bold py-3 rounded-xl hover:bg-green-800 transition">${mk('bizOEMEnquire')}</a>
      </div>
    </div>
  </div>
</section>

<section id="catalog" class="py-14 bg-primary text-white">
  <div class="max-w-3xl mx-auto px-4 text-center">
    <h2 class="font-serif text-3xl font-bold mb-4">${mk('bizCatTitle')}</h2>
    <p class="text-green-100 mb-8">${mk('bizCatSub')}</p>
    <a href="contact.html" class="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3.5 rounded-xl hover:bg-gray-100 transition shadow-lg">📥 ${mk('bizCatBtn')}</a>
  </div>
</section>

<section id="quote" class="py-20 bg-white">
  <div class="max-w-2xl mx-auto px-4">
    <div class="text-center mb-10">
      <h2 class="font-serif text-3xl font-bold text-foreground mb-4">${mk('bizQuoteTitle')}</h2>
      <p class="text-muted-foreground">${mk('bizQuoteSub')}</p>
    </div>
    <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="bg-background rounded-2xl border border-border p-8 space-y-5 shadow-sm">
      <div class="grid grid-cols-2 gap-4">
        <div><label class="block text-sm font-medium text-foreground mb-1.5">${mk('fFName')}</label>
          <input type="text" name="first_name" required class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"></div>
        <div><label class="block text-sm font-medium text-foreground mb-1.5">${mk('fLName')}</label>
          <input type="text" name="last_name" required class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"></div>
      </div>
      <div><label class="block text-sm font-medium text-foreground mb-1.5">${mk('fEmail')}</label>
        <input type="email" name="email" required class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"></div>
      <div><label class="block text-sm font-medium text-foreground mb-1.5">${mk('fCompany')}</label>
        <input type="text" name="company" required class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"></div>
      <div><label class="block text-sm font-medium text-foreground mb-1.5">${mk('fOrgType')}</label>
        <select name="org_type" required class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
          <option value="">${mk('fSelectTopic')}</option>
          ${EN.fOrgTypes.map((o,oi)=>`<option value="${o.toLowerCase().replace(/\s+/g,'_')}">${LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>${(LANGS.find(l=>l.langCode===lng.langCode).fOrgTypes||EN.fOrgTypes)[oi]}</span>`).join('')}</option>`).join('')}
        </select></div>
      <div><label class="block text-sm font-medium text-foreground mb-1.5">${mk('fVolume')}</label>
        <select name="volume" class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
          <option value="">${mk('fSelectRange')}</option>
          <option value="1k-5k">£1,000 – £5,000</option>
          <option value="5k-25k">£5,000 – £25,000</option>
          <option value="25k+">£25,000+</option>
        </select></div>
      <div><label class="block text-sm font-medium text-foreground mb-1.5">${mk('fMessage')}</label>
        <textarea name="message" rows="4" class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"></textarea></div>
      <button type="submit" class="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-green-800 transition text-base">${mk('fSubmit')}</button>
      <p class="text-xs text-muted-foreground text-center">${mk('fTerms')}</p>
    </form>
  </div>
</section>

${footer()}
${langScript()}
</body></html>`;
}

// ─── Page: contact.html ───────────────────────────────────────────────
function buildContact() {
  return `${head('Contact Us')}
<body class="bg-background">
${nav()}

<section class="bg-gradient-to-br from-primary-light to-white py-16">
  <div class="max-w-3xl mx-auto px-4 text-center">
    <h1 class="font-serif text-4xl font-bold text-foreground mb-4">${mk('contactTitle')}</h1>
    <p class="text-muted-foreground text-lg">${mk('contactSub')}</p>
  </div>
</section>

<section class="py-16 bg-white">
  <div class="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8">
    <div class="space-y-5">
      ${[
        {icon:'👤',enLabel:'Contact',val:BRAND.contact,sub:''},
        {icon:'📞',enLabel:'Phone',val:BRAND.phone,sub:'Mon–Fri 9am–6pm (GMT+8)'},
        {icon:'📧',enLabel:'Email',val:BRAND.email,sub:'Reply within 24 hours'},
        {icon:'📍',enLabel:'Address',val:BRAND.address,sub:'United Kingdom'},
      ].map((c,ci)=>`<div class="bg-muted rounded-2xl p-5 border border-border">
        <div class="text-2xl mb-3">${c.icon}</div>
        <div class="font-semibold text-foreground text-sm mb-1">${LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>${(lng.fContactLabels||EN.fContactLabels)[ci]}</span>`).join('')}</div>
        <div class="text-sm text-primary font-medium">${c.val}</div>
        ${c.sub?`<div class="text-xs text-muted-foreground mt-1">${c.sub}</div>`:''}
      </div>`).join('')}
      <a href="business.html#quote" class="block bg-accent text-white rounded-2xl p-5 text-center hover:bg-orange-600 transition card-hover">
        <div class="text-2xl mb-2">📋</div>
        <div class="font-bold text-sm">${mk('contactApply')}</div>
      </a>
    </div>
    <div class="md:col-span-2">
      <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="space-y-5">
        <div class="grid grid-cols-2 gap-4">
          <div><label class="block text-sm font-medium text-foreground mb-1.5">${mk('cfFName')}</label>
            <input type="text" name="first_name" required class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"></div>
          <div><label class="block text-sm font-medium text-foreground mb-1.5">${mk('cfLName')}</label>
            <input type="text" name="last_name" required class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"></div>
        </div>
        <div><label class="block text-sm font-medium text-foreground mb-1.5">${mk('cfEmail')}</label>
          <input type="email" name="email" required class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"></div>
        <div><label class="block text-sm font-medium text-foreground mb-1.5">${mk('cfSubject')}</label>
          <select name="subject" required class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
            <option value="">${mk('cfSelectTopic')}</option>
            ${EN.cfSubjects.map((s,si)=>`<option value="${s.toLowerCase().replace(/\s+/g,'_')}">${LANGS.map((lng,i)=>`<span data-lang="${lng.langCode}"${i>0?' style="display:none"':''}>${(LANGS.find(l=>l.langCode===lng.langCode).cfSubjects||EN.cfSubjects)[si]}</span>`).join('')}</option>`).join('')}
          </select></div>
        <div><label class="block text-sm font-medium text-foreground mb-1.5">${mk('cfMessage')}</label>
          <textarea name="message" rows="5" required class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"></textarea></div>
        <button type="submit" class="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-green-800 transition">${mk('cfSubmit')}</button>
      </form>
    </div>
  </div>
</section>

${footer()}
${langScript()}
</body></html>`;
}

// ─── Page: blog.html ──────────────────────────────────────────────────
function buildBlog() {
  const posts = [
    {icon:'🛁',cat:'Bathroom Safety',date:'March 2026',enT:'Top 10 Bathroom Safety Products for 2026',desc:'A guide to the most effective bathroom safety products for older adults, reviewed by occupational therapists.'},
    {icon:'🏥',cat:'B2B Guide',date:'February 2026',enT:'How to Choose Adaptive Products for Care Homes',desc:'A procurement guide for care home managers covering compliance, bulk buying, and staff training requirements.'},
    {icon:'📡',cat:'Smart Care',date:'January 2026',enT:'Privacy-First Fall Detection: mmWave vs. Cameras',desc:'Why radar-based fall detection is replacing cameras in modern care facilities across Europe.'},
    {icon:'🍴',cat:'Kitchen & Dining',date:'December 2025',enT:'Mealtimes with Dignity: Adaptive Dining Solutions',desc:'How the right adaptive utensils can transform mealtimes for people with arthritis and limited dexterity.'},
    {icon:'🌍',cat:'Industry Insights',date:'November 2025',enT:'European Silver Economy: Market Trends 2026',desc:'Key trends shaping the £352 billion European senior care product market.'},
    {icon:'🏷️',cat:'B2B Guide',date:'October 2025',enT:'OEM vs. White-Label: What Is Right for Your Business?',desc:'A practical comparison of OEM and white-label options for healthcare retailers.'},
  ];

  // Use blog posts from i18n if available
  const getPostTitle = (p, langCode) => {
    const lang = LANGS.find(l=>l.langCode===langCode);
    if(lang&&lang.blogPosts) {
      const found = lang.blogPosts.find(bp=>bp.en===p.enT);
      if(found) return found.en || p.enT; // just use en key for now, could extend
    }
    return p.enT;
  };

  return `${head('Resources & Blog')}
<body class="bg-background">
${nav('blog')}

<section class="bg-gradient-to-br from-primary-light to-white py-16">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h1 class="font-serif text-4xl font-bold text-foreground mb-4">${mk('blogTitle')}</h1>
    <p class="text-muted-foreground text-lg">${mk('blogSub')}</p>
  </div>
</section>

<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${posts.map(p=>`<article class="bg-background rounded-2xl border border-border overflow-hidden card-hover">
        <div class="bg-primary/5 h-40 flex items-center justify-center text-6xl">${p.icon}</div>
        <div class="p-6">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-xs bg-primary/10 text-primary font-semibold px-2 py-1 rounded-full">${p.cat}</span>
            <span class="text-xs text-muted-foreground">${p.date}</span>
          </div>
          <h3 class="font-serif text-lg font-bold text-foreground mb-3 leading-snug">${p.enT}</h3>
          <p class="text-sm text-muted-foreground mb-4">${p.desc}</p>
          <a href="contact.html" class="text-sm font-semibold text-primary hover:underline">${mk('blogReadMore')}</a>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>

${footer()}
${langScript()}
</body></html>`;
}

// ─── Build All ────────────────────────────────────────────────────────
function buildAll() {
  const pages = {
    'index.html': buildIndex(),
    'about.html': buildAbout(),
    'products.html': buildProductsOverview(),
    'solutions.html': buildSolutions(),
    'business.html': buildBusiness(),
    'contact.html': buildContact(),
    'blog.html': buildBlog(),
  };

  CATALOG.forEach(cat => {
    pages[`products-${cat.id}.html`] = buildCategoryPage(cat);
  });

  let count = 0;
  for (const [filename, html] of Object.entries(pages)) {
    fs.writeFileSync(path.join(OUT, filename), html, 'utf8');
    count++;
    console.log(`✓ ${filename}`);
  }
  console.log(`\n🎉 Built ${count} pages with 7-language support to ${OUT}`);
}

buildAll();
