import {Image, Text, TouchableHighlight, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getCookie, saveCookie} from './Cookies';
import appStyles from './AppStyles';
import checkmark from '../../assets/checkmark.png';

// Very similar to Button.jsx but it has a specific functionality
// it displays the buttons in the lowerPanel (e.g. Clinics and Shelters)
export default function ChecklistButton(props) {
  /* this key is where a state of the check variable will be saved as a cookie for each checklist item. 
  The keyIdentifier prop is used to differentiate between different checklists and checklist items. */
  const STORAGE_KEY = `@save_check${props.keyIdentifier}`;
  const [check, setCheck] = useState('');

  useEffect(() => {
    // Gets the cookie if it exists.
    getCookie(STORAGE_KEY).then((response) => {
      setCheck(response);
    });
  }, []);

  const onPress = () => {
    // Convert check to opposite string.
    // If check = 'true', then set check to '' (false). If check = '' (false), then set check to 'true'.
    const newCheck = check ? '' : 'true';
    // set the state
    setCheck(newCheck);
    // save the new cookie
    saveCookie(STORAGE_KEY, newCheck);
  };

  const showIcon = () => {
    if (props.icon) {
      return <Image style={props.style.Icon} source={props.icon} />;
    }
    return null;
  };

  const showText = () => (
    <View>
      <Text style={props.style.Text}>{props.text}</Text>
      {props.style.Subtext && ( // If it has subtext, display it
        <Text style={props.style.Subtext}>{props.subtext}</Text>
      )}
    </View>
  );

  const showImage = () => (
    <Image style={props.style.Image} source={checkmark} />
  );

  const showImageInView = () => (
    <Image style={props.style.ImageInView} source={checkmark} />
  );

  return (
    <TouchableHighlight
      underlayColor={appStyles.underlayColor}
      onPress={() => onPress()}
      style={props.style.Touchable}
    >
      <>
        <View style={props.style.View}>
          {props.style.Image && showImage()}
          {props.style.Text && showText()}
          {showIcon()}
        </View>
        {check ? (
          <View style={props.style.ImageInView}>{showImageInView()}</View>
        ) : (
          <View />
        )}
      </>
    </TouchableHighlight>
  );
}
