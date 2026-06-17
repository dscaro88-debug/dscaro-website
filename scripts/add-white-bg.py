"""
AI 批量加白底+投影（轻量方案：不用 rembg 抠图，直接给原图加白底边和柔光投影）
- 输入：DS-DIN-002 / DS-DIN-003 的 19 + 5 = 24 张主图/SKU 变体
- 输出：覆盖到目标路径
- 不处理详情图（保留原样）
"""
from PIL import Image, ImageDraw, ImageFilter
from pathlib import Path
import sys

DST_002 = Path("/tmp/dscaro-repo-extracted/dscaro88-debug-dscaro-website-ccb10ee/public/products/dining-solutions/DS-DIN-002")
DST_003 = Path("/tmp/dscaro-repo-extracted/dscaro88-debug-dscaro-website-ccb10ee/public/products/dining-solutions/DS-DIN-003")

# 要处理的文件（主图 01-05 + SKU 06-19 = 19 张；详情图 20-23 不动）
TARGETS_002 = [f"{i:02d}-main.jpg" for i in range(1, 6)] + [
    f"{i:02d}-pattern-{name}.jpg" for i, name in enumerate([
        "pearl-necklace",  # 06
        "emerald-necklace",  # 07
        "crystal-bridal",  # 08
        "peony-embroidery",  # 09
        "hummingbird-embroidery",  # 10
        "phoenix-blue",  # 11
        "phoenix-feather",  # 12
        "edelweiss",  # 13
        "purple-floral",  # 14
        "bamboo",  # 15
        "lotus",  # 16
        "floral-18",  # 17
        "floral-17",  # 18
        "floral-13",  # 19
    ], start=6)
]

# 003 只处理主图 01-05
TARGETS_003 = [f"{i:02d}-main.jpg" for i in range(1, 6)]


def add_white_bg_with_shadow(src_path: Path, pad_ratio: float = 0.08, shadow_strength: int = 18):
    """读取原图，加白底+底部柔光阴影，输出覆盖"""
    img = Image.open(src_path).convert("RGBA")
    w, h = img.size
    # 1. 创建更大的白色画布
    pad = int(max(w, h) * pad_ratio)
    canvas_w = w + 2 * pad
    canvas_h = h + 2 * pad
    canvas = Image.new("RGB", (canvas_w, canvas_h), (255, 255, 255))

    # 2. 画底部柔光阴影（在白色画布上，原图将覆盖其上方）
    # 阴影位置：原图底部下方
    shadow_layer = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow_layer)
    # 椭圆阴影
    shadow_w = int(w * 0.85)
    shadow_h = int(h * 0.08)
    shadow_x = (canvas_w - shadow_w) // 2
    shadow_y = pad + h - int(h * 0.03)
    # 多层 alpha 渐变（用 3-4 个椭圆叠加）
    for i, alpha in enumerate([15, 25, 18, 8]):
        offset = i * 2
        shadow_draw.ellipse(
            [shadow_x - offset, shadow_y - offset, shadow_x + shadow_w + offset, shadow_y + shadow_h + offset],
            fill=(0, 0, 0, alpha)
        )
    shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(radius=shadow_strength))
    canvas.paste(shadow_layer, (0, 0), shadow_layer)

    # 3. 把原图粘贴到画布中央
    # 如果原图有透明背景，保留透明效果；否则直接贴
    if img.mode == "RGBA" and img.split()[-1].getextrema()[0] < 255:
        # 有透明通道
        canvas.paste(img, (pad, pad), img)
    else:
        # 没有透明通道，直接贴
        canvas.paste(img, (pad, pad))

    # 4. 锐化
    canvas = canvas.filter(ImageFilter.UnsharpMask(radius=1, percent=80, threshold=2))

    # 5. 输出覆盖
    canvas.convert("RGB").save(src_path, "JPEG", quality=92, optimize=True)
    return canvas_w, canvas_h


def process_directory(dstdir: Path, targets: list[str], label: str):
    print(f"\n=== {label} ({dstdir.name}) ===")
    print(f"待处理: {len(targets)} 张")
    success = 0
    for fname in targets:
        src = dstdir / fname
        if not src.exists():
            print(f"  ⚠ 缺失: {fname}")
            continue
        try:
            old_size = src.stat().st_size
            new_w, new_h = add_white_bg_with_shadow(src)
            new_size = src.stat().st_size
            print(f"  ✓ {fname}: {new_w}x{new_h}px, {old_size//1024}KB → {new_size//1024}KB")
            success += 1
        except Exception as e:
            print(f"  ✗ {fname}: {e}")
    print(f"完成: {success}/{len(targets)}")
    return success


if __name__ == "__main__":
    s1 = process_directory(DST_002, TARGETS_002, "DS-DIN-002 (高端装饰款)")
    s2 = process_directory(DST_003, TARGETS_003, "DS-DIN-003 (失智症趣味款)")
    print(f"\n🎉 总计处理: {s1 + s2} 张图")
