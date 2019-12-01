/* eslint-disable consistent-return */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
const admin = require('firebase-admin');

module.exports = function (req, res) {
    //make sure the user send the phone and the code
    if (!req.body.phone || !req.body.code) {
        return res.status(422).send({ error: 'Phone and code must be provided'});
    }

    //sanitize the phone number
    const phone = String(req.body.phone).replace(/[^\d]/g, "");
    const code = parseInt(req.body.code);

    //get access to current user
    admin.auth().getUser(phone)
        .then( () => {
            const ref = admin.database().ref('/users' + phone); //instance to the user object in the database
            
            //look at the user collection 
            ref.on('value', snapshot => { //start listening
                ref.off(); //stop listening for value changes
                const user = snapshot.val();

                //compare the code the user is sending with one stored in the database
                if (user.code !== code || !user.codeValid) {
                    return res.status(422).send({ error: 'Code not valid' });
                }

                //correct code has been sent
                ref.update({ codeValid: false });

                //generate a jwt token and send it to the user
                admin.auth().createCustomToken(phone)
                    .then(token => res.send({ token: token }));
            });
        })
        .catch( (err) => res.status(422).send({ error: err }));
};