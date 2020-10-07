import { Text, TouchableHighlight, View, Alert } from "react-native";
import appStyles, { borderRadius, shadow } from "./AppStyles";
import React from "react";
import { Feather } from "@expo/vector-icons";
import translate from "./getLocalizedText";

export default function AppointmentMenu(props) {
  const { name, date, time, address, extra, eventId } = props.appointments?.val();

  AsyncAlert = () => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        translate("RemoveAppointment"),
        translate("WantToRemoveAppointment"),
        [
          { text: translate("Yes"), onPress: () => resolve(true) },
          { text: translate("No"), onPress: () => resolve(false) },
        ],
        { cancelable: false }
      );
    });
  };

  return (
    <TouchableHighlight
      style={{
        margin: 15,
        paddingLeft: 10,
        justifyContent: "center",
        backgroundColor: "white",
        ...shadow,
        width: appStyles.win.width * 0.95,
        borderRadius: borderRadius,
      }}
      underlayColor={appStyles.underlayColor}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}
      >
        <View>
          <Text
            style={{
              color: appStyles.blueColor,
              fontSize: appStyles.regularFontSize + 7,
              fontWeight: "bold",
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              color: appStyles.greyColor,
              fontSize: appStyles.regularFontSize - 3,
            }}
          >
            {address}
          </Text>
          <Text
            style={{
              color: appStyles.greyColor,
              fontSize: appStyles.regularFontSize - 3,
            }}
          >
            {date}
          </Text>
          <Text
            style={{
              color: appStyles.greyColor,
              fontSize: appStyles.regularFontSize - 3,
            }}
          >
            {time}
          </Text>
          <Text
            style={{
              color: appStyles.greyColor,
              fontSize: appStyles.regularFontSize - 3,
            }}
          >
            {extra}
          </Text>
        </View>
        <TouchableHighlight
          style={{ position: 'absolute', right: appStyles.win.width * 0.05, bottom: appStyles.win.height * 0.07 }}
          underlayColor='transparent'
          onPress={() => {
            AsyncAlert().then((response) => {
              response ? props.removeAppointment(props.appointments?.key, eventId) : null;
            });
          }}
        >
          <Feather name='trash' size={40} color='#eb1800' />
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
  );
}
