import React, { useEffect, useState } from "react";
import {
    Keyboard,
    Text,
    TextInput as TextBox,
    TouchableOpacity,
    View,
    TouchableHighlight,
    KeyboardAvoidingView,
    StyleSheet,
    Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Input } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import appStyles from "./AppStyles";
import Button from "./Button";
import translate from "./getLocalizedText";

const passwordHintColorMap = {
    0: appStyles.pinkColor,
    1: appStyles.blueColor,
    2: "#298000",
};

const passwordHintStrengthMap = {
    0: "Poor",
    1: "Medium",
    2: "Strong",
};

export default SignUpPassword = (props) => {
    const [password, setPassword] = useState("");
    const [repeat, setRepeat] = useState("");
    const { liveMiami } = props.route.params;
    const { name } = props.route.params;
    const { dob } = props.route.params;
    const { email } = props.route.params;
    const { phone } = props.route.params;
    const [isSecureEntry, setIsSecureEntry] = useState(true);
    const [show, setShow] = React.useState(false);
    const [showRepeat, setShowRepeat] = React.useState(false);
    const [visible, setVisible] = React.useState(true);
    const [visibleRepeat, setVisibleRepeat] = React.useState(true);
    const [passwordHintColor, setPasswordHintColor] = useState(
        passwordHintColorMap[0]
    );
    const [passwordStrengthText, setPasswordStrengthText] = useState(
        passwordHintStrengthMap[0]
    );
    const [showPopup, setShowPopup] = useState(false);

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleContinue = () => {
        props.navigation.navigate("SignUpYesorNoPregnant", {
            liveMiami,
            name,
            dob,
            email,
            phone,
            password,
            question: translate("areYouPregnant"),
            value: "pregnant",
        });

        closePopup();
    };

    useEffect(() => {
        AsyncStorage.getItem("pass").then((value) => {
            value !== null && value !== "" ? setPassword(value) : null;
        });
        AsyncStorage.getItem("repeat").then((value) => {
            value !== null && value !== "" ? setRepeat(value) : null;
        });
    }, []);

    let onChange = (value) => {
        setPassword(value);
        setPasswordHintColor(passwordHintColorMap[getPasswordState()]);
        setPasswordStrengthText(passwordHintStrengthMap[getPasswordState()]);
    };

    function getPasswordState() {
        if (password.length <= 4) {
            return 0;
        } else if (password.length >= 5) {
            if (checkStringValidity(password)) {
                return 2;
            }

            return 1;
        }
    }

    function checkStringValidity(str) {
        // Define regular expressions for each required pattern
        const lowercaseRegex = /[a-z]/;
        const uppercaseRegex = /[A-Z]/;
        const numberRegex = /[0-9]/;
        const symbolRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

        // Check if the string satisfies all the required conditions
        const hasLowercase = lowercaseRegex.test(str);
        const hasUppercase = uppercaseRegex.test(str);
        const hasNumber = numberRegex.test(str);
        const hasSymbol = symbolRegex.test(str);

        // Return true if all conditions are met, otherwise return false
        return hasLowercase && hasUppercase && hasNumber && hasSymbol;
    }

    let onPress = () => {
        if (password !== repeat) {
            alert(translate("passwordMismatch"));
        } else if (!password || !repeat) {
            alert(translate("fillOutAllFields"));
        } else if (getPasswordState() == 0) {
            alert(translate("passwordTooShort"));
        } else if (getPasswordState() == 1) {
            openPopup();
        } else {
            // props.setUserInfo({password});
            // AsyncStorage.setItem('pass', password);
            // AsyncStorage.setItem('repeat', repeat);
            props.navigation.navigate("SignUpYesorNoPregnant", {
                liveMiami,
                name,
                dob,
                email,
                phone,
                password,
                question: translate("areYouPregnant"),
                value: "pregnant",
            });
        }
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={appStyles.signupContainer}
            enabled={false}
        >
            <TouchableHighlight
                onPress={Keyboard.dismiss}
                underlayColor="transparent"
                accessible={false}
            >
                <>
                    <View>
                        <Modal
                            visible={showPopup}
                            animationType="fade"
                            transparent={true}
                            onRequestClose={closePopup}
                        >
                            <View style={appStyles.passwordStrengthModalContainer}>
                                <View style={appStyles.passwordStrengthModalContent}>
                                    <Text style={appStyles.passwordStrengthModalText}>
                                        Your password could be more secure. Would you like to edit
                                        it or continue?
                                    </Text>

                                    <View style={appStyles.passwordStrengthModalButtonContainer}>
                                        <TouchableOpacity
                                            onPress={closePopup}
                                            style={appStyles.button}
                                        >
                                            <Text style={appStyles.passwordStrengthModalButtonText}>Edit</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={handleContinue}
                                            style={appStyles.button}
                                        >
                                            <Text style={appStyles.passwordStrengthModalButtonText}>Continue</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <View style={appStyles.container}>
                        <View
                            style={{
                                paddingTop: appStyles.win.height * 0.15,
                                justifyContent: "center",
                                alignItems: "center",
                                position: "absolute",
                            }}
                        >
                            <Text style={appStyles.titleBlue}>
                                {translate("createPassword")}
                            </Text>
                            <View style={{ paddingTop: appStyles.win.height * 0.05 }}>
                                <View>
                                    <TextBox
                                        style={appStyles.TextInputMask}
                                        secureTextEntry={visible}
                                        placeholder={translate("passwordInput")}
                                        onChangeText={onChange}
                                    />
                                    <Text
                                        style={{
                                            ...appStyles.passwordHintText,
                                            ...{ color: passwordHintColor },
                                        }}
                                    >
                                        Password Strength: {passwordStrengthText}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.eyeShowPassword}
                                        onPress={() => {
                                            setVisible(!visible);
                                            setShow(!show);
                                        }}
                                    >
                                        <Icon
                                            name={show === false ? "eye-outline" : "eye-off-outline"}
                                            size={26}
                                            color={appStyles.pinkColor}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View>
                                    <TextBox
                                        placeholder={translate("repeatPasswordInput")}
                                        onChangeText={setRepeat}
                                        secureTextEntry={visibleRepeat}
                                        value={repeat}
                                        style={appStyles.TextInputMask}
                                    />
                                    <TouchableOpacity
                                        style={styles.eyeShowPassword}
                                        onPress={() => {
                                            setVisibleRepeat(!visibleRepeat);
                                            setShowRepeat(!showRepeat);
                                        }}
                                    >
                                        <Icon
                                            name={
                                                showRepeat === false ? "eye-outline" : "eye-off-outline"
                                            }
                                            size={26}
                                            color={appStyles.pinkColor}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            width: "100%",
                            alignItems: "center",
                            margin: "15%",
                        }}
                    >
                        <Button
                            style={appStyles.button}
                            text={translate("continueButton")}
                            onPress={onPress}
                        />
                    </View>
                </>
            </TouchableHighlight>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    eyeShowPassword: {
        position: "absolute",
        right: 30,
        top: 25,
    },
});
