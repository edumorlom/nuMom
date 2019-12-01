import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Button, ScrollView, Alert, Text } from 'react-native';
import Modal from 'react-native-modal';
import { WebView } from 'react-native-webview';

import Navigation from '../components/NavigationBar';
import Colors from '../constants/Colors';
import Box from '../components/Box';
import Translator from '../components/Translator';
import Helpers from '../components/Helpers';

const SexEd = props => {

    const lang = props.navigation.getParam('language')
    console.log(lang)

    // control the modal and its pop up information
    const [visibility, setVisibility] = useState(false);
    const [STD, setSTD] = useState('');

    const [checker, setChecker] = useState(false);
    const locationHelper = (location) => {
        // props.onTap(location);
    }

    let message = Helpers('We are sorry, but this information is not available in Creole.', GlobalLanguage);
    const modalControl = (value, STD) => {
        setVisibility(value);
        // hold the JSON file
        const JSONData = require('../constants/information.json');
        // recalls the child of the JSON based on selected topic
        var data = JSONData['websites'];

        if (GlobalLanguage === 'es') {
            setSTD(data.find(obj => obj.id === STD).es);
        }
        else if (GlobalLanguage === 'ht') {
            // HIV/AIDS and STDs, STDs During Pregnancy, Congenital Syphilis not available
            if (STD === "HIV/AIDS and STDs" || STD === "STDs During Pregnancy" || STD === "Congenital Syphilis") {
                setChecker(true);
                setSTD(data.find(obj => obj.id === STD).en);
            }
            else {
                setChecker(false);
                setSTD(data.find(obj => obj.id === STD).ht);
            }
        }
        else {
            setSTD(data.find(obj => obj.id === STD).en);
        }
    }
    return (
        <View >
            <View style={styles.screen}>
                <Box style={{ height: '80%', width: '80%', marginBottom: 100, marginTop: 50 }}>
                    <ScrollView>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', marginRight: 2 }} >
                            <TouchableOpacity style={styles.containers} onPress={() => modalControl(true, 'Bacterial Vaginosis')}>
                                <Translator style={styles.words} loadText={('Bacterial Vaginosis')} loadLanguage={GlobalLanguage} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.containers} onPress={() => modalControl(true, 'Chlamydia')}>
                                <Translator style={styles.words} loadText={('Chlamydia')} loadLanguage={GlobalLanguage} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.containers} onPress={() => modalControl(true, 'Genital Herpes')}>
                                <Translator style={styles.words} loadText={('Genital Herpes')} loadLanguage={GlobalLanguage} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.containers} onPress={() => modalControl(true, 'Gonorrhea')}>
                                <Translator style={styles.words} loadText={('Gonorrhea')} loadLanguage={GlobalLanguage} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.containers} onPress={() => modalControl(true, 'HIV/AIDS and STDs')}>
                                <Translator style={styles.words} loadText={('HIV/AIDS and STDs')} loadLanguage={GlobalLanguage} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.containers} onPress={() => modalControl(true, 'HPV Infection')}>
                                <Translator style={styles.words} loadText={('HPV Infection')} loadLanguage={GlobalLanguage} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.containers} onPress={() => modalControl(true, 'Pelvic Inflammatory Disease')}>
                                <Translator style={styles.words} loadText={('Pelvic Inflammatory Disease')} loadLanguage={GlobalLanguage} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.containers} onPress={() => modalControl(true, 'STDs During Pregnancy')}>
                                <Translator style={styles.words} loadText={('STDs During Pregnancy')} loadLanguage={GlobalLanguage} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.containers} onPress={() => modalControl(true, 'Syphilis')}>
                                <Translator style={styles.words} loadText={('Syphilis')} loadLanguage={GlobalLanguage} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.containers} onPress={() => modalControl(true, 'Congenital Syphilis')}>
                                <Translator style={styles.words} loadText={('Congenital Syphilis')} loadLanguage={GlobalLanguage} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.containers} onPress={() => modalControl(true, 'Trichomoniasis')}>
                                <Translator style={styles.words} loadText={('Trichomoniasis')} loadLanguage={GlobalLanguage} />
                            </TouchableOpacity>
                            <Modal
                                isVisible={visibility}
                                onBackdropPress={() => setVisibility(false)}
                                propagateSwipe={true}
                                onBackButtonPress={() => setVisibility(false)}
                                style={styles.modalStyle}>
                                <View style={styles.content}>
                                    {/* For Non Creole supported */}
                                    {checker && <Text style={{ color: 'red', fontSize: 20, alignSelf: 'center', justifyContent: 'center' }}>{message}</Text>}
                                    <WebView
                                        source={{ uri: STD }}
                                        javaScriptEnabled={true}
                                        style={styles.web} />
                                    <Button title={Helpers('Hide', GlobalLanguage)} onPress={() => setVisibility(false)} />
                                </View>
                            </Modal>
                        </View>
                    </ScrollView>
                </Box>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: Colors.newBackground
    },
    modalStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        backgroundColor: 'white',
        margin: 5,
        paddingTop: 20,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderColor: 'transparent',
    },
    web: {
        width: 350,
    },
    words: {
        fontSize: 18,
        color: Colors.blueLetters,
        fontWeight: 'bold'
    },
    containers: {
        marginTop: 25
    }
})

export default SexEd;