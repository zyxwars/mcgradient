import json
import os
from PIL import Image


def getAverageColor(imgPath):
    r = 0
    g = 0
    b = 0

    im = Image.open(imgPath)
    rgbIm = im.convert("RGBA")
    for x in range(im.size[0]):
        for y in range(im.size[1]):
            px = rgbIm.getpixel((x, y))
            r += px[0]
            g += px[1]
            b += px[2]

    size = float(im.size[0] * im.size[1])

    return (r / size, g / size, b / size)


def main():
    blocksPath = "./public/block"
    blocks = []
    for fileName in os.listdir(blocksPath):
        if fileName.endswith(".mcmeta"):
            continue

        blockName = fileName.split("/")[-1].split(".")[0]
        r, g, b = getAverageColor(blocksPath + "/" + fileName)
        blocks.append(
            {
                "name": blockName,
                "fileName": fileName,
                "color": {"r": r, "g": g, "b": b},
            }
        )

    with open("blockData.ts", "w") as w:
        data = f"export const blocks = {json.dumps(blocks)}"
        w.write(data)


main()
