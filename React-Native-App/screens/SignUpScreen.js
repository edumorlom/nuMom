import React, { useState } from 'react';
import { View, Image, ScrollView, StyleSheet, TextInput, Text, Alert, Platform, TouchableHighlight, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Switch, Picker, Input } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Tooltip } from 'react-native-elements';

import Colors from '../constants/Colors';

const SignUp = props => {

    const [name, setName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [pregnantMonths, setPregnantMonths] = useState('');
    const [child, setChild] = useState(false);
    const [childAge, setChildAge] = useState('');
    const [textNotification, setTextNotification] = useState(false);
    const [frequency, setFrequency] = useState('');

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

    const signUpHandler = () => {
        var errors = '';
        var error = false;
        if (name === '') {
            errors = errors + 'Please Input Valid First Name\n';
            error = true;
        }
        if (lastName === '') {
            errors = errors + 'Please Input Valid Last Name\n';
            error = true;
        }
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
        if (phoneNumber === '') {
            errors = errors + 'Please Input Valid Phone Number\n';
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
            props.onTapSignUp(name, middleName, lastName, birthdate, email, password, phoneNumber, pregnantMonths, child, childAge, textNotification, frequency);
        }
    }
    return (
        <KeyboardAvoidingView
            behavior={'padding'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={-15}>
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <View style={styles.screen}>
                    <View>
                        <Image source={require('../assets/mom-and-baby-icon.png')} />
                    </View>
                    <View style={styles.box}>
                        <ScrollView>
                            <View style={styles.labelPosition}>
                                <Text style={styles.labelText}>First Name </Text>
                                <TextInput
                                    placeholder={'First Name'}
                                    onChangeText={text => setName(text)}
                                    style={styles.textInput}
                                />
                            </View>
                            <View style={styles.seperatorLine} />
                            <View style={styles.labelPosition}>
                                <Text style={styles.labelText}>Middle Name </Text>
                                <TextInput
                                    placeholder={'Middle Name'}
                                    onChangeText={text => setMiddleName(text)}
                                    style={styles.textInput}
                                />
                            </View>
                            <View style={styles.seperatorLine} />
                            <View style={styles.labelPosition}>
                                <Text style={styles.labelText}>Last Name </Text>
                                <TextInput
                                    placeholder={'Last Name'}
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
                                    placeholder="Select Date"
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
                                    placeholder={'Email'}
                                    onChangeText={text => validateEmail(text)}
                                    style={styles.textInput}
                                    autoCompleteType='email'
                                />
                            </View>
                            <View style={styles.seperatorLine} />
                            <View style={styles.labelPosition}>
                                <Text style={styles.labelText}>Password</Text>
                                <View style={{ width: '5%', marginLeft: -20 }}>
                                    <Tooltip
                                        popover={<Text>Valid Password:{"\n"}-One uppercase letter, {"\n"}-numbers and letters,{"\n"}-and at least 7 characters</Text>}
                                        backgroundColor={Colors.PurpleBackground}
                                        height={150}
                                    >
                                        <Image source={require('../assets/info-icon.png')} />
                                    </Tooltip>
                                </View>
                                <TextInput
                                    placeholder={'Password'}
                                    onChangeText={text => validatePassword(text)}
                                    style={styles.textInput}
                                    autoCompleteType='password'
                                    secureTextEntry={true}
                                />
                            </View>
                            <View style={styles.seperatorLine} />
                            <View style={styles.labelPosition}>
                                <Text style={styles.labelText}>Confirm Password </Text>
                                <TextInput
                                    placeholder={'Password'}
                                    onChangeText={text => setPasswordConfirm(text)}
                                    style={styles.textInput}
                                    secureTextEntry={true}
                                />
                            </View>
                            <View style={styles.seperatorLine} />
                            <View style={styles.labelPosition}>
                                <Text style={styles.labelText}>Phone Number </Text>
                                <TextInput
                                    placeholder={'Phone Number'}
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
                        </ScrollView>
                    </View>
                    <View>
                        <TouchableHighlight style={styles.button} onPress={() => signUpHandler()} underlayColor={'rgba(213, 170, 255, 0.8)'} >
                            <Text style={{ fontSize: 18, color: 'black' }}>Sign Up</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        height: '60%',
        width: '90%',
        borderColor: 'transparent',
        borderRadius: 10,
        backgroundColor: Colors.boxBackground,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
    },
    button: {
        marginBottom: 20,
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
    RNP: {
        borderColor: 'black',
        width: 100,
        height: 100,
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

export default SignUp;