import React from "react";
import { ScrollView } from "react-native";
import ResourceSelectionButton from "./ResourceSelectionButton";
import DocumentSelectionButton from "./DocumentUploadButton";
import AppointmentSelectionButton from "./AppointmentSelectionButton";
import appointments from "../../assets/appointments.png";
import ResourcesInfo from "./ResourcesInformation";

export default function Resources(props) {
  let resourceButtons = ResourcesInfo().map((resource, key) => (
    <ResourceSelectionButton
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
      icon={appointments}
      onPress={() => {
        props.setLowerPanelContent("Appointment");
      }}
    />
  );

  let documentUploadButton = (
    <DocumentSelectionButton
      title={props.getLocalizedText("documents")}
      subtitle={props.getLocalizedText("documentsSubtitle")}
      onPress={() => {
        props.setLowerPanelContent("documents");
      }}
    />
  );


  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}
    >
      {resourceButtons}
      {documentUploadButton}
      {appointmentButton}
    </ScrollView>
  );
}
