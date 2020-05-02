import {Image, Text, TouchableHighlight, View} from "react-native";
import appStyles from "./AppStyles";
import React from "react";
import * as Haptics from "expo-haptics";
import goBack from "./go-back-arrow.png";


export default function LowerPanelHeader(props) {

    let onPress = () => {
        Haptics.selectionAsync().then();
        props.onPress();
    };

    let getCurrentHeaderTitle = () => {
        if (props.lowerPanelContent === 'findCare') return props.getLocalizedText("findCare");
        if (props.lowerPanelContent === 'clinicInfo') return props.getLocalizedText("findCare");
        if (props.lowerPanelContent === 'learn') return props.getLocalizedText("learn")
        if (props.lowerPanelContent === 'tips') return props.getLocalizedText("tipsAndTricks")
    };

    return (
        <TouchableHighlight onPress={onPress} underlayColor={'transparent'} style={{padding: 20}}>
            <View style={{...appStyles.rowContainer, width: '100%'}}>
                <View style={{
                    right: appStyles.win.width * 0.28,
                    paddingLeft: appStyles.win.width * 0.07,
                    justifyContent: 'center'}}>
                    <Image style={{height: appStyles.win.width * 0.06, width: appStyles.win.width * 0.06}}
                           source={goBack}/>
                </View>
                <Text style={{...appStyles.paragraphText, right: appStyles.win.width * 0.04}}>{getCurrentHeaderTitle()}</Text>
            </View>
        </TouchableHighlight>
    )
}