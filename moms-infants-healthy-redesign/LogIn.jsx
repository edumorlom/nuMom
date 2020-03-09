import {Animated, Image, ImageBackground, View} from 'react-native';
import React from "react";
import appStyles from './AppStyles'
import Button from "./Button";
import TextInput from "./TextInput";
import SwipeUp from "./SwipeUp";
import background from './background.gif'
import loginMainImage from "./child.png";



export default class LogIn extends React.Component {

    constructor(props) {
        super(props);
        this._start();
    }

    state = {email: null, password: null, fadeValue: new Animated.Value(0)};

    setEmail = (email) => {
        this.setState({email: email})
    };

    setPassword = (password) => {
        this.setState({password: password})
    };

    _start = () => {
        Animated.timing(this.state.fadeValue, {
            toValue: 1,
            duration: 2000
        }).start();
    };

    render() {
        return (
            <Animated.View style={{opacity: this.state.fadeValue, height: '100%', width: '100%'}}>
                <ImageBackground source={background} style={{position: 'absolute', opacity: 0.75, width: appStyles.win.width, height: appStyles.win.height}}/>
                <View style={{paddingTop: appStyles.win.height * 0.07, alignItems: 'center'}}>
                    <Image style={{width: 125, height: 125, margin: appStyles.win.height * 0.03}} source={loginMainImage}/>
                    <TextInput placeholder={"E-Mail"} onChangeText={this.setEmail}/>
                    <TextInput type={"password"} placeholder={"Password"} onChangeText={this.setPassword}/>
                    <View style={{height: 20}}/>
                    <Button onClick={() => this.props.login(this.state.email, this.state.password)} text={"Sign In"}/>
                </View>
                <SwipeUp text={"Swipe Up to Sign Up"}
                         onSwipeUp={() => this.props.setAppState({screen: 'signup'})}/>
            </Animated.View>

    );
    }
}