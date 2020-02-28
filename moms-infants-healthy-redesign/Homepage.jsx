import React from 'react';
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Maps from "./Maps";
import {AppRegistry, Dimensions, Image, Text, View, TouchableHighlight, resizeMode} from 'react-native';
import appStyles from "./AppStyles";
import sosImage from "./sos-image.png";
import {Linking} from 'react-native'


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
                    <View style={{padding: 10}}/>
                    <Text style={{color: appStyles.greyColor, fontSize: 20, fontWeight: 'bold'}}>S.O.S</Text>
                </View>
                </TouchableHighlight>
                <View style={appStyles.BottomPanel}>
                    <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>Features coming soon!</Text>
                </View>
            </View>
        )
    }
}