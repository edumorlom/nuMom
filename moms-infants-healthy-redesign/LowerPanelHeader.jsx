import {Image, Text, TouchableHighlight, View} from "react-native";
import appStyles from "./AppStyles";
import React from "react";
import * as Haptics from "expo-haptics";
import goBack from "./go-back.png";



export default function LowerPanelHeader(props){

    let onPress = () => {
        Haptics.selectionAsync().then();
        props.onPress();
    };

    return (
        <TouchableHighlight onPress={onPress} underlayColor={'transparent'} style={{margin: 15}}>
            <View style={{...appStyles.rowContainer, position: 'relative'}}>
            <View style={{right: appStyles.win.width * 0.3, justifyContent: 'center'}}>
                <Image style={{height: 20, width: 15}} source={goBack}/>
            </View>
                <Text style={{...appStyles.paragraphText, right: appStyles.win.width * 0.01}}>{props.title}</Text>
            </View>
        </TouchableHighlight>
    )
}