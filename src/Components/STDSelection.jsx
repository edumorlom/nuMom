import React from 'react';
import {
  TouchableHighlight,
  Text,
  View,
  ScrollView,
  Linking,
} from 'react-native';
import {STDTranslate} from './getLocalizedText';
import appStyles from './AppStyles';
import SelectionButton from './SelectionButton';
import STD from './STD';
import STDResources from './STDResources';

export default function STDSelection(props) {
  const onPress = (std) => {
    props.setLowerPanelContent('STDInfo');
    props.setSTDToView(std);
  };
  const onPress2 = (stdr) => {
    Linking.openURL(stdr);
  };
  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}
    >
      {STD().map((std, key) => (
        <SelectionButton
          style={appStyles.STDFemaleCondomSelectionButton}
          key={key}
          text={STDTranslate(std.name)}
          onPress={() => onPress(std)}
        />
      ))}
      {STDResources().map((stdr, key) => (
        <SelectionButton
          style={appStyles.STDFemaleCondomSelectionButton}
          key={key}
          text={stdr.name}
          onPress={() => onPress2(stdr.website)}
        />
      ))}
    </ScrollView>
  );
}
