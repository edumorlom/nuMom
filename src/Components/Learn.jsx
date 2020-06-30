import React from "react";
import { TouchableHighlight, Text, View, ScrollView } from "react-native";
import appStyles from "./AppStyles";
import LearnSelectionButton from "./LearnSelectionButtonTemp";
import butterfly from "../../assets/butterfly.png";
import translate from "app/Components/getLocalizedText";

export default function learn(props) {
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}
    >
      <LearnSelectionButton
        text={translate("STDAwareness")}
        subtitle={translate("learnSTDs")}
        icon={butterfly}
        onPress={() => {
          props.setLowerPanelContent("STDSelection");
        }}
      />
    </ScrollView>
  );
}
