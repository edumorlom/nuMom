import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  Text,
  TextInput as TextBox,
  TouchableOpacity,
  View,
  TouchableHighlight,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  pink, // importing colors
  blue // importing colors
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import appStyles from './AppStyles';
import Button from './Button';
import translate from './getLocalizedText';
import { TextInput } from 'react-native-gesture-handler';

export default SignUpPassword = (props) => {
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(''); //set password strength
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
  //const specialChars = ['!', '#', '$', '*', '%'];
  //let containsSpecialChar = false;
  
  //Default code
  useEffect(() => {
    AsyncStorage.getItem('pass').then((value) => {
      value !== null && value !== '' ? setPassword(value) : null;
    });
    AsyncStorage.getItem('repeat').then((value) => {
      value !== null && value !== '' ? setRepeat(value) : null;
    });
  }, []);

  //feature
  const determineStrenght =(password) =>{
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!#$*%]/.test(password);

    console.log('Password:', password);
    console.log('hasLower:', hasLower);
    console.log('hasUpper:', hasUpper);
    console.log('hasNumber:', hasNumber);
    console.log('hasSpecial:', hasSpecial);

    if (password.length <= 4) {
      return 'Poor';
    } else if (
      password.length >= 5 &&
      ((hasLower + hasUpper + hasNumber + hasSpecial) >= 3)
    ) {
      return 'Medium';
    } else if (password.length >= 5 && hasLower && hasUpper && hasNumber && hasSpecial) {
      return 'High';
    }
    return 'Poor';
  };

  const handlePasswordChange =(password) =>{
    setPassword(password);
    setPasswordStrength(determineStrenght(password));
  };
  const getPasswordStrenghtStyle = () =>{
    switch (passwordStrength) {
      case 'Poor':
        return {color: 'pink' };
      case 'Medium':
        return {color: 'blue' };
      case 'High':
        return {color: '#298000' };
      default:
        return {};
    }
  };

  const onPress = () => {
    const hasSpecialChar = /[!#$*%]/.test(password);

    //let containsSpecialChar = special_chars.some((char) => password.includes(char));
    if (password !== repeat) {
      alert(translate('passwordMismatch'));
    } else if (!password || !repeat) {
      alert(translate('fillOutAllFields'));
    } else if (password.length <=4 ) {
      alert(translate('passwordTooShort'));
    } else if (!containsSpecialChar) {
      alert(translate('passwordWeak'));
    } else if(passwordStrength === 'Medium') {
      Alert.alert(
        "Medium Password",
        "Do you want to edit the password or continue?",
        [
          { text: "Edit Password" },
          { text: "Continue", onPress: () => navigateToNextScreen() }
        ]
      );
    } else if (passwordStrength === 'High') {
      navigateToNextScreen();
    }
  };
  const navigateToNextScreen = () => {
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
                    placeholderTextColor={appStyles.DefaultPlaceholderTextColor}
                    style={appStyles.TextInputMask}
                    secureTextEntry={visible}
                    placeholder={translate('passwordInput')}
                    onChangeText={handlePasswordChange}
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
              
                <Text style={getPasswordStrenghtStyle}>
                  Password Stregnth: {passwordStrength}
                </Text> 

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
              disabled={passwordStrength === 'Poor'}
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
