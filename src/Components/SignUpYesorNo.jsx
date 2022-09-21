import {Text, View, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {HeaderBackButton} from '@react-navigation/stack';
import appStyles, {blueColor, pinkColor, shadow} from './AppStyles';
import MultipleChoiceButton from './Button';
import translate from './getLocalizedText';
import backArrow from '../../assets/go-back-arrow.png';

export default SignUpYesorNo = (props) => {
  const onPress = (userResponse) => {
    const {liveMiami} = props.route.params;
    const {name} = props.route.params;
    const {dob} = props.route.params;
    const {email} = props.route.params;
    const {phone} = props.route.params;
    const {password} = props.route.params;
    if (userResponse && value == 'liveMiami') {
      props.navigation.navigate('SignUpInfo', {
        liveMiami: userResponse,
      });
    } else if (value == 'pregnant') {
      props.navigation.navigate('SignUpYesorNoInfant', {
        liveMiami,
        name,
        dob,
        email,
        phone,
        password,
        question: translate('doYouHaveInfants'),
        value: 'infant',
        pregnant: userResponse,
      });
    } else if (userResponse && value == 'infant') {
      props.navigation.navigate('SignUpBabyDob', {
        liveMiami,
        name,
        dob,
        email,
        phone,
        password,
        pregnant,
        infant: userResponse,
      });
    } else if (userResponse == false && value == 'infant') {
      props.navigation.navigate('SignUpLoading', {
        liveMiami,
        name,
        dob,
        email,
        phone,
        password,
        pregnant,
        infant: userResponse,
        babyDob: false,
      });
    } else {
      props.navigation.navigate('MustLiveInMiami', {
        liveMiami: userResponse,
      });
    }
  };

  const {question, value} = props.route.params;
  const {liveMiami} = props.route.params;
  const {name} = props.route.params;
  const {dob} = props.route.params;
  const {email} = props.route.params;
  const {phone} = props.route.params;
  const {password} = props.route.params;
  const {pregnant} = props.route.params;

  const backArrowImage = () => (
    <Image source={backArrow} style={styles.goBackArrow} />
  );

  useEffect(() => {
    // Custom back functionality. SignUpInfo -> SignUpYesorNoMiami instead of SignUpInfo -> LiveInMiami -> SignUpYesorNoMiami
    if (value == 'liveMiami') {
      props.navigation.setOptions({
        headerLeft: () => (
          <HeaderBackButton
            labelVisible={false}
            onPress={() => {
              props.navigation.navigate('LogIn');
            }}
            backImage={backArrowImage}
          />
        ),
      });
    }
  }, []);
  return (
    <View style={appStyles.signupContainer}>
      <View
        style={{
          paddingTop: appStyles.win.height * 0.3,
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
          {question}
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

const styles = StyleSheet.create({
  logOutButton: {
    position: 'absolute',
    right: appStyles.win.height * 0.03,
    top: appStyles.win.width * 0.04,
  },
  goBackArrow: {
    width: 25,
    height: 25,
  },
  headerTitle: {
    fontSize: 25,
    color: appStyles.blueColor,
  },
});
