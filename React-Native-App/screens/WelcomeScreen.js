import React, { useState } from 'react';
import { View, TouchableOpacity, ImageBackground, Text, Image, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const Welcome = props => {

    // handles the language selection of the app
    const [language, setLanguage] = useState("English");
    const languageSetHandler = (lang) => {
        setLanguage(lang);
    }

    // Controls the opacity of languages not selecetd and language selected
    if (language === "English") {
        styles.pictureEnglish.opacity = 1;
        styles.pictureSpanish.opacity = 0.2;
        styles.pictureCreole.opacity = 0.2;
    }
    else if (language === "Spanish") {
        styles.pictureSpanish.opacity = 1;
        styles.pictureEnglish.opacity = 0.2;
        styles.pictureCreole.opacity = 0.2;
    }
    else if (language === "Creole") {
        styles.pictureCreole.opacity = 1;
        styles.pictureEnglish.opacity = 0.2;
        styles.pictureSpanish.opacity = 0.2;
    }

    // passes lanague to the database
    const passLanguage = () => {
        props.onTap(language);
    }

    return (
        <View style={styles.screen}>
            <ImageBackground source={require('../assets/mom-welcome.png')} style={styles.pictureBack} imageStyle={{opacity:0.2}}>
                <Text style={styles.textTitle}>Select Language</Text>
                <TouchableOpacity style={styles.flagStyle} onPress={() => languageSetHandler('English')}>
                    <Image
                        source={require('../assets/english.png')}
                        style={styles.pictureEnglish}
                    />
                    <View style={styles.seperator} />
                    <Text style={styles.textWord}>English</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.flagStyle} onPress={() => languageSetHandler('Spanish')}>
                    <Image
                        source={require('../assets/spanish.png')}
                        style={styles.pictureSpanish}
                    />
                    <View style={styles.seperator} />
                    <Text style={styles.textWord}>Spanish</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.flagStyle} onPress={() => languageSetHandler('Creole')}>
                    <Image
                        source={require('../assets/creole.png')}
                        style={styles.pictureCreole}
                    />
                    <View style={styles.seperator} />
                    <Text style={styles.textWord}>Creole</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => passLanguage()}>
                    <Image
                        source={require('../assets/check-mark.png')}
                        style={styles.check}
                    />
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    },
    pictureBack: {
        width: '100%', 
        height: '100%', 
        resizeMode:'contain',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    pictureEnglish: {
        height: 80,
        width: 100,
        resizeMode: 'stretch',
        opacity: 0.2,
    },
    pictureSpanish: {
        height: 80,
        width: 100,
        resizeMode: 'stretch',
        opacity: 0.2,
    },
    pictureCreole: {
        height: 80,
        width: 100,
        resizeMode: 'stretch',
        opacity: 0.2,
    },
    flagStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 100,
        width: 300,
        margin: 25,
    },
    buttonStyle: {
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    check: {
        height: 50,
        width: 50,
        resizeMode: 'stretch',
        marginTop: 25,
        opacity: 0.8
    },
    textTitle: {
        fontSize: 50,
        color: 'white',
    },
    textWord: {
        color: 'white',
        fontSize: 30,
    },
    seperator: {
        width: 5,
        height: 10,
    },
});

export default Welcome;