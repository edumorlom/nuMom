/* eslint-disable consistent-return */
const admin = require('firebase-admin');

module.exports = function (req, res) {
    //verify user provided a phone
    if (!req.body.phone) {
        return res.status(422).send({ error: 'Please enter a valid phone number' });
    }
    //format phone number to remove dashes or pharenthesis ( ^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$ )
    const phone = String(req.body.phone).replace(/[^\d]/g, ""); //regex to recognize anything that is not a digit 

    if (phone.length > 10)
        return res.status(422).send({ error: 'Lenght of phone number is not valid'});
    
    //create a new user account using that phone number
    admin.auth().createUser({ 
        uid: phone
        }) //async request that returns a promise
        .then(user => res.send( user ))
        .catch(err => res.status(422).send({ error: err + " User already exist. Plase Sign In" }));

    //respond to user request, saying the account was made
    // return res.status(200).send({ message: 'User created successfully' });
};