import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ImageBackground, StatusBar } from 'react-native';

import { Fonts } from '@/assets/fonts';
import { Images } from '@/assets/images';
import { SoundProvider } from '@/components/sound';
import Game from '@/views/game';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded] = useFonts({
    FlappyBird: Fonts.FlappyBird,
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  return (
    <ImageBackground source={Images.Background} resizeMode="cover" style={{ flex: 1 }}>
      <StatusBar hidden />
      <SoundProvider>
        <Game />
      </SoundProvider>
    </ImageBackground>
  );
}
