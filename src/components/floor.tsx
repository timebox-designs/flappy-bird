import { Bodies } from "matter-js";
import { Image, StyleSheet, View } from "react-native";

import { Images } from "@/assets/images";
import { BoundingBox, Entity, Position, Size } from "@/types";
import { createBoundingBox } from "@/utils/bounding-box";

const styles = (boundingBox: BoundingBox) =>
  StyleSheet.create({
    floor: {
      position: "absolute",
      flexDirection: "row",
      ...boundingBox,
    },
  });

const Floor = ({ body }: Entity) => {
  const boundingBox = createBoundingBox(body);
  const { width, height } = boundingBox;
  const iterations = Array(Math.ceil(width / height));

  return (
    <View style={styles(boundingBox).floor}>
      {[...iterations].map((_, i) => (
        <Image key={i} source={Images.Floor} style={{ width: height, height }} />
      ))}
    </View>
  );
};

const createFloor = (pos: Position, size: Size) => {
  const floor = Bodies.rectangle(pos.x, pos.y, size.width, size.height, { isStatic: true });

  return {
    body: floor,
    renderer: Floor,
  };
};

export default createFloor;
