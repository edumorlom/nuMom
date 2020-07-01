import {Image, Text, TouchableHighlight, View} from "react-native";
import appStyles, {borderRadius, greyColor, shadow} from "./AppStyles";
import React from "react";
import * as Haptics from "expo-haptics";


export default function SelectionButton(props){

    let onPress = () => {
        Haptics.selectionAsync().then();
        props.onPress();
    };

    let showText = () => {
        return (
        <View>
            <Text style={props.style.Text}>
                {props.text}
            </Text>
            {props.style.Subtext ? //If it has subtext, display it
            <Text style={props.style.Subtext}>
                {props.subtext}
            </Text> : null} 
        </View>
        )
    }

    let showImage = () => {
        return <Image style={props.style.Image} 
        source={props.icon} 
        />
    }

    let showImageInView = () => {
        return <Image style={props.style.ImageInView} 
        source={props.icon} 
        />
    }

   /*  let displayContent = () => {
        return (<>
            {props.style.Image ? showImage() : null}
            {props.style.Text ? showText() : null}
        </>);
    } */

    return (
        <TouchableHighlight 
            underlayColor={appStyles.underlayColor}
            onPress={onPress}
            style={props.style.Touchable}
        >
            <>
            <View style={props.style.View}>
                {props.style.Image ? showImage() : null}
                {props.style.Text ? showText() : null}
            </View>
            {props.style.ImageView ? 
            <View style={props.style.ImageView}>
                {showImageInView()}
            </View> : null}
            </>
        </TouchableHighlight>
    )
}