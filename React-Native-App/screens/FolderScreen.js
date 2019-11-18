import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, ScrollView, TextInput, Button, Keyboard, Image, FlatList, TouchableOpacity } from 'react-native';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
import Modal from 'react-native-modal';

import Navigation from '../components/NavigationBar';
import Colors from '../constants/Colors';
import ImagePick from '../components/ImagePick';
import Box from '../components/Box';
import Helpers from '../components/Helpers';
import { object } from 'prop-types';

const Folder = props => {

    // handles translations
    var lang = props.loadLanguage;
    TranslatorConfiguration.setConfig(ProviderTypes.Microsoft, 'de6f9f5aaa86420da79a3dc450cd4e6c', lang);

    // control the modal and its pop up information
    const [visibility, setVisibility] = useState(false);
    // controls picture modal when document picked to be seen/deleted
    const [visibilityPicture, setVisibilityPicture] = useState(false);
    const [name, setName] = useState("");
    // use for default before picture taken or picked
    let defaultImage = '../assets/mom-and-baby-icon-editable.png';
    const [image, setImage] = useState('')
    // holds all documents, retrive from database into this variable
    const [documents, setDocuments] = useState([{ "id": 1, "name": "", "date": "", "image": "" }])
    // picture opened
    const [object, setObject] = useState('');
    const [objId, setObjId] = useState(0);
    // Array of objects which are documents

    // navigation bar
    const locationHelper = (location) => {
        props.onTap(location);
    }
    const sendToDatabase = () => {
        // send to database the documents state 
    }
    // add document here to create correct object
    const finishHandler = () => {
        // get date
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var currDate = month + '/' + date + '/' + year;

        setDocuments([...documents, { id: documents.length + 1, name: name, "date": currDate, "image": image }])
        sendToDatabase();
        setVisibility(false);
    }
    // handls image
    const picHandler = (pic) => {
        Keyboard.dismiss();
        setImage(pic);
    }
    // handles modal for adding document
    const addDocumentHandler = (changeVisibility) => {
        setVisibility(changeVisibility);
    }
    // handlers modal for picture view
    const handlePictureView = (changeVisibility) => {
        setVisibilityPicture(changeVisibility);
    }
    // handles opening a pitcure view or delete
    const openPicture = (getID) => {
        // holds correct object
        var hold = documents.filter(item => item.id === getID);
        var img = hold[0].image;
        setObject(img);
        setObjId(getID);
        // activate modal
        setVisibilityPicture(true);
    };
    // can delete documents/pictures 
    const deleteDocument = (getID) => {
        let allDocuments = documents.filter(item => item.id != getID);
        setDocuments(allDocuments);
        sendToDatabase();
        setVisibilityPicture(false);
    }
    return (
        <View>
            <View style={styles.screen}>
                {/* box that holds documents */}
                <Box style={{ height: '75%', width: '80%', marginTop: 15 }}>
                    <ScrollView>
                        {/* loops all documents */}
                        <FlatList
                            data={documents}
                            renderItem={({ item }) => {
                                if (item.id === 1) {
                                    return <View></View>
                                }
                                else {
                                    return (
                                        <View>
                                            {/* inside is name, date and picture */}
                                            <View style={{ flexDirection: 'row', width: '100%' }}>
                                                <View style={{ alignItems: 'center', justifyContent: 'center', width: '70%' }}>
                                                    <Text style={styles.text}>{item.name === "" ? ('Document - ' + (item.id - 1)) : item.name}</Text>
                                                    <Text style={styles.text}>{item.date}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => openPicture(item.id)} style={{ width: '30%' }} >
                                                    <Image source={{ uri: item.image }} style={{ width: 70, height: 70, borderRadius: 5 }} />
                                                </TouchableOpacity>
                                            </View>
                                            {/* seperates for next picture */}
                                            <View style={styles.seperator} />
                                        </View>
                                    )
                                }
                            }}
                            keyExtractor={item => item.id.toString()}
                        />
                    </ScrollView>
                    {/* adding a new document using this modal */}
                    <Modal
                        isVisible={visibility}
                        onBackdropPress={() => addDocumentHandler(false)}
                        propagateSwipe={true}
                        onBackButtonPress={() => addDocumentHandler(false)}>
                        <View style={styles.content}>
                            <TextInput
                                placeholder={Helpers("name of file", lang)}
                                onChangeText={text => setName(text)}
                                style={{ margin: 10, fontSize: 15 }}
                                maxLength={25}
                            />
                            {/* Picture Component */}
                            <ImagePick style={{ borderRadius: 5 }} passLang={lang} passPicture={defaultImage} getPicture={picHandler} />
                            {/* button to close modal */}
                            <Button style={styles.button} title={Helpers(('Finish'), lang)} onPress={() => finishHandler()} />
                        </View>
                    </Modal>
                    {/* clicking on document to view or delete */}
                    <Modal
                        isVisible={visibilityPicture}
                        onBackdropPress={() => handlePictureView(false)}
                        propagateSwipe={true}
                        onBackButtonPress={() => handlePictureView(false)}>
                        <View style={styles.content}>
                            {/* Picture Component */}
                            <Image source={{ uri: object }} style={{ width: 340, height: 380, borderRadius: 20 }} />
                            {/* button to close modal and delete document */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Button style={styles.button} title={Helpers('Hide', lang)} onPress={() => handlePictureView(false)} />
                                <Button style={styles.button} title={Helpers('Delete', lang)} onPress={() => deleteDocument(objId)} />
                            </View>
                        </View>
                    </Modal>
                </Box>
                {/* add document button */}
                <TouchableHighlight style={styles.button} onPress={() => addDocumentHandler(true)} underlayColor={'rgba(213, 170, 255, 0.8)'} >
                    <Text style={{ fontSize: 18, color: 'black' }}>{Helpers("Add Document", lang)}</Text>
                </TouchableHighlight>
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
    button: {
        marginBottom: 100,
        padding: 10,
        backgroundColor: Colors.boxBackground,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
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
        width: '100%'
    },
    text: {
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 5,
        fontSize: 18,
    },
})

export default Folder;