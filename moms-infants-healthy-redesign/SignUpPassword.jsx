import {Image, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React from "react";
import appStyles from './AppStyles'
import Button from "./Button";
import TextBox from "./TextBox.jsx";


export default class SignUpPassword extends React.Component {

    state = {fullName: '', email: '', dob: ''};

    setFullName = (fullName) => {
        console.log(fullName);
        this.setState({fullName: fullName})
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={appStyles.container}>
                    <View style={{
                        paddingTop: '40%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute'
                    }}>
                        <View>
                            <Text style={appStyles.titleBlue}>{"Create a Password"}</Text>
                        </View>
                        <View style={{paddingTop: 100, alignItems: 'center'}}>
                            <TextBox type={"password"} placeholder={"Password"}/>
                            <TextBox type={"password"} placeholder={"Repeat Password"}/>
                        </View>
                    </View>
                    <View style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: 40
                    }}>
                        <Button text={"Continue"} onClick={()=> this.props.getNextScreen()}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}