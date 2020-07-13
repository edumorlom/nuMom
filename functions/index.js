

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const getLocalizedText = require('./getLocalizedText');
const message = require('./message');
var fetch = require('node-fetch');


exports.sendCustomSMS = functions.https.onRequest((req, res) => {
  message.sendCustomSMS(req.query.phoneNumber, req.body.message)
    .then(message => res.status(200).send(message))
    .catch(e => console.log(e))
});

exports.sendPushNotification = functions.database.ref('users/{id}/infant').onUpdate(event => {
  //const ref = admin.database().ref("users/{id}");
  const snapshot = event.after;
  const ref = event.after.ref.parent     //(returns a reference)

  var messages = [];

    if (snapshot.val() === true) {   //If infant is true/ changed to true
      return ref.once('value').then((snapshot) => {
        console.log(snapshot);
        var expoToken = snapshot.val().expoToken;
        //var name = snapshot.val().fullName.split(" ")[0];
        //let body = `Hello ${name}, your user info has been updated`;
              messages.push({
                  "to": expoToken,
                  "sound": "default",
                  "body": "Congratulations on the new baby, we wish your baby a happy and healthy life",
                  "_displayInForeground": true 
                });
                fetch('https://exp.host/--/api/v2/push/send', {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(messages)

              });
            return Promise(messages);
        })
    }
    return null
  });
  




exports.sendWeeklySMS = functions.https.onRequest((req, res) => {
  var ref = admin.database().ref("users");
  let today = new Date();
  let date = (today.getMonth() + 1).toString().padStart(2, "0") + '/' + today.getDate().toString().padStart(2, "0") + '/' + today.getFullYear();
  ref.orderByChild("nextWeek").equalTo(date).once("value")
  .then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      let phoneNumber = childSnapshot.val().phoneNumber;
      let week = "week" + childSnapshot.val().week;
      let deviceLanguage = childSnapshot.val().deviceLanguage;

      let motherMsg = getLocalizedText.translate(deviceLanguage, week, "Mother")
      let babyMsg = getLocalizedText.translate(deviceLanguage, week, "Baby")

      //create SMS with message for mother and another with message for baby
     
      message.sendCustomSMS(phoneNumber, motherMsg);
      message.sendCustomSMS(phoneNumber, babyMsg);

      //Update nextWeek by adding 7 days
      //Update week number   (If weekNumber > 24 set it to null)
      let nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
      let nextWeek = (nextweek.getMonth()+1).toString().padStart(2, "0") +'/'+nextweek.getDate().toString().padStart(2, "0") +'/'+ nextweek.getFullYear()
      let nextWeekNo = childSnapshot.val().week + 1;
      (nextWeekNo < 25) ? null : nextWeekNo = null;  //The messages are only for the first 24 weeks.
      nextWeekNo ? null : nextWeek = null;       //Set the date to null as well. This will remove it from firebase
      childSnapshot.ref.update({
        nextWeek: nextWeek,
        week: nextWeekNo
      });
    })
    return null;
  }).catch(e => console.log(e)) 
 return res.status(200).send("Sucess");

});


exports.sendAppointmentReminder = functions.https.onRequest((req, res) => {
  var ref = admin.database().ref("users");
  let today = new Date();
  let tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1);
  let date = (tomorrow.getMonth()+1).toString().padStart(2, "0") +'/'+tomorrow.getDate().toString().padStart(2, "0") +'/'+ tomorrow.getFullYear();
  ref.once("value")
  .then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      let appointmentSnapshot = childSnapshot.child("appointments");
      let phoneNumber = childSnapshot.val().phoneNumber;
      let deviceLanguage = childSnapshot.val().deviceLanguage;
      let msg = "Hello, you got an appointment tomorrow";
      
      appointmentSnapshot.forEach( childAptmtSnapshot => {
        let aptmtDate = childAptmtSnapshot.child("date").val();
        if (aptmtDate === date) {   //Date represents tomorrow's date
          message.sendCustomSMS(phoneNumber, msg);
        }
      })
    })
    return null;
  }).catch(e => console.log(e)) 
 return res.status(200).send("Sucess");

});

exports.deleteAppointment = functions.https.onRequest((req, res) => {
  var ref = admin.database().ref("users");
  let today = new Date();
  let yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
  let date = (yesterday.getMonth()+1).toString().padStart(2, "0") +'/'+yesterday.getDate().toString().padStart(2, "0") +'/'+ yesterday.getFullYear();
  ref.once("value")
  .then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      let appointmentSnapshot = childSnapshot.child("appointments");
      
      appointmentSnapshot.forEach( childAptmtSnapshot => {
        let aptmtDate = childAptmtSnapshot.child("date").val();
        if (aptmtDate === date) {   //Date represents yesterday's date
          childAptmtSnapshot.ref.remove()
        }
      })
    })
    return null;
  }).catch(e => console.log(e)) 
 return res.status(200).send("Sucess");

});
