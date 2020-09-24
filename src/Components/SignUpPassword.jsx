import React, { useEffect, useState } from "react";
import { AsyncStorage, Keyboard, Text, TextInput as TextBox, TouchableOpacity, View, TouchableHighlight } from 'react-native';
import appStyles from './AppStyles';
import Button from "./Button";
import translate from "app/Components/getLocalizedText";
import { ColorPropType } from "react-native";
import {regularFontSize} from './AppStyles'

const commonPasswords = ['123456', '123456789', 'qwerty', '1234567', 'password', '12345678', '12345', '	iloveyou', 'qwerty', 'admin', '111111', '123123', 'abc123', 'qwerty123', 'Too easy', 'Type a password', '1q2w3e4r', 'qwertyuiop', 'password1', 'dragon', 'princess'];

export default SignUpPassword = (props) => {

    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');
    const [lengthColor, setLengthColor] = useState('black');
    const [lengthMessage, setLengthMessage] = useState('Type a password');
    const [matchColor, setMatchColor] = useState('');
    const [matchMessage, setMatchMessage] = useState('');
    
    useEffect(() => {
        AsyncStorage.getItem('pass').then((value) => {
            value !== null && value !== '' ? setPassword(value) : null;
        }).done();
        AsyncStorage.getItem('repeat').then((value) => {
            value !== null && value !== '' ? setRepeat(value) : null;
        }).done();
    
    }, [])

    let onPress = () => {
        if (password !== repeat) {
            alert(translate("passwordMismatch"))
        } else if (!password || !repeat) {
            alert(translate("fillOutAllFields"))
        } else if (password.length < 6){
            alert(translate("passwordTooShort"))
        } else if (commonPasswords.includes(password)){
            alert('No commonly used passwords please')
        }else {
            props.setUserInfo({password: password});
            AsyncStorage.setItem('pass', password);
            AsyncStorage.setItem('repeat', repeat);
            props.getNextScreen();
        }
    };

    const onChangePassword = (password) => {
        setPassword(password);
        setLengthColor(onChangeLengthColor(password.length));
        setLengthMessage(onChangeLengthMessage(password.length));
    };

    const onChangeRepeat = (repeat) => {
        setRepeat(repeat);
        if (repeat !== password) {
            setMatchMessage('Passwords do not match');
            setMatchColor('red');
        } else {
            setMatchMessage('Passwords match');
            setMatchColor('green');
        }

    };

    const onChangeLengthColor = (length) => {
        if (length == 0)    return 'black';
        else if (length >= 1 && length <= 4) return 'lightgreen' ;
        else if (length >= 5 && length <= 9) return 'green' ;
        else if (length >= 10 && length <= 14) return 'darkgreen' ;
        else if (length >= 15)  return 'blue' ;
    };

    const onChangeLengthMessage = (length) => {
        if (length == 0)    return 'Type a password';
        else if (length >= 1 && length <= 4) return 'Too easy' ;
        else if (length >= 5 && length <= 9) return 'Good' ;
        else if (length >= 10 && length <= 14) return 'Very Good' ;
        else if (length >= 15)  return 'Excellent' ;
    };

        return (
            <TouchableHighlight onPress={Keyboard.dismiss} underlayColor={"transparent"} accessible={false} style={appStyles.container}>
            <>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                    }}>
                        <Text style={appStyles.titleBlue}>{translate("createPassword")}</Text>
                        <View style={{paddingTop: appStyles.win.height * 0.1}}>
                            
                            <TextBox placeholder={translate("passwordInput")} onChangeText={onChangePassword} secureTextEntry={true} value= {password} style={appStyles.TextInputMask}/>
                            <Text style={{color: lengthColor, marginLeft: 9, fontSize: regularFontSize}}>{lengthMessage}</Text>
                            <TextBox placeholder={translate("repeatPasswordInput")} onChangeText={onChangeRepeat} secureTextEntry={true} value= {repeat} style={appStyles.TextInputMask}/>
                            <Text style={{color: matchColor, marginLeft: 9, fontSize: regularFontSize}}>{matchMessage}</Text>
                            
                        </View>
                    </View>
                    <View style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: '12%',}}>
                        <Button style = {appStyles.button} text={translate("continueButton")} onPress={onPress}/>
                    </View>
            </>
            </TouchableHighlight>
        );
    }
