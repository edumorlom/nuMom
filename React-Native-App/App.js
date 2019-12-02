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
      activeBackgroundColor: Colors.buttonColor, 
      style: {
        backgroundColor: '#F6ECFF'
      }
    }
  }
  )
});


const App = createAppContainer(switchNavigator);

console.disableYellowBox = true;

export default () => {
  
  //setting up firebase
  useEffect ( () => {
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

  }, []);


  return(
    <AuthProvider>
      <SafeAreaView style={{flex: 1, justifyContent: 'center', backgroundColor: '#F6ECFF'}}>
        <App ref={(navigator) => { setNavigator(navigator) }} />
      </SafeAreaView>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.newBackground,
  },
});