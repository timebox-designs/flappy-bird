import { Composite, Engine } from "matter-js";

import { bird } from "@/components/bird";
import { floor } from "@/components/floor";
import { pipe } from "@/components/pipe";
import { constants } from "@/constants";
import { generatePairs } from "@/utils/generate-pairs";

const { MaxWidth, MaxHeight } = constants;

const firstPair = generatePairs();
const secondPair = generatePairs(MaxWidth * 0.9);

const createSprites = () => ({
  bird: bird.create({ x: 120, y: 400 }, { height: 40, width: 40 }),
  "pipe:0:top": pipe.create("Top", firstPair.top.position, firstPair.size),
  "pipe:0:bottom": pipe.create("Bottom", firstPair.bottom.position, firstPair.size),
  "pipe:1:top": pipe.create("Top", secondPair.top.position, secondPair.size),
  "pipe:1:bottom": pipe.create("Bottom", secondPair.bottom.position, secondPair.size),
  "floor:0": floor.create({ x: MaxWidth / 2, y: MaxHeight - 25 }, { height: 50, width: MaxWidth }),
  "floor:1": floor.create(
    { x: MaxWidth + MaxWidth / 2, y: MaxHeight - 25 },
    { height: 50, width: MaxWidth },
  ),
});

export const sprites = {
  create: () => {
    const engine = Engine.create({ enableSleeping: false, gravity: { y: 0.8 } });
    const sprites = createSprites();

    Composite.add(
      engine.world,
      Object.values(sprites).map(({ body }) => body),
    );

    return { engine, ...sprites };
  },
};
