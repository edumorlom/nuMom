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
  StyleSheet,
} from 'react-native';
import {StyleSheet} from 'react-native';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import {Input} from 'react-native-elements';
import {TextInput} from 'react-native-gesture-handler';
import appStyles from './AppStyles';
import Button from './Button';
import translate from './getLocalizedText';
import poorPasswords from './badpasswords';


export default SignUpPassword = (props) => {
  const [password, setPassword] = useState('');
  const [passStrength, setPassStrength] = useState();
  const [CharCount, setCharCount] = useState('');
  const [CharLower, setCharLower] = useState(false);
  const [Number, setNumber] = useState(false);
  const [Symbol, setSymbol] = useState(false);
  const [CharUpper, setCharUpper] = useState(false);
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


  // examines any changes made in password by user, saves it and checks the password strength
  let userPass = (password) => {
    setPassword(password);
    userPassStrengthCheck(password);
  };

  // examines strength of user's password
  let userPassStrengthCheck = (password) => {
    setSymbol(false);
    setNumber(false);
    setCharLower(false);
    setCharUpper(false);

    let CharCount = 0;


    // examines if the user's password has a symbol
    if (/[^A-Za-z0-9]/.test(password)) {
      CharCount++;
      setSymbol(true); // set true if the user's password has a symbol
    }

    // examines if the user's password has a number
    if (/[0-9]/.test(password)) {
      CharCount++;
      setNumber(true); // set true if the user's password has a number
    }    

    // examines if the user's password has an lower case letter
    if (/[a-z]/.test(password)) {
      CharCount++;
      setCharLower(true); // set true if the user's password has an lower case letter
    }

    // examines if the user's password has an upper case letter
    if (/[A-Z]/.test(password)) {
      CharCount++;
      setCharUpper(true); // set true if the user's password has an upper case letter
    }

    setCharCount(CharCount);

    // examines if the length of the user's password is <= 4 and is found in the list of bad passwords
    if (password.length <= 4 && badpasswords.includes(password)) {
      setPassStrength(0); // strength of password is poor 
    } 
    // examines if the length of the user's password is >= 5 and it contains 3 of the 4 types (lower case, caps letter, number, symbol)
    else if (password.length >= 5 && CharCount == 3) {
      setPassStrength(1); // strength of password is medium 
    } 
    // examines if the length of the user's password is >= 5 and it contains 4 of the 4 types (lower case, caps letter, number, symbol)
    else if (password.length >= 5 && CharCount == 4) {
      setPassStrength(2); // strength of password is strong 
    } else {
      setPassStrength(0); // else, set user's password strength to poor
    }
  };

  let passStrengthDisplay = (passwordStrength) => {
    let displayColor;
    let displayText = 'Password Strength: ';

    if (passwordStrength == 0) {
      displayColor = appStyles.pinkColor;
      displayText += 'Poor';
    } else if (passwordStrength == 1) {
      displayColor = appStyles.blueColor;
      displayText += 'Medium';
    } else {
      displayColor = '#298000';
      displayText += 'High';
    }
    return (
      <View>
        <Text
          style={{color: displayColor, fontWeight: 'bold', padding: 15, textAlign: 'right', fontSize: 18,}}>
          {displayText}
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
              {passStrengthDisplay(passStrength)}
              <View style={{paddingTop: appStyles.win.height * 0.05}}>
                <View>
                  <TextBox
                    style={appStyles.TextInputMask}
                    secureTextEntry={visible}
                    placeholder={translate('passwordInput')}
                    onChangeText={userPass}
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

                  {passStrengthDisplay(passStrength)}

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