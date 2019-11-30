import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NurseInfo = props => {
    return (
        <View>
            <View style={styles.screen}>
                <Text>NurseInfo page</Text>
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
})

export default NurseInfo;