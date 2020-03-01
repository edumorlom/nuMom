import React from "react";
import SignUpInfo from "./SignUpInfo";
import Congratulations from "./Congratulations";
import SignUpPassword from "./SignUpPassword";
import SignUpBabyGender from "./SignUpBabyGender";
import Firebase from "./Firebase";
import FinishingSignUp from "./FinishingSignUp";
import SignUpPregnant from "./SignUpPregnant";
import SignUpInfant from "./SignUpInfant";


export default class SignUp extends React.Component {
    state = {index: 0, email: null, password: null, fullName: null, dob: null, pregnant: null, infant: null, babyGender: null};

    getNextScreen = () => {
        let currentIndex = this.state.index;
        this.setState({index: currentIndex + 1});
    };

    setUserInfo = (keyToValue) => {
        this.setState(keyToValue);
    };

    signUpAndUploadData = () => {
        let fb = new Firebase();
        console.log(this.state);
        fb.signUp(this.state.email, this.state.password, this.state.fullName, this.state.dob, this.state.babyGender);
        this.props.setAppState({screen: 'login'})
    };

    screens = [
        <Congratulations setUserInfo={this.setUserInfo} getNextScreen={this.getNextScreen}/>,
        <SignUpInfo setUserInfo={this.setUserInfo} getNextScreen={this.getNextScreen}/>,
        <SignUpPassword setUserInfo={this.setUserInfo} getNextScreen={this.getNextScreen}/>,
        <SignUpPregnant setUserInfo={this.setUserInfo} getNextScreen={this.getNextScreen}/>,
        <SignUpInfant setUserInfo={this.setUserInfo} getNextScreen={this.getNextScreen}/>,
        <SignUpBabyGender setUserInfo={this.setUserInfo} getNextScreen={this.getNextScreen}/>,
        <FinishingSignUp signUpAndUploadData={this.signUpAndUploadData}/>
    ];

    render() {
        return this.screens[this.state.index];
    }
};
