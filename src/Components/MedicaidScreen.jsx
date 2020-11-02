import React from 'react';
import {Text, View, Linking} from 'react-native';
import Button from './Button';
import translate from './getLocalizedText';
import appStyles from './AppStyles'
const MedicaidScreen = () => {
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
          text={"Link to Medicaid"}
          onPress={() => Linking.openURL('https://www.healthcare.gov/medicaid-chip/')}
        />
    </View>
  );
};
export default MedicaidScreen;
