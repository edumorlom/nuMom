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
import translate from './getLocalizedText';

STD.sort();
export default function STDSelection(props) {
  const onPress = (std) => {
    std.name.sort();
    props.navigation.navigate('STDInfo', {
      name: translate(std.name),
      symptoms: std.symptoms,
      diagnosis: std.diagnosis,
      treatment: std.treatment,
      consequences: std.consequences,
      safeSex: std.safeSex,
    });
    std.name.sort();
    std.sort();
  };
  std.name.sort();
  STD.sort();
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
    </ScrollView>
  );
}
