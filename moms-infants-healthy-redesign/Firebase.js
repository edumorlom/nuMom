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
                console.log("User Creation was a success!")
            }, e => {alert("ERROR: Couldn't save user information!")})
        }, e => {alert("ERROR: There was an error logging you in!");})
    };

    createUserWithEmailAndPassword = (email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    };

    logIn = (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    };

    storeLastInteraction = (uid) => {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'@'+today.getHours()+':'+today.getMinutes()

        this.getUserInfo(uid).on('value', (snapshot) => {
            firebase.database().ref('users/' + uid).set({
                lastInteraction: date,
                ...snapshot.val()
            });
        });
    };

    saveUserInfo = (uid, phoneNumber, fullName, dob, pregnant, infant, babyGender) => {
        return firebase.database().ref('users/' + uid).set({
            phoneNumber: phoneNumber,
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





