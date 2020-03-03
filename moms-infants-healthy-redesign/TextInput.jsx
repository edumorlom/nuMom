import React from "react";
import {TextInput as TextBox, View} from 'react-native'
import appStyles from "./AppStyles";

export default function TextInput(props){
    return (
        <View style={appStyles.TextInput.View}>
            <TextBox style={appStyles.TextInput.TextInput}
                     keyboardType={props.keyboardType ? props.keyboardType : "default"}
                     secureTextEntry={props.type === 'password'}
                     autoCapitalize='none'
                     placeholder={props.placeholder}
                     onChangeText={props.onChangeText}/>
        </View>
    )
}