import React, { useState } from 'react';
import { View, Image, Button, StyleSheet, TouchableOpacity, FlatList, Text, Linking } from 'react-native';
import Modal from 'react-native-modal';

import Navigation from '../components/NavigationBar';
import Box from '../components/Box';
import Translator from '../components/Translator';
import Colors from '../constants/Colors';
import Helper from '../components/Helpers';

const Classes = props => {

    let Tours = 'Tours';
    if (GlobalLanguage === 'es') { Tours = 'Excursiones' }
    let Parenting = 'Parenting';
    if (GlobalLanguage === 'es') { Parenting = "Paternidad" }

    // const lang = props.navigation.getParam('language')
    // console.log(lang);

    // control the modal and its pop up information
    const [visibility, setVisibility] = useState(false);
    const [information, setInformation] = useState('');

    const locationHelper = (location) => {
        // props.onTap(location);
    }

    // handles database get JSON file of content
    const pullJSONHandler = (bol, input) => {
        setVisibility(bol);
        setInformation(input);
    }
    const displayData = (option) => {
        // hold the JSON file
        const JSONData = require('../constants/information.json');
        // recals the child of the JSON based on selected topic
        let data = JSONData[option]
        // displays all the information found in that topic
        return (
            <View style={{ marginTop: 15 }}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={styles.titleProgram}>{item.title}</Text>
                            <Text>{'\n'}</Text>
                            <Translator style={styles.text} loadText={(item.cost)} loadLanguage={GlobalLanguage} />
                            <Translator style={styles.text} loadText={(item.description)} loadLanguage={GlobalLanguage} />
                            <Translator style={styles.text} loadText={(item.schedule)} loadLanguage={GlobalLanguage} />
                            <Translator style={styles.text} loadText={(item.address)} loadLanguage={GlobalLanguage} />
                            <Translator style={styles.text} loadText={(item.contact)} loadLanguage={GlobalLanguage} />
                            <TouchableOpacity onPress={() => Linking.openURL(item.website)} >
                                <Image style={{ width: 70, height: 70, alignSelf: 'center' }}
                                    source={require('../assets/icons/website.png')} />
                            </TouchableOpacity>
                            <View style={styles.seperator} />
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        )
    };

    return (
        <View>
            <View style={styles.screen}>
                <Box style={{ height: '80%', width: '80%', marginBottom: 100, marginTop: 50 }}>
                    {/* title */}
                    <Translator style={styles.title} loadText={('Classes Available')} loadLanguage={GlobalLanguage} />
                    <TouchableOpacity style={styles.containers} onPress={() => pullJSONHandler(true, 'breastfeeding')}>
                        <Image style={styles.image} source={require('../assets/icons/breastfeedingClasses-icon.png')} />
                        <Translator style={styles.sectionText} loadText={('Breastfeeding')} loadLanguage={GlobalLanguage} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.containers} onPress={() => pullJSONHandler(true, 'classes')}>
                        <Image style={styles.image} source={require('../assets/icons/parenting-icon.png')} />
                        <Translator style={styles.sectionText} loadText={(Parenting)} loadLanguage={GlobalLanguage} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.containers} onPress={() => pullJSONHandler(true, 'childbirth')}>
                        <Image style={styles.image} source={require('../assets/icons/childbirth-icon.png')} />
                        <Translator style={styles.sectionText} loadText={('Childbirth')} loadLanguage={GlobalLanguage} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.containers} onPress={() => pullJSONHandler(true, 'tours')}>
                        <Image style={styles.image} source={require('../assets/icons/tours-icon.png')} />
                        <Translator style={styles.sectionText} loadText={(Tours)} loadLanguage={GlobalLanguage} />
                    </TouchableOpacity>
                    {/* modal with pop up information */}
                    <Modal
                        isVisible={visibility}
                        onBackdropPress={() => pullJSONHandler(false, "")}
                        propagateSwipe={true}
                        onBackButtonPress={() => pullJSONHandler(false, "")}
                        style={styles.modalStyle}>
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
    )
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 30,
        color: Colors.titleRed,
    },
    sectionText: {
        color: Colors.blueLetters,
        fontSize: 18,
    },
    contentText: {
        width: 350,
        fontSize: 15,
        color: Colors.blueLetters,
    },
    image: {
        marginRight: 15,
    },
    containers: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 20,
        width: '75%'
    },
    modalStyle: {
        justifyContent: 'center',
        alignItems: 'center',
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
    seperator: {
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 5,
        borderBottomColor: Colors.separatorLine,
        borderBottomWidth: 1,
    },
    text: {
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        padding: 5,
        fontSize: 15,
    },
    button: {
        alignSelf: 'center',
        justifyContent: 'center'
    },
    titleProgram: {
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold'
    }
})

export default Classes;