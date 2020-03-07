import { Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import React from "react";
import appStyles from './styles'
import Button from "./Button";
import TextInput from "./TextInput.jsx";
import DatePicker from 'react-native-datepicker'





export default class SignUpInfo extends React.Component {

    state = {fullName: '', dob: ''};

    setFullName = (fullName) => {
        this.setState({fullName: fullName})
    };

    setDob = (dob) => {
        this.setState({dob: dob})
    };

    onClick = () => {
        if (!this.state.fullName || !this.state.dob) {
            alert("Please fill out all of the fields!")
        } else {
            this.props.setUserInfo({fullName: this.state.fullName, dob: this.state.dob});
            this.props.getNextScreen();
        }
    };

    render() {
        let titleText = this.state.fullName ? 'Cool, ' : "Great To Meet You";
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={appStyles.container}>
                    <View style={{
                        paddingTop: appStyles.win.height * 0.10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                    }}>
                            <Text style={appStyles.titleBlue}>
                                {titleText}
                                <Text style={appStyles.titlePink}>
                                    {this.state.fullName ? this.state.fullName.split(' ')[0] : ''}
                                </Text>
                                !
                            </Text>
                        <View style={{paddingTop: appStyles.win.height * 0.15}}>
                            <TextInput placeholder={"Full Name"} onChangeText={this.setFullName}/>
                            <TextInput placeholder={"Birth Date (MM/DD/YY)"} type={'date'} onChangeText={this.setDob} keyboardType={"numeric"}/>
                        </View>
                    </View>
                    <View style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: '12%'
                    }}>
                        <Button text={"Continue"} onClick={()=> this.onClick()}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
