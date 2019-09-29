import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Colors from './constants/Colors';
import Loading from './screens/LoadingScreen';
import Welcome from './screens/WelcomeScreen';
import LogIn from './screens/LogInScreen';
import SignUp from './screens/SignUpScreen';
import LandingPage from './screens/LandingPageScreen';
import ProfilePage from './screens/ProfileScreen';
import SexEdPage from './screens/SexEdScreen';
import ClassesPage from './screens/ClassesScreen';
import ClinicsPage from './screens/ClinicsScreen';

export default function App() {
  // state for loading -> welcome screen where language selected
  const [welcome, setWelcome] = useState(false);
  // states for navigation bar
  const [sexEd, setSexEd] = useState(false);
  const [profile, setProfile] = useState(false);
  const [classes, setClasses] = useState(false);
  const [clinics, setClinics] = useState(false);
  // For Successfull Log in, landing on the home screen 
  const [landingPage, setLandingPage] = useState(false);
  // email and password when signing in
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // state for welcome -> logIn screen, so language to log in
  const [logIn, setLogIn] = useState(false);
  // language selected, makes sure to record language of user
  const [language, setLanguage] = useState("");
  // for the screen to forgot password
  const [forgotPassword, setForgotPassword] = useState(false);
  // For new users who want to sign up
  const [newUser, setNewUser] = useState(false);

  // handler to go from loading to welcome (language)
  const goToWelcome = () => {
    setWelcome(true);
  }
  // handler to fo from welcome to login (log in screen)
  const goToLogIn = (lang) => {
    // language selected
    setLanguage(lang);
    // change to log in screen
    setLogIn(true);
    // make sure to turn off welcome screen
    setWelcome(false);
  }
  // sends you to forgot password screen
  const goToForgotPass = () => {
    setForgotPassword(true);
    setLogIn(false);
  }
  // sends you to new user screen
  const goToNewUser = () => {
    setNewUser(true);
    setLogIn(false);
  }
  // sends you to home page with navigation from log in 
  const goToLandingPage = (email, password) => {
    // retrive profile from database using email and password
    setEmail(email);
    setPassword(password);
    setLandingPage(true);
    setLogIn(false);
  }
  // go to home screen first time after sign up 
  const goToLandingPageFromSignUp = (n, m, l, b, e, pa, ph, prM, c, cA, tN, f) => {
    // info for the profile, saved in database
    console.log(
      '\nFirst Name: ' + n +
      '\nMiddle Name: ' + m +
      '\nLast Name: ' + l +
      '\nBirthDate: ' + b +
      '\nEmail: ' + e +
      '\nPassword: ' + pa +
      '\nPhone NUmber: ' + ph +
      '\nPregnancy: ' + pr +
      '\nPregnancy month: ' + prM +
      '\nChild: ' + c +
      '\nChild age: ' + cA +
      '\nText Notification: ' + tN +
      '\nText Frequency: ' + f
    );
    setLandingPage(true);
    setNewUser(false);
  }
  // where to go from landing page, Navigation Bar 
  const navigateHelper = (location) => {
    if (location === 'LandingPage') {
      setLandingPage(true);
      setSexEd(false);
      setProfile(false);
      setClasses(false);
      setClinics(false);
    }
    else if (location === 'SexEdPage') {
      setLandingPage(false);
      setSexEd(true);
      setProfile(false);
      setClasses(false);
      setClinics(false);
    }
    else if (location === 'ProfilePage') {
      setLandingPage(false);
      setSexEd(false);
      setProfile(true);
      setClasses(false);
      setClinics(false);
    }
    else if (location === 'ClassesPage') {
      setLandingPage(false);
      setSexEd(false);
      setProfile(false);
      setClasses(true);
      setClinics(false);
    }
    else if (location === 'ClinicsPage') {
      setLandingPage(false);
      setSexEd(false);
      setProfile(false);
      setClasses(false);
      setClinics(true);
    }
  }

  // renders screens in app
  let content = <Loading onTap={goToWelcome} />
  if (welcome) {
    content = <Welcome onTap={goToLogIn} />
  }
  else if (logIn) {
    content = <LogIn
      onTapForgot={goToForgotPass}
      onTapNewUser={goToNewUser}
      onTapSignIn={goToLandingPage} />
  }
  else if (newUser) {
    content = <SignUp onTapSignUp={goToLandingPageFromSignUp} />
  }
  else if (landingPage) {
    content = <LandingPage onTap={navigateHelper} />
  }
  else if (sexEd) {
    content = <SexEdPage onTap={navigateHelper} />
  }
  else if (profile) {
    content = <ProfilePage onTap={navigateHelper} />
  }
  else if (classes) {
    content = <ClassesPage onTap={navigateHelper} />
  }
  else if (clinics) {
    content = <ClinicsPage onTap={navigateHelper} />
  }
  // renders the current screen desired 
  return (
    <View style={styles.container}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PurpleBackground,
  },
});