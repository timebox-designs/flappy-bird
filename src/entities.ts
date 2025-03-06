import { Engine, World } from "matter-js";

import createBird from "@/components/bird";
import createFloor from "@/components/floor";
import createPipe from "@/components/pipe";
import { Constants } from "@/constants";
import { generatePairs } from "@/utils/generate-pairs";

const firstPair = generatePairs();
const secondPair = generatePairs(Constants.MaxWidth * 0.9);

const createEntities = () => ({
  Bird: createBird({ x: 120, y: 400 }, { height: 40, width: 40 }),
  "Pipe:Top:1": createPipe("Top", firstPair.top.position, firstPair.size),
  "Pipe:Bottom:1": createPipe("Bottom", firstPair.bottom.position, firstPair.size),
  "Pipe:Top:2": createPipe("Top", secondPair.top.position, secondPair.size),
  "Pipe:Bottom:2": createPipe("Bottom", secondPair.bottom.position, secondPair.size),
  "Floor:1": createFloor(
    { x: Constants.MaxWidth / 2, y: Constants.MaxHeight - 25 },
    { height: 50, width: Constants.MaxWidth },
  ),
  "Floor:2": createFloor(
    { x: Constants.MaxWidth + Constants.MaxWidth / 2, y: Constants.MaxHeight - 25 },
    { height: 50, width: Constants.MaxWidth },
  ),
});

export const entities = () => {
  const engine = Engine.create({ enableSleeping: false, gravity: { y: 1.2 } });
  const entities = createEntities();

  World.add(
    engine.world,
    Object.values(entities).map(({ body }) => body),
  );

  return { engine, ...entities };
};
