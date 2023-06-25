import {
  Text,
  TouchableOpacity,
  TextInput as TextBox,
  View,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Dropdown} from 'react-native-material-dropdown-v2';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import translate from './getLocalizedText';
import Button from './Button';
import appStyles from './AppStyles';
import {getUid, addImmunization} from '../Firebase';

export default function NewImmunization(props) {
  const [type, setType] = useState(null);
  const [dosage, setDosage] = useState(null);
  const [date, setDate] = useState(
    `${moment().format('MM')}/${moment().format('DD')}/${moment().format(
      'YYYY'
    )}`
  );
  const [notes, setNotes] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [id, setID] = useState();
  const uid = getUid();

  const immunizationInfo = {
    type,
    date,
    dosage,
    notes,
    id,
  };

  const immunizationArray = [
    translate('HEPB'), // Hepatitis B
    translate('DTAP'), // Diphtheria, Tetanus, and Pertussis (Dtap)
    translate('IPV'), // Polio (IPV)
    translate('HIB'), // Haemophilus Influenzae Type B (Hib)
    translate('PCV'), // Pneumococcal Vaccine (PCV)
    translate('RV'), // Rotavirus
    translate('FLU'), // Flu Vaccine
    translate('HEPA'), // Hepatitis A
    translate('MMR'), // Measles, Mumps, and Rubella (MMR)
    translate('CHKPOX'), // Chickenpox (Varicella)
  ];

  const dosageArray = [
    translate('dose1'), // First Shot
    translate('dose2'), // Second Shot
    translate('dose3'), // Third Shot
    translate('dose4'), // Fourth Shot
  ];

  // this method will set the id of immunizationInfo
  const doSetID = () => {
    let id = '';

    for (let i = 0; i < dosageArray.length; i++) {
      // start id with a number corresponding to the chosen dose #
      if (dosage === dosageArray[i]) {
        i += 1;
        id += i.toString();
        break;
      }
    }

    // finish id by adding on the letters corresponding to the chosen vaccine type
    if (type === immunizationArray[0]) id += 'HEPB';
    else if (type === immunizationArray[1]) id += 'DTAP';
    else if (type === immunizationArray[2]) id += 'IPV';
    else if (type === immunizationArray[3]) id += 'HIB';
    else if (type === immunizationArray[4]) id += 'PCV';
    else if (type === immunizationArray[5]) id += 'RV';
    else if (type === immunizationArray[6]) id = 'FLU';
    // in the case of the FLU shot, where dose # doesn't matter, remove the dose #
    else if (type === immunizationArray[7]) id += 'HEPA';
    else if (type === immunizationArray[8]) id += 'MMR';
    else if (type === immunizationArray[9]) id += 'CHKPOX';

    setID(id);
  };

  const immunizations = immunizationArray.map((immunization) => ({
    label: immunization,
    value: immunization,
  }));

  const dosages = dosageArray.map((dosage) => ({
    label: dosage,
    value: dosage,
  }));

  const onPress = async () => {
    if (!type || !date || !dosage) {
      alert(translate('fillOutAllFields'));
    } else {
      doSetID();
      await addImmunization(uid, immunizationInfo);
      props.navigation.navigate('ImmunizationScreen');
    }
  };

  useEffect(() => {
    // This runs on every re-render
    if (type && dosage) onPress();
  }, [id]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const newDate = moment(date).format('MM/DD/YYYY');
    setDate(newDate);
    hideDatePicker();
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [immunizationItem, setImmunizationItem] = useState(immunizations);
  const [dosageItem, setDosageItem] = useState(dosages);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        alignItems: 'center',
        maxWidth: '100%',
      }}
      scrollEnabled
    >
      <View style={styles.container}>
        {/* Dropdown to select Immunization Type */}
        <Text style={styles.textTitle}>{translate('ImmunizationType')}</Text>
        <View style={styles.separator} />
        <Dropdown
          containerStyle={{...appStyles.Dropdown, width: '100%'}}
          dropdownOffset={{top: 0, bottom: 0, left: 0}}
          pickerStyle={appStyles.Picker}
          inputContainerStyle={{borderBottomColor: 'transparent'}}
          textAlign="center"
          itemTextStyle={{alignSelf: 'center'}}
          fontSize={12}
          dropdownPosition={-5}
          data={immunizationItem}
          label={translate('immunization')}
          value={type}
          useNativeDriver
          onChangeText={(value, index, data) => setType(value)}
        />

        {/* Dropdown to select Dose Number */}
        <Text style={styles.textTitle}>{translate('ImmunizationDose')}</Text>
        <View style={styles.separator} />
        <Dropdown
          containerStyle={{...appStyles.Dropdown, width: '100%'}}
          dropdownOffset={{top: 0, bottom: 0, left: 0}}
          pickerStyle={appStyles.Picker}
          inputContainerStyle={{borderBottomColor: 'transparent'}}
          textAlign="center"
          itemTextStyle={{alignSelf: 'center'}}
          fontSize={12}
          dropdownPosition={-5}
          data={dosageItem}
          label={translate('dosage')}
          value={dosage}
          useNativeDriver
          onChangeText={(value, index, data) => setDosage(value)}
        />
        <TextBox
          placeholderTextColor={appStyles.DefaultPlaceholderTextColor}
          placeholder={translate('immunizationNotes')}
          onChangeText={setNotes}
          value={notes}
          multiline
          numberOfLines={8}
          style={appStyles.TextInputImmunization}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.textTitle}>{translate('Date')}:</Text>
        <TouchableOpacity onPress={showDatePicker}>
          <Text style={styles.textStyle}>{date}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          is24Hour
          headerTextIOS="Pick a date"
          textColor="black"
        />
      </View>
      <View style={styles.separator} />
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          style={appStyles.button}
          text={translate('save')}
          onPress={onPress}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 0.1,
    width: '80%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 6,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: appStyles.win.height * 0.03,
    width: '80%',
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
