#!/usr/bin/env python3
"""
DS-DIN-004 image rebrand — v2 approach.
For each text region, fill it with a sampled-and-blended background
(sampling non-text pixels from a surrounding ring), then draw the
replacement text on top.
"""
import os
import sys
import random
import math
from PIL import Image, ImageDraw, ImageFilter, ImageFont

FONT_CANDIDATES = [
    "/System/Library/Fonts/Helvetica.ttc",
    "/System/Library/Fonts/SFNSDisplay.ttf",
    "/Library/Fonts/Arial.ttf",
    "/System/Library/Fonts/Avenir.ttc",
    "/System/Library/Fonts/HelveticaNeue.ttc",
]

BOLD_CANDIDATES = [
    "/System/Library/Fonts/Supplemental/Arial Black.ttf",
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/Library/Fonts/Arial Bold.ttf",
    "/System/Library/Fonts/SFNSDisplay.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
]


def load_font(size, bold=False):
    candidates = BOLD_CANDIDATES if bold else FONT_CANDIDATES
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


def fill_region_with_surroundings(img, box, expand=40, samples=400, blur=3):
    """Fill the box with pixels sampled/blended from a surrounding ring
    (a band of thickness `expand` around the box). Then a Gaussian
    blur softens any hard edges between the filled region and the rest."""
    x1, y1, x2, y2 = box
    W, H = img.size
    x1, y1 = max(0, x1), max(0, y1)
    x2, y2 = min(W, x2), min(H, y2)
    bw, bh = x2 - x1, y2 - y1
    if bw <= 0 or bh <= 0:
        return img

    # Collect a pool of source pixels from the ring (outside the box, within expand px).
    pool = []
    for _ in range(samples):
        side = random.choice(["top", "bottom", "left", "right", "tl", "tr", "bl", "br"])
        for _ in range(50):  # try to find a non-overlapping pixel
            if side == "top":
                px = random.randint(max(0, x1 - expand), min(W - 1, x2 + expand))
                py = random.randint(max(0, y1 - expand), y1 - 1)
            elif side == "bottom":
                px = random.randint(max(0, x1 - expand), min(W - 1, x2 + expand))
                py = random.randint(y2 + 1, min(H - 1, y2 + expand))
            elif side == "left":
                px = random.randint(max(0, x1 - expand), x1 - 1)
                py = random.randint(max(0, y1 - expand), min(H - 1, y2 + expand))
            elif side == "right":
                px = random.randint(x2 + 1, min(W - 1, x2 + expand))
                py = random.randint(max(0, y1 - expand), min(H - 1, y2 + expand))
            elif side == "tl":
                px = random.randint(max(0, x1 - expand), x1 - 1)
                py = random.randint(max(0, y1 - expand), y1 - 1)
            elif side == "tr":
                px = random.randint(x2 + 1, min(W - 1, x2 + expand))
                py = random.randint(max(0, y1 - expand), y1 - 1)
            elif side == "bl":
                px = random.randint(max(0, x1 - expand), x1 - 1)
                py = random.randint(y2 + 1, min(H - 1, y2 + expand))
            else:  # br
                px = random.randint(x2 + 1, min(W - 1, x2 + expand))
                py = random.randint(y2 + 1, min(H - 1, y2 + expand))
            if 0 <= px < W and 0 <= py < H:
                pool.append(img.getpixel((px, py)))
                break

    if not pool:
        return img

    avg = tuple(sum(c[i] for c in pool) // len(pool) for i in range(3))

    # Use a blended fill: start with the average color, then add a soft gradient
    # by sampling local pixels (cheap "content-aware" fill).
    base = Image.new("RGB", (bw, bh), avg)
    base_px = base.load()

    # Sprinkle some sampled local pixels for texture
    for _ in range(samples // 4):
        sx = random.randint(0, bw - 1)
        sy = random.randint(0, bh - 1)
        c = random.choice(pool)
        # jitter
        c = tuple(max(0, min(255, c[i] + random.randint(-15, 15))) for i in range(3))
        base_px[sx, sy] = c

    # Light blur to blend
    base = base.filter(ImageFilter.GaussianBlur(radius=blur))

    # Paste base into original
    img.paste(base, (x1, y1))

    # Feather the edges by overlaying a feathered mask so the join is invisible
    mask = Image.new("L", (bw, bh), 0)
    mdraw = ImageDraw.Draw(mask)
    feather = max(4, min(bw, bh) // 6)
    mdraw.rectangle([feather, feather, bw - feather, bh - feather], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=feather // 2))
    # Blend: where mask is high, use the base color; where low, keep original
    blended = Image.composite(base, img.crop((x1, y1, x2, y2)), mask)
    img.paste(blended, (x1, y1))

    return img


def draw_text(img, box, text, font_size, color, bold=False, pad_ratio=0.15):
    draw = ImageDraw.Draw(img)
    font = load_font(font_size, bold=bold)
    tw, th = measure(draw, text, font)
    cx = (box[0] + box[2]) / 2 - tw / 2
    cy = (box[1] + box[3]) / 2 - th / 2 - 2
    # Subtle shadow for legibility on light backgrounds
    shadow_offset = max(1, font_size // 30)
    draw.text((cx + shadow_offset, cy + shadow_offset), text, fill=(0, 0, 0, 80) if len(color) == 4 else (180, 180, 180), font=font)
    draw.text((cx, cy), text, fill=color, font=font)


# Per-image job: list of (box_pct, text, kind, color)
#   kind = "logo" -> "DSCARO" wordmark, dark blue, white text (for on-product)
#          or green block (for top-left corner) — actually we'll use dark blue
#          text on a subtle white "pill" background
#   kind = "text" -> body copy, dark text on white-ish

JOBS = {
    "主图_01.jpg": [
        ([0.020, 0.020, 0.230, 0.085], "DSCARO", "logo_top"),
        ([0.350, 0.380, 0.650, 0.500], "DSCARO", "logo_on_product"),
    ],
    "主图_02.jpg": [
        ([0.020, 0.020, 0.230, 0.085], "DSCARO", "logo_top"),
        ([0.250, 0.080, 0.900, 0.180], "BPA-Free · Food-Grade Safe", "headline"),
    ],
    "主图_03.jpg": [
        ([0.020, 0.020, 0.230, 0.085], "DSCARO", "logo_top"),
        ([0.300, 0.080, 0.950, 0.180], "Stretch-Resistant & Tear-Proof", "headline"),
        ([0.200, 0.450, 0.800, 0.620], "DSCARO", "logo_on_product"),
    ],
    "主图_05.jpg": [
        ([0.200, 0.350, 0.800, 0.580], "DSCARO", "logo_on_product"),
    ],
    "SKU_01_静谧蓝.jpg": [
        ([0.020, 0.020, 0.230, 0.085], "DSCARO", "logo_top"),
        ([0.200, 0.400, 0.800, 0.620], "DSCARO", "logo_on_product"),
    ],
    "SKU_02_香槟粉.jpg": [
        ([0.020, 0.020, 0.230, 0.085], "DSCARO", "logo_top"),
        ([0.200, 0.400, 0.800, 0.620], "DSCARO", "logo_on_product"),
    ],
    "SKU_03_迷洁灰.jpg": [
        ([0.020, 0.020, 0.230, 0.085], "DSCARO", "logo_top"),
        ([0.200, 0.400, 0.800, 0.620], "DSCARO", "logo_on_product"),
    ],
    "详情_23.jpg": [
        ([0.020, 0.020, 0.230, 0.085], "DSCARO", "logo_top"),
        ([0.100, 0.100, 0.450, 0.180], "Rinse-Clean", "headline"),
        ([0.550, 0.100, 0.900, 0.180], "Boil-Safe", "headline"),
        ([0.100, 0.200, 0.900, 0.260], "Seamless one-piece — wipes clean in one rinse", "subhead"),
        ([0.100, 0.270, 0.900, 0.330], "Heat-resistant to 200°C — steam-sterilize with confidence", "subhead"),
        ([0.300, 0.500, 0.700, 0.620], "DSCARO", "logo_on_product"),
    ],
    "详情_24.jpg": [
        ([0.020, 0.020, 0.230, 0.085], "DSCARO", "logo_top"),
        ([0.150, 0.100, 0.850, 0.180], "Premium Food-Grade Silicone", "headline"),
        ([0.150, 0.190, 0.850, 0.250], "BPA-free, safety-tested silicone", "subhead"),
        ([0.150, 0.260, 0.850, 0.320], "Safe & Reliable", "subhead"),
        ([0.080, 0.520, 0.260, 0.580], "Material Curation", "label"),
        ([0.380, 0.520, 0.560, 0.580], "Safety Tested", "label"),
        ([0.680, 0.520, 0.860, 0.580], "Full Coverage", "label"),
        ([0.080, 0.720, 0.380, 0.840], "DSCARO", "logo_on_product"),
        ([0.580, 0.720, 0.880, 0.840], "DSCARO", "logo_on_product"),
    ],
    "详情_25.jpg": [
        ([0.020, 0.020, 0.230, 0.085], "DSCARO", "logo_top"),
        ([0.080, 0.080, 0.350, 0.160], "Color Range", "headline"),
        ([0.080, 0.200, 0.350, 0.280], "Summer-ready", "subhead"),
        ([0.080, 0.320, 0.350, 0.400], "Appetite Boost", "subhead"),
        ([0.400, 0.080, 0.800, 0.160], "3 Refreshing Colors", "headline"),
        ([0.450, 0.200, 0.750, 0.260], "Misty Grey", "subhead"),
        ([0.450, 0.300, 0.750, 0.360], "Tranquil Blue", "subhead"),
        ([0.450, 0.400, 0.750, 0.460], "Champagne Pink", "subhead"),
        ([0.600, 0.700, 0.850, 0.820], "DSCARO", "logo_on_product"),
        ([0.200, 0.700, 0.450, 0.820], "DSCARO", "logo_on_product"),
    ],
    "详情_26.jpg": [
        ([0.020, 0.020, 0.230, 0.085], "DSCARO", "logo_top"),
        ([0.150, 0.080, 0.850, 0.170], "Lightweight & Rollable", "headline"),
        ([0.100, 0.190, 0.900, 0.250], "Soft as a rubber band — folds without creasing", "subhead"),
        ([0.100, 0.270, 0.900, 0.330], "Travel-friendly, takes no space", "subhead"),
        ([0.150, 0.680, 0.500, 0.820], "DSCARO", "logo_on_product"),
    ],
    "详情_27.jpg": [
        ([0.020, 0.020, 0.230, 0.085], "DSCARO", "logo_top"),
        ([0.150, 0.080, 0.850, 0.170], "3D Leak-Proof Curved Fit", "headline"),
        ([0.100, 0.190, 0.900, 0.250], "Curved body fit + 3D leak-proof pocket — keeps clothes clean", "subhead"),
        ([0.100, 0.270, 0.900, 0.330], "Eat freely, stay clean — no more table mess", "subhead"),
        ([0.100, 0.550, 0.350, 0.700], "DSCARO", "logo_on_product"),
        ([0.500, 0.600, 0.850, 0.780], "DSCARO", "logo_on_product"),
    ],
    "详情_28.jpg": [
        ([0.080, 0.080, 0.350, 0.160], "Product Specifications", "headline"),
        ([0.150, 0.230, 0.850, 0.290], "Product: Adult Silicone Bib", "subhead"),
        ([0.150, 0.300, 0.850, 0.360], "Color: 3 options", "subhead"),
        ([0.150, 0.370, 0.850, 0.430], "Brand: DSCARO", "subhead"),
        ([0.150, 0.440, 0.850, 0.500], "Material: Silicone", "subhead"),
        ([0.150, 0.580, 0.850, 0.640], "Note: measurements may vary by 1-2cm — for reference only", "subhead"),
    ],
    "详情_29.jpg": [
        ([0.020, 0.020, 0.230, 0.085], "DSCARO", "logo_top"),
        ([0.150, 0.080, 0.850, 0.170], "Style Statements in Color", "headline"),
        ([0.150, 0.200, 0.850, 0.260], "Pick your color", "subhead"),
        ([0.300, 0.340, 0.700, 0.400], "Tranquil Blue", "subhead"),
        ([0.450, 0.600, 0.750, 0.750], "DSCARO", "logo_on_product"),
    ],
}


# Brand color (DS CARO deep blue)
BRAND_BLUE = (26, 54, 93)  # #1A365D


def process(img_path):
    img = Image.open(img_path).convert("RGB")
    W, H = img.size
    name = os.path.basename(img_path)
    if name not in JOBS:
        return
    for box_pct, text, kind in JOBS[name]:
        x1, y1, x2, y2 = box_pct
        box = (int(x1 * W), int(y1 * H), int(x2 * W), int(y2 * H))

        # Determine font size
        bw, bh = box[2] - box[0], box[3] - box[1]
        if kind == "logo_top":
            # DSCARO wordmark, brand blue
            img = fill_region_with_surroundings(img, box, expand=80, samples=600, blur=2)
            # Draw a thin white background "pill" for legibility
            draw = ImageDraw.Draw(img)
            pad = max(4, bh // 6)
            draw.rectangle([box[0] - pad, box[1] - pad, box[2] + pad, box[3] + pad],
                            fill=(255, 255, 255), outline=BRAND_BLUE, width=2)
            # Re-draw text centered with brand blue color
            font = load_font(int(bh * 0.55), bold=True)
            tw, th = measure(draw, text, font)
            cx = (box[0] + box[2]) / 2 - tw / 2
            cy = (box[1] + box[3]) / 2 - th / 2 - 2
            draw.text((cx, cy), text, fill=BRAND_BLUE, font=font)
        elif kind == "logo_on_product":
            # DSCARO wordmark on the product (silicone bib) — use the surrounding
            # silicone color, not white. So we just sample-fill with the bib color.
            img = fill_region_with_surroundings(img, box, expand=60, samples=500, blur=2)
            # Draw white text (silicon is colorful, white shows on all 3 colors)
            font = load_font(int(bh * 0.50), bold=True)
            draw = ImageDraw.Draw(img)
            tw, th = measure(draw, text, font)
            cx = (box[0] + box[2]) / 2 - tw / 2
            cy = (box[1] + box[3]) / 2 - th / 2 - 2
            draw.text((cx, cy), text, fill=(255, 255, 255), font=font)
        elif kind == "headline":
            img = fill_region_with_surroundings(img, box, expand=30, samples=400, blur=1)
            font = load_font(int(bh * 0.55), bold=True)
            draw = ImageDraw.Draw(img)
            tw, th = measure(draw, text, font)
            cx = (box[0] + box[2]) / 2 - tw / 2
            cy = (box[1] + box[3]) / 2 - th / 2 - 2
            draw.text((cx, cy), text, fill=BRAND_BLUE, font=font)
        elif kind == "subhead":
            img = fill_region_with_surroundings(img, box, expand=20, samples=300, blur=1)
            font = load_font(int(bh * 0.55), bold=False)
            draw = ImageDraw.Draw(img)
            tw, th = measure(draw, text, font)
            cx = (box[0] + box[2]) / 2 - tw / 2
            cy = (box[1] + box[3]) / 2 - th / 2 - 2
            draw.text((cx, cy), text, fill=(40, 40, 40), font=font)
        elif kind == "label":
            img = fill_region_with_surroundings(img, box, expand=20, samples=300, blur=1)
            font = load_font(int(bh * 0.55), bold=True)
            draw = ImageDraw.Draw(img)
            tw, th = measure(draw, text, font)
            cx = (box[0] + box[2]) / 2 - tw / 2
            cy = (box[1] + box[3]) / 2 - th / 2 - 2
            draw.text((cx, cy), text, fill=BRAND_BLUE, font=font)
    img.save(img_path, "JPEG", quality=88, optimize=True)


def main():
    if len(sys.argv) != 2:
        print("usage: rebrand_004.py <dir>")
        sys.exit(1)
    d = sys.argv[1]
    for name in sorted(JOBS):
        p = os.path.join(d, name)
        if not os.path.exists(p):
            print(f"MISSING: {p}")
            continue
        try:
            process(p)
            print(f"rebranded {name}")
        except Exception as e:
            print(f"FAIL {name}: {e}")
            import traceback; traceback.print_exc()


if __name__ == "__main__":
    main()
