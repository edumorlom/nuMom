import React, { useState, useEffect, Component } from "react";
import { TextInputMask } from 'react-native-masked-text';
import {
  View,
  Text,
  StyleSheet,
  TextInput as TextBox,
  Button,
  ScrollView,
  TouchableHighlight,
  Image,
  Alert,
  Platform
} from "react-native";
import Firebase from "./Firebase";
import goBackImg from "../../assets/go-back-arrow.png";
import * as Haptics from "expo-haptics";
import appStyles from "./AppStyles";
import {AsyncStorage, NativeModules, Picker} from 'react-native';
import * as firebase from 'firebase';
import TextInput from "./TextInput.jsx";
import { AntDesign } from '@expo/vector-icons'; 



class SettingScreen extends React.Component {

  _isMounted = false;

  constructor(props){
    super(props);
    this.state = { 
      phoneNumber: null,  
      dob: null, 
      pregnant: null, 
      infant: null, 
      babyGender:{
        male: null,
        female: null
      }, 
      liveMiami: null,
      fullName: null,
      babyDOB: null,
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
        this.props.getLocalizedText("logout"),
        this.props.getLocalizedText('WantToLogout'),
        [
          { text: this.props.getLocalizedText("Yes"), onPress: () => resolve(true) },
          { text: this.props.getLocalizedText("No"), onPress: () => resolve(false) },
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
          babyGender:{
            male: snapshot.val().babyGender.male,
            female: snapshot.val().babyGender.female,
          }, 
          phoneNumber: snapshot.val().phoneNumber,
          pregnant: snapshot.val().pregnant,
          infant: snapshot.val().infant,
          dob: snapshot.val().dob,
          liveMiami: snapshot.val().liveMiami,
          babyDOB:  snapshot.val().babyDOB,
          screen: 'setting'});
        
      }
     
    });

  }else {
    alert("Error: Couldn't get the user Information");
  }
 

};



 

onSubmit = (fullName, dob, phoneNumber, infant, pregnant, liveMiami, babyGender, babyDOB) => {
  Haptics.selectionAsync().then();
  let uid = firebase.auth().currentUser.uid;
  let male = babyGender.male;
  let female = babyGender.female;

  //this will give you the week and nextWeek fields for the baby birth day messages
  let babyInfo = this.getNextWeekAndWeekNo();

  //this is to check whether infant if is male or female 
    if (male === true) {
      female = false;

    }else if (female === false) {
      female = true;
      
    } else {
      male = false;
    }

    //this is if the user choose not infant then setup male, female to false and babyDob, week, weekNext to null
    if (infant === false) {
      male = false;
      female = false;
      babyDOB = null;
      babyInfo[0] = null;
      babyInfo[1] = null;
    }

    // first try, when the user register for first time we set the liveMiami,infant pregnant to false
    if(liveMiami === null ){
      liveMiami = false; 
    }else if(infant === null ){
      infant = false;
    }else if(pregnant === null){
      pregnant = false;
    }
  

  if (uid !== null) {

    if (!this.state.fullName && !this.state.phoneNumber) {
      alert(this.props.getLocalizedText("fillOutAllFields"));
      
    }else{
      
        firebase.database().ref('users/'+ uid).update({
          fullName: fullName,
          phoneNumber: phoneNumber,
          dob: dob,
          infant: infant,
          pregnant: pregnant,
          liveMiami: liveMiami || false,
          babyDOB: babyDOB,
          babyGender:{
            male: male,
            female: female
          },
          nextWeek: babyInfo[0],
          week: babyInfo[1],
  
        }, e => {console.log("Error update: ", e)});
     
      window.alert(this.props.getLocalizedText("savedInfo"));
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

getNextWeekAndWeekNo = () => {
  let babyDOB = new Date(this.state.babyDOB); 
  let today = new Date(); 
  let daysDifference = (today.getTime() - babyDOB.getTime()) / (1000 * 3600 * 24) | 0;
  let daysTillNextWeek = (7 - daysDifference % 7) % 7;        
  let nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysTillNextWeek);
  let nextWeek = (nextweek.getMonth()+1).toString().padStart(2, "0") +'/'+nextweek.getDate().toString().padStart(2, "0") +'/'+ nextweek.getFullYear()
  let weekNo = daysTillNextWeek === 0 ? (daysDifference / 7)  | 0 : ((daysDifference / 7) + 1) | 0;
  if (weekNo > 24) { nextWeek = null; weekNo = null }
  return [nextWeek, weekNo]
}


 render() {
   this.datetimeField?console.log(this.datetimeField.isValid()):null
   const { fullName, dob, phoneNumber, liveMiami, infant, pregnant, babyGender, babyDOB} = this.state;
    return (
      <View style={{ flex: 1 }}>
       <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableHighlight
            onPress={this.goBack}
            underlayColor={"transparent"}
            style={{
              height: appStyles.win.height * 0.04,
              marginTop: "5%",
              marginLeft: "3%",
              // marginBottom: '3%',
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
          <View style={{ position: 'absolute', right: 30, top: 20}}>
            <AntDesign name="logout" size={30} color={appStyles.pinkColor} onPress={() => {
                this.AsyncAlert().then((response) => {
                  response ? this.props.logout() : null;
                });
              }} />
          </View>
          <View>
          <Text 
            style={{
            color: appStyles.blueColor,
            fontSize: appStyles.titleFontSize,
            fontWeight: 'bold',
            alignSelf: 'center',
            paddingTop: 10
            }}>{this.props.getLocalizedText('welcomeSetting')}</Text></View>
          <View style={{ alignItems: 'center', paddingTop: 25}}>
            <View style={{marginBottom: 30, alignItems: 'center'}}>
              <Text style={appStyles.blueColor}>{this.props.getLocalizedText("phoneNumberInput")}:</Text>
              <View style={appStyles.TextInput.View}>
                <TextBox
                  placeholder={this.props.getLocalizedText("phoneNumberInput")}
                  style={appStyles.TextInput.TextInput}
                  value={phoneNumber}
                  keyboardType={"numeric"}
                  onChangeText={(e)=> this.onChangeText({phoneNumber: e})}
                />
              </View>
            </View>

            <View style={{marginBottom: 30, alignItems: 'center'}}>
              <Text style={appStyles.blueColor}>{this.props.getLocalizedText("dob")}:</Text>
              <View>
              <TextInputMask
                type={'datetime'}
                options={{
                  format: 'MM/DD/YYYY',
                  validator: function(value, settings) {
                    let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
                    return regex.test(value);
                  }  //This validator function is read by isValid()
                    //Still need to implement a check for isValid
                }}
                style={appStyles.TextInputMask}
                value={dob}
                placeholder={this.props.getLocalizedText("dob")}
                onChangeText = {text => {
                  this.setState({ dob: text })
                }}
                // Ref for use of isValid(), like this.datetimeField.isValid()
                ref={(ref) => this.datetimeField = ref}
              />
                
              </View>
            </View>
            <View style={{marginBottom: 30, alignItems: 'center' }}>
              <Text style={appStyles.blueColor}>{this.props.getLocalizedText("fullName")}:</Text>
              <View style={appStyles.TextInput.View}>
                <TextBox
                  placeholder={this.props.getLocalizedText("fullName")}
                  style={appStyles.TextInput.TextInput}
                  value={fullName}
                  onChangeText={(e)=> this.onChangeText({fullName: e})}
                />
              </View>
            </View>
            <View style={styles.containerDropDown}>
            <Text >{this.props.getLocalizedText("liveMiami")}</Text>
                <Picker
                    selectedValue={liveMiami}
                    style={styles.questionsDropDown}
                    onValueChange={(itemValue, itemIndex) =>
                      this.onChangeText({liveMiami: itemValue})
                    }>
                    <Picker.Item label={this.props.getLocalizedText("Yes")} value={true} />
                    <Picker.Item label={this.props.getLocalizedText("No")} value={false} />
                  </Picker>
            </View>
            <View style={styles.containerDropDown}>
                  <Text >{this.props.getLocalizedText("areYouPregnant")}</Text>
                <Picker
                    selectedValue={pregnant}
                    style={styles.questionsDropDown}
                    onValueChange={(itemValue, itemIndex) =>
                      this.onChangeText({pregnant: itemValue})
                    }>
                    <Picker.Item label={this.props.getLocalizedText("Yes")} value={true} />
                    <Picker.Item label={this.props.getLocalizedText("No")} value={false} />
                  </Picker>
            </View>
            <View style={styles.containerDropDown}>
                  <Text >{this.props.getLocalizedText("doYouHaveInfants")}</Text>
                <Picker
                    selectedValue={infant}
                    style={styles.questionsDropDown}
                    onValueChange={(itemValue, itemIndex) =>
                      this.onChangeText({infant: itemValue})
                    }>
                    <Picker.Item label={this.props.getLocalizedText("Yes")} value={true} />
                    <Picker.Item label={this.props.getLocalizedText("No")} value={false} />
                  </Picker>
            </View>
            {infant === true ? 
            <View style={styles.containerDropDown}>
                  <Text >{this.props.getLocalizedText("selectGenders")}</Text>
                <Picker
                    selectedValue={(babyGender.male && babyGender.female)}
                    style={styles.questionsDropDown}
                    onValueChange={(itemValue, itemIndex) =>{
                        return this.setState({babyGender:{male: itemValue, female: itemValue}})
                    }}>
                    <Picker.Item label={this.props.getLocalizedText("Male")} value={true} key='1' />
                    <Picker.Item label={this.props.getLocalizedText("Female")} value={false}  key='2'/>
                 </Picker>
            </View>
            : null}
            {infant === true ?
            <View >
              <Text style={{alignSelf: 'center'}}>{this.props.getLocalizedText("babydob")} {babyDOB}</Text>
              <TextInputMask
                type={'datetime'}
                options={{
                  format: 'MM/DD/YYYY',
                  validator: function(value, settings) {
                    let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
                    return regex.test(value);
                  }  
                }}
                style={appStyles.TextInputMask}
                value={babyDOB}
                placeholder={this.props.getLocalizedText("dob")}
                onChangeText = {text => {
                  this.setState({ babyDOB: text })
                }}
                // Ref for use of isValid(), like this.dateBaby.isValid()
                ref={(ref) => this.dateBaby = ref}
              />
                  {/* <TextInput
                  placeholder={this.props.getLocalizedText("dob")}
                  style={appStyles.TextInput.TextInput}
                  // value={babyDOB}
                  type={'date'}
                  keyboardType={"numeric"}
                  dob = {"baby"}
                  onChangeText={(e)=> this.onChangeText({babyDOB: e})}
                /> */}
            </View>
            : null}
        
          </View>
          <View style={{justifyContent: 'center', flexDirection: 'row', padding: 90}}>
            <TouchableHighlight style={appStyles.button.TouchableHighlight} underlayColor={appStyles.blueColor}  
            onPress={() => this.onSubmit(fullName, dob, phoneNumber, infant, pregnant, liveMiami, babyGender, babyDOB)} >
            <Text style={appStyles.button.text}>{this.props.getLocalizedText("save")}</Text>
            </TouchableHighlight>

            
          </View>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
 containerDropDown: {
   ...Platform.select({
     ios: {
      marginTop: 30,
      alignItems: 'center', 
      height:160,
     },
     android: {
       marginTop: 30,
      alignItems: 'center', 
      height:110,
     },
     
   })
 },
 questionsDropDown: {
  ...Platform.select({
    ios: {
      width: 100, 
      bottom: 50,
    },
    android: {
      width: 100, 
      bottom: 10,
    },
    
  })
}
})


export default SettingScreen;