import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Images } from '@/assets/images';
import { Container } from '@/components/container';

export const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    width: 220,
    height: 60,
  },
  score: {
    color: 'white',
    fontFamily: 'FlappyBird',
    fontSize: 20,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  scoreBoard: {
    backgroundColor: 'black',
    flexDirection: 'row',
    columnGap: 16,
    width: 200,
    borderRadius: 16,
    padding: 16,
    marginRight: 10,
  },
});

type GameOverProps = { onRestart: VoidFunction; score: number; highScore: number };

const GameOver = ({ onRestart, score, highScore }: GameOverProps) => {
  // useEffect(() => {
  //   const timeInMilliSeconds = 2500;
  //   setTimeout(onRestart, timeInMilliSeconds);
  // }, []);

  return (
    <Container>
      <Image source={Images.GameOver} style={styles.image} />
      <View style={styles.scoreBoard}>
        <Text style={styles.score}>Score: {score}</Text>
        <Text style={styles.score}>Best: {highScore}</Text>
      </View>
    </Container>
  );
};

export default GameOver;
