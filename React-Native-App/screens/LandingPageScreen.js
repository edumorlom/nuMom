import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, FlatList, Button } from 'react-native';
import { ProviderTypes, TranslatorConfiguration } from 'react-native-power-translator';
import Modal from 'react-native-modal';
import Translator from '../components/Translator';

import Colors from '../constants/Colors';
import Navigations from '../components/NavigationBar';
import Box from '../components/Box';
import Helper from '../components/Helpers';

const LandingPage = props => {

    // handles translations
    const lang = props.navigation.getParam('language');

    console.log(lang);

    // control the modal and its pop up information
    const [visibility, setVisibility] = useState(false);
    const [information, setInformation] = useState('');

    // handles database get JSON file of content
    const pullJSONHandler = (bol, input) => {
        setVisibility(bol);
        setInformation(input);
    }
    
   // displays the correct information for modal
    const displayData = (option) => {
        // hold the JSON file
        const JSONData = require('../constants/information.json');
        // recals the child of the JSON based on selected topic
        var data = JSONData[option]
        // displays all the information found in that topic
        return (
            <View style={{ marginTop: 15 }}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={styles.titleProgram}>{item.title}</Text>
                            <Text>{'\n'}</Text>
                            <Translator style={styles.text} loadText={(item.description)} loadLanguage={GlobalLanguage} />
                            <Translator style={styles.text} loadText={(item.contact)} loadLanguage={GlobalLanguage} />
                            <Text>{'\n'}</Text>
                            <Translator style={styles.text, { alignSelf: 'center' }} loadText={(item.websitelabel)} loadLanguage={GlobalLanguage} />
                            <TouchableOpacity onPress={() => Linking.openURL(item.website)} >
                                <Image style={{ width: 70, height: 70, alignSelf: 'center' }}
                                    source={require('../assets/icons/website.png')} />
                            </TouchableOpacity>
                            {/* checks for second website */}
                            {(item.website2label != undefined) &&
                                <View>
                                    <Translator style={styles.text, { alignSelf: 'center' }} loadText={(item.website2label)} loadLanguage={GlobalLanguage} />
                                    <TouchableOpacity onPress={() => Linking.openURL(item.website2)} >
                                        <Image style={{ width: 70, height: 70, alignSelf: 'center' }}
                                            source={require('../assets/icons/website.png')} />
                                    </TouchableOpacity>
                                </View>}
                            {(item.locations != "") &&
                                <View>
                                    <Text style={styles.text}>
                                        {item.location}
                                    </Text>
                                </View>
                            }
                            <View style={styles.seperator} />
                        </View>
                    )}
                    keyExtractor={item => toString(item.id)}
                />
            </View>
        )
    };

    return (
        <View>
            <View style={styles.screen}>
                <Box style={{ height: '80%', width: '80%', marginBottom: 100, marginTop: 50 }}>
                    <Text style={styles.boxTitle}>{Helpers('Programs Available', GlobalLanguage)}</Text>
                    <TouchableOpacity style={styles.seperate} onPress={() => pullJSONHandler(true, 'WIC')}>
                        <Text style={styles.titles}>{Helpers('Women, Infants, and Children (WIC)', GlobalLanguage)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.seperate} onPress={() => pullJSONHandler(true, 'medicaid')}>
                        <Text style={styles.titles}>{Helpers('Medicaid', GlobalLanguage)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.seperate} onPress={() => pullJSONHandler(true, 'healthcare')}>
                        <Text style={styles.titles}>{Helpers('Medical Clinics', GlobalLanguage)}</Text>
                    </TouchableOpacity>
                    <Modal
                        isVisible={visibility}
                        onBackdropPress={() => pullJSONHandler(false, "")}
                        propagateSwipe={true}
                        onBackButtonPress={() => pullJSONHandler(false, "")}>
                        <View style={styles.content}>
                            {/* load content */}
                            {displayData(information)}
                            {/* button to close modal */}
                            <Button style={styles.button} title={Helper(('Hide'), GlobalLanguage)} onPress={() => pullJSONHandler(false, "")} />
                        </View>
                    </Modal>
                </Box>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    seperate: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 20,
        width: '75%'
    },
    titles: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.blueLetters,
    },
    boxTitle: {
        fontSize: 30,
        color: Colors.titleRed,
    },
    content: {
        backgroundColor: 'white',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        margin: 10,
        borderColor: 'transparent',
    },
    button: {
        alignSelf: 'center',
        justifyContent: 'center'
    },
    titleProgram: {
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    text: {
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        padding: 5,
        fontSize: 15,
    },
})

export default LandingPage;