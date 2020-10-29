import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import ImmunizationMenu from './ImmunizationMenu';
import appStyles from './AppStyles';
import Plus from '../../assets/plus.png';
import Email from '../../assets/emailicon.png';
import Notification from '../../assets/bellNotification.png';
import {deleteImmunization, fetchImmunization, getUid} from '../Firebase';

export default function Immunization(props) {
  let _isMounted = false;
  const [objects, setObjects] = useState([]);
  const uid = getUid();

  getImmunization = () => {
    // this I need to implement in firebase
    fetchImmunization(uid, setObjects, _isMounted);
  };

  useEffect(() => {
    getImmunization();

    return () => (_isMounted = false);
  }, []);

  removeImmunization = (id, eventId) => {
    // this I need to implement in firebase
    deleteImmunization(id, uid, objects, setObjects, eventId);
  };

  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'flex-end', maxWidth: '100%'}}
      showsVerticalScrollIndicator={false}
    >
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={appStyles.viewPlus}
          onPress={() => {
            props.setLowerPanelContent('NewImmunization');
          }}
        >
          <Image source={Plus} style={{height: 25, width: 25}} />
        </TouchableOpacity>
        <TouchableOpacity
          style={appStyles.viewPlus}
          onPress={() => {
            //  props.setLowerPanelContent('NewImmunization');
          }}
        >
          <Image source={Email} style={{height: 40, width: 40}} />
        </TouchableOpacity>
        <TouchableOpacity
          style={appStyles.viewPlus}
          onPress={() => {
            //   props.setLowerPanelContent('NewImmunization');
          }}
        >
          <Image source={Notification} style={{height: 40, width: 40}} />
        </TouchableOpacity>
      </View>
      <View>
        {objects.map((immunizations, index) => {
          return (
            <ImmunizationMenu
              key={index}
              immunizations={immunizations}
              removeImmunization={removeImmunization}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}
