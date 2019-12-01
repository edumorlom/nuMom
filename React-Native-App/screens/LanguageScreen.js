import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text, SafeAreaView, Animated } from 'react-native';
import { ProviderTypes, TranslatorConfiguration } from 'react-native-power-translator';
import Colors from '../constants/Colors';
import Box from '../components/Box';
import Translator from '../components/Translator';


const Language = ({ navigation }) => {

    // handles the language selection of the app, input
    const [language, setLanguage] = useState("en");
    global.GlobalLanguage = language;

    const languageSetHandler = (lang) => {
        setLanguage(lang);
    }

    // translator
    TranslatorConfiguration.setConfig(ProviderTypes.Microsoft, 'de6f9f5aaa86420da79a3dc450cd4e6c', language);

    //Make an animation to present the App and then show the language section
    // <View>
    //     <Image style={{width: 400, height: 400, marginRight: 20, alignItems: 'center'}} source={require('../assets/images/logo111.png')} />
    // </View>


    return (
        <View style={styles.screen}>
            <View style={{ width: '90%', alignItems: 'center' }}>
                <Translator style={styles.textTitle} loadText={('Please select your prefered language to continue')} loadLanguage={language} />
            </View>
            <Box>
                <TouchableOpacity style={styles.flagStyle} onPress={() => languageSetHandler('en')}>
                    <View style={{ opacity: (language === 'en') ? 1 : 0.2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Image style={styles.picture} source={require('../assets/icons/usa-flag.png')} />
                        <Text style={styles.textWord}>English</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.seperatorLine} />
                <TouchableOpacity style={styles.flagStyle} onPress={() => languageSetHandler('es')}>
                    <View style={{ opacity: (language === 'es') ? 1 : 0.2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Image style={styles.picture} source={require('../assets/icons/spain-flag.png')} />
                        <Text style={styles.textWord}>Español</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.seperatorLine} />
                <TouchableOpacity style={styles.flagStyle} onPress={() => languageSetHandler('ht')}>
                    <View style={{ opacity: (language === 'ht') ? 1 : 0.2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Image style={styles.picture} source={require('../assets/icons/creole-flag.png')} />
                        <Text style={styles.textWord}>Kreyòl</Text>
                    </View>
                </TouchableOpacity>
            </Box>
            {/* accept language and exit screen */}
            <TouchableOpacity 
                style={styles.buttonStyle} 
                onPress={() => navigation.navigate('Welcome', {language: language} )}>
                <Image
                    source={require('../assets/icons/check-mark.png')}
                    style={styles.check}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.newBackground
    },
    picture: {
        height: 80,
        width: 100,
        resizeMode: 'stretch',
    },
    flagStyle: {
        height: "30%",
        width: "100%",
        paddingTop: 10,
        paddingBottom: 0,
    },
    textWord: {
        color: Colors.fontColor,
        fontSize: 25,
    },
    textTitle: {
        fontSize: 30,
        color: Colors.fontColor,
        textAlign: 'center',
        paddingBottom: 20
    },
    seperatorLine: {
        width: '100%',
        borderBottomColor: Colors.separatorLine,
        borderBottomWidth: 1,
    },
    buttonStyle: {
        height: 50,
        width: 50,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    check: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
        opacity: 1
    },
});

export default Language;