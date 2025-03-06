import { Image, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import { Images } from "@/assets/images";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 220,
    height: 60,
  },
  play: {
    marginTop: 32,
  },
});

export const Start = ({ onStart }: { onStart: VoidFunction }) => (
  <View style={styles.container}>
    <Image source={Images.Logo} style={styles.logo} />
    <TouchableWithoutFeedback onPress={onStart}>
      <Image source={Images.Play} style={styles.play} />
    </TouchableWithoutFeedback>
  </View>
);

export default Start;
