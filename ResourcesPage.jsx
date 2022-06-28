import React from 'react';
import {View, ScrollView} from 'react-native';
import SelectionButton from './SelectionButton';
import appointments from '../../assets/appointments.png';
import document from '../../assets/document.png';
import doctor from '../../assets/doctor.png';
import breastfeeding from '../../assets/breastfeeding.png';
import heart from '../../assets/heart.png';
import babyVaccine from '../../assets/immunization.png';
import translate from './getLocalizedText';
import appStyles from './AppStyles';

export default function Resources(props) {
  const wicButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text={translate('applyWIC')}
      subtext={translate('WICSubtext')}
      icon={breastfeeding}
      onPress={() => {
        props.navigation.navigate('WICScreen');
      }}
    />
  );

  const medicaidButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text={translate('applyMedicaid')}
      subtext={translate('medicaidSubtext')}
      icon={heart}
      onPress={() => {
        props.navigation.navigate('MedicaidScreen');
      }}
    />
  );

  const immunizationButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text={translate('immunization')}
      subtext={translate('immunizationInfo')}
      icon={babyVaccine}
      onPress={() => {
        props.navigation.navigate('ImmunizationScreen');
      }}
    />
  );

  const appointmentButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text={translate('appointment')}
      subtext={translate('appointmentInfo')}
      icon={appointments}
      onPress={() => {
        props.navigation.navigate('Appointment');
      }}
    />
  );

  const documentUploadButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text={translate('documents')}
      subtext={translate('documentsSubtitle')}
      icon={document}
      onPress={() => {
        props.navigation.navigate('Documents');
      }}
    />
  );

  const namesReferenceButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text={translate('NameReference')}
      subtext={translate('ReferenceSubtitle')}
      icon={doctor}
      onPress={() => {
        props.navigation.navigate('ReferenceNames');
      }}
    />
  );

  return (
    <View style={appStyles.learnAndResourceTabContentContainer}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}
      >
        {wicButton}
        {medicaidButton}
        {appointmentButton}
        {documentUploadButton}
        {immunizationButton}
        {namesReferenceButton}
      </ScrollView>
    </View>
  );
}
