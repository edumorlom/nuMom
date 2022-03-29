import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import appStyles, {borderRadius, shadow} from './AppStyles';
import {fetchImmunization, getUid} from '../Firebase';
import ImmunizationChecklist from './ImmunizationChecklist';

export default function ImmunizationSchedule() {
  let _isMounted = false;
  const [objects, setObjects] = useState([]);
  const uid = getUid();

  getImmunization = () => {
    fetchImmunization(uid, setObjects, _isMounted);
  };

  useEffect(() => {
    getImmunization();
    return () => (_isMounted = false);
  }, []);

  const scheduleData = [
    {
      age: 'Birth',
      immunizations: [
        {
          id: '1HEPB',
          name: 'Hepatitis B - First Shot',
        },
      ],
    },
    {
      age: '2 Months',
      immunizations: [
        {
          id: '1DTAP',
          name: 'Diphtheria, Tetanus, and Pertussis (Dtap) - Frist Shot',
        },
        {
          id: '1IPV',
          name: 'Polio (IPV) - First Shot',
        },
        {
          id: '1HIB',
          name: 'Haemophilus Influenzae Type B (Hib) - First Shot',
        },
        {
          id: '1PCV',
          name: 'Pneumococcal Vaccine (PCV) - First Shot',
        },
        {
          id: '1RV',
          name: 'Rotavirus - First Shot',
        },
        {
          id: '2HEPB',
          name: 'Hepatitis B - Second Shot',
        },
      ],
    },
    {
      age: '4 Months',
      immunizations: [
        {
          id: '2DTAP',
          name: 'Diphtheria, Tetanus, and Pertussis (Dtap) - Second Shot',
        },
        {
          id: '2IPV',
          name: 'Polio (IPV) - Second Shot',
        },
        {
          id: '2HIB',
          name: 'Haemophilus Influenzae Type B (Hib) - Second Shot',
        },
        {
          id: '2PCV',
          name: 'Pneumococcal Vaccine (PCV) - Second Shot',
        },
        {
          id: '2RV',
          name: 'Rotavirus - Second Shot',
        },
        {
          id: '3HEPB',
          name: 'Hepatitis B - Third Shot',
        },
      ],
    },
    {
      age: '6 Months',
      immunizations: [
        {
          id: '3DTAP',
          name: 'Diphtheria, Tetanus, and Pertussis (Dtap) - Third Shot',
        },
        {
          id: '3IPV',
          name: 'Polio (IPV) - Third Shot',
        },
        {
          id: '3HIB',
          name: 'Haemophilus Influenzae Type B (Hib) - Third Shot',
        },
        {
          id: '3PCV',
          name: 'Pneumococcal Vaccine (PCV) - Third Shot',
        },
        {
          id: '3RV',
          name: 'Rotavirus - Third Shot',
        },
        {
          id: 'FLU',
          name: 'Flu Vaccine - First Shot',
        },
        {
          id: '4HEPB',
          name: 'Hepatitis B - Fourth Shot',
        },
      ],
    },
    {
      age: '12 Months',
      immunizations: [
        {
          id: '1HEPA',
          name: 'Hepatitis A - First Shot',
        },
        {
          id: '1MMR',
          name: 'Measles, Mumps, and Rubella (MMR) - First Shot',
        },
        {
          id: '1CHKPOX',
          name: 'Chickenpox (Varicella) - First Shot',
        },
      ],
    },
    {
      age: '15 Months',
      immunizations: [
        {
          id: '4HIB',
          name: 'Haemophilus Influenzae Type B (Hib) - Fourth Shot',
        },
        {
          id: '4PCV',
          name: 'Pneumococcal Vaccine (PCV) - Fourth Shot',
        },
      ],
    },
    {
      age: '18 Months',
      immunizations: [
        {
          id: '2HEPA',
          name: 'Hepatitis A - Second Shot',
        },
      ],
    },
    {
      age: '4 to 6  Years',
      immunizations: [
        {
          id: '4DTAP',
          name: 'Diphtheria, Tetanus, and Pertussis (Dtap) - Fourth Shot',
        },
        {
          id: '4IPV',
          name: 'Polio (IPV) - Fourth Shot',
        },
        {
          id: '2MMR',
          name: 'Measles, Mumps, and Rubella (MMR) - Second Shot',
        },
        {
          id: '2CHCKPOX',
          name: 'Chickenpox (Varicella) - Second Shot',
        },
      ],
    },
  ];

  displayCheckBox = (immunizations, scheduleData) => {
    const types = immunizations.map((item) => {
      const {type, dosage} = item?.val();
      
      if (`${type} - ${dosage}` === scheduleData) return `${type} - ${dosage}`;
      return undefined;
    });
    if (types.includes(scheduleData)) {
      return <Image source={require('../../assets/checked.png')} />;
    }
    return <Image source={require('../../assets/unchecked.png')} />;
  };
  
  return (
    <View style={appStyles.contentContainer}>
      <ScrollView
        contentContainerStyle={{alignItems: 'flex-end', maxWidth: '100%'}}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {scheduleData.map((value) => (
            <TouchableHighlight
              style={{
                margin: 15,
                paddingLeft: 10,
                justifyContent: 'center',
                backgroundColor: 'white',
                ...shadow,
                width: appStyles.win.width * 0.95,
                borderRadius,
              }}
              underlayColor={appStyles.underlayColor}
            >
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}
              >
                <View>
                  <Text
                    style={{
                      color: appStyles.blueColor,
                      fontSize: appStyles.regularFontSize + 1,
                      fontWeight: 'bold',
                    }}
                  >
                    {value.age}
                  </Text>
                  {value.immunizations.map((item, index) => (
                    <ListItem
                      key={index}
                      bottomDivider
                      style={{
                        margin: 15,
                        width: appStyles.win.width * 0.7,
                      }}
                    >
                      {displayCheckBox(objects, item.name)}
                      <ListItem.Content>
                        <ListItem.Title
                          style={{
                            color: appStyles.greyColor,
                            fontSize: appStyles.regularFontSize - 3,
                          }}
                        >
                          {item.name}
                        </ListItem.Title>
                      </ListItem.Content>
                    </ListItem>
                  ))}
                </View>
              </View>
            </TouchableHighlight>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  seperator: {
    height: 0.1,
    width: '70%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 8,
  },
  container: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  checkBoxImage: {
    height: 40,
    width: 40,
  },
  textTitle: {
    ...Platform.select({
      ios: {
        color: '#9CAAC4',
        fontWeight: '600',
        fontSize: appStyles.regularFontSize - 3,
      },
      android: {
        color: '#9CAAC4',
        fontWeight: '600',
        fontSize: appStyles.regularFontSize - 3,
      },
    }),
  },
  textStyle: {
    ...Platform.select({
      ios: {
        fontSize: 19,
        alignSelf: 'center',
        paddingTop: 5,
      },
      android: {
        fontSize: 19,
        alignSelf: 'center',
        paddingTop: 5,
      },
    }),
  },
});
