import { AVPlaybackSource } from 'expo-av';

import { Dictionary } from '@/types';

export const Sounds: Dictionary<AVPlaybackSource> = {
  Die: require('./die.mp3'),
  Hit: require('./hit.mp3'),
  Point: require('./point.mp3'),
  Wing: require('./wing.mp3'),
};
