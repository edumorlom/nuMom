import React from 'react';
import Maps from "./Maps";
import {View} from 'react-native';
import LowerPanel from "./LowerPanel";
import SOSButton from "./SOSButton";


const styles = {
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    }
};

export default class Homepage extends React.Component {

    state = {fullPanel: true};

    setFullPanel = (fullPanel) => {
        console.log(fullPanel);
        this.setState({fullPanel: fullPanel})
    };

    render() {
        return (
            <View style={styles.container}>
                <Maps onPress={() => this.setFullPanel(false)}/>
                <SOSButton/>
                <LowerPanel setFullPanel={this.setFullPanel} fullPanel={this.state.fullPanel} fullName={this.props.fullName} logout={this.props.logout}/>
            </View>
        )
    }
}