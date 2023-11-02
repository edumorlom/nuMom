import React, {useState} from 'react';
import {ScrollView, View, Linking, Image, TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import ImmunizationMenu from './ImmunizationMenu';
import appStyles from './AppStyles';
import Plus from '../../assets/plus.png';
import Email from '../../assets/emailicon2.png';
import Schedule from '../../assets/schedule.png';
import appointments from '../../assets/appointments.png';
import {
  deleteImmunization,
  fetchImmunization,
  getUid,
  getUEmail,
} from '../Firebase';

export default function Immunization(props) {
  const [objects, setObjects] = useState([]);
  const uid = getUid();
  const email = getUEmail();

  removeImmunization = (id) => {
    deleteImmunization(id, uid, objects, setObjects);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchImmunization(uid, setObjects);
      return () => {
        setObjects([]);
      };
    }, [])
  );

  sendEmailViaEmailApp = (toMailId, subject, body) => {
    if (typeof toMailId !== 'undefined') {
      let link = `mailto:${toMailId}`;
      if (typeof subject !== 'undefined') {
        link = `${link}?subject=${encodeURIComponent(subject)}`;
      }
      if (typeof subject === 'undefined') {
        link = `${link}?body=${body}`;
      } else {
        link = `${link}&body=${encodeURIComponent(body)}`;
      }

      Linking.canOpenURL(link)
        .then((supported) => {
          if (supported) {
            Linking.openURL(link);
          }
        })
        .catch((err) => console.error('An error occurred', err));
    } else {
      console.log('sendEmailViaEmailApp -----> mail link is undefined');
    }
  };
  const emailBody = JSON.stringify(objects, null, ' ').replace(
    /[\{\[\]\"\}\,]+/g,
    ''
  );

  return (
    <View style={appStyles.contentContainer}>
      <View style={{flexDirection: 'row'}}>
        {/* New Immunization Button */}
        <TouchableOpacity
          style={appStyles.viewPlus}
          onPress={() => {
            props.navigation.navigate('NewImmunization');
          }}
        >
          <Image source={Plus} style={{height: 25, width: 25}} />
        </TouchableOpacity>

        {/* Send Immunization Records Email Button */}
        <TouchableOpacity
          style={appStyles.viewPlus}
          onPress={() => {
            sendEmailViaEmailApp(
              email,
              'NuMom: Immunization Records',
              emailBody
            );
          }}
        >
          <Image source={Email} style={{height: 40, width: 40}} />
        </TouchableOpacity>

        {/* Open Immunization Schedule Button */}
        <TouchableOpacity
          style={appStyles.viewPlus}
          onPress={() => {
            props.navigation.navigate('ImmunizationSchedule');
          }}
        >
          <Image source={appointments} style={{height: 40, width: 40}} />
        </TouchableOpacity>
      </View>

      {/* Map the Saved Immunizations */}
      <ScrollView
        contentContainerStyle={{alignItems: 'flex-end', maxWidth: '100%'}}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {objects.map((immunizations, index) => (
            <ImmunizationMenu
              key={index}
              immunizations={immunizations}
              removeImmunization={removeImmunization}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
