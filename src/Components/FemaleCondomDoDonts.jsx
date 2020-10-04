import React from 'react';
import {TouchableHighlight, Text, View, ScrollView, Button} from 'react-native';
import translate from 'app/Components/getLocalizedText';
import appStyles from './AppStyles';
import BetterMenu from './BetterMenu';
import FemaleCondomDoDont from './FemaleCondomDoDont';

export default function FemaleCondomDoDonts(props) {
  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}
    >
      <Text
        style={{
          fontSize: appStyles.regularFontSize + 2,
          justifyContent: 'center',
          color: appStyles.blueColor,
          fontWeight: 'bold',
        }}
      >
        {translate('FemaleCondomDoDont')}
      </Text>

      {FemaleCondomDoDont().map((fcdd, key) => (
        <BetterMenu
          style={appStyles.FemaleCondomMenu}
          key={key}
          text={translate(fcdd.dodont)}
        />
      ))}
    </ScrollView>
  );
}
