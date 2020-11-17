import React from 'react';
import {Text, View, Linking} from 'react-native';
import Button from './Button';
import translate from './getLocalizedText';
import appStyles from './AppStyles';

const WICScreen = () => {
  let onPress = () => {
    Linking.openURL('https://www.fns.usda.gov/wic/wic-how-apply');
  };

  return (
    <View style={appStyles.contentContainer}>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: '85%',
        }}
      >
        <Button
          style={appStyles.button}
          text={translate('linkToWIC')}
          onPress={onPress}
        />
      </View>
    </View>
  );
};
export default WICScreen;
