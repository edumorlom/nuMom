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
import * as DocumentPicker from 'expo-document-picker';
import { Alert } from 'react-native';

export default function Documents() {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
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

  /*const onPress = () => {
    Haptics.selectionAsync().then();

    pickImage();
  };
  */

  const onPress = async () => {
    try {
      Haptics.selectionAsync().then();
  
      // Choice dialog for the user
      const selectedMediaType = await showMediaPickerChoiceDialog();
      
      //User can choose between an image or document upload
      if (selectedMediaType === 'image') {
        pickImage();
      } else if (selectedMediaType === 'document') {
        pickDocument();
      }
    } catch (error) {
      console.log('Error picking media:', error.message);
    }
  };

  //Allows user to pick an image with built in image library
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

  //Allows user to pick a doucment with built in document picker
  const pickDocument = async () => {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      });
  
      setIsDialogVisible(true);
      setButtonClickedStatus(true);
  
      if (!result.canceled) {
        setFile(result);
        console.log('Selected document URI:', result.uri);
      } 
  };
  
  const showMediaPickerChoiceDialog = async () => {
    return new Promise((resolve) => {
      // Dialog for user to choose between what file type they want to upload
      const mediaOptions = ['Image', 'Document'];
  
      Alert.alert(
        'Select Media Type',
        'Choose whether to pick an image or a document:',
        [
          {
            text: 'Image',
            onPress: () => resolve('image'),
          },
          {
            text: 'Document',
            onPress: () => resolve('document'),
          },
        ],
        { cancelable: true }
      );
    });
  };

  //Handles file upload denpending on what file type the user is uploading
  const upload = () => {
  const user = FB.getAuths().currentUser;

    if (image) {
      FB.uploadImage(image, user, value, documents, setDocuments);
    } else if (file && file.uri) {
      FB.uploadDocument(file.uri, user, value, documents, setDocuments);
    } else {
      console.log('No file selected.');
    }

  setTextChanged(false);
};

  function grabDocuments() {
    const user = FB.getAuths().currentUser;

    FB.grabImages(user, documents, setDocuments);
    
  }

  const handleDeleteDocument = async (document) => {
    const user = FB.getAuths().currentUser;
      await deleteDocument(document.name, user);
      const updatedDocuments = documents.filter((doc) => doc.name !== document.name);
      setDocuments(updatedDocuments);
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
