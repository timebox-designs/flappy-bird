import { Body, Engine, Events, Vector } from 'matter-js';
import {
  TouchEvent,
  GameEngineUpdateEventOptionType as UpdateEvent,
} from 'react-native-game-engine';

import { constants } from '@/constants';
import { Domain, Sprite } from '@/types';
import { generatePairs } from '@/utils';

const { MaxWidth } = constants;

const COLLISION_START = 'collisionStart';
const GAME_OVER = { type: 'game-over' };
const PRESS = { type: 'press' };
const SCORE = { type: 'score' };

const onPress = (touch: TouchEvent) => touch.type === 'press';

type State = (domain: Domain, event: UpdateEvent) => Domain;
type Fn = (sprite: Sprite, vector: Vector) => void;

const move: Fn = (sprite, direction) => Body.translate(sprite.body, direction);
const setPosition: Fn = (sprite, position) => Body.setPosition(sprite.body, position);
const setVelocity: Fn = (sprite, velocity) => Body.setVelocity(sprite.body, velocity);

const groupBy =
  (iteratee: (s: string) => number) =>
  (acc: Sprite[][], [key, value]: [string, Sprite]) => {
    (acc[iteratee(key)] ??= []).push(value);
    return acc;
  };

const toPairs = groupBy((key) => Number(key.split(':')[1])); // "pipe:n:top|bottom"

let scored = false;

// flying

const flying: State = (domain, { touches, dispatch }) => {
  const { engine, bird, ...sprites } = domain;

  touches.filter(onPress).forEach(() => {
    setVelocity(bird, { x: 0, y: -6 });
    dispatch(PRESS);
  });

  Object.entries(sprites)
    .filter(([key]) => key.startsWith('pipe'))
    .reduce(toPairs, [])
    .forEach(([topPipe, bottomPipe]) => {
      if (!scored && bird.body.position.x > topPipe.body.position.x) {
        dispatch(SCORE);
        scored = true;
      }

      if (topPipe.body.bounds.max.x <= 0) {
        const { top, bottom } = generatePairs(MaxWidth * 0.9);

        setPosition(topPipe, top.position);
        setPosition(bottomPipe, bottom.position);
        scored = false;
      }

      move(topPipe, { x: -3, y: 0 });
      move(bottomPipe, { x: -3, y: 0 });
    });

  Object.entries(sprites)
    .filter(([key]) => key.startsWith('floor'))
    .forEach(([_, floor]) => {
      if (floor.body.position.x + MaxWidth / 2 <= 0)
        setPosition(floor, { x: MaxWidth + MaxWidth / 2, y: floor.body.position.y });

      move(floor, { x: -3, y: 0 });
    });

  Events.on(engine, COLLISION_START, (e) => {
    const [{ bodyB }] = e.pairs;
    state = bodyB.label === 'floor' ? gameOver : collision;
  });

  return domain;
};

// collision

const collision: State = (domain) => {
  const { bird } = domain;

  move(bird, { x: -40, y: -20 });
  setVelocity(bird, { x: 0, y: 10 });
  state = crashing;

  return domain;
};

// crashing

const crashing: State = (domain) => {
  const { engine } = domain;
  Events.on(engine, COLLISION_START, () => (state = gameOver));

  return domain;
};

// gameOver

const gameOver: State = (domain, { dispatch }) => {
  dispatch(GAME_OVER);
  state = reset;

  return domain;
};

// reset

const reset: State = (domain) => {
  const { bird } = domain;

  setVelocity(bird, { x: 0, y: 0 });
  state = flying;

  return domain;
};

let state = reset;

// physics

export const physics: State = (domain, event) => {
  const { engine } = domain;
  const updatedState = state(domain, event);

  Engine.update(engine, event.time.delta);
  Events.off(engine, COLLISION_START);
  return updatedState;
};
