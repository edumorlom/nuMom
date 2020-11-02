import React from 'react';
import {Text, View, Linking} from 'react-native';
import Button from './Button';
import translate from './getLocalizedText';
import appStyles from './AppStyles'
const WICScreen = () => {
  return (
    <View style={{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: '85%'
    }}>
      <Button
          style={appStyles.button}
          text={"Link to WIC"}
          onPress={() => Linking.openURL('https://www.fns.usda.gov/wic/wic-how-apply')}
        />
    </View>
  );
};
export default WICScreen;
