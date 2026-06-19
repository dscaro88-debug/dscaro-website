#!/usr/bin/env python3
"""Fill DS-DIN-009 excel — 5 SKU 变体 (R33-37), section 标题在 R38."""
import openpyxl
from openpyxl.styles import Font

EXCEL = "/Users/kkkk/Library/Mobile Documents/com~apple~CloudDocs/Desktop/DSCARO.com/产品资料/01-Dining-Solutions/DS-DIN-009/DS-DIN-009_产品信息卡.xlsx"

# 009 模板结构:
# R7 产品子类 / R8 产品细类 / R9 阿里分类 - 待填
# R13 官网产品页 - 待填
# R16-R19 产品名/简述 - 待填
# R21-R28 规格 - 待填
# R29 包装尺寸 / R30 毛重 - 待填
# R33-R37 已有 SKU 变体
# R39 已有 FOB / R42 MOQ / R43-45 阶梯 - 已填
# R41 B2C - 待填
# R47 样品交货 / R48 批量交货 - 待填
# R50-R56 阿里字段 - 待填
# R59 Lead Time - 待填
# R62-R65 合规 - 待填

FILLS = [
    (7, 2, "Clothing Protectors（餐饮防护）"),
    (8, 2, "Plaid Adult Bib with Removable Crumb Catcher Bowl (格子图案可拆接食碗围兜)"),
    (9, 2, "Health & Medical / Rehabilitation Therapy Supplies"),
    (13, 2, "https://dscaro.com/products/dining-solutions/plaid-adult-bib-with-bowl-din-009"),
    (14, 2, "本文件夹内共 10 张图片（主图×5 + SKU×5），已筛选英文版上传"),
    (16, 2, "格子图案可拆接食碗围兜（5 色可选）"),
    (17, 2, "Plaid Adult Bib with Removable Crumb Catcher Bowl"),
    (18, 2, "5 种格子图案（灰/咖啡/米/藏青/小号米色），可拆接食碗接食物残渣，可机洗重复用"),
    (19, 2, "Reusable plaid adult bib with detachable crumb-catcher bowl; 5 colorways; machine washable"),
    (21, 2, "标准码 M-L（具体尺寸建议实测）"),
    (22, 2, "表层：格子图案面料（plaid fabric）；底层：防水底衬（waterproof backing）"),
    (23, 2, "待确认（建议实测含碗）"),
    (24, 2, "领口魔术贴或纽扣（具体看 SKU 变体）"),
    (25, 2, "可拆接食碗（Detachable Crumb Catcher Bowl）—— 食物残渣、汤水、米粒"),
    (26, 2, "可机洗/手洗，可反复使用"),
    (27, 2, "表层吸水 + 底层防水"),
    (28, 2, "建议≤40°C 洗涤，避免高温熨烫"),
    (29, 2, "单件 OPP 袋（建议 30-50 件/箱）"),
    (30, 2, "待确认（建议 8-10kg/50件 含碗）"),
    (41, 2, "GBP £2.99-£3.99 (建议零售价)"),
    (47, 2, "7 天"),
    (48, 2, "15-25 天"),
    (50, 2, "Plaid Adult Bib with Removable Crumb Catcher Bowl — 5 Colorways, Reusable Waterproof Bib for Elderly / Dementia / Special-Needs Dining"),
    (51, 2, "plaid adult bib"),
    (52, 2, "bib with crumb catcher bowl"),
    (53, 2, "dementia bib"),
    (54, 2, "reusable elderly bib"),
    (55, 2, "colored nursing home bib"),
    (56, 2, "待确认（建议挂 Health & Medical > Rehabilitation Therapy Supplies）"),
    (59, 2, "15-25 Days"),
    (62, 2, "N/A（围兜非医疗器械）"),
    (63, 2, "待供应商提供 REACH 化学品合规声明"),
    (64, 2, "待确认（格子面料可考虑申请 OEKO-TEX Standard 100）"),
    (65, 2, "待补充（建议提供格子面料成分报告 + 防水底衬安全声明）"),
    (67, 1, "□ DS-DIN-009 定位：可拆接食碗围兜（差异化卖点：接食碗可拆，5 种格子可选，颜色可用于失智症色彩识别疗法）"),
    (68, 1, "□ 009 关键差异化：① 可拆接食碗 → 清洗方便 ② 5 种格子图案 → 失智症色彩识别疗法适用 ③ 小号 SKU_05 → 适用瘦小/儿童成人 ④ 同供应商 → 可与 008 拼单"),
    (69, 1, "□ 009 vs 008 对比：008 毛巾布+PEVA（$1.45-1.85，可洗）vs 009 格子+接食碗（$1.25-1.65，更便宜 15%）；009 多了可拆碗功能"),
    (70, 1, "□ 009 vs 005 对比：005 双面防水（$1.98-2.65）vs 009 格子+碗（$1.25-1.65，便宜 30%）；005 高端、009 实用+美观"),
    (71, 1, "□ 009 适用场景：失智症照护（色彩识别）、养老院（颜色分区管理）、居家护理、学校特教、餐饮护理"),
    (72, 1, "□ 009 包装：单件 OPP 袋 → 30件/箱 或 50件/箱；外箱唣头 DSCARO"),
    (73, 1, "□ 009 物流：FOB Yiwu，60 件起订；同供应商 008（义乌万成），可拼单降运费"),
    (74, 1, "□ 009 图片：文件夹有 5 主图 + 5 SKU 双语版（中文版+_en 英文版）；只上传 _en 英文版到 dscaro.com"),
    (75, 1, "□ 009 模板结构不同于之前 SKU：section『六、价格与起订量』在 R38（merged），R33-R37 是 5 个 SKU 变体行"),
]

GREEN = Font(color="008000")
wb = openpyxl.load_workbook(EXCEL)
ws = wb.active

ok = 0
for row, col, val in FILLS:
    cell = ws.cell(row=row, column=col)
    if hasattr(cell, '__class__') and cell.__class__.__name__ == 'MergedCell':
        print(f"  SKIP R{row}C{col} (merged)")
        continue
    cell.value = val
    cell.font = GREEN
    ok += 1

wb.save(EXCEL)
print(f"filled {ok} cells")
