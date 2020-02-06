/* eslint-disable consistent-return */
const admin = require('firebase-admin');

module.exports = function (req, res) {
    const email = String(req.body.email);
    // const password = String(req.body.password);

    //create a new user account using that phone number
    admin.auth().createUser({
        uid: email
    }) //async request that returns a promise
        .then(user => res.send( user ))
        .catch(err => res.status(422).send({ error: err + " User already exist. Please Sign In" }));
};
