import { Audio, AVPlaybackSource } from 'expo-av';
import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { GameEngine } from 'react-native-game-engine';

import GameOver from './game-over';
import Start from './start';

import { Sounds } from '@/assets/sounds';
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

const createSound = (audio: AVPlaybackSource) => Audio.Sound.createAsync(audio);

const Game = () => {
  const [state, setState] = useState(constants.StartGame);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const [dieAudio, setDieAudio] = useState<Audio.SoundObject>();
  const [hitAudio, setHitAudio] = useState<Audio.SoundObject>();
  const [pointAudio, setPointAudio] = useState<Audio.SoundObject>();
  const [wingAudio, setWingAudio] = useState<Audio.SoundObject>();

  useEffect(() => {
    Promise.all([Sounds.Die, Sounds.Hit, Sounds.Point, Sounds.Wing].map(createSound)).then(
      ([die, hit, point, wing]) => {
        setDieAudio(die);
        setHitAudio(hit);
        setPointAudio(point);
        setWingAudio(wing);
      }
    );
  }, []);

  const onStart = () => {
    setState(constants.Running);
    setScore(0);
  };

  const onRestart = () => setState(constants.StartGame);

  const onDie = async () => {
    if (score > highScore) setHighScore(score);
    setState(constants.GameOver);
    await dieAudio?.sound.replayAsync();
  };

  const onCollision = async () => await hitAudio?.sound.replayAsync();
  const onFlap = async () => await wingAudio?.sound.replayAsync();

  const onPoint = async () => {
    setScore(score + 1);
    await pointAudio?.sound.replayAsync();
  };

  const onEvent = async ({ type }: Event) => {
    switch (type) {
      case constants.Collision:
        await onCollision();
        break;

      case constants.Die:
        await onDie();
        break;

      case constants.Flap:
        await onFlap();
        break;

      case constants.Point:
        await onPoint();
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
