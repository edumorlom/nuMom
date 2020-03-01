import {Image, Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import React from "react";
import appStyles from './AppStyles'
import GenderButton from "./GenderButton";
import Button from "./Button";


export default class SignUpPregnant extends React.Component {
    state = {pregnant: false};

    onClick = () => {
        console.log(this.state);
        this.props.setUserInfo(this.state);
        this.props.getNextScreen();
    };

    setPregnant = (pregnant) => {
        console.log(pregnant);
        this.setState({pregnant: pregnant});
        this.onClick();
    };

    render() {
        let genderColors = {male: appStyles.blueColor, female: appStyles.pinkColor, unknown: appStyles.greyColor};
        let color = genderColors[this.state.pregnant];

        let container = {...appStyles.container};
        container["backgroundColor"] = color;

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={container}>
                    <View style={{
                        marginTop: '50%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute'
                    }}>
                        <Text style={{color: 'black', fontSize: appStyles.titleFontSize, fontWeight: 'bold', padding: 10}}>{"Are You Pregnant?"}</Text>
                        <View style={appStyles.rowContainer}>
                            <GenderButton text={'✓'} color={genderColors['male']} onClick={() => this.setPregnant(true)}/>
                            <GenderButton text={'X'} color={genderColors['female']}  onClick={() => this.setPregnant(false)}/>
                        </View>
                    </View>
                    <View style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: 40
                    }}>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}