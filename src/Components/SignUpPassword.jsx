import React, {useEffect, useState} from 'react';
// import the list of forbidden
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
//Imported required colors for Task#2
import appStyles, {pinkColor,blueColor} from './AppStyles';
import Button from './Button';
import translate from './getLocalizedText';

export default SignUpPassword = (props) => {

// Need the following constant to scan the password and assign strenght.
  const [passwordStrength, passPasswordStrength] = useState(0); 


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

  //Tip function to check password
  // Function to check password strength
function checkPasswordStrength(password) {
  let points = 0;
  setPassword(password);

  if (forbiddenPasswords.includes(password)) {
    passPasswordStrength(0);
    return;
  }

  // Check if password meets criteria:
  // At least one capital letter, one lowercase letter, one unique character
  if (/[A-Z]/.test(password)) {
     points++; 
  // Add a point for capital letter
  }
  
  if (/[a-z]/.test(password)) {
    points++; 
  // Add a point for lowercase letter
  }

  if (/[0-9]/.test(password)) {
     points++; 
  // Add a point for unique character
  }

  const specialChars = "~!@#$%^&*()-_=+[]{};:'\",.<>/?`|"; // Special characters string

  if (containsSpecialCharacter(password, specialChars)) {
    points++; // Add a point if the password contains at least one special character
  }

  // Check if password is valid based on points and length
  if (password.length >= 5 && points == 4) {
    passPasswordStrength(2); // High strength password
  } else if (password.length >= 5 && points == 3) {
    passPasswordStrength(1); // Medium strength password
  } else {
    passPasswordStrength(0); // Weak strength password. User may not proceed.
  }
}

// Function to check if password contains at least one special character
function containsSpecialCharacter(password, specialChars) {
  for (let i = 0; i < specialChars.length; i++) {
    if (password.includes(specialChars[i])) {
      return true; // Return true if a special character is found
    }
  }
  return false; // Return false if no special character is found
}

// Display password strength to the user
function displayPasswordStrength() {
  let message, color;

  if (passwordStrength == 2) {
    // Return Green Color
    color = "#298000"; 
    message = "Your password strength is strong!! (Recommended)";
  } else if (passwordStrength == 1) {
    color = blueColor;
    message = "Your password strength is medium.";
  } else if (passwordStrength == 0) {
    //Not show the message unless the user starts typyng
    if (password.length != 0) {
    color = pinkColor;
    message = "Your password does not meet the required strength. It should contain at least one uppercase letter, one lowercase letter, one special character, and be a minimum of five characters long.";
    }
  }

  return <Text style={{ color: color, textAlign: "center" }}>{message}</Text>;
}


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
                  {displayPasswordStrength()}
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
