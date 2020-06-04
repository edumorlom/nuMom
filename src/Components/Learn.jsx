import React from 'react';
import {ScrollView, View} from "react-native";
import Resources from './Resources'
import LearnSelectionButton from "./LearnSelectionButton";
import GestureRecognizer from "react-native-swipe-gestures";
import breastfeeding from "../../assets/breastfeeding.png";
import heart from "../../assets/heart.png";
import nature from "../../assets/nature.png";
import butterfly from "../../assets/butterfly.png";

export default function STDInfo(props) {
  return (
    <View>
      <LearnSelectionButton
        text={props.getLocalizedText("breastFeedingMiami")}
        subtitle={props.getLocalizedText("learnBreastFeeding")}
        icon={breastfeeding}
        onPress={() => props.setLowerPanelContent("breastFeedingMiami")}
      />
      <LearnSelectionButton
        text={props.getLocalizedText("loveYourChild")}
        subtitle={props.getLocalizedText("learnToLove")}
        icon={heart}
        onPress={() => {
          props.setLowerPanelContent("loveYourChild");
        }}
      />
      <LearnSelectionButton
        text={props.getLocalizedText("kidPsychologist")}
        subtitle={props.getLocalizedText("learnToBeThere")}
        icon={nature}
        onPress={() => {
          props.setLowerPanelContent("kidPsychologist");
        }}
      />
      <LearnSelectionButton
        text={props.getLocalizedText("STDAwareness")}
        subtitle={props.getLocalizedText("learnSTDs")}
        icon={butterfly}
        onPress={() => {
          props.setLowerPanelContent("STDInfo");
        }}
      />
    </View>

/* let resourceButtons = Resources().map((resource, key) =>
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
) */
  );
}
