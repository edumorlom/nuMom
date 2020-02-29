import {Image, Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import React from "react";
import loginMainImage from "./login-main-image.png"
import appStyles from './AppStyles'
import Button from "./Button";
import TextBox from "./TextBox.jsx";
import ClickableText from "./ClickableText";
import Firebase from "./Firebase";


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
                    <View style={{marginTop: "27%"}}>
                        <Image style={{width: 150, height: 150}} source={loginMainImage}/>
                    </View>
                    <View style={{paddingTop: 40, alignItems: 'center'}}>
                        <TextBox placeholder={"E-Mail"} onChangeText={this.setEmail}/>
                        <TextBox type={"password"} placeholder={"Password"} onChangeText={this.setPassword}/>
                        <Button onClick={() => {
                            this.props.setAppState({screen: 'homepage'})
                            // let fb = new Firebase();
                            // fb.logIn(this.state.email, this.state.password).then( response => {
                            //     console.log("Successful login!", response);
                            //     this.props.setAppState({screen: 'homepage'})
                            // })
                        }}
                                text={"Sign In"}/>
                    </View>
                    <View style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: 40
                    }}>
                        <ClickableText text={"NEW MOM? SIGN UP NOW!"}
                                       onClick={() => this.props.setAppState({screen: 'signup'})}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}