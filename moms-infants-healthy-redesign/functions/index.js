const admin = require('firebase-admin');
const functions = require('firebase-functions');
const serviceAccount = require("./service_account.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://moms-infants-healthy.firebaseio.com/"
});


const twilio = require('twilio');
const twilioAccount = require('twilio_account');
const accountSid = twilioAccount.accountSid;
const authToken = twilioAccount.authToken;

const client = new twilio(accountSid, authToken);
const twilioNumber = '+19046472206';

exports.sendCustomSMS = functions.https.onRequest((req, res) => {
    console.log(req.body.message);
    client.messages
        .create({
            body: req.body.message,
            from: twilioNumber,
            to: req.query.phoneNumber
        })
        .then(message => console.log(message.sid))
        .catch(e => console.log(e))
});
