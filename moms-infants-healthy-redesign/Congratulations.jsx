import {Image, Text, View} from 'react-native';
import React from "react";
import genieImage from "./congratulations-image.png"
import appStyles from './styles'
import ConfettiCannon from 'react-native-confetti-cannon';
import * as Haptics from "expo-haptics";
import FadeInView from "react-native-fade-in-view";

export default class Congratulations extends React.Component {

    constructor(props) {
        super(props);
        this.confettiVibration();
        setTimeout(() => this.props.getNextScreen(), 5000)

    }

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
            <FadeInView duration={1000} style={appStyles.container}>
                <ConfettiCannon count={100} origin={{x: -10, y: 0}} fallSpeed={2500}/>
                <View style={{
                    paddingTop: appStyles.win.height * 0.10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute'}}>
                    <Text style={appStyles.titleBlue}>Let's Get Started</Text>
                    <FadeInView duration={1000}>
                        <View style={{padding: '20%'}}>
                            <Image style={{width: appStyles.win.height * 0.15, height: appStyles.win.height * 0.15}} source={genieImage}/>
                        </View>
                    </FadeInView>
                    <Text style={{...appStyles.paragraphText, textAlign: 'center', paddingTop: 100, color: 'black'} }>Parenting isn't Easy.</Text>
                    <Text style={{...appStyles.paragraphText, textAlign: 'center'} }>Here to Help.</Text>
                </View>
            </FadeInView>
        );
    }
}
