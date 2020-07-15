import React from "react";
import { TouchableHighlight, Text, View, ScrollView } from "react-native";
import appStyles from "./AppStyles";
import Menu from "./Menu";
import STD from "./STD";
import {STDTranslate} from "app/Components/getLocalizedText";

export default function STDInfo(props) {
  console.log(props.STDToView);
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}
    >
      <Menu
        title={STDTranslate("symptoms")}
        info={STDTranslate(props.STDToView.symptoms)}
      />
      <Menu
        title={STDTranslate("testing")}
        info={STDTranslate(props.STDToView.diagnosis)}
      />
      <Menu
        title={STDTranslate("treatment")}
        info={STDTranslate(props.STDToView.treatment)}
      />
      <Menu
        title={STDTranslate("consequences")}
        info={STDTranslate(props.STDToView.consequences)}
      />
      <Menu
        title={STDTranslate("safeSex")}
        info={STDTranslate(props.STDToView.safeSex)}
      />
    </ScrollView>
  );
}
