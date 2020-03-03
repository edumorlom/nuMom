import {Text, TouchableHighlight, View} from "react-native";
import appStyles from "./AppStyles";
import React from "react";
import * as Haptics from "expo-haptics";
import {RFValue} from "react-native-responsive-fontsize";

export default function MultipleChoiceButton(props){

    let onPress = () => {
        Haptics.selectionAsync().then();
        props.onClick();
    };

    return (
        <TouchableHighlight underlayColor='none'
            style={{
                alignItems: 'center',
                backgroundColor: props.selected ? 'grey' : 'white',
                height: appStyles.win.height * 0.14,
                width: appStyles.win.height * 0.14,
                margin: 20,
                borderRadius: appStyles.button.TouchableHighlight.borderRadius,
                borderWidth: 0,
                shadowColor: appStyles.greyColor,
                shadowOpacity: appStyles.shadow.shadowOpacity,
                shadowOffset: appStyles.shadow.shadowOffset,
                shadowRadius: appStyles.shadow.shadowRadius,
            }}
            onPress={onPress}>
            <Text style={{color: props.color, fontSize: RFValue(85)}}>{props.text}</Text>
        </TouchableHighlight>
    )
}