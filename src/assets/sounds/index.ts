import { AVPlaybackSource } from 'expo-av';

import { Dictionary } from '@/types';

export const Sounds: Dictionary<AVPlaybackSource> = {
  Hit: require('./hit.mp3'),
  Score: require('./score.mp3'),
  Wing: require('./wing.mp3'),
};
