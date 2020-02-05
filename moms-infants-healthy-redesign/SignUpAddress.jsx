import {Image, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React from "react";
import appStyles from './AppStyles'
import Button from "./Button";
import TextBox from "./TextBox.jsx";


export default class SignUpAddress extends React.Component {

    state = {fullName: '', email: '', dob: ''};

    setFullName = (fullName) => {
        console.log(fullName)
        this.setState({fullName: fullName})
    }

    render() {
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
                            <Text style={appStyles.titleBlue}>{"Where Do You Live?"}</Text>
                        </View>
                        <View style={{paddingTop: 100, alignItems: 'center'}}>
                            <TextBox placeholder={"11200 SW 8th St."} onChangeText={this.setFullName}/>
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