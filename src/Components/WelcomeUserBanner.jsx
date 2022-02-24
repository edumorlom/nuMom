import {Text, TouchableHighlight, View, Alert} from 'react-native';
import React, {useState} from 'react';
import appStyles from './AppStyles';
import {getUid, getUserInfo} from '../Firebase';
import translate from './getLocalizedText';

export default WelcomeUserBanner = (props) => {
  let fullName = null;
  getUserInfo(getUid()).once('value', (snapshot) => {
    fullName = snapshot.val()?.fullName;
  }); // Get fullName from DB
  const initialText = `${translate('welcomeUserBanner')} ${
    fullName ? fullName.split(' ')[0] : ', fullName!'
  }`;
  const [text, setText] = useState(initialText);

  return (
    <TouchableHighlight
      style={appStyles.WelcomeUserBanner.TouchableHighlight}
      underlayColor={appStyles.pinkColor}
      onPress={() => {}}
    >
      <Text
        style={{
          color: 'white',
          fontSize: appStyles.regularFontSize,
          fontWeight: 'bold',
        }}
      >
        {text}
      </Text>
    </TouchableHighlight>
  );
};
