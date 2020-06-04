import React, { useState, useEffect, Component } from "react";
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



class SettingScreen extends React.Component {

  _isMounted = false;

  constructor(props){
    super(props);
    this.state = { 
      phoneNumber: null,  
      dob: null, 
      pregnant: null, 
      infant: null, 
      babyGender: null, 
      liveMiami: null,
      fullName: null,
      };

    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }
  


  onChangeText = (object) => {
    this.setState(object);
  };

   goBack = () => {
    Haptics.selectionAsync().then();
    this.props.goBack();
  };

    AsyncAlert = () => {
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
  this._isMounted = true;
  
  if (uid !== null) {
    console.log("User id >>>>>>>>>: " + uid);
    fb.getUserInfo(uid).on('value', (snapshot) => {
      if (this._isMounted){

        this.setState({fullName: snapshot.val().fullName,
          babyGender: snapshot.val().babyGender,
          phoneNumber: snapshot.val().phoneNumber,
          pregnant: snapshot.val().pregnant,
          infant: snapshot.val().infant,
          dob: snapshot.val().dob,
          liveMiami: snapshot.val().liveMiami,
          screen: 'setting'});
        
      }
     
    });

  }else {
    alert("Error: Couldn't get the user Information");
  }
 

};



 

onSubmit = (fullName, dob, phoneNumber) => {
  Haptics.selectionAsync().then();
  let uid = firebase.auth().currentUser.uid;

  if (uid !== null) {

    if (!this.state.fullName && !this.state.dob && !this.state.phoneNumber) {
      alert(this.props.getLocalizedText("fillOutAllFields"));
      
    }else{
      
        firebase.database().ref('users/'+ uid).update({
          fullName: fullName,
          phoneNumber: phoneNumber,
          dob: dob,
  
        }, e => {console.log("Error update: ", e)});
     
      window.alert('your Information has been save');
    }
    
  }else{
    alert("Error: Couldn't get user Information");
  }
 
  
};

componentWillUnmount(){
  this._isMounted = false;
}


componentDidMount(){
  this.fetchUserInfo();
}


 render() {
   const { fullName, dob, phoneNumber} = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <TouchableHighlight
            onPress={this.goBack}
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
            fullName={this.props.fullName}
            logout={this.props.logout}
            getLocalizedText={this.props.getLocalizedText}
          />
          <View>
            <Text style={styles.label}>your Number: {phoneNumber}</Text>
            <TextInput
              placeholder='Enter your new Phone Number'
              style={styles.input}
              value={phoneNumber}
              onChangeText={(e)=> this.onChangeText({phoneNumber: e})}
            />

            <Text style={styles.label}>Your Birth Date: {dob}</Text>
            <TextInput
              placeholder='Enter your new Birth Date'
              style={styles.input}
              value={dob}
              onChangeText={(e)=> this.onChangeText({dob: e})}
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
              onChangeText={(e)=> this.onChangeText({fullName: e})}
            />
        
          </View>

          <Button
            title='Save'
            onPress={() => this.onSubmit(fullName, dob, phoneNumber)}
          />

          <Button
            title='Logout'
            onPress={() => {
              this.AsyncAlert().then((response) => {
                response ? this.props.logout() : null;
              });
            }}
            style={{ color: "red" }}
          />
        </ScrollView>
      </View>
    );
  }
}


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