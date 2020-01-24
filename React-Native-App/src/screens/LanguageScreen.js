import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text, SafeAreaView, Animated, Button } from 'react-native';
import { ProviderTypes, TranslatorConfiguration } from 'react-native-power-translator';
import Colors from '../constants/Colors';
import Box from '../components/Box';
import Translator from '../components/Translator';


const Language = ({ navigation }) => {

    // handles the language selection of the app, input
    const [language, setLanguage] = useState("en");
    
    global.GLOBAL_LANGUAGE = language; //have access to this from any place in the app

    console.log("Global Language: ", GLOBAL_LANGUAGE);

    console.log("Selected Language: ", language);


    // translator
    TranslatorConfiguration.setConfig(ProviderTypes.Microsoft, 'de6f9f5aaa86420da79a3dc450cd4e6c', language);


    return (
        <View style={styles.screen}>
            <View style={{ width: '90%', alignItems: 'center' }}>
                <Translator style={styles.textTitle} loadText={('Select Language:')} loadLanguage={language} />
            </View>
            <Box>
                <TouchableOpacity style={styles.flagStyle} onPress={() => setLanguage('en')}>
                    <View style={{ opacity: (language === 'en') ? 1 : 0.2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Image style={styles.picture} source={require('../../assets/icons/usa-flag.png')} />
                        <Text style={styles.textWord}>English</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.separatorLine} />
                <TouchableOpacity style={styles.flagStyle} onPress={() => setLanguage('es')}>
                    <View style={{ opacity: (language === 'es') ? 1 : 0.2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Image style={styles.picture} source={require('../../assets/icons/spain-flag.png')} />
                        <Text style={styles.textWord}>Español</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.separatorLine} />
                <TouchableOpacity style={styles.flagStyle} onPress={() => setLanguage('ht')}>
                    <View style={{ opacity: (language === 'ht') ? 1 : 0.2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Image style={styles.picture} source={require('../../assets/icons/creole-flag.png')} />
                        <Text style={styles.textWord}>Kreyòl</Text>
                    </View>
                </TouchableOpacity>
            </Box>
            {/* accept language and exit screen */}
            <View style={{"marginTop": "3%"}}>
                <Button
                    title={"CONTINUE"}
                    onPress={() => navigation.navigate('Welcome', {language: language} )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background
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
    separatorLine: {
        width: '100%',
        borderBottomColor: 'white',
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