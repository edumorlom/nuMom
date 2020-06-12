import {
  Keyboard,
  Text,
  TouchableOpacity,
  TextInput as TextBox,
  View,
  AsyncStorage,
} from "react-native";
import React from "react";
import appStyles from "./AppStyles";
import Button from "./Button";
import TextInput from "./TextInput.jsx";

export default class NewAppointment extends React.Component {
  state = { fullName: "", dob: "" };

  setFullName = (fullName) => {
    this.setState({ fullName: fullName });
    AsyncStorage.setItem("name", fullName);
  };

  setDob = (dob) => {
    this.setState({ dob: dob });
  };
  onPress = () => {
    if (!this.state.fullName || !this.state.dob) {
      alert(this.props.getLocalizedText("fillOutAllFields"));
    } else {
      this.props.setUserInfo({
        fullName: this.state.fullName,
        dob: this.state.dob,
      });
      this.props.getNextScreen();
    }
  };

  render() {
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
          <View style={{ paddingTop: appStyles.win.height * 0.1 }}>
            <View style={appStyles.TextInput.View}>
              <TextBox
                placeholder={this.props.getLocalizedText("fullName")}
                onChangeText={this.setFullName}
                value={this.state.fullName}
                style={appStyles.TextInput.TextInput}
              />
            </View>
            <TextInput
              placeholder={this.props.getLocalizedText("dob")}
              type={"date"}
              onChangeText={this.setDob}
              keyboardType={"numeric"}
              dob={"mother"}
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
