import React from 'react';
import Maps from "./Maps";
import {Image, Text, View, TouchableHighlight} from 'react-native';
import appStyles from "./AppStyles";
import sosImage from "./sos-image.png";
import {Linking} from 'react-native'
import LowerPanel from "./LowerPanel";


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
                <TouchableHighlight style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 30,
                    bottom: 0,
                    maxHeight: 110,
                    maxWidth: 200
                }} onPress={() => Linking.openURL('tel:911')}>
                <View style={appStyles.WhitePanelButton}>
                    <Image style={{width: 25, height: 25}} source={sosImage} />
                    <View style={{margin: 10}}/>
                    <Text style={{color: appStyles.greyColor, fontSize: 20, fontWeight: 'bold'}}>S.O.S</Text>
                </View>
                </TouchableHighlight>
                <LowerPanel/>
            </View>
        )
    }
}