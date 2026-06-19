#!/usr/bin/env python3
"""Fill DS-DIN-008 excel with info from _edit_summary.json + 8 images."""
import openpyxl
import json
from openpyxl.styles import Font

EXCEL = "/Users/kkkk/Library/Mobile Documents/com~apple~CloudDocs/Desktop/DSCARO.com/产品资料/01-Dining-Solutions/DS-DIN-008/DS-DIN-008_产品信息卡.xlsx"
JSON_FILE = "/Users/kkkk/Library/Mobile Documents/com~apple~CloudDocs/Desktop/DSCARO.com/产品资料/01-Dining-Solutions/DS-DIN-008/_edit_summary.json"

# row, col, value
FILLS = [
    (7, 2, "Clothing Protectors（餐饮防护）"),
    (8, 2, "Reusable Elderly Bedside Feeding Bib (可洗老人卧床喂饭围兜)"),
    (9, 2, "Health & Medical / Rehabilitation Therapy Supplies"),
    (13, 2, "https://dscaro.com/products/dining-solutions/elderly-bedside-feeding-bib-din-008"),
    (14, 2, "本文件夹内共 8 张图片（主图×5 + 详情×3），含已编辑英文版"),
    (16, 2, "可洗老人卧床喂饭围兜（毛巾布+PEVA）"),
    (17, 2, "Reusable Elderly Bedside Feeding Bib (Towel + PEVA)"),
    (18, 2, "毛巾布面吸水+PEVA 防水底，可水洗重复用，领口魔术贴易穿脱，50×60cm 大面积覆盖"),
    (19, 2, "Reusable bedside feeding bib: towel-fabric absorbent top + PEVA waterproof backing, hook & loop neck, 50×60cm coverage"),
    (21, 2, "50cm × 60cm"),
    (22, 2, "表层：毛巾布（Towel Fabric）—— 透气、吸水、亲肤 / 底层：PEVA 防水层 —— 防止渗透"),
    (23, 2, "约 80g/件"),
    (24, 2, "领口魔术贴（Hook & Loop）—— 撕即开，穿脱方便"),
    (25, 2, "无接食槽（平片式，靠防水底层承接）"),
    (26, 2, "可机洗/手洗，可反复多次使用；表层毛巾布吸水，底层 PEVA 防油污"),
    (27, 2, "表层毛巾布吸水（breathable & non-sticky）；底层 PEVA 防水（prevent penetration）"),
    (28, 2, "建议≤40°C 洗涤，避免高温熨烫/烘干"),
    (29, 2, "单件 OPP 袋（建议 50 件/箱 或 100 件/箱）"),
    (30, 2, "待确认（建议 8-10kg/100件）"),
    (32, 1, "DS-DIN-008-01（默认）"),
    (32, 2, "可洗老人围兜（毛巾布+PEVA）"),
    (32, 3, "主图_01.png"),
    (33, 1, "DS-DIN-008-02（备选）"),
    (33, 2, "可洗老人围兜（升级面料款）"),
    (33, 3, "详情_18.png"),
    (36, 2, "GBP £2.99-£3.99 (建议零售价)"),
    (41, 2, "T/T, L/C, Western Union, PayPal"),
    (42, 2, "7 天"),
    (43, 2, "15-25 天"),
    (45, 2, "Reusable Elderly Bedside Feeding Bib 50×60cm — Towel Fabric + PEVA Waterproof, Hook & Loop, Nursing Home / Hospital / Home Use"),
    (46, 2, "elderly bedside feeding bib"),
    (47, 2, "reusable elderly bib"),
    (48, 2, "towel fabric PEVA bib"),
    (49, 2, "nursing home feeding bib"),
    (50, 2, "postpartum post-op bib"),
    (51, 2, "待确认（建议挂 Health & Medical > Rehabilitation Therapy Supplies）"),
    (52, 2, "T/T, L/C, Western Union, PayPal"),
    (53, 2, "Dining Solutions / Elderly Care"),
    (54, 2, "15-25 Days"),
    (55, 2, "Piece / Unit"),
    (57, 2, "N/A（围兜非医疗器械，无需CE医疗器械认证）"),
    (58, 2, "待供应商提供 REACH 化学品合规声明（PEVA 材质需重点关注）"),
    (59, 2, "待确认（毛巾布+PEVA 可考虑申请 OEKO-TEX Standard 100 加分）"),
    (60, 2, "待补充（建议提供毛巾布成分报告 + PEVA 食品接触安全声明）"),
    (62, 1, "□ DS-DIN-008 定位：可洗老人卧床喂饭围兜（差异化卖点：毛巾布+PEVA 双层结构，卧床/坐姿喂饭通用，多人群适用）"),
    (63, 1, "□ 008 关键差异化：① 毛巾布+PEVA 双层 → 舒适+防水兼顾 ② 50×60cm 大覆盖 → 卧床/坐姿都好用 ③ 多人群适用 → 老人/产妇/术后通用 ④ 可机洗 → 长期成本低于一次性"),
    (64, 1, "□ 008 vs 005/006/007 对比：005 双面防水可洗（$1.98-2.65）vs 008 毛巾布+PEVA 可洗（$1.45-1.85，便宜 25%）vs 006/007 一次性；008 是性价比中端可洗款"),
    (65, 1, "□ 008 适用场景：卧床老人喂饭、产后护理、术后恢复、长期居家护理、养老院/医院普通餐饮"),
    (66, 1, "□ 008 包装：单件 OPP 袋 → 50件/箱 或 100件/箱；外箱唛头 DSCARO"),
    (67, 1, "□ 008 物流：FOB Yiwu/NingBo，单件 80g，60 件起订约 5kg"),
    (68, 1, "□ 008 供应商：义乌市万成日用品有限公司（3rd 供应商，不同于 002 兰溪其利 / 005 兰溪其利 / 006/007 金华宝舒）"),
    (69, 1, "□ 008 文件夹有 _edit_summary.json：用户已用 AI 工具翻译 8 张图（中→英），可直接用，无需再做 LaMa/PIL 处理"),
    (70, 1, "□ 008 图片格式：4 主图 png + 1 主图 jpg（主图_05）+ 3 详情 png，混合格式不影响 dscaro.com 渲染"),
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
