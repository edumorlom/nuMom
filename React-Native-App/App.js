import React, { useState } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';

import Colors from './constants/Colors';

import firebase from 'firebase';

import { Provider as AuthProvider } from './context/AuthContext'; 

import store from './store';

//import all the needed screens
import WelcomeScreen from './screens/WelcomeScreen';
import LanguageScreen from './screens/LanguageScreen';
import SignInScreen from './screens/SigInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/LandingPageScreen';
import ProfileScreen from './screens/ProfileScreen';
import SexEdScreen from './screens/SexEdScreen';
import ClassesScreen from './screens/ClassesScreen';
import ClinicsScreen from './screens/ClinicsScreen';
import FolderScreen from './screens/FolderScreen';
import NurseInfoScreen from './screens/NurseInfoScreen';

import { AsyncStorage } from 'react-native';

//setting up firebase
const componentDidMount = () => {
  const firebaseConfig = {
      apiKey: "AIzaSyAH_iVBY_PO_UrW17xtZlw3mOnaDjvjAf0",
      authDomain: "moms-and-infants-healthy.firebaseapp.com",
      databaseURL: "https://moms-and-infants-healthy.firebaseio.com",
      projectId: "moms-and-infants-healthy",
      storageBucket: "moms-and-infants-healthy.appspot.com",
      messagingSenderId: "801193844655",
      appId: "1:801193844655:web:ec2555673422de9d8f195a",
      measurementId: "G-ZFN3XM2E4R"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

componentDidMount();

const switchNavigator = createSwitchNavigator({
  Language: LanguageScreen,
  Welcome: WelcomeScreen,
  loginFlow: createStackNavigator({
    Signin: SignInScreen,
    Signup: SignUpScreen
  }), 
  mainFlow: createBottomTabNavigator({
    Home: HomeScreen,
    Sexualhealth: SexEdScreen,
      profileFlow: createStackNavigator({
        Profile: ProfileScreen,
        Documents: FolderScreen
      }),
      Classess: ClassesScreen,
      clinicsFlow: createStackNavigator({
        Clinics: ClinicsScreen,
        Nurses: NurseInfoScreen
      })
  })
});


export default createAppContainer(switchNavigator);






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.newBackground,
  },
});