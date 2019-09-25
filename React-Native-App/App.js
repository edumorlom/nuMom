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
  // state for loading -> welcome screen 
  const [welcome,setWelcome] = useState(false);
  // handler to go from loading to welcome 
  const goToWelcome = () => {
    setWelcome(true);
  }
  // state for welcome -> logIn
  const [logIn,setLogIn] = useState(false);
  // language selected
  const [language,setLanguage] = useState("");
  // handler to fo from welcome to login
  const goToLogIn = (lang) => {
    // language selected
    setLanguage(lang);
    // change to log in screen
    setLogIn(true);
    // make sure to turn off welcome screen
    setWelcome(false);
  }
  // for the screen to forgot password
  const [forgotPassword,setForgotPassword] = useState(false);
  const goToForgotPass = () => {
    setForgotPassword(true);
    setLogIn(false);
  }
  // For new users
  const [newUser,setNewUser] = useState(false);
  const goToNewUser = () => {
    setNewUser(true);
    setLogIn(false);
  }
  // For Successfull Log in 
  const [landingPage,setLandingPage] = useState(false);
  // email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const goToLandingPage = (email,password) => {
    // retrive profile from database using email and password
    setEmail(email);
    setPassword(password);
    setLandingPage(true);
    setLogIn(false);
  }
  // where to go from landing page
  const [sexEd,setSexEd] = useState(false);
  const [profile,setProfile] = useState(false);
  const [classes,setClasses] = useState(false);
  const [clinics,setClinics] = useState(false);
  const navigateHelper = (location) => {
    if(location === 'LandingPage') {
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

  // renders screens 
  let content = <Loading onTap={goToWelcome} />
  if(welcome) {
    content = <Welcome onTap={goToLogIn}/>
  }
  else if(logIn) {
    content = <LogIn 
      onTapForgot={goToForgotPass} 
      onTapNewUser={goToNewUser} 
      onTapSignIn={goToLandingPage} />
  }
  else if(newUser) {
    content = <SignUp onTapSignUp={goToLandingPage}/>
  }
  else if(landingPage) {
    content = <LandingPage onTap={navigateHelper}/>
  }
  else if(sexEd) {
    content = <SexEdPage onTap={navigateHelper}/>
  }
  else if(profile) {
    content = <ProfilePage onTap={navigateHelper}/>
  }
  else if(classes) {
    content = <ClassesPage onTap={navigateHelper}/>
  }
  else if(clinics) {
    content = <ClinicsPage onTap={navigateHelper}/>
  }
  
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