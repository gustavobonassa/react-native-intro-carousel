import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import Carousel from 'react-native-intro-carousel';
const image = require('./assets/1.png');

export default function App() {
  return (
    <View style={styles.container}>
      <Carousel
        data={[
          {
            key: '1',
            title: 'Cool package',
            description: 'This is a cool package',
            backgroundColor: '#e879f2',
            image,
            titleStyle: {
              color: 'white',
            },
            descriptionStyle: {
              color: 'white',
            },
          },
          {
            key: '2',
            title: 'Good information here',
            description: 'This is a good information',
            backgroundColor: '#f0ae35',
            image,
            titleStyle: {
              color: 'white',
            },
            descriptionStyle: {
              color: 'white',
            },
          },
          {
            key: '3',
            title: 'I am tired',
            description: 'I am tired',
            backgroundColor: '#79adf2',
            image,
            titleStyle: {
              color: 'white',
            },
            descriptionStyle: {
              color: 'white',
            },
          },
        ]}
        // renderItem={({ item }) => <Text>{item.title}</Text>}
        paginationConfig={
          {
            // dotSize: 10,
            // animated: false,
            // disabled: true,
            // dotIncreaseSize: 1,
            // color: 'blue',
            // activeColor: 'red'
          }
        }
        buttonsConfig={
          {
            // disabled: true,
          }
        }
        onPressSkip={() => console.log('test')}
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
