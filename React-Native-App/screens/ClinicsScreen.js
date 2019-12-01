import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { requestPermissionsAsync } from 'expo-location';
import SafeAreaView from 'react-native-safe-area-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';
import markerIcon from '../assets/icons/map-marker.png';
import Colors from '../constants/Colors';



const Clinics = props => {

    const language = props.navigation.getParam('language');

    console.log(language);

    const clinicsLocations = require('../constants/clinics.json');

    const initialState = {
        latitude: null,
        longitude: null,
        latitudeDelta: 0.8,
        longitudeDelta: 0.3
    }

    const [ currentPosition, setCurrentPosition] = useState(initialState);
    const [marker, setMarker] = useState({});

    let myMap;

    const showLocation = (position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        setCurrentPosition({...currentPosition, latitude, longitude})
        console.log("Latitude : " + latitude + " Longitude: " + longitude);
     }

    const errorHandler = (err) => {
        if(err.code == 1) {
           alert("Error: Access is denied!") 
           console.log("Error: Access is denied!");
        } else if( err.code == 2) {
            alert("Error: Position is unavailable!");
           console.log("Error: Position is unavailable!");
        }
    }
 
    const getLocationPermissions = async () => {
        console.log("hello there")

        const { status } = await Permissions.getAsync(Permissions.LOCATION);

        let finalStatus = status;

        if (status !== 'granted'){
            const { status } = await Permissions.askAsync(Permissions.LOCATION);
            finalStatus = status
        }

        if (finalStatus !== 'granted')
            return;

        if(navigator.geolocation) {
            // timeout at 10000 milliseconds (10 seconds)
            let options = { timeout: 10000, enableHighAccuracy: true, maximumAge: 1000 };
            navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
            } else {
            console.log("Sorry, device does not support geolocation!");
            }
    }
    
    useEffect( () => {
        getLocationPermissions();
    }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

    const renderMarkers = () => {
        return clinicsLocations.map(_marker => (
            <Marker
                key={_marker.id} 
                coordinate={_marker['coords']}
                title={_marker.name}
                description={_marker['phone']}
                image = {markerIcon}
                onPress={ () => {
                    setMarker(_marker);
                    myMap.fitToCoordinates([_marker['coords']], {
                        edgePadding: {top: 20, bottom: 20, left: 20, right: 20},
                        animated: true
                    })
                }}
            />
        ));
    }

    const renderDetailMarker = () => (
        <View 
            styles={{
                position: 'absolute',
                bottom: 0,
                padding: 5,
                width: '100%',
                flexDirection: 'row',
                backgroundColor: Colors.newBackground
            }}
        >
            <Image
                source= {{uri: marker['urlImage']}}
                resizeMode="cover"
                style={{width: 100, height: 90}}
            />
            <View styles={{flex:1, paddingLeft:5, flexDirection: 'column'}}>
                <Text style={{fontWeight: 'bold'}}>{marker.name}</Text>
                <Text allowFontScaling={false}>{marker.address}</Text>
            </View>
        </View>
    )

    return currentPosition.latitude ? (
            <SafeAreaView> 
                <MapView
                    ref={ref => myMap = ref} 
                    showsUserLocation
                    style= {styles.mapStyle}
                    initialRegion = { currentPosition }
                >
                { renderMarkers() }   
                    <TouchableOpacity style={styles.nurseIcon} onPress={() => props.navigation.navigate('Nurses', {language: GlobalLanguage} )}>
                        <Image 
                            source={require('../assets/icons/nurse-icon.png')} 
                            style={{marginLeft: 12, marginTop: 7}}
                        />
                    </TouchableOpacity>    
                </MapView>
                { marker.hasOwnProperty('id') && renderDetailMarker() }
            </SafeAreaView>
        ) : <ActivityIndicator styles={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} animating size='large'/>
};

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
    nurseIcon: {
        marginLeft: 10,
        marginTop: 10,
        borderColor: 'pink',
        backgroundColor: 'blue',
        borderRadius: 60,
        width: 85,
        height: 80
    }
})
export default Clinics;