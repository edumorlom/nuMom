import {Image, Text, View, Animated} from 'react-native';
import React, { useState, useEffect } from "react";
import heartBalloon from "../../assets/heart-balloon.png"
import appStyles from './AppStyles'
import ConfettiCannon from 'react-native-confetti-cannon';
import * as Haptics from "expo-haptics";

export default LetsGetStarted = (props) => {

    const [fadeValue, setFadeValue] = useState(new Animated.Value(0));

    useEffect(() => {
        confettiVibration();
        _start();
        setTimeout(() => props.getNextScreen(), 4000)
    }, [])

    let _start = () => {
        Animated.timing(fadeValue, {
            toValue: 1,
            duration: 1000
        }).start();
    };

    let confettiVibration = () => {
        Haptics.selectionAsync().then(() => {
            Haptics.selectionAsync().then(() => {
                Haptics.selectionAsync().then(() => {
                    Haptics.selectionAsync().then(() => {
                        Haptics.selectionAsync().then(() => {
                            Haptics.selectionAsync().then(() => {
                                Haptics.selectionAsync().then(() => {
                                    Haptics.selectionAsync().then(() => {
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    };

    
        return (
            <Animated.View style={{opacity: fadeValue, ...appStyles.container}}>
                <ConfettiCannon count={150} origin={{x: -10, y: 0}} fallSpeed={2500} colors={[appStyles.blueColor, appStyles.pinkColor]}/>
                <View style={{
                    paddingTop: appStyles.win.height * 0.10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute'}}>
                    <Text style={appStyles.titleBlue}>{props.getLocalizedText("letsGetStarted")}</Text>
                    <Image style={{margin: 100, width: appStyles.win.height * 0.15, height: appStyles.win.height * 0.15}} source={heartBalloon}/>
                    <Text style={{...appStyles.paragraphText, textAlign: 'center', paddingTop: 100, color: 'black'} }>{props.getLocalizedText('parentingIsntEasy')}</Text>
                    <Text style={{...appStyles.paragraphText, textAlign: 'center'} }>{props.getLocalizedText("hereToHelp")}</Text>
                </View>
            </Animated.View>
        );
    
}
