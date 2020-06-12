import React from "react";
import { ScrollView, View, StyleSheet, Button } from "react-native";
import AppointmentMenu from "./AppointmentMenu";

export default function Appointment(props) {
  let newAppointmentButton = (
    <AppointmentMenu place={props.getLocalizedText("appointment")} />
  );
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}
    >
      <View></View>
      <View>
        <Button
          title={props.getLocalizedText("wantNewAppointment")}
          onPress={() => {
            props.setLowerPanelContent("NewAppointment");
          }}
        />
      </View>
      {newAppointmentButton}
    </ScrollView>
  );
}
