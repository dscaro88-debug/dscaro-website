#!/usr/bin/env python3
"""Create a blank DS-DIN-004 product info card (xlsx) matching the
DS-DIN-001/002/003 template structure, with all the labels pre-filled
and values left blank for the user to complete."""
import zipfile
import os
import sys

# We can't use openpyxl (not in sandbox); build xlsx by hand.
# xlsx = zip of [Content_Types].xml, _rels/.rels, xl/workbook.xml,
#   xl/_rels/workbook.xml.rels, xl/worksheets/sheet1.xml, xl/sharedStrings.xml
# Strings inside <v> use shared string index.
# We will write inline string <is><t> for blanks so user sees them in Excel.

def col_letter(n):
    s = ""
    n += 1
    while n > 0:
        n, r = divmod(n - 1, 26)
        s = chr(65 + r) + s
    return s

def cell(ref, text, inline=True):
    if inline:
        # Inline string: <c r="ref" t="inlineStr"><is><t>text</t></is></c>
        text = (text or "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        return f'<c r="{ref}" t="inlineStr"><is><t xml:space="preserve">{text}</t></is></c>'
    return f'<c r="{ref}"><v>{text}</v></c>'

def row(r, label_c1, value_c2, note_c3=""):
    # Row with 3 columns: label, value, note
    parts = [f'<row r="{r}">']
    parts.append(cell(f"{col_letter(0)}{r}", label_c1))
    parts.append(cell(f"{col_letter(1)}{r}", value_c2))
    parts.append(cell(f"{col_letter(2)}{r}", note_c3))
    parts.append("</row>")
    return "".join(parts)

def section_row(r, label):
    # Section header row spans 3 cols; bold via inline string (no styling needed)
    return f'<row r="{r}">{cell(f"{col_letter(0)}{r}", label)}</row>'

def label_row(r, label):
    return f'<row r="{r}">{cell(f"{col_letter(0)}{r}", label)}</row>'

def build_sheet_xml():
    rows = []
    r = 1
    # Title
    rows.append(f'<row r="{r}">{cell(f"A{r}", "DS CARO  产品信息卡")}</row>')
    r += 1
    rows.append(f'<row r="{r}">{cell(f"A{r}", "SKU: DS-DIN-004  |  Dining Solutions  |  餐饮护理")}</row>')
    r += 1
    rows.append(f'<row r="{r}"></row>')
    r += 1

    # Section 1: Product Category
    rows.append(section_row(r, "一、产品分类 (Product Category)"))
    r += 1
    rows.append(label_row(r, "产品SKU"))
    rows[-1] = f'<row r="{r}">{cell(f"A{r}", "产品SKU")}{cell(f"B{r}", "DS-DIN-004")}{cell(f"C{r}", "唯一货号")}</row>'
    r += 1
    rows.append(label_row(r, "产品大类"))
    rows[-1] = f'<row r="{r}">{cell(f"A{r}", "产品大类")}{cell(f"B{r}", "Dining Solutions（餐饮护理）")}{cell(f"C{r}", "网站一级分类")}</row>'
    r += 1
    rows.append(label_row(r, "产品子类"))
    rows[-1] = f'<row r="{r}">{cell(f"A{r}", "产品子类")}{cell(f"B{r}", "Dining Protection（餐饮防护）")}{cell(f"C{r}", "网站二级分类")}</row>'
    r += 1
    rows.append(label_row(r, "产品细类"))
    rows[-1] = f'<row r="{r}">{cell(f"A{r}", "产品细类")}{cell(f"B{r}", "")}{cell(f"C{r}", "网站规划中的子产品名")}</row>'
    r += 1
    rows.append(label_row(r, "阿里国际站分类"))
    rows[-1] = f'<row r="{r}">{cell(f"A{r}", "阿里国际站分类")}{cell(f"B{r}", "Health & Medical / Rehabilitation Therapy Supplies")}{cell(f"C{r}", "需根据阿里后台确认")}</row>'
    r += 1
    rows.append(f'<row r="{r}"></row>')
    r += 1

    # Section 2: Product Source
    rows.append(section_row(r, "二、产品来源 (Product Source)"))
    r += 1
    rows.append(label_row(r, "供应商名称"))
    rows[-1] = f'<row r="{r}">{cell(f"A{r}", "供应商名称")}{cell(f"B{r}", "")}{cell(f"C{r}", "⚠ 待你填写")}</row>'
    r += 1
    rows.append(label_row(r, "供应商链接/来源链接"))
    rows[-1] = f'<row r="{r}">{cell(f"A{r}", "供应商链接/来源链接")}{cell(f"B{r}", "")}{cell(f"C{r}", "⚠ 待你填写")}</row>'
    r += 1
    rows.append(label_row(r, "官网产品页"))
    rows[-1] = f'<row r="{r}">{cell(f"A{r}", "官网产品页")}{cell(f"B{r}", "https://www.dscaro.com/products/dining-solutions")}{cell(f"C{r}", "DSCARO官网对应页面")}</row>'
    r += 1
    rows.append(label_row(r, "产品图片来源"))
    rows[-1] = f'<row r="{r}">{cell(f"A{r}", "产品图片来源")}{cell(f"B{r}", "本文件夹内共19张图片")}{cell(f"C{r}", "主图×4 + SKU变体×13 + 详情×2")}</row>'
    r += 1
    rows.append(f'<row r="{r}"></row>')
    r += 1

    # Section 3: Basic Info
    rows.append(section_row(r, "三、产品基本信息 (Basic Info)"))
    r += 1
    rows.append(label_row(r, "产品名称(中文)"))
    rows[-1] = f'<row r="{r}">{cell(f"A{r}", "产品名称(中文)")}{cell(f"B{r}", "")}{cell(f"C{r}", "")}</row>'
    r += 1
    rows.append(label_row(r, "产品名称(英文)"))
    rows[-1] = f'<row r="{r}">{cell(f"A{r}", "产品名称(英文)")}{cell(f"B{r}", "")}{cell(f"C{r}", "")}</row>'
    r += 1
    rows.append(label_row(r, "产品简述(中文)"))
    rows[-1] = f'<row r="{r}">{cell(f"A{r}", "产品简述(中文)")}{cell(f"B{r}", "")}{cell(f"C{r}", "一句话卖点")}</row>'
    r += 1
    rows.append(label_row(r, "产品简述(英文)"))
    rows[-1] = f'<row r="{r}">{cell(f"A{r}", "产品简述(英文)")}{cell(f"B{r}", "")}{cell(f"C{r}", "One-line description")}</row>'
    r += 1
    rows.append(f'<row r="{r}"></row>')
    r += 1

    # Section 4: Specs
    rows.append(section_row(r, "四、产品规格 (Specifications)"))
    r += 1
    for label, note in [
        ("产品尺寸", "长×宽"),
        ("材质(面料)", ""),
        ("单件重量", "Net weight per unit"),
        ("闭合方式", ""),
        ("接食槽设计", ""),
        ("洗涤方式", ""),
        ("吸水性", ""),
        ("耐温范围", "Care instructions"),
        ("包装尺寸", "外箱尺寸/装箱数"),
        ("毛重/箱", "Carton gross weight"),
    ]:
        rows.append(label_row(r, label))
        rows[-1] = f'<row r="{r}">{cell(f"A{r}", label)}{cell(f"B{r}", "")}{cell(f"C{r}", note)}</row>'
        r += 1
    rows.append(f'<row r="{r}"></row>')
    r += 1

    # Section 5: SKU Variants
    rows.append(section_row(r, "五、颜色/SKU变体 (Color Variants)"))
    r += 1
    rows.append(label_row(r, "变体SKU"))
    rows[-1] = f'<row r="{r}">{cell(f"A{r}", "变体SKU")}{cell(f"B{r}", "颜色/款式")}{cell(f"C{r}", "对应图片文件名")}</row>'
    r += 1
    variants = [
        ("DS-DIN-004-01", "蓝色（大号普通款）", "SKU_01_蓝色（大号普通款）.jpg"),
        ("DS-DIN-004-02", "灰色（大号普通款）", "SKU_03_灰色（大号普通款）.jpg"),
        ("DS-DIN-004-03", "黑色（大号普通款）", "SKU_04_黑色（大号普通款）.jpg"),
        ("DS-DIN-004-04", "紫色（大号普通款）", "SKU_05_紫色（大号普通款）.jpg"),
        ("DS-DIN-004-05", "绿色（大号普通款）", "SKU_06_绿色（大号普通款）.jpg"),
        ("DS-DIN-004-06", "粉色（超大号普通款）", "SKU_07_粉色（超大号普通款）.jpg"),
        ("DS-DIN-004-07", "灰色（超大号普通款）", "SKU_08_灰色（超大号普通款）.jpg"),
        ("DS-DIN-004-08", "粉色（大号丝印款）", "SKU_13_粉色（大号丝印款）.jpg"),
        ("DS-DIN-004-09", "灰色（大号丝印款）", "SKU_14_灰色（大号丝印款）.jpg"),
        ("DS-DIN-004-10", "紫色（大号丝印款）", "SKU_15_紫色大号丝印款）.jpg"),
        ("DS-DIN-004-11", "蓝色（大号丝印款）", "SKU_16_蓝色（大号丝印款）.jpg"),
        ("DS-DIN-004-12", "粉色（超大号丝印款）", "SKU_17_粉色（超大号丝印款）.jpg"),
        ("DS-DIN-004-13", "灰色（超大号丝印款）", "SKU_18_灰色（超大号丝印款）.jpg"),
        ("DS-DIN-004-14", "紫色（超大号丝印款）", "SKU_19_紫色（超大号丝印款）.jpg"),
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
        ("FOB价格", "参考阿里同类产品区间"),
        ("B2B价格", "实际采购成本"),
        ("B2C零售参考价(GBP)", "英国市场参考"),
        ("最低MOQ", "Minimum Order Quantity"),
        ("MOQ阶梯-60件", "批量折扣价"),
        ("MOQ阶梯-500件", "大客户价"),
        ("MOQ阶梯-1000件", "定制询盘价"),
    ]:
        rows.append(label_row(r, label))
        rows[-1] = f'<row r="{r}">{cell(f"A{r}", label)}{cell(f"B{r}", "")}{cell(f"C{r}", note)}</row>'
        r += 1
    for label, value in [
        ("付款方式", "T/T, L/C, Western Union, PayPal"),
        ("交货期(样品)", "7 天"),
        ("交货期(批量)", "15-25 天"),
    ]:
        rows.append(label_row(r, label))
        rows[-1] = f'<row r="{r}">{cell(f"A{r}", label)}{cell(f"B{r}", value)}</row>'
        r += 1
    rows.append(f'<row r="{r}"></row>')
    r += 1

    # Section 7: Alibaba Fields
    rows.append(section_row(r, "七、阿里国际站上传字段 (Alibaba Fields)"))
    r += 1
    for label, note in [
        ("Product Title", "≤128字符"),
        ("Keyword 1", ""),
        ("Keyword 2", ""),
        ("Keyword 3", ""),
        ("Keyword 4", ""),
        ("Keyword 5", ""),
        ("Category ID", "阿里后台对应分类ID"),
    ]:
        rows.append(label_row(r, label))
        rows[-1] = f'<row r="{r}">{cell(f"A{r}", label)}{cell(f"B{r}", "")}{cell(f"C{r}", note)}</row>'
        r += 1
    for label, value in [
        ("Payment Type", "T/T, L/C, Western Union, PayPal"),
        ("Product Type", "Dining Solutions / Elderly Care"),
        ("Lead Time", "15-25 Days"),
        ("Selling Unit", "Piece / Unit"),
    ]:
        rows.append(label_row(r, label))
        rows[-1] = f'<row r="{r}">{cell(f"A{r}", label)}{cell(f"B{r}", value)}</row>'
        r += 1
    rows.append(f'<row r="{r}"></row>')
    r += 1

    # Section 8: Compliance
    rows.append(section_row(r, "八、合规与认证 (Compliance)"))
    r += 1
    for label, note in [
        ("CE认证", "非医疗器械"),
        ("REACH合规", "欧盟化学品法规"),
        ("OEKO-TEX", "纺织品安全认证（加分项）"),
        ("面料测试报告", "成分测试报告增加信任度"),
    ]:
        rows.append(label_row(r, label))
        rows[-1] = f'<row r="{r}">{cell(f"A{r}", label)}{cell(f"B{r}", "待确认")}{cell(f"C{r}", note)}</row>'
        r += 1
    rows.append(f'<row r="{r}"></row>')
    r += 1

    # Section 9: Notes
    rows.append(section_row(r, "九、备注 (Notes)"))
    r += 1
    notes = [
        "□ 【待填写】= 需联系供应商或实测后补充",
        "□ 本文件夹内现有19张图片（主图×4 + 颜色SKU×13 + 详情×2）",
        "□ 上传阿里时建议用 主图_01.jpg 作为首图",
        "□ 颜色变体在阿里后台创建为不同SKU选项",
    ]
    for n in notes:
        rows.append(f'<row r="{r}">{cell(f"A{r}", n)}</row>')
        r += 1

    # Last dim
    max_col = "C"

    sheet_xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        f'<dimension ref="A1:{max_col}{r-1}"/>'
        '<sheetViews><sheetView workbookViewId="0"/></sheetViews>'
        '<sheetFormatPr defaultRowHeight="15"/>'
        '<cols><col min="1" max="1" width="32" customWidth="1"/><col min="2" max="2" width="50" customWidth="1"/><col min="3" max="3" width="32" customWidth="1"/></cols>'
        '<sheetData>'
        + "".join(rows) +
        '</sheetData>'
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
        print("usage: make_din004_xlsx.py <output_path>")
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
