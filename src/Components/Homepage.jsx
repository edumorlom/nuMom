import React, { useState, useEffect } from "react";
import Map from "./Map";
import { View, AsyncStorage } from "react-native";
import LowerPanel from "./LowerPanel";
import SOSButton from "./SOSButton";
import appStyles from "./AppStyles";
import Clinics from "./Clinics";
import { getPreciseDistance } from "geolib";
import CancelFilterButton from "./CancelFilterButton";

export default Homepage = props => {
  
    
  const [fullPanel, setFullPanel] = useState(true);
  const [clinics, setClinics] = useState(Clinics());
  const [sortedClinics, setSortedClinics] = useState(null);
  const [filters, setFilters] = useState([10000, 'All']);
  const [clinicToView, setClinicToView] = useState(null);
  const [STDToView, setSTDToView] = useState(null);
  const [lowerPanelContent, setLowerPanelContent] = useState("selection");

  



  useEffect( () => {
    //Put all of this in another async functions, then await for it
    

    sortClinics();
    
  },[])

  let sortClinics = async () => {
    await getPosition().then((position) => {
        let clinics = Clinics();
        clinics.forEach((clinic) => {
          let loc = position.coords;
          //Returns a precise distance between the two coordinates given (Clinic & User)
          let dist = getPreciseDistance(clinic.coordinate, { latitude: loc.latitude, longitude: loc.longitude});   
          let distanceInMiles = Number(((dist / 1000) * 0.621371).toFixed(2));  //Convert meters to miles with 2 decimal places 
          clinic.distance = distanceInMiles;
        });
        clinics.sort((a, b) => { return a.distance - b.distance; }); //Sort by lowest distance
        setClinics(clinics);
        setSortedClinics(clinics);  
        //SortedClinics is never changed, where as clinics does get filtered and therefore changed
      }).catch((err) => { console.error(err.message); });
  }

  let getPosition =  (options) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  // setFullPanel = (fullPanel) => {
  //   fullPanel && !fullPanel
  //     ? setState({ fullPanel: fullPanel })
  //     : null;
  //   !fullPanel && fullPanel
  //     ? setState({ fullPanel: fullPanel })
  //     : null;
  // };


  let goBack = () => {
    let content = lowerPanelContent;

      switch(content) {
        case 'selection':  break;
        case 'findCare': setLowerPanelContent("selection"); break;
        case 'clinicInfo': setLowerPanelContent("findCare"); break;
        case 'learn': setLowerPanelContent("selection"); break;
        case 'STDSelection': setLowerPanelContent("learn"); break;
        case 'resources': setLowerPanelContent("selection"); break;
        case 'STDInfo': setLowerPanelContent("STDSelection"); break;
        case 'Appointment': setLowerPanelContent("resources"); break;
        case 'NewAppointment': setLowerPanelContent("Appointment"); break;
        case 'documents': setLowerPanelContent("documents"); break;
        default: throw new Error('That is not one of the state elements in Homepage')
      }
  };

  
    //Clinics().forEach(clinic => console.log(clinic.services))
    //console.log(filters);
    return (
      <View style={appStyles.container}>
        <Map
          onPress={() => setFullPanel(false)}
          setFullPanel={setFullPanel}
          clinicToView={clinicToView}
          setClinicToView={setClinicToView}
          clinics={clinics}
          getLocalizedText={props.getLocalizedText}
        />
        {/* Compare current filters with default filters, if different show reset filter button */}
        {JSON.stringify(filters) !== JSON.stringify([10000, 'All']) && <CancelFilterButton  resetFilters= {() => {setClinics(sortedClinics); setFilters([10000, 'All'])}}/>}
        {/*<SOSButton />*/}
        <LowerPanel 
          setFullPanel={() => setFullPanel(!fullPanel)}
          fullPanel={fullPanel}
          fullName={props.fullName}
          logout={props.logout}
          clinics={clinics}
          sortedClinics = {sortedClinics}
          clinicToView={clinicToView}
          STDToView={STDToView}
          setSTDToView={setSTDToView}
          setClinicToView={setClinicToView}
          setClinics = {setClinics}
          filters = {filters}
          setFilters = {setFilters}
          lowerPanelContent={lowerPanelContent}
          goBack={goBack}
          setLowerPanelContent={setLowerPanelContent}
          getLocalizedText={props.getLocalizedText}
          setAppState={props.setAppState}
        />
      </View>
    );
  
}
