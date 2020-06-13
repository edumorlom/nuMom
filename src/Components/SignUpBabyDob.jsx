import React from "react";
import {
  Keyboard,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
} from "react-native";
import appStyles from "./AppStyles";
import Button from "./Button";
import { TextInputMask } from "react-native-masked-text";

export default class SignUpBabyDob extends React.Component {
  state = { babyDOB: "" };

  setDob = (babyDOB) => {
    this.setState({ babyDOB: babyDOB });
  };

  setDob = (babyDOB) => {
    this.setState({ babyDOB: babyDOB });
    AsyncStorage.setItem("babyDOB", babyDOB);
  };

  onPress = () => {
    if (!this.state.babyDOB) {
      alert(this.props.getLocalizedText("fillOutAllFields"));
    } else if (!this.isValidDate(this.state.babyDOB)) {
      alert(this.props.getLocalizedText("invalidDate"));
    } else {
      this.props.setUserInfo({ babyDOB: this.state.babyDOB });
      this.props.getNextScreen();
    }
  };

  isValidDate = (date) => {
    let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    return regex.test(date);
  };

  componentDidMount() {
    AsyncStorage.getItem("babyDOB")
      .then((value) => {
        if (value !== null && value !== "") {
          // saved input is available
          this.setState({ babyDOB: value }); // Note: update state with last entered value
        }
      })
      .done();
  }

  render() {
    let titletext = this.props.getLocalizedText("babydob");
    return (
      <TouchableOpacity
        onPress={Keyboard.dismiss}
        accessible={false}
        style={appStyles.container}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
          }}
        >
          <Text style={appStyles.titleBlue}>{titletext}</Text>
          <View style={{ paddingTop: appStyles.win.height * 0.1 }}>
            <TextInputMask
              placeholder={this.props.getLocalizedText("dob")}
              type={"datetime"}
              options={{
                format: "MM/DD/YYYY",
                validator: function (value, settings) {
                  let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
                  return regex.test(value);
                }, //This validator function is read by isValid(), still to be used
              }}
              style={appStyles.TextInputMask}
              value={this.state.babyDOB}
              onChangeText={this.setDob}
              ref={(ref) => (this.babyDOB = ref)}
            />
            {/* <TextInput placeholder={this.props.getLocalizedText("dob")} type={'date'} onChangeText={this.setDob} keyboardType={"numeric"} dob = {"baby"}/> */}
          </View>
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: "12%",
          }}
        >
          <Button
            text={this.props.getLocalizedText("continueButton")}
            onPress={this.onPress}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
