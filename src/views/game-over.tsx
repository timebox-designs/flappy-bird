import React, { useEffect } from "react";
import { Image, StyleSheet } from "react-native";

import { Images } from "@/assets/images";
import { Container } from "@/components/container";

export const styles = StyleSheet.create({
  image: {
    width: 220,
    height: 60,
  },
});

const GameOver = ({ onRestart }: { onRestart: VoidFunction }) => {
  useEffect(() => {
    const timeInMilliSeconds = 2500;
    setTimeout(onRestart, timeInMilliSeconds);
  }, []);

  return (
    <Container>
      <Image source={Images.GameOver} style={styles.image} />
    </Container>
  );
};

export default GameOver;
