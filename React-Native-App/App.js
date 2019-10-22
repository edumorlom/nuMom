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
import FolderPage from './screens/FolderScreen';

export default function App() {
  // state for loading -> welcome screen where language selected
  const [welcome, setWelcome] = useState(false);
  // states for navigation bar
  const [sexEd, setSexEd] = useState(false);
  const [profile, setProfile] = useState(false);
  const [classes, setClasses] = useState(false);
  const [clinics, setClinics] = useState(false);
  const [folder, setFolder] = useState(false);
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
  // Profile Information
  const [name, setName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pregnantMonths, setPregnantMonths] = useState('');
  const [childAge, setChildAge] = useState('');
  const [frequency, setFrequency] = useState('');
  const [image,setImage] = useState('');
  const [files, setFiles] = useState('');
  
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

    // setEmail(email);
    // setPassword(password);
    setLandingPage(true);
    setLogIn(false);
  }
  // go to home screen first time after sign up 
  const goToLandingPageFromSignUp = (n, m, l, b, e, pa, ph, prM, cA, f, i) => {
    // info for the profile, saved in database
    setName(n);
    setMiddleName(m);
    setLastName(l);
    setBirthDate(b);
    setEmail(e);
    setPassword(pa);
    setPhoneNumber(ph);
    setPregnantMonths(prM);
    setChildAge(cA);
    setFrequency(f);
    setLandingPage(true);
    setNewUser(false);
    setImage(i);
  }
  //go to folder view from the profile page
  const goToFolder = () => {
    setProfile(false);
    setFolder(true);
  }
  // FIXME add save files here and return to profile page
  const saveTheFiles = (fl) => {
    setFiles(fl);
    setFolder(false);
    setProfile(true);
  }
  // where to go from landing page, Navigation Bar 
  const navigateHelper = (location) => {
    if (location === 'LandingPage') {
      setLandingPage(true);
      setSexEd(false);
      setProfile(false);
      setClasses(false);
      setClinics(false);
      setFolder(false);
    }
    else if (location === 'SexEdPage') {
      setLandingPage(false);
      setSexEd(true);
      setProfile(false);
      setClasses(false);
      setClinics(false);
      setFolder(false);
    }
    else if (location === 'ProfilePage') {
      setLandingPage(false);
      setSexEd(false);
      setProfile(true);
      setClasses(false);
      setClinics(false);
      setFolder(false);
    }
    else if (location === 'ClassesPage') {
      setLandingPage(false);
      setSexEd(false);
      setProfile(false);
      setClasses(true);
      setClinics(false);
      setFolder(false);
    }
    else if (location === 'ClinicsPage') {
      setLandingPage(false);
      setSexEd(false);
      setProfile(false);
      setClasses(false);
      setClinics(true);
      setFolder(false);
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
      onTapSignIn={goToLandingPage}
      loadLanguage={language} />
  }
  else if (newUser) {
    content = <SignUp onTapSignUp={goToLandingPageFromSignUp} loadLanguage={language}/>
  }
  else if (landingPage) {
    content = <LandingPage onTap={navigateHelper} loadLanguage={language}/>
  }
  else if (sexEd) {
    content = <SexEdPage onTap={navigateHelper} loadLanguage={language}/>
  }
  else if (profile) {
    var profileDetails = {
      'Name': name, "MiddleName": middleName, "LastName": lastName,
      "BirthDate": birthdate, "Email": email, "Password": password, "PhoneNumber": phoneNumber,
      "PregnantMonths": pregnantMonths, "ChildAge": childAge, "Frequency": frequency, "Language": language, "Image": image
    };
    content = <ProfilePage onTap={navigateHelper}
      loadProfile={profileDetails}
      onSave={goToLandingPageFromSignUp}
      changeLang={(lang) => setLanguage(lang)}
      tapFolder={goToFolder}
      loadLanguage={language}
    />
  }
  else if (folder) {
    // files to save for the database
    content = <FolderPage loadFiles={files} saveFiles={saveTheFiles} onTap={navigateHelper} loadLanguage={language}/>
  }
  else if (classes) {
    content = <ClassesPage onTap={navigateHelper} loadLanguage={language}/>
  }
  else if (clinics) {
    content = <ClinicsPage onTap={navigateHelper} loadLanguage={language}/>
  }
  console.disableYellowBox = true;
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