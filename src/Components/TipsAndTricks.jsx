import React from "react";
import { ScrollView } from "react-native";
import TipResources from "./TipResources";
import TipsSelectionButton from "./TipsSelectionButton";
import AppointmentSelectionButton from "./AppointmentSelectionButton";
import document from "../../assets/document.png";

export default function Tips(props) {
  let resourceButtons = TipResources().map((resource, key) => (
    <TipsSelectionButton
      key={key}
      icon={resource.icon}
      onPress
      resource={resource}
    />
  ));
  let appointmentButton = (
    <AppointmentSelectionButton
      title={props.getLocalizedText("appointment")}
      subtitle={props.getLocalizedText("appointmentInfo")}
      icon={document}
      onPress={() => {
        props.setLowerPanelContent("Appointment");
      }}
    />
  );
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}
    >
      {resourceButtons}
      {appointmentButton}
    </ScrollView>
  );
}
