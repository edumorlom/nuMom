import { View } from "react-native";
import appStyles from "./AppStyles";
import React from "react";
import LowerPanelSelection from "./LowerPanelSelection";
import FindCare from "./FindCare";
import ClinicInfo from "./ClinicInfo";
import LowerPanelHeader from "./LowerPanelHeader";
import Learn from "./Learn";
import Tips from "./TipsAndTricks";
import STDInfo from "./STDInfo";
import Gonorrhea from "./Gonorrhea";
import Chlamydia from "./Chlamydia";
import HPV from "./HPV";
import GenitalHerpes from "./GenitalHerpes";
import Syphilis from "./Syphilis";
import BacterialVaginosis from "./BacterialVaginosis";
import Trichomoniasis from "./Trichomoniasis";
import HIVAIDS from "./HIVAIDS";

export default class LowerPanel extends React.Component {
  constructor(props) {
    super(props);
    this.goUp();
  }

  state = { panelStyle: { ...appStyles.lowerPanel } };

  transition = null;

  goUp = () => {
    clearInterval(this.transition);
    this.transition = setInterval(() => {
      let panelStyle = { ...appStyles.lowerPanel };
      panelStyle["bottom"] = this.state.panelStyle.bottom + 30;

      if (this.state.panelStyle.bottom >= 0) {
        clearInterval(this.transition);
        panelStyle["bottom"] = 0;
      }

      this.setState({ panelStyle: panelStyle });
    }, 0.1);
  };

  goDown = () => {
    clearInterval(this.transition);
    this.transition = setInterval(() => {
      let panelStyle = { ...appStyles.lowerPanel };
      panelStyle["bottom"] = this.state.panelStyle.bottom - 30;

      if (this.state.panelStyle.bottom <= appStyles.lowerPanel.bottom) {
        clearInterval(this.transition);
        panelStyle["bottom"] = appStyles.lowerPanel.bottom;
      }

      this.setState({ panelStyle: panelStyle });
    }, 0.1);
  };

  showContent = () => {
    if (this.props.lowerPanelContent === "findCare") {
      return (
        <FindCare
          clinics={this.props.clinics}
          setClinicToView={this.props.setClinicToView}
          setLowerPanelContent={this.props.setLowerPanelContent}
          getLocalizedText={this.props.getLocalizedText}
        />
      );
    } else if (this.props.lowerPanelContent === "clinicInfo") {
      return (
        <ClinicInfo
          clinic={this.props.clinicToView}
          setLowerPanelContent={this.props.setLowerPanelContent}
          getLocalizedText={this.props.getLocalizedText}
        />
      );
    } else if (this.props.lowerPanelContent === "learn") {
      return (
        <Learn
          setLowerPanelContent={this.props.setLowerPanelContent}
          getLocalizedText={this.props.getLocalizedText}
        />
      );
    } else if (this.props.lowerPanelContent === "STDInfo") {
      return (
        <STDInfo
          setLowerPanelContent={this.props.setLowerPanelContent}
          getLocalizedText={this.props.getLocalizedText}
        />
      );
    } else if (this.props.lowerPanelContent === "tips") {
      return (
        <Tips
          setLowerPanelContent={this.props.setLowerPanelContent}
          getLocalizedText={this.props.getLocalizedText}
        />
      );
    } else if (this.props.lowerPanelContent === "Gonorrhea") {
      return (
        <Gonorrhea
          setLowerPanelContent={this.props.setLowerPanelContent}
          getLocalizedText={this.props.getLocalizedText}
        />
      );
    } else if (this.props.lowerPanelContent === "Chlamydia") {
      return (
        <Chlamydia
          setLowerPanelContent={this.props.setLowerPanelContent}
          getLocalizedText={this.props.getLocalizedText}
        />
      );
    } else if (this.props.lowerPanelContent === "HPV") {
      return (
        <HPV
          setLowerPanelContent={this.props.setLowerPanelContent}
          getLocalizedText={this.props.getLocalizedText}
        />
      );
    } else if (this.props.lowerPanelContent === "GenitalHerpes") {
      return (
        <GenitalHerpes
          setLowerPanelContent={this.props.setLowerPanelContent}
          getLocalizedText={this.props.getLocalizedText}
        />
      );
    } else if (this.props.lowerPanelContent === "Syphilis") {
      return (
        <Syphilis
          setLowerPanelContent={this.props.setLowerPanelContent}
          getLocalizedText={this.props.getLocalizedText}
        />
      );
    } else if (this.props.lowerPanelContent === "BacterialVaginosis") {
      return (
        <BacterialVaginosis
          setLowerPanelContent={this.props.setLowerPanelContent}
          getLocalizedText={this.props.getLocalizedText}
        />
      );
    } else if (this.props.lowerPanelContent === "Trichomoniasis") {
      return (
        <Trichomoniasis
          setLowerPanelContent={this.props.setLowerPanelContent}
          getLocalizedText={this.props.getLocalizedText}
        />
      );
    } else if (this.props.lowerPanelContent === "HIVAIDS") {
      return (
        <HIVAIDS
          setLowerPanelContent={this.props.setLowerPanelContent}
          getLocalizedText={this.props.getLocalizedText}
        />
      );
    } else {
      return (
        <LowerPanelSelection
          fullName={this.props.fullName}
          logout={this.props.logout}
          setFullPanel={this.props.setFullPanel}
          fullPanel={this.props.fullPanel}
          setLowerPanelContent={this.props.setLowerPanelContent}
          getLocalizedText={this.props.getLocalizedText}
          setAppState={this.props.setAppState}
        />
      );
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.fullPanel && !this.props.fullPanel) {
      this.goDown();
    } else if (!prevProps.fullPanel && this.props.fullPanel) {
      this.goUp();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  //movePanel(fullPanel)

  render() {
    return (
      <View style={{ ...this.state.panelStyle, overflow: "hidden" }}>
        {this.props.lowerPanelContent !== "selection" && (
          <LowerPanelHeader
            onPress={this.props.setFullPanel}
            goBack={this.props.goBack}
            lowerPanelContent={this.props.lowerPanelContent}
            getLocalizedText={this.props.getLocalizedText}
            setFullPanel={this.props.setFullPanel}
            fullPanel={this.props.fullPanel}
          />
        )}
        {this.showContent()}
      </View>
    );
  }
}
