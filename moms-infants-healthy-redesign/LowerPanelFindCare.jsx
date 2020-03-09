import React from 'react';
import {ScrollView, Text} from "react-native";
import FindCareSelectionButton from "./FindCareSelectionButton";
import appStyles from './AppStyles'



export default function LowerPanelFindCare(props) {

    let clinicsButtons = props.clinics.map((clinic, key) => <FindCareSelectionButton key={key} clinic={clinic}/>);

    return (
        <ScrollView contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}>
            <Text style={{...appStyles.paragraphText, margin: '5%'}}>Find Medical Care</Text>
            {clinicsButtons}
        </ScrollView>
    )
}