"""重新生成卡片背景紙質紋理（含滑雪用品浮雕圖案）與純愛印章 logo。

用法：
  cd /Users/handsomefun/Downloads/Dan-Agent
  export OPENAI_API_KEY=$(grep OPENAI_API_KEY .env | cut -d= -f2-)
  ./.venv_gptimage/bin/python pureski-website/scripts/gen_texture_assets.py
"""

import base64
import os

from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

OUT_DIR = "/Users/handsomefun/Downloads/Dan-Agent/pureski-website/public/world"
BRAND_DIR = "/Users/handsomefun/Downloads/Dan-Agent/pureski-website/public/brand"

TEXTURE_STYLE = (
    "Warm cream off-white color (#FBF5EC tone), soft high-end editorial quality, "
    "no text, no watermark, no people, subtle and minimal, gentle natural lighting."
)

ASSETS = [
    {
        "id": "shiori-portrait",
        "out_dir": OUT_DIR,
        "size": "1024x1536",
        "background": "opaque",
        "format": "jpeg",
        "prompt": (
            "A tactile paper/linen texture background in warm cream tone, with a subtle embossed "
            "illustration along the bottom third: a pair of crossed skis and ski poles, plus a small "
            "snowboard and goggles, drawn as a delicate debossed/letterpress impression pressed into "
            "the paper fibers (same technique as blind embossing on fine cardstock) — very subtle, "
            "tone-on-tone, barely visible relief, no ink, no color contrast, just texture and shadow. "
            "The top two-thirds of the frame stays plain paper texture with visible fiber grain. "
            + TEXTURE_STYLE
        ),
    },
    {
        "id": "shiori-landscape",
        "out_dir": OUT_DIR,
        "size": "1536x1024",
        "background": "opaque",
        "format": "jpeg",
        "prompt": (
            "A tactile paper/linen texture background in warm cream tone, wide horizontal format, with "
            "a subtle embossed illustration along the bottom: skis, ski poles, a snowboard, and goggles "
            "arranged in a loose horizontal row, drawn as a delicate debossed/letterpress impression "
            "pressed into the paper fibers — very subtle, tone-on-tone, barely visible relief, no ink, "
            "no color contrast, just texture and shadow. The top portion stays plain paper texture with "
            "visible fiber grain. " + TEXTURE_STYLE
        ),
    },
    {
        "id": "hanko-pureai",
        "out_dir": BRAND_DIR,
        "size": "1024x1024",
        "background": "transparent",
        "format": "png",
        "prompt": (
            "A hand-drawn marker-style logo mark of two Japanese kanji characters '純愛' (jun ai), "
            "thick bold brush/marker strokes in vivid pink-magenta color (#D875DA), with small white "
            "highlight streaks along the strokes like a paint marker, plus one or two tiny small yellow "
            "spark/sparkle accents near the characters, isolated on a fully transparent background, "
            "square balanced composition, playful streetwear-sticker energy, no other text, no black "
            "background, no border, no shadow, nothing else in the frame."
        ),
    },
]


def main() -> None:
    for asset in ASSETS:
        os.makedirs(asset["out_dir"], exist_ok=True)
        ext = "png" if asset["format"] == "png" else "jpg"
        out_path = os.path.join(asset["out_dir"], f"{asset['id']}.{ext}")
        print(f"生成中：{asset['id']} ...")
        kwargs = dict(
            model="gpt-image-1",
            prompt=asset["prompt"],
            size=asset["size"],
            quality="high",
            output_format=asset["format"],
        )
        if asset["background"] == "transparent":
            kwargs["background"] = "transparent"
        response = client.images.generate(**kwargs)
        with open(out_path, "wb") as f:
            f.write(base64.b64decode(response.data[0].b64_json))
        print(f"  -> {out_path}")


if __name__ == "__main__":
    main()
