import React, { useState, useContext } from 'react';
import { View, Image, ScrollView, StyleSheet, Alert, TouchableOpacity, Text,
        TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import Translator from '../components/Translator';
import Colors from '../constants/Colors';
// Custom Components
import ImagePick from '../components/ImagePick';
import Box from '../components/Box';
import SignUpForm from '../components/SignUp';
import Helpers from '../components/Helpers';
import firebase from 'firebase';
import { Context as AuthContext } from '../context/AuthContext';

//FIX DESIGN

const Profile = props => {

    const lang = GLOBAL_LANGUAGE

    console.log("profile screen language: ", lang)

    const { signout } = useContext(AuthContext);

    // handles the language selection of the app
    const [language, setLanguage] = useState(lang);
    // image default and new one hook
    const [image, setImage] = useState('../../assets/mom-and-baby-icon-editable.png');
    // TranslatorConfiguration.setConfig(ProviderTypes.Microsoft, 'de6f9f5aaa86420da79a3dc450cd4e6c', language);
    var fnameError = Helpers('Please Input Valid First Name ', language);
    var lnameError = Helpers('Please Input Valid Last Name ', language);
    var phoneError = Helpers('Please Input Valid Phone Number ', language);

    // hold changes in real time
    let profile = props.loadProfile;
    console.log("profile: ", profile)
    // if (profile['Image'] === '' || profile['Image'] === undefined) {
    //     setImage('../../assets/mom-and-baby-icon-editable.png');
    // }
    // Navigator
    // const locationHelper = (location) => {
    //     props.onTap(location);
    // }
    const saveChange = () => {
        props.changeLang(language);
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
            props.onSave(profile);
        }
    }
    // New image Handler
    const pictureHandler = (pic) => {
        setImage(pic);
    }

    // Profile Value setter   ----- get the info from the db
    const profileHandler = (profileDetails) => {
        // firebase.database().ref('users' + profile['PhoneNumber']).once('value', (data) => {
        //     console.log(data.toJSON())
        //     console.log(profileDetails)
        // }).then(() => {
        //     console.log("Data retrieved from the db");
        // }).catch((error) => {
        //     console.log(error);
        // })

        profile = profileDetails;
    }

    return (
        <KeyboardAvoidingView
            behavior={'padding'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={-120}>
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <View>
                <TouchableOpacity onPress={signout}>
                    <Image style={{ marginLeft: 365 }} source={require('../../assets/icons/sign-out.png')} />
                </TouchableOpacity>
                    <View style={styles.screen}>
                        <View style={{ marginTop: 150, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', }}>
                            {/* User Image View */}
                            <View style={{ alignContent:'center'}}>
                                <ImagePick passLang={language} getPicture={pictureHandler} passPicture={image} />
                            </View>
                            {/* Folder Touchable */}  
                        </View>
                        <Box style={{ height: '60%', width: '80%', marginTop: 0}}>
                            <ScrollView>
                                {/* Change info */}
                                <SignUpForm loadScreen={('Profile')} loadLanguage={language} getProfile={profileHandler} loadProfile={profile} />
                                {/* Language change */}
                                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                    <TouchableOpacity style={{ width: '30%' }} onPress={() => setLanguage('en')}>
                                        <View style={{ opacity: (language === 'en') ? 1 : 0.2 }}>
                                            <Image style={{ height: 40, width: 60, resizeMode: 'stretch' }} source={require('../../assets/icons/usa-flag.png')} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: '30%' }} onPress={() => setLanguage('es')}>
                                        <View style={{ opacity: (language === 'es') ? 1 : 0.2 }}>
                                            <Image style={{ height: 40, width: 60, resizeMode: 'stretch' }} source={require('../../assets/icons/spain-flag.png')} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: '30%' }} onPress={() => setLanguage('ht')}>
                                        <View style={{ opacity: (language === 'ht') ? 1 : 0.2 }}>
                                            <Image style={{ height: 40, width: 60, resizeMode: 'stretch' }} source={require('../../assets/icons/creole-flag.png')} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </Box>
                        <View>
                            <TouchableOpacity style={styles.button} underlayColor={'rgba(213, 170, 255, 0.8)'} >
                                <Translator style={styles.text} loadText={('Save Changes')} loadLanguage={language} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
    );
};

Profile.navigationOptions = ({ navigation }) => {
    return {
        title: 'Personal Account', 
        headerRight:  (
                <View style={{flexDirection: 'row', paddingRight: 7, marginBottom: 7}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Documents')} >
                        <Image style={{ marginLeft: 20 }} source={require('../../assets/icons/documents.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}}>
                        <Image style={{ marginLeft: 20 }} source={require('../../assets/icons/sign-out.png')} />
                    </TouchableOpacity>
                </View>
        ),
        headerStyle: {
            backgroundColor: '#F6ECFF'
        }            
    };
};

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.newBackground
    },
    text: {
        fontSize: 18,
    },
    button: {
        marginTop: 20,
        marginBottom: 180,
        padding: 10,
        paddingHorizontal: 40,
        backgroundColor: Colors.buttonColor,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
})

export default Profile;