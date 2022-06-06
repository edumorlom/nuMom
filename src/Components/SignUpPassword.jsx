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
import appStyles from './AppStyles';
import Button from './Button';
import translate from './getLocalizedText';
import appStyles, { blueColor, pinkColor, greenColor, regularFontSize } from './AppStyles';
import poorPass from './PoorPass ';

export default SignUpPassword = (props) => {
    const [password, setPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useStates('');
    const [charCount, setCount] = useState('');
    const [lowerCase, setLower] = useState(false);
    const [upperCase, setUpper] = useState(false);
    const [symbol, setSymbol] = useState(false);
    const [number, setNum] = useState(false);
    const [repeat, setRepeat] = useState('');
    const { liveMiami } = props.route.params;
    const { name } = props.route.params;
    const { dob } = props.route.params;
    const { email } = props.route.params;
    const { phone } = props.route.params;
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

    let userPassword = (password) => {
        setPassword(password);
        checkStrength(password);
    };

    let checkStrength = (password) => {
        setLower(fasle);
        setUpper(false);
        setSymbol(false);
        setNum(false);


        let charCount = 0;

        if (/[a-z]/.test(password)) {
            charCount++;
            setLower(true);
        }

        if (/[A-Z]/.test(password)) {
            charCount++;
            setUpper(true);
        }

        if (/[^A-Za-z0-9]/.test(password)) {
            charCount++;
            setSymbol(true);
        }

        if (/[0-9]/.test(password)) {
            charCount++;
            setNum(true);
        }

        //poor
        setCount(charCount);
        if (password.length <= 4 && poorpass.includes(password)) {
            setStrength(0);
        }
        //medium
        else if (password.length >= 5 && charCount == 3) {
            setStrength(1);
        }
        //high
        else if (password.length >= 5 && charCount == 4) {
            setStrength(2);
        }
        //all other passwords that dont fit the criteria
        else {
            setStrength(0);
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
            displayColor = appStyles.greenColor;
            displayText += 'High';
        }
        return (
            <View>
                <Text
                    style={{ color: displayColor, fontWeight: 'bold', padding: 15, textAlign: 'right', fontSize: 18, }}>
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
              <View style={{paddingTop: appStyles.win.height * 0.05}}>
                <View>
                  <TextBox
                    style={appStyles.TextInputMask}
                    secureTextEntry={visible}
                    placeholder={translate('passwordInput')}
                    onChangeText={setPassword}
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
