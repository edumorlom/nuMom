import React, { useEffect, useState } from "react";
import { AsyncStorage, Keyboard, Text, TextInput as TextBox, TouchableOpacity, View, TouchableHighlight } from 'react-native';
import appStyles from './AppStyles';
import Button from "./Button";
import translate from "app/Components/getLocalizedText";
import { ColorPropType } from "react-native";
import {regularFontSize} from './AppStyles'

const numberRegX = /\d/;
const lowerRegX = /[a-z]/;
const upperRegx = /[A-Z]/;
const specialCharRegX = /[!@#$%^&*_+\-?=]/;

export default SignUpPassword = (props) => {
    
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');
    const [lengthColor, setLengthColor] = useState('black');
    const [lengthMessage, setLengthMessage] = useState('Type a password');
    const [caseColor, setCaseColor] = useState('black');
    const [caseMessage, setCaseMessage] = useState('Uppercase and lowercase letters');
    const [numberColor, setNumberColor] = useState('black');
    const [numberMessage, setNumberMessage] = useState('Include a number');
    const [specCharColor, setSpecCharColor] = useState('black');
    const [specCharMessage, setSpecCharMessage] = useState('Special character (!@#$%^&*_+-?=)');
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
        } else if (!lowerRegX.test(password)) {
            alert('Your password must include at least one lowercase letter')
        } else if (!upperRegx.test(password)){
            alert('Your password must include at least one capital letter')
        } else if (!numberRegX.test(password)){
            alert('Your password must include a number')
        } else if (!specialCharRegX.test(password)){
            alert('Your password must include a special character')
        } else {
            props.setUserInfo({password: password});
            AsyncStorage.setItem('pass', password);
            AsyncStorage.setItem('repeat', repeat);
            props.getNextScreen();
        }
    };

    const onChangePassword = (password) => {
        setPassword(password);
        onChangeRegX(password);
        onChangeLength(password.length);
        onChangeCase(password);
        
    };

    const onChangeRegX = (password) => {
        if (numberRegX.test(password)) {
            setNumberColor('green');
            setNumberMessage('Has a number');
        } else {
            setNumberColor('red');
            setNumberMessage('Does not have a number');
        }
        if (specialCharRegX.test(password)) {
            setSpecCharColor('green');
            setSpecCharMessage('Has a special character');
        } else {
            setSpecCharColor('red');
            setSpecCharMessage('No special character (!@#$%^&*_+-?=)');
        }
    };

    const onChangeCase = (password) => {
        if (lowerRegX.test(password) && upperRegx.test(password)) {
            setCaseColor('green');
            setCaseMessage('Uppercase and lowercase letters');
        } else if (lowerRegX.test(password) && !upperRegx.test(password)) {
            setCaseColor('red');
            setCaseMessage('No uppercase letters');
        } else if (!lowerRegX.test(password) && upperRegx.test(password)) {
            setCaseColor('red');
            setCaseMessage('No lowercase letters');
        } else {
            setCaseColor('red');
            setCaseMessage('No uppercase nor lowercase letters');
        }
        
    }

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

    const onChangeLength = (length) => {
        if (length == 0) {
            setLengthColor('red');
            setLengthMessage('Type a password');
        } else if (length >= 1 && length <= 5) {
            setLengthColor('orange');
            setLengthMessage('Too short');
        } else if (length >= 6 && length <= 9) {
            setLengthColor('lightgreen');
            setLengthMessage('Good');
        } else if (length >= 10 && length <= 14) {
            setLengthColor('green');
            setLengthMessage('Very Good');
        } else {
            setLengthColor('blue');
            setLengthMessage('Excellent');
        }
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
                            <Text style={{color: caseColor, marginLeft: 9, fontSize: regularFontSize}}>{caseMessage}</Text>
                            <Text style={{color: numberColor, marginLeft: 9, fontSize: regularFontSize}}>{numberMessage}</Text>
                            <Text style={{color: specCharColor, marginLeft: 9, fontSize: regularFontSize}}>{specCharMessage}</Text>
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
