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
            name: null,
            middleName: null,
            lastName: null,
            birthdate: null,
            email: null,
            password: null,
            passwordConfirm: null,
            phoneNumber: null,
            pregnantMonths: null,
            childAge: null,
            frequency: null,
            lang: this.props.loadLanguage,
            screen: this.props.loadScreen,
        }
    }

    render() {
        let { lang } = this.state.lang;
        var currDate = new Date().getFullYear() + '-01-01';
        var profileDetails = {
            'Name': this.state.name, "MiddleName": this.state.middleName, "LastName": this.state.lastName,
            "BirthDate": this.state.birthdate, "PhoneNumber": this.state.phoneNumber, "PregnantMonths": this.state.pregnantMonths,
            "ChildAge": this.state.childAge, "Frequency": this.state.frequency, "Language": this.state.lang,
        };
        this.exporterProfile(profileDetails);

        return (
            <View>
                {/* First Name */}
                <View style={styles.labelPosition}>
                    <View style={{ width: '30%' }}>
                        <Translator style={styles.labelText} loadText={('First Name')} loadLanguage={lang} />
                    </View>
                    <View style={{ width: '70%' }}>
                        <TextInput
                            onChangeText={text => this.setState({ name: text })}
                            style={styles.textInput}
                        />
                    </View>
                </View>
                <View style={styles.seperatorLine} />
                {/* Middle Name */}
                <View style={styles.labelPosition}>
                    <View style={{ width: '30%' }}>
                        <Translator style={styles.labelText} loadText={('Middle Name')} loadLanguage={lang} />
                    </View>
                    <View style={{ width: '70%' }}>
                        <TextInput
                            onChangeText={text => this.setState({ middleName: text })}
                            style={styles.textInput}
                        />
                    </View>
                </View>
                <View style={styles.seperatorLine} />
                {/* Last Name */}
                <View style={styles.labelPosition}>
                    <View style={{ width: '30%' }}>
                        <Translator style={styles.labelText} loadText={('Last Name')} loadLanguage={lang} />
                    </View>
                    <View style={{ width: '70%' }}>
                        <TextInput
                            onChangeText={text => this.setState({ lastName: text })}
                            style={styles.textInput}
                        />
                    </View>
                </View>
                <View style={styles.seperatorLine} />
                {/* Birth Date */}
                <View style={styles.labelPosition}>
                    <View style={{ width: '30%' }}>
                        <Translator style={styles.labelText} loadText={('Birth Date')} loadLanguage={lang} />
                    </View>
                    <View style={{ width: '70%' }}>
                        {/* Handles a calender for birthdate */}
                        <DatePicker
                            style={{ width: '70%' }}
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
                    <View style={{ width: '30%' }}>
                        <Translator style={styles.labelText} loadText={('Phone Number')} loadLanguage={lang} />
                    </View>
                    <View style={{ width: '70%' }}>
                        <TextInput
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
                    <View style={{ width: '30%' }}>
                        <Translator style={styles.labelText} loadText={('Pregnant?')} loadLanguage={lang} />
                    </View>
                    <View style={{ width: '70%' }}>
                        <MyPicker loadLanguage={this.state.lang}
                            loadPickerType={('Monthly')}
                            getPickerValue={value => this.setState({ pregnantMonths: value })} />
                    </View>
                </View>
                <View style={styles.seperatorLine} />
                {/* Infant? Picker */}
                <View style={styles.pickerStyle}>
                    <View style={{ width: '30%' }}>
                        <Translator style={styles.labelText} loadText={('Have an Infant? ')} loadLanguage={lang} />
                    </View>
                    <View style={{ width: '70%' }}>
                        <MyPicker loadLanguage={this.state.lang}
                            loadPickerType={('Monthly')}
                            getPickerValue={value => this.setState({ childAge: value })} />
                    </View>
                </View>
                <View style={styles.seperatorLine} />
                {/* Notifications Picker */}
                <View style={styles.pickerStyle}>
                    <View style={{ width: '30%' }}>
                        <Translator style={styles.labelText} loadText={('Receive Notifications?')} loadLanguage={lang} />
                    </View>
                    <View style={{ width: '70%' }}>
                        <MyPicker loadLanguage={this.state.lang}
                            loadPickerType={('Notification')}
                            getPickerValue={value => this.setState({ frequency: value })} />
                    </View>
                </View>
            </View>
        );
    }

    componentDidMount() { }
    // export values on renderings
    exporterProfile = (profileDetails) => {
        this.props.loadProfile(profileDetails);
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
})