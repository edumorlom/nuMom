import {
  Text,
  TouchableHighlight,
  View,
  Alert,
} from 'react-native';
import React from 'react';
import {Feather} from '@expo/vector-icons';
import appStyles, {borderRadius, shadow} from './AppStyles';
import translate from './getLocalizedText';

export default function ImmunizationMenu(props) {
  const {type, dosage, date, notes, id} = props.immunizations?.val();

  AsyncAlert = () =>
    new Promise((resolve, reject) => {
      Alert.alert(
        translate('RemoveImmunization'),
        translate('WantToRemoveImmunization'),
        [
          {text: translate('Yes'), onPress: () => resolve(true)},
          {text: translate('No'), onPress: () => resolve(false)},
        ],
        {cancelable: false}
      );
    });

  return (
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
        <View style={{marginRight: 50}}>
          {/* Show the vaccine type and dose # (if vaccine is FLU, dose # is not shown) */}
          <Text
            style={{
              color: appStyles.blueColor,
              fontSize: appStyles.regularFontSize + 1,
              fontWeight: 'bold',
            }}
          >
            {id === 'FLU'
              ? translate(id)
              : translate(id.toString().substring(1))}
            {id === 'FLU'
              ? ''
              : ` - ${translate(`dose${id.toString().substring(0, 1)}`)}`}
          </Text>

          {/* Show the date of the immunization */}
          <Text
            style={{
              color: appStyles.greyColor,
              fontSize: appStyles.regularFontSize - 3,
            }}
          >
            {date}
          </Text>

          {/* Show the notes added by the user, if any */}
          <Text
            style={{
              color: appStyles.greyColor,
              fontSize: appStyles.regularFontSize - 3,
            }}
          >
            {notes}
          </Text>
        </View>

        {/* Remove Immunization Button */}
        <TouchableHighlight
          style={{
            position: 'absolute',
            right: appStyles.win.width * 0.05,
            top: appStyles.win.height * 0.025,
          }}
          underlayColor="transparent"
          onPress={() => {
            AsyncAlert().then((response) => {
              response
                ? props.removeImmunization(props.immunizations?.key)
                : null;
            });
          }}
        >
          <Feather name="trash" size={40} color="#eb1800" />
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
  );
}
