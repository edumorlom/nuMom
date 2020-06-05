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
        text={"Gonorrhea"}
        onPress={() => {
          props.setLowerPanelContent("Gonorrhea");
        }}
      />
      <STDSelectionButton
        text={"Chlamydia"}
        onPress={() => {
          props.setLowerPanelContent("STDInfo");
        }}
      />
      <STDSelectionButton
        text={"Human Papillomavirus (HPV)"}
        onPress={() => {
          props.setLowerPanelContent("STDInfo");
        }}
      />
      <STDSelectionButton
        text={"Genital Herpes"}
        onPress={() => {
          props.setLowerPanelContent("STDInfo");
        }}
      />
      <STDSelectionButton
        text={"Syphilis"}
        onPress={() => {
          props.setLowerPanelContent("STDInfo");
        }}
      />
      <STDSelectionButton
        text={"Bacterial Vaginosis"}
        onPress={() => {
          props.setLowerPanelContent("STDInfo");
        }}
      />
      <STDSelectionButton
        text={"Trichomoniasis"}
        onPress={() => {
          props.setLowerPanelContent("STDInfo");
        }}
      />
      <STDSelectionButton
        text={"HIV/AIDS"}
        onPress={() => {
          props.setLowerPanelContent("STDInfo");
        }}
      />
    </ScrollView>
  );
}
