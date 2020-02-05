import React from 'react';
import LogIn from "./LogIn";
import SignUp from "./SignUp";


export default class App extends React.Component {
  state = {
    screen: 'login'
  };

  setAppState = (object) => {
    this.setState(object)
  };

  render() {
    console.log(this.state.screen)
    if (this.state.screen === 'login') {
      return (<LogIn setAppState={this.setAppState}/>)
    } else if (this.state.screen === 'signup') {
      return (<SignUp setAppState={this.setAppState}/>)
    }
  }
}
