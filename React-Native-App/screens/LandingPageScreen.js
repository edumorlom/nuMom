import React from 'react';
import { View,Text, StyleSheet, Button, TextInput } from 'react-native';

const LandingPage = props => {
    return (
        <View style={styles.screen}>
            <Text>LandingPage</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
    }
})

export default LandingPage;