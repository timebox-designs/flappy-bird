import { Body, Engine, Events, Vector } from "matter-js";
import {
  TouchEvent,
  GameEngineUpdateEventOptionType as UpdateEvent,
} from "react-native-game-engine";

import { Constants } from "@/constants";
import { Entities, Entity, EntityGroups, Func, Physics, Tuple } from "@/types";
import { generatePairs } from "@/utils/generate-pairs";

const GAME_OVER = { type: "game-over" };
const PRESS = { type: "press" };
const SCORE = { type: "score" };

const verticalVector = Vector.create(0, -8);
const horizontalVector = Vector.create(-3, 0);

const onPress = (touch: TouchEvent) => touch.type === "press";
const updateVerticalVelocity = ({ body }: Entity) => Body.setVelocity(body, verticalVector);
const updateHorizontalPosition = ({ body }: Entity) => Body.translate(body, horizontalVector);

const groupBy =
  (iteratee: Func<string>) =>
  (acc: EntityGroups, [key, value]: Tuple<string, Entity>) => {
    (acc[iteratee(key)] ??= []).push(value);
    return acc;
  };

const toPairs = groupBy((key) => key.split(":")[2]);

let scored = false;

export const physics = (blob: Entities & Physics, { touches, time, dispatch }: UpdateEvent) => {
  const { engine, ...entities } = blob;
  const bird = entities.Bird;

  Events.off(engine, "collisionStart");

  touches.filter(onPress).forEach(() => {
    dispatch(PRESS);
    updateVerticalVelocity(bird);
  });

  const pairs = Object.entries(entities)
    .filter(([key]) => key.startsWith("Pipe"))
    .reduce(toPairs, {});

  Object.values(pairs).forEach(([top, bottom]) => {
    if (!scored && bird.body.position.x > top.body.position.x) {
      dispatch(SCORE);
      scored = true;
    }

    if (top.body.bounds.max.x <= 0) {
      const pipe = generatePairs(Constants.MaxWidth * 0.9);

      Body.setPosition(top.body, pipe.top.position);
      Body.setPosition(bottom.body, pipe.bottom.position);
      scored = false;
    }

    [top, bottom].forEach(updateHorizontalPosition);
  });

  Object.entries(entities)
    .filter(([key]) => key.startsWith("Floor"))
    .forEach(([_, floor]) => {
      if (floor.body.position.x + Constants.MaxWidth / 2 <= 0) {
        Body.setPosition(floor.body, {
          x: Constants.MaxWidth + Constants.MaxWidth / 2,
          y: floor.body.position.y,
        });
      }
      updateHorizontalPosition(floor);
    });

  Events.on(engine, "collisionStart", () => dispatch(GAME_OVER));
  Engine.update(engine, time.delta);

  return blob;
};
