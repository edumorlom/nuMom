import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import appStyles from "./AppStyles";
import Button from "./Button";
import TextInput from "./TextInput.jsx";

export default class SignUpBabyDob extends React.Component {
  state = { babyDOB: "" };

  setDob = (babyDOB) => {
    this.setState({ babyDOB: babyDOB });
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
            <TextInput
              placeholder={this.props.getLocalizedText("dob")}
              type={"date"}
              onChangeText={this.setDob}
              keyboardType={"numeric"}
              dob={"baby"}
            />
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
