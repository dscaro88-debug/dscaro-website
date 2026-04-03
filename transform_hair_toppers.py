#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Transform products-hair-toppers.html into a 3-subcategory overview page."""
import codecs

with open('products-hair-toppers.html', 'r', encoding='utf-8-sig') as f:
    content = f.read()

start_marker = '<!-- Products Grid -->'
end_marker = '<!-- Footer -->'
start_idx = content.index(start_marker)
end_idx = content.index(end_marker)

new_grid = '''<!-- Products Grid -->
<section class="py-16 bg-background">
  <div class="max-w-7xl mx-auto px-4">

  <!-- ===== SECTION 1: Hair Toppers ===== -->
  <section id="hair-toppers" class="mb-16">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <span class="text-3xl">💇</span>
        <div>
          <h2 class="font-serif text-2xl font-bold text-foreground">
            <span data-lang="en">Hair Toppers</span>
            <span data-lang="de" style="display:none">Haarverdichtungen</span>
            <span data-lang="fr" style="display:none">Toppers cheveux</span>
            <span data-lang="es" style="display:none">Toppers capilares</span>
            <span data-lang="zh" style="display:none">女士发块</span>
            <span data-lang="ar" style="display:none">مُكثفات الشعر</span>
            <span data-lang="ja" style="display:none">ヘアトップパー</span>
          </h2>
          <p class="text-sm text-muted-foreground">
            <span data-lang="en">Mono, silk base & lace toppers for thinning hair — 100% human hair</span>
            <span data-lang="de" style="display:none">Mono-, Seiden- & Spitzen-Haarverdichtungen fur dünnes Haar</span>
            <span data-lang="fr" style="display:none">Toppers mono, base soie & dentelle pour cheveux clairsemes</span>
            <span data-lang="es" style="display:none">Toppers mono, base de seda y encaje para cabello fino</span>
            <span data-lang="zh" style="display:none">蕾丝、丝底发块，适用于头发稀疏</span>
            <span data-lang="ar" style="display:none">مُكثفات مونو وقاعدة حريرية وشعر مستعار للشعر الخفيف</span>
            <span data-lang="ja" style="display:none">Mono、シルク、レーストップパー - 薄毛用</span>
          </p>
        </div>
      </div>
      <a href="#hair-toppers" class="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline whitespace-nowrap">
        <span data-lang="en">View All →</span>
        <span data-lang="de" style="display:none">Alle anzeigen →</span>
        <span data-lang="fr" style="display:none">Tout voir →</span>
        <span data-lang="es" style="display:none">Ver todos →</span>
        <span data-lang="zh" style="display:none">查看全部 →</span>
        <span data-lang="ar" style="display:none">عرض الكل →</span>
        <span data-lang="ja" style="display:none">すべて見る →</span>
      </a>
    </div>
    <hr class="border-border mb-6">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

      <a href="product-hair-top-01.html" class="bg-white rounded-2xl border border-border overflow-hidden card-hover group block">
        <div class="aspect-square overflow-hidden relative">
          <img src="images/hair-top-01-main.jpg" alt="Women's Hair Topper DS-HAIR-TOP-01" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
          <span class="absolute top-2 left-2 bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full"><span data-lang="en">NEW</span><span data-lang="de" style="display:none">NEU</span><span data-lang="fr" style="display:none">NOUVEAU</span><span data-lang="es" style="display:none">NUEVO</span><span data-lang="zh" style="display:none">新品</span><span data-lang="ar" style="display:none">جديد</span><span data-lang="ja" style="display:none">新発売</span></span>
        </div>
        <div class="p-4">
          <div class="text-xs font-semibold text-primary mb-1 uppercase tracking-wide"><span data-lang="en">Hair Toppers</span><span data-lang="zh" style="display:none">女士发块</span></div>
          <div class="text-[10px] text-muted-foreground mb-1 font-mono">DS-HAIR-TOP-01</div>
          <h4 class="font-semibold text-foreground mb-2 text-sm group-hover:text-primary transition line-clamp-2"><span data-lang="en">7"X8" Mono Top Human Hair Topper</span><span data-lang="zh" style="display:none">7"X8" MONO 网女士发块</span></h4>
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-muted-foreground"><span data-lang="en">USD $218-278</span><span data-lang="zh" style="display:none">$218-278</span></span>
            <span class="text-xs bg-primary text-white px-2.5 py-1 rounded-lg"><span data-lang="en">View →</span><span data-lang="zh" style="display:none">查看 →</span></span>
          </div>
        </div>
      </a>

      <a href="product-hair-top-02.html" class="bg-white rounded-2xl border border-border overflow-hidden card-hover group block">
        <div class="aspect-square overflow-hidden relative">
          <img src="images/hair-top-02-main.jpg" alt="Women's Hair Topper DS-HAIR-TOP-02" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
          <span class="absolute top-2 left-2 bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full"><span data-lang="en">NEW</span><span data-lang="de" style="display:none">NEU</span><span data-lang="fr" style="display:none">NOUVEAU</span><span data-lang="es" style="display:none">NUEVO</span><span data-lang="zh" style="display:none">新品</span><span data-lang="ar" style="display:none">جديد</span><span data-lang="ja" style="display:none">新発売</span></span>
        </div>
        <div class="p-4">
          <div class="text-xs font-semibold text-primary mb-1 uppercase tracking-wide"><span data-lang="en">Hair Toppers</span><span data-lang="zh" style="display:none">女士发块</span></div>
          <div class="text-[10px] text-muted-foreground mb-1 font-mono">DS-HAIR-TOP-02</div>
          <h4 class="font-semibold text-foreground mb-2 text-sm group-hover:text-primary transition line-clamp-2"><span data-lang="en">7"X9" Hand-Tied Human Hair Topper</span><span data-lang="zh" style="display:none">7"X9" 手织女士发块</span></h4>
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-muted-foreground"><span data-lang="en">USD $128-178</span><span data-lang="zh" style="display:none">$128-178</span></span>
            <span class="text-xs bg-primary text-white px-2.5 py-1 rounded-lg"><span data-lang="en">View →</span><span data-lang="zh" style="display:none">查看 →</span></span>
          </div>
        </div>
      </a>

      <a href="product-hair-top-03.html" class="bg-white rounded-2xl border border-border overflow-hidden card-hover group block">
        <div class="aspect-square overflow-hidden relative">
          <img src="images/hair-top-03-main.jpg" alt="Women's Hair Toupee DS-HAIR-TOP-03" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
          <span class="absolute top-2 left-2 bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full"><span data-lang="en">NEW</span><span data-lang="de" style="display:none">NEU</span><span data-lang="fr" style="display:none">NOUVEAU</span><span data-lang="es" style="display:none">NUEVO</span><span data-lang="zh" style="display:none">新品</span><span data-lang="ar" style="display:none">جديد</span><span data-lang="ja" style="display:none">新発売</span></span>
        </div>
        <div class="p-4">
          <div class="text-xs font-semibold text-primary mb-1 uppercase tracking-wide"><span data-lang="en">Hair Toppers</span><span data-lang="zh" style="display:none">女士发块</span></div>
          <div class="text-[10px] text-muted-foreground mb-1 font-mono">DS-HAIR-TOP-03</div>
          <h4 class="font-semibold text-foreground mb-2 text-sm group-hover:text-primary transition line-clamp-2"><span data-lang="en">7.5"x8" Mono Toupee with NPU</span><span data-lang="zh" style="display:none">7.5"x8" MONO+ NPU 女士假发</span></h4>
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-muted-foreground"><span data-lang="en">USD $188-238</span><span data-lang="zh" style="display:none">$188-238</span></span>
            <span class="text-xs bg-primary text-white px-2.5 py-1 rounded-lg"><span data-lang="en">View →</span><span data-lang="zh" style="display:none">查看 →</span></span>
          </div>
        </div>
      </a>

      <a href="product-hair-top-04.html" class="bg-white rounded-2xl border border-border overflow-hidden card-hover group block">
        <div class="aspect-square overflow-hidden relative">
          <img src="images/hair-top-04/top04-01.jpg" alt="Women's Hair Topper DS-HAIR-TOP-04" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
        </div>
        <div class="p-4">
          <div class="text-xs font-semibold text-primary mb-1 uppercase tracking-wide"><span data-lang="en">Hair Toppers</span><span data-lang="zh" style="display:none">女士发块</span></div>
          <div class="text-[10px] text-muted-foreground mb-1 font-mono">DS-HAIR-TOP-04</div>
          <h4 class="font-semibold text-foreground mb-2 text-sm group-hover:text-primary transition line-clamp-2"><span data-lang="en">6" X 6" Silk Top With Lace Topper</span><span data-lang="zh" style="display:none">6"X6" 丝绸顶蕾丝刘海</span></h4>
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-muted-foreground"><span data-lang="en">USD $118-158</span><span data-lang="zh" style="display:none">$118-158</span></span>
            <span class="text-xs bg-primary text-white px-2.5 py-1 rounded-lg"><span data-lang="en">View →</span><span data-lang="zh" style="display:none">查看 →</span></span>
          </div>
        </div>
      </a>

    </div>
  </section>

  <!-- ===== SECTION 2: Short & Curly Wigs — Coming Soon ===== -->
  <section id="short-curly-wigs" class="mb-16">
    <div class="flex items-center gap-3 mb-6">
      <span class="text-3xl">🌀</span>
      <div>
        <h2 class="font-serif text-2xl font-bold text-foreground">
          <span data-lang="en">Short & Curly Wigs</span>
          <span data-lang="de" style="display:none">Kurz & Lockige Perücken</span>
          <span data-lang="fr" style="display:none">Perruques courtes & bouclées</span>
          <span data-lang="es" style="display:none">Pelucas cortas y rizadas</span>
          <span data-lang="zh" style="display:none">短款卷发假发</span>
          <span data-lang="ar" style="display:none">شعر مستعار قصير ومجعد</span>
          <span data-lang="ja" style="display:none">ショート・カールウィッグ</span>
        </h2>
        <p class="text-sm text-muted-foreground"><span data-lang="en">Volume, bounce & natural curls — arriving soon</span><span data-lang="zh" style="display:none">蓬松、弹性，自然卷曲款式即将上线</span></p>
      </div>
    </div>
    <hr class="border-border mb-6">
    <div class="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-border">
      <div class="text-5xl mb-4 opacity-40">🌀</div>
      <h3 class="font-serif text-xl font-bold text-foreground mb-2"><span data-lang="en">Short & Curly Wigs</span><span data-lang="zh" style="display:none">短款卷发假发</span></h3>
      <p class="text-muted-foreground mb-4 text-sm"><span data-lang="en">Coming Soon — New styles arriving soon</span><span data-lang="de" style="display:none">Demnachst — Neue Styles kommen bald</span><span data-lang="fr" style="display:none">Bientot disponible — Nouveaux styles</span><span data-lang="es" style="display:none">Proximamente — Nuevos estilos</span><span data-lang="zh" style="display:none">即将推出 — 新款式即将上线</span><span data-lang="ar" style="display:none">قريباً — أنماط جديدة قادمة</span><span data-lang="ja" style="display:none">近日発売 — 新しいスタイルが登場します</span></p>
      <a href="contact.html" class="text-sm font-semibold text-primary border border-primary px-5 py-2 rounded-lg hover:bg-primary hover:text-white transition">
        <span data-lang="en">Get Notified →</span><span data-lang="de" style="display:none">Benachrichtigung erhalten →</span><span data-lang="fr" style="display:none">Etre notifie →</span><span data-lang="es" style="display:none">Ser notificado →</span><span data-lang="zh" style="display:none">获取通知 →</span><span data-lang="ar" style="display:none">احصل على اشعار →</span><span data-lang="ja" style="display:none">通知を受け取る →</span>
      </a>
    </div>
  </section>

  <!-- ===== SECTION 3: Chemo & Soft Wigs — Coming Soon ===== -->
  <section id="chemo-soft-wigs" class="mb-16">
    <div class="flex items-center gap-3 mb-6">
      <span class="text-3xl">🌸</span>
      <div>
        <h2 class="font-serif text-2xl font-bold text-foreground">
          <span data-lang="en">Chemo & Soft Wigs</span>
          <span data-lang="de" style="display:none">Chemo & Weiche Perücken</span>
          <span data-lang="fr" style="display:none">Perruques chimio & douces</span>
          <span data-lang="es" style="display:none">Pelucas de quimio y suaves</span>
          <span data-lang="zh" style="display:none">化疗柔软假发</span>
          <span data-lang="ar" style="display:none">شعر مستعار كيميائي و ناعم</span>
          <span data-lang="ja" style="display:none">抗がん剤用ウィッグ・ソフト</span>
        </h2>
        <p class="text-sm text-muted-foreground"><span data-lang="en">Ultra-soft, breathable wigs designed for chemo patients</span><span data-lang="zh" style="display:none">超柔软、透气，专为化疗患者设计</span></p>
      </div>
    </div>
    <hr class="border-border mb-6">
    <div class="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-border">
      <div class="text-5xl mb-4 opacity-40">🌸</div>
      <h3 class="font-serif text-xl font-bold text-foreground mb-2"><span data-lang="en">Chemo & Soft Wigs</span><span data-lang="zh" style="display:none">化疗柔软假发</span></h3>
      <p class="text-muted-foreground mb-4 text-sm"><span data-lang="en">Coming Soon — Gentle styles for sensitive scalps</span><span data-lang="de" style="display:none">Demnachst — Sanfte Styles fur empfindliche Kopfhaut</span><span data-lang="fr" style="display:none">Bientot — Styles doux pour cuir chevelu sensible</span><span data-lang="es" style="display:none">Proximamente — Estilos suaves para cuero cabelludo sensible</span><span data-lang="zh" style="display:none">即将推出 — 温和款式，适合敏感头皮</span><span data-lang="ar" style="display:none">قريباً — أنماط لطيفة لفروة رأس حساسة</span><span data-lang="ja" style="display:none">近日発売 — 敏感なお肌のかゆみを和らげるウィッグ</span></p>
      <a href="contact.html" class="text-sm font-semibold text-primary border border-primary px-5 py-2 rounded-lg hover:bg-primary hover:text-white transition">
        <span data-lang="en">Get Notified →</span><span data-lang="de" style="display:none">Benachrichtigung erhalten →</span><span data-lang="fr" style="display:none">Etre notifie →</span><span data-lang="es" style="display:none">Ser notificado →</span><span data-lang="zh" style="display:none">获取通知 →</span><span data-lang="ar" style="display:none">احصل على اشعار →</span><span data-lang="ja" style="display:none">通知を受け取る →</span>
      </a>
    </div>
  </section>

  <!-- CTA -->
  <div class="mt-8 bg-white rounded-3xl border border-border p-8 md:p-12 text-center">
    <h3 class="font-serif text-2xl font-bold text-foreground mb-4"><span data-lang="en">Custom Women's Hair Solutions</span><span data-lang="de" style="display:none">Individuelle Damen-Haarlosungen</span><span data-lang="fr" style="display:none">Solutions cheveux femme personnalisees</span><span data-lang="es" style="display:none">Soluciones capilares para mujer personalizadas</span><span data-lang="zh" style="display:none">女士假发定制服务</span><span data-lang="ar" style="display:none">حلول شعر نسائية مخصصة</span><span data-lang="ja" style="display:none">女性用カスタムヘアソリューション</span></h3>
    <p class="text-muted-foreground mb-6 max-w-2xl mx-auto"><span data-lang="en">We offer custom colors, lengths, textures, and private label packaging. B2B wholesale pricing available for care facilities, salons, and retailers.</span><span data-lang="de" style="display:none">Wir bieten individuelle Farben, Langen, Texturen und Private-Label-Verpackung. B2B-GroBhandelspreise fur Pflegeeinrichtungen, Salons und Einzelhandler.</span><span data-lang="fr" style="display:none">Nous proposons des couleurs, longueurs, textures personnalisees et emballage marque privee.</span><span data-lang="es" style="display:none">Ofrecemos colores, largos, texturas personalizadas y empaques con marca privada.</span><span data-lang="zh" style="display:none">我们提供颜色、长度、纹理定制，以及自有品牌包装。养老院、发廊、零售商B2B批发价格优惠。</span><span data-lang="ar" style="display:none">نقدم ألوان وأطوال وملمس مخصصين وتغليف ذات علامة تجارية خاصة</span><span data-lang="ja" style="display:none">カラー、丈、毛質カスタム、メディア包装定制対応。介護施設・美容院・零售商卸売価格あり。</span></p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="business.html#quote" class="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-green-800 transition">
        <span data-lang="en">Request B2B Quote</span><span data-lang="de" style="display:none">B2B-Angebot anfragen</span><span data-lang="fr" style="display:none">Demander un devis B2B</span><span data-lang="es" style="display:none">Solicitar cotizacion B2B</span><span data-lang="zh" style="display:none">获取B2B报价</span><span data-lang="ar" style="display:none">طلب عرض سعر B2B</span><span data-lang="ja" style="display:none">B2Bお見積りを依頼</span>
      </a>
      <a href="contact.html" class="inline-flex items-center justify-center gap-2 border border-primary text-primary font-semibold px-8 py-3.5 rounded-xl hover:bg-primary hover:text-white transition">
        <span data-lang="en">Contact Sales</span><span data-lang="de" style="display:none">Vertrieb kontaktieren</span><span data-lang="fr" style="display:none">Contacter les ventes</span><span data-lang="es" style="display:none">Contactar ventas</span><span data-lang="zh" style="display:none">联系销售</span><span data-lang="ar" style="display:none">التواصل مع المبيعات</span><span data-lang="ja" style="display:none">営業に問い合わせ</span>
      </a>
    </div>
  </div>

  </div>
</section>

'''

new_content = content[:start_idx] + new_grid + content[end_idx:]

with open('products-hair-toppers.html', 'w', encoding='utf-8-sig') as f:
    f.write(new_content)

print(f"Done. Old section: {end_idx - start_idx} chars, New section: {len(new_grid)} chars")
