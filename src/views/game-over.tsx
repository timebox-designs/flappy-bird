import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";

import { Images } from "@/assets/images";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
    <View style={styles.container}>
      <Image source={Images.GameOver} style={styles.image} />
    </View>
  );
};

export default GameOver;
