import React from 'react';
import { View, Text, Pressable, ViewStyle, TextStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import type { ButtonsConfigType } from './types';

const Button = ({
  onPress,
  title,
  buttonStyle,
  textStyle,
  disabled,
}: {
  onPress: () => void;
  title: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}) => {
  if (disabled) {
    return null;
  }
  return (
    <Pressable onPress={() => onPress()} style={[styles.button, buttonStyle]}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const ButtonsScreen = ({
  buttonsConfig,
  currentIndex,
  maxPaginationSize,
  dataLength,
  onChangeSlider,
  onFinish,
}: {
  buttonsConfig?: ButtonsConfigType;
  currentIndex: number;
  maxPaginationSize: number;
  dataLength: number;
  onChangeSlider: (page: number) => void;
  onFinish?: () => void;
}) => {
  const { next, prev, done } = buttonsConfig || {};

  const isLastData = dataLength === currentIndex + 1;
  const endButton = isLastData ? done : next;
  const endButtonLabel = isLastData ? 'Done' : 'Next';

  return (
    <>
      <View style={[styles.buttonContainer]}>
        <View style={styles.buttonContent}>
          {currentIndex !== 0 && (
            <>
              {!buttonsConfig?.prev?.renderButton ? (
                <Button
                  title={prev?.label || 'Prev'}
                  onPress={() => onChangeSlider(currentIndex - 1)}
                  textStyle={prev?.textStyle}
                  buttonStyle={prev?.buttonStyle}
                  disabled={prev?.disabled}
                />
              ) : (
                buttonsConfig?.prev?.renderButton(currentIndex, onChangeSlider)
              )}
            </>
          )}
        </View>
        <View style={{ width: maxPaginationSize }} />
        <View style={styles.buttonContent}>
          {!endButton?.renderButton ? (
            <Button
              title={endButton?.label || endButtonLabel}
              textStyle={endButton?.textStyle}
              buttonStyle={endButton?.buttonStyle}
              onPress={() => {
                if (isLastData) {
                  if (onFinish) {
                    onFinish();
                  }
                } else {
                  onChangeSlider(currentIndex + 1);
                }
              }}
            />
          ) : (
            endButton?.renderButton(currentIndex, onChangeSlider)
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    right: 0,
  },
  button: {
    padding: 10,
  },
  buttonContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export { Button };
export default ButtonsScreen;
