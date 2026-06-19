#!/usr/bin/env python3
"""
DS CARO 阿里国际站 - 2 张内容图 (1000x1400 竖向)
- 公司介绍
- 服务承诺
"""
from PIL import Image, ImageDraw, ImageFont
import os

OUT_DIR = "/Users/kkkk/Library/Mobile Documents/com~apple~CloudDocs/Desktop/DSCARO.com/阿里国际站_店铺装修/assets"
PRIMARY = (201, 123, 90)
PRIMARY_DARK = (160, 92, 65)
BG = (245, 239, 230)
ACCENT = (91, 123, 90)
TEXT = (61, 61, 61)
WHITE = (255, 255, 255)
SUBTLE = (170, 160, 150)
SOFT = (220, 207, 192)

FONT_CN = [
    "/System/Library/Fonts/Supplemental/Songti.ttc",
    "/System/Library/Fonts/PingFang.ttc",
    "/System/Library/Fonts/Hiragino Sans GB.ttc",
]
FONT_EN = [
    "/System/Library/Fonts/Supplemental/Times New Roman.ttf",
    "/Library/Fonts/Times New Roman.ttf",
    "/System/Library/Fonts/Supplemental/Georgia.ttf",
    "/Library/Fonts/Georgia.ttf",
]


def load_font(size, candidates):
    for p in candidates:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()


def text_size(draw, text, font):
    try:
        bbox = draw.textbbox((0, 0), text, font=font)
        return bbox[2] - bbox[0], bbox[3] - bbox[1]
    except Exception:
        return draw.textsize(text, font=font)


# ============ 公司介绍图 ============
def company_intro():
    W, H = 1000, 1400
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    # 顶部色带
    draw.rectangle([0, 0, W, 240], fill=PRIMARY)
    # 圆形装饰
    draw.ellipse([W-200, -100, W+100, 200], fill=PRIMARY_DARK)
    draw.ellipse([W-280, 50, W-100, 230], fill=PRIMARY_DARK)
    # logo
    f_logo = load_font(60, FONT_EN)
    draw.text((80, 90), "DS CARO", fill=WHITE, font=f_logo)
    f_sub = load_font(24, FONT_CN)
    draw.text((80, 170), "中老年护理用品专家", fill=WHITE, font=f_sub)

    # 主体
    f_h1 = load_font(54, FONT_EN)
    draw.text((80, 290), "About Us", fill=PRIMARY_DARK, font=f_h1)
    f_h1cn = load_font(36, FONT_CN)
    draw.text((80, 360), "关于我们", fill=TEXT, font=f_h1cn)
    # 装饰线
    draw.rectangle([80, 410, 200, 414], fill=PRIMARY)

    # 公司简介
    f_body = load_font(24, FONT_CN)
    intro_lines = [
        "DS CARO 是一家专注于中老年护理用品的",
        "B2B 出口商，产品涵盖餐饮防护、衣物",
        "防护、个人清洁及失智症专项照护等场景。",
        "",
        "我们与浙江、广东多家 ISO 9001 认证工厂",
        "深度合作，配备 12 条生产线，30 天内可",
        "完成从样品确认到批量交付的全流程。",
        "",
        "我们的产品已出口至英国、欧盟、北美、",
        "澳洲及东南亚 20 多个国家与地区，服务",
        "超过 5000 家养老院、医院及护理机构。",
    ]
    y = 440
    for line in intro_lines:
        draw.text((80, y), line, fill=TEXT, font=f_body)
        y += 44

    # 数据条
    f_n = load_font(40, FONT_EN)
    f_l = load_font(20, FONT_CN)
    stats = [("15+", "年经验"), ("5000+", "客户"), ("20+", "国家"), ("7", "产品线")]
    sx, sy = 80, 1000
    sw, sh = 200, 130
    for i, (n, l) in enumerate(stats):
        x = sx + i * (sw + 10)
        draw.rounded_rectangle([x, sy, x+sw, sy+sh], radius=12, fill=WHITE, outline=PRIMARY_DARK, width=2)
        draw.text((x+20, sy+20), n, fill=PRIMARY_DARK, font=f_n)
        draw.text((x+20, sy+80), l, fill=TEXT, font=f_l)

    # 底部 slogan
    draw.rectangle([0, H-100, W, H], fill=PRIMARY_DARK)
    f_sl = load_font(28, FONT_EN)
    draw.text((80, H-65), "Dignity in Every Meal. Care in Every Detail.", fill=WHITE, font=f_sl)

    img.save(f"{OUT_DIR}/09_公司介绍.png", "PNG", optimize=True)
    print("saved company intro")


# ============ 服务承诺图 ============
def service_promise():
    W, H = 1000, 1400
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    # 顶部色带
    draw.rectangle([0, 0, W, 240], fill=ACCENT)
    # 装饰
    draw.ellipse([W-200, -100, W+100, 200], fill=(70, 95, 70))
    f_logo = load_font(60, FONT_EN)
    draw.text((80, 90), "Our Service", fill=WHITE, font=f_logo)
    f_sub = load_font(24, FONT_CN)
    draw.text((80, 170), "我们的服务承诺", fill=WHITE, font=f_sub)

    # 主体
    f_h1 = load_font(54, FONT_EN)
    draw.text((80, 290), "Why Choose Us", fill=PRIMARY_DARK, font=f_h1)
    f_h1cn = load_font(36, FONT_CN)
    draw.text((80, 360), "为什么选择 DS CARO", fill=TEXT, font=f_h1cn)
    draw.rectangle([80, 410, 200, 414], fill=PRIMARY)

    # 6 项服务承诺卡片
    services = [
        ("01", "OEM/ODM Customization", "全定制服务", "Logo · Color · Size · Material · Packaging 全部支持，30 天出样"),
        ("02", "Low MOQ & Tiered Pricing", "低 MOQ 阶梯价", "MOQ 60 件起步，60/500/1000 件阶梯折扣，新客户友好"),
        ("03", "Free Sample Service", "免费样品服务", "标品 7 天寄样，定制款 15 天内交付，全球快递"),
        ("04", "Quality Inspection", "第三方质检", "出厂前全检 + SGS / TUV / BV 第三方报告支持"),
        ("05", "Multi-Language Support", "多语言支持", "英语 / 西语 / 法语 / 德语 / 阿拉伯语销售对接"),
        ("06", "After-Sales Guarantee", "售后保障", "质量问题 100% 退换，运输破损全额赔付"),
    ]
    y = 450
    for num, en, cn, desc in services:
        # 卡片
        draw.rounded_rectangle([60, y, W-60, y+150], radius=12, fill=WHITE, outline=ACCENT, width=2)
        # 数字
        draw.rounded_rectangle([60, y, 160, y+150], radius=12, fill=ACCENT)
        f_n = load_font(48, FONT_EN)
        tw, th = text_size(draw, num, f_n)
        draw.text((110-tw/2, y+50), num, fill=WHITE, font=f_n)
        # 标题
        f_e = load_font(24, FONT_EN)
        draw.text((180, y+25), en, fill=PRIMARY_DARK, font=f_e)
        f_c = load_font(22, FONT_CN)
        draw.text((180, y+58), cn, fill=ACCENT, font=f_c)
        f_d = load_font(18, FONT_CN)
        draw.text((180, y+92), desc, fill=TEXT, font=f_d)
        y += 165

    # 底部
    draw.rectangle([0, H-100, W, H], fill=PRIMARY_DARK)
    f_sl = load_font(28, FONT_EN)
    draw.text((80, H-65), "Your Success Is Our Care.", fill=WHITE, font=f_sl)

    img.save(f"{OUT_DIR}/10_服务承诺.png", "PNG", optimize=True)
    print("saved service promise")


company_intro()
service_promise()
print("done")
