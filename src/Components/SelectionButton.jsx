import {Image, Text, TouchableHighlight, View} from 'react-native';
import React from 'react';
import * as Haptics from 'expo-haptics';
import appStyles from './AppStyles';

// Very similar to Button.jsx but it has a specific functionality, it displays the buttons in the lowerPanel (e.g. Clinics and Shelters)
export default function SelectionButton(props) {
  const onPress = () => {
    if (props.onPress) {
      Haptics.selectionAsync().then();
      props.onPress();
    }
  };

  const showText = () => (
    <View>
      <Text style={props.style.Text}>{props.text}</Text>
      {props.style.Subtext && ( // If it has subtext, display it
        <Text style={props.style.Subtext}>{props.subtext}</Text>
      )}
    </View>
  );

  let showImage = () => <Image style={{...props.style.Image, marginLeft: -10}} source={props.icon} />;

  const showImageInView = () => (
    <Image style={props.style.ImageInView} source={props.icon} />
  );

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
