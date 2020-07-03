import {
  Keyboard,
  Text,
  TouchableOpacity,
  TextInput as TextBox,
  View,
  AsyncStorage,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import appStyles from "./AppStyles";
import Button from "./Button";
import * as firebase from "firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInputMask } from "react-native-masked-text";
import translate from "app/Components/getLocalizedText";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

export default function NewAppointment(props) {
  appointment = [
    ([name, setName] = useState(null)),
    ([address, setAddress] = useState(null)),
    ([date, setDate] = useState(
      `${moment().format("MM")}/${moment().format("DD")}/${moment().format(
        "YYYY"
      )}`
    )),
    ([time, setTime] = useState(
      `${moment().format("h")}:${moment().format("mm")}`
    )),
    ([extra, setExtra] = useState(null)),
    ([isDatePickerVisible, setDatePickerVisibility] = useState(false)),
    ([isTimePickerVisible, setTimePickerVisibility] = useState(false)),
  ];

  appointmentInfo = {
    name: name,
    address: address,
    date: date,
    time: time,
    extra: extra,
  };

  addAppointment = () => {
    let uid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("users/" + uid + "/appointments")
      .push(appointmentInfo)
      .catch((err) => console.log(err));
    console.log(props);
  };

  onPress = () => {
    if (!name || !address ) {
      alert(translate("fillOutAllFields"));
    } else {
      addAppointment();
      props.setLowerPanelContent("Appointment");
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const newDate = moment(date).format("MM/DD/YYYY");
    setDate(newDate);
    console.log("A date has been picked: ", newDate);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (time) => {
    const newTime = moment(time).format("h:mm");
    setTime(newTime);
    console.log("A date has been picked: ", newTime);
    hideTimePicker();
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
        maxWidth: "100%",
      }}
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
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 5
        }}
      >
        <Text style={{ color: "#9CAAC4", fontSize: 16, fontWeight: "600" }}>
          Date
        </Text>
        <TouchableOpacity onPress={showDatePicker}>
          <Text style={{ fontSize: 19, alignSelf: "center", paddingTop: 10 }}>{date}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode='date'
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          is24Hour={true}
          headerTextIOS="Pick a date"
        />
      </View>
      <View style={styles.sepeerator} />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 5
        }}
      >
        <Text
          style={{
            color: "#9CAAC4",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Times
        </Text>
        <TouchableOpacity onPress={showTimePicker}>
          <Text style={{ fontSize: 19, alignSelf: "center", paddingTop: 10 }}>{time}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode='time'
          onConfirm={handleConfirmTime}
          onCancel={hideTimePicker}
          is24Hour={true}
          headerTextIOS="Pick a time"
        />
      </View>
      <View style={styles.sepeerator} />
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: appStyles.win.height * 0.005,
        }}
      >
        <Button
          style={appStyles.button}
          text={translate("continueButton")}
          onPress={onPress}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  sepeerator: {
    height: 0.2,
    width: "100%",
    backgroundColor: "#979797",
    alignSelf: "center",
    marginVertical: 10,
  },


});
