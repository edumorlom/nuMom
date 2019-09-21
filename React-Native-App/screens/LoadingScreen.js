import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';


const Loading = props => {
    return (

        <View style={styles.container} onStartShouldSetResponder={() => props.onTap()}>
            <Image source={require('../assets/Title-Icon.png')} style={styles.picture}/>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20
    },
    picture: {
        position: 'absolute',
        width: 350,
        height: 350,
        resizeMode:'contain',
        justifyContent: 'center', 
        alignItems: 'center',
    },
});

export default Loading;