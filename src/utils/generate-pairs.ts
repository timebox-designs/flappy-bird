import { getRandomInt } from "./random";

import { constants } from "@/constants";
const { MaxHeight, MaxWidth, PipeHeight, PipeWidth } = constants;

export const generatePairs = (offset = 0) => {
  const x = MaxWidth + offset;
  const y = getRandomInt(0, PipeHeight / 2);
  const gap = getRandomInt(280, 340);

  const top = { position: { x, y } };
  const bottom = { position: { x, y: y + gap + MaxHeight - PipeHeight } };

  return { top, bottom, size: { height: PipeHeight, width: PipeWidth } };
};
