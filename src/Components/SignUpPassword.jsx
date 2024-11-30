import React, { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  Text,
  TextInput as TextBox,
  TouchableOpacity,
  View,
  TouchableHighlight,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import appStyles from './AppStyles';
import Button from './Button';
import translate from './getLocalizedText';
import poorPasswords from './poorPasswords'; // new

const SignUpPassword = (props) => {
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0); // new
  const [repeat, setRepeat] = useState('');
  const { liveMiami, name, dob, email, phone } = props.route.params;
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [show, setShow] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [visible, setVisible] = useState(true);
  const [visibleRepeat, setVisibleRepeat] = useState(true);
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
    if (password.length <= 4 || poorPasswords.includes(password)) {
      return 0; 
    }

    const lowercase = /[a-z]/.test(password);
    const uppercase = /[A-Z]/.test(password);
    const number = /\d/.test(password);
    const symbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const typeCount = [lowercase, uppercase, number, symbol].filter(Boolean).length;

    if (typeCount >= 3 && password.length >= 5 && !poorPasswords.includes(password)) {
      if (typeCount === 4) {
        return 2; //password is high
      }
      return 1; //password is medium
    }

    return 0; //password is poor
  };

  
  const passwordChnage = (newPassword) => {
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  
  const getPasswordStrength = () => {
    switch (passwordStrength) {
      case 1:
        return <Text style={styles.medium}>Medium</Text>;
      case 2:
        return <Text style={styles.high}>High</Text>;
      default:
        return <Text style={styles.poor}>Poor</Text>;
    }
  };

  

  let onPress = () => {
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
    } else if (passwordStrength === 0) {
      alert("Password is too weak. Please choose a stronger password.");
    } else if (passwordStrength === 1) {
      Alert.alert(
        "Your password is of medium Strength",
        "Your password is medium strength. Do you want to continue or edit your password?",
        [
          {
            text: "Edit",
            onPress: () => {},
            style: "cancel"
          },
          { text: "Continue", onPress: () => {
              
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
      // props.setUserInfo({ password });
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
              <View style={{ paddingTop: appStyles.win.height * 0.05 }}>
                <View>
                  <TextBox
                    placeholderTextColor={appStyles.DefaultPlaceholderTextColor}
                    style={appStyles.TextInputMask}
                    secureTextEntry={visible}
                    placeholder={translate('passwordInput')}
                    onChangeText={passwordChnage} 
                    value={password}
                    
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
               
                
                <View style={{ paddingTop: 10 }}>
                    {getPasswordStrength()}
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
              disabled={passwordStrength === 0} 
            />
          </View>
        </>
      </TouchableHighlight>
    </KeyboardAvoidingView>
  );
};

export default SignUpPassword;


const styles = StyleSheet.create({
  eyeShowPassword: {
    position: 'absolute',
    right: 30,
    top: 25,
  },
  poor: {
    color: '#DF2172',
    marginTop: 10,
  },
  medium: {
    color: '#0052A1',
    marginTop: 10,
  },
  high: {
    color: '#298000',
    marginTop: 10,
  },
});
