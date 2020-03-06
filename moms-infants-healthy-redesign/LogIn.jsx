import {Dimensions, Image, Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import React from "react";
import loginMainImage from "./login-main-image.png"
import appStyles from './AppStyles'
import Button from "./Button";
import TextInput from "./TextInput";
import ClickableText from "./ClickableText";
import FadeInView from 'react-native-fade-in-view';


export default class LogIn extends React.Component {

    state = {email: null, password: null};

    setEmail = (email) => {
        console.log(email);
        this.setState({email: email})
    };

    setPassword = (password) => {
        console.log(password);
        this.setState({password: password})
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={appStyles.container}>
                    <View style={{marginTop: "20%"}}>
                        <Image style={{width: appStyles.win.height * 0.17, height: appStyles.win.height * 0.17}} source={loginMainImage}/>
                    </View>
                    <View style={{paddingTop: '9%', alignItems: 'center'}}>
                        <TextInput placeholder={"E-Mail"} onChangeText={this.setEmail}/>
                        <TextInput type={"password"} placeholder={"Password"} onChangeText={this.setPassword}/>
                        <Button onClick={() => this.props.login(this.state.email, this.state.password)} text={"Sign In"}/>
                    </View>
                    <View style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: '12%'
                    }}>
                        <ClickableText text={"PARENT? SIGN UP NOW!"}
                                       onClick={() => this.props.setAppState({screen: 'signup'})}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}