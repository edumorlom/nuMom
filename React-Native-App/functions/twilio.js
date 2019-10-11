//used for setting up the twilio library

const twilio = require('twilio');
const accountSID = 'ACce879cc68b12108b0424686990308f0d';
const authToken = 'b7ea023b704040ca606d0010eb483f0f';

module.exports = new twilio.Twilio(accountSID, authToken);

//small test to check branch