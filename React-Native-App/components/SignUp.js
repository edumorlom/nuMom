import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker';

import MyPicker from '../components/MyPicker';
import Colors from '../constants/Colors';
import Translator from '../components/Translator';

export default class SignUpForm extends React.Component {

    // profile values
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.loadProfile['Name'],
            middleName: this.props.loadProfile['MiddleName'],
            lastName: this.props.loadProfile['LastName'],
            birthdate: this.props.loadProfile['BirthDate'],
            phoneNumber: this.props.loadProfile['PhoneNumber'],
            pregnantMonths: this.props.loadProfile['PregnantMonths'],
            childAge: this.props.loadProfile['ChildAge'],
            frequency: this.props.loadProfile['Frequency'],
            lang: this.props.loadLanguage,
            screen: this.props.loadScreen,
        }
    }

    render() {
        // get date
        var currDate = new Date().getFullYear() + '-01-01';
        // organize array for changes/decisions in real time
        var profileDetails = {
            'Name': this.state.name, "MiddleName": this.state.middleName, "LastName": this.state.lastName,
            "BirthDate": this.state.birthdate, "PhoneNumber": this.state.phoneNumber, "PregnantMonths": this.state.pregnantMonths,
            "ChildAge": this.state.childAge, "Frequency": this.state.frequency
        };
        this.exporterProfile(profileDetails);
        return (
            <View>
                {/* First Name */}
                <View style={styles.labelPosition}>
                    <View style={styles.labelWidth}>
                        <Translator style={styles.labelText} loadText={('First Name')} loadLanguage={this.state.lang} />
                    </View>
                    <View style={styles.inputWidth}>
                        <TextInput
                            placeholder={this.state.name}
                            onChangeText={text => this.setState({ name: text })}
                            style={styles.textInput}
                        />
                    </View>
                </View>
                <View style={styles.seperatorLine} />
                {/* Middle Name */}
                <View style={styles.labelPosition}>
                    <View style={styles.labelWidth}>
                        <Translator style={styles.labelText} loadText={('Middle Name')} loadLanguage={this.state.lang} />
                    </View>
                    <View style={styles.inputWidth}>
                        <TextInput
                            placeholder={this.state.middleName}
                            onChangeText={text => this.setState({ middleName: text })}
                            style={styles.textInput}
                        />
                    </View>
                </View>
                <View style={styles.seperatorLine} />
                {/* Last Name */}
                <View style={styles.labelPosition}>
                    <View style={styles.labelWidth}>
                        <Translator style={styles.labelText} loadText={('Last Name')} loadLanguage={this.state.lang} />
                    </View>
                    <View style={styles.inputWidth}>
                        <TextInput
                            placeholder={this.state.lastName}

                            onChangeText={text => this.setState({ lastName: text })}
                            style={styles.textInput}
                        />
                    </View>
                </View>
                <View style={styles.seperatorLine} />
                {/* Birth Date */}
                <View style={styles.labelPosition}>
                    <View style={styles.labelWidth}>
                        <Translator style={styles.labelText} loadText={('Birth Date')} loadLanguage={this.state.lang} />
                    </View>
                    <View style={styles.inputWidth}>
                        {/* Handles a calender for birthdate */}
                        <DatePicker
                            style={styles.inputWidth}
                            customStyles={{
                                dateInput: { marginLeft: 10, alignItems: 'flex-start', justifyContent: 'center', borderColor: 'transparent', },
                                btnCancel: { marginLeft: 50, }, btnConfirm: { marginRight: 50, }, placeholderText: { fontSize: 15, }
                            }}
                            date={this.state.birthdate}
                            onDateChange={date => this.setState({ birthdate: date })}
                            showIcon={false} mode="date"
                            placeholder=" " format="YYYY-MM-DD"
                            minDate="1940-05-01" maxDate={currDate}
                            confirmBtnText="Confirm" cancelBtnText="Cancel"
                        />
                    </View>
                </View>
                <View style={styles.seperatorLine} />
                {/* Phone Number */}
                <View style={styles.seperatorLine} />
                <View style={styles.labelPosition}>
                    <View style={styles.labelWidth}>
                        <Translator style={styles.labelText} loadText={('Phone Number')} loadLanguage={this.state.lang} />
                    </View>
                    <View style={styles.inputWidth}>
                        <TextInput
                            placeholder={this.state.phoneNumber}
                            onChangeText={text => this.setState({ phoneNumber: text })}
                            style={styles.textInput}
                            keyboardType='number-pad'
                            autoCompleteType='tel'
                        />
                    </View>
                </View>
                <View style={styles.seperatorLine} />
                {/* Pregnant Picker */}
                <View style={styles.pickerStyle}>
                    <View style={styles.labelWidth}>
                        <Translator style={styles.labelText} loadText={('Pregnant?')} loadLanguage={this.state.lang} />
                    </View>
                    <View style={styles.inputWidth}>
                        <MyPicker loadLanguage={this.state.lang}
                            loadPickerType={('Monthly')}
                            getPickerValue={value => this.pregHandler(value)} 
                            loadValue={this.state.pregnantMonths} />
                    </View>
                </View>
                <View style={styles.seperatorLine} />
                {/* Infant? Picker */}
                <View style={styles.pickerStyle}>
                    <View style={styles.labelWidth}>
                        <Translator style={styles.labelText} loadText={('Have an Infant? ')} loadLanguage={this.state.lang} />
                    </View>
                    <View style={styles.inputWidth}>
                        <MyPicker loadLanguage={this.state.lang}
                            loadPickerType={('Monthly')}
                            getPickerValue={value => this.setState({ childAge: value })} 
                            loadValue={this.state.childAge} />
                    </View>
                </View>
                <View style={styles.seperatorLine} />
                {/* Notifications Picker */}
                <View style={styles.pickerStyle}>
                    <View style={styles.labelWidth}>
                        <Translator style={styles.labelText} loadText={('Receive Notifications?')} loadLanguage={this.state.lang} />
                    </View>
                    <View style={styles.inputWidth}>
                        <MyPicker loadLanguage={this.state.lang}
                            loadPickerType={('Notification')}
                            getPickerValue={value => this.setState({ frequency: value })} 
                            loadValue={this.state.frequency} />
                    </View>
                </View>
            </View>
        );
    }

    componentDidMount() {}
    pregHandler = (value) => {
        this.setState({ pregnantMonths: value });
    }
    // export values on re-renderings
    exporterProfile = (profileDetails) => {
        this.props.getProfile(profileDetails);
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    textInput: {
        fontSize: 15,
        padding: 10,
    },
    labelPosition: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 5,
        paddingTop: 5,
    },
    labelText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    pickerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    seperatorLine: {
        width: '95%',
        borderBottomColor: Colors.PurpleBackground,
        borderBottomWidth: 1,
    },
    labelWidth: {
        width: '30%'
    },
    inputWidth: {
        width: '70%'
    }
})