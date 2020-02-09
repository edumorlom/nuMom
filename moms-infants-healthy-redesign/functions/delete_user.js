const admin = require('firebase-admin');

module.exports = function (req, res) {
    
    admin.auth().deleteUser(uid)
    .then(() => { 
        return console.log('Successfully deleted user'); 
    })
    .catch((error) => {
        console.log('Error deleting user:', error);
    });
};