import * as firebase from "firebase";


export default class Main {
    constructor() {
        const config = { //Make all configurations for firebase authentications
            apiKey: "AIzaSyDm7_EtvmYGiq-qbKnAOD_oqGTH0ClCqcI",
            authDomain: "moms-infants-healthy.firebaseapp.com",
            databaseURL: "https://moms-infants-healthy.firebaseio.com",
            projectId: "moms-infants-healthy",
            storageBucket: "moms-infants-healthy.appspot.com",
            messagingSenderId: "14851568032"
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }

    signUp = (email, password, fullName, dob, address, babyGender) => {
        this.createUserAuthentication(email, password)

        this.saveUserInfo(fullName, dob, address, babyGender);
    };

    logIn = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    };

    createUserAuthentication = (email, password) => {
        let uid;
        try {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(user => {
                    uid = user.uid;
                    console.log(user.uid)
                });
        } catch (error) {
            console.log(error.toString(error));
        }

        return uid;
    };

    saveUserInfo = (uid, fullName, dob, address, babyGender) => {
        firebase.database().ref('users/' + uid).set({
            fullName: fullName,
            dob: dob,
            age: address,
            babyGender: babyGender
        });

    }
}





