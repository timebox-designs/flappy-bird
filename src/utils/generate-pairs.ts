import { Constants } from "../constants";
import { getRandomInt } from "./random";

export const generatePairs = (offset = 0) => {
  const x = Constants.MaxWidth + offset;
  const y = getRandomInt(0, Constants.PipeHeight / 2);
  const gap = getRandomInt(280, 340);

  const top = { position: { x, y } };
  const bottom = { position: { x, y: y + gap + Constants.MaxHeight - Constants.PipeHeight } };

  return { top, bottom, size: { height: Constants.PipeHeight, width: Constants.PipeWidth } };
};
