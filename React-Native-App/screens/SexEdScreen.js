import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Navigation from '../components/NavigationBar';

const SexEd = props => {
    const locationHelper = (location) => {
        props.onTap(location);
    }
    return (
        <View>
            <View style={styles.screen} >
                <Text>SexEd Page</Text>
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
    text: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default SexEd;