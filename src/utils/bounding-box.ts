import { Body } from "matter-js";

export const createBoundingBox = ({ position, bounds }: Body) => {
  const width = bounds.max.x - bounds.min.x;
  const height = bounds.max.y - bounds.min.y;

  return {
    top: position.y - height / 2,
    left: position.x - width / 2,
    width,
    height,
  };
};
