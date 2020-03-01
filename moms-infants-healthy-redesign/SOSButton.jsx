import {Image, Linking, Text, TouchableHighlight, View} from "react-native";
import appStyles from "./AppStyles";
import sosImage from "./sos-image.png";
import React from "react";

export default function SOSButton() {
    return(
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
                <Text style={{color: appStyles.pinkColor, fontSize: 20, fontWeight: 'bold'}}>S.O.S</Text>
            </View>
        </TouchableHighlight>
    )
}