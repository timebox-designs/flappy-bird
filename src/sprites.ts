import { Engine, World } from "matter-js";

import { bird } from "@/components/bird";
import { floor } from "@/components/floor";
import { pipe } from "@/components/pipe";
import { Constants } from "@/constants";
import { generatePairs } from "@/utils/generate-pairs";

const firstPair = generatePairs();
const secondPair = generatePairs(Constants.MaxWidth * 0.9);

const createSprites = () => ({
  Bird: bird.create({ x: 120, y: 400 }, { height: 40, width: 40 }),
  "Pipe:Top:1": pipe.create("Top", firstPair.top.position, firstPair.size),
  "Pipe:Bottom:1": pipe.create("Bottom", firstPair.bottom.position, firstPair.size),
  "Pipe:Top:2": pipe.create("Top", secondPair.top.position, secondPair.size),
  "Pipe:Bottom:2": pipe.create("Bottom", secondPair.bottom.position, secondPair.size),
  "Floor:1": floor.create(
    { x: Constants.MaxWidth / 2, y: Constants.MaxHeight - 25 },
    { height: 50, width: Constants.MaxWidth },
  ),
  "Floor:2": floor.create(
    { x: Constants.MaxWidth + Constants.MaxWidth / 2, y: Constants.MaxHeight - 25 },
    { height: 50, width: Constants.MaxWidth },
  ),
});

export const sprites = () => {
  const engine = Engine.create({ enableSleeping: false, gravity: { y: 1.2 } });
  const sprites = createSprites();

  World.add(
    engine.world,
    Object.values(sprites).map(({ body }) => body),
  );

  return { engine, ...sprites };
};
