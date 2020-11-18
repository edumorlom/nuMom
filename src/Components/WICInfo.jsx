import {View, Linking, Text, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import SelectionButton from './SelectionButton';
import ActionButton from './Button';
import directionsArrow from '../../assets/directions-arrow.png';
import appStyles from './AppStyles';
import visitSiteIcon from '../../assets/safari-visit-site.png';
import callIcon from '../../assets/call-icon.png';
import translate from './getLocalizedText';
import WICMap from './WICMap';

export default function WICInfo({route}) {
  const {wic} = route.params;
  const [fullPanel, setFullPanel] = useState(true);
  const [wics, setWICS] = useState([]);
  const [sortedWICS, setSortedWICS] = useState(null);
  const [filters, setFilters] = useState([10000, 'All']);
  const [wicToView, setWICToView] = useState(null);
  const [shelterToView, setShelterToView] = useState(null);
  const [STDToView, setSTDToView] = useState(null);
  const [lowerPanelContent, setLowerPanelContent] = useState('selection');

  let wicList = [wic];

  let getDirections = () => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${wic.coordinate.latitude},${wic.coordinate.longitude}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };

  let call = () => {
    Linking.openURL(`tel:${wic.phoneNumber}`);
  };

  let visitSite = () => {
    Linking.openURL(`http://${wic.website}`);
  };

  let getResourceName = (name) => {
    return name.length > 40 ? `${name.substring(0, 40)}...` : name;
  };

  let clinicInfo = `${wic.address.street}\n${wic.address.city}\n${wic.address.state}, ${wic.address.zipCode}\n${wic.distance} miles`;

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <View style={appStyles.container}>
        <WICMap
          onPress={() => setFullPanel(false)} // This does not work, explanation at the bottom **
          setFullPanel={setFullPanel}
          wicToView={wicToView}
          setWICToView={setWICToView}
          setLowerPanelContent={setLowerPanelContent}
          wics={wicList}
          style={{}}
        />
      </View>
      <View style={{height: 400}}>
        <ScrollView>
          <SelectionButton
            style={appStyles.ClinicSelectionButton}
            text={getResourceName(wic.resource)}
            subtext={`${clinicInfo}`}
            icon={directionsArrow}
            onPress={getDirections}
          />
          {console.log(wic.website)}
          <ActionButton
            style={appStyles.ActionButton}
            text={translate('visitSite')}
            subtext={wic.website.split('/', 3)}
            onPress={visitSite}
            icon={visitSiteIcon}
          />
          <ActionButton
            style={appStyles.ActionButton}
            text={translate('callClinic')}
            subtext={wic.phoneNumber}
            onPress={call}
            icon={callIcon}
          />
        </ScrollView>
      </View>
    </View>
  );
}
