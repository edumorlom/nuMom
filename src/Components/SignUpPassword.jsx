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
import PoorPasswords from './PoorPasswords';

export default SignUpPassword = (props) => {
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const {liveMiami} = props.route.params;
  const {name} = props.route.params;
  const {dob} = props.route.params;
  const {email} = props.route.params;
  const {phone} = props.route.params;

  const passwordStrengthShow = (passwordStrength) => {
    // console.log(passwordStrength);

    if (passwordStrength === 0) {
      return (
        <Text style={{color: appStyles.pinkColor}}>
          Password Strength: Poor
        </Text>
      );
    }
    if (passwordStrength === 1) {
      return (
        <Text style={{color: appStyles.blueColor}}>
          Password Strength: Medium
        </Text>
      );
    }
    if (passwordStrength === 2) {
      return <Text style={{color: '#298000'}}> Password Strength: High</Text>;
    }
  };

  // function to check the strengh of the password
  const checkPasswordStrength = (password) => {
    let amount = 0;
    let poorPasswordList = PoorPasswords.split('\n');

    if (/([A-Z])/i.test(password)) {
      amount++;
    }
    if (/([0-9])/i.test(password)) {
      amount++;
    }
    if (/([!@#$%^&*])/i.test(password)) {
      amount++;
    }
    if (/([a-z])/.test(password)) {
      amount++;
    }
    if (password.length <= 4 || poorPasswordList.includes(password)) {
      return 0;
    }
    if (
      password.length >= 5 &&
      !poorPasswordList.includes(password) &&
      amount === 3
    ) {
      return 1;
    }
    if (
      password.length >= 5 &&
      !poorPasswordList.includes(password) &&
      amount === 4
    ) {
      return 2;
    }
  };

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

  let onPress = (passwordStrength) => {
    if (password !== repeat) {
      alert(translate('passwordMismatch'));
    } else if (!password || !repeat) {
      alert(translate('fillOutAllFields'));
    } else if (passwordStrength === 0) {
      alert('Password is not strong enough!');
    } else if (password.length < 5) {
      // Backup incase password checker not updated properly
      alert(translate('passwordTooShort'));
    } else {
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

  const pwdStrength = checkPasswordStrength(password);
  // console.log(pwdStrength);
  // console.log(password);

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
                  secureTextEntry
                  value={password}
                  style={appStyles.TextInputMask}
                />
                {passwordStrengthShow(pwdStrength)}
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
              onPress={() => {
                onPress(pwdStrength);
              }}
            />
          </View>
        </>
      </TouchableHighlight>
    </KeyboardAvoidingView>
  );
};
