import React, { useState, useEffect } from "react";
import { AsyncStorage, Keyboard, Text, TextInput as TextBox, TouchableOpacity, View, TouchableHighlight } from 'react-native';
import appStyles from './AppStyles';
import Button from "./Button";
import translate from "./getLocalizedText";



export default SignUpInfo = (props) => {

     const [email, setEmail] = useState('');
     const [phone, setPhone] = useState('');

    
     useEffect(() => {
        AsyncStorage.getItem('e-mail').then((value) => {
            value !== null && value !== '' ? setEmail(value) : null;
        }).done();
        AsyncStorage.getItem('phone').then((value) => {
            value !== null && value !== '' ? setPhone(value) : null;
        }).done();
    
    }, []);

    let isValidEmail = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    let isValidPhoneNumber = (phoneNumber) => {
        return phoneNumber.length === 10 && !isNaN(phoneNumber) || phoneNumber.length === 12 && !isNaN(phoneNumber.substring(1, 12));

    };

    let onPress = () => {
        if (!email || !phone) {
            alert(translate("fillOutAllFields"))
        } else if (!isValidEmail(email)){
            alert(translate("invalidEmail"))
        } else if (!isValidPhoneNumber(phone)) {
            alert(translate("invalidPhoneNumber"))
        } else {
            props.setUserInfo({email: email});
            props.setUserInfo({phoneNumber: phone});
            AsyncStorage.setItem('e-mail', email);
            AsyncStorage.setItem('phone', phone);
            props.getNextScreen();
        }
    };

    return (
        <TouchableHighlight onPress={Keyboard.dismiss} accessible={false} underlayColor={"transparent"} style={appStyles.container}>
        <>
            <View style={appStyles.container}>
                <View style={{
                    paddingTop: appStyles.win.height * 0.1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                }}>
                    <View>
                        <Text style={appStyles.titleBlue}>{translate("contactInformation")}</Text>
                    </View>
                    <View style={{paddingTop: appStyles.win.height * 0.1}}>
                        <TextBox placeholder={translate("emailInput")} onChangeText={setEmail} value= {email} style={appStyles.TextInputMask}/>
                        <TextBox placeholder={translate("phoneNumberInput")} onChangeText={setPhone} keyboardType={"numeric"} value= {phone} style={appStyles.TextInputMask}/>

                    </View>
                </View>
                <View style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: '12%'
                }}>
                    <Button style = {appStyles.button} text={translate("continueButton")} onPress={onPress}/>
                </View>
            </View>
        </>
        </TouchableHighlight>
    );
}

