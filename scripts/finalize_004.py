#!/usr/bin/env python3
"""
DS-DIN-004 finalization:
- Start from the LaMa-inpainted PNGs (which have logo + Chinese copy
  removed but may have green/blue gradient artifacts in solid-color
  regions)
- Run an artifact-cleansing pass: for each mask region, replace the
  inpainted pixels with a sample of the surrounding background color
  blended smoothly, then add a new white-pill background and write the
  replacement text on top.
- Save final output as JPG back to the source directory.
"""
import os
import sys
import random
from PIL import Image, ImageDraw, ImageFilter, ImageFont

# Brand color
BRAND_BLUE = (26, 54, 93)

# Font candidates (macOS)
FONT_REGULAR = [
    "/System/Library/Fonts/SFNSDisplay.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
    "/Library/Fonts/Arial.ttf",
    "/System/Library/Fonts/Avenir.ttc",
    "/System/Library/Fonts/HelveticaNeue.ttc",
]
FONT_BOLD = [
    "/System/Library/Fonts/Supplemental/Arial Black.ttf",
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/Library/Fonts/Arial Bold.ttf",
    "/System/Library/Fonts/SFNSDisplay.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
]


def load_font(size, bold=False):
    candidates = FONT_BOLD if bold else FONT_REGULAR
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


def smooth_fill_with_surroundings(img, box, expand=40, samples=400, blur=2):
    """Sample pixels from the ring around the box and fill the box
    with a blended background. Used to clean LaMa's green-tint
    artifacts over white backgrounds."""
    x1, y1, x2, y2 = box
    W, H = img.size
    x1, y1 = max(0, x1), max(0, y1)
    x2, y2 = min(W, x2), min(H, y2)
    bw, bh = x2 - x1, y2 - y1
    if bw <= 0 or bh <= 0:
        return img
    pool = []
    for _ in range(samples):
        for _ in range(20):
            side = random.choice(["top", "bottom", "left", "right"])
            if side == "top":
                px = random.randint(max(0, x1 - expand), min(W - 1, x2 + expand))
                py = random.randint(max(0, y1 - expand), y1 - 1)
            elif side == "bottom":
                px = random.randint(max(0, x1 - expand), min(W - 1, x2 + expand))
                py = random.randint(y2 + 1, min(H - 1, y2 + expand))
            elif side == "left":
                px = random.randint(max(0, x1 - expand), x1 - 1)
                py = random.randint(max(0, y1 - expand), min(H - 1, y2 + expand))
            else:
                px = random.randint(x2 + 1, min(W - 1, x2 + expand))
                py = random.randint(max(0, y1 - expand), min(H - 1, y2 + expand))
            if 0 <= px < W and 0 <= py < H:
                pool.append(img.getpixel((px, py)))
                break
    if not pool:
        return img
    avg = tuple(sum(c[i] for c in pool) // len(pool) for i in range(3))
    base = Image.new("RGB", (bw, bh), avg)
    base_px = base.load()
    for _ in range(samples // 4):
        sx = random.randint(0, bw - 1)
        sy = random.randint(0, bh - 1)
        c = random.choice(pool)
        c = tuple(max(0, min(255, c[i] + random.randint(-12, 12))) for i in range(3))
        base_px[sx, sy] = c
    base = base.filter(ImageFilter.GaussianBlur(radius=blur))
    mask = Image.new("L", (bw, bh), 0)
    mdraw = ImageDraw.Draw(mask)
    feather = max(4, min(bw, bh) // 6)
    mdraw.rectangle([feather, feather, bw - feather, bh - feather], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=feather // 2))
    blended = Image.composite(base, img.crop((x1, y1, x2, y2)), mask)
    img.paste(blended, (x1, y1))
    return img


# Per-image: list of (y1, x1, y2, x2, text, kind) where kind is
#   "logo_top"     -> DSCARO wordmark on a white pill with brand-blue text
#   "logo_on_product" -> DSCARO wordmark in white on the bib (no pill)
#   "headline"     -> bold dark blue text on white background
#   "subhead"      -> dark grey text on white background
#   "label"        -> brand-blue bold text
JOBS = {
    "主图_01.jpg": [
        (49, 44, 100, 241, "DSCARO", "logo_top"),
        (569, 381, 630, 608, "DSCARO", "logo_on_product"),
    ],
    "主图_02.jpg": [
        (48, 36, 142, 255, "DSCARO", "logo_top"),
        (71, 371, 149, 968, "BPA-Free · Food-Grade Safe", "headline"),
    ],
    "主图_03.jpg": [
        (49, 46, 101, 239, "DSCARO", "logo_top"),
        (75, 302, 150, 964, "Stretch-Resistant & Tear-Proof", "headline"),
        (363, 257, 642, 733, "DSCARO", "logo_on_product"),
    ],
    "主图_05.jpg": [
        (555, 344, 656, 642, "DSCARO", "logo_on_product"),
    ],
    "SKU_01_静谧蓝.jpg": [
        (0, 36, 146, 255, "DSCARO", "logo_top"),
        (402, 363, 532, 658, "DSCARO", "logo_on_product"),
    ],
    "SKU_02_香槟粉.jpg": [
        (0, 36, 145, 255, "DSCARO", "logo_top"),
        (412, 375, 527, 680, "DSCARO", "logo_on_product"),
    ],
    "SKU_03_迷洁灰.jpg": [
        (0, 36, 145, 255, "DSCARO", "logo_top"),
        (400, 362, 547, 642, "DSCARO", "logo_on_product"),
    ],
    "详情_23.jpg": [
        (48, 36, 142, 255, "DSCARO", "logo_top"),
        (78, 182, 118, 452, "Rinse-Clean", "headline"),
        (78, 483, 118, 819, "Boil-Safe", "headline"),
        (145, 128, 168, 400, "Seamless one-piece — wipes clean in one rinse", "subhead"),
        (146, 584, 169, 735, "Heat-resistant to 200°C — steam-sterilize with confidence", "subhead"),
        (535, 357, 642, 643, "DSCARO", "logo_on_product"),
    ],
    "详情_24.jpg": [
        (48, 36, 142, 255, "DSCARO", "logo_top"),
        (79, 230, 119, 770, "Premium Food-Grade Silicone", "headline"),
        (144, 303, 166, 696, "BPA-free, safety-tested silicone", "subhead"),
        (178, 423, 199, 574, "Safe & Reliable", "subhead"),
        (280, 213, 363, 321, "Material Curation", "label"),
        (280, 444, 363, 555, "Safety Tested", "label"),
        (280, 676, 364, 785, "Full Coverage", "label"),
        (679, 237, 783, 407, "DSCARO", "logo_on_product"),
        (679, 584, 742, 782, "DSCARO", "logo_on_product"),
    ],
    "详情_25.jpg": [
        (48, 36, 142, 255, "DSCARO", "logo_top"),
        (75, 362, 122, 642, "Color Range", "headline"),
        (127, 212, 172, 786, "Summer-ready", "subhead"),
        (188, 185, 222, 810, "Appetite Boost", "subhead"),
        (192, 215, 260, 808, "3 Refreshing Colors", "headline"),
        (300, 437, 365, 678, "Misty Grey", "label"),
        (400, 437, 465, 678, "Tranquil Blue", "label"),
        (500, 437, 565, 678, "Champagne Pink", "label"),
        (447, 638, 517, 796, "DSCARO", "logo_on_product"),
        (663, 440, 693, 608, "DSCARO", "logo_on_product"),
        (727, 260, 771, 342, "DSCARO", "logo_on_product"),
    ],
    "详情_26.jpg": [
        (48, 36, 142, 255, "DSCARO", "logo_top"),
        (85, 316, 120, 679, "Lightweight & Rollable", "headline"),
        (145, 230, 168, 766, "Soft as a rubber band — folds without creasing", "subhead"),
        (178, 347, 201, 649, "Travel-friendly, takes no space", "subhead"),
        (660, 150, 840, 520, "DSCARO", "logo_on_product"),
    ],
    "详情_27.jpg": [
        (48, 36, 142, 255, "DSCARO", "logo_top"),
        (75, 203, 127, 497, "3D Leak-Proof Curved Fit", "headline"),
        (78, 502, 127, 803, "Curved body fit + 3D leak-proof pocket — keeps clothes clean", "subhead"),
        (140, 107, 172, 887, "", "subhead"),  # 详情_27 had 3 Chinese subhead lines, only keep 1
        (174, 182, 205, 822, "Eat freely, stay clean — no more table mess", "subhead"),
        (316, 0, 429, 161, "DSCARO", "logo_on_product"),
        (606, 458, 735, 678, "DSCARO", "logo_on_product"),
    ],
    "详情_28.jpg": [
        (75, 362, 116, 634, "Product Specifications", "headline"),
        (188, 102, 214, 375, "Product: Adult Silicone Bib", "subhead"),
        (188, 545, 212, 818, "Color: 3 options", "subhead"),
        (233, 105, 258, 297, "Brand: DSCARO", "subhead"),
        (233, 545, 258, 894, "Material: Silicone", "subhead"),
        (538, 235, 606, 277, "27cm", "label"),
        (784, 488, 810, 601, "43cm", "label"),
        (880, 126, 901, 868, "Note: measurements may vary by 1-2cm — for reference only", "subhead"),
    ],
    "详情_29.jpg": [
        (48, 36, 142, 255, "DSCARO", "logo_top"),
        (89, 219, 134, 785, "Style Statements in Color", "headline"),
        (159, 386, 184, 613, "Pick your color", "subhead"),
        (326, 75, 362, 236, "Tranquil Blue", "label"),
        (550, 386, 627, 631, "DSCARO", "logo_on_product"),
    ],
}


def finalize(inpainted_png, output_jpg, name):
    img = Image.open(inpainted_png).convert("RGB")
    W, H = img.size
    if name not in JOBS:
        img.save(output_jpg, "JPEG", quality=88, optimize=True)
        return
    # Pass 1: fill each box with a white background to ensure text is readable
    # and never bleeds onto adjacent regions. This is the key fix — every
    # text/logo region gets a clean white rectangle first.
    for y1f, x1f, y2f, x2f, _, _ in JOBS[name]:
        y1, y2 = min(y1f, y2f), max(y1f, y2f)
        x1, x2 = min(x1f, x2f), max(x1f, x2f)
        px1 = int(x1 / 1000.0 * W)
        py1 = int(y1 / 1000.0 * H)
        px2 = int(x2 / 1000.0 * W)
        py2 = int(y2 / 1000.0 * H)
        if px2 - px1 < 2 or py2 - py1 < 2:
            continue
        # For logo_on_product: leave the product surface visible (no white fill)
        # — we just want the text on top of the existing inpaint.
        # For everything else: white rectangle.
        # Pass 2 below will draw the right thing.
    # Pass 2: overlay new text / DSCARO logo, with white background first
    for y1f, x1f, y2f, x2f, text, kind in JOBS[name]:
        y1, y2 = min(y1f, y2f), max(y1f, y2f)
        x1, x2 = min(x1f, x2f), max(x1f, x2f)
        px1 = int(x1 / 1000.0 * W)
        py1 = int(y1 / 1000.0 * H)
        px2 = int(x2 / 1000.0 * W)
        py2 = int(y2 / 1000.0 * H)
        bw, bh = px2 - px1, py2 - py1
        if bw <= 0 or bh <= 0:
            continue
        draw = ImageDraw.Draw(img)
        if kind == "logo_top":
            # Fill with white first so logo is always visible regardless of
            # LaMa artifacts. Then draw a brand-blue border.
            pad = max(6, bh // 6)
            draw.rectangle([px1 - pad, py1 - pad, px2 + pad, py2 + pad],
                            fill=(255, 255, 255), outline=BRAND_BLUE, width=2)
            font = load_font(int(bh * 0.55), bold=True)
            tw, th = measure(draw, text, font)
            cx = (px1 + px2) / 2 - tw / 2
            cy = (py1 + py2) / 2 - th / 2 - 2
            draw.text((cx, cy), text, fill=BRAND_BLUE, font=font)
        elif kind == "logo_on_product":
            # White DSCARO directly on the inpaint area
            font = load_font(int(bh * 0.50), bold=True)
            tw, th = measure(draw, text, font)
            cx = (px1 + px2) / 2 - tw / 2
            cy = (py1 + py2) / 2 - th / 2 - 2
            # Subtle dark shadow for legibility
            shadow_offset = max(1, bh // 60)
            draw.text((cx + shadow_offset, cy + shadow_offset), text, fill=(0, 0, 0), font=font)
            draw.text((cx, cy), text, fill=(255, 255, 255), font=font)
        elif kind == "headline":
            # White background + brand-blue text
            pad_y = max(2, bh // 10)
            draw.rectangle([px1, py1 - pad_y, px2, py2 + pad_y], fill=(255, 255, 255))
            font = load_font(int(bh * 0.60), bold=True)
            # Auto-shrink if too wide
            tw, th = measure(draw, text, font)
            while tw > bw - 8 and font.size > 10:
                font = load_font(font.size - 2, bold=True)
                tw, th = measure(draw, text, font)
            cx = (px1 + px2) / 2 - tw / 2
            cy = (py1 + py2) / 2 - th / 2 - 2
            draw.text((cx, cy), text, fill=BRAND_BLUE, font=font)
        elif kind == "subhead":
            if not text:
                # Just clean the area with white
                draw.rectangle([px1, py1, px2, py2], fill=(255, 255, 255))
                continue
            # White background + dark grey text
            pad_y = max(2, bh // 10)
            draw.rectangle([px1, py1 - pad_y, px2, py2 + pad_y], fill=(255, 255, 255))
            font = load_font(int(bh * 0.55), bold=False)
            # Auto-shrink if too wide
            tw, th = measure(draw, text, font)
            while tw > bw - 8 and font.size > 8:
                font = load_font(font.size - 1, bold=False)
                tw, th = measure(draw, text, font)
            cx = (px1 + px2) / 2 - tw / 2
            cy = (py1 + py2) / 2 - th / 2 - 2
            draw.text((cx, cy), text, fill=(40, 40, 40), font=font)
        elif kind == "label":
            if not text:
                draw.rectangle([px1, py1, px2, py2], fill=(255, 255, 255))
                continue
            draw.rectangle([px1, py1, px2, py2], fill=(255, 255, 255))
            font = load_font(int(bh * 0.55), bold=True)
            tw, th = measure(draw, text, font)
            cx = (px1 + px2) / 2 - tw / 2
            cy = (py1 + py2) / 2 - th / 2 - 2
            draw.text((cx, cy), text, fill=BRAND_BLUE, font=font)
    img.save(output_jpg, "JPEG", quality=90, optimize=True)


def main():
    if len(sys.argv) != 2:
        print("usage: finalize_004.py <dir>")
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
