import React from 'react';
import {
  TouchableHighlight,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import translate from './getLocalizedText';
import clinicLogo from '../../assets/clinic-logo.png';
import shelterLogo from '../../assets/shelter-logo.png';
import nature from '../../assets/nature.png';
import SelectionButton from './SelectionButton';
import appStyles from './AppStyles';

export default function Facilities(props) {
  const handleMapToggle = () => {
    props.setMapToggle(); // Call the setMapToggle callback function to set MapToggle to true
    
  };
  return (
    <ScrollView
    setMapToggle={() => setMapToggle(true)}
      contentContainerStyle={{
        alignItems: 'center',
        width: appStyles.win.width,
      }}
    >
      <SelectionButton
        style={appStyles.PanelSelectionButton}
        text={translate('findCare')}
        icon={clinicLogo}
        onPress={() => props.setLowerPanelContent('findCare')}
      />
      <SelectionButton
        style={appStyles.PanelSelectionButton}
        text={translate('shelters')}
        icon={shelterLogo}
        onPress={() => props.setLowerPanelContent('shelters')}
      />
      <SelectionButton
        style={appStyles.PanelSelectionButton}
        text={translate('mapDisplay')}
        icon={nature}
        onPress={handleMapToggle}
      />
    </ScrollView>
  );
}
