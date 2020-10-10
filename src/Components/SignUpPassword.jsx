import React, {useEffect, useState} from 'react';
import {
  AsyncStorage,
  Keyboard,
  Text,
  TextInput as TextBox,
  TouchableOpacity,
  View,
  TouchableHighlight,
} from 'react-native';
import appStyles from './AppStyles';
import Button from './Button';
import translate from './getLocalizedText';

export default SignUpPassword = (props) => {
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');

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
      props.setUserInfo({password});
      AsyncStorage.setItem('pass', password);
      AsyncStorage.setItem('repeat', repeat);
      props.getNextScreen();
    }
  };
  return (
    <TouchableHighlight
      onPress={Keyboard.dismiss}
      underlayColor="transparent"
      accessible={false}
      style={appStyles.container}
    >
      <>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
          }}
        >
          <Text style={appStyles.titleBlue}>{translate('createPassword')}</Text>
          <View style={{paddingTop: appStyles.win.height * 0.1}}>
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
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: '12%',
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
  );
};
