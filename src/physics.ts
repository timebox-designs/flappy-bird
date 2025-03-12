import { Body, Engine, Events, Vector } from 'matter-js';
import {
  TouchEvent,
  GameEngineUpdateEventOptionType as UpdateEvent,
} from 'react-native-game-engine';

import { constants } from '@/constants';
import { Domain, Sprite } from '@/types';
import { generatePairs, groupBy } from '@/utils';

const { MaxWidth } = constants;
const COLLISION_START = 'collisionStart';

const createEvent = (type: string) => ({ type });

const CollisionEvent = createEvent(constants.Collision);
const DieEvent = createEvent(constants.Die);
const FlapEvent = createEvent(constants.Flap);
const PointEvent = createEvent(constants.Point);

type State = (domain: Domain, event: UpdateEvent) => Domain;
type Fn = (sprite: Sprite, vector: Vector) => void;

const move: Fn = (sprite, direction) => Body.translate(sprite.body, direction);
const setPosition: Fn = (sprite, position) => Body.setPosition(sprite.body, position);
const setVelocity: Fn = (sprite, velocity) => Body.setVelocity(sprite.body, velocity);

const set = (sprite: Sprite, options: object) => Body.set(sprite.body, options);
const onPress = (touch: TouchEvent) => touch.type === 'press';

const toPairs = groupBy((key) => Number(key.split(':')[1])); // "pipe:n:top|bottom"

let point = false;

// flying

const flying: State = (domain, { touches, dispatch }) => {
  const { engine, bird, ...sprites } = domain;

  touches.filter(onPress).forEach(() => {
    setVelocity(bird, { x: 0, y: -6 });
    dispatch(FlapEvent);
  });

  Object.entries(sprites)
    .filter(([key]) => key.startsWith('pipe'))
    .reduce(toPairs, [])
    .forEach(([topPipe, bottomPipe]) => {
      if (!point && bird.body.position.x > topPipe.body.position.x) {
        dispatch(PointEvent);
        point = true;
      }

      if (topPipe.body.bounds.max.x <= 0) {
        const { top, bottom } = generatePairs(MaxWidth * 0.9);

        setPosition(topPipe, top.position);
        setPosition(bottomPipe, bottom.position);
        point = false;
      }

      move(topPipe, { x: -3, y: 0 });
      move(bottomPipe, { x: -3, y: 0 });
    });

  Object.entries(sprites)
    .filter(([key]) => key.startsWith('floor'))
    .forEach(([, floor]) => {
      if (floor.body.position.x + MaxWidth / 2 <= 0)
        setPosition(floor, { x: MaxWidth + MaxWidth / 2, y: floor.body.position.y });

      move(floor, { x: -3, y: 0 });
    });

  Events.on(engine, COLLISION_START, (e) => {
    const [{ bodyA }] = e.pairs;
    state = bodyA.label === 'floor' ? die : collision;
  });

  return domain;
};

// collision

const collision: State = (domain, { dispatch }) => {
  const { engine, bird, ...sprites } = domain;

  Object.entries(sprites)
    .filter(([key]) => key.startsWith('pipe'))
    .forEach(([, pipe]) => {
      set(pipe, {
        collisionFilter: {
          mask: 0,
        },
      });
    });

  move(bird, { x: -20, y: -20 });
  setVelocity(bird, { x: 0, y: 10 });
  dispatch(CollisionEvent);
  state = crashing;

  return domain;
};

// crashing

const crashing: State = (domain) => {
  const { engine } = domain;
  Events.on(engine, COLLISION_START, () => (state = die));

  return domain;
};

// die

const die: State = (domain, { dispatch }) => {
  dispatch(DieEvent);
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
