import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {getPreciseDistance} from 'geolib';
import * as Location from 'expo-location';
import Map from './Map';
import LowerPanel from './LowerPanel';
import appStyles from './AppStyles';
import CancelFilterButton from './Button';
import {getRef} from '../Firebase';
import filterImage from '../../assets/delete-filter.png';

export default Homepage = (props) => {
  const [fullPanel, setFullPanel] = useState(true);
  const [clinics, setClinics] = useState([]);
  const [sortedClinics, setSortedClinics] = useState(null);
  const [shelters, setShelters] = useState([]);
  const [filters, setFilters] = useState([10000, 'All']);
  const [clinicToView, setClinicToView] = useState(null);
  const [shelterToView, setShelterToView] = useState(null);
  const [STDToView, setSTDToView] = useState(null);
  const [lowerPanelContent, setLowerPanelContent] = useState('selection');

  useEffect(() => {
    fetchResources(); // Can only call one function inside useEffect when dealing with asyncs
  }, []);

  // This is a holder function for fetching the facilities (clinics and shelters) asynchronously
  let fetchResources = async () => {
    sortClinics(await fetchClinics()); // Sorts the fetched clinics
    setShelters(await fetchShelters()); // Stores the fetched shelters, you could sort them by copying the logic from sortClinics
  };

  let fetchClinics = async () =>
    new Promise((resolve, reject) => {
      const clinicsRef = getRef('Clinics');
      clinicsRef.once('value', (snapshot) => {
        resolve(snapshot.val());
      });
    });

  let fetchShelters = async () =>
    new Promise((resolve, reject) => {
      const sheltersRef = getRef('Shelters');
      sheltersRef.once('value', (snapshot) => {
        resolve(snapshot.val());
      });
    });

  let sortClinics = async (clinics) => {
    try {
      const position = await Location.getCurrentPositionAsync({});
      const Clinics = clinics; // For mutation, cant mutate param
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      Clinics.forEach((clinic) => {
        // Returns a precise distance between the two coordinates given (Clinic & User)
        const dist = getPreciseDistance(clinic.coordinate, {
          latitude,
          longitude,
        });
        const distanceInMiles = Number(((dist / 1000) * 0.621371).toFixed(2)); // Convert meters to miles with 2 decimal places
        clinic.distance = distanceInMiles; // store the distance as a property of clinic
      });
      Clinics.sort((a, b) => a.distance - b.distance); // Sort by lowest distance
      setClinics(Clinics);
      setSortedClinics(Clinics);
      // SortedClinics is never changed, where as clinics does get changed
    } catch (err) {
      console.error(err);
    }
  };

  const goBack = () => {
    const content = lowerPanelContent;

    switch (content) {
      case 'selection':
        break;
      case 'findCare':
        setLowerPanelContent('facilities');
        break;
      case 'shelters':
        setLowerPanelContent('facilities');
        break;
      case 'clinicInfo':
        setLowerPanelContent('findCare');
        break;
      case 'shelterInfo':
        setLowerPanelContent('shelters');
        break;
      case 'learn':
        setLowerPanelContent('selection');
        break;
      case 'STDSelection':
        setLowerPanelContent('learn');
        break;
      case 'resources':
        setLowerPanelContent('selection');
        break;
      case 'STDInfo':
        setLowerPanelContent('STDSelection');
        break;
      case 'Appointment':
        setLowerPanelContent('resources');
        break;
      case 'NewAppointment':
        setLowerPanelContent('Appointment');
        break;
      case 'Immunization':
        setLowerPanelContent('resources');
        break;
      case 'NewImmunization':
        setLowerPanelContent('Immunization');
        break;
      case 'documents':
        setLowerPanelContent('resources');
        break;
      case 'FemaleCondom':
        setLowerPanelContent('learn');
        break;
      case 'ReferenceNames':
        setLowerPanelContent('resources');
        break;
      case 'AddReferenceNames':
        setLowerPanelContent('ReferenceNames');
        break;
      case 'facilities':
        setLowerPanelContent('selection');
        break;
      default:
        throw new Error('That is not one of the state elements in Homepage');
    }
  };

  return (
    <View style={appStyles.container}>
      <Map
        onPress={() => setFullPanel(false)} // This does not work, explanation at the bottom **
        setFullPanel={setFullPanel}
        clinicToView={clinicToView}
        shelterToView={shelterToView}
        setClinicToView={setClinicToView}
        setShelterToView={setShelterToView}
        setLowerPanelContent={setLowerPanelContent}
        clinics={clinics}
        shelters={shelters}
      />
      {/* Compare current filters with default filters, if different show reset filter button */}
      {JSON.stringify(filters) !== JSON.stringify([10000, 'All']) && (
        <CancelFilterButton
          style={appStyles.CancelFilterButton}
          icon={filterImage}
          onPress={() => {
            setClinics(sortedClinics);
            setFilters([10000, 'All']);
          }}
        />
      )}
      {/* <SOSButton /> */}
      <LowerPanel
        setFullPanel={() => setFullPanel(!fullPanel)}
        fullPanel={fullPanel}
        fullName={props.fullName}
        logout={props.logout}
        clinics={clinics}
        sortedClinics={sortedClinics}
        shelters={shelters}
        clinicToView={clinicToView}
        shelterToView={shelterToView}
        STDToView={STDToView}
        setSTDToView={setSTDToView}
        setClinicToView={setClinicToView}
        setShelterToView={setShelterToView}
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
};

/* ** Changing the fullPanel hook/variable in the Homepage does not work because we are using the fullPanel from the 
LowerPanel.jsx to move the lowerPanel. This is bacause using the fullPanel from Homepage had a bug where any
change to the fullPanel variable would move the lowerPanel (like if a function tried setting lowerPanel to true, 
  and it was already up it would move down, where it should only move down if you set it to false) */
