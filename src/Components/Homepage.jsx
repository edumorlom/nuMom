import React, { useState, useEffect } from "react";
import Map from "./Map";
import { View, AsyncStorage } from "react-native";
import LowerPanel from "./LowerPanel";
//import SOSButton from "./SOSButton";
import appStyles from "./AppStyles";
import { getPreciseDistance } from "geolib";
import CancelFilterButton from "./Button";
import { getRef } from "../Firebase";
import filterImage from "../../assets/delete-filter.png";


export default Homepage = props => {


  const [fullPanel, setFullPanel] = useState(true);
  const [clinics, setClinics] = useState([]);
  const [sortedClinics, setSortedClinics] = useState(null);
  const [filters, setFilters] = useState([10000, 'All']);
  const [clinicToView, setClinicToView] = useState(null);
  const [STDToView, setSTDToView] = useState(null);
  const [lowerPanelContent, setLowerPanelContent] = useState("selection");


  useEffect(() => {
    getSortedClinics();
  }, [])

  let getSortedClinics = async () => {
    let Clinics = await fetchClinics();
    sortClinics(Clinics);  //Sets the state with the sorted Clinics

  }

  let fetchClinics = async () => {
    return new Promise((resolve, reject) => {
      let clinicsRef = getRef("Clinics");
      clinicsRef.once('value', (snapshot) => {
        resolve(snapshot.val())
      })
    })
  }


  let sortClinics = async (clinics) => {
    try {
      let position = await getPosition();
      let Clinics = clinics;
      let latitude = position.coords.latitude
      let longitude = position.coords.longitude
      Clinics.forEach((clinic) => {
        //Returns a precise distance between the two coordinates given (Clinic & User)
        let dist = getPreciseDistance(clinic.coordinate, { latitude: latitude, longitude: longitude });
        let distanceInMiles = Number(((dist / 1000) * 0.621371).toFixed(2));  //Convert meters to miles with 2 decimal places 
        clinic.distance = distanceInMiles;
      });
      Clinics.sort((a, b) => { return a.distance - b.distance; }); //Sort by lowest distance
      setClinics(Clinics);
      setSortedClinics(Clinics);
      //SortedClinics is never changed, where as clinics does get filtered and therefore changed
    } catch (err) { console.error(err) }
  }

  let getPosition = (options) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };


  let goBack = () => {
    let content = lowerPanelContent;

    switch (content) {
      case 'selection': break;
      case 'findCare': setLowerPanelContent("selection"); break;
      case 'clinicInfo': setLowerPanelContent("findCare"); break;
      case 'learn': setLowerPanelContent("selection"); break;
      case 'STDSelection': setLowerPanelContent("learn"); break;
      case 'resources': setLowerPanelContent("selection"); break;
      case 'STDInfo': setLowerPanelContent("STDSelection"); break;
      case 'Appointment': setLowerPanelContent("resources"); break;
      case 'NewAppointment': setLowerPanelContent("Appointment"); break;
      case 'documents': setLowerPanelContent("resources"); break;
      case 'FemaleCondom': setLowerPanelContent("learn"); break;
      case 'FCInfo': setLowerPanelContent("FCInfo"); break;
      default: throw new Error('That is not one of the state elements in Homepage')
    }
  };


  return (
    <View style={appStyles.container}>
      <Map
        onPress={() => setFullPanel(false)}
        setFullPanel={setFullPanel}
        clinicToView={clinicToView}
        setClinicToView={setClinicToView}
        clinics={clinics}
      />
      {/* Compare current filters with default filters, if different show reset filter button */}
      {JSON.stringify(filters) !== JSON.stringify([10000, 'All']) &&
        <CancelFilterButton
          style={appStyles.CancelFilterButton}
          icon={filterImage}
          onPress={() => { setClinics(sortedClinics); setFilters([10000, 'All']) }} />}
      {/*<SOSButton />*/}
      <LowerPanel
        setFullPanel={() => setFullPanel(!fullPanel)}
        fullPanel={fullPanel}
        fullName={props.fullName}
        logout={props.logout}
        clinics={clinics}
        sortedClinics={sortedClinics}
        clinicToView={clinicToView}
        STDToView={STDToView}
        setSTDToView={setSTDToView}
        setClinicToView={setClinicToView}
        setClinics={setClinics}
        filters={filters}
        setFilters={setFilters}
        lowerPanelContent={lowerPanelContent}
        goBack={goBack}
        setLowerPanelContent={setLowerPanelContent}
        setScreen={props.setScreen}
      />
    </View>
  );

}
