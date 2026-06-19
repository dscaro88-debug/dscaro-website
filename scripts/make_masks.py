#!/usr/bin/env python3
"""
Build per-image masks (white = area to inpaint, black = keep) for the
DS-DIN-004 rebrand. Mask rectangles are fractional coordinates of W,H
so they auto-scale.
"""
import os
import sys
from PIL import Image, ImageDraw

# Per-image, list of (box_pct_x1, y1, x2, y2) areas to wipe clean.
# Tuned to cover original DILIDALA / 嘀哩哒啦 logo + Chinese copy.
JOBS = {
    "主图_01.jpg": [
        (0.020, 0.020, 0.230, 0.085),   # top-left brand block
        (0.330, 0.370, 0.670, 0.510),   # logo on bib (mannequin's chest)
    ],
    "主图_02.jpg": [
        (0.020, 0.020, 0.230, 0.085),   # top-left block
        (0.230, 0.060, 0.920, 0.190),   # main Chinese headline
    ],
    "主图_03.jpg": [
        (0.020, 0.020, 0.230, 0.085),   # top-left block
        (0.300, 0.080, 0.950, 0.180),   # right-side Chinese headline
        (0.180, 0.440, 0.820, 0.640),   # bib text (stretched)
    ],
    "主图_05.jpg": [
        (0.190, 0.330, 0.810, 0.600),   # logo on bib
    ],
    "SKU_01_静谧蓝.jpg": [
        (0.020, 0.020, 0.230, 0.085),
        (0.190, 0.390, 0.810, 0.640),
    ],
    "SKU_02_香槟粉.jpg": [
        (0.020, 0.020, 0.230, 0.085),
        (0.190, 0.390, 0.810, 0.640),
    ],
    "SKU_03_迷洁灰.jpg": [
        (0.020, 0.020, 0.230, 0.085),
        (0.190, 0.390, 0.810, 0.640),
    ],
    "详情_23.jpg": [
        (0.020, 0.020, 0.230, 0.085),
        (0.080, 0.080, 0.470, 0.200),   # 过水即净
        (0.530, 0.080, 0.920, 0.200),   # 可沸水冲洗
        (0.080, 0.190, 0.920, 0.270),   # 一体式无痕
        (0.080, 0.260, 0.920, 0.340),   # 耐高温
        (0.290, 0.490, 0.710, 0.640),   # bib logo
    ],
    "详情_24.jpg": [
        (0.020, 0.020, 0.230, 0.085),
        (0.130, 0.080, 0.870, 0.190),   # 严选环保
        (0.130, 0.180, 0.870, 0.260),
        (0.130, 0.250, 0.870, 0.330),
        (0.060, 0.500, 0.280, 0.590),   # icon 1 label
        (0.360, 0.500, 0.580, 0.590),   # icon 2 label
        (0.660, 0.500, 0.880, 0.590),   # icon 3 label
        (0.060, 0.700, 0.400, 0.860),   # left bib logo
        (0.560, 0.700, 0.900, 0.860),   # right bib logo
    ],
    "详情_25.jpg": [
        (0.020, 0.020, 0.230, 0.085),
        (0.060, 0.060, 0.370, 0.170),   # 萌趣色彩
        (0.060, 0.190, 0.370, 0.300),   # 盛夏时刻
        (0.060, 0.300, 0.370, 0.420),   # 食欲大增
        (0.380, 0.060, 0.820, 0.170),   # 清新三色
        (0.430, 0.190, 0.770, 0.270),   # 迷洁灰
        (0.430, 0.290, 0.770, 0.370),
        (0.430, 0.390, 0.770, 0.470),
        (0.580, 0.680, 0.870, 0.840),
        (0.180, 0.680, 0.470, 0.840),
    ],
    "详情_26.jpg": [
        (0.020, 0.020, 0.230, 0.085),
        (0.130, 0.060, 0.870, 0.180),   # 轻巧随心收
        (0.080, 0.180, 0.920, 0.260),
        (0.080, 0.260, 0.920, 0.340),
        (0.130, 0.660, 0.520, 0.840),
    ],
    "详情_27.jpg": [
        (0.020, 0.020, 0.230, 0.085),
        (0.130, 0.060, 0.870, 0.180),
        (0.080, 0.180, 0.920, 0.260),
        (0.080, 0.260, 0.920, 0.340),
        (0.080, 0.530, 0.370, 0.720),
        (0.480, 0.580, 0.870, 0.800),
    ],
    "详情_28.jpg": [
        (0.060, 0.060, 0.370, 0.170),   # 产品参数
        (0.130, 0.220, 0.870, 0.300),   # 品名
        (0.130, 0.290, 0.870, 0.370),   # 颜色
        (0.130, 0.360, 0.870, 0.440),   # 品牌
        (0.130, 0.430, 0.870, 0.510),   # 材质
        (0.130, 0.570, 0.870, 0.650),   # 温馨提示
    ],
    "详情_29.jpg": [
        (0.020, 0.020, 0.230, 0.085),
        (0.130, 0.060, 0.870, 0.180),   # 款式担当
        (0.130, 0.190, 0.870, 0.270),   # 三色随意选择
        (0.280, 0.330, 0.720, 0.410),   # 静谧蓝
        (0.430, 0.580, 0.770, 0.770),
    ],
}


def make_mask(src_img, mask_path):
    img = Image.open(src_img).convert("RGB")
    W, H = img.size
    name = os.path.basename(src_img)
    if name not in JOBS:
        return
    mask = Image.new("L", (W, H), 0)  # black = keep
    draw = ImageDraw.Draw(mask)
    for box in JOBS[name]:
        x1, y1, x2, y2 = box
        px1, py1, px2, py2 = int(x1 * W), int(y1 * H), int(x2 * W), int(y2 * H)
        # Slight pad
        draw.rectangle([px1 - 4, py1 - 4, px2 + 4, py2 + 4], fill=255)
    mask.save(mask_path)


def main():
    if len(sys.argv) != 2:
        print("usage: make_masks.py <dir>")
        sys.exit(1)
    d = sys.argv[1]
    out_dir = os.path.join(d, "_masks")
    os.makedirs(out_dir, exist_ok=True)
    for name in sorted(JOBS):
        src = os.path.join(d, name)
        if not os.path.exists(src):
            continue
        dst = os.path.join(out_dir, name.replace(".jpg", ".png"))
        make_mask(src, dst)
        print(f"mask {name} -> _masks/{os.path.basename(dst)}")


if __name__ == "__main__":
    main()
