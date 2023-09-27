import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity, Image} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import appStyles from './AppStyles';
import Plus from '../../assets/plus.png';
import ReferenceInfo from './ReferenceInfo';
import {deleteReference, fetchReference, getUid} from '../Firebase';

function ReferenceNames(props) {
  const [references, setReferences] = useState([]);
  const uid = getUid();

  getReferences = () => {
    fetchReference(uid, setReferences);
  };

  removeReference = (id) => {
    deleteReference(id, uid, references, setReferences);
  };

  // Grabs references when looking at screen. When adding, clears the list, and regrabs the list with the new item when user is back at main menu.
  useFocusEffect(
    React.useCallback(() => {
      getReferences();

      return () => {
        setReferences([]);
      };
    }, [])
  );
  return (
    <View style={appStyles.contentContainer}>
      <TouchableOpacity
        style={appStyles.viewPlus}
        onPress={() => {
          props.navigation.navigate('AddReferenceNames');
        }}
      >
        <Image source={Plus} style={{height: 25, width: 25}} />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={{alignItems: 'flex-end', maxWidth: '100%'}}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {references.map((references, index) => (
            <ReferenceInfo
              key={index}
              references={references}
              removeReference={removeReference}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
export default ReferenceNames;
