import React from 'react';
import MapView, {AnimatedRegion, Marker} from 'react-native-maps';

const region = new AnimatedRegion();
console.log(region);

export default class Maps extends React.Component {

    constructor(props) {
        super(props);
        this.watchID = navigator.geolocation.watchPosition((position) => {
            let region = {
                latitude: position.coords.latitude - 0.05,
                longitude: position.coords.longitude,
                latitudeDelta: 0.2 * 1.5,
                longitudeDelta: 0.2 * 1.5
            };
            this.setCurrentRegion(region)
         }, (error) => console.log(error));
    }

    state = {
        currentRegion: {  latitude: 25.209346556969518,
            latitudeDelta: 1.683801011055472,
            longitude: -80.26424665653634,
            longitudeDelta: 0.9419280637272891,
        }
    };

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    setCurrentRegion  = (region) => {
        console.log(region)
        this.setState({ currentRegion: region });
    };

    //
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if (nextProps.clinicToView && nextProps.clinicToView.coordinate.latitude !== this.state.currentRegion.latitude){
    //         let region = {latitude: 25.7, longitude: -80.3766, latitudeDelta: 0.1, longitudeDelta: 0.2}
    //         region.latitude = nextProps.clinicToView.coordinate.latitude;
    //         region.longitude = nextProps.clinicToView.coordinate.longitude;
    //         this.setCurrentRegion(region)
    //         return true
    //     }
    // }

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