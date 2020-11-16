import React from 'react';
import {Text, View, Linking, ScrollView} from 'react-native';
import SelectionButton from './SelectionButton';
import ChecklistButton from './ChecklistButton';
import Button from './Button';
import translate from './getLocalizedText';
import appStyles from './AppStyles';
import breastfeeding from '../../assets/breastfeeding.png';
import checklist from '../../assets/check5list2.jpg';
import facilities from '../../assets/facilities.png';

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
/*
{objects.map((appointments, index) => {
  return (
    <AppointmentMenu
      key={index}
      appointments={appointments}
      removeAppointment={removeAppointment}
    />
  );
})}
*/
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

export const wicLocations = () => {
  return <Text>Locations</Text>;
};
