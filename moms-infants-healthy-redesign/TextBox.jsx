import React from "react";
import {TextInput, View} from 'react-native'
import appStyles from "./AppStyles";

export default function TextBox(props){
    return (
        <View style={appStyles.TextInput.View}>
            <TextInput style={appStyles.TextInput.TextInput}
                       keyboardType={props.keyboardType ? props.keyboardType : "default"}
                       secureTextEntry={props.type === 'password'}
                       placeholder={props.placeholder} onChangeText={props.onChangeText}/>
        </View>
    )
}