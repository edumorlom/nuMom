import React from 'react';
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Homepage from "./Homepage";
import Firebase from "./Firebase";
import {AsyncStorage} from 'react-native';



export default class App extends React.Component {
  state = {
    screen: 'login',
    uid: null,
    fullName: null,
    babyGender: null
  };

  constructor(props) {
    super(props);
    this.getData('uid').then((uid) => {if (uid) this.loginWithUid(uid); console.log(uid);})
  }

  setAppState = (object) => {
    this.setState(object)
  };

  storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value).then((result) => console.log('Stored key to value: ', key, value))
    } catch (e) {
      console.log("Error storeData: " + e)
    }
  };

  getData = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch(e) {
      console.log("Error getData: " + e)
    }
  };

  loginWithEmailPassword = (email, password) => {
    if (email && password) {
      let fb = new Firebase();
      fb.logIn(email, password).then(response => {
        this.loginWithUid(response.user.uid);
        console.log("Successful Login!", response);
      }, e => {
        alert("Invalid E-mail and/or Password!")
      })
    } else {
      alert("Please enter your E-Mail and Password!")
    }
  };

  loginWithUid = (uid) => {
    let fb = new Firebase();
    this.setAppState({uid: uid});
    this.storeData('uid', uid);
    // fb.storeLastInteraction(response.user.uid);
    fb.getUserInfo(uid).on('value', (snapshot) => {
      this.setAppState({fullName: snapshot.val().fullName});
      this.setAppState({babyGender: snapshot.val().babyGender});
      this.setAppState({screen: 'homepage'});
    });
  };


  logout = () => {
    this.setAppState({uid: null});
    this.setAppState({fullName: null});
    this.setAppState({screen: 'login'});
    this.storeData('uid', '');
  };

  render() {
    if (this.state.screen === 'login') {
      return (<LogIn setAppState={this.setAppState} login={this.loginWithEmailPassword}/>)
    } else if (this.state.screen === 'signup') {
      try {
        return (<SignUp setAppState={this.setAppState} login={this.loginWithEmailPassword}/>)
      } catch (err) {
        this.setAppState({screen: 'login'})
      }
    } else {
      return (<Homepage setAppState={this.setAppState} fullName={this.state.fullName} logout={this.logout}/>)
    }
  }
}
