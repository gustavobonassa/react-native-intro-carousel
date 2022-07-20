import React from 'react';
import { View, ViewStyle, Text, Image } from 'react-native';
import {
  StyleSheet,
} from 'react-native';
import type { CarouselData } from './Carousel';

type CarouselItemProps = {
  data: CarouselData;
  style?: ViewStyle;
};

const DefaultCarouselItem = ({
  data,
  style,
}: CarouselItemProps) => {


  return (
    <View
      style={[
        styles.container,
        style,
        {
          backgroundColor: data?.backgroundColor,
        }
      ]}
    >
      <View>
        <Text style={[styles.title, data.titleStyle]}>
          {data.title}
        </Text>
      </View>
      {!!data?.banner && (
        <View>
          <Image
            source={data.banner}
            style={styles.banner}
          />
        </View>
      )}
      <View>
        <Text style={[styles.description, data.descriptionStyle]}>
          {data.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
  banner: {
    width: 250,
    height: 250,
    marginTop: 10,
  }
});

export default DefaultCarouselItem;
