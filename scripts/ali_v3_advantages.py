#!/usr/bin/env python3
"""
DS CARO 阿里国际站 - 3 张优势展示图 (1920×600)
- Factory Strength (工厂实力)
- OEM/ODM Capability (定制能力)
- Quality Assurance (品质保障)
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


def draw_bg(img, c1, c2, vertical=True):
    W, H = img.size
    draw = ImageDraw.Draw(img)
    if vertical:
        for y in range(H):
            t = y / H
            r = int(c1[0] * (1-t) + c2[0] * t)
            g = int(c1[1] * (1-t) + c2[1] * t)
            b = int(c1[2] * (1-t) + c2[2] * t)
            draw.line([(0, y), (W, y)], fill=(r, g, b))


def header_strip(draw, W, label, en_label, color):
    """顶部条带：左 标签 + EN 标签"""
    f_label = load_font(20, FONT_CN)
    draw.text((140, 50), label, fill=color, font=f_label)
    f_en = load_font(16, FONT_EN)
    draw.text((140, 80), en_label, fill=SUBTLE, font=f_en)
    # 装饰短线
    draw.rectangle([140, 110, 180, 113], fill=color)


# ============ 优势 1: 工厂实力 ============
def strength_factory():
    W, H = 1920, 600
    img = Image.new("RGB", (W, H), BG)
    draw_bg(img, (250, 240, 225), (230, 215, 195))
    draw = ImageDraw.Draw(img)

    header_strip(draw, W, "01 · 工厂实力", "FACTORY STRENGTH", PRIMARY_DARK)

    # 左侧 4 大数据
    stats = [
        ("15,000㎡", "Factory Area", "工厂面积"),
        ("12", "Production Lines", "生产线"),
        ("500+", "Skilled Workers", "熟练工人"),
        ("ISO 9001", "Quality Certified", "质量认证"),
    ]
    for i, (num, en, cn) in enumerate(stats):
        row = i // 2
        col = i % 2
        x = 140 + col * 320
        y = 200 + row * 180
        f_n = load_font(56, FONT_EN)
        draw.text((x, y), num, fill=PRIMARY_DARK, font=f_n)
        f_e = load_font(22, FONT_EN)
        draw.text((x, y + 80), en, fill=TEXT, font=f_e)
        f_c = load_font(20, FONT_CN)
        draw.text((x, y + 110), cn, fill=SUBTLE, font=f_c)

    # 右侧: 装饰工厂图（用色块模拟建筑）
    base_x = 1100
    base_y = 150
    # 工厂建筑
    draw.rectangle([base_x, base_y+200, base_x+300, base_y+400], fill=PRIMARY)
    draw.rectangle([base_x+300, base_y+150, base_x+650, base_y+400], fill=PRIMARY_DARK)
    draw.rectangle([base_x+650, base_y+250, base_x+750, base_y+400], fill=PRIMARY)
    # 屋顶
    draw.polygon([(base_x-20, base_y+200), (base_x+150, base_y+150), (base_x+320, base_y+200)], fill=PRIMARY_DARK)
    draw.polygon([(base_x+300, base_y+150), (base_x+475, base_y+100), (base_x+650, base_y+150)], fill=(130, 75, 55))
    # 烟囱
    draw.rectangle([base_x+550, base_y, base_x+580, base_y+150], fill=PRIMARY_DARK)
    # 窗户
    for i in range(4):
        for j in range(2):
            draw.rectangle([base_x+30+i*60, base_y+230+j*80, base_x+60+i*60, base_y+280+j*80], fill=BG)
    for i in range(5):
        for j in range(2):
            draw.rectangle([base_x+330+i*60, base_y+200+j*80, base_x+360+i*60, base_y+250+j*80], fill=BG)
    # 太阳
    draw.ellipse([base_x+700, base_y+10, base_x+760, base_y+70], fill=(255, 220, 150))

    img.save(f"{OUT_DIR}/06_优势1_工厂实力.png", "PNG", optimize=True)
    print("saved factory")


# ============ 优势 2: OEM/ODM 定制能力 ============
def strength_oem():
    W, H = 1920, 600
    img = Image.new("RGB", (W, H), BG)
    draw_bg(img, (240, 235, 220), (215, 220, 200))
    draw = ImageDraw.Draw(img)

    header_strip(draw, W, "02 · 定制能力", "OEM / ODM CAPABILITY", ACCENT)

    # 左侧文字
    f_h1 = load_font(60, FONT_EN)
    draw.text((140, 170), "Full Customization", fill=PRIMARY_DARK, font=f_h1)
    f_cn = load_font(34, FONT_CN)
    draw.text((140, 250), "全方位定制服务", fill=TEXT, font=f_cn)
    f_sub = load_font(22, FONT_CN)
    draw.text((140, 320), "From design to delivery — we tailor every detail to your market.", fill=SUBTLE, font=f_sub)

    # 6 个定制项
    customs = [
        ("Logo", "品牌 LOGO"),
        ("Color", "颜色定制"),
        ("Size", "尺寸规格"),
        ("Material", "面料材质"),
        ("Packaging", "包装方案"),
        ("Insert Card", "说明书卡"),
    ]
    cw, ch = 260, 120
    sx, sy = 140, 400
    for i, (en, cn) in enumerate(customs):
        col = i % 3
        row = i // 3
        x = sx + col * (cw + 20)
        y = sy + row * (ch + 20)
        draw.rounded_rectangle([x, y, x+cw, y+ch], radius=12, fill=WHITE, outline=ACCENT, width=2)
        draw.ellipse([x+20, y+20, x+60, y+60], fill=ACCENT)
        f_e = load_font(22, FONT_EN)
        draw.text((x+80, y+25), en, fill=PRIMARY_DARK, font=f_e)
        f_c = load_font(20, FONT_CN)
        draw.text((x+80, y+60), cn, fill=TEXT, font=f_c)

    # 右侧示意：圆形 + LOGO 模拟
    cx, cy = 1500, 300
    draw.ellipse([cx-180, cy-180, cx+180, cy+180], fill=WHITE, outline=ACCENT, width=4)
    draw.ellipse([cx-130, cy-130, cx+130, cy+130], fill=ACCENT)
    f_ds = load_font(60, FONT_EN)
    draw.text((cx-75, cy-30), "DS", fill=WHITE, font=f_ds)
    f_caro = load_font(20, FONT_EN)
    draw.text((cx-40, cy+30), "CARO", fill=WHITE, font=f_caro)

    img.save(f"{OUT_DIR}/07_优势2_OEM定制.png", "PNG", optimize=True)
    print("saved oem")


# ============ 优势 3: 品质保障 ============
def strength_quality():
    W, H = 1920, 600
    img = Image.new("RGB", (W, H), BG)
    draw_bg(img, (245, 240, 225), (235, 225, 200))
    draw = ImageDraw.Draw(img)

    header_strip(draw, W, "03 · 品质保障", "QUALITY ASSURANCE", PRIMARY)

    # 左侧大标题
    f_h1 = load_font(70, FONT_EN)
    draw.text((140, 170), "Tested. Trusted.", fill=PRIMARY_DARK, font=f_h1)
    f_h1_2 = load_font(70, FONT_EN)
    draw.text((140, 260), "Care Delivered.", fill=PRIMARY_DARK, font=f_h1_2)
    f_cn = load_font(34, FONT_CN)
    draw.text((140, 360), "检测合规 · 临床安心 · 长期信赖", fill=TEXT, font=f_cn)

    # 5 个证书 badge
    badges = [
        ("ISO 9001", "质量管理体系"),
        ("CE", "欧洲合格认证"),
        ("REACH", "化学品合规"),
        ("OEKO-TEX", "纺织品安全"),
        ("FDA", "食品接触级"),
    ]
    bw, bh = 200, 200
    for i, (en, cn) in enumerate(badges):
        x = 140 + i * (bw + 20)
        y = 430
        # shield shape
        draw.polygon([
            (x+30, y), (x+bw-30, y),
            (x+bw-10, y+80), (x+bw/2, y+bh),
            (x+10, y+80)
        ], fill=PRIMARY, outline=PRIMARY_DARK, width=2)
        f_e = load_font(28, FONT_EN)
        tw, th = text_size(draw, en, f_e)
        draw.text((x+bw/2-tw/2, y+50-th/2), en, fill=WHITE, font=f_e)
        f_c = load_font(16, FONT_CN)
        tw, th = text_size(draw, cn, f_c)
        draw.text((x+bw/2-tw/2, y+100), cn, fill=WHITE, font=f_c)
        f_p = load_font(14, FONT_CN)
        draw.text((x+30, y+bh+10), "✓ Tested", fill=ACCENT, font=f_p)

    img.save(f"{OUT_DIR}/08_优势3_品质保障.png", "PNG", optimize=True)
    print("saved quality")


strength_factory()
strength_oem()
strength_quality()

print("done")
