import { View} from "react-native";
import appStyles from "./AppStyles";
import WelcomeUserBanner from './WelcomeUserBanner'
import WhitePanelButton from "./WhitePanelButton";
import React from "react";
import babyBottle from "./baby-bottle.png";
import clinicLogo from "./clinic-logo.png";
import lightBulb from "./light-bulb.png";
import GestureRecognizer from 'react-native-swipe-gestures';



export default class LowerPanel extends React.Component {

    constructor(props) {
        super(props);
        this.goUp();
    }

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
            console.log(this.state.panelStyle.bottom);
            let panelStyle = {...appStyles.lowerPanel};
            panelStyle["bottom"] = this.state.panelStyle.bottom - 25;

            if (this.state.panelStyle.bottom <= appStyles.lowerPanel.bottom) {
                clearInterval(this.transition);
                panelStyle["bottom"] = appStyles.lowerPanel.bottom;
            }

            this.setState({panelStyle: panelStyle});
        }, 0.1);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.fullPanel && !this.props.fullPanel) {
            this.goDown()
        } else if (!prevProps.fullPanel && this.props.fullPanel){
            this.goUp()
        }
    }

    state = {panelStyle: {...appStyles.lowerPanel}, gestureName: ''};


    render() {
        return (
            <GestureRecognizer
                onSwipeUp={() => this.props.setFullPanel(true)}
                onSwipeDown={() => this.props.setFullPanel(false)}
                config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
                style={this.state.panelStyle}>
                    <View style={{height: '80%', width: '100%', alignItems: 'center'}}>
                        <WelcomeUserBanner fullName={this.props.fullName} logout={this.props.logout}/>
                        <WhitePanelButton text={"Learn"} icon={babyBottle}/>
                        <WhitePanelButton text={"Find Care"} icon={clinicLogo}/>
                        <WhitePanelButton text={"Tips & Tricks"} icon={lightBulb}/>
                    </View>
            </GestureRecognizer>
        )
    }
}