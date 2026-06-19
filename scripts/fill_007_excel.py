#!/usr/bin/env python3
"""Fill DS-DIN-007 excel with extracted info from 5 images + 1688 link."""
import openpyxl
from openpyxl.styles import Font

EXCEL = "/Users/kkkk/Library/Mobile Documents/com~apple~CloudDocs/Desktop/DSCARO.com/产品资料/01-Dining-Solutions/DS-DIN-007/DS-DIN-007_产品信息卡.xlsx"

# row, col, value
FILLS = [
    (8, 2, "Disposable Elderly Bib (一次性老人围兜 — 白色系带款)"),
    (9, 2, "Health & Medical / Rehabilitation Therapy Supplies"),
    (14, 2, "https://dscaro.com/products/dining-solutions/disposable-elderly-bib-din-007"),
    (18, 2, "一次性老人围兜（白色系带款，10片/袋）"),
    (19, 2, "Disposable Elderly Bib (Tie-on Style, 10pcs/bag, White)"),
    (20, 2, "白色一次性使用，无纺布+PE膜防水，系带式，自带10cm接食槽，10片/袋，性价比款"),
    (21, 2, "Single-use white disposable elderly bib, non-woven + PE film, tie-on, 10pcs/bag, economy option"),
    (24, 2, "57cm 长 × 37cm 宽（围兜深度 10cm）"),
    (25, 2, "无纺布（Non-woven）面 + PE 膜（Polyethylene Film）防水底"),
    (26, 2, "待确认（建议单片 ~15-20g，10 片/袋 ~150-200g）"),
    (27, 2, "系带式（Tie-on Style）—— 集成颈部系带，U 形领口"),
    (28, 2, "内置 10cm 深折起式接食槽（Built-in fold-up crumb catcher）"),
    (29, 2, "一次性使用，不可水洗；用后即弃"),
    (30, 2, "无纺布面吸水 + PE 膜底防水（双重防护）"),
    (31, 2, "常温干燥储存，避免高温暴晒；用后即弃"),
    (32, 2, "待确认（单袋 ~15×10×3cm 估算）"),
    (33, 2, "待确认（建议 50 袋/箱 或 100 袋/箱）"),
    (37, 2, "白色 Tie-on 款 — 老人尺寸"),
    (38, 2, "白色 Over-head 款 — 通用尺寸（待确认）"),
    (39, 2, "白色 Apron 款 — 通用尺寸（待确认）"),
    (40, 2, "白色 系带细节图（缝线/PE 膜）"),
    (41, 2, "白色 独立塑封展示（单片装示意）"),
    (46, 2, "GBP £1.20-£1.80 / 袋（10 片装，建议零售价）"),
    (52, 2, "7 天"),
    (53, 2, "15-25 天"),
    (56, 2, "Disposable Elderly Bib 57×37cm White — Non-woven + PE Film, Tie-on, 10pcs/bag, Nursing Home Infection Control"),
    (57, 2, "disposable elderly bib"),
    (58, 2, "tie-on white bib"),
    (59, 2, "non-woven PE bib"),
    (60, 2, "nursing home disposable bib"),
    (61, 2, "10pcs/bag white bib"),
    (62, 2, "待确认（建议挂 Health & Medical > Rehabilitation Therapy Supplies）"),
    (65, 2, "15-25 Days"),
    (70, 2, "N/A（一次性卫生用品，非医疗器械）"),
    (71, 2, "待供应商提供 REACH 化学品合规声明"),
    (72, 2, "待确认（无纺布+PE 膜通常不申请 OEKO-TEX，可考虑）"),
    (73, 2, "待补充（建议提供无纺布成分报告 + PE 膜食品接触安全声明）"),
    (75, 1, "□ DS-DIN-007 定位：白色一次性经济款（差异化卖点：比 006 蓝款便宜 17%，白色医疗感更强，适合高翻台+医院场景）"),
    (76, 1, "□ DS-DIN-007 备注：Excel 模板顶部带『# 』前缀（与 005/006 模板不同）"),
    (77, 1, "□ 007 关键差异化：① 白色 → 医疗感更强（医院/牙科偏好）② 比 006 便宜 17% → 成本敏感大客户首选 ③ 同供应商 → 可与 006 拼单"),
    (78, 1, "□ 007 颜色：白色（医疗感配色，区分 006 蓝色）"),
    (79, 1, "□ 007 包装：10片/袋（同 006）→ 50袋/箱 或 100袋/箱；外箱唛头 DSCARO"),
    (80, 1, "□ 007 物流：FOB Yiwu/NingBo，单袋 ~150-200g，100 袋起订约 15-20kg"),
    (81, 1, "□ 007 适用场景：医院、养老院、牙科诊所、月子中心、急诊、临时护理站（白色更临床）"),
    (82, 1, "□ 007 vs 006 对比：006 蓝款（$0.85-1.00，MOQ 60）vs 007 白款（$0.68-0.88，MOQ 100）；006 适合中小客户，007 适合大批量医院/连锁机构"),
    (83, 1, "□ 007 vs 005 对比：007 一次性免洗护 vs 005 可洗重复用；007 适合医院/牙科，005 适合居家长期护理"),
    (84, 1, "□ 007 备注 R79 写『绑带式+套头式两种款式』，但主图_01 2 显示是 Tie-on Style（系带式）；套头式款式在剩余主图中体现，5 个 SKU 变体可能对应 2 种款式+细节图"),
    (85, 1, "□ 007 供应商链接 ID 976841144348 与 006 链接 ID 839893245327 不同 → 1688 上是两个独立产品页面（不是同一商品）"),
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
