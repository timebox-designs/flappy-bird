import { Body, Engine, Events, Vector } from "matter-js";
import {
  TouchEvent,
  GameEngineUpdateEventOptionType as UpdateEvent,
} from "react-native-game-engine";

import { Constants } from "@/constants";
import { Func, Sprite, SpriteGroup, System, Tuple } from "@/types";
import { generatePairs } from "@/utils/generate-pairs";

const GAME_OVER = { type: "game-over" };
const PRESS = { type: "press" };
const SCORE = { type: "score" };

const onPress = (touch: TouchEvent) => touch.type === "press";

type Fn = (sprite: Sprite, vector: Vector) => void;

const move: Fn = (sprite, direction) => Body.translate(sprite.body, direction);
const setPosition: Fn = (sprite, position) => Body.setPosition(sprite.body, position);
const setVelocity: Fn = (sprite, velocity) => Body.setVelocity(sprite.body, velocity);

const groupBy =
  (iteratee: Func<string>) =>
  (acc: SpriteGroup, [key, value]: Tuple<string, Sprite>) => {
    (acc[iteratee(key)] ??= []).push(value);
    return acc;
  };

const toPairs = groupBy((key) => key.split(":")[2]);

let scored = false;

export const physics = (system: System, { touches, time, dispatch }: UpdateEvent) => {
  const { engine, ...entities } = system;
  const bird = entities.Bird;

  touches.filter(onPress).forEach(() => {
    dispatch(PRESS);
    setVelocity(bird, { x: 0, y: -8 });
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

      setPosition(top, pipe.top.position);
      setPosition(bottom, pipe.bottom.position);
      scored = false;
    }

    [top, bottom].forEach((pipe) => move(pipe, { x: -3, y: 0 }));
  });

  Object.entries(entities)
    .filter(([key]) => key.startsWith("Floor"))
    .forEach(([_, floor]) => {
      if (floor.body.position.x + Constants.MaxWidth / 2 <= 0) {
        setPosition(floor, {
          x: Constants.MaxWidth + Constants.MaxWidth / 2,
          y: floor.body.position.y,
        });
      }
      move(floor, { x: -3, y: 0 });
    });

  Events.on(engine, "collisionStart", () => dispatch(GAME_OVER));
  Engine.update(engine, time.delta);
  Events.off(engine, "collisionStart");

  return system;
};
