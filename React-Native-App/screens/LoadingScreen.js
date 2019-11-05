import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';


const Loading = props => {

    return (
        <View style={styles.container} onStartShouldSetResponder={() => props.onTap()}>
            <Text style={styles.presentationText}>Keeping Moms & Infants Healthy </Text>
            <Image source={require('../assets/images/mother-holding-baby.png')} style={styles.picture}/>
        </View> 

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    picture: {
        position: 'absolute',
        width: 400,
        height: 400,
        resizeMode:'contain',
        justifyContent: 'center', 
        alignItems: 'center',
    },
    presentationText: {
        marginTop: '120%',
        fontSize: 25,
        color: '#9BB5F0', 
        fontWeight: 'bold',
        shadowOffset:{  width: 2,  height: 2, },
        shadowColor: '#FDED97',
        shadowOpacity: 1.0,
    }
});

export default Loading;