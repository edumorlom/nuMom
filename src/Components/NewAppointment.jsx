import {
  Keyboard,
  Text,
  TouchableOpacity,
  TextInput as TextBox,
  View,
  AsyncStorage,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import appStyles from "./AppStyles";
import Button from "./Button";
import TextInput from "./TextInput.jsx";
import * as firebase from 'firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextInputMask } from "react-native-masked-text";
import translate from "app/Components/getLocalizedText";

export default function NewAppointment(props) {

  appointment = [
    ([name, setName] = useState(null)),
    ([address, setAddress] = useState(null)),
    ([date, setDate] = useState(null)),
    ([time, setTime] = useState(null)),
    ([extra, setExtra] = useState(null)),
  ];

  appointmentInfo = { "name": name, "address": address, "date": date, "time": time, "extra": extra }

  addAppointment = () => {
    let uid = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + uid + '/appointments').push(appointmentInfo).catch(err => console.log(err));
    console.log(props);
  }

  onPress = () => {
    if (!name || !address || !date || !time) {
      alert(translate("fillOutAllFields"));
    } else {
      addAppointment();
      props.setLowerPanelContent("Appointment");
    }
  };
  isValidDate = (date) => {
    let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    return regex.test(date);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1, alignItems: "center", maxWidth: "100%" }}
      scrollEnabled
    >

      <View style={appStyles.TextInput.View}>
        <TextBox
          placeholder={translate("appointmentName")}
          onChangeText={setName}
          value={name}
          style={appStyles.TextInput.TextInput}
        />
      </View>
      <View style={appStyles.TextInput.View}>
        <TextBox
          placeholder={translate("appointmentAddress")}
          onChangeText={setAddress}
          value={address}
          style={appStyles.TextInput.TextInput}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInputMask
          placeholder={translate("appointmentDate")}
          type={"datetime"}
          options={{
            format: "MM/DD/YYYY",
            validator: function (value, settings) {
              let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
              return regex.test(value);
            },
          }}
          style={appStyles.TextInputMask}
          value={date}
          onChangeText={(input) => setDate(input)}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInputMask
          placeholder={translate("appointmentTime")}
          type={"datetime"}
          options={{
            format: "HH:MN",
          }}
          style={appStyles.TextInputMask}
          value={time}
          onChangeText={(input) => setTime(input)}
        />
      </View>
      <View style={appStyles.TextInput.View}>
        <TextBox
          placeholder={translate("appointmentExtra")}
          onChangeText={setExtra}
          value={extra}
          style={appStyles.TextInput.TextInput}
        />
      </View>

      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: "10%",
        }}
      >
        <Button
          text={translate("continueButton")}
          onPress={onPress}
        />
      </View>
    </KeyboardAwareScrollView>

  );
}
