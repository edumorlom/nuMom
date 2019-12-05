import firebase from '../firebase_config';

//get user info from db
export const getUserInfo = dispatch => () => {
    firebase.database.ref('/users').on('value', snapshot => {
        dispatch({ type: 'get_info', payload: snapshot.val() })
    })
}

//send user info to db


//save documents in db