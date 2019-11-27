import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { requestPermissionsAsync } from 'expo-location';
import SafeAreaView from 'react-native-safe-area-view';

// const CLINICS = [ {point1: ()}]

const Clinics = props => {
   const [error, setError] = useState(null);
   
   const startTrackingLocation = async () => {
       try {
           await requestPermissionsAsync();
       } catch (err){
            setError(err);
       }
   }; 

   //calls the function everytime the user go to the clinics screen 
   useEffect( () => {
       startTrackingLocation();
   }, []);
   //the empty array makes sure the function is only called once

    return (
        <SafeAreaView forceInset={{top: 'always'}}> 
            <MapView 
                style= {styles.mapStyle}
                initialRegion = {{
                    latitude: 37.33233,
                    longitude: -122.03121,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
            >
                <Marker coordinate={{
                    latitude: 37.33233,
                    longitude: -122.03121,
                }}> 
                </Marker>
            </MapView>
            { error ? <Text>Please enable location services</Text> : null}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
        // justifyContent: 'center',
        // alignItems: 'center',
        // width: '100%',
        // height: '100%'
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
})
export default Clinics;