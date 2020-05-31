import React, { Component } from 'react';
import MapView, {Marker} from 'react-native-maps';
import appStyles from './AppStyles';

export default class Map extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.currentLocation ? { region: {...this.props.currentLocation, latitudeDelta: 0.65, longitudeDelta: 0.3}} : 
                { region: {latitude: 25.782220701733717, longitude: -80.26424665653634, latitudeDelta: 0.65, longitudeDelta: 0.3}};
        
        }
        /* state = {
            region: {latitude: 25.709346556969518, longitude: -80.26424665653634, latitudeDelta: 0.25, longitudeDelta: 0.3}
            } */
    
/*     anon = () => {
        var ref = firebase.database().ref("users");
        let today = null;
        ref.orderByChild("nextWeek").equalTo(today).on("child_added", function(snapshot) {
            console.log(snapshot.key);
          });
    }     */

    

    render() {
        return (
            <MapView
                //region={this.state.region}
                onPress={this.props.onPress}
                provider="google"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    height: appStyles.win.height * 0.5
                }}
                initialRegion={
                    this.state.region 
                  }
                zoomEnabled={true}
                onRegionChangeComplete={region => {
                    this.setState({region});
                }}
                showsUserLocation={true}
                >
                {this.props.clinics.map((clinic, index) => (
                    <Marker
                        key={index}
                        coordinate={clinic.coordinate}
                        title={clinic.resource}
                        description={clinic.phoneNumber}
                        onPress={(e) => {e.stopPropagation(); this.props.setClinicToView(clinic)}}
                        />))}

            </MapView>
        );
    }
}