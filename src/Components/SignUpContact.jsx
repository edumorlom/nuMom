import React from "react";
import { AsyncStorage, Keyboard, Text, TextInput as TextBox, TouchableOpacity, View } from 'react-native';
import appStyles from './AppStyles';
import Button from "./Button";



export default class SignUpInfo extends React.Component {

     state = {email: '', phoneNumber: ''};

    setEmail = (email) => {
        this.setState({email: email});
        AsyncStorage.setItem('e-mail', email);

    };

    setPhoneNumber = (phoneNumber) => {
        this.setState({phoneNumber: phoneNumber});
        AsyncStorage.setItem('phone', phoneNumber);

    };


    isValidEmail = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    isValidPhoneNumber = (phoneNumber) => {
        return phoneNumber.length === 10 && !isNaN(phoneNumber) || phoneNumber.length === 12 && !isNaN(phoneNumber.substring(1, 12));

    };

    onPress = () => {
        if (!this.state.email || !this.state.phoneNumber) {
            alert(this.props.getLocalizedText("fillOutAllFields"))
        } else if (!this.isValidEmail(this.state.email)){
            alert(this.props.getLocalizedText("invalidEmail"))
        } else if (!this.isValidPhoneNumber(this.state.phoneNumber)) {
            alert(this.props.getLocalizedText("invalidPhoneNumber"))
        } else {
            this.props.setUserInfo({email: this.state.email, phoneNumber: this.state.phoneNumber});
            this.props.getNextScreen();
        }
    };

    componentDidMount() {
        AsyncStorage.getItem('e-mail').then((value) => {
          if (value !== null && value !== ''){
          // saved input is available
          this.setState({ email: value }); // Note: update state with last entered value
        }
        }).done();
        AsyncStorage.getItem('phone').then((value) => {
            if (value !== null && value !== ''){
            // saved input is available
            this.setState({ phoneNumber: value }); // Note: update state with last entered value
          }
        }).done();
      }

      componentWillUnmount() {
        clearInterval(this.interval);
      }

    render() {
        return (
            <TouchableOpacity onPress={Keyboard.dismiss} accessible={false} style={appStyles.container}>
                <View style={appStyles.container}>
                    <View style={{
                        paddingTop: appStyles.win.height * 0.1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                    }}>
                        <View>
                            <Text style={appStyles.titleBlue}>{this.props.getLocalizedText("contactInformation")}</Text>
                        </View>
                        <View style={{paddingTop: appStyles.win.height * 0.1}}>
                            <View style={appStyles.TextInput.View}>
                                <TextBox placeholder={this.props.getLocalizedText("emailInput")} onChangeText={this.setEmail} value= {this.state.email} style={appStyles.TextInput.TextInput}/>
                            </View>
                            <View style={appStyles.TextInput.View}>
                                <TextBox placeholder={this.props.getLocalizedText("phoneNumberInput")} onChangeText={this.setPhoneNumber} keyboardType={"numeric"} value= {this.state.phoneNumber} style={appStyles.TextInput.TextInput}/>
                            </View>

                            
                            {/*
                            <TextInput placeholder={this.props.getLocalizedText("emailInput")} onChangeText={this.setEmail}/>
                            <TextInput placeholder={this.props.getLocalizedText("phoneNumberInput")} onChangeText={this.setPhoneNumber} keyboardType={"numeric"}/>
                            */}
                        </View>
                    </View>
                    <View style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: '12%'
                    }}>
                        <Button text={this.props.getLocalizedText("continueButton")} onPress={this.onPress}/>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
