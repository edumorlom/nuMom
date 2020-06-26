import React, { useState, useEffect } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from "expo-haptics";
import Firebase from "../Firebase";
import Constants from 'expo-constants';

export default function Documents() {
  const [image, setImage] = useState(null);

  useEffect(() => { (async () => {
      if (Constants.platform.ios | Constants.platform.android) {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission Needed to Access Files!');
        }
      }
    })();
  }, []);

  let onPress = () => {
    Haptics.selectionAsync().then();
    
    pickImage();
    
};

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    
    let fb = new Firebase();
    fb.uploadImage(result.uri);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Camera roll" onPress={onPress} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}