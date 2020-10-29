import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import appStyles, {blueColor, pinkColor, shadow} from './AppStyles';
import MultipleChoiceButton from './Button';
import BackButton from './Button';
import goBackImg from '../../assets/go-back-arrow.png';
import translate from './getLocalizedText';

export default SignUpYesorNoMiami = (props) => {
  let onPress = (userResponse) => {
    props.setUserInfo({[props.value]: userResponse});
    props.getNextScreen();
  };

  let backgroundColor = 'white';

  return (
    <View style={{height: '100%'}}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: appStyles.win.height * 0.1,
          backgroundColor,
        }}
      >
        <BackButton
          style={appStyles.BackButton}
          icon={goBackImg}
          onPress={() => props.navigation.goBack()}
        />
      </View>
      <View style={appStyles.container}>
        <View
          style={{
            paddingTop: appStyles.win.height * 0.2,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
          }}
        >
          <Text
            style={{
              color: 'black',
              fontSize: appStyles.titleFontSize,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {translate('liveMiami')}
          </Text>
          <View style={appStyles.rowContainer}>
            <MultipleChoiceButton
              style={Blue}
              text="✓"
              onPress={() => onPress(true)}
            />
            <MultipleChoiceButton
              style={Pink}
              text="X"
              onPress={() => onPress(false)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const Touchable = StyleSheet.create({
  Touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    height: appStyles.win.height * 0.11,
    width: appStyles.win.width * 0.24,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: appStyles.button.Touchable.borderRadius,
    ...shadow,
  },
});

const Blue = StyleSheet.create({
  Touchable: {...Touchable.Touchable},
  Text: {
    color: blueColor,
    fontSize: RFValue(45),
  },
});

const Pink = StyleSheet.create({
  Touchable: {...Touchable.Touchable},
  Text: {
    color: pinkColor,
    fontSize: RFValue(45),
  },
});
