import {Keyboard, Text, TouchableOpacity, View, TextInput as TextBox, AsyncStorage} from 'react-native';
import React from "react";
import appStyles from './AppStyles'
import Button from "./Button";
import TextInput from "./TextInput.jsx";


export default class SignUpPassword extends React.Component {

    state = {password: '', repeatPassword: ''};

    setPassword = (password) => {
        this.setState({password: password});
        AsyncStorage.setItem('pass', password);

    };

    setRepeatPassword = (password) => {
        this.setState({repeatPassword: password});
        AsyncStorage.setItem('repeat', password);

    };

    onPress = () => {
        if (this.state.password !== this.state.repeatPassword) {
            alert(this.props.getLocalizedText("passwordMismatch"))
        } else if (!this.state.password || !this.state.repeatPassword) {
            alert(this.props.getLocalizedText("fillOutAllFields"))
        } else if (this.state.password.length < 6){
            alert(this.props.getLocalizedText("passwordTooShort"))
        } else {
            this.props.setUserInfo(this.state);
            this.props.getNextScreen();
        }
    };

    componentDidMount() {
        AsyncStorage.getItem('pass').then((value) => {
          if (value !== null && value !== ''){
          // saved input is available
          this.setState({ password: value }); // Note: update state with last entered value
        }
        }).done();
        AsyncStorage.getItem('repeat').then((value) => {
            if (value !== null && value !== ''){
            // saved input is available
            this.setState({ repeatPassword: value }); // Note: update state with last entered value
          }
        }).done();
      }

      componentWillUnmount() {
        clearInterval(this.interval);
      }

    render() {
        return (
            <TouchableOpacity onPress={Keyboard.dismiss} accessible={false} style={appStyles.container}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                    }}>
                        <Text style={appStyles.titleBlue}>{this.props.getLocalizedText("createPassword")}</Text>
                        <View style={{paddingTop: appStyles.win.height * 0.1}}>
                            <View style={appStyles.TextInput.View}>
                                <TextBox placeholder={this.props.getLocalizedText("passwordInput")} onChangeText={this.setPassword} secureTextEntry={true} value= {this.state.password} style={appStyles.TextInput.TextInput}/>
                            </View>
                            <View style={appStyles.TextInput.View}>
                                <TextBox placeholder={this.props.getLocalizedText("repeatPasswordInput")} onChangeText={this.setRepeatPassword} secureTextEntry={true} value= {this.state.repeatPassword} style={appStyles.TextInput.TextInput}/>
                            </View>
                            
                        </View>
                    </View>
                    <View style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: '12%',}}>
                        <Button text={this.props.getLocalizedText("continueButton")} onPress={this.onPress}/>
                    </View>
            </TouchableOpacity>
        );
    }
}