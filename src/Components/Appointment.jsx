import React from "react";
import { ScrollView, View, StyleSheet, Button, useState } from "react-native";
import AppointmentMenu from "./AppointmentMenu";
import NewAppointment from "./NewAppointment";

export default function Appointment(props) {
  newAppointmentButton = (
    <AppointmentMenu name={props.getLocalizedText("appointment")} />
  );

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "flex-end", maxWidth: "100%" }}
    >
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
