import { Bodies, Vector } from 'matter-js';
import { Image, StyleSheet, View } from 'react-native';

import { Images } from '@/assets/images';
import { BoundingBox, Size, Sprite } from '@/types';

const styles = ({ x, y, ...size }: BoundingBox) =>
  StyleSheet.create({
    floor: {
      position: 'absolute',
      flexDirection: 'row',
      top: y,
      left: x,
      ...size,
    },
  });

const Floor = ({ body: { bounds, position } }: Sprite) => {
  const { x: width, y: height } = Vector.sub(bounds.max, bounds.min);

  const boundingBox = {
    x: position.x - width / 2,
    y: position.y - height / 2,
    width,
    height,
  };

  const iterations = Array(Math.ceil(width / height));

  return (
    <View style={styles(boundingBox).floor}>
      {[...iterations].map((_, i) => (
        <Image key={i} source={Images.Floor} style={{ width: height, height }} />
      ))}
    </View>
  );
};

export const floor = {
  create: (position: Vector, size: Size) => {
    const floor = Bodies.rectangle(position.x, position.y, size.width, size.height, {
      label: 'floor',
      isStatic: true,
    });

    return {
      body: floor,
      renderer: Floor,
    };
  },
};
