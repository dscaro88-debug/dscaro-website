#!/usr/bin/env python3
"""
DS-DIN-005 详情_05 / 详情_06 — full re-render with PIL.
Skip LaMa inpainting entirely. Re-paint the product spec table and
features table from scratch on a clean white background.
"""
import os
import sys
from PIL import Image, ImageDraw, ImageFont

BRAND_BLUE = (26, 54, 93)
DARK = (40, 40, 40)
WHITE = (255, 255, 255)
LIGHT_GRAY = (220, 220, 220)
GREEN = (40, 130, 70)

FONT_BOLD = [
    "/System/Library/Fonts/Supplemental/Arial Black.ttf",
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/Library/Fonts/Arial Bold.ttf",
    "/System/Library/Fonts/SFNSDisplay.ttf",
]
FONT_REG = [
    "/System/Library/Fonts/SFNSDisplay.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
    "/Library/Fonts/Arial.ttf",
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


def render_05(output_path, w=1000, h=1000):
    """详情_05: size table + product info + DSCARO logo top-left"""
    img = Image.new("RGB", (w, h), WHITE)
    draw = ImageDraw.Draw(img)

    # DSCARO top-left in white pill (we ARE the white background, so use blue text)
    font = load_font(int(w * 0.05), bold=True)
    tw, th = measure(draw, "DSCARO", font)
    pad_x, pad_y = 14, 8
    x1, y1 = 12, 12
    x2, y2 = x1 + tw + pad_x * 2, y1 + th + pad_y * 2
    draw.rectangle([x1, y1, x2, y2], outline=BRAND_BLUE, width=2)
    cx = (x1 + x2) / 2 - tw / 2
    cy = (y1 + y2) / 2 - th / 2 - 1
    draw.text((cx, cy), "DSCARO", fill=BRAND_BLUE, font=font)

    # Title
    title_font = load_font(int(w * 0.045), bold=True)
    draw.text((60, 130), "Product Specifications", fill=BRAND_BLUE, font=title_font)
    sub_font = load_font(int(w * 0.022), bold=False)
    draw.text((60, 180), "Detachable Adult Bib · TPU + Polyester", fill=DARK, font=sub_font)

    # Size table — M / L / XL
    table_x = 60
    table_y = 260
    cell_w = 280
    cell_h = 100
    label_h = 60
    # Header row
    header_font = load_font(int(w * 0.028), bold=True)
    for i, label in enumerate(["M", "L", "XL"]):
        x = table_x + i * cell_w
        draw.rectangle([x, table_y, x + cell_w, table_y + label_h], fill=BRAND_BLUE)
        tw, th = measure(draw, label, header_font)
        cx = x + cell_w / 2 - tw / 2
        cy = table_y + label_h / 2 - th / 2 - 2
        draw.text((cx, cy), label, fill=WHITE, font=header_font)
    # Size data row
    data_font = load_font(int(w * 0.022), bold=False)
    for i, dims in enumerate([
        ["56cm long", "36cm wide", "19cm height"],
        ["64cm long", "36cm wide", "19cm height"],
        ["72cm long", "36cm wide", "19cm height"],
    ]):
        x = table_x + i * cell_w
        y = table_y + label_h
        draw.rectangle([x, y, x + cell_w, y + cell_h], outline=BRAND_BLUE, width=2)
        for j, line in enumerate(dims):
            tw, th = measure(draw, line, data_font)
            cx = x + cell_w / 2 - tw / 2
            cy = y + 12 + j * 28
            draw.text((cx, cy), line, fill=DARK, font=data_font)

    # Product details
    info_y = 480
    info_font = load_font(int(w * 0.024), bold=True)
    sub_info_font = load_font(int(w * 0.020), bold=False)
    info_lines = [
        ("Product", "Detachable Adult Bib"),
        ("Material", "TPU + Polyester"),
        ("Closure", "12cm Hook & Loop Buckle"),
        ("Pocket", "Detachable 3D Crumb Catcher"),
        ("Care", "Wipe-clean · Machine washable"),
        ("Use", "Elderly / Adult / Older children"),
    ]
    for i, (k, v) in enumerate(info_lines):
        y = info_y + i * 60
        draw.text((60, y), k, fill=BRAND_BLUE, font=info_font)
        draw.text((260, y), v, fill=DARK, font=sub_info_font)
        # divider line
        if i < len(info_lines) - 1:
            draw.line([(60, y + 40), (940, y + 40)], fill=LIGHT_GRAY, width=1)

    # Bottom note
    note_font = load_font(int(w * 0.018), bold=False)
    draw.text((60, h - 60), "Note: 1-2cm size variation may occur due to manual measurement.", fill=DARK, font=note_font)

    img.save(output_path, "JPEG", quality=92, optimize=True)


def render_06(output_path, w=1000, h=1000):
    """详情_06: 4 features grid + DSCARO top-left"""
    img = Image.new("RGB", (w, h), WHITE)
    draw = ImageDraw.Draw(img)

    # DSCARO top-left
    font = load_font(int(w * 0.05), bold=True)
    tw, th = measure(draw, "DSCARO", font)
    pad_x, pad_y = 14, 8
    x1, y1 = 12, 12
    x2, y2 = x1 + tw + pad_x * 2, y1 + th + pad_y * 2
    draw.rectangle([x1, y1, x2, y2], outline=BRAND_BLUE, width=2)
    cx = (x1 + x2) / 2 - tw / 2
    cy = (y1 + y2) / 2 - th / 2 - 1
    draw.text((cx, cy), "DSCARO", fill=BRAND_BLUE, font=font)

    # Title
    title_font = load_font(int(w * 0.045), bold=True)
    draw.text((60, 130), "Comfortable Fabric", fill=BRAND_BLUE, font=title_font)
    sub_font = load_font(int(w * 0.022), bold=False)
    draw.text((60, 180), "Soft, safe, and skin-friendly materials", fill=DARK, font=sub_font)

    # 4 feature cards in 2x2 grid
    card_w = 420
    card_h = 280
    card_x_start = 60
    card_y_start = 260
    gap_x = 40
    gap_y = 30

    features = [
        ("Comfortable", "Soft fabric\n\nSkin-friendly for daily wear"),
        ("Soft & Skin-friendly", "Non-toxic materials\n\nSafe for sensitive skin"),
        ("Non-toxic", "BPA-free TPU\n\nFood-grade certified"),
        ("Color-fast", "No fading after wash\n\nLong-lasting color"),
    ]
    for i, (title, body) in enumerate(features):
        col = i % 2
        row = i // 2
        x = card_x_start + col * (card_w + gap_x)
        y = card_y_start + row * (card_h + gap_y)
        # Card border
        draw.rectangle([x, y, x + card_w, y + card_h], outline=BRAND_BLUE, width=3)
        # Card header bar
        title_f = load_font(int(w * 0.03), bold=True)
        draw.rectangle([x, y, x + card_w, y + 70], fill=BRAND_BLUE)
        tw, th = measure(draw, title, title_f)
        draw.text((x + card_w / 2 - tw / 2, y + 18), title, fill=WHITE, font=title_f)
        # Card body
        body_f = load_font(int(w * 0.020), bold=False)
        for j, line in enumerate(body.split("\n")):
            tw, th = measure(draw, line, body_f)
            draw.text((x + card_w / 2 - tw / 2, y + 100 + j * 32), line, fill=DARK, font=body_f)

    # Bottom note
    note_font = load_font(int(w * 0.018), bold=False)
    draw.text((60, h - 50), "DS CARO — Comfortable, Safe, Reliable.", fill=BRAND_BLUE, font=note_font)

    img.save(output_path, "JPEG", quality=92, optimize=True)


def main():
    if len(sys.argv) < 3:
        print("usage: render_005_specs.py <output_dir> <name1> [name2 ...]")
        sys.exit(1)
    out_dir = sys.argv[1]
    for name in sys.argv[2:]:
        dst = os.path.join(out_dir, name)
        if "详情_05" in name:
            render_05(dst)
        elif "详情_06" in name:
            render_06(dst)
        else:
            print(f"skip {name}")
            continue
        print(f"rendered {dst}")


if __name__ == "__main__":
    main()
