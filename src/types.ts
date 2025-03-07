import { Body, Engine } from "matter-js";

export type Dictionary<T> = Record<string, T>;
export type Func<T> = (t: T) => T;
export type Tuple<T, U> = [T, U];

export type Size = {
  height: number;
  width: number;
};

export type BoundingBox = Size & {
  top: number;
  left: number;
};

export type Entity<P = unknown> = P & {
  body: Body;
};

export type Entities = Dictionary<Entity>;
export type EntityGroups = Dictionary<Array<Entity>>;

export type Physics = {
  engine: Engine;
};

export type Position = {
  x: number;
  y: number;
};
