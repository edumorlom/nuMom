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

export default function ImmunizationSchedule(props) {
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
          type: 'Hepatitis B',
          dose: 'First Shot'
        },
      ],
    },
    {
      age: '2 Months',
      immunizations: [
        {
          id: '1DTAP',
          type: 'Diphtheria, Tetanus, and Pertussis (Dtap)',
          dose: 'First Shot'
        },
        {
          id: '1IPV',
          type: 'Polio (IPV)',
          dose: 'First Shot'
        },
        {
          id: '1HIB',
          type: 'Haemophilus Influenzae Type B (Hib)',
          dose: 'First Shot'
        },
        {
          id: '1PCV',
          type: 'Pneumococcal Vaccine (PCV)',
          dose: 'First Shot'
        },
        {
          id: '1RV',
          type: 'Rotavirus',
          dose: 'First Shot'
        },
        {
          id: '2HEPB',
          type: 'Hepatitis B',
          dose: 'Second Shot'
        },
      ],
    },
    {
      age: '4 Months',
      immunizations: [
        {
          id: '2DTAP',
          type: 'Diphtheria, Tetanus, and Pertussis (Dtap)',
          dose: 'Second Shot'
        },
        {
          id: '2IPV',
          type: 'Polio (IPV)',
          dose: 'Second Shot'
        },
        {
          id: '2HIB',
          type: 'Haemophilus Influenzae Type B (Hib)',
          dose: 'Second Shot'
        },
        {
          id: '2PCV',
          type: 'Pneumococcal Vaccine (PCV)',
          dose: 'Second Shot'
        },
        {
          id: '2RV',
          type: 'Rotavirus',
          dose: 'Second Shot'
        },
        {
          id: '3HEPB',
          type: 'Hepatitis B',
          dose: 'Third Shot'
        },
      ],
    },
    {
      age: '6 Months',
      immunizations: [
        {
          id: '3DTAP',
          type: 'Diphtheria, Tetanus, and Pertussis (Dtap)',
          dose: 'Third Shot'
        },
        {
          id: '3IPV',
          type: 'Polio (IPV)',
          dose: 'Third Shot'
        },
        {
          id: '3HIB',
          type: 'Haemophilus Influenzae Type B (Hib)',
          dose: 'Third Shot'
        },
        {
          id: '3PCV',
          type: 'Pneumococcal Vaccine (PCV)',
          dose: 'Third Shot'
        },
        {
          id: '3RV',
          type: 'Rotavirus',
          dose: 'Third Shot'
        },
        {
          id: 'FLU',
          type: 'Flu Vaccine',
          dose: 'n/a'
        },
        {
          id: '4HEPB',
          type: 'Hepatitis B',
          dose: 'Fourth Shot'
        },
      ],
    },
    {
      age: '12 Months',
      immunizations: [
        {
          id: '1HEPA',
          type: 'Hepatitis A',
          dose: 'First Shot'
        },
        {
          id: '1MMR',
          type: 'Measles, Mumps, and Rubella (MMR)',
          dose: 'First Shot'
        },
        {
          id: '1CHKPOX',
          type: 'Chickenpox (Varicella)',
          dose: 'First Shot'
        },
      ],
    },
    {
      age: '15 Months',
      immunizations: [
        {
          id: '4HIB',
          type: 'Haemophilus Influenzae Type B (Hib)',
          dose: 'Fourth Shot'
        },
        {
          id: '4PCV',
          type: 'Pneumococcal Vaccine (PCV)',
          dose: 'Fourth Shot'
        },
      ],
    },
    {
      age: '18 Months',
      immunizations: [
        {
          id: '2HEPA',
          type: 'Hepatitis A',
          dose: 'Second Shot'
        },
      ],
    },
    {
      age: '4 to 6  Years',
      immunizations: [
        {
          id: '4DTAP',
          type: 'Diphtheria, Tetanus, and Pertussis (Dtap)',
          dose: 'Fourth Shot'
        },
        {
          id: '4IPV',
          type: 'Polio (IPV)',
          dose: 'Fourth Shot'
        },
        {
          id: '2MMR',
          type: 'Measles, Mumps, and Rubella (MMR)',
          dose: 'Second Shot'
        },
        {
          id: '2CHCKPOX',
          type: 'Chickenpox (Varicella)',
          dose: 'Second Shot'
        },
      ],
    },
  ];

  displayCheckBox = (immunizations, scheduleData) => {
    let types = ""

    types = immunizations.map((item) => {
      const {id} = item?.val();
      return `${id}`;
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
                      {displayCheckBox(objects, `${item.id}`)}
                      <ListItem.Content>
                        <ListItem.Title
                          style={{
                            color: appStyles.greyColor,
                            fontSize: appStyles.regularFontSize - 3,
                          }}
                        >
                          {`${item.type} - ${item.dose}`}
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
