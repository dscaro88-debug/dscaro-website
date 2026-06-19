#!/usr/bin/env python3
"""
Build precise masks for DS-DIN-005 using actual matrix vision API
box_2d coordinates (y1, x1, y2, x2) — coordinates are 0-1000 fractions
of W,H.
"""
import os
import sys
from PIL import Image, ImageDraw

JOBS = {
    # 主图_01: brand top-left (181,353,212,411 is text), product visible
    # Use approximate top-left block
    "主图_01.jpg": [
        (0, 0, 150, 280),         # top-left block area
    ],
    # 主图_02: brand top-left + 6 feature callouts (Chinese)
    "主图_02.jpg": [
        (0, 0, 140, 280),         # top-left
        (90, 50, 200, 480),        # left top feature
        (200, 50, 300, 480),      # left mid feature
        (310, 50, 410, 480),      # left bottom feature
        (90, 520, 200, 950),       # right top feature
        (200, 520, 300, 950),     # right mid feature
        (310, 520, 410, 950),     # right bottom feature
        (30, 280, 90, 720),       # center headline
    ],
    # 主图_03: model + 6 features
    "主图_03.jpg": [
        (0, 0, 150, 280),
        (181, 353, 212, 411),
        (375, 115, 404, 250),
        (480, 112, 509, 252),
        (626, 114, 652, 261),
        (181, 574, 212, 631),
        (515, 113, 541, 321),
        (591, 114, 620, 213),
        (181, 464, 212, 521),
        (111, 375, 172, 626),
        (230, 271, 260, 710),
        (411, 115, 437, 248),
    ],
    # 主图_04: brand + 4 features
    "主图_04.jpg": [
        (0, 0, 140, 280),
        (110, 50, 220, 480),      # big heading
        (220, 200, 320, 750),     # sub 1
        (330, 300, 430, 600),     # sub 2
        (500, 100, 600, 600),     # right side
    ],
    # 主图_05: brand + 成人围兜
    "主图_05.jpg": [
        (0, 0, 140, 280),
        (300, 350, 500, 700),     # 成人围兜 text
    ],
    # SKU_03_粉色L码.jpg: only brand
    "SKU_03_粉色L码.jpg": [
        (0, 0, 140, 280),
    ],
    # 详情_05: top section + size chart + product details
    "详情_05.jpg": [
        (0, 0, 140, 280),
        (0, 50, 200, 450),        # top section 宝贝信息
        (180, 50, 700, 950),      # size chart area
        (700, 30, 950, 950),      # product details
    ],
    # 详情_06: 4 features
    "详情_06.jpg": [
        (0, 0, 140, 280),
        (90, 100, 200, 400),      # 舒适面料
        (220, 100, 350, 500),     # sub
        (370, 100, 500, 500),     # sub
        (520, 100, 650, 500),     # sub
        (110, 350, 900, 700),     # main features
    ],
    # 详情_07: 防水易清洗 + 2 sub
    "详情_07.jpg": [
        (0, 0, 140, 280),
        (79, 314, 142, 683),      # 防水易清洗
        (259, 222, 287, 846),     # sub
        (294, 192, 321, 876),     # sub
    ],
    # 详情_10: 可拆卸设计
    "详情_10.jpg": [
        (0, 0, 140, 280),
        (110, 50, 220, 700),      # 可拆卸设计
        (220, 100, 400, 900),     # sub
    ],
    # 详情_11: 折叠收纳
    "详情_11.jpg": [
        (0, 0, 140, 280),
        (110, 218, 161, 745),     # 一卷即收
        (284, 411, 306, 526),     # 质地柔软
        (321, 258, 345, 706),     # 轻松折叠
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
        y1, y2 = min(y1, y2), max(y1, y2)
        x1, x2 = min(x1, x2), max(x1, x2)
        px1 = int(x1 / 1000.0 * W)
        py1 = int(y1 / 1000.0 * H)
        px2 = int(x2 / 1000.0 * W)
        py2 = int(y2 / 1000.0 * H)
        pad = 6
        draw.rectangle([max(0, px1 - pad), max(0, py1 - pad),
                         min(W, px2 + pad), min(H, py2 + pad)], fill=255)
    mask.save(mask_path)


def main():
    if len(sys.argv) != 2:
        print("usage: make_masks_005.py <dir>")
        sys.exit(1)
    d = sys.argv[1]
    out_dir = os.path.join(d, "_masks")
    os.makedirs(out_dir, exist_ok=True)
    for f in os.listdir(out_dir):
        os.remove(os.path.join(out_dir, f))
    for name in sorted(JOBS):
        src = os.path.join(d, name)
        if not os.path.exists(src):
            continue
        dst = os.path.join(out_dir, name.replace(".jpg", ".png"))
        make_mask(src, dst)
        print(f"mask {name} -> {os.path.basename(dst)}")


if __name__ == "__main__":
    main()
