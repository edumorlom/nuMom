import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {
  AsyncStorage,
  NativeModules,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import {
  logIn,
  registerForPushNotificationsAsync,
  storeObjectInDatabase,
  getUserInfo,
} from './src/Firebase';
import LogIn from './src/Components/LogIn';
import LetsGetStarted from './src/Components/LetsGetStarted';
import SignUpInfo from './src/Components/SignUpInfo';
import SignUpYesorNo from './src/Components/SignUpYesorNo';
import MustLiveInMiami from './src/Components/MustLiveInMiami';
import translate from './src/Components/getLocalizedText';
import Homepage from './src/Components/Homepage';
import SettingScreen from './src/Components/SettingsScreen';
// import * as firebase from "firebase";

export default App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LogIn} />
        <Stack.Screen name="LetsGetStarted" component={LetsGetStarted} />
        <Stack.Screen name="SignUpInfo" component={SignUpInfo} />
        <Stack.Screen name="SignUpYesorNoMiami" component={SignUpYesorNo} />
        <Stack.Screen name="MustLiveInMiami" component={MustLiveInMiami} />
        <Stack.Screen name="Login" component={LogIn} />
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
