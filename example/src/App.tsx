import * as React from 'react';

import { StyleSheet, View } from 'react-native';
// import Banner from './Banner';
import CarouselBasicExample from './CarouselBasicExample';

export default function App() {
  return (
    <View style={styles.container}>
      <CarouselBasicExample />
      {/* <Banner /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
