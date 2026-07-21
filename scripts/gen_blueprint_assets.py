"""生成手繪工程藍圖風格的 ski/snowboard 設計底稿（白底墨線，去背後成透明浮水印）。

白底＋深色墨線線稿，生成後用 scripts/cutout_ink.py 轉真透明 alpha
（alpha = 255 - luminance），比直接生成透明底更乾淨、線條更銳利。

用法：
  cd /Users/handsomefun/Downloads/Dan-Agent
  export OPENAI_API_KEY=$(grep OPENAI_API_KEY .env | cut -d= -f2-)
  ./.venv_gptimage/bin/python pureski-website/scripts/gen_blueprint_assets.py
  ./.venv_gptimage/bin/python pureski-website/scripts/cutout_ink.py bp-ski bp-snowboard bp-carve bp-boot bp-goggles bp-binding
"""

import base64
import os

from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

OUT_DIR = "/Users/handsomefun/Downloads/Dan-Agent/pureski-website/public/world"

STYLE = (
    "Hand-drawn technical blueprint / patent-drawing style, fine black ink pen line work on a "
    "pure flat white background, thin uniform stroke weight, precise but slightly imperfect "
    "hand-drafted lines (not vector-perfect CAD), delicate dimension lines with small arrowheads, "
    "tiny measurement tick marks, subtle cross-hatching for shading only where needed, no color, "
    "no grey fill, no photo texture, no watermark, no logo, no people. Pure white background, "
    "high contrast black linework only."
)

ASSETS = [
    {
        "id": "bp-ski",
        "size": "1536x1024",
        "prompt": (
            "Technical side-profile diagram of a single alpine ski, showing camber and rocker curve "
            "exaggerated with a dashed centerline, dimension arrows marking tip length / waist width / "
            "tail length, small annotation leader lines pointing to edge and base construction layers "
            "in cross-section at one end. Centered, filling most of the frame width. " + STYLE
        ),
    },
    {
        "id": "bp-snowboard",
        "size": "1536x1024",
        "prompt": (
            "Technical top-down diagram of a snowboard deck outline, showing sidecut radius arcs, "
            "waist width and effective edge dimension lines, stance width marks with small binding "
            "insert circles, a directional arrow indicating nose/tail. Centered, filling most of the "
            "frame width. " + STYLE
        ),
    },
    {
        "id": "bp-carve",
        "size": "1536x1024",
        "prompt": (
            "Technical overhead diagram of a carving ski turn: a pair of parallel curved arcs tracing "
            "an S-shaped carved turn path on snow, with small angle-measurement arcs, edge-angle "
            "annotation lines, and directional arrows showing the turn sequence. Diagrammatic, "
            "engineering-drawing feel, centered. " + STYLE
        ),
    },
    {
        "id": "bp-boot",
        "size": "1024x1024",
        "prompt": (
            "Technical side-profile diagram of a ski boot, exploded-view style with a few construction "
            "lines separating shell / liner / buckle components, small dimension and flex-index "
            "annotation marks, centered composition. " + STYLE
        ),
    },
    {
        "id": "bp-goggles",
        "size": "1024x1024",
        "prompt": (
            "Technical front-view diagram of ski goggles, symmetrical, with lens curvature dimension "
            "arcs, strap tension annotation lines, small measurement tick marks along the frame edge, "
            "centered composition. " + STYLE
        ),
    },
    {
        "id": "bp-binding",
        "size": "1024x1024",
        "prompt": (
            "Technical side diagram of a ski binding mechanism, showing toe and heel piece with spring "
            "release mechanism cutaway lines, small DIN-scale dial annotation, dimension arrows, "
            "centered composition. " + STYLE
        ),
    },
]


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    for asset in ASSETS:
        out_path = os.path.join(OUT_DIR, f"{asset['id']}.png")
        print(f"生成中：{asset['id']} ...")
        response = client.images.generate(
            model="gpt-image-2",
            prompt=asset["prompt"],
            size=asset["size"],
            quality="high",
            output_format="png",
        )
        with open(out_path, "wb") as f:
            f.write(base64.b64decode(response.data[0].b64_json))
        print(f"  -> {out_path}")


if __name__ == "__main__":
    main()
