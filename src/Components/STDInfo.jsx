import React from "react";
import { TouchableHighlight, Text, View } from "react-native";
import appStyles from "./AppStyles";
import LearnSelectionButton from "./LearnSelectionButton";
import GestureRecognizer from "react-native-swipe-gestures";

export default function STDInfo(props) {
  return (
    <GestureRecognizer
      onSwipeUp={() => props.setFullPanel(true)}
      onSwipeDown={() => props.setFullPanel(false)}
      config={{ velocityThreshold: 0.4, directionalOffsetThreshold: 100 }}
      style={{ width: "100%", height: "100%", alignItems: "center" }}
    >
      <Text
        style={{
          color: props.color,
          fontSize: appStyles.regularFontSize - 4,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {"To Be Added"}
      </Text>
    </GestureRecognizer>
  );
}
