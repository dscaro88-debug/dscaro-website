#!/usr/bin/env python3
"""
DS-DIN-004 finalization v2 — single-line best fit per region.
Strategy: for each mask region, fill it with a clean background, then
write ONE piece of new text centered, with a generously sized font
that fits the box width. We don't try to fit long Chinese lines into
narrow boxes — each region gets its most-important single phrase.
"""
import os
import sys
from PIL import Image, ImageDraw, ImageFont

BRAND_BLUE = (26, 54, 93)
WHITE = (255, 255, 255)
DARK = (40, 40, 40)

FONT_REG = [
    "/System/Library/Fonts/SFNSDisplay.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
    "/Library/Fonts/Arial.ttf",
    "/System/Library/Fonts/Avenir.ttc",
]
FONT_BOLD = [
    "/System/Library/Fonts/Supplemental/Arial Black.ttf",
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/Library/Fonts/Arial Bold.ttf",
    "/System/Library/Fonts/SFNSDisplay.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
]


def load_font(size, bold=False):
    candidates = FONT_BOLD if bold else FONT_REG
    for p in candidates:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()


def measure(draw, text, font):
    try:
        bbox = draw.textbbox((0, 0), text, font=font)
        return bbox[2] - bbox[0], bbox[3] - bbox[1]
    except Exception:
        return draw.textsize(text, font=font)


def fit_text_to_box(draw, text, max_w, max_h, bold, color):
    """Find largest font size that fits the text within max_w × max_h."""
    size = int(max_h * 0.65)
    while size > 6:
        font = load_font(size, bold=bold)
        tw, th = measure(draw, text, font)
        if tw <= max_w and th <= max_h:
            return font, tw, th
        size -= 1
    return load_font(8, bold=bold), *measure(draw, text, load_font(8, bold=bold))


# Per-image: list of (y1, x1, y2, x2, text, kind, bg_fill, text_color)
JOBS = {
    "主图_01.jpg": [
        (30, 10, 110, 300, "DSCARO", "logo", WHITE, BRAND_BLUE),
        (560, 380, 635, 615, "DSCARO", "logo_on_product", None, WHITE),
    ],
    "主图_02.jpg": [
        (30, 10, 140, 300, "DSCARO", "logo", WHITE, BRAND_BLUE),
        (60, 360, 160, 975, "BPA-Free · Food-Grade Safe", "headline", WHITE, BRAND_BLUE),
    ],
    "主图_03.jpg": [
        (30, 10, 105, 300, "DSCARO", "logo", WHITE, BRAND_BLUE),
        (70, 295, 160, 970, "Stretch-Resistant & Tear-Proof", "headline", WHITE, BRAND_BLUE),
        (355, 250, 650, 740, "DSCARO", "logo_on_product", None, WHITE),
    ],
    "主图_05.jpg": [
        (550, 340, 660, 645, "DSCARO", "logo_on_product", None, WHITE),
    ],
    "SKU_01_静谧蓝.jpg": [
        (0, 10, 150, 320, "DSCARO", "logo", WHITE, BRAND_BLUE),
        (400, 360, 535, 660, "DSCARO", "logo_on_product", None, WHITE),
    ],
    "SKU_02_香槟粉.jpg": [
        (0, 10, 150, 320, "DSCARO", "logo", WHITE, BRAND_BLUE),
        (410, 370, 530, 685, "DSCARO", "logo_on_product", None, WHITE),
    ],
    "SKU_03_迷洁灰.jpg": [
        (0, 10, 150, 320, "DSCARO", "logo", WHITE, BRAND_BLUE),
        (395, 360, 550, 645, "DSCARO", "logo_on_product", None, WHITE),
    ],
    "详情_23.jpg": [
        (30, 10, 140, 320, "DSCARO", "logo", WHITE, BRAND_BLUE),
        (75, 180, 120, 455, "Rinse-Clean", "headline", WHITE, BRAND_BLUE),
        (75, 480, 120, 820, "Boil-Safe", "headline", WHITE, BRAND_BLUE),
        (140, 125, 170, 575, "Seamless one-piece", "subhead", WHITE, DARK),
        (175, 235, 205, 800, "Heat-resistant to 200°C", "subhead", WHITE, DARK),
        (530, 355, 645, 645, "DSCARO", "logo_on_product", None, WHITE),
    ],
    "详情_24.jpg": [
        (30, 10, 140, 320, "DSCARO", "logo", WHITE, BRAND_BLUE),
        (75, 225, 125, 775, "Premium Food-Grade Silicone", "headline", WHITE, BRAND_BLUE),
        (140, 300, 170, 700, "BPA-free, safety-tested", "subhead", WHITE, DARK),
        (175, 420, 200, 580, "Safe & Reliable", "subhead", WHITE, DARK),
        (275, 210, 370, 325, "Material", "label", WHITE, BRAND_BLUE),
        (275, 440, 370, 560, "Safety", "label", WHITE, BRAND_BLUE),
        (275, 670, 370, 790, "Coverage", "label", WHITE, BRAND_BLUE),
        (675, 235, 785, 410, "DSCARO", "logo_on_product", None, WHITE),
        (675, 580, 745, 785, "DSCARO", "logo_on_product", None, WHITE),
    ],
    "详情_25.jpg": [
        (30, 10, 140, 320, "DSCARO", "logo", WHITE, BRAND_BLUE),
        (70, 360, 125, 645, "Color Range", "headline", WHITE, BRAND_BLUE),
        (125, 210, 175, 790, "Summer-ready", "subhead", WHITE, DARK),
        (185, 180, 225, 815, "Appetite Boost", "subhead", WHITE, DARK),
        (190, 210, 265, 815, "3 Refreshing Colors", "headline", WHITE, BRAND_BLUE),
        (295, 432, 370, 685, "Misty Grey", "label", WHITE, BRAND_BLUE),
        (395, 432, 470, 685, "Tranquil Blue", "label", WHITE, BRAND_BLUE),
        (495, 432, 570, 685, "Champagne Pink", "label", WHITE, BRAND_BLUE),
        (445, 635, 520, 800, "DSCARO", "logo_on_product", None, WHITE),
        (660, 435, 695, 610, "DSCARO", "logo_on_product", None, WHITE),
        (725, 255, 775, 345, "DSCARO", "logo_on_product", None, WHITE),
    ],
    "详情_26.jpg": [
        (30, 10, 140, 320, "DSCARO", "logo", WHITE, BRAND_BLUE),
        (80, 310, 130, 685, "Lightweight & Rollable", "headline", WHITE, BRAND_BLUE),
        (140, 225, 175, 775, "Soft as rubber band", "subhead", WHITE, DARK),
        (175, 340, 205, 655, "Travel-friendly", "subhead", WHITE, DARK),
        (655, 145, 845, 525, "DSCARO", "logo_on_product", None, WHITE),
    ],
    "详情_27.jpg": [
        (30, 10, 140, 320, "DSCARO", "logo", WHITE, BRAND_BLUE),
        (70, 200, 135, 810, "3D Leak-Proof Curved Fit", "headline", WHITE, BRAND_BLUE),
        (135, 100, 210, 890, "Curved body fit · leak-proof pocket", "subhead", WHITE, DARK),
        (310, 0, 435, 165, "DSCARO", "logo_on_product", None, WHITE),
        (600, 450, 740, 685, "DSCARO", "logo_on_product", None, WHITE),
    ],
    "详情_28.jpg": [
        (75, 360, 120, 640, "Product Specifications", "headline", WHITE, BRAND_BLUE),
        (185, 100, 215, 380, "Adult Silicone Bib", "subhead", WHITE, DARK),
        (185, 540, 215, 820, "3 Color Options", "subhead", WHITE, DARK),
        (230, 100, 260, 300, "Brand: DSCARO", "subhead", WHITE, DARK),
        (230, 540, 260, 900, "Material: Silicone", "subhead", WHITE, DARK),
        (535, 230, 610, 280, "27cm", "label", WHITE, BRAND_BLUE),
        (780, 485, 815, 605, "43cm", "label", WHITE, BRAND_BLUE),
        (875, 120, 905, 870, "Note: 1-2cm variation possible", "subhead", WHITE, DARK),
    ],
    "详情_29.jpg": [
        (30, 10, 140, 320, "DSCARO", "logo", WHITE, BRAND_BLUE),
        (85, 215, 140, 790, "Style in Color", "headline", WHITE, BRAND_BLUE),
        (155, 380, 190, 615, "Pick your color", "subhead", WHITE, DARK),
        (320, 70, 365, 240, "Tranquil Blue", "label", WHITE, BRAND_BLUE),
        (545, 380, 630, 635, "DSCARO", "logo_on_product", None, WHITE),
    ],
}


def finalize(inpainted_png, output_jpg, name):
    img = Image.open(inpainted_png).convert("RGB")
    W, H = img.size
    if name not in JOBS:
        img.save(output_jpg, "JPEG", quality=90, optimize=True)
        return
    for y1f, x1f, y2f, x2f, text, kind, bg, color in JOBS[name]:
        y1, y2 = min(y1f, y2f), max(y1f, y2f)
        x1, x2 = min(x1f, x2f), max(x1f, x2f)
        px1, py1 = int(x1 / 1000.0 * W), int(y1 / 1000.0 * H)
        px2, py2 = int(x2 / 1000.0 * W), int(y2 / 1000.0 * H)
        bw, bh = px2 - px1, py2 - py1
        if bw < 4 or bh < 4:
            continue
        # Clamp to image
        px1, py1 = max(0, px1), max(0, py1)
        px2, py2 = min(W, px2), min(H, py2)
        draw = ImageDraw.Draw(img)
        # Special: for top-left logo, fit inside the box
        if kind == "logo":
            # Use the box area (with some interior margin)
            inner_w = bw - 6
            inner_h = bh - 6
            if inner_w < 10 or inner_h < 10:
                continue
            # Pick largest font that fits inner_w × inner_h
            font_size = int(min(inner_h * 0.6, W * 0.05))
            font = load_font(font_size, bold=True)
            tw, th = measure(draw, text, font)
            while (tw > inner_w or th > inner_h) and font_size > 8:
                font_size -= 1
                font = load_font(font_size, bold=True)
                tw, th = measure(draw, text, font)
            # Center pill within the box
            pill_w = tw + max(8, font_size // 3) * 2
            pill_h = th + max(6, font_size // 4) * 2
            pill_x1 = max(0, px1 + (bw - pill_w) // 2)
            pill_y1 = max(0, py1 + (bh - pill_h) // 2)
            pill_x2 = min(W, pill_x1 + pill_w)
            pill_y2 = min(H, pill_y1 + pill_h)
            draw.rectangle([pill_x1, pill_y1, pill_x2, pill_y2], fill=WHITE, outline=BRAND_BLUE, width=2)
            # Center text in pill
            cx = (pill_x1 + pill_x2) / 2 - tw / 2
            cy = (pill_y1 + pill_y2) / 2 - th / 2 - 1
            draw.text((cx, cy), text, fill=color, font=font)
            continue
        # Background fill for other kinds
        if bg is not None:
            pad = max(2, min(bw, bh) // 20)
            x1p, y1p = max(0, px1 - pad), max(0, py1 - pad)
            x2p, y2p = min(W, px2 + pad), min(H, py2 + pad)
            draw.rectangle([x1p, y1p, x2p, y2p], fill=bg)
            text_box = (x2p - x1p, y2p - y1p)
        else:
            text_box = (bw, bh)
        # Pick font size
        if kind == "headline":
            font, tw, th = fit_text_to_box(draw, text, text_box[0] - 4, text_box[1] - 4, bold=True, color=color)
        elif kind == "subhead":
            font, tw, th = fit_text_to_box(draw, text, text_box[0] - 4, text_box[1] - 4, bold=False, color=color)
        elif kind == "label":
            font, tw, th = fit_text_to_box(draw, text, text_box[0] - 4, text_box[1] - 4, bold=True, color=color)
        elif kind == "logo_on_product":
            font, tw, th = fit_text_to_box(draw, text, text_box[0] - 4, text_box[1] - 4, bold=True, color=color)
        # Center text
        cx = (px1 + px2) / 2 - tw / 2
        cy = (py1 + py2) / 2 - th / 2 - 1
        if kind == "logo_on_product":
            shadow = max(1, bh // 80)
            draw.text((cx + shadow, cy + shadow), text, fill=(0, 0, 0), font=font)
        draw.text((cx, cy), text, fill=color, font=font)
    img.save(output_jpg, "JPEG", quality=90, optimize=True)


def main():
    if len(sys.argv) != 2:
        print("usage: finalize_004_v2.py <dir>")
        sys.exit(1)
    d = sys.argv[1]
    in_dir = os.path.join(d, "_inpainted")
    out_dir = d
    for name in sorted(JOBS):
        src = os.path.join(in_dir, name.replace(".jpg", ".png"))
        dst = os.path.join(out_dir, name)
        if not os.path.exists(src):
            print(f"missing {src}")
            continue
        finalize(src, dst, name)
        print(f"finalized {name}")


if __name__ == "__main__":
    main()
