import { Vector } from 'matter-js';

import { Size, Sprite } from './types';

import { constants } from '@/constants';

// prettier-ignore
export const eq = <T,>(a: T) => (b: T) => a === b;

export const groupBy =
  (iteratee: (s: string) => number) =>
  (acc: Sprite[][], [key, value]: [string, Sprite]) => {
    (acc[iteratee(key)] ??= []).push(value);
    return acc;
  };

export const position = Vector.create;

export const size = (width: number, height: number): Size => ({ width, height });

export const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generatePairs = (offset = 0) => {
  const x = constants.MaxWidth + offset;
  const y = getRandomInt(0, constants.PipeHeight / 2);
  const gap = getRandomInt(280, 340);

  const top = { position: position(x, y) };
  const bottom = { position: position(x, y + gap + constants.MaxHeight - constants.PipeHeight) };

  return { top, bottom, size: size(constants.PipeWidth, constants.PipeHeight) };
};
