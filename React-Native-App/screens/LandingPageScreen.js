import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, TextInput } from 'react-native';

import Colors from '../constants/Colors';
import Navigation from '../components/NavigationBar';

const LandingPage = props => {
    const locationHelper = (location) => {
        // props.onTap(location);
    }
    return (
        <View>
            <View style={styles.screen}>
                {/* loading page for the links and other sections */}
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.cdc.gov/std/healthcomm/fact_sheets.htm')}  >
                        <View style={styles.linkBox}>
                            <Text style={styles.linkStyle}>
                                Page under development
                        </Text>
                        </View>
                    </TouchableOpacity>
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
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    navigator: {
        position: 'absolute',
        bottom: 0,
        borderColor: 'transparent',
        backgroundColor: Colors.boxBackground,
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    pictures: {
        height: 50,
        width: 50,
    },
    pictureProfile: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    linkBox: {
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 5,
        backgroundColor: Colors.boxBackground,
        width: '80%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        margin: 5
    },
    linkStyle: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})

export default LandingPage;