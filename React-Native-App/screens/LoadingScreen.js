import React from 'react';
import { View, ImageBackground, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const Loading = props => {
    return (

        <View style={styles.container} onStartShouldSetResponder={() => props.onTap()}>
            <ImageBackground  source={require('../assets/mom-welcome.png')} style={styles.picture} imageStyle={{opacity:0.2}}>
                    <Text style={styles.letters}>Keeping Moms</Text>
                    <Text style={styles.lettersAnd}>&</Text>
                    <View style={styles.seperator}/>
                    <Text style={styles.letters}>Infants Healthy</Text>
            </ImageBackground>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:10,
        marginBottom:10,
    },
    picture: {
        width: "100%",
        height: "100%",
    },
    letters: {
        color: Colors.OrangeColor,
        fontSize: 58,
        alignSelf: 'center'
    },
    lettersAnd: {
        color: Colors.OrangeColor,
        fontSize: 58,
        alignSelf: 'flex-end',
        padding: 10
    },
    seperator: {
        width: '100%',
        height: '70%',
    },
});

export default Loading;