import React from 'react';
import Maps from "./Maps";
import {View} from 'react-native';
import LowerPanel from "./LowerPanel";
import SOSButton from "./SOSButton";
import appStyles from "./AppStyles";
import Clinics from "./Clinics";



export default class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.getCurrentLocation();
    }


    state = {fullPanel: true, clinics: Clinics(), clinicToView: null, lowerPanelContent: 'selection', currentLocation: null};

    getCurrentLocation = () => {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            let currentLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };
            this.setState({currentLocation: currentLocation})
        }, (error) => console.log(error));
    };

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    setFullPanel = (fullPanel) => {
        this.setState({fullPanel: fullPanel})
    };

    setClinicToView = (clinic) => {
        this.setState({clinicToView: clinic})
    };


    setLowerPanelContent = (lowerPanelContent) => {
        this.setState({lowerPanelContent: lowerPanelContent});
    };

    goBack = () => {
        if (this.state.lowerPanelContent !== 'selection') {
            if (this.state.lowerPanelContent === 'findCare') this.setLowerPanelContent('selection');
            if (this.state.lowerPanelContent === 'clinicInfo') this.setLowerPanelContent('findCare');
        }
    };


    render() {
        return (
            <View style={appStyles.container}>
                <Maps onPress={() => this.setFullPanel(false)}
                      clinicToView={this.state.clinicToView}
                      setClinicToView={this.setClinicToView}
                      clinics={Clinics()}
                      currentLocation={this.state.currentLocation}/>
                {/*<SOSButton/>*/}
                <LowerPanel setFullPanel={this.setFullPanel}
                            fullPanel={this.state.fullPanel}
                            fullName={this.props.fullName}
                            logout={this.props.logout}
                            clinics={this.state.clinics}
                            clinicToView={this.state.clinicToView}
                            setClinicToView={this.setClinicToView}
                            lowerPanelContent={this.state.lowerPanelContent}
                            goBack={this.goBack}
                            setLowerPanelContent={this.setLowerPanelContent}/>
            </View>
        )
    }
}