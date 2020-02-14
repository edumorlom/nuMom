import React from 'react';
import {AppRegistry, Dimensions, StyleSheet, Text, View} from 'react-native';

import MapView, {AnimatedRegion} from 'react-native-maps';

import AppStyles from "./AppStyles";

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const region = new AnimatedRegion();
console.log(region);

export default function Maps() {
    return (
            <MapView
                style={styles.map}
                showsUserLocation={true}
                zoomEnabled={true}
                followUserLocation={true}
                region={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }
                }
            />
    );
}

Maps.propTypes = {
    provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        top: 100,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});