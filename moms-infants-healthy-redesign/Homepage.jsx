import React from 'react';
import Maps from "./Maps";
import {Image, Text, View, TouchableHighlight} from 'react-native';
import appStyles from "./AppStyles";
import sosImage from "./sos-image.png";
import {Linking} from 'react-native'
import LowerPanel from "./LowerPanel";
import {apps} from "firebase";
import SOSButton from "./SOSButton";


const styles = {
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    }
};

export default class Homepage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Maps/>
                <SOSButton/>
                <LowerPanel/>
            </View>
        )
    }
}