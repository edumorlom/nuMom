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
import translate from './getLocalizedText';

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
          type: translate('HEPB'),      // Hepatitis B
          dose: translate('dose1'),  // First Shot
        },
      ],
    },
    {
      age: '2 Months',
      immunizations: [
        {
          id: '1DTAP',
          type: translate('DTAP'),      // Diphtheria, Tetanus, and Pertussis (Dtap)
          dose: translate('dose1'),  // First Shot
        },
        {
          id: '1IPV',
          type: translate('IPV'),       // Polio (IPV)
          dose: translate('dose1'),  // First Shot
        },
        {
          id: '1HIB',
          type: translate('HIB'),       // Haemophilus Influenzae Type B (Hib)
          dose: translate('dose1'),  // First Shot
        },
        {
          id: '1PCV',
          type: translate('PCV'),       // Pneumococcal Vaccine (PCV)
          dose: translate('dose1'),  // First Shot
        },
        {
          id: '1RV',
          type: translate('RV'),        // Rotavirus
          dose: translate('dose1'),  // First Shot
        },
        {
          id: '2HEPB',
          type: translate('HEPB'),      // Hepatitis B
          dose: translate('dose2'),  // Second Shot
        },
      ],
    },
    {
      age: '4 Months',
      immunizations: [
        {
          id: '2DTAP',
          type: translate('DTAP'),      // Diphtheria, Tetanus, and Pertussis (Dtap)
          dose: translate('dose2'),  // Second Shot
        },
        {
          id: '2IPV',
          type: translate('IPV'),       // Polio (IPV)
          dose: translate('dose2'),  // Second Shot
        },
        {
          id: '2HIB',
          type: translate('HIB'),       // Haemophilus Influenzae Type B (Hib)
          dose: translate('dose2'),  // Second Shot
        },
        {
          id: '2PCV',
          type: translate('PCV'),       // Pneumococcal Vaccine (PCV)
          dose: translate('dose2'),  // Second Shot
        },
        {
          id: '2RV',
          type: translate('RV'),        // Rotavirus
          dose: translate('dose2'),  // Second Shot
        },
        {
          id: '3HEPB',
          type: translate('HEPB'),      // Hepatitis B
          dose: translate('dose3'),  // Third Shot
        },
      ],
    },
    {
      age: '6 Months',
      immunizations: [
        {
          id: '3DTAP',
          type: translate('DTAP'),      // Diphtheria, Tetanus, and Pertussis (Dtap)
          dose: translate('dose3'),  // Third Shot
        },
        {
          id: '3IPV',
          type: translate('IPV'),       // Polio (IPV)
          dose: translate('dose3'),  // Third Shot
        },
        {
          id: '3HIB',
          type: translate('HIB'),       // Haemophilus Influenzae Type B (Hib)
          dose: translate('dose3'),  // Third Shot
        },
        {
          id: '3PCV',
          type: translate('PCV'),       // Pneumococcal Vaccine (PCV)
          dose: translate('dose3'),  // Third Shot
        },
        {
          id: '3RV',
          type: translate('RV'),        // Rotavirus
          dose: translate('dose3'),  // Third Shot
        },
        {
          id: 'FLU',
          type: translate('FLU'),       // Flu Vaccine
          dose: 'n/a'
        },
        {
          id: '4HEPB',
          type: translate('HEPB'),      // Hepatitis B
          dose: translate('dose4'),  // Fourth Shot
        },
      ],
    },
    {
      age: '12 Months',
      immunizations: [
        {
          id: '1HEPA',
          type: translate('HEPA'),      // Hepatitis A
          dose: translate('dose1'),  // First Shot
        },
        {
          id: '1MMR',
          type: translate('MMR'),       // Measles, Mumps, and Rubella (MMR)
          dose: translate('dose1'),  // First Shot
        },
        {
          id: '1CHKPOX',
          type: translate('CHKPOX'),    // Chickenpox (Varicella)
          dose: translate('dose1'),  // First Shot
        },
      ],
    },
    {
      age: '15 Months',
      immunizations: [
        {
          id: '4HIB',
          type: translate('HIB'),       // Haemophilus Influenzae Type B (Hib)
          dose: translate('dose4'),  // Fourth Shot
        },
        {
          id: '4PCV',
          type: translate('PCV'),       // Pneumococcal Vaccine (PCV)
          dose: translate('dose4'),  // Fourth Shot
        },
      ],
    },
    {
      age: '18 Months',
      immunizations: [
        {
          id: '2HEPA',
          type: translate('HEPA'),      // Hepatitis A
          dose: translate('dose2'),  // Second Shot
        },
      ],
    },
    {
      age: '4 to 6  Years',
      immunizations: [
        {
          id: '4DTAP',
          type: translate('DTAP'),      // Diphtheria, Tetanus, and Pertussis (Dtap)
          dose: translate('dose4'),  // Fourth Shot
        },
        {
          id: '4IPV',
          type: translate('IPV'),       // Polio (IPV)
          dose: translate('dose4'),  // Fourth Shot
        },
        {
          id: '2MMR',
          type: translate('MMR'),       // Measles, Mumps, and Rubella (MMR)
          dose: translate('dose2'),  // Second Shot
        },
        {
          id: '2CHCKPOX',
          type: translate('CHKPOX'),    // Chickenpox (Varicella)
          dose: translate('dose2'),  // Second Shot
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
                          {/* Show the vaccine type and dose # (if vaccine is FLU, dose # is not shown)*/}
                          {item.id === "FLU" ? `${item.type}` : `${item.type} - ${item.dose}`}
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
