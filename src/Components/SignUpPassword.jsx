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
import translate from 'app/Components/getLocalizedText';
import appStyles from './AppStyles';
import Button from './Button';

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

  const onPress = () => {
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
              maxLength={MAX_LEN}
              onChangeText={setPassword}
              secureTextEntry
              value={password}
              style={appStyles.TextInputMask}
            />

            <TextBox
              placeholder={translate('repeatPasswordInput')}
              maxLength={MAX_LEN}
              onChangeText={setRepeat}
              secureTextEntry
              value={repeat}
              style={appStyles.TextInputMask}
            />
          </View>
          <Text style={appStyles.regularFontSize}>
            {translate('passwordStrength')}
          </Text>
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
