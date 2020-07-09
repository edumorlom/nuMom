import {
  Text,
  TouchableOpacity,
  TextInput as TextBox,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import appStyles from "./AppStyles";
import Button from "./Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import translate from "app/Components/getLocalizedText";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import * as Calendar from "expo-calendar";
import * as Localization from "expo-localization";
import * as Permissions from "expo-permissions";
import { getUid, addAppointment } from "../Firebase";

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
<<<<<<< HEAD
=======
    ([eventId, setEventId] = useState(null)),
>>>>>>> 7de06b158b4696b0c2ca9c5a46ddc6b57dec0ad1
  ];
  const uid = getUid();

  appointmentInfo = {
    name: name,
    address: address,
    date: date,
    time: time,
    extra: extra,
<<<<<<< HEAD
=======
    eventId: eventId,
>>>>>>> 7de06b158b4696b0c2ca9c5a46ddc6b57dec0ad1
  };

  onPress = async () => {
    if (!name || !address) {
      alert(translate("fillOutAllFields"));
    } else {
<<<<<<< HEAD
      await addAppointment(uid, appointmentInfo);
      await SynchronizeCalendar();
=======
      await SynchronizeCalendar();
      await addAppointment(uid, appointmentInfo);
>>>>>>> 7de06b158b4696b0c2ca9c5a46ddc6b57dec0ad1
      props.setLowerPanelContent("Appointment");
    }
  };

  showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  handleConfirm = (date) => {
    const newDate = moment(date).format("MM/DD/YYYY");
    setDate(newDate);
    console.log("A date has been picked: ", newDate);
    hideDatePicker();
  };

  showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  handleConfirmTime = (time) => {
    const newTime = moment(time).format("h:mm a");
    setTime(newTime);
    console.log("A date has been picked: ", newTime);
    hideTimePicker();
  };

  addEventsToCalendar = async (calendardId) => {
    let hours = moment(time, ["HH:mm a", "h:mm a"]).hours();
    let minutes = moment(time, ["HH:mm a", "h:mm a"]).minutes();
    let addHours = moment(time, ["HH:mm a", "h:mm a"]).add(1, "h").hours();
    let addMinutes = moment(time, ["HH:mm a", "h:mm a"]).add(30, "m").minutes();

    const event = {
      title: name,
      notes: extra,
      location: address,
      startDate: moment(date, ["MM-DD-YYYY", "YYYY-MM-DD"])
        .set({ hour: hours, minute: minutes })
        .toDate(),
      endDate: moment(date, ["MM-DD-YYYY", "YYYY-MM-DD"])
        .set({ hour: addHours, minute: addMinutes })
        .toDate(),
      timeZone: Localization.timezone,
    };
    try {
      const createEventAsyncRes = await Calendar.createEventAsync(
        calendardId.toString(),
        event
      );
      return createEventAsyncRes;
    } catch (err) {
      console.log(err);
    }
  };

  SynchronizeCalendar = async () => {
    const { status } = await Permissions.askAsync(Permissions.CALENDAR);

    if (status === "granted") {
      const calendars = await Calendar.getCalendarsAsync();
<<<<<<< HEAD
      try {
        const createEventAsyncRes = await addEventsToCalendar(calendars[0].id);
        console.log(createEventAsyncRes);
=======
      const defaultCalendars = calendars.filter(item => item.allowsModifications ===  true);

      try {
        const createEventAsyncRes = await addEventsToCalendar(defaultCalendars[0].id);
        console.log(createEventAsyncRes);
        setEventId(createEventAsyncRes.toString());
>>>>>>> 7de06b158b4696b0c2ca9c5a46ddc6b57dec0ad1
      } catch (err) {
        Alert.alert(err.message);
      }
    }
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
      <View style={styles.container}>
<<<<<<< HEAD
        <Text style={styles.textTitle}>Date</Text>
=======
    <Text style={styles.textTitle}>{translate("Date")}</Text>
>>>>>>> 7de06b158b4696b0c2ca9c5a46ddc6b57dec0ad1
        <TouchableOpacity onPress={showDatePicker}>
          <Text style={styles.textStyle}>{date}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode='date'
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          is24Hour={true}
          headerTextIOS='Pick a date'
        />
      </View>
      <View style={styles.sepeerator} />
      <View style={styles.container}>
<<<<<<< HEAD
        <Text style={styles.textTitle}>Times</Text>
=======
        <Text style={styles.textTitle}>{translate("Time")}</Text>
>>>>>>> 7de06b158b4696b0c2ca9c5a46ddc6b57dec0ad1
        <TouchableOpacity onPress={showTimePicker}>
          <Text style={styles.textStyle}>{time}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode='time'
          onConfirm={handleConfirmTime}
          onCancel={hideTimePicker}
          is24Hour={true}
          headerTextIOS='Pick a time'
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
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
  },
  textTitle: {
    ...Platform.select({
      ios: {
        color: "#9CAAC4",
        fontWeight: "600",
        fontSize: 16,
      },
      android: {
        color: "#9CAAC4",
        fontWeight: "600",
        fontSize: 16,
      },
    }),
  },

  textStyle: {
    ...Platform.select({
      ios: {
        fontSize: 19,
        alignSelf: "center",
        paddingTop: 10,
      },
      android: {
        fontSize: 19,
        alignSelf: "center",
        paddingTop: 5,
      },
    }),
  },
});
