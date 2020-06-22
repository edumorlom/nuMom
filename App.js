import React, { useState, useEffect } from "react";
import LogIn from "./src/Components/LogIn";
import SignUp from "./src/Components/SignUp";
import Homepage from "./src/Components/Homepage";
import Firebase from "./src/Components/Firebase";
import { AsyncStorage, NativeModules } from "react-native";
import translate from "./src/Components/getLocalizedText";
import SettingScreen from "./src/Components/SettingScreen";
import ForgotPasswordPage from "./src/Components/ForgotPasswordPage";
import * as firebase from "firebase";

export default App = () => {

  const initState = {uid: null, email: null, password: null, fullName: null  /*babyGender: null,*/ }
  const deviceLanguage = Platform.OS === "ios"
        ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier 
  const [appState, setAppState] = useState(initState);
  const [screen, setScreen] = useState("login");

  useEffect(() => {
    let _email = null;
    let _password = null;
    let _fullName = null;
    let _uid = null;
    getCookie("email").then((email) => {
          _email = email;
          getCookie("password").then((password) => {
            _password = password;
            if (email && password) loginWithEmailPassword(email, password);
          });
    setTimeout(() => {
      getCookie("fullName").then((fullName) => _fullName = fullName)
      getCookie("uid").then((uid) => _uid = uid)
    }, 400)
    
    })
    setTimeout(() => {
      setAppState({email: _email, password: _password, fullName: _fullName, uid: _uid});
    }, 600)
    //All the timeouts are to make sure all the properties get their actual value (not null)
  },[])


  let getLocalizedText = (key) => {
    return translate(deviceLanguage, key);
  };

  let saveCookie = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value).then();
    } catch (e) {
      console.log("Error storeData: " + e);
    }
  };

  let getCookie = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.log("Error getData: " + e);
    }
  };

  let loginWithEmailPassword = (email, password) => {
    saveCookie("email", email);
    saveCookie("password", password);

    if (email && password) {
      let fb = new Firebase();
      fb.logIn(email, password).then(response => {
        loginWithUid(response.user.uid);
        fb.registerForPushNotificationsAsync(response.user) 
      }, e => {
        alert("Invalid E-mail and Password Combination!")
      })
    } else {
      alert("Please enter your E-Mail and Password!");
    }
  };

  let loginWithUid = (uid) => {
    let fb = new Firebase();
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      "@" +
      today.getHours() +
      ":" +
      today.getMinutes();
    fb.storeObjectInDatabase(uid, {
      lastInteraction: date,
      deviceLanguage: deviceLanguage
    });
    fb.getUserInfo(uid).on("value", (snapshot) => {
      saveCookie("fullName", snapshot.val().fullName)
      saveCookie("uid", uid)
      setScreen("homepage")
      //setAppState({babyGender: snapshot.val().babyGender});
    });
  };

  let logout = () => {
    setScreen("login");
    saveCookie("email", "");
    saveCookie("password", "");
    saveCookie("uid", "");
    saveCookie("fullName", "");
    let fb = new Firebase();
    let user = firebase.auth().currentUser;
    fb.registerForPushNotificationsAsync(user);
  };


  let goBack = () => {
    if (screen === "setting")
      setScreen("homepage")
      if (screen === "forgotPassword")
      setScreen("login")
  };

 
    if (screen === "login") {
      return (
        <LogIn
          setScreen={setScreen}
          login={loginWithEmailPassword}
          getLocalizedText={getLocalizedText}
        />
      );
    } else if (screen === "signup") {
      try {
        return (
          <SignUp
            setScreen={setScreen}
            login={loginWithEmailPassword}
            getLocalizedText={getLocalizedText}
          />
        );
      } catch (err) {
        setScreen("login");
      }
    } else if (screen === "setting") {
      return (
        <SettingScreen
          email={appState.email}
          password={appState.password}
          setScreen={setScreen}
          goBack={goBack}
          fullName={appState.fullName}
          logout={logout}
          getLocalizedText={getLocalizedText}
        />
      );
    } else if (screen === "forgotPassword") {
      return (
        <ForgotPasswordPage
          setScreen={setScreen}
          goBack={goBack}
          getLocalizedText={getLocalizedText}
        />
      );
    } else {
      return (
        <Homepage
          setScreen={setScreen}
          fullName={appState.fullName}
          logout={logout}
          getLocalizedText={getLocalizedText}
        />
      );
    }
  
}
