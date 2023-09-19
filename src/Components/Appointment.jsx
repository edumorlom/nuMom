import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AppointmentMenu from './AppointmentMenu';
import appStyles from './AppStyles';
import Plus from '../../assets/plus.png';
import {deleteAppointment, fetchAppointment, getUid} from '../Firebase';

export default function Appointment(props) {
  const [objects, setObjects] = useState([]);
  const uid = getUid();

  getAppointment = () => {
    fetchAppointment(uid, setObjects);
  };

  removeAppointment = (id, eventId) => {
    deleteAppointment(id, uid, objects, setObjects, eventId);
  };

  useFocusEffect(
    React.useCallback(() => {
      getAppointment();

      return () => {
        setObjects([]);
      };
    }, [])
  );

  return (
    <View style={appStyles.contentContainer}>
      <TouchableOpacity
        style={appStyles.viewPlus}
        onPress={() => {
          props.navigation.navigate('NewAppointment');
        }}
      >
        <Image source={Plus} style={{height: 25, width: 25}} />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={{alignItems: 'flex-end', maxWidth: '100%'}}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {objects.map((appointments, index) => (
            <AppointmentMenu
              key={index}
              appointments={appointments}
              removeAppointment={removeAppointment}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
