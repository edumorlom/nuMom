import {Image, Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import React from "react";
import appStyles from './styles'
import MultipleChoiceButton from "./MultipleChoiceButton";
import Button from "./Button";


export default class SignUpBabyGender extends React.Component {
    state = {babyGender: {male: false, female: false}};

    onClick = () => {
        this.props.setUserInfo({male: this.state.male, female: this.state.female});
        this.props.getNextScreen();
    };

    setBabyGender = (babyGender) => {
        let male = this.state.babyGender.male;
        let female = this.state.babyGender.female;


        if (babyGender === 'male'){
            male = !male;
        } else if (babyGender === 'female') {
            female = !female;
        } else {
            male = false;
            female = false;
        }

        this.setState({babyGender: {male: male, female: female}})
    };

    render() {
        let genderSelected = this.state.babyGender.male || this.state.babyGender.female;
        let backgroundColor = "white";
        let textColor = "black";

        if (genderSelected) {
            textColor = "white";
        }

        if (this.state.babyGender.male && this.state.babyGender.female) {
            backgroundColor = "#acace6"
        } else if (this.state.babyGender.male) {
            backgroundColor = appStyles.blueColor;
        } else if (this.state.babyGender.female) {
            backgroundColor = appStyles.pinkColor
        }

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{...appStyles.container, backgroundColor: backgroundColor}}>
                    <View style={{
                        paddingTop: appStyles.win.height * 0.3,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute'}}>
                        <Text style={{color: textColor, fontSize: appStyles.titleFontSize, fontWeight: 'bold', padding: 10, textAlign: 'center'}}>{"Select Their Genders"}</Text>
                            <View style={appStyles.rowContainer}>
                                <MultipleChoiceButton text={'♂'} color={appStyles.blueColor} selected={this.state.babyGender.male} onClick={() => this.setBabyGender('male')}/>
                                <MultipleChoiceButton text={"♀"} color={appStyles.pinkColor} selected={this.state.babyGender.female} onClick={() => this.setBabyGender('female')}/>
                            </View>
                    </View>
                    <View style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: '12%'}}>
                        <Button text={this.state.babyGender.male || this.state.babyGender.female ? "Continue" : "I Don't Know"} onClick={this.onClick}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}