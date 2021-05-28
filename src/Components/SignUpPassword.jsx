import React, {useEffect, useState} from 'react';
import {
  AsyncStorage,
  Keyboard,
  Text,
  TextInput as TextBox,
  TouchableOpacity,
  View,
  TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';
import appStyles from './AppStyles';
import Button from './Button';
import translate from './getLocalizedText';
import listOfPasswords from './PoorPasswords';

export default SignUpPassword = (props) => {
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const {liveMiami} = props.route.params;
  const {name} = props.route.params;
  const {dob} = props.route.params;
  const {email} = props.route.params;
  const {phone} = props.route.params;

  useEffect(() => {
    AsyncStorage.getItem('pass')
      .then((value) => {
        value !== null && value !== '' ? setPassword(value) : null;
      })
      .done();
    AsyncStorage.getItem('repeat')
      .then((value) => {
        value !== null && value !== '' ? setRepeat(value) : null;
      })
      .done();
  }, []);

  const passwordCheckType = () => {
    let typeStrength = 0;
    let typeNumber = new RegExp('(?=.*[0-9])');
    let typeCapital = new RegExp('(?=.*[A-Z])');
    let typeSymbol = new RegExp('(?=.*[^A-Za-z0-9])');
    let typeLetter = new RegExp('(?=.*[a-z])');

    if (typeNumber.test(password)) {
      typeStrength++;
    }
    if (typeCapital.test(password)) {
      typeStrength++;
    }
    if (typeSymbol.test(password)) {
      typeStrength++;
    }
    if (typeLetter.test(password)) {
      typeStrength++;
    }

    return typeStrength;
  }
  
  const checkPasswordStrength = () => {
    let poorPasswords = listOfPasswords.split('\n');

    if (password.length <= 4 || poorPasswords.includes(password)) {
      setPasswordStrength(0);
    }
    else if (password.length >= 5 && passwordCheckType() == 3) {
      setPasswordStrength(1);
    }
    else if (password.length >= 5 && passwordCheckType() == 4) {
      setPasswordStrength(2);
    }
  }

  const passwordStrengthView = () => {
    if (passwordStrength === 0) {
      return (
        <Text
            style={{
              color: appStyles.pinkColor,
              fontSize: appStyles.regularFontSize - 3,
              fontWeight: 'bold',
            }}
          >
            {translate('poorPassword')}
          </Text>
      );
    }
    if (passwordStrength === 1) {
      return (
        <Text
            style={{
              color: appStyles.blueColor,
              fontSize: appStyles.regularFontSize - 3,
              fontWeight: 'bold',
            }}
          >
            {translate('mediumPassword')}
          </Text>
      );
    }
    if (passwordStrength === 2) {
      return (
        <Text
            style={{
              color: '#298000',
              fontSize: appStyles.regularFontSize - 3,
              fontWeight: 'bold',
            }}
          >
            {translate('highPassword')}
          </Text>
      )
    }
  }

  const onChangePassword = (password) => {
    checkPasswordStrength();
    setPassword(password);
  }

  let onPress = () => {
    if (password !== repeat) {
      alert(translate('passwordMismatch'));
    } else if (!password || !repeat) {
      alert(translate('fillOutAllFields'));
    } else if (password.length <= 4) {
      alert(translate('passwordTooShort'));
    } else if (passwordStrength === 0)  {
      alert(translate('passwordNotStrong'));
    }
    else {
      // props.setUserInfo({password});
      // AsyncStorage.setItem('pass', password);
      // AsyncStorage.setItem('repeat', repeat);
      props.navigation.navigate('SignUpYesorNoPregnant', {
        liveMiami,
        name,
        dob,
        email,
        phone,
        password,
        question: translate('areYouPregnant'),
        value: 'pregnant',
      });
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={appStyles.signupContainer}
      enabled={false}
    >
      <TouchableHighlight
        onPress={Keyboard.dismiss}
        underlayColor="transparent"
        accessible={false}
      >
        <>
          <View style={appStyles.container}>
            <View
              style={{
                paddingTop: appStyles.win.height * 0.15,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
              }}
            >
              <Text style={appStyles.titleBlue}>
                {translate('createPassword')}
              </Text>
              <View style={{paddingTop: appStyles.win.height * 0.05}}>
                <TextBox
                  placeholder={translate('passwordInput')}
                  onChangeText={setPassword} 
                  onChangeText={onChangePassword}
                  secureTextEntry
                  value={password}
                  style={appStyles.TextInputMask}
                />

                <Text style={{color: appStyles.darkGreyColor, fontWeight: 'normal'}}>
                  Password Strength: {passwordStrengthView()}
                </Text>

                <TextBox
                  placeholder={translate('repeatPasswordInput')}
                  onChangeText={setRepeat}
                  secureTextEntry
                  value={repeat}
                  style={appStyles.TextInputMask}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              margin: '15%',
            }}
          >
            <Button
              style={appStyles.button}
              text={translate('continueButton')}
              onPress={onPress}
            />
          </View>
        </>
      </TouchableHighlight>
    </KeyboardAvoidingView>
  );
};
