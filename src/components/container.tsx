import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const Container = ({ children }: PropsWithChildren) => (
  <View style={styles.container}>{children}</View>
);
