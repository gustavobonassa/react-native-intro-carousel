import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ImageStyle,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  TextStyle,
  View,
} from 'react-native';
import { Animated, StyleSheet } from 'react-native';
import DefaultCarouselItem from './DefaultCaroselItem';

export type CarouselData = {
  key: string;
  title: string;
  backgroundColor?: string;
  image?: any;
  description?: string;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  imageStyle?: ImageStyle;
  data?: any;
};

export type CarouselProps = {
  data: CarouselData[];
  paginationConfig?: {
    dotSize?: number;
    bottomOffset?: number;
    animated?: boolean;
    disabled?: boolean;
    dotIncreaseSize?: number;
    color?: string;
    activeColor?: string;
  };
  renderItem?: ({ item, index }: { item: CarouselData; index: number }) => any;
};

const viewabilityConfig = { viewAreaCoveragePercentThreshold: 40 };

const defaultDotSize = 15;
const defaultSpacing = 12;

const CarouselInfo = ({
  data,
  paginationConfig,
  renderItem,
}: CarouselProps) => {
  const {
    dotSize = defaultDotSize,
    bottomOffset = 50,
    animated = true,
    disabled = false,
    dotIncreaseSize = 1.4,
    color = '#ffffff80',
    activeColor = '#fff',
  } = paginationConfig || {};

  const [currentItem, setCurrentItem] = useState(0);
  const [layoutSize, setLayoutSizes] = useState<{
    width?: number;
    height?: number;
  }>({});
  const flatlistRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(0)).current;
  const [isNextToDot, setIsNextToDot] = useState(true);

  const itemWidth = layoutSize?.width || 0;
  const maxPaginationSize =
    data.length * dotSize + data.length * defaultSpacing;
  const maxSlidersSize = itemWidth * data.length;

  useEffect(() => {
    Animated.timing(scaleAnimation, {
      toValue: isNextToDot ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [isNextToDot, scaleAnimation]);

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
        <View style={styles.pagination}>
          {animated && (
            <Animated.View
              style={{
                ...styles.item,
                backgroundColor: activeColor,
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
                  {
                    scale: scaleAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, dotIncreaseSize],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}
            />
          )}
          {data.map((_, index) => {
            const isActive = !animated && index === currentItem;
            return (
              <View
                style={{
                  ...styles.item,
                  width: dotSize,
                  height: dotSize,
                  marginLeft: index === 0 ? 0 : defaultSpacing,
                  backgroundColor: isActive ? activeColor : color,
                }}
                key={index}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const handleEvent = ({ nativeEvent }: NativeSyntheticEvent<any>) => {
    const { x } = nativeEvent?.contentOffset || {};

    const positionItem = x % itemWidth;
    const nextToDot = positionItem < 40 || positionItem > itemWidth - 40;
    if (nextToDot !== isNextToDot) {
      setIsNextToDot(nextToDot);
    }
  };

  return (
    <View style={styles.container} onLayout={handleOnLayout}>
      <Animated.FlatList
        ref={flatlistRef}
        initialScrollIndex={0}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
            listener: handleEvent,
          }
        )}
        data={data}
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        initialNumToRender={data.length}
        decelerationRate="fast"
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        snapToAlignment="start"
        snapToInterval={itemWidth}
        pagingEnabled
        renderItem={({ item, index }) =>
          renderItem ? (
            <View
              style={{
                ...styles.container,
                width: itemWidth,
              }}
            >
              {renderItem({ item, index })}
            </View>
          ) : (
            <DefaultCarouselItem
              style={{
                ...styles.container,
                width: itemWidth,
              }}
              data={item}
            />
          )
        }
        keyExtractor={(item) => item.key}
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
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
  },
});

export default CarouselInfo;
