import { View, Animated } from "react-native";
import appStyles from "./AppStyles";
import React, { useState, useEffect } from "react";
import LowerPanelSelection from "./LowerPanelSelection";
import FindCare from "./FindCare";
import ClinicInfo from "./ClinicInfo";
import LowerPanelHeader from "./LowerPanelHeader";
import Learn from "./Learn";
import Resources from "./ResourcesPage";
import STDInfo from "./STDInfo";
import Appointment from "./Appointment";
import NewAppointment from "./NewAppointment";
import STDSelection from "./STDSelection";
import Documents from "./Documents";

export default LowerPanel = props => {
  

  const [filterToShow, setFilterToShow] = useState(false);
  const fullPanel = props.fullPanel;
  const [moveAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0
  
  useEffect(() => {  //Substitute ComponentDidMount
    //movePanel(true) //Move up
    
  },[])

  useEffect(() => {  //Substitute ComponentDidUpdate
    movePanel(fullPanel)
  }, [fullPanel])

  let movePanel = (moveUp) => {
    if (moveUp) {
      //MoveUp
      Animated.timing(moveAnim, {
        toValue: 0,
        duration: 150,
      }).start();
    }
    else if (!moveUp) {
    //Move Down
      Animated.timing(moveAnim, {
        toValue: appStyles.lowerPanel.bottom,
        duration: 150,
      }).start();
    }
  };

  showContent = () => {
    if (props.lowerPanelContent === "findCare") {
      return (
        <FindCare clinics={props.clinics} sortedClinics={props.sortedClinics} setClinicToView={props.setClinicToView} setClinics={props.setClinics} setFilters={props.setFilters} filters={props.filters} filterToShow = {filterToShow} setLowerPanelContent={props.setLowerPanelContent} getLocalizedText={props.getLocalizedText}
        />
      );
    } else if (props.lowerPanelContent === "clinicInfo") {
      return (
        <ClinicInfo clinic={props.clinicToView} setLowerPanelContent={props.setLowerPanelContent} getLocalizedText={props.getLocalizedText}
        />
      );
    } else if (props.lowerPanelContent === "learn") {
      return (
        <Learn setLowerPanelContent={props.setLowerPanelContent} getLocalizedText={props.getLocalizedText}
        />
      );
    } else if (props.lowerPanelContent === "STDSelection") {
      return (
        <STDSelection setLowerPanelContent={props.setLowerPanelContent} getLocalizedText={props.getLocalizedText} setSTDToView={props.setSTDToView}
        />
      );
    } else if (props.lowerPanelContent === "resources") {
      return (
        <Resources setLowerPanelContent={props.setLowerPanelContent} getLocalizedText={props.getLocalizedText}
        />
      );
    } else if (props.lowerPanelContent === "STDInfo") {
      return (
        <STDInfo setLowerPanelContent={props.setLowerPanelContent} getLocalizedText={props.getLocalizedText} STDToView={props.STDToView}
        />
      );
    } else if (props.lowerPanelContent === "Appointment") {
      return (
        <Appointment setLowerPanelContent={props.setLowerPanelContent} getLocalizedText={props.getLocalizedText}
        />
      );
    } else if (props.lowerPanelContent === "NewAppointment") {
      return (
        <NewAppointment setLowerPanelContent={props.setLowerPanelContent} getLocalizedText={props.getLocalizedText}
        />
      );
    } else if (props.lowerPanelContent === "documents") {
      return (
        <Documents setLowerPanelContent={props.setLowerPanelContent} getLocalizedText={props.getLocalizedText}
        />
      );
    } else {
      return (
        <LowerPanelSelection fullName={props.fullName} logout={props.logout} setFullPanel={props.setFullPanel} fullPanel={props.fullPanel} setLowerPanelContent={props.setLowerPanelContent} getLocalizedText={props.getLocalizedText} setScreen={props.setScreen}
        />
      );
    }
  };


    return (
      <Animated.View style={{ ...appStyles.lowerPanel, bottom: moveAnim, overflow: "hidden" }}>
        {props.lowerPanelContent !== "selection" && (
          <LowerPanelHeader onPress={props.setFullPanel} setFilterToShow = {() => setFilterToShow(!filterToShow)} goBack={props.goBack} lowerPanelContent={props.lowerPanelContent} getLocalizedText={props.getLocalizedText} setFullPanel={props.setFullPanel} fullPanel={props.fullPanel}
          />
        )}
        {showContent()}
      </Animated.View>
    );
  }

