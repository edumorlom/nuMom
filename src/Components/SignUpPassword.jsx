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
let listPoorPasswords=require("./poorPasswords.js")

export default SignUpPassword = (props) => {
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
  const [isPassWordValid,setIsPassWordValid]=React.useState(false);
  const [labelColor,setLabelColor]=React.useState("white")

  //1 Function to test if the password weak  (if weak) => WEAK
  function isWeak(password){
    if(password.length<=4)return true;
    if(listPoorPasswords.includes(password)){
      return true;
    }
    return false;
  }
  //2 Function to test if the password Medium  (if medium) => medium
  function isMedium(password){
    if(password.length<5)return true;
    let typesCounter=0
    //lowercase letter
    if(/[a-z]/.test(password))typesCounter++
    //number
    if(/[0-9]/.test(password))typesCounter++
    //symbol
    if(/^[^a-zA-Z0-9]*$/.test(password))typesCounter++
    //capital letter.
    if(/[A-Z]/.test(password))typesCounter++

    if(typesCounter<3)return true;
    return false;
  }
  //3 Function to test if the password Strong  (if strong) => strong
  function isHight(password){
    if(password.length<5)return true;
    //lowercase letter
    if(/[a-z]/.test(password))return true
    //number
    if(/[0-9]/.test(password))return true
    //symbol
    if(/^[^a-zA-Z0-9]*$/.test(password))return true
    //capital letter.
    if(/[A-Z]/.test(password))return true

    return false;
  }
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
                     onChangeText={(password)=>{
                      setPassword(password)
                      if(isWeak(password)){
                        //{Poor: "nuMom-pink"}
                        setLabelColor("pink")
                        setIsPassWordValid(false)
                        return
                      }else if(isMedium(password)){
                        //{Medium: "nuMom-blue"}
                        setLabelColor("blue")
                        setIsPassWordValid(true)
                        return
                      }else if(isHight(password)){
                        //{High: "#298000"}
                        setLabelColor("#298000")
                        setIsPassWordValid(true)
                        return
                      }
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