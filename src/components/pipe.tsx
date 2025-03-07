import { Bodies } from "matter-js";
import { Image, StyleSheet } from "react-native";

import { Images } from "@/assets/images";
import { BoundingBox, Entity, Position, Size } from "@/types";
import { createBoundingBox } from "@/utils/bounding-box";

type Type = "Top" | "Bottom";

const styles = (boundingBox: BoundingBox) =>
  StyleSheet.create({
    pipe: {
      position: "absolute",
      resizeMode: "stretch",
      ...boundingBox,
    },
  });

const Pipe = ({ body, type }: Entity<{ type: Type }>) => (
  <Image source={Images[type]} style={styles(createBoundingBox(body)).pipe} />
);

const createPipe = (type: Type, pos: Position, size: Size) => {
  const pipe = Bodies.rectangle(pos.x, pos.y, size.width, size.height, { isStatic: true });

  return {
    body: pipe,
    type,
    renderer: Pipe,
  };
};

export default createPipe;
