import {React, useEffect} from 'react';
import {
  ScrollView,
} from 'react-native';

import translate from './getLocalizedText';
import clinicLogo from '../../assets/clinic-logo.png';
import shelterLogo from '../../assets/shelter-logo.png';
import SelectionButton from './SelectionButton';
import appStyles from './AppStyles';
import { useMapToggle } from './SharedFuncs';

export default function Facilities(props) {
  
  return (
    <ScrollView
        contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        width: appStyles.win.width
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
    </ScrollView>
  );
}
