import React from "react";
import { TouchableHighlight, Text, View, ScrollView } from "react-native";
import appStyles from "./AppStyles";
import STDSelectionButton from "./STDSelectionButton";

export default function STDInfo(props) {
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}
    >
      <STDSelectionButton
        text={props.getLocalizedText("gonorrhea")}
        onPress={() => {
          props.setLowerPanelContent("Gonorrhea");
        }}
      />
      <STDSelectionButton
        text={props.getLocalizedText("chlamydia")}
        onPress={() => {
          props.setLowerPanelContent("Chlamydia");
        }}
      />
      <STDSelectionButton
        text={props.getLocalizedText("HPV")}
        onPress={() => {
          props.setLowerPanelContent("HPV");
        }}
      />
      <STDSelectionButton
        text={props.getLocalizedText("genitalHerpes")}
        onPress={() => {
          props.setLowerPanelContent("GenitalHerpes");
        }}
      />
      <STDSelectionButton
        text={props.getLocalizedText("syphilis")}
        onPress={() => {
          props.setLowerPanelContent("Syphilis");
        }}
      />
      <STDSelectionButton
        text={props.getLocalizedText("bacterialVaginosis")}
        onPress={() => {
          props.setLowerPanelContent("BacterialVaginosis");
        }}
      />
      <STDSelectionButton
        text={props.getLocalizedText("trichomoniasis")}
        onPress={() => {
          props.setLowerPanelContent("Trichomoniasis");
        }}
      />
      <STDSelectionButton
        text={props.getLocalizedText("HIVAIDS")}
        onPress={() => {
          props.setLowerPanelContent("HIVAIDS");
        }}
      />
    </ScrollView>
  );
}
