import React from "react";
import {
  TouchableHighlight,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import babyBottle from "../../assets/baby-bottle.png";
import clinicLogo from "../../assets/clinic-logo.png";
import shelterLogo from "../../assets/shelter-logo.png";
import lightBulb from "../../assets/light-bulb.png";
import document from "../../assets/document.png";
import WelcomeUserBanner from "./WelcomeUserBanner";
import SelectionButton from "./SelectionButton";
import GestureRecognizer from "react-native-swipe-gestures";
import { MaterialIcons } from "@expo/vector-icons";
import translate from "./getLocalizedText";
import appStyles from "./AppStyles";
import Button from "./Button";

export default function LowerPanelSelection(props) {
  return (
    <>
    <GestureRecognizer
      onSwipeUp={() => props.setFullPanel(true)}
      onSwipeDown={() => props.setFullPanel(false)}
      style={{ 
        width: appStyles.win.width, 
        height: appStyles.win.height * 0.16, 
        alignItems: "center" 
      }}
    >
      <Button 
      style= {{
        Touchable: {height: appStyles.win.height * 0.06, width: appStyles.win.width}, Text: {}
      }}
      text={''}
      underlayColor={"transparent" }
      onPress={() => props.setFullPanel(!props.fullPanel)}
      />
      <WelcomeUserBanner
        fullName={props.fullName}
        logout={props.logout}
      />
      <View>
        <MaterialIcons
          name="settings"
          size={45}
          color= "gray"
          style={styles.userSettingStyle}
          onPress={() => props.setScreen("setting")}
        />
      </View>
      </GestureRecognizer>
      <ScrollView contentContainerStyle={{alignItems: 'center', width: appStyles.win.width}}>
      <SelectionButton
        style={appStyles.PanelSelectionButton}
        text={translate("findCare")}
        icon={clinicLogo}
        onPress={() => props.setLowerPanelContent("findCare")}
      />
      <SelectionButton
        style={appStyles.PanelSelectionButton}
        text={translate("shelters")}
        icon={shelterLogo}
        onPress={() => props.setLowerPanelContent("shelters")}
      />
      <SelectionButton
        style={appStyles.PanelSelectionButton}
        text={translate("learn")}
        icon={babyBottle}
        onPress={() => {
          props.setLowerPanelContent("learn");
        }}
      />
      <SelectionButton
        style={appStyles.PanelSelectionButton}
        text={translate("resources")}
        icon={lightBulb}
        onPress={() => {
          props.setLowerPanelContent("resources");
        }}
      />
      </ScrollView>
      </>
    
  );
}

const styles = StyleSheet.create({
  userSettingStyle: {
    position: "absolute",
    left: appStyles.win.width * 0.27,
    bottom: appStyles.win.height * 0.030,
    color: '#706e6c'
    
  },
});
