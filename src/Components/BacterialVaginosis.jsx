import React from "react";
import { TouchableHighlight, Text, View, ScrollView } from "react-native";
import appStyles from "./AppStyles";
import STDMenu from "./STDMenu";

export default function BacterialVaginosis(props) {
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}
    >
      <STDMenu
        title={props.getLocalizedText("symptoms")}
        info={props.getLocalizedText("bacterialVaginosisSymptoms")}
      />
      <STDMenu
        title={props.getLocalizedText("testing")}
        info={props.getLocalizedText("bacterialVaginosisDiagnosis")}
      />
      <STDMenu
        title={props.getLocalizedText("treatment")}
        info={props.getLocalizedText("bacterialVaginosisTreatment")}
      />
      <STDMenu
        title={props.getLocalizedText("consequences")}
        info={props.getLocalizedText("bacterialVaginosisConsequences")}
      />
      <STDMenu
        title={props.getLocalizedText("safeSex")}
        info={props.getLocalizedText("bacterialVaginosisSafeSex")}
      />
    </ScrollView>
  );
}
