import React, {useState, useEffect} from 'react';
import {
  Keyboard,
  Text,
  TextInput as TextBox,
  View,
  TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appStyles from './AppStyles';
import Button from './Button';
import translate from './getLocalizedText';
import {checkEmailExist} from '../Firebase';

export default SignUpInfo = (props) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formattedPhone, setFormattedPhone] = useState('');
  const {liveMiami} = props.route.params;
  const {name} = props.route.params;
  const {dob} = props.route.params;

  useEffect(() => {
    AsyncStorage.getItem('e-mail').then((value) => {
      value !== null && value !== '' ? setEmail(value) : null;
    });
    AsyncStorage.getItem('phone').then((value) => {
      value !== null && value !== '' ? setPhone(value) : null;
    });
  }, []);

  const isValidEmail = (email) => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const isValidPhoneNumber = (phoneNumber) =>
    (phoneNumber.length === 10 && !isNaN(phoneNumber)) ||
    (phoneNumber.length === 12 && !isNaN(phoneNumber.substring(1, 12)));

  const onPress = () => {
    if (!email || !phone) {
      alert(translate('fillOutAllFields'));
    } else if (!isValidEmail(email)) {
      alert(translate('invalidEmail'));
    } else if (!isValidPhoneNumber(phone)) {
      alert(translate('invalidPhoneNumber'));
    } else {
      checkEmailExist(email).then((signInMethods) => {
        const emailExists = signInMethods.length > 0;
        if (emailExists) {
          alert(translate('emailExists'));
        } else {
          // props.setUserInfo({email});
          // props.setUserInfo({phoneNumber: phone});
          // AsyncStorage.setItem('e-mail', email);
          // AsyncStorage.setItem('phone', phone);
          props.navigation.navigate('SignUpPassword', {
            liveMiami,
            name,
            dob,
            email,
            phone,
          });
        }
      });
    }
  };

  const formatPhoneNumber = (phoneNumber) => {
    let formattedNumber = '';

    let cleaned = `${phoneNumber}`.replace(/\D/g, '');

    for (let i = 0; i < cleaned.length; i++) {
      if (i === 0) {
        formattedNumber = '(';
      } else if (i == 3) {
        formattedNumber += ') ';
      } else if (i == 6) {
        formattedNumber += '-';
      }

      formattedNumber += cleaned[i];
    }

    setFormattedPhone(formattedNumber);

    // unformat the formatted number
    phoneNumber = formattedNumber
      .replace(/[()]/g, '')
      .replace(' ', '')
      .replace(/-/, '');

    // set phone as unformatted phone number since phone is used for the Firebase
    setPhone(phoneNumber);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={appStyles.signupContainer}
      enabled={false}
    >
      <TouchableHighlight
        onPress={Keyboard.dismiss}
        accessible={false}
        underlayColor="transparent"
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
              <View>
                <Text style={appStyles.titleBlue}>
                  {translate('contactInformation')}
                </Text>
              </View>
              <View style={{paddingTop: appStyles.win.height * 0.05}}>
                <TextBox
                  placeholder={translate('emailInput')}
                  onChangeText={setEmail}
                  value={email}
                  style={appStyles.TextInputMask}
                />
                <TextBox
                  placeholder={translate('phoneNumberInput')}
                  onChangeText={(number) => formatPhoneNumber(number)}
                  value={formattedPhone}
                  style={appStyles.TextInputMask}
                  maxLength={14}
                  keyboardType="numeric"
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
