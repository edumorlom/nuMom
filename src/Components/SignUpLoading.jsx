import {
  Image,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
  NativeModules,
  AsyncStorage,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import appStyles from './AppStyles';
import dnaLoading from '../../assets/dna-loading.gif';
import translate from './getLocalizedText';
import {signUp} from '../Firebase';
import {
  logIn,
  registerForPushNotificationsAsync,
  storeObjectInDatabase,
  getUserInfo,
} from '../Firebase';

export default function SignUpLoading(props) {
  const [loadingText, setLoadingText] = useState(
    translate('registeringAccount')
  );
  const [color, setColor] = useState(appStyles.greyColor);

  const {liveMiami} = props.route.params;
  const {name} = props.route.params;
  const {dob} = props.route.params;
  const {email} = props.route.params;
  const {phone} = props.route.params;
  const {password} = props.route.params;
  const {pregnant} = props.route.params;
  const {infant} = props.route.params;
  const {babyDob} = props.route.params;
  const [appState, setAppState] = useState(initState);
  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLanguages[0] ||
        NativeModules.SettingsManager.settings.AppleLocale
      : NativeModules.I18nManager.localeIdentifier;
  const initState = {
    uid: '',
    email: '',
    password: '',
    fullName: '' /* babyGender: "", */,
  };

  console.log("SignUpLoading: liveMiami: " + liveMiami);
  console.log("SignUpLoading: name: " + name);
  console.log("SignUpLoading: dob: " + dob);
  console.log("SignUpLoading: email: " + email);
  console.log("SignUpLoading: phone: " + phone);
  console.log("SignUpLoading: password: " + password);
  console.log("SignUpLoading: pregnant: " + pregnant);
  console.log("SignUpLoading: infant: " + infant);
  console.log("SignUpLoading: babyDob: " + babyDob);

  let signUpAndUploadData = () => {
    let info = getNextWeekAndWeekNo();
    signUp(
      email,
      phone,
      password,
      name,
      dob,
      pregnant,
      infant,
      liveMiami,
      babyDob,
      ...info
    );
    // Unbinds Async Storage keys used in sign up after successful sign up
    let keys = [
      'name',
      'dob',
      'e-mail',
      'phone',
      'pass',
      'repeat',
      'babyDob',
      'liveMiami',
    ];
    // AsyncStorage.multiRemove(keys, (err) => { console.log(err) });
    setTimeout(() => {
      loginWithEmailPassword(email, password)
    }, 2000);
  };

  let getNextWeekAndWeekNo = () => {
    let babyDob = new Date(babyDob);
    let today = new Date();
    let daysDifference =
      ((today.getTime() - babyDob.getTime()) / (1000 * 3600 * 24)) | 0; // Milliseconds to days
    let daysTillNextWeek = (7 - (daysDifference % 7)) % 7;
    let nextweek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + daysTillNextWeek
    );
    let nextWeek = `${(nextweek.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${nextweek
      .getDate()
      .toString()
      .padStart(2, '0')}/${nextweek.getFullYear()}`;
    let weekNo =
      daysTillNextWeek === 0
        ? (daysDifference / 7) | 0
        : (daysDifference / 7 + 1) | 0;
    if (weekNo > 24) {
      nextWeek = null;
      weekNo = null;
    }
    return [nextWeek, weekNo];
  };


  useEffect(() => {
    getCookies();
    setTimeout(() => {
      setLoadingText(translate('allSet'));
      setColor(appStyles.pinkColor);
      setTimeout(() => {
        signUpAndUploadData();
      }, 1000);
    }, 2000);
  }, []);

  let getCookies = async () => {
    let email = await getCookie('email');
    let password = await getCookie('password');
    console.log('In getCookies');
    console.log(email);
    console.log(password);
    if (email && password) loginWithEmailPassword(email, password);
    let fullName = await getCookie('fullName');
    let uid = await getCookie('uid');

    setAppState({
      email,
      password,
      fullName,
      uid,
    });
  };

  let saveCookie = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value).then();
    } catch (e) {
      console.log(`Error storeData: ${e}`);
    }
  };

  let getCookie = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.log(`Error getData: ${e}`);
    }
  };

  let loginWithEmailPassword = (email, password) => {
    if (email && password) {
      logIn(email, password).then(
        (response) => {
          loginWithUid(response.user.uid);
          saveCookie('email', email);
          saveCookie('password', password);
          registerForPushNotificationsAsync(response.user);
        },
        (e) => {
          alert('Invalid E-mail and Password Combination!');
        }
      );
    } else {
      alert('Please enter your E-Mail and Password!');
    }
  };

  let loginWithUid = (uid) => {
    let today = new Date();
    let date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}@${today.getHours()}:${today.getMinutes()}`;
    storeObjectInDatabase(uid, {
      lastInteraction: date,
      deviceLanguage,
    });
    getUserInfo(uid).on('value', (snapshot) => {
      saveCookie('fullName', snapshot.val().fullName);
      saveCookie('uid', uid);
    });
    props.navigation.navigate('Homepage');
  };
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={appStyles.container}>
        <View
          style={{
            marginTop: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
          }}
        >
          <Image source={dnaLoading} style={{width: 250, height: 250}} />
          <Text style={{...appStyles.paragraphText, color}}>{loadingText}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
