import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Colors from './constants/Colors';
import Loading from './screens/LoadingScreen';
import Welcome from './screens/WelcomeScreen'; 
import LogIn from './screens/LogInScreen';

export default function App() {
  // state for loading -> welcome screen change in repo
  const [welcome,setWelcome] = useState(false);
  // handler to go from loading to welcome change in repo
  const goToWelcome = () => {
    setWelcome(true);
  }
  // state for welcome -> logIn
  const [logIn,setLogIn] = useState(false);
  // language selected
  const [language,setLanguage] = useState("");
  // handler to fo from welcome to login
  const goToLogIn = (language) => {
    setLanguage(language);
    setLogIn(true);
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
