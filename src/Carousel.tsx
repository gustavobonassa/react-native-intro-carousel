import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native';
import { Animated, StyleSheet } from 'react-native';
import ButtonsScreen, { Button } from './Buttons';
import DefaultCarouselItem from './DefaultCarouselItem';
import type { CarouselProps } from './types';

const viewabilityConfig = { viewAreaCoveragePercentThreshold: 40 };

const defaultDotSize = 15;
const defaultSpacing = 12;

const CarouselInfo = ({
  data,
  paginationConfig,
  renderItem,
  buttonsConfig,
  onFinish,
  onPressSkip,
}: CarouselProps) => {
  const {
    dotSize = defaultDotSize,
    bottomOffset = 50,
    animated = true,
    disabled = false,
    dotIncreaseSize = 1.4,
    color = '#ffffff80',
    activeColor = '#fff',
    dotSpacing = defaultSpacing,
    activeDotStyle,
  } = paginationConfig || {};

  const [currentItem, setCurrentItem] = useState(0);
  const [layoutSize, setLayoutSizes] = useState<{
    width?: number;
    height?: number;
  }>({});
  const flatlistRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(0)).current;
  const [isNextToDot, setIsNextToDot] = useState(true);

  const disabledButtons = buttonsConfig?.disabled ?? false;

  const itemWidth = layoutSize?.width || 0;
  const maxPaginationSize = data.length * dotSize + data.length * dotSpacing;
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

  const onChangeSlider = (page: number) => {
    if (!flatlistRef?.current || page < 0 || page >= data.length) {
      return;
    }
    flatlistRef.current.scrollToIndex({
      index: page,
    });
  };

  const handleOnLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    setLayoutSizes(layout);
  };

  const renderPagination = () => {
    return (
      <View
        style={[
          styles.paginationContainer,
          {
            bottom: bottomOffset,
          },
        ]}
      >
        {!disabledButtons && (
          <ButtonsScreen
            buttonsConfig={buttonsConfig}
            currentIndex={currentItem}
            maxPaginationSize={maxPaginationSize}
            dataLength={data.length}
            onChangeSlider={(s) => onChangeSlider(s)}
            onFinish={onFinish}
          />
        )}
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
                ...activeDotStyle,
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
                  ...(isActive && activeDotStyle),
                  marginLeft: index === 0 ? 0 : dotSpacing,
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
    <View
      style={[styles.container, { position: 'relative' }]}
      onLayout={handleOnLayout}
    >
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
              {renderItem({ item, index }, onChangeSlider)}
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
      {onPressSkip && (
        <View style={styles.skipButton}>
          <Button
            title={buttonsConfig?.skip?.label || 'Skip'}
            onPress={onPressSkip}
            textStyle={buttonsConfig?.skip?.textStyle}
            buttonStyle={buttonsConfig?.skip?.buttonStyle}
          />
        </View>
      )}
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
  paginationContainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 40,
  },
  button: {
    padding: 10,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 3,
  },
});

export default CarouselInfo;
