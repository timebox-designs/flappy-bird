import { Audio, AVPlaybackSource } from "expo-av";
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { GameEngine } from "react-native-game-engine";

import GameOver from "./game-over";
import Start from "./start";

import { Sounds } from "@/assets/sounds";
import { constants } from "@/constants";
import { physics } from "@/physics";
import { sprites } from "@/sprites";
import { eq } from "@/utils/eq";

const styles = StyleSheet.create({
  engine: {
    display: "flex",
    flex: 1,
  },
  score: {
    fontFamily: "FlappyBird",
    fontSize: 48,
    textAlign: "center",
    color: "white",
    marginTop: 100,
  },
});

const isRunning = eq(constants.Running);
const isGameOver = eq(constants.GameOver);

const createSound = (audio: AVPlaybackSource) => Audio.Sound.createAsync(audio);

const Game = () => {
  const [state, setState] = useState(constants.StartGame);
  const [score, setScore] = useState(0);

  const [hitAudio, setHitAudio] = useState<Audio.SoundObject>();
  const [scoreAudio, setScoreAudio] = useState<Audio.SoundObject>();
  const [wingAudio, setWingAudio] = useState<Audio.SoundObject>();

  useEffect(() => {
    Promise.all([Sounds.Hit, Sounds.Score, Sounds.Wing].map(createSound)).then(
      ([hit, score, wing]) => {
        setHitAudio(hit);
        setScoreAudio(score);
        setWingAudio(wing);
      },
    );
  }, []);

  const onStart = () => {
    setState(constants.Running);
    setScore(0);
  };

  const onRestart = () => setState(constants.StartGame);

  const onGameOver = async () => {
    await hitAudio?.sound.replayAsync();
    setState(constants.GameOver);
  };

  const onPress = async () => await wingAudio?.sound.replayAsync();

  const onScore = async () => {
    await scoreAudio?.sound.replayAsync();
    setScore(score + 1);
  };

  const onEvent = async ({ type }: Event) => {
    switch (type) {
      case "game-over":
        await onGameOver();
        break;

      case "press":
        await onPress();
        break;

      case "score":
        await onScore();
        break;
    }
  };

  if (isGameOver(state)) return <GameOver onRestart={onRestart} />;
  if (!isRunning(state)) return <Start onStart={onStart} />;

  return (
    <GameEngine
      running={isRunning(state)}
      entities={sprites.create()}
      systems={[physics]}
      onEvent={onEvent}
      style={styles.engine}
    >
      <Text style={styles.score}>{score}</Text>
    </GameEngine>
  );
};

export default Game;
