import React from 'react';
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Homepage from "./Homepage";
import Firebase from "./Firebase";



export default class App extends React.Component {
  state = {
    screen: 'login',
    uid: null,
    fullName: null,
    babyGender: null
  };

  setAppState = (object) => {
    this.setState(object)
  };


  login = (email, password) => {
    if (email && password) {
      let fb = new Firebase();
      fb.logIn(email, password).then(response => {
        console.log("Successful Login!", response);
        this.setAppState({uid: response.user.uid});
        // fb.storeLastInteraction(response.user.uid);
        fb.getUserInfo(response.user.uid).on('value', (snapshot) => {
          this.setAppState({fullName: snapshot.val().fullName});
          this.setAppState({babyGender: snapshot.val().babyGender});
          this.setAppState({screen: 'homepage'});
        });
      }, e => {
        alert("Invalid E-mail and/or Password!")
      })
    } else {
      alert("Please enter your E-Mail and Password!")
    }
  };


  logout = () => {
    this.setAppState({uid: null});
    this.setAppState({fullName: null});
    this.setAppState({screen: 'login'});
  };

  render() {
    if (this.state.screen === 'login') {
      return (<LogIn setAppState={this.setAppState} login={this.login}/>)
    } else if (this.state.screen === 'signup') {
      try {
        return (<SignUp setAppState={this.setAppState} login={this.login}/>)
      } catch (err) {
        this.setAppState({screen: 'login'})
      }
    } else {
      return (<Homepage setAppState={this.setAppState} fullName={this.state.fullName} logout={this.logout}/>)
    }
  }
}
