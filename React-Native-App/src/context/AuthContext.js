import createDataContext from './CreateDataContext';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { navigate } from '../navigationRef';

const ROOT_URL = 'https://us-central1-moms-and-infants-healthy.cloudfunctions.net';


const authReducer = (state, action) => {
    switch(action.type){
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signup':
            return { errorMessage: '', success: action.payload };
        case 'signin': 
            return { errorMessage: '', token: action.payload };
        case 'signin_error': 
            return { ...state, errorMessage: action.payload };
        case 'clear_error_message':
            return { ...state, errorMessage: '' };
        default:
            return state;
    }
};

//actions
const clearErrorMessage = dispatch => () => { 
    dispatch({ type: 'clear_error_message' });
}

const tryLocalSignIn = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
        dispatch({ type: 'sigin', payload: token });
        navigate('Home', GlobalLanguage);
    } else {
        navigate('Language', GlobalLanguage);
    }

};

const signup = dispatch => {
    return async ( phone ) => {
        try {
            //creates a user with the entered phone
            const response = await axios.post(`${ROOT_URL}/createUsers`, { phone });

            //request a code to be sent to the user
            const response1 = await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone });

            dispatch({ type: 'signup', payload: true })

            //navigate to signin
            navigate('Signin', GlobalLanguage)

        } catch (error) {
            dispatch({ type: 'add_error', payload: 'User alredy exist. Try to sign in or sign up with a different phone number' })
            // console.log(error.response.data.error);
        }
    };
};

const signin = dispatch => {
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
           navigate('Home', GlobalLanguage) 

        } catch (error) {
            let errorMessage = error.response.data
            
            if (error.response.data.error) {
                errorMessage = error.response.data.error
                if (error.response.data.error.message)
                    errorMessage = error.response.data.error.message
            }

            dispatch({ type: 'add_error', payload: errorMessage })

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
    { signin, signout, signup, clearErrorMessage, tryLocalSignIn }, //actions object
    { 
        token: null, 
        errorMessage: '', 
        success: false 
    } //initial state
)


