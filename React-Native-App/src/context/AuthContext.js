import createDataContext from './CreateDataContext';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

const ROOT_URL = 'https://us-central1-moms-and-infants-healthy.cloudfunctions.net';


const authReducer = (state, action) => {
    switch(action.type){
        case 'signup_error':
            return { ...state, errorMessage: action.payload };
        case 'user_created':
            return { errorMessage: '', success: action.payload };
        case 'signin': 
            return { errorMessage: '', token: action.payload}
        case 'signin_error': 
            return { ...state, errorMessage: action.payload};
        default:
            return state;
    }
};

//actions
const signup = dispatch => {
    return async ( phone ) => {
        try {
            //creates a user with the entered phone
            const response = await axios.post(`${ROOT_URL}/createUsers`, { phone });

            //request a code to be sent to the user
            const response1 = await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone });

            dispatch({ type: 'user_created', payload: true })

            //navigate to signin 

        } catch (error) {
            dispatch({ type: 'signup_error', payload: 'User alredy exist. Try to sign in or sign up with a different phone number' })
            // console.log(error.response.data.error);
        }
    };
};

const signin = (dispatch) => {
    return async ({ phone, code }) => { 
        try {
            console.log('inside auth context')
            console.log(phone)
            console.log(code)

            let { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, { phone, code });

            console.log(data)

            await AsyncStorage.setItem('token', data.token);

            dispatch({ type: 'signin', payload: data.token });

           //navigate to main flow 

        } catch (error) {
            let errorMessage = error.response.data
            
            if (error.response.data.error) {
                errorMessage = error.response.data.error
                if (error.response.data.error.message)
                    errorMessage = error.response.data.error.message
            }

            dispatch({ type: 'signin_error', payload: errorMessage })

            console.log(error.response.data.error)
        }
    };
};

const signout = (dispatch) => {
    return () => {
        //somehow sign out!!
    };
};

export const { Provider, Context } = createDataContext(
    authReducer,
    {signin, signout, signup}, //actions object
    { 
        token: null, 
        errorMessage: '', 
        success: false 
    } //initial state
)


