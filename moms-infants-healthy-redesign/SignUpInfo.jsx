import {Image, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React from "react";
import appStyles from './AppStyles'
import Button from "./Button";
import TextBox from "./TextBox.jsx";


export default class SignUpInfo extends React.Component {

    state = {fullName: '', email: '', dob: ''};

    setFullName = (fullName) => {
        console.log(fullName)
        this.setState({fullName: fullName})
    }

    render() {
        let titleText = this.state.fullName ? 'Great To Meet You, ' : "Great To Meet You!";
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={appStyles.container}>
                    <View style={{
                        paddingTop: '40%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                    }}>
                        <View>
                            <Text style={appStyles.titleBlue}>{" "}</Text>
                            <Text style={appStyles.titleBlue}>{titleText}</Text>
                            <Text style={appStyles.titlePink}>{this.state.fullName ? this.state.fullName.split(" ")[0] : ' '}</Text>
                        </View>
                        <View style={{paddingTop: 100, alignItems: 'center'}}>
                            <TextBox placeholder={"Full Name"} onChangeText={this.setFullName}/>
                            <TextBox placeholder={"E-Mail"}/>
                            <TextBox placeholder={"DOB (MM/DD/YYYY)"}/>
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