import {Text, TouchableHighlight, View, Image} from "react-native";
import appStyles from "./AppStyles";
import React from "react";
import * as Haptics from "expo-haptics";

export default function Button(props){
    let onPress = () => {
        Haptics.selectionAsync().then();
        props.onPress();
    };

    let withView = () => {
        return <View style = {props.style.View}> 
            {props.style.Image && <Image style= {props.style.Image} source={props.icon}/>}
            {props.style.TextView && <View style= {props.style.TextView}>
                {props.style.TextInView && <Text style = {props.style.TextInView}>
                    {props.text}
                </Text>}
                {props.style.SubtextInView && <Text style = {props.style.SubtextInView}>
                    {props.subtext}
                </Text>}
            </View>}
        </View> 
    } 

    let showText = () => {
        return <Text style={props.style.Text}>{props.text}</Text>  //appStyles.button.text
    }

    let showSubtext = () => {
        return <Text style={props.style.Subtext}>{props.subtext}</Text>
    }

    return (
            <TouchableHighlight
                style={props.style.Touchable}  
                onPress={onPress}
                underlayColor={props.style.underlayColor ? props.style.underlayColor : appStyles.underlayColor}
                //appStyles.blueColor
            >
            <>
                {props.style.View && withView()}
                {props.style.Text && showText()}
                {props.style.Subtext && showSubtext()}
            </>
            </TouchableHighlight>
    )
}