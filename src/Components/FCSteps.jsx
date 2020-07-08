import React from "react";
import { TouchableHighlight, Text, View, ScrollView, Button } from "react-native";
import appStyles from "./AppStyles";
import SelectionButton from "./SelectionButton";
import translate from "app/Components/getLocalizedText";
import FC from "../../assets/FC.png";

export default function FCSteps(props) {
  let onPress = () => {
    props.getNextScreen();
  };
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}
    >
      <Button title="Steps" onPress={onPress} />
    </ScrollView>
  );
}
