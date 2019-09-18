import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

import Navigation from '../components/NavigationBar';

const Setting = props => {
    const locationHelper = (location) => {
        props.onTap(location);
    }
    return (
        <View>
            <View style={styles.screen} >
                <Text>Setting Page</Text>
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
        wdith: '100%',
        height: '100%'
    },
})
export default Setting;