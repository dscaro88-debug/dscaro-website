#!/usr/bin/env python3
"""
Build precise masks using box_2d from the matrix vision API
(y1, x1, y2, x2) — coordinates are 0-1000 fractions.

For each image we list (y1_frac, x1_frac, y2_frac, x2_frac) tuples
representing the text/logo regions to inpaint clean.
"""
import os
import sys
from PIL import Image, ImageDraw

# Per-image: list of [y1, x1, y2, x2] in 0-1000 (matrix box_2d format)
JOBS = {
    # 主图_01: top-left logo [49, 44, 100, 241] / chest logo [569, 381, 630, 608]
    "主图_01.jpg": [
        (49, 44, 100, 241),       # top-left brand block
        (569, 381, 630, 608),     # logo on bib
    ],
    # 主图_02: top-left [48, 36, 142, 255] / headline [71, 371, 149, 968]
    "主图_02.jpg": [
        (48, 36, 142, 255),       # top-left block
        (71, 371, 149, 968),      # main Chinese headline (大块)
    ],
    # 主图_03: top-left [49, 46, 101, 239] / right headline [75, 302, 150, 964] / stretched text [363, 257, 642, 733]
    "主图_03.jpg": [
        (49, 46, 101, 239),       # top-left block
        (75, 302, 150, 964),      # right headline
        (363, 257, 642, 733),     # stretched text on bib
    ],
    # 主图_05: only the bib center [555, 344, 656, 642]
    "主图_05.jpg": [
        (555, 344, 656, 642),
    ],
    # SKU_01_静谧蓝 / 02_香槟粉 / 03_迷洁灰 (similar layout — bib center + top-left)
    "SKU_01_静谧蓝.jpg": [
        (40, 30, 110, 220),       # top-left block (rough estimate)
        (450, 350, 600, 700),     # bib center
    ],
    "SKU_02_香槟粉.jpg": [
        (40, 30, 110, 220),
        (450, 350, 600, 700),
    ],
    "SKU_03_迷洁灰.jpg": [
        (40, 30, 110, 220),
        (450, 350, 600, 700),
    ],
    # 详情_23: top-left [48, 36, 142, 255] + 2 headlines + 2 sub-texts + bib logo
    "详情_23.jpg": [
        (48, 36, 142, 255),
        (90, 100, 180, 460),      # 过水即净
        (90, 540, 180, 900),      # 可沸水冲洗
        (200, 100, 270, 900),     # 一体式无痕
        (280, 100, 340, 900),     # 耐高温
        (490, 290, 640, 710),     # bib center
    ],
    "详情_24.jpg": [
        (50, 30, 120, 250),
        (90, 150, 200, 850),      # 严选环保硅胶
        (180, 150, 260, 850),
        (250, 150, 330, 850),
        (510, 60, 590, 280),      # icon 1
        (510, 360, 590, 580),     # icon 2
        (510, 660, 590, 880),     # icon 3
        (700, 60, 860, 400),      # left bib
        (700, 560, 860, 900),     # right bib
    ],
    "详情_25.jpg": [
        (40, 30, 110, 220),
        (80, 60, 170, 370),       # 萌趣色彩
        (200, 60, 280, 370),      # 盛夏时刻
        (320, 60, 400, 370),      # 食欲大增
        (80, 380, 170, 800),      # 清新三色
        (200, 450, 270, 770),     # 迷洁灰
        (300, 450, 370, 770),
        (400, 450, 470, 770),
        (700, 600, 840, 850),     # bib 1
        (700, 200, 840, 450),     # bib 2
    ],
    "详情_26.jpg": [
        (50, 30, 120, 250),
        (80, 150, 180, 850),      # 轻巧 随心收
        (190, 100, 260, 900),     # Q弹
        (270, 100, 340, 900),     # 轻松外出
        (660, 150, 840, 520),     # bib
    ],
    "详情_27.jpg": [
        (50, 30, 120, 250),
        (80, 150, 180, 850),
        (190, 100, 260, 900),
        (270, 100, 340, 900),
        (550, 100, 700, 370),     # IDALA partial
        (600, 500, 780, 850),     # DILIDALA main
    ],
    "详情_28.jpg": [
        (80, 80, 160, 350),       # 产品参数
        (230, 150, 290, 850),     # 品名
        (300, 150, 360, 850),     # 颜色
        (370, 150, 430, 850),     # 品牌
        (440, 150, 500, 850),     # 材质
        (580, 150, 650, 850),     # 温馨提示
    ],
    "详情_29.jpg": [
        (50, 30, 120, 250),
        (80, 150, 180, 850),      # 款式担当
        (200, 150, 270, 850),     # 三色随意选择
        (340, 280, 410, 700),     # 静谧蓝
        (600, 450, 750, 770),     # bib
    ],
}


def make_mask(src_img, mask_path):
    img = Image.open(src_img).convert("RGB")
    W, H = img.size
    name = os.path.basename(src_img)
    if name not in JOBS:
        return
    mask = Image.new("L", (W, H), 0)
    draw = ImageDraw.Draw(mask)
    for y1, x1, y2, x2 in JOBS[name]:
        # Convert 0-1000 fractions to pixels
        px1 = int(x1 / 1000.0 * W)
        py1 = int(y1 / 1000.0 * H)
        px2 = int(x2 / 1000.0 * W)
        py2 = int(y2 / 1000.0 * H)
        # Pad
        pad = 4
        draw.rectangle([max(0, px1 - pad), max(0, py1 - pad),
                         min(W, px2 + pad), min(H, py2 + pad)], fill=255)
    mask.save(mask_path)


def main():
    if len(sys.argv) != 2:
        print("usage: make_masks_v2.py <dir>")
        sys.exit(1)
    d = sys.argv[1]
    out_dir = os.path.join(d, "_masks")
    os.makedirs(out_dir, exist_ok=True)
    # Clean old masks
    for f in os.listdir(out_dir):
        os.remove(os.path.join(out_dir, f))
    for name in sorted(JOBS):
        src = os.path.join(d, name)
        if not os.path.exists(src):
            print(f"missing: {src}")
            continue
        dst = os.path.join(out_dir, name.replace(".jpg", ".png"))
        make_mask(src, dst)
        print(f"mask {name} -> {os.path.basename(dst)}")


if __name__ == "__main__":
    main()
