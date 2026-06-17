#!/usr/bin/env python3
"""
Add clean white background + soft shadow to product main/SKU images.
Detail images pass through unchanged.
Output: same path, overwrites the source (we work in our local repo's public/).
"""
import os
import sys
from PIL import Image, ImageFilter, ImageOps

def add_white_bg(src_path, dst_path, max_dim=1600, padding_pct=0.06, shadow_pct=0.025):
    img = Image.open(src_path).convert("RGBA")
    # Resize down to max_dim while keeping aspect
    w, h = img.size
    scale = min(1.0, max_dim / max(w, h))
    if scale < 1.0:
        img = img.resize((int(w * scale), int(h * scale)), Image.LANCZOS)
    w, h = img.size

    # Estimate the product bounding box from non-white / non-transparent pixels
    # Use alpha if present, else use pixel luma
    alpha = img.split()[3]
    bbox = alpha.getbbox()
    if bbox is None:
        # No alpha — assume background is white-ish
        gray = img.convert("L")
        bw, bh = gray.size
        # Find non-white pixels
        non_white = gray.point(lambda p: 0 if p > 245 else 255)
        bbox = non_white.getbbox()
    if bbox is None or bbox[2] - bbox[0] < 10 or bbox[3] - bbox[1] < 10:
        # Couldn't find product — just use full image
        bbox = (0, 0, w, h)
    prod_w = bbox[2] - bbox[0]
    prod_h = bbox[3] - bbox[1]
    prod = img.crop(bbox)

    # Canvas with product centered + padding
    pad = int(max(prod.size) * padding_pct)
    canvas_w = prod_w + pad * 2
    canvas_h = prod_h + pad * 2
    canvas = Image.new("RGBA", (canvas_w, canvas_h), (255, 255, 255, 255))

    # Build a soft shadow for the product
    shadow_size = (prod.size[0] + int(prod.size[0] * shadow_pct * 2),
                   prod.size[1] + int(prod.size[1] * shadow_pct * 2))
    shadow = Image.new("RGBA", shadow_size, (0, 0, 0, 0))
    # Solid product silhouette as shadow source
    silhouette = Image.new("L", prod.size, 0)
    prod_alpha = prod.split()[3]
    silhouette.paste(prod_alpha, (0, 0))
    # Place silhouette into shadow with offset + blur
    offset = (int(prod.size[0] * shadow_pct), int(prod.size[1] * shadow_pct))
    shadow.paste(silhouette, offset, silhouette)
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=max(2, int(max(prod.size) * 0.012))))
    # Reduce shadow alpha
    shadow = shadow.point(lambda p: int(p * 0.18))
    # Composite shadow onto canvas
    canvas.alpha_composite(shadow, (pad - offset[0], pad - offset[1]))
    # Composite product on top
    canvas.alpha_composite(prod, (pad, pad))

    canvas = canvas.convert("RGB")
    canvas.save(dst_path, "JPEG", quality=88, optimize=True)
    return canvas.size

def main():
    if len(sys.argv) < 3:
        print("usage: process.py <input_dir> <output_dir> [prefix_filter]")
        sys.exit(1)
    src_dir, dst_dir = sys.argv[1], sys.argv[2]
    prefix = sys.argv[3] if len(sys.argv) > 3 else None
    os.makedirs(dst_dir, exist_ok=True)
    processed = 0
    for name in sorted(os.listdir(src_dir)):
        if not name.lower().endswith((".jpg", ".jpeg", ".png")):
            continue
        if prefix and not name.startswith(prefix):
            continue
        src = os.path.join(src_dir, name)
        dst = os.path.join(dst_dir, name)
        try:
            size = add_white_bg(src, dst)
            print(f"  {name}: {size}")
            processed += 1
        except Exception as e:
            print(f"  SKIP {name}: {e}", file=sys.stderr)
    print(f"\n{processed} images processed into {dst_dir}")

if __name__ == "__main__":
    main()
