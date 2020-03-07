import {Image, Text} from "react-native";
import appStyles from "./styles";
import React from "react";
import * as Haptics from "expo-haptics";
import GestureRecognizer from "react-native-swipe-gestures";
import swipeUpGif from "./swipeup-gif.png";

export default function SwipeUp(props){

    let onSwipeUp = () => {
        Haptics.selectionAsync().then();
        props.onSwipeUp();
    };

    return (
        <GestureRecognizer
            onSwipeUp={ () => onSwipeUp()}
            config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
            style={{position: 'absolute', width: appStyles.win.width, paddingTop: appStyles.win.height * 0.2, bottom: '5%', alignItems: 'center'}}>
            <Image style={{width: 30, height: 30, margin: 10}} source={swipeUpGif}/>
            <Text style={{...appStyles.paragraphText, color: appStyles.blueColor, textAlign: 'center'}}>{props.text}</Text>
        </GestureRecognizer>
    )
}