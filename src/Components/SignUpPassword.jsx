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
//mimport appStyles from './AppStyles';
import appStyles, {pinkColor,blueColor} from './AppStyles';
import Button from './Button';
import translate from './getLocalizedText';
import Popup from './Popup';

export default SignUpPassword = (props) => {
  const [passwordStrength, setPasswordStrength] = useState('');
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
  const [showPopup, setShowPopup] = useState(false);

  //function for password strength checker
  function checkPasswordStrength(password) {
    setPassword(password);
    // Regular expressions to check for different criteria
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const passFoundinFile = forbiddenPasswords.indexOf(password) !== -1;
  

    // Check for lowercase, uppercase, numbers, and special characters
    let strengthLevel = 0;
    if (lowercaseRegex.test(password)) {
      strengthLevel += 1;
    }
    if (uppercaseRegex.test(password)) {
      strengthLevel += 1;
    }
    if (numberRegex.test(password)) {
      strengthLevel += 1;
    }
    if (specialCharRegex.test(password)) {
      strengthLevel += 1;
    }

    if (password.length <= 4 || passFoundinFile) {
      setPasswordStrength(0);
      return;
     }
  if (strengthLevel === 4 && password.length >=5) {
       setPasswordStrength(2);
     } else if (strengthLevel === 3 && password.length >=5) {
       setPasswordStrength(1);
     } else {
       setPasswordStrength(0);
     } 
     return
  }


  const getStrengthColor = () => {
    switch (strength) {
      case 0:
        return 'pink';
      case 1:
        return 'blue';
      case 2:
        return 'green';
      default:
        return 'black';
    }
  };




  useEffect(() => {
    AsyncStorage.getItem('pass').then((value) => {
      value !== null && value !== '' ? setPassword(value) : null;
    });
    AsyncStorage.getItem('repeat').then((value) => {
      value !== null && value !== '' ? setRepeat(value) : null;
    });
  }, []);

  let onPress = () => {
    if (password !== repeat) {
      alert(translate('passwordMismatch'));
    } else if (!password || !repeat) {
      alert(translate('fillOutAllFields'));
    } else if (password.length < 6) {
      alert(translate('passwordTooShort'));
    } else if (passwordStrength === 0) {
      alert(translate('Cannot Proceed with a weak password'));
    } else if (passwordStrength === 1) {
      setShowPopup(true);
  
     
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

  let onPress2 = () => {
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

                    <View style={[appStyles.strengthContainer, { justifyContent: 'center', alignItems: 'center', zIndex: 500 }]}>
                    {passwordStrength === 0 && (
                      <Text style={{ color: pinkColor, fontWeight: 'bold', textAlign: 'center' }}>Poor Strength: Cannot proceed without creating a stronger password</Text>
                    )}
                    {passwordStrength === 1 && (
                      <Text style={{ color: blueColor, fontWeight: 'bold', textAlign: 'center' }}>Medium: Adequate level of stength, but higher strength is preffered</Text>
                    )}
                    {passwordStrength === 2 && (
                      <Text style={{ color: '#298000', fontWeight: 'bold', textAlign: 'center' }}>High: Great password!</Text>
                    )}
                  </View>
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
              zIndex: 500,
            }}
          >
            <Button
              style={appStyles.button}
              text={translate('continueButton')}
              onPress={onPress}
            />
            {showPopup && (
        <View
          style={{
            position: 'abosulute',
            top: 0,
            left: 0,
            width: '100%',
            height: '50%',
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 5,
            }}
          >
            <Text>Would you like to edit your password or continue?</Text>
            <Button
              style={appStyles.button}
              text={translate('continueButton')}
              onPress={() => setShowPopup(false)}
            />
            <Button
              style={appStyles.button2}
              text={translate('button')}
              onPress={onPress2}
            />
            
          </View>
        </View>
      )}

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
