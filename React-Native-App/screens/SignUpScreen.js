import React, { useState } from 'react';
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

    // handles translations
    let lang = props.loadLanguage;
    TranslatorConfiguration.setConfig(ProviderTypes.Microsoft, 'de6f9f5aaa86420da79a3dc450cd4e6c', lang);
    var fnameError = Helpers('Please Input Valid First Name ', lang);
    var lnameError = Helpers('Please Input Valid Last Name ', lang);
    var phoneError = Helpers('Please Input Valid Phone Number ', lang);

    // image default and new one hook
    const [image, setImage] = useState('../assets/mom-and-baby-icon-editable.png');
    let profile = {};

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
            Alert.alert('', errors,
                [
                    { text: 'OK' },
                ],
                { cancelable: false })
        }
        else {
            profile['Image'] = image;
            console.log(profile);
            // props.onTapSignUp(profile);
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
    return (
        <KeyboardAvoidingView
            behavior={'padding'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={-15}>
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <View style={styles.screen}>
                    {/* Profile Picture Component */}
                    <ImagePick passLang={lang} passPicture={image} getPicture={pictureHandler} />
                    <Box style={{ height: '60%', width: '90%' }}>
                        <ScrollView>
                            <SignUpForm loadScreen={('SignUp')} loadLanguage={lang} loadProfile={profileHandler} />
                        </ScrollView>
                    </Box>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={() => signUpHandler()} underlayColor={'rgba(213, 170, 255, 0.8)'} >
                            <Translator style={styles.text} loadText={('Sign Up')} loadLanguage={lang} />
                        </TouchableOpacity>
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
    text: {
        fontSize: 18,
    }
})

export default SignUp;