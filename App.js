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

export default App = (props) => {
  // state = {
  //   screen: "login",
  //   uid: null,
  //   email: null,
  //   password: null,
  //   fullName: null,
  //   //babyGender: null,
  //   deviceLanguage:
  //     Platform.OS === "ios"
  //       ? NativeModules.SettingsManager.settings.AppleLocale ||
  //         NativeModules.SettingsManager.settings.AppleLanguages[0]
  //       : NativeModules.I18nManager.localeIdentifier,
  // };

  const initState = { screen: "login", uid: null, email: null, password: null, fullName: null, 
                /*babyGender: null,*/ }
  const deviceLanguage = Platform.OS === "ios"
        ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier 
  const [appState, setAppState] = useState(initState);

  useEffect(() => {
    getCookie("email").then((email) => {
          getCookie("password").then((password) => {
            if (email && password) loginWithEmailPassword(email, password);
          });
        });
  },[])
  // constructor(props) {
  //   super(props);
  //   getCookie("email").then((email) => {
  //     getCookie("password").then((password) => {
  //       if (email && password) loginWithEmailPassword(email, password);
  //     });
  //   });
  // }

  let getLocalizedText = (key) => {
    return translate(deviceLanguage, key);
  };

  let saveCookie = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value).then((r) =>
        console.log("Stored key to value: ", key, value)
      );
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
    setAppState({...appState, email: email, password: password });
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
      setAppState({...appState, fullName: snapshot.val().fullName, screen: "homepage"  });
      //setAppState({babyGender: snapshot.val().babyGender});
    });
  };

  let logout = () => {
    
    setAppState({...appState, uid: null, fullName: null, screen: "login"  });
    saveCookie("email", "");
    saveCookie("password", "");
    let fb = new Firebase();
    let user = firebase.auth().currentUser;
    fb.registerForPushNotificationsAsync(user);
  };

  let goBack = () => {
    if (appState.screen === "setting")
      setAppState({...appState, screen: "homepage" });
    if (appState.screen === "forgotPassword")
      setAppState({...appState, screen: "login" });
  };

  console.log(appState.fullName)
 
    if (appState.screen === "login") {
      return (
        <LogIn
          setAppState={setAppState}
          login={loginWithEmailPassword}
          getLocalizedText={getLocalizedText}
        />
      );
    } else if (appState.screen === "signup") {
      try {
        return (
          <SignUp
            setAppState={setAppState}
            login={loginWithEmailPassword}
            getLocalizedText={getLocalizedText}
          />
        );
      } catch (err) {
        setAppState({...appState, screen: "login" });
      }
    } else if (appState.screen === "setting") {
      return (
        <SettingScreen
          email={appState.email}
          password={appState.password}
          setAppState={setAppState}
          goBack={goBack}
          setScreen={appState.screen}
          fullName={appState.fullName}
          logout={logout}
          getLocalizedText={getLocalizedText}
        />
      );
    } else if (appState.screen === "forgotPassword") {
      return (
        <ForgotPasswordPage
          setAppState={setAppState}
          goBack={goBack}
          setScreen={appState.screen}
          getLocalizedText={getLocalizedText}
        />
      );
    } else {
      return (
        <Homepage
          setAppState={setAppState}
          fullName={appState.fullName}
          logout={logout}
          getLocalizedText={getLocalizedText}
        />
      );
    }
  
}
