import {Image, Text, TouchableHighlight, View, AsyncStorage} from 'react-native';
import React, {useState} from 'react';
import * as Haptics from 'expo-haptics';
import appStyles, {borderRadius, greyColor, shadow} from './AppStyles';
import redX from '../../assets/redX.jpg';
import checkmark from '../../assets/checkmark.jpg';
// Very similar to Button.jsx but it has a specific functionality, it displays the buttons in the lowerPanel (e.g. Clinics and Shelters)
export default function ChecklistButton(props) {
    const [check, setCheck] = useState(redX);  
  let onPress = async () => {
    try {
        await AsyncStorage.setItem(
          setCheck(checkmark)
        );
      } catch (error) {
        // Error saving data
      }
  };

  let showText = () => {
    return (
      <View>
        <Text style={props.style.Text}>{props.text}</Text>
        {props.style.Subtext && ( // If it has subtext, display it
          <Text style={props.style.Subtext}>{props.subtext}</Text>
        )}
      </View>
    );
  };

  let currentState;
  getState = async () => {
    currentState = await AsyncStorage.getItem(check)
  }

  let showImage = () => {
    return <Image style={props.style.Image} source={currentState} />;
  };

  let showImageInView = () => {
    return <Image style={props.style.ImageInView} source={currentState} />;
  };

  return (
    <TouchableHighlight
      underlayColor={appStyles.underlayColor}
      onPress={onPress}
      style={props.style.Touchable}
    >
      <>
        <View style={props.style.View}>
          {props.style.Image && showImage()}
          {props.style.Text && showText()}
        </View>
        {props.style.ImageView && (
          <View style={props.style.ImageView}>{showImageInView()}</View>
        )}
      </>
    </TouchableHighlight>
  );
}
