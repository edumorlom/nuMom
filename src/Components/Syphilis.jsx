import React from "react";
import { TouchableHighlight, Text, View, ScrollView } from "react-native";
import appStyles from "./AppStyles";
import STDMenu from "./STDMenu";

export default function Syphilis(props) {
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}
    >
      <STDMenu
        title={props.getLocalizedText("symptoms")}
        info={props.getLocalizedText("syphilisSymptoms")}
      />
      <STDMenu
        title={props.getLocalizedText("testing")}
        info={props.getLocalizedText("syphilisDiagnosis")}
      />
      <STDMenu
        title={props.getLocalizedText("treatment")}
        info={props.getLocalizedText("syphilisTreatment")}
      />
      <STDMenu
        title={props.getLocalizedText("consequences")}
        info={props.getLocalizedText("syphilisConsequences")}
      />
      <STDMenu
        title={props.getLocalizedText("safeSex")}
        info={props.getLocalizedText("syphilisSafeSex")}
      />
    </ScrollView>
  );
}
