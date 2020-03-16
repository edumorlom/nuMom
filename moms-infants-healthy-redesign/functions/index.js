const admin = require('firebase-admin');
const functions = require('firebase-functions');
const serviceAccount = require("./service_account.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://moms-infants-healthy.firebaseio.com/"
});


const twilio = require('twilio');
const accountSid = "AC33b0341d3dd4ac8a51b67ae722542b0c";
const authToken = "0fd536bfe79ef8cc2757e0c09655cb04";

const client = new twilio(accountSid, authToken);

const twilioNumber = '+19046472206';

exports.sendTextMessage = functions.https.onRequest((req, res) => {
    console.log(req.query);
    client.messages
        .create({
            body: 'Hello Eduardo, welcome to nuMom! I hope you enjoy what we have to offer.',
            from: twilioNumber,
            to: req.query.phoneNumber
        })
        .then(message => console.log(message.sid))
        .catch(e => console.log(e))
});
