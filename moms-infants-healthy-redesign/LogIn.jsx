import {Text, Image, Keyboard, TouchableWithoutFeedback, View, TouchableHighlight} from 'react-native';
import React from "react";
import loginMainImage from "./login-main-image.png"
import appStyles from './styles'
import Button from "./Button";
import TextInput from "./TextInput";
import SwipeUp from "./SwipeUp";


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
            <TouchableWithoutFeedback style={appStyles.container} onPress={Keyboard.dismiss}>
                <React.Fragment>
                <View style={{marginTop: appStyles.win.height * 0.09, alignItems: 'center'}}>
                    <Image style={{width: appStyles.win.height * 0.16, height: appStyles.win.height * 0.16}} source={loginMainImage}/>
                    </View>
                    <View style={{paddingTop: appStyles.win.height * 0.04, alignItems: 'center'}}>
                        <TextInput placeholder={"E-Mail"} onChangeText={this.setEmail}/>
                        <TextInput type={"password"} placeholder={"Password"} onChangeText={this.setPassword}/>
                        <Button onClick={() => this.props.login(this.state.email, this.state.password)} text={"Sign In"}/>
                    </View>
                    <SwipeUp text={"Swipe Up to Sign Up"}
                             onSwipeUp={() => this.props.setAppState({screen: 'signup'})}/>

                </React.Fragment>

            </TouchableWithoutFeedback>


    );
    }
}