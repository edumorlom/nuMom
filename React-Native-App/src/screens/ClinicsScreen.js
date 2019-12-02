import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import SafeAreaView from 'react-native-safe-area-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';
import markerIcon from '../../assets/icons/map-marker.png';
import Colors from '../constants/Colors';
import Translator from '../components/Translator';


const Clinics = ({ navigation }) => {

    console.log("clinics global language: ", GLOBAL_LANGUAGE)

    const clinicsLocations = require('../constants/clinics.json');

    const isCancelled = React.useRef(false);
    const [text, setText] = React.useState("...");

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
            // timeout at 60000 milliseconds (60 seconds)
            let options = { timeout: 60000, enableHighAccuracy: true };
            navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
            } else {
            console.log("Sorry, device does not support geolocation!");
            }
    }
    
    const simulateSlowNetworkRequest = () =>
        new Promise(resolve => setTimeout(resolve, 2500));

    useEffect( () => {
        fetch();
        getLocationPermissions();

        return () => {
            isCancelled.current = true;
          };

    }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

    function fetch() {
        simulateSlowNetworkRequest().then(() => {
          if (!isCancelled.current) {
            setText("done!");
          }
        });
      }


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
                    // myMap.fitToCoordinates([_marker['coords']], {
                    //     edgePadding: {top: 20, bottom: 20, left: 20, right: 20},
                    //     animated: true
                    // })
                }}
            />
        ));
    }

    const renderDetailMarker = () => (
        <View>
            <Image
                source= {{uri: marker['urlImage']}}
                resizeMode="cover"
                style={{width: 100, height: 90, flexDirection: 'row'}}
            />
            <View styles={{flex:1, paddingLeft: 10, flexDirection: 'column', backgroundColor: 'red'}}>
                <Text style={{fontWeight: 'bold'}}>{marker.name}</Text>
                <Text allowFontScaling={false}>{marker.address}</Text>
                <Text allowFontScaling={false}>{marker.website}</Text>
                <Text allowFontScaling={false}>{marker.hours_of_operation}</Text>
            </View>
        </View>
    )

    return currentPosition.latitude ? (
            <SafeAreaView style={{backgroundColor: 'rgba(235, 126, 122, 0.5)'}}> 
                <MapView
                    ref={ref => myMap = ref} 
                    showsUserLocation
                    style= {styles.mapStyle}
                    initialRegion = { currentPosition }
                >
                { renderMarkers() }   
                    <TouchableOpacity onPress={() => { navigation.navigate('Nurses') }}>
                        <Image 
                            source={require('../../assets/icons/nurse-icon.png')} 
                            style={{marginLeft: 12, marginTop: 7}}
                        />
                    </TouchableOpacity>    
                </MapView>
                { marker.hasOwnProperty('id') && renderDetailMarker() }
            </SafeAreaView>
        ) : <View style={styles.container}>
                <Translator style={{ alignSelf: 'center'}} 
                    loadText={"Taking you to the maps to see all the available clinics"} 
                    loadLanguage={GLOBAL_LANGUAGE} 
                />
                <Text style={{ alignSelf: 'center', paddingBottom: 30 }}>{text}</Text>
                <ActivityIndicator animating size='large' color={Colors.buttonColor} />
            </View>
};

Clinics.navigationOptions = () => {
    return {
        header: null
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.newBackground
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