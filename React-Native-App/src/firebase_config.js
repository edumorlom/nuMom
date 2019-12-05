import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAH_iVBY_PO_UrW17xtZlw3mOnaDjvjAf0",
    authDomain: "moms-and-infants-healthy.firebaseapp.com",
    databaseURL: "https://moms-and-infants-healthy.firebaseio.com",
    projectId: "moms-and-infants-healthy",
    storageBucket: "moms-and-infants-healthy.appspot.com",
    messagingSenderId: "801193844655",
    appId: "1:801193844655:web:ec2555673422de9d8f195a",
    measurementId: "G-ZFN3XM2E4R"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;