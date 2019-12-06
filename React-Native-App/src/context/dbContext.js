import createDataContext from './CreateDataContext';
import firebase from '../firebase_config';

const firebaseReducer = (state, action) => {
    switch(action.type){
        case 'get_info':
            console.log(action.payload);
            return { ...state };
        default:
            return state;
    }
};


//actions 

//get user info from db
export const getUserInfo = dispatch => (phone) => {
    firebase.database.ref('/users3053991519').on('value', snapshot => {
        dispatch({ type: 'get_info', payload: snapshot.val() })
    })
}

//send user info to db


//save documents in db


export const { Provider, Context } = createDataContext(
    firebaseReducer,
    { getUserInfo }, //actions object
    { 
        phone: ''
    } //initial state
)