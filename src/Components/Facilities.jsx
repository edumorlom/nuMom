import {React,useState} from 'react';
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
//import setMapToggle from './LowerPanel';
import { useMapToggle } from './SharedFuncs';

export default function Facilities(props) {

  const [mapToggle, setMapToggle] = useMapToggle();

  const handleMapToggle = () => {
    props.setMapToggle(); // Call the setMapToggle function passed from LowerPanel.jsx
  };
  return (
    <ScrollView
    //setMapToggle={() => setMapToggle(true)}
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
