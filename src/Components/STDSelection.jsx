import React from 'react';
import {
  ScrollView,
} from 'react-native';
import appStyles from './AppStyles';
import SelectionButton from './SelectionButton';
import STD from './STD';
import translate from './getLocalizedText';

export default function STDSelection(props) {
  const onPress = (std) => {
    props.navigation.navigate('STDInfo', {
      name: translate(std.name),
      symptoms: std.symptoms,
      diagnosis: std.diagnosis,
      treatment: std.treatment,
      consequences: std.consequences,
      safeSex: std.safeSex,
      website: std.website,
    });
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
    </ScrollView>
  );
}
