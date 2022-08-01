import * as React from 'react';

import { Image, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-intro-carousel';
const arrowIcon = require('./assets/arrow.png');
const checkIcon = require('./assets/check.png');
const image = require('./assets/1.png');

export default function CarouselBasicExample() {
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
            description: 'This is a good information\nOther text here',
            backgroundColor: '#f0ae35',
            image,
            imagePosition: 'center',
            // contentStyle: {
            //   justifyContent: 'space-evenly',
            // },
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
            imagePosition: 'bottom',
            titleStyle: {
              color: 'white',
            },
            descriptionStyle: {
              color: 'white',
            },
          },
        ]}
        // renderItem={({ item }) => <Text>{item.title}</Text>}
        paginationConfig={{
          // dotSize: 10,
          // animated: false,
          // disabled: true,
          dotIncreaseSize: 1,
          dotSpacing: 30,
          // color: '#00000050',
          // activeColor: 'black',
          // activeDotStyle: {
          //   width: 30,
          //   left: -7.5,
          // }
        }}
        buttonsConfig={{
          next: {
            renderButton: (index, onChangeSlider) => (
              <View
                onTouchStart={() => onChangeSlider(index + 1)}
                style={styles.iconButton}
              >
                <Image source={arrowIcon} style={styles.arrow} />
              </View>
            ),
          },
          prev: {
            disabled: true,
          },
          done: {
            renderButton: (index, onChangeSlider) => (
              <View
                onTouchStart={() => onChangeSlider(index + 1)}
                style={styles.iconButton}
              >
                <Image source={checkIcon} style={styles.arrow} />
              </View>
            ),
          },
        }}
        // onFinish={() => console.log('finish')}
        // onPressSkip={() => console.log('test')}
        // renderItem={({ item, index }, goToSlide) => (
        //   <View style={styles.content}>
        //     <Image source={item.image} style={styles.image} />
        //     <Text>{item.title}</Text>
        //     <Text>{item.description}</Text>
        //     <View style={styles.buttonsContainer}>
        //       <Pressable
        //         style={styles.button}
        //         onPress={() => goToSlide(index - 1)}
        //       >
        //         <Text>Previous</Text>
        //       </Pressable>
        //       <Pressable
        //         style={[styles.button, { marginLeft: 10 }]}
        //         onPress={() => goToSlide(index + 1)}
        //       >
        //         <Text>Next</Text>
        //       </Pressable>
        //     </View>
        //   </View>
        // )}
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#47d16c',
    marginTop: 20,
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 200,
    height: 200,
  },
  arrow: {
    width: 30,
    height: 30,
  },
  iconButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#00000050',
  },
});
