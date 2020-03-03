import { Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import React from "react";
import appStyles from './AppStyles'
import Button from "./Button";
import TextInput from "./TextInput.jsx";
import DateTimePicker from '@react-native-community/datetimepicker';



export default class SignUpInfo extends React.Component {

    state = {email: '', phoneNumber: ''};

    setEmail = (email) => {
        console.log(email);
        this.setState({email: email})
    };

    setPhoneNumber = (phoneNumber) => {
        console.log(phoneNumber);
        this.setState({phoneNumber: phoneNumber})
    };

    onClick = () => {
        if (!this.state.email || !this.state.phoneNumber) {
            alert("Please fill out all of the fields!")
        } else {
            this.props.setUserInfo(this.state);
            this.props.getNextScreen();
        }
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={appStyles.container}>
                    <View style={{
                        paddingTop: '30%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                    }}>
                        <View>
                            <Text style={appStyles.titleBlue}>{'Contact Information'}</Text>
                        </View>
                        <View style={{paddingTop: appStyles.win.height * 0.05}}>
                            <TextInput placeholder={"E-Mail"} onChangeText={this.setEmail}/>
                            <TextInput placeholder={"Phone Number"} onChangeText={this.setPhoneNumber}/>
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
            </TouchableWithoutFeedback>
        );
    }
}
