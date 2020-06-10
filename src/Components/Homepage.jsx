import React from "react";
import Map from "./Map";
import { View, AsyncStorage } from "react-native";
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
      clinics: Clinics(),   //try making it null at the start
      sortedClinics: null,
      clinicToView: null,
      lowerPanelContent: "selection",
    };
    this.getPosition = this.getPosition.bind(this) 
  }

  getPosition =  (options) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  async componentDidMount() {
    //All the logic for clinic sorting is here, for no particular reason other than I want the updated clinics ASAP
    //Consider moving this logic inside a Component that handles clinic sorting, filtering and such
    this.getPosition()
      .then((position) => {
        let clinics = Clinics();
        clinics.forEach((clinic) => {
          let dist = getPreciseDistance(clinic.coordinate, {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          let distanceInMiles = Number(((dist / 1000) * 0.621371).toFixed(3)); 
          clinic.distance = distanceInMiles;
        });
        clinics.sort((a, b) => {
          return a.distance - b.distance;
        });
        this.setState({ clinics: clinics});  
        this.setState({ sortedClinics: clinics }); //SortedClinics never changed, where as clinics does get filtered
        
        //AsyncStorage.setItem('clinics', clinics);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }



  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  setClinics = (clinics) => {
    this.setState({ clinics: clinics });
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
    if (this.state.lowerPanelContent === "tips")
      this.setLowerPanelContent("selection");
    if (this.state.lowerPanelContent === "Gonorrhea")
      this.setLowerPanelContent("STDInfo");
  };

  render() {
    //Clinics().forEach(clinic => console.log(clinic.services))
    //console.log(this.state.clinics[0].services)
    return (
      <View style={appStyles.container}>
        <Map
          onPress={() => this.setFullPanel(false)}
          setFullPanel={this.setFullPanel}
          clinicToView={this.state.clinicToView}
          setClinicToView={this.setClinicToView}
          clinics={this.state.clinics}
          getLocalizedText={this.props.getLocalizedText}
        />
        {/*<SOSButton />*/}
        <LowerPanel 
          setFullPanel={() => this.setFullPanel(!this.state.fullPanel)}
          fullPanel={this.state.fullPanel}
          fullName={this.props.fullName}
          logout={this.props.logout}
          clinics={this.state.clinics}
          sortedClinics = {this.state.sortedClinics}
          clinicToView={this.state.clinicToView}
          setClinicToView={this.setClinicToView}
          setClinics = {this.setClinics}
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
