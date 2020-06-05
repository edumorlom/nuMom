import React from "react";
import { TouchableHighlight, Text, View, ScrollView } from "react-native";
import appStyles from "./AppStyles";
import STDMenu from "./STDMenu";

export default function HPV(props) {
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}
    >
      <STDMenu
        title={props.getLocalizedText("symptoms")}
        info={props.getLocalizedText("HPVSymptoms")}
      />
      <STDMenu
        title={props.getLocalizedText("testing")}
        info={props.getLocalizedText("HPVDiagnosis")}
      />
      <STDMenu
        title={props.getLocalizedText("treatment")}
        info={props.getLocalizedText("HPVTreatment")}
      />
      <STDMenu
        title={props.getLocalizedText("consequences")}
        info={props.getLocalizedText("HPVConsequences")}
      />
      <STDMenu
        title={props.getLocalizedText("safeSex")}
        info={props.getLocalizedText("HPVSafeSex")}
      />
    </ScrollView>
  );
}
