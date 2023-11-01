import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import {MaterialIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import babyBottle from '../../assets/baby-bottle.png';
import clinicLogo from '../../assets/facilities.png';
import lightBulb from '../../assets/light-bulb.png';
import WelcomeUserBanner from './WelcomeUserBanner';
import SelectionButton from './SelectionButton';
import translate from './getLocalizedText';
import appStyles from './AppStyles';
import Button from './Button';

export default function LowerPanelSelection(props) {
  const navigation = useNavigation();

  return (
    <>
      <GestureRecognizer
        onSwipeUp={() => props.setFullPanel(true)}
        onSwipeDown={() => props.setFullPanel(false)}
        style={{
          width: appStyles.win.width,
          height: appStyles.win.height * 0.16,
          alignItems: 'center',
        }}
      >
        <Button
          style={{
            Touchable: {
              height: appStyles.win.height * 0.06,
              width: appStyles.win.width,
            },
            Text: {},
          }}
          text=""
          underlayColor="transparent"
          onPress={() => props.setFullPanel(!props.fullPanel)}
        />
        <WelcomeUserBanner fullName={props.fullName} logout={props.logout} />
        <View>
          <MaterialIcons
            name="settings"
            size={45}
            marginLeft={26}
            marginBottom={3}
            color="gray"
            style={styles.userSettingStyle}
            onPress={() => navigation.navigate('SettingsScreen')}
          />
        </View>
      </GestureRecognizer>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          width: appStyles.win.width,
        }}
      >
        <SelectionButton
          style={appStyles.PanelSelectionButton}
          text={translate('facilities')}
          icon={clinicLogo}
          onPress={() => {
            props.setLowerPanelContent('facilities');
          }}
        />
        <SelectionButton
          style={appStyles.PanelSelectionButton}
          text={translate('learn')}
          icon={babyBottle}
          onPress={() => {
            navigation.navigate('Learn');
          }}
        />
        <SelectionButton
          style={appStyles.PanelSelectionButton}
          text={translate('resources')}
          icon={lightBulb}
          onPress={() => {
            navigation.navigate('ResourcesPage');
          }}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  userSettingStyle: {
    position: 'absolute',
    left: appStyles.win.width * 0.27,
    bottom: appStyles.win.height * 0.03,
    color: '#706e6c',
  },
});
