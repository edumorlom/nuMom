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
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import {Input} from 'react-native-elements';
import {TextInput} from 'react-native-gesture-handler';
import appStyles, {blueColor, pinkColor, greenColor, regularFontSize} from './AppStyles';
import Button from './Button';
import translate from './getLocalizedText';
import badPasswordList from './BadPasswordList';

export default SignUpPassword = (props) => {
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordStrCheck, setStrCheck] = useState('');
  const validSymbols = ['~', '`', '!', '@', '#', '$', '%', '^',
  '&', '*', '(', ')', '_', '-', '+', '=', '{', '}', '[', ']', 
  '|', ':', ';', '"', '<', ',', '>', '.', '?', '/', '\\'];
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

  let onChangePassword = (password) => {
    checkStrength(password);
    setPassword(password);
  };

  function checkStrength(password) {

    let hasLower = false;
    let hasUpper = false;
    let hasNumber = false;
    let hasSymbol = false;
    let strCount = 0;

    for (let i = 0; i < password.length; i++) {
      if (password.charAt(i) >= '0' && password.charAt(i) <= '9') {
        hasNumber = true;
      } else if (validSymbols.includes(password.charAt(i))) {
        hasSymbol = true;
      } else if (password.charAt(i) == password.charAt(i).toLowerCase()) {
        hasLower = true;
      } else if (password.charAt(i) == password.charAt(i).toUpperCase()) {
        hasUpper = true;
      }
    }

    setStrCheck(
        (hasUpper ? 1 : 0) +
        (hasLower ? 1 : 0) +
        (hasSymbol ? 1 : 0) +
        (hasNumber ? 1 : 0)
    );

    if (badPasswordList.includes(password)) {
      setPasswordStrength(0);
      return;
    }

    if (password.length >= 5 && passwordStrCheck == 3) {
      setPasswordStrength(1); // If length + 3 requirements met, MEDIUM
    } else if (password.length >= 5 && passwordStrCheck == 4) {
      setPasswordStrength(2); // If length + all requirements met, HIGH
    } else {
      setPasswordStrength(0); // Else, POOR
    }
  }

  let displayComponent = (currentPasswordStrength) => {
    let dispColor;
    let dispMessage;

    if (currentPasswordStrength == 1 && password.length >= 5) {
      dispColor = blueColor;
      dispMessage = 'Password Strength: MEDIUM';
    } else if (currentPasswordStrength == 2 && password.length >= 5) {
      dispColor = greenColor;
      dispMessage = 'Password Strength: HIGH';
    } else {
      dispColor = pinkColor;
      dispMessage = 'Password Strength: POOR';
    }
    return (
      <Text style={{fontSize: regularFontSize, color: dispColor}}>
        {dispMessage}
      </Text>
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

              {displayComponent(passwordStrength)}

              <View style={{paddingTop: appStyles.win.height * 0.05}}>
                <View>
                  <TextBox
                    style={appStyles.TextInputMask}
                    secureTextEntry={visible}
                    placeholder={translate('passwordInput')}
                    onChangeText={onChangePassword}
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
