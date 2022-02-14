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

export default SignUpPassword = (props) => {
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [passwordStrength, setPassStrength] = useState('');
  const [charCount, setCount] = useState('');
  const [carryLowerCase, setCarryLower] = useState(false);
  const [carryUpper, setCarryUpper] = useState(false);
  const [number, setNum] = useState(false);
  const [carrySymbol, setCarrySymbol] = useState(false);
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
// if user makes changes to password, save password, check password strength
  let changePassword = (password) => {
    setPassword(password);
    checkPassStrength(password);
  };

  // checking the user's password
  let checkPassStrength = (password) => {

    //initialize variables
    setCarryLower(false);
    setCarryUpper(false);
    setCarrySymbol(false);
    setNum(false);

    //variable depicting the number of characters in each
    let charCount = 0;

    //check if the password contains a lowercase letter then increase charCount
    if (/[a-z]/.test(password)) {

      charCount++;
      setCarryLower(true);
    }
    //check if the password contains an uppercase letter then increase charCount
    if (/[A-Z]/.test(password)) {

      charCount++;
      setCarryUpper(true);
    }
    //check if the password contains a number then increase charCount
    if (/[0-9]/.test(password)) {

      charCount++;
      setNum(true);
    }
    //check if the  password contains a symbol in it then increase charcount
    if (/[^A-Za-z0-9]/.test(password)) {

      charCount++;
      setCarrySymbol(true);
    }

    setCount(charCount);

     // if the password length is <= 4 and is in the list of badpasswords
    if (password.length <= 4 && badPasswords.includes(password)) {

      setPassStrength(0); // bad password
    }

    // if the password length is >= 5 and has three of the four types of groups
    else if (password.length >= 5 && charCount == 3) {

      setPassStrength(1); // medium password
    }

    // if the password length is >= 5 and has all four types of groups then strong password
    else if (password.length >= 5 && charCount == 4) {
 setPassStrength(2); // strong password
    }
 else {

      setPassStrength(0); // for any other varitations of the password
    }
  };

  let passwordStyle = (passwordStrength) => {
    let color;
    let message = '';

    if (passwordStrength == 0) {

     color = appStyles.pinkColor;
      message = 'Password Strength: Poor';

    }
   else if (passwordStrength == 1) {

      color = appStyles.blueColor;
      message = 'Password Strength: Medium';

    }
    else {
      color = '#298000';
      message = 'Password Strength: High';

    }
    return (
      <View>
        <Text style={{color: colors, textAlign: 'center'}}>{message}</Text>

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
      alert(translate('passwordWeak'))
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
