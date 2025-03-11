import { Bodies, Vector } from 'matter-js';
import { Animated, StyleSheet, useAnimatedValue } from 'react-native';

import { Images } from '@/assets/images';
import { BoundingBox, Size, Sprite } from '@/types';

const styles = ({ x, y, ...size }: BoundingBox, rotation: Animated.AnimatedInterpolation<string>) =>
  StyleSheet.create({
    bird: {
      position: 'absolute',
      resizeMode: 'contain',
      transform: [{ rotate: rotation }],
      top: y,
      left: x,
      ...size,
    },
  });

let tick = 0;
let frame = 0;

const Bird = ({ body: { bounds, position, velocity } }: Sprite) => {
  const { x: width, y: height } = Vector.sub(bounds.max, bounds.min);

  const boundingBox = {
    x: position.x - width / 2,
    y: position.y - height / 2,
    width,
    height,
  };

  const rotate = useAnimatedValue(0);
  rotate.setValue(velocity.y);

  tick = ++tick % 5;
  if (tick === 0) frame = ++frame % 3;

  const rotation = rotate.interpolate({
    inputRange: [-10, 0, 10, 15],
    outputRange: ['-20deg', '0deg', '20deg', '90deg'],
    extrapolate: 'clamp',
  });

  return (
    <Animated.Image source={Images[`Bird${frame}`]} style={styles(boundingBox, rotation).bird} />
  );
};

export const bird = {
  create: (position: Vector, size: Size) => {
    const bird = Bodies.rectangle(position.x, position.y, size.width, size.height, {
      label: 'bird',
    });

    return {
      body: bird,
      renderer: Bird,
    };
  },
};
