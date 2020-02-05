import {Text, TouchableHighlight, View} from "react-native";
import appStyles from "./AppStyles";
import React from "react";
import * as Haptics from "expo-haptics";
import CardView from "react-native-cardview";

export default function Button(props){
    let onClick = () => {
        Haptics.selectionAsync().then();
        props.onClick();
    };

    return (
        <CardView
            cardElevation={6}
            cardMaxElevation={6}
            cornerRadius={6}>
                <TouchableHighlight
                    style={appStyles.button.TouchableHighlight}
                    onPress={onClick}>
                    <Text style={appStyles.button.text}>{props.text}</Text>
            </TouchableHighlight>
        </CardView>
    )
}