import { Body, Engine, Vector } from 'matter-js';

export type Dictionary<T> = Record<string, T>;

export type Size = {
  width: number;
  height: number;
};

export type BoundingBox = Vector & Size;

export type Sprite<P = unknown> = P & {
  body: Body;
};

export type Sprites = Dictionary<Sprite>;

export type Domain = Sprites & {
  engine: Engine;
};
