import React, {useEffect, useState} from 'react';
import poorPasswords from './PoorPassword';
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
import appStyles, {pinkColor,blueColor} from './AppStyles';
import Button from './Button';
import translate from './getLocalizedText';

export default SignUpPassword = (props) => {
  const [passwordStrength, setPasswordStrength] = useState(0);
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

  //checkPasswordStrength here
  function checkPasswordStrength(password)
  {
    let counter = 0;
    setPasswordStrength(password);
    let isUpperCase = checkUpperCase(password)
    let isLowerCase = checkLowerCase(password)
    let isNum = checkNum(password)
    let ischecksymbols = checksymbols(password)
    if (isUpperCase) 
    {
      counter++; 
    }
    if (isLowerCase) 
    {
    counter++;
    }
    if (isNum) 
    {
    counter++;
    }
    if (ischecksymbols)
    {
      counter++;
    }

   //To check Password lengths
    if (password.length >= 5 && counter == 4 && !poorPasswords.includes(password) )
    {
      setPasswordStrength(2);
    }
    //To check Password lengths
    else if (password.length >= 5 && counter == 3 && !poorPasswords.includes(password))
    {
      setPasswordStrength(1);
    }
    
    else
    {
      setPasswordStrength(0);

    }

  }
  //function to check for UpperCase letter 
  function checkUpperCase(str) {
    return /[A-Z]/.test(str);
  }
   //function to check for LowerCase letter
  function checkLowerCase(str) {
    return /[a-z]/.test(str);
  }
  //Function to check for Numbers
  function checkNum(str) {
    return /[0-9]/.test(str)
  }
  //Function to check for Symbols
  function checksymbols(str) {
    return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str)
  }

 
  function showPasswordStrength()
  {
    let warningmessage;
    let colour;
    if (passwordStrength == 0)
    {
     //Shows pink colour and warning message if password strength is weak 
     colour = pinkColor;
     warningmessage = "Password strength is too weak.";
   }
    else if (passwordStrength == 1)
    {
      //Shows blue colour and warning message if password strength is medium 
      colour = blueColor;
      warningmessage = "Password strength is medium.";
    }
    else if (passwordStrength == 2)
    {
      //Shows green colour and warning message if password strength is strong
      colour = "#298000";
      warningmessage = "Password strength is strong.";
    }
    return (<Text style={{color: colour, textAlign: "center"}}>{warningmessage}</Text>)
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
                 {showPasswordStrength()}
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