import { constants } from "@/constants";

// prettier-ignore
export const eq = <T,>(a: T) => (b: T) => a === b;

export const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generatePairs = (offset = 0) => {
  const { MaxHeight, MaxWidth, PipeHeight, PipeWidth } = constants;

  const x = MaxWidth + offset;
  const y = getRandomInt(0, PipeHeight / 2);
  const gap = getRandomInt(280, 340);

  const top = { position: { x, y } };
  const bottom = { position: { x, y: y + gap + MaxHeight - PipeHeight } };

  return { top, bottom, size: { height: PipeHeight, width: PipeWidth } };
};
