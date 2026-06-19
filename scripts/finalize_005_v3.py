#!/usr/bin/env python3
"""
DS-DIN-005 v2 — full rebrand with precise OCR-based masks and
white-background text overlays.
"""
import os
import sys
import random
from PIL import Image, ImageDraw, ImageFilter, ImageFont

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


def fit_text(draw, text, max_w, max_h, bold):
    size = int(max_h * 0.5)
    while size > 6:
        font = load_font(size, bold=bold)
        tw, th = measure(draw, text, font)
        if tw <= max_w and th <= max_h:
            return font, tw, th
        size -= 1
    return load_font(8, bold=bold), *measure(draw, text, load_font(8, bold=bold))


# (y1, x1, y2, x2, text, kind)
# kind: "logo" / "headline" / "subhead" / "label" / "logo_on_product"
JOBS = {
    # 主图_01: top-left green block (full coverage)
    "主图_01.jpg": [
        (14, 31, 137, 241, "DSCARO", "logo"),
    ],
    # 主图_02: top-left + headline + 6 features (each 2 lines: title + sub)
    "主图_02.jpg": [
        (14, 27, 137, 238, "DSCARO", "logo"),
        (33, 266, 137, 843, "Detachable Bib · Quality Assured", "headline"),
        (89, 44, 137, 233, "Waterproof TPU", "label"),
        (140, 47, 200, 786, "Wipeable fabric, easy care", "subhead"),
        (148, 50, 200, 712, "Comfortable soft edging", "subhead"),
        (148, 55, 200, 660, "Neat stitching", "subhead"),
        (346, 78, 410, 191, "Detachable design", "label"),
        (381, 56, 460, 227, "12cm adjustable buckle", "label"),
        (379, 56, 460, 917, "Multi-gear fit", "label"),
        (629, 58, 700, 219, "Humanized design", "label"),
        (660, 56, 720, 939, "Foldable, no deformation", "label"),
        (662, 92, 720, 182, "3D pocket", "label"),
        (662, 92, 730, 939, "Large size catches spills", "subhead"),
        (909, 66, 970, 203, "Travel-friendly", "label"),
        (940, 91, 1000, 180, "Soft texture", "label"),
        (940, 91, 1000, 963, "Convenient storage", "subhead"),
    ],
    # 主图_03: top-left + 8 small labels
    "主图_03.jpg": [
        (18, 30, 140, 276, "DSCARO", "logo"),
        (368, 38, 431, 101, "Wipe-clean", "label"),
        (483, 38, 540, 101, "Soft edge", "label"),
        (601, 44, 642, 100, "Detachable", "label"),
        (183, 353, 230, 621, "12cm buckle", "label"),
        (112, 376, 190, 622, "Adult Bib", "headline"),
        (230, 271, 290, 710, "Detachable pocket", "subhead"),
        (372, 115, 450, 252, "Foldable", "label"),
        (481, 112, 550, 321, "3D pocket", "label"),
        (595, 114, 660, 260, "Easy-clean", "label"),
    ],
    # 主图_04: top-left + headline + 3 sub
    "主图_04.jpg": [
        (16, 28, 142, 273, "DSCARO", "logo"),
        (118, 376, 200, 688, "Hook & Loop Design", "headline"),
        (203, 148, 280, 856, "Adjustable neck fit for elderly and older children", "subhead"),
        (244, 386, 300, 618, "Fine stitching", "label"),
        (279, 281, 330, 720, "Durable", "label"),
        (300, 362, 340, 644, "Easy on/off", "label"),
    ],
    # 主图_05: top-left + center text
    "主图_05.jpg": [
        (12, 31, 79, 241, "DSCARO", "logo"),
        (13, 245, 79, 276, "", "subhead"),  # tiny extra element
        (72, 38, 140, 235, "", "subhead"),  # tiny
        (349, 44, 450, 292, "Adult Bib", "headline"),
    ],
    # SKU_03_粉色L码
    "SKU_03_粉色L码.jpg": [
        (18, 31, 80, 241, "DSCARO", "logo"),
        (18, 245, 80, 276, "", "subhead"),
        (85, 40, 137, 233, "", "subhead"),
    ],
    # 详情_05: top-left + 3 sections
    "详情_05.jpg": [
        (75, 391, 130, 642, "Product Info", "headline"),
        (152, 321, 200, 764, "TPU + Polyester Fabric", "label"),
        (440, 14, 480, 88, "M 56cm · L 64cm · XL 72cm", "label"),
        (427, 339, 480, 412, "M size", "label"),
        (394, 508, 460, 571, "19cm", "label"),
        (608, 510, 660, 571, "36cm", "label"),
        (658, 484, 700, 549, "M码", "label"),
        (416, 661, 480, 735, "19cm", "label"),
        (608, 833, 660, 894, "36cm", "label"),
        (658, 800, 700, 889, "L码", "label"),
        (823, 132, 900, 216, "19cm", "label"),
        (824, 236, 900, 414, "56cm", "label"),
        (883, 132, 950, 216, "19cm", "label"),
        (882, 236, 950, 421, "64cm", "label"),
        (942, 132, 1000, 216, "19cm", "label"),
        (938, 238, 1000, 492, "72cm", "label"),
        (821, 532, 900, 616, "M", "label"),
        (880, 532, 950, 616, "L", "label"),
        (939, 532, 1000, 616, "XL", "label"),
        (721, 218, 800, 786, "Note: 1-2cm size variation may occur", "subhead"),
    ],
    # 详情_06: 4 features
    "详情_06.jpg": [
        (75, 381, 130, 631, "Comfortable Fabric", "headline"),
        (156, 297, 220, 740, "Soft & skin-friendly", "label"),
        (267, 362, 330, 693, "Non-toxic", "label"),
        (458, 209, 540, 347, "Comfortable", "label"),
        (557, 207, 640, 420, "Soft fabric", "label"),
        (661, 209, 740, 356, "Color-fast", "label"),
    ],
    # 详情_07
    "详情_07.jpg": [
        (85, 339, 180, 686, "Waterproof & Easy-clean", "headline"),
        (167, 299, 230, 745, "Wipe-clean surface", "subhead"),
        (298, 220, 360, 843, "Spills are no worry", "subhead"),
        (334, 396, 400, 668, "Wipe and reuse", "label"),
    ],
    # 详情_10
    "详情_10.jpg": [
        (107, 217, 180, 742, "Detachable Design", "headline"),
        (184, 433, 230, 531, "Detachable 3D pocket", "label"),
        (281, 412, 330, 523, "Easy to clean", "label"),
        (322, 258, 360, 700, "Smooth inner surface", "subhead"),
    ],
    # 详情_11
    "详情_11.jpg": [
        (110, 218, 170, 745, "Roll-up Storage", "headline"),
        (284, 411, 320, 526, "Soft texture", "label"),
        (321, 258, 360, 706, "Folds flat for travel", "subhead"),
    ],
}


def finalize(inpainted_png, output_jpg, name):
    img = Image.open(inpainted_png).convert("RGB")
    W, H = img.size
    if name not in JOBS:
        img.save(output_jpg, "JPEG", quality=90, optimize=True)
        return
    draw = ImageDraw.Draw(img)
    for y1f, x1f, y2f, x2f, text, kind in JOBS[name]:
        y1, y2 = min(y1f, y2f), max(y1f, y2f)
        x1, x2 = min(x1f, x2f), max(x1f, x2f)
        px1, py1 = int(x1 / 1000.0 * W), int(y1 / 1000.0 * H)
        px2, py2 = int(x2 / 1000.0 * W), int(y2 / 1000.0 * H)
        bw, bh = px2 - px1, py2 - py1
        if bw < 4 or bh < 4:
            continue
        px1, py1 = max(0, px1), max(0, py1)
        px2, py2 = min(W, px2), min(H, py2)
        if kind == "logo":
            # Use 5% of width
            font_size = int(W * 0.05)
            font = load_font(font_size, bold=True)
            tw, th = measure(draw, text, font)
            inner_w = bw - 6
            inner_h = bh - 6
            while (tw > inner_w or th > inner_h) and font_size > 8:
                font_size -= 1
                font = load_font(font_size, bold=True)
                tw, th = measure(draw, text, font)
            # Pill — center in box
            pad_x = max(10, font_size // 3)
            pad_y = max(6, font_size // 4)
            pill_w = tw + pad_x * 2
            pill_h = th + pad_y * 2
            pill_x1 = max(0, px1 + (bw - pill_w) // 2)
            pill_y1 = max(0, py1 + (bh - pill_h) // 2)
            pill_x2 = min(W, pill_x1 + pill_w)
            pill_y2 = min(H, pill_y1 + pill_h)
            draw.rectangle([pill_x1, pill_y1, pill_x2, pill_y2], fill=WHITE, outline=BRAND_BLUE, width=2)
            cx = (pill_x1 + pill_x2) / 2 - tw / 2
            cy = (pill_y1 + pill_y2) / 2 - th / 2 - 1
            draw.text((cx, cy), text, fill=BRAND_BLUE, font=font)
        else:
            # Other text: white background + colored text
            pad = max(2, min(bw, bh) // 12)
            x1p, y1p = max(0, px1 - pad), max(0, py1 - pad)
            x2p, y2p = min(W, px2 + pad), min(H, py2 + pad)
            draw.rectangle([x1p, y1p, x2p, y2p], fill=WHITE)
            if not text:
                continue
            text_box = (x2p - x1p, y2p - y1p)
            if kind == "headline":
                font, tw, th = fit_text(draw, text, text_box[0] - 4, text_box[1] - 4, bold=True)
                color = BRAND_BLUE
            elif kind == "subhead":
                font, tw, th = fit_text(draw, text, text_box[0] - 4, text_box[1] - 4, bold=False)
                color = DARK
            elif kind == "label":
                font, tw, th = fit_text(draw, text, text_box[0] - 4, text_box[1] - 4, bold=True)
                color = BRAND_BLUE
            else:
                font, tw, th = fit_text(draw, text, text_box[0] - 4, text_box[1] - 4, bold=True)
                color = BRAND_BLUE
            cx = (x1p + x2p) / 2 - tw / 2
            cy = (y1p + y2p) / 2 - th / 2 - 1
            draw.text((cx, cy), text, fill=color, font=font)
    img.save(output_jpg, "JPEG", quality=90, optimize=True)


def main():
    if len(sys.argv) != 2:
        print("usage: finalize_005_v3.py <dir>")
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
