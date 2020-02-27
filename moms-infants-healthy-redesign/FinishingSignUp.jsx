import {Image, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React from "react";
import appStyles from './AppStyles'
import Button from "./Button";
import dnaLoading from "./dna-loading.gif";


export default class FinishingSignUp extends React.Component {

    state = {loadingText: 'Loading Baby'};

    render() {
        console.log("BEING RELOADED");
        setTimeout(() => this.props.signUpAndUploadData(), 2000);

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={appStyles.container}>
                    <View style={{
                        marginTop: '50%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute'
                    }}>
                        <Image source={dnaLoading} style={{width: 250, height: 250}}/>
                        <Text style={{color: appStyles.greyColor, fontSize: 25, fontWeight: 'bold'}}>{this.state.loadingText}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}