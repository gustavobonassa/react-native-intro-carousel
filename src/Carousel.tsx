import React, {
  useCallback, useMemo, useRef, useState,
} from 'react';
import { LayoutChangeEvent, TextStyle, View } from 'react-native';
import {
  Animated, Dimensions, FlatList, StyleSheet, Text,
} from 'react-native';
import DefaultCarouselItem from './DefaultCaroselItem';

const viewabilityConfig = { viewAreaCoveragePercentThreshold: 40 };

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const defaultDotSize = 20;
const defaultSpacing = 12;

export type CarouselData = {
  title: string;
  backgroundColor?: string;
  banner?: any;
  description?: string;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
};

type CarouselProps = {
  data: CarouselData[];
  paginationConfig?: {
    dotSize?: number;
    bottomOffset?: number;
    animation?: 'disabled' | 'enabled';
    disabled?: boolean;
  };
  renderItem?: (data: CarouselData) => any;
};

const CarouselInfo = ({
  data,
  paginationConfig,
  renderItem,
}: CarouselProps) => {
  const {
    dotSize = defaultDotSize,
    bottomOffset = 50,
    animation = 'enabled',
    disabled = false,
  } = paginationConfig || {};

  const [currentItem, setCurrentItem] = useState(0);
  const [layoutSize, setLayoutSizes] = useState<{
    width?: number;
    height?: number;
  }>({});
  const flatlistRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const itemWidth = layoutSize?.width || 0;
  const maxPaginationSize = (data.length * (dotSize)) + (data.length * defaultSpacing);
  const maxSlidersSize = (itemWidth * data.length);

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0 && viewableItems?.[0]?.index >= 0) {
      setCurrentItem(viewableItems[0].index);
    }
  }, []);

  const viewabilityConfigCallbackPairs = useRef([
    { onViewableItemsChanged, viewabilityConfig },
  ]);

  const handleOnLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    setLayoutSizes(layout);
  };

  const renderPagination = () => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: bottomOffset,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: 'auto',
          }}
        >
          {animation === 'enabled' && (
            <Animated.View
              style={{
                ...styles.item,
                backgroundColor: 'white',
                position: 'absolute',
                left: 0,
                zIndex: 1,
                width: dotSize,
                height: dotSize,
                transform: [
                  {
                    translateX: scrollX.interpolate({
                      inputRange: [0, maxSlidersSize],
                      outputRange: [0, maxPaginationSize],
                      extrapolate: 'clamp',
                    }),
                  },
                  // {
                  //   scale: scrollX.interpolate({
                  //     inputRange: [0, maxSlidersSize],
                  //     outputRange: [1, 3],
                  //     extrapolate: 'clamp',
                  //   }),
                  // },
                ],
              }}
            />
          )}
          {/* <View style={{ ...styles.item, backgroundColor: 'red' }} /> */}
          {data.map((item, index) => {
            const isActive = animation === 'disabled' && index === currentItem;
            return (
              <View
                style={{
                  ...styles.item,
                  width: dotSize,
                  height: dotSize,
                  marginLeft: index === 0 ? 0 : defaultSpacing,
                  backgroundColor: isActive ? 'white' : '#ffffff80',
                }}
                key={index}
              />
            );
          })}
        </View>
      </View>
    );
  };

  // const normalize = (val, max, min) => { return (val - min) / (max - min); }

  return (
    <View
      style={styles.container}
      onLayout={handleOnLayout}
    >
      <AnimatedFlatList
        ref={flatlistRef}
        initialScrollIndex={0}
        onScroll={Animated.event(
          [{
            nativeEvent: {
              contentOffset: {
                x: scrollX,
              },
            },
          }],
          {
            useNativeDriver: true,
          }
        )}
        data={data}
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        initialNumToRender={data.length}
        decelerationRate='fast'
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        snapToAlignment='start'
        snapToInterval={itemWidth}
        pagingEnabled
        renderItem={({ item }) => (
          <DefaultCarouselItem
            style={{
              ...styles.container,
              width: itemWidth,
            }}
            data={item}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {!disabled && renderPagination()}
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
  item: {
    borderRadius: 50,
    backgroundColor: '#ffffff80',
  },
});

export default CarouselInfo;
