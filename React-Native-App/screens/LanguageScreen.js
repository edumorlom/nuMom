import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';

import Colors from '../constants/Colors';
import Box from '../components/Box';
import Translator from '../components/Translator';

//Make an animation to present the App and then show the language section


const Language = ({ navigation }) => {

    // handles the language selection of the app, input
    const [language, setLanguage] = useState("en");

    const languageSetHandler = (lang) => {
        setLanguage(lang);
    }

    // pass language to App
    const passLanguage = () => {
        props.navigation.navigate('Welcome', {language: language})
        // props.onTap(language);
    }
    // translator
    TranslatorConfiguration.setConfig(ProviderTypes.Microsoft, 'de6f9f5aaa86420da79a3dc450cd4e6c', language);
    return (
        <View style={styles.screen}>
            <View style={{ width: '80%', alignItems: 'center' }}>
                <Translator style={styles.textTitle} loadText={('Select Language')} loadLanguage={language} />
            </View>
            <Box>
                <TouchableOpacity style={styles.flagStyle} onPress={() => languageSetHandler('en')}>
                    <View style={{ opacity: (language === 'en') ? 1 : 0.2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Image style={styles.picture} source={require('../assets/icons/english-icon.png')} />
                        <Text style={styles.textWord}>English</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.seperatorLine} />
                <TouchableOpacity style={styles.flagStyle} onPress={() => languageSetHandler('es')}>
                    <View style={{ opacity: (language === 'es') ? 1 : 0.2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Image style={styles.picture} source={require('../assets/icons/spanish-icon.png')} />
                        <Text style={styles.textWord}>Español</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.seperatorLine} />
                <TouchableOpacity style={styles.flagStyle} onPress={() => languageSetHandler('ht')}>
                    <View style={{ opacity: (language === 'ht') ? 1 : 0.2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Image style={styles.picture} source={require('../assets/icons/creole-icon.png')} />
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
        margin: 10,
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
        fontSize: 30,
    },
    textTitle: {
        fontSize: 35,
        color: Colors.fontColor,
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