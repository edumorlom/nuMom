import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Button, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { WebView } from 'react-native-webview';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration } from 'react-native-power-translator';

import Navigation from '../components/NavigationBar';
import Colors from '../constants/Colors';
import Box from '../components/Box';
import Translator from '../components/Translator';

const SexEd = props => {


    // handles translations
    var lang = props.loadLanguage;
    TranslatorConfiguration.setConfig(ProviderTypes.Microsoft, 'de6f9f5aaa86420da79a3dc450cd4e6c', lang);
    var buttonWord = '';
    if (lang === 'en') { buttonWord = 'Hide' }
    else if (lang === 'es') { buttonWord = 'Esconder' }
    else { buttonWord = 'Kache' }
    // navigation
    const locationHelper = (location) => {
        props.onTap(location);
    }
    // control the modal and its pop up information
    const [visibility, setVisibility] = useState(false);
    const [STD, setSTD] = useState('');
    const modalControl = (value, STD) => {
        setVisibility(value);
        if (STD === 'Bacterial Vaginosis') {
            if (lang === 'en') { setSTD('https://tools.cdc.gov/api/v2/resources/media/124250/content'); }
            else if (lang === 'es') { setSTD('https://tools.cdc.gov/api/v2/resources/media/133660/content'); }
            else { setSTD('https://www.cdc.gov/std/HaitianCreole/STDFact-BV-Haitian.htm'); }
        }
        if (STD === 'Chlamydia') {
            if (lang === 'en') { setSTD('https://tools.cdc.gov/api/v2/resources/media/124249/content'); }
            else if (lang === 'es') { setSTD('https://tools.cdc.gov/api/v2/resources/media/133661/content'); }
            else { setSTD('https://www.cdc.gov/std/HaitianCreole/STDFact-Chlamydia-Haitian.htm'); }
        }
        if (STD === 'Genital Herpes') {
            if (lang === 'en') { setSTD('https://tools.cdc.gov/api/v2/resources/media/124247/content'); }
            else if (lang === 'es') { setSTD('https://tools.cdc.gov/api/v2/resources/media/133662/content'); }
            else { setSTD('https://www.cdc.gov/std/HaitianCreole/STDFact-Herpes-Haitian.htm'); }
        }
        if (STD === 'Gonorrhea') {
            if (lang === 'en') { setSTD('https://tools.cdc.gov/api/v2/resources/media/124246/content'); }
            else if (lang === 'es') { setSTD('https://tools.cdc.gov/api/v2/resources/media/133664/content'); }
            else { setSTD('https://www.cdc.gov/std/HaitianCreole/STDFact-Gonorrhea-Haitian.htm'); }
        }
        if (STD === 'HIV/AIDS and STDs') {
            if (lang === 'en') { setSTD('https://tools.cdc.gov/api/v2/resources/media/241596/content'); }
            else if (lang === 'es') { setSTD('https://www.cdc.gov/std/spanish/vih/stdfact-hiv-and-stds-s.htm'); }
            //NOT Available IN CREOLE, Defaults to English
            else { setSTD('https://tools.cdc.gov/api/v2/resources/media/241596/content'); }
        }
        if (STD === 'HPV Infection') {
            if (lang === 'en') { setSTD('https://tools.cdc.gov/api/v2/resources/media/124248/content'); }
            else if (lang === 'es') { setSTD('https://tools.cdc.gov/api/v2/resources/media/133663/content'); }
            else { setSTD('https://www.cdc.gov/std/HaitianCreole/STDFact-HPV-Haitian.htm'); }
        }
        if (STD === 'Pelvic Inflammatory Disease') {
            if (lang === 'en') { setSTD('https://tools.cdc.gov/api/v2/resources/media/124245/content'); }
            else if (lang === 'es') { setSTD('https://tools.cdc.gov/api/v2/resources/media/133659/content'); }
            else { setSTD('https://www.cdc.gov/std/HaitianCreole/STDFact-PID-Haitian.htm'); }
        }
        if (STD === 'STDs During Pregnancy') {
            if (lang === 'en') { setSTD('https://tools.cdc.gov/api/v2/resources/media/126333/content'); }
            else if (lang === 'es') { setSTD('https://tools.cdc.gov/api/v2/resources/media/272997/content'); }
            //NOT Available IN CREOLE, Defaults to English
            else { setSTD('https://tools.cdc.gov/api/v2/resources/media/126333/content'); }
        }
        if (STD === 'Syphilis') {
            if (lang === 'en') { setSTD('https://tools.cdc.gov/api/v2/resources/media/124244/content'); }
            else if (lang === 'es') { setSTD('https://tools.cdc.gov/api/v2/resources/media/133665/content'); }
            else { setSTD('https://www.cdc.gov/std/HaitianCreole/STDFact-Syphilis-Haitian.htm'); }
        }
        if (STD === 'Congenital Syphilis') {
            if (lang === 'en') { setSTD('https://tools.cdc.gov/api/v2/resources/media/236611/content'); }
            else if (lang === 'es') { setSTD('https://tools.cdc.gov/api/v2/resources/media/279015/content'); }
            //NOT Available IN CREOLE, Defaults to English
            else { setSTD('https://tools.cdc.gov/api/v2/resources/media/236611/content'); }
        }
        if (STD === 'Trichomoniasis') {
            if (lang === 'en') { setSTD('https://tools.cdc.gov/api/v2/resources/media/124243/content'); }
            else if (lang === 'es') { setSTD('https://tools.cdc.gov/api/v2/resources/media/133658/content'); }
            else { setSTD('https://www.cdc.gov/std/haitiancreole/stdfact-trich-haitian.htm'); }
        }
    }
    return (
        <View >
            <View style={styles.screen}>
                <Box style={{ height: '80%', width: '80%', marginBottom: 100, marginTop:50}}>
                    <ScrollView>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                            <TouchableOpacity style={styles.containers} onPress={() => modalControl(true, 'Bacterial Vaginosis')}>
                                <Translator style={styles.words} loadText={('Bacterial Vaginosis')} loadLanguage={lang} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.containers} onPress={() => modalControl(true, 'Chlamydia')}>
                                <Translator style={styles.words} loadText={('Chlamydia')} loadLanguage={lang} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.containers} onPress={() => modalControl(true, 'Genital Herpes')}>
                                <Translator style={styles.words} loadText={('Genital Herpes')} loadLanguage={lang} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.containers} onPress={() => modalControl(true, 'Gonorrhea')}>
                                <Translator style={styles.words} loadText={('Gonorrhea')} loadLanguage={lang} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.containers} onPress={() => modalControl(true, 'HIV/AIDS and STDs')}>
                                <Translator style={styles.words} loadText={('HIV/AIDS and STDs')} loadLanguage={lang} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.containers} onPress={() => modalControl(true, 'HPV Infection')}>
                                <Translator style={styles.words} loadText={('HPV Infection')} loadLanguage={lang} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.containers} onPress={() => modalControl(true, 'Pelvic Inflammatory Disease')}>
                                <Translator style={styles.words} loadText={('Pelvic Inflammatory Disease')} loadLanguage={lang} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.containers} onPress={() => modalControl(true, 'STDs During Pregnancy')}>
                                <Translator style={styles.words} loadText={('STDs During Pregnancy')} loadLanguage={lang} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.containers} onPress={() => modalControl(true, 'Syphilis')}>
                                <Translator style={styles.words} loadText={('Syphilis')} loadLanguage={lang} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.containers} onPress={() => modalControl(true, 'Congenital Syphilis')}>
                                <Translator style={styles.words} loadText={('Congenital Syphilis')} loadLanguage={lang} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.containers} onPress={() => modalControl(true, 'Trichomoniasis')}>
                                <Translator style={styles.words} loadText={('Trichomoniasis')} loadLanguage={lang} />
                            </TouchableOpacity>
                            <Modal
                                isVisible={visibility}
                                onBackdropPress={() => modalControl(false)}
                                propagateSwipe={true}
                                onBackButtonPress={() => modalControl(false)}
                                style={styles.modalStyle}>
                                <View style={styles.content}>
                                    <WebView
                                        source={{ uri: STD }}
                                        javaScriptEnabled={true}
                                        style={styles.web}/>
                                    <Button title={buttonWord} onPress={() => modalControl(false)} />
                                </View>
                            </Modal>
                        </View>
                    </ScrollView>
                </Box>
            </View>
            <View>
                <Navigation passLocation={(loc) => locationHelper(loc)} />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    modalStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderColor: 'transparent',
    },
    web: {
        width: 350,
    },
    words: {
        fontSize: 15,
        color: Colors.blueLetters,
        fontWeight: 'bold'
    },
    containers: {
        margin:10
    }
})

export default SexEd;