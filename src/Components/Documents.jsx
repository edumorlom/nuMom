import React, { useState, useEffect } from 'react';
import { Button, Image, View, TextInput } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from "expo-haptics";
import * as FB from "../Firebase";
import Constants from 'expo-constants';
import * as firebase from "firebase";

export default function Documents() {
  const [image, setImage] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(true);
  const [value, onChangeText] = useState('Useless Placeholder');
  const [buttonClickedStatus, setButtonClickedStatus] = useState(false);

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

    setButtonClickedStatus(true);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  let upload = () => {
    let user = firebase.auth().currentUser;
    FB.uploadImage(image,user,value);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Camera roll" onPress={onPress} />

      {buttonClickedStatus && <DialogInput isDialogVisible={isDialogVisible}
        title={"Name Your File"}
        submitInput={ (inputText) => {onChangeText(inputText)} }
        closeDialog={ () => {setIsDialogVisible(false)}}>
      </DialogInput>}
      {upload()}
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}