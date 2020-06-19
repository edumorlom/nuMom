import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Button } from "react-native";
import AppointmentMenu from "./AppointmentMenu";
import * as firebase from 'firebase';
import Firebase from "./Firebase";

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
    var key = " "
    _isMounted = true;
    if (uid !== null) {
      console.log("User id >>>>>>>>>: " + uid);
      var ref = firebase.database().ref('users/' + uid + '/appointments');
      ref.on("child_added", function (snapshot) {
        key = snapshot.key;
        console.log(key);
      })
      firebase.database().ref('users/' + uid + '/appointments/' + key + '/appointmentInfo/').on('value', (snapshot) => {
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

  useEffect(() => {
    getAppointment();
    /*console.log(name);
    console.log(address);
    console.log(date);
    console.log(time);
    console.log(name);*/

  });

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
