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

export default SignUpPassword = (props) => {
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const {liveMiami} = props.route.params;
  const {name} = props.route.params;
  const {dob} = props.route.params;
  const {email} = props.route.params;
  const {phone} = props.route.params;

  const checkPasswordStrength = (password) => {
    if(badPasswords.includes(password)){
      setPasswordStrength(0);
      return;
    }

    let typeCount = 0;
    if(/[A-Z]/.test(password)){ // tests capital
      typeCount++;
    }
    if(/[a-z]/.test(password)){ // tests letter
      typeCount++;
    }
    if(/[0-9]/.test(password)){ // tests number
      typeCount++;
    }
    if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)){ // tests symbol
      typeCount++;
    }
    
    if(typeCount == 4 && password.length >= 5) {
      setPasswordStrength(2);
    } else if(typeCount == 3 && password.length >= 5) {
      setPasswordStrength(1);
    } else{
      setPasswordStrength(0);
    }
  }

  const passwordViewStyle = (passwordStrength) => {
    let textColor;
    let textMsg;
    if(passwordStrength == 0){
      textColor = pinkColor;
      textMsg = "Password Strength: Poor"
    } else if (passwordStrength == 1){
      textColor = blueColor;
      textMsg = "Password Strength: Medium"
    } else{
      textColor = "#298000";
      textMsg = "Password Strength: High"
    }
    return <Text style={{color: textColor,  textAlign:"center"}}>{textMsg}</Text>
  }

  const onChangePass = (password) => {
    checkPasswordStrength(password);
    setPassword(password);
  }

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

  let onPress = () => {
    if (password !== repeat) {
      alert(translate('passwordMismatch'));
    } else if (!password || !repeat) {
      alert(translate('fillOutAllFields'));
    } else if (password.length <= 4) {
      alert(translate('passwordTooShort'));
    } else if(passwordStrength == 0){
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
                  onChangeText={onChangePass}
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
