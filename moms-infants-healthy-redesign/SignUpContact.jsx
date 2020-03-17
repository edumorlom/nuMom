import {Keyboard, Text, TouchableOpacity, View} from 'react-native';
import React from "react";
import appStyles from './AppStyles'
import Button from "./Button";
import TextInput from "./TextInput.jsx";



export default class SignUpInfo extends React.Component {

    state = {email: '', phoneNumber: ''};

    setEmail = (email) => {
        this.setState({email: email})
    };

    setPhoneNumber = (phoneNumber) => {
        this.setState({phoneNumber: phoneNumber})
    };


    isValidEmail = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    isValidPhoneNumber = (phoneNumber) => {
        return phoneNumber.length === 10 && !isNaN(phoneNumber) || phoneNumber.length === 12 && !isNaN(phoneNumber.substring(1, 12));

    };

    onClick = () => {
        if (!this.state.email || !this.state.phoneNumber) {
            alert("Please fill out all of the fields!")
        } else if (!this.isValidEmail(this.state.email)){
            alert("The e-mail you entered is not valid!")

        } else if (!this.isValidPhoneNumber(this.state.phoneNumber)) {
            alert("The phone number you entered is not valid!")
        } else {
            this.props.setUserInfo({email: this.state.email, phoneNumber: this.state.phoneNumber});
            this.props.getNextScreen();
        }
    };

    render() {
        return (
            <TouchableOpacity onPress={Keyboard.dismiss} accessible={false} style={appStyles.container}>
                <View style={appStyles.container}>
                    <View style={{
                        paddingTop: appStyles.win.height * 0.1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                    }}>
                        <View>
                            <Text style={appStyles.titleBlue}>{'Contact Information'}</Text>
                        </View>
                        <View style={{paddingTop: appStyles.win.height * 0.1}}>
                            <TextInput placeholder={"E-Mail"} onChangeText={this.setEmail}/>
                            <TextInput placeholder={"Phone Number"} onChangeText={this.setPhoneNumber} keyboardType={"numeric"}/>
                        </View>
                    </View>
                    <View style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: '12%'
                    }}>
                        <Button text={"Continue"} onClick={()=> this.onClick()}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
