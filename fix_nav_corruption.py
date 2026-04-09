#!/usr/bin/env python3
"""Fix navigation corruption in hair product pages"""

import os

# =============================================
# Fix 1: products-hair-mens.html
# =============================================
with open('products-hair-mens.html', 'r') as f:
    content = f.read()

# Find and remove duplicate nav items (lines 129-144)
old1 = '''        </div>
          </a>
          <a href="products-hair-toppers.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
            <span class="text-xl">👩</span>
            <div>
              <div class="text-sm font-medium group-hover:text-primary">Women's Hair Wigs</div>
              <div class="text-xs text-muted-foreground">Clip-in & Tape-in Extensions, Human Hair Toppers</div>
            </div>
          </a>
          <a href="products-hair-care.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
            <span class="text-xl">🧴</span>
            <div>
              <div class="text-sm font-medium group-hover:text-primary">Hair Care & Tools</div>
              <div class="text-xs text-muted-foreground">Hair Care & Accessories, Scalp Care & Comfort</div>
            </div>
          </a>
        </div>
      </div>'''

new1 = '''        </div>
      </div>'''

if old1 in content:
    content = content.replace(old1, new1)
    print("FIXED: products-hair-mens.html - removed duplicate nav items")
else:
    print("WARNING: pattern not found in products-hair-mens.html")
    # Debug: show lines around 129
    lines = content.split('\n')
    for i, line in enumerate(lines[125:145], 126):
        print(f"  {i}: {line[:100]}")

with open('products-hair-mens.html', 'w') as f:
    f.write(content)

# =============================================
# Fix 2: products-hair-toppers.html
# =============================================
with open('products-hair-toppers.html', 'r') as f:
    content = f.read()

old2 = ''' Care & Tools Dropdown -->
      <div class="nav-item relative">
        <a href="products.html" class="flex items-center gap-1 text-sm font-medium px-1 py-2 border-b-2 transition-colors border-transparent text-foreground hover:text-primary hover:border-primary">
          Silver Beauty Care & Tools
          <svg class="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </a>
        <div class="nav-dropdown bg-white border border-border rounded-xl shadow-xl w-80 mt-1 overflow-hidden">
          <div class="px-4 py-2 bg-muted border-b border-border">
            <a href="products.html" class="text-xs font-semibold text-primary hover:underline">View All Senior Care Products</a>
          </div>
          <a href="products-bathroom-safety.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
            <span class="text-xl">🚿</span>
            <div>
              <div class="text-sm font-medium group-hover:text-primary">Bathroom Safety</div>
              <div class="text-xs text-muted-foreground">Grab bars, shower seats & more</div>
            </div>
          </a>
          <a href="products-kitchen-dining.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
            <span class="text-xl">🍽️</span>
            <div>
              <div class="text-sm font-medium group-hover:text-primary">Kitchen & Dining</div>
              <div class="text-xs text-muted-foreground">Easy-grip utensils & accessible tableware</div>
            </div>
          </a>
          <a href="products-dressing-mobility.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
            <span class="text-xl">🚶</span>
            <div>
              <div class="text-sm font-medium group-hover:text-primary">Dressing & Mobility</div>
              <div class="text-xs text-muted-foreground">Walking sticks, reachers & dressing aids</div>
            </div>
          </a>
          <a href="products-bedroom-living.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
            <span class="text-xl">🛏️</span>
            <div>
              <div class="text-sm font-medium group-hover:text-primary">Bedroom & Living</div>
              <div class="text-xs text-muted-foreground">Bed rails, reading aids & comfort items</div>
            </div>
          </a>
          <a href="products-smart-care.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
            <span class="text-xl">📱</span>
            <div>
              <div class="text-sm font-medium group-hover:text-primary">Smart Care</div>
              <div class="text-xs text-muted-foreground">Medical alerts, pill dispensers & monitors</div>
            </div>
          </a>
          <a href="products-gifts-seniors.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
            <span class="text-xl">🎁</span>
            <div>
              <div class="text-sm font-medium group-hover:text-primary">Gifts for Seniors</div>
              <div class="text-xs text-muted-foreground">Thoughtful gifts for elderly loved ones</div>
            </div>
          </a>
        </div>
      </div>'''

new2 = '''      <!-- Silver Beauty Care &amp; Tools Dropdown -->
      <div class="nav-item relative">
        <a href="products.html" class="flex items-center gap-1 text-sm font-medium px-1 py-2 border-b-2 transition-colors border-transparent text-foreground hover:text-primary hover:border-primary">
          Silver Beauty Care &amp; Tools
          <svg class="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </a>
        <div class="nav-dropdown bg-white border border-border rounded-xl shadow-xl w-80 mt-1 overflow-hidden">
          <div class="px-4 py-2 bg-muted border-b border-border">
            <a href="products.html" class="text-xs font-semibold text-primary hover:underline">View All Senior Care Products</a>
          </div>
          <a href="products-bathroom-safety.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
            <span class="text-xl">🚿</span>
            <div>
              <div class="text-sm font-medium group-hover:text-primary">Bathroom Safety</div>
              <div class="text-xs text-muted-foreground">Grab bars, shower seats &amp; more</div>
            </div>
          </a>
          <a href="products-kitchen-dining.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
            <span class="text-xl">🍽️</span>
            <div>
              <div class="text-sm font-medium group-hover:text-primary">Kitchen &amp; Dining</div>
              <div class="text-xs text-muted-foreground">Easy-grip utensils &amp; accessible tableware</div>
            </div>
          </a>
          <a href="products-dressing-mobility.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
            <span class="text-xl">🚶</span>
            <div>
              <div class="text-sm font-medium group-hover:text-primary">Dressing &amp; Mobility</div>
              <div class="text-xs text-muted-foreground">Walking sticks, reachers &amp; dressing aids</div>
            </div>
          </a>
          <a href="products-bedroom-living.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
            <span class="text-xl">🛏️</span>
            <div>
              <div class="text-sm font-medium group-hover:text-primary">Bedroom &amp; Living</div>
              <div class="text-xs text-muted-foreground">Bed rails, reading aids &amp; comfort items</div>
            </div>
          </a>
          <a href="products-smart-care.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
            <span class="text-xl">📱</span>
            <div>
              <div class="text-sm font-medium group-hover:text-primary">Smart Care</div>
              <div class="text-xs text-muted-foreground">Medical alerts, pill dispensers &amp; monitors</div>
            </div>
          </a>
          <a href="products-gifts-seniors.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
            <span class="text-xl">🎁</span>
            <div>
              <div class="text-sm font-medium group-hover:text-primary">Gifts for Seniors</div>
              <div class="text-xs text-muted-foreground">Thoughtful gifts for elderly loved ones</div>
            </div>
          </a>
        </div>
      </div>'''

if old2 in content:
    content = content.replace(old2, new2)
    print("FIXED: products-hair-toppers.html - fixed broken nav")
else:
    print("WARNING: pattern not found in products-hair-toppers.html")
    # Debug: show lines around 133
    lines = content.split('\n')
    for i, line in enumerate(lines[130:145], 131):
        print(f"  {i}: {line[:100]}")

with open('products-hair-toppers.html', 'w') as f:
    f.write(content)

# =============================================
# Fix 3: products-hair-wigs.html
# =============================================
with open('products-hair-wigs.html', 'r') as f:
    content = f.read()

old3 = '''        </div>
      </div>

            <div><div class="text-sm font-medium group-hover:text-primary">Bathroom Safety</div><div class="text-xs text-muted-foreground">Grab bars, shower seats & more</div></div>
          </a>
          <a href="products-kitchen-dining.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
            <span class="text-xl">🍽️</span>
            <div><div class="text-sm font-medium group-hover:text-primary">Kitchen & Dining</div><div class="text-xs text-muted-foreground">Easy-grip utensils & accessible tableware</div></div>
          </a>
          <a href="products-dressing-mobility.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
            <span class="text-xl">🚶</span>
            <div><div class="text-sm font-medium group-hover:text-primary">Dressing & Mobility</div><div class="text-xs text-muted-foreground">Walking sticks, reachers & dressing aids</div></div>
          </a>
          <a href="products-bedroom-living.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
            <span class="text-xl">🛏️</span>
            <div><div class="text-sm font-medium group-hover:text-primary">Bedroom & Living</div><div class="text-xs text-muted-foreground">Bed rails, reading aids & comfort items</div></div>
          </a>
          <a href="products-smart-care.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
            <span class="text-xl">📱</span>
            <div><div class="text-sm font-medium group-hover:text-primary">Smart Care</div><div class="text-xs text-muted-foreground">Medical alerts, pill dispensers & monitors</div></div>
          </a>
          <a href="products-gifts-seniors.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
            <span class="text-xl">🎁</span>
            <div><div class="text-sm font-medium group-hover:text-primary">Gifts for Seniors</div><div class="text-xs text-muted-foreground">Thoughtful gifts for elderly loved ones</div></div>
          </a>
        </div>
      </div>'''

new3 = '''        </div>
      </div>

      <!-- Silver Beauty Care &amp; Tools Dropdown -->
      <div class="nav-item relative">
        <a href="products.html" class="flex items-center gap-1 text-sm font-medium px-1 py-2 border-b-2 transition-colors border-transparent text-foreground hover:text-primary hover:border-primary">
          Silver Beauty Care &amp; Tools
          <svg class="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </a>
        <div class="nav-dropdown bg-white border border-border rounded-xl shadow-xl w-80 mt-1 overflow-hidden">
          <div class="px-4 py-2 bg-muted border-b border-border">
            <a href="products.html" class="text-xs font-semibold text-primary hover:underline">View All Senior Care Products</a>
          </div>
          <a href="products-bathroom-safety.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
            <span class="text-xl">🚿</span>
            <div>
              <div class="text-sm font-medium group-hover:text-primary">Bathroom Safety</div>
              <div class="text-xs text-muted-foreground">Grab bars, shower seats &amp; more</div>
            </div>
          </a>
          <a href="products-kitchen-dining.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
            <span class="text-xl">🍽️</span>
            <div>
              <div class="text-sm font-medium group-hover:text-primary">Kitchen &amp; Dining</div>
              <div class="text-xs text-muted-foreground">Easy-grip utensils &amp; accessible tableware</div>
            </div>
          </a>
          <a href="products-dressing-mobility.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
            <span class="text-xl">🚶</span>
            <div>
              <div class="text-sm font-medium group-hover:text-primary">Dressing &amp; Mobility</div>
              <div class="text-xs text-muted-foreground">Walking sticks, reachers &amp; dressing aids</div>
            </div>
          </a>
          <a href="products-bedroom-living.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
            <span class="text-xl">🛏️</span>
            <div>
              <div class="text-sm font-medium group-hover:text-primary">Bedroom &amp; Living</div>
              <div class="text-xs text-muted-foreground">Bed rails, reading aids &amp; comfort items</div>
            </div>
          </a>
          <a href="products-smart-care.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
            <span class="text-xl">📱</span>
            <div>
              <div class="text-sm font-medium group-hover:text-primary">Smart Care</div>
              <div class="text-xs text-muted-foreground">Medical alerts, pill dispensers &amp; monitors</div>
            </div>
          </a>
          <a href="products-gifts-seniors.html" class="flex items-center gap-3 px-4 py-3 hover:bg-primary-light group">
            <span class="text-xl">🎁</span>
            <div>
              <div class="text-sm font-medium group-hover:text-primary">Gifts for Seniors</div>
              <div class="text-xs text-muted-foreground">Thoughtful gifts for elderly loved ones</div>
            </div>
          </a>
        </div>
      </div>'''

if old3 in content:
    content = content.replace(old3, new3)
    print("FIXED: products-hair-wigs.html - fixed broken nav")
else:
    print("WARNING: pattern not found in products-hair-wigs.html")
    # Debug: show lines around 113
    lines = content.split('\n')
    for i, line in enumerate(lines[110:145], 111):
        print(f"  {i}: {line[:100]}")

with open('products-hair-wigs.html', 'w') as f:
    f.write(content)

print("\nDone!")
