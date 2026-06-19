#!/usr/bin/env python3
"""
DS-DIN-005 — full re-render of the 6 remaining images using PIL.
Skip LaMa inpainting. Each image is rendered from scratch as a clean
infographic with DSCARO branding.
"""
import os
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

BRAND_BLUE = (26, 54, 93)
DARK = (40, 40, 40)
WHITE = (255, 255, 255)
LIGHT_GRAY = (220, 220, 220)
ACCENT = (230, 126, 34)  # orange for highlights

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


def draw_dscaro_pill(draw, x1, y1, color=BRAND_BLUE, scale=0.05):
    """Draw DSCARO logo in a white pill with brand-blue border."""
    w = 1000  # assume 1000x1000 canvas
    font = load_font(int(w * scale), bold=True)
    tw, th = measure(draw, "DSCARO", font)
    pad_x, pad_y = 14, 8
    x2, y2 = x1 + tw + pad_x * 2, y1 + th + pad_y * 2
    draw.rectangle([x1, y1, x2, y2], outline=color, width=2)
    cx = (x1 + x2) / 2 - tw / 2
    cy = (y1 + y2) / 2 - th / 2 - 1
    draw.text((cx, cy), "DSCARO", fill=color, font=font)


def gradient_bg(w, h, top_color, bot_color):
    """Create a vertical gradient image."""
    img = Image.new("RGB", (w, h), top_color)
    draw = ImageDraw.Draw(img)
    for y in range(h):
        ratio = y / h
        r = int(top_color[0] * (1 - ratio) + bot_color[0] * ratio)
        g = int(top_color[1] * (1 - ratio) + bot_color[1] * ratio)
        b = int(top_color[2] * (1 - ratio) + bot_color[2] * ratio)
        draw.line([(0, y), (w, y)], fill=(r, g, b))
    return img


# ============== 主图_02: 6 feature callout layout ==============
def render_02(output_path, w=1000, h=1000):
    img = gradient_bg(w, h, (245, 248, 250), (220, 230, 240))
    draw = ImageDraw.Draw(img)
    draw_dscaro_pill(draw, 12, 12)

    # Headline
    title_f = load_font(38, bold=True)
    tw, th = measure(draw, "Detachable Bib", title_f)
    draw.text((w / 2 - tw / 2, 100), "Detachable Bib", fill=BRAND_BLUE, font=title_f)
    sub_f = load_font(20, bold=False)
    tw, th = measure(draw, "Quality Assured", sub_f)
    draw.text((w / 2 - tw / 2, 155), "Quality Assured", fill=DARK, font=sub_f)

    # 6 feature cards in 3x2 grid
    card_w = 280
    card_h = 280
    grid_x_start = 70
    grid_y_start = 230
    gap_x = 30
    gap_y = 30

    features = [
        ("Waterproof TPU", "Wipeable fabric, easy care", "💧"),
        ("Soft Edging", "Comfortable soft seams", "✨"),
        ("Detachable Design", "Removable pocket", "🔗"),
        ("12cm Buckle", "Multi-gear adjustable fit", "📏"),
        ("Foldable", "Travel-friendly storage", "🧳"),
        ("3D Pocket", "Catches spills, easy clean", "🥣"),
    ]
    for i, (title, body, _) in enumerate(features):
        col = i % 3
        row = i // 3
        x = grid_x_start + col * (card_w + gap_x)
        y = grid_y_start + row * (card_h + gap_y)
        # Card
        draw.rectangle([x, y, x + card_w, y + card_h], fill=WHITE, outline=BRAND_BLUE, width=3)
        # Number badge
        num_f = load_font(48, bold=True)
        draw.ellipse([x + 16, y + 16, x + 76, y + 76], fill=BRAND_BLUE)
        num = f"{i+1}"
        tw, th = measure(draw, num, num_f)
        draw.text((x + 46 - tw / 2, y + 18 - th / 2 - 2), num, fill=WHITE, font=num_f)
        # Title
        title_f2 = load_font(20, bold=True)
        tw, th = measure(draw, title, title_f2)
        draw.text((x + card_w / 2 - tw / 2, y + 100), title, fill=BRAND_BLUE, font=title_f2)
        # Body
        body_f = load_font(15, bold=False)
        for j, line in enumerate(body.split(", ")):
            tw, th = measure(draw, line, body_f)
            draw.text((x + card_w / 2 - tw / 2, y + 160 + j * 25), line, fill=DARK, font=body_f)
        # Divider
        draw.line([(x + 30, y + card_h - 60), (x + card_w - 30, y + card_h - 60)], fill=LIGHT_GRAY, width=1)
        # DSCARO tag
        tag_f = load_font(11, bold=True)
        tw, th = measure(draw, "DSCARO", tag_f)
        draw.text((x + card_w / 2 - tw / 2, y + card_h - 40), "DSCARO", fill=BRAND_BLUE, font=tag_f)

    # Bottom note
    note_f = load_font(16, bold=False)
    draw.text((w / 2, h - 50), "Detachable Adult Bib — Designed for Dignity at Mealtime", fill=BRAND_BLUE, font=note_f, anchor="mm")
    img.save(output_path, "JPEG", quality=92, optimize=True)


# ============== 主图_03: model wearing bib + 6 small features ==============
def render_03(output_path, w=1000, h=1000):
    img = gradient_bg(w, h, (235, 245, 250), (210, 220, 235))
    draw = ImageDraw.Draw(img)
    draw_dscaro_pill(draw, 12, 12)

    # Center area — silhouette of adult wearing bib
    # Use a simplified icon-style representation
    cx = w // 2
    # Head
    head_r = 80
    draw.ellipse([cx - head_r, 320, cx + head_r, 320 + head_r * 2], fill=(255, 220, 195), outline=BRAND_BLUE, width=3)
    # Body
    body_top = 320 + head_r * 2 + 10
    body_bot = 700
    draw.polygon([(cx - 130, body_top), (cx + 130, body_top),
                  (cx + 180, body_bot), (cx - 180, body_bot)], fill=(80, 100, 130), outline=BRAND_BLUE, width=3)
    # Bib (light blue oval on chest)
    bib_top = body_top + 40
    draw.ellipse([cx - 100, bib_top, cx + 100, bib_top + 160], fill=(135, 195, 230), outline=BRAND_BLUE, width=3)
    # Bib text
    bib_f = load_font(18, bold=True)
    tw, th = measure(draw, "DSCARO", bib_f)
    draw.text((cx - tw / 2, bib_top + 65), "DSCARO", fill=WHITE, font=bib_f)
    # Bib bottom crumb catcher
    draw.pieslice([cx - 110, bib_top + 130, cx + 110, bib_top + 200], 180, 360, fill=(100, 170, 210), outline=BRAND_BLUE, width=2)

    # Title
    title_f = load_font(34, bold=True)
    tw, th = measure(draw, "Adult Bib", title_f)
    draw.text((cx - tw / 2, 130), "Adult Bib", fill=BRAND_BLUE, font=title_f)

    # 6 small feature labels on left/right sides
    label_f = load_font(16, bold=True)
    label_left = ["Wipe-clean", "Soft edge", "Detachable"]
    label_right = ["12cm buckle", "Foldable", "3D pocket"]
    sub_f = load_font(13, bold=False)
    sub_left = ["Easy care", "Skin-friendly", "Snap design"]
    sub_right = ["Adjustable", "Travel-friendly", "Catches spills"]
    for i in range(3):
        y = 280 + i * 110
        # Left
        draw.text((40, y), label_left[i], fill=BRAND_BLUE, font=label_f)
        draw.text((40, y + 25), sub_left[i], fill=DARK, font=sub_f)
        draw.line([(40, y + 55), (220, y + 55)], fill=BRAND_BLUE, width=2)
        # Right
        tw, th = measure(draw, label_right[i], label_f)
        draw.text((w - 40 - tw, y), label_right[i], fill=BRAND_BLUE, font=label_f)
        tw, th = measure(draw, sub_right[i], sub_f)
        draw.text((w - 40 - tw, y + 25), sub_right[i], fill=DARK, font=sub_f)
        draw.line([(w - 220, y + 55), (w - 40, y + 55)], fill=BRAND_BLUE, width=2)

    # Bottom subtitle
    sub_f2 = load_font(18, bold=False)
    tw, th = measure(draw, "Detachable 3D pocket for dignity at mealtime", sub_f2)
    draw.text((cx - tw / 2, 750), "Detachable 3D pocket for dignity at mealtime", fill=BRAND_BLUE, font=sub_f2)

    # Brand footer
    foot_f = load_font(14, bold=True)
    draw.text((w / 2, h - 40), "DSCARO · Long-Term Care Supply", fill=BRAND_BLUE, font=foot_f, anchor="mm")
    img.save(output_path, "JPEG", quality=92, optimize=True)


# ============== 主图_05: product flat-lay with size ==============
def render_05(output_path, w=1000, h=1000):
    img = gradient_bg(w, h, (250, 245, 240), (240, 235, 225))
    draw = ImageDraw.Draw(img)
    draw_dscaro_pill(draw, 12, 12)

    # Title
    title_f = load_font(40, bold=True)
    tw, th = measure(draw, "Adult Bib", title_f)
    draw.text((w / 2 - tw / 2, 110), "Adult Bib", fill=BRAND_BLUE, font=title_f)
    sub_f = load_font(18, bold=False)
    tw, th = measure(draw, "Detachable · Waterproof · Machine Washable", sub_f)
    draw.text((w / 2 - tw / 2, 170), "Detachable · Waterproof · Machine Washable", fill=DARK, font=sub_f)

    # Bib illustration (centered)
    cx = w // 2
    cy = 500
    # Neck cutout at top
    bib_top = cy - 250
    bib_bot = cy + 220
    # Bib body
    draw.rounded_rectangle([cx - 220, bib_top + 40, cx + 220, bib_bot - 30], radius=40, fill=(100, 170, 210), outline=BRAND_BLUE, width=4)
    # Neck cutout (arc)
    draw.pieslice([cx - 70, bib_top - 30, cx + 70, bib_top + 90], 180, 360, fill=WHITE, outline=BRAND_BLUE, width=4)
    # Crumb catcher (bottom)
    draw.pieslice([cx - 240, bib_bot - 30, cx + 240, bib_bot + 130], 180, 360, fill=(80, 150, 195), outline=BRAND_BLUE, width=4)
    # DSCARO on bib
    bib_f = load_font(28, bold=True)
    tw, th = measure(draw, "DSCARO", bib_f)
    draw.text((cx - tw / 2, bib_top + 130), "DSCARO", fill=WHITE, font=bib_f)

    # Size callouts around the bib
    callout_f = load_font(20, bold=True)
    callout_sub_f = load_font(15, bold=False)
    callouts = [
        (200, bib_top + 70, "L 64cm", "Large"),
        (800, bib_top + 70, "XL 72cm", "Extra-Large"),
        (500, bib_bot + 200, "M 56cm", "Medium"),
    ]
    for x, y, size, label in callouts:
        # Connector line
        if x < cx:
            draw.line([(x + 60, y), (cx - 220, y)], fill=BRAND_BLUE, width=2)
        elif x > cx:
            draw.line([(x - 60, y), (cx + 220, y)], fill=BRAND_BLUE, width=2)
        # Box
        box_w, box_h = 130, 80
        draw.rectangle([x - box_w / 2, y - box_h / 2, x + box_w / 2, y + box_h / 2], fill=WHITE, outline=BRAND_BLUE, width=3)
        tw, th = measure(draw, size, callout_f)
        draw.text((x - tw / 2, y - 25), size, fill=BRAND_BLUE, font=callout_f)
        tw, th = measure(draw, label, callout_sub_f)
        draw.text((x - tw / 2, y + 5), label, fill=DARK, font=callout_sub_f)

    # Bottom
    foot_f = load_font(16, bold=True)
    draw.text((w / 2, h - 40), "DSCARO · Long-Term Care Supply", fill=BRAND_BLUE, font=foot_f, anchor="mm")
    img.save(output_path, "JPEG", quality=92, optimize=True)


# ============== SKU_03: 粉色 L 码 变体 ==============
def render_sku(output_path, w=1000, h=1000):
    img = gradient_bg(w, h, (255, 240, 245), (250, 220, 230))
    draw = ImageDraw.Draw(img)
    draw_dscaro_pill(draw, 12, 12)

    # Title
    title_f = load_font(36, bold=True)
    tw, th = measure(draw, "Pink / L Size", title_f)
    draw.text((w / 2 - tw / 2, 110), "Pink / L Size", fill=BRAND_BLUE, font=title_f)
    sub_f = load_font(20, bold=False)
    tw, th = measure(draw, "DS-DIN-005-01 · Champagne Pink · Large", sub_f)
    draw.text((w / 2 - tw / 2, 170), "DS-DIN-005-01 · Champagne Pink · Large", fill=DARK, font=sub_f)

    # Color swatch
    cx = w // 2
    draw.ellipse([cx - 220, 280, cx + 220, 720], fill=(245, 170, 195), outline=BRAND_BLUE, width=5)
    # Color name
    color_f = load_font(40, bold=True)
    tw, th = measure(draw, "PINK", color_f)
    draw.text((cx - tw / 2, 470), "PINK", fill=WHITE, font=color_f)

    # Size label
    size_box_w, size_box_h = 240, 100
    sx = cx - size_box_w // 2
    sy = 780
    draw.rectangle([sx, sy, sx + size_box_w, sy + size_box_h], fill=BRAND_BLUE)
    size_f = load_font(56, bold=True)
    tw, th = measure(draw, "L", size_f)
    draw.text((cx - tw / 2, sy + 18), "L", fill=WHITE, font=size_f)
    size_sub_f = load_font(18, bold=False)
    tw, th = measure(draw, "64cm × 36cm", size_sub_f)
    draw.text((cx - tw / 2, sy + 75), "64cm × 36cm", fill=WHITE, font=size_sub_f)

    # Footer
    foot_f = load_font(16, bold=True)
    draw.text((w / 2, h - 40), "DSCARO · Long-Term Care Supply", fill=BRAND_BLUE, font=foot_f, anchor="mm")
    img.save(output_path, "JPEG", quality=92, optimize=True)


# ============== 详情_07: Waterproof & Easy-clean ==============
def render_07(output_path, w=1000, h=1000):
    img = gradient_bg(w, h, (235, 245, 255), (215, 230, 250))
    draw = ImageDraw.Draw(img)
    draw_dscaro_pill(draw, 12, 12)

    # Title
    title_f = load_font(48, bold=True)
    tw, th = measure(draw, "Waterproof & Easy-clean", title_f)
    draw.text((w / 2 - tw / 2, 110), "Waterproof & Easy-clean", fill=BRAND_BLUE, font=title_f)
    sub_f = load_font(20, bold=False)
    tw, th = measure(draw, "TPU-coated · Wipe-clean · Quick dry", sub_f)
    draw.text((w / 2 - tw / 2, 175), "TPU-coated · Wipe-clean · Quick dry", fill=DARK, font=sub_f)

    # Center bib illustration with water droplets
    cx = w // 2
    cy = 580
    # Bib silhouette
    draw.rounded_rectangle([cx - 200, cy - 240, cx + 200, cy + 200], radius=40, fill=(100, 170, 210), outline=BRAND_BLUE, width=4)
    draw.pieslice([cx - 65, cy - 290, cx + 65, cy - 180], 180, 360, fill=WHITE, outline=BRAND_BLUE, width=4)
    # Crumb catcher
    draw.pieslice([cx - 220, cy + 180, cx + 220, cy + 320], 180, 360, fill=(80, 150, 195), outline=BRAND_BLUE, width=4)

    # Water droplets around bib
    droplet_f = load_font(20, bold=True)
    drop_color = (60, 140, 220)
    for (dx, dy) in [(180, 380), (840, 380), (140, 580), (860, 580), (200, 760), (820, 760), (cx, 380)]:
        draw.ellipse([dx - 18, dy - 22, dx + 18, dy + 22], fill=drop_color, outline=BRAND_BLUE, width=2)
        tw, th = measure(draw, "💧", droplet_f)
        # Replace emoji with text
        draw.text((dx - 6, dy - 12), "~", fill=WHITE, font=droplet_f)

    # DSCARO on bib
    bib_f = load_font(26, bold=True)
    tw, th = measure(draw, "DSCARO", bib_f)
    draw.text((cx - tw / 2, cy - 20), "DSCARO", fill=WHITE, font=bib_f)

    # 2 key points (left/right bottom)
    point_f = load_font(22, bold=True)
    sub_point_f = load_font(16, bold=False)
    points = [
        (180, 870, "Spills are no worry", "Liquids bead off the TPU surface"),
        (820, 870, "Wipe and reuse", "Damp cloth, ready in seconds"),
    ]
    for x, y, title, sub in points:
        tw, th = measure(draw, title, point_f)
        draw.text((x - tw / 2, y), title, fill=BRAND_BLUE, font=point_f)
        tw, th = measure(draw, sub, sub_point_f)
        draw.text((x - tw / 2, y + 30), sub, fill=DARK, font=sub_point_f)

    img.save(output_path, "JPEG", quality=92, optimize=True)


# ============== 详情_11: Roll-up Storage ==============
def render_11(output_path, w=1000, h=1000):
    img = gradient_bg(w, h, (240, 250, 245), (220, 240, 230))
    draw = ImageDraw.Draw(img)
    draw_dscaro_pill(draw, 12, 12)

    # Title
    title_f = load_font(46, bold=True)
    tw, th = measure(draw, "Roll-up Storage", title_f)
    draw.text((w / 2 - tw / 2, 110), "Roll-up Storage", fill=BRAND_BLUE, font=title_f)
    sub_f = load_font(20, bold=False)
    tw, th = measure(draw, "Folds flat for travel · Soft fabric", sub_f)
    draw.text((w / 2 - tw / 2, 175), "Folds flat for travel · Soft fabric", fill=DARK, font=sub_f)

    # Bib in 3 stages: flat → folding → rolled
    cx = w // 2
    cy = 480
    stages = [
        (180, "Flat",  (cx - 320, cy - 130, cx - 200, cy + 130)),
        (500, "Folding", (cx - 40, cy - 130, cx + 80, cy + 130)),
        (820, "Rolled", (cx + 200, cy - 80, cx + 320, cy + 80)),
    ]
    for (x, label, box) in stages:
        bx1, by1, bx2, by2 = box
        # Bib
        if label == "Flat":
            draw.rounded_rectangle([bx1, by1, bx2, by2], radius=20, fill=(100, 170, 210), outline=BRAND_BLUE, width=3)
        elif label == "Folding":
            # Half-folded appearance
            draw.rounded_rectangle([bx1, by1, bx2, by2 - 30], radius=20, fill=(100, 170, 210), outline=BRAND_BLUE, width=3)
            # Fold flap
            draw.polygon([(bx1, by1), (bx2, by1), (bx2, by1 + 60), (bx1 + 30, by1 + 80)], fill=(80, 150, 195), outline=BRAND_BLUE, width=2)
        else:
            # Rolled cylinder
            draw.rounded_rectangle([bx1, by1, bx2, by2], radius=60, fill=(100, 170, 210), outline=BRAND_BLUE, width=3)
            # Spiral lines
            for offset in [15, 30, 45, 60, 75]:
                # arc needs start <= end, so use 0, 360
                try:
                    draw.arc([bx1 + offset, by1 + 10, bx2 - offset, by2 - 10], 0, 360, fill=BRAND_BLUE, width=2)
                except Exception:
                    # Fallback: simple horizontal lines
                    draw.line([(bx1 + offset + 5, (by1 + by2) // 2), (bx2 - offset - 5, (by1 + by2) // 2)], fill=BRAND_BLUE, width=2)
        # Stage label
        lbl_f = load_font(18, bold=True)
        tw, th = measure(draw, label, lbl_f)
        draw.text((x - tw / 2, by2 + 25), label, fill=BRAND_BLUE, font=lbl_f)

    # Arrows between stages
    arrow_f = load_font(40, bold=True)
    draw.text((340, 460), "→", fill=BRAND_BLUE, font=arrow_f)
    draw.text((660, 460), "→", fill=BRAND_BLUE, font=arrow_f)

    # Bottom feature
    sub_f2 = load_font(22, bold=True)
    tw, th = measure(draw, "Soft texture · Convenient storage", sub_f2)
    draw.text((w / 2 - tw / 2, 800), "Soft texture · Convenient storage", fill=BRAND_BLUE, font=sub_f2)

    foot_f = load_font(16, bold=True)
    draw.text((w / 2, h - 50), "DSCARO · Long-Term Care Supply", fill=BRAND_BLUE, font=foot_f, anchor="mm")
    img.save(output_path, "JPEG", quality=92, optimize=True)


def main():
    if len(sys.argv) < 3:
        print("usage: render_005_v2.py <output_dir> <name1> [name2 ...]")
        sys.exit(1)
    out_dir = sys.argv[1]
    renderers = {
        "主图_02.jpg": render_02,
        "主图_03.jpg": render_03,
        "主图_05.jpg": render_05,
        "SKU_03_粉色L码.jpg": render_sku,
        "详情_07.jpg": render_07,
        "详情_11.jpg": render_11,
    }
    for name in sys.argv[2:]:
        if name in renderers:
            dst = os.path.join(out_dir, name)
            renderers[name](dst)
            print(f"rendered {dst}")
        else:
            print(f"no renderer for {name}")


if __name__ == "__main__":
    main()
