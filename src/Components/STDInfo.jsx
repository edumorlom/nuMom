import React from 'react';
import {
  TouchableHighlight,
  Text,
  View,
  ScrollView,
  Linking,
} from 'react-native';
import ActionButton from './Button';
import appStyles from './AppStyles';
import Menu from './Menu';
import STD from './STD';
import translate from './getLocalizedText';
import visitSiteIcon from '../../assets/safari-visit-site.png';

export default function STDInfo({route}) {
  const {name} = route.params;
  const {symptoms} = route.params;
  const {diagnosis} = route.params;
  const {treatment} = route.params;
  const {consequences} = route.params;
  const {safeSex} = route.params;
  const {website} = route.params;

  const visitSite = () => {
    Linking.openURL(website);
  };

  return (
    <View style={appStyles.contentContainer}>
      <ScrollView>
        <ActionButton
          style={appStyles.ActionButton}
          text={translate('visitSite')}
          subtext={website.split('/')[2]}
          onPress={visitSite}
          icon={visitSiteIcon}
        />
        <Menu title={translate('symptoms')} info={translate(symptoms)} />
        <Menu title={translate('testing')} info={translate(diagnosis)} />
        <Menu title={translate('treatment')} info={translate(treatment)} />
        <Menu
          title={translate('consequences')}
          info={translate(consequences)}
        />
        <Menu title={translate('safeSex')} info={translate(safeSex)} />
      </ScrollView>
    </View>
  );
}
