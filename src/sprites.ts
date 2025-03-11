import { Composite, Engine } from 'matter-js';

import { bird } from '@/components/bird';
import { floor } from '@/components/floor';
import { pipe } from '@/components/pipe';
import { constants } from '@/constants';
import { generatePairs, position, size } from '@/utils';

const { MaxWidth, MaxHeight } = constants;

const firstPair = generatePairs();
const secondPair = generatePairs(MaxWidth * 0.9);

export const sprites = {
  create: () => {
    const engine = Engine.create({ enableSleeping: false, gravity: { y: 0.8 } });

    const sprites = {
      bird: bird.create(position(MaxWidth / 3, MaxHeight / 2), size(40, 40)),
      'pipe:0:top': pipe.create('Top', firstPair.top.position, firstPair.size),
      'pipe:0:bottom': pipe.create('Bottom', firstPair.bottom.position, firstPair.size),
      'pipe:1:top': pipe.create('Top', secondPair.top.position, secondPair.size),
      'pipe:1:bottom': pipe.create('Bottom', secondPair.bottom.position, secondPair.size),
      'floor:0': floor.create(position(MaxWidth / 2, MaxHeight - 25), size(MaxWidth, 50)),
      'floor:1': floor.create(
        position(MaxWidth + MaxWidth / 2, MaxHeight - 25),
        size(MaxWidth, 50)
      ),
    };

    Composite.add(
      engine.world,
      Object.values(sprites).map(({ body }) => body)
    );

    return { engine, ...sprites };
  },
};
