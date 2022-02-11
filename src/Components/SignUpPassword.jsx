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
import appStyles, {blueColor, pinkColor, greenColor} from './AppStyles';
import Button from './Button';
import translate from './getLocalizedText';
import badPasswords from './BadPasswords';
import { setNotificationChannelGroupAsync } from 'expo-notifications';

export default SignUpPassword = (props) => {
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [charCount, setCharCount] = useState('');

  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasNum, setHasNum] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);

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

    let onChangePassword = (password) => {    // when the user changes the input field of the password...
      setPassword(password);
      checkPassword(password);
    }
    
  let checkPassword = (password) => { // check if the password meets requirements...
    
    // initializing variables for characters found in the password as false
    setHasLowercase(false);
    setHasUppercase(false);
    setHasNum(false);
    setHasSymbol(false);

    let charCount = 0;  // local variable for determining the number of unique character groups (lowercase, uppercase, number, symbol)

    // If password has a lowercase letter, increment charCount and set hasLowercase to true
    if(/[a-z]/.test(password))
    {
      charCount++;
      sethasLowercase(true);
    }
    // check to see if password has a uppercase letter, increment charCount and set hasUppercase to true
    if(/[A-Z]/.test(password))
    {
      charCount++;
      sethasUppercase(true);
    }
    // check to see if password has a number, increment charCount and set hasNum to true
    if(/[0-9]/.test(password))
    {
      charCount++;
      sethasNum(true);
    }
    // check to see if password has a symbol, increment charCount and set hasSymbol to true
    if(/[^A-Za-z0-9 ]/.test(password))
    {
      charCount++;
      sethasSymbol(true);
    }
    
    setCharCount(charCount);  // set the global variable charCount to the value of the local variable.

    // if the password is found in the list of bad passwords, set the passwordStrength to -1 ('poor' + bad password list)
    if(badPasswords.includes(password))
    {
      setPasswordStrength(-1);
      return;
    }
    
    if(charCount == 4 && password.length >= 5) // if the criteria for 'high' password strength is met, set passwordStrength to 2
      setPasswordStrength(2)
    else if(charCount == 3 && password.length >= 5) // else, if the criteria for 'medium' password strength is met, set passwordStrength to 1
      setPasswordStrength(1)
    else                        // otherwise... set the passwordStrength to 0 ('poor')
      setPasswordStrength(0)
  }

  let passwordStyle = (passwordStrength) => {     // changing how messages are shown to the user to help understand if their password is good or not and why.
    
    // declaring variables for messages and their colors
    let _color;
    let message;
    let message2 = "";
    
    let messageLower = " \t- lowercase letter"
    let messageUpper = " \t- uppercase letter"
    let messageNum = " \t- number"
    let messageSymbol = " \t- symbol"

    let colorLower = pinkColor, 
        colorUpper = pinkColor, 
        colorNum = pinkColor, 
        colorSymbol = pinkColor;
    
    if(passwordStrength < 1)  // if the password does not meet valid requirements, warn the user
    {
      _color = pinkColor;
      message = "Password Strength: Poor"
    }
    if(passwordStrength == -1) // if the password was found in the badPasswords list, warn the user
    {
      message2 += " \n* Password was found on our list of bad passwords"
    }
    if(passwordStrength == 1) // if the password meets requirements for 'medium' password strength...
    {
      _color = blueColor;
      message = "Password Strength: Medium"
    }
    if(passwordStrength == 2) // if the password meets requirements for 'high' password strength...
    {
      _color = greenColor;
      message = "Password Strength: High"
    }

    if(password.length <= 4)  // if the password is not long enough (5 characters), warn the user
      message2 += " \n* Password must be at least 5 characters"
    
    if(charCount < 3)  // if there are NONE of the character types (lowercase, uppercase, number, symbol)
        message2 += "\n* The password should contain atleast 3 of the following:"

    if(hasLowercase)             // if there is a lowercase letter, turn the color for the 'lowercase letter' message green
      colorLower = greenColor;
    if(hasUppercase)             // if there is an uppercase letter, turn the color for the 'uppercase letter' message green
      colorUpper = greenColor;
    if(hasNum)                   // if there is a number, turn the color for the 'number' message green
      colorNum = greenColor;
    if(hasSymbol)                // if there is a symbol, turn the color for the 'symbol' message green
      colorSymbol = greenColor;

    return (
      <View >
        <Text style={{color: _color,  textAlign:"center"}}>{message}</Text>
        <Text style={{color: _color,  textAlign:"left"}}>{message2}</Text>
        <Text style={{color: colorLower,  textAlign:"left"}}>{messageLower}</Text>
        <Text style={{color: colorUpper,  textAlign:"left"}}>{messageUpper}</Text>
        <Text style={{color: colorNum,  textAlign:"left"}}>{messageNum}</Text>
        <Text style={{color: colorSymbol,  textAlign:"left"}}>{messageSymbol}</Text>
      </View>
    );
  }

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
                  onChangeText={onChangePassword}
                  secureTextEntry
                  value={password}
                  style={appStyles.TextInputMask}
                />

                {passwordStyle(passwordStrength)}
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
