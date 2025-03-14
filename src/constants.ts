import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const constants = {
  MaxWidth: width,
  MaxHeight: height,
  PipeWidth: 60,
  PipeHeight: 484,
  StartGame: 0,
  Running: 1,
  GameOver: 2,
  HighScore: 'high score',
  Collision: 'collision',
  Die: 'die',
  Flap: 'flap',
  Point: 'point',
};
