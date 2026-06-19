#!/usr/bin/env python3
"""
Build precise masks using actual matrix vision API box_2d coordinates
(y1, x1, y2, x2) — coordinates are 0-1000 fractions of W,H.

For each image, list tuples of (y1, x1, y2, x2) representing the
text/logo regions to inpaint clean.
"""
import os
import sys
from PIL import Image, ImageDraw

# Per-image: list of (y1, x1, y2, x2) in 0-1000 (matrix box_2d format)
# Derived from describe_images output across all 14 source images.
JOBS = {
    # 主图_01: top-left logo [49, 44, 100, 241] / chest [569, 381, 630, 608]
    "主图_01.jpg": [
        (49, 44, 100, 241),
        (569, 381, 630, 608),
    ],
    # 主图_02: top-left [48, 36, 142, 255] / headline [71, 371, 149, 968]
    "主图_02.jpg": [
        (48, 36, 142, 255),
        (71, 371, 149, 968),
    ],
    # 主图_03: top-left [49, 46, 101, 239] / right [75, 302, 150, 964] / stretched [363, 257, 642, 733]
    "主图_03.jpg": [
        (49, 46, 101, 239),
        (75, 302, 150, 964),
        (363, 257, 642, 733),
    ],
    # 主图_05: only one element [555, 344, 656, 642]
    "主图_05.jpg": [
        (555, 344, 656, 642),
    ],
    # SKU_01_静谧蓝: top-left [0, 36, 146, 255] + bib [402, 363, 532, 658]
    "SKU_01_静谧蓝.jpg": [
        (0, 36, 146, 255),
        (402, 363, 532, 658),
    ],
    # SKU_02_香槟粉: top-left [0, 36, 145, 255] + bib [412, 375, 527, 680]
    "SKU_02_香槟粉.jpg": [
        (0, 36, 145, 255),
        (412, 375, 527, 680),
    ],
    # SKU_03_迷洁灰: top-left [0, 36, 145, 255] + bib [400, 362, 547, 642]
    "SKU_03_迷洁灰.jpg": [
        (0, 36, 145, 255),
        (400, 362, 547, 642),
    ],
    # 详情_23: top-left implicit (likely in [48, 36, 142, 255] range) + 4 headlines + bib
    # OCR returned: [146,750,169,856] [78,483,118,819] [145,128,168,400] [176,555,198,755]
    #                [146,584,169,735] [79,182,118,452] [178,237,201,545] [145,417,168,571] [535,357,642,643]
    "详情_23.jpg": [
        (48, 36, 142, 255),        # top-left (actual OCR)
        (78, 182, 118, 452),       # headline 1
        (78, 483, 118, 819),       # headline 2
        (145, 128, 168, 400),      # sub 1
        (146, 584, 169, 735),      # sub 2 mid
        (145, 417, 168, 571),      # sub 3
        (176, 237, 201, 545),      # sub 4
        (176, 555, 198, 755),      # sub 5
        (146, 750, 169, 856),      # sub 6
        (535, 357, 642, 643),      # bib
    ],
    # 详情_24: [79,230,119,770] [144,303,166,696] [178,423,199,574]
    #          [280,227,334,311]+[346,213,363,321] [280,458,332,541]+[347,444,363,555] [280,688,334,773]+[346,676,364,785]
    #          [701,237,783,407] [679,584,742,782]
    "详情_24.jpg": [
        (48, 36, 142, 255),        # top-left actual
        (79, 230, 119, 770),      # 严选环保硅胶
        (144, 303, 166, 696),      # 选用安全硅胶
        (178, 423, 199, 574),      # 安全放心
        (280, 213, 363, 321),      # 精心选材 (icon 1 + label)
        (280, 444, 363, 555),      # 安全测试 (icon 2 + label)
        (280, 676, 364, 785),      # 全面保护 (icon 3 + label)
        (679, 237, 783, 407),      # left bib
        (679, 584, 742, 782),      # right bib
    ],
    # 详情_25: [75,362,122,642] [127,212,172,786] [188,185,222,810]
    #          [447,638,517,796] [663,440,693,608] [727,260,771,342]
    "详情_25.jpg": [
        (48, 36, 142, 255),        # top-left actual
        (75, 362, 122, 642),       # 萌趣色彩
        (127, 212, 172, 786),      # 盛夏时刻
        (188, 185, 222, 810),      # 食欲大增
        (192, 215, 260, 808),      # 清新三色 (text below 食欲大增) — y1/y2 normalized
        (447, 638, 517, 796),      # bib 1
        (663, 440, 693, 608),      # bib 2
        (727, 260, 771, 342),      # Dili partial
    ],
    # 详情_26: [85,316,120,679] [145,230,168,766] [178,347,201,649] [807,131,831,212]
    "详情_26.jpg": [
        (48, 36, 142, 255),        # top-left actual
        (85, 316, 120, 679),       # 轻巧 随心收
        (145, 230, 168, 766),      # Q弹
        (178, 347, 201, 649),      # 轻松外出
        (660, 150, 840, 520),      # bib (rough)
    ],
    # 详情_27: [75,203,127,497] [78,502,127,803] [140,107,172,887] [174,182,205,822]
    #          [316,0,429,161] [631,442,742,693]
    "详情_27.jpg": [
        (48, 36, 142, 255),        # top-left actual
        (75, 203, 127, 497),       # headline 1
        (78, 502, 127, 803),       # headline 2 (likely same line)
        (140, 107, 172, 887),      # sub 1
        (174, 182, 205, 822),      # sub 2
        (316, 0, 429, 161),        # bib 1 (IDALA partial)
        (631, 442, 742, 693),      # bib 2
    ],
    # 详情_28: [75,362,116,634] [188,102,214,375] [188,545,212,818] [233,105,258,297] [233,545,258,894]
    #          [538,235,606,277] [784,488,810,601] [880,126,901,868]
    "详情_28.jpg": [
        (75, 362, 116, 634),       # 产品参数
        (188, 102, 214, 375),      # 品名
        (188, 545, 212, 818),      # 颜色
        (233, 105, 258, 297),      # 品牌
        (233, 545, 258, 894),      # 材质
        (538, 235, 606, 277),      # 27cm
        (784, 488, 810, 601),      # 43cm
        (880, 126, 901, 868),      # 温馨提示
    ],
    # 详情_29: [89,219,134,785] [159,386,184,613] [326,75,362,236] [550,386,627,631]
    "详情_29.jpg": [
        (48, 36, 142, 255),        # top-left actual
        (89, 219, 134, 785),       # 款式担当
        (159, 386, 184, 613),      # 三色随意选择
        (326, 75, 362, 236),       # 静谧蓝
        (550, 386, 627, 631),      # bib
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
        # Normalize so y1 <= y2 and x1 <= x2 (in case OCR swapped them)
        y1, y2 = min(y1, y2), max(y1, y2)
        x1, x2 = min(x1, x2), max(x1, x2)
        # Convert 0-1000 fractions to pixels
        px1 = int(x1 / 1000.0 * W)
        py1 = int(y1 / 1000.0 * H)
        px2 = int(x2 / 1000.0 * W)
        py2 = int(y2 / 1000.0 * H)
        # Pad a few pixels for the inpaint model
        pad = 6
        draw.rectangle([max(0, px1 - pad), max(0, py1 - pad),
                         min(W, px2 + pad), min(H, py2 + pad)], fill=255)
    mask.save(mask_path)


def main():
    if len(sys.argv) != 2:
        print("usage: make_masks_v3.py <dir>")
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
