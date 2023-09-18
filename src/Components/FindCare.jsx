import React, {useState, useEffect, useMemo} from 'react';
import {ScrollView, View} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown-v2';
import SelectionButton from './SelectionButton';
import appStyles from './AppStyles';
import translate from './getLocalizedText';

export default function FindCare(props) {
  const [dist, setDist] = useState(props.filters[0]);
  const [service, setService] = useState(props.filters[1]);

  useEffect(() => {
    // This runs on every re-render
    setDist(props.filters[0]);
    setService(props.filters[1]);
  });

  // props.filterToShow

  const getResourceName = (name) =>
    name.length > 40 ? `${name.substring(0, 40)}...` : name;

  const window = appStyles.win;

  const clinicsButtons = useMemo (() => {
      return props.clinics.map((clinic, key) => (
      <SelectionButton
        style={appStyles.ClinicSelectionButton}
        key={key}
        text={getResourceName(clinic.resource)}
        subtext={`${clinic.address.street}\n${clinic.address.city}\n${clinic.address.state}, ${clinic.address.zipCode}\n${clinic.distance} miles`}
        icon={{uri: clinic.logoImage}}
        onPress={() => {
          props.setClinicToView(clinic);
          props.setLowerPanelContent('clinicInfo');
        }}
      />
    ));
  }, [props.clinics]);

  let clinics = props.sortedClinics;

  // Filters clinics based on the two filters passed
  const filterClinics = (distance, service) => {
    if (distance !== 10000 && clinics) {
      // if distance filter is not default value
      clinics = clinics.filter(
        (clinic) =>
          // filter by distance
          clinic.distance <= distance
      );
    }

    if (service !== 'All' && clinics) {
      // if service filter is not default value
      clinics = clinics.filter((clinic) => clinic.services.includes(service)); // filter by service
    }
    // Update the states with the new info
    props.setClinics(clinics);
    props.setFilters([distance, service]);
    setDist(distance);
    setService(service);
  };

  const servicesArray = [
    'All',
    'Abortions',
    'Free Materials',
    'Immunization',
    'Lab services',
    'Medical Care',
    'Pregnancy Tests',
    'Referrals',
    'Yearly Exam',
  ];

  const services = servicesArray.map((service) => ({
    label: translate(service),
    value: service,
  })); // Creates an array of dropdown data

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
            onChangeText={(value, index, data) => filterClinics(value, service)}
          />

          <Dropdown
            containerStyle={{...appStyles.Dropdown, left: '10%'}}
            dropdownOffset={{top: 0, bottom: 0, left: 0}}
            pickerStyle={appStyles.Picker}
            inputContainerStyle={{borderBottomColor: 'transparent'}}
            textAlign="center"
            itemTextStyle={{alignSelf: 'center'}}
            fontSize={12}
            data={services}
            label={translate('services')}
            value={service}
            useNativeDriver
            onChangeText={(value, index, data) => filterClinics(dist, value)}
          />
        </View>
      )}
      <ScrollView
        contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}
      >
        {clinicsButtons}
      </ScrollView>
    </>
  );
}
