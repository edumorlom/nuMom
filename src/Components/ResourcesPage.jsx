import React from 'react';
import {ScrollView} from "react-native";
import ResourcesInfo from './ResourcesInformation'
import ResourceSelectionButton from "./ResourceSelectionButton";



export default function Resources(props) {

    let resourceButtons = ResourcesInfo().map((resource, key) =>
        <ResourceSelectionButton key={key}
                                     icon={resource.icon}
                                     onPress
                                     resource={resource}/>);

    return (
        <ScrollView contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}>
            {resourceButtons}
        </ScrollView>
    )
}