import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import HTML from 'react-native-render-html';

import Navigation from '../components/NavigationBar';
import Colors from '../constants/Colors';

const SexEd = props => {
    const locationHelper = (location) => {
        props.onTap(location);
    }
    return (
        <View> 
            <View style={styles.screen} >
                <Text>Sex Ed Page</Text>
            </View>
            <View>
                <Navigation passLocation={(loc) => locationHelper(loc)} />
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
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        width: '90%',
        borderColor: 'transparent',
        borderRadius: 10,
        backgroundColor: Colors.boxBackground,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
    },
})

export default SexEd;