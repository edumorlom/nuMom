import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';

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

const profileNavigator = createStackNavigator({
  Profile: { screen: ProfileScreen },
  Documents: { screen: FolderScreen },
});

profileNavigator.navigationOptions = {
  title: 'Personal Account',
  tabBarIcon: ({tintColor}) => <Image source={require('./assets/icons/profile-icon1.png')} />
}

const clinicsNavigator = createStackNavigator({
  Clinics: { screen: ClinicsScreen },
  Nurses: { screen: NurseInfoScreen }
})

clinicsNavigator.navigationOptions = {
  title: 'Clinics Info',
  header: null,
  tabBarIcon: ({tintColor}) => <Image source={require('./assets/icons/clinics-icon.png')} />
}

const switchNavigator = createSwitchNavigator({
  Language: {
    screen: LanguageScreen
  },
  Welcome: {
    screen: WelcomeScreen
  },
  loginFlow: createStackNavigator({
    Signin: {
      screen: SignInScreen, 
      navigationOptions: () => ({
        header: null
      })
    },
    Signup: {
      screen: SignUpScreen,
      navigationOptions: () => ({
        header: null
      })
    }
  }), 
  mainFlow: createBottomTabNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, tintColor}) => {
          return <Image source={require('./assets/icons/home-icon.png')} />
        }
      })
    },
    Sexualhealth: {
      screen: SexEdScreen, 
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, tintColor}) => {
          return <Image source={require('./assets/icons/sexed-icon.png')} />
        }
      })
    },
    Profile: {
      screen: profileNavigator
    },
    Classess: {
      screen: ClassesScreen,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, tintColor}) => {
          return <Image source={require('./assets/icons/classes-icon.png')} />
        }
      })
    },
    Clinics: {
      screen: clinicsNavigator
    }, 
  }, {
    tabBarOptions: {
      activeTintColor: 'red',
      showLabel: false
    }
  }
  )
});


export default createAppContainer(switchNavigator);






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.newBackground,
  },
});