#!/usr/bin/env python3
"""Rebuild the products-hair-mens.html product section correctly"""

import re

# Read the backup file to get the correct product section
with open('backup_before_nav_fix/products-hair-mens.html', 'r') as f:
    backup = f.read()

# Extract the product section (lines 289-416)
lines = backup.split('\n')
product_section = '\n'.join(lines[288:416])  # 0-indexed, so 289-417

# Read current file
with open('products-hair-mens.html', 'r') as f:
    current = f.read()

# Find where the broken product section starts and ends
# The broken section starts at "<!-- Category Sections -->\n<section"
# and should end before "<!-- Footer -->"

# Find Category Sections in current file
cat_start = current.find('<!-- Category Sections -->')
footer_start = current.find('<!-- Footer -->')

if cat_start == -1 or footer_start == -1:
    print("ERROR: Could not find markers")
    exit(1)

# Replace the broken section with the correct one from backup
new_content = current[:cat_start] + product_section + '\n' + current[footer_start:]

# But first, let's verify the backup product section ends correctly
# The backup has the section structure broken too (ends with </section> inside)
# We need to check if the product section from backup has proper closing tags

# Actually, let me look at the backup structure more carefully
# backup line 289: <!-- Category Sections -->
# backup line 290: <section class="py-16 bg-white">
# backup line 291:   <div class="max-w-7xl mx-auto px-4">
# backup line 292:     <div class="space-y-16">
# backup line 293:       (empty)
# backup line 294-345: Men's Hair Wigs block
# backup line 346: (empty)
# backup line 347-396: Men's Wigs block
# backup line 397-399: closing </div></div>
# backup line 400: </section>
# backup line 401: (empty)
# backup line 402-414: CTA (outside section - WRONG structure!)
# backup line 415-416: closing tags

# The backup itself has the CTA inside the section but after </section> closes
# Wait no - looking again at lines 398-416:
# 398:     </div>  ← closes space-y-16
# 399:   </div>  ← closes max-w-7xl
# 400: </section> ← closes section
# 401: (empty)
# 402:     <!-- CTA -->  ← this is OUTSIDE section, indented wrong
# ...
# 415:     </div>  ← extra closing div
# 416: </section> ← extra closing section

# Actually the CTA in the backup is positioned weirdly (indented at 4 spaces but outside the section)
# Let me check: backup line 400: </section> then 402: <!-- CTA --> at 4 spaces = outside section
# But 415: </div> at 4 spaces and 416: </section> at 0 spaces - these would close nothing

# Actually I need to look at the raw content more carefully
# The product section spans from line 289 to 416 inclusive in the backup
# Let me check what's after line 416

# Lines 398-416:
# 398:     </div>     ← closes space-y-16 div
# 399:   </div>       ← closes max-w-7xl div  
# 400: </section>
# 401:
# 402:     <!-- CTA -->  ← at 4 spaces, but after </section> - this is WRONG indentation
# 403:     <div class="mt-16 bg-white rounded-3xl border border-border p-8 md:p-12 text-center">
# ...
# 415:     </div>
# 416: </section>

# So the CTA section spans lines 402-414, then there's a dangling </div> and </section>
# The correct structure should have:
# 1. Product section (lines 289-400 = through </section>)
# 2. CTA section (lines 402-414, but with correct indentation/outdentation)
# 3. Footer

# The simplest fix: keep lines 289-400 from backup, then add CTA from current file

# Get the product section (289-400) from backup (0-indexed: 288-400)
product_lines = '\n'.join(lines[288:400])  # 289-400 inclusive

# Now find CTA in current file (after Footer or inside?)
# Actually let's find it in the current broken file
cta_start_marker = '<!-- CTA -->'
cta_end_marker = '</section>'

cta_start = current.find(cta_start_marker)
# Find the second </section> after CTA
temp = current[cta_start:]
sections = [m.start() for m in re.finditer(r'</section>', temp)]
if len(sections) >= 1:
    cta_end = cta_start + sections[0] + len('</section>')

cta_section = current[cta_start:cta_end]

# Now construct new file
new_file = current[:cat_start] + product_lines + '\n\n' + cta_section + '\n\n' + current[footer_start:]

with open('products-hair-mens.html', 'w') as f:
    f.write(new_file)

print("REBUILT: products-hair-mens.html with correct product structure")
print(f"Product section from backup lines 289-400 ({len(product_lines.split(chr(10)))} lines)")
print(f"CTA section from current file ({len(cta_section.split(chr(10)))} lines)")
