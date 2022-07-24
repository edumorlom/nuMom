import React, {useState, useEffect} from 'react';
import {View, Linking, ScrollView} from 'react-native';
import {getPreciseDistance} from 'geolib';
import * as Location from 'expo-location';
import SelectionButton from './SelectionButton';
import ChecklistButton from './ChecklistButton';
import appStyles from './AppStyles';
import breastfeeding from '../../assets/breastfeeding.png';
import checklist from '../../assets/check5list2.jpg';
import heart from '../../assets/heart.png';
import facilities from '../../assets/facilities.png';
import LocationsMap from './LocationsMap';
import {getRef} from '../Firebase';

export const medicaidHome = (props) => {
  const toWebsite = () => {
    Linking.openURL('https://www.healthcare.gov/medicaid-chip/');
  };

  const websiteButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text="Website"
      subtext="Eligibility requirements and more."
      icon={heart}
      onPress={() => toWebsite()}
    />
  );

  const checklistButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text="Checklist"
      subtext="Don't forget to bring these things to your Medicaid appointment!"
      icon={checklist}
      onPress={() => props.navigation.navigate('MedicaidChecklist')}
    />
  );

  const locationsButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text="Locations"
      subtext="Find a Medicaid office near you."
      icon={facilities}
      onPress={() => props.navigation.navigate('MedicaidLocations')}
    />
  );
  return (
    <View style={appStyles.contentContainer}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}
      >
        {websiteButton}
        {checklistButton}
        {locationsButton}
      </ScrollView>
    </View>
  );
};

export const medicaidChecklist = () => {
  const checklist = [
    {
      text: 'Picture ID',
      subtext:
        '2 proofs of Miami/Dade County Residency if applying for Charity Care',
    },
    {
      text: 'INS Status',
      subtext:
        'Passport/I-94 card/letter explaining when and how arrived to the USA. Proof of citizenship if US citizen (Passport/Birth certificate).',
    },
    {
      text: 'Proof of Income',
      subtext:
        '4 weeks of check stubs/letter from Employer is paid cash. Notarized letter of weekly income if self-employed.',
    },
    {
      text: 'Resources',
      subtext:
        'Bank Statement (checking and/or savings). Car registration or Title, Care payment balance if any owed.',
    },
    {
      text: 'Shelter Cost',
      subtext:
        'Rent receipts/Lease or Mortgage statement. Utility bills, most current for all paid monthly/quarterly.',
    },
    {
      text: 'Newborn Items',
      subtext: 'The social security receipt and footprints of the newborn.',
    },
  ];

  return (
    <View style={appStyles.contentContainer}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}
      >
        {checklist.map((checklist, key) => (
          <ChecklistButton
            style={appStyles.ImageOnRightSelectionButton}
            text={checklist.text}
            subtext={checklist.subtext}
            key={key}
            keyIdentifier={`Medicaid${key}`} // send a prop to ChecklistButton.jsx to differentiate between different checklists and checklist items
          />
        ))}
      </ScrollView>
    </View>
  );
};

export const medicaidLocations = (props) => {
  const [fullPanel, setFullPanel] = useState(true);
  const [medicaid, setMedicaid] = useState([]);
  const [sortedMedicaid, setSortedMedicaid] = useState(null);
  const [filters, setFilters] = useState([10000, 'All']);
  const [medicaidToView, setMedicaidToView] = useState(null);
  const [shelterToView, setShelterToView] = useState(null);
  const [STDToView, setSTDToView] = useState(null);
  const [lowerPanelContent, setLowerPanelContent] = useState('selection');

  useEffect(() => {
    fetchResources(); // Can only call one function inside useEffect when dealing with asyncs
  }, []);

  // This is a holder function for fetching the facilities (clinics and shelters) asynchronously
  const fetchResources = async () => {
    sortMedicaid(await fetchMedicaid()); // Sorts the fetched Medicaid locations
  };

  const fetchMedicaid = async () =>
    new Promise((resolve, reject) => {
      let medicaidRef = getRef('Medicaid');
      medicaidRef.once('value', (snapshot) => {
        resolve(snapshot.val());
      });
    });

  const sortMedicaid = async (medicaidLocations) => {
    try {
      const position = await Location.getCurrentPositionAsync({});
      const MedicaidLocations = medicaidLocations; // For mutation, cant mutate param
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      MedicaidLocations.forEach((medicaid) => {
        // Returns a precise distance between the two coordinates given (Clinic & User)
        const dist = getPreciseDistance(medicaid.coordinate, {
          latitude,
          longitude,
        });
        const distanceInMiles = Number(((dist / 1000) * 0.621371).toFixed(2)); // Convert meters to miles with 2 decimal places
        medicaid.distance = distanceInMiles; // store the distance as a property of clinic
      });
      MedicaidLocations.sort((a, b) => a.distance - b.distance); // Sort by lowest distance
      setMedicaid(MedicaidLocations);
      setSortedMedicaid(MedicaidLocations);
      // SortedClinics is never changed, where as clinics does get changed
    } catch (err) {
      console.error(err);
    }
  };

  const getResourceName = (name) =>
    name.length > 40 ? `${name.substring(0, 40)}...` : name;

  const medicaidButtons = medicaid.map((medicaid, key) => (
    <SelectionButton
      style={appStyles.ClinicSelectionButton}
      key={key}
      text={getResourceName(medicaid.resource)}
      subtext={`${medicaid.address.street}\n${medicaid.address.city}\n${medicaid.address.state}, ${medicaid.address.zipCode}\n${medicaid.distance} miles`}
      icon={breastfeeding}
      onPress={() => {
        props.navigation.navigate('LocationsInfo', {
          location: medicaid,
        });
      }}
    />
  ));
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <View style={appStyles.container}>
        <LocationsMap
          onPress={() => setFullPanel(false)} // This does not work, explanation at the bottom **
          setFullPanel={setFullPanel}
          medicaidToView={medicaidToView}
          setMedicaidToView={setMedicaidToView}
          setLowerPanelContent={setLowerPanelContent}
          locations={medicaid}
          style={{}}
          navigation={props.navigation}
        />
      </View>
      <View style={{height: appStyles.win.height * 0.6}}>
        <ScrollView>{medicaidButtons}</ScrollView>
      </View>
    </View>
  );
};
