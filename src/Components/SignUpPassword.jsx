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
import appStyles, {blueColor, pinkColor} from './AppStyles';
import Button from './Button';
import translate from './getLocalizedText';
import badPasswords from './BadPasswords';
import { setNotificationChannelGroupAsync } from 'expo-notifications';

export default SignUpPassword = (props) => {
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [typeCount, setTypeCount] = useState('');
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

  let onChangePassword = () => {
    if(badPasswords.includes(password))
    {
      setPasswordStrength(0);
      return;
    }

    let charCount = 0;
    for(i = 0; i < password.length; i++)
      if(/[A-Z]/.test(password))
      {
        charCount += 1000;
        setTypeCount(charCount);
        break;
      }
    for(i = 0; i < password.length; i++)
      if(/[a-z]/.test(password))
      {
        charCount += 100;
        setTypeCount(charCount);
        break;
      }
    for(i = 0; i < password.length; i++)
      if(/[0-9]/.test(password))
      {
        charCount += 10;
        setTypeCount(charCount);
        break;
      }
    for(i = 0; i < password.length; i++)
      if(/[^A-Za-z0-9 ]/.test(password))
      {
        charCount += 1;
        setTypeCount(charCount);
        break;
      }
    
    if(charCount == 1111)
      setPasswordStrength(2)
    else if(charCount == 1110 || charCount == 1101 || charCount == 1011 || charCount == 0111)
      setPasswordStrength(1)
    else
      setPasswordStrength(0)

      setPassword(password)
  }

  let passwordStyle = (passwordStrength) => {
    let _color;
    let message;
    if(passwordStrength == 0)
    {
      _color = pinkColor;
      message = "Password Strength: Poor"
    }
    if(passwordStrength == 1)
    {
      _color = blueColor;
      message = "Password Strength: Medium"
      if(typeCount == 1110)
        message += " (Password is missing a symbol)"
      if(typeCount == 1101)
        message += " (Password is missing a number)"
      if(typeCount == 1011)
        message += " (Password is missing a lower-case letter)"
      if(typeCount == 0111)
        message += " (Password is missing a capital letter)"
    }
    if(passwordStrength == 2)
    {
      _color = "#298000";
      message = "Password Strength: High"
    }
    return <Text style={{color: _color,  textAlign:"center"}}>{message}</Text>
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

                {passwordViewStyle(passwordStrength)}
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
