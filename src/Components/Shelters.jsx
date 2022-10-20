import React, {useState, useEffect} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown-v2';
import SelectionButton from './SelectionButton';
import shelterLogo from '../../assets/shelter-logo.png';
import appStyles, {borderRadius, greyColor, shadow} from './AppStyles';
import translate from './getLocalizedText';

export default function Shelters(props) {
  const [dist, setDist] = useState(props.filters[0]);

  useEffect(() => {
    // This runs on every re-render
    setDist(props.filters[0]);
  });

  const getResourceName = (name) =>
    name.length > 40 ? `${name.substring(0, 40)}...` : name;

  const window = appStyles.win;

  const shelterButtons = props.shelters.map((shelter, key) => (
    <SelectionButton
      style={appStyles.ClinicSelectionButton}
      key={key}
      text={getResourceName(shelter.resource)}
      subtext={`${shelter.address.street}\n${shelter.address.city}\n${shelter.address.state}, ${shelter.address.zipCode}\n${shelter.distance} miles`}
      icon={shelterLogo}
      onPress={() => {
        props.setShelterToView(shelter);
        props.setLowerPanelContent('shelterInfo');
      }}
    />
  ));

  let shelters = props.sortedShelters;

  // Filters shelters based on dist passed
  const filterShelters = (distance) => {
    if (distance !== 10000 && shelters) {
      // if distance filter is not default value
      shelters = shelters.filter(
        (shelter) =>
          // filter by distance
          shelter.distance <= distance
      );
    }

    // Update the states with the new info
    props.setShelters(shelters);
    props.setFilters([distance]);
    setDist(distance);
  };

  const distances = [
    {label: translate('All'), value: 10000},
    {label: `5 ${translate('Miles')}`, value: 5.5},
    {label: `10 ${translate('Miles')}`, value: 10.5},
    {label: `15 ${translate('Miles')}`, value: 15.5},
    {label: `20 ${translate('Miles')}`, value: 20.5},
  ];

  return (
    // The <> tag is shorthand for React.Fragment <= look it up
    <>
      {props.filterToShow && ( // If filter set to show, display the filter dropdown
        <View style={{flexDirection: 'row', height: window.height * 0.085}}>
          <Dropdown
            containerStyle={{...appStyles.Dropdown, right: '10%'}}
            dropdownOffset={{top: 0, bottom: 0, left: 0}}
            pickerStyle={appStyles.Picker}
            inputContainerStyle={{borderBottomColor: 'transparent'}}
            textAlign="center"
            itemTextStyle={{alignSelf: 'center'}}
            fontSize={12}
            data={distances}
            label={translate('Distance')}
            value={dist}
            useNativeDriver
            onChangeText={(value, index, data) => filterShelters(value)}
          />
        </View>
      )}
      <ScrollView
        contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}
      >
        {shelterButtons}
      </ScrollView>
    </>
  );
}
