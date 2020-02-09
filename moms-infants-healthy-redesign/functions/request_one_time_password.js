/* eslint-disable consistent-return */
/* eslint-disable promise/always-return */
const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = function (req, res) {
    //validate that the user enters a phone number 
    if (!req.body.phone){
        return res.status(422).send({ error: 'You must provide a phone number'});
    }

    //sanitize the phone number
    const phone = String(req.body.phone).replace(/[^\d]/g, "");
    
    //find the user model by their id (which in this case is the phone number)
    admin.auth().getUser(phone)
    // .then allows to resolve a promise . catch allows to reject a promise
        .then(userRecord => {
            const code = Math.floor((Math.random() * 8999 + 1000));

            //sending text message to the user
            twilio.messages.create({
                body: 'Your code is ' + code,
                to: phone,
                from: '+18609670732'
            }, (err) => { 
                if (err) { res.status(422).send({ error: err + " You sent bad info"}); }

                //message sent correctly so save the code to the user model
                //generate a new record inside firebase and save the code to that record
                //get reference to the database
                admin.database().ref('/users' + phone) //create a new collection inside the database and in that collection create a new entry called phone
                .update({ code: code, codeValid: true }, () => {
                    res.send({ success: true });
                });
            });
        })
        .catch((err) => {
            res.status(422).send({ error: err + ' User record not found'});
        });
        
};