import React from "react";
import { TouchableHighlight, Text, View, ScrollView } from "react-native";
import appStyles from "./AppStyles";
import SelectionButton from "./SelectionButton";
import butterfly from "../../assets/butterfly.png";
import translate from "app/Components/getLocalizedText";
import FC from "../../assets/FC.png";

export default function learn(props) {
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}
    >
      <SelectionButton
        style={appStyles.ImageOnRightSelectionButton}
        text={translate("STDAwareness")}
        subtext={translate("learnSTDs")}
        icon={butterfly}
        onPress={() => {
          props.setLowerPanelContent("STDSelection");
        }}
      />
      <SelectionButton
        style={appStyles.ImageOnRightSelectionButton}
        text={translate("SafeSex")}
        subtext={translate("FCSubtext")}
        icon={FC}
        onPress={() => {
          props.setLowerPanelContent("FemaleCondom");
        }}
      />
    </ScrollView>
  );
}
