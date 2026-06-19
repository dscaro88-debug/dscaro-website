#!/usr/bin/env python3
"""Fill DS-DIN-005 excel with extracted info from 18 images + 1688 link."""
import openpyxl
from openpyxl.styles import Font

EXCEL = "/Users/kkkk/Library/Mobile Documents/com~apple~CloudDocs/Desktop/DSCARO.com/产品资料/01-Dining-Solutions/DS-DIN-005/DS-DIN-005_产品信息卡.xlsx"

# row, col, value (col=2 is the [待填写] column)
FILLS = [
    (8, 2, "Reversible Waterproof Dining Bib (双面防水餐饮围兜)"),
    (9, 2, "Health & Personal Care > Personal Care > Adult Bibs"),
    (13, 2, "https://dscaro.com/products/dining-solutions/reversible-waterproof-dining-bib-din-005"),
    (16, 2, "双面防水餐饮围兜"),
    (17, 2, "Reversible Waterproof Dining Bib"),
    (18, 2, "一面棉质吸水、一面TPU防水，可拆3D接食槽，三码可选M/L/XL，不含荧光剂"),
    (19, 2, "Two-sided bib: cotton absorbent front + TPU waterproof back; detachable 3D crumb catcher; fluorescent-free tested; 3 sizes M/L/XL"),
    (21, 2, "M 56cm × 36cm / L 64cm × 36cm / XL 72cm × 36cm（颈宽19cm，口袋长10cm）"),
    (22, 2, "前面：棉质吸水面（multi-layer leak-proof）; 后面：TPU防水膜（Eco TPU Film）"),
    (23, 2, "待确认（建议实测）"),
    (24, 2, "全长魔术贴（Full-Path Hook & Loop）—— 一体成型圆角，皮肤友好"),
    (25, 2, "可拆3D接食槽（Detachable 3D Crumb Catcher），长10cm，按扣固定"),
    (26, 2, "清水冲洗 + 湿布擦拭即可（防水面）；棉质面可手洗/机洗"),
    (27, 2, "前面棉质吸水（instant absorption）；后面TPU防水（waterproof / oil-resistant / stain-resistant）"),
    (28, 2, "建议≤40°C 洗涤（无具体上限，建议避免高温熨烫）"),
    (33, 2, "双排扣 米色底 大格 L码"),
    (34, 2, "双排扣 米色底 小格 L码"),
    (35, 2, "双排扣 米色底 小格 XL码"),
    (39, 2, "GBP £3.99-£5.99 (建议零售价)"),
    (48, 2, "Reversible Waterproof Adult Bib with Detachable 3D Crumb Catcher — Cotton Absorbent Front / TPU Waterproof Back — Nursing Home Dining"),
    (49, 2, "reversible adult bib"),
    (50, 2, "waterproof dining bib"),
    (51, 2, "elderly bib with crumb catcher"),
    (52, 2, "nursing home clothing protector"),
    (53, 2, "TPU bib elderly"),
    (54, 2, "待确认（建议挂 Health & Personal Care 子类）"),
    (60, 2, "N/A（围兜非医疗器械，无需CE医疗器械认证）"),
    (61, 2, "待供应商提供REACH测试报告"),
    (62, 2, "待确认（0荧光剂测试已有，可作为加分项）"),
    (63, 2, "已提供：荧光剂 0 mg/L 检测报告；棉质面料成分报告待补"),
    (74, 1, "□ DS-DIN-005 定位：双面防水实用款（差异化卖点：吸水面+防水面二合一，0荧光剂）"),
    (75, 1, "□ DS-DIN-002 定位：高端装饰款（参考），溢价 15-20%"),
    (76, 1, "□ DS-DIN-003 定位：失智症趣味款（参考），差异化养老院失智专区刚需"),
]

GREEN = Font(color="008000")
wb = openpyxl.load_workbook(EXCEL)
ws = wb.active

ok, skip = 0, 0
for row, col, val in FILLS:
    cell = ws.cell(row=row, column=col)
    if hasattr(cell, '__class__') and cell.__class__.__name__ == 'MergedCell':
        skip += 1
        continue
    cell.value = val
    cell.font = GREEN
    ok += 1

wb.save(EXCEL)
print(f"filled {ok} cells, skipped {skip} merged")
