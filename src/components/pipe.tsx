import { Bodies, Vector } from "matter-js";
import { Image, StyleSheet } from "react-native";

import { Images } from "@/assets/images";
import { BoundingBox, Entity, Position, Size } from "@/types";

type Type = "Top" | "Bottom";

const styles = ({ x, y, ...size }: BoundingBox) =>
  StyleSheet.create({
    pipe: {
      position: "absolute",
      resizeMode: "stretch",
      top: y,
      left: x,
      ...size,
    },
  });

const Pipe = ({ body: { bounds, position }, type }: Entity<{ type: Type }>) => {
  const { x: width, y: height } = Vector.sub(bounds.max, bounds.min);

  const boundingBox = {
    x: position.x - width / 2,
    y: position.y - height / 2,
    width,
    height,
  };

  return <Image source={Images[type]} style={styles(boundingBox).pipe} />;
};

const createPipe = (type: Type, pos: Position, size: Size) => {
  const pipe = Bodies.rectangle(pos.x, pos.y, size.width, size.height, { isStatic: true });

  return {
    body: pipe,
    type,
    renderer: Pipe,
  };
};

export default createPipe;
