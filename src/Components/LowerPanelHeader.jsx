import { Image, Text, TouchableHighlight, View, StyleSheet } from "react-native";
import appStyles from "./AppStyles";
import React from "react";
import goBackImg from "../../assets/go-back-arrow.png";
import BackButton from "./Button"
import Button from "./Button";
import filterButton from "../../assets/Filter.png";
import * as Haptics from "expo-haptics";
import GestureRecognizer from "react-native-swipe-gestures";
import translate from "app/Components/getLocalizedText";

export default function LowerPanelHeader(props) {
  let onPress = () => {
    Haptics.selectionAsync().then();
    props.onPress();
  };
  let goBack = () => {
    Haptics.selectionAsync().then();
    props.goBack();
  };

  let getCurrentHeaderTitle = () => {
    let content = props.lowerPanelContent;

    if (content === "findCare" || content === "clinicInfo")
      return translate("findCare");
    if (content === "learn")
      return translate("learn");
    if (content === "STDSelection")
      return translate("STDSelection");
    if (content === "resources")
      return translate("resources");
    if (content === "STDInfo")
      return translate("STDInfo");
    if (content === "Appointment")
      return translate("appointment");
    if (content === "NewAppointment")
      return translate("newAppointment");
    if (content === "documents")
      return translate("documents");
    if (content === "FemaleCondom")
      return translate("FC");


    switch (content) {
      case 'findCare': return translate(content);
      case 'clinicInfo': return translate("findCare");
      case 'learn': return translate(content);
      case 'STDSelection': return translate(content);
      case 'resources': return translate(content);
      case 'STDInfo': return translate(content);
      case 'Appointment': return translate("appointment");
      case 'NewAppointment': return translate("newAppointment");
      case 'documents': return translate(content);
      case 'FemaleCondom': return translate("FC")
      default: throw new Error('That is not one of the state elements in SignUp')
    }
  };


  return (
    <GestureRecognizer
      onSwipeUp={() => props.setFullPanel(true)}
      onSwipeDown={() => props.setFullPanel(false)}
      config={{ velocityThreshold: 0.4, directionalOffsetThreshold: 100 }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: appStyles.win.height * 0.05,
          margin: "3%",
        }}
      >
        <BackButton
          style={backButton}
          icon={goBackImg}
          underlayColor={"transparent"}
          onPress={goBack}
        />
        <Button
          style={HeaderTitle}
          text={getCurrentHeaderTitle()}
          underlayColor={"transparent"}
          onPress={onPress}
        />
        {props.lowerPanelContent === "findCare" ?
          <Button
            style={FilterButton}
            icon={filterButton}
            underlayColor={"transparent"}
            onPress={props.setFilterToShow}
          />
          : <Text style={{ width: appStyles.win.width * 0.1 }}>
            {/* This Text component is used to fill space */}
          </Text>}
      </View>
    </GestureRecognizer>
  );
}

//Styles
const backButton = StyleSheet.create({
  Touchable: {
    left: appStyles.win.width * 0.03,
    width: appStyles.win.width * 0.1,
    height: appStyles.win.width * 0.08,

  },
  Image: {
    height: appStyles.win.width * 0.06,
    width: appStyles.win.width * 0.06,

  },
});


const HeaderTitle = StyleSheet.create({
  Touchable: {
    width: appStyles.win.width * 0.8,
    height: appStyles.win.width * 0.08,

  },
  Text: {
    ...appStyles.paragraphText,
    textAlign: "center",
    width: appStyles.win.width * 0.8,

  },
});

const FilterButton = StyleSheet.create({
  Touchable: {
    width: appStyles.win.width * 0.1,
    height: appStyles.win.width * 0.08,

  },
  Image: {
    left: appStyles.win.width * 0.008,
    height: appStyles.win.width * 0.085,
    width: appStyles.win.width * 0.085,

  },
});