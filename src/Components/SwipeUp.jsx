import {StyleSheet, Text} from 'react-native';
import React from 'react';
import * as Haptics from 'expo-haptics';
import GestureRecognizer from 'react-native-swipe-gestures';
import appStyles from './AppStyles';
import swipeUpGif from '../../assets/swipe-up-arrow.gif';
import Button from './Button';

export default function SwipeUp(props) {
  const onSwipeUp = () => {
    Haptics.selectionAsync().then();
    props.onSwipeUp();
  };

  return (
    <GestureRecognizer
      onSwipeUp={() => onSwipeUp()}
      config={{velocityThreshold: 0.05, directionalOffsetThreshold: 100}}
      style={{
        width: appStyles.win.width,
        paddingTop: appStyles.win.height * 0.18,
        bottom: '5%',
        alignItems: 'center',
      }}
    >
      <Button
        style={swipeUpButton}
        icon={swipeUpGif}
        underlayColor="transparent"
        onPress={props.onPress}
      />
      <Text
        style={{
          ...appStyles.paragraphText,
          color: appStyles.blueColor,
          textAlign: 'center',
        }}
      >
        {props.text}
      </Text>
    </GestureRecognizer>
  );
}

const swipeUpButton = StyleSheet.create({
  Touchable: {
    width: appStyles.win.width * 0.08,
    height: appStyles.win.height * 0.08,
  },
  Image: {
    height: appStyles.win.width * 0.08,
    width: appStyles.win.width * 0.08,
  },
});
