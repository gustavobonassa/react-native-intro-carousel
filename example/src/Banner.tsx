import * as React from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-intro-carousel';
const image = require('./assets/1.png');

export default function Banner() {
  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <Carousel
          data={[
            {
              key: '1',
              title: 'Cool package',
              description: 'Loren ipsum dolor sit amet',
              image,
              backgroundColor: '#e879f2',
            },
            {
              key: '2',
              title: 'Good information here',
              description: 'Loren ipsum dolor sit amet',
              image,
              backgroundColor: '#f0ae35',
              data: {
                rightImage: true,
              },
            },
            {
              key: '3',
              title: 'Awesome',
              description: 'Loren ipsum dolor sit amet',
              image,
              backgroundColor: '#79adf2',
            },
          ]}
          buttonsConfig={{
            disabled: true,
          }}
          paginationConfig={{
            bottomOffset: 10,
            dotIncreaseSize: 1,
          }}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View
                style={[
                  styles.itemContent,
                  {
                    backgroundColor: item.backgroundColor,
                  },
                ]}
              >
                {!item?.data?.rightImage && (
                  <Image source={item.image} style={styles.image} />
                )}
                <View style={styles.text}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
                {item?.data?.rightImage && (
                  <Image source={item.image} style={styles.image} />
                )}
              </View>
            </View>
          )}
        />
      </View>
      <View style={[styles.bannerContainer, { marginTop: 0 }]}>
        <Carousel
          data={[
            {
              key: '1',
              data: {
                image:
                  'https://aliancatraducoes.com/wp-content/uploads/2019/10/o-que-sao-cat-tools.jpg',
              },
            },
            {
              key: '2',
              data: {
                image:
                  'https://itpetblog.com.br/wp-content/uploads/2019/07/grumpy-cat.jpg',
              },
            },
            {
              key: '3',
              data: {
                image:
                  'https://i0.wp.com/profissaobiotec.com.br/wp-content/uploads/2020/01/cat-4262034_1920.jpg?fit=1088%2C725&ssl=1',
              },
            },
          ]}
          buttonsConfig={{
            disabled: true,
          }}
          paginationConfig={{
            bottomOffset: 8,
            dotSize: 10,
            dotIncreaseSize: 1,
          }}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={[styles.itemContent]}>
                <Image
                  source={{ uri: item.data.image }}
                  style={styles.imageBanner2}
                />
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  bannerContainer: {
    height: 220,
    marginTop: 30,
  },
  item: {
    padding: 10,
    width: '100%',
  },
  itemContent: {
    borderRadius: 15,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  text: {},
  image: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  description: {
    fontSize: 15,
    color: '#fff',
    marginLeft: 10,
  },
  imageBanner2: {
    width: '100%',
    height: '100%',
  },
});
