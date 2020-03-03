import { Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import React from "react";
import appStyles from './AppStyles'
import Button from "./Button";
import TextInput from "./TextInput.jsx";


export default class SignUpPassword extends React.Component {

    state = {password: '', repeatPassword: ''};

    setPassword = (password) => {
        this.setState({password: password})
    };

    setRepeatPassword = (password) => {
        this.setState({repeatPassword: password})
    };

    onClick = () => {
        if (this.state.password !== this.state.repeatPassword) {
            alert("Your passwords don't match!")
        } else if (!this.state.password || !this.state.repeatPassword) {
            alert("Password cannot be left empty!")
        } else if (this.state.password.length < 6){
            alert("Your password must have at least 6 characters!")
        } else {
            this.props.setUserInfo(this.state);
            this.props.getNextScreen();
        }
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={appStyles.container}>
                    <View style={{
                        paddingTop: '30%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                    }}>
                        <View>
                            <Text style={appStyles.titleBlue}>{"Create a Password"}</Text>
                        </View>
                        <View style={{paddingTop: '15%'}}>
                            <TextInput type={"password"} placeholder={"Password"} onChangeText={this.setPassword}/>
                            <TextInput type={"password"} placeholder={"Repeat Password"} onChangeText={this.setRepeatPassword}/>
                        </View>
                    </View>
                    <View style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: '12%',}}>
                        <Button text={"Continue"} onClick={() => this.onClick()}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}