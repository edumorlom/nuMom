import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NurseInfoScreen = props => {
    
    const language = props.navigation.getParam('language');

    console.log("nurse screen language ", language)

    
    return (
        <View>
            <View style={styles.screen}>
                <Text>NurseInfo page</Text>
            </View>
        </View>
    )
}

NurseInfoScreen.navigationOptions = () => {
    return {
        title: 'Nurse Practitioners'
    };
};

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
})

export default NurseInfoScreen;