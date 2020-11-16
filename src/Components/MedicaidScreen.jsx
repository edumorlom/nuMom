import React from 'react';
import {Text, View, Linking, ScrollView} from 'react-native';
import SelectionButton from './SelectionButton';
import Button from './Button';
import translate from './getLocalizedText';
import appStyles from './AppStyles';
import breastfeeding from '../../assets/breastfeeding.png';
import checklist from '../../assets/check5list2.jpg';
import heart from '../../assets/heart.png';
import facilities from '../../assets/facilities.png';

const MedicaidScreen = () => {
  let toWebsite = () => {
    Linking.openURL('https://www.healthcare.gov/medicaid-chip/');
  };

  let toWebsiteButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text="Link to Medicaid site"
      subtext="Eligibility requirements and more."
      icon={heart}
      onPress={() => toWebsite()}
    />
  );

  let thingsToBringButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text="Checklist"
      subtext="Don't forget to bring these things to your Medicaid appointment!"
      icon={checklist}
      onPress={() => alert('Functionality to be implemented one day!')}
    />
  );

  let locationsButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text="Locations"
      subtext="Find a Medicaid office near you."
      icon={facilities}
      onPress={() => alert('Functionality to be implemented one day!')}
    />
  );
  return (
    <View style={appStyles.contentContainer}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}
      >
        {toWebsiteButton}
        {thingsToBringButton}
        {locationsButton}
      </ScrollView>
    </View>
  );
};
export default MedicaidScreen;
