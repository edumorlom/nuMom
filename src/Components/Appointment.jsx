import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Button } from "react-native";
import AppointmentMenu from "./AppointmentMenu";
import * as firebase from 'firebase';



export default function Appointment(props) {
  let _isMounted = false;
  const [objects, setObjects] = useState([])


  const getAppointment = () => {
   
    let uid = firebase.auth().currentUser.uid;
    _isMounted = true;


    if (uid !== null) {
      console.log("User id >>>>>>>>>: " + uid);
      firebase.database().ref('users/' + uid + '/appointments/').once('value', (snapshot) => {

        snapshot.forEach(function(childSnapshot) {
          let childKey = childSnapshot.key;
          let childData = childSnapshot.val(); 
          console.log(childKey);
          console.log(childData);
          
          if (childSnapshot.val() !== null || childSnapshot.val() !== 'undefined') {
              if(_isMounted){
              
                setObjects(prevArray => [...prevArray, childSnapshot]);
              
              }
            
          }

        });
         
      });


    } else {
      alert("Error: Couldn't get the Appointment Info");
    }

  }




  useEffect(() => {
    getAppointment();
    

   return () => _isMounted = false;


  }, []);


  useEffect(() => {
    console.log("state value changed", objects);
  
    
   }, [objects]);



  const deleteAppointment = (id) => {
    let uid = firebase.auth().currentUser.uid;
    console.log("ID>>>:", id);

    if (uid !== null){
     firebase.database().ref('users/' + uid + '/appointments/' + id ).remove();
    
     
     
      alert("Your appointment has been removed.")


    }else{
      console.log("Error: Couldn't get the User appointment Info")
    }
      
  }
  

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "flex-end", maxWidth: "100%" }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Button
          title={props.getLocalizedText("wantNewAppointment")}
          onPress={() => {
            props.setLowerPanelContent("NewAppointment");
          }}
        />
      </View>
      <View >
        {objects.map((appointments, index) => {
          return (
            <AppointmentMenu 
            key={index} 
            appointments={appointments} 
            deleteAppointment={deleteAppointment} 
            getLocalizedText={props.getLocalizedText} />
          )
        })} 
      </View>
    </ScrollView>
  );
}
