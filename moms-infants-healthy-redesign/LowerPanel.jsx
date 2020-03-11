import {View} from "react-native";
import appStyles from "./AppStyles";
import React from "react";
import LowerPanelSelection from "./LowerPanelSelection";
import FindCare from "./FindCare";
import ClinicInfo from "./ClinicInfo";

export default class LowerPanel extends React.Component {

    constructor(props) {
        super(props);
        this.goUp();
    }

    state = {panelStyle: {...appStyles.lowerPanel}};

    transition = null;

    goUp = () => {
        clearInterval(this.transition);
        this.transition = setInterval( () => {
            let panelStyle = {...appStyles.lowerPanel};
            panelStyle["bottom"] = this.state.panelStyle.bottom + 25;

            if (this.state.panelStyle.bottom >= 0) {
                clearInterval(this.transition);
                panelStyle["bottom"] = 0;
            }

            this.setState({panelStyle: panelStyle});
        }, 0.1);
    };

    goDown = () => {
        clearInterval(this.transition);
        this.transition = setInterval( () => {
            let panelStyle = {...appStyles.lowerPanel};
            panelStyle["bottom"] = this.state.panelStyle.bottom - 25;

            if (this.state.panelStyle.bottom <= appStyles.lowerPanel.bottom) {
                clearInterval(this.transition);
                panelStyle["bottom"] = appStyles.lowerPanel.bottom;
            }

            this.setState({panelStyle: panelStyle});
        }, 0.1);
    };

    showContent = () => {
        if (this.props.lowerPanelContent === 'findCare') {
            return <FindCare clinics={this.props.clinics}
                             setClinicToView={this.props.setClinicToView}
                             setLowerPanelContent={this.props.setLowerPanelContent}/>
        } else if (this.props.lowerPanelContent === 'clinicInfo'){
            return <ClinicInfo clinic={this.props.clinicToView} setLowerPanelContent={this.props.setLowerPanelContent}/>
        } else {
            return <LowerPanelSelection fullName={this.props.fullName}
                                        logout={this.props.logout}
                                        setFullPanel={this.props.setFullPanel}
                                        fullPanel={this.props.fullPanel}
                                        setLowerPanelContent={this.props.setLowerPanelContent}/>
        }
    };


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.fullPanel && !this.props.fullPanel) {
            this.goDown()
        } else if (!prevProps.fullPanel && this.props.fullPanel){
            this.goUp()
        }
    }

    render() {
        return (
            <View style={this.state.panelStyle}>
                {this.showContent()}
            </View>
        )
    }
}