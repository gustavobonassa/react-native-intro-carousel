import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import Carousel from 'react-native-intro-carousel';
const image =  require('./assets/1.png');

export default function App() {
  return (
    <View style={styles.container}>
      <Carousel
        data={[
          {
            title: 'Cool package',
            description: 'This is a cool package',
            backgroundColor: '#59b2b7',
            banner: image,
            titleStyle: {
              color: 'white',
            },
            descriptionStyle: {
              color: 'white',
            },
          },
          {
            title: 'Good information here',
            description: 'This is a good information',
            backgroundColor: '#febe29',
            banner: image,
            titleStyle: {
              color: 'white',
            },
            descriptionStyle: {
              color: 'white',
            },
          },
          {
            title: 'I am tired',
            description: 'I am tired',
            backgroundColor: '#22bcb5',
            banner: image,
            titleStyle: {
              color: 'white',
            },
            descriptionStyle: {
              color: 'white',
            },
          }
        ]}
        paginationConfig={{
          // dotSize: 10,
          // animation: 'disabled',
          // disabled: true,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});
