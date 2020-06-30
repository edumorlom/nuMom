import React from "react";
import { ScrollView } from "react-native";
import ResourceSelectionButton from "./ResourceSelectionButton";
import DocumentSelectionButton from "./DocumentUploadButton";
import AppointmentSelectionButton from "./AppointmentSelectionButton";
import appointments from "../../assets/appointments.png";
import ResourcesInfo from "./ResourcesInformation";
import translate from "app/Components/getLocalizedText";

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
      title={translate("appointment")}
      subtitle={translate("appointmentInfo")}
      icon={appointments}
      onPress={() => {
        props.setLowerPanelContent("Appointment");
      }}
    />
  );

  let documentUploadButton = (
    <DocumentSelectionButton
      title={translate("documents")}
      subtitle={translate("documentsSubtitle")}
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
