import React, {useEffect, useState} from 'react';
import forbiddenPasswords from './forbiddenPasswords';
import {
  Keyboard,
  Text,
  TextInput as TextBox,
  TouchableOpacity,
  View,
  TouchableHighlight,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import {Input} from 'react-native-elements';
import {TextInput} from 'react-native-gesture-handler';
//import appStyles from './AppStyles';
import appStyles, {pinkColor,blueColor} from './AppStyles';
import Button from './Button';
import translate from './getLocalizedText';

export default SignUpPassword = (props) => {
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const {liveMiami} = props.route.params;
  const {name} = props.route.params;
  const {dob} = props.route.params;
  const {email} = props.route.params;
  const {phone} = props.route.params;
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [show, setShow] = React.useState(false);
  const [showRepeat, setShowRepeat] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [visibleRepeat, setVisibleRepeat] = React.useState(true);
  const [passwordStrength, setPasswordStrength] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('pass').then((value) => {
      value !== null && value !== '' ? setPassword(value) : null;
    });
    AsyncStorage.getItem('repeat').then((value) => {
      value !== null && value !== '' ? setRepeat(value) : null;
    });
  }, []);

  /*
  let onPress = () => {
    if (password !== repeat) {
      alert(translate('passwordMismatch'));
    } else if (!password || !repeat) {
      alert(translate('fillOutAllFields'));
    } else if (password.length < 6) {
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
  */

  let onPress = () => {
  console.log('Password:', password);
  console.log('Repeat:', repeat);

  if (password !== repeat) {
    console.log('Passwords dont match');
    alert(translate('passwordMismatch'));
  } else if (!password || !repeat) {
    console.log('Password or Repeat is empty');
    alert(translate('fillOutAllFields'));
  } else if (password.length < 6) {
    console.log('Password is too short');
    alert(translate('passwordTooShort'));
  } else if (passwordStrength === 0) {
    console.log('Password is weak');
    alert('Password is still weak');
  } else {
    console.log('Passwords match');
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

  //Primary function for checking password strength.
  const checkPasswordStrength = (password) => {

    setPassword(password);

    const passFoundinFile = forbiddenPasswords.indexOf(password) !== -1;
  
    if (password.length <= 4 || passFoundinFile) {
      setPasswordStrength(0);
    } else if(password.length <=4 && (passwordCaseTest(password) <= 2)){
      setPasswordStrength(0);
    } else if(password.length >=5 && (passwordCaseTest(password) == 3)){
      setPasswordStrength(1);
    } else if(password.length >=5 && (passwordCaseTest(password) == 4)){
      setPasswordStrength(2);
    }

    return;
  };
  
  //Supplementary function to count how many of the 4 criteria the password follows
  //using a point system, where if the count is 0-2 (poor), 3 medium, and 4 high.
  const passwordCaseTest = (password) => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    let count = 0;
  
    if (hasLowerCase) {
      count++; 
    }
    if (hasUpperCase) {
      count++; 
    }
    if (hasNumber) {
      count++; 
    }
    if (hasSymbol) {
      count++; 
    }
     
    return count;
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
                <View>
                  <TextBox
                    style={appStyles.TextInputMask}
                    secureTextEntry={visible}
                    placeholder={translate('passwordInput')}
                    onChangeText={checkPasswordStrength}
                  />
                  <View style={appStyles.strengthContainer}>
                      {passwordStrength === 0 && (
                        <Text style={{color: pinkColor}}>Poor password</Text>
                      )}
                      {passwordStrength === 1 && (
                        <Text style={{color : blueColor}}>Medium password</Text>
                      )}
                      {passwordStrength === 2 && (
                        <Text style={{color : '#298000'}}>High password</Text>
                      )}
                  </View>
                  <TouchableOpacity
                    style={styles.eyeShowPassword}
                    onPress={() => {
                      setVisible(!visible);
                      setShow(!show);
                    }}
                  >
                    <Icon
                      name={show === false ? 'eye-outline' : 'eye-off-outline'}
                      size={26}
                      color={appStyles.pinkColor}
                    />
                  </TouchableOpacity>
                </View>

                <View>
                  <TextBox
                    placeholder={translate('repeatPasswordInput')}
                    onChangeText={setRepeat}
                    secureTextEntry={visibleRepeat}
                    value={repeat}
                    style={appStyles.TextInputMask}
                  />
                  <TouchableOpacity
                    style={styles.eyeShowPassword}
                    onPress={() => {
                      setVisibleRepeat(!visibleRepeat);
                      setShowRepeat(!showRepeat);
                    }}
                  >
                    <Icon
                      name={
                        showRepeat === false ? 'eye-outline' : 'eye-off-outline'
                      }
                      size={26}
                      color={appStyles.pinkColor}
                    />
                  </TouchableOpacity>
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

const styles = StyleSheet.create({
  eyeShowPassword: {
    position: 'absolute',
    right: 30,
    top: 25,
  },
});
