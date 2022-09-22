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
import {colors, Input} from 'react-native-elements';
import {TextInput} from 'react-native-gesture-handler';
import appStyles from './AppStyles';
import Button from './Button';
import translate from './getLocalizedText';
//import poorPasswords from './poorPasswords';

export default SignUpPassword = (props) => {
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [passwordStrength, setPassStrength] = useState('');
  const [charCount, setCount] = useState('');
  const [carryLowerCase, setCarryLower] = useState(false);
  const [carryUpperCase, setCarryUpper] = useState(false);
  const [number, setNum] = useState(false);
  const [carrySymbol, setCarrySymbol] = useState(false);
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
  //when user make change to password, check password
  let changePassword = (password) => {
    setPassword(password);
    checkPassStrength(password);
  };
  //check user password
  let checkPassStrength = (password) => {
    //initi variable
    setCarryLower(false);
    setCarryUpper(false);
    setCarrySymbol(false);
    setNum(false);
    //count the num characters in each
    let charCount = 0;
    //see if the password contain lowercase then count
    if(/[a-z]/.test(password)){
      charCount++;
      setCarryLower(true);
    }
    //see if the password contain uppercase
    if(/[A-Z]/.test(password)){
      charCount++;
      setCarryUpper(true);
    }
    //see if the password contain symbol
    if(/[^A-Za-z0-9]/.test(password)){
      charCount++;
      setCarrySymbol(true);
    }
    //see if the password contain numbers
    if(/[0-9]/.test(password)){
      charCount++;
      setNum(true);
    }

    setCount(charCount);

    //len(password) <= 4
    if(password.length <= 4 && poorPasswords.includes(password)){
      setPassStrength(0);
    }
    //len(password) >= 5
    else if(password.length >= 5 && charCount == 3){
      setPassStrength(1);
    }
    //len(password) >= 5
    else if(password.length >= 5 && charCount == 4){
      setPassStrength(2);
    }
    else{
      setPassStrength(0);//any other password
    }
  };

  let passwordStyle = (passwordStrength) => {
    let color;
    let message = '';

    if(passwordStrength == 0){
      color = appStyles.pinkColor;
      message = 'Password Strength: Poor';
    }
    else if(passwordStrength == 1){
      color = appStyles.blueColor;
      message = 'Password Strength: Medium';
    }
    else{
      color = '#298000';
      message = 'Password Strength: High';
    }
    return(
      <View>
        <Text style={{color:colors, textAlign:'center'}}>{message}</Text>
      </View>
    );
  };

  let onPress = () => {
    if (password !== repeat) {
      alert(translate('passwordMismatch'));
    } else if (!password || !repeat) {
      alert(translate('fillOutAllFields'));
    } else if (password.length < 6) {
    } else if(password.length <= 4){
      alert(translate('passwordTooShort'));
    } else if(passwordStrength == 0){
      alert(translate('passwordWeak'))
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
