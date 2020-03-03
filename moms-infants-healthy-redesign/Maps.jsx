import React from 'react';
import { StyleSheet } from 'react-native';

import MapView, {AnimatedRegion} from 'react-native-maps';

const region = new AnimatedRegion();
console.log(region);

export default class Maps extends React.Component {

    state = {currentRegion: {latitude: 25.7, longitude: -80.3766, latitudeDelta: 0.1, longitudeDelta: 0.1 }};

    componentDidMount() {
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

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    render() {
        return (
            <MapView
                style={styles.map}
                showsUserLocation={true}
                zoomEnabled={true}
                followUserLocation={true}
                region={this.state.currentRegion}/>
        );
    }
}

Maps.propTypes = {
    provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});