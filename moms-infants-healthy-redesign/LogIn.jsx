import {Image, Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import React from "react";
import loginMainImage from "./login-main-image.png"
import appStyles from './AppStyles'
import Button from "./Button";
import TextBox from "./TextBox.jsx";
import ClickableText from "./ClickableText";


export default function LogIn(props) {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={appStyles.container}>
                <View style={{marginTop: "30%"}}>
                    <Image style={{width: 150, height: 150}} source={loginMainImage} />
                </View>
                <View style={{paddingTop: 50, alignItems: 'center'}}>
                    <TextBox placeholder={"E-Mail"}/>
                    <TextBox type={"password"} placeholder={"Password"}/>
                    <Button onClick={()=>{console.log("Sign In!")}} text={"Sign In"}/>
                </View>
                <View style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 40
                }}>
                    <ClickableText text={"NEW MOM? SIGN UP NOW!"}
                                   onClick={() => props.setAppState({screen: 'signup'})}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

let login = (phoneNumber, password) => {

};