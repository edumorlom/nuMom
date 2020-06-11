import React from "react";
import Map from "./Map";
import { View } from "react-native";
import LowerPanel from "./LowerPanel";
import SOSButton from "./SOSButton";
import appStyles from "./AppStyles";
import Clinics from "./Clinics";
import { getPreciseDistance } from "geolib";

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullPanel: true,
      clinics: Clinics(),
      clinicToView: null,
      lowerPanelContent: "selection",
      currentLocation: null,
    };
  }

  getPosition = function (options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  componentDidMount() {
    //All the logic for clinic sorting is here, for no particular reason other than I want the updated clinics ASAP
    this.getPosition()
      .then((position) => {
        //console.log(position.coords.latitude, position.coords.longitude);
        this.setState({
          currentLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });

        let clinics = Clinics();
        clinics.forEach((clinic) => {
          let dist = getPreciseDistance(clinic.coordinate, {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          let distanceInMiles = Number(((dist / 1000) * 0.621371).toFixed(3)); //Two decimal places in miles
          clinic.distance = distanceInMiles;
        });
        clinics.sort(function (a, b) {
          return a.distance - b.distance;
        });
        this.setState({ clinics: clinics });
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  getCurrentLocation = () => {
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        let currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        return currentLocation;
        //this.setState({currentLocation: currentLocation})
      },
      (error) => console.log(error)
    );
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  setFullPanel = (fullPanel) => {
    this.state.fullPanel && !fullPanel
      ? this.setState({ fullPanel: fullPanel })
      : null;
    !this.state.fullPanel && fullPanel
      ? this.setState({ fullPanel: fullPanel })
      : null;
  };

  setClinicToView = (clinic) => {
    this.setState({ clinicToView: clinic });
  };

  setLowerPanelContent = (lowerPanelContent) => {
    this.setState({ lowerPanelContent: lowerPanelContent });
  };

  goBack = () => {
    if (this.state.lowerPanelContent === "selection") return;
    if (this.state.lowerPanelContent === "findCare")
      this.setLowerPanelContent("selection");
    if (this.state.lowerPanelContent === "clinicInfo")
      this.setLowerPanelContent("findCare");
    if (this.state.lowerPanelContent === "learn")
      this.setLowerPanelContent("selection");
    if (this.state.lowerPanelContent === "STDInfo")
      this.setLowerPanelContent("learn");
    if (this.state.lowerPanelContent === "resources")
      this.setLowerPanelContent("selection");
    if (this.state.lowerPanelContent === "Gonorrhea")
      this.setLowerPanelContent("STDInfo");
  };

  render() {
    return (
      <View style={appStyles.container}>
        <Map
          onPress={() => this.setFullPanel(false)}
          setFullPanel={this.setFullPanel}
          clinicToView={this.state.clinicToView}
          setClinicToView={this.setClinicToView}
          clinics={this.state.clinics}
          currentLocation={this.state.currentLocation}
          getLocalizedText={this.props.getLocalizedText}
        />
        <SOSButton />
        <LowerPanel //onPress={() => this.setFullPanel(true)}
          setFullPanel={() => this.setFullPanel(!this.state.fullPanel)}
          fullPanel={this.state.fullPanel}
          fullName={this.props.fullName}
          logout={this.props.logout}
          clinics={this.state.clinics}
          clinicToView={this.state.clinicToView}
          setClinicToView={this.setClinicToView}
          lowerPanelContent={this.state.lowerPanelContent}
          goBack={this.goBack}
          setLowerPanelContent={this.setLowerPanelContent}
          getLocalizedText={this.props.getLocalizedText}
          setAppState={this.props.setAppState} 
        />
      </View>
    );
  }
}
