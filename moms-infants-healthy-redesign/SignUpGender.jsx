import {Image, Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import React from "react";
import appStyles from './AppStyles'
import GenderButton from "./GenderButton";
import Button from "./Button";


export default class SignUpGender extends React.Component {

    state = {gender: 'unknown'};

    render() {
        let genderColors = {male: appStyles.blueColor, female: appStyles.pinkColor, unknown: appStyles.greyColor};
        let color = genderColors[this.state.gender];

        let container = {...appStyles.container};
        container["backgroundColor"] = color;

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={container}>
                    <View style={{
                        paddingTop: '90%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute'
                    }}>
                        <View>
                            <Text style={{color: 'white', fontSize: appStyles.titleFontSize, fontWeight: 'bold', padding: 20}}>{"Baby's Gender"}</Text>
                        </View>
                        <View style={appStyles.rowContainer}>
                            <GenderButton text={'♂'} color={genderColors['male']} onClick={() => this.setState({gender: 'male'})}/>
                            <GenderButton text={"♀"} color={genderColors['female']}  onClick={() => this.setState({gender: 'female'})}/>
                            <GenderButton text={"?"} color={genderColors['unknown']}  onClick={() => this.setState({gender: 'unknown'})}/>
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