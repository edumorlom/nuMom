import 'react-native-gesture-handler';
import {Image, Text, View, Animated, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import ConfettiCannon from 'react-native-confetti-cannon';
import * as Haptics from 'expo-haptics';
import {HeaderBackButton} from '@react-navigation/stack';
import heartBalloon from '../../assets/birthday-candle.png';
import appStyles from './AppStyles';
import translate from './getLocalizedText';
import backArrow from '../../assets/go-back-arrow.png';

export default LetsGetStarted = (props) => {
  const [fadeValue, setFadeValue] = useState(new Animated.Value(0));
  let _isMounted = false;

  let timerID;

  let timer = () => {
    timerID = setTimeout(
      () =>
        props.navigation.navigate('SignUpYesorNoMiami', {
          question: translate('liveMiami'),
          value: 'liveMiami',
        }),
      4000
    );
  };

  const backArrowImage = () => (
    <Image source={backArrow} style={styles.goBackArrow} />
  );

  useEffect(() => {
    _isMounted = true;
    _isMounted && confettiVibration();
    _isMounted && _start();
    _isMounted && timer();
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          onPress={() => {
            clearTimeout(timerID);
            props.navigation.navigate('LogIn');
          }}
          backImage={backArrowImage}
        />
      ),
    });
    return () => (_isMounted = false);
  }, []);

  let _start = () => {
    Animated.timing(fadeValue, {
      toValue: 1,
      useNativeDriver: false,
      duration: 1000,
    }).start();
  };

  let confettiVibration = async () => {
    await Haptics.selectionAsync();
    await Haptics.selectionAsync();
    await Haptics.selectionAsync();
    await Haptics.selectionAsync();
    await Haptics.selectionAsync();
    await Haptics.selectionAsync();
    await Haptics.selectionAsync();
    await Haptics.selectionAsync();
  };

  return (
    <Animated.View style={{opacity: fadeValue, ...appStyles.signupContainer}}>
      <ConfettiCannon
        count={150}
        origin={{x: -10, y: 0}}
        fallSpeed={2500}
        colors={[appStyles.blueColor, appStyles.pinkColor]}
      />
      <View
        style={{
          paddingTop: appStyles.win.height * 0.2,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
        }}
      >
        <Text style={appStyles.titleBlue}>{translate('letsGetStarted')}</Text>
        <Image
          style={{
            margin: 100,
            width: appStyles.win.height * 0.15,
            height: appStyles.win.height * 0.15,
          }}
          source={heartBalloon}
        />
        <Text
          style={{
            ...appStyles.paragraphText,
            textAlign: 'center',
            paddingTop: 100,
            color: 'black',
          }}
        >
          {translate('parentingIsntEasy')}
        </Text>
        <Text style={{...appStyles.paragraphText, textAlign: 'center'}}>
          {translate('hereToHelp')}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  goBackArrow: {
    width: 25,
    height: 25,
  },
});
