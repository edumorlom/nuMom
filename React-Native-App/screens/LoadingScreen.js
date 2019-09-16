import React from 'react';
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Colors from '../constants/Colors';

const Loading = props => {
    return (

        <View style={styles.container} onStartShouldSetResponder={() => props.onTap()}> 
            {/* View for Text */}
            <View style={{flex:2,marginTop:3}}>
                <Text style={styles.letters}>Keeping Moms</Text>
                <Text style={styles.lettersAnd}>&</Text>
            </View>
            {/* View for image */}
            <View style={{flex:12}}>
                <Image 
                    source={require('../assets/mom-welcome.png')}
                    style={styles.picture}
                    resizeMode='contain'
                    />
            </View>
            {/* View for text on bottom */}
            <View style={{flex:2}}>
                <Text style={styles.letters}>Infants Healthy</Text>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 15,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    picture: {
        opacity: 0.2,
        width: "100%",
        height: "100%",
    },
    letters: {
        color: Colors.OrangeColor,
        fontSize: 58,
        alignSelf:'center',
    },
    lettersAnd: {
        color: Colors.OrangeColor,
        fontSize: 58,
        alignSelf:'flex-end',
        padding: 10
    }
});

export default Loading;