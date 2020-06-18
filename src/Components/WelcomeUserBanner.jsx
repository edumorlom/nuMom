import {Text, TouchableHighlight, View, Alert} from "react-native";
import appStyles from "./AppStyles";
import * as Haptics from "expo-haptics";
import React, { useState } from 'react';

export default WelcomeUserBanner = props => {

    let initialText = `${props.getLocalizedText('welcomeUserBanner')} ${props.fullName ? props.fullName.split(' ')[0] : ''}`;
    const [text, setText] = useState(initialText);

        return (
            
            <TouchableHighlight style={appStyles.WelcomeUserBanner.TouchableHighlight}
                                underlayColor={appStyles.pinkColor}
                                onPress={ () => { }
                                }>
                <Text style={{
                    color: "white",
                    fontSize: appStyles.regularFontSize,
                    fontWeight: 'bold'
                }}>
                    {text}</Text>
            </TouchableHighlight>
        )
    
}