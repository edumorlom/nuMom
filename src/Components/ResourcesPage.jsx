import React from 'react';
import {View, ScrollView} from 'react-native';
import SelectionButton from './SelectionButton';
import appointments from '../../assets/appointments.png';
import document from '../../assets/document.png';
import doctor from '../../assets/doctor.png';
import breastfeeding from '../../assets/breastfeeding.png';
import heart from '../../assets/heart.png';
import vaccineMedicine from '../../assets/vaccination.png';
import translate from './getLocalizedText';
import appStyles from './AppStyles';

export default function Resources(props) {
  const wicButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text={translate('resourcesWIC')}
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
      text={translate('resourcesMedicaid')}
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
      text={translate('resourcesImmunizations')}
      subtext={translate('immunizationsSubtext')}
      icon={vaccineMedicine}
      onPress={() => {
        props.navigation.navigate('ImmunizationScreen');
      }}
    />
  );

  const appointmentButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text={translate('resourcesAppointments')}
      subtext={translate('appointmentsSubtext')}
      icon={appointments}
      onPress={() => {
        props.navigation.navigate('Appointment');
      }}
    />
  );

  const documentUploadButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text={translate('resourcesDocuments')}
      subtext={translate('documentsSubtext')}
      icon={document}
      onPress={() => {
        props.navigation.navigate('Documents');
      }}
    />
  );

  const namesReferenceButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text={translate('resourcesReferences')}
      subtext={translate('referencesSubtext')}
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
