import { Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { Images } from '@/assets/images';
import { Container } from '@/components/container';

const styles = StyleSheet.create({
  logo: {
    width: 220,
    height: 60,
  },
  play: {
    marginTop: 32,
  },
});

export const Start = ({ onStart }: { onStart: VoidFunction }) => (
  <Container>
    <Image source={Images.Logo} style={styles.logo} />
    <TouchableWithoutFeedback onPress={onStart}>
      <Image source={Images.Play} style={styles.play} />
    </TouchableWithoutFeedback>
  </Container>
);

export default Start;
