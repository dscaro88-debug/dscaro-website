#!/usr/bin/env python3
"""Fix products-hair-wigs.html - remove broken Men's Hair Wigs Preview section"""

with open('products-hair-wigs.html', 'r') as f:
    content = f.read()

old = '''    <!-- ===== Men's Hair Wigs Preview ===== -->
    <div class="mb-16">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <span class="text-3xl">👨</span>
          <div>
            <!-- B2B CTA -->
    <div class="bg-white rounded-3xl border border-border p-8 md:p-12 text-center">
      <h2 class="font-serif text-2xl font-bold text-foreground mb-4">
        <span data-lang="en">Custom Hair Solutions for Your Business</span>'''

new = '''  </div>
</section>

<!-- CTA -->
<div class="mt-16 bg-white rounded-3xl border border-border p-8 md:p-12 text-center">
  <h2 class="font-serif text-2xl font-bold text-foreground mb-4">
    <span data-lang="en">Custom Hair Solutions for Your Business</span>'''

if old in content:
    content = content.replace(old, new)
    print("FIXED: products-hair-wigs.html - removed broken Men's Hair Wigs Preview")
else:
    print("WARNING: short pattern not found")
    idx = content.find("<!-- ===== Men's Hair Wigs Preview ===== -->")
    if idx >= 0:
        print(f"Found at {idx}: {repr(content[idx:idx+100])}")

with open('products-hair-wigs.html', 'w') as f:
    f.write(content)
