import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import type { ButtonsConfigType } from './types';

const BottomButtons = ({
  onPressNext,
  onPressSkip,
  onFinish,
  buttonsConfig,
  currentIndex,
  dataLength,
}: {
  onPressNext: () => void;
  onPressSkip?: () => void;
  onFinish?: () => void;
  buttonsConfig?: ButtonsConfigType;
  currentIndex: number;
  dataLength: number;
}) => {
  if (buttonsConfig?.disabled) {
    return null;
  }
  const { next, skip, done } = buttonsConfig || {};

  const isLastData = dataLength === currentIndex + 1;
  const endButton = isLastData ? done : next;
  const endButtonLabel = isLastData ? 'Done' : 'Next';

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={() => {
          if (isLastData) {
            if (onFinish) {
              onFinish();
            }
          } else {
            onPressNext();
          }
        }}
        style={[
          styles.button,
          {
            marginTop: 10,
            backgroundColor: '#00000050',
            marginBottom: !skip?.disabled ? 10 : 0,
          },
          next?.buttonStyle,
        ]}
      >
        <Text style={[styles.buttonText, next?.textStyle]}>
          {endButton?.label || endButtonLabel}
        </Text>
      </Pressable>
      {!skip?.disabled && onPressSkip && (
        <Pressable
          onPress={() => onPressSkip()}
          style={[styles.button, skip?.buttonStyle]}
        >
          <Text style={[styles.buttonText, skip?.textStyle]}>
            {skip?.label || 'Skip'}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default BottomButtons;
