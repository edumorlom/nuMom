import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import DatePicker from 'react-native-datepicker';
import MyPicker from '../components/MyPicker';
import Colors from '../constants/Colors';
import Translator from '../components/Translator';

export default class SignUpForm extends React.Component {



    // profile values that are gonna be dynamically changing
    state = {
    //     name: this.props.loadProfile['name'],
    //     middleName: this.props.loadProfile['middleName'],
    //     lastName: this.props.loadProfile['lastName'],
    //     birthdate: this.props.loadProfile['birthdate'],
    //     phoneNumber: this.props.loadProfile['phoneNumber'],
    //     pregnantMonths: this.props.loadProfile['pregnantMonths'],
    //     childAge: this.props.loadProfile['childAge'],
    //     notifications: this.props.loadProfile['notifications'],
        
        //what is this???
        lang: this.props.loadLanguage,
        screen: this.props.loadScreen,
    }

    render() {
        // get date
        let currDate = new Date();
        // organize array for changes/decisions in real time
        // let profileDetails = {
        //     'Name': this.state.name, 'MiddleName': this.state.middleName, 'LastName': this.state.lastName,
        //     'BirthDate': this.state.birthdate, 'PhoneNumber': this.state.phoneNumber, 'PregnantMonths': this.state.pregnantMonths,
        //     'ChildAge': this.state.childAge, 'Notifications': this.state.notifications
        // };
        // this.exporterProfile(profileDetails);
        return (
            <View>
                {/* First Name */}
                <View style={styles.labelPosition}>
                    <View style={styles.labelWidth}>
                        <Translator style={styles.labelText} loadText={('First Name')} loadLanguage={this.state.lang} />
                    </View>
                    <View style={styles.inputWidth}>
                        <TextInput
                            placeholder='first name'
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
                            placeholder='middle name'
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
                            placeholder='last name'
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
                        {/* Handles a calendar for birthdate */}
                        <DatePicker
                            style={styles.inputWidth}
                            customStyles={{
                                dateInput: { marginLeft: 10, alignItems: 'flex-start', justifyContent: 'center', borderColor: 'transparent', },
                                btnCancel: { marginLeft: 50, }, btnConfirm: { marginRight: 50, }, placeholderText: { fontSize: 15, }
                            }}
                            date={this.state.birthdate}
                            onDateChange={date => this.setState({ birthdate: date })}
                            showIcon={false} mode="date"
                            placeholder='1940-05-01' format="YYYY-MM-DD"
                            minDate="1940-05-01" maxDate={currDate}
                            confirmBtnText="Confirm" cancelBtnText="Cancel"
                        />
                    </View>
                </View>
                <View style={styles.seperatorLine} />
                {/* Phone Number */}
                <View style={styles.labelPosition}>
                    <View style={styles.labelWidth}>
                        <Translator style={styles.labelText} loadText={('Phone Number')} loadLanguage={this.state.lang} />
                    </View>
                    <View style={styles.inputWidth}>
                        <TextInput
                            placeholder='888-888-8888'
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
                {/* Notificationss Picker */}
                <View style={styles.pickerStyle}>
                    <View style={styles.labelWidth}>
                        <Translator style={styles.labelText} loadText={('Notifications?')} loadLanguage={this.state.lang} />
                    </View>
                    <View style={styles.inputWidth}>
                        <MyPicker loadLanguage={this.state.lang}
                            loadPickerType={('Notifications')}
                            getPickerValue={value => this.setState({ notifications: value })} 
                            loadValue={this.state.notifications} />
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
        marginRight: 70
    },
    labelText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.fontColor,
    },
    pickerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    seperatorLine: {
        width: '95%',
        borderBottomColor: Colors.separatorLine,
        borderBottomWidth: 1,
    },
    labelWidth: {
        width: '30%'
    },
    inputWidth: {
        width: '70%',
        // marginRight: 20
    }
})