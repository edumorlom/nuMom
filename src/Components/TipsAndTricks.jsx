import React from 'react';
import {ScrollView} from "react-native";
import TipResources from './TipResources'
import TipsSelectionButton from "./TipsSelectionButton";



export default function Tips(props) {

    let resourceButtons = TipResources().map((resource, key) =>
        <TipsSelectionButton key={key}
                                     icon={resource.icon}
                                     onPress
                                     resource={resource}/>);

    return (
        <ScrollView contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}>
            {resourceButtons}
        </ScrollView>
    )
}