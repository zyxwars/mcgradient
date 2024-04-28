// https://www.easyrgb.com/en/math.php

export type RGB = {
  r: number;
  g: number;
  b: number;
};

export type XYZ = {
  x: number;
  y: number;
  z: number;
};

export type LAB = {
  l: number;
  a: number;
  b: number;
};

export function rgbToXyz({ r, g, b }: RGB) {
  //sR, sG and sB (Standard RGB) input range = 0 ÷ 255
  //X, Y and Z output refer to a D65/2° standard illuminant.

  let R = r / 255;
  let G = g / 255;
  let B = b / 255;

  if (R > 0.04045) R = ((R + 0.055) / 1.055) ** 2.4;
  else R = R / 12.92;
  if (G > 0.04045) G = ((G + 0.055) / 1.055) ** 2.4;
  else G = G / 12.92;
  if (B > 0.04045) B = ((B + 0.055) / 1.055) ** 2.4;
  else B = B / 12.92;

  R = R * 100;
  G = G * 100;
  B = B * 100;

  const x = R * 0.4124 + G * 0.3576 + B * 0.1805;
  const y = R * 0.2126 + G * 0.7152 + B * 0.0722;
  const z = R * 0.0193 + G * 0.1192 + B * 0.9505;

  return { x, y, z };
}

export function xyzToLab({ x, y, z }: XYZ) {
  //Reference-X, Y and Z refer to specific illuminants and observers.
  //Common reference values are available below in this same page.

  // D65 Daylight, sRGB, Adobe - RGB;
  let X = x / 95.047;
  let Y = y / 100.0;
  let Z = z / 108.883;

  if (X > 0.008856) X = X ** (1 / 3);
  else X = 7.787 * X + 16 / 116;
  if (Y > 0.008856) Y = Y ** (1 / 3);
  else Y = 7.787 * Y + 16 / 116;
  if (Z > 0.008856) Z = Z ** (1 / 3);
  else Z = 7.787 * Z + 16 / 116;

  const l = 116 * Y - 16;
  const a = 500 * (X - Y);
  const b = 200 * (Y - Z);

  return { l, a, b };
}

export function rgbToLab(rgb: RGB) {
  return xyzToLab(rgbToXyz(rgb));
}

export function labEucldieanDist(lab1: LAB, lab2: LAB) {
  return Math.sqrt(
    Math.pow(lab1.l - lab2.l, 2) +
      Math.pow(lab1.a - lab2.a, 2) +
      Math.pow(lab1.b - lab2.b, 2)
  );
}
