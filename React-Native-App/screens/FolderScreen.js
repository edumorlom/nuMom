import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';

import Navigation from '../components/NavigationBar';
import Colors from '../constants/Colors';

const Folder = props => {

    // handles translations
    var lang = props.loadLanguage;
    TranslatorConfiguration.setConfig(ProviderTypes.Microsoft, 'de6f9f5aaa86420da79a3dc450cd4e6c', lang);

    const [files, setFiles] = useState('');

    const locationHelper = (location) => {
        props.onTap(location);
    }
    const saveChange = () => {
        setFiles('Sample.txt');
        props.saveFiles(files);
    }

    return (
        <View>
            <View style={styles.screen}>
                <View style={styles.box}>
                    <Text>Folder Page Under Development</Text>
                </View>
                <View>
                    <TouchableHighlight style={styles.button} onPress={() => saveChange()} underlayColor={'rgba(213, 170, 255, 0.8)'} >
                        <PowerTranslator style={{ fontSize: 18, color: 'black' }} text={"Save Documents"} />
                    </TouchableHighlight>
                </View>
            </View>
            <View>
                <Navigation passLocation={(loc) => locationHelper(loc)} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        width: '90%',
        borderColor: 'transparent',
        borderRadius: 10,
        backgroundColor: Colors.boxBackground,
        marginTop: 50,
        marginBottom: 20,
        padding: 10,
    }, button: {
        marginBottom: 100,
        padding: 10,
        backgroundColor: Colors.boxBackground,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
})

export default Folder;