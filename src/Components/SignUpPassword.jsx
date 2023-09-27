import React, {useEffect, useState} from 'react';
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
import appStyles from './AppStyles';
import Button from './Button';
import translate from './getLocalizedText';

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
  const special_chars = ['!','#','$','*','%'];
  let containsSpecialChar = false;

  useEffect(() => {
    AsyncStorage.getItem('pass').then((value) => {
      value !== null && value !== '' ? setPassword(value) : null;
    });
    AsyncStorage.getItem('repeat').then((value) => {
      value !== null && value !== '' ? setRepeat(value) : null;
    });
  }, []);

  let onPress = () => {
    for (let i = 0; i < password.length; i++) {
      if (special_chars.includes(password[i])){
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
    } else if (!containsSpecialChar){
      alert(translate('passwordWeak'));
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
                    placeholderTextColor={appStyles.DefaultPlaceholderTextColor}
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
                    placeholderTextColor = {appStyles.DefaultPlaceholderTextColor}
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
