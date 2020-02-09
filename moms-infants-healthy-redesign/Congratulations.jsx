import {Image, Keyboard, Vibration, StyleSheet, Text, TouchableWithoutFeedback, View, Animated} from 'react-native';
import React from "react";
import congratulationsImage from "./congratulations-image.png"
import appStyles from './AppStyles'
import Button from "./Button";
import ConfettiCannon from 'react-native-confetti-cannon';


export default class Congratulations extends React.Component {

    constructor(props) {
        super(props);
        this.moveAnimation = new Animated.ValueXY({ x: 0, y: 1000 });

        setTimeout(
            () => {Animated.spring(this.moveAnimation, {
                toValue: {x: 0, y: 100},
            }).start()}, 50
        )

    }

    render() {
        Vibration.vibrate([200], false);
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={appStyles.container}>
                    <View style={{
                        paddingTop: '40%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                    }}>
                        <View>
                            <Text style={appStyles.titleBlue}>Congratulations!</Text>
                        </View>
                        <Animated.View style={[styles.heartImage, this.moveAnimation.getLayout()]}>
                            <Image style={{width: 150, height: 150}} source={congratulationsImage}/>
                        </Animated.View>
                    </View>
                    <View style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: 40
                    }}>
                        <Button text={"Continue"} onClick={()=> this.props.getNextScreen()}/>
                    </View>
                    <ConfettiCannon count={100} origin={{x: -10, y: 0}} fallSpeed={1000}/>

                </View>
            </TouchableWithoutFeedback>
        );
    }
}



const styles = StyleSheet.create({
    heartImage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'greenyellow',
        borderRadius: 100,
        width: 100,
        height: 100,
    }
});
