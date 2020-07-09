import { Text, TouchableHighlight, View, Alert } from "react-native";
import appStyles, { borderRadius, shadow } from "./AppStyles";
import React from "react";
import { Feather } from "@expo/vector-icons";
import translate from "app/Components/getLocalizedText";

export default function AppointmentMenu(props) {
<<<<<<< HEAD
  const { name, date, time, address, extra } = props.appointments.val();
=======
  const { name, date, time, address, extra, eventId } = props.appointments.val();
>>>>>>> 7de06b158b4696b0c2ca9c5a46ddc6b57dec0ad1

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
          underlayColor='transparent'
          onPress={() => {
            AsyncAlert().then((response) => {
<<<<<<< HEAD
              response ? props.removeAppointment(props.appointments.key) : null;
=======
              response ? props.removeAppointment(props.appointments.key, eventId) : null;
>>>>>>> 7de06b158b4696b0c2ca9c5a46ddc6b57dec0ad1
            });
          }}
        >
          <Feather name='trash' size={40} color='#eb1800' />
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
  );
}
