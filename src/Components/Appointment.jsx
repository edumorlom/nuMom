import React from "react";
import { ScrollView, View, StyleSheet, Button, useState } from "react-native";
import AppointmentMenu from "./AppointmentMenu";
import NewAppointment from "./NewAppointment";
import * as firebase from 'firebase';

export default function Appointment(props) {
  let _isMounted = false;

  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [extra, setExtra] = useState(null);

  getAppointment = () => {
    let fb = new Firebase();
    let uid = firebase.auth().currentUser.uid;
    _isMounted = true;
    if (uid !== null) {
      console.log("User id >>>>>>>>>: " + uid);
      fb.getUserInfo(uid).on('value', (snapshot) => {

        const exists = (snapshot.val() !== null);
        if (exists || snapshot.exists() || snapshot.val() !== 'undefined') {
          if (_isMounted) {
            setName(snapshot.val()?.name);
            setAddress(snapshot.val()?.address);
            setDate(snapshot.val()?.date);
            setTime(snapshot.val()?.time);
            setExtra(snapshot.val()?.extra);
          }
        }
      });
    } else {
      alert("Error: Couldn't get the Appointment Info");
    }

  }

  newAppointmentButton = (
    <AppointmentMenu
      name={name}
      address={address}
      date={date}
      time={time}
      extra={extra}
    />
  );

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "flex-end", maxWidth: "100%" }}
    >
      <View>
        <Button
          title={props.getLocalizedText("wantNewAppointment")}
          onPress={() => {
            props.setLowerPanelContent("NewAppointment");
          }}
        />
      </View>
      {newAppointmentButton}
    </ScrollView>
  );
}
