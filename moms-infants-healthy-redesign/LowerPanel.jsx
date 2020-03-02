import { View} from "react-native";
import appStyles from "./AppStyles";
import WelcomeUserBanner from './WelcomeUserBanner'
import PanelButton from "./PanelButton";
import React from "react";
import babyBottle from "./baby-bottle.png";
import clinicLogo from "./clinic-logo.png";
import lightBulb from "./light-bulb.png";


export default function LowerPanel(props) {
    return (
        <View style={appStyles.lowerPanel}>
            <WelcomeUserBanner fullName={props.fullName} logout={props.logout}/>
            <PanelButton text={"Learn"} icon={babyBottle}/>
            <PanelButton text={"Find Care"} icon={clinicLogo}/>
            <PanelButton text={"Tips & Tricks"} icon={lightBulb}/>
        </View>
    );
}