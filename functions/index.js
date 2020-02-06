import * as firebase from "firebase";

const admin = require('firebase-admin'); //to get access to all of he project data in firebase
const functions = require('firebase-functions');
const serviceAccount = require("./service_account.json");
let create_users = require('./create_user.js');

admin.initializeApp({
 credential: admin.credential.cert(serviceAccount),
 databaseURL: "https://moms-infants-healthy.firebaseio.com/"
});


exports.createUsers = functions.https.onRequest(create_users);


