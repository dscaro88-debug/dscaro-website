// DS CARO ToB Website Builder
// Generates all HTML pages for the enterprise website

const fs = require('fs');
const path = require('path');

const OUT = '/Users/carokk/WorkBuddy/20260323171726/dscaro-tob';

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
    name: 'Bathroom Safety',
    nameCn: '卫浴安全',
    icon: '🚿',
    desc: 'Fall prevention and dignity in daily bathing routines',
    descCn: '日常洗浴的防跌倒与有尊严的护理',
    subs: [
      { id: 'grab-bars', name: 'Grab Bars & Handrails', nameCn: '扶手与把手', desc: 'Suction & wall-mounted grab bars, toilet safety frames', icon: '🔧' },
      { id: 'shower-seating', name: 'Showering & Bathing', nameCn: '淋浴与洗浴辅助', desc: 'Foldable shower seats, transfer benches, handheld showers', icon: '🛁' },
      { id: 'non-slip', name: 'Non-Slip Solutions', nameCn: '防滑方案', desc: 'Bath mats, tub strips, anti-slip treads', icon: '🧴' },
    ]
  },
  {
    id: 'kitchen-dining',
    name: 'Kitchen & Dining',
    nameCn: '厨房与餐饮',
    icon: '🍴',
    desc: 'Arthritis-friendly tools for effortless, one-handed independence',
    descCn: '关节炎友好型工具，轻松实现单手操作独立生活',
    subs: [
      { id: 'adaptive-utensils', name: 'Adaptive Utensils', nameCn: '自适应餐具', desc: 'Built-up handle cutlery, weighted spoons, rocker knives', icon: '🥄' },
      { id: 'grip-aids', name: 'Grip Aids', nameCn: '握力辅助', desc: 'Electric jar openers, bottle grippers, non-slip mats', icon: '🫙' },
      { id: 'plate-aids', name: 'Plate & Dining Aids', nameCn: '餐盘辅助', desc: 'Scoop dishes, plate guards, cup holders', icon: '🍽️' },
      { id: 'kitchen-safety', name: 'Kitchen Safety', nameCn: '厨房安全', desc: 'Large button timers, auto shut-off kettles', icon: '⏲️' },
    ]
  },
  {
    id: 'dressing-mobility',
    name: 'Dressing & Mobility',
    nameCn: '穿戴与出行',
    icon: '👕',
    desc: 'Invisible adaptation for dignity and style',
    descCn: '隐形适老，保持尊严与个人风格',
    subs: [
      { id: 'adaptive-clothing', name: 'Adaptive Clothing', nameCn: '适老服装', desc: 'Magnetic closure shirts, velcro pants, easy-access underwear', icon: '👔' },
      { id: 'footwear', name: 'Footwear', nameCn: '鞋类', desc: 'Slip-on shoes, extra-wide fit shoes', icon: '👟' },
      { id: 'dressing-aids', name: 'Dressing Aids', nameCn: '穿衣辅助', desc: 'Sock aids, long-handle shoe horns, button hooks', icon: '🧦' },
      { id: 'mobility-accessories', name: 'Mobility Accessories', nameCn: '出行配件', desc: 'Shopping trolleys, cane holders, foldable walkers', icon: '🦯' },
    ]
  },
  {
    id: 'bedroom-living',
    name: 'Bedroom & Living',
    nameCn: '卧室与起居',
    icon: '🛏️',
    desc: 'Assistive rise and sleep quality solutions',
    descCn: '辅助起身与睡眠质量提升方案',
    subs: [
      { id: 'bed-assistance', name: 'Bed Assistance', nameCn: '床具辅助', desc: 'Bed rail handles, bed wedges, transfer slide boards', icon: '🛌' },
      { id: 'lighting', name: 'Lighting & Visibility', nameCn: '照明与可视性', desc: 'Motion sensor night lights, LED bedside strips', icon: '💡' },
      { id: 'organization', name: 'Organization & Reach', nameCn: '整理与伸取', desc: 'Bedside organizers, reach extender grabber tools', icon: '📦' },
    ]
  },
  {
    id: 'smart-care',
    name: 'Smart Care & Monitoring',
    nameCn: '智能护理与监测',
    icon: '📡',
    desc: 'Privacy-first technology — no cameras required',
    descCn: '隐私优先技术，无需摄像头',
    subs: [
      { id: 'fall-detection', name: 'Fall Detection', nameCn: '跌倒检测', desc: 'mmWave radar sensors, wearable fall alert pendants', icon: '🔔' },
      { id: 'medication', name: 'Medication Management', nameCn: '用药管理', desc: 'Smart pill dispensers, large-print weekly organizers', icon: '💊' },
      { id: 'home-sensors', name: 'Home Safety Sensors', nameCn: '家居安全传感', desc: 'Water leak detectors, smoke & gas alarms, door sensors', icon: '🏠' },
      { id: 'communication', name: 'Communication', nameCn: '通讯设备', desc: 'Video call frames, amplified phones', icon: '📞' },
    ]
  },
  {
    id: 'gifts-seniors',
    name: 'Gifts for Seniors',
    nameCn: '老年人礼品',
    icon: '🎁',
    desc: 'Curated for families buying thoughtful gifts for loved ones',
    descCn: '精心策划，为家人挑选贴心礼品',
    subs: [
      { id: 'under-25', name: 'Under £25 Gifts', nameCn: '25英镑以下礼品', desc: 'Thoughtful everyday essentials', icon: '💝' },
      { id: 'tech-gifts', name: 'Tech Gifts for Seniors', nameCn: '科技类礼品', desc: 'Easy-to-use technology products', icon: '📱' },
      { id: 'comfort', name: 'Comfort & Relaxation', nameCn: '舒适与放松', desc: 'Wellness and comfort products', icon: '🛋️' },
      { id: 'best-sellers', name: 'Best Sellers', nameCn: '畅销产品', desc: 'Our most popular products', icon: '⭐' },
    ]
  },
];

// ─── Shared Head ───────────────────────────────────────────────────────
function head(title, desc = BRAND.desc) {
  return `<!DOCTYPE html>
<html lang="en">
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

/* Lang toggle */
[data-zh]{display:none}
body.zh [data-en]{display:none!important}
body.zh [data-zh]{display:revert!important}

/* Nav dropdown */
.nav-dropdown{display:none;position:absolute;top:100%;left:0;z-index:50}
.nav-item:hover .nav-dropdown{display:block}

/* Animations */
@keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.animate-in{animation:fadeInUp 0.5s ease forwards}

/* Card hover */
.card-hover{transition:all 0.25s ease}
.card-hover:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,0.12)}

/* Custom scrollbar */
::-webkit-scrollbar{width:6px}
::-webkit-scrollbar-track{background:#f5f5f0}
::-webkit-scrollbar-thumb{background:#1e6626;border-radius:3px}
</style>
</head>`;
}

// ─── Shared Nav ────────────────────────────────────────────────────────
function nav(activePage = '') {
  const links = [
    { href: 'index.html', label: 'Home', labelCn: '首页', id: 'home' },
    { href: 'products.html', label: 'Products', labelCn: '产品', id: 'products', hasDropdown: true },
    { href: 'solutions.html', label: 'Solutions', labelCn: '解决方案', id: 'solutions' },
    { href: 'about.html', label: 'About Us', labelCn: '关于我们', id: 'about' },
    { href: 'blog.html', label: 'Resources', labelCn: '资源', id: 'blog' },
  ];

  const dropdownItems = CATALOG.map(c =>
    `<a href="products-${c.id}.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
      <span class="text-xl">${c.icon}</span>
      <div>
        <div class="text-sm font-medium text-foreground group-hover:text-primary" data-en>${c.name}</div>
        <div class="text-sm font-medium text-foreground group-hover:text-primary hidden" data-zh>${c.nameCn}</div>
        <div class="text-xs text-muted-foreground mt-0.5" data-en>${c.desc.substring(0,40)}...</div>
        <div class="text-xs text-muted-foreground mt-0.5 hidden" data-zh>${c.descCn.substring(0,20)}...</div>
      </div>
    </a>`
  ).join('');

  const navLinks = links.map(l => {
    const isActive = activePage === l.id;
    if (l.hasDropdown) {
      return `<div class="nav-item relative">
        <a href="${l.href}" class="flex items-center gap-1 text-sm font-medium px-1 py-2 border-b-2 transition-colors ${isActive ? 'border-primary text-primary' : 'border-transparent text-foreground hover:text-primary'}">
          <span data-en>${l.label}</span><span data-zh>${l.labelCn}</span>
          <svg class="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </a>
        <div class="nav-dropdown bg-white border border-border rounded-xl shadow-xl w-72 mt-1 overflow-hidden">
          <div class="px-4 py-2 bg-muted border-b border-border">
            <a href="products.html" class="text-xs font-semibold text-primary hover:underline" data-en>View All Products →</a>
            <a href="products.html" class="text-xs font-semibold text-primary hover:underline hidden" data-zh>查看所有产品 →</a>
          </div>
          ${dropdownItems}
        </div>
      </div>`;
    }
    return `<a href="${l.href}" class="text-sm font-medium px-1 py-2 border-b-2 transition-colors ${isActive ? 'border-primary text-primary' : 'border-transparent text-foreground hover:text-primary'}">
      <span data-en>${l.label}</span><span data-zh>${l.labelCn}</span>
    </a>`;
  }).join('');

  return `<!-- Top bar -->
<div class="bg-primary text-white text-xs py-2">
  <div class="max-w-7xl mx-auto px-4 flex justify-between items-center">
    <div class="flex gap-6">
      <span data-en>🚚 Free shipping on orders over £200</span>
      <span data-zh>🚚 订单满200英镑免运费</span>
      <span data-en class="hidden md:inline">📋 Download our B2B Product Catalog</span>
      <span data-zh class="hidden md:inline">📋 下载B2B产品目录</span>
    </div>
    <div class="flex items-center gap-4">
      <a href="${BRAND.shopUrl}" target="_blank" class="font-medium hover:underline" data-en>🛒 Shop Online</a>
      <a href="${BRAND.shopUrl}" target="_blank" class="font-medium hover:underline hidden" data-zh>🛒 在线购物</a>
      <div class="flex items-center gap-1 ml-2">
        <button onclick="setLang('en')" id="btn-en" class="px-2 py-0.5 rounded text-xs font-semibold bg-white/20 hover:bg-white/30 transition">EN</button>
        <button onclick="setLang('zh')" id="btn-zh" class="px-2 py-0.5 rounded text-xs font-semibold hover:bg-white/30 transition">中</button>
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
      <a href="business.html" class="hidden md:inline-flex items-center gap-1.5 bg-accent text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition">
        <span data-en>For Business</span><span data-zh>企业合作</span>
      </a>
      <a href="contact.html" class="hidden md:inline-flex items-center gap-1.5 border border-primary text-primary text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition">
        <span data-en>Contact</span><span data-zh>联系我们</span>
      </a>
      <button class="md:hidden p-2" onclick="document.getElementById('mobile-menu').classList.toggle('hidden')">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>
  </div>
  <!-- Mobile menu -->
  <div id="mobile-menu" class="hidden md:hidden border-t border-border bg-white">
    <div class="px-4 py-3 space-y-1">
      ${links.map(l => `<a href="${l.href}" class="block py-2 text-sm font-medium text-foreground hover:text-primary"><span data-en>${l.label}</span><span data-zh>${l.labelCn}</span></a>`).join('')}
      <a href="business.html" class="block py-2 text-sm font-semibold text-accent"><span data-en>For Business</span><span data-zh>企业合作</span></a>
      <a href="contact.html" class="block py-2 text-sm font-medium text-foreground hover:text-primary"><span data-en>Contact</span><span data-zh>联系我们</span></a>
    </div>
  </div>
</nav>`;
}

// ─── Shared Footer ─────────────────────────────────────────────────────
function footer() {
  return `<footer class="bg-gray-900 text-gray-300 mt-20">
  <div class="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
    <div class="md:col-span-1">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white font-serif font-bold text-base">DS</div>
        <span class="font-serif font-bold text-lg text-white">DS CARO</span>
      </div>
      <p class="text-sm leading-relaxed mb-4" data-en>Empowering independence with warmth. Premium senior care solutions for families and businesses across Europe.</p>
      <p class="text-sm leading-relaxed mb-4 hidden" data-zh>以温暖赋能独立。为欧洲各地家庭和企业提供优质适老护理解决方案。</p>
      <div class="text-sm space-y-1">
        <div>👤 ${BRAND.contact}</div>
        <div>📧 <a href="mailto:${BRAND.email}" class="hover:text-white">${BRAND.email}</a></div>
        <div>📞 <a href="tel:${BRAND.phone}" class="hover:text-white">${BRAND.phone}</a></div>
        <div>📍 ${BRAND.address}</div>
      </div>
    </div>
    <div>
      <h4 class="text-white font-semibold mb-4" data-en>Products</h4>
      <h4 class="text-white font-semibold mb-4 hidden" data-zh>产品</h4>
      <ul class="space-y-2 text-sm">
        ${CATALOG.map(c => `<li><a href="products-${c.id}.html" class="hover:text-white transition"><span data-en>${c.name}</span><span data-zh>${c.nameCn}</span></a></li>`).join('')}
        <li><a href="products.html" class="hover:text-white text-accent transition" data-en>View All Products →</a><a href="products.html" class="hover:text-white text-accent transition hidden" data-zh>查看所有产品 →</a></li>
      </ul>
    </div>
    <div>
      <h4 class="text-white font-semibold mb-4" data-en>Business</h4>
      <h4 class="text-white font-semibold mb-4 hidden" data-zh>企业服务</h4>
      <ul class="space-y-2 text-sm">
        <li><a href="business.html" class="hover:text-white transition" data-en>Wholesale & Bulk Orders</a><a href="business.html" class="hover:text-white transition hidden" data-zh>批发与大宗采购</a></li>
        <li><a href="business.html#pricing" class="hover:text-white transition" data-en>Bulk Pricing Tiers</a><a href="business.html#pricing" class="hover:text-white transition hidden" data-zh>批量定价方案</a></li>
        <li><a href="business.html#oem" class="hover:text-white transition" data-en>OEM / ODM Services</a><a href="business.html#oem" class="hover:text-white transition hidden" data-zh>OEM/ODM服务</a></li>
        <li><a href="business.html#quote" class="hover:text-white transition" data-en>Request a Quote</a><a href="business.html#quote" class="hover:text-white transition hidden" data-zh>获取报价</a></li>
        <li><a href="contact.html" class="hover:text-white transition" data-en>Book a Demo</a><a href="contact.html" class="hover:text-white transition hidden" data-zh>预约演示</a></li>
      </ul>
    </div>
    <div>
      <h4 class="text-white font-semibold mb-4" data-en>Company</h4>
      <h4 class="text-white font-semibold mb-4 hidden" data-zh>公司</h4>
      <ul class="space-y-2 text-sm">
        <li><a href="about.html" class="hover:text-white transition" data-en>About DS CARO</a><a href="about.html" class="hover:text-white transition hidden" data-zh>关于DS CARO</a></li>
        <li><a href="solutions.html" class="hover:text-white transition" data-en>Care Solutions</a><a href="solutions.html" class="hover:text-white transition hidden" data-zh>护理解决方案</a></li>
        <li><a href="blog.html" class="hover:text-white transition" data-en>Resources & Blog</a><a href="blog.html" class="hover:text-white transition hidden" data-zh>资源与博客</a></li>
        <li><a href="contact.html" class="hover:text-white transition" data-en>Contact Us</a><a href="contact.html" class="hover:text-white transition hidden" data-zh>联系我们</a></li>
      </ul>
      <div class="mt-6">
        <h4 class="text-white font-semibold mb-3" data-en>Shop Online</h4>
        <h4 class="text-white font-semibold mb-3 hidden" data-zh>在线购物</h4>
        <a href="${BRAND.shopUrl}" target="_blank" class="inline-flex items-center gap-2 bg-accent text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition">
          <span>🛒</span><span data-en>Visit Our Shop</span><span data-zh>访问店铺</span>
        </a>
      </div>
    </div>
  </div>
  <div class="border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
      <div>© 2026 DS CARO. <span data-en>All rights reserved.</span><span data-zh>版权所有。</span></div>
      <div class="flex gap-4">
        <a href="#" class="hover:text-white" data-en>Privacy Policy</a><a href="#" class="hover:text-white hidden" data-zh>隐私政策</a>
        <a href="#" class="hover:text-white" data-en>Terms of Service</a><a href="#" class="hover:text-white hidden" data-zh>服务条款</a>
        <a href="#" class="hover:text-white" data-en>Accessibility</a><a href="#" class="hover:text-white hidden" data-zh>无障碍声明</a>
      </div>
    </div>
  </div>
</footer>`;
}

// ─── Lang Script ───────────────────────────────────────────────────────
function langScript() {
  return `<script>
function setLang(l){
  if(l==='zh'){document.body.classList.add('zh')}else{document.body.classList.remove('zh')}
  document.getElementById('btn-en').style.background=l==='en'?'rgba(255,255,255,0.35)':'';
  document.getElementById('btn-zh').style.background=l==='zh'?'rgba(255,255,255,0.35)':'';
  localStorage.setItem('dscaro-lang',l);
}
(function(){var l=localStorage.getItem('dscaro-lang')||'en';setLang(l);})();
</script>`;
}

// ─── Page: index.html ──────────────────────────────────────────────────
function buildIndex() {
  const certBadges = [
    { code: 'CE', label: 'CE Certified' },
    { code: 'FDA', label: 'FDA Registered' },
    { code: 'ISO', label: 'ISO 13485' },
    { code: 'GDPR', label: 'GDPR Ready' },
    { code: 'UKCA', label: 'UKCA Marked' },
  ];

  const stats = [
    { n: '500+', label: 'B2B Partners', labelCn: '企业合作伙伴' },
    { n: '10,000+', label: 'Families Served', labelCn: '服务家庭' },
    { n: '30+', label: 'Countries', labelCn: '覆盖国家' },
    { n: '95%', label: 'Reorder Rate', labelCn: '复购率' },
  ];

  const testimonials = [
    { name: 'Margaret H.', role: 'Procurement Manager, NHS Trust', text: 'DS CARO has become our preferred supplier for patient mobility aids. Consistent quality, fast delivery, and the team is always responsive.', textCn: 'DS CARO已成为我们优选的患者辅助产品供应商。质量稳定、配送及时、团队响应迅速。' },
    { name: 'Lars V.', role: 'Director, Nordic Care Group', text: 'The OEM packaging service is excellent. Our residents love the products and the discreet design aligns perfectly with our care philosophy.', textCn: 'OEM定制包装服务非常出色。居民们都喜欢这些产品，低调的设计与我们的护理理念完美契合。' },
    { name: 'Claire B.', role: 'Owner, Home Care Agency', text: "We've been ordering for 2 years. Competitive wholesale pricing and the quality never disappoints. Highly recommend for any care business.", textCn: '我们已合作两年。批发价格有竞争力，质量始终如一。强烈推荐给所有护理机构。' },
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
        <span>🏆</span> <span data-en>Trusted by 500+ Care Facilities Across Europe</span><span data-zh>欧洲500+护理机构信赖之选</span>
      </div>
      <h1 class="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
        <span data-en>Empowering Independence<br><span class="text-primary">with Warmth</span></span>
        <span data-zh>以温暖<br><span class="text-primary">赋能独立生活</span></span>
      </h1>
      <p class="text-lg text-muted-foreground leading-relaxed mb-8" data-en>Premium adaptive products for dignified senior living. Trusted by care homes, NHS trusts, and families across Europe. Factory-direct quality with B2B wholesale pricing.</p>
      <p class="text-lg text-muted-foreground leading-relaxed mb-8 hidden" data-zh>为老年人有尊严的生活提供优质适老产品。深受欧洲各地养老院、NHS机构和家庭信赖。工厂直供品质，B2B批发价格。</p>
      <div class="flex flex-wrap gap-4">
        <a href="business.html#quote" class="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-800 transition shadow-lg">
          <span data-en>Get B2B Pricing</span><span data-zh>获取批发报价</span> →
        </a>
        <a href="products.html" class="inline-flex items-center gap-2 border-2 border-primary text-primary font-semibold px-6 py-3 rounded-xl hover:bg-primary hover:text-white transition">
          <span data-en>Browse Products</span><span data-zh>浏览产品</span>
        </a>
        <a href="${BRAND.shopUrl}" target="_blank" class="inline-flex items-center gap-2 bg-accent text-white font-semibold px-6 py-3 rounded-xl hover:bg-orange-600 transition">
          🛒 <span data-en>Shop Now</span><span data-zh>立即购买</span>
        </a>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      ${stats.map(s => `<div class="bg-white rounded-2xl p-6 shadow-sm border border-border card-hover text-center">
        <div class="text-3xl font-bold text-primary mb-1">${s.n}</div>
        <div class="text-sm text-muted-foreground" data-en>${s.label}</div>
        <div class="text-sm text-muted-foreground hidden" data-zh>${s.labelCn}</div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- Trust badges -->
<section class="bg-white border-y border-border py-6">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex flex-wrap justify-center items-center gap-8 text-center">
      ${certBadges.map(b => `<div class="flex items-center gap-2">
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
      <h2 class="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4" data-en>Complete Product Range</h2>
      <h2 class="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 hidden" data-zh>完整产品系列</h2>
      <p class="text-muted-foreground text-lg max-w-2xl mx-auto" data-en>Six comprehensive categories covering every aspect of senior independence and safety.</p>
      <p class="text-muted-foreground text-lg max-w-2xl mx-auto hidden" data-zh>六大完整品类，全面覆盖老年独立生活与安全的各个方面。</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      ${CATALOG.map(c => `<a href="products-${c.id}.html" class="group bg-white rounded-2xl border border-border p-6 card-hover">
        <div class="text-4xl mb-4">${c.icon}</div>
        <h3 class="font-semibold text-foreground text-lg mb-2 group-hover:text-primary transition" data-en>${c.name}</h3>
        <h3 class="font-semibold text-foreground text-lg mb-2 group-hover:text-primary transition hidden" data-zh>${c.nameCn}</h3>
        <p class="text-sm text-muted-foreground mb-4" data-en>${c.desc}</p>
        <p class="text-sm text-muted-foreground mb-4 hidden" data-zh>${c.descCn}</p>
        <div class="flex flex-wrap gap-2 mb-4">
          ${c.subs.slice(0,3).map(s => `<span class="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">${s.name}</span>`).join('')}
          ${c.subs.length > 3 ? `<span class="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">+${c.subs.length-3} more</span>` : ''}
        </div>
        <span class="text-sm font-semibold text-primary group-hover:underline" data-en>View Category →</span>
        <span class="text-sm font-semibold text-primary group-hover:underline hidden" data-zh>查看分类 →</span>
      </a>`).join('')}
    </div>
    <div class="text-center mt-10">
      <a href="products.html" class="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-green-800 transition shadow-md">
        <span data-en>View All Products</span><span data-zh>查看所有产品</span> →
      </a>
    </div>
  </div>
</section>

<!-- Why DS CARO -->
<section class="py-20 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4">
    <div class="grid md:grid-cols-2 gap-16 items-center">
      <div>
        <h2 class="font-serif text-3xl font-bold text-foreground mb-6" data-en>Why Care Businesses Choose DS CARO</h2>
        <h2 class="font-serif text-3xl font-bold text-foreground mb-6 hidden" data-zh>为何护理机构选择DS CARO</h2>
        <div class="space-y-5">
          ${[
            { icon: '🏭', en: 'Factory-Direct Quality', cn: '工厂直供品质', desc: 'Cut out the middleman. Direct manufacturing relationships ensure consistent quality and better margins for your business.', descCn: '去除中间商。直接制造合作关系确保质量稳定，为您的业务提供更好的利润空间。' },
            { icon: '📦', en: 'Flexible MOQ & Fast Shipping', cn: '灵活起订量，快速配送', desc: 'Low minimum order quantities with 24-48h despatch. Scale up with volume discounts as your business grows.', descCn: '最低起订量低，24-48小时发货。随业务增长享受批量折扣。' },
            { icon: '🏷️', en: 'OEM / White-Label Options', cn: 'OEM/白标定制', desc: 'Custom packaging and logo printing available for Enterprise partners. Build your brand on proven products.', descCn: '为企业级合作伙伴提供定制包装和徽标印刷。在成熟产品上建立您的品牌。' },
            { icon: '📋', en: 'Full Compliance Documentation', cn: '完整合规文件', desc: 'CE, FDA, ISO certifications. GDPR-ready. All documentation provided for regulatory and procurement requirements.', descCn: 'CE、FDA、ISO认证。符合GDPR。提供所有监管和采购所需文件。' },
          ].map(f => `<div class="flex gap-4">
            <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-xl flex-shrink-0">${f.icon}</div>
            <div>
              <h4 class="font-semibold text-foreground mb-1" data-en>${f.en}</h4>
              <h4 class="font-semibold text-foreground mb-1 hidden" data-zh>${f.cn}</h4>
              <p class="text-sm text-muted-foreground" data-en>${f.desc}</p>
              <p class="text-sm text-muted-foreground hidden" data-zh>${f.descCn}</p>
            </div>
          </div>`).join('')}
        </div>
      </div>
      <div class="space-y-4">
        ${testimonials.map(t => `<div class="bg-white rounded-2xl p-6 border border-border shadow-sm">
          <div class="flex gap-1 text-accent mb-3">★★★★★</div>
          <p class="text-sm text-foreground leading-relaxed mb-4" data-en>"${t.text}"</p>
          <p class="text-sm text-foreground leading-relaxed mb-4 hidden" data-zh>"${t.textCn}"</p>
          <div>
            <div class="text-sm font-semibold text-foreground">${t.name}</div>
            <div class="text-xs text-muted-foreground">${t.role}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</section>

<!-- CTA Banner -->
<section class="py-16 bg-primary text-white">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h2 class="font-serif text-3xl font-bold mb-4" data-en>Ready to Partner with DS CARO?</h2>
    <h2 class="font-serif text-3xl font-bold mb-4 hidden" data-zh>准备好与DS CARO合作了吗？</h2>
    <p class="text-green-100 mb-8 text-lg" data-en>Join 500+ care facilities and distributors across Europe. Get wholesale pricing and product samples today.</p>
    <p class="text-green-100 mb-8 text-lg hidden" data-zh>加入欧洲500+护理机构和分销商。立即获取批发报价和产品样品。</p>
    <div class="flex flex-wrap justify-center gap-4">
      <a href="business.html#quote" class="bg-white text-primary font-bold px-8 py-3.5 rounded-xl hover:bg-gray-100 transition shadow-md">
        <span data-en>Request B2B Pricing</span><span data-zh>申请B2B报价</span>
      </a>
      <a href="${BRAND.shopUrl}" target="_blank" class="bg-accent text-white font-bold px-8 py-3.5 rounded-xl hover:bg-orange-600 transition shadow-md">
        🛒 <span data-en>Shop Retail</span><span data-zh>零售购买</span>
      </a>
    </div>
  </div>
</section>

${footer()}
${langScript()}
</body></html>`;
}

// ─── Page: about.html ──────────────────────────────────────────────────
function buildAbout() {
  const timeline = [
    { year: '2023', en: 'DS CARO founded — focused on European adaptive product market', cn: 'DS CARO创立，专注欧洲适老产品市场' },
    { year: '2024', en: 'Launched first product lines: Bathroom Safety & Kitchen Aids', cn: '推出首批产品线：卫浴安全与厨房辅助' },
    { year: '2024', en: 'Achieved CE & UKCA certification on core product range', cn: '核心产品线获得CE与UKCA认证' },
    { year: '2025', en: 'Expanded to 30+ countries — first B2B partnerships established', cn: '扩展至30+国家，建立首批B2B合作关系' },
    { year: '2026', en: 'Serving 500+ care facilities and 10,000+ families across Europe', cn: '服务欧洲500+护理机构和10,000+家庭' },
  ];
  const values = [
    { icon: '❤️', en: 'Compassion First', cn: '同情心为先', desc: 'Every product is designed with empathy for real challenges faced by seniors and their caregivers.', descCn: '每一款产品都以对老年人及照护者所面临真实挑战的同理心来设计。' },
    { icon: '🏆', en: 'Uncompromising Quality', cn: '品质不妥协', desc: 'We source only the highest quality materials and hold every product to rigorous safety and durability standards.', descCn: '我们只采购最高质量的材料，对每款产品执行严格的安全和耐用标准。' },
    { icon: '💡', en: 'Innovation with Purpose', cn: '有目的的创新', desc: 'We embrace technology that genuinely improves lives, not gimmicks. Every feature serves a real need.', descCn: '我们拥抱真正改善生活的技术，而非噱头。每个功能都服务于真实需求。' },
    { icon: '🌿', en: 'Sustainable Care', cn: '可持续护理', desc: 'Committed to environmentally responsible practices, from packaging to product lifecycle.', descCn: '致力于对环境负责任的做法，从包装到产品全生命周期。' },
  ];
  return `${head('About Us — Our Story & Mission')}
<body class="bg-background">
${nav('about')}

<!-- Hero -->
<section class="bg-gradient-to-br from-primary-light to-white py-20">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <div class="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
      <span data-en>Our Story</span><span data-zh>我们的故事</span>
    </div>
    <h1 class="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6" data-en>Empowering Independence<br>with Warmth</h1>
    <h1 class="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 hidden" data-zh>以温暖<br>赋能独立生活</h1>
    <p class="text-lg text-muted-foreground max-w-2xl mx-auto" data-en>DS CARO was born from a simple belief: aging should be a journey of continued independence, dignity, and joy. We create products that make that possible.</p>
    <p class="text-lg text-muted-foreground max-w-2xl mx-auto hidden" data-zh>DS CARO诞生于一个简单的信念：老龄化应是一段持续保持独立、尊严和快乐的旅程。我们创造让这成为可能的产品。</p>
    <div class="grid grid-cols-3 gap-6 mt-12 max-w-lg mx-auto">
      ${[['10,000+','Families Served','服务家庭'],['500+','B2B Partners','企业合作伙伴'],['30+','Countries','覆盖国家']].map(s=>`<div class="bg-white rounded-2xl p-5 shadow-sm border border-border">
        <div class="text-2xl font-bold text-primary">${s[0]}</div>
        <div class="text-xs text-muted-foreground mt-1" data-en>${s[1]}</div>
        <div class="text-xs text-muted-foreground mt-1 hidden" data-zh>${s[2]}</div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- Values -->
<section class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <div class="text-center mb-14">
      <h2 class="font-serif text-3xl font-bold text-foreground mb-3" data-en>Our Values</h2>
      <h2 class="font-serif text-3xl font-bold text-foreground mb-3 hidden" data-zh>我们的价值观</h2>
      <p class="text-muted-foreground" data-en>What drives everything we do</p>
      <p class="text-muted-foreground hidden" data-zh>驱动我们一切行动的力量</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      ${values.map(v => `<div class="bg-muted rounded-2xl p-6 text-center card-hover">
        <div class="text-4xl mb-4">${v.icon}</div>
        <h3 class="font-semibold text-foreground mb-3" data-en>${v.en}</h3>
        <h3 class="font-semibold text-foreground mb-3 hidden" data-zh>${v.cn}</h3>
        <p class="text-sm text-muted-foreground" data-en>${v.desc}</p>
        <p class="text-sm text-muted-foreground hidden" data-zh>${v.descCn}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- Brand Story -->
<section class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <div class="grid md:grid-cols-2 gap-16 items-center">
      <div>
        <div class="inline-flex items-center gap-2 bg-accent/10 text-accent text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          <span data-en>Our Brand Story</span><span data-zh>品牌故事</span>
        </div>
        <h2 class="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6" data-en>Born from a Personal Journey</h2>
        <h2 class="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6 hidden" data-zh>源于一段亲身经历</h2>
        <div class="space-y-4 text-muted-foreground leading-relaxed">
          <p data-en>DS CARO was founded by Caro Chen after witnessing firsthand how difficult it was for her own family members to find quality, affordable adaptive products in Europe. Most products were either clinical and impersonal, or expensive beyond reach.</p>
          <p data-en>She believed there had to be a better way — products designed with warmth, that genuinely helped older adults maintain their independence while keeping their dignity intact. Products that felt like care, not clinical equipment.</p>
          <p data-en>Starting with deep research into the European silver economy, Caro built DS CARO from the ground up: factory-direct sourcing, rigorous quality standards, and a relentless focus on what really matters — helping people live well at every stage of life.</p>
          <p data-zh class="hidden">DS CARO由陈CARO创立，源于她亲眼目睹家人在欧洲寻找高品质、实惠的适老产品有多困难。大多数产品要么过于临床化、缺乏人情味，要么价格高不可攀。</p>
          <p data-zh class="hidden">她相信一定有更好的方式——用温暖设计的产品，真正帮助老年人保持独立生活，同时维护他们的尊严。让产品感觉像是关怀，而非冷冰冰的医疗器械。</p>
          <p data-zh class="hidden">CARO深入研究欧洲银发经济后，从零开始构建DS CARO：工厂直采、严格质量标准，以及对真正重要的事情的坚定专注——帮助人们在生命的每个阶段都活得更好。</p>
        </div>
      </div>
      <div class="space-y-6">
        <div class="bg-primary/5 rounded-2xl p-8 border border-primary/10">
          <div class="text-5xl mb-4">💬</div>
          <blockquote class="font-serif text-xl text-foreground italic leading-relaxed mb-4" data-en>"I started DS CARO because I believe every older adult deserves products that are thoughtfully designed, genuinely useful, and available at a fair price. Aging is not a problem to be solved — it is a journey to be supported with warmth and dignity."</blockquote>
          <blockquote class="font-serif text-xl text-foreground italic leading-relaxed mb-4 hidden" data-zh>"我创立DS CARO，是因为我相信每一位老年人都值得拥有经过用心设计、真正实用、价格合理的产品。老龄化不是需要解决的问题——而是一段需要用温暖和尊严来陪伴的旅程。"</blockquote>
          <div class="flex items-center gap-3 mt-4">
            <div class="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-serif font-bold text-lg">C</div>
            <div>
              <div class="font-semibold text-foreground">Caro Chen</div>
              <div class="text-sm text-muted-foreground" data-en>Founder, DS CARO</div>
              <div class="text-sm text-muted-foreground hidden" data-zh>创始人，DS CARO</div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          ${[['🌍','European Focus','专注欧洲市场'],['🏭','Factory Direct','工厂直采'],['❤️','Family First','家庭至上'],['🔬','Research-Led','研究驱动']].map(b=>`<div class="bg-white rounded-xl p-4 border border-border text-center card-hover">
            <div class="text-2xl mb-2">${b[0]}</div>
            <div class="text-xs font-semibold text-foreground" data-en>${b[1]}</div>
            <div class="text-xs font-semibold text-foreground hidden" data-zh>${b[2]}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Meet Our Team -->
<section class="py-20 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4">
    <div class="text-center mb-14">
      <h2 class="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4" data-en>Meet Our Team</h2>
      <h2 class="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 hidden" data-zh>认识我们的团队</h2>
      <p class="text-muted-foreground text-lg max-w-2xl mx-auto" data-en>A dedicated team combining deep care industry knowledge with European market expertise.</p>
      <p class="text-muted-foreground text-lg max-w-2xl mx-auto hidden" data-zh>专注的团队，融合深厚的护理行业知识与欧洲市场专业经验。</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      ${[
        { initial: 'C', name: 'Caro Chen', roleEn: 'Founder & CEO', roleCn: '创始人兼首席执行官', bioEn: 'Passionate about improving quality of life for older adults across Europe. Built DS CARO from the ground up with a focus on compassionate, quality-first product curation.', bioCn: '致力于提升欧洲老年人的生活质量。以同情心和品质优先为核心，从零开始打造DS CARO。', color: 'bg-primary' },
        { initial: 'P', name: 'Product & Sourcing', roleEn: 'Product & Sourcing Team', roleCn: '产品与采购团队', bioEn: 'Our sourcing specialists work directly with vetted factories across Asia and Europe to ensure every product meets our rigorous CE, UKCA, and ISO quality standards.', bioCn: '我们的采购专家直接与经过审核的亚欧工厂合作，确保每款产品符合严格的CE、UKCA和ISO质量标准。', color: 'bg-accent' },
        { initial: 'B', name: 'B2B & Partnerships', roleEn: 'Business Development', roleCn: '业务拓展', bioEn: 'Dedicated to building long-term partnerships with care homes, NHS trusts, distributors, and healthcare retailers across the UK and Europe.', bioCn: '致力于与英国及欧洲各地养老院、NHS机构、分销商和医疗零售商建立长期合作关系。', color: 'bg-green-700' },
      ].map(m=>`<div class="bg-white rounded-2xl p-8 border border-border shadow-sm card-hover text-center">
        <div class="w-20 h-20 rounded-full ${m.color} flex items-center justify-center text-white font-serif font-bold text-3xl mx-auto mb-5">${m.initial}</div>
        <h3 class="font-serif text-xl font-bold text-foreground mb-1">${m.name}</h3>
        <div class="text-sm font-semibold text-primary mb-4" data-en>${m.roleEn}</div>
        <div class="text-sm font-semibold text-primary mb-4 hidden" data-zh>${m.roleCn}</div>
        <p class="text-sm text-muted-foreground leading-relaxed" data-en>${m.bioEn}</p>
        <p class="text-sm text-muted-foreground leading-relaxed hidden" data-zh>${m.bioCn}</p>
      </div>`).join('')}
    </div>
    <div class="mt-12 bg-primary/5 rounded-2xl p-8 border border-primary/10 text-center">
      <h3 class="font-serif text-xl font-bold text-foreground mb-3" data-en>We Are Growing</h3>
      <h3 class="font-serif text-xl font-bold text-foreground mb-3 hidden" data-zh>我们在成长</h3>
      <p class="text-muted-foreground mb-5" data-en>DS CARO is expanding across Europe. If you are passionate about improving lives through quality care products, we would love to hear from you.</p>
      <p class="text-muted-foreground mb-5 hidden" data-zh>DS CARO正在欧洲持续扩张。如果您热衷于通过优质护理产品改善生活，我们期待与您联系。</p>
      <a href="contact.html" class="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-800 transition">
        <span data-en>Get in Touch →</span><span data-zh>联系我们 →</span>
      </a>
    </div>
  </div>
</section>

<!-- Timeline -->
<section class="py-20 bg-gray-50">
  <div class="max-w-3xl mx-auto px-4">
    <div class="text-center mb-14">
      <h2 class="font-serif text-3xl font-bold text-foreground mb-3" data-en>Our Journey</h2>
      <h2 class="font-serif text-3xl font-bold text-foreground mb-3 hidden" data-zh>我们的发展历程</h2>
      <p class="text-muted-foreground" data-en>Growing to serve more families and care businesses</p>
      <p class="text-muted-foreground hidden" data-zh>持续成长，服务更多家庭和护理机构</p>
    </div>
    <div class="relative">
      <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20"></div>
      <div class="space-y-8">
        ${timeline.map(t => `<div class="flex gap-6 items-start">
          <div class="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0 relative z-10">${t.year}</div>
          <div class="bg-white rounded-xl p-4 shadow-sm border border-border flex-1 mt-1">
            <p class="text-sm text-foreground" data-en>${t.en}</p>
            <p class="text-sm text-foreground hidden" data-zh>${t.cn}</p>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</section>

<!-- Certifications -->
<section class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 text-center">
    <h2 class="font-serif text-3xl font-bold text-foreground mb-4" data-en>Certified Excellence</h2>
    <h2 class="font-serif text-3xl font-bold text-foreground mb-4 hidden" data-zh>认证卓越</h2>
    <p class="text-muted-foreground mb-12" data-en>Every DS CARO product meets the highest international standards for safety, quality, and accessibility.</p>
    <p class="text-muted-foreground mb-12 hidden" data-zh>每款DS CARO产品均符合最高国际安全、质量和无障碍标准。</p>
    <div class="flex flex-wrap justify-center gap-6">
      ${[['CE','CE Certified','欧盟CE认证'],['FDA','FDA Registered','FDA注册'],['ISO','ISO 13485','ISO 13485'],['UKCA','UKCA Marked','UKCA认证'],['GDPR','GDPR Ready','符合GDPR']].map(c=>`<div class="bg-muted rounded-2xl p-6 w-32 text-center card-hover">
        <div class="w-14 h-14 rounded-xl bg-primary text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">${c[0]}</div>
        <div class="text-xs font-semibold text-foreground" data-en>${c[1]}</div>
        <div class="text-xs font-semibold text-foreground hidden" data-zh>${c[2]}</div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- CTA -->
<section class="py-16 bg-primary text-white">
  <div class="max-w-3xl mx-auto px-4 text-center">
    <h2 class="font-serif text-3xl font-bold mb-4" data-en>Join Our Mission</h2>
    <h2 class="font-serif text-3xl font-bold mb-4 hidden" data-zh>加入我们的使命</h2>
    <p class="text-green-100 mb-8" data-en>Whether you are caring for a loved one or running a care facility, we are here to help.</p>
    <p class="text-green-100 mb-8 hidden" data-zh>无论您是在照顾亲人，还是经营护理机构，我们都在这里为您提供支持。</p>
    <div class="flex flex-wrap justify-center gap-4">
      <a href="products.html" class="bg-white text-primary font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition"><span data-en>Explore Products</span><span data-zh>探索产品</span></a>
      <a href="contact.html" class="border-2 border-white text-white font-bold px-8 py-3 rounded-xl hover:bg-white/10 transition"><span data-en>Contact Us</span><span data-zh>联系我们</span></a>
    </div>
  </div>
</section>

${footer()}
${langScript()}
</body></html>`;
}

// ─── Page: products.html (ALL PRODUCTS overview) ───────────────────────
function buildProductsOverview() {
  return `${head('All Products — Senior Care Solutions')}
<body class="bg-background">
${nav('products')}

<!-- Header -->
<section class="bg-gradient-to-br from-primary-light to-white py-16">
  <div class="max-w-7xl mx-auto px-4">
    <nav class="text-sm text-muted-foreground mb-6">
      <a href="index.html" class="hover:text-primary" data-en>Home</a><a href="index.html" class="hover:text-primary hidden" data-zh>首页</a>
      <span class="mx-2">/</span><span data-en>All Products</span><span data-zh>所有产品</span>
    </nav>
    <h1 class="font-serif text-4xl font-bold text-foreground mb-4" data-en>All Products</h1>
    <h1 class="font-serif text-4xl font-bold text-foreground mb-4 hidden" data-zh>所有产品</h1>
    <p class="text-lg text-muted-foreground max-w-2xl" data-en>Browse our complete range of premium adaptive products for senior independence and safety. Available wholesale for care businesses.</p>
    <p class="text-lg text-muted-foreground max-w-2xl hidden" data-zh>浏览我们完整的高端适老产品系列。护理机构可申请批发价格。</p>
  </div>
</section>

<!-- Categories grid -->
<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <div class="space-y-16">
      ${CATALOG.map(cat => `
      <!-- ${cat.name} -->
      <div id="${cat.id}">
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">${cat.icon}</div>
            <div>
              <h2 class="font-serif text-2xl font-bold text-foreground" data-en>${cat.name}</h2>
              <h2 class="font-serif text-2xl font-bold text-foreground hidden" data-zh>${cat.nameCn}</h2>
              <p class="text-sm text-muted-foreground" data-en>${cat.desc}</p>
              <p class="text-sm text-muted-foreground hidden" data-zh>${cat.descCn}</p>
            </div>
          </div>
          <a href="products-${cat.id}.html" class="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            <span data-en>View All</span><span data-zh>查看全部</span> →
          </a>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          ${cat.subs.map(sub => `<a href="products-${cat.id}.html#${sub.id}" class="group bg-muted rounded-2xl p-5 card-hover border border-border">
            <div class="text-3xl mb-3">${sub.icon}</div>
            <h3 class="font-semibold text-foreground mb-2 group-hover:text-primary transition" data-en>${sub.name}</h3>
            <h3 class="font-semibold text-foreground mb-2 group-hover:text-primary transition hidden" data-zh>${sub.nameCn}</h3>
            <p class="text-xs text-muted-foreground" data-en>${sub.desc}</p>
            <p class="text-xs text-muted-foreground hidden" data-zh>${sub.desc}</p>
          </a>`).join('')}
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- B2B CTA -->
<section class="py-14 bg-primary/5 border-y border-primary/10">
  <div class="max-w-3xl mx-auto px-4 text-center">
    <h3 class="font-serif text-2xl font-bold text-foreground mb-3" data-en>Buying for a Care Facility?</h3>
    <h3 class="font-serif text-2xl font-bold text-foreground mb-3 hidden" data-zh>为护理机构采购？</h3>
    <p class="text-muted-foreground mb-6" data-en>Get volume pricing, compliance documentation, and a dedicated account manager. Minimum order from £1,000.</p>
    <p class="text-muted-foreground mb-6 hidden" data-zh>获取批量定价、合规文件和专属客户经理。起订额£1,000起。</p>
    <div class="flex flex-wrap justify-center gap-4">
      <a href="business.html#quote" class="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-green-800 transition">
        <span data-en>Get Wholesale Pricing</span><span data-zh>获取批发价格</span>
      </a>
      <a href="${BRAND.shopUrl}" target="_blank" class="bg-accent text-white font-bold px-8 py-3 rounded-xl hover:bg-orange-600 transition">
        🛒 <span data-en>Shop Retail Now</span><span data-zh>零售立即购买</span>
      </a>
    </div>
  </div>
</section>

${footer()}
${langScript()}
</body></html>`;
}

// ─── Page: products-{cat}.html ─────────────────────────────────────────
function buildCategoryPage(cat) {
  // Generate 4 sample products per sub-category
  const productCard = (sub, idx) => {
    const prices = ['£24.99','£34.99','£44.99','£59.99','£79.99','£99.99'];
    const price = prices[idx % prices.length];
    return `<div class="bg-white rounded-2xl border border-border overflow-hidden card-hover group">
      <div class="aspect-square bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
        <span class="text-7xl">${sub.icon}</span>
      </div>
      <div class="p-5">
        <div class="text-xs font-semibold text-primary mb-1 uppercase tracking-wide" data-en>${sub.name}</div>
        <div class="text-xs font-semibold text-primary mb-1 uppercase tracking-wide hidden" data-zh>${sub.nameCn}</div>
        <h4 class="font-semibold text-foreground mb-2 text-sm" data-en>Premium ${sub.name} — Model ${String.fromCharCode(65+idx)}</h4>
        <h4 class="font-semibold text-foreground mb-2 text-sm hidden" data-zh>高端${sub.nameCn} — 型号 ${String.fromCharCode(65+idx)}</h4>
        <p class="text-xs text-muted-foreground mb-4" data-en>${sub.desc}</p>
        <p class="text-xs text-muted-foreground mb-4 hidden" data-zh>${sub.desc}</p>
        <div class="flex items-center justify-between">
          <span class="font-bold text-foreground">${price}</span>
          <a href="business.html#quote" class="text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-green-800 transition" data-en>Get B2B Price</a>
          <a href="business.html#quote" class="text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-green-800 transition hidden" data-zh>获取B2B报价</a>
        </div>
      </div>
    </div>`;
  };

  const subSections = cat.subs.map((sub, si) => `
  <section id="${sub.id}" class="mb-16">
    <div class="flex items-center gap-3 mb-6">
      <span class="text-3xl">${sub.icon}</span>
      <div>
        <h2 class="font-serif text-2xl font-bold text-foreground" data-en>${sub.name}</h2>
        <h2 class="font-serif text-2xl font-bold text-foreground hidden" data-zh>${sub.nameCn}</h2>
        <p class="text-sm text-muted-foreground" data-en>${sub.desc}</p>
        <p class="text-sm text-muted-foreground hidden" data-zh>${sub.desc}</p>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      ${[0,1,2,3].map(i => productCard(sub, si*4+i)).join('')}
    </div>
  </section>`).join('');

  return `${head(`${cat.name} Products — Senior Care`)}
<body class="bg-background">
${nav('products')}

<!-- Breadcrumb & Header -->
<section class="bg-gradient-to-br from-primary-light to-white py-14">
  <div class="max-w-7xl mx-auto px-4">
    <nav class="text-sm text-muted-foreground mb-5">
      <a href="index.html" class="hover:text-primary" data-en>Home</a><a href="index.html" class="hover:text-primary hidden" data-zh>首页</a>
      <span class="mx-2">/</span>
      <a href="products.html" class="hover:text-primary" data-en>All Products</a><a href="products.html" class="hover:text-primary hidden" data-zh>所有产品</a>
      <span class="mx-2">/</span>
      <span class="text-foreground font-medium" data-en>${cat.name}</span><span class="text-foreground font-medium hidden" data-zh>${cat.nameCn}</span>
    </nav>
    <div class="flex items-center gap-5">
      <div class="w-16 h-16 rounded-2xl bg-white shadow-sm border border-border flex items-center justify-center text-4xl">${cat.icon}</div>
      <div>
        <h1 class="font-serif text-3xl md:text-4xl font-bold text-foreground" data-en>${cat.name}</h1>
        <h1 class="font-serif text-3xl md:text-4xl font-bold text-foreground hidden" data-zh>${cat.nameCn}</h1>
        <p class="text-muted-foreground mt-1" data-en>${cat.desc}</p>
        <p class="text-muted-foreground mt-1 hidden" data-zh>${cat.descCn}</p>
      </div>
    </div>
    <!-- Sub-nav tabs -->
    <div class="flex flex-wrap gap-2 mt-8">
      <a href="#all" class="px-4 py-1.5 bg-primary text-white text-sm font-medium rounded-full" data-en>All</a>
      <a href="#all" class="px-4 py-1.5 bg-primary text-white text-sm font-medium rounded-full hidden" data-zh>全部</a>
      ${cat.subs.map(s => `
        <a href="#${s.id}" class="px-4 py-1.5 bg-white border border-border text-sm font-medium rounded-full hover:border-primary hover:text-primary transition" data-en>${s.name}</a>
        <a href="#${s.id}" class="px-4 py-1.5 bg-white border border-border text-sm font-medium rounded-full hover:border-primary hover:text-primary transition hidden" data-zh>${s.nameCn}</a>
      `).join('')}
    </div>
  </div>
</section>

<!-- Products by sub-category -->
<section id="all" class="py-16 bg-background">
  <div class="max-w-7xl mx-auto px-4">
    ${subSections}
  </div>
</section>

<!-- Add to Quote List sticky bar -->
<div class="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg py-3 px-4 flex items-center justify-between z-30">
  <div class="flex items-center gap-3">
    <div class="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold">0</div>
    <span class="text-sm font-medium text-foreground" data-en>Items in Quote List</span>
    <span class="text-sm font-medium text-foreground hidden" data-zh>询价清单中的产品</span>
  </div>
  <a href="business.html#quote" class="bg-primary text-white text-sm font-semibold px-6 py-2 rounded-lg hover:bg-green-800 transition">
    <span data-en>Submit Quote Request →</span><span data-zh>提交询价 →</span>
  </a>
</div>
<div class="h-16"></div>

${footer()}
${langScript()}
</body></html>`;
}

// ─── Page: solutions.html ──────────────────────────────────────────────
function buildSolutions() {
  const bundles = [
    { icon: '🛁', en: 'Bathroom Safety Kit', cn: '卫浴安全套装', tagEn: 'Most Popular', tagCn: '最受欢迎', desc: 'Complete bathroom fall-prevention solution. Includes suction grab bar, foldable shower seat, non-slip bath mat, and handheld shower.', descCn: '完整卫浴防跌倒解决方案。包含吸盘扶手、折叠淋浴椅、防滑浴垫和手持淋浴器。', price: '£89', items: ['Suction Grab Bar × 2','Foldable Shower Seat','Non-slip Bath Mat','Handheld Shower Head'], targets: 'NHS Trusts, Care Homes, Home Care Agencies' },
    { icon: '🍽️', en: 'Independent Eating Set', cn: '独立进餐套装', tagEn: 'Arthritis Friendly', tagCn: '关节炎友好', desc: 'Everything needed for dignified, independent mealtimes. Adaptive cutlery, plate guards, jar opener, and non-slip mat.', descCn: '有尊严、独立进餐所需的一切。自适应餐具、防溢餐盘、开罐器和防滑垫。', price: '£54', items: ['Built-up Handle Cutlery Set','Weighted Spoon','Scoop Plate with Guard','Electric Jar Opener'], targets: 'Occupational Therapists, Day Care Centres' },
    { icon: '🔔', en: 'Fall Prevention Pack', cn: '防跌倒套装', tagEn: 'Privacy First', tagCn: '隐私优先', desc: 'Non-camera fall detection and lighting solution. mmWave radar sensor, motion night lights, and wearable alert pendant.', descCn: '无摄像头跌倒检测与照明解决方案。毫米波雷达传感器、运动感应夜灯和可穿戴警报挂件。', price: '£149', items: ['mmWave Radar Sensor','Motion Sensor Night Light × 2','Wearable Fall Alert Pendant','Emergency Contact Card'], targets: 'Independent Living Schemes, Sheltered Housing' },
    { icon: '💊', en: 'Dementia Care Box', cn: '认知护理套装', tagEn: 'Specialist Care', tagCn: '专业护理', desc: 'Designed for memory care environments. Smart pill dispenser, simplified phone, GPS tracker, and large-print organizer.', descCn: '专为记忆护理环境设计。智能分药盒、简化手机、GPS追踪器和大字号计划表。', price: '£199', items: ['Smart Pill Dispenser','Simplified Big-Button Phone','GPS Personal Tracker','Large-Print Weekly Planner'], targets: 'Memory Care Units, Dementia Specialist Services' },
    { icon: '🧦', en: 'Dressing Independence Kit', cn: '穿衣独立套装', tagEn: 'Daily Living', tagCn: '日常生活', desc: 'Complete dressing aid collection for independent dressing. Sock aid, long-handle shoe horn, button hook, and zip pull.', descCn: '完整穿衣辅助套装，实现独立穿衣。穿袜辅助器、长柄鞋拔、纽扣钩和拉链辅助器。', price: '£39', items: ['Sock Aid','Long Handle Shoe Horn','Button Hook & Zip Pull','Elastic Shoe Laces (3 pairs)'], targets: 'Rehabilitation Centres, OT Services' },
    { icon: '🎁', en: 'Caregiver Starter Kit', cn: '照护者入门套装', tagEn: 'Gift Ready', tagCn: '礼品包装', desc: 'The essential bundle for new caregivers and families. Covers bathroom, kitchen, mobility, and safety basics.', descCn: '为新照护者和家庭准备的必备套装。涵盖卫浴、厨房、出行和基础安全。', price: '£129', items: ['Grab Bar (Suction)','Adaptive Cutlery Set','Bed Rail Handle','Motion Night Light'], targets: 'Family Caregivers, Gift Purchases, Onboarding Kits' },
  ];

  return `${head('Care Solutions & Bundles')}
<body class="bg-background">
${nav('solutions')}

<section class="bg-gradient-to-br from-primary-light to-white py-16">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h1 class="font-serif text-4xl font-bold text-foreground mb-4" data-en>Complete Care Solutions</h1>
    <h1 class="font-serif text-4xl font-bold text-foreground mb-4 hidden" data-zh>完整护理解决方案</h1>
    <p class="text-lg text-muted-foreground mb-8" data-en>Pre-configured bundles designed for specific care scenarios. Simplify procurement with proven product combinations.</p>
    <p class="text-lg text-muted-foreground mb-8 hidden" data-zh>专为特定护理场景配置的套装。经过验证的产品组合，简化采购流程。</p>
    <div class="flex flex-wrap justify-center gap-4">
      <a href="business.html#catalog" class="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-green-800 transition">
        <span data-en>Download Full Catalog (PDF)</span><span data-zh>下载完整产品目录 (PDF)</span>
      </a>
      <a href="business.html#quote" class="border-2 border-primary text-primary font-bold px-8 py-3 rounded-xl hover:bg-primary hover:text-white transition">
        <span data-en>Request B2B Pricing</span><span data-zh>申请B2B报价</span>
      </a>
    </div>
  </div>
</section>

<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${bundles.map(b => `<div class="bg-background rounded-2xl border border-border overflow-hidden card-hover flex flex-col">
        <div class="bg-primary/5 p-8 text-center">
          <span class="text-5xl">${b.icon}</span>
        </div>
        <div class="p-6 flex flex-col flex-1">
          <div class="flex items-start justify-between mb-3">
            <div>
              <h3 class="font-serif text-lg font-bold text-foreground" data-en>${b.en}</h3>
              <h3 class="font-serif text-lg font-bold text-foreground hidden" data-zh>${b.cn}</h3>
            </div>
            <span class="text-xs bg-accent/10 text-accent font-semibold px-2 py-1 rounded-full whitespace-nowrap ml-2" data-en>${b.tagEn}</span>
            <span class="text-xs bg-accent/10 text-accent font-semibold px-2 py-1 rounded-full whitespace-nowrap ml-2 hidden" data-zh>${b.tagCn}</span>
          </div>
          <p class="text-sm text-muted-foreground mb-4" data-en>${b.desc}</p>
          <p class="text-sm text-muted-foreground mb-4 hidden" data-zh>${b.descCn}</p>
          <div class="bg-muted rounded-xl p-4 mb-4">
            <div class="text-xs font-semibold text-foreground mb-2" data-en>Includes:</div>
            <div class="text-xs font-semibold text-foreground mb-2 hidden" data-zh>包含：</div>
            <ul class="space-y-1">
              ${b.items.map(i => `<li class="text-xs text-muted-foreground flex gap-2"><span class="text-primary">✓</span>${i}</li>`).join('')}
            </ul>
          </div>
          <div class="text-xs text-muted-foreground mb-5">
            <span class="font-semibold" data-en>Ideal for:</span><span class="font-semibold hidden" data-zh>适用于：</span> ${b.targets}
          </div>
          <div class="flex items-center justify-between mt-auto">
            <div>
              <div class="text-xs text-muted-foreground" data-en>From (retail)</div>
              <div class="text-xs text-muted-foreground hidden" data-zh>零售价起</div>
              <div class="text-xl font-bold text-foreground">${b.price}</div>
            </div>
            <div class="flex flex-col gap-2">
              <a href="business.html#quote" class="bg-primary text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-green-800 transition text-center" data-en>Get B2B Quote</a>
              <a href="business.html#quote" class="bg-primary text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-green-800 transition text-center hidden" data-zh>获取B2B报价</a>
              <a href="${BRAND.shopUrl}" target="_blank" class="bg-accent text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition text-center">🛒 <span data-en>Buy Retail</span><span data-zh>零售购买</span></a>
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

// ─── Page: business.html ───────────────────────────────────────────────
function buildBusiness() {
  const tiers = [
    { name: 'Starter', nameCn: '入门级', discount: '15% off MSRP', moq: '£1,000 / month', color: 'border-border', badge: '', perks: ['Standard shipping','Email support','Basic compliance docs','Net 15 payment terms'] },
    { name: 'Professional', nameCn: '专业级', discount: '20% off MSRP', moq: '£5,000 / month', color: 'border-primary', badge: 'Most Popular', perks: ['Free shipping','Priority support','Full compliance documentation','Net 30 payment terms','Quarterly business review'] },
    { name: 'Enterprise', nameCn: '企业级', discount: '25%+ off MSRP', moq: '£25,000 / month', color: 'border-accent', badge: 'Best Value', perks: ['Express shipping','Dedicated account manager','Custom packaging & OEM','Net 60 payment terms','On-site training available','Co-branding / white-label'] },
  ];

  return `${head('For Business — Wholesale & B2B Solutions')}
<body class="bg-background">
${nav()}

<!-- Hero -->
<section class="bg-gradient-to-br from-primary to-green-900 text-white py-20">
  <div class="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
    <div>
      <div class="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
        <span data-en>🏢 Trusted by 500+ Business Partners</span><span data-zh>🏢 深受500+企业合作伙伴信赖</span>
      </div>
      <h1 class="font-serif text-4xl font-bold mb-6" data-en>Senior Care Solutions<br>for Care Businesses</h1>
      <h1 class="font-serif text-4xl font-bold mb-6 hidden" data-zh>面向护理机构的<br>适老产品解决方案</h1>
      <p class="text-green-100 text-lg mb-8" data-en>Factory-direct quality, wholesale pricing, OEM services, and full compliance documentation for NHS Trusts, care homes, distributors, and healthcare retailers.</p>
      <p class="text-green-100 text-lg mb-8 hidden" data-zh>工厂直供品质、批发价格、OEM服务及完整合规文件，服务NHS机构、养老院、分销商和医疗零售商。</p>
      <div class="flex flex-wrap gap-4">
        <a href="#quote" class="bg-white text-primary font-bold px-8 py-3.5 rounded-xl hover:bg-gray-100 transition shadow-lg">
          <span data-en>Apply for Wholesale Account</span><span data-zh>申请批发账户</span>
        </a>
        <a href="#catalog" class="border-2 border-white text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 transition">
          <span data-en>Download Product Catalog</span><span data-zh>下载产品目录</span>
        </a>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      ${[['500+','B2B Partners','企业合作伙伴'],['95%','Reorder Rate','复购率'],['24-48h','Despatch Time','发货时效'],['CE/UKCA','Certified','认证产品']].map(s=>`<div class="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
        <div class="text-3xl font-bold text-white mb-1">${s[0]}</div>
        <div class="text-green-200 text-sm" data-en>${s[1]}</div>
        <div class="text-green-200 text-sm hidden" data-zh>${s[2]}</div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- Pricing Tiers -->
<section id="pricing" class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <div class="text-center mb-14">
      <h2 class="font-serif text-3xl font-bold text-foreground mb-4" data-en>Wholesale Pricing Tiers</h2>
      <h2 class="font-serif text-3xl font-bold text-foreground mb-4 hidden" data-zh>批发定价方案</h2>
      <p class="text-muted-foreground" data-en>Transparent volume pricing. The more you order, the more you save.</p>
      <p class="text-muted-foreground hidden" data-zh>透明的批量定价。订购量越大，节省越多。</p>
    </div>
    <div class="grid md:grid-cols-3 gap-6">
      ${tiers.map(t => `<div class="rounded-2xl border-2 ${t.color} p-8 flex flex-col relative">
        ${t.badge ? `<div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold px-4 py-1 rounded-full">${t.badge}</div>` : ''}
        <h3 class="font-serif text-xl font-bold text-foreground mb-2" data-en>${t.name}</h3>
        <h3 class="font-serif text-xl font-bold text-foreground mb-2 hidden" data-zh>${t.nameCn}</h3>
        <div class="text-3xl font-bold text-primary mb-1">${t.discount}</div>
        <div class="text-sm text-muted-foreground mb-6" data-en>Min. ${t.moq}</div>
        <div class="text-sm text-muted-foreground mb-6 hidden" data-zh>最低 ${t.moq}</div>
        <ul class="space-y-3 mb-8 flex-1">
          ${t.perks.map(p => `<li class="flex gap-2 text-sm text-foreground"><span class="text-primary font-bold">✓</span>${p}</li>`).join('')}
        </ul>
        <a href="#quote" class="block text-center bg-primary text-white font-semibold py-3 rounded-xl hover:bg-green-800 transition">
          <span data-en>Apply Now</span><span data-zh>立即申请</span>
        </a>
      </div>`).join('')}
    </div>
    <p class="text-center text-sm text-muted-foreground mt-6" data-en>Custom pricing available for government contracts and large-scale deployments. Contact our sales team.</p>
    <p class="text-center text-sm text-muted-foreground mt-6 hidden" data-zh>政府合同和大规模部署可提供定制定价。请联系我们的销售团队。</p>
  </div>
</section>

<!-- OEM Services -->
<section id="oem" class="py-20 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4">
    <div class="grid md:grid-cols-2 gap-16 items-center">
      <div>
        <h2 class="font-serif text-3xl font-bold text-foreground mb-6" data-en>OEM / ODM Services</h2>
        <h2 class="font-serif text-3xl font-bold text-foreground mb-6 hidden" data-zh>OEM/ODM服务</h2>
        <p class="text-muted-foreground mb-8" data-en>Build your brand on our proven products. We offer full white-label and custom manufacturing services for partners ordering at Enterprise tier.</p>
        <p class="text-muted-foreground mb-8 hidden" data-zh>在我们成熟的产品上建立您的品牌。我们为企业级合作伙伴提供完整的白标和定制制造服务。</p>
        <div class="grid grid-cols-2 gap-4">
          ${[
            { icon: '🏷️', en: 'Custom Logo & Packaging', cn: '定制标志与包装' },
            { icon: '🎨', en: 'Custom Colour & Design', cn: '定制颜色与设计' },
            { icon: '📋', en: 'Private Label Documentation', cn: '私标文件' },
            { icon: '🏭', en: 'Custom Manufacturing', cn: '定制制造' },
          ].map(f => `<div class="bg-white rounded-xl p-4 border border-border card-hover text-center">
            <div class="text-3xl mb-2">${f.icon}</div>
            <div class="text-sm font-semibold text-foreground" data-en>${f.en}</div>
            <div class="text-sm font-semibold text-foreground hidden" data-zh>${f.cn}</div>
          </div>`).join('')}
        </div>
      </div>
      <div class="bg-white rounded-2xl p-8 border border-border shadow-sm">
        <h3 class="font-serif text-xl font-bold text-foreground mb-6" data-en>OEM Requirements</h3>
        <h3 class="font-serif text-xl font-bold text-foreground mb-6 hidden" data-zh>OEM要求</h3>
        <div class="space-y-4">
          ${[
            { en: 'Minimum Order Quantity', cn: '最低起订量', val: '500 units per SKU' },
            { en: 'Lead Time', cn: '交货期', val: '8–12 weeks' },
            { en: 'Sample Fee', cn: '样品费', val: 'Waived for Enterprise partners' },
            { en: 'CE/UKCA Re-certification', cn: 'CE/UKCA重新认证', val: 'Available on request' },
          ].map(r => `<div class="flex justify-between items-center py-3 border-b border-border last:border-0">
            <span class="text-sm text-muted-foreground" data-en>${r.en}</span>
            <span class="text-sm text-muted-foreground hidden" data-zh>${r.cn}</span>
            <span class="text-sm font-semibold text-foreground">${r.val}</span>
          </div>`).join('')}
        </div>
        <a href="#quote" class="mt-6 block text-center bg-primary text-white font-bold py-3 rounded-xl hover:bg-green-800 transition">
          <span data-en>Enquire About OEM →</span><span data-zh>咨询OEM服务 →</span>
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Catalog Download -->
<section id="catalog" class="py-14 bg-primary text-white">
  <div class="max-w-3xl mx-auto px-4 text-center">
    <h2 class="font-serif text-3xl font-bold mb-4" data-en>Download Our B2B Product Catalog</h2>
    <h2 class="font-serif text-3xl font-bold mb-4 hidden" data-zh>下载B2B产品目录</h2>
    <p class="text-green-100 mb-8" data-en>Full product specifications, wholesale pricing, CE/UKCA certification status, and compliance documentation. 120+ products across 6 categories.</p>
    <p class="text-green-100 mb-8 hidden" data-zh>完整产品规格、批发价格、CE/UKCA认证状态和合规文件。6个类别共120+款产品。</p>
    <a href="contact.html" class="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3.5 rounded-xl hover:bg-gray-100 transition shadow-lg">
      📥 <span data-en>Request Catalog PDF</span><span data-zh>申请目录PDF</span>
    </a>
  </div>
</section>

<!-- Quote Form -->
<section id="quote" class="py-20 bg-white">
  <div class="max-w-2xl mx-auto px-4">
    <div class="text-center mb-10">
      <h2 class="font-serif text-3xl font-bold text-foreground mb-4" data-en>Apply for a Wholesale Account</h2>
      <h2 class="font-serif text-3xl font-bold text-foreground mb-4 hidden" data-zh>申请批发账户</h2>
      <p class="text-muted-foreground" data-en>Fill in the form below and our B2B team will respond within 1 business day.</p>
      <p class="text-muted-foreground hidden" data-zh>请填写以下表单，我们的B2B团队将在1个工作日内回复。</p>
    </div>
    <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="bg-background rounded-2xl border border-border p-8 space-y-5 shadow-sm">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-foreground mb-1.5" data-en>First Name *</label>
          <label class="block text-sm font-medium text-foreground mb-1.5 hidden" data-zh>名字 *</label>
          <input type="text" name="first_name" required class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
        </div>
        <div>
          <label class="block text-sm font-medium text-foreground mb-1.5" data-en>Last Name *</label>
          <label class="block text-sm font-medium text-foreground mb-1.5 hidden" data-zh>姓氏 *</label>
          <input type="text" name="last_name" required class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-foreground mb-1.5" data-en>Business Email *</label>
        <label class="block text-sm font-medium text-foreground mb-1.5 hidden" data-zh>企业邮箱 *</label>
        <input type="email" name="email" required class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
      </div>
      <div>
        <label class="block text-sm font-medium text-foreground mb-1.5" data-en>Company Name *</label>
        <label class="block text-sm font-medium text-foreground mb-1.5 hidden" data-zh>公司名称 *</label>
        <input type="text" name="company" required class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
      </div>
      <div>
        <label class="block text-sm font-medium text-foreground mb-1.5" data-en>Organisation Type *</label>
        <label class="block text-sm font-medium text-foreground mb-1.5 hidden" data-zh>机构类型 *</label>
        <select name="org_type" required class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
          <option value="" data-en>Select...</option>
          <option value="care_home" data-en>Care Home / Nursing Home</option>
          <option value="nhs" data-en>NHS Trust / Hospital</option>
          <option value="homecare" data-en>Home Care Agency</option>
          <option value="distributor" data-en>Distributor / Wholesaler</option>
          <option value="retailer" data-en>Healthcare Retailer</option>
          <option value="government" data-en>Government / Local Authority</option>
          <option value="other" data-en>Other</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-foreground mb-1.5" data-en>Estimated Monthly Order Volume</label>
        <label class="block text-sm font-medium text-foreground mb-1.5 hidden" data-zh>预估月采购额</label>
        <select name="volume" class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
          <option value="" data-en>Select range...</option>
          <option value="1k-5k">£1,000 – £5,000</option>
          <option value="5k-25k">£5,000 – £25,000</option>
          <option value="25k+">£25,000+</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-foreground mb-1.5" data-en>Tell Us About Your Needs</label>
        <label class="block text-sm font-medium text-foreground mb-1.5 hidden" data-zh>描述您的需求</label>
        <textarea name="message" rows="4" class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" placeholder="Products you are interested in, quantity requirements, specific certifications needed..."></textarea>
      </div>
      <button type="submit" class="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-green-800 transition text-base">
        <span data-en>Submit Application →</span><span data-zh>提交申请 →</span>
      </button>
      <p class="text-xs text-muted-foreground text-center" data-en>By submitting you agree to our Terms of Service and Privacy Policy.</p>
      <p class="text-xs text-muted-foreground text-center hidden" data-zh>提交即表示您同意我们的服务条款和隐私政策。</p>
    </form>
    <div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      <div class="bg-muted rounded-xl p-4">
        <div class="text-lg">👤</div>
        <div class="text-xs text-muted-foreground mt-1" data-en>Contact</div>
        <div class="text-xs text-muted-foreground mt-1 hidden" data-zh>联系人</div>
        <div class="text-sm font-semibold text-foreground mt-1">${BRAND.contact}</div>
      </div>
      <div class="bg-muted rounded-xl p-4">
        <div class="text-lg">📞</div>
        <div class="text-xs text-muted-foreground mt-1" data-en>Phone</div>
        <div class="text-xs text-muted-foreground mt-1 hidden" data-zh>电话</div>
        <div class="text-sm font-semibold text-foreground mt-1">${BRAND.phone}</div>
      </div>
      <div class="bg-muted rounded-xl p-4">
        <div class="text-lg">📧</div>
        <div class="text-xs text-muted-foreground mt-1" data-en>Email</div>
        <div class="text-xs text-muted-foreground mt-1 hidden" data-zh>邮箱</div>
        <div class="text-sm font-semibold text-foreground mt-1">${BRAND.email}</div>
      </div>
      <div class="bg-muted rounded-xl p-4">
        <div class="text-lg">📅</div>
        <div class="text-xs text-muted-foreground mt-1" data-en>Response Time</div>
        <div class="text-xs text-muted-foreground mt-1 hidden" data-zh>响应时间</div>
        <div class="text-sm font-semibold text-foreground mt-1" data-en>1 Business Day</div>
        <div class="text-sm font-semibold text-foreground mt-1 hidden" data-zh>1个工作日</div>
      </div>
    </div>
  </div>
</section>

${footer()}
${langScript()}
</body></html>`;
}

// ─── Page: contact.html ────────────────────────────────────────────────
function buildContact() {
  return `${head('Contact Us')}
<body class="bg-background">
${nav()}

<section class="bg-gradient-to-br from-primary-light to-white py-16">
  <div class="max-w-3xl mx-auto px-4 text-center">
    <h1 class="font-serif text-4xl font-bold text-foreground mb-4" data-en>Get in Touch</h1>
    <h1 class="font-serif text-4xl font-bold text-foreground mb-4 hidden" data-zh>联系我们</h1>
    <p class="text-muted-foreground text-lg" data-en>Whether you have a question about our products, need wholesale pricing, or want to book a demo — we are here to help.</p>
    <p class="text-muted-foreground text-lg hidden" data-zh>无论您对产品有疑问、需要批发报价，还是想预约演示，我们都在这里为您服务。</p>
  </div>
</section>

<section class="py-16 bg-white">
  <div class="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8">
    <!-- Contact channels -->
    <div class="space-y-5">
      ${[
        { icon: '👤', en: 'Contact', cn: '联系人', val: BRAND.contact, sub: '' },
        { icon: '📞', en: 'Phone', cn: '电话', val: BRAND.phone, sub: 'Mon–Fri 9am–6pm (GMT+8)' },
        { icon: '📧', en: 'Email', cn: '邮箱', val: BRAND.email, sub: 'Reply within 24 hours' },
        { icon: '📍', en: 'Address', cn: '地址', val: BRAND.address, sub: 'United Kingdom' },
      ].map(c => `<div class="bg-muted rounded-2xl p-5 border border-border">
        <div class="text-2xl mb-3">${c.icon}</div>
        <div class="font-semibold text-foreground text-sm mb-1" data-en>${c.en}</div>
        <div class="font-semibold text-foreground text-sm mb-1 hidden" data-zh>${c.cn}</div>
        <div class="text-sm text-primary font-medium">${c.val}</div>
        ${c.sub ? `<div class="text-xs text-muted-foreground mt-1">${c.sub}</div>` : ''}
      </div>`).join('')}
      <a href="business.html#quote" class="block bg-accent text-white rounded-2xl p-5 text-center hover:bg-orange-600 transition card-hover">
        <div class="text-2xl mb-2">📋</div>
        <div class="font-bold text-sm" data-en>Apply for Wholesale Account</div>
        <div class="font-bold text-sm hidden" data-zh>申请批发账户</div>
      </a>
    </div>

    <!-- Contact form -->
    <div class="md:col-span-2">
      <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="space-y-5">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-foreground mb-1.5" data-en>First Name *</label>
            <label class="block text-sm font-medium text-foreground mb-1.5 hidden" data-zh>名字 *</label>
            <input type="text" name="first_name" required class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
          </div>
          <div>
            <label class="block text-sm font-medium text-foreground mb-1.5" data-en>Last Name *</label>
            <label class="block text-sm font-medium text-foreground mb-1.5 hidden" data-zh>姓氏 *</label>
            <input type="text" name="last_name" required class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-foreground mb-1.5" data-en>Email Address *</label>
          <label class="block text-sm font-medium text-foreground mb-1.5 hidden" data-zh>邮箱地址 *</label>
          <input type="email" name="email" required class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
        </div>
        <div>
          <label class="block text-sm font-medium text-foreground mb-1.5" data-en>Subject *</label>
          <label class="block text-sm font-medium text-foreground mb-1.5 hidden" data-zh>主题 *</label>
          <select name="subject" required class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
            <option value="" data-en>Select a topic...</option>
            <option value="wholesale" data-en>Wholesale / B2B Enquiry</option>
            <option value="product" data-en>Product Information</option>
            <option value="oem" data-en>OEM / Custom Order</option>
            <option value="sample" data-en>Request Product Samples</option>
            <option value="demo" data-en>Book a Demo</option>
            <option value="other" data-en>Other</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-foreground mb-1.5" data-en>Message *</label>
          <label class="block text-sm font-medium text-foreground mb-1.5 hidden" data-zh>留言 *</label>
          <textarea name="message" rows="5" required class="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"></textarea>
        </div>
        <button type="submit" class="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-green-800 transition">
          <span data-en>Send Message →</span><span data-zh>发送消息 →</span>
        </button>
      </form>
    </div>
  </div>
</section>

${footer()}
${langScript()}
</body></html>`;
}

// ─── Page: blog.html ───────────────────────────────────────────────────
function buildBlog() {
  const posts = [
    { icon: '🛁', en: 'Top 10 Bathroom Safety Products for 2026', cn: '2026年十大卫浴安全产品', date: 'March 2026', cat: 'Bathroom Safety', desc: 'A guide to the most effective bathroom safety products for older adults, reviewed by occupational therapists.', descCn: '由职业治疗师评测的最有效老年人卫浴安全产品指南。' },
    { icon: '🏥', en: 'How to Choose Adaptive Products for Care Homes', cn: '如何为养老院选择适老产品', date: 'February 2026', cat: 'B2B Guide', desc: 'A procurement guide for care home managers covering compliance, bulk buying, and staff training requirements.', descCn: '面向养老院管理者的采购指南，涵盖合规、批量采购和员工培训要求。' },
    { icon: '📡', en: 'Privacy-First Fall Detection: mmWave vs. Cameras', cn: '隐私优先的跌倒检测：毫米波雷达vs摄像头', date: 'January 2026', cat: 'Smart Care', desc: 'Why radar-based fall detection is replacing cameras in modern care facilities across Europe.', descCn: '为何雷达跌倒检测正在欧洲现代护理机构中取代摄像头。' },
    { icon: '🍴', en: 'Mealtimes with Dignity: Adaptive Dining Solutions', cn: '有尊严的用餐：自适应餐饮解决方案', date: 'December 2025', cat: 'Kitchen & Dining', desc: 'How the right adaptive utensils can transform mealtimes for people with arthritis and limited dexterity.', descCn: '合适的自适应餐具如何改变关节炎和手部灵活性受限患者的用餐体验。' },
    { icon: '🌍', en: 'European Silver Economy: Market Trends 2026', cn: '欧洲银发经济：2026年市场趋势', date: 'November 2025', cat: 'Industry Insights', desc: 'Key trends shaping the £352 billion European senior care product market and what they mean for suppliers.', descCn: '影响3520亿英镑欧洲老年护理产品市场的关键趋势及其对供应商的意义。' },
    { icon: '🏷️', en: 'OEM vs. White-Label: What Is Right for Your Business?', cn: 'OEM vs. 白标：哪种适合您的业务？', date: 'October 2025', cat: 'B2B Guide', desc: "A practical comparison of OEM and white-label options for healthcare retailers and care businesses looking to build their own brand.", descCn: '为寻求建立自有品牌的医疗零售商和护理机构提供的OEM与白标选项实用对比。' },
  ];
  return `${head('Resources & Blog')}
<body class="bg-background">
${nav('blog')}

<section class="bg-gradient-to-br from-primary-light to-white py-16">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h1 class="font-serif text-4xl font-bold text-foreground mb-4" data-en>Resources & Insights</h1>
    <h1 class="font-serif text-4xl font-bold text-foreground mb-4 hidden" data-zh>资源与洞见</h1>
    <p class="text-muted-foreground text-lg" data-en>Expert guides, industry insights, and product knowledge for care professionals and procurement teams.</p>
    <p class="text-muted-foreground text-lg hidden" data-zh>为护理专业人员和采购团队提供的专家指南、行业洞见和产品知识。</p>
  </div>
</section>

<section class="py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${posts.map(p => `<article class="bg-background rounded-2xl border border-border overflow-hidden card-hover">
        <div class="bg-primary/5 h-40 flex items-center justify-center text-6xl">${p.icon}</div>
        <div class="p-6">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-xs bg-primary/10 text-primary font-semibold px-2 py-1 rounded-full">${p.cat}</span>
            <span class="text-xs text-muted-foreground">${p.date}</span>
          </div>
          <h3 class="font-serif text-lg font-bold text-foreground mb-3 leading-snug" data-en>${p.en}</h3>
          <h3 class="font-serif text-lg font-bold text-foreground mb-3 leading-snug hidden" data-zh>${p.cn}</h3>
          <p class="text-sm text-muted-foreground mb-4" data-en>${p.desc}</p>
          <p class="text-sm text-muted-foreground mb-4 hidden" data-zh>${p.descCn}</p>
          <a href="contact.html" class="text-sm font-semibold text-primary hover:underline" data-en>Read More →</a>
          <a href="contact.html" class="text-sm font-semibold text-primary hover:underline hidden" data-zh>阅读更多 →</a>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>

${footer()}
${langScript()}
</body></html>`;
}

// ─── Write all files ───────────────────────────────────────────────────
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

  // Category pages
  CATALOG.forEach(cat => {
    pages[`products-${cat.id}.html`] = buildCategoryPage(cat);
  });

  // Write all files
  let count = 0;
  for (const [filename, html] of Object.entries(pages)) {
    fs.writeFileSync(path.join(OUT, filename), html, 'utf8');
    count++;
    console.log(`✓ ${filename}`);
  }
  console.log(`\n🎉 Built ${count} pages to ${OUT}`);
}

buildAll();
