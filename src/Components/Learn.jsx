import React from 'react';
import {TouchableHighlight, Text, View, ScrollView} from 'react-native';
import appStyles from './AppStyles';
import SelectionButton from './SelectionButton';
import STDAwareness from '../../assets/std-awareness.png';
import translate from './getLocalizedText';
import FemaleCondom from '../../assets/FC.png';
import BirthControl from '../../assets/BirthControl.png';

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
      <SelectionButton
        style={appStyles.ImageOnRightSelectionButton}
        text={translate('BirthControl')}
        subtext={translate('BirthControlSubtext')}
        icon={BirthControl}
        onPress={() => {
          props.navigation.navigate('BirthControlMainScreen');
        }}
      />
    </ScrollView>
  );
}
