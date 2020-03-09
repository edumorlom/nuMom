import React from 'react';
import babyBottle from "./baby-bottle.png";
import clinicLogo from "./clinic-logo.png";
import lightBulb from "./light-bulb.png";
import WelcomeUserBanner from "./WelcomeUserBanner";
import WhitePanelButton from "./WhitePanelButton";
import GestureRecognizer from "react-native-swipe-gestures";


export default function LowerPanelSelection(props) {
    return (
        <GestureRecognizer
            onSwipeUp={() => props.setFullPanel(true)}
            onSwipeDown={() => props.setFullPanel(false)}
            config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
            style={{width: '100%', alignItems: 'center',}}>
            <WelcomeUserBanner fullName={props.fullName} logout={props.logout}/>
            <WhitePanelButton text={"Find Care"} icon={clinicLogo}
                              onPress={() => props.setLowerPanelContent('findCare')}/>
            <WhitePanelButton text={"Learn"} icon={babyBottle}
                              onPress={() => props.setLowerPanelContent('learn')}/>
            <WhitePanelButton text={"Tips & Tricks"} icon={lightBulb}
                              onPress={() => props.setLowerPanelContent('tipsAndTricks')}/>
        </GestureRecognizer>
    )
}