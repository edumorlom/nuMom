import * as firebase from "firebase";
import getLocalizedText from "./getLocalizedText";
import {NativeModules} from "react-native";
import firebaseAccount from './firebase_account'

export default class Firebase {

    constructor() {
        const config = firebaseAccount;
        if (!firebase.apps.length) firebase.initializeApp(config);
    }

    signUp = (email, phoneNumber, password, fullName, dob, pregnant, infant, babyGender) => {
        this.createUserWithEmailAndPassword(email, password).then(response => {
                this.saveUserInfo(response.user.uid, phoneNumber, fullName, dob, pregnant, infant, babyGender).then(() => {
                    this.sendWelcomeSMS(fullName, phoneNumber).then(response => console.log("Text Message Sent Successfully!"));
                console.log("User Creation was a success!")
            }, e => {alert("ERROR: Couldn't save user information!")})
        }, e => {alert("ERROR: E-Mail is already associated with another account!");})
    };

    createUserWithEmailAndPassword = (email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    };

    logIn = (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    };

    storeObjectInDatabase = (uid, object) => {
        if (!uid) return;
        console.log("OBJECTS", object)
        this.getUserInfo(uid).on('value', (snapshot) => {
            firebase.database().ref('users/' + uid).set({
                ...snapshot.val(),
                ...object
            });
        });
    };

    saveUserInfo = (uid, phoneNumber, fullName, dob, pregnant, infant, babyGender) => {
        if (!uid) return;
        return firebase.database().ref('users/' + uid).set({
            phoneNumber: phoneNumber,
            fullName: fullName,
            dob: dob,
            pregnant: pregnant,
            infant: infant,
            babyGender: babyGender
        });

    };

    async sendWelcomeSMS(fullName, phoneNumber) {
        let deviceLanguage = 'ios' ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] : NativeModules.I18nManager.localeIdentifier
        phoneNumber = phoneNumber.substring(0, 2) === '+1' ? phoneNumber : '+1' + phoneNumber;
        let name = fullName.split(" ")[0];
        let message = getLocalizedText(deviceLanguage, 'welcomeSMS').replace("{NAME}", name);
        console.log(message);
            return await fetch(
                `https://us-central1-moms-infants-healthy.cloudfunctions.net/sendCustomSMS?phoneNumber=${phoneNumber}`,
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({message: message})
                }
            );
    }

    getUserInfo = (uid) => {
        return firebase.database().ref('users/' + uid);
    }
}





