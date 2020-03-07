import {ImageBackground, Keyboard, TouchableWithoutFeedback, View, TouchableHighlight} from 'react-native';
import React from "react";
import loginMainImage from "./login-main-image.png"
import appStyles from './styles'
import Button from "./Button";
import TextInput from "./TextInput";
import SwipeUp from "./SwipeUp";
import background from './background-gif.gif'



export default class LogIn extends React.Component {

    state = {email: null, password: null};

    setEmail = (email) => {
        this.setState({email: email})
    };

    setPassword = (password) => {
        this.setState({password: password})
    };

    render() {
        return (
            <ImageBackground source={background} style={{width: appStyles.win.width, height: appStyles.win.height}}>
                <View style={{paddingTop: appStyles.win.height * 0.2, alignItems: 'center'}}>
                    <TextInput placeholder={"E-Mail"} onChangeText={this.setEmail}/>
                    <TextInput type={"password"} placeholder={"Password"} onChangeText={this.setPassword}/>
                    <View style={{height: 20}}/>
                    <Button onClick={() => this.props.login(this.state.email, this.state.password)} text={"Sign In"}/>
                </View>
                <SwipeUp text={"Swipe Up to Sign Up"}
                         onSwipeUp={() => this.props.setAppState({screen: 'signup'})}/>
            </ImageBackground>


    );
    }
}