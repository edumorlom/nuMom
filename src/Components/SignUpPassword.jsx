import React, {useEffect, useState} from 'react';
import poorPasswords from './PoorPassword'; //Cache the content of PoorPassword.js for later comparisons.
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
  const [passwordStrength, setPasswordStrength] = useState(0); //pass in functions as arguments to check and display password
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
     if (password !== repeat) alert(translate('passwordMismatch'));
      
     else if (!password || !repeat) alert(translate('fillOutAllFields'));
      
     else if (password.length < 6) alert(translate('passwordTooShort'));
      
     else {
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
    

    setPassword(password);
    if (poorPasswords.includes(password))
    {
      setPasswordStrength(0);
      return 
    }
    //If a password meets criteria 1 capital, 1 lower case, 1 unique char, add a point
    //if counter has 3 or 4 points and is at LEAST 5 chars long, password is valid.
    
    if (/[A-Z]/.test(password)) counter++; //capital letter present, add to counter
    if (/[a-z]/.test(password)) counter++; //lowercase letter, add 
    if (/[0-9]/.test(password)) counter++; //unique letter, add
    if (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) counter++; 
    if (password.length >= 5 && counter == 4 ) setPasswordStrength(2); //High strength password 
    else if (password.length >= 5 && counter == 3 ) setPasswordStrength(1); //Medium strength password
    else setPasswordStrength(0); //Weak strength password. User may not proceed.

  }

  //show user how strong password is with a pop-up message
  function displayPasswordStrength()
  {
    let message, color;
    
    
    if (passwordStrength == 2)
    {
      color = "#298000"; //green
      message = "Password strength is strong.";
    }
    else if (passwordStrength == 1)
    {
      color = blueColor;
      message = "Password strength is medium.";
    }
    
    else if (passwordStrength == 0)
    {
      
      color = pinkColor;
      message = "Your password is too weak. Your password must have at least one capital letter, one lowercase letter, one unique character, and be at least five characters long.";
    }
    return (<Text style={{color:color,textAlign:"center"}}>{message}</Text>)
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
                  {displayPasswordStrength()}
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
