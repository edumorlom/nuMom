import {Text, TouchableHighlight, View} from "react-native";
import appStyles, {borderRadius, shadow} from "./AppStyles";
import PanelButton from "./PanelButton";
import React from "react";
import babyBottle from "./baby-bottle.png";
import clinicLogo from "./clinic-logo.png";
import lightBulb from "./light-bulb.png";
import * as Haptics from "expo-haptics";


export default function LowerPanel(props) {
    return (
        <View style={appStyles.lowerPanel}>
            <View style={{ width: '100%', paddingBottom: '5%', backgroundColor: 'white'}}>
                <TouchableHighlight style={{backgroundColor: appStyles.blueColor,
                    shadowColor: shadow.shadowColor,
                    shadowOffset: {width: 4, height: 4},
                    shadowOpacity: 0.6,
                    justifyContent: 'center',
                    borderTopRightRadius: borderRadius,
                    borderBottomRightRadius: borderRadius,
                    flexDirection: 'row',
                    marginRight: '35%',
                }} onPress={() => {Haptics.selectionAsync().then(); props.logout();}}>
                <Text style={{color: "white",
                    fontSize: 23,
                    fontWeight: 'bold',
                    padding: '5%'
                }}>{`Welcome${props.fullName ? ' ' + props.fullName.split(' ')[0] : '!'}`}</Text>
            </TouchableHighlight>
            </View>
            <PanelButton text={"Learn"} icon={babyBottle}/>
            <PanelButton text={"Find Care"} icon={clinicLogo}/>
            <PanelButton text={"Tips & Tricks"} icon={lightBulb}/>
        </View>
    );
}