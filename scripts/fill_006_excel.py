#!/usr/bin/env python3
"""Fill DS-DIN-006 excel with extracted info from 6 images + 1688 link."""
import openpyxl
from openpyxl.styles import Font

EXCEL = "/Users/kkkk/Library/Mobile Documents/com~apple~CloudDocs/Desktop/DSCARO.com/产品资料/01-Dining-Solutions/DS-DIN-006/DS-DIN-006_产品信息卡.xlsx"

# row, col, value (col=2 is the [待填写] column)
FILLS = [
    (8, 2, "Disposable Tie-on Adult Bib (一次性系带式成人围兜)"),
    (13, 2, "https://dscaro.com/products/dining-solutions/disposable-tie-on-adult-bib-din-006"),
    (16, 2, "一次性系带式成人围兜（10片/袋）"),
    (17, 2, "Disposable Tie-on Adult Bib (10pcs/bag)"),
    (18, 2, "一次性使用，无纺布+PE膜防水，U形领口+系带设计，自带10cm接食槽，10片/袋独立塑封"),
    (19, 2, "Single-use disposable adult bib, non-woven + PE film waterproof, tie-on neck with built-in 10cm crumb catcher, retail-ready 10pcs/bag"),
    (21, 2, "57cm 长 × 37cm 宽（围兜深度 10cm）"),
    (22, 2, "无纺布（Non-woven）面 + PE 膜（Polyethylene Film）防水底"),
    (23, 2, "待确认（建议单片 ~15-20g，10 片/袋 ~150-200g）"),
    (24, 2, "系带式（Tie-on）—— 集成颈部系带，U 形领口"),
    (25, 2, "内置 10cm 深折起式接食槽（Built-in fold-up crumb catcher）"),
    (26, 2, "一次性使用，不可水洗；用后即弃"),
    (27, 2, "无纺布面吸水 + PE 膜底防水（双重防护）"),
    (28, 2, "常温干燥储存，避免高温暴晒；用后即弃"),
    (29, 2, "待确认（单袋 ~15×10×3cm 估算）"),
    (30, 2, "待确认（建议 20 袋/箱 或 50 袋/箱）"),
    (33, 2, "蓝色成人围兜(10片装) — 薄荷绿/浅蓝"),
    (50, 2, "GBP £1.50-£2.50 / 袋（10 片装，建议零售价）"),
    (59, 2, "Disposable Tie-on Adult Bib 57×37cm — Non-woven + PE Film, 10pcs/bag, Nursing Home Dining Care"),
    (60, 2, "disposable adult bib"),
    (61, 2, "tie-on bib"),
    (62, 2, "non-woven PE bib"),
    (63, 2, "nursing home disposable bib"),
    (64, 2, "10pcs/bag bib"),
    (65, 2, "待确认（建议挂 Health & Medical > Rehabilitation Therapy Supplies）"),
    (71, 2, "N/A（一次性卫生用品，非医疗器械）"),
    (72, 2, "待供应商提供 REACH 化学品合规声明"),
    (73, 2, "待确认（无纺布+PE 膜通常不申请 OEKO-TEX，可考虑）"),
    (74, 2, "待补充（建议提供无纺布成分报告 + PE 膜食品接触安全声明）"),
    (86, 1, "□ DS-DIN-006 定位：一次性实用款（差异化卖点：消除交叉感染风险，免洗护，适合高翻台养老院/医院/牙科诊所）"),
    (87, 1, "□ DS-DIN-007 定位：[待补充]"),
    (88, 1, "□ 006 关键差异化：① 一次性使用 → 零交叉感染 ② 10片独立塑封袋 → 零售可挂陈列 ③ PE 膜防水 → 衣物 100% 防护 ④ 系带式 → 通用尺寸无需选码"),
    (89, 1, "□ 006 颜色：薄荷绿/浅蓝（医疗感配色，缓解老人焦虑）"),
    (90, 1, "□ 006 包装：10片/袋（独立塑封 + 挂孔）→ 50袋/箱 或 100袋/箱；外箱唛头 DSCARO"),
    (91, 1, "□ 006 物流：FOB Yiwu/NingBo，单袋 ~150-200g，60 袋起订约 10-12kg"),
    (92, 1, "□ 006 适用场景：养老院、医院感染控制、牙科诊所、月子中心、居家卧床护理、临时护理站"),
    (93, 1, "□ 006 vs 005 对比：006 一次性免洗护 vs 005 可洗重复用；006 适合高翻台场景，005 适合长期居家护理"),
    (94, 1, "□ 006 vs 002/004 对比：002/004 为可洗围兜（棉/硅胶），006 为一次性无纺布；价格低 70%，定位完全不同"),
    (95, 1, "□ 注意：备注第 80 行写『与 DS-DIN-005 同供应商』是错的！005 供应商是兰溪市其利工贸，006 供应商是金华市宝舒——两家不同公司"),
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
