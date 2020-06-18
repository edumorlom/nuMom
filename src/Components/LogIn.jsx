import {
    Animated,
    Image,
    ImageBackground,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Keyboard,
    TextInput as TextBox,
    Text
} from 'react-native';
import React, { useState, useEffect } from "react";
import appStyles from "./AppStyles";
import Button from "./Button";
//import TextInput from "./TextInput";
import SwipeUp from "./SwipeUp";
import background from "../../assets/background.gif";
import loginMainImage from "../../assets/child.png";

export default LogIn = props => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [fadeValue, setFadeValue] = useState(new Animated.Value(0));

  useEffect(() => {
    _start();
  }, [])

  

    let _start = () => {
        Animated.timing(fadeValue, {
            toValue: 1,
            duration: 2000
        }).start();
    };

  
        return (
            <React.Fragment>
                <Animated.View style={{opacity: fadeValue, height: '100%', width: '100%'}}>
                    <TouchableOpacity onPress={Keyboard.dismiss} accessible={false}>
                    <ImageBackground source={background} style={{position: 'absolute', opacity: 0.75, width: appStyles.win.width, height: appStyles.win.height}}/>
                    <View style={{paddingTop: appStyles.win.height * 0.05, alignItems: 'center'}}>
                        <Image style={{width: appStyles.win.height * 0.17, height: appStyles.win.height * 0.17, margin: appStyles.win.height * 0.02}} source={loginMainImage}/>
                        <TextBox style={appStyles.TextInputMask} placeholder={props.getLocalizedText('emailInput')} onChangeText={setEmail}/>
                        <TextBox  style={appStyles.TextInputMask} placeholder={props.getLocalizedText('passwordInput')} onChangeText={setPassword} secureTextEntry={true}/>
                        <View style={{height: appStyles.win.height * 0.03}}/>
                        <Button onPress={() => props.login(email, password)} text={props.getLocalizedText('signInButton')}/>
                        <TouchableHighlight onPress={() => props.setScreen('forgotPassword')} ><Text style={{paddingTop: 20, color: 'white', fontWeight: '500'}}>{props.getLocalizedText("forgotPassword")}</Text></TouchableHighlight>
                    </View>
                    </TouchableOpacity>
                </Animated.View>
                <SwipeUp text={props.getLocalizedText('swipeUpToSignUp')}
                         onSwipeUp={() => props.setScreen('signup')}/>
            </React.Fragment>

  // _start = () => {
  //   Animated.timing(fadeValue, {
  //     toValue: 1,
  //     duration: 2000,
  //   }).start();
  // };

  // render() {
  //   return (
  //     <React.Fragment>
  //       <Animated.View
  //         style={{
  //           opacity: fadeValue,
  //           height: "100%",
  //           width: "100%",
  //         }}
  //       >
  //         <TouchableOpacity onPress={Keyboard.dismiss} accessible={false}>
  //           <ImageBackground
  //             source={background}
  //             style={{
  //               position: "absolute",
  //               opacity: 0.75,
  //               width: appStyles.win.width,
  //               height: appStyles.win.height,
  //             }}
  //           />
  //           <View
  //             style={{
  //               paddingTop: appStyles.win.height * 0.05,
  //               alignItems: "center",
  //             }}
  //           >
  //             <Image
  //               style={{
  //                 width: appStyles.win.height * 0.17,
  //                 height: appStyles.win.height * 0.17,
  //                 margin: appStyles.win.height * 0.02,
  //               }}
  //               source={loginMainImage}
  //             />
  //             <TextInput
  //               placeholder={props.getLocalizedText("emailInput")}
  //               onChangeText={setEmail}
  //             />
  //             <TextInput
  //               type={"password"}
  //               placeholder={props.getLocalizedText("passwordInput")}
  //               onChangeText={setPassword}
  //             />
  //             <View style={{ height: appStyles.win.height * 0.03 }} />
  //             <Button
  //               onPress={() =>
  //                 props.login(email, password)
  //               }
  //               text={props.getLocalizedText("signInButton")}
  //             />
  //           </View>
  //         </TouchableOpacity>
  //       </Animated.View>
  //       <SwipeUp
  //         text={props.getLocalizedText("swipeUpToSignUp")}
  //         onSwipeUp={() => props.setScreen( "signup" )}
  //       />
  //     </React.Fragment>
    );
  
}
