const admin = require('firebase-admin');
const functions = require('firebase-functions');
const serviceAccount = require("./service_account.json");
const createUsers = require('./create_user');
const requestOneTimePassword = require("./request_one_time_password");
const verifyOneTimePassword = require("./verify_one_time_password");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://moms-infants-healthy.firebaseio.com/"
});



exports.createUsers = functions.https.onRequest(createUsers);
exports.requestOneTimePassword = functions.https.onRequest(requestOneTimePassword);
exports.verifyOneTimePassword = functions.https.onRequest(verifyOneTimePassword);

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  const snapshot = await admin.database().ref('/messages').push({original: original});
  // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
  res.redirect(303, snapshot.ref.toString());
});
