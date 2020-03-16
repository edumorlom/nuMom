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
                    this.sendWelcomeTextMessage(phoneNumber).then(response => console.log("Text Message Sent Successfully!"))
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

    async sendWelcomeTextMessage(phoneNumber) {
        phoneNumber = phoneNumber.substring(0, 2) === '+1' ? phoneNumber : '+1' + phoneNumber;
        console.log(phoneNumber);
        try {
            let response = await fetch(
                `https://us-central1-moms-infants-healthy.cloudfunctions.net/sendTextMessage?phoneNumber=${phoneNumber}`,
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({})
                }
            );
            if (response.status >= 200 && response.status < 300) {
                alert("Authenticated successfully!");
            }
        } catch (e) {
            console.log(e)
        }
    }

    getUserInfo = (uid) => {
        return firebase.database().ref('users/' + uid);
    }
}





