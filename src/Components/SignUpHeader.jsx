import {Image, Text, TouchableHighlight, View} from "react-native";
import appStyles from "./AppStyles";
import React from "react";
import goBackImg from "../../assets/go-back-arrow.png";
import * as Haptics from "expo-haptics";

export default function SignUpHeader(props) {

    let goBack = () => {
        Haptics.selectionAsync().then();
        props.goBack();
    };


    return (
        <View style = {{flexDirection: 'row', width: '100%', height: appStyles.win.height * 0.1}}>
                    <TouchableHighlight
                        onPress={goBack}
                        underlayColor={'transparent'}
                        style = {{
                            height: appStyles.win.height * 0.04,
                            marginTop: '12%',
                            marginLeft: '3%',
                            width:  appStyles.win.width * 0.07
                        }}
                         >
                
                
                   
                        <Image style={{height: appStyles.win.width * 0.06, width: appStyles.win.width * 0.06}} source={goBackImg}/>
                
                    </TouchableHighlight>
                </View>


    )



}