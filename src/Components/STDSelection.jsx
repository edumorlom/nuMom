import React from 'react';
import {
  TouchableHighlight,
  Text,
  View,
  ScrollView,
  Linking,
} from 'react-native';
import appStyles from './AppStyles';
import SelectionButton from './SelectionButton';
import STD from './STD';
import STDResources from './STDResources';
import translate from './getLocalizedText';

export default function STDSelection(props) {
  let onPress = (std) => {
    props.navigation.navigate('STDInfo', {
      name: translate(std.name),
      symptoms: std.symptoms,
      diagnosis: std.diagnosis,
      treatment: std.treatment,
      consequences: std.consequences,
      safeSex: std.safeSex,
    });
  };
  let onPress2 = (stdr) => {
    Linking.openURL(stdr);
  };
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        maxWidth: '100%',
        backgroundColor: 'white',
      }}
    >
      {STD().map((std, key) => (
        <SelectionButton
          style={appStyles.STDFemaleCondomSelectionButton}
          key={key}
          text={translate(std.name)}
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
