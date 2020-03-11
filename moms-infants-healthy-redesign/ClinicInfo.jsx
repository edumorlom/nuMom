import {View, Linking, WebView} from "react-native";
import React from "react";
import ClinicSelectionButton from "./ClinicSelectionButton";
import ActionButton from "./ActionButton";
import LowerPanelHeader from "./LowerPanelHeader";
import directionsArrow from './directions-arrow.png'


export default function ClinicInfo(props){

    let getDirections = () => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${props.clinic.coordinate.latitude},${props.clinic.coordinate.longitude}`;
        const label = 'Custom Label';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });

        Linking.openURL(url);
    };


    let call = () => {
        Linking.openURL('tel:' + props.clinic.phoneNumber)
    };

    let visitSite = () => {
        Linking.openURL('http://' + props.clinic.website)
    };


    return (
            <View style={{overflow: 'hidden', alignItems: 'center', maxWidth: '100%'}}>
                {/*<LowerPanelHeader onPress={() => props.setLowerPanelContent('findCare')}/>*/}
                <ClinicSelectionButton clinic={props.clinic} icon={directionsArrow} onPress={getDirections}/>
                <ActionButton mainAction={"Visit Site"} subAction={props.clinic.website.split('/')[0]} onPress={visitSite}/>
                <ActionButton mainAction={"Call"} subAction={props.clinic.phoneNumber} onPress={call}/>
            </View>
    )
}