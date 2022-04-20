import {Text, TouchableHighlight, View, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import appStyles from './AppStyles';
import {getUid, getUserInfo} from '../Firebase';
import translate from './getLocalizedText';

export default WelcomeUserBanner = (props) => {
  const [text, setText] = useState();

  let fullName = null;
  getUserInfo(getUid()).once('value', (snapshot) => {
    fullName = snapshot.val()?.fullName;
  }); // Get fullName from DB
  const getText = () => {setText( `${translate('welcomeUserBanner')}${fullName ? `, ${fullName.split(' ')[0]}!` : ''}`);};

  useEffect(() => {
    getText();
  }, [fullName]);

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
