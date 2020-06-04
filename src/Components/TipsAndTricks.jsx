import React from 'react';
import {ScrollView} from "react-native";
import clinicLogo from '../../assets/clinic-logo.png'
import TipResources from './TipResources'
import LearnSelectionButton from "./LearnSelectionButton";



export default function Learn(props) {

    let resourceButtons = TipResources().map((resource, key) =>
        <LearnSelectionButton key={key}
                                     icon={resource.icon}
                                     onPress={() => {
                                         props.setClinicToView(clinicLogo);
                                         props.setLowerPanelContent('clinicInfo');
                                     }} resource={resource}/>);

    return (
        <ScrollView contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}>
            {resourceButtons}
        </ScrollView>
    )
}