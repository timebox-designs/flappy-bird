import { Body } from "matter-js";

import { Dictionary } from "./dictionary";

export type Entity<P = unknown> = P & {
  body: Body;
};

export type Entities = Dictionary<Entity>;
