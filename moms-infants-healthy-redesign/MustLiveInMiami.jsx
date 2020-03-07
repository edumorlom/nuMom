import { Image, Text, View} from "react-native";
import appStyles from "./styles";
import React from "react";
import miamiImage from "./miami-image.png";
import Button from "./Button";
import FadeInView from "react-native-fade-in-view";

export default function MustLiveInMiami(props) {

    return (
        <FadeInView duration={1000} style={appStyles.container}>
            <View style={{
                paddingTop: appStyles.win.height * 0.10,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute'}}>
                <Text style={appStyles.titleBlack}>Please Note</Text>
                <View style={{padding: '8%'}}>
                <Image style={{width: appStyles.win.width, height: 175}} source={miamiImage}/>
                </View>
                <View style={{width: appStyles.win.width * 0.8}}>
                    <Text style={{...appStyles.paragraphText, textAlign: 'center'} }>Some Features are Only Available in the Miami Area.</Text>
                </View>
            </View>
            <View style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: '12%'
            }}>
                <Button text={"I Understand"} onClick={() => props.getNextScreen()}/>
            </View>
        </FadeInView>
    )

}