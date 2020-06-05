import React from "react";
import { TouchableHighlight, Text, View, ScrollView } from "react-native";
import appStyles from "./AppStyles";
import STDMenu from "./STDMenu";

export default function Trichomoniasis(props) {
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}
    >
      <STDMenu
        title={props.getLocalizedText("symptoms")}
        info={props.getLocalizedText("trichomoniasisSymptoms")}
      />
      <STDMenu
        title={props.getLocalizedText("testing")}
        info={props.getLocalizedText("trichomoniasisDiagnosis")}
      />
      <STDMenu
        title={props.getLocalizedText("treatment")}
        info={props.getLocalizedText("trichomoniasisTreatment")}
      />
      <STDMenu
        title={props.getLocalizedText("consequences")}
        info={props.getLocalizedText("trichomoniasisConsequences")}
      />
      <STDMenu
        title={props.getLocalizedText("safeSex")}
        info={props.getLocalizedText("trichomoniasisSafeSex")}
      />
    </ScrollView>
  );
}
