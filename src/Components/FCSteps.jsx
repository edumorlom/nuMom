import React from "react";
import { TouchableHighlight, Text, View, ScrollView, Button } from "react-native";
import appStyles from "./AppStyles";
import BetterMenu from "./BetterMenu";
import translate from "app/Components/getLocalizedText";
import FCStep from "./FCStep"

export default function FCSteps(props) {
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}
    >
      <Text
        style={{
          fontSize: appStyles.regularFontSize + 1,
          justifyContent: "center",
          color: appStyles.blueColor,
          fontWeight: "bold",
          textAlign: 'center',
          paddingBottom: 15
        }}>
        {translate("FCHowTo")}</Text>

      {FCStep().map((fcs, key) => (
        <BetterMenu
          style={appStyles.FCMenuImage}
          key={key}
          text={translate(fcs.step)}
          icon={fcs.icon}
        />
      ))}

    </ScrollView>
  );
}
