import React, {Component, useState, useEffect} from 'react';
import {Text, View, Linking, ScrollView, Image} from 'react-native';
import {getPreciseDistance} from 'geolib';
import {getRef} from '../Firebase';
import SelectionButton from './SelectionButton';
import ChecklistButton from './ChecklistButton';
import Button from './Button';
import translate from './getLocalizedText';
import appStyles from './AppStyles';
import breastfeeding from '../../assets/breastfeeding.png';
import checklist from '../../assets/check5list2.jpg';
import facilities from '../../assets/facilities.png';
import WICMap from './WICMap';

export const wicHome = (props) => {
  let toWebsite = () => {
    Linking.openURL('https://www.fns.usda.gov/wic/wic-how-apply');
  };

  let websiteButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text="Website"
      subtext="Eligibility requirements and more"
      icon={breastfeeding}
      onPress={() => toWebsite()}
    />
  );

  let checklistButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text="Checklist"
      subtext="Don't forget to bring these things to your WIC appointment!"
      icon={checklist}
      onPress={() => props.navigation.navigate('WICChecklist')}
    />
  );

  let locationsButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text="Locations"
      subtext="Find a WIC office near you."
      icon={facilities}
      onPress={() => props.navigation.navigate('WICLocations')}
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

export const wicChecklist = () => {
  let checklist = [
    {
      text: 'Family members',
      subtext: 'Each member who is applying to receive WIC must be present.',
    },
    {
      text: 'Proof of Income of all family members',
      subtext:
        'Salaries, child support, alimony, foster care payments, interest withdrawn, unemployment, compensation, or military earnings.',
    },
    {
      text: 'Proof of Current Address',
      subtext:
        "Utility bill, bank/insurance statement, voter registration card, or driver's license.",
    },
    {
      text: 'Proof of Identification for you AND for any infant or child',
      subtext:
        "Birth certificate, driver's license, crib card, military ID, photo ID, Social Security Card, voter registration, or hospital record.",
    },
    {
      text: 'Measurements for EACH woman, infant, and child.',
      subtext:
        'Height/Weight (no older than 60 days), and hemoglobin or hematocrit blood test results (not required for infants under 9 months).',
    },
    {
      text: 'Social Security Number (SSN)',
      subtext:
        'You must have the SSN for each person applying for WIC, if available.',
    },
    {
      text: 'Immunization (shot) record for each child',
      subtext:
        'You must have the Immunization (shot) record for each child applying for WIC.',
    },
  ];

  return (
    <View style={appStyles.contentContainer}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}
      >
        {checklist.map((checklist, key) => {
          return (
            <ChecklistButton
              style={appStyles.ImageOnRightSelectionButton}
              text={checklist.text}
              subtext={checklist.subtext}
              key={key}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export const wicLocations = (props) => {
  const [fullPanel, setFullPanel] = useState(true);
  const [wics, setWICS] = useState([]);
  const [sortedWICS, setSortedWICS] = useState(null);
  const [filters, setFilters] = useState([10000, 'All']);
  const [wicToView, setWICToView] = useState(null);
  const [shelterToView, setShelterToView] = useState(null);
  const [STDToView, setSTDToView] = useState(null);
  const [lowerPanelContent, setLowerPanelContent] = useState('selection');

  useEffect(() => {
    fetchResources(); // Can only call one function inside useEffect when dealing with asyncs
  }, []);

  // This is a holder function for fetching the facilities (clinics and shelters) asynchronously
  let fetchResources = async () => {
    sortWIC(await fetchWIC()); // Sorts the fetched WIC
  };

  let fetchWIC = async () => {
    return new Promise((resolve, reject) => {
      let wicRef = getRef('WIC');
      wicRef.once('value', (snapshot) => {
        resolve(snapshot.val());
      });
    });
  };

  let sortWIC = async (wicLocations) => {
    try {
      let position = await getPosition();
      let WICLocations = wicLocations; // For mutation, cant mutate param
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      WICLocations.forEach((wic) => {
        // Returns a precise distance between the two coordinates given (Clinic & User)
        let dist = getPreciseDistance(wic.coordinate, {
          latitude,
          longitude,
        });
        let distanceInMiles = Number(((dist / 1000) * 0.621371).toFixed(2)); // Convert meters to miles with 2 decimal places
        wic.distance = distanceInMiles; // store the distance as a property of clinic
      });
      WICLocations.sort((a, b) => {
        return a.distance - b.distance;
      }); // Sort by lowest distance
      setWICS(WICLocations);
      setSortedWICS(WICLocations);
      // SortedClinics is never changed, where as clinics does get changed
    } catch (err) {
      console.error(err);
    }
  };

  // Gets the current user position
  let getPosition = (options) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  let getResourceName = (name) => {
    return name.length > 40 ? `${name.substring(0, 40)}...` : name;
  };

  let wicButtons = wics.map((wic, key) => (
    <SelectionButton
      style={appStyles.ClinicSelectionButton}
      key={key}
      text={getResourceName(wic.resource)}
      subtext={`${wic.address.street}\n${wic.address.city}\n${wic.address.state}, ${wic.address.zipCode}\n${wic.distance} miles`}
      icon={breastfeeding}
      onPress={() => {
        props.navigation.navigate('WICInfo', {
          wic,
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
        <WICMap
          onPress={() => setFullPanel(false)} // This does not work, explanation at the bottom **
          setFullPanel={setFullPanel}
          wicToView={wicToView}
          setWICToView={setWICToView}
          setLowerPanelContent={setLowerPanelContent}
          wics={wics}
          style={{}}
          navigation={props.navigation}
        />
      </View>
      <View style={{height: 400}}>
        <ScrollView>{wicButtons}</ScrollView>
      </View>
    </View>
  );
};
