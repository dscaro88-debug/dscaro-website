#!/usr/bin/env python3
"""
DS CARO 阿里国际站 - VI 配色 + 字体指南
1 张 PNG (1600x2000) - 给设计师 / 装修操作员看的标准
"""
from PIL import Image, ImageDraw, ImageFont
import os

OUT = "/Users/kkkk/Library/Mobile Documents/com~apple~CloudDocs/Desktop/DSCARO.com/阿里国际站_店铺装修/assets/01_VI_配色字体指南.png"

# ============ 配色 ============
PRIMARY = (201, 123, 90)       # 暖陶土色
PRIMARY_DARK = (160, 92, 65)   # 深陶土
BG = (245, 239, 230)           # 米白
ACCENT = (91, 123, 90)         # 鼠尾草绿
TEXT = (61, 61, 61)            # 深棕黑
SUBTLE = (170, 160, 150)       # 浅米
WHITE = (255, 255, 255)

# ============ 字体 ============
FONT_CANDIDATES_ZH = [
    "/System/Library/Fonts/Supplemental/Songti.ttc",
    "/System/Library/Fonts/PingFang.ttc",
    "/System/Library/Fonts/STHeiti Medium.ttc",
    "/System/Library/Fonts/Hiragino Sans GB.ttc",
    "/System/Library/Fonts/Songti.ttc",
    "/System/Library/Fonts/Supplemental/Songti.ttc",
    "/Library/Fonts/Songti.ttc",
    "/System/Library/Fonts/SFNSDisplay.ttf",
]
FONT_CANDIDATES_EN = [
    "/System/Library/Fonts/Supplemental/Times New Roman.ttf",
    "/Library/Fonts/Times New Roman.ttf",
    "/System/Library/Fonts/Supplemental/Georgia.ttf",
    "/Library/Fonts/Georgia.ttf",
    "/System/Library/Fonts/Times.ttc",
    "/System/Library/Fonts/SFNSDisplay.ttf",
]
FONT_CANDIDATES_BOLD = [
    "/System/Library/Fonts/Supplemental/Songti.ttc",
    "/System/Library/Fonts/PingFang.ttc",
    "/System/Library/Fonts/Supplemental/Arial Black.ttf",
    "/Library/Fonts/Arial Bold.ttf",
    "/System/Library/Fonts/Hiragino Sans GB.ttc",
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


# ============ 画布 ============
W, H = 1600, 2000
img = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)

# 顶部 header band
draw.rectangle([0, 0, W, 220], fill=PRIMARY)
# 顶部 logo placeholder
draw.ellipse([80, 60, 220, 200], fill=WHITE, outline=PRIMARY_DARK, width=4)
font_logo = load_font(56, FONT_CANDIDATES_BOLD)
draw.text((260, 90), "DS CARO", fill=WHITE, font=font_logo)
font_sub = load_font(28, FONT_CANDIDATES_ZH)
draw.text((260, 165), "Long-Term Care Supply · 中老年护理用品专家", fill=WHITE, font=font_sub)

# 大标题
y = 280
font_h1 = load_font(72, FONT_CANDIDATES_BOLD)
draw.text((80, y), "Brand Visual Identity Guide", fill=TEXT, font=font_h1)
font_h1cn = load_font(44, FONT_CANDIDATES_ZH)
draw.text((80, y + 100), "品牌视觉识别指南 / VI Standards", fill=SUBTLE, font=font_h1cn)

# ===== 配色 section =====
y = 480
draw.line([(80, y), (W-80, y)], fill=SUBTLE, width=2)
y += 30
font_h2 = load_font(48, FONT_CANDIDATES_BOLD)
draw.text((80, y), "01 · Color Palette / 配色方案", fill=PRIMARY_DARK, font=font_h2)
y += 90

colors = [
    ("Primary · 暖陶土", PRIMARY, "#C97B5A", "用于品牌标识、主按钮、强调元素"),
    ("Primary Dark · 深陶土", PRIMARY_DARK, "#A05C41", "用于 hover、深色文字、辅助强调"),
    ("Background · 米白", BG, "#F5EFE6", "整店背景、卡片底色"),
    ("Accent · 鼠尾草绿", ACCENT, "#5B7B5A", "用于健康/疗愈/品质强调"),
    ("Text · 深棕黑", TEXT, "#3D3D3D", "正文文字、低对比说明文字"),
    ("Subtle · 浅米", SUBTLE, "#AAA096", "分隔线、辅助文字、placeholder"),
]
swatch_w = 220
swatch_h = 220
gap = 30
for i, (name, rgb, hex_code, desc) in enumerate(colors):
    sx = 80 + i * (swatch_w + gap)
    sy = y
    # swatch with rounded corners
    draw.rounded_rectangle([sx, sy, sx + swatch_w, sy + swatch_h], radius=18, fill=rgb, outline=PRIMARY_DARK, width=2)
    # hex
    font_hex = load_font(28, FONT_CANDIDATES_BOLD)
    tw, th = text_size(draw, hex_code, font_hex)
    draw.text((sx + swatch_w/2 - tw/2, sy + swatch_h + 14), hex_code, fill=TEXT, font=font_hex)
    # name
    font_nm = load_font(22, FONT_CANDIDATES_ZH)
    tw, th = text_size(draw, name, font_nm)
    draw.text((sx + swatch_w/2 - tw/2, sy + swatch_h + 56), name, fill=TEXT, font=font_nm)
    # desc
    font_ds = load_font(18, FONT_CANDIDATES_ZH)
    tw, th = text_size(draw, desc, font_ds)
    draw.text((sx + swatch_w/2 - tw/2, sy + swatch_h + 96), desc, fill=SUBTLE, font=font_ds)

# ===== 字体 section =====
y = 980
draw.line([(80, y), (W-80, y)], fill=SUBTLE, width=2)
y += 30
draw.text((80, y), "02 · Typography / 字体规范", fill=PRIMARY_DARK, font=font_h2)
y += 90

# 中英字体示范
font_zh_h1 = load_font(60, FONT_CANDIDATES_ZH)
draw.text((80, y), "中文字体 · Source Han Serif / 思源宋体", fill=TEXT, font=font_zh_h1)
y += 90
draw.text((80, y), "示例：专业·温馨·可信赖 — 中老年护理用品", fill=TEXT, font=load_font(38, FONT_CANDIDATES_ZH))
y += 80
font_en_h1 = load_font(60, FONT_CANDIDATES_EN)
draw.text((80, y), "English Typeface · Lora / Georgia (Serif)", fill=TEXT, font=font_en_h1)
y += 90
draw.text((80, y), "Sample: Professional · Warm · Trustworthy", fill=TEXT, font=load_font(38, FONT_CANDIDATES_EN))
y += 100

# 字号规范
draw.line([(80, y), (W-80, y)], fill=SUBTLE, width=1)
y += 30
font_h3 = load_font(32, FONT_CANDIDATES_BOLD)
draw.text((80, y), "Type Scale / 字号体系", fill=PRIMARY_DARK, font=font_h3)
y += 60

type_scale = [
    ("H1 大标题", 64, "60-72px · Banner 主标题"),
    ("H2 章节标题", 48, "44-52px · 段落大标题"),
    ("H3 子标题", 32, "28-36px · 卡片标题"),
    ("Body 正文", 24, "20-26px · 主要正文"),
    ("Caption 说明", 18, "16-20px · 辅助说明"),
]
for name, sz, desc in type_scale:
    f = load_font(sz, FONT_CANDIDATES_ZH)
    draw.text((120, y), name, fill=TEXT, font=f)
    f2 = load_font(22, FONT_CANDIDATES_ZH)
    draw.text((520, y + (sz-22)//2), desc, fill=SUBTLE, font=f2)
    y += sz + 30

# ===== Logo 使用规范 =====
y = 1750
draw.line([(80, y), (W-80, y)], fill=SUBTLE, width=2)
y += 30
draw.text((80, y), "03 · Logo Usage / 品牌标识使用", fill=PRIMARY_DARK, font=font_h2)
y += 80

# 3 种 logo 展示
logo_variants = [
    ("Primary Logo", PRIMARY, WHITE),
    ("On Dark", WHITE, PRIMARY_DARK),
    ("Monochrome", TEXT, BG),
]
for i, (name, bg, fg) in enumerate(logo_variants):
    x = 80 + i * 500
    draw.rounded_rectangle([x, y, x + 460, y + 200], radius=12, fill=bg, outline=PRIMARY_DARK, width=2)
    f = load_font(56, FONT_CANDIDATES_BOLD)
    tw, th = text_size(draw, "DS CARO", f)
    draw.text((x + 230 - tw/2, y + 100 - th/2), "DS CARO", fill=fg, font=f)
    f2 = load_font(20, FONT_CANDIDATES_ZH)
    tw, th = text_size(draw, name, f2)
    draw.text((x + 230 - tw/2, y + 220), name, fill=TEXT, font=f2)

img.save(OUT, "PNG", optimize=True)
print(f"saved: {OUT}")
print(f"size: {os.path.getsize(OUT)/1024:.0f} KB")
