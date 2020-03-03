import {Image, Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import React from "react";
import appStyles from './AppStyles'
import MultipleChoiceButton from "./MultipleChoiceButton";
import Button from "./Button";


export default class SignUpInfant extends React.Component {
    state = {infant: false};

    onClick = () => {
        console.log(this.state);
        this.props.setUserInfo(this.state);
        this.props.getNextScreen();
    };

    setInfant = (infant) => {
        console.log(infant);
        this.setState({infant: infant});
        this.onClick();
    };

    render() {
        let genderColors = {male: appStyles.blueColor, female: appStyles.pinkColor, unknown: appStyles.greyColor};
        let color = genderColors[this.state.infant];

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
                        <Text style={{color: 'black', fontSize: appStyles.titleFontSize, fontWeight: 'bold', padding: 10, textAlign: 'center'}}>{"Do You Have an Infant?"}</Text>
                            <View style={appStyles.rowContainer}>
                                <MultipleChoiceButton text={'✓'} color={genderColors['male']} onClick={() => this.setInfant(true)}/>
                                <MultipleChoiceButton text={'X'} color={genderColors['female']} onClick={() => this.setInfant(false)}/>
                            </View>
                    </View>
                    <View style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: 100
                    }}>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}