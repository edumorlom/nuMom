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
import appStyles, {
  blueColor,
  pinkColor,
  greyColor,
  regularFontSize,
} from './AppStyles';
import Button from './Button';
import translate from './getLocalizedText';
import lowStrengthPasswords from './LowStrengthPassword';

export default SignUpPassword = (props) => {
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [passwordLevel, setPasswordLevel] = useState('');
  const [check, setCheck] = useState('');
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

  function PasswordChecker(password) {
    let status;

    const symbols = [
      ' ',
      '!',
      '"',
      '#',
      '$',
      '%',
      '^',
      '&',
      '(',
      ')',
      '*',
      '+',
      ',',
      '.',
      '-',
      '/',
      ':',
      ';',
      '<',
      '>',
      '?',
      '@',
      '[',
      ']',
      '{',
      '}',
      '_',
      '~',
      '|',
    ];

    let hasUpperCase = false;
    let hasLowerCase = false;
    let hasSymbol = false;
    let hasNumber = false;

    for (let i = 0; i < password.length; i++) {
      if (password.charAt(i) >= '0' && password.charAt(i) <= '9') {
        hasNumber = true;
      } else if (symbols.includes(password.charAt(i))) {
        hasSymbol = true;
      } else if (password.charAt(i) == password.charAt(i).toLowerCase()) {
        hasLowerCase = true;
      } else if (password.charAt(i) == password.charAt(i).toUpperCase()) {
        hasUpperCase = true;
      }
    }
    setCheck(
      (hasUpperCase ? 1 : 0) +
        (hasLowerCase ? 1 : 0) +
        (hasSymbol ? 1 : 0) +
        (hasNumber ? 1 : 0)
    );

    if (password.length >= 5 && check == 3) {
      setPasswordLevel(1);
    } else if (password.length >= 5 && check == 4) {
      setPasswordLevel(2);
    } else {
      setPasswordLevel(0);
    }
  }
  let passwordStatusComponent = (currentPasswordLevel) => {
    let textComponentColor;
    let textComponentMessage;
    let isPasswordInBadList = lowStrengthPasswords.includes(password);
    if (isPasswordInBadList) {
      textComponentMessage = 'Password Strength: Low';
      return;
    }

    if (currentPasswordLevel == 1 && password.length >= 5) {
      textComponentColor = blueColor;
      textComponentMessage = 'Password Strength: Medium';
    } else if (currentPasswordLevel == 2 && password.length >= 5) {
      textComponentColor = pinkColor;
      textComponentMessage = 'Password Strength: High';
    } else {
      textComponentColor = greyColor;
      textComponentMessage = 'Password Strength: Low';
    }
    return (
      <Text style={{fontSize: regularFontSize, color: textComponentColor}}>
        {textComponentMessage}
      </Text>
    );
  };
  let passwordProtection = (password) => {
    PasswordChecker(password);
    setPassword(password);
  };
  let onPress = () => {
    if (password !== repeat) {
      alert(translate('passwordMismatch'));
    } else if (!password || !repeat) {
      alert(translate('fillOutAllFields'));
    } else if (password.length <= 4) {
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

              {passwordStatusComponent(passwordLevel)}

              <View style={{paddingTop: appStyles.win.height * 0.05}}>
                <TextBox
                  placeholder={translate('passwordInput')}
                  onChangeText={passwordProtection}
                  secureTextEntry
                  value={password}
                  style={appStyles.TextInputMask}
                />

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
