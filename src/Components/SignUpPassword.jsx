import React, { useEffect, useState } from "react";
import { AsyncStorage, Keyboard, StyleSheet, Text, TextInput as TextBox, TouchableOpacity, View, TouchableHighlight } from 'react-native';
import appStyles from './AppStyles';
import Button from "./Button";
import translate from "app/Components/getLocalizedText";
//import checkPassword from "app/Components/PasswordSecurity"

export default SignUpPassword = (props) => {

    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');

    const displayCheckPassword = (list) => {
        let stre = list[0]
        let streCol = list[1]
        let numCol = list[2]
        let upperCol = list[3]
        let lowerCol = list[4]
      
        const styles = StyleSheet.create({
          strength: {
            color: streCol
          },
          num: {
            color: numCol
          },
          upper: {
            color: upperCol
          },
          lower: {
            color: lowerCol
          }
        });
       
        return (
          <View>
            <Text style={styles.strength}>
             {stre}
            </Text>
            <Text style={styles.num}>
             Password must have Numbers: [0-9]
            </Text>
            <Text style={styles.upper}>
             Password must have Upper Casing: [A-Z]
            </Text>
            <Text style={styles.lower}>
             Password must have Lower Casing: [a-z]
            </Text>
          </View>
          
        );
      
      }
      
      const checkPassword = (password) => {
        let passwordLength = password.length
        let list = [5]
        let numPatt = /[0-9]/g
        let upperPatt = /[A-Z]/g 
        let lowerPatt = /[a-z]/g
        
        if(passwordLength >= 1 && passwordLength <= 4)
        {
          list = ["Too easy", 'red']
        }
        else if(passwordLength >= 5 && passwordLength <= 9)
        {
          list = ["Good", 'orange']
        }
        else if(passwordLength >= 10 && passwordLength <= 14)
        {
          list = ["Very Good", 'green']
        }
        else if(passwordLength >= 15)
        {
          list = ["Excellent", 'blue']
        }
        else
        {
          list = ["Please type a password", 'black']
        }
      
        if(password.match(numPatt) == null)
        {
          list[2] = "red"
        }
        else
        {
          list[2] = "blue"
        }
      
        if(password.match(upperPatt) == null)
        {
          list[3] = "red"
        }
        else
        {
          list[3] = "blue"
        }
      
        if(password.match(lowerPatt) == null)
        {
          list[4] = "red"
        }
        else
        {
          list[4] = "blue"
        }
      
      
        return displayCheckPassword(list)
    }

    useEffect(() => {
        AsyncStorage.getItem('pass').then((value) => {
            value !== null && value !== '' ? setPassword(value) : null;
        }).done();
        AsyncStorage.getItem('repeat').then((value) => {
            value !== null && value !== '' ? setRepeat(value) : null;
        }).done();
    
    }, [])

    let multiInput = () => {
        this.setPassword;
        checkPassword(password);
    }

    let onPress = () => {
        if (password !== repeat) {
            alert(translate("passwordMismatch"))
        } else if (!password || !repeat) {
            alert(translate("fillOutAllFields"))
        } else if (password.length < 6){
            alert(translate("passwordTooShort"))
        } else {
            props.setUserInfo({password: password});
            AsyncStorage.setItem('pass', password);
            AsyncStorage.setItem('repeat', repeat);
            props.getNextScreen();
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
                            
                            <TextBox placeholder={translate("passwordInput")} onChangeText={setPassword} secureTextEntry={true} value= {password} style={appStyles.TextInputMask}/>
                        
                            <TextBox placeholder={translate("repeatPasswordInput")} onChangeText={setRepeat} secureTextEntry={true} value= {repeat} style={appStyles.TextInputMask}/>

                            
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
