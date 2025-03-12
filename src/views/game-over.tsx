import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Images } from '@/assets/images';
import { Container } from '@/components/container';

export const styles = StyleSheet.create({
  bird: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 40,
    height: 40,
  },
  board: {
    backgroundColor: '#FCBE84',
    borderBlockColor: 'black',
    borderWidth: 2,
    borderRadius: 16,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.4,
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 16,
    marginTop: 16,
    padding: 32,
    paddingBottom: 48,
  },
  gameOver: {
    resizeMode: 'contain',
    width: 220,
    height: 60,
  },
  label: {
    color: 'white',
    fontFamily: 'FlappyBird',
    fontSize: 24,
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    marginBottom: 8,
  },
  score: {
    color: 'white',
    fontFamily: 'FlappyBird',
    fontSize: 48,
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  stack: {
    alignItems: 'center',
  },
});

type GameOverProps = { onRestart: VoidFunction; score: number; highScore: number };

const GameOver = ({ onRestart, score, highScore }: GameOverProps) => {
  useEffect(() => {
    const timeInMilliSeconds = 2500;
    setTimeout(onRestart, timeInMilliSeconds);
  }, []);

  return (
    <Container>
      <Image source={Images.GameOver} style={styles.gameOver} />
      <View style={styles.board}>
        <Image source={Images.Bird} style={styles.bird} />

        <View style={styles.stack}>
          <Text style={styles.label}>Score</Text>
          <Text style={styles.score}>{score}</Text>
        </View>
        <View style={styles.stack}>
          <Text style={styles.label}>Best</Text>
          <Text style={styles.score}>{highScore}</Text>
        </View>
      </View>
    </Container>
  );
};

export default GameOver;
