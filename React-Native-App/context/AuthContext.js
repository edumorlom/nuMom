import createDataContext from './CreateDataContext';
import axiosInstance from '../functions/axios_instance';

const authReducer = (state, action) => {
    switch(action.type){
        default:
            return state;
    }
};

//actions
const signup = (dispatch) => {
    return ({ phone, code }) => {
        //make api request to create user with code and phone
        //if we signed up, modify our state, and say that we are authenticated
        //if signing up fails, we probably need to reflect an error message to the user
    };
};

const sigin = (dispatch) => {
    return ({ phone, code }) =>{
        //try to sign in 
        //handle succes by updating state
        //handle failure by showing error message to the user 
    };
};

const signout = (dispatch) => {
    return () => {
        //somehow sign out!!
    };
};

export const { Provider, Context } = createDataContext(
    authReducer,
    {sigin, signout, signup}, //actions object
    { isSignedIn: false } //initial state
)


