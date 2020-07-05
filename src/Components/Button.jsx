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
        //props.style.Text && props.style.Text means that if style.Text exists pass it to the Text style, otherwise pass nothing
        return <Text style={props.style.Text}>{props.text}</Text>  
    }

    let showSubtext = () => {
        return <Text style={props.style.Subtext}>{props.subtext}</Text>
    }

    let underlayColor = props.underlayColor ? props.underlayColor : appStyles.underlayColor;

    return (
            <TouchableHighlight
            //props.style.Touchable && props.style.Touchable means that if style.Touchable exists pass it to the Touchable style, otherwise pass nothing
                style={props.style.Touchable && props.style.Touchable}  
                onPress={onPress}
                underlayColor={props.style.underlayColor ? props.style.underlayColor : underlayColor}
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