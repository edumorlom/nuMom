import React from 'react';
import { StyleSheet } from 'react-native';

import MapView, {AnimatedRegion, Marker} from 'react-native-maps';
import Clinics from "./Clinics";

const region = new AnimatedRegion();
console.log(region);

export default class Maps extends React.Component {

    constructor(props) {
        super(props);
        this.watchID = navigator.geolocation.watchPosition((position) => {
            let region = {
                latitude: position.coords.latitude - 0.05,
                longitude: position.coords.longitude,
                latitudeDelta: 0.1 * 1.5,
                longitudeDelta: 0.1 * 1.5
            };
            this.setState({currentRegion: region})
        }, (error) => console.log(error));
    }

    state = {
        currentRegion: {latitude: 25.7, longitude: -80.3766, latitudeDelta: 0.1, longitudeDelta: 0.1 }
    };

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    render() {
        return (
            <MapView
                onPress={this.props.onPress}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }}
                showsUserLocation={true}
                region={this.state.currentRegion}>
                {Clinics().map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={marker.coordinate}
                        title={marker.resource}
                        description={marker.phoneNumber}/>))}

            </MapView>
        );
    }
}