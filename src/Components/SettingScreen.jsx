import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  TouchableHighlight,
  Image,
  Alert,
} from "react-native";
import WelcomeUserBanner from "./WelcomeUserBanner";
import Firebase from "./Firebase";
import goBackImg from "../../assets/go-back.png";
import * as Haptics from "expo-haptics";
import appStyles from "./AppStyles";
import {AsyncStorage, NativeModules} from 'react-native';
import * as firebase from 'firebase';


const SettingScreen = (props) => {
  //state = { uid: null, phoneNumber: null,  dob: null, pregnant: null, infant: null, babyGender: null, liveMiami: null};

  //console.log("this is props of Setting Section>>>>>:", props);

  //const [name, setName] = useState(props.fullName);
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState(props.password);

  
  

  const [formData, setFormData] = useState({
    Screen: 'setting',
    fullName: null,
    phoneNumber: null,
    dob: null,
    pregnant: null,
    infant: null,
    babyGender: null,
    liveMiami: null,
    //deviceLanguage:  Platform.OS === 'ios' ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] : NativeModules.I18nManager.localeIdentifier
  });

  const {
    fullName,
    phoneNumber,
    dob,
    pregnant,
    infant,
    babyGender,
    liveMiami,
  } = formData;

  const onChangeText = (object) => {
    //setFormData({...formData, [e.target.name]: e.target.value });
    setFormData(object);
  };

  let goBack = () => {
    Haptics.selectionAsync().then();
    props.goBack();
  };

   const AsyncAlert = () => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        "Log Out",
        "Are you sure you want to log out of this account?",
        [
          { text: "YES", onPress: () => resolve(true) },
          { text: "NO", onPress: () => resolve(false) },
        ],
        { cancelable: false }
      );
    });
  };





  

fetchUserInfo = () => {
  let fb = new Firebase();
  let uid = firebase.auth().currentUser.uid;
  
  if (uid !== null) {
    console.log("User id >>>>>>>>>: " + uid);
    fb.getUserInfo(uid).on('value', (snapshot) => {
      setFormData({fullName: snapshot.val().fullName,
                    babyGender: snapshot.val().babyGender,
                    phoneNumber: snapshot.val().phoneNumber,
                    pregnant: snapshot.val().pregnant,
                    infant: snapshot.val().infant,
                    dob: snapshot.val().dob,
                    liveMiami: snapshot.val().liveMiami,
                    screen: 'setting'});
    });

  }else {
    alert("Error: Couldn't get the user Information");
  }
 

}

 useEffect(() => {
    fetchUserInfo();
   
 }, []);

 

onSubmit = (fullName, dob, phoneNumber) => {
  Haptics.selectionAsync().then();
  let uid = firebase.auth().currentUser.uid;

  if (uid !== null) {

    if (!formData) {
      alert(props.getLocalizedText("fillOutAllFields"));
      
    }else{
      
        firebase.database().ref('users/'+ uid).update({
          fullName: fullName,
          phoneNumber: phoneNumber,
          dob: dob,
  
        }, e => {alert("Error: Couldn't save the Information")});
     
      window.alert('your Information has been save');
    }
    
  }else{
    alert("Error: Couldn't get user Information");
  }
 
  
}


  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <TouchableHighlight
          onPress={goBack}
          underlayColor={"transparent"}
          style={{
            height: appStyles.win.height * 0.04,
            marginTop: "12%",
            marginLeft: "3%",
            width: appStyles.win.width * 0.07,
          }}
        >
          <Image
            style={{
              height: appStyles.win.width * 0.06,
              width: appStyles.win.width * 0.06,
            }}
            source={goBackImg}
          />
        </TouchableHighlight>
        <WelcomeUserBanner
          fullName={props.fullName}
          logout={props.logout}
          getLocalizedText={props.getLocalizedText}
        />
        <View>
          <Text style={styles.label}>your Number: {phoneNumber}</Text>
          <TextInput
            placeholder='Enter your new Phone Number'
            style={styles.input}
            value={phoneNumber}
            onChangeText={(e) => onChangeText({phoneNumber: e})}
          />

          <Text style={styles.label}>Your Birth Date: {dob}</Text>
          <TextInput
            placeholder='Enter your new Birth Date'
            style={styles.input}
            value={dob}
            onChangeText={(e) => onChangeText({dob: e})}
          />

          {/* <Text style={styles.label}>Your Pregnant status: {String(pregnant)}</Text>
          <TextInput
            placeholder='Enter your new pregnant Status'
            style={styles.input}
            value={String(pregnant)}
            name='pregnant'
            onChangeText={onChangeText}
          />

          <Text style={styles.label}>Your infant status: {String(infant)}</Text>
          <TextInput
            placeholder='Enter your new infant status'
            style={styles.input}
            value={String(infant)}
            name='infant'
            onChangeText={onChangeText}
          /> */}

          <Text style={styles.label}>Your full name: {fullName}</Text>
          <TextInput
            placeholder='Enter your new full Name'
            style={styles.input}
            value={fullName}
            onChangeText={(e) => onChangeText({fullName: e})}
          />
       
        </View>

        <Button
          title='Save'
          onPress={() => onSubmit(fullName, dob, phoneNumber)}
        />

        <Button
          title='Logout'
          onPress={() => {
            AsyncAlert().then((response) => {
              response ? props.logout() : null;
            });
          }}
          style={{ color: "red" }}
        />
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
    padding: 5,
    margin: 5,
  },

  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default SettingScreen;