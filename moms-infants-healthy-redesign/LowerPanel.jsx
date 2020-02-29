import {View} from "react-native";
import appStyles from "./AppStyles";
import PanelButton from "./PanelButton";
import React from "react";
import babyBottle from "./baby-bottle.png";
import clinicLogo from "./clinic-logo.png";
import lightBulb from "./light-bulb.png";


export default function LowerPanel() {
    return (
        <View style={appStyles.BottomPanel}>
            <PanelButton text={"Learn"} icon={babyBottle}/>
            <PanelButton text={"Find Care"} icon={clinicLogo}/>
            <PanelButton text={"Tricks & Tips"} icon={lightBulb}/>
        </View>
    );
}