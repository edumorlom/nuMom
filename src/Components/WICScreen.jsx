import React, {useState, useEffect} from 'react';
import {Text, View, Linking, ScrollView, StyleSheet} from 'react-native';
import {getPreciseDistance} from 'geolib';
import {Picker} from '@react-native-picker/picker';
import * as Location from 'expo-location';
import {Dropdown} from 'react-native-material-dropdown-v2';
import {onValue} from 'firebase/database';
import Button from './Button';
import translate from './getLocalizedText';
import {getRef} from '../Firebase';
import SelectionButton from './SelectionButton';
import ChecklistButton from './ChecklistButton';
import appStyles from './AppStyles';
import breastfeeding from '../../assets/breastfeeding.png';
import fruits from '../../assets/fruits.png';
import vegetables from '../../assets/vegetables.png';
import grains from '../../assets/grains.png';
import proteins from '../../assets/proteins.png';
import formula from '../../assets/formula.png';
import checklist from '../../assets/check5list2.jpg';
import facilities from '../../assets/facilities.png';
import LocationsMap from './LocationsMap';
import BetterMenu from './BetterMenu';
import filterButton from '../../assets/Filter.png';

/*  Main home screen for WIC. Any additional tabs go here, and are defined in separate exported functions afterwards.
 *
 */
export const wicHome = (props) => {
  const toWebsite = () => {
    Linking.openURL('https://www.fns.usda.gov/wic/wic-how-apply');
  };

  const websiteButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text={translate('WSwebsite')}
      subtext={translate('WSwebsiteSubtext')}
      icon={breastfeeding}
      onPress={() => toWebsite()}
    />
  );

  const checklistButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text={translate('WSchecklist')}
      subtext={translate('WSchecklistSubtext')}
      icon={checklist}
      onPress={() => props.navigation.navigate('WICChecklist')}
    />
  );

  const locationsButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text={translate('WSlocations')}
      subtext={translate('WSlocationsSubtext')}
      icon={facilities}
      onPress={() => props.navigation.navigate('WICLocations')}
    />
  );

  const feedingButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text={translate('WSfeeding')}
      subtext={translate('WSfeedingSubtext')}
      icon={breastfeeding}
      onPress={() => props.navigation.navigate('WICFeeding')}
    />
  );

  return (
    <View style={appStyles.contentContainer}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}
      >
        {checklistButton}
        {feedingButton}
        {locationsButton}
        {websiteButton}
      </ScrollView>
    </View>
  );
};

export const wicChecklist = () => {
  const checklist = [
    {
      text: translate('WSCfamily'),
      subtext: translate('WSCfamilySubtext'),
    },
    {
      text: translate('WSCincome'),
      subtext: translate('WSCincomeSubtext'),
    },
    {
      text: translate('WSCaddress'),
      subtext: translate('WSCaddressSubtext'),
    },
    {
      text: translate('WSCid'),
      subtext: translate('WSCidSubtext'),
    },
    {
      text: translate('WSCmeasurement'),
      subtext: translate('WSCmeasurementSubtext'),
    },
    {
      text: translate('WSCssn'),
      subtext: translate('WSCssnSubtext'),
    },
    {
      text: translate('WSCimmunization'),
      subtext: translate('WSCimunizationSubtext'),
    },
  ];

  return (
    <View style={appStyles.contentContainer}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center', maxWidth: '100%'}}
      >
        {checklist.map((checklist, key) => (
          <ChecklistButton
            style={appStyles.ImageOnRightSelectionButton}
            text={checklist.text}
            subtext={checklist.subtext}
            key={key}
            keyIdentifier={`WIC${key}`} // send a prop to ChecklistButton.jsx to differentiate between different checklists and checklist items
          />
        ))}
      </ScrollView>
    </View>
  );
};

export const wicLocations = (props) => {
  const [fullPanel, setFullPanel] = useState(true);
  const [wics, setWICS] = useState([]);
  const [sortedWICS, setSortedWICS] = useState(null);
  const [filters, setFilters] = useState([10000, 'All']);
  const [wicToView, setWICToView] = useState(null);
  const [lowerPanelContent, setLowerPanelContent] = useState('selection');
  const [dist, setDist] = useState(filters[0]);
  const [filterToShow, setFilterToShow] = useState(false);

  useEffect(() => {
    fetchResources(); // Can only call one function inside useEffect when dealing with asyncs
    setDist(filters[0]);
  });

  // This is a holder function for fetching the facilities (clinics and shelters) asynchronously
  let fetchResources = async () => {
    sortWIC(await fetchWIC()); // Sorts the fetched WIC
  };

  let fetchWIC = async () =>
    new Promise((resolve, reject) => {
      let wicRef = getRef('WIC');

      onValue(
        wicRef,
        (snapshot) => {
          resolve(snapshot.val());
        },
        {
          onlyOnce: true,
        }
      );
    });

  const sortWIC = async (wicLocations) => {
    try {
      let position = await Location.getCurrentPositionAsync({});
      let WICLocations = wicLocations; // For mutation, cant mutate param
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      WICLocations.forEach((wic) => {
        // Returns a precise distance between the two coordinates given (Clinic & User)
        let dist = getPreciseDistance(wic.coordinate, {
          latitude,
          longitude,
        });
        let distanceInMiles = Number(((dist / 1000) * 0.621371).toFixed(2)); // Convert meters to miles with 2 decimal places
        wic.distance = distanceInMiles; // store the distance as a property of clinic
      });
      WICLocations.sort((a, b) => a.distance - b.distance); // Sort by lowest distance
      setWICS(WICLocations);
      setSortedWICS(WICLocations);
      // SortedClinics is never changed, where as clinics does get changed
    } catch (err) {
      console.error(err);
    }
  };

  let locations = sortedWICS;

  // Filters shelters based on dist passed
  const filterWIC = (distance) => {
    if (distance !== 10000 && wics) {
      // if distance filter is not default value
      locations = locations.filter(
        (location) =>
          // filter by distance
          location.distance <= distance
      );
    }
    // Update the states with the new info
    setWICS(locations);
    setFilters([distance]);
    setDist(distance);
  };

  const getResourceName = (name) =>
    name.length > 40 ? `${name.substring(0, 40)}...` : name;

  const distances = [
    {label: translate('All'), value: 10000},
    {label: `5 ${translate('Miles')}`, value: 5.5},
    {label: `10 ${translate('Miles')}`, value: 10.5},
    {label: `15 ${translate('Miles')}`, value: 15.5},
    {label: `20 ${translate('Miles')}`, value: 20.5},
  ];

  const wicButtons = wics.map((wic, key) => (
    <SelectionButton
      style={appStyles.ClinicSelectionButton}
      key={key}
      text={getResourceName(wic.resource)}
      //translation needed
      subtext={`${wic.address.street}\n${wic.address.city}\n${wic.address.state}, ${wic.address.zipCode}\n${wic.distance} miles`}
      icon={breastfeeding}
      onPress={() => {
        props.navigation.navigate('LocationsInfo', {
          location: wic,
        });
      }}
    />
  ));
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <View style={appStyles.container}>
          <LocationsMap
            onPress={() => setFullPanel(false)} // This does not work, explanation at the bottom **
            setFullPanel={setFullPanel}
            medicaidToView={wicToView}
            setMedicaidToView={setWICToView}
            setLowerPanelContent={setLowerPanelContent}
            locations={wics}
            style={{}}
            navigation={props.navigation}
          />
        </View>
        <View style={{height: appStyles.win.height * 0.6}}>
          <View
            style={{
              flexDirection: 'row-reverse',
              height: appStyles.win.height * 0.085,
            }}
          >
            <Button
              style={appStyles.FilterButton}
              icon={filterButton}
              underlayColor="transparent"
              onPress={() => setFilterToShow(!filterToShow)}
            />
            <Text style={{width: appStyles.win.width * 0.15}}>
              {/* This Text component is used to fill space */}
            </Text>
            {filterToShow && ( // If filter set to show, display the filter dropdown
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
                onChangeText={(value, index, data) => filterWIC(value)}
              />
            )}
          </View>
          <ScrollView>{wicButtons}</ScrollView>
        </View>
      </View>
    </>
  );
};

/* Note: There has to be a cleaner way of showing these SelectionButtons,
 * maybe someone in the future might try pls?
 */
export const wicFeeding = () => {
  const [age, setAge] = useState(0);

  const showFeedingByAge = () => {
    if (age == 0) {
      return (
        <View>
          <BetterMenu
            style={appStyles.ImageDarkOnSelectionButton}
            text= {translate('WSFmilk')}
            subtext={translate('WSFmilkAge0Subtext')}
            icon={breastfeeding}
          />
        </View>
      );
    }
    if (age == 6) {
      return (
        <View>
          <BetterMenu
            style={appStyles.ImageDarkOnSelectionButton}
            text={translate('WSFmilk')}
            subtext={translate('WSFbreastfeedSubtext')}
            icon={breastfeeding}
          />
          <BetterMenu
            style={appStyles.ImageDarkOnSelectionButton}
            text={translate('WSFformula')}
            subtext={translate('WSFformulaSubtext')}
            icon={formula}
          />
          <BetterMenu
            style={appStyles.ImageDarkOnSelectionButton}
            text={translate('WSFgrain')}
            subtext={translate('WSFgrainSubtext')}
            icon={grains}
          />
          <BetterMenu
            style={appStyles.ImageDarkOnSelectionButton}
            text={translate('WSFvegetables')}
            subtext={translate('WSFvegetablesSubtext')}
            icon={vegetables}
          />
          <BetterMenu
            style={appStyles.ImageDarkOnSelectionButton}
            text={translate('WSFfruits')}
            subtext={translate('WSFfruitsSubtext')}
            icon={fruits}
          />
          <BetterMenu
            style={appStyles.ImageDarkOnSelectionButton}
            text={translate('WSFprotein')}
            subtext={translate('WSFproteinSubtext')}
            icon={proteins}
          />
        </View>
      );
    }
    if (age == 8) {
      return (
        <View>
          <BetterMenu
            style={appStyles.ImageDarkOnSelectionButton}
            text={translate('WSFmilk')}
            subtext={translate('WSFmilkAge8')}
            icon={breastfeeding}
          />
          <BetterMenu
            style={appStyles.ImageDarkOnSelectionButton}
            text={translate('WSFformula')}
            subtext={translate('WSFformulaAge8')}
            icon={formula}
          />
          <BetterMenu
            style={appStyles.ImageDarkOnSelectionButton}
            text={translate('WSFgrain')}
            subtext={translate('WSFgrainAge8')}
            icon={grains}
          />
          <BetterMenu
            style={appStyles.ImageDarkOnSelectionButton}
            text={translate('WSFvegetables')}
            subtext={translate('WSFvegetablesAge8')}
            icon={vegetables}
          />
          <BetterMenu
            style={appStyles.ImageDarkOnSelectionButton}
            text={translate('WSFfruits')}
            subtext={translate('WSFfruitsAge8')}
            icon={fruits}
          />
          <BetterMenu
            style={appStyles.ImageDarkOnSelectionButton}
            text={translate('WSFprotein')}
            subtext={translate('WSFproteinAge8')}
            icon={proteins}
          />
        </View>
      );
    }
    if (age == -1) {
      return (
        <ScrollView contentContainerStyle={appStyles.contentContainer}>
          <BetterMenu
            style={appStyles.FeedingNotes}
            text={translate('WSFAge-1subtext1')}
          />
          <BetterMenu
            style={appStyles.FeedingNotes}
            text={translate('WSFAge-1subtext2')}
          />
          <BetterMenu style={appStyles.FeedingNotes} text={translate('WSFAge-1subtext3')} />
          <BetterMenu
            style={appStyles.FeedingNotes}
            text={translate('WSFAge-1subtext4')}
          />
          <BetterMenu
            style={appStyles.FeedingNotes}
            text={translate('WSFAge-1subtext5')}
          />
          <BetterMenu
            style={appStyles.FeedingNotes}
            text={translate('WSFAge-1subtext6')}
          />
        </ScrollView>
      );
    }
    if (age == -2) {
      return (
        <View>
          <BetterMenu
            style={appStyles.FeedingNotes}
            text={translate('WSFAge-2subtext1')}
          />
          <BetterMenu
            style={appStyles.FeedingNotes}
            text={translate('WSFAge-2subtext2')}
          />
          <BetterMenu
            style={appStyles.FeedingNotes}
            text={translate('WSFAge-2subtext3')}
          />
          <BetterMenu
            style={appStyles.FeedingNotes}
            text={translate('WSFAge-2subtext4')}
          />
          <BetterMenu
            style={appStyles.FeedingNotes}
            text={translate('WSFAge-2subtext5')}
          />
          <BetterMenu
            style={appStyles.FeedingNotes}
            text={translate('WSFAge-2subtext6')}
          />
        </View>
      );
    }
    return <View />;
  };
//translate('WSDropdownTitle')
  return (
    <View style={appStyles.contentContainer}>
      <View style={styles.containerDropDown}>
        <Text>
        {translate('WSDropdownTitle')}{'\n'}
        </Text>
        <Picker
          selectedValue={age}
          style={styles.questionsDropDown}
          onValueChange={(itemValue, itemIndex) => setAge(itemValue)}
        >
          <Picker.Item label={translate('WSDropdownSelection1')} value={0} />
          <Picker.Item label={translate('WSDropdownSelection2')} value={6} />
          <Picker.Item label={translate('WSDropdownSelection3')} value={8} />
          <Picker.Item label={translate('WSDropdownSelection4')} value={-1} />
          <Picker.Item label={translate('WSDropdownSelection5')} value={-2} />
        </Picker>
      </View>

      {/* }
    <DropDownPicker
    items={[
      {label: '0-6 Months', value: 0,   hidden: true},
      {label: '6-8 Months', value: 6,},
      {label: '8-12 Months', value: 8, },
      {label: 'Foods to Avoid', value: -1, },
      {label: 'Important Notes', value: -2, },
  ]}
    defaultValue={age}
    containerStyle={{height: 40}}
    style={{backgroundColor: '#fafafa'}}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{backgroundColor: '#fafafa'}}
    onChangeItem={items => setAge(items.value)}
/>
  */}

      <ScrollView>{showFeedingByAge()}</ScrollView>
    </View>
  );
};

const SubmitButton = StyleSheet.create({
  Touchable: appStyles.button.Touchable,
  Text: appStyles.button.Text,
});

const styles = StyleSheet.create({
  containerDropDown: {
    ...Platform.select({
      ios: {
        marginTop: 30,
        alignItems: 'center',
        height: 160,
        width: 300,
      },
      android: {
        marginTop: 30,
        alignItems: 'center',
        height: 100,
        width: 300,
      },
    }),
  },
  questionsDropDown: {
    ...Platform.select({
      ios: {
        width: 250,
        bottom: 50,
      },
      android: {
        width: 250,
        bottom: 30,
      },
    }),
  },
});
