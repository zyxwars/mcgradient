import { blockBlacklist } from "./data/blockBlacklist";
import { blocks } from "./data/blockData";
import { labEucldieanDist, rgbToLab } from "./color";

export type Block = {
  name: string;
  fileName: string;
  rgb: { r: number; g: number; b: number };
  lab: { l: number; a: number; b: number };
};

export const allBlocks: Block[] = blocks
  .filter((b) => !blockBlacklist.includes(b.name))
  .map((b) => ({
    name: b.name,
    fileName: b.fileName,
    rgb: { r: b.color.r, g: b.color.g, b: b.color.b },
    lab: rgbToLab(b.color),
  }));

export function getBlockByName(name: string) {
  return allBlocks.find((b) => b.name == name) || null;
}

export function getSimiliarBlocks(block: Block, maxDistance: number) {
  return allBlocks.filter(
    (b) => labEucldieanDist(block.lab, b.lab) < maxDistance
  );
}
