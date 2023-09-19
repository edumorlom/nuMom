import React from 'react';
import {ScrollView} from 'react-native';
import appStyles from './AppStyles';
import SelectionButton from './SelectionButton';
import STDAwareness from '../../assets/std-awareness.png';
import translate from './getLocalizedText';
import FemaleCondom from '../../assets/FC.png';

export default function learn(props) {
  return (
    <ScrollView
      contentContainerStyle={appStyles.learnAndResourceTabContentContainer}
    >
      <SelectionButton
        style={appStyles.ImageOnRightSelectionButton}
        text={translate('STDAwareness')}
        subtext={translate('learnSTDs')}
        icon={STDAwareness}
        onPress={() => {
          props.navigation.navigate('STDSelection');
        }}
      />
      <SelectionButton
        style={appStyles.ImageOnRightSelectionButton}
        text={translate('ProtectedSex')}
        subtext={translate('FemaleCondomSubtext')}
        icon={FemaleCondom}
        onPress={() => {
          props.navigation.navigate('FemaleCondomMainScreen');
        }}
      />
    </ScrollView>
  );
}
