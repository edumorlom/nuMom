import {Text, TouchableHighlight, View} from "react-native";
import appStyles from "./AppStyles";
import React from "react";
import * as Haptics from "expo-haptics";

export default function Button(props){
    let onClick = () => {
        Haptics.selectionAsync().then();
        props.onClick();
    };

    return (
        <View style={appStyles.shadow}>
            <TouchableHighlight
                style={appStyles.button.TouchableHighlight}
                onPress={onClick}>
                <Text style={appStyles.button.text}>{props.text}</Text>
            </TouchableHighlight>
        </View>
    )
}