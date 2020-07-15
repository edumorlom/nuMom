import React, { useState, useEffect } from 'react';
import {Image, TouchableOpacity, ScrollView, Linking, View} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from "expo-haptics";
import Constants from 'expo-constants';
import * as firebase from "firebase";
import * as FB from "../Firebase";
import appStyles from "./AppStyles";
import SelectionButton from "./SelectionButton";
import Plus from "../../assets/plus.png";
import documentIcon from "../../assets/document.png";

export default function Documents() {
  const [image, setImage] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(true);
  const [textChanged, setTextChanged] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const [value, onChangeText] = useState(null);
  const [documentsButtons, setDocumentsButtons] = useState(null);
  const [renderedButtons, setRenderedButtons] = useState(false);
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
      quality: 1,
    });
    setIsDialogVisible(true);
    setButtonClickedStatus(true);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  let upload = () => {
    let user = firebase.auth().currentUser;
    FB.uploadImage(image,user,value);
    setTextChanged(false);
    setUploadDone(true);
  }

  function resetDocumentsList() {
    var documentsList = grabDocuments();
    setDocumentsButtons(
      documentsList.map((document, key) => (
      <SelectionButton
        style={appStyles.ImageOnRightSelectionButton}
        key={key}
        icon={documentIcon}
        text={document.name}
        onPress={() => Linking.openURL(document.url)}
      />
    )));
    setUploadDone(false);
    setRenderedButtons(true);
  }

  function grabDocuments() {
    let user = firebase.auth().currentUser;
    FB.grabImages(user);
    return FB.documentsList;
  }

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}>
      {!renderedButtons && resetDocumentsList()}
      <TouchableOpacity
        onPress={() => {onPress();}}
        style={appStyles.viewPlus}>
        <Image source={Plus} style={{ height: 50, width: 50}} />
      </TouchableOpacity>
      
      {documentsButtons}

      {buttonClickedStatus && <DialogInput isDialogVisible={isDialogVisible}
        title={"Name Your File"}
        submitInput={ (value) => {onChangeText(value), 
          setIsDialogVisible(false), setTextChanged(true), setButtonClickedStatus(false)}}
        closeDialog={ () => {setIsDialogVisible(false)}}>
      </DialogInput>}  

      {textChanged && upload()}
      {uploadDone && resetDocumentsList()}
    </ScrollView>
  );
}