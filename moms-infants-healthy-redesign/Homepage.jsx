import React from 'react';
import Maps from "./Maps";
import {View} from 'react-native';
import LowerPanel from "./LowerPanel";
import SOSButton from "./SOSButton";


const styles = {
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    }
};

export default function Homepage(props) {

    return (
        <View style={styles.container}>
            <Maps/>
            <SOSButton/>
            <LowerPanel fullName={props.fullName} logout={props.logout}/>
        </View>
    )
}