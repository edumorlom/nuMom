import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Button, Image } from 'react-native';
import Modal from 'react-native-modal';
import { WebView } from 'react-native-webview';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';

import Navigation from '../components/NavigationBar';
import Colors from '../constants/Colors';

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
            else {setSTD('https://tools.cdc.gov/api/v2/resources/media/241596/content');}
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
        <View>
            <View style={styles.screen} >
                <View style={styles.box}>
                    <TouchableOpacity onPress={() => modalControl(true, 'Bacterial Vaginosis')}>
                        <View style={styles.seperator}>
                            <PowerTranslator style={styles.words} text={"Bacterial Vaginosis"} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/english-icon.png')} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/spanish-icon.png')} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/creole-icon.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => modalControl(true, 'Chlamydia')}>
                        <View style={styles.seperator}>
                            <PowerTranslator style={styles.words} text={"Chlamydia"} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/english-icon.png')} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/spanish-icon.png')} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/creole-icon.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => modalControl(true, 'Genital Herpes')}>
                        <View style={styles.seperator}>
                            <PowerTranslator style={styles.words} text={"Genital Herpes"} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/english-icon.png')} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/spanish-icon.png')} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/creole-icon.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => modalControl(true, 'Gonorrhea')}>
                        <View style={styles.seperator}>
                            <PowerTranslator style={styles.words} text={"Gonorrhea"} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/english-icon.png')} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/spanish-icon.png')} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/creole-icon.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => modalControl(true, 'HIV/AIDS and STDs')}>
                        <View style={styles.seperator}>
                            <PowerTranslator style={styles.words} text={"HIV/AIDS and STDs"} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/english-icon.png')} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/spanish-icon.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => modalControl(true, 'HPV Infection')}>
                        <View style={styles.seperator}>
                            <PowerTranslator style={styles.words} text={"HPV Infection"} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/english-icon.png')} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/spanish-icon.png')} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/creole-icon.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => modalControl(true, 'Pelvic Inflammatory Disease')}>
                        <View style={styles.seperator}>
                            <PowerTranslator style={styles.words} text={"Pelvic Inflammatory Disease"} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/english-icon.png')} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/spanish-icon.png')} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/creole-icon.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => modalControl(true, 'STDs During Pregnancy')}>
                        <View style={styles.seperator}>
                            <PowerTranslator style={styles.words} text={"STDs During Pregnancy"} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/english-icon.png')} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/spanish-icon.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => modalControl(true, 'Syphilis')}>
                        <View style={styles.seperator}>
                            <PowerTranslator style={styles.words} text={"Syphilis"} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/english-icon.png')} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/spanish-icon.png')} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/creole-icon.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => modalControl(true, 'Congenital Syphilis')}>
                        <View style={styles.seperator}>
                            <PowerTranslator style={styles.words} text={"Congenital Syphilis"} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/english-icon.png')} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/spanish-icon.png')} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => modalControl(true, 'Trichomoniasis')}>
                        <View style={styles.seperator}>
                            <PowerTranslator style={styles.words} text={"Trichomoniasis"} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/english-icon.png')} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/spanish-icon.png')} />
                            <Image style={styles.imageStyle} source={require('../assets/icons/creole-icon.png')} />
                        </View>
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
                                style={{
                                    width: 400,
                                    marginTop: 20
                                }}
                            />
                            <Button title={buttonWord} onPress={() => modalControl(false)} />
                        </View>
                    </Modal>
                </View>
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
    box: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        width: '90%',
        borderColor: 'transparent',
        borderRadius: 10,
        backgroundColor: Colors.boxBackground,
        marginTop: 35,
        marginBottom: 100,
        padding: 10,
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
        borderRadius: 10,
        borderColor: 'transparent',
    },
    words: {
        fontSize: 15,
        color: Colors.blueLetters,
        fontWeight: 'bold'
    },
    seperator: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageStyle: {
        marginLeft: 5,
        marginRight: 5,
        width: 20,
        height: 10,
        resizeMode: 'stretch'
    }
})

export default SexEd;