import { Image, Text, TouchableHighlight, View, Alert, } from "react-native";
import appStyles, {
  borderRadius,
  greyColor,
  pinkColor,
  shadow,
} from "./AppStyles";
import React, { useEffect } from "react";
import * as Haptics from "expo-haptics";
import { Feather } from '@expo/vector-icons';


export default function AppointmentMenu(props) {

  const { name, date, time, address, extra } = props.appointments.val();

  let onPress = () => {
    Haptics.selectionAsync().then();
    props.onPress();
  };

  const AsyncAlert = () => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        props.getLocalizedText("RemoveAppointment"),
        props.getLocalizedText('WantToRemoveAppointment'),
        [
          { text: props.getLocalizedText("Yes"), onPress: () => resolve(true) },
          { text: props.getLocalizedText("No"), onPress: () => resolve(false) },
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
        //minHeight: appStyles.win.height * 0,
        //maxHeight: appStyles.win.height * 0.2,
        width: appStyles.win.width * 0.95,
        borderRadius: borderRadius,
      }}
      underlayColor={appStyles.underlayColor}
    >
      <View style={{ alignItems: "center", flexDirection: "row", justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 15 }}>
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
        <TouchableHighlight underlayColor="transparent" onPress={() => {
          AsyncAlert().then((response) => {
            response ? props.deleteAppointment(props.appointments.key) : null;
          })
        }}>
          <Feather name="trash" size={40} color='#eb1800' />
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
  );
}
