import {Image, Text, View, Animated} from 'react-native';
import React from "react";
import genieImage from "./heart-balloon-image.png"
import appStyles from './AppStyles'
import ConfettiCannon from 'react-native-confetti-cannon';
import * as Haptics from "expo-haptics";

export default class LetsGetStarted extends React.Component {

    constructor(props) {
        super(props);
        this.confettiVibration();
        this._start();
        setTimeout(() => this.props.getNextScreen(), 4000)

    }

    state = {
        fadeValue: new Animated.Value(0)
    };

    _start = () => {
        Animated.timing(this.state.fadeValue, {
            toValue: 1,
            duration: 1000
        }).start();
    };

    confettiVibration = () => {
        Haptics.selectionAsync().then(() => {
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
        });
    };

    render() {
        return (
            <Animated.View style={{opacity: this.state.fadeValue, ...appStyles.container}}>
                <ConfettiCannon count={100} origin={{x: -10, y: 0}} fallSpeed={2500}/>
                <View style={{
                    paddingTop: appStyles.win.height * 0.10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute'}}>
                    <Text style={appStyles.titleBlue}>Let's Get Started</Text>
                    <Image style={{margin: 100, width: appStyles.win.height * 0.15, height: appStyles.win.height * 0.15}} source={genieImage}/>
                    <Text style={{...appStyles.paragraphText, textAlign: 'center', paddingTop: 100, color: 'black'} }>Parenting isn't Easy.</Text>
                    <Text style={{...appStyles.paragraphText, textAlign: 'center'} }>Here to Help.</Text>
                </View>
            </Animated.View>
        );
    }
}
