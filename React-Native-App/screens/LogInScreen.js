import React, { useState } from 'react';
import { View, Alert, Text, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Image, StyleSheet, TextInput } from 'react-native';

import Colors from '../constants/Colors';

const LogIn = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // checks database for correct log in credentials
    const inputButtonHandler = () => {
        if (email === '') {
            if (password === '') {
                props.onTapSignIn(email, password);
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
        props.onTapNewUser();
    }
    //  go to forgot password
    const forgotPassHandler = () => {
        console.log('pressed forgot password');
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
                            placeholder='e-mail address'
                            onChangeText={text => setEmail(text)}
                            style={styles.textInput}
                            autoCompleteType={'email'}
                        />
                    </View>
                    <View style={styles.seperatorLine} />
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ marginRight: 10 }} source={require('../assets/lock.png')} />
                        <TextInput
                            placeholder='password'
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
                    <Text style={{ fontSize: 18, color: 'black' }}>Sign In!</Text>
                </TouchableHighlight>

                <View style={styles.seperator}>

                    <TouchableOpacity style={{ opacity: 0.5 }} onPress={() => forgotPassHandler()}>
                        <Text>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ opacity: 0.5 }} onPress={() => signupHandler()}>
                        <Text>New mom? Sign Up!</Text>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        bottom: -50
    }
});

export default LogIn;