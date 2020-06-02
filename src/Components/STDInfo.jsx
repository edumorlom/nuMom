import React from "react";
import { TouchableHighlight, Text, View } from "react-native";
import appStyles from "./AppStyles";
import LearnSelectionButton from "./LearnSelectionButton";
import GestureRecognizer from "react-native-swipe-gestures";
import breastfeeding from "../../assets/breastfeeding.png";
import heart from "../../assets/heart.png";
import nature from "../../assets/nature.png";
import butterfly from "../../assets/butterfly.png";

export default function STDInfo(props) {
  return (
    <GestureRecognizer
      onSwipeUp={() => props.setFullPanel(true)}
      onSwipeDown={() => props.setFullPanel(false)}
      config={{ velocityThreshold: 0.4, directionalOffsetThreshold: 100 }}
      style={{ width: "100%", height: "100%", alignItems: "center" }}
    >
      <LearnSelectionButton
        text={props.getLocalizedText("breastFeedingMiami")}
        icon={breastfeeding}
        onPress={() => props.setLowerPanelContent("breastFeedingMiami")}
      />
      <LearnSelectionButton
        text={props.getLocalizedText("loveYourChild")}
        icon={heart}
        onPress={() => {
          props.setLowerPanelContent("loveYourChild");
        }}
      />
      <LearnSelectionButton
        text={props.getLocalizedText("kidPsychologist")}
        icon={nature}
        onPress={() => {
          props.setLowerPanelContent("kidPsychologist");
        }}
      />
    </GestureRecognizer>
  );
}
