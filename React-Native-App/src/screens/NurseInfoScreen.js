import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Translator from '../components/Translator';
import Colors from '../constants/Colors';

const NurseInfoScreen = props => {
    
    const language = props.navigation.getParam('language');

    console.log("nurse screen language ", language)

     // hold the JSON file with the nurses info
     const nursesInfo = require('../constants/nursesInfo.json');

     const displayNursesInfo = () => {
        return nursesInfo.map(_nurses => (
            <View style={{ backgroundColor: Colors.background, flex: 1 }} key={_nurses.id}>
                <View>
                    <Translator style={{ alignSelf: 'center', alignItems: 'center', paddingTop: 15, textAlign: 'center'  }} 
                        loadText={"Below are the nurse practitioners that you can contact with any question you may have\n"} 
                        loadLanguage={language} 
                    />
                </View>
                <Translator style={styles.text} loadText={(_nurses.name)} loadLanguage={language} />
                <Translator style={styles.text} loadText={(_nurses.phone)} loadLanguage={language} />
                <Translator style={styles.text} loadText={(_nurses.email)} loadLanguage={language} />
                <View style={styles.seperate} />
            </View>
        ));
     }
     
    return ( 
        <>
        { displayNursesInfo() }
        </>
        )
}

NurseInfoScreen.navigationOptions = () => {
    return {
        title: 'Nurse Practitioners',
        headerStyle: {
            backgroundColor: '#F6ECFF'
        }
    };
};

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: Colors.background
    },
    text: {
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        padding: 15,
        fontSize: 15,
    },
    seperate: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 20,
        width: '75%'
    },
})

export default NurseInfoScreen;