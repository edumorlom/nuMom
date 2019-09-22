import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';

import Colors from '../constants/Colors';


const Welcome = props => {

    // handles the language selection of the app
    const [language, setLanguage] = useState("English");
    const languageSetHandler = (lang) => {
        setLanguage(lang);
    }
    if(language === 'English') {
        styles.pictureEnglish.opacity = 1;
        styles.pictureSpanish.opacity = 0.2;
        styles.pictureCreole.opacity = 0.2;
    }
    else if (language === 'Spanish') {
        styles.pictureEnglish.opacity = 0.2;
        styles.pictureSpanish.opacity = 1;
        styles.pictureCreole.opacity = 0.2;
    }
    else {
        styles.pictureEnglish.opacity = 0.2;
        styles.pictureSpanish.opacity = 0.2;
        styles.pictureCreole.opacity = 1;
    }
    const passLanguage = () => {
        props.onTap(language);
    }

    return (
        <View style={styles.screen}>
            <View style={{ width: '80%', alignItems: 'center' }}>
                <Text style={styles.textTitle}>Select Language</Text>
            </View>
            <View style={styles.box}>
                <TouchableOpacity style={styles.flagStyle} onPress={() => languageSetHandler('English')}>
                        <Image style={styles.pictureEnglish} source={require('../assets/english.png')} />
                        <Text style={styles.textWord}>English</Text>
                </TouchableOpacity>
                <View style={styles.seperatorLine} />
                <TouchableOpacity style={styles.flagStyle} onPress={() => languageSetHandler('Spanish')}>
                        <Image style={styles.pictureSpanish} source={require('../assets/spanish.png')} />
                        <Text style={styles.textWord}>Spanish</Text>
                </TouchableOpacity>
                <View style={styles.seperatorLine} />
                <TouchableOpacity style={styles.flagStyle} onPress={() => languageSetHandler('Creole')}>
                        <Image style={styles.pictureCreole} source={require('../assets/creole.png')} />
                        <Text style={styles.textWord}>Creole</Text>
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
    pictureEnglish: {
        height: 80,
        width: 100,
        resizeMode: 'stretch',
    },
    pictureSpanish: {
        height: 80,
        width: 100,
        resizeMode: 'stretch',
    },
    pictureCreole: {
        height: 80,
        width: 100,
        resizeMode: 'stretch',
    },
    flagStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        fontSize: 40,
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