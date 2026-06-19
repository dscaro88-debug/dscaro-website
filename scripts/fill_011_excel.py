#!/usr/bin/env python3
"""Fill DS-DIN-011 excel — 1 SKU 变体 (R32), R33 是 merged section 标题.
011 重要：只上传 _en 英文版图，不上传原始图片目录里的中文版。
"""
import openpyxl
from openpyxl.styles import Font

EXCEL = "/Users/kkkk/Library/Mobile Documents/com~apple~CloudDocs/Desktop/DSCARO.com/产品资料/01-Dining-Solutions/DS-DIN-011/DS-DIN-011_产品信息卡.xlsx"

# R32 是 SKU 变体行；R33 是 merged "六、价格" - 不要填
FILLS = [
    (8, 2, "Extra Thick Reversible Adult Dining Bib (加厚加大双面图案围兜)"),
    (9, 2, "Health & Medical / Rehabilitation Therapy Supplies"),
    (13, 2, "https://dscaro.com/products/dining-solutions/extra-thick-large-adult-bib-din-011"),
    (14, 2, "本文件夹内共 7 张 _en 英文版图（主图×5 + 详情×2）；原始图片目录 7 张中文版已跳过不传"),
    (16, 2, "加厚加大双面图案成人餐饮围兜"),
    (17, 2, "Extra Thick Large Adult Dining Bib (Reversible 2-Pattern)"),
    (18, 2, "加厚加大成人围兜，双面图案（V 形人字纹 + 灰菱形），按扣式，可折接食袋，可擦可洗"),
    (19, 2, "Extra thick & large adult bib, two reversible patterns (chevron + geometric diamond), snap-button closure, fold-up crumb catcher, wipeable & washable"),
    # R32 SKU 变体行 - 填默认值
    (32, 2, "默认款（V 形人字纹 + 灰菱形双面） | Default (Chevron + Geometric Diamond Reversible)"),
    (32, 3, "主图_01_en.jpg（V 形人字纹）/ 详情_01_en.jpeg（灰菱形）"),
    (21, 2, "加厚加大成人码（具体尺寸建议实测）"),
    (22, 2, "加厚防水面料（extra-thick waterproof fabric）—— 可擦可洗"),
    (23, 2, "待确认（建议实测）"),
    (24, 2, "按扣式（Snap Button）—— 颈部可调节"),
    (25, 2, "可折接食袋（fold-up crumb catcher）—— 底部按扣固定"),
    (26, 2, "可擦可洗（wipeable & washable）"),
    (27, 2, "防水（wipeable），面料不吸水"),
    (28, 2, "建议≤40°C 手洗，避免高温"),
    (29, 2, "单件 OPP 袋（建议 30-50 件/箱）"),
    (30, 2, "待确认"),
    (36, 2, "GBP £3.99-£4.99 (建议零售价)"),
    (41, 2, "T/T, L/C, Western Union, PayPal"),
    (42, 2, "7 天"),
    (43, 2, "15-25 天"),
    (45, 2, "Extra Thick Large Adult Dining Bib — Reversible Chevron + Geometric Diamond Patterns, Snap-Button, Fold-Up Crumb Catcher, Wipeable & Washable"),
    (46, 2, "extra thick adult bib"),
    (47, 2, "reversible elderly bib"),
    (48, 2, "large dining bib"),
    (49, 2, "snap button adult bib"),
    (50, 2, "high spill nursing home bib"),
    (51, 2, "待确认（建议挂 Health & Medical > Rehabilitation Therapy Supplies）"),
    (52, 2, "T/T, L/C, Western Union, PayPal"),
    (53, 2, "Dining Solutions / Elderly Care"),
    (54, 2, "15-25 Days"),
    (55, 2, "Piece / Unit"),
    (57, 2, "N/A（围兜非医疗器械）"),
    (58, 2, "待供应商提供 REACH 化学品合规声明"),
    (59, 2, "待确认（防水面料可考虑 OEKO-TEX）"),
    (60, 2, "待补充（建议面料成分报告）"),
    (62, 1, "□ DS-DIN-011 定位：加厚加大双面图案围兜（差异化卖点：加厚加大 + 双面图案 + 按扣可调 + 可擦可洗）"),
    (63, 1, "□ 011 关键差异化：① 加厚加大 → 高翻台场景 ② 双面图案（V 形+菱形）→ 一件两用 ③ 按扣式（比魔术贴耐用）④ 可擦可洗 → 维护成本低"),
    (64, 1, "□ 011 vs 010 对比：010 花卉+9 款（$1.48-1.78，便宜 25%）vs 011 加厚+2 款（$1.98-2.48）；010 多色，011 加厚；010 适合女性，011 通用"),
    (65, 1, "□ 011 vs 005 对比：005 双面防水（$1.98-2.65）vs 011 加厚（$1.98-2.48，便宜 7%）；005 三码，011 单码加大"),
    (66, 1, "□ 011 适用场景：养老院（高翻台喂饭）、失智症（高溅洒喂饭）、医院普通餐饮、居家卧床喂饭"),
    (67, 1, "□ 011 包装：单件 OPP 袋 → 30件/箱；外箱唣头 DSCARO"),
    (68, 1, "□ 011 供应商：义乌万成（第 4 次合作，与 008/009/010 同供应商）"),
    (69, 1, "□ 011 图片：根目录 7 张 _en 英文版（5 主图+2 详情）；原始图片目录 7 张中文版已跳过不传（按用户 06-19 指示）"),
    (70, 1, "□ 011 SKU 变体：仅 1 个默认款（R32）；产品本身是双面图案（V 形+菱形），不需要额外 SKU 变体"),
    (71, 1, "□ 011 链接：1688 offer 996598551713（和 010 新价链接一致；与原 spm 中提到的 904438303786 是同一供应商义乌万成的不同 listing）"),
]

GREEN = Font(color="008000")
wb = openpyxl.load_workbook(EXCEL)
ws = wb.active

ok = 0
for row, col, val in FILLS:
    cell = ws.cell(row=row, column=col)
    if hasattr(cell, '__class__') and cell.__class__.__name__ == 'MergedCell':
        print(f"SKIP R{row}C{col} (merged)")
        continue
    cell.value = val
    cell.font = GREEN
    ok += 1

wb.save(EXCEL)
print(f"filled {ok} cells (R33 已跳过)")
