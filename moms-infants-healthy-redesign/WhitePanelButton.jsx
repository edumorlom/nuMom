import {Image, Text, TouchableHighlight, View} from "react-native";
import appStyles, {borderRadius, greyColor, shadow} from "./AppStyles";
import React from "react";
import * as Haptics from "expo-haptics";


export default function WhitePanelButton(props){

    let onPress = () => {
        Haptics.selectionAsync().then();
        // props.onPress();
    };

    return (
        <TouchableHighlight style={{
            margin: 10,
            backgroundColor: 'white',
            shadowColor: shadow.shadowColor,
            shadowOffset: appStyles.shadow.shadowOffset,
            shadowOpacity: appStyles.shadow.shadowOpacity,
            shadowRadius: appStyles.shadow.shadowRadius,
            height: appStyles.win.height * 0.13,
            width: '85%',
            borderColor: greyColor,
            borderRadius: borderRadius}}
                            underlayColor={appStyles.greyColor}
                            onPress={onPress}>

            <View style={{flexDirection: 'row',
                height: '100%',
                width: '100%',
                alignItems: 'center',
                padding: 10}}>
                <Image style={{width: 55, height: 55, marginLeft: appStyles.win.width * 0.07, marginRight: appStyles.win.width * 0.1}} source={props.icon} />
                <Text style={{color: props.color, fontSize: appStyles.regularFontSize, fontWeight: 'bold'}}>{props.text}</Text>
            </View>
        </TouchableHighlight>
    )
}