import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Linking,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {getPreciseDistance} from 'geolib';
import {Picker} from '@react-native-picker/picker'
import {getRef} from '../Firebase';
import SelectionButton from './SelectionButton';
import ChecklistButton from './ChecklistButton';
import appStyles from './AppStyles';
import breastfeeding from '../../assets/breastfeeding.png';
import checklist from '../../assets/check5list2.jpg';
import facilities from '../../assets/facilities.png';
import * as Location from 'expo-location';
import LocationsMap from './LocationsMap';
import BetterMenu from './BetterMenu';

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
      text="Website"
      subtext="Eligibility requirements and more"
      icon={breastfeeding}
      onPress={() => toWebsite()}
    />
  );

  const checklistButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text="Checklist"
      subtext="Don't forget to bring these things to your WIC appointment!"
      icon={checklist}
      onPress={() => props.navigation.navigate('WICChecklist')}
    />
  );

  const locationsButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text="Locations"
      subtext="Find a WIC office near you."
      icon={facilities}
      onPress={() => props.navigation.navigate('WICLocations')}
    />
  );

  const feedingButton = (
    <SelectionButton
      style={appStyles.ImageOnRightSelectionButton}
      text="Feeding"
      subtext="Guidelines for Feeding Healthy Infants"
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
        {locationsButton}
        {feedingButton}
        {websiteButton}
      </ScrollView>
    </View>
  );
};

export const wicChecklist = () => {
  const checklist = [
    {
      text: 'Family members',
      subtext: 'Each member who is applying to receive WIC must be present.',
    },
    {
      text: 'Proof of Income of all family members',
      subtext:
        'Salaries, child support, alimony, foster care payments, interest withdrawn, unemployment.',
    },
    {
      text: 'Proof of Current Address',
      subtext:
        "Utility bill, bank/insurance statement, voter registration card, or driver's license.",
    },
    {
      text: 'Proof of Identification for you AND for any infant or child',
      subtext:
        "Birth certificate, driver's license, crib card, military ID, photo ID, Social Security Card.",
    },
    {
      text: 'Measurements for EACH woman, infant, and child.',
      subtext: 'Height/Weight, hemoglobin or hematocrit blood test results.',
    },
    {
      text: 'Social Security Number (SSN)',
      subtext:
        'You must have the SSN for each person applying for WIC, if available.',
    },
    {
      text: 'Immunization (shot) record for each child',
      subtext:
        'You must have the Immunization (shot) record for each child applying for WIC.',
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
            keyIdentifier = {"WIC" + key}
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
  const [shelterToView, setShelterToView] = useState(null);
  const [STDToView, setSTDToView] = useState(null);
  const [lowerPanelContent, setLowerPanelContent] = useState('selection');

  useEffect(() => {
    fetchResources(); // Can only call one function inside useEffect when dealing with asyncs
  }, []);

  // This is a holder function for fetching the facilities (clinics and shelters) asynchronously
  let fetchResources = async () => {
    sortWIC(await fetchWIC()); // Sorts the fetched WIC
  };

  let fetchWIC = async () =>
    new Promise((resolve, reject) => {
      let wicRef = getRef('WIC');
      wicRef.once('value', (snapshot) => {
        resolve(snapshot.val());
      });
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

  const getResourceName = (name) =>
    name.length > 40 ? `${name.substring(0, 40)}...` : name;

  const wicButtons = wics.map((wic, key) => (
    <SelectionButton
      style={appStyles.ClinicSelectionButton}
      key={key}
      text={getResourceName(wic.resource)}
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
          wicToView={wicToView}
          setWICToView={setWICToView}
          setLowerPanelContent={setLowerPanelContent}
          locations={wics}
          style={{}}
          navigation={props.navigation}
        />
      </View>
      <View style={{height: 400}}>
        <ScrollView>{wicButtons}</ScrollView>
      </View>
    </View>
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
            style={appStyles.ImageOnRightSelectionButton}
            text="Human Milk"
            subtext="Only human milk (or formula) is needed for the first 6 months"
            icon={breastfeeding}
          />
        </View>
      );
    }
    if (age == 6) {
      return (
        <View>
          <BetterMenu
            style={appStyles.ImageOnRightSelectionButton}
            text="Human Milk"
            subtext="Continue to breastfeed on demand."
            icon={breastfeeding}
          />
          <BetterMenu
            style={appStyles.ImageOnRightSelectionButton}
            text="Infant Formula"
            subtext={
              '24-32 ounces\nOr based on individual nutritional assessment'
            }
            icon={breastfeeding}
          />
          <BetterMenu
            style={appStyles.ImageOnRightSelectionButton}
            text="Grain Products"
            subtext={
              '1-2 ounces\nIron-fortified infant cereals, bread, small pieces of cracker'
            }
            icon={breastfeeding}
          />
          <BetterMenu
            style={appStyles.ImageOnRightSelectionButton}
            text="Vegetables"
            subtext={'2-4 ounces\nCooked, plain strained/pureed/mashed'}
            icon={breastfeeding}
          />
          <BetterMenu
            style={appStyles.ImageOnRightSelectionButton}
            text="Fruits"
            subtext={'2-4 ounces\nPlain strained/pureed/mashed'}
            icon={breastfeeding}
          />
          <BetterMenu
            style={appStyles.ImageOnRightSelectionButton}
            text="Protein-rich Foods"
            subtext={
              '1-2 ounces\nPlain strained/pureed/mashed meat, poultry, fish, eggs, cheese, yogurt, or mashed legumes'
            }
            icon={breastfeeding}
          />
        </View>
      );
    }
    if (age == 8) {
      return (
        <View>
          <BetterMenu
            style={appStyles.ImageOnRightSelectionButton}
            text="Human Milk"
            subtext="Provide guidance and encouragement to breastfeeding mothers and continue to support those mothers who choose to breastfeed beyond 12 months"
            icon={breastfeeding}
          />
          <BetterMenu
            style={appStyles.ImageOnRightSelectionButton}
            text="Infant Formula"
            subtext={'24 ounces\nOr based on individual nutritional assessment'}
            icon={breastfeeding}
          />
          <BetterMenu
            style={appStyles.ImageOnRightSelectionButton}
            text="Grain Products"
            subtext={
              '2-4 ounces\nIron-fortified infant cereals, baby crackers, bread, noodles, corn grits, soft tortilla pieces'
            }
            icon={breastfeeding}
          />
          <BetterMenu
            style={appStyles.ImageOnRightSelectionButton}
            text="Vegetables"
            subtext={'4-6 ounces\nCooked, finely chopped/diced'}
            icon={breastfeeding}
          />
          <BetterMenu
            style={appStyles.ImageOnRightSelectionButton}
            text="Fruits"
            subtext={'4-6 ounces\nFinely chopped/diced'}
            icon={breastfeeding}
          />
          <BetterMenu
            style={appStyles.ImageOnRightSelectionButton}
            text="Protein-rich Foods"
            subtext={
              '2-4 ounces\nGround/finely chopped/diced meat, poultry, fish, eggs, cheese, yogurt, or mashed legumes'
            }
            icon={breastfeeding}
          />
        </View>
      );
    }
    if (age == -1) {
      return (
        <ScrollView contentContainerStyle={appStyles.contentContainer}>
          <BetterMenu
            style={appStyles.Notes}
            text="Soda, gelatin, coffee, tea, fruit punches and -ade drinks"
          />
          <BetterMenu
            style={appStyles.Notes}
            text="Cow milk until 12 months"
          />
          <BetterMenu 
            style={appStyles.Notes} 
            text="Added Salt"
          />
          <BetterMenu
            style={appStyles.Notes}
            text="Added oil, butter, other fats, seasoning"
          />
          <BetterMenu
            style={appStyles.Notes}
            text="Added sugar, syrups, other sweetners"
          />
          <BetterMenu
            style={appStyles.Notes}
            text="Fried foods, gravies, sauces, processed meats"
          />
        </ScrollView>
      );
    }
    if (age == -2) {
      return (
        <View>
          <BetterMenu
            style={appStyles.Notes}
            text="Infants under 12 months of age should not consume juice unless clinically indicated. After 12 months, encourage fruit over fruit juice; any juice consumed should be as part of a meal or snack and from an open cup (i.e., not bottles or easily transportable covered cups)."
          />
          <BetterMenu
            style={appStyles.Notes}
            text="Babies weaned from human milk before 12 months should receive iron-fortified formula."
          />
          <BetterMenu
            style={appStyles.Notes}
            text="Wean entirely off the bottle and onto a cup at 12 to 14 months."
          />
          <BetterMenu
            style={appStyles.Notes}
            text="Keep bottles out of bedtime and nap routines to avoid exposing infants’ teeth to sugars and reduce the risk for ear infections and choking."
          />
          <BetterMenu
            style={appStyles.Notes}
            text="Check carefully for bones in commercially or home-prepared meals containing meat, fish, or poultry."
          />
          <BetterMenu
            style={appStyles.Notes}
            text="Remove seeds, skin, and pits from fruits. For additional choking prevention information, refer to the Infant Feeding: Tips for Food Safety job aid."
          />
        </View>
      );
    }
    return <View />;
  };

  return (
    <View style={appStyles.contentContainer}>
      <View style={styles.containerDropDown}>
        <Text>
            Select Age of Infant or Relevant Information concerning Foods for
            Infants{'\n'}
        </Text>
        <Picker
          selectedValue={age}
          style={styles.questionsDropDown}
          onValueChange={(itemValue, itemIndex) => setAge(itemValue)}
        >
          <Picker.Item label="0-6 Months" value={0} />
          <Picker.Item label="6-8 Months" value={6} />
          <Picker.Item label="8-12 Months" value={8} />
          <Picker.Item label="Foods to Avoid" value={-1} />
          <Picker.Item label="Important Notes" value={-2} />
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
        height: 80,
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
        width: 100,
        bottom: 10,
      },
    }),
  },
});
