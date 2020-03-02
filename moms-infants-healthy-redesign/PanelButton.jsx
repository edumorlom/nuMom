import {Image, Text, TouchableHighlight, View} from "react-native";
import appStyles, {borderRadius, greyColor, shadow} from "./AppStyles";
import React from "react";
import * as Haptics from "expo-haptics";


export default function PanelButton(props){

    let onClick = () => {
        Haptics.selectionAsync().then();
        // props.onClick();
    };

    return (
        <TouchableHighlight style={{margin: 10,
                backgroundColor: 'white',
                shadowColor: shadow.shadowColor,
                shadowOffset: appStyles.shadow.shadowOffset,
                shadowOpacity: appStyles.shadow.shadowOpacity,
                shadowRadius: appStyles.shadow.shadowRadius,
                height: '20%',
                width: '80%',
                borderColor: greyColor,
                borderRadius: borderRadius}}
                            onPress={onClick}>

            <View style={{flexDirection: 'row',
                height: '100%',
                width: '100%',
                alignItems: 'center',
                padding: 10}}>
                <Image style={{width: 55, height: 55, marginLeft: '13%', marginRight: '18%'}} source={props.icon} />
                <Text style={{color: props.color, fontSize: 20, fontWeight: 'bold'}}>{props.text}</Text>
            </View>
        </TouchableHighlight>
    )
}