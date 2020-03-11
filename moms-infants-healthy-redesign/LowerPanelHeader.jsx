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
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, marginBottom: 20, marginLeft: 15}}>
            <TouchableHighlight style={{flex: 0.32, paddingLeft: 3}} onPress={onPress} underlayColor='transparent'>
                <Image style={{height: 25, width: 15}} source={goBack}/>
            </TouchableHighlight>
            <View style={{flex: 1, paddingRight: 5}}>
                <Text style={{...appStyles.paragraphText}}>{props.title}</Text>
            </View>
        </View>
    )
}