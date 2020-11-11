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
      onPress={() => props.navigation.navigate("WICChecklist")}
    />
  );

  let locationsButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text="Locations" 
      subtext="Find a WIC office near you."
      icon={facilities}
      onPress={() => props.navigation.navigate("WICLocations")}
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
  return (
    <ChecklistButton
      style={appStyles.ImageOnRightSelectionButton}
      text="Government issued ID" 
      subtext="Its important!"
      onPress={() => props.navigation.navigate("WICLocations")}
      >
    </ChecklistButton>
  )
}

export const wicLocations = () => {
  return (
    <Text>Locations</Text>
  )
}

