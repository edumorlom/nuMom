import {Image, Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import React from "react";
import appStyles from './AppStyles'
import GenderButton from "./GenderButton";
import Button from "./Button";


export default class SignUpBabyGender extends React.Component {
    state = {babyGender: {male: false, female: false}};

    onClick = () => {
        console.log(this.state);
        this.props.setUserInfo(this.state);
        this.props.getNextScreen();
    };

    setBabyGender = (babyGender) => {
        let male = this.state.babyGender.male;
        let female = this.state.babyGender.female;


        // if (this.state.babyGender.male && this.state.babyGender.female && babyGender === 'male'){
        //     male = true;
        //     female = false;
        // } else if (this.state.babyGender.male && this.state.babyGender.female && babyGender === 'female') {
        //     male = false;
        //     female = true;
        // } else if (babyGender === 'male'){
        //     male = !male;
        // } else if (babyGender === 'female') {
        //     female = !female;
        // } else {
        //     male = false;
        //     female = false;
        // }


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
        let color = appStyles.greyColor;

        if (this.state.babyGender.male && this.state.babyGender.female) {
            color = 'purple'
        } else if (this.state.babyGender.male) {
            color = appStyles.blueColor;
        } else if (this.state.babyGender.female) {
            color = appStyles.pinkColor
        }

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
                        <View>
                            <Text style={{color: 'white', fontSize: appStyles.titleFontSize, fontWeight: 'bold', padding: 10}}>{"Select Their Genders"}</Text>
                        </View>
                        <View style={appStyles.rowContainer}>
                            <GenderButton text={'♂'} color={appStyles.blueColor} selected={this.state.babyGender.male} onClick={() => this.setBabyGender('male')}/>
                            <GenderButton text={"♀"} color={appStyles.pinkColor} selected={this.state.babyGender.female} onClick={() => this.setBabyGender('female')}/>
                            <GenderButton text={"?"} color={appStyles.greyColor} selected={!this.state.babyGender.male && !this.state.babyGender.female} onClick={() => this.setBabyGender('unknown')}/>
                        </View>
                    </View>
                    <View style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: 40
                    }}>
                        <Button text={"Continue"} onClick={this.onClick}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}