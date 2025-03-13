import { Audio, AVPlaybackSource } from 'expo-av';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

import { Sounds } from '@/assets/sounds';
import { Dictionary } from '@/types';

type SoundObjects = Dictionary<Audio.SoundObject> | undefined;
type AVSource = [key: string, audio: AVPlaybackSource];

const SoundContext = createContext<SoundObjects>(undefined);

const loadSound = async ([key, audio]: AVSource) => [key, await Audio.Sound.createAsync(audio)];

export const SoundProvider = ({ children }: PropsWithChildren) => {
  const [sounds, setSounds] = useState<SoundObjects>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all(Object.entries(Sounds).map(loadSound))
      .then(Object.fromEntries)
      .then(setSounds)
      .then(() => setLoaded(true));

    return () => {
      setLoaded(false);
    };
  }, []);

  return <SoundContext.Provider value={sounds}>{loaded ? children : null}</SoundContext.Provider>;
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) throw new Error('useSound must be used within a SoundProvider');

  return context;
};

export const playSound = async (audio: Audio.SoundObject) => {
  await audio.sound.replayAsync();
};
