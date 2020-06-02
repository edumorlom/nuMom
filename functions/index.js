

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const twilio = require('twilio');
const twilioAccount = require('./twilio_account');
const accountSid = twilioAccount.accountSid;
const authToken = twilioAccount.authToken;

const client = new twilio(accountSid, authToken);
const twilioNumber = '+19046472206';

//To call weeks dynamically from json use require(en_En.json) then do json[week] where week can be "week1" for example

exports.sendCustomSMS = functions.https.onRequest((req, res) => {
 console.log(req.body.message);
 client.messages
     .create({
      body: req.body.message,
      from: twilioNumber,
      to: req.query.phoneNumber
     })
     .then(message => res.status(200).send(message))
     .catch(e => console.log(e))
}); 

exports.sendWeeklySMS = functions.https.onRequest((req, res) => {
  var ref = admin.database().ref("users");
  let today = new Date();
  let date = (today.getMonth()+1).toString().padStart(2, "0") +'/'+today.getDate().toString().padStart(2, "0") +'/'+ today.getFullYear();
  ref.orderByChild("nextWeek").equalTo(date).once("value")
  .then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      let phoneNumber = childSnapshot.val().phoneNumber;
      let week = "Week" + childSnapshot.val().week;
      let deviceLanguage = childSnapshot.val().deviceLanguage;

      //get messages based on week and device language and whether it is baby message or mother message like "Week1Mother" or "Week1Baby"

      //create SMS with message for mother and another with message for baby

      //Update nextWeek by adding 7 days
      let nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
      let nextWeek = (nextweek.getMonth()+1).toString().padStart(2, "0") +'/'+nextweek.getDate().toString().padStart(2, "0") +'/'+ nextweek.getFullYear()
      //Update week number   (If weekNumber > 24 set it to null)
      childSnapshot.ref.set({
        nextWeek: nextWeek,
        week: childSnapshot.val().week + 1
      });
    })
    return null;
  }).catch(e => console.log(e))
 





});
/*     anon = () => {
        var ref = firebase.database().ref("users");
        let today = null;
        ref.orderByChild("nextWeek").equalTo(today).on("child_added", function(snapshot) {
            console.log(snapshot.key);
          });
    }     */


/* exports.helloWorld = (req, res) => {
    let message = req.query.message || req.body.message || 'Hello World!';
    res.status(200).send(message);
  };
   */

//functions.database().ref("users") => {     ///maybe ("/users")