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
import {StyleSheet} from 'react-native';
import appStyles from './AppStyles';
import Button from './Button';
import translate from './getLocalizedText';
import poorPasswords from './PoorPasswords';

export default SignUpPassword = (props) => {
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState();
  const [specialCharCount, setSpecialCharCount] = useState('');
  const [specialCharLowerCase, setSpecialCharLowerCase] = useState(false);
  const [specialCharNum, setSpecialCharNum] = useState(false);
  const [specialCharSymbol, setSpecialCharSymbol] = useState(false);
  const [specialCharUpperCase, setSpecialCharUpperCase] = useState(false);
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

  // Check when the user changes the password (types or deletes a character)
  let onInputPassword = (password) => {
    setPassword(password);
    checkPasswordStrength(password);
  };

  // Check the strength of the password
  let checkPasswordStrength = (password) => {
    setSpecialCharLowerCase(false);
    setSpecialCharNum(false);
    setSpecialCharSymbol(false);
    setSpecialCharUpperCase(false);

    let specialCharCount = 0;

    // Check if the password has special symbols
    if (/[a-z]/.test(password)) {
      specialCharCount++;
      setSpecialCharLowerCase(true); // the password contains a lower case letter
    }
    if (/[0-9]/.test(password)) {
      specialCharCount++;
      setSpecialCharNum(true); // the password contains a number
    }
    if (/[^A-Za-z0-9]/.test(password)) {
      specialCharCount++;
      setSpecialCharSymbol(true); // the password contains a symbol
    }
    if (/[A-Z]/.test(password)) {
      specialCharCount++;
      setSpecialCharUpperCase(true); // the password contains an upper case letter
    }
    setSpecialCharCount(specialCharCount);

    /*
      Set the password strength according to the criteria
      (0) 'Poor': length <= 4 & included in the list of poor passwords (User cannot continue)

      (1) 'Medium': Length >= 5 & not included in the list of poor passwords &
               includes 3 out of 4 types: letter, number, symbol, and capital letter (User can continue)

      (2) 'Strong': Length >= 5 & not included in the list of poor passwords &
                includes 4 out of 4 types: letter, number, symbol, and capital letter (User can continue)
    */
    if (password.length <= 4 && poorPasswords.includes(password)) {
      setPasswordStrength(0); // poor password
    } else if (password.length >= 5 && specialCharCount == 3) {
      setPasswordStrength(1); // medium password
    } else if (password.length >= 5 && specialCharCount == 4) {
      setPasswordStrength(2); // strong password
    } else {
      setPasswordStrength(0); // default
    }
  };

  let passwordStrengthIndicator = (passwordStrength) => {
    let indicatorColor;
    let indicatorText = 'Password Strength: ';

    if (passwordStrength == 0) {
      indicatorColor = appStyles.pinkColor;
      indicatorText += 'Poor';
    } else if (passwordStrength == 1) {
      indicatorColor = appStyles.blueColor;
      indicatorText += 'Medium';
    } else {
      indicatorColor = '#298000';
      indicatorText += 'High';
    }
    return (
      <View>
        <Text
          style={{
            color: indicatorColor,
            fontWeight: 'bold',
            padding: 15,
            textAlign: 'right',
            fontSize: 18,
          }}
        >
          {indicatorText}
        </Text>
      </View>
    );
  };

  let onPress = () => {
    if (password !== repeat) {
      alert(translate('passwordMismatch'));
    } else if (!password || !repeat) {
      alert(translate('fillOutAllFields'));
    } else if (password.length <= 4) {
      alert(translate('passwordTooShort'));
    } else if (passwordStrength == 0) {
      alert(translate('passwordPoor'));
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
              <View style={{paddingTop: appStyles.win.height * 0.05}}>
                <TextBox
                  placeholder={translate('passwordInput')}
                  // onChangeText={setPassword}
                  onChangeText={onInputPassword}
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
                {passwordStrengthIndicator(passwordStrength)}
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
