import {Image, Text, TouchableHighlight, View} from 'react-native';
import React from 'react';
import appStyles from './AppStyles';

export default function BetterMenu(props) {
  const showText = () => (
    <View>
      <Text style={props.style.Text}>{props.text}</Text>
      {props.style.Subtext && ( // If it has subtext, display it
        <Text style={props.style.Subtext}>{props.subtext}</Text>
      )}
    </View>
  );

  const showImage = () => (
    <Image style={props.style.Image} source={props.icon} />
  );

  const showImageInView = () => (
    <Image style={props.style.ImageInView} source={props.icon} />
  );

  return (
    <TouchableHighlight
      underlayColor={appStyles.underlayColor}
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
