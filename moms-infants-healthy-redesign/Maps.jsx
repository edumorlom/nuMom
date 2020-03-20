import React from 'react';
import MapView, {AnimatedRegion, Marker} from 'react-native-maps';

const region = new AnimatedRegion();
console.log(region);

export default class Maps extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.currentLocation) this.setState({currentRegion: {...this.props.currentLocation, latitudeDelta: 0.3, longitudeDelta: 0.3}})
    }

    state = {
        currentRegion: {
            latitude: 25.209346556969518,
            longitude: -80.26424665653634,
            latitudeDelta: 1.683801011055472,
            longitudeDelta: 0.9419280637272891,
        }
    };

    setCurrentRegion  = (region) => {
        console.log(region);
        this.setState({currentRegion: null});
    };

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
                zoomEnabled={true}
                onRegionChange={this.setCurrentRegion}
                showsUserLocation={true}
                region={this.state.currentRegion}>
                {this.props.clinics.map((clinic, index) => (
                    <Marker
                        key={index}
                        coordinate={clinic.coordinate}
                        title={clinic.resource}
                        description={clinic.phoneNumber}
                        onPress={() => this.props.setClinicToView(clinic)}/>))}

            </MapView>
        );
    }
}