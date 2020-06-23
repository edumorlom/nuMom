import React, { useState, useEffect } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from "expo-haptics";
import Firebase from "./Firebase";
import Constants from 'expo-constants';

export default function Documents() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
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

/*import React, { useState } from 'react';
import { Button, StatusBar } from 'react-native';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
var ImagePicker = require('react-native-image-picker');
import styled from 'styled-components/native';

export default function Documents(props){
  const imagePickerOptions = {
        noData: true,
      };
  const Container = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    `;
  const Picture = styled.Image.attrs({
    resizeMode: 'contain',
    })`
    height: 300;
    width: 100%;
    `;
  var user = firebase.auth().currentUser;
  const cameraPermissionsAsync = async (user) => {
      const { existingStatus } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
      let finalStatus = existingStatus;
      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== 'granted') {
          // Android remote notification permissions are granted during the app
          // install, so this will only ask on iOS
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          finalStatus = status;
      }
      // Stop here if the user did not grant permissions
      if (finalStatus !== 'granted') {
          return;
      }
      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync();
      // POST the token to our backend so we can use it to send pushes from there
      var updates = {}
      updates['/expoToken'] = token
      await firebase.database().ref('users/' + user.uid).update(updates)
      //call the push notification 
  }

  const [imageURI, setImageURI] = useState(null);
  const uploadFile = () => {
    cameraPermissionsAsync(user);
    ImagePicker.launchImageLibrary(imagePickerOptions, (response) => {
      if (response.didCancel) {
        alert('Post canceled');
      } else if (response.error) {alert('An error occurred: ',   response.error);
      } else {setImageURI({ uri: response.uri });
        console.log(response);
      }}
    );
  };
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Button title="Take Picture" onPress={uploadFile} color="#DF2172" />
        {imageURI && <Picture source={imageURI} />}
    </Container>
  );
};*/