import {Text, View} from 'react-native';
import React from "react";
import appStyles from './AppStyles'
import MultipleChoiceButton from "./MultipleChoiceButton";


export default class SignUpYesorNo extends React.Component {

    onClick = (userResponse) => {
        this.props.setUserInfo({[this.props.value]: userResponse});
        this.props.getNextScreen();
    };

    render() {
        return (
            <View style={appStyles.container}>
                <View style={{
                    paddingTop: appStyles.win.height * 0.3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute'}}>
                    <Text style={{
                        color: 'black',
                        fontSize: appStyles.titleFontSize,
                        fontWeight: 'bold',
                        padding: 10,
                        textAlign: 'center'}}>{this.props.question}</Text>
                    <View style={appStyles.rowContainer}>
                        <MultipleChoiceButton text={'✓'} color={appStyles.blueColor} onClick={() => this.onClick(true)}/>
                        <MultipleChoiceButton text={'X'} color={appStyles.pinkColor} onClick={() => this.onClick(false)}/>
                    </View>
                </View>
            </View>
        );
    }
}