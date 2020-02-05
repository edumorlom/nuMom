import {Image, Keyboard, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import React from "react";
import loginMainImage from "./login-main-image.png"
import appStyles from './AppStyles'
import Button from "./Button";
import TextBox from "./TextBox.jsx";
import ClickableText from "./ClickableText";
import SignUpInfo from "./SignUpInfo";
import Congratulations from "./Congratulations";
import SignUpAddress from "./SignUpAddress";
import SignUpPassword from "./SignUpPassword";
import SignUpGender from "./SignUpGender";


export default class SignUp extends React.Component {
    state = {index: 0};

    getNextScreen = () => {
        let currentIndex = this.state.index;
        console.log(currentIndex);
        if (currentIndex >= 0 && currentIndex < (this.screens.length - 1)) this.setState({index: currentIndex + 1});
    };

    screens = [
        <Congratulations getNextScreen={this.getNextScreen}/>,
        <SignUpInfo getNextScreen={this.getNextScreen}/>,
        <SignUpPassword getNextScreen={this.getNextScreen}/>,
        <SignUpAddress getNextScreen={this.getNextScreen}/>,
        <SignUpGender/>
    ];

    render() {
        console.log(this.state.index)
        return this.screens[this.state.index];
    }
};