#!/usr/bin/env python3
"""
DS-DIN-005 v4 — clean PIL finalize.
Every image has: DSCARO top-left pill + white background text overlays.
Same logic as the working 004 v2 finalize.
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


def fit_text(draw, text, max_w, max_h, bold):
    size = int(max_h * 0.65)
    while size > 6:
        font = load_font(size, bold=bold)
        tw, th = measure(draw, text, font)
        if tw <= max_w and th <= max_h:
            return font, tw, th
        size -= 1
    return load_font(8, bold=bold), *measure(draw, text, load_font(8, bold=bold))


# (y1, x1, y2, x2, text, kind)
# kind: "logo" / "headline" / "subhead" / "label" / "blank" (just white-fill, no text)
JOBS = {
    "主图_01.jpg": [
        (10, 10, 90, 280, "DSCARO", "logo"),
    ],
    "主图_02.jpg": [
        (10, 10, 90, 280, "DSCARO", "logo"),
        (110, 280, 170, 720, "Detachable Bib · Quality Assured", "headline"),
        (180, 50, 280, 480, "Waterproof TPU", "label"),
        (290, 50, 380, 480, "Wipeable", "label"),
        (400, 50, 490, 480, "Easy care", "label"),
        (180, 510, 280, 950, "12cm adjustable buckle", "label"),
        (290, 510, 380, 950, "Foldable", "label"),
        (400, 510, 490, 950, "3D pocket", "label"),
    ],
    "主图_03.jpg": [
        (10, 10, 90, 280, "DSCARO", "logo"),
        (370, 38, 440, 250, "Wipe-clean", "label"),
        (480, 38, 550, 260, "Soft edge", "label"),
        (600, 44, 660, 260, "Detachable", "label"),
        (180, 353, 230, 630, "12cm buckle", "label"),
        (110, 376, 190, 630, "Adult Bib", "headline"),
        (230, 271, 290, 720, "Detachable pocket", "subhead"),
        (370, 115, 450, 260, "Foldable", "label"),
        (480, 112, 550, 330, "3D pocket", "label"),
        (595, 114, 660, 270, "Easy-clean", "label"),
    ],
    "主图_04.jpg": [
        (10, 10, 90, 280, "DSCARO", "logo"),
        (110, 50, 220, 480, "Hook & Loop Design", "headline"),
        (220, 200, 320, 750, "Adjustable neck fit for elderly and older children", "subhead"),
        (330, 300, 430, 600, "Fine stitching, durable", "subhead"),
        (500, 100, 600, 600, "Easy on/off", "label"),
    ],
    "主图_05.jpg": [
        (10, 10, 90, 280, "DSCARO", "logo"),
        (300, 350, 500, 700, "Adult Bib", "headline"),
    ],
    "SKU_03_粉色L码.jpg": [
        (10, 10, 90, 280, "DSCARO", "logo"),
    ],
    "详情_05.jpg": [
        (10, 10, 90, 280, "DSCARO", "logo"),
        (0, 50, 200, 450, "Product Info", "headline"),
        (180, 50, 700, 950, "M 56cm · L 64cm · XL 72cm", "headline"),
        (700, 30, 950, 950, "TPU + Polyester · Waterproof · Washable", "subhead"),
    ],
    "详情_06.jpg": [
        (10, 10, 90, 280, "DSCARO", "logo"),
        (110, 100, 220, 400, "Comfortable Fabric", "headline"),
        (240, 100, 370, 500, "Soft & Skin-friendly", "label"),
        (390, 100, 520, 500, "Non-toxic", "label"),
        (540, 100, 670, 500, "Color-fast", "label"),
    ],
    "详情_07.jpg": [
        (10, 10, 90, 280, "DSCARO", "logo"),
        (79, 314, 142, 683, "Waterproof & Easy-clean", "headline"),
        (259, 222, 287, 846, "Spills are no worry", "subhead"),
        (294, 192, 321, 876, "Wipe and reuse", "subhead"),
    ],
    "详情_10.jpg": [
        (10, 10, 90, 280, "DSCARO", "logo"),
        (110, 50, 220, 700, "Detachable Design", "headline"),
        (220, 100, 400, 900, "Detachable 3D pocket · smooth inner surface", "subhead"),
    ],
    "详情_11.jpg": [
        (10, 10, 90, 280, "DSCARO", "logo"),
        (110, 218, 161, 745, "Roll-up Storage", "headline"),
        (284, 411, 306, 526, "Soft texture", "label"),
        (321, 258, 345, 706, "Folds flat for travel", "subhead"),
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
            inner_w = bw - 6
            inner_h = bh - 6
            if inner_w < 10 or inner_h < 10:
                continue
            font_size = int(min(inner_h * 0.6, W * 0.05))
            font = load_font(font_size, bold=True)
            tw, th = measure(draw, text, font)
            while (tw > inner_w or th > inner_h) and font_size > 8:
                font_size -= 1
                font = load_font(font_size, bold=True)
                tw, th = measure(draw, text, font)
            pill_w = tw + max(8, font_size // 3) * 2
            pill_h = th + max(6, font_size // 4) * 2
            pill_x1 = max(0, px1 + (bw - pill_w) // 2)
            pill_y1 = max(0, py1 + (bh - pill_h) // 2)
            pill_x2 = min(W, pill_x1 + pill_w)
            pill_y2 = min(H, pill_y1 + pill_h)
            draw.rectangle([pill_x1, pill_y1, pill_x2, pill_y2], fill=WHITE, outline=BRAND_BLUE, width=2)
            cx = (pill_x1 + pill_x2) / 2 - tw / 2
            cy = (pill_y1 + pill_y2) / 2 - th / 2 - 1
            draw.text((cx, cy), text, fill=BRAND_BLUE, font=font)
        else:
            pad = max(2, min(bw, bh) // 20)
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
            else:  # label
                font, tw, th = fit_text(draw, text, text_box[0] - 4, text_box[1] - 4, bold=True)
                color = BRAND_BLUE
            cx = (x1p + x2p) / 2 - tw / 2
            cy = (y1p + y2p) / 2 - th / 2 - 1
            draw.text((cx, cy), text, fill=color, font=font)
    img.save(output_jpg, "JPEG", quality=90, optimize=True)


def main():
    if len(sys.argv) != 2:
        print("usage: finalize_005_v4.py <dir>")
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
