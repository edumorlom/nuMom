import React, { useState } from 'react';
import { View, Image, ScrollView, StyleSheet, TextInput, Text, TouchableHighlight, Alert, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Picker } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Tooltip } from 'react-native-elements';

import Navigation from '../components/NavigationBar';
import Colors from '../constants/Colors';

const Profile = props => {

    const [name, setName] = useState(props.loadProfile['Name']);
    const [middleName, setMiddleName] = useState(props.loadProfile['MiddleName']);
    const [lastName, setLastName] = useState(props.loadProfile['LastName']);
    const [birthdate, setBirthDate] = useState(props.loadProfile['BirthDate']);
    const [email, setEmail] = useState(props.loadProfile['Email']);
    const [password, setPassword] = useState(props.loadProfile['Password']);
    const [passwordConfirm, setPasswordConfirm] = useState(props.loadProfile['Password']);
    const [phoneNumber, setPhoneNumber] = useState(props.loadProfile['PhoneNumber']);
    const [pregnantMonths, setPregnantMonths] = useState(props.loadProfile['PregnantMonths']);
    const [childAge, setChildAge] = useState(props.loadProfile['ChildAge']);
    const [frequency, setFrequency] = useState(props.loadProfile['Frequency']);
    // handles the language selection of the app
    const [language, setLanguage] = useState(props.loadProfile['Language']);

    var currDate = new Date().getFullYear() + '-01-01';

    validateEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            setEmail('WRONG');
            return false;
        }
        else {
            setEmail(text);
        }
    }
    validatePassword = (text) => {
        var length = text.length;
        let reg = /^(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
        if (length < 6 || (reg.test(text) === false)) {
            setPassword('WRONG');
            return false;
        }
        else {
            setPassword(text);
        }
    }

    const locationHelper = (location) => {
        props.onTap(location);
    }
    const saveChange = () => {
        var errors = '';
        var error = false;
        if (email === 'WRONG' || email === '') {
            errors = errors + 'Please Input Valid Email: example@gmail.com\n';
            error = true;
        }
        if (password === 'WRONG' || password === '') {
            errors = errors + 'Please Input Valid Password\n';
            error = true;
        }
        if (passwordConfirm != password) {
            errors = errors + 'Please Input Matching Password\n';
            error = true;
        }
        if (error) {
            Alert.alert('Sign Up Errors', errors,
                [
                    { text: 'OK' },
                ],
                { cancelable: false })
        }
        else {
            props.onSave(name, middleName, lastName, birthdate, email, password, phoneNumber, pregnantMonths, childAge, frequency);
            props.changeLang(language);
        }
    }

    const folderView = () => {
        props.tapFolder();
    }

    return (
        <View>
            <KeyboardAvoidingView
                behavior={'height'}
                keyboardVerticalOffset={-90} >
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <View style={styles.screen}>
                        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Image style={{marginLeft:55}} source={require('../assets/mom-and-baby-icon.png')} />
                            <TouchableOpacity onPress={() => folderView()} >
                                <Image style={{ marginLeft: 20, marginTop: 20 }} source={require('../assets/folder-icon.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.box}>
                            <ScrollView>
                                <View style={styles.labelPosition}>
                                    <Text style={styles.labelText}>First Name </Text>
                                    <TextInput
                                        placeholder={name}
                                        onChangeText={text => setName(text)}
                                        style={styles.textInput}
                                    />
                                </View>
                                <View style={styles.seperatorLine} />
                                <View style={styles.labelPosition}>
                                    <Text style={styles.labelText}>Middle Name </Text>
                                    <TextInput
                                        placeholder={middleName}
                                        onChangeText={text => setMiddleName(text)}
                                        style={styles.textInput}
                                    />
                                </View>
                                <View style={styles.seperatorLine} />
                                <View style={styles.labelPosition}>
                                    <Text style={styles.labelText}>Last Name </Text>
                                    <TextInput
                                        placeholder={lastName}
                                        onChangeText={text => setLastName(text)}
                                        style={styles.textInput}
                                    />
                                </View>
                                <View style={styles.seperatorLine} />
                                <View style={styles.labelPosition}>
                                    <Text style={styles.labelText}>Birth Date </Text>
                                    <DatePicker
                                        style={{ width: '70%' }}
                                        customStyles={{
                                            dateInput: {
                                                marginLeft: 10,
                                                alignItems: 'flex-start',
                                                justifyContent: 'center',
                                                borderColor: 'transparent',
                                            },
                                            btnCancel: {
                                                marginLeft: 50,
                                            },
                                            btnConfirm: {
                                                marginRight: 50,
                                            },
                                            placeholderText: {
                                                fontSize: 15,
                                            }
                                        }}
                                        date={birthdate}
                                        onDateChange={(date) => setBirthDate(date)}
                                        showIcon={false}
                                        mode="date"
                                        placeholder={birthdate}
                                        format="YYYY-MM-DD"
                                        minDate="1940-05-01"
                                        maxDate={currDate}
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                    />
                                </View>
                                <View style={styles.seperatorLine} />
                                <View style={styles.labelPosition}>
                                    <Text style={styles.labelText}>Email </Text>
                                    <TextInput
                                        placeholder={email}
                                        onChangeText={text => validateEmail(text)}
                                        style={styles.textInput}
                                    />
                                </View>
                                <View style={styles.seperatorLine} />
                                <View style={styles.labelPosition}>
                                    <Text style={styles.labelText}>New{"\n"}Password</Text>
                                    <View style={{ width: '5%', marginLeft: -20 }}>
                                        <Tooltip
                                            popover={<Text>Valid Password:{"\n"}-One uppercase letter, {"\n"}-numbers and letters,{"\n"}-and at least 8 characters</Text>}
                                            backgroundColor={Colors.PurpleBackground}
                                            height={150}
                                        >
                                            <Image source={require('../assets/info-icon.png')} />
                                        </Tooltip>
                                    </View>
                                    <TextInput
                                        placeholder={password}
                                        onChangeText={text => validatePassword(text)}
                                        style={styles.textInput}
                                        secureTextEntry={true}
                                    />
                                </View>
                                <View style={styles.seperatorLine} />
                                <View style={styles.labelPosition}>
                                    <Text style={styles.labelText}>Confirm New Password </Text>
                                    <TextInput
                                        placeholder={password}
                                        onChangeText={text => setPasswordConfirm(text)}
                                        style={styles.textInput}
                                        secureTextEntry={true}
                                    />
                                </View>
                                <View style={styles.seperatorLine} />
                                <View style={styles.labelPosition}>
                                    <Text style={styles.labelText}>Phone Number </Text>
                                    <TextInput
                                        placeholder={phoneNumber}
                                        onChangeText={text => setPhoneNumber(text)}
                                        style={styles.textInput}
                                        keyboardType='number-pad'
                                        autoCompleteType='tel'
                                    />
                                </View>
                                <View style={styles.seperatorLine} />
                                <View style={styles.pickerStyle}>
                                    <Text style={styles.labelText}>Pregnant? </Text>
                                    <Picker style={{ width: '70%', paddingRight: 20, height: 80 }}
                                        itemStyle={{ height: 80 }}
                                        selectedValue={pregnantMonths}
                                        onValueChange={text => setPregnantMonths(text)}>
                                        <Picker.Item label='Not Pregnant' value='No' />
                                        <Picker.Item label='One Month' value="one" />
                                        <Picker.Item label='Two Months' value="two" />
                                        <Picker.Item label='Three Months' value="three" />
                                        <Picker.Item label='Four Months' value="four" />
                                        <Picker.Item label='Five Months' value="five" />
                                        <Picker.Item label='Six Months' value="six" />
                                        <Picker.Item label='Seven Months' value="seven" />
                                        <Picker.Item label='Eight Months' value="eight" />
                                        <Picker.Item label='Nine Months' value="nine" />
                                        <Picker.Item label='Ten Months' value="ten" />
                                    </Picker>
                                </View>
                                <View style={styles.seperatorLine} />
                                <View style={styles.pickerStyle}>
                                    <Text style={styles.labelText}>Have an Infant? </Text>
                                    <Picker style={{ width: '70%', paddingRight: 20, height: 80 }} itemStyle={{ height: 80 }} selectedValue={childAge} onValueChange={text => setChildAge(text)}>
                                        <Picker.Item label='No Infant' value='No' />
                                        <Picker.Item label='One Month' value="one" />
                                        <Picker.Item label='Two Months' value="two" />
                                        <Picker.Item label='Three Months' value="three" />
                                        <Picker.Item label='Four Months' value="four" />
                                        <Picker.Item label='Five Months' value="five" />
                                        <Picker.Item label='Six Months' value="six" />
                                        <Picker.Item label='Seven Months' value="seven" />
                                        <Picker.Item label='Eight Months' value="eight" />
                                        <Picker.Item label='Nine Months' value="nine" />
                                        <Picker.Item label='Ten Months' value="ten" />
                                    </Picker>
                                </View>
                                <View style={styles.seperatorLine} />
                                <View style={styles.pickerStyle}>
                                    <Text style={styles.labelText}>Receive Notifications? </Text>
                                    <Picker style={{ width: '70%', paddingRight: 20, height: 80 }} itemStyle={{ height: 80 }} selectedValue={frequency} onValueChange={text => setFrequency(text)}>
                                        <Picker.Item label='No Notifications' value='No' />
                                        <Picker.Item label='Weekly' value="weekly" />
                                        <Picker.Item label='Bi-Weekly' value="biweekly" />
                                        <Picker.Item label='Monthly' value="monthly" />
                                    </Picker>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'stretch', width: '100%' }}>
                                    <TouchableOpacity style={{ width: '30%' }} onPress={() => setLanguage('English')}>
                                        <View style={{ opacity: (language === 'English') ? 1 : 0.2 }}>
                                            <Image style={{ height: 50, width: 70, resizeMode: 'stretch' }} source={require('../assets/english-icon.png')} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: '30%' }} onPress={() => setLanguage('Spanish')}>
                                        <View style={{ opacity: (language === 'Spanish') ? 1 : 0.2 }}>
                                            <Image style={{ height: 50, width: 70, resizeMode: 'stretch' }} source={require('../assets/spanish-icon.png')} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: '30%' }} onPress={() => setLanguage('Creole')}>
                                        <View style={{ opacity: (language === 'Creole') ? 1 : 0.2 }}>
                                            <Image style={{ height: 50, width: 70, resizeMode: 'stretch' }} source={require('../assets/creole-icon.png')} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                        <View>
                            <TouchableHighlight style={styles.button} onPress={() => saveChange()} underlayColor={'rgba(213, 170, 255, 0.8)'} >
                                <Text style={{ fontSize: 18, color: 'black' }}>Save Changes</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <View>
                <Navigation passLocation={(loc) => locationHelper(loc)} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        width: '90%',
        borderColor: 'transparent',
        borderRadius: 10,
        backgroundColor: Colors.boxBackground,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
    },
    button: {
        marginBottom: 100,
        padding: 10,
        backgroundColor: Colors.boxBackground,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textInput: {
        fontSize: 15,
        width: '70%',
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
    pickerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    labelText: {
        fontSize: 15,
        fontWeight: 'bold',
        width: '30%',
    },
    seperatorLine: {
        width: '95%',
        borderBottomColor: Colors.PurpleBackground,
        borderBottomWidth: 1,
    },
})

export default Profile;