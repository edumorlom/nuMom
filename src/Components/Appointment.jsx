import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Button } from "react-native";
import AppointmentMenu from "./AppointmentMenu";
import * as firebase from 'firebase';
import Firebase from "./Firebase";

export default function Appointment(props) {
  let _isMounted = false;
  const [objects, setObjects] = useState([])

  // const [name, setName] = useState(null);
  // const [address, setAddress] = useState(null);
  // const [date, setDate] = useState(null);
  // const [time, setTime] = useState(null);
  // const [extra, setExtra] = useState(null);

  // getAppointment = () => {
  //   let fb = new Firebase();
  //   let uid = firebase.auth().currentUser.uid;
  //   var key = " "
  //   _isMounted = true;
  //   if (uid !== null) {
  //     console.log("User id >>>>>>>>>: " + uid);
  //     var ref = firebase.database().ref('users/' + uid + '/appointments');
  //     ref.on("child_added", function (snapshot) {
  //       key = snapshot.key;
  //       console.log(key);
  //     })
  //     firebase.database().ref('users/' + uid + '/appointments/' + key + '/appointmentInfo/').on('value', (snapshot) => {
  //       const exists = (snapshot.val() !== null);
  //       if (exists || snapshot.exists() || snapshot.val() !== 'undefined') {
  //         if (_isMounted) {
  //           setName(snapshot.val()?.name);
  //           setAddress(snapshot.val()?.address);
  //           setDate(snapshot.val()?.date);
  //           setTime(snapshot.val()?.time);
  //           setExtra(snapshot.val()?.extra);
  //         }
  //       }
  //     });
  //   } else {
  //     alert("Error: Couldn't get the Appointment Info");
  //   }

  // }


  const getAppointment = () => {
   
    let uid = firebase.auth().currentUser.uid;
    _isMounted = true;


    if (uid !== null) {
      console.log("User id >>>>>>>>>: " + uid);
      firebase.database().ref('users/' + uid + '/appointments/').once('value', (snapshot) => {

        // const key = snapshot.val();
        // const keyAppointment = Object.keys(key).find(key => key)
        // console.log(keyAppointment);

        snapshot.forEach(function(childSnapshot) {
          let childKey = childSnapshot.key;
          let childData = childSnapshot.val(); 
          console.log(childKey);
          console.log(childData);
            firebase.database().ref('users/' + uid + '/appointments/'+ childKey + '/appointment').once('value', (snapshot2) => {
              console.log(snapshot2.val());
              const exists = (snapshot2.val() !== null);
              if (exists || snapshot2.exists() || snapshot2.val() !== 'undefined') {
                  if(_isMounted){
                  
                    setObjects(prevArray => [...prevArray, snapshot2.val()]);
                  
                  }
                
              }

            });
         
        });
         
      });


    } else {
      alert("Error: Couldn't get the Appointment Info");
    }

  }

  // useEffect(() => {
  //   getAppointment();
  //   /*console.log(name);
  //   console.log(address);
  //   console.log(date);
  //   console.log(time);
  //   console.log(name);*/

  // });


  useEffect(() => {
    getAppointment();
    

   return () => _isMounted = false;

  }, []);



  // newAppointmentButton = (
  //   <AppointmentMenu
  //     name={name}
  //     address={address}
  //     date={date}
  //     time={time}
  //     extra={extra}
  //   />
  // );

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
      {/* {newAppointmentButton} */}
      <View>
      {objects.map((appointments, index) => (
        <AppointmentMenu key={index} appointments={appointments} />
      ))}
      </View>
    </ScrollView>
  );
}
