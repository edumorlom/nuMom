import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, 
    Keyboard, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import axios from 'axios';
import Colors from '../constants/Colors';
import firebase from 'firebase';


const SignIn = props => {

    const [phoneNumber, setphoneNumber] = useState('');
    const [code, setCode] = useState('');

     //url for functions 
     const ROOT_URL = 'https://us-central1-moms-and-infants-healthy.cloudfunctions.net';

    const updatePhoneNumber = (phone) => {
        setphoneNumber(phone);
    }

    const updateCode = (passCode) => {
        setCode(passCode);
    }

    // go to user sign up page
    const signUpHandler = () => {
        props.onTapNewUser();
    }

    const signInHandler = async () => {
        
        try {
            let { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, { phone: phoneNumber, code: code });
            
            console.log(data.token);

            //authenticates into firebase
            firebase.auth().signInWithCustomToken(data.token);

            //go to the landing page
            props.onTapSignIn();
        } catch(error) {
            console.log(error);
        }
        
    }
    

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View style={styles.screen}>

                <Image
                    source={require('../assets/images/mom-and-baby-icon.png')}
                    style={styles.profileIcon} 
                />

                <View style={styles.box}>
                    <View style={{ flexDirection: 'row' }}>
                        <Input
                            style={styles.textInput}
                            placeholder='888-888-8888'
                            onChangeText={updatePhoneNumber}
                            value={phoneNumber}
                            autoCompleteType={'tel'} //where is this???
                            keyboardType='number-pad'
                            leftIcon={
                                <Icon style={styles.iconStyle}
                                  name='mobile'
                                  size={24}
                                  color='lightgrey'
                                />}
                            inputContainerStyle = 'none'
                            containerStyle = 'none'
                        />
                    </View>
                 
                    <View style={{ flexDirection: 'row' }}>
                        <Input
                            style={styles.textInput}
                            placeholder='code'
                            onChangeText={updateCode}
                            value={code}
                            secureTextEntry={true}
                            keyboardType='number-pad'
                            leftIcon={
                                <Icon style={styles.iconStyle}
                                  name='lock'
                                  size={24}
                                  color='lightgrey'
                                />}
                        />
                    </View>
                </View>

                <TouchableHighlight
                    style={styles.signInButton}
                    onPress={() => signInHandler()}
                    underlayColor={Colors.hoverColor} >
                    <Text style={{ fontSize: 18, color: 'black' }}>Sign In!</Text>
                </TouchableHighlight>

                <View style={styles.seperator}>
                    <TouchableOpacity style={{ opacity: 0.5 }} onPress={() => signUpHandler()}>
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
        marginTop: '40%'
    },
    signInButton: {
        marginTop: 100,
        padding: 10,
        backgroundColor: Colors.buttonColor,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    }, 
    seperator: {
        width: '80%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        bottom: -50
    },
    iconStyle: {
        paddingRight: 18
    }
});

export default SignIn;