import {Text, TouchableHighlight, View} from "react-native";
import appStyles from "./AppStyles";
import * as Haptics from "expo-haptics";
import React from 'react';

export default function WelcomeUserBanner(props) {
    return (
        <View style={{width: '100%'}}>
            <TouchableHighlight style={appStyles.WelcomeUserBanner.TouchableHighlight} onPress={
                () => {
                    Haptics.selectionAsync().then();
                    props.logout();
                }
            }
                                underlayColor={appStyles.pinkColor}>
                <Text style={{
                    color: "white",
                    fontSize: appStyles.regularFontSize,
                    fontWeight: 'bold',
                }}>{`Welcome${props.fullName ? ' ' + props.fullName.split(' ')[0] : ''}`}</Text>
            </TouchableHighlight>
        </View>
    )
}