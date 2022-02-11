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


  let onChangePassword = (password) => {    
    setPassword(password);
    checkPasswordStrength(password);
  }

let checkPasswordStrength = (password) => { 

  setHasLowercase(false);
  setHasUppercase(false);
  setHasNum(false);
  setHasSymbol(false);

  let count = 0; 

  if(/[a-z]/.test(password))
  {
    count++;
    sethasLowercase(true);
  }
 
  if(/[A-Z]/.test(password))
  {
    count++;
    sethasUppercase(true);
  }

  if(/[0-9]/.test(password))
  {
    count++;
    sethasNum(true);
  }

  if(/[^A-Za-z0-9 ]/.test(password))
  {
    count++;
    sethasSymbol(true);
  }

  setCharCount(count);  

  if(badPasswords.includes(password))
  {
    setPasswordStrength(-1);
    return;
  }
  else if(charCount == 4 && password.length >= 5) 
  {
    setPasswordStrength(2);
  }
  else if(charCount == 3 && password.length >= 5)
  { 
    setPasswordStrength(1);
  }
  else  
  {                     
    setPasswordStrength(0);
  }
}

let passwordStyle = (passwordStrength) => {     

  let _color;
  let colorMessage;
  let errorMessage = "";

  let messageLowerCase = " \t- lowercase letter";
  let messageUpperCase = " \t- uppercase letter";
  let messageNum = " \t- number";
  let messageSymbol = " \t- symbol";

  let colorLowerCase = pinkColor, 
      colorUpperCase = pinkColor, 
      colorNum = pinkColor, 
      colorSymbol = pinkColor;


  if(passwordStrength == -1) 
  {
    errorMessage += " \n* Bad Password";
  }

  if(passwordStrength < 1)  
  {
    _color = pinkColor;
    colorMessage = "Password Strength: Poor";
  }
  else if(passwordStrength == 1) 
  {
    _color = blueColor;
    colorMessage = "Password Strength: Medium";
  }
  else if(passwordStrength == 2) 
  {
    _color = greenColor;
    colorMessage = "Password Strength: High";
  }

  if(password.length <= 4)  
      errorMessage += " \n* Password must be at least 5 characters";

  if(charCount < 3)  
      errorMessage += "\n* The password should contain atleast 3 of the following:";

  if(hasLowercase)      
    colorLowerCase = greenColor;
  if(hasUppercase)
    colorUpperCase = greenColor;
  if(hasNum)
    colorNum = greenColor;
  if(hasSymbol)
    colorSymbol = greenColor;

  return (
    <View >
      <Text style={{color: _color,  textAlign:"center"}}>{colorMessage}</Text>
      <Text style={{color: _color,  textAlign:"left"}}>{errorMessage}</Text>
      <Text style={{color: colorLowerCase,  textAlign:"left"}}>{messageLowerCase}</Text>
      <Text style={{color: colorUpperCase,  textAlign:"left"}}>{messageUpperCase}</Text>
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
    } else if (passwordStrength == 0){
      alert(translate('passwordWeak'));
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
