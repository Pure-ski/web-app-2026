"""生成 Pure Ski 網站「山的一天」背景素材（透明底 PNG）。

用法：
  cd /Users/handsomefun/Downloads/Dan-Agent
  export OPENAI_API_KEY=$(grep OPENAI_API_KEY .env | cut -d= -f2-)
  ./.venv_gptimage/bin/python pureski-website/scripts/gen_web_assets.py
"""

import base64
import os

from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

OUT_DIR = "/Users/handsomefun/Downloads/Dan-Agent/pureski-website/public/world"

STYLE = (
    "Soft pastel color grade, bright airy Japanese winter aesthetic, gentle morning alpine light, "
    "high-end editorial quality, no text, no watermark, no people."
)

ASSETS = [
    {
        "id": "cloud-a",
        "size": "1536x1024",
        "prompt": (
            "A single fluffy photorealistic cumulus cloud, isolated on a fully transparent background. "
            "Soft white with very subtle warm-pink underlight, gentle volumetric shading, crisp silhouette "
            "edges fading into wispy translucency. The cloud is wide and horizontal, centered, and nothing "
            "else is in the frame. " + STYLE
        ),
    },
    {
        "id": "cloud-b",
        "size": "1536x1024",
        "prompt": (
            "A wide cluster of soft photorealistic clouds forming a loose horizontal band, isolated on a "
            "fully transparent background. Pale white with faint cool blue shadows underneath, edges wispy "
            "and translucent. Nothing else in the frame. " + STYLE
        ),
    },
    {
        "id": "ridge-far",
        "size": "1536x1024",
        "prompt": (
            "A distant snowy mountain range panorama in Hokkaido, rendered as a hazy pale blue-grey layer "
            "for parallax scenery. The mountains fill roughly the bottom half of the frame and reach both "
            "left and right edges; everything above the ridgeline is fully transparent. Soft atmospheric "
            "haze makes the range feel far away, minimal detail, flat pastel tones. The bottom edge of the "
            "frame is completely filled by the mountain mass. " + STYLE
        ),
    },
    {
        "id": "ridge-near",
        "size": "1536x1024",
        "prompt": (
            "A closer snowy alpine ridge in Hokkaido covered in fresh white powder snow, rendered as a "
            "foreground parallax layer. The ridge fills roughly the bottom half of the frame reaching both "
            "left and right edges; everything above the snow ridgeline is fully transparent. Soft sunlight "
            "on the snow with delicate blue shadows, a few tiny snow-covered trees along the ridge, clean "
            "and minimal. The bottom edge of the frame is completely filled by snow. " + STYLE
        ),
    },
    {
        "id": "sun-glow",
        "size": "1024x1024",
        "prompt": (
            "A soft glowing sun disc in warm pink-magenta tone (like #D875DA), perfectly round, centered, "
            "with a smooth radiant halo fading out to fully transparent edges. Dreamy, gentle, like a low "
            "winter sun through thin mist. Isolated on a fully transparent background, nothing else in the "
            "frame. " + STYLE
        ),
    },
]


def main() -> None:
    os.makedirs(OUT_DIR, exist_ok=True)
    for asset in ASSETS:
        out_path = os.path.join(OUT_DIR, f"{asset['id']}.png")
        print(f"生成中：{asset['id']} ...")
        # gpt-image-2 不支援 background="transparent"，透明底素材要用 gpt-image-1
        response = client.images.generate(
            model="gpt-image-1",
            prompt=asset["prompt"],
            size=asset["size"],
            quality="high",
            background="transparent",
            output_format="png",
        )
        with open(out_path, "wb") as f:
            f.write(base64.b64decode(response.data[0].b64_json))
        print(f"  -> {out_path}")


if __name__ == "__main__":
    main()
