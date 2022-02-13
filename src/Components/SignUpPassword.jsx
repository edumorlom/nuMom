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
} from 'react-native';
import appStyles from './AppStyles';
import Button from './Button';
import translate from './getLocalizedText';
import poorpasswords from './poorpasswords';

export default SignUpPassword = (props) => {
  const [password, setPassword] = useState('');
  const [passwordStrength, setStrength] = useState();
  const [charCount, setCount] = useState('');
  const [lowerCase, setLower] = useState(false);
  const [upperCase, setUpper] = useState(false);
  const [number, setNum] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [repeat, setRepeat] = useState('');
  const {liveMiami} = props.route.params;
  const {name} = props.route.params;
  const {dob} = props.route.params;
  const {email} = props.route.params;
  const {phone} = props.route.params;

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

  //if user makes changes to password, save password, check password strength
  let userPassword = (password) => {
    setPassword(password);
    checkStrength(password);
  };

  //check user's password
  let checkStrength = (password) => {
   setSymbol(false);
   setLower(false);
   setUpper(false);
   setNum(false);    

   //initialize charCount to 0
   let charCount = 0;

   //if password contains a lowercase letter...
   if(/[a-z]/.test(password))
   {
	charCount++;
	setLower(true);
   }
   //if password contains an uppercase letter...
   if(/[A-Z]/.test(password))
   {
	charCount++;
	setUpper(true);
   }
   //if password contains a number...
   if(/[0-9]/.test(password))
   {
	charCount++;
	setNum(true);
   }
   //if password contains a symbol...
   if(/[^A-Za-z0-9]/.test(password))
   {
	charCount++;
	setSymbol(true);
   }

   setCount(charCount);
   //if password length is less than 4 and is included in list of poorpasswords...
   if(password.length <= 4 && poorpasswords.includes(password))
   {
	setStrength(0); 		//poor password
   }
   //if the password is equal to 5 and has three of the four types...
   else if(password.length >= 5 && charCount == 3)
   {
	setStrength(1);                 //medium password
   }
   //if the password is greater than 5 and has all four types...
   else if(password.length >= 5 && charCount == 4)
   {
	setStrength(2);			//strong password
   }
   else
   {
	setStrength(0); 		//for any other varitations not within core criteria
   }
  }
  
  let psswordStyle = (passwordStrength) => {
    let colors;
    let message = "";
    let warning = "";

    if(passwordStrength == 0)
    {
	colors = appStyles.pinkColor;
	message = "Password Strength: Poor...";
	warning = "Password must contain more than 5 characters: including at least 3 of the following: ";
	warning += "\n\tA number, symbol, an uppercase, or lowercase letter."; 	
    }
    if(passWordStrength == 1)
    {
	colors = appStyles.blueColor;
	message = "Password Strength: Medium...";
    }
    else
    {
	colors = '#298000';
	message = "Password Strength: High";
    }
    return (
	<View>
	  <Text style={{color: colors, textAlign: "center"}}>{message}</Text>
	  <Text style={{color: colors, textAlign: "center"}}>{warning}</Text>
	</View>
     );
  };

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
                  onChangeText={setPassword}
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
