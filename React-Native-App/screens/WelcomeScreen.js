import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';

import Colors from '../constants/Colors';

const Welcome = props => {

    // handles the language selection of the app
    const [language, setLanguage] = useState("en");
    const languageSetHandler = (lang) => {
        setLanguage(lang);
    }
    const passLanguage = () => {
        props.onTap(language);
    }
    TranslatorConfiguration.setConfig(ProviderTypes.Microsoft,'de6f9f5aaa86420da79a3dc450cd4e6c', language);
    return (
        <View style={styles.screen}>
            <View style={{ width: '80%', alignItems: 'center' }}>
            <PowerTranslator 
                style={styles.textTitle} text={"Select Language"} />
            </View>
            <View style={styles.box}>
                <TouchableOpacity style={styles.flagStyle} onPress={() => languageSetHandler('en')}>
                    <View style={{ opacity: (language === 'en') ? 1 : 0.2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Image style={styles.picture} source={require('../assets/english-icon.png')} />
                        <Text style={styles.textWord}>English</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.seperatorLine} />
                <TouchableOpacity style={styles.flagStyle} onPress={() => languageSetHandler('es')}>
                    <View style={{ opacity: (language === 'es') ? 1 : 0.2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Image style={styles.picture} source={require('../assets/spanish-icon.png')} />
                        <Text style={styles.textWord}>Español</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.seperatorLine} />
                <TouchableOpacity style={styles.flagStyle} onPress={() => languageSetHandler('ht')}>
                    <View style={{ opacity: (language === 'ht') ? 1 : 0.2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Image style={styles.picture} source={require('../assets/creole-icon.png')} />
                        <Text style={styles.textWord}>Kreyòl</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => passLanguage()}>
                <Image
                    source={require('../assets/check-mark.png')}
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
    box: {
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 30,
        backgroundColor: Colors.pinkSoft,
        margin: 10,
        padding: 10,
        width: '80%',
        height: '50%',
    },
    picture: {
        height: 80,
        width: 100,
        resizeMode: 'stretch',
    },
    flagStyle: {
        height: "30%",
        width: "100%",
        margin: 10,
        padding: 20,
    },
    textWord: {
        color: Colors.yellowPastel,
        fontSize: 30,
    },
    textTitle: {
        fontSize: 35,
        color: Colors.yellowPastel,
    },
    seperatorLine: {
        width: '100%',
        borderBottomColor: Colors.yellowPastel,
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

export default Welcome;