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

  const [isLowercase, setIsLowercase] = useState(false);
  const [isUppercase, setIsUppercase] = useState(false);
  const [isNum, setIsNum] = useState(false);
  const [isSymbol, setIsSymbol] = useState(false);

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
    
  let checkPassword = (password) => {
    
    setIsLowercase(false);
    setIsUppercase(false);
    setIsNum(false);
    setIsSymbol(false);

    let charCount = 0;

    for(let i = 0; i < password.length; i++)  // check to see if password has a lowercase letter
      if(/[a-z]/.test(password))
      {
        charCount++;
        setIsLowercase(true);
        break;
      }
    for(let i = 0; i < password.length; i++)  // check to see if password has a uppercase letter
      if(/[A-Z]/.test(password))
      {
        charCount++;
        setIsUppercase(true);
        break;
      }
    for(let i = 0; i <= password.length; i++)  // check to see if password has a number
      if(/[0-9]/.test(password))
      {
        charCount++;
        setIsNum(true);
        break;
      }
    for(let i = 0; i <= password.length; i++)  // check to see if password has a symbol
      if(/[^A-Za-z0-9 ]/.test(password))
      {
        charCount++;
        setIsSymbol(true);
        break;
      }
    
    setCharCount(charCount);

      if(badPasswords.includes(password)) // if the password is found in the list of bad passwords, set the passwordStrength to 0 ('poor')
      {
        setPasswordStrength(0);
        return;
      }
    
    if(charCount == 4 && password.length >= 5) // if the criteria for 'high' password strength is met, set passwordStrength to 2
      setPasswordStrength(2)
    else if(charCount == 3 && password.length >= 5) // else, if the criteria for 'medium' password strength is met, set passwordStrength to 1
      setPasswordStrength(1)
    else                        // otherwise... set the passwordStrength to 0 ('poor')
      setPasswordStrength(0)

      
  }

  let onChangePassword = (password) => {
    setPassword(password);
    checkPassword(password);
  }

  let passwordStyle = (passwordStrength) => {
    let _color;
    let message;
    let message2 = "";
    
    let messageLower = " \t- lowercase letter"
    let messageUpper = " \t- uppercase letter"
    let messageNum = " \t- number"
    let messageSymbol = " \t- symbol"

    let colorLower = pinkColor, colorUpper = pinkColor, colorNum = pinkColor, colorSymbol = pinkColor;
    
    if(passwordStrength == 0)
    {
      _color = pinkColor;
      message = "Password Strength: Poor"
      if(password.length <= 4)
        message2 += " \n* Password must be at least 5 characters"
      
        if(!isLowercase && !isUppercase && !isNum && !isSymbol)  // if there are NONE of the character types (uppercase, lowercase, number, symbol)
        {
          message2 += "\n* The password should contain atleast 3 of the following:"
        }
        else if( charCount == 1 )  // if there is ONE of the character types (uppercase, lowercase, number, symbol)
        {
          message2 += "\n* The password should contain atleast 2 more of the following:"
        }
        else  // if there are TWO of the character types (uppercase, lowercase, number, symbol)
        {
          message2 += "\n* The password should contain atleast 1 more of the following: "
        }
      
      
    }
    if(passwordStrength == 1)
    {
      _color = blueColor;
      message = "Password Strength: Medium"
    }
    if(passwordStrength == 2)
    {
      _color = "#298000";
      message = "Password Strength: High"
    }

    if(isLowercase)
      colorLower = "#298000";
    if(isUppercase)
      colorUpper = "#298000";
    if(isNum)
      colorNum = "#298000";
    if(isSymbol)
      colorSymbol = "#298000";

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
