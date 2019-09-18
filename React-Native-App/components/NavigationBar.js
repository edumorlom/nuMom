import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const Navigation = props => {
    // helper to get screen name
    const goToHelper = (loc) => {
       props.passLocation(loc);
    }
    return (
        <View style={styles.screen}>
            {/* navigation bar with all icons */}
            < View style={styles.navigator} >
                <TouchableOpacity onPress={() => goToHelper('LandingPage')}>
                    <Image styles={styles.pictures} source={require('../assets/home-icon.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => goToHelper('FolderPage')}>
                    <Image styles={styles.pictures} source={require('../assets/folder-icon.png')} />
                </TouchableOpacity>
                <View style={{ width: 50, height: 50 }} />
                <TouchableOpacity onPress={() => goToHelper('ContactPage')}>
                    <Image styles={styles.pictures} source={require('../assets/contact-icon.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => goToHelper('SettingPage')}>
                    <Image styles={styles.pictures} source={require('../assets/setting-icon.png')} />
                </TouchableOpacity>
            </View >
            {/* backdrop for profile ellipse */}
            < View style={{ position: 'absolute', bottom: 0 }}>
                <Image styles={styles.pictureProfile} source={require('../assets/ellipse.png')} />
            </View >
            {/* profile ellipse combo */}
            < View style={{ position: 'absolute', bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => goToHelper('ProfilePage')}>
                    <Image styles={styles.pictureProfile} source={require('../assets/profile-icon.png')} />
                </TouchableOpacity>
            </View >
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        wdith: '100%',
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
})

export default Navigation;