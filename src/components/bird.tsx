import { Bodies } from "matter-js";
import { Animated, StyleSheet, useAnimatedValue } from "react-native";

import { Images } from "@/assets/images";
import { BoundingBox } from "@/types/bounding-box";
import { Entity } from "@/types/entity";
import { Position } from "@/types/position";
import { Size } from "@/types/size";
import { createBoundingBox } from "@/utils/bounding-box";

const styles = (boundingBox: BoundingBox, rotation: Animated.AnimatedInterpolation<string>) =>
  StyleSheet.create({
    bird: {
      position: "absolute",
      resizeMode: "stretch",
      transform: [{ rotate: rotation }],
      ...boundingBox,
    },
  });

let tick = 0;
let frame = 0;

const Bird = ({ body }: Entity) => {
  const rotate = useAnimatedValue(0);
  rotate.setValue(body.velocity.y);

  tick = ++tick % 5;
  if (tick === 0) frame = ++frame % 3;

  const rotation = rotate.interpolate({
    inputRange: [-10, 0, 10, 20],
    outputRange: ["-20deg", "0deg", "45deg", "120deg"],
    extrapolate: "clamp",
  });

  return (
    <Animated.Image
      source={Images[`Bird${frame}`]}
      style={styles(createBoundingBox(body), rotation).bird}
    />
  );
};

const createBird = (pos: Position, size: Size) => {
  const bird = Bodies.rectangle(pos.x, pos.y, size.width, size.height);

  return {
    body: bird,
    renderer: Bird,
  };
};

export default createBird;
