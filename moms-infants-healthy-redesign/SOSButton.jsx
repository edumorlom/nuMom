import {Image, Linking, Text, TouchableHighlight, View} from "react-native";
import appStyles from "./AppStyles";
import sosImage from "./sos-image.png";
import React from "react";
import * as Haptics from "expo-haptics";

export default function SOSButton() {
    return(
        <TouchableHighlight style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '2%',
            bottom: 0,
            maxHeight: 0,
            maxWidth: 0
        }} onPress={() => {Haptics.selectionAsync().then(); Linking.openURL('tel:911')}}>
            <View style={appStyles.WhitePanelButton}>
                <Image style={{width: 25, height: 25, marginRight: 18}} source={sosImage} />
                <Text style={{color: appStyles.pinkColor, fontSize: 20, fontWeight: 'bold'}}>S.O.S</Text>
            </View>
        </TouchableHighlight>
    )
}