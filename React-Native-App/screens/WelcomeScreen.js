import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';

import Colors from '../constants/Colors';

const Welcome = props => {

    // handles the language selection of the app
    const [language, setLanguage] = useState("English");
    const languageSetHandler = (lang) => {
        setLanguage(lang);
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
                    <View style={{ opacity: (language === 'English') ? 1 : 0.2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Image style={styles.picture} source={require('../assets/english-icon.png')} />
                        <Text style={styles.textWord}>English</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.seperatorLine} />
                <TouchableOpacity style={styles.flagStyle} onPress={() => languageSetHandler('Spanish')}>
                    <View style={{ opacity: (language === 'Spanish') ? 1 : 0.2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Image style={styles.picture} source={require('../assets/spanish-icon.png')} />
                        <Text style={styles.textWord}>Spanish</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.seperatorLine} />
                <TouchableOpacity style={styles.flagStyle} onPress={() => languageSetHandler('Creole')}>
                    <View style={{ opacity: (language === 'Creole') ? 1 : 0.2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Image style={styles.picture} source={require('../assets/creole-icon.png')} />
                        <Text style={styles.textWord}>Creole</Text>
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