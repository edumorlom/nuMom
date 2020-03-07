import React from 'react';
import Maps from "./Maps";
import {View} from 'react-native';
import LowerPanel from "./LowerPanel";
import SOSButton from "./SOSButton";
import appStyles from "./AppStyles";


export default class Homepage extends React.Component {

    state = {fullPanel: true};

    setFullPanel = (fullPanel) => {
        this.setState({fullPanel: fullPanel})
    };

    render() {
        return (
            <View style={appStyles.container}>
                <Maps onPress={() => this.setFullPanel(false)}/>
                <SOSButton/>
                <LowerPanel setFullPanel={this.setFullPanel} fullPanel={this.state.fullPanel} fullName={this.props.fullName} logout={this.props.logout}/>
            </View>
        )
    }
}