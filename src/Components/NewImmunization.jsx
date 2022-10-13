import {
  Text,
  TouchableOpacity,
  TextInput as TextBox,
  View,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import translate from './getLocalizedText';
import Button from './Button';
import appStyles, {greyColor, shadow} from './AppStyles';
import {getUid, addImmunization} from '../Firebase';

export default function NewImmunization(props) {
  immunization = [
    ([type, setType] = useState(null)),
    ([dosage, setDosage] = useState(null)),
    ([date, setDate] = useState(
      `${moment().format('MM')}/${moment().format('DD')}/${moment().format(
        'YYYY'
      )}`
    )),
    ([notes, setNotes] = useState(null)),
    ([isDatePickerVisible, setDatePickerVisibility] = useState(false)),
    ([id, setID] = useState()),
  ];
  const uid = getUid();

  immunizationInfo = {
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
  doSetID = () => {
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

  onPress = async () => {
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

  showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  handleConfirm = (date) => {
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
        <DropDownPicker
          containerStyle={{
            ...styles.Dropdown,
          }}
          pickerStyle={{
            ...styles.Picker,
          }}
          value={value}
          items={immunizationItem}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setImmunizationItem}
          onChangeItem={(value) => setType(value.label)}
          zIndex={3000}
          zIndexInverse={1000}
        />

        {/* Dropdown to select Dose Number */}
        <Text style={styles.textTitle}>{translate('ImmunizationDose')}</Text>
        <DropDownPicker
          containerStyle={{
            ...styles.Dropdown,
          }}
          pickerStyle={{
            ...styles.Picker,
          }}
          value={value}
          items={dosageItem}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setDosageItem}
          onChangeItem={(value) => setDosage(value.label)}
          zIndex={2000}
          zIndexInverse={2000}
        />
        <TextBox
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
      <View style={styles.seperator} />
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
  Dropdown: {
    backgroundColor: 'white',
    borderColor: greyColor,
    width: '100%',
    paddingTop: '5%',
    borderRadius: 5,
  },
  Picker: {
    backgroundColor: 'white',
    ...shadow,
    borderColor: greyColor,
    borderRadius: 15,
    alignSelf: 'center',
    width: '90%',
  },
  seperator: {
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
