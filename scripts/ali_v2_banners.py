#!/usr/bin/env python3
"""
DS CARO 阿里国际站 - 4 张首页轮播 banner
1920×600 (横向) - 阿里首页主轮播
"""
from PIL import Image, ImageDraw, ImageFont
import os
import math

OUT_DIR = "/Users/kkkk/Library/Mobile Documents/com~apple~CloudDocs/Desktop/DSCARO.com/阿里国际站_店铺装修/assets"
PRIMARY = (201, 123, 90)
PRIMARY_DARK = (160, 92, 65)
BG = (245, 239, 230)
ACCENT = (91, 123, 90)
TEXT = (61, 61, 61)
WHITE = (255, 255, 255)
SOFT = (220, 207, 192)

FONT_CN = [
    "/System/Library/Fonts/Supplemental/Songti.ttc",
    "/System/Library/Fonts/PingFang.ttc",
    "/System/Library/Fonts/Hiragino Sans GB.ttc",
    "/System/Library/Fonts/STHeiti Medium.ttc",
]
FONT_EN = [
    "/System/Library/Fonts/Supplemental/Times New Roman.ttf",
    "/Library/Fonts/Times New Roman.ttf",
    "/System/Library/Fonts/Supplemental/Georgia.ttf",
    "/Library/Fonts/Georgia.ttf",
    "/System/Library/Fonts/Times.ttc",
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


def draw_warm_gradient(img, color1, color2, vertical=True):
    """暖色渐变背景"""
    W, H = img.size
    draw = ImageDraw.Draw(img)
    if vertical:
        for y in range(H):
            t = y / H
            r = int(color1[0] * (1 - t) + color2[0] * t)
            g = int(color1[1] * (1 - t) + color2[1] * t)
            b = int(color1[2] * (1 - t) + color2[2] * t)
            draw.line([(0, y), (W, y)], fill=(r, g, b))
    else:
        for x in range(W):
            t = x / W
            r = int(color1[0] * (1 - t) + color2[0] * t)
            g = int(color1[1] * (1 - t) + color2[1] * t)
            b = int(color1[2] * (1 - t) + color2[2] * t)
            draw.line([(x, 0), (x, H)], fill=(r, g, b))


def draw_soft_circles(img, color, count=8):
    """装饰用柔和圆点"""
    W, H = img.size
    draw = ImageDraw.Draw(img, "RGBA")
    import random
    random.seed(42)
    for i in range(count):
        cx = random.randint(0, W)
        cy = random.randint(0, H)
        r = random.randint(50, 200)
        alpha = random.randint(15, 40)
        rgba = color + (alpha,)
        draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=rgba)


def draw_warm_overlay(img):
    """右下角暖光晕"""
    W, H = img.size
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    # 暖光晕
    for r in range(600, 0, -50):
        alpha = int(40 * (r/600))
        od.ellipse([W-200-r, H-200-r, W-200+r, H-200+r], fill=(255, 220, 180, alpha))
    img.paste(overlay, (0, 0), overlay)


# ============ Banner 1: 主标语 ============
def banner_1():
    W, H = 1920, 600
    img = Image.new("RGB", (W, H), BG)
    draw_warm_gradient(img, (250, 240, 228), (235, 215, 195), vertical=True)
    draw_soft_circles(img, PRIMARY, count=12)
    draw = ImageDraw.Draw(img)

    # 左侧 text block
    f_brand = load_font(28, FONT_EN)
    draw.text((140, 130), "DS CARO", fill=PRIMARY_DARK, font=f_brand)
    f_brand_cn = load_font(22, FONT_CN)
    draw.text((140, 170), "Long-Term Care Supply", fill=SUBTLE if False else PRIMARY_DARK, font=f_brand_cn)

    # 主标题
    f_h1 = load_font(96, FONT_EN)
    draw.text((140, 240), "Dignity in Every Meal", fill=PRIMARY_DARK, font=f_h1)
    f_h1_cn = load_font(56, FONT_CN)
    draw.text((140, 360), "让每一餐都体面", fill=TEXT, font=f_h1_cn)
    f_sub = load_font(28, FONT_CN)
    draw.text((140, 450), "中老年护理餐饮解决方案 · Nursing Home · Dementia Care · Home Use", fill=TEXT, font=f_sub)

    # 右侧装饰：圆形大色块（陶土+鼠尾草绿）
    draw.ellipse([1500, 100, 1880, 480], fill=PRIMARY, outline=PRIMARY_DARK, width=3)
    draw.ellipse([1620, 200, 1800, 380], fill=ACCENT, outline=PRIMARY_DARK, width=2)
    f_c = load_font(64, FONT_EN)
    tw, th = text_size(draw, "DS", f_c)
    draw.text((1710 - tw/2, 290 - th/2), "DS", fill=WHITE, font=f_c)

    img.save(f"{OUT_DIR}/02_banner_1_main_主标语.png", "PNG", optimize=True)
    print("saved banner 1")


# ============ Banner 2: 产品线 ============
def banner_2():
    W, H = 1920, 600
    img = Image.new("RGB", (W, H), BG)
    draw_warm_gradient(img, (235, 230, 220), (210, 200, 185), vertical=False)
    draw_soft_circles(img, ACCENT, count=10)
    draw = ImageDraw.Draw(img)

    # 主标题
    f_h1 = load_font(86, FONT_EN)
    draw.text((140, 130), "Dining Solutions That Care", fill=PRIMARY_DARK, font=f_h1)
    f_h1_cn = load_font(50, FONT_CN)
    draw.text((140, 230), "全场景餐饮防护产品线", fill=TEXT, font=f_h1_cn)
    f_sub = load_font(26, FONT_CN)
    draw.text((140, 300), "Waterproof Bibs · Crumb Catchers · Clothing Protectors · Disposable & Reusable", fill=TEXT, font=f_sub)

    # 4 个产品分类卡片
    cards = [
        ("Adult Bibs", "成人围兜", PRIMARY),
        ("Crumb Catchers", "接食槽", ACCENT),
        ("Clothing Protectors", "衣物防护", PRIMARY_DARK),
        ("Dining Aprons", "餐饮围裙", (180, 130, 100)),
    ]
    card_w = 320
    card_h = 180
    card_y = 360
    start_x = 140
    for i, (en, cn, color) in enumerate(cards):
        x = start_x + i * (card_w + 30)
        draw.rounded_rectangle([x, card_y, x + card_w, card_y + card_h], radius=14, fill=WHITE, outline=color, width=3)
        # icon circle
        draw.ellipse([x+30, card_y+30, x+100, card_y+100], fill=color)
        f_en = load_font(28, FONT_EN)
        draw.text((x+120, card_y+30), en, fill=TEXT, font=f_en)
        f_cn = load_font(22, FONT_CN)
        draw.text((x+120, card_y+78), cn, fill=SUBTLE if False else PRIMARY_DARK, font=f_cn)
        f_under = load_font(20, FONT_CN)
        draw.text((x+30, card_y+135), "Learn More →", fill=color, font=f_under)

    img.save(f"{OUT_DIR}/03_banner_2_产品线.png", "PNG", optimize=True)
    print("saved banner 2")


# ============ Banner 3: 服务承诺 ============
def banner_3():
    W, H = 1920, 600
    img = Image.new("RGB", (W, H), BG)
    draw_warm_gradient(img, (245, 240, 225), (220, 200, 170), vertical=True)
    draw_soft_circles(img, PRIMARY, count=8)
    draw = ImageDraw.Draw(img)

    f_h1 = load_font(80, FONT_EN)
    draw.text((140, 130), "Care You Can Trust", fill=PRIMARY_DARK, font=f_h1)
    f_h1_cn = load_font(48, FONT_CN)
    draw.text((140, 230), "值得信赖的护理承诺", fill=TEXT, font=f_h1_cn)

    # 3 个承诺
    promises = [
        ("🏭", "OEM/ODM", "Logo · Color · Packaging\n尺寸·面料·配件 全定制"),
        ("📦", "Low MOQ", "60 pieces\n拼单降低门槛"),
        ("🚚", "Fast Delivery", "Sample 7 days\nBulk 15-25 days"),
    ]
    card_w = 480
    card_h = 220
    card_y = 330
    for i, (icon, en, desc) in enumerate(promises):
        x = 140 + i * (card_w + 30)
        draw.rounded_rectangle([x, card_y, x + card_w, card_y + card_h], radius=14, fill=WHITE, outline=PRIMARY_DARK, width=2)
        f_e = load_font(60, FONT_EN)
        draw.text((x+30, card_y+30), en, fill=PRIMARY_DARK, font=f_e)
        f_d = load_font(22, FONT_CN)
        for j, line in enumerate(desc.split('\n')):
            draw.text((x+30, card_y+120+j*30), line, fill=TEXT, font=f_d)

    img.save(f"{OUT_DIR}/04_banner_3_服务承诺.png", "PNG", optimize=True)
    print("saved banner 3")


# ============ Banner 4: 工厂实力 ============
def banner_4():
    W, H = 1920, 600
    img = Image.new("RGB", (W, H), BG)
    draw_warm_gradient(img, (220, 200, 175), (200, 175, 150), vertical=False)
    draw_soft_circles(img, (180, 130, 100), count=10)
    draw = ImageDraw.Draw(img)

    # 左侧大数字
    f_big = load_font(140, FONT_EN)
    draw.text((140, 100), "15+", fill=PRIMARY_DARK, font=f_big)
    f_year = load_font(40, FONT_EN)
    draw.text((140, 270), "Years Experience", fill=PRIMARY_DARK, font=f_year)
    f_cn = load_font(28, FONT_CN)
    draw.text((140, 330), "年专业护理用品制造经验", fill=TEXT, font=f_cn)

    # 右侧 stats
    stats = [
        ("5000+", "护理机构客户"),
        ("20+", "出口国家与地区"),
        ("100+", "产品线"),
        ("98%", "客户复购率"),
    ]
    sx = 700
    sy = 100
    for i, (num, label) in enumerate(stats):
        col = i % 2
        row = i // 2
        x = sx + col * 580
        y = sy + row * 220
        f_n = load_font(80, FONT_EN)
        draw.text((x, y), num, fill=PRIMARY_DARK, font=f_n)
        f_l = load_font(28, FONT_CN)
        draw.text((x, y + 100), label, fill=TEXT, font=f_l)

    img.save(f"{OUT_DIR}/05_banner_4_工厂实力.png", "PNG", optimize=True)
    print("saved banner 4")


# 修正：BANNER 1 的 SUBTLE 没定义
SUBTLE = (170, 160, 150)

banner_1()
banner_2()
banner_3()
banner_4()

print("done")
