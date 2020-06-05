import React from "react";
import { TouchableHighlight, Text, View, ScrollView } from "react-native";
import appStyles from "./AppStyles";
import STDMenu from "./STDMenu";

export default function Gonorrhea(props) {
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}
    >
      <STDMenu
        title={props.getLocalizedText("symptoms")}
        info={props.getLocalizedText("gonorrheaSymptoms")}
      />
      <STDMenu
        title={props.getLocalizedText("testing")}
        info={props.getLocalizedText("gonorrheaDiagnosis")}
      />
      <STDMenu
        title={props.getLocalizedText("treatment")}
        info={props.getLocalizedText("gonorrheaTreatment")}
      />
      <STDMenu
        title={props.getLocalizedText("consequences")}
        info={props.getLocalizedText("gonorrheaConsequences")}
      />
      <STDMenu
        title={props.getLocalizedText("safeSex")}
        info={props.getLocalizedText("gonorrheaSafeSex")}
      />
    </ScrollView>
  );
}
