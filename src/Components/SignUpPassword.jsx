import React, {useEffect, useState} from 'react';
import {
  AsyncStorage,
  Keyboard,
  Text,
  Alert,
  TextInput as TextBox,
  TouchableOpacity,
  View,
  TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';
import {createNativeWrapper} from 'react-native-gesture-handler';
import appStyles from './AppStyles';
import Button from './Button';
import translate from './getLocalizedText';
import passwordList from './PasswordData';
import {blueColor} from './AppStyles';
import {pinkColor} from './AppStyles';
import {greyColor} from './AppStyles';
import {regularFontSize} from './AppStyles';

export default SignUpPassword = (props) => {
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const {liveMiami} = props.route.params;
  const {name} = props.route.params;
  const {dob} = props.route.params;
  const {email} = props.route.params;
  const {phone} = props.route.params;
  const [passwordStrength, setPasswordStrength] = useState('Poor'); // default state maybe should be something else besides poor b4 input

  // takes in the change of text as a parameter and sets the state of the label
  function passwordHandler(pword) {
    setPassword(pword);
    let conditionsMet = 0;

    // regex from https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters
    if (pword.search(/[0-9]/) >= 0) {
      conditionsMet++;
    }
    if (pword.search(/[a-z]/) >= 0) {
      conditionsMet++;
    }
    if (pword.search(/[A-Z]/) >= 0) {
      conditionsMet++;
    }
    if (pword.search(/[-!$%^&*()_+|~=`{}[:;<>?,.@#\]]/g) >= 0) {
      conditionsMet++;
    }

    if (conditionsMet == 4) {
      setPasswordStrength('High');
    }
    if (conditionsMet == 3) {
      setPasswordStrength('Medium');
    }

    let arrayOfPasswords = passwordList.split('\n');

    // case-sensitive so PASSWORD(in the file) is not the same as PaSSworD
    if (arrayOfPasswords.includes(pword) || pword.length <= 4) {
      setPasswordStrength('Poor');
    }

    // conditions that are automatically poor: in the list and length<=4
  }

  function getViewStyle(pwordStrength) {
    if (pwordStrength == 'High') {
      return {
        backgroundColor: greyColor,
        height: '25%',
        width: '100%',
        borderRadius: '75',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        left: '30%',
        top: '20%',
      };
    }
    if (pwordStrength == 'Medium') {
      return {
        backgroundColor: blueColor,
        height: '25%',
        width: '100%',
        borderRadius: '75',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        left: '30%',
        top: '20%',
      };
    }
    return {
      backgroundColor: pinkColor,
      height: '25%',
      width: '100%',
      borderRadius: '75',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 30,
      paddingRight: 30,
      left: '30%',
      top: '20%',
    };
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
    } else if (password.length < 4) {
      alert(translate('passwordTooShort'));
    } else if (passwordStrength == 'Poor') {
      Alert.alert(
        'Password must include three of these: letter, capital letter, number, or special character.'
      );
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
                  onChangeText={passwordHandler} // HERE
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
                <View style={getViewStyle(passwordStrength)}>
                  <Text style={{color: 'white', fontWeight: 'normal'}}>
                    Password strength: {passwordStrength}
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
