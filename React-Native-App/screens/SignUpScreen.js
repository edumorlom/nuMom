import React, { useState } from 'react';
import { View, Image, ScrollView, StyleSheet, TextInput, Text, 
    TouchableHighlight, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, 
    Picker, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import axios from 'axios'; //to make network requests
import firebase from 'firebase';
import { View, ScrollView, StyleSheet, Alert, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Text, TouchableOpacity } from 'react-native';
import { ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
// Constants
import Colors from '../constants/Colors';
// Custom Components
import ImagePick from '../components/ImagePick';
import Box from '../components/Box';
import SignUpForm from '../components/SignUp';
import Translator from '../components/Translator';
import Helpers from '../components/Helpers';

const SignUp = props => {

    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [pregnantMonths, setPregnantMonths] = useState('');
    const [childAge, setChildAge] = useState('');
    const [notifications, setNotifications] = useState('');

    const currDate = new Date();

    //url for firebase functions 
    const ROOT_URL = 'https://us-central1-moms-and-infants-healthy.cloudfunctions.net';

    //updating the state of each prop
    const updateFirstName = (firstname) => {
        setFirstName(firstname);
    };

    const updateMiddleName = (middlen) => {
        setMiddleName(middlen);
    };

    const updateLastName = (lastname) => {
        setLastName(lastname);
    };

    const updatePhoneNumber = (phone) => {
        setPhoneNumber(phone);
    };

    const updateBirthDate = (date) => {
        setBirthDate(date);
    };

    const updatePregnancyTerm = (months) => {
        setPregnantMonths(months);
    };

    const updateChildAge = (age) => {
        setChildAge(age);
    };

    const updateNotificationsFreq = (frequency) => {
        setNotifications(frequency);
    };


    //event handler 
    const signUpHandler = async () => {
        let errorMessage = "";
        //handle errors with connection
        try {
            console.log(phoneNumber);
            console.log(firstName);
            console.log(lastName);

            if (firstName === '') {
                errorMessage += 'Please enter valid first name\n';
                err = true;
            }
            if (lastName === '') {
                errorMessage += 'Please enter valid last name\n';
                err = true;
            }
            
            //creates a user with the entered info
            await axios.post(`${ROOT_URL}/createUsers`, { phone: phoneNumber });

            //send all the user data to our database
            firebase.database().ref('users'+phoneNumber).set(
                {
                    //user data
                    fistN: firstName,
                    middleN: middleName,
                    lastN: lastName,
                    dob: birthDate,
                    phone: phoneNumber,
                    pregnant: pregnantMonths,
                    childAge: childAge,
                    notifications: notifications
                }
            ).then(() => {
                console.log("Data sent to the db");
            }).catch((error) => {
                console.log(error);
            })

            //request a code to be sent
            await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: phoneNumber });

            //go to log in screen
            props.onTapSignUp();
        }
        catch (err){
            console.log(err);
            if (err.response.data.error != null){
                errorMessage += err.response.data.error
                Alert.alert('Sign Up Errors', errorMessage,
    // handles translations ----------Andy changes-------------
    let lang = props.loadLanguage;
    TranslatorConfiguration.setConfig(ProviderTypes.Microsoft, 'de6f9f5aaa86420da79a3dc450cd4e6c', lang);
    var fnameError = Helpers('Please Input Valid First Name ', lang);
    var lnameError = Helpers('Please Input Valid Last Name ', lang);
    var phoneError = Helpers('Please Input Valid Phone Number ', lang);

    // image default and new one hook
    const [image, setImage] = useState('../assets/mom-and-baby-icon-editable.png');
    let profile = {
        'Name': '', "MiddleName": '', "LastName": '',
        "BirthDate": '', "PhoneNumber": '', "PregnantMonths": '',
        "ChildAge": '', "Frequency": '', 'Image' : ''
    };

    // sign up after pressing sign up button 
    const signUpHandler = () => {
        var errors = '';
        var error = false;

        if (profile['Name'] === '' || profile['Name'] === null) {
            errors = errors + fnameError + '\n';
            error = true;
        }
        if (profile['LastName'] === '' || profile['LastName'] === null) {
            errors = errors + lnameError + '\n';
            error = true;
        }
        if (profile['PhoneNumber'] === '' || profile['PhoneNumber'] === null) {
            errors = errors + phoneError + '\n';
            error = true;
        }
        if (error) {
            Alert.alert('', errors,  // ----------Andy changes-------------
                [
                    { text: 'Go Back' },
                ],
                { cancelable: false });
            }
        }
    };


    //----------Andy changes-------------
        else {
            profile['Image'] = image;
            props.onTapSignUp(profile);
        }
    }
    // Profile Picture setter
    const pictureHandler = (pic) => {
        setImage(pic);
    }
    // Profile Value setter
    const profileHandler = (profileDetails) => {
        profile = profileDetails;
    }
    //----------Andy changes-------------
    return (
        <KeyboardAvoidingView
            behavior={'padding'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={0}>
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <View style={styles.screen}>
                    <View>
                        <Image source={require('../assets/images/mom-and-baby-icon.png')} />
                    </View>
                    <View style={styles.box}>
                        <ScrollView>
                            <View style={styles.labelPosition}>
                                <Text style={styles.labelText}>First Name </Text>
                                <TextInput
                                    placeholder={'First Name'}
                                    onChangeText={updateFirstName}
                                    style={styles.textInput}
                                    value={firstName}
                                />
                            </View>
                            <View style={styles.seperatorLine} />
                            <View style={styles.labelPosition}>
                                <Text style={styles.labelText}>Middle Name </Text>
                                <TextInput
                                    placeholder={'Middle Name'}
                                    onChangeText={updateMiddleName}
                                    style={styles.textInput}
                                />
                            </View>
                            <View style={styles.seperatorLine} />
                            <View style={styles.labelPosition}>
                                <Text style={styles.labelText}>Last Name </Text>
                                <TextInput
                                    placeholder={'Last Name'}
                                    onChangeText={updateLastName}
                                    style={styles.textInput}
                                    value={lastName}
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
                                    date={birthDate}
                                    onDateChange={updateBirthDate}
                                    showIcon={false}
                                    mode="date"
                                    placeholder="Select Date"
                                    format="MM-DD-YYYY"
                                    minDate="05-01-1940"
                                    maxDate={currDate}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                />
                            </View>
                            <View style={styles.seperatorLine} />
                            <View style={styles.labelPosition}>
                                <Text style={styles.labelText}>Phone Number </Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={"888-888-8888"}
                                    onChangeText={updatePhoneNumber}
                                    value= {phoneNumber}
                                    keyboardType='number-pad'
                                    autoCompleteType='tel' //??????
                                />
                            </View>
                            <View style={styles.seperatorLine} />
                            <View style={styles.pickerStyle}>
                                <Text style={styles.labelText}>Pregnant? </Text>
                                <Picker style={{ width: '70%', paddingRight: 20, height: 80 }}
                                    itemStyle={{ height: 80 }}
                                    selectedValue={pregnantMonths}
                                    onValueChange={updatePregnancyTerm}>
                                    <Picker.Item label='Not Pregnant' value="No" />
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
                                <Picker style={{ width: '70%', paddingRight: 20, height: 80 }} itemStyle={{ height: 80 }} selectedValue={childAge} onValueChange={updateChildAge}>
                                    <Picker.Item label='No Infant' value="No"/>
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
                                <Picker style={{ width: '70%', paddingRight: 20, height: 80 }} itemStyle={{ height: 80 }} selectedValue={notifications} onValueChange={updateNotificationsFreq}>
                                    <Picker.Item label='No Notifications' value="No" />
                                    <Picker.Item label='Weekly' value="weekly" />
                                    <Picker.Item label='Bi-Weekly' value="biweekly" />
                                    <Picker.Item label='Monthly' value="monthly" />
                                </Picker>
                            </View>
                    {/* ----------Andy changes------------- */}
                    {/* Profile Picture Component */}
                    <ImagePick passLang={lang} passPicture={image} getPicture={pictureHandler} />
                    <Box style={{ height: '60%', width: '90%' }}>
                        <ScrollView>
                            <SignUpForm loadScreen={('SignUp')} loadLanguage={lang} getProfile={profileHandler} loadProfile={profile} />
                            {/* ----------Andy changes------------- */}
                        </ScrollView>
                    </Box>
                    <View>
                        <TouchableHighlight style={styles.button} onPress={signUpHandler} underlayColor={'rgba(213, 170, 255, 0.8)'} >
                            <Text style={{ fontSize: 18, color: 'black' }}>Sign Up</Text>
                        </TouchableHighlight>
                        {/* ----------Andy changes------------- */}
                        <TouchableOpacity style={styles.button} onPress={() => signUpHandler()} underlayColor={'rgba(213, 170, 255, 0.8)'} >
                            <Translator style={styles.text} loadText={('Sign Up')} loadLanguage={lang} />
                        </TouchableOpacity>
                        {/* ----------Andy changes------------- */}
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
    labelText: {
        fontSize: 15,
        fontWeight: 'bold',
        width: '30%',
    },
    seperatorLine: {
        width: '95%',
        borderBottomColor: Colors.separatorLine,
        borderBottomWidth: 1,
    },
    {/* ----------Andy changes------------- */}    
    text: {
        fontSize: 18,
    }
    {/* ----------Andy changes------------- */}
})

export default SignUp;