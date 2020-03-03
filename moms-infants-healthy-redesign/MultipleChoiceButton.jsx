import {Text, TouchableHighlight, View} from "react-native";
import appStyles from "./AppStyles";
import React from "react";
import * as Haptics from "expo-haptics";
import {RFValue} from "react-native-responsive-fontsize";
import {apps} from "firebase";

export default function MultipleChoiceButton(props){

    let onClick = () => {
        Haptics.selectionAsync().then();
        props.onClick();
    };

    return (
        <TouchableHighlight
            style={{
                alignItems: 'center',
                backgroundColor: props.selected ? 'grey' : 'white',
                height: appStyles.win.height * 0.15,
                width: appStyles.win.height * 0.15,
                margin: 5,
                borderRadius: appStyles.button.TouchableHighlight.borderRadius,
                borderWidth: 0,
                shadowColor: appStyles.greyColor,
                shadowOpacity: appStyles.shadow.shadowOpacity,
                shadowOffset: appStyles.shadow.shadowOffset,
                shadowRadius: appStyles.shadow.shadowRadius,
            }}
            onPress={onClick}>
            <Text style={{color: props.color, fontSize: RFValue(85)}}>{props.text}</Text>
        </TouchableHighlight>
    )
}