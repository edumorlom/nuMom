import React, { useState } from 'react';
import { View, Image, ScrollView, StyleSheet, TextInput, Text, TouchableHighlight, Alert, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Picker } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Tooltip } from 'react-native-elements';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
import ImagePick from '../components/ImagePick';

import Navigation from '../components/NavigationBar';
import Colors from '../constants/Colors';

const Profile = props => {

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
    const [image, setImage] = useState(props.loadProfile['Image']);
    if (image === '') {
        setImage('../assets/mom-and-baby-icon-editable.png');
    }
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
            props.onSave(name, middleName, lastName, birthdate, email, password, phoneNumber, pregnantMonths, childAge, frequency, image);
            props.changeLang(language);
        }
    }
    const pictureHandler = (pic) => {
        setImage(pic);
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
                            <View style={{ marginLeft: 55 }}>
                                <ImagePick passPicture={image} getPicture={pictureHandler} />
                            </View>
                            <TouchableOpacity onPress={() => folderView()} >
                                <Image style={{ marginLeft: 20, marginTop: 20 }} source={require('../assets/folder-icon.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.box}>
                            <ScrollView>
                                <View style={styles.labelPosition}>
                                    <View style={{ width: '30%' }}>
                                        <PowerTranslator style={styles.labelText} text={"First Name "} />
                                    </View>
                                    <View style={{ width: '70%' }}>
                                        <TextInput
                                            placeholder={name}
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
                                            placeholder={middleName}
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
                                            placeholder={lastName}
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
                                            placeholder={birthdate}
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
                                            placeholder={email}
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
                                            placeholder={phoneNumber}
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
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'stretch', width: '100%' }}>
                                    <TouchableOpacity style={{ width: '30%' }} onPress={() => setLanguage('en')}>
                                        <View style={{ opacity: (language === 'en') ? 1 : 0.2 }}>
                                            <Image style={{ height: 50, width: 70, resizeMode: 'stretch' }} source={require('../assets/english-icon.png')} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: '30%' }} onPress={() => setLanguage('es')}>
                                        <View style={{ opacity: (language === 'es') ? 1 : 0.2 }}>
                                            <Image style={{ height: 50, width: 70, resizeMode: 'stretch' }} source={require('../assets/spanish-icon.png')} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: '30%' }} onPress={() => setLanguage('ht')}>
                                        <View style={{ opacity: (language === 'ht') ? 1 : 0.2 }}>
                                            <Image style={{ height: 50, width: 70, resizeMode: 'stretch' }} source={require('../assets/creole-icon.png')} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                        <View>
                            <TouchableHighlight style={styles.button} onPress={() => saveChange()} underlayColor={'rgba(213, 170, 255, 0.8)'} >
                                <PowerTranslator style={{ fontSize: 18, color: 'black' }} text={"Save Changes"} />
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
})

export default Profile;