import {Text, TouchableHighlight} from 'react-native';
import React, {useState, useEffect} from 'react';
import {onValue} from 'firebase/database';
import appStyles from './AppStyles';
import {getUid, getUserInfo} from '../Firebase';
import translate from './getLocalizedText';

export default WelcomeUserBanner = (props) => {
  const [text, setText] = useState();

  let fullName = null;
  onValue(
    getUserInfo(getUid()),
    (snapshot) => {
      fullName = snapshot.val()?.fullName;
    },
    {
      onlyOnce: true,
    }
  );
  const getText = () => {
    setText(
      `${translate('welcomeUserBanner')}${
        fullName ? `, ${fullName.split(' ')[0]}!` : ''
      }`
    );
  };

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
