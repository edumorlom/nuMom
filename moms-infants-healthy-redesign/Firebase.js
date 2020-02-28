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

    signUp = (email, password, fullName, dob, babyGender) => {
        //Errors not working...
        this.createUserWithEmailAndPassword(email, password).then(response => {
            this.saveUserInfo(response.user.uid, fullName, dob, babyGender).then(() => {
                console.log("User Creation was a success!")
            }, e => {console.log("ERRRORR")})
        }, e => {console.log("ERROR")})
    };

    createUserWithEmailAndPassword(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    logIn = (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    };

    saveUserInfo = (uid, fullName, dob, babyGender) => {
        return firebase.database().ref('users/' + uid).set({
            fullName: fullName,
            dob: dob,
            babyGender: babyGender
        });

    }
}





