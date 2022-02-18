import React, {useState, useEffect} from 'react';
import {ScrollView, View, Linking, Image, TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import ImmunizationMenu from './ImmunizationMenu';
import appStyles from './AppStyles';
import Plus from '../../assets/plus.png';
import Email from '../../assets/emailicon.png';
import Schedule from '../../assets/schedule.png';
import {
  deleteImmunization,
  fetchImmunization,
  getUid,
  getUEmail,
} from '../Firebase';

export default function Immunization(props) {
  const _isMounted = false;
  const [objects, setObjects] = useState([]);
  const uid = getUid();
  const email = getUEmail();

  getImmunization = () => {
    fetchImmunization(uid, setObjects, _isMounted);
  };

  removeImmunization = (id) => {
    deleteImmunization(id, uid, objects, setObjects);
  };

  useFocusEffect(
    React.useCallback(() => {
      getImmunization();
      return () => {
        setObjects([]);
      };
    }, [])
  );

  sendEmailViaEmailApp = (toMailId, subject, body) => {
    if (typeof toMailId !== 'undefined') {
      let link = `mailto:${toMailId}`;
      if (typeof subject !== 'undefined') {
        link = `${link}?subject=${subject}`;
      }
      if (typeof subject === 'undefined') {
        link = `${link}?body=${body}`;
      } else {
        link = `${link}&body=${body}`;
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
        <TouchableOpacity
          style={appStyles.viewPlus}
          onPress={() => {
            props.navigation.navigate('NewImmunization');
          }}
        >
          <Image source={Plus} style={{height: 25, width: 25}} />
        </TouchableOpacity>
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
        <TouchableOpacity
          style={appStyles.viewPlus}
          onPress={() => {
            props.navigation.navigate('ImmunizationSchedule');
          }}
        >
          <Image source={Schedule} style={{height: 40, width: 40}} />
        </TouchableOpacity>
      </View>

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
