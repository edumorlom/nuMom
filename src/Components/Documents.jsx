import React, {useState, useEffect, useCallback} from 'react';
import {Image, TouchableOpacity, ScrollView, Linking, View} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import Constants from 'expo-constants';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import * as FB from '../Firebase';
import { deleteDocument } from '../Firebase';
import appStyles from './AppStyles';
import SelectionButton from './SelectionButton';
import Plus from '../../assets/plus.png';
import documentIcon from '../../assets/document.png';
import translate from './getLocalizedText';
import pinkX from '../../assets/pinkX.png';

export default function Documents() {
  const [image, setImage] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(true);
  const [textChanged, setTextChanged] = useState(false);
  const [value, onChangeText] = useState(null);
  const [buttonClickedStatus, setButtonClickedStatus] = useState(false);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios | Constants.platform.android) {
        const {status} =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
          alert('Permission Needed to Access Files!');
        }
      }
    })();
  });

  const onPress = () => {
    Haptics.selectionAsync().then();

    pickImage();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    setIsDialogVisible(true);
    setButtonClickedStatus(true);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const upload = () => {
    const user = FB.getAuths().currentUser;
    FB.uploadImage(image, user, value, documents, setDocuments);
    setTextChanged(false);
  };

  function grabDocuments() {
    const user = FB.getAuths().currentUser;

    FB.grabImages(user, documents, setDocuments);
  }

  const handleDeleteDocument = async (document) => {
    const user = FB.getAuths().currentUser;
    try {
      await deleteDocument(document.name, user);
      const updatedDocuments = documents.filter((doc) => doc.name !== document.name);
      setDocuments(updatedDocuments);
    } catch (error) {
      console.error('Error deleting document:', error);
      // Handle error and display error message to the user
    }
  };

  useEffect(() => {
    grabDocuments();
  }, []);

  return (
    <View style={appStyles.contentContainer}>
      <TouchableOpacity
        onPress={() => {
          onPress();
        }}
        style={appStyles.viewPlus}
      >
        <Image source={Plus} style={{height: 25, width: 25}} />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={{alignItems: 'flex-end', maxWidth: '100%'}}
      >
        {documents.map((document, key) => (
         <React.Fragment key={key}>
         <View style={{ flexDirection: 'row' }}>
           <SelectionButton
             style={appStyles.openDocumentButton}
             icon={documentIcon}
             text={document.name}
             onPress={() => Linking.openURL(document.url)}
           />
           <SelectionButton
             style={appStyles.deleteButton}
             icon={pinkX}
             onPress={() => handleDeleteDocument(document)}
           />
         </View>
       </React.Fragment>
      
        ))}
        {buttonClickedStatus && (
          <DialogInput
            isDialogVisible={isDialogVisible}
            title={translate('nameFile')}
            submitInput={(value) => {
              onChangeText(value),
                setIsDialogVisible(false),
                setTextChanged(true),
                setButtonClickedStatus(false);
            }}
            closeDialog={() => {
              setIsDialogVisible(false);
            }}
          />
        )}
        {textChanged && upload()}
      </ScrollView>
    </View>
  );
}
