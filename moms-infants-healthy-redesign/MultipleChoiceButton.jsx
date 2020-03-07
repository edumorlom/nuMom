import {Text, TouchableHighlight} from "react-native";
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
        <TouchableHighlight
            underlayColor='white'
            style={{
                alignItems: 'center',
                backgroundColor: props.selected ? appStyles.greyColor : 'white',
                height: appStyles.win.height * 0.105,
                width: appStyles.win.width * 0.23,
                margin: 20,
                paddingBottom: 10,
                borderRadius: appStyles.button.TouchableHighlight.borderRadius,
                borderWidth: 0,
                ...appStyles.shadow
            }}
            onPress={onPress}>
            <Text style={{color: props.color, fontSize: RFValue(60)}}>{props.text}</Text>
        </TouchableHighlight>
    )
}