import {Text, TouchableHighlight, View} from "react-native";
import appStyles from "./styles";
import React from "react";
import * as Haptics from "expo-haptics";

export default function Button(props){
    let onPress = () => {
        Haptics.selectionAsync().then();
        props.onClick();
    };

    return (
            <TouchableHighlight
                style={appStyles.button.TouchableHighlight}
                onPress={onPress}
                underlayColor={appStyles.blueColor}>
                <Text style={appStyles.button.text}>{props.text}</Text>
            </TouchableHighlight>
    )
}