<<<<<<< HEAD
import React from "react";
import { TouchableHighlight, Text, View, ScrollView } from "react-native";
import appStyles from "./AppStyles";
import SelectionButton from "./SelectionButton";
import butterfly from "../../assets/butterfly.png";
import STDAwareness from "../../assets/std-awareness.png";
import translate from "./getLocalizedText";
import FemaleCondom from "../../assets/FC.png";
=======
import React from 'react';
import {TouchableHighlight, Text, View, ScrollView} from 'react-native';
import appStyles from './AppStyles';
import SelectionButton from './SelectionButton';
import butterfly from '../../assets/butterfly.png';
import translate from './getLocalizedText';
import FemaleCondom from '../../assets/FC.png';
>>>>>>> c7aa10f4d527f5516563630e3ffb69fa0879d82a

export default function learn(props) {
  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}
    >
      <SelectionButton
        style={appStyles.ImageOnRightSelectionButton}
<<<<<<< HEAD
        text={translate("STDAwareness")}
        subtext={translate("learnSTDs")}
        icon={STDAwareness}
=======
        text={translate('STDAwareness')}
        subtext={translate('learnSTDs')}
        icon={butterfly}
>>>>>>> c7aa10f4d527f5516563630e3ffb69fa0879d82a
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
