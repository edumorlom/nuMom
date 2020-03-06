import { Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import React from "react";
import appStyles from './AppStyles'
import Button from "./Button";
import TextInput from "./TextInput.jsx";
import DateTimePicker from '@react-native-community/datetimepicker';




export default class SignUpInfo extends React.Component {

    state = {fullName: '', dob: ''};

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
                            <TextInput placeholder={"Full Name"} onChangeText={() => {this.setState({fullName: fullName})}}/>
                            <DatePicker
                                style={{...appStyles.TextInput.View}}
                                date={this.state.dob}
                                mode="date"
                                placeholder="Date of Birth"
                                format="MM-DD-YYYY"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}
                                customStyles={{
                                    dateText: appStyles.TextInput.TextInput,
                                    placeholderText: {
                                        fontSize: appStyles.TextInput.TextInput.fontSize
                                    },
                                    dateInput: {
                                        borderWidth: 0,
                                        borderColor: 'pink'
                                    },
                                    btnTextConfirm: {
                                        color: appStyles.pinkColor
                                    }
                                }}
                                onDateChange={(dob) => {this.setState({dob: dob})}}/>
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
