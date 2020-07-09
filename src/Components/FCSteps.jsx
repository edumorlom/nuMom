import React from "react";
import { TouchableHighlight, Text, View, ScrollView, Button } from "react-native";
import appStyles from "./AppStyles";
<<<<<<< HEAD
import SelectionButton from "./SelectionButton";
import translate from "app/Components/getLocalizedText";
import FC from "../../assets/FC.png";

export default function FCSteps(props) {
  let onPress = () => {
    props.getNextScreen();
  };
=======
import BetterMenu from "./BetterMenu";
import translate from "app/Components/getLocalizedText";
import FCStep from "./FCStep"

export default function FCSteps(props) {
>>>>>>> 7de06b158b4696b0c2ca9c5a46ddc6b57dec0ad1
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}
    >
<<<<<<< HEAD
      <Button title="Steps" onPress={onPress} />
=======
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

>>>>>>> 7de06b158b4696b0c2ca9c5a46ddc6b57dec0ad1
    </ScrollView>
  );
}
