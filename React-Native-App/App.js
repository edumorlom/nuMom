import React, { useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SafeAreaView from 'react-native-safe-area-view';
import firebase from 'firebase';

import Colors from './src/constants/Colors';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';

//import all the needed screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import LanguageScreen from './src/screens/LanguageScreen';
import SignInScreen from './src/screens/SigInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SexEdScreen from './src/screens/SexEdScreen';
import ClassesScreen from './src/screens/ClassesScreen';
import ClinicsScreen from './src/screens/ClinicsScreen';
import DocumentsScreen from './src/screens/DocumentsScreen';
import NurseInfoScreen from './src/screens/NurseInfoScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';

const profileNavigator = createStackNavigator({
  Profile: { screen: ProfileScreen },
  Documents: { screen: DocumentsScreen },
});

profileNavigator.navigationOptions = {
  tabBarIcon: ({tintColor}) => <Image source={require('./assets/icons/profile-icon1.png')} />
}

const clinicsNavigator = createStackNavigator({
  Clinics: { screen: ClinicsScreen },
  Nurses: { screen: NurseInfoScreen }
})

clinicsNavigator.navigationOptions = {
  tabBarIcon: ({tintColor}) => <Image source={require('./assets/icons/clinics-icon.png')} />
}

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
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
      showLabel: false,
      activeBackgroundColor: 'white',
      style: {
        backgroundColor: 'white'
      }
    }
  }
  )
});


const App = createAppContainer(switchNavigator);

//eliminates the warning from the device screen
console.disableYellowBox = true;






export default () => {

  // //setting up firebase
  useEffect( () => {
    //import config variable
    const Config = {
      apiKey: "AIzaSyDm7_EtvmYGiq-qbKnAOD_oqGTH0ClCqcI",
      authDomain: "moms-infants-healthy.firebaseapp.com",
      databaseURL: "https://moms-infants-healthy.firebaseio.com",
      projectId: "moms-infants-healthy",
      storageBucket: "moms-infants-healthy.appspot.com",
      messagingSenderId: "14851568032",
      appId: "1:14851568032:web:e12d12d1f70d2711c434c5",
      measurementId: "G-TFTD4BC8GT"
    };

    // Initialize Firebase
    if (!firebase.apps.length) { //load firebase more than one time
      firebase.initializeApp(Config);
    }

  },[]);


  return(
    <AuthProvider>
      <SafeAreaView style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
        <App ref={(navigator) => { setNavigator(navigator) }} />
      </SafeAreaView>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
