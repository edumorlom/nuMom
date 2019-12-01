import React, { useState } from 'react';
import { View, Alert, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Image, StyleSheet, TextInput } from 'react-native';
import { ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';

import Colors from '../constants/Colors';
import Translator from '../components/Translator';
import Helpers from '../components/Helpers';

const LogIn = props => {

    // translates placeholders
    let lang = props.loadLanguage;
    TranslatorConfiguration.setConfig(ProviderTypes.Microsoft, 'de6f9f5aaa86420da79a3dc450cd4e6c', lang);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // checks database for correct log in credentials, once only
    const inputButtonHandler = () => {
        if (email === '') {
            if (password === '') {
                // props.onTapSignIn(email, password);
            }
            else {
                Alert.alert('Wrong password');
            }
        }
        else {
            Alert.alert('Wrong email');
        }
    }
    // go to user sign up page
    const signupHandler = () => {
        // props.onTapNewUser();
    }
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View style={styles.screen}>
                <Image
                    source={require('../assets/mom-and-baby-icon.png')}
                    style={styles.profileIcon} />
                <View style={styles.box}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ marginRight: 10 }} source={require('../assets/email.png')} />
                        <TextInput
                            placeholder={Helpers('Email',lang)}
                            onChangeText={text => setEmail(text)}
                            style={styles.textInput}
                            autoCompleteType={'email'}
                        />
                    </View>
                    <View style={styles.seperatorLine} />
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ marginRight: 10 }} source={require('../assets/lock.png')} />
                        <TextInput
                            placeholder={Helpers('Password',lang)}
                            onChangeText={text => setPassword(text)}
                            style={styles.textInput}
                            secureTextEntry={true}
                        />
                    </View>
                </View>
                <TouchableHighlight
                    style={styles.signInButton}
                    onPress={() => inputButtonHandler()}
                    underlayColor={'rgba(213, 170, 255, 0.8)'} >
                    <Translator style={{ fontSize: 18, color: 'black' }} loadText={('Sign In!')} loadLanguage={lang} />
                </TouchableHighlight>
                <View style={styles.seperator}>
                    <TouchableOpacity style={{ opacity: 0.5 }} onPress={() => signupHandler()}>
                        <Translator style={{ fontSize: 12 }} loadText={('New mom? Sign Up!')} loadLanguage={lang} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginBottom: 200,
    },
    box: {
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 10,
        backgroundColor: Colors.boxBackground,
        margin: 10,
        padding: 10,
        width: '80%',
        height: '20%'
    },
    textInput: {
        fontSize: 20,
        width: '80%',
    },
    profileIcon: {
        marginBottom: 40,
    },
    signInButton: {
        marginTop: 50,
        padding: 10,
        backgroundColor: Colors.boxBackground,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    seperatorLine: {
        width: '100%',
        borderBottomColor: Colors.PurpleBackground,
        borderBottomWidth: 1,
    },
    seperator: {
        width: '80%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        bottom: -50
    }
});

export default LogIn;