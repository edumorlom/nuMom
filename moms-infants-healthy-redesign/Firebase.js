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

    signUp = (email, password, fullName, dob, pregnant, infant, babyGender) => {
        this.createUserWithEmailAndPassword(email, password).then(response => {
            this.saveUserInfo(response.user.uid, fullName, dob, pregnant, infant, babyGender).then(() => {
                console.log("User Creation was a success!")
            }, e => {alert("ERROR: Couldn't save user information.")})
        }, e => {alert("This e-mail already exists.");})
    };

    createUserWithEmailAndPassword = (email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    };

    logIn = (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    };

    saveUserInfo = (uid, fullName, dob, pregnant, infant, babyGender) => {
        return firebase.database().ref('users/' + uid).set({
            fullName: fullName,
            dob: dob,
            pregnant: pregnant,
            infant: infant,
            babyGender: babyGender
        });

    };

    getUserInfo = (uid) => {
        return firebase.database().ref('users/' + uid);
    }
}





