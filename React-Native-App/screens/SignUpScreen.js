import React, { useState } from 'react';
import { View, Image, ScrollView, StyleSheet, TextInput, Text, Alert, TouchableHighlight, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Picker, TouchableOpacity, PixelRatio } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Tooltip } from 'react-native-elements';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';

import Colors from '../constants/Colors';
import ImagePick from '../components/ImagePick';

const SignUp = props => {

    // handles translations
    var lang = props.loadLanguage;
    TranslatorConfiguration.setConfig(ProviderTypes.Microsoft, 'de6f9f5aaa86420da79a3dc450cd4e6c', lang);
    // handles tip language
    var tipHandler = '';
    if (lang === 'en') { tipHandler = 'Valid Password:\n-One uppercase letter,\n-numbers and letters,\n-and at least 8 characters' }
    else if (lang === 'es') { tipHandler = 'Contraseña válida:\n-Una letra mayúscula,\n-números y letras,\n-y al menos 8 caracteres' }
    else { tipHandler = 'Valab Modpas:\n-Yon lèt majuskul,\n-numbers ak lèt,\n-ak omwen 8 karaktè' }
    var month = '';
    if (lang === 'en') { month = 'month' }
    else if (lang === 'es') { month = 'mes' }
    else { month = "mwa" }
    var weekly = '';
    if (lang === 'en') { weekly = 'weekly' }
    else if (lang === 'es') { weekly = 'semanal' }
    else { weekly = "chak semèn" }
    var bi_weekly = '';
    if (lang === 'en') { bi_weekly = 'bi-weekly' }
    else if (lang === 'es') { bi_weekly = 'quincenal' }
    else { bi_weekly = "de semèn" }
    var monthly = '';
    if (lang === 'en') { monthly = 'monthly' }
    else if (lang === 'es') { monthly = 'mensual' }
    else { monthly = "chak mwa" }

    const [name, setName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [pregnantMonths, setPregnantMonths] = useState('');
    const [childAge, setChildAge] = useState('');
    const [frequency, setFrequency] = useState('');
    const [image, setImage] = useState('../assets/mom-and-baby-icon-editable.png');

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
            props.onTapSignUp(name, middleName, lastName, birthdate, email, password, phoneNumber, pregnantMonths, childAge, frequency, image);
        }
    }
    const pictureHandler = (pic) => {
        setImage(pic);
    }
    return (
        <KeyboardAvoidingView
            behavior={'padding'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={-15}>
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <View style={styles.screen}>
                    <ImagePick passPicture={image} getPicture={pictureHandler} />
                    <View style={styles.box}>
                        <ScrollView>
                            <View style={styles.labelPosition}>
                                <View style={{ width: '30%' }}>
                                    <PowerTranslator style={styles.labelText} text={"First Name "} />
                                </View>
                                <View style={{ width: '70%' }}>
                                    <TextInput
                                        onChangeText={text => setName(text)}
                                        style={styles.textInput}
                                    />
                                </View>
                            </View>
                            <View style={styles.seperatorLine} />
                            <View style={styles.labelPosition}>
                                <View style={{ width: '30%' }}>
                                    <PowerTranslator style={styles.labelText} text={"Middle Name "} />
                                </View>
                                <View style={{ width: '70%' }}>
                                    <TextInput
                                        onChangeText={text => setMiddleName(text)}
                                        style={styles.textInput}
                                    />
                                </View>
                            </View>
                            <View style={styles.seperatorLine} />
                            <View style={styles.labelPosition}>
                                <View style={{ width: '30%' }}>
                                    <PowerTranslator style={styles.labelText} text={"Last Name "} />
                                </View>
                                <View style={{ width: '70%' }}>
                                    <TextInput
                                        onChangeText={text => setLastName(text)}
                                        style={styles.textInput}
                                    />
                                </View>
                            </View>
                            <View style={styles.seperatorLine} />
                            <View style={styles.labelPosition}>
                                <View style={{ width: '30%' }}>
                                    <PowerTranslator style={styles.labelText} text={"Birth Date"} />
                                </View>
                                <View style={{ width: '70%' }}>
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
                                        placeholder=" "
                                        format="YYYY-MM-DD"
                                        minDate="1940-05-01"
                                        maxDate={currDate}
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                    />
                                </View>
                            </View>
                            <View style={styles.seperatorLine} />
                            <View style={styles.labelPosition}>
                                <View style={{ width: '30%' }}>
                                    <PowerTranslator style={styles.labelText} text={"Email "} />
                                </View>
                                <View style={{ width: '70%' }}>
                                    <TextInput
                                        onChangeText={text => validateEmail(text)}
                                        style={styles.textInput}
                                        autoCompleteType='email'
                                    />
                                </View>
                            </View>
                            <View style={styles.seperatorLine} />
                            <View style={styles.labelPosition}>
                                <View style={{ width: '30%', flexDirection: 'row' }}>
                                    <PowerTranslator style={styles.labelText} text={"Password "} />
                                    <Tooltip
                                        popover={<Text>{tipHandler}</Text>}
                                        backgroundColor={Colors.PurpleBackground}
                                        height={150}>
                                        <Image source={require('../assets/info-icon.png')} />
                                    </Tooltip>
                                </View>
                                <View style={{ width: '70%' }}>
                                    <TextInput
                                        onChangeText={text => validatePassword(text)}
                                        style={styles.textInput}
                                        autoCompleteType='password'
                                        secureTextEntry={true}
                                    />
                                </View>
                            </View>
                            <View style={styles.seperatorLine} />
                            <View style={styles.labelPosition}>
                                <View style={{ width: '30%' }}>
                                    <PowerTranslator style={styles.labelText} text={"Confirm Password "} />
                                </View>
                                <View style={{ width: '70%' }}>
                                    <TextInput
                                        onChangeText={text => setPasswordConfirm(text)}
                                        style={styles.textInput}
                                        secureTextEntry={true}
                                    />
                                </View>
                            </View>
                            <View style={styles.seperatorLine} />
                            <View style={styles.labelPosition}>
                                <View style={{ width: '30%' }}>
                                    <PowerTranslator style={styles.labelText} text={"Phone Number "} />
                                </View>
                                <View style={{ width: '70%' }}>
                                    <TextInput
                                        onChangeText={text => setPhoneNumber(text)}
                                        style={styles.textInput}
                                        keyboardType='number-pad'
                                        autoCompleteType='tel'
                                    />
                                </View>
                            </View>
                            <View style={styles.seperatorLine} />
                            <View style={styles.pickerStyle}>
                                <View style={{ width: '30%' }}>
                                    <PowerTranslator style={styles.labelText} text={"Pregnant? "} />
                                </View>
                                <View style={{ width: '70%' }}>
                                    <Picker style={{ width: '100%', paddingRight: 20, height: 80 }}
                                        itemStyle={{ height: 80 }}
                                        selectedValue={pregnantMonths}
                                        onValueChange={text => setPregnantMonths(text)}>
                                        <Picker.Item label='N/A' value='No' />
                                        <Picker.Item label={'1 ' + month} value="one" />
                                        <Picker.Item label={'2 ' + month} value="two" />
                                        <Picker.Item label={'3 ' + month} value="three" />
                                        <Picker.Item label={'4 ' + month} value="four" />
                                        <Picker.Item label={'5 ' + month} value="five" />
                                        <Picker.Item label={'6 ' + month} value="six" />
                                        <Picker.Item label={'7 ' + month} value="seven" />
                                        <Picker.Item label={'8 ' + month} value="eight" />
                                        <Picker.Item label={'9 ' + month} value="nine" />
                                        <Picker.Item label={'10 ' + month} value="ten" />
                                    </Picker>
                                </View>
                            </View>
                            <View style={styles.seperatorLine} />
                            <View style={styles.pickerStyle}>
                                <View style={{ width: '30%' }}>
                                    <PowerTranslator style={styles.labelText} text={"Have an Infant? "} />
                                </View>
                                <View style={{ width: '70%' }}>
                                    <Picker style={{ width: '100%', paddingRight: 20, height: 80 }} itemStyle={{ height: 80 }} selectedValue={childAge} onValueChange={text => setChildAge(text)}>
                                        <Picker.Item label='N/A' value='No' />
                                        <Picker.Item label={'1 ' + month} value="one" />
                                        <Picker.Item label={'2 ' + month} value="two" />
                                        <Picker.Item label={'3 ' + month} value="three" />
                                        <Picker.Item label={'4 ' + month} value="four" />
                                        <Picker.Item label={'5 ' + month} value="five" />
                                        <Picker.Item label={'6 ' + month} value="six" />
                                        <Picker.Item label={'7 ' + month} value="seven" />
                                        <Picker.Item label={'8 ' + month} value="eight" />
                                        <Picker.Item label={'9 ' + month} value="nine" />
                                        <Picker.Item label={'10 ' + month} value="ten" />
                                    </Picker>
                                </View>
                            </View>
                            <View style={styles.seperatorLine} />
                            <View style={styles.pickerStyle}>
                                <View style={{ width: '30%' }}>
                                    <PowerTranslator style={styles.labelText} text={"Receive Notifications? "} />
                                </View>
                                <View style={{ width: '70%' }}>
                                    <Picker style={{ width: '100%', paddingRight: 20, height: 80 }} itemStyle={{ height: 80 }} selectedValue={frequency} onValueChange={text => setFrequency(text)}>
                                        <Picker.Item label='N/A' value='No' />
                                        <Picker.Item label={weekly} value="weekly" />
                                        <Picker.Item label={bi_weekly} value="biweekly" />
                                        <Picker.Item label={monthly} value="monthly" />
                                    </Picker>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View>
                        <TouchableHighlight style={styles.button} onPress={() => signUpHandler()} underlayColor={'rgba(213, 170, 255, 0.8)'} >
                            <PowerTranslator style={{ fontSize: 18, color: 'black' }} text={"Sign Up"} />
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
    },
    seperatorLine: {
        width: '95%',
        borderBottomColor: Colors.PurpleBackground,
        borderBottomWidth: 1,
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150,
    },
})

export default SignUp;