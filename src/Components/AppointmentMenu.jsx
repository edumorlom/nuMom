import { Image, Text, TouchableHighlight, View } from "react-native";
import appStyles, {
  borderRadius,
  greyColor,
  pinkColor,
  shadow,
} from "./AppStyles";
import React from "react";
import * as Haptics from "expo-haptics";

export default function AppointmentMenu(props) {

  const {name, date, time, address, extra} = props.appointments;

  let onPress = () => {
    Haptics.selectionAsync().then();
    props.onPress();
  };

  return (
    <TouchableHighlight
      style={{
        margin: 15,
        paddingLeft: 10,
        justifyContent: "center",
        backgroundColor: "white",
        ...shadow,
        //minHeight: appStyles.win.height * 0,
        //maxHeight: appStyles.win.height * 0.2,
        width: appStyles.win.width * 0.95,
        borderRadius: borderRadius,
      }}
      underlayColor={appStyles.underlayColor}
    >
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <View>
          <Text
            style={{
              color: appStyles.blueColor,
              fontSize: appStyles.regularFontSize,
              fontWeight: "bold",
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              color: appStyles.greyColor,
              fontSize: appStyles.regularFontSize - 5,
            }}
          >
            {address}
          </Text>
          <Text
            style={{
              color: appStyles.greyColor,
              fontSize: appStyles.regularFontSize - 5,
            }}
          >
            {date}
          </Text>
          <Text
            style={{
              color: appStyles.greyColor,
              fontSize: appStyles.regularFontSize - 5,
            }}
          >
            {time}
          </Text>
          <Text
            style={{
              color: appStyles.greyColor,
              fontSize: appStyles.regularFontSize - 5,
            }}
          >
            {extra}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}
