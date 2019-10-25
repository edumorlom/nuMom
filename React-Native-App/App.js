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
  // state for welcome -> logIn screen, so language to log in
  const [logIn, setLogIn] = useState(false);
  // language selected, makes sure to record language of user
  const [language, setLanguage] = useState("");
  // For new users who want to sign up
  const [newUser, setNewUser] = useState(false);
  // Profile Information
  const [profileDetails,setProfileDetails] = useState([]);
  // For files use adds
  const [files, setFiles] = useState('');
  
  // handler to go from loading to welcome (language)
  const goToWelcome = () => {
    // if first time active this
    setWelcome(true);
    // if second time with account 
    // skip welcome, skipp login, and set langing page here 
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
  // sends you to new user screen
  const goToNewUser = () => {
    setNewUser(true);
    setLogIn(false);
  }
  // sends you to home page with navigation from log in, automatic 
  const goToLandingPage = () => {
    // retrive profile from database using telephone so we skip login
    setLandingPage(true);
    setLogIn(false);
  }
  // go to home screen first time after sign up 
  const goToLandingPageFromSignUp = (profile) => {
    // info for the profile, saved in database
    setProfileDetails(profile);
    setLandingPage(true);
    setNewUser(false);
  }
  //go to folder view from the profile page
  const goToFolder = () => {
    setProfile(false);
    setFolder(true);
  }
  // add save files here and return to profile page
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
    // FIXMEN needs implementation
    content = <ClassesPage onTap={navigateHelper} loadLanguage={language}/>
  }
  else if (clinics) {
    // FIXMEN needs implementation
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