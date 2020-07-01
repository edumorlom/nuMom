import React from "react";
import { TouchableHighlight, Text, View, ScrollView } from "react-native";
import appStyles from "./AppStyles";
import STDMenu from "./STDMenu";
import STD from "./STD";
import translate from "app/Components/getLocalizedText";

export default function STDInfo(props) {
  console.log(props.STDToView);
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}
    >
      <STDMenu
        title={translate("symptoms")}
        info={translate(props.STDToView.symptoms)}
      />
      <STDMenu
        title={translate("testing")}
        info={translate(props.STDToView.diagnosis)}
      />
      <STDMenu
        title={translate("treatment")}
        info={translate(props.STDToView.treatment)}
      />
      <STDMenu
        title={translate("consequences")}
        info={translate(props.STDToView.consequences)}
      />
      <STDMenu
        title={translate("safeSex")}
        info={translate(props.STDToView.safeSex)}
      />
    </ScrollView>
  );
}
