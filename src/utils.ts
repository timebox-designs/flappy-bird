import { Vector } from 'matter-js';

import { Size } from './types';

import { constants } from '@/constants';

// prettier-ignore
export const eq = <T,>(a: T) => (b: T) => a === b;

export const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generatePairs = (offset = 0) => {
  const x = constants.MaxWidth + offset;
  const y = getRandomInt(0, constants.PipeHeight / 2);
  const gap = getRandomInt(280, 340);

  const top = { position: { x, y } };
  const bottom = { position: { x, y: y + gap + constants.MaxHeight - constants.PipeHeight } };

  return { top, bottom, size: { width: constants.PipeWidth, height: constants.PipeHeight } };
};

export const position = Vector.create;

export const size = (width: number, height: number): Size => ({ width, height });
