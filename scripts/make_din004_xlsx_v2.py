#!/usr/bin/env python3
"""
Create the DS-DIN-004 product info card xlsx, following the 002 template
structure. Pre-fills the fields that can be objectively sourced from
the product images / public 1688 page (name, sizes, material, color
variants, closure, design), and leaves fields that depend on the
supplier's price quote blank.
"""
import zipfile
import sys


def cell(ref, text, inline=True):
    if inline:
        text = (text or "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        return f'<c r="{ref}" t="inlineStr"><is><t xml:space="preserve">{text}</t></is></c>'
    return f'<c r="{ref}"><v>{text}</v></c>'


def label_row(r, label, value="", note=""):
    return (
        f'<row r="{r}">'
        + cell(f"A{r}", label)
        + cell(f"B{r}", value)
        + cell(f"C{r}", note)
        + "</row>"
    )


def section_row(r, label):
    return f'<row r="{r}">{cell(f"A{r}", label)}</row>'


def build_sheet_xml():
    rows = []
    r = 1
    rows.append(f'<row r="{r}">{cell(f"A{r}", "DS CARO  产品信息卡")}</row>')
    r += 1
    rows.append(f'<row r="{r}">{cell(f"A{r}", "SKU: DS-DIN-004  |  Dining Solutions  |  餐饮护理")}</row>')
    r += 1
    rows.append(f'<row r="{r}"></row>')
    r += 1

    # Section 1: Product Category
    rows.append(section_row(r, "一、产品分类 (Product Category)"))
    r += 1
    rows.append(label_row(r, "产品SKU", "DS-DIN-004", "唯一货号"))
    r += 1
    rows.append(label_row(r, "产品大类", "Dining Solutions（餐饮护理）", "网站一级分类"))
    r += 1
    rows.append(label_row(r, "产品子类", "Dining Protection（餐饮防护）", "网站二级分类"))
    r += 1
    rows.append(label_row(r, "产品细类", "Silicone Adult Bib / 成人硅胶围兜", "网站规划中的子产品名"))
    r += 1
    rows.append(label_row(r, "阿里国际站分类", "Health & Medical / Rehabilitation Therapy Supplies", "需根据阿里后台确认"))
    r += 1
    rows.append(f'<row r="{r}"></row>')
    r += 1

    # Section 2: Product Source
    rows.append(section_row(r, "二、产品来源 (Product Source)"))
    r += 1
    rows.append(label_row(r, "供应商名称", "", "⚠ 待你填写"))
    r += 1
    rows.append(label_row(r, "供应商链接/来源链接", "", "⚠ 待你填写"))
    r += 1
    rows.append(label_row(r, "官网产品页", "https://www.dscaro.com/products/dining-solutions", "DSCARO官网对应页面"))
    r += 1
    rows.append(label_row(r, "产品图片来源", "本文件夹内共14张图片", "主图×4 + SKU变体×3 + 详情×7"))
    r += 1
    rows.append(f'<row r="{r}"></row>')
    r += 1

    # Section 3: Basic Info
    rows.append(section_row(r, "三、产品基本信息 (Basic Info)"))
    r += 1
    rows.append(label_row(r, "产品名称(中文)", "成人硅胶围兜（防水）", ""))
    r += 1
    rows.append(label_row(r, "产品名称(英文)", "Adult Silicone Waterproof Bib", ""))
    r += 1
    rows.append(label_row(r, "产品简述(中文)",
        "食品级硅胶防水围兜，3D 防漏集渣槽，可调节纽扣闭合，耐温 200°C，机洗 100+ 次。适用于养老院、护理机构、餐饮护理场景。",
        "一句话卖点"))
    r += 1
    rows.append(label_row(r, "产品简述(英文)",
        "Food-grade silicone waterproof bib with 3D leak-proof crumb catcher, adjustable snap closure, 200°C heat resistant, machine washable 100+ cycles. Ideal for nursing homes, care facilities, and dining care.",
        "One-line description"))
    r += 1
    rows.append(f'<row r="{r}"></row>')
    r += 1

    # Section 4: Specs
    rows.append(section_row(r, "四、产品规格 (Specifications)"))
    r += 1
    rows.append(label_row(r, "产品尺寸", "大号: 45×29cm / 特大号: 52×35.5cm", "长×宽 (从详情图读取)"))
    r += 1
    rows.append(label_row(r, "材质(面料)", "食品级硅胶 (Food-Grade Silicone) + PU 防水涂层", ""))
    r += 1
    rows.append(label_row(r, "单件重量", "大号: ~117g / 特大号: ~181g", "从详情图读取"))
    r += 1
    rows.append(label_row(r, "闭合方式", "4 孔可调节纽扣闭合 (Adjustable Snap Closure)", ""))
    r += 1
    rows.append(label_row(r, "接食槽设计", "底部 3D 集渣袋 (Crumb Catcher Pocket)", "大号 7.5cm / 特大号 9cm 深"))
    r += 1
    rows.append(label_row(r, "洗涤方式", "机洗，可水洗 100+ 次 / Machine washable 100+ cycles", ""))
    r += 1
    rows.append(label_row(r, "吸水性", "防水防污 (Waterproof & Stain-Resistant)", "硅胶不吸水"))
    r += 1
    rows.append(label_row(r, "耐温范围", "≤200°C，可沸水/蒸汽消毒", "Care instructions"))
    r += 1
    rows.append(label_row(r, "包装尺寸", "", "外箱尺寸/装箱数 ⚠ 待供应商"))
    r += 1
    rows.append(label_row(r, "毛重/箱", "", "Carton gross weight ⚠ 待供应商"))
    r += 1
    rows.append(f'<row r="{r}"></row>')
    r += 1

    # Section 5: SKU Variants (pre-filled from filenames)
    rows.append(section_row(r, "五、颜色/SKU变体 (Color Variants)"))
    r += 1
    rows.append(f'<row r="{r}">{cell(f"A{r}", "变体SKU")}{cell(f"B{r}", "颜色/款式")}{cell(f"C{r}", "对应图片文件名")}</row>')
    r += 1
    variants = [
        ("DS-DIN-004-01", "静谧蓝 (Tranquil Blue)", "SKU_01_静谧蓝.jpg"),
        ("DS-DIN-004-02", "香槟粉 (Champagne Pink)", "SKU_02_香槟粉.jpg"),
        ("DS-DIN-004-03", "迷洁灰 (Misty Grey)", "SKU_03_迷洁灰.jpg"),
    ]
    for sku, color, fname in variants:
        rows.append(f'<row r="{r}">{cell(f"A{r}", sku)}{cell(f"B{r}", color)}{cell(f"C{r}", fname)}</row>')
        r += 1
    rows.append(f'<row r="{r}"></row>')
    r += 1

    # Section 6: Pricing
    rows.append(section_row(r, "六、价格与起订量 (Pricing & MOQ)"))
    r += 1
    for label, note in [
        ("FOB价格", "参考阿里同类产品区间 ⚠ 待供应商报价"),
        ("B2B价格", "实际采购成本 ⚠ 待供应商报价"),
        ("B2C零售参考价(GBP)", "英国市场参考"),
        ("最低MOQ", "Minimum Order Quantity ⚠ 待供应商"),
        ("MOQ阶梯-60件", "批量折扣价 ⚠ 待供应商"),
        ("MOQ阶梯-500件", "大客户价 ⚠ 待供应商"),
        ("MOQ阶梯-1000件", "定制询盘价 ⚠ 待供应商"),
    ]:
        rows.append(label_row(r, label, "", note))
        r += 1
    for label, value in [
        ("付款方式", "T/T, L/C, Western Union, PayPal"),
        ("交货期(样品)", "7 天"),
        ("交货期(批量)", "15-25 天"),
    ]:
        rows.append(label_row(r, label, value))
        r += 1
    rows.append(f'<row r="{r}"></row>')
    r += 1

    # Section 7: Alibaba Fields
    rows.append(section_row(r, "七、阿里国际站上传字段 (Alibaba Fields)"))
    r += 1
    rows.append(label_row(r, "Product Title",
        "DS CARO Adult Silicone Bib Waterproof Leak-Proof Elderly Dining Care Crumb Catcher Machine Washable Nursing Home Supplies",
        "≤128字符"))
    r += 1
    rows.append(label_row(r, "Keyword 1", "Silicone Adult Bib Waterproof", ""))
    r += 1
    rows.append(label_row(r, "Keyword 2", "Crumb Catcher Bib Elderly", ""))
    r += 1
    rows.append(label_row(r, "Keyword 3", "Nursing Home Dining Supplies", ""))
    r += 1
    rows.append(label_row(r, "Keyword 4", "Washable Adult Bib Bulk", ""))
    r += 1
    rows.append(label_row(r, "Keyword 5", "Senior Care Feeding Aid", ""))
    r += 1
    rows.append(label_row(r, "Category ID", "", "阿里后台对应分类ID ⚠ 待确认"))
    r += 1
    for label, value in [
        ("Payment Type", "T/T, L/C, Western Union, PayPal"),
        ("Product Type", "Dining Solutions / Elderly Care"),
        ("Lead Time", "15-25 Days"),
        ("Selling Unit", "Piece / Unit"),
    ]:
        rows.append(label_row(r, label, value))
        r += 1
    rows.append(f'<row r="{r}"></row>')
    r += 1

    # Section 8: Compliance
    rows.append(section_row(r, "八、合规与认证 (Compliance)"))
    r += 1
    for label, note in [
        ("CE认证", "非医疗器械（食品级硅胶）"),
        ("REACH合规", "欧盟化学品法规"),
        ("OEKO-TEX", "纺织品安全认证（加分项）"),
        ("面料测试报告", "成分测试报告增加信任度"),
    ]:
        rows.append(label_row(r, label, "待确认", note))
        r += 1
    rows.append(f'<row r="{r}"></row>')
    r += 1

    # Section 9: Notes
    rows.append(section_row(r, "九、备注 (Notes)"))
    r += 1
    notes = [
        "□ 【待填写】= 需联系供应商或实测后补充",
        "□ 本文件夹现有14张图片（主图×4 + 颜色SKU×3 + 详情×7），已替换 Dilidala logo 为 DSCARO 并翻译中文为英文",
        "□ 上传阿里时建议用 主图_01.jpg 作为首图",
        "□ 颜色变体在阿里后台创建为不同SKU选项",
        "□ 供应商 / 价格 / 包装尺寸 等信息 ⚠ 待供应商确认",
        "□ 已填字段基于公开图片视觉信息和阿里平台最佳实践；具体以供应商确认为准",
    ]
    for n in notes:
        rows.append(f'<row r="{r}">{cell(f"A{r}", n)}</row>')
        r += 1

    sheet_xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        f'<dimension ref="A1:C{r-1}"/>'
        '<sheetViews><sheetView workbookViewId="0"/></sheetViews>'
        '<sheetFormatPr defaultRowHeight="15"/>'
        '<cols><col min="1" max="1" width="32" customWidth="1"/><col min="2" max="2" width="55" customWidth="1"/><col min="3" max="3" width="32" customWidth="1"/></cols>'
        '<sheetData>'
        + "".join(rows)
        + '</sheetData>'
        '</worksheet>'
    )
    return sheet_xml


def build_workbook_xml():
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        '<sheets><sheet name="产品信息卡" sheetId="1" r:id="rId1"/></sheets>'
        '</workbook>'
    )


def build_workbook_rels():
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>'
        '</Relationships>'
    )


def build_root_rels():
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>'
        '</Relationships>'
    )


def build_content_types():
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
        '<Default Extension="xml" ContentType="application/xml"/>'
        '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'
        '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
        '</Types>'
    )


def main():
    if len(sys.argv) != 2:
        print("usage: make_din004_xlsx_v2.py <output_path>")
        sys.exit(1)
    out = sys.argv[1]
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", build_content_types())
        z.writestr("_rels/.rels", build_root_rels())
        z.writestr("xl/workbook.xml", build_workbook_xml())
        z.writestr("xl/_rels/workbook.xml.rels", build_workbook_rels())
        z.writestr("xl/worksheets/sheet1.xml", build_sheet_xml())
    print(f"Wrote {out}")


if __name__ == "__main__":
    main()
