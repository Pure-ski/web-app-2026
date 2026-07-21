"""白底手寫字轉乾淨透明底：白色背景變全透明，深色墨跡保留、邊緣反鋸齒。

alpha = 255 - luminance（越深越不透明），RGB 統一成深墨色，
避免 mix-blend-multiply 疊多層時邊緣霧霧的髒感。

用法：
  ./.venv_gptimage/bin/python scripts/cutout_ink.py wm-zh2 wm-zh3 wm-en2 ...
"""

import sys
from PIL import Image

INK_COLOR = (44, 62, 80)  # 深墨色，貼近品牌 --ink


def cutout(name: str) -> None:
    src = f"public/world/{name}.png"
    im = Image.open(src).convert("RGB")
    px = im.load()
    out = Image.new("RGBA", im.size)
    po = out.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            lum = (r * 0.299 + g * 0.587 + b * 0.114)
            alpha = max(0, min(255, int(255 - lum)))
            # 低於雜訊閾值直接歸零，避免白底殘留霧感
            if alpha < 12:
                alpha = 0
            po[x, y] = (*INK_COLOR, alpha)
    out.save(f"public/world/{name}.png")
    print("cutout ok:", name)


if __name__ == "__main__":
    for n in sys.argv[1:]:
        cutout(n)
