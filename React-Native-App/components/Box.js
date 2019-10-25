import * as React from 'react';
import { StyleSheet, View, } from 'react-native';
import Colors from '../constants/Colors';

export default class Box extends React.Component {
    render() {
        return (
            <View style={{ ...styles.box, ...this.props.style}}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    box: {
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 30,
        backgroundColor: Colors.pinkSoft,
        margin: 10,
        padding: 10,
        width: '80%',
        height: '50%',
    }
});