import React from 'react';
import {TouchableHighlight, Text, View, ScrollView} from 'react-native';
import translate from 'app/Components/getLocalizedText';
import appStyles from './AppStyles';
import SelectionButton from './SelectionButton';
import butterfly from '../../assets/butterfly.png';
import FemaleCondom from '../../assets/FC.png';

export default function learn(props) {
  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}
    >
      <SelectionButton
        style={appStyles.ImageOnRightSelectionButton}
        text={translate('STDAwareness')}
        subtext={translate('learnSTDs')}
        icon={butterfly}
        onPress={() => {
          props.setLowerPanelContent('STDSelection');
        }}
      />
      <SelectionButton
        style={appStyles.ImageOnRightSelectionButton}
        text={translate('ProtectedSex')}
        subtext={translate('FemaleCondomSubtext')}
        icon={FemaleCondom}
        onPress={() => {
          props.setLowerPanelContent('FemaleCondom');
        }}
      />
    </ScrollView>
  );
}
