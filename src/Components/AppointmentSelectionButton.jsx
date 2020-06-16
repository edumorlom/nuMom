import { Image, Linking, Text, TouchableHighlight, View } from "react-native";
import appStyles, { borderRadius, greyColor, shadow } from "./AppStyles";
import React from "react";
import * as Haptics from "expo-haptics";

export default function AppointmentSelectionButton(props) {
  let onPress = () => {
    Haptics.selectionAsync().then();
    props.onPress();
  };

  return (
    <TouchableHighlight
      underlayColor={appStyles.underlayColor}
      onPress={onPress}
      style={{
        margin: 5,
        padding: 20,
        backgroundColor: "white",
        ...shadow,
        minHeight: appStyles.win.height * 0.2,
        maxHeight: appStyles.win.height * 0.3,
        width: appStyles.win.width * 0.95,
        borderColor: greyColor,
        borderRadius: borderRadius,
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <React.Fragment>
        <View style={{ height: "100%", width: "70%", marginRight: 20 }}>
          <Text
            style={{
              color: appStyles.blueColor,
              fontSize: appStyles.regularFontSize,
              fontWeight: "bold",
            }}
          >
            {props.title}
          </Text>
          <Text
            style={{
              color: appStyles.greyColor,
              fontSize: appStyles.regularFontSize,
            }}
          >
            {props.subtitle}
          </Text>
        </View>
        <View style={{ height: "100%", width: "7%", justifyContent: "center" }}>
          <Image style={{ width: 65, height: 65 }} source={props.icon} />
        </View>
      </React.Fragment>
    </TouchableHighlight>
  );
}
