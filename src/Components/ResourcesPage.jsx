import React from 'react';
import {ScrollView, Linking} from 'react-native';
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
  let wicButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text="Apply to WiC"
      subtext="Application link and tips for applying to WIC"
      icon={breastfeeding}
      onPress={() => {
        props.navigation.navigate('WICScreen');
      }}
    />
  );

  let medicaidButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text="Apply to Medicaid"
      subtext="Application link and tips for applying to Medicaid"
      icon={heart}
      onPress={() => {
        props.navigation.navigate('MedicaidScreen');
      }}
      />
  );

  let immunizationButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text={translate('immunization')}
      subtext={translate('immunizationInfo')}
      icon={babyVaccine}
      onPress={() => {
        props.setLowerPanelContent('Immunization');
      }}
    />
  );

  let appointmentButton = (
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

  let documentUploadButton = (
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

  let namesReferenceButton = (
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
    <ScrollView
      contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}
    >
      {wicButton}
      {medicaidButton}
      {documentUploadButton}
      {resourceButtons}
      {appointmentButton}
      {documentUploadButton}
      {immunizationButton}
      {namesReferenceButton}
    </ScrollView>
  );
}
