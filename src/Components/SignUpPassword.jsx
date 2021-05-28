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
import badPasswords from './BadPasswords';

export default SignUpPassword = (props) => {
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
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

  const passwordCheck = {
    strengthColor: appStyles.pinkColor, //color initialized to prevent error in style
    strengthMessage: '',
    buttonType: {...appStyles.buttonInactive}, //button BG color
    includesCapitalLetter: false,
    includessymbol: false,
    includesNum: false,
    includesLowerCase: false,
    allowContinue: false,
  };

  //checking for Uppercase, numbers and symbols
  for (let character of password.split('')) {
    if (character.charCodeAt(0) >= 65 && character.charCodeAt(0) <= 90) {
      passwordCheck.includesCapitalLetter = true;
    } else if (character.charCodeAt(0) >= 48 && character.charCodeAt(0) <= 57) {
      passwordCheck.includesNum = true;
    } else if (
      (character.charCodeAt(0) >= 32 && character.charCodeAt(0) <= 47) ||
      (character.charCodeAt(0) >= 58 && character.charCodeAt(0) <= 64) ||
      (character.charCodeAt(0) >= 91 && character.charCodeAt(0) <= 96) ||
      (character.charCodeAt(0) >= 123 && character.charCodeAt(0) <= 126)
    ) {
      passwordCheck.includessymbol = true;
    } else if (
      character.charCodeAt(0) >= 97 &&
      character.charCodeAt(0) <= 122
    ) {
      passwordCheck.includesLowerCase = true;
    }
  }

  if (password.length < 5 && repeat.length > 0) {
    passwordCheck.strengthMessage = translate('passTooShort');
  } else if (badPasswords.split(',').includes(password)) {
    passwordCheck.strengthMessage = translate('passUnsafe');
  } else if (!(password === repeat) && repeat.length > 1) {
    passwordCheck.strengthMessage = translate('passNoMatch');
  } else if (
    (passwordCheck.includesNum &&
      !passwordCheck.includessymbol &&
      !passwordCheck.includesLowerCase &&
      !passwordCheck.includesCapitalLetter) ||
    (!passwordCheck.includesNum &&
      !passwordCheck.includessymbol &&
      passwordCheck.includesLowerCase &&
      !passwordCheck.includesCapitalLetter) ||
    (!passwordCheck.includesNum &&
      passwordCheck.includessymbol &&
      !passwordCheck.includesLowerCase &&
      !passwordCheck.includesCapitalLetter) ||
    (!passwordCheck.includesNum &&
      !passwordCheck.includessymbol &&
      !passwordCheck.includesLowerCase &&
      passwordCheck.includesCapitalLetter)
  ) {
    passwordCheck.strengthMessage = translate('passwordReq');
  } else if (
    password.length >= 5 &&
    repeat === password &&
    !badPasswords.split(',').includes(password)
  ) {
    passwordCheck.buttonType = {...appStyles.button};
    passwordCheck.allowContinue = true;
    passwordCheck.strengthColor = appStyles.blueColor;
    passwordCheck.strengthMessage = translate('passMedium');

    if (
      passwordCheck.includesNum &&
      passwordCheck.includessymbol &&
      passwordCheck.includesCapitalLetter &&
      passwordCheck.includesLowerCase
    ) {
      passwordCheck.strengthColor = '#298000';
      passwordCheck.strengthMessage = translate('passHigh');
    }
  }

  let onPress = () => {
    if (passwordCheck.allowContinue) {
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
    } else return;
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

                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: passwordCheck.strengthColor,
                      display: 'flex',
                    }}
                  >
                    {passwordCheck.strengthMessage}
                  </Text>
                </View>
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
              style={passwordCheck.buttonType}
              text={translate('continueButton')}
              onPress={onPress}
            />
          </View>
        </>
      </TouchableHighlight>
    </KeyboardAvoidingView>
  );
};
