import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, TouchableWithoutFeedback, 
    KeyboardAvoidingView, Keyboard, TouchableOpacity, SafeAreaView} from 'react-native';
import { ProviderTypes, TranslatorConfiguration} from 'react-native-power-translator';
// Constants
import Colors from '../constants/Colors';
// Custom Components
import ImagePick from '../components/ImagePick';
import Box from '../components/Box';
import SignUpForm from '../components/SignUp';
import Translator from '../components/Translator';
import Helpers from '../components/Helpers';
import axios from 'axios';
import firebase from 'firebase';
import { connect } from 'react-redux';
import * as actions from '../actions';


//url for firebase functions 
const ROOT_URL = 'https://us-central1-moms-and-infants-healthy.cloudfunctions.net';


const SignUp = (props) => {
    
    const lan = props.navigation.getParam('language')

    // image default and new one hook
    const [image, setImage] = useState('../assets/mom-and-baby-icon-editable.png');
    let profile = {
        'Name': '',
        'MiddleName': '',
        'LastName': '',
        'BirthDate': '',
        'PhoneNumber': '',
        'PregnantMonths': '',
        'ChildAge': '',
        'notifications': '',
        'Image': '',
        'Language': ''
    };

    // sign up after pressing sign up button 
    const signUpHandler = async () => {
        let errorMessage = "";
        //handle errors with connection
        try {
            console.log(profile['PhoneNumber']);
            console.log(profile['Name']);
            console.log(profile['LastName']);

            if (profile['Name'] === undefined) {
                errorMessage += 'Please enter valid first name\n';
                err = true;
            }
            if (profile['LastName'] === undefined) {
                errorMessage += 'Please enter valid last name\n';
                err = true;
            }

            //creates a user with the entered info
            await axios.post(`${ROOT_URL}/createUsers`, {
                phone: profile['PhoneNumber']
            });

            //request a code to be sent
            await axios.post(`${ROOT_URL}/requestOneTimePassword`, {
                phone: profile['PhoneNumber']
            });

            //go to log in screen
            props.navigation.navigate('Signin', {language: lan})
        } catch (err) {
            console.log(err);
            if (err.response.data.error != null) {
                errorMessage += err.response.data.error
                //TODO find a way to translate the error messages 
                Alert.alert('Sign Up Errors', errorMessage,
                    [
                        { text: 'Go back' }
                    ],
                    {
                        cancelable: false
                    })
            }
            return;
        }

        profile['Image'] = image;
        profile['Language'] = lan;

        // //send all the user data to our database
        firebase.database().ref('users' + profile['PhoneNumber']).set({
            //user data
            fistN: profile['Name'],
            middleN: profile['MiddleName'],
            lastN: profile['LastName'],
            dob: profile['BirthDate'],
            phone: profile['PhoneNumber'],
            pregnant: profile['PregnantMonths'],
            childAge: profile['ChildAge'],
            notifications: profile['notifications'],
            image: profile['Image'],
            language: profile['Language']
        }).then(() => {
            console.log("Data sent to the db");
        }).catch((error) => {
            console.log(error);
        })

        //navigate to login after sign up
        // props.onTapSignUp(profile);

    };

    // Profile Picture setter
    const pictureHandler = (pic) => {
        setImage(pic);
    }

    // Profile Value setter
    const profileHandler = (profileDetails) => {
        profile = profileDetails;
    }

    return (
        <SafeAreaView style={styles.screen}>
            <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }} keyboardVerticalOffset={0}>
                <TouchableWithoutFeedback onPress={ () => {Keyboard.dismiss()} }>
                    <View style={ styles.screen}> 
                    {/* Profile Picture Component */} 
                        <ImagePick passLang={lan} passPicture={image} getPicture={pictureHandler}/> 
                            <Box style={{ height: '60%', width: '88%'}}>
                                <ScrollView >
                                    <SignUpForm loadScreen={('SignUp')} loadLanguage={lan} getProfile={profileHandler} loadProfile={profile}/> 
                                </ScrollView> 
                            </Box> 
                            <View >
                                <TouchableOpacity style={styles.button} onPress={signUpHandler} underlayColor={'rgba(213, 170, 255, 0.8)'}>
                                    <Translator style={styles.text} loadText={('Sign Up')} loadLanguage={lan}/> 
                                </TouchableOpacity> 
                            </View> 
                    </View> 
                </TouchableWithoutFeedback> 
            </KeyboardAvoidingView >
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        padding: 10,
        paddingHorizontal: 40,
        backgroundColor: Colors.buttonColor,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    text: {
        fontSize: 18,
    }
})

export default SignUp;