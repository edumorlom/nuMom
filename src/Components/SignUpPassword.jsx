import React, { useEffect, useState } from 'react';
import {
    Keyboard,
    Text,
    TextInput as TextBox,
    TouchableOpacity,
    View,
    TouchableHighlight,
    KeyboardAvoidingView,
    StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Input } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import appStyles from './AppStyles';
import Button from './Button';
import translate from './getLocalizedText';
import poorPasswords from './poorPasswords.json';

export default SignUpPassword = (props) => {
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');
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
    const [passwordStrength, setPasswordStrength] = useState(0);

    useEffect(() => {
        AsyncStorage.getItem('pass').then((value) => {
            value !== null && value !== '' ? setPassword(value) : null;
        });
        AsyncStorage.getItem('repeat').then((value) => {
            value !== null && value !== '' ? setRepeat(value) : null;
        });
    }, []);

    const getPasswordStrengthMessage = () => {
        switch (passwordStrength) {
            case 0: return 'Poor';
            case 1: return 'Medium';
            case 2: return 'High';
            default: return '';
        }
    };

    const getPasswordStrengthStyle = () => {
        switch (passwordStrength) {
            case 0: return { color: appStyles.pinkColor };
            case 1: return { color: appStyles.blueColor };
            case 2: return { color: '#298000' };
            default: return {};
        }
    };

    const checkPasswordStrength = (password) => {
        if (password.length <= 4 || poorPasswords.includes(password)) {
            return 0; // Poor
        }

        let strength = 0;

        // Check if password meets the medium strength criteria
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);

        if (
            password.length >= 5 &&
            (hasLowerCase || hasNumber || hasSymbol || hasUpperCase)
        ) {
            strength = 1; // Medium

            // Check if password meets the high strength criteria
            if (hasLowerCase && hasNumber && hasSymbol && hasUpperCase) {
                strength = 2; // High
            }
        }

        return strength;
    };


    const handleChange = (event) => {
        setPasswordStrength(checkPasswordStrength(event.target.value));
    };

    let onPress = () => {
        if (password !== repeat) {
            alert(translate('passwordMismatch'));
        } else if (!password || !repeat) {
            alert(translate('fillOutAllFields'));
        } else if (password.length < 6) {
            alert(translate('passwordTooShort'));
        } else {
            const passwordStrength = checkPasswordStrength(password);
            if (passwordStrength === 0) {
                alert(translate('poorPassword'));
            }
            else if (passwordStrength === 1) {
                alert(translate('mediumPassword'));
            } else {
                props.navigation.navigate('SignUpYesorNoPregnant', {
                    liveMiami,
                    name,
                    dob,
                    email,
                    phone,
                    password,
                    question: translate('areYouPregnant'),
                    value: 'pregnant',
                });
            }
        }
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={appStyles.signupContainer}
            enabled={false}
        >
            <TouchableHighlight
                onPress={Keyboard.dismiss}
                underlayColor="transparent"
                accessible={false}
            >
                <>
                    <View style={appStyles.container}>
                        <View
                            style={{
                                paddingTop: appStyles.win.height * 0.15,
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                            }}
                        >
                            <Text style={appStyles.titleBlue}>
                                {translate('createPassword')}
                            </Text>
                            <View style={{ paddingTop: appStyles.win.height * 0.05 }}>
                                <View>
                                    <TextBox
                                        style={appStyles.TextInputMask}
                                        secureTextEntry={visible}
                                        placeholder={translate('passwordInput')}
                                        onChangeText={(text) => {
                                            setPassword(text);
                                            setPasswordStrength(checkPasswordStrength(text));
                                        }}
                                    />
                                    <TouchableOpacity
                                        style={styles.eyeShowPassword}
                                        onPress={() => {
                                            setVisible(!visible);
                                            setShow(!show);
                                        }}
                                    >
                                        <Icon
                                            name={show === false ? 'eye-outline' : 'eye-off-outline'}
                                            size={26}
                                            color={appStyles.pinkColor}
                                        />
                                    </TouchableOpacity>
                                    <Text style={getPasswordStrengthStyle()}>
                                        Password Strength: {getPasswordStrengthMessage()}
                                    </Text>
                                </View>

                                <View>
                                    <TextBox
                                        placeholder={translate('repeatPasswordInput')}
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
                                                showRepeat === false ? 'eye-outline' : 'eye-off-outline'
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
                            width: '100%',
                            alignItems: 'center',
                            margin: '15%',
                        }}
                    >
                        <Button
                            style={appStyles.button}
                            text={translate('continueButton')}
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
        position: 'absolute',
        right: 30,
        top: 25,
    },
});