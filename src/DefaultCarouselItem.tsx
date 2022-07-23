import React from 'react';
import { View, ViewStyle, Text, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import type { CarouselData } from './types';

type CarouselItemProps = {
  data: CarouselData;
  style?: ViewStyle;
};

const DefaultCarouselItem = ({ data, style }: CarouselItemProps) => {
  const imgPosition = data.imagePosition || 'center';

  const renderImage = () => {
    if (!data?.image) {
      return;
    }

    return (
      <View>
        <Image
          source={data.image}
          style={[
            styles.banner,
            {
              marginBottom: imgPosition === 'bottom' ? 0 : 10,
            },
            data.imageStyle,
          ]}
        />
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        style,
        {
          backgroundColor: data?.backgroundColor,
        },
        data.contentStyle,
      ]}
    >
      {imgPosition === 'top' && renderImage()}
      <View>
        <Text style={[styles.title, data.titleStyle]}>{data.title}</Text>
      </View>
      {imgPosition === 'center' && renderImage()}
      <View>
        <Text
          style={[
            styles.description,
            {
              marginBottom: imgPosition === 'bottom' ? 10 : 0,
            },
            data.descriptionStyle,
          ]}
        >
          {data.description}
        </Text>
      </View>
      {imgPosition === 'bottom' && renderImage()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
  banner: {
    width: 250,
    height: 250,
  },
});

export default DefaultCarouselItem;
