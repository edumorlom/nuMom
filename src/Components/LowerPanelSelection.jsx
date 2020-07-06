import React from "react";
import {
  TouchableHighlight,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import babyBottle from "../../assets/baby-bottle.png";
import clinicLogo from "../../assets/clinic-logo.png";
import lightBulb from "../../assets/light-bulb.png";
import document from "../../assets/document.png";
import WelcomeUserBanner from "./WelcomeUserBanner";
import SelectionButton from "./SelectionButton";
import GestureRecognizer from "react-native-swipe-gestures";
import { MaterialIcons } from "@expo/vector-icons";
import translate from "app/Components/getLocalizedText";
import appStyles from "./AppStyles";
import Button from "./Button";

export default function LowerPanelSelection(props) {
  return (
    <GestureRecognizer
      onSwipeUp={() => props.setFullPanel(true)}
      onSwipeDown={() => props.setFullPanel(false)}
      config={{ velocityThreshold: 0.4, directionalOffsetThreshold: 100 }}
      style={{ width: "100%", height: "100%", alignItems: "center" }}
    >
      <Button 
      style= {{
        Touchable: {height: "10%", width: "100%"}, Text: {}
      }}
      text={''}
      underlayColor={"transparent" }
      onPress={() => props.setFullPanel(true)}
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
      <SelectionButton
        style={appStyles.PanelSelectionButton}
        text={translate("findCare")}
        icon={clinicLogo}
        onPress={() => props.setLowerPanelContent("findCare")}
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
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  userSettingStyle: {
    //  borderWidth: 1,
    //  borderColor: 'red',
    position: "absolute",
    left: 120,
    bottom: 25,
    color: '#706e6c'
    //  alignSelf: 'flex-start',
  },
});
