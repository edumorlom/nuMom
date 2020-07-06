import { Image, Text, TouchableHighlight, View } from "react-native";
import appStyles from "./AppStyles";
import React from "react";
import goBackImg from "../../assets/go-back-arrow.png";
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
    if (content === "FCInfo")
      return translate("FCInfo");
  };


  return (
    <GestureRecognizer //The clinics section is slow on the swipe, I suspect it is because of the amount of clinics it is loading
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
        <TouchableHighlight
          onPress={goBack}
          underlayColor={"transparent"}
          style={{
            left: appStyles.win.width * 0.03,
            width: appStyles.win.width * 0.1,
            height: appStyles.win.width * 0.08,
          }}
        >
          <Image
            style={{
              height: appStyles.win.width * 0.06,
              width: appStyles.win.width * 0.06,
            }}
            source={goBackImg}
          />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={onPress}
          underlayColor={"transparent"}
          style={{ width: appStyles.win.width * 0.8, height: appStyles.win.width * 0.08, }}
        >
          <Text
            style={{
              ...appStyles.paragraphText,
              textAlign: "center",
              width: appStyles.win.width * 0.8,

            }}
          >
            {getCurrentHeaderTitle()}
          </Text>
        </TouchableHighlight>
        {props.lowerPanelContent === "findCare" ?
          <TouchableHighlight
            onPress={props.setFilterToShow}
            underlayColor={"transparent"}
            style={{
              right: appStyles.win.width * 0.00,
              width: appStyles.win.width * 0.1,
              height: appStyles.win.width * 0.08,
            }}
          >
            <Image
              style={{
                left: appStyles.win.width * 0.008,
                height: appStyles.win.width * 0.085,
                width: appStyles.win.width * 0.085,
              }}
              source={filterButton}
            />
          </TouchableHighlight>
          : <Text style={{ width: appStyles.win.width * 0.1 }}> </Text>}
        {/* <View style={{width: appStyles.win.width * 0.1 }}>  <Text> </Text> </View> */}
      </View>
    </GestureRecognizer>
  );
}
