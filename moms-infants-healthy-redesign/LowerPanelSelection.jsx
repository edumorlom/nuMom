import React from 'react';
import babyBottle from "./baby-bottle.png";
import clinicLogo from "./clinic-logo.png";
import lightBulb from "./light-bulb.png";
import WelcomeUserBanner from "./WelcomeUserBanner";
import SelectionButton from "./SelectionButton";
import GestureRecognizer from "react-native-swipe-gestures";


export default function LowerPanelSelection(props) {
    return (
        <GestureRecognizer
            onSwipeUp={() => props.setFullPanel(true)}
            onSwipeDown={() => props.setFullPanel(false)}
            config={{velocityThreshold: 0.4, directionalOffsetThreshold: 100}}
            style={{width: '100%', height: '100%', paddingTop: '10%' , alignItems: 'center'}}>
            <WelcomeUserBanner fullName={props.fullName} logout={props.logout}/>
            <SelectionButton text={"Find Care"} icon={clinicLogo}
                             onPress={() => props.setLowerPanelContent('findCare')}/>
            <SelectionButton text={"Learn"} icon={babyBottle}
                             onPress={() => {props.setLowerPanelContent('selection'); alert('Coming Soon! Please check again later.')}}/>
            <SelectionButton text={"Tips & Tricks"} icon={lightBulb}
                             onPress={() => {props.setLowerPanelContent('selection'); alert('Coming Soon! Please check again later.')}}/>
        </GestureRecognizer>
    )
}