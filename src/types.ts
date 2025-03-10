import { Body, Engine, Vector } from "matter-js";

export type Dictionary<T> = Record<string, T>;
export type Func<T> = (t: T) => T;
export type Tuple<T, U> = [T, U];

export type Size = {
  height: number;
  width: number;
};

export type BoundingBox = Vector & Size;

export type Sprite<P = unknown> = P & {
  body: Body;
};

export type Sprites = Dictionary<Sprite>;
export type SpriteGroup = Dictionary<Sprite[]>;

export type Physics = {
  engine: Engine;
};
