import * as firebase from "firebase";


export default class Firebase {
    uid = null;
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
        this.createUserWithEmailAndPassword(email, password);
        this.saveUserInfo(this.uid, fullName, dob, babyGender).then(() => {this.uid = null;})};

    createUserWithEmailAndPassword(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then((uid) => {this.uid = uid});
    }

    logIn = (email, password) => {return firebase.auth().signInWithEmailAndPassword(email, password);};

    saveUserInfo = (uid, fullName, dob, address, babyGender) => {
        return firebase.database().ref('users/' + uid).set({
            fullName: fullName,
            dob: dob,
            age: address,
            babyGender: babyGender
        });

    }
}





