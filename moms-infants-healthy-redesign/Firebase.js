import * as firebase from "firebase";


export default class Firebase {

    constructor() {
        const config = {
            apiKey: "AIzaSyDm7_EtvmYGiq-qbKnAOD_oqGTH0ClCqcI",
            authDomain: "moms-infants-healthy.firebaseapp.com",
            databaseURL: "https://moms-infants-healthy.firebaseio.com",
            projectId: "moms-infants-healthy",
            storageBucket: "moms-infants-healthy.appspot.com",
            messagingSenderId: "14851568032"
        };

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
        console.log('babygender', babyGender)
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
        phoneNumber = phoneNumber.substring(0, 2) === '+1' ? phoneNumber : '+1' + phoneNumber;
        let name = fullName.split(" ")[0];
            return await fetch(
                `https://us-central1-moms-infants-healthy.cloudfunctions.net/sendCustomSMS?phoneNumber=${phoneNumber}`,
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({message: `Hello ${name}, welcome to nuMom! We hope you enjoy what we have to offer.`})
                }
            );
    }

    getUserInfo = (uid) => {
        return firebase.database().ref('users/' + uid);
    }
}





