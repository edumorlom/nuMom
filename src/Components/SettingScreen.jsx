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
} from "react-native";
import WelcomeUserBanner from "./WelcomeUserBanner";
import Firebase from "./Firebase";
import goBackImg from "../../assets/go-back.png";
import * as Haptics from "expo-haptics";
import appStyles from "./AppStyles";

const SettingScreen = (props) => {
  //state = { uid: null, phoneNumber: null,  dob: null, pregnant: null, infant: null, babyGender: null, liveMiami: null};

  //console.log("this is props of Edit Section:", props);
  const [name, setName] = useState(props.fullName);
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState(props.password);

  const [formData, setFormData] = useState({
    phoneNumber: "",
    dob: "",
    pregnant: "",
    infant: "",
    babyGender: {
      male: false,
      female: false,
    },
    liveMiami: "",
  });

  const {
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

  //   loginWithEmailPassword = (email, password) => {
  //     if (email && password) {
  //       let fb = new Firebase();
  //       fb.logIn(email, password).then(
  //         (response) => {
  //           //this.loginWithUid(response.user.uid);
  //           console.log("Successful Login!", response);
  //         },
  //         (e) => {
  //           alert("Invalid E-mail and Password Combination!");
  //         }
  //       );
  //     } else {
  //       alert("Please enter your E-Mail and Password!");
  //     }
  //   };

  // loginWithUid = (uid) => {
  //     let fb = new Firebase();
  //     let today = new Date();
  //     let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'@'+today.getHours()+':'+today.getMinutes();
  //     fb.storeObjectInDatabase(uid, {lastInteraction: date})
  //     fb.getUserInfo(uid).on('value', (snapshot) => {
  //         this.onChangeText(...snapshot.val());
  //     });
  // };

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
          <Text style={styles.label}>Enter New Phone Number</Text>
          <TextInput
            value={String(phoneNumber)}
            style={styles.input}
            onChangeText={(phoneNumber) => onChangeText({ phoneNumber })}
          />

          <Text style={styles.label}>Enter New date of birth</Text>
          <TextInput
            value={String(dob)}
            style={styles.input}
            onChangeText={(dob) => onChangeText({ dob })}
          />

          <Text style={styles.label}>Enter New Pregnant</Text>
          <TextInput
            value={String(pregnant)}
            style={styles.input}
            onChangeText={(pregnant) => onChangeText({ pregnant })}
          />

          <Text style={styles.label}>Enter New infant</Text>
          <TextInput
            value={String(infant)}
            style={styles.input}
            onChangeText={(infant) => onChangeText({ infant })}
          />

          <Text style={styles.label}>Enter New babyGender</Text>
          <TextInput
            value={String(babyGender)}
            style={styles.input}
            onChangeText={(babyGender) => onChangeText({ babyGender })}
          />
          <Text style={styles.label}>Enter live in Miami</Text>
          <TextInput
            value={String(liveMiami)}
            style={styles.input}
            onChangeText={(liveMiami) => onChangeText({ liveMiami })}
          />
        </View>

        <Button
          title='Save'
          onPress={() => window.alert("your info has been Saved")}
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
