import React from 'react';
import {ScrollView, Text} from "react-native";
import ClinicSelectionButton from "./ClinicSelectionButton";
import appStyles from './AppStyles'



export default function FindCareListClinics(props) {

    let clinicsButtons = props.clinics.map((clinic, key) =>
        <ClinicSelectionButton key={key} onPress={() => {
            props.setClinicToView(clinic);
            props.setLowerPanelContent('clinicInfo');
        }
    }
                               clinic={clinic}/>);

    return (
        <ScrollView contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}>
            <Text style={{...appStyles.paragraphText, margin: '5%'}}>Find Medical Care</Text>
            {clinicsButtons}
        </ScrollView>
    )
}