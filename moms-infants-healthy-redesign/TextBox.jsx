import React from "react";
import {TextInput, View} from 'react-native'
import appStyles from "./AppStyles";
import CardView from 'react-native-cardview';

export default function TextBox(props){
    return (
        <CardView
            cardElevation={2}
            cardMaxElevation={2}
            cornerRadius={5}
        >
            <TextInput style={appStyles.TextBox}
                       keyboardType={props.keyboardType ? props.keyboardType : "default"}
                       secureTextEntry={props.type === 'password'}
                       placeholder={props.placeholder} onChangeText={props.onChangeText}/>
        </CardView>
    )
}