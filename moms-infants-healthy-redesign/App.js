import React from 'react';
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Homepage from "./Homepage";



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

  logout = () => {
    this.setAppState({uid: null});
    this.setAppState({fullName: null});
    this.setAppState({screen: 'login'});
  };

  render() {
    if (this.state.screen === 'login') {
      return (<LogIn setAppState={this.setAppState}/>)
    } else if (this.state.screen === 'signup') {
      try {
        return (<SignUp setAppState={this.setAppState}/>)
      } catch (err) {
        this.setAppState({screen: 'login'})
      }
    } else {
      return (<Homepage setAppState={this.setAppState} fullName={this.state.fullName} logout={this.logout}/>)
    }
  }
}
