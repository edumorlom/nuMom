const admin = require('firebase-admin'); //to get access to all of he project data in firebase
const functions = require('firebase-functions');
const serviceAccount = require("./service_account.json");
const createUsers = require('./create_user');
const requestOneTimePassword = require("./request_one_time_password");
const verifyOneTimePassword = require("./verify_one_time_password");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://moms-and-infants-healthy.firebaseio.com"
});

exports.createUsers = functions.https.onRequest(createUsers);
exports.requestOneTimePassword = functions.https.onRequest(requestOneTimePassword);
exports.verifyOneTimePassword = functions.https.onRequest(verifyOneTimePassword);
