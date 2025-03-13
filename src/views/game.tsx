import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { GameEngine } from 'react-native-game-engine';

import GameOver from './game-over';
import Start from './start';

import { playSound, useSound } from '@/components/sound';
import { constants } from '@/constants';
import { physics } from '@/physics';
import { sprites } from '@/sprites';
import { eq } from '@/utils';

const styles = StyleSheet.create({
  engine: {
    display: 'flex',
    flex: 1,
  },
  score: {
    color: 'white',
    fontFamily: 'FlappyBird',
    fontSize: 48,
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    marginTop: 100,
  },
});

const isRunning = eq(constants.Running);
const isGameOver = eq(constants.GameOver);

const Game = () => {
  const [state, setState] = useState(constants.StartGame);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const sounds = useSound();

  useEffect(() => {
    AsyncStorage.getItem(constants.HighScore).then((score) => score && setHighScore(Number(score)));
  }, []);

  const onStart = () => {
    setState(constants.Running);
    setScore(0);
  };

  const onRestart = () => setState(constants.StartGame);

  const onEvent = ({ type }: Event) => {
    switch (type) {
      case constants.Collision:
        playSound(sounds.Hit);
        break;

      case constants.Die:
        if (score > highScore)
          AsyncStorage.setItem(constants.HighScore, String(score)).then(() => setHighScore(score));

        playSound(sounds.Die);
        setState(constants.GameOver);
        break;

      case constants.Flap:
        playSound(sounds.Wing);
        break;

      case constants.Point:
        playSound(sounds.Point);
        setScore(score + 1);
        break;
    }
  };

  if (isGameOver(state))
    return <GameOver onRestart={onRestart} score={score} highScore={highScore} />;

  if (!isRunning(state)) return <Start onStart={onStart} />;

  return (
    <GameEngine
      running={isRunning(state)}
      entities={sprites.create()}
      systems={[physics]}
      onEvent={onEvent}
      style={styles.engine}>
      <Text style={styles.score}>{score}</Text>
    </GameEngine>
  );
};

export default Game;
