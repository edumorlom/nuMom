import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  Text,
  TextInput as TextBox,
  TouchableOpacity,
  View,
  TouchableHighlight,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import appStyles from './AppStyles';
import Button from './Button';
import translate from './getLocalizedText';
import poorPasswords from './poorPasswords';

export default SignUpPassword = (props) => {
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const { liveMiami, name, dob, email, phone } = props.route.params;
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [show, setShow] = React.useState(false);
  const [showRepeat, setShowRepeat] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [visibleRepeat, setVisibleRepeat] = React.useState(true);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const special_chars = ['!', '#', '$', '*', '%'];
  let containsSpecialChar = false;

  useEffect(() => {
    AsyncStorage.getItem('pass').then((value) => {
      value !== null && value !== '' ? setPassword(value) : null;
    });
    AsyncStorage.getItem('repeat').then((value) => {
      value !== null && value !== '' ? setRepeat(value) : null;
    });
  }, []);

  const checkPasswordStrength = (password) => {
    const lowerCase = /[a-z]/.test(password);
    const upperCase = /[A-Z]/.test(password);
    const number = /[0-9]/.test(password);
    const symbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const isPoor = password.length <= 4 || poorPasswords.includes(password);
    const isMedium = password.length >= 5 && [lowerCase, upperCase, number, symbol].filter(Boolean).length === 3 && !poorPasswords.includes(password);
    const isHigh = password.length >= 5 && [lowerCase, upperCase, number, symbol].filter(Boolean).length === 4 && !poorPasswords.includes(password);

    if (isPoor) return 0;
    if (isMedium) return 1;
    if (isHigh) return 2;
    return 0;
  };

  let onPress = () => {
    if (passwordStrength === 0) {
      alert(translate('passwordTooWeak'));
      return;
    }

    for (let i = 0; i < password.length; i++) {
      if (special_chars.includes(password[i])) {
        containsSpecialChar = true;
        break;
      }
    }

    if (password !== repeat) {
      alert(translate('passwordMismatch'));
    } else if (!password || !repeat) {
      alert(translate('fillOutAllFields'));
    } else if (password.length < 6) {
      alert(translate('passwordTooShort'));
    } else if (!containsSpecialChar) {
      alert(translate('passwordWeak'));
    } else if (passwordStrength === 1) {
      Alert.alert(
        "Warning",
        "The password entered has a medium level of strength we suggest that a good password must have at least 6 characters, a lowercase, an uppercase, a number, and a symbol. Do you want to improve it or continue with the one that you have?",
        [
          {
            text: 'Edit',
            onPress: () => { },
            style: 'cancel'
          },
          {
            text: 'Continure',
            onPress: () => {
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
          }
        ]
      );
    } else {
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

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'pink';
    if (passwordStrength === 1) return 'blue';
    if (passwordStrength === 2) return '#298000';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return 'Poor';
    if (passwordStrength === 1) return 'Medium';
    if (passwordStrength === 2) return 'High';
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
              <View style={{ paddingTop: appStyles.win.height * 0.05 }}>
                <View>
                  <TextBox
                    placeholderTextColor={appStyles.DefaultPlaceholderTextColor}
                    style={appStyles.TextInputMask}
                    secureTextEntry={visible}
                    placeholder={translate('passwordInput')}
                    onChangeText={(text) => {
                      setPassword(text);
                      setPasswordStrength(checkPasswordStrength(text));
                    }}
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
                    placeholderTextColor={appStyles.DefaultPlaceholderTextColor}
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
                      name={showRepeat === false ? 'eye-outline' : 'eye-off-outline'}
                      size={26}
                      color={appStyles.pinkColor}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ paddingTop: 20, paddingLeft: 15 }}>
                  <Text style={{ color: getPasswordStrengthColor(), fontSize: 20 }}>
                    {getPasswordStrengthText()}
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

const styles = StyleSheet.create({
  eyeShowPassword: {
    position: 'absolute',
    right: 30,
    top: 25,
  },
});