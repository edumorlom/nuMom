import {Image, Text, TouchableHighlight, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-community/async-storage';
import appStyles, {borderRadius, greyColor, shadow} from './AppStyles';
import redX from '../../assets/redX.jpg';
import checkmark from '../../assets/checkmark.jpg';
// Very similar to Button.jsx but it has a specific functionality, it displays the buttons in the lowerPanel (e.g. Clinics and Shelters)
export default function ChecklistButton(props) {
  const STORAGE_KEY = '@save_check';
  const [check, setCheck] = useState('');

  useEffect(() => {
    readData();
  }, []);

  function getImage() {
    if (check == '1') {
      return checkmark;
    }
    return '';
  }

  function currentCheck() {
    if (check == '1') {
      setCheck('0');
    } else {
      setCheck('1');
    }
  }

  let onPress = () => {
    currentCheck();
    saveData(check);
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, check);
      alert('Data successfully saved');
    } catch (e) {
      alert('Failed to save the data to the storage');
    }
  };

  const readData = async () => {
    try {
      const check = await AsyncStorage.getItem(STORAGE_KEY);

      if (check !== null) {
        setCheck(check);
      }
    } catch (e) {
      alert('Failed to fetch the data from storage');
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

  let showImage = () => {
    return <Image style={props.style.Image} source={getImage()} />;
  };

  let showImageInView = () => {
    return <Image style={props.style.ImageInView} source={getImage()} />;
  };

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
        </View>
        {props.style.ImageView && (
          <View style={props.style.ImageView}>{showImageInView()}</View>
        )}
      </>
    </TouchableHighlight>
  );
}
