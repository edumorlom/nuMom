import axios from 'axios';

export default axios.create ({
    baseURL: 'https://us-central1-moms-and-infants-healthy.cloudfunctions.net'
});