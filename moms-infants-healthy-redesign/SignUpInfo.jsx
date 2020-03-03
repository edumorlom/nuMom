import { Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import React from "react";
import appStyles from './AppStyles'
import Button from "./Button";
import TextInput from "./TextInput.jsx";
import DateTimePicker from '@react-native-community/datetimepicker';



export default class SignUpInfo extends React.Component {

    state = {fullName: '', email: '', dob: 'temporary'};

    setFullName = (fullName) => {
        console.log(fullName);
        this.setState({fullName: fullName})
    };

    setEmail = (email) => {
        console.log(email);
        this.setState({email: email})
    };

    setDob = (dob) => {
        console.log(dob);
        this.setState({dob: dob})
    };

    onClick = () => {
        if (!this.state.fullName || !this.state.email || !this.state.dob) {
            alert("Please fill out all of the fields!")
        } else {
            this.props.setUserInfo(this.state);
            this.props.getNextScreen();
        }
    };

    render() {
        let titleText = this.state.fullName ? 'Great To Meet You, ' : "Great To Meet You!";
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
                            <Text style={appStyles.titleBlue}>{titleText}</Text>
                            <Text style={appStyles.titlePink}>{this.state.fullName ? this.state.fullName.split(' ')[0] : ' '}</Text>
                        </View>
                        <View style={{paddingTop: appStyles.win.height * 0.05}}>
                            <TextInput placeholder={"Full Name"} onChangeText={this.setFullName}/>
                            <TextInput placeholder={"E-Mail"} onChangeText={this.setEmail}/>
                            {/*<TextInput placeholder={"DOB (MM/DD/YYYY)"} onChangeText={this.setDob}/>*/}
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
