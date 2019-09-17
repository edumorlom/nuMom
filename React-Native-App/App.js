import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Colors from './constants/Colors';
import Loading from './screens/LoadingScreen';
import Welcome from './screens/WelcomeScreen'; 
import LogIn from './screens/LogInScreen';
import  LandingPage from './screens/LandingPageScreen';

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
  else if(landingPage) {
    content = <LandingPage/>
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
